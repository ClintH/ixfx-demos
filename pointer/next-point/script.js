import { CanvasHelper } from '../../ixfx/dom.js';
import { Points, Vectors } from '../../ixfx/geometry.js';
import { PointTracker, point } from '../../ixfx/trackers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  updateRateMs: 10,
  circleHue: 320,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

/**
 * @typedef {Readonly<{
 *  tracker: PointTracker
 *  pointer: Points.Point
 *  prediction: Points.Point
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  tracker: point({
    sampleLimit: 10,
    storeIntermediate: true
  }),
  pointer: { x: 0.5, y: 0.5 },
  prediction: { x: 0.5, y: 0.5 }
});

/**
 * This is called at a slower rate
 * than the animation loop. It's meant for
 * mutating state in some manner
 */
const update = () => {
  // Do some calculations
  // and call saveState({ ... })
};

const onPointerMove = (event) => {
  const { canvas } = settings;
  const { tracker } = state;

  // Get a relative version of pointer position
  const pointerRelative = canvas.toRelative({ x: event.clientX, y: event.clientY });

  // Add it to the tracker
  tracker.seen(pointerRelative);

  // Get a vector of initial -> last point
  const vector = tracker.vectorCartesian;

  // Apply vector to predict the next point
  const prediction = Points.sum(vector, pointerRelative);

  saveState({ pointer: pointerRelative, prediction });
};

/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const use = () => {
  const { circleHue } = settings;
  const { pointer, prediction } = state;

  // Clear canvas
  clear();

  drawLabelledCircle(prediction, `hsla(${circleHue}, 50%, 50%, 0.5)`);
  drawLabelledCircle(pointer, `hsl(${circleHue}, 50%, 90%)`);
};

/**
 * @param {Circle} circle 
 * @param {string} fillStyle
 * @param {string} message?
 * @param {string} textFillStyle?
 */
const drawLabelledCircle = (circle, fillStyle, message = ``, textFillStyle = `black`) => {
  const { canvas } = settings;
  const { ctx } = canvas;

  // Convert relative radius to absolute
  const radius = (circle.radius ?? 0.1) * (canvas.dimensionMin / 2);

  // Convert x,y to absolute point
  const abs = canvas.toAbsolute(circle);

  Util.drawLabelledCircle(ctx, { ...abs, radius }, fillStyle, message, textFillStyle);
};

/**
 * Clears canvas
 */
const clear = () => {
  const { canvas } = settings;
  const { width, height, ctx } = canvas;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const { updateRateMs } = settings;


  // Call at a given rate
  const loop = () => {
    update();
    setTimeout(loop, updateRateMs);
  };
  loop();

  // Animation loop
  const animationLoop = () => {
    use();
    window.requestAnimationFrame(animationLoop);
  };
  animationLoop();

  document.addEventListener(`pointermove`, onPointerMove);

};
setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/** 
 * @typedef {import('./util.js').Circle} Circle 
 * @typedef {import('./util.js').Bounds} Bounds 
 */