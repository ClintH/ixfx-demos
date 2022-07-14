/**
 * You probably don't want to be tinkering in here.
 * It's only for adjusting ML parameters or pre-processing.
 * 
 * Variables:
 * * tfSettings: TensorFlow.js specific settings
 * * settings: settings for UI
 * * state: keeps track of changing things
 * 
 * Functions
 * * compute() calls into TensorFlow.js an normalises data
 * * read() the main loop that calls compute(), sends data and calls the display functions
 * * displayTextResults(): update footer status
 * * setup() does TFJS initialisation based on tfSettings
 * * postCaptureDraw(): Draws visuals on top of capture canvas
 */
import {continuously} from '../../../ixfx/flow.js';
import {FrameProcessor} from '../../../ixfx/io.js';
import {defaultErrorHandler} from '../../../ixfx/dom.js';
import {Remote} from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const tfSettings = {
  model: `MoveNet`,
  // Settings when using BlazePose
  /** @type {BlazePoseModelConfig} */
  blazePose: {
    enableSmoothing: true,
    modelType: `full` // lite, full, heavy
  },
  // Settings when using MoveNet
  /** @type {MoveNetModelConfig} */
  moveNet: {
    // Attempt to link points to separate bodies
    enableTracking: false,
    // Smooth out jitter
    enableSmoothing: true,
    // SinglePose.Lightning (default, fastest), SinglePose.Thunder or MultiPose.Lightning
    modelType: `MultiPose.Lightning`
  },
  // See the README.md section on runtimes 
  runtime: `tfjs`
}

const settings = {
  frameProcessor: new FrameProcessor({showCanvas: true, postCaptureDraw}),
  loop: continuously(read),
  remote: new Remote(),
  visDotRadius: 5,
  videoOpacity: 0.9,
  // If the score of a point is below this, it won't connect in a line
  keypointLineThreshold: 0.4,
  keypointShowThresold: 0.3,
  lblStatusEl: document.getElementById(`lblStatus`),
  dataEl: document.getElementById(`data`),
}


let state = {
  detector: undefined,
  frameSize: {width: 0, height: 0},
  /** @type {Pose[]} */
  poses: [],
  sourceReadMs: 10,
  greatestNumberOfPoses: 0,
  freeze: false,
  displayTextResults: true
}

/**
 * Compute inferences
 * @param {ImageData} frame 
 */
const compute = async (frame) => {
  const {detector} = state;

  /** @type {Pose[]} */
  const poses = await detector.estimatePoses(frame, {}, settings.frameProcessor.getTimestamp());

  const w = state.frameSize.width;
  const h = state.frameSize.height;

  // Normalise points on 0..1 scale
  poses.forEach(pose => {
    pose.keypoints = pose.keypoints.map(kp => ({...kp, x: kp.x / w, y: kp.y / h}));
  })
  state.poses = poses;
  console.log(state.poses);

};

const displayTextResults = () => {
  const {dataEl} = settings;
  const {poses, greatestNumberOfPoses} = state;
  let max = Math.max(greatestNumberOfPoses, poses.length);
  let toAdd = max - poses.length;
  const toText = poses.map((p) => `${Math.floor(p.score * 100)}%`);

  // Because we don't want the HTML element jumping up and down in size, 
  // add empty elements so the length is consistent
  for (let i = 0; i < max - poses.length; i++) toText.push('-');

  let html = '<ol>';
  html += toText.map(txt => `<li>${txt}</li>`).join('\n');
  html + '</ol>'
  dataEl.innerHTML = html;
  state.greatestNumberOfPoses = max;
}

const status = (msg) => {
  settings.lblStatusEl.innerText = msg;
}

function read() {

  if (state.freeze) return; // When frozen, skip everything
  const start = performance.now();

  // Request a frame from the source
  const frame = settings.frameProcessor.getFrame();

  // If we haven't yet noted the frame size, do so now
  if (state.frameSize.width === 0) state.frameSize = {width: frame.width, height: frame.height}

  // Compute inferences
  compute(frame);

  // Send data via Remote
  setTimeout(() => settings.remote.broadcast(state.poses), 0);

  // Update text display
  if (state.displayTextResults) displayTextResults();

  // Adjust loop speed based on how quickly we're able to process
  const elapsed = performance.now() - start;
  settings.loop.intervalMs = Math.floor(elapsed * 1.1);
}

async function createDetector() {
  const {model, runtime, blazePose, moveNet} = tfSettings;

  switch (model) {
    case `PoseNet`:
      status(`PoseNet`);
      state.displayTextResults = true;
      return poseDetection.createDetector(model, {
        quantBytes: 4,
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: {width: 500, height: 500},
        multiplier: 0.75
      });
    case `BlazePose`:
      if (settings.runtime === undefined) settings.runtime = 'mediapipe';
      status(`BlazePose (${blazePose.modelType}) on ${runtime}`);
      state.displayTextResults = false; // Don't get overall score or score per-pose
      if (runtime === 'mediapipe') {
        return poseDetection.createDetector(model, {
          runtime,
          modelType,
          solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162`
        });
      } else if (runtime === 'tfjs') {
        return poseDetection.createDetector(
          model, {runtime, ...blazePose});
      } else {
        throw new Error(`Expecting 'mediapipe' or 'tfjs' for tfSettings.runtime`);
      }
    case `MoveNet`:
      state.displayTextResults = true;

      if (moveNet.modelType === undefined) moveNet.modelType = `SinglePose.Lightning`;
      status(`MoveNet (${moveNet.modelType})`);
      if (moveNet.modelType !== `SinglePose.Lightning` && moveNet.modelType !== `SinglePose.Thunder` && moveNet.modelType !== `MultiPose.Lightning`) {
        throw new Error(`Expected settings.modelType to be 'SinglePose.Thunder', 'SinglePose.Lightning' or 'MultiPose.Lightning'. Got ${moveNet.modelType}`);
      }
      return poseDetection.createDetector(model, moveNet);
    default:
      console.error(`Expected tfSettings.model to be 'PoseNet', 'BlazePose' or 'MoveNet'`);
  }
}

// Draw text centered by taking into account its drawn size
const drawCenteredText = (msg, ctx, offsetX, offsetY) => {
  const x = offsetX ?? 0;
  const y = offsetY ?? 0;
  const txt = ctx.measureText(msg);
  ctx.fillText(msg,
    -txt.width / 2 + x,
    -txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent / 2 + y);
  return txt;
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} width 
 * @param {number} height 
 */
function postCaptureDraw(ctx, width, height) {
  const {score, poses} = state;
  const {visDotRadius, videoOpacity, keypointShowThresold} = settings;

  ctx.fillStyle = `rgba(255,255,255,${videoOpacity})`; // Fade out with white
  ctx.fillRect(0, 0, width, height);
  poses.forEach((pose, poseIndex) => {
    // Generate distinctive hue for each pose
    const poseHue = Math.round((poseIndex + 1) * 137.508);
    const map = new Map();
    pose.keypoints.forEach(kp => {
      map.set(kp.name, kp);
      if (kp.score < keypointShowThresold) return;
      ctx.save();
      ctx.translate(kp.x, kp.y);
      ctx.beginPath();
      ctx.arc(0, 0, visDotRadius, 0, Math.PI * 2);

      // Opacity of dot based on score
      ctx.fillStyle = `hsla(${poseHue},100%,30%,${kp.score})`;
      ctx.fill();

      drawCenteredText(kp.name, ctx, 0, visDotRadius + visDotRadius);
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

// Draw a series of points as a connected line
const drawLine = (ctx, ...pts) => {
  let drawn = 0;
  for (let i = 0; i < pts.length; i++) {
    if (pts[i].score < settings.keypointLineThreshold) continue; // Skip low-scoring points
    if (drawn == 0) {
      ctx.moveTo(pts[i].x, pts[i].y);
    } else {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    drawn++;
  }
  ctx.stroke();
}

// Draw a series of keypoints
const drawPoints = (ctx, map, ...names) => {
  const pts = names.map(n => map.get(n));
  drawLine(ctx, ...pts);
}

const setup = async () => {
  const controlsEl = document.getElementById(`controls`);
  const btnCameraStart = document.getElementById(`btnCameraStart`);
  const btnCameraStop = document.getElementById(`btnCameraStop`);
  const btnFreeze = document.getElementById(`btnFreeze`);
  const chkCameraShow = document.getElementById(`chkCameraShow`);

  defaultErrorHandler();
  status(`Loading detector...`);

  // tfjsWasm.setWasmPaths(
  //   `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

  try {
    state.detector = await createDetector();
  } catch (e) {
    status('Could not load detector: ' + e);
    console.error(e);
    return;
  }

  controlsEl.style.display = `block`;
  btnCameraStart.disabled = false;

  btnFreeze.addEventListener(`click`, () => {
    state.freeze = !state.freeze;
  });
  btnCameraStart.addEventListener(`click`, async () => {
    // TFJS can only handle low resolution...
    await settings.frameProcessor.useCamera({
      max: {height: 480, width: 640},
      min: {height: 270, width: 360}
    });
    settings.loop.start();

    btnCameraStart.disabled = true;
    btnCameraStop.disabled = false;
  });
  btnCameraStop.addEventListener(`click`, async () => {
    settings.loop.cancel();
    settings.frameProcessor.dispose();
    settings.frameProcessor = new FrameProcessor();
    btnCameraStart.disabled = false;
    btnCameraStop.disabled = true;
  });
  chkCameraShow.addEventListener(`change`, () => {
    settings.frameProcessor.showCanvas(chkCameraShow.checked);
  });

  settings.frameProcessor.showCanvas(true);
}
setup();



// https://github.com/tensorflow/tfjs-models/blob/676a0aa26f89c9864d73f4c7389ac7ec61e1b8a8/pose-detection/src/types.ts
/**
 * @typedef Keypoint
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} [z]
 * @property {number} [score]
 * @property {string} [name]
 */

/**
 * @typedef Box
 * @type {object}
 * @property {number} width
 * @property {number} height
 * @property {number} xMax
 * @property {number} xMin
 * @property {number} yMax
 * @property {number} yMin
 */

/**
 * @typedef Pose
 * @type {object}
 * @property {Keypoint[]} keypoints
 * @property {number} [score]
 * @property {Box} [box]
 */

/**
 * @typedef BlazePoseModelConfig
 * @type {object}
 * @property {boolean} [enableSmoothing]
 * @property {string} runtime 'mediapipe' or 'tfjs'
 * @property {string} [modelType] 'lite', 'full' or 'heavy'
 */

// https://github.com/tensorflow/tfjs-models/blob/master/pose-detection/src/movenet/types.ts
/**
 * @typedef MoveNetModelConfig
 * @type {object}
 * @property {boolean} [enableSmoothing]
 * @property {string} [modelType] 'SinglePose.Lightning', 'SinglePose.Thunder' or 'MultiPose.Lightning'
 * @property {string} [modelUrl]
 * @property {number} [minPoseScore]
 * @property {number} [multiPoseMaxDimension]
 * @property {boolean} [enableTracking]
 * @property {string} [trackerType] 'keypoint' or 'boundingbox' (default)
 * @property {object} [trackerConfig] See TrackerConfig https://github.com/tensorflow/tfjs-models/blob/master/pose-detection/src/calculators/interfaces/config_interfaces.ts
 */

