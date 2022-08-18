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
 * Also supports two URL query parameters to set default settings
 * eg: source.html?base=mobilenet_v2&maxNumBoxes=1
 * 
 * Query Parameters:
 * * base: 'lite_mobilenet_v2' or 'mobilenet_v2' (default: lite_mobilenet_v2)
 * * maxNumBoxes: maximum number of objects (default: 20)
 * * minScore: minimum score for an object (default: 0.5)
 * 
 * More info on COCO-SSD:
 * https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd
 */
// @ts-ignore
import { Remote } from 'https://unpkg.com/@clinth/remote@latest/dist/index.mjs';
import { Rects } from '../../ixfx/geometry.js';
import * as CommonSource from '../common-vision-source.js';

const searchParams = new URLSearchParams(window.location.search);

const cocoSsdSettings = Object.freeze({
  // lite_mobilenet_v2: fastest and smallest download
  // mobilenet_v2: most accurate
  base: searchParams.get(`base`) ?? `lite_mobilenet_v2`,
  // Maximum number of objects
  maxNumBoxes: getNumberParam(`maxNumBoxes`, 20),
  // Minimum score (0..1)
  minScore:getNumberParam(`minScore`, 0.5)
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
  remote: new Remote(),
  playbackRateMs: 50,
  // Visual settings
  lineWidth: 5,
  pointRadius: 10,
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`
});

let state = Object.freeze({
  /** @type {CommonSource.ObjectDetector|undefined} */
  detector:undefined,
  frameSize: { width: 0, height: 0 },
  /** @type {CommonSource.ObjectPrediction[]} */
  predictions: [],
  /** @type {CommonSource.ObjectPrediction[]} */
  normalised: [],
  sourceReadMs: 10,
  greatestNumberOfPredictions: 0,
  classHues: new Map()
});

/**
 * Gets a hue for a given class.
 * @param {string} className 
 */
const getClassHue = (className) => {
  const { classHues } = state;
  let c = classHues.get(className);
  if (c === undefined) {
    // Generate a random hue based on the total number of seen objects
    c = Math.round(([ ...classHues.keys() ].length) * 137.508);
    classHues.set(className, c);
  }
  return c;
};

/**
 * Called by CommonSource when there is a new image to process
 * @type {CommonSource.OnFrame}
 */
const onFrame = async (frame, frameRect, timestamp_) => {
  const { detector } = state;
  const { frameSize } = state;

  if (!detector) return;

  const predictions = await detector.detect(
    frame, 
    cocoSsdSettings.maxNumBoxes, 
    cocoSsdSettings.minScore
  );

  // Process them
  handlePredictions(predictions, frameRect);
};

/**
 * Handles a pose, directly from TFJS or via recorder playback
 * @param {CommonSource.ObjectPrediction[]} predictions 
 * @param {{width:number,height:number}} frameRect 
 */
const handlePredictions = (predictions, frameRect) => {
  const w = frameRect.width;
  const h = frameRect.height;

  // Create normalised version of predictions
  const normalised = predictions.map(p => {
    const bbox = Rects.fromNumbers(...p.bbox);
    return {
      ...p,
      bbox: Rects.toArray(Rects.normaliseByRect(bbox, w, h))
    };
  });

  // Update state
  // @ts-ignore
  updateState({ predictions, normalised });

  // Send normalised data via Remote
  if (state.normalised.length > 0) {
    setTimeout(() => settings.remote.broadcast(state.normalised), 0);
  }

  // Update text display
  CommonSource.displayListResults(() => 
    state.predictions.map(
      (p) => p.score ? `<span style="color: hsl(${getClassHue(p.class)},90%,40%)">${p.class} ${Math.floor(p.score * 100)}%</span>` : `?`));

  // Pass data down to be used by recorder, if active
  CommonSource.onRecordData(predictions, frameRect);
};


/**
 * Received data via playback
 * @param {CommonSource.ObjectPrediction[]|CommonSource.Pose[]} frame
 * @param {number} index
 * @param {CommonSource.Recording} rec 
 */
const onPlayback = (frame, index, rec) => {
  // Run normalisation and send data as usual...
  handlePredictions(/** @type {CommonSource.ObjectPrediction[]} */(frame), rec.frameSize);

  // Manually trigger drawing
  // const c = CommonSource.getDrawingContext();
  // if (c === undefined) return;
  // postCaptureDraw(c.ctx, c.width, c.height);
};

async function createDetector() {
  // @ts-ignore
  // eslint-disable-next-line no-undef
  const d = /** @type {CommonSource.ObjectDetector} */(await cocoSsd.load(cocoSsdSettings));
  
  CommonSource.status(`COCO-SSD (${cocoSsdSettings.base})`);
  CommonSource.enableTextDisplayResults(true);
  return d;
}

/**
 * Called after a frame is captured from the video source.
 * This allows us to draw on top of the frame after it has been analysed.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} width 
 * @param {number} height 
 */
function postCaptureDraw(ctx, width, height) {
  const { predictions } = state;

  ctx.font = `12pt ${settings.labelFont}`;
  ctx.lineWidth = 3;

  // Draw each prediction bounding box
  predictions.forEach(p => {
    // Use colour we've associated with the prediction class
    const hue = getClassHue(p.class);
    ctx.fillStyle = ctx.strokeStyle = `hsla(${hue}, 100%, 40%, 0.8)`;

    let x = p.bbox[0];
    let y = p.bbox[1];
    let w = p.bbox[2];
    let h = p.bbox[3];
    ctx.strokeRect(x, y, w, h);
    ctx.textBaseline = `top`;
    ctx.fillText(`${p.class} (${Math.round(p.score*100)}%)`, x + 2, y + 2);
  });
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
    updateState({ detector:await createDetector() });
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
};
setup();

/**
 * Get a search param as a number
 * @param {string} name 
 * @param {number} defaultValue 
 * @returns 
 */
function getNumberParam(name, defaultValue) {
  const v = searchParams.get(name);
  if (v === null) return defaultValue;
  return parseInt(v);
}

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