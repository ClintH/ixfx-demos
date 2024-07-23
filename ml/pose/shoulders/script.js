// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { Points } from '../../../ixfx/geometry.js';
import { Bipolar, interpolate } from '../../../ixfx/numbers.js';
import * as Dom from '../../../ixfx/dom.js';
import * as MoveNet from "../Poses.js";
import * as Things from './thing.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // How often to compute data from poses & update thing
  updateSpeedMs: 10,
  // How much to push toward 0 neutral position
  tiltDecay: 0.001,
  // How much of computed angle to fold in
  angleAmount: 0.003,
  // Empirically-discovered min angle
  tiltMin: -0.5,
  // Empirically-discovered max angle
  tiltMax: 0.5,
  remote: new Remote(),
  poses: new MoveNet.PosesTracker({ maxAgeMs: 2000 }),
  dataDisplay: new Dom.DataDisplay()

});

/** 
 * @typedef {{
 *  tilt:number
 *  thing: Things.Thing
 *  bounds: import('./util.js').Bounds
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  thing: Things.create(),
  bounds: {
    width: 0, height: 0,
    min: 0, max: 0,
    center: { x: 0, y: 0 },
  },
  // Bipolar value: -1...1
  tilt: 0
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { bounds, thing, tilt } = state;
  const context = Util.getDrawingContext();

  Util.textContent(`#info`, tilt);

  context.fillStyle = `hsl(220, 100%, 90%)`;
  context.fillRect(0, 0, bounds.width, bounds.height);

  Things.use(thing, context, bounds);
};

const update = () => {
  const { poses, angleAmount, tiltMax, tiltMin, tiltDecay } = settings;
  let { tilt, thing } = state;

  // Calculate change in tilt
  let angleTotal = 0;
  let counted = 0;
  for (const pose of poses.get()) {
    let a = computeShoulderAngle(pose); // Note: angle is in radians, not degrees

    // Skip cases where we can't compute angle (eg missing keypoints)
    if (Number.isNaN(a)) continue;

    // Scale to bipolar -1 to 1 scale
    a = Bipolar.scale(a, tiltMin, tiltMax);

    // Add up to get average for all poses
    angleTotal += a;
    counted++;
  }

  // Interpolate if we have the data
  if (counted > 0) {
    const angleAverage = angleTotal / counted;

    // Interpolate toward average of all poses
    tilt = interpolate(angleAmount, tilt, angleAverage);
  }

  // Push toward 0 (neutral)
  tilt = Bipolar.towardZero(tilt, tiltDecay);


  // Update thing
  thing = Things.update(state.thing, state);

  // Save
  saveState({ tilt, thing });

  // For debug purposes, dump data to a table
  settings.dataDisplay.update(thing);
};

/**
 * Return angle (in radians) between left and right shoulder
 * @param {MoveNet.PoseTracker} pose 
 */
const computeShoulderAngle = (pose) => {
  const left = pose.keypoint(`left_shoulder`);
  const right = pose.keypoint(`right_shoulder`);
  const angleRadians = Points.angle(left, right);
  return angleRadians;
};

/**
 * Called when a new pose is detected
 * @param {*} event 
 */
const onPoseAdded = (event) => {
  const poseTracker = /** @type MoveNet.PoseTracker */(event.detail);
  console.log(`Pose added: ${poseTracker.guid}`);
};

/**
 * Called when a pose is no longer being tracked
 * @param {*} event 
 */
const onPoseExpired = (event) => {
  const poseTracker = /** @type MoveNet.PoseTracker */(event.detail);
  console.log(`Pose expired: ${poseTracker.guid}`);
};


function setup() {
  const { remote, poses } = settings;
  remote.onData = onReceivedPoses;
  poses.events.addEventListener(`added`, onPoseAdded);
  poses.events.addEventListener(`expired`, onPoseExpired);

  // Automatically size canvas to viewport
  Dom.fullSizeCanvas(`#canvas`, onResized => {
    saveState({ bounds: onResized.bounds });
  });

  // Update
  setInterval(() => {
    update();
  }, settings.updateSpeedMs);

  // Draw loop
  const animationLoop = () => {
    use();
    window.requestAnimationFrame(animationLoop);
  };
  window.requestAnimationFrame(animationLoop);

};

setup();

/**
 * Called when we receive data
 * @param {*} packet 
 */
function onReceivedPoses(packet) {
  const { _from, data } = packet;
  const poseData =/** @type MoveNet.Pose[] */(data);

  // Pass each pose over to the poses tracker
  for (const pose of poseData) {
    settings.poses.seen(_from, pose);
  }
};

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

