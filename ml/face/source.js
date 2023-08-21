/**
 * You probably don't want to be tinkering in here.
 * It's only for adjusting ML parameters or pre-processing.
 * 
 * Key functions
 * * onFrame(): called when an image frame is received from source. It does inferences, and hands it over to `handlePredictions()`
 * * onPlayback(): this is called when playback data is received
 * * handlePredictions(): this takes in predictions from either `onFrame` or `onPlayback`, does some post-processing, drawing and dispatches via remote 
 * * setup() does TFJS initialisation based on settings
 * * postCaptureDraw(): Draws visuals on top of capture canvas
 * 
 */
// @ts-ignore
import { Remote } from 'https://unpkg.com/@clinth/remote@latest/dist/index.mjs';
import * as CommonSource from '../common-vision-source.js';
import { shortGuid } from '../../ixfx/random.js';

const searchParameters = new URLSearchParams(window.location.search);

const detectorSettings = Object.freeze({
  runtime: `mediapipe`,
  solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection`
});

const settings = Object.freeze({
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
  remote: new Remote({
    // allowRemote: false, // Uncomment to allow network connections
    // Use id specified in URL, otherwise something random
    peerId: searchParameters.get(`id`) ?? shortGuid()
  }),
  view: searchParameters.get(`view`),
  playbackRateMs: 50,
  // Visual settings
  lineWidth: 5,
  pointRadius: 10,
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`
});

let state = Object.freeze({
  /** @type {CommonSource.FaceDetector|undefined} */
  detector:undefined,
  frameSize: { width: 0, height: 0 },
  /** @type {CommonSource.Face[]} */
  faces: [],
  /** @type {CommonSource.Face[]} */
  normalised: [],
  sourceReadMs: 10
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

  // Get faces from TensorFlow.js
  /** @type {CommonSource.Face[]} */
  const faces = await detector?.estimateFaces(frame, {}, timestamp);

  // Process them
  handleFaces(faces, frameRect);
};

const getHue = (index) => Math.round((index) * 137.508);

/**
 * Handles faces, directly from TFJS or via recorder playback
 * @param {CommonSource.Face[]} faces 
 * @param {{width:number,height:number}} frameRect 
 */
const handleFaces = (faces, frameRect) => {
  const w = frameRect.width;
  const h = frameRect.height;

  // Normalise x,y of key points on 0..1 scale, based on size of source frame
  const normalised = faces.map(face => ({
    ...face,
    keypoints: face.keypoints.map(kp => ({
      ...kp,
      x: kp.x / w,
      y: kp.y / h
    }))
  }));

  saveState({ normalised, faces });

  // Send normalised data via Remote
  if (state.normalised.length > 0) {
    setTimeout(() => settings.remote.broadcast(state.normalised), 0);
  }

  // Update text display
  CommonSource.displayListResults(() => state.faces.map((p, index) => p.score ? `<span style="color: hsl(${getHue(index)},100%,50%)">${Math.floor(p.score * 100)}%</span>` : `?`));

  // Pass data down to be used by recorder, if active
  CommonSource.onRecordData(faces, frameRect);
};

/**
 * Received data via playback
 * @param {CommonSource.Face[]|CommonSource.Pose[]|CommonSource.ObjectPrediction[]} frame
 * @param {number} index
 * @param {CommonSource.Recording} rec 
 */
const onPlayback = (frame, index, rec) => {
  // Run normalisation and send data as usual...
  handleFaces(/** @type {CommonSource.Face[]}*/(frame), rec.frameSize);
};

async function createDetector() {
  // @ts-ignore
  // eslint-disable-next-line no-undef
  const model = faceDetection.SupportedModels.MediaPipeFaceDetector;

  // @ts-ignore
  // eslint-disable-next-line no-undef
  const d = /** @type {CommonSource.FaceDetector} */(await faceDetection.createDetector(model, detectorSettings));
  
  CommonSource.status(`Face (${detectorSettings.runtime})`);
  CommonSource.enableTextDisplayResults(true);
  return d;
}

/**
 * Called after a frame is captured from the video source.
 * This allows us to draw on top of the frame after it has been analysed.
 * @param {CanvasRenderingContext2D} context 
 * @param {number} width 
 * @param {number} height 
 */
function postCaptureDraw(context, width, height) {
  const { faces } = state;

  context.font = `12pt ${settings.labelFont}`;

  // Draw each pose
  for (const [index, face] of faces.entries()) {
    // Generate distinctive hue for each pose
    const poseHue = getHue(index);

    // Keep track of points by name
    const map = new Map();

    // Draw each key point as a labelled dot
    for (const kp of face.keypoints) {
      map.set(kp.name, kp);
      context.fillStyle = context.strokeStyle = `hsl(${poseHue},100%,30%)`;
      
      // Draw a dot for each key point
      CommonSource.drawAbsDot(context, kp, settings.pointRadius, true, false);
    }
  }
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

  await CommonSource.setup(onFrame, onPlayback, settings.frameProcessorOpts, settings.playbackRateMs);
  CommonSource.status(`Loading detector...`);

  try {
    saveState({ detector:await createDetector() });
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
 * Get a search param as a number
 * @param {string} name 
 * @param {number} defaultValue 
 * @returns 
 */
function getNumberParameter(name, defaultValue) {
  const v = searchParameters.get(name);
  if (v === null) return defaultValue;
  return Number.parseInt(v);
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