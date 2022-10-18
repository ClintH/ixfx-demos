// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
import { Correlate } from '../../../ixfx/data.js';
import { Points } from '../../../ixfx/geometry.js';
import { Sync as IterableSync } from '../../../ixfx/generators.js';
import * as CommonPose from '../common-pose.js';

const settings = Object.freeze({
  correlation: { matchThreshold: 0.95 },
  // If true, x-axis is flipped
  horizontalMirror: true,
  remote: new Remote(),
  // Interpolation amount applied per frame (0...1)
  // Lower = less jitter & more latency. Higher = more jitter & lower latency
  smoothingAmt: 0.1,
  // Removes poses from source after they go silent for this long
  sourceExpireMs: 10000,
  tickRateMs: 100,
  /** @type {import("../common-pose.js").SanityChecks} */
  sanityCheck: {
    anklesBelowKnees: true,
    kneesBelowHip: true,
    shouldersBelowFace: true,
    hipBelowShoulders: true,
    scoreThreshold: 0.6
  }
});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /**
   * Source id -> Source
   * @type {Map<string,Source>}}
   */
  sources: new Map(),
  /**
   * Pose id -> Pose
   * @type {Map<string,PoseFrom>}
   */
  poses: new Map(),
  poseHues: new Map(),
  /**
   * Pose id -> Processors
   * @type {Map<string,CommonPose.PoseProcessor>}
   */
  processors: new Map(),
  /** @type {number} */
  egDensity: 0
});

/**
 * Tick is the place to use pose data in state
 * and derive some new things to stuff into state.
 * 
 * It loops at the interval settings.tickRateMs
 */
const tick = () => {

  // Get all the poses, regardless of source
  const poses = Array.from(iteratePoses());

  // Do something with the pose data...
  // In this example, we're averaging the distance between noses of all poses.
  // First we need to add up all the densities...
  let egDensity = 0;

  // Eg. sort poses by nose x position
  // Returns [[pose1, noseKp], [pose2, noseKp] ...]
  const sorted = CommonPose.getSortedPosesByX(poses, `nose`);

  // Get pairwise combinations of poses
  // eg pose1 <-> pose2, pose2 <-> pose 3 ...
  const pairs = Array.from(IterableSync.chunksOverlapping(sorted, 2));

  for (const pair of pairs) {
    const aLeftHip = pair[0].keypoints.find( kp => kp.name === `left_hip`);
    const bLeftHip = pair[1].keypoints.find( kp => kp.name === `right_hip`);

    if (aLeftHip && bLeftHip) {
      const distance = Points.distance(aLeftHip, bLeftHip);
      egDensity += distance;
    }
  }
  
  // Calculate average
  egDensity /= pairs.length;

  // Sanity-check
  if (Number.isNaN(egDensity)) egDensity = 0;

  // Update state
  updateState({ egDensity });
};

/**
 * Received poses from a particular source (`from` holds the id of source)
 * @param {PoseFrom[]} poses Poses
 * @param {string} from Sender id
 */
const onData = (poses, from) => {
  const { correlation } = settings;
 
  // Get or add new Source according to the id in 'from'
  const source = trackSource(from);
  const previousPoses = source.poses;

  // Attempt to align new poses with previous data
  // We do this so new data is associated with an existing pose id
  // if it seems to be the same body.
  /** @ts-ignore */
  const alignedPoses = /** @type PoseFrom[] */(Correlate.align(CommonPose.poseSimilarity, previousPoses, poses, correlation));

  // Process all aligned poses
  const processedPoses = alignedPoses.map(p => {
    const processor = getProcessor(p.id);
    return processor.process(p);
  });

  // Store all the newly-aligned & processed poses
  source.poses = processedPoses;

  // Keep track of all poses by name
  for (const p of poses) {
    state.poses.set(p.id, p);
  }
};

/**
 * Called in a loop at animation speed (see setup())
 * @returns 
 */
const useState = () => {
  // Show calculated 'density' example
  CommonPose.setText(`debug`, `
  Density: ${state.egDensity}
  `);
  
  // Draw poses
  drawState();
};

const drawState = () => {
  const canvasEl = /** @type {HTMLCanvasElement|null}*/(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);
  
  // For pose (regardless of source)
  for (const pose of iteratePoses()) {
    // Draw the set of poses
    drawPose(ctx, pose);
  }
};

/**
 * Draw pose
 * @param {CanvasRenderingContext2D} ctx 
 * @param {PoseFrom} pose
 */
const drawPose = (ctx, pose) => {
  const {  poseHues } = state;

  let hue = poseHues.get(pose.id);
  if (!hue) {
    // Id not found, assign a new colour
    hue = Math.floor(Math.random() * 359);
    poseHues.set(pose.id, hue);
  }

  // Get pose in absolute coordinates (absPoint is defined in common-pose.js)
  const abs = CommonPose.absPose(pose, state.bounds, settings.horizontalMirror);

  const colour = `hsl(${hue}, 50%, 50%)`; 
  // Draw pose (debugDrawPose is defined in common-pose.js)
  CommonPose.debugDrawPose(ctx, abs, {
    colour,
  });
  
  
  let boxMin = CommonPose.absPoint({
    x: pose.box?.xMax ?? 0,
    y: pose.box?.yMin ?? 0
  }, state.bounds, settings.horizontalMirror);

  ctx.fillStyle = colour;
  ctx.fillText(`${pose.name} Id: ${pose.id}`, boxMin.x, boxMin.y);
};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};

const setup = async () => {
  const { remote } = settings;

  // Listen for data from the remote
  /**
   * 
   * @param {ReceivedData} d 
   */
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      // Re-write id of pose
      const withId = d.data.map(p => ({
        ...p,
        from: d._from,
        name:``,
        id: d._from+`-` +p.id
      }));
      onData(withId, d._from);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(`#canvas`, args => {
    updateState({ bounds: args.bounds });
  });

  const drawLoop = () => {
    useState();
    window.requestAnimationFrame(drawLoop);
  };
  window.requestAnimationFrame(drawLoop);

  setInterval(tick, settings.tickRateMs);

  // Every 10 seconds, check for expired sources
  setInterval(removePosesFromMissingSource, 10000);

  // Listen for button presses, etc
  CommonPose.setup();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
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
function* iteratePoses() {
  for (const [ ,v ] of state.sources) {
    for (const p of v.poses) {
      yield p;
    }
  }
}

/**
 * When sources stop sending data (eg because they are closed),
 * we want to eventually remove pose data they sent.
 * 
 * This housekeeping function takes care of that
 */
function removePosesFromMissingSource() {
  const { sources } = state;
  const toDelete = [];
  const expireAfter = Date.now() - settings.sourceExpireMs;

  for (const [ key,source ] of sources) {
    if (source.updated < expireAfter) toDelete.push(key);
  }

  toDelete.forEach(key => {
    console.log(`Source expired: ${key}`);
    sources.delete(key);
  });
}

function getProcessor(poseId) {
  let p = state.processors.get(poseId);
  if (!p) {
    p = CommonPose.poseProcessor(settings.smoothingAmt, settings.sanityCheck);
    state.processors.set(poseId, p);
  }
  return p;
}
/**
 * Updates updated timestamp and set of last poses
 * @param {string} sourceId 
 */
function trackSource(sourceId) {
  const { sources } = state;
  let src = sources.get(sourceId);
  if (!src) {
    // New source
    src = {
      id:sourceId,
      updated: Date.now(),
      poses: []
    };
    sources.set(sourceId, src);
    return src;
  }

  // Update source
  src.updated = Date.now();
  return src;
}

/**
 * @typedef { import("../../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../../common-vision-source").Box } Box
 * @typedef { import("../../common-vision-source").Pose } Pose
 */

/**
 * @typedef SourceData
 * @property {number} lastUpdate
 * @property {string} from
 * @property {Pose[]} poses
 */

/**
 * @typedef From
 * @property {string} from
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef Source
 * @property {string} id
 * @property {PoseFrom[]} poses
 * @property {number} updated
 */

/**
 * @typedef {From & Pose} PoseFrom
 */

/**
 * @typedef ReceivedData
 * @property {string} _from
 * @property {Pose[]} data 
 */