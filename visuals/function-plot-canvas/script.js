import { scale, clamp } from '../../ixfx/numbers.js';
import { jitter } from '../../ixfx/modulation.js';
import { CanvasHelper } from '../../ixfx/dom.js';

const settings = Object.freeze({
  // Reduce this for speedier waves
  timeDivider: 80,
  // Default width for plot
  lineWidth: 10,
  // Default style for plot
  strokeStyle: `pink`,
  // Vertical space in pixels from top and bottom of screen
  verticalPadding: 50,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

// State keeps track of elapsed 'ticks'
let state = Object.freeze({
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
const jitterFunction = jitter({ clamped: false, relative: 0.005 });
const sineA = (ticks, x) => jitterFunction(Math.sin(x + ticks));
const sineB = (ticks, x) => (Math.sin(x + ticks) + Math.sin(2 * x)) / 2;
const sineC = (ticks, x) => (Math.sin(x + ticks) + Math.cos(2 * x)) / 2;
const sineD = (ticks, x) => (Math.sin(x + ticks) + Math.tanh(x)) / 2;

/**
 * Draw the current state
 */
const draw = () => {
  const { timeDivider, canvas } = settings;
  const { ctx } = canvas;
  // Plot a series of functions...

  // To plot, the function should return a value between -1 and 1, and take two parameters.
  // -1 will be at the bottom of plot, 0 middle and 1 top

  // Options passed to `plotFunction` allow for visual differences.
  // offset and timeDivider options allow the function to be offset and its time scaling changed
  // this allows functions to have changed phases and varying speeds.

  plotFunction(sineA, { strokeStyle: `lightblue` });

  plotFunction(sineB, {
    strokeStyle: `salmon`,
    timeDivider: timeDivider * 1.8
  });

  plotFunction(sineC, {
    strokeStyle: `lightgreen`,
    timeDivider: timeDivider * 0.5
  });

  // These two waves use the same function,
  // but with a slight offset
  plotFunction(sineD, {
    strokeStyle: `yellow`
  });

  plotFunction(sineD, {
    strokeStyle: `lightyellow`,
    offset: 0.1
  });

  // More examples
  // -------------

  // Random:
  // plotFunction((ticks, x) => Math.random() * 2 - 1, {strokeStyle: `pink`});

  // Straight line:
  // plotFunction((ticks, x) => 0, {strokeStyle: `pink`});

  // A line that sinks to the bottom
  // (since ticks is an ever-incrementing number)
  // plotFunction((ticks, x) => ticks / 2, {strokeStyle: `pink`});

  // A line that angles from top-left to bottom-right
  // `x` parameter is given as 0 ... 1
  // plotFunction((ticks, x) => x * 2 - 1, {strokeStyle: `pink`});
};

/**
 * Plots a function that yields values -1 to 1.
 * 
 * Options:
 * * strokeStyle: string for canvas line drawing
 * * lineWidth: number for canvas line drawing
 * * timeDivider: overrides settings.timeDivider
 * @param {(ticks:number, x:number) => number} fnc Function to plot
 * @param {{strokeStyle?:string, lineWidth?:number, offset?:number, timeDivider?:number}} options Options for this plot 
 */
const plotFunction = (fnc, options = {}) => {
  const { timeDivider, verticalPadding, canvas } = settings;
  const { ctx } = canvas;
  const { ticks } = state;

  const w = canvas.width;
  const h = canvas.height - (verticalPadding * 2);
  const functionTimeDivider = options.timeDivider ?? timeDivider;
  const offset = options.offset ?? 0;

  // Use 100 points divided across width of screen
  const sampleWidth = Math.min(1, Math.floor(w / 100));
  for (let x = 0; x <= w; x += sampleWidth) {
    const tickValue = (ticks / functionTimeDivider) + offset;
    const xValue = x / w;
    try {
      const v = clamp(fnc(tickValue, xValue), -1, 1);
      const y = scale(v, -1, 1, 0, h) + verticalPadding;

      if (x === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    } catch (error) {
      console.error(error);
      console.log(`ticks: ${ticks} x: ${x} tickValue: ${tickValue} xValue: ${xValue}`);
    }
  }

  // Apply visual settings
  ctx.strokeStyle = options.strokeStyle ?? settings.strokeStyle;
  ctx.lineWidth = options.lineWidth ?? settings.lineWidth;
  ctx.stroke();
};

const use = () => {
  const { canvas } = settings;
  const { ctx } = canvas;

  // Update state
  update();

  // Clear canvas
  clear();

  // For added flavour, change compositing mode when drawing functions
  // See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  //ctx.globalCompositeOperation = `hard-light`;
  //ctx.globalCompositeOperation = `overlay`;
  ctx.globalCompositeOperation = `soft-light`;

  // Draw based on state
  draw();

};

/**
 * Clear canvas
 */
const clear = () => {
  const { canvas } = settings;
  const { width, height, ctx } = canvas;

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

function setup() {
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
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}