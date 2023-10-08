// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import { Points } from '../../../ixfx/geometry.js';
import {Bipolar, interpolate } from '../../../ixfx/data.js';
import {fullSizeCanvas} from '../../../ixfx/dom.js';
import * as Coco from '../../lib/Coco.js';
import * as Types from '../../lib/Types.js';
import { PosesTracker } from "../PosesTracker.js";
import {PoseTracker} from "../PoseTracker.js";
import * as Things from './thing.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // How often to compute data from poses & update thing
  updateSpeedMs: 100,
  // How much to push toward 0 neutral position
  tiltDecay: 0.01,
  // How much of computed angle to fold in
  angleAmount: 0.1,
  // Empirically-discovered min angle
  tiltMin: -0.5,
  // Empirically-discovered max angle
  tiltMax: 0.5,
  remote: new Remote(),
  poses: new PosesTracker({maxAgeMs: 2000 }),
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
    min:0, max: 0,
    center: { x: 0, y: 0 },
  },
  // Bipolar value: -1...1
  tilt:0
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { bounds, thing, tilt } = state;
  const context = Util.getDrawingContext();

  Util.textContent(`#info`, tilt);

  context.fillStyle = `hsl(220, 100%, 90%)`;
  context.fillRect(0,0,bounds.width,bounds.height);
  
  Things.use(thing, context, bounds);
};

const update = () => {
  const { poses, angleAmount, tiltMax, tiltMin, tiltDecay } = settings;
  let { tilt } = state;

  // Calculate change in tilt
  let angleTotal = 0;
  let counted = 0;
  for (const pose of poses.getValues()) {
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
    const angleAverage = angleTotal/counted;
  
    // Interpolate toward average of all poses
    tilt = interpolate(angleAmount, tilt, angleAverage);
  }

  // Push toward 0 (neutral)
  tilt = Bipolar.towardZero(tilt, tiltDecay);

  // Save
  saveState({ tilt });
};

/**
 * Return angle (in radians) between left and right shoulder
 * @param {Types.Pose} pose 
 */
const computeShoulderAngle = (pose) => {
  const left = Coco.getKeypoint(pose, `left_shoulder`);
  const right = Coco.getKeypoint(pose, `right_shoulder`);
  const angleRadians = Points.angle(left, right);
  return angleRadians;
};

/**
 * Called when a new pose is detected
 * @param {*} event 
 */
const onPoseAdded = (event) => {
  const poseTracker = /** @type PoseTracker */(event.detail);
  console.log(`Pose added: ${poseTracker.guid}`);
};

/**
 * Called when a pose is no longer being tracked
 * @param {*} event 
 */
const onPoseExpired = (event) => {
  const poseTracker = /** @type PoseTracker */(event.detail);
  console.log(`Pose expired: ${poseTracker.guid}`);
};


function setup() {
  const { remote, poses } = settings;
  remote.onData = onReceivedPoses;
  poses.events.addEventListener(`added`, onPoseAdded);
  poses.events.addEventListener(`expired`, onPoseExpired);

  // Automatically size canvas to viewport
  fullSizeCanvas(`#canvas`, onResized => {
    saveState({ bounds: onResized.bounds });
  });

  // Update
  setInterval(() => {
    // Update main state
    update();
    // Update thing
    saveState({ 
      thing: Things.update(state.thing, state)
    });
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
function onReceivedPoses (packet) {
  const { _from, data } = packet;
  const poseData =/** @type Types.Pose[] */(data);
  
  // Pass each pose over to the poses tracker
  for (const pose of poseData) {
    settings.poses.seen(_from, pose);
  }
};

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

