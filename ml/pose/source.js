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
 * * id: Id of sender
 */

// @ts-ignore
import { Remote } from 'https://unpkg.com/@clinth/remote@latest/dist/index.mjs';
import * as CommonSource from '../common-vision-source.js';
import { shortGuid } from '../../ixfx/random.js';

const searchParameters = new URLSearchParams(window.location.search);

/** 
 * Settings when using MoveNet
 * @type {CommonSource.MoveNetModelConfig} */
const moveNet = {
  // Attempt to link points to separate bodies
  enableTracking: true,
  // Smooth out jitter - doesn't seem to have a meaningful effect so disabled
  enableSmoothing: false,
  // SinglePose.Lightning (default, fastest), SinglePose.Thunder or MultiPose.Lightning
  modelType: searchParameters.get(`moveNetModelType`) ?? `SinglePose.Lightning`
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
  model: searchParameters.get(`model`) ?? `MoveNet`,
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
  // Create remote instance
  remote: new Remote({
    // allowRemote: false, // Uncomment to allow network connections
    // Use id specified in URL, otherwise something random
    peerId: searchParameters.get(`id`) ?? shortGuid()
  }),
  playbackRateMs: 50,
  // Visual settings
  view: searchParameters.get(`view`),
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
const onFrame = async (frame, frameRect, frameTimestamp) => {
  const { detector } = state;

  // Get timestamp that ixfx's Video.manualCapture stamps on to ImageData 
  // @ts-ignore
  const timestamp = frame.currentTime ?? frameTimestamp;

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
    id: pose.id ?? `1`,
    keypoints: pose.keypoints.map(kp => ({
      ...kp,
      x: kp.x / w,
      y: kp.y / h
    }))
  }));

  saveState({ normalised, poses });

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
 * @param {CommonSource.Pose[]} frame
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
  // @ts-ignore
  await tf.ready();

  console.log(`createDetector model: ${model}`);
  switch (model) {
  case `PoseNet`: {
    CommonSource.status(`PoseNet`);
    CommonSource.enableTextDisplayResults(true);
    return await pd.createDetector(model, {
      quantBytes: 4,
      architecture: `MobileNetV1`,
      outputStride: 16,
      inputResolution: { width: 640, height: 480 },
      multiplier: 0.75
    });
  }
  case `BlazePose`: {
    if (blazePose.runtime === undefined) blazePose.runtime = `mediapipe`;
    CommonSource.status(`BlazePose (${blazePose.modelType}) on ${blazePose.runtime}`);
    CommonSource.enableTextDisplayResults(false);  // We don't get anything meaningful to show

    if (blazePose.runtime === `mediapipe`) {
      return await pd.createDetector(model, {
        ...blazePose,
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162`
      });
    } else if (blazePose.runtime === `tfjs`) {
      return await pd.createDetector(model, blazePose);
    } else {
      throw new Error(`Expecting 'mediapipe' or 'tfjs' for settings.runtime`);
    }
  }
  case `MoveNet`: {
    CommonSource.enableTextDisplayResults(true);

    if (moveNet.modelType === undefined) moveNet.modelType = `SinglePose.Lightning`;
    CommonSource.status(`MoveNet (${moveNet.modelType})`);
    if (moveNet.modelType !== `SinglePose.Lightning` && moveNet.modelType !== `SinglePose.Thunder` && moveNet.modelType !== `MultiPose.Lightning`) {
      throw new Error(`Expected settings.modelType to be 'SinglePose.Thunder', 'SinglePose.Lightning' or 'MultiPose.Lightning'. Got ${moveNet.modelType}`);
    }
    const d = await pd.createDetector(model, moveNet);
    return d;
  }
  default: {
    console.error(`Expected settings.model to be 'PoseNet', 'BlazePose' or 'MoveNet'`);
  }
  }
}

const getHue = (index) => Math.round((Number.parseInt(index)) * 137.508);

/**
 * Called after a frame is captured from the video source.
 * This allows us to draw on top of the frame after it has been analysed.
 * @param {CanvasRenderingContext2D} context 
 * @param {number} width 
 * @param {number} height 
 */
function postCaptureDraw(context, width, height) {
  const { poses } = state;

  context.font = `12pt ${settings.labelFont}`;

  // Draw each pose
  for (const [poseIndex, pose] of poses.entries()) {
    // Generate distinctive hue for each pose
    const poseHue = getHue(pose.id ?? poseIndex);

    // Keep track of points by name
    const map = new Map();

    // Draw each key point as a labelled dot
    for (const kp of pose.keypoints) {
      const score = kp.score;

      map.set(kp.name, kp);

      context.save();
      context.translate(kp.x, kp.y);

      // Opacity of dot based on score
      context.fillStyle = context.strokeStyle = `hsla(${poseHue},100%,30%,${score})`;

      CommonSource.drawAbsDot(context, { x:0, y:0 }, settings.pointRadius, true, false);
      context.fillStyle = `black`;
      CommonSource.drawCenteredText(context, kp.name ?? `?`, 0, settings.pointRadius * 2);
      context.restore();
    }

    // Connect some lines
    context.strokeStyle = `hsl(${poseHue}, 50%, 50%)`;
    connectPoints(context, map, `right_shoulder`, `left_shoulder`, `left_hip`, `right_hip`, `right_shoulder`);
    connectPoints(context, map, `right_ear`, `right_eye`, `nose`, `left_eye`, `left_ear`);
    connectPoints(context, map, `left_shoulder`, `left_elbow`, `left_wrist`);
    connectPoints(context, map, `right_shoulder`, `right_elbow`, `right_wrist`);
    connectPoints(context, map, `right_hip`, `right_knee`, `right_ankle`);
    connectPoints(context, map, `left_hip`, `left_knee`, `left_ankle`);
  }
}

/**
 * Draw a series of keypoints
 * @param {CanvasRenderingContext2D} context 
 * @param {Map<string,{x:number,y:number}>} map 
 * @param  {...string} names 
 */
const connectPoints = (context, map, ...names) => {
  const pts = names.map(n => map.get(n));
  context.lineWidth = settings.lineWidth;
  CommonSource.drawLine(context, ...pts);
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
    if (d.label.toLocaleLowerCase().includes(find)) {
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

  // @ts-ignore
  await CommonSource.setup(onFrame, onPlayback, settings.frameProcessorOpts, settings.playbackRateMs);
  CommonSource.status(`Loading detector...`);

  // tfjsWasm.setWasmPaths(
  //   `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

  try {
    saveState({ detector: await createDetector() });
    CommonSource.setReady(true);
  } catch (error) {
    CommonSource.status(`Could not load detector: ` + error);
    console.error(error);
    CommonSource.setReady(false);
    return;
  }

  document.querySelector(`#btnToggleUi`)?.addEventListener(`click`, event => {
    const enabled = CommonSource.toggleUi();
    const element = event.target;
    if (element === null) return;
    /** @type {HTMLButtonElement} */(element).textContent = enabled ? `🔼` : `🔽`;
  });

  // If running in 'min' view mode, hide header
  if (settings.view === `min`) {
    document.querySelector(`.header`)?.classList.add(`hidden`);
  }
};
setup();

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