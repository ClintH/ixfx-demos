import {continuously} from '../../../ixfx/flow.js';
import {Rects} from '../../../ixfx/geometry.js';
import {FrameProcessor} from '../../../ixfx/io.js';
import {defaultErrorHandler} from '../../../ixfx/dom.js';
import {Remote} from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = {
  frameProcessor: new FrameProcessor(),
  loop: continuously(read),
  model: undefined,
  remote: new Remote(),
  lblStatusEl: document.getElementById(`lblStatus`),
  btnCameraStart: document.getElementById(`btnCameraStart`),
  btnCameraStop: document.getElementById(`btnCameraStop`),
  chkCameraShow: document.getElementById(`chkCameraShow`),
  controlsEl: document.getElementById(`controls`),
  dataEl: document.getElementById(`data`)
}

let state = {
  frameSize: {width: 0, height: 0},
  /** @type {DetectedObject[]} */
  predictions: [],
  sourceReadMs: 10,
  greatestNumberOfPredictions: 0
}

/**
 * Compute inferences
 * @param {ImageData} frame 
 */
const compute = async (frame) => {
  const {model} = settings;
  const {frameSize} = state;

  /** @type {DetectedObject[]} */
  const predications = await model.detect(frame);

  // Create relative bbox
  predications.forEach(prediction => {
    const bbox = Rects.fromNumbers(...prediction.bbox);
    prediction.bbox = Rects.normaliseByRect(bbox, frameSize)
  });
  state.predictions = predications;
};

const send = () => {
  settings.remote.broadcast(state.predictions);
};

const displayResults = () => {
  const {dataEl} = settings;
  const {predictions, greatestNumberOfPredictions} = state;
  let max = Math.max(greatestNumberOfPredictions, predictions.length);
  let toAdd = max - predictions.length;

  //const toText = state.predictions.map(s => JSON.stringify(s));
  //const toTextCleaned = toText.map(json => json.replace(/"([^"]+)":/g, '$1:').replace(/\uFFFF/g, '\\\"'));
  const toText = predictions.map(p => `${p.class} ${Math.floor(p.score * 100)}%`);

  // Because we don't want the HTML element jumping up and down in size, 
  // add empty elements so the length is consistent

  for (let i = 0; i < max - predictions.length; i++) toText.push('-');

  let html = '<ol>';
  html += toText.map(txt => `<li>${txt}</li>`).join('\n');
  html + '</ol>'
  dataEl.innerHTML = html;
  state.greatestNumberOfPredictions = max;
}

const status = (msg) => {
  settings.lblStatusEl.innerText = msg;
}

function read() {
  const start = performance.now();
  const frame = settings.frameProcessor.getFrame();

  if (state.frameSize.width === 0) {
    state.frameSize = {width: frame.width, height: frame.height}
  }

  compute(frame);
  const elapsed = performance.now() - start;

  setTimeout(() => send(), 0);

  displayResults();

  // Adjust loop speed based on how quickly we're able to process
  settings.loop.intervalMs = Math.floor(elapsed * 1.1);
}

const setup = async () => {
  const {btnCameraStart, btnCameraStop, controlsEl, chkCameraShow} = settings;
  defaultErrorHandler();
  status(`Loading model...`);
  try {
    settings.model = await cocoSsd.load();
    status(``);
  } catch (e) {
    status('Could not load model: ' + e);
    console.error(e);
    return;
  }

  controlsEl.style.display = `block`;
  btnCameraStart.disabled = false;

  btnCameraStart.addEventListener(`click`, async () => {
    await settings.frameProcessor.useCamera({});
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
    settings.frameProcessor.showPreview(chkCameraShow.checked);
  });


  if (window.self !== window.top) {
    document.q
  }
}
setup();



// Ported from the https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/index.ts
/**
 * @typedef DetectedObject
 * @type {object}
 * @property {[x:number, y:number, width:number, height:number]} bbox
 * @property {string} class
 * @property {number} score
 */