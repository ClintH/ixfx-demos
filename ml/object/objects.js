// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../ixfx/dom.js';

const settings = Object.freeze({
  remote: new Remote(),
  // If true, x values are flipped
  horizontalMirror: false,
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`

});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  ticks: 0,
  /** @type {import("../common-vision-source.js").ObjectPrediction[]} */
  predictions: [],
  classHues: new Map()
});

/**
 * Received predictions
 * @param {import("../common-vision-source.js").ObjectPrediction[]} predictions 
 */
const onPredictions = (predictions) => {
  console.log(predictions);
  updateState({
    predictions: predictions
  });
};

/**
 * Draw a prediction
 * @param {import("../common-vision-source.js").ObjectPrediction} p 
 * @param {CanvasRenderingContext2D} ctx 
 */
const drawPrediction = (p, ctx) => {
  const { horizontalMirror } = settings;
  const { bounds, classHues } = state;

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
  if (!classHues.has(p.class)) classHues.set(p.class, Math.random() * 360);

  const hue = classHues.get(p.class);

  ctx.fillStyle = ctx.strokeStyle = `hsl(${hue}, 80%, 40%)`;

  // Rectangle for object
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

  // Label
  ctx.fillText(
    `${p.class} (${Math.round(p.score*100)}%)`, 
    rect.x+4, 
    rect.y+4);
};

const useState = () => {
  const { labelFont } = settings;
  const { predictions } = state;
  const { width, height } = state.bounds;

  const canvasEl = /** @type {HTMLCanvasElement|null} */(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw predictions
  ctx.font = `14pt ${labelFont}`;
  ctx.textBaseline = `top`;
  ctx.lineWidth = 3;

  predictions.forEach(p => drawPrediction(p, ctx));
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
  Dom.fullSizeCanvas(`#canvas`, args => {
    updateState({ bounds: args.bounds });
  });

  // If the floating source window is there, respond to clicking on the header
  document.getElementById(`sourceSection`)?.addEventListener(`click`, evt => {
    
    const hdr = /** @type HTMLElement */(document.getElementById(`sourceSection`));
    Dom.cycleCssClass(hdr, [ `s`, `m`, `l` ]);
  });

  const loop = () => {
    useState();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
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