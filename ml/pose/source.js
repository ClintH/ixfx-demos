/**
 * You probably don't want to be tinkering in here.
 * It's only for adjusting ML parameters or pre-processing.
 * 
 * Key functions
 * * onFrame(): called when an image frame is received from source. It does inferences, and hands it over to `handlePoses()`
 * * onPlayback(): this is called when playback data is received
 * * handlePoses(): this takes in poses from either `onFrame` or `onPlayback`, does some post-processing, drawing and dispatches via remote 
 * * setup() does TFJS initialisation based on settings
 * * postCaptureDraw(): Draws visuals on top of capture canvas
 * 
 * Also supports two URL query parameters to set default settings
 * eg: source.html?model=MoveNet&moveNetModelType=MultiPose.Lightning
 * 
 * Query Parameters:
 * * model: PoseNet, BlazePose
 * * moveNetModelType: MultiPose.Lightning, SinglePose.Lightning, SinglePose.Thunder
 */

// @ts-ignore
import { Remote } from 'https://unpkg.com/@clinth/remote@latest/dist/index.mjs';
import * as CommonSource from '../common-vision-source.js';

const searchParams = new URLSearchParams(window.location.search);

/** 
 * Settings when using MoveNet
 * @type {CommonSource.MoveNetModelConfig} */
const moveNet = {
  // Attempt to link points to separate bodies
  enableTracking: true,
  // Smooth out jitter - doesn't seem to have a meaningful effect so disabled
  enableSmoothing: false,
  // SinglePose.Lightning (default, fastest), SinglePose.Thunder or MultiPose.Lightning
  modelType: searchParams.get(`moveNetModelType`) ?? `SinglePose.Lightning`
};

/** 
 * Settings when using BlazePose
 * @type {CommonSource.BlazePoseModelConfig} */
const blazePose = {
  // See the README.md section on runtimes 
  runtime: `tfjs`,
  enableSmoothing: true,
  modelType: `full` // lite, full, heavy
};

/**
 * Settings when using PoseNet
 * @type {CommonSource.PoseNetEstimateConfig}
 */
const poseNet = {
  maxPoses: 5,
  scoreThreshold: 0.5
};
const settings = Object.freeze({
  /**
   * Which model to use
   */
  model: searchParams.get(`model`) ?? `MoveNet`,
  /**
   * Options for the frame processor
   */
  /** @type {CommonSource.FrameProcessorOpts} */
  frameProcessorOpts: {
    showCanvas: true,
    postCaptureDraw,
    cameraConstraints: {
      facingMode: `user`
    },
  },
  remote: new Remote(),
  playbackRateMs: 50,
  // Visual settings
  view: searchParams.get(`view`),
  lineWidth: 5,
  pointRadius: 10,
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`
});

let state = Object.freeze({
  /**
   * Instantiated detector
   */
  /** @type {CommonSource.PoseDetector|undefined} */
  detector: undefined,
  /**
   * Last set of poses
   */
  /** @type {CommonSource.Pose[]} */
  poses: [],
  /**
   * Last set of poses, normalised
   */
  /** @type {CommonSource.Pose[]} */
  normalised: [],
  /**
   * How quickly to read from source (ms)
   */
  sourceReadMs: 10,
});

/**
 * Called by CommonSource when there is a new image to process
 * @type {CommonSource.OnFrame}
 */
const onFrame = async (frame, frameRect, timestamp_) => {
  const { detector } = state;

  // Get timestamp that ixfx's Video.manualCapture stamps on to ImageData 
  // @ts-ignore
  const timestamp = frame.currentTime ?? timestamp_;

  // Get poses from TensorFlow.js
  /** @type {CommonSource.Pose[]} */
  let poses = settings.model === `PoseNet` ? await detector?.estimatePoses(frame, poseNet) : await detector?.estimatePoses(frame, {}, timestamp);

  // Process them
  handlePoses(poses, frameRect);
};

/**
 * Handles a pose, directly from TFJS or via recorder playback
 * @param {CommonSource.Pose[]} poses 
 * @param {{width:number,height:number}} frameRect 
 */
const handlePoses = (poses, frameRect) => {
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

  updateState({ normalised, poses });

  // Send normalised data via Remote
  if (state.normalised.length > 0) {
    setTimeout(() => settings.remote.broadcast(state.normalised), 0);
  }

  // Update text display
  CommonSource.displayListResults(() => state.poses.map((p, poseIndex) => {
    const poseId = p.id ?? poseIndex;
    return p.score ? `<span style="color: hsl(${getHue(poseId)},100%,50%)">${Math.floor(p.score * 100)}%</span>` : `?`;
  }));

  // Pass data down to be used by recorder, if active
  CommonSource.onRecordData(poses, frameRect);
};

/**
 * Received data via playback
 * @param {CommonSource.Pose[]|CommonSource.ObjectPrediction[]} frame
 * @param {number} index
 * @param {CommonSource.Recording} rec 
 */
const onPlayback = (frame, index, rec) => {
  // Run normalisation and send data as usual...
  handlePoses(/** @type {CommonSource.Pose[]}*/(frame), rec.frameSize);

  // Manually trigger drawing
  // const c = CommonSource.getDrawingContext();
  // if (c === undefined) return;
  // postCaptureDraw(c.ctx, c.width, c.height);
};

async function createDetector() {
  const { model } = settings;

  /** @type {CommonSource.PoseDetectionLib} */
  // @ts-ignore
  // eslint-disable-next-line no-undef
  const pd = poseDetection;

  switch (model) {
  case `PoseNet`:
    CommonSource.status(`PoseNet`);
    CommonSource.enableTextDisplayResults(true);
    return pd.createDetector(model, {
      quantBytes: 4,
      architecture: `MobileNetV1`,
      outputStride: 16,
      inputResolution: { width: 640, height: 480 },
      multiplier: 0.75
    });
  case `BlazePose`:
    if (blazePose.runtime === undefined) blazePose.runtime = `mediapipe`;
    CommonSource.status(`BlazePose (${blazePose.modelType}) on ${blazePose.runtime}`);
    CommonSource.enableTextDisplayResults(false);  // We don't get anything meaningful to show

    if (blazePose.runtime === `mediapipe`) {
      return pd.createDetector(model, {
        ...blazePose,
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162`
      });
    } else if (blazePose.runtime === `tfjs`) {
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

const getHue = (index) => Math.round((parseInt(index)) * 137.508);

/**
 * Called after a frame is captured from the video source.
 * This allows us to draw on top of the frame after it has been analysed.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} width 
 * @param {number} height 
 */
function postCaptureDraw(ctx, width, height) {
  const { poses } = state;

  ctx.font = `12pt ${settings.labelFont}`;

  // Draw each pose
  poses.forEach((pose, poseIndex) => {
    // Generate distinctive hue for each pose
    const poseHue = getHue(pose.id ?? poseIndex);

    // Keep track of points by name
    const map = new Map();

    // Draw each key point as a labelled dot
    pose.keypoints.forEach(kp => {
      const score = kp.score;

      map.set(kp.name, kp);

      ctx.save();
      ctx.translate(kp.x, kp.y);

      // Opacity of dot based on score
      ctx.fillStyle = ctx.strokeStyle = `hsla(${poseHue},100%,30%,${score})`;

      CommonSource.drawDot(ctx, 0, 0, settings.pointRadius, true, false);
      ctx.fillStyle = `black`;
      CommonSource.drawCenteredText(ctx, kp.name ?? `?`, 0, settings.pointRadius * 2);
      ctx.restore();
    });

    // Connect some lines
    ctx.strokeStyle = `hsl(${poseHue}, 50%, 50%)`;
    connectPoints(ctx, map, `right_shoulder`, `left_shoulder`, `left_hip`, `right_hip`, `right_shoulder`);
    connectPoints(ctx, map, `right_ear`, `right_eye`, `nose`, `left_eye`, `left_ear`);
    connectPoints(ctx, map, `left_shoulder`, `left_elbow`, `left_wrist`);
    connectPoints(ctx, map, `right_shoulder`, `right_elbow`, `right_wrist`);
    connectPoints(ctx, map, `right_hip`, `right_knee`, `right_ankle`);
    connectPoints(ctx, map, `left_hip`, `left_knee`, `left_ankle`);
  });
}

/**
 * Draw a series of keypoints
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Map<string,{x:number,y:number}>} map 
 * @param  {...string} names 
 */
const connectPoints = (ctx, map, ...names) => {
  const pts = names.map(n => map.get(n));
  ctx.lineWidth = settings.lineWidth;
  CommonSource.drawLine(ctx, ...pts);
};

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
      settings.frameProcessorOpts.cameraConstraints.deviceId = d.deviceId;
      return true;
    }
  }
  console.log(`Could not find camera matching: ${find}`);
  return false;
};

const setup = async () => {
  // Eg: choose a specific camera
  //await selectCamera(`logitech`);

  await CommonSource.setup(onFrame, onPlayback, settings.frameProcessorOpts, settings.playbackRateMs);
  CommonSource.status(`Loading detector...`);

  // tfjsWasm.setWasmPaths(
  //   `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

  try {
    updateState({ detector: await createDetector() });
    CommonSource.setReady(true);
  } catch (e) {
    CommonSource.status(`Could not load detector: ` + e);
    console.error(e);
    CommonSource.setReady(false);
    return;
  }

  document.getElementById(`btnToggleUi`)?.addEventListener(`click`, evt => {
    const enabled = CommonSource.toggleUi();
    const el = evt.target;
    if (el === null) return;
    /** @type {HTMLButtonElement} */(el).innerText = enabled ? `🔼` : `🔽`;
  });

  // If running in 'min' view mode, hide header
  if (settings.view === `min`) {
    document.querySelector(`.header`)?.classList.add(`hidden`);
  }
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