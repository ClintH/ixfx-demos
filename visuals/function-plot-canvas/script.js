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
  updateState({
    ticks: ticks + 1
  });
};

// Example functions
// A pure sine: const sineA = (ticks, x) => Math.sin(x + ticks);
const sineApure = (ticks, x) => Math.sin(x + ticks);

// With noise
const jitterFn = jitter({ clamped: false,relative: 0.005 });
const sineA = (ticks, x) => jitterFn(Math.sin(x + ticks));
const sineB = (ticks, x) => (Math.sin(x + ticks) + Math.sin(2 * x)) / 2;
const sineC = (ticks, x) => (Math.sin(x + ticks) + Math.cos(2 * x)) / 2;
const sineD = (ticks, x) => (Math.sin(x + ticks) + Math.tanh(x)) / 2;

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const { timeDivider } = settings;
  // Plot a series of functions...

  // To plot, the function should return a value between -1 and 1, and take two parameters.
  // -1 will be at the bottom of plot, 0 middle and 1 top

  // Options passed to `plotFunction` allow for visual differences.
  // offset and timeDivider options allow the function to be offset and its time scaling changed
  // this allows functions to have changed phases and varying speeds.

  plotFunction(sineA, ctx, { strokeStyle: `lightblue` });

  plotFunction(sineB, ctx, {
    strokeStyle: `salmon`,
    timeDivider: timeDivider * 1.8
  });

  plotFunction(sineC, ctx, {
    strokeStyle: `lightgreen`,
    timeDivider: timeDivider * 0.5
  });

  // These two waves use the same function,
  // but with a slight offset
  plotFunction(sineD, ctx, {
    strokeStyle: `yellow`
  });

  plotFunction(sineD, ctx, {
    strokeStyle: `lightyellow`,
    offset: 0.1
  });

  // More examples
  // -------------

  // Random:
  // plotFunction((ticks, x) => Math.random() * 2 - 1, ctx, {strokeStyle: `pink`});

  // Straight line:
  // plotFunction((ticks, x) => 0, ctx, {strokeStyle: `pink`});

  // A line that sinks to the bottom
  // (since ticks is an ever-incrementing number)
  // plotFunction((ticks, x) => ticks / 2, ctx, {strokeStyle: `pink`});

  // A line that angles from top-left to bottom-right
  // `x` parameter is given as 0 ... 1
  // plotFunction((ticks, x) => x * 2 - 1, ctx, {strokeStyle: `pink`});
};

/**
 * Plots a function that yields values -1 to 1.
 * 
 * Options:
 * * strokeStyle: string for canvas line drawing
 * * lineWidth: number for canvas line drawing
 * * timeDivider: overrides settings.timeDivider
 * @param {(ticks:number, x:number) => number} fn Function to plot
 * @param {CanvasRenderingContext2D} ctx Canvas context to draw on
 * @param {{strokeStyle?:string, lineWidth?:number, offset?:number, timeDivider?:number}} opts Options for this plot 
 */
const plotFunction = (fn, ctx, opts = {}) => {
  const { timeDivider, verticalPadding } = settings;
  const { ticks } = state;

  const w = state.bounds.width;
  const h = state.bounds.height - (verticalPadding * 2);
  const fnTimeDivider = opts.timeDivider ?? timeDivider;
  const offset = opts.offset ?? 0;

  // Use 100 points divided across width of screen
  const sampleWidth = Math.min(1, Math.floor(w / 100));
  for (let x = 0; x <= w; x += sampleWidth) {
    const v = clamp(fn((ticks / fnTimeDivider) + offset, x / w), -1, 1);
    const y = scale(v, -1, 1, 0, h) + verticalPadding;

    if (x === 0) {
      ctx.beginPath();
      ctx.moveTo(x , y);
    } else {
      ctx.lineTo(x , y);
    }
  }

  // Apply visual settings
  ctx.strokeStyle = opts.strokeStyle ?? settings.strokeStyle;
  ctx.lineWidth = opts.lineWidth ?? settings.lineWidth;
  ctx.stroke();
};

const useState = () => {
  const canvasEl = document.getElementById(`canvas`);
  const ctx = /** @type {HTMLCanvasElement} */(canvasEl).getContext(`2d`);
  if (!ctx) return;
  
  // Update state
  update();

  // Clear canvas
  clear(ctx);

  // For added flavour, change compositing mode when drawing functions
  // See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  //ctx.globalCompositeOperation = `hard-light`;
  //ctx.globalCompositeOperation = `overlay`;
  ctx.globalCompositeOperation = `soft-light`;

  // Draw based on state
  draw(ctx);

};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;

  // Make background transparent
  //ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  ctx.globalCompositeOperation = `source-over`;
  ctx.fillStyle = `hsla(200, 100%, 10%, 0.1)`;
  ctx.fillRect(0, 0, width, height);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  Dom.fullSizeCanvas(`#canvas`, args => {
    updateState({
      bounds: args.bounds
    });
  });

  const loop = () => {
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();
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