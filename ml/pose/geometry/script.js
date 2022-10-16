// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { Points, radianToDegree } from '../../../ixfx/geometry.js';
import * as Dom from '../../../ixfx/dom.js';
import * as CommonPose from '../common-pose.js';
import { pointTracker } from "../../../ixfx/data.js";

const settings = Object.freeze({
  keypointScoreThreshold: 0.4,
  smoothingAmt: 0.3,
  remote: new Remote(),
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
  /**
   * Processor of pose we're tracking
   */
  firstPoseProcessor: CommonPose.poseProcessor(settings.smoothingAmt, settings.sanityCheck),
  /** 
  * Processed first pose
  * @type {Pose|undefined} */
  firstPose:undefined,
  /** @type {number|undefined} */
  kneeAnkleAngle: undefined,
  /** @type {number|undefined} */
  wristDistance: undefined,
  /** @type {number|undefined} */
  headRotation: undefined,
  /** @type {number|undefined} */
  handToHip: undefined,
  /** @type {number|undefined} */
  noseSpeed: undefined,
  noseTracker: pointTracker({ sampleLimit: 50, storeIntermediate: true })
});

const tick = () => {
  // In here is where we process the most
  // recently received poses and update state
  const { firstPose, noseTracker } = state;
  if (!firstPose) return;

  // Create a map of points so we can access them by name
  const map = CommonPose.mapKeypoints(firstPose);

  const nose = map.get(`nose`);
  let noseSpeed = 0;
  if (nose) {
    const rel = noseTracker.seen(nose);
    const speed = rel.fromInitial.speed;
    if (Number.isFinite(speed) && !Number.isNaN(speed)) {
      noseSpeed = rel.fromInitial.speed * 200;

    }
  }

  // Return an array of points for each name
  const mapGet = (...names) => names.map(n => map.get(n));

  // Knee-ankle angle (also need right_hip for context)
  // @ts-ignore
  const rightAngle = angleBetweenPoints(...mapGet(`right_knee`, `right_ankle`, `right_hip`));
  // @ts-ignore
  const leftAngle = angleBetweenPoints(...mapGet(`left_knee`, `left_ankle`, `left_hip`));

  // Use which ever body side has data
  const kneeAnkleAngle = rightAngle || leftAngle;

  // Wrist-to-wrist distance
  // @ts-ignore
  const wristDistance = distanceBetweenPoints(...mapGet(`right_wrist`, `left_wrist`));

  // Tilting head to left/right
  // @ts-ignore
  const headRotation = CommonPose.pointBalanceX(...mapGet(`right_ear`, `nose`, `left_ear`));

  // Touching a hip: Get shortest distance between either wrist and left hip
  const leftHip = Math.min(
    // @ts-ignore
    distanceBetweenPointsOrInfinity(...mapGet(`right_wrist`, `left_hip`)),
    // @ts-ignore
    distanceBetweenPointsOrInfinity(...mapGet(`left_wrist`, `left_hip`))
  );

  const rightHip = Math.min(
    // @ts-ignore
    distanceBetweenPointsOrInfinity(...mapGet(`right_wrist`, `right_hip`)),
    // @ts-ignore
    distanceBetweenPointsOrInfinity(...mapGet(`left_wrist`, `right_hip`))
  );

  // Use which ever side of the body has the smallest value
  const handToHip = Math.min(leftHip, rightHip);

  updateState({ wristDistance, handToHip, kneeAnkleAngle, headRotation, noseSpeed });
};


/**
 * Received data from a source
 * @param {Pose[]} poses 
 */
const onData = (poses) => {
  const { firstPoseProcessor } = state;

  // Exit if we didn't get any poses
  if (poses.length === 0) return;
  
  // Try to get the pose with same ID as before.
  let targetPose;
  if (firstPoseProcessor.id) {
    targetPose = poses.find(p=>p.id === firstPoseProcessor.id);
  }

  // Couldn't find target pose, or we haven't yet processed anything
  if (!targetPose) {
    // Return an array of [[pose1,kp],[pose2,kp] ...]
    // Sorted by 'nose' keypoint's X value
    const sorted = CommonPose.getSortedKeypointsByX(poses, `nose`);

    // We want the leftmost pose
    targetPose = sorted[0][0];
  }

  // Send to processor:
  // Sanity check keypoint location, removes low confidence points and smoothes pose
  const processed = firstPoseProcessor.process(targetPose);
  
  // Update state processed pose
  updateState({ 
    firstPose: processed
  });
};


/**
 * Uses calculations performed in onPoses and updates screen.
 * This function runs in a fast loop
 */
const drawState = () => {
  const { kneeAnkleAngle, wristDistance, headRotation, handToHip, noseSpeed } = state;

  // Ankle-knee-hip angle
  const kneeAnkleAngleDeg =  radianToDegree(kneeAnkleAngle ?? 0);

  /**
   * Formats a number
   * @param {number|undefined} v 
   * @returns 
   */
  const f = (v) => {
    if (v === undefined) return `?`;
    return v.toFixed(2);
  };

  CommonPose.setText(`data`,
    `
  Knee-ankle angle deg: ${f(kneeAnkleAngleDeg)}
  Wrist distance: ${f(wristDistance)}
  Head rotation: ${f(headRotation)}
  Hand-to-hip: ${f(handToHip)}
  Nose speed: ${f(noseSpeed)}
`
  );
  
};



/**
 * Returns the distance between two points, or `Number.POSITIVE_INFINITY` if either
 * point is missing. This is useful because it can be used with `Math.min/max`.
 * @param {Keypoint|undefined} a 
 * @param {Keypoint|undefined} b 
 * @returns 
 */
const distanceBetweenPointsOrInfinity = (a, b) => {
  const d = distanceBetweenPoints(a, b);
  if (d === undefined) return Number.POSITIVE_INFINITY;
  return d;
};

/**
 * Returns the distance between two points or 'undefined' if either
 * point is missing
 * @param {Keypoint|undefined} a 
 * @param {Keypoint|undefined} b 
 * @returns 
 */
const distanceBetweenPoints = (a, b) => {
  // If we're missing either point, return undefined
  if (a === undefined || b === undefined) return;

  return Points.distance(a, b);
};

/**
 * Calculates the interior angle (in radians) between three body parts 
 * @param {Keypoint|undefined} a 
 * @param {Keypoint|undefined} b 
 * @param {Keypoint|undefined} c
 */
const angleBetweenPoints = (a, b, c) => {
  // If we're missing any point, return undefined
  if (a === undefined || b === undefined || c === undefined) return;

  return Points.angle(a, b, c);
  //return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
};



const setup = async () => {
  const { remote } = settings;

  // Listen for data from the remote
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onData(d.data);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Listen for button presses, etc
  CommonPose.setup();

  const drawLoop = () => {
    drawState();
    window.requestAnimationFrame(drawLoop);
  };
  window.requestAnimationFrame(drawLoop);

  setInterval(tick, settings.tickRateMs);
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
 * @typedef { import("../../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../../common-vision-source").Box } Box
 * @typedef { import("../../common-vision-source").Pose } Pose
 */
