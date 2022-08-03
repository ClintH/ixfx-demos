// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { Points, radianToDegree } from '../../../ixfx/geometry.js';

const settings = Object.freeze({
  keypointScoreThreshold: 0.4,
  remote: new Remote(),
});

let state = Object.freeze({
  /** @type {Pose[]} */
  poses: [],
  /** @type {number|undefined} */
  kneeAnkleAngle: undefined,
  /** @type {number|undefined} */
  wristDistance: undefined,
  /** @type {number|undefined} */
  headRotation: undefined,
  /** @type {number|undefined} */
  handToHip: undefined,
});

/**
 * Received poses
 * @param {Pose[]} poses 
 */
const onPoses = (poses) => {
  updateState({ poses  });

  // Need at least one pose
  if (poses.length === 0) return;

  // Juse use the first pose
  const p = poses[0];

  // Create a map of points so we can access them by name
  const map = mapKeypoints(p);
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
  const headRotation = pointBalance(...mapGet(`right_ear`, `nose`, `left_ear`));

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
  const handToHip = Math.min(leftHip, rightHip);


  // Speed of elbow movement

  updateState({ wristDistance, handToHip, kneeAnkleAngle, headRotation });
};

/**
 * Map keypoints so we can access them by name
 * @param {Pose} pose 
 * @returns {Map<string,Keypoint>}
 */
const mapKeypoints = (pose) => {
  const m = new Map();
  pose.keypoints.forEach(kp => m.set(kp.name, kp));
  return m;
};

const update = () => {

};

/**
 * Uses calculates performed in onPoses and updates screen.
 * This function runs in a fast loop
 */
const draw = () => {
  const { kneeAnkleAngle, wristDistance, headRotation, handToHip } = state;

  // Ankle-knee-hip angle
  const kneeAnkleAngleDeg = kneeAnkleAngle === undefined ? `?` : radianToDegree(kneeAnkleAngle).toString();
  /** @type {HTMLElement} */(document.getElementById(`dataAngle`)).innerText = kneeAnkleAngleDeg;

  // Wrist-to-wrist distance
  /** @type {HTMLElement} */(document.getElementById(`dataDistance`)).innerText = wristDistance?.toString() ?? `?`;

  // Head rotation
  /** @type {HTMLElement} */(document.getElementById(`dataHeadRotation`)).innerText = headRotation?.toString() ?? `?`;

  // Either hand-to-hip distance
  /** @type {HTMLElement} */(document.getElementById(`dataHandToHip`)).innerText = handToHip?.toString() ?? `?`;
};

/**
 * Returns the x-axis 'balance' of point `b` between `a` and `c`.
 * Return value of:
 * * 0.5 means `b` is in the middle.
 * * 0 means `b` is very close to `a`
 * * 1 means `b` is very close to `c`
 *  
 * @param {Keypoint|undefined} a 
 * @param {Keypoint|undefined} b 
 * @param {Keypoint|undefined} c 
 * @returns 
 */
const pointBalance = (a, b, c) => {
  // If we're missing any point, return undefined
  if (a === undefined || b === undefined || c === undefined) return;

  const distToA = Points.distance(a, b);

  if (b.x < a.x) return 0;
  if (b.x > c.x) return 1;

  const total = Points.distance(a, c);
  return distToA / total;
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
      onPoses(d.data);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Continually update & redraw
  const loop = () => {
    update();
    draw();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);

  document.getElementById(`btnCloseFrame`)?.addEventListener(`click`, evt => {
    document.getElementById(`sourceSection`)?.remove();
    const el = evt.target;
    if (el) /** @type {HTMLElement} */(el).remove(); // Remove button too
  });
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
 * @typedef { import("../common-source").Keypoint } Keypoint
 * @typedef { import("../common-source").Box } Box
 * @typedef { import("../common-source").Pose } Pose
 */
