// #region Imports
// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
// #endregion

// #region Settings & state
const settings = Object.freeze({
  remote: new Remote(),
  // If true, x values are flipped
  horizontalMirror: false,
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`,
  hues: new Map()
});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  ticks: 0,
  /** @type {ObjectPrediction[]} */
  predictions: [],
  
});
// #endregion

/**
 * Received predictions
 * @param {ObjectPrediction[]} predictions 
 */
const onPredictions = (predictions) => {
  saveState({
    predictions: predictions
  });
};

/**
 * Draw a prediction
 * @param {ObjectPrediction} p 
 * @param {CanvasRenderingContext2D} context 
 */
const drawPrediction = (p, context) => {
  const { horizontalMirror, hues } = settings;
  const { bounds } = state;

  // Position of detected object comes in relative terms,
  // so we need to map to viewport size. Since the viewport ratio
  // is not necessarily same as camera ratio, distortion may occur.
  // To avoid this, use the same value for yDim & xDim.
  const yDim = bounds.height;
  const xDim = bounds.width;

  const rect = {
    x: ((horizontalMirror ? 1 - p.bbox[0] : p.bbox[0]) ) * xDim,
    y: p.bbox[1] * yDim,
    width: p.bbox[2] * xDim,
    height: p.bbox[3] * yDim
  };

  // Get or create a random hue for each seen class
  if (!hues.has(p.class)) hues.set(p.class, Math.random() * 360);

  const hue = hues.get(p.class);

  context.fillStyle = context.strokeStyle = `hsl(${hue}, 80%, 40%)`;

  // Rectangle for object
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);

  // Label
  context.fillText(
    `${p.class} (${Math.round(p.score*100)}%)`, 
    rect.x+4, 
    rect.y+4);
};

const use = () => {
  const { labelFont } = settings;
  const { predictions } = state;
  const { width, height } = state.bounds;

  const canvasElement = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const context = canvasElement?.getContext(`2d`);
  if (!context) return;

  // Clear canvas
  context.clearRect(0, 0, width, height);
  
  // Draw predictions
  context.font = `14pt ${labelFont}`;
  context.textBaseline = `top`;
  context.lineWidth = 3;

  for (const p of predictions) drawPrediction(p, context);
};

const setup = async () => {
  const { remote } = settings;

  // Listen for data from the remote
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onPredictions(d.data);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    saveState({ bounds: arguments_.bounds });
  });

  // If the floating source window is there, respond to clicking on the header
  document.querySelector(`#sourceSection`)?.addEventListener(`click`, event => {
    
    const hdr = /** @type HTMLElement */(document.querySelector(`#sourceSection`));
    Dom.cycleCssClass(hdr, [ `s`, `m`, `l` ]);
  });

  const loop = () => {
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();


// #region Toolbox
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

/**
 * @typedef { import("../../common-vision-source").ObjectPrediction } ObjectPrediction
 */
// #endregion