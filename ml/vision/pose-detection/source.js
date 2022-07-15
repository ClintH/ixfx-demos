/**
 * You probably don't want to be tinkering in here.
 * It's only for adjusting ML parameters or pre-processing.
 * 
 * Functions
 * * compute() calls into TensorFlow.js an normalises data
 * * read() the main loop that calls compute(), sends data and calls the display functions
 * * setup() does TFJS initialisation based on settings, moveNet/blazePose
 * * postCaptureDraw(): Draws visuals on top of capture canvas
 */

// @ts-ignore
import {Remote} from 'https://unpkg.com/@clinth/remote@latest/dist/index.mjs';
import * as CommonSource from '../common-source.js';

// Settings when using MoveNet
/** @type {CommonSource.MoveNetModelConfig} */
const moveNet = {
  // Attempt to link points to separate bodies
  enableTracking: false,
  // Smooth out jitter
  enableSmoothing: true,
  // SinglePose.Lightning (default, fastest), SinglePose.Thunder or MultiPose.Lightning
  modelType: `MultiPose.Lightning`
};

// Settings when using BlazePose
/** @type {CommonSource.BlazePoseModelConfig} */
const blazePose = {
  // See the README.md section on runtimes 
  runtime: `tfjs`,
  enableSmoothing: true,
  modelType: `full` // lite, full, heavy
};

const settings = {
  model: `MoveNet`,
  /** @type {CommonSource.FrameProcessorOpts} */
  frameProcessorOpts: {showCanvas: true, postCaptureDraw},
  /** @type {CommonSource.CameraConstraints} */
  cameraConstraints: {facingMode: `user`},
  remote: new Remote(),
  // If the score of a point is below this, it won't connect in a line
  keypointLineThreshold: 0.3,
  keypointShowThresold: 0.3,
}

let state = {
  /** @type {CommonSource.PoseDetector|undefined} */
  detector: undefined,
  /** @type {CommonSource.Pose[]} */
  poses: [],
  sourceReadMs: 10,
}

/**
 * Called by CommonSource when there is a new image to process
 * @type {CommonSource.OnFrame}
 */
const onFrame = async (frame, frameRect, timestamp) => {
  const {detector} = state;

  /** @type {CommonSource.Pose[]} */
  const poses = await detector?.estimatePoses(frame, {}, timestamp);

  const w = frameRect.width;
  const h = frameRect.height;

  // Normalise x,y of key points on 0..1 scale, based on size of source frame
  const normalised = poses.map(pose => ({
    ...pose,
    keypoints: pose.keypoints.map(kp => ({
      ...kp,
      x: kp.x / w,
      y: kp.y / h
    }))
  }));
  state.normalised = normalised;
  state.poses = poses;

  // Send normalised data via Remote
  setTimeout(() => settings.remote.broadcast(state.normalised), 0);

  // Update text display
  CommonSource.displayListResults(() => state.poses.map((p) => p.score ? `${Math.floor(p.score * 100)}%` : `?`));
}

async function createDetector() {
  const {model} = settings;

  /** @type {CommonSource.PoseDetectionLib} */
  // @ts-ignore
  const pd = poseDetection;

  switch (model) {
    case `PoseNet`:
      CommonSource.status(`PoseNet`);
      CommonSource.enableTextDisplayResults(true);
      return pd.createDetector(model, {
        quantBytes: 4,
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: {width: 500, height: 500},
        multiplier: 0.75
      });
    case `BlazePose`:
      if (blazePose.runtime === undefined) settings.runtime = 'mediapipe';
      CommonSource.status(`BlazePose (${blazePose.modelType}) on ${blazePose.runtime}`);
      CommonSource.enableTextDisplayResults(false);  // We don't get anything meaningful to show

      if (blazePose.runtime === 'mediapipe') {
        return pd.createDetector(model, {
          ...blazePose,
          solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162`
        });
      } else if (blazePose.runtime === 'tfjs') {
        return pd.createDetector(model, blazePose);
      } else {
        throw new Error(`Expecting 'mediapipe' or 'tfjs' for settings.runtime`);
      }
    case `MoveNet`:
      CommonSource.enableTextDisplayResults(true);

      if (moveNet.modelType === undefined) moveNet.modelType = `SinglePose.Lightning`;
      CommonSource.status(`MoveNet (${moveNet.modelType})`);
      if (moveNet.modelType !== `SinglePose.Lightning` && moveNet.modelType !== `SinglePose.Thunder` && moveNet.modelType !== `MultiPose.Lightning`) {
        throw new Error(`Expected settings.modelType to be 'SinglePose.Thunder', 'SinglePose.Lightning' or 'MultiPose.Lightning'. Got ${moveNet.modelType}`);
      }
      return pd.createDetector(model, moveNet);
    default:
      console.error(`Expected settings.model to be 'PoseNet', 'BlazePose' or 'MoveNet'`);
  }
}

/**
 * Called after a frame is captured from the video source.
 * This allows us to draw on top of the frame after it has been analysed.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} width 
 * @param {number} height 
 */
function postCaptureDraw(ctx, width, height) {
  const {poses} = state;

  // Draw each pose
  poses.forEach((pose, poseIndex) => {
    // Generate distinctive hue for each pose
    const poseHue = Math.round((poseIndex + 1) * 137.508);

    // Keep track of points by name
    const map = new Map();

    // Draw each key point as a labelled dot
    pose.keypoints.forEach(kp => {
      map.set(kp.name, kp);

      ctx.save();
      ctx.translate(kp.x, kp.y);

      // Opacity of dot based on score
      ctx.fillStyle = `hsla(${poseHue},100%,30%,${kp.score})`;
      CommonSource.drawDot(ctx, 0, 0, 5);

      CommonSource.drawCenteredText(ctx, kp.name ?? `?`, 0, 10);
      ctx.restore();
    });

    // Connect some lines
    ctx.strokeStyle = `hsl(${poseHue}, 50%, 50%)`;
    drawPoints(ctx, map, `right_shoulder`, `left_shoulder`, `left_hip`, `right_hip`, `right_shoulder`);
    drawPoints(ctx, map, `right_ear`, `right_eye`, `nose`, `left_eye`, `left_ear`);
    drawPoints(ctx, map, `left_shoulder`, `left_elbow`, `left_wrist`);
    drawPoints(ctx, map, `right_shoulder`, `right_elbow`, `right_wrist`);
    drawPoints(ctx, map, `right_hip`, `right_knee`, `right_ankle`);
    drawPoints(ctx, map, `left_hip`, `left_knee`, `left_ankle`);
  });
};

// Draw a series of keypoints
const drawPoints = (ctx, map, ...names) => {
  const pts = names.map(n => map.get(n));
  CommonSource.drawLine(ctx, ...pts);
}

/**
 * Find a camera by its label
 * @param {string} find 
 * @returns 
 */
const selectCamera = async (find) => {
  find = find.toLocaleLowerCase();
  const devices = await navigator.mediaDevices.enumerateDevices();
  for (const d of devices) {
    if (d.kind !== `videoinput`) continue;
    if (d.label.toLocaleLowerCase().indexOf(find) >= 0) {
      settings.cameraConstraints.deviceId = d.deviceId;
      return true;
    }
  }
  console.log(`Could not find camera matching: ${find}`);
  return false;
}

const setup = async () => {
  // Eg: choose a specific camera
  await selectCamera(`logitech`);

  await CommonSource.setup(onFrame, settings.frameProcessorOpts, settings.cameraConstraints);
  CommonSource.status(`Loading detector...`);

  // tfjsWasm.setWasmPaths(
  //   `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

  try {
    state.detector = await createDetector();
    CommonSource.setReady(true);
  } catch (e) {
    CommonSource.status('Could not load detector: ' + e);
    console.error(e);
    CommonSource.setReady(false);
    return;
  }
}
setup();

