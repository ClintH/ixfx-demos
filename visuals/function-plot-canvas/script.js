import { scale, clamp } from '../../ixfx/data.js';
import { jitter } from '../../ixfx/modulation.js';
import * as Dom from '../../ixfx/dom.js';

const settings = Object.freeze({
  // Reduce this for speedier waves
  timeDivider: 80,
  // Default width for plot
  lineWidth: 10,
  // Default style for plot
  strokeStyle: `pink`,
  // Vertical space in pixels from top and bottom of screen
  verticalPadding: 50
});

// State keeps track of viewport dimensions and elapsed 'ticks'
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type number */
  ticks: 0
});

// Update state of world
const update = () => {
  const { ticks } = state;
  saveState({
    ticks: ticks + 1
  });
};

// Example functions
// A pure sine: const sineA = (ticks, x) => Math.sin(x + ticks);
const sineApure = (ticks, x) => Math.sin(x + ticks);

// With noise
const jitterFunction = jitter({ clamped: false,relative: 0.005 });
const sineA = (ticks, x) => jitterFunction(Math.sin(x + ticks));
const sineB = (ticks, x) => (Math.sin(x + ticks) + Math.sin(2 * x)) / 2;
const sineC = (ticks, x) => (Math.sin(x + ticks) + Math.cos(2 * x)) / 2;
const sineD = (ticks, x) => (Math.sin(x + ticks) + Math.tanh(x)) / 2;

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} context 
 */
const draw = (context) => {
  const { timeDivider } = settings;
  // Plot a series of functions...

  // To plot, the function should return a value between -1 and 1, and take two parameters.
  // -1 will be at the bottom of plot, 0 middle and 1 top

  // Options passed to `plotFunction` allow for visual differences.
  // offset and timeDivider options allow the function to be offset and its time scaling changed
  // this allows functions to have changed phases and varying speeds.

  plotFunction(sineA, context, { strokeStyle: `lightblue` });

  plotFunction(sineB, context, {
    strokeStyle: `salmon`,
    timeDivider: timeDivider * 1.8
  });

  plotFunction(sineC, context, {
    strokeStyle: `lightgreen`,
    timeDivider: timeDivider * 0.5
  });

  // These two waves use the same function,
  // but with a slight offset
  plotFunction(sineD, context, {
    strokeStyle: `yellow`
  });

  plotFunction(sineD, context, {
    strokeStyle: `lightyellow`,
    offset: 0.1
  });

  // More examples
  // -------------

  // Random:
  // plotFunction((ticks, x) => Math.random() * 2 - 1, context, {strokeStyle: `pink`});

  // Straight line:
  // plotFunction((ticks, x) => 0, context, {strokeStyle: `pink`});

  // A line that sinks to the bottom
  // (since ticks is an ever-incrementing number)
  // plotFunction((ticks, x) => ticks / 2, context, {strokeStyle: `pink`});

  // A line that angles from top-left to bottom-right
  // `x` parameter is given as 0 ... 1
  // plotFunction((ticks, x) => x * 2 - 1, context, {strokeStyle: `pink`});
};

/**
 * Plots a function that yields values -1 to 1.
 * 
 * Options:
 * * strokeStyle: string for canvas line drawing
 * * lineWidth: number for canvas line drawing
 * * timeDivider: overrides settings.timeDivider
 * @param {(ticks:number, x:number) => number} fnc Function to plot
 * @param {CanvasRenderingContext2D} context Canvas context to draw on
 * @param {{strokeStyle?:string, lineWidth?:number, offset?:number, timeDivider?:number}} options Options for this plot 
 */
const plotFunction = (fnc, context, options = {}) => {
  const { timeDivider, verticalPadding } = settings;
  const { ticks } = state;

  const w = state.bounds.width;
  const h = state.bounds.height - (verticalPadding * 2);
  const functionTimeDivider = options.timeDivider ?? timeDivider;
  const offset = options.offset ?? 0;

  // Use 100 points divided across width of screen
  const sampleWidth = Math.min(1, Math.floor(w / 100));
  for (let x = 0; x <= w; x += sampleWidth) {
    const v = clamp(fnc((ticks / functionTimeDivider) + offset, x / w), -1, 1);
    const y = scale(v, -1, 1, 0, h) + verticalPadding;

    if (x === 0) {
      context.beginPath();
      context.moveTo(x , y);
    } else {
      context.lineTo(x , y);
    }
  }

  // Apply visual settings
  context.strokeStyle = options.strokeStyle ?? settings.strokeStyle;
  context.lineWidth = options.lineWidth ?? settings.lineWidth;
  context.stroke();
};

const use = () => {
  const canvasElement = document.querySelector(`#canvas`);
  const context = /** @type {HTMLCanvasElement} */(canvasElement).getContext(`2d`);
  if (!context) return;
  
  // Update state
  update();

  // Clear canvas
  clear(context);

  // For added flavour, change compositing mode when drawing functions
  // See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  //ctx.globalCompositeOperation = `hard-light`;
  //ctx.globalCompositeOperation = `overlay`;
  context.globalCompositeOperation = `soft-light`;

  // Draw based on state
  draw(context);

};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} context
 */
const clear = (context) => {
  const { width, height } = state.bounds;

  // Make background transparent
  //ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  context.globalCompositeOperation = `source-over`;
  context.fillStyle = `hsla(200, 100%, 10%, 0.1)`;
  context.fillRect(0, 0, width, height);
};

function setup() { 
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    saveState({
      bounds: arguments_.bounds
    });
  });

  const loop = () => {
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}