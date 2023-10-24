import * as MoveNet from './Poses.js';
import { PoseTracker } from './PoseTracker.js';
/**
 * @typedef {Readonly<{
 * maxAgeMs:number
 * resetAfterSamples:number
 * sampleLimit:number
 * storeIntermediate:boolean
 * }>} PosesTrackerOptions
 */

/**
 * Tracks several poses
 * 
 * Events:
 * - expired: Tracked pose has not been seen for a while
 * - added: A new pose id
 */
export class PosesTracker {
  /** 
   * PoseTrackers, keyed by 'sender-pose.id'
   * @type Map<string,PoseTracker> */
  #data = new Map();

  /** @type PosesTrackerOptions */
  #options;

  events = new EventTarget();

  /**
   * 
   * @param {Partial<PosesTrackerOptions>} options 
   */
  constructor(options = {}) {
    this.#options = {
      maxAgeMs: 10_000,
      resetAfterSamples: 0,
      sampleLimit: 100,
      storeIntermediate:false,
      ...options
    };
    setInterval(() => {
      // Delete expired poses
      const expired = [...this.#data.entries()].filter(entry=>entry[1].elapsed > this.#options.maxAgeMs);
      for (const entry of expired) {
        this.#data.delete(entry[0]);
        this.events.dispatchEvent(new CustomEvent(`expired`, {detail:entry[1]}));
      }
    }, 1000);
  }

  
  /**
   * Enumerates each of the PoseTrackers, sorted by age.
   * The most recent pose will be at position 0.
   * (ie. one for each body).
   * Use getRawPosesByAge() to enumerate raw pose data
   */
  *getByAge() {
    const trackers = [...this.#data.values()];
    trackers.sort((a,b)=>a.elapsed-b.elapsed);
    yield* trackers.values();
  }

  /**
   * Enumerates PoseTrackers, sorting by score.
   * The higest score will be at position 0
   */
  *getByScore() {
    const trackers = [...this.#data.values()];
    trackers.sort((a,b)=>b.score-a.score);
    yield* trackers.values();
  }

  /**
   * Enumerates PoseTrackers, sorting by the horizontal position.
   * Leftmost pose will be at position 0.
   */
  *getByHorizontal() {
    const trackers = [...this.#data.values()];
    trackers.sort((a,b) => a.middle.x-b.middle.x);
    yield* trackers;
  }

  /**
   * Enumerate all PoseTracker instances
   */
  *get() {
    const trackers = [...this.#data.values()];
    yield* trackers.values();
  }

  /**
   * Enumerate the last set of raw pose data for
   * each of the PoseTrackers.
   */
  *getRawPosesByAge() {
    for (const tracker of this.getByAge()) {
      yield tracker.last;
    }  
  }

  *getRawPoses() {
    const values = [...this.#data.values()];
    for (const tracker of values) {
      yield tracker.last;
    }
  
  }

  /**
   * Enumerate raw keypoint data for all tracked poses
   * @param {string} name 
   */
  *getRawKeypoints(name) {
    const index = MoveNet.Coco.nameToIndex.get(name);
    if (index === undefined) throw new Error(`Keypoint unknown: '${name}'`);
    for (const pose of this.getRawPoses()) {
      const kp = pose.keypoints[index];
      if (kp !== undefined) yield kp;
    }
  }

  /**
   * Enumerate point trackers for all tracked poses
   * for a given keypoint name
   * @param {string} name 
   */
  *getPointTrackers(name) {
    const index = MoveNet.Coco.nameToIndex.get(name);
    if (index === undefined) throw new Error(`Keypoint unknown: '${name}'`);
    for (const tracker of this.get()) {
      yield tracker.keypoint(name);

    }
  }

  /**
   * Returns all PoseTrackers originating from a particular sender
   * @param {string} senderId 
   */
  *getFromSender(senderId) {
    const values = [...this.#data.values()];
    for (const tracker of values) {
      if (tracker.fromId === senderId) yield tracker;
    }
  }

  /**
   * Clear all data
   */
  clear() {
    this.#data.clear();
  }

  /**
   * Enumerate the set of unique sender ids
   */
  *getSenderIds() {
    const set = new Set();
    const values = [...this.#data.values()];
    for (const entry of values) {
      set.add(entry.fromId);
    }
    yield* set.values();
  }

  /**
   * Returns the PoseTracker for this pose id.
   * Warning: Pose ids are not unique if there are multiple data sources.
   * Prefer using guids.
   * @param {string} id 
   * @returns 
   */
  getByPoseId(id) {
    for (const entry of this.#data.values()) {
      if (entry.poseId === id) return entry;
    }
  }

  /**
   * Returns the last raw pose data for this pose id.
   * Warning: Pose ids are not unique if there are multiple data sources.
   * Prefer using guids.
   * @param {string} id 
   */
  getRawPoseByPoseId(id) {
    for (const entry of this.#data.values()) {
      if (entry.poseId === id) return entry.last;
    }
  }

  /**
   * Enumerate the set of globally-unique ids of poses
   */
  *getGuids() {
    for (const t of this.#data.values()) {
      yield t.guid;
    }
  }

  /**
   * Get the PoseTracker for unique id
   * (fromId-poseId)
   * @param {string} id 
   * @returns 
   */
  getByGuid(id) {
    return this.#data.get(id);
  }

  getRawPoseByGuid(id) {
    return this.#data.get(id)?.last;
  }

  /**
   * Track a pose.
   * Fires `added` event if it is a new pose.
   * Returns the globally-unique id for this pose
   * @param {MoveNet.Pose} pose 
   * @param {string} from
   */
  seen(from, pose) {
    if (from === undefined) throw new Error(`Parameter 'from' is undefined`);
    if (pose === undefined) throw new Error(`Parameter 'pose' is undefined`);
    const id = (pose.id ?? 0).toString();
    const nsId = from+`-`+id;
    let tp = this.#data.get(nsId);
    if (tp === undefined) {
      tp = new PoseTracker(from, id, this.#options);
      this.#data.set(nsId, tp);
      tp.seen(pose);
      this.events.dispatchEvent(new CustomEvent(`added`, {detail:tp}));
    } else {
      tp.seen(pose);
    }
    return nsId;
  }

  /**
   * Return number of tracked poses
   */
  get size() {
    return this.#data.size;
  }
}
