import {Remote} from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';

const settings = {
  remote: new Remote(),
  canvasEl: document.getElementById(`canvas`),
  labelFont: `"Segoe UI", Roboto, Helvetica, Arial, sans-serif`
}

let state = {
  bounds: {
    width: 0,
    height: 0,
    center: {x: 0, y: 0}
  },
  ticks: 0,
  /** @type {DetectedObject[]} */
  predictions: [],
  colours: new Map()
};

/**
 * Received predictions
 * @param {DetectedObject[]} predictions 
 */
const onPredictions = (predictions) => {
  console.log(predictions);
  state = {
    ...state,
    predictions: predictions
  }
}


/**
 * Draw predictions
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {predictions} = state;

  predictions.forEach(p => drawPrediction(p, ctx));
}

/**
 * 
 * @param {DetectedObject} p 
 * @param {CanvasRenderingContext2D} ctx 
 */
const drawPrediction = (p, ctx) => {
  const {labelFont} = settings;
  const {bounds, colours} = state;

  ctx.fillStyle = `black`;

  // Position of detected object comes in relative terms,
  // so we need to map to viewport size. Also want to
  // mirror x,y so it feels more normal 
  const pos = {
    x: (1 - p.bbox.x) * bounds.width,
    y: (1 - p.bbox.y) * bounds.height
  };

  const rect = {
    width: p.bbox.width * bounds.width,
    height: p.bbox.height * bounds.height
  }

  // Radius of circle will be width/height of found object,
  // whatever is larger
  const radius = Math.max(rect.width, rect.height);

  // Opacity based on score. It's dropped to allow high-ranking
  // predictions to visually overlap
  const opacity = p.score / 2;

  // Get or create a random hue for each seen class
  if (!colours.has(p.class)) colours.set(p.class, Math.random() * 360);

  const hue = colours.get(p.class);

  // Translate canvas to be centered on predicted object
  ctx.save();
  ctx.translate(pos.x, pos.y);

  // Draw a circle
  ctx.beginPath();
  ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${hue}, 50%, 50%, ${opacity})`;
  ctx.strokeStyle = `hsla(${hue}, 30%, 50%, ${opacity * 2})`
  ctx.fill();
  ctx.stroke();

  // Draw label for predicted class
  // .. scale font roughly based on radius
  ctx.font = `${Math.floor(radius / 3)}px ${labelFont}`;
  ctx.fillStyle = `hsla(${hue}, 30%, 20%, ${opacity / 2})`;
  const txtSize = drawCenteredText(p.class, ctx);

  // Draw score
  drawCenteredText(Math.floor(p.score * 100) + '%', ctx, 0, txtSize.fontBoundingBoxAscent);

  // Undo translate transform
  ctx.restore();
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
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const {width, height} = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
}

const setup = async () => {
  const {remote, canvasEl} = settings;

  // Listen for data from the remote
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onPredictions(d.data);
    } else {
      console.warn('Got data we did not expect');
      console.log(d);
    }

  }

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(canvasEl, args => {
    state = {
      ...state,
      bounds: args.bounds
    }
  });

  const ctx = canvasEl.getContext(`2d`);

  const loop = () => {
    // Clear and draw current state
    clear(ctx);
    draw(ctx);

    // Loop
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();

// Ported from the https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/index.ts
/**
 * @typedef DetectedObject
 * @type {object}
 * @property {{x:number, y:number, width:number, height:number}} bbox
 * @property {string} class
 * @property {number} score
 */

