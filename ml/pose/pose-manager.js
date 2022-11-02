// #region Imports
import { Correlate } from '../../ixfx/data.js';
import { Maps, ExpiringMap } from '../../ixfx/collections.js';
import { poseProcessor, poseSimilarity, poseByKeypoint } from './common-pose.js';
// #endregion

class PoseData {
  /** @type {string} */
  id;
  processor;
  /** @type {PoseByKeypoint} */
  _pose;
  hue;

  /**
   * 
   * @param {string} id 
   * @param {PosesManager} manager 
   */
  constructor(id, manager) {
    this.id = id;
    this.hue = Math.floor(Math.random()*360);
    this.processor = poseProcessor(manager.processorOpts);
  }

  /**
   * @param {PoseByKeypoint} pose
   */
  set pose(pose) {
    this._pose = pose;
    pose.hue = this.hue;
  }

  get pose() {
    return this._pose;
  }
}

export class PosesManager extends EventTarget {
  /** @type {CorrelatorOpts} */
  #correlationOpts;

  /** 
   * Keep track of sources in a map of source id -> Source
   * 
   * Automatically delete if we don't access an id after 30s.
   * This suggests we're not receiving data from it.
   * 
   * @type {ExpiringMap<string,Source>} */
  #sources;
  #sourcesGet;

  /**
   * Pose id -> PoseData
   * @type {ExpiringMap<string,PoseData>}
   */
  #poses;
  #posesGet;

  /** @type {PoseProcessorOpts|undefined} */
  #processorOpts;

  /** @type {boolean} */
  #debug;
  /**
   * 
   * @param {PosesManagerOpts} opts 
   */
  constructor(opts = {}) {
    super();
    this.#correlationOpts = opts.correlation ?? { matchThreshold: 0.95 };

    this.#processorOpts = opts.processor ?? {
      smoothingAmt: 0.2,
      sanityChecks: {
        anklesBelowKnees: true,
        kneesBelowHip: true,
        shouldersBelowFace: true,
        hipBelowShoulders: true,
        scoreThreshold: 0.6
      }
    };
    this.#debug = opts.debug ?? false;
    const sourceMapOpts = opts.sourcesMapOpts ?? { autoDeletePolicy: `access`, autoDeleteElapsedMs: 30*1000 };
    this.#sources = new ExpiringMap(sourceMapOpts);
    this.#sourcesGet = Maps.getOrGenerateSync(this.#sources, (key, args) => {
      return {
        id: key,
        lastPoses:[]
      };
    });
    this.#sources.addEventListener(`removed`, evt => this.#onSourceLost(evt));
    
    const posesMapOpts = opts.posesMapOpts ?? { autoDeletePolicy:`access`, autoDeleteElapsedMs: 1000 };
    this.#poses = new ExpiringMap(posesMapOpts);
    this.#posesGet = Maps.getOrGenerateSync(this.#poses, (key, args) => {
      return new PoseData(key, this);
    });

    this.#poses.addEventListener(`newKey`, evt => this.#onPoseGained(evt));
    this.#poses.addEventListener(`removed`, evt => this.#onPoseLost(evt));
  }

  log(m) {
    if (!this.#debug) return;
    console.log(`PoseManager `, m);
  }

  /**
   * A new pose detected
   * @param {PosesMapEvent} evt 
   */
  #onPoseGained(evt) {
    this.log(`onPoseGained: ${evt.key}. Total: ${this.#poses.keyLength}`);
    this.dispatchEvent(new CustomEvent(`pose-gained`,
      {
        detail:{
          poseId: evt.key,
          pose:evt.value
        } 
      }));
  }

  /**
   * An existing pose is lost
   * @param {PosesMapEvent} evt 
   */
  #onPoseLost(evt) {
    this.log(`onPoseLost: ${evt.key}. Total: ${this.#poses.keyLength}`);
    this.dispatchEvent(new CustomEvent(`pose-lost`,
      {
        detail:{
          poseId: evt.key,
          pose:evt.value
        } 
      }));
  }
  
  /**
   * 
   * @param {SourcesMapEvent} evt
   */
  #onSourceLost(evt) {
    const { key, value } = evt;
    this.log(`onSourceLost: ${key}`);

    for (const p of value.lastPoses) {
      this.#poses.delete(p.id);
      this.dispatchEvent(new CustomEvent(`pose-lost`,
        {
          detail:{
            poseId:p.id,
            pose:p
          } 
        }));
    }

    this.dispatchEvent(new CustomEvent(`source-lost`,
      {
        detail:{
          poseId: key,
          pose: value
        } 
      }));
  }

  /**
   * Iterates over all poses, regardless of source.
   * 
   * ```js
   * for (const pose of iteratePoses()) {
   *  // work with pose...
   * }
   * ```
   * 
   * Or, to convert to an array:
   * ```js
   * const poses = Array.from(iteratePoses());
   * // Yields an array of Pose[]
   * ```
   */
  *iteratePoses() {
    for (const poseData of this.#poses.values()) {
      yield poseData.pose;
    }
  }

  /**
 * Received poses from a particular source
 * @param {Pose[]} poses Poses
 * @param {string} from Sender id
 */
  onData(poses, from) {
    const posesByKeypoint = poses.map(poseByKeypoint);

    // Get or add new Source according to sender's id
    const source = this.#sourcesGet(from);
    const previousPoses = source.lastPoses;

    // Attempt to align new poses with previous data
    // (matching body identities between frames based on positions, not ids)
    const alignedPoses = Correlate.align(poseSimilarity, previousPoses, posesByKeypoint, this.#correlationOpts);

    // @ts-ignore
    source.lastPoses = alignedPoses;
    
    /** @type {PoseByKeypoint[]} */
    const processedPoses = [];
    for (const p of alignedPoses) {
      const poseData = this.#posesGet(p.id);

      // Process all aligned poses: smooth, remove low-ranked keypoints
      const processed = poseData.processor.process(p);
      if (processed) processedPoses.push(/** @type {PoseByKeypoint} */(processed));
    }

    // Generate meta data for each pose
    for (const p of processedPoses) {
      const pd = this.#posesGet(p.id);
      pd.pose = p;
      this.#poses.touch(p.id);
    }
  }

  get posesMap() {
    return this.#poses;
  }

  get sourcesMap() {
    return this.#sources;
  }

  get processorOpts() {
    return this.#processorOpts;
  }

}

// #region Typedefs
/**
 * @typedef PosesManagerOpts
 * @property {CorrelatorOpts} [correlation]
 * @property {ExpiringMapOpts} [sourcesMapOpts]
 * @property {ExpiringMapOpts} [posesMapOpts]
 * @property {PoseProcessorOpts} [processor]
 * @property {boolean} [debug]
 */

/**
 * @typedef { import("../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../common-vision-source").Box } Box
 * @typedef { import("../common-vision-source").Pose } Pose
 * @typedef { import("./common-pose").PoseProcessor } PoseProcessor
 * @typedef { import("./common-pose").PoseProcessorOpts } PoseProcessorOpts
 * @typedef { import("./common-pose").PoseByKeypoint } PoseByKeypoint
 * @typedef { import("../../ixfx/data.js").Correlate.AlignOpts} CorrelatorOpts
 * @typedef { import("../../ixfx/collections").ExpiringMapOpts } ExpiringMapOpts
 * @typedef { import("../../ixfx/collections").ExpiringMapEvent<string,Source> } SourcesMapEvent
 * @typedef { import("../../ixfx/collections").ExpiringMapEvent<string,PoseData> } PosesMapEvent
 */

/**
 * @typedef Source
 * @property {string} id
 * @property {PoseByKeypoint[]} lastPoses
 */

/**
 * @typedef Meta
 * @property {any} meta
 */

/**
 * @typedef {Pose & Meta} PoseWithMeta
 */

// #endregion