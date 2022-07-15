/**
 * Provides some common plumbing for controlling an and using a visual source.
 * 
 * 
 * setup(onFrame, frameProcessorOpts?)
 * * Initialise this module. Must be called before use.
 * * `onFrame` gets called for each frame from a source
 * * (Optional) options when creating the FrameProcessor
 * 
 * setDisplayTextResults(display)
 * * Call to enable/display footer text result display
 * 
 * setReady(ready)
 * * Signals that everything is ready and UI should be enabled
 * * ready should be true/false boolean
 * 
 * displayListResults(fn, numbered?)
 * * If text results are enabled, `fn` is called
 * * `fn` should return an array of strings which are made into a ordered or unordered list
 * 
 * enableTextReults(fn)
 * * If text results are enabled, `fn` is called
 * * `fn` should return HTML to add to footer
 *  
 * status(msg)
 * * Displays a text status message
 * * Send an empty string to hide status
 * 
 * drawDot(ctx, x, y, radius, filled?, stroke?)
 * * Draws a circle
 * 
 * drawCenteredText(ctx, msg, offsetX?, offsetY?)
 * * Draws text centered by its size
 * 
 * drawLine(ctx, ...pts)
 * * Draws a line connecting points {x,y}
 */
import {FrameProcessor} from '../../ixfx/io.js';
import {defaultErrorHandler} from '../../ixfx/dom.js';
import {continuously} from '../../ixfx/flow.js';

const settings = {
  loop: continuously(read),

  /** @type {FrameProcessor|undefined} */
  frameProcessor: undefined,
  /** @type {FrameProcessorOpts} */
  frameProcessorOpts: {showCanvas: true},
  /** @type {OnFrame|undefined} */
  onFrame: undefined,
  /** @type {postCaptureDrawCallback|undefined} */
  postCaptureDrawCallback: undefined,
  // Rendering
  defaultDotRadius: 5,
  videoOpacity: 0.5
}

let state = {
  frameSize: {width: 0, height: 0},
  sourceReadMs: 10,
  freeze: false,
  enableTextResults: true,
  displaySource: true,
  displayData: true,
  lastListCount: 0,
  /** @type {CameraConstraints} */
  cameraConstraints: {
    facingMode: `user`,
    max: {height: 480, width: 640},
    min: {height: 270, width: 360}
  },
}

/**
 * Runs in a loop via `continuously`
 * @returns 
 */
async function read() {
  if (state.freeze) return; // When frozen, skip everything
  const start = performance.now();
  const fp = settings.frameProcessor;

  if (fp !== undefined) {
    // Request a frame from the source
    const frame = fp.getFrame();

    if (frame !== undefined) {
      // If we haven't yet noted the frame size, do so now
      if (state.frameSize.width === 0) state.frameSize = {width: frame.width, height: frame.height}

      // Dispatch frame
      if (settings.onFrame) await settings.onFrame(frame, state.frameSize, fp.getTimestamp());
    }
  }
  // Adjust loop speed based on how quickly we're able to process
  const elapsed = performance.now() - start;
  settings.loop.intervalMs = Math.floor(elapsed * 1.1);
}

/**
 * Display HTML/text results
 * @param {HtmlProducer} htmlFn
 */
export const displayTextResults = (htmlFn) => {
  if (!state.enableTextResults || !state.displayData) return;
  const el = document.getElementById(`cs-data`);
  if (el) el.innerHTML = htmlFn();
}


/**
 * Display a list of string
 * @param {ListProducer} listFn 
 * @param {boolean} numbered If true(default) list will be numbered
 */
export const displayListResults = (listFn, numbered = true) => {
  if (!state.enableTextResults || !state.displayData) return;

  const list = listFn();

  let max = Math.max(state.lastListCount, list.length);
  let toAdd = max - list.length;

  for (let i = 0; i < max - list.length; i++) list.push('&nbsp;');
  let html = numbered ? '<ol>' : '<ul>';
  html += list.map(txt => `<li>${txt}</li>`).join('\n');
  html += numbered ? '</ol>' : '</ul>';

  const el = document.getElementById(`cs-data`);
  if (el) el.innerHTML = html;

  state.lastListCount = max;
}

/**
 * Display text in the status line
 * @param {string} msg 
 */
export const status = (msg) => {
  const el = document.getElementById(`cs-lblStatus`);
  if (el) el.innerText = msg;
}

/**
 * Draws centered text (assuming canvas has been offset already)
 * @param {string} msg 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} offsetX 
 * @param {number} offsetY 
 * @returns 
 */
export const drawCenteredText = (ctx, msg, offsetX, offsetY) => {
  const x = offsetX ?? 0;
  const y = offsetY ?? 0;
  const txt = ctx.measureText(msg);
  ctx.fillText(msg,
    -txt.width / 2 + x,
    -txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent / 2 + y);
  return txt;
}

/**
 * Draws a dot
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius Radius for dot
 * @param {boolean} fill If true, dot is filled-in
 * @param {boolean} stroke If true, dot outline is drawn
 */
export const drawDot = (ctx, x, y, radius = -1, fill = true, stroke = false) => {
  if (radius == -1) radius = settings.defaultDotRadius;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

/**
 * Draw a set of {x,y} pairs as a connected line
 * @param {CanvasRenderingContext2D} ctx 
 * @param  {...{x:number,y:number}} pts 
 */
export const drawLine = (ctx, ...pts) => {
  let drawn = 0;
  for (let i = 0; i < pts.length; i++) {
    if (drawn == 0) {
      ctx.moveTo(pts[i].x, pts[i].y);
    } else {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    drawn++;
  }
  ctx.stroke();
}

export const setReady = (ready) => {

  const btnCameraStart = document.getElementById(`cs-btnCameraStart`);

  document.querySelectorAll('.needs-ready').forEach(el => {
    if (ready) {
      el.classList.add(`ready`);
    } else {
      el.classList.remove(`ready`);
    }
  })
  if (btnCameraStart)  /** @type {HTMLButtonElement}*/(btnCameraStart).disabled = false;
}

const addUi = () => {
  const html = `<div class="cs-ui">
  <div id="cs-lblStatus">Loading...</div>
  <div id="cs-controls" class="needs-ready">
    <div>
      <h2>Camera</h2>
      <select id="cs-cameraSource">
        <option>front</option>
        <option>back</option>
      </select>
      <button disabled id="cs-btnCameraStart">Start</button> <button disabled id="cs-btnCameraStop">Stop</button>
    </div>
    <div>
      <h2>Display</h2>
      <label><input id="cs-chkDataShow" checked type="checkbox"> Data </label>
      <label><input id="cs-chkSourceShow" checked type="checkbox"> Source </label>
      <button id="cs-btnFreeze">Freeze</button>
    </div>
  </div>
</div>
<div id="cs-data"></div>
`;
  document.body.insertAdjacentHTML(`beforeend`, html);

  const css = `
  <style>

  .cs-ui>div {
    margin-bottom: 1em;
  }
  .needs-ready {
    display: none;
  }
  .needs-ready.ready {
    display: block;
  }

  #cs-data {
    position: fixed;
    bottom: 0;
    font-family: var(--mono-font);
    padding: 1em;
    min-width: 6em;
  }

  #cs-controls {
    display: flex;
    gap: 2em;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  #cs-controls button {
    margin-left: 1em;
  }

  #cs-controls select,#cs-controls button {
    padding:0.5em
  }

  #cs-controls h2 {
    text-transform: uppercase;
    font-size: 0.6em;
    letter-spacing: 0.05em;
    display: inline-block;
    width: 5em;
  }

  #cs-controls>div {
    padding: 0.3em;
  }
  .ixfx-capture {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    aspect-ratio: 640 / 480;
    width: 100vw;
  }
  </style>
  `;
  document.body.insertAdjacentHTML(`beforeend`, css);
}

/**
 * Called after a frame is captured from the video source.
 * This allows us to draw on top of the frame after it has been analysed.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} width 
 * @param {number} height 
 */
function postCaptureDraw(ctx, width, height) {
  const {videoOpacity} = settings;

  if (state.displaySource) {
    // Clear canvas with some translucent white to fade out video
    ctx.fillStyle = `rgba(255,255,255,${videoOpacity})`;
  } else {
    // Clear canvas completely white
    ctx.fillStyle = `rgb(255,255,255)`;
  }
  ctx.fillRect(0, 0, width, height);

  if (state.displayData) {
    settings.postCaptureDraw(ctx, width, height);
  }
}

/**
 * 
 * @param {OnFrame} onFrame 
 * @param {FrameProcessorOpts} frameProcessorOpts
 * @param {CameraConstraints} cameraConstraints
 */
export const setup = (onFrame, frameProcessorOpts, cameraConstraints) => {
  addUi();

  const btnCameraStart = document.getElementById(`cs-btnCameraStart`);
  const btnCameraStop = document.getElementById(`cs-btnCameraStop`);
  const btnFreeze = document.getElementById(`cs-btnFreeze`);
  const chkSourceShow = document.getElementById(`cs-chkSourceShow`);
  const chkDataShow = document.getElementById(`cs-chkDataShow`);
  const selCameraSource = document.getElementById(`cs-cameraSource`);
  const dataEl = document.getElementById(`cs-data`);

  settings.onFrame = onFrame;

  // Override default settings with what has been provided
  if (cameraConstraints) {
    state.cameraConstraints = {...state.cameraConstraints, ...cameraConstraints};

    // @ts-ignore
    if (state.cameraConstraints.facingMode === `back`) state.cameraConstraints.facingMode = `environment`;
    // @ts-ignore
    if (state.cameraConstraints.facingMode === `front`) state.cameraConstraints.facingMode = `user`;

    if (selCameraSource) {
      if (state.cameraConstraints.facingMode === `environment`) {
        /** @type {HTMLSelectElement} */(selCameraSource).value = `back`;
      } else if (state.cameraConstraints.facingMode === `user`) {
        /** @type {HTMLSelectElement} */(selCameraSource).value = `front`;
      } else {
        /** @type {HTMLSelectElement} */(selCameraSource).value = state.cameraConstraints.facingMode ?? ``;
      }
    }
  };

  if (frameProcessorOpts !== undefined) {
    settings.frameProcessorOpts = frameProcessorOpts;
  }

  // Intercept drawing
  settings.postCaptureDraw = frameProcessorOpts.postCaptureDraw;
  frameProcessorOpts.postCaptureDraw = postCaptureDraw;

  setReady(false);
  defaultErrorHandler();
  status(`Loading...`);

  btnFreeze?.addEventListener(`click`, evt => {
    state.freeze = !state.freeze;
    const el = evt?.target;
    if (el) /** @type {HTMLElement}*/(el).innerText = state.freeze ? `Unfreeze` : `Freeze`;
  });

  btnCameraStart?.addEventListener(`click`, async () => {
    settings.frameProcessor = new FrameProcessor(settings.frameProcessorOpts);

    console.log(state.cameraConstraints);
    await settings.frameProcessor.useCamera(state.cameraConstraints);
    settings.loop.start();

    /** @type {HTMLButtonElement}*/(btnCameraStart).disabled = true;
    /** @type {HTMLSelectElement}*/(selCameraSource).disabled = true;
    /** @type {HTMLButtonElement}*/(btnCameraStop).disabled = false;
  });

  btnCameraStop?.addEventListener(`click`, async () => {
    settings.loop.cancel();
    settings.frameProcessor?.dispose();
    settings.frameProcessor = undefined;
    if (dataEl) dataEl.innerHTML = ``;

    /** @type {HTMLButtonElement}*/(btnCameraStart).disabled = false;
    /** @type {HTMLSelectElement}*/(selCameraSource).disabled = false;
    /** @type {HTMLButtonElement}*/(btnCameraStop).disabled = true;
  });

  chkSourceShow?.addEventListener(`change`, () => {
    state.displaySource = !state.displaySource;

    const showCanvas = state.displaySource || state.displayData;
    settings.frameProcessor?.showCanvas(showCanvas);
  });

  chkDataShow?.addEventListener(`change`, () => {
    state.displayData = /** @type {HTMLInputElement} */(chkDataShow).checked;
    if (dataEl) dataEl.style.display = state.displayData ? `block` : `none`;
  });

  selCameraSource?.addEventListener(`change`, () => {
    const v = /** @type {HTMLSelectElement} */(selCameraSource).value;
    if (v === `back`) state.cameraConstraints.facingMode = `environment`;
    else if (v === `front`) state.cameraConstraints.facingMode = `user`;
  });
}

/**
 * Enable or disable footer text display
 * @param {boolean} v 
 */
export const enableTextDisplayResults = (v) => {
  state.enableTextResults = v;
}

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

/**
 * @typedef FrameProcessorOpts
 * @type {object}
 * @property {boolean} [showCanvas] If true, the CANVAS element images are grabbed to is shown. (default: false)
 * @property {boolean} [showPreview] If true, the source element is shown (for a camera this is a VIDEO element).
 * @property {postCaptureDrawCallback} [postCaptureDraw] If set, this function is run after capturing, allowing for drawing on top of capture
*/

/**
 * @callback postCaptureDrawCallback
 * @param {CanvasRenderingContext2D} ctx Drawing canvas
 * @param {number} width Width of canvas
 * @param {number} height Height of canvas
 */

/**
 * @callback ListProducer
 * @return {string[]} list
 */
/**
 * @callback HtmlProducer
 * @return {string} html
 */
/**
 * @callback OnFrame
 * @param {ImageData} frame
 * @param {{width:number,height:number}} frameSize
 * @param {number} timestamp
 * @returns {Promise<void>}
 */

 //detector?.estimatePoses(frame, {}, settings.frameProcessor.getTimestamp());

/**
 * @typedef PoseDetector
 * @type {object}
 * @property {PoseDetectorEstimatePoses} estimatePoses
 */

/**
 * @typedef PoseDetectorEstimatePoses
 * @type {function}
 * @param {ImageData} frame
 * @param {any} options
 * @param {number} timestamp
 */

/**
 * @typedef {object} PoseDetectionLib
 * @property {createDetector} createDetector
 */

/**
 * @callback createDetector
 * @param {string} model
 * @param {any} args
 * @returns {PoseDetector}
 */

/**
 * @typedef CameraConstraints
 * @type {object}
 * @property {('user'|'environment')} [facingMode]
 * @property {{width:number,height:number}} [min]
 * @property {{width:number,height:number}} [max]
 */