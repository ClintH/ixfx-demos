/**
 * Provides some common plumbing for controlling an and using a visual source.
 * 
 * 
 * setup(onFrame, onPlayback?, frameProcessorOpts?, playbackRateMs?)
 * * Initialise this module. Must be called before use.
 * * `onFrame` gets called for each frame from a source
 * * (Optional) Callback for handling playback data
 * * (Optional) options when creating the FrameProcessor
 * * (Optional) Delay between frames when playing back data
 *
 * startRecorderPlayback()
 *  * Trigger playback of user-selected recording
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
import { FrameProcessor } from '../ixfx/io.js';
import { Camera, VideoFile } from '../ixfx/io.js';
import { defaultErrorHandler } from '../ixfx/dom.js';
import { continuously, throttle, interval } from '../ixfx/flow.js';
import { Points } from '../ixfx/geometry.js';

// Settings determined by caller
const caller = {
  /** @type {FrameProcessor|undefined} */
  frameProcessor: undefined,
  /** @type {OnFrame|undefined} */
  onFrame: undefined,
  /** @type {OnPlayback|undefined} */
  onPlayback: undefined,
  /** @type {postCaptureDrawCallback|undefined} */
  postCaptureDrawCallback: undefined,
  playbackRateMs: 1000,
  /** @type {FrameProcessorOpts} */
  frameProcessorOpts: {
    showCanvas: true,
    cameraConstraints: {
      facingMode: `user`,
      max: { height: 480, width: 640 },
      min: { height: 270, width: 360 }
    }
  },
};

const settings = Object.freeze({
  loopRecorderPlayback: true,
  loop: continuously(read),
  // Rendering
  defaultDotRadius: 5,
  videoOpacity: 0.5,
  // Don't record every frame - use a minimum rate
  recordThrottle: throttle((_elapsedMs, data, frameSize) => {
    recordDataImpl(data, frameSize);
  }, 20)
});

let state = Object.freeze({
  frameSize: { width: 0, height: 0 },
  /** @type {number} */
  sourceReadMs: 10,
  /** @type {boolean} */
  freeze: false,
  /** @type {boolean} */
  enableTextResults: true,
  /** @type {boolean} */
  displaySource: true,
  /** @type {boolean} */
  displayData: true,
  /** @type {number} */
  lastListCount: 0,
  /** @type {boolean} */
  uiVisible: true,
  /** @type {``|`recording`|`playing`} */
  recorder: ``,
  /** @type {Recording|undefined} */
  currentRecording: undefined,
  /** @type {'none'|'camera'|'recording'} */
  currentSource: `none`
});

/**
 * Runs in a loop via `continuously`
 * @returns 
 */
async function read() {
  if (state.freeze) return; // When frozen, skip everything
  const start = performance.now();
  const fp = caller.frameProcessor;

  if (fp !== undefined) {
    // Request a frame from the source
    const frame = fp.getFrame();

    if (frame !== undefined) {
      // If we haven't yet noted the frame size, do so now
      if (state.frameSize.width === 0) saveState({ frameSize: { width: frame.width, height: frame.height } });

      // Dispatch frame
      if (caller.onFrame) await caller.onFrame(frame, state.frameSize, fp.getTimestamp());
    }
  }
  // Adjust loop speed based on how quickly we're able to process
  const elapsed = performance.now() - start;
  settings.loop.interval = Math.floor(elapsed * 1.1);
}


/**
 * Display HTML/text results
 * @param {HtmlProducer} htmlFunction
 */
export const displayTextResults = (htmlFunction) => {
  if (!state.enableTextResults || !state.displayData) return;
  const element = document.querySelector(`#cs-data`);
  if (element) element.innerHTML = htmlFunction();
};

/**
 * Display a list of string
 * @param {ListProducer} listFunction 
 * @param {boolean} numbered If true(default) list will be numbered
 */
export const displayListResults = (listFunction, numbered = true) => {
  if (!state.enableTextResults || !state.displayData) return;

  const list = listFunction();

  let max = Math.max(state.lastListCount, list.length);
  let toAdd = max - list.length;

  for (let index = 0; index < toAdd; index++) list.push(`&nbsp;`);
  let html = numbered ? `<ol>` : `<ul>`;
  html += list.map(txt => `<li>${txt}</li>`).join(`\n`);
  html += numbered ? `</ol>` : `</ul>`;

  const element = document.querySelector(`#cs-data`);
  if (element) element.innerHTML = html;

  saveState({ lastListCount: max });
};

/**
 * Display text in the status line
 * @param {string} message 
 */
export const status = (message) => {
  const element = document.querySelector(`#cs-lblStatus`);
  if (element) element.textContent = message;
};

/**
 * Draws centered text (assuming canvas has been offset already)
 * @param {string} message 
 * @param {CanvasRenderingContext2D} context 
 * @param {number} offsetX 
 * @param {number} offsetY 
 * @returns 
 */
export const drawCenteredText = (context, message, offsetX = 0, offsetY = 0) => {
  const txt = context.measureText(message);
  context.fillText(message,
    -txt.width / 2 + offsetX,
    -txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent / 2 + offsetY);
  return txt;
};

/**
 * Draws an absolutely-positioned dot
 * @param {CanvasRenderingContext2D} context 
 * @param {Points.Point} pt
 * @param {number} radius Radius for dot
 * @param {boolean} fill If true, dot is filled-in
 * @param {boolean} stroke If true, dot outline is drawn
 */
export const drawAbsDot = (context, pt, radius = -1, fill = true, stroke = false) => {
  if (radius === -1) radius = settings.defaultDotRadius;
  context.beginPath();
  context.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
  if (fill) context.fill();
  if (stroke) context.stroke();
  context.closePath();
};

/**
 * Draw a set of {x,y} pairs as a connected line.
 * Skips undefined points.
 * @param {CanvasRenderingContext2D} context 
 * @param  {...{x:number,y:number}|undefined} pts 
 */
export const drawLine = (context, ...pts) => {
  let drawn = 0;
  for (const pt of pts) {
    if (pt === undefined) continue;
    if (drawn === 0) {
      context.moveTo(pt.x, pt.y);
    } else {
      context.lineTo(pt.x, pt.y);
    }
    drawn++;
  }
  if (drawn > 1) context.stroke();
};

export const setCssFlag = (flagValue, cssFilter, cssTrueClass) => {
  for (const element of document.querySelectorAll(cssFilter)) {
    if (flagValue) {
      element.classList.add(cssTrueClass);
    } else {
      element.classList.remove(cssTrueClass);
    }
  }
};

export const setReady = (ready) => {
  const buttonCameraStart = document.querySelector(`#cs-btnCameraStart`);
  setCssFlag(ready, `.needs-ready`, `ready`);
  if (buttonCameraStart)  /** @type {HTMLButtonElement}*/(buttonCameraStart).disabled = false;
};

export const clearRecordings = () => {
  localStorage.setItem(`recordings`, JSON.stringify([]));
  updateRecordingsUi(getRecordings());
};

/**
 * Gets a localStorage-persisted recording of pose data
 * @returns {Recording[]}
 */
const getRecordings = () => {
  const recordingsString = localStorage.getItem(`recordings`);
  const recordings = recordingsString === null ? [] : JSON.parse(recordingsString);
  return recordings;
};

/**
 * Updates the recordings SELECT element based on localStorage
 * @param {Recording[]} recordings 
 * @returns 
 */
const updateRecordingsUi = (recordings) => {
  // Update select
  const element = document.querySelector(`#cs-selRecording`);
  if (element === null) return;
  element.innerHTML = ``;
  for (const r of recordings) {
    const opt = document.createElement(`option`);
    opt.setAttribute(`data-name`, r.name);
    opt.textContent = `${r.name} (${r.data.length})`;
    element.append(opt);
  }

  // Select most recent
  /** @type {HTMLSelectElement} */(element).selectedIndex = recordings.length - 1;

  // Disable if there are no recordings
  const buttonPlay = document.querySelector(`#cs-btnPlayback`);
  if (buttonPlay) /** @type {HTMLButtonElement} */(buttonPlay).disabled = recordings.length === 0;
  /** @type {HTMLSelectElement} */(element).disabled = recordings.length === 0;
};

/**
 * Start/stop video
 * @param {boolean} start 
 * @param {File} [file]
 */
const setVideo = async (start, file) => {

  const buttonVideoStartStop = document.querySelector(`#cs-btnVideoStartStop`);

  if (start && file) {
    // Stop camera if running
    setCamera(false);
    if (buttonVideoStartStop) /** @type {HTMLButtonElement}*/(buttonVideoStartStop).disabled = true;
    try {
      // Set up frame processor
      caller.frameProcessor = new FrameProcessor(caller.frameProcessorOpts);
      await caller.frameProcessor.useVideo(file);
    
      // Start loop to pull frames from camera
      settings.loop.start();

    } finally {
      if (buttonVideoStartStop) /** @type {HTMLButtonElement}*/(buttonVideoStartStop).disabled = false;
    }
  } else {
    // Stop loop and dispose of frame processor
    settings.loop.cancel();
    caller.frameProcessor?.dispose();
    caller.frameProcessor = undefined;    
  }
};

export const startRecorderPlayback = async () => {
  const element = document.querySelector(`#cs-selRecording`);
  if (element === null) return;

  const name = /** @type {HTMLSelectElement} */(element).selectedOptions[0].getAttribute(`data-name`);

  const rec = getRecordings().find(r => r.name === name);
  if (rec === undefined) {
    alert(`Recording '${name}' not found.`);
    return;
  }

  const onPlayback = caller.onPlayback;
  if (onPlayback === undefined) {
    console.log(`No onPlayback handler. Aborting`);
    return;
  }

  saveState({ currentSource:`recording` });

  // Stop camera & video playback
  await setCamera(false);
  await setVideo(false);

  const button = document.querySelector(`#cs-btnPlayback`);
  if (button !== null) button.textContent = `stop`;
  /** @type {HTMLButtonElement}*/(document.querySelector(`#cs-btnRecord`)).disabled = true;

  // Set canvas
  const canvasElement = /** @type HTMLCanvasElement|null */(document.querySelector(`#dataCanvas`));
  if (canvasElement) {
    canvasElement.width = rec.frameSize.width;
    canvasElement.height = rec.frameSize.height;
  }

  const context = getDrawingContext();
  const frameSize = rec.frameSize;
  let index = 0;
  saveState({ recorder:`playing` });
  
  continuously(() => {
    const d = rec.data[index];
    recorderStatus(`${index + 1}/${rec.data.length}`);
    onPlayback(d, index, rec);
    if (context) postCaptureDraw(context.ctx, context.width, context.height);
    index++;
    if (index + 1 === rec.data.length || state.recorder !== `playing`) {
      if (settings.loopRecorderPlayback) {
        index = 0;
      } else {
        console.log(`Playback done of ${rec.data.length} steps.`);
        recorderStatus(``);
        stopRecorderPlayback();
        saveState({ currentSource:`none` });
        return false; // Stop loop
      }
    }
  }, caller.playbackRateMs).start();
};

const stopRecorderPlayback = () => {
  saveState({ recorder: `` });
  let button = document.querySelector(`#cs-btnPlayback`);
  if (button !== null) button.textContent = `play_arrow`;

  /** @type {HTMLButtonElement}*/(document.querySelector(`#cs-btnRecord`)).disabled = false;

};

/**
 * Returns the drawing context and dimensions for the image capturer.
 * {ctx, width, height}
 * @returns {{width:number,height:number,ctx:CanvasRenderingContext2D}|undefined}
 */
export const getDrawingContext = () => {
  const canvasElement = /** @type HTMLCanvasElement|null */(document.querySelector(`#dataCanvas`));

  //caller.frameProcessor?.getCapturer()?.canvasEl;
  if (!canvasElement) {
    console.log(`Warning, drawing canvas not found`);
    return;
  }
  const context = canvasElement.getContext(`2d`);
  if (context === null) return;
  return {
    width: canvasElement.width,
    height: canvasElement.height,
    ctx: context
  };
};

const stopRecording = async () => {
  if (state.recorder !== `recording`) return;
  saveState({ recorder: `` });
  /** @type {HTMLButtonElement}*/(document.querySelector(`#cs-btnPlayback`)).disabled = false;

  recorderStatus(``);

  const rec = state.currentRecording;
  if (rec === undefined || rec.data.length === 0) return;

  const name = prompt(`Recording name (${rec.data.length} steps)`, rec.name);
  if (name === null) return; // cancelled
  rec.name = name;

  const recordings = getRecordings();
  recordings.push(rec);

  localStorage.setItem(`recordings`, JSON.stringify(recordings));
  updateRecordingsUi(recordings);
  saveState({ currentRecording: undefined });
};

const startRecording = async () => {
  if (state.recorder === `recording`) {
    await stopRecording();
  }
  recorderStatus(`Ready...`);
  saveState({ currentRecording: {
    name: new Date().toLocaleString(),
    data: [],
    frameSize: { width: 0, height: 0 }
  },
  recorder: `recording` });
  /** @type {HTMLButtonElement}*/(document.querySelector(`#cs-btnPlayback`)).disabled = true;
};

const recorderStatus = (message) => {
  const element = document.querySelector(`#lblRecorderStatus`);
  if (element === null) return;
  element.textContent = message;
};

export const onRecordData = (data, frameSize) => {
  if (state.recorder !== `recording`) return;
  settings.recordThrottle(data, frameSize);
};

const recordDataImpl = (data, frameSize) => {
  const rec = state.currentRecording;
  if (rec === undefined) return;
  rec.data.push(data);
  rec.frameSize = frameSize;
  recorderStatus(rec.data.length);
};

const addUi = () => {
  const html = `
  <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet" />
  <div class="cs-ui">
  <div id="cs-lblStatus">Loading...</div>
  <div id="cs-controls" class="needs-ready">
    <div>
      <h2>Camera</h2>
      <select title="Which camera source" id="cs-selCamera">
        <option>front</option>
        <option>back</option>
      </select>
      <button style="color:yellow" title="Play/stop camera" class="material-icons" id="cs-btnCameraStartStop">check_circle</button> 
    </div>
    <div class="needs-stream">
      <h2>Display</h2>
      <label><input title="Show data" id="cs-chkDataShow" checked type="checkbox"> Data </label>
      <label><input title="Show source" id="cs-chkSourceShow" checked type="checkbox"> Source </label>
      <button title="Freeze display" class="material-icons" id="cs-btnFreeze">ac_unit</button>
    </div>
    <div>
      <h2>Record</h2>
      <select id="cs-selRecording">
      </select>    
      <button title="Play back selected recording" class="material-icons" id="cs-btnPlayback">play_arrow</button>
      <button title="Make a new recording" class="material-icons" id="cs-btnRecord">fiber_manual_record</button>
      <div id="lblRecorderStatus"></div>
    </div>
    <div>
    <h2>Video</h2>
    <input type="file" accept="video/*" id="cs-videoFile" /></input>
    <label for="cs-videoFile" title="Play a file from your computer" class="material-icons">movie</label>
    <!--<button title="Play/stop video" class="material-icons" id="cs-btnVideoStartStop">check_circle</button> -->
  </div>
  </div>
</div>
<div id="canvasContainer">
  <canvas id="dataCanvas">
</div>
<div id="cs-data"></div>
`;
  document.body.insertAdjacentHTML(`beforeend`, html);

  const css = `
  <style>
  input[type="file"] {
    display: none;
  }
  .material-icons { 
    color: rgba(255, 255, 255, 1); 
    background: none;
    border: none;
    padding: 0.3em;
    border-radius: 0.1em;
  }
  .material-icons[disabled] {
    opacity: 0.2;
  }
  .material-icons:hover:not([disabled]) {
    background-color: hsl(var(--hue), 10%, 50%);
  }
  .cs-ui {
    user-select: none;
    padding-bottom: 0.1em;
  }
  .cs-ui>div {
    margin-bottom: 1em;
  }
  .needs-ready:not(.ready) {
    display: none !important;
  }

  .needs-stream:not(.streaming) {
    display: none !important;
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
    gap: 0.3em;
    flex-direction: row;
    flex-wrap: wrap;
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
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
  }

  #cs-selCamera,#cs-selRecording {
    max-width: 4em;
  }

  .ixfx-capture {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    max-width: 100vw;
    max-height: 100vh;
  }
  #canvasContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    display:flex;
  }
  #canvasContainer>canvas {
  }
  </style>
  `;
  document.body.insertAdjacentHTML(`beforeend`, css);
};

/**
 * Called after a frame is captured from the video source.
 * This allows us to draw on top of the frame after it has been analysed.
 * @param {CanvasRenderingContext2D} context 
 * @param {number} width 
 * @param {number} height 
 */
function postCaptureDraw(context, width, height) {
  const { videoOpacity } = settings;

  context.fillStyle = (state.displaySource && state.currentSource === `camera`) ?
    // Clear canvas with some translucent white to fade out video
    `rgba(255,255,255,${videoOpacity})`
    :  // Clear canvas completely white
    `rgb(255,255,255)`;
  
  context.fillRect(0, 0, width, height);

  if (state.displayData) {
    caller.postCaptureDraw(context, width, height);
  }
}

/**
 * Shows or hides the UI.
 * If no parameter is provided, state is toggled, otherwise `enabled` flag is used
 * @param {boolean} [enabled] 
 * @returns 
 */
export const toggleUi = (enabled) => {
  if (enabled === undefined) {
    enabled = !state.uiVisible;
  }

  const uiElements = document.querySelectorAll(`.cs-ui`);
  for (const uiElement of uiElements) {
    /** @type {HTMLElement} */(uiElement).style.display = enabled ? `block` : `none`;
  }
  saveState({ uiVisible:enabled });
  return enabled;
};

/**
 * Set up
 * @param {OnFrame} onFrame Callback when a frame is ready for processing
 * @param {OnPlayback} onPlayback Callback for when there is a playback data set
 * @param {FrameProcessorOpts} frameProcessorOptions Options for the frame processor
 * @param {number} playbackRateMs Delay between each frame of recorded data playback
 */
export const setup = async (onFrame, onPlayback, frameProcessorOptions, playbackRateMs) => {
  addUi();

  const buttonCameraStartStop = document.querySelector(`#cs-btnCameraStartStop`);
  const buttonRecord = document.querySelector(`#cs-btnRecord`);
  const buttonPlayback = document.querySelector(`#cs-btnPlayback`);
  const buttonVideoPlayback = document.querySelector(`#cs-btnVideoPlayback`);

  const buttonFreeze = document.querySelector(`#cs-btnFreeze`);
  const chkSourceShow = document.querySelector(`#cs-chkSourceShow`);
  const chkDataShow = document.querySelector(`#cs-chkDataShow`);
  const selCamera = document.querySelector(`#cs-selCamera`);

  const dataElement = /** @type HTMLElement */(document.querySelector(`#cs-data`));

  const captureCanvasElement = document.querySelector(`#dataCanvas`);
  if (!captureCanvasElement) throw new Error(`Capture canvas null`);

  if (!(`mediaDevices` in navigator)) {
    console.warn(`navigator.mediaDevices is missing -- are you running over https:// or http://127.0.01 ?`);
  }

  const devices = await navigator.mediaDevices.enumerateDevices();
  for (const d of devices) {
    if (d.kind !== `videoinput`) continue;
    const opt = document.createElement(`option`);
    opt.setAttribute(`data-id`, d.deviceId);
    opt.textContent = d.label;
    selCamera?.append(opt);
  }

  caller.onFrame = onFrame;
  caller.onPlayback = onPlayback;
  if (playbackRateMs) caller.playbackRateMs = playbackRateMs;

  // Override default settings with what has been provided
  if (frameProcessorOptions.cameraConstraints) {
    let cc = { ...caller.frameProcessorOpts.cameraConstraints, ...frameProcessorOptions.cameraConstraints };

    // @ts-ignore
    if (cc.facingMode === `back`) cc.facingMode = `environment`;
    // @ts-ignore
    if (cc.facingMode === `front`) cc.facingMode = `user`;

    if (selCamera) {
      if (cc.facingMode === `environment`) {
        /** @type {HTMLSelectElement} */(selCamera).selectedIndex = 1;
      } else if (cc.facingMode === `user`) {
        /** @type {HTMLSelectElement} */(selCamera).selectedIndex = 0;
      }
      if (cc.deviceId) {
        // Find & select option by id
        const opt = selCamera.querySelector(`[data-id="${cc.deviceId}"]`);
        /** @type {HTMLOptionElement} */(opt).selected = true;
      }
    }
    caller.frameProcessorOpts.cameraConstraints = cc;
  } else {
    // use existing
    frameProcessorOptions.cameraConstraints = caller.frameProcessorOpts.cameraConstraints;
  }

  if (frameProcessorOptions !== undefined) {
    caller.frameProcessorOpts = frameProcessorOptions;
  }

  // Intercept drawing
  caller.postCaptureDraw = frameProcessorOptions.postCaptureDraw;
  frameProcessorOptions.postCaptureDraw = postCaptureDraw;
  // @ts-ignore
  frameProcessorOptions.captureCanvasEl = /* @type HTMLCanvasElement */(captureCanvasElement);
  
  setReady(false);
  defaultErrorHandler();
  status(`Loading...`);

  buttonFreeze?.addEventListener(`click`, event => {
    saveState({ freeze: !state.freeze });
    const element = event?.target;
    if (element) /** @type {HTMLElement}*/(element).textContent = state.freeze ? `severe_cold` : `ac_unit`;
  });

  buttonCameraStartStop?.addEventListener(`click`, async () => {
    const start = settings.loop.isDone;
    if (state.currentSource !== `camera` && start) saveState({ currentSource: `camera` });
    else if (!start && state.currentSource === `camera`) saveState({ currentSource:`none` });
    setCamera(start);
  });

  chkSourceShow?.addEventListener(`change`, () => {
    saveState({ displaySource: !state.displaySource });

    // If both are off, hide canvas entirely
    const showCanvas = state.displaySource || state.displayData;
    caller.frameProcessor?.showCanvas(showCanvas);
  });

  chkDataShow?.addEventListener(`change`, () => {
    saveState({ displayData: /** @type {HTMLInputElement} */(chkDataShow).checked });
    if (dataElement) dataElement.style.display = state.displayData ? `block` : `none`;
  });

  selCamera?.addEventListener(`change`, () => {
    const v = /** @type {HTMLSelectElement} */(selCamera).value;
    const cc = caller.frameProcessorOpts.cameraConstraints;

    if (v === `back`) {
      cc.facingMode = `environment`;
      cc.deviceId = undefined;
    }
    else if (v === `front`) {
      cc.facingMode = `user`;
      cc.deviceId = undefined;
    } else {
      const options = /** @type {HTMLSelectElement} */(selCamera).selectedOptions;
      const opt = options.item(0);
      if (opt === null) {
        console.warn(`Weirdness, no item selected`);
      } else {
        cc.facingMode = undefined;
        // @ts-ignore
        cc.deviceId = opt.getAttribute(`data-id`);
      }
    }
    caller.frameProcessorOpts.cameraConstraints = cc;
  });

  buttonRecord?.addEventListener(`click`, () => {
    if (state.recorder === `playing`) stopRecorderPlayback();

    if (state.recorder === `recording`) {
      buttonRecord.textContent = `fiber_manual_record`;
      stopRecording();
    } else if (state.recorder === ``) {
      buttonRecord.textContent = `stop_circle`;
      startRecording();
    }
  });

  buttonPlayback?.addEventListener(`click`, async () => {
    if (state.recorder === `recording`) await stopRecording();
    if (state.recorder === `playing`) {
      stopRecorderPlayback();
      return;
    }
    startRecorderPlayback();
  });

  const videoFileElement = /** @type {HTMLInputElement} */(document.querySelector(`#cs-videoFile`));
  videoFileElement?.addEventListener(`change`, event => {
    // @ts-ignore
    const file = /** @type {File|undefined} */(event.target.files[0]);
    setVideo(true, file);
  });

  // btnVideoPlayback?.addEventListener(`click`, async () => {
  //   if (state.recorder === `playing`) {
  //     stopRecorderPlayback();
  //   }
  //   startVideoPlayback();
  // });

  updateRecordingsUi(getRecordings());
};

const onStreamStarted = () => {
  
  // Update UI
  if (state.currentSource === `camera`) {
    const buttonCameraStartStop = document.querySelector(`#cs-btnCameraStartStop`);
    if (buttonCameraStartStop) buttonCameraStartStop.textContent = `stop_circle`;
  }

  setCssFlag(true, `.needs-stream`, `streaming`);
};

const onStreamStopped = () => {
  const dataElement = document.querySelector(`#cs-data`);
  const buttonCameraStartStop = document.querySelector(`#cs-btnCameraStartStop`);
  const selCamera = document.querySelector(`#cs-selCamera`);
  // Update UI
  if (dataElement) dataElement.innerHTML = ``;
  if (buttonCameraStartStop) buttonCameraStartStop.textContent = `check_circle`;
  /** @type {HTMLSelectElement}*/(selCamera).disabled = false;
  setCssFlag(false, `.needs-stream`, `streaming`);
};

/**
 * Start/stop camera
 * @param {boolean} start 
 */
const setCamera = async (start) => {
  const dataElement = document.querySelector(`#cs-data`);
  const buttonCameraStartStop = document.querySelector(`#cs-btnCameraStartStop`);
  const selCamera = document.querySelector(`#cs-selCamera`);

  if (start) {
    // Stop video if running
    setVideo(false);
  
    /** @type {HTMLButtonElement}*/(buttonCameraStartStop).disabled = true;
    try {
      // Start
      /** @type {HTMLSelectElement}*/(selCamera).disabled = true;
    
      // Set up frame processor
      caller.frameProcessor = new FrameProcessor(caller.frameProcessorOpts);
      await caller.frameProcessor.useCamera();
    
      // Start loop to pull frames from camera
      settings.loop.start();
    
    } finally {
      /** @type {HTMLButtonElement}*/(buttonCameraStartStop).disabled = false;
    }
  } else {
    // Stop loop and dispose of frame processor
    settings.loop.cancel();
    caller.frameProcessor?.dispose();
    caller.frameProcessor = undefined;    
  }
};

/**
 * Enable or disable footer text display
 * @param {boolean} v 
 */
export const enableTextDisplayResults = (v) => {
  saveState({ enableTextResults: v });
};

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  const source = state.currentSource;
  state = Object.freeze({
    ...state,
    ...s
  });

  const someSource = (state.currentSource !== `none`);
  

  if (source === `none` && someSource) onStreamStarted();
  else if (source !== `none` && !someSource) onStreamStopped();
}

// https://github.com/tensorflow/tfjs-models/blob/676a0aa26f89c9864d73f4c7389ac7ec61e1b8a8/pose-detection/src/types.ts
/**
 * @typedef Keypoint
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} [z]
 * @property {number} score
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
 * @property {number} score
 * @property {Box} box
 * @property {string} id
 * @property {number} hue
 * @property {string} source
 */
/**
 * @typedef ReceivedData
 * @property {string} _from
 * @property {any[]} data
 */
/**
 * @typedef FaceKeypoint
 * @property {'rightEye'|'leftEye'|'noseTip'|'mouthCenter'|'rightEarTragion'|'leftEarTragion'} name
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef Face
 * @type {object}
 * @property {FaceKeypoint[]} keypoints
 * @property {number} score
 * @property {Box} box
 * @property {number} hue
 * @property {string} source
 */

/**
 * @typedef {Object} FaceByKeypoint
 * @property {FaceKeypoint} nose_tip
 * @property {FaceKeypoint} right_eye
 * @property {FaceKeypoint} mouth_center
 * @property {FaceKeypoint} left_eye
 * @property {FaceKeypoint} right_ear_tragion
 * @property {FaceKeypoint} left_ear_tragion
 * @property {string} source
 * @property {number} score
 * @property {number} hue
 * @property {Box} box
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
 * @typedef PoseNetEstimateConfig
 * @type {object}
 * @property {boolean} [flipHorizontal]
 * @property {number} [scoreThreshold]
 * @property {number} [nmsRadius]
 * @property {number} [maxPoses]
 */

/**
 * @typedef FrameProcessorOpts
 * @type {object}
 * @property {HTMLCanvasElement} [captureCanvasEl] Element to capture frames to
 * @property {CameraConstraints} cameraConstraints
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

/**
 * @callback OnPlayback
 * @param {Face[]|Pose[]|ObjectPrediction[]} frame
 * @param {number} index
 * @param {Recording} rec
 * @returns void
 */

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
 * @returns {Promise<PoseDetector>}
 */

/**
 * @typedef FaceDetectorEstimateFaces
 * @type {function}
 * @param {ImageData} frame
 * @param {any} options
 * @param {number} timestamp
 */


/**
 * @typedef {object} FaceDetectionLib
 * @property {createFaceDetector} createDetector
 */

/**
 * @typedef FaceDetector
 * @type {object}
 * @property {FaceDetectorEstimateFaces} estimateFaces
 */

/**
 * @typedef FaceDetectorOpts
 * @property {string} runtime
 */
/**
 * @callback createFaceDetector
 * @param {string} model
 * @param {any} args
 * @returns {FaceDetector}
 */

/**
 * @typedef CameraConstraints
 * @type {object}
 * @property {('user'|'environment')} [facingMode]
 * @property {{width:number,height:number}} [min]
 * @property {{width:number,height:number}} [max]
 * @property {{width:number,height:number}} [ideal]
 * @property {string} [deviceId]
 */

/**
 * @typedef Recording
 * @type {object}
 * @property {string} name
 * @property {Pose[][]} data
 * @property {{width:number,height:number}} frameSize
 */



// Ported from the https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/index.ts
/**
 * @typedef {object} ObjectPrediction
 * @property {readonly [x:number, y:number, width:number, height:number]} bbox
 * @property {string} class
 * @property {number} score
 */


/**
 * Detect objects for an image returning a list of bounding boxes with
 * assocated class and score.
 * @callback ObjectDetectorDetect
 * @param {ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} img
 * @param {number} [maxNumBoxes] The maximum number of bounding boxes of detected objects. There can be multiple objects of the same class, but at different ocations. Defaults to 20.
 * @param {number} [minScore] The minimum score of the returned bounding boxes of detected objects. Value between 0 and 1. Defaults to 0.5.
 * @returns {ObjectPrediction[]}
 */

/**
 * @typedef {object} ObjectDetector
 * @property {ObjectDetectorDetect} detect
 */