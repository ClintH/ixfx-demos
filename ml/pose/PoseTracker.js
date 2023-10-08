import {PointTracker, TrackedPointMap, pointsTracker} from '../../ixfx/data.js';
import * as Coco from '../lib/Coco.js';
import * as Types from '../lib/Types.js';

/**
 * Track details of a single pose
 */
export class PoseTracker {
  #fromId;
  #poseId;
  #guid;
  #seen = 0;
  /** @type Types.Pose */
  #data;
  /** @type TrackedPointMap */
  points;
  /** @type number */
  #hue;

  /**
   * 
   * @param {string} fromId
   * @param {string} poseId 
   * @param {import('../../ixfx/data.js').TrackedValueOpts} options 
   */
  constructor(fromId, poseId, options) {
    this.#poseId = poseId;
    this.#fromId = fromId;
    this.#guid = fromId+`-`+poseId;
    this.#hue = Math.random() * 360;
    this.points = pointsTracker({id:poseId, ...options});
  }

  /**
   * Returns the middle of the pose bounding box
   * @returns 
   */
  middle() {
    const box = this.#data.box;
    if (box) {
      return {
        x: box.xMin + box.width/2,
        y: box.yMin + box.height/2
      };
    }
    return {x:0,y:0};
  }

  /**
   * Reset stored data for the tracker
   */
  reset() {
    this.points.reset();
  }

  /**
   * Returns the randomly-assigned hue (0..360)
   */
  get hue() {
    return this.#hue;
  }

  /**
   * Returns a CSS colour: hsl() based on
   * the randomly-assigned hue
   */
  get hsl() {
    return `hsl(${this.#hue}, 70%, 50%)`;
  }
  
  /**
   * Returns the globally unique id of this pose
   * (fromId-poseId)
   */
  get guid() {
    return this.#guid;
  }

  /**
   * Returns the original pose id.
   * Warning: this may not be unique if there are multiple senders
   */
  get poseId() {
    return this.#poseId;
  }
  /**
   * Returns the id of the sender of this pose
   */
  get fromId() {
    return this.#fromId;
  }
  
  /**
   * Returns the tracker for a given keypoint
   * @param {*} name 
   * @returns 
   */
  keypoint(name) {
    const d = /** @type PointTracker */(this.points.get(name));
    return d;
  }

  /**
   * Returns the last position for a given keypoint
   * @param {*} name 
   * @returns 
   */
  keypointValue(name) {
    const t = this.points.get(name);
    if (t === undefined) throw new Error(`Point '${name}' is not tracked`);
    const pt = t.last;
    if (pt === undefined) throw new Error(`No data for point '${name}'`);
    return pt;
  }

  /**
   * Update this pose with new information
   * @param {Types.Pose} pose 
   */
  async seen(pose) {
    this.#seen = Date.now();
    this.#data = pose;

    for (const kp of pose.keypoints) {
      if (!kp.name) continue;
      await this.points.seen(kp.name, kp);
    }
  }

  /**
   * Returns how long since pose was updated
   */
  get elapsed() {
    return Date.now() - this.#seen;
  }

  get last() {
    return this.#data;
  }
}