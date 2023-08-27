// #region Imports
// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { Points, radianToDegree } from '../../../ixfx/geometry.js';
import * as CommonPose from '../common-pose.js';
import { pointTracker } from "../../../ixfx/data.js";
// #endregion

// #region Settings & state
const settings = Object.freeze({
  keypointScoreThreshold: 0.4,
  remote: new Remote(),
  updateRateMs: 100,
  /**
   * Processor of pose we're tracking
   */
  processor: CommonPose.poseProcessor({
    smoothingAmt: 0.3, 
    sanityChecks: {
      anklesBelowKnees: true,
      kneesBelowHip: true,
      shouldersBelowFace: true,
      hipBelowShoulders: true,
      scoreThreshold: 0.6
    }
  }), 
});

let state = Object.freeze({
  /** 
  * Processed first pose
  * @type {PoseByKeypoint|undefined} */
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
// #endregion

const update = () => {
  // In here is where we process the most
  // recently received poses and update state
  const { firstPose, noseTracker } = state;
  if (!firstPose) return;

  const {
    nose, 
    right_knee, left_knee, 
    right_ankle, left_ankle,
    right_hip, left_hip,
    right_ear, left_ear,
    right_wrist, left_wrist
  } = firstPose;

  let noseSpeed = 0;
  if (nose) {
    const noseRelative = noseTracker.seen(nose);
    const speed = noseRelative.fromInitial.speed;
    if (Number.isFinite(speed) && !Number.isNaN(speed)) {
      noseSpeed = noseRelative.fromInitial.speed * 200;

    }
  }

  // Return an array of points for each name
  //const mapGet = (...names) => names.map(n => map.get(n));

  // Knee-ankle angle (also need right_hip for context)
  const rightAngle = angleBetweenPoints(right_knee, right_ankle, right_hip);
  const leftAngle = angleBetweenPoints(left_knee, left_ankle, left_hip);

  // Use which ever body side has data
  const kneeAnkleAngle = rightAngle || leftAngle;

  // Wrist-to-wrist distance
  const wristDistance = distanceBetweenPoints(right_wrist, left_wrist);

  // Tilting head to left/right
  const headRotation = CommonPose.pointBalanceX(right_ear, nose, left_ear);

  // Touching a hip: Get shortest distance between either wrist and left hip
  const leftHip = Math.min(
    distanceBetweenPointsOrInfinity(right_wrist, left_hip),
    distanceBetweenPointsOrInfinity(left_wrist, left_hip)
  );

  const rightHip = Math.min(
    // @ts-ignore
    distanceBetweenPointsOrInfinity(right_wrist, right_hip),
    // @ts-ignore
    distanceBetweenPointsOrInfinity(left_wrist, right_hip)
  );

  // Use which ever side of the body has the smallest value
  const handToHip = Math.min(leftHip, rightHip);

  saveState({ wristDistance, handToHip, kneeAnkleAngle, headRotation, noseSpeed });
};


/**
 * Received data from a source
 * @param {Pose[]} poses 
 */
const onData = (poses) => {
  const { processor } = settings;

  // Exit if we didn't get any poses
  if (poses.length === 0) return;
  
  // Try to get the pose with same ID as before.
  /** @type {PoseByKeypoint|undefined} */
  let targetPose;
  if (processor.id) {
    const found = poses.find(p=> p.id === processor.id());
    if (found) targetPose = CommonPose.poseByKeypoint(found);
  }

  // Couldn't find target pose, or we haven't yet processed anything
  if (!targetPose) {
    // Sort poses left to right by the nose keypoint
    const sorted = CommonPose.getSortedPosesByX(poses, `nose`);

    // We want the leftmost pose
    targetPose = CommonPose.poseByKeypoint(/** @type {Pose} */(sorted[0]));
  }

  // Process pose: Sanity check keypoint location, removes low confidence points and smoothes pose
  const processed = /** @type {PoseByKeypoint} */(processor.process(targetPose));
  
  // Update state processed pose
  saveState({ 
    firstPose: processed
  });
};


/**
 * Uses calculations performed in onPoses and updates screen.
 * This function runs in a fast loop
 */
const drawState = () => {
  const { kneeAnkleAngle, wristDistance, headRotation, handToHip, noseSpeed } = state;

  const data = [
    `Knee-ankle angle deg: ${formatRadian(kneeAnkleAngle)}`,
    `Wrist distance: ${format(wristDistance)}`,
    `Head rotation: ${format(headRotation)}`,
    `Hand-to-hip: ${format(handToHip)}`,
    `Nose speed: ${format(noseSpeed)}`
  ];
  const dataAsDivs = data.map(d => `<div>${d}</div>`);
  CommonPose.setHtml(`data`,dataAsDivs.join(``));
  
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

  setInterval(update, settings.updateRateMs);
};
setup();

// #region Toolbox
/**
 * Returns the distance between two points, or `Number.POSITIVE_INFINITY` if either
 * point is missing. This is useful because it can be used with `Math.min/max`.
 * @param {Keypoint|undefined} a 
 * @param {Keypoint|undefined} b 
 * @returns 
 */
function distanceBetweenPointsOrInfinity (a, b) {
  const d = distanceBetweenPoints(a, b);
  if (d === undefined) return Number.POSITIVE_INFINITY;
  return d;
}

/**
 * Returns the distance between two points or 'undefined' if either
 * point is missing
 * @param {Keypoint|undefined} a 
 * @param {Keypoint|undefined} b 
 * @returns 
 */
function distanceBetweenPoints(a, b) {
  // If we're missing either point, return undefined
  if (a === undefined || b === undefined) return;

  return Points.distance(a, b);
}

/**
 * Calculates the interior angle (in radians) between three body parts 
 * @param {Keypoint|undefined} a 
 * @param {Keypoint|undefined} b 
 * @param {Keypoint|undefined} c
 */
function angleBetweenPoints (a, b, c) {
  // If we're missing any point, return undefined
  if (a === undefined || b === undefined || c === undefined) return;

  return Points.angle(a, b, c);
  //return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
}


/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Formats a number
 * @param {number|undefined} v 
 * @returns 
 */
function format(v) {
  if (v === undefined) return `?`;
  return v.toFixed(2);
}

/**
 * Formats radian angle, printing
 * it as degrees
 * @param {number|undefined} v 
 * @returns 
 */
function formatRadian(v) {
  if (v === undefined) return `?`;
  return format(radianToDegree(v ?? 0));
}
/**
 * @typedef { import("../../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../../common-vision-source").Box } Box
 * @typedef { import("../../common-vision-source").Pose } Pose
 * @typedef { import("../common-pose").PoseByKeypoint } PoseByKeypoint
 * 
 */
// #endregion