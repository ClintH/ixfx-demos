import * as Dom from '../../ixfx/dom.js';
import { Points, Vectors } from '../../ixfx/geometry.js';
import { PointTracker, pointTracker } from '../../ixfx/data.js';
import * as Util from './util.js';

const settings = Object.freeze({
  updateRateMs: 10,
  circleHue: 320
});

/**
 * @typedef {{
 * bounds: Bounds
 * scaleBy: number
 * tracker: PointTracker
 * pointer: Points.Point
 * prediction: Points.Point
 * }} State
 */

/** @type State */
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 },
  },
  /** @type number */
  scaleBy: 1,
  tracker: pointTracker({
    sampleLimit: 10,
    storeIntermediate: true
  }),
  pointer: { x:0.5, y:0.5 },
  prediction: { x:0.5, y:0.5 }
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
  const { tracker } = state;
 
  // Get a relative version of pointer position
  const pointerRelative = Points.divide(event, state.bounds);

  // Add it to the tracker
  tracker.seen(pointerRelative);

  // Get a vector of initial -> last point
  const vector = tracker.vectorCartesian;

  // Apply vector to predict the next point
  const prediction = Points.sum( vector, pointerRelative);

  saveState({ pointer: pointerRelative, prediction });
};

/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const use = () => {
  const { circleHue } = settings;

  /** @type HTMLCanvasElement|null */
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) return;

  // Clear canvas
  clear(context);

  const { pointer, prediction } = state;
  
  drawLabelledCircle(context, prediction, `hsla(${circleHue}, 50%, 50%, 0.5)` );
  drawLabelledCircle(context, pointer, `hsl(${circleHue}, 50%, 90%)` );
};

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Circle} circle 
 * @param {string} fillStyle
 * @param {string} message?
 * @param {string} textFillStyle?
 */
const drawLabelledCircle = (context, circle, fillStyle, message = ``, textFillStyle =  `black`) => {
  const { scaleBy } = state;

  // Convert relative radius to absolute
  const radius = (circle.radius ?? 0.1) * (scaleBy / 2);

  // Convert x,y to absolute point
  const abs = Points.multiply(circle, state.bounds);

  Util.drawLabelledCircle(context, { ...abs, radius }, fillStyle, message, textFillStyle);
};

/**
 * Clears canvas
 * @param {CanvasRenderingContext2D} context 
 */
const clear = (context) => {
  const { width, height } = state.bounds;

  // Make background transparent
  context.clearRect(0, 0, width, height);

  // Clear with a colour
  //context.fillStyle = `orange`;
  //context.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //context.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //context.fillRect(0, 0, width, height);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const { updateRateMs } = settings;

  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({ 
      bounds: arguments_.bounds,
      scaleBy: Math.min(arguments_.bounds.width, arguments_.bounds.height)
    });
  });

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
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/** 
 * @typedef {import('./util.js').Circle} Circle 
 * @typedef {import('./util.js').Bounds} Bounds 
 */