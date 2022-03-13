/**
 * Read more: https://en.wikipedia.org/wiki/Archimedean_spiral
 */
import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';
import {scalePercent} from '../../ixfx/util.js';
import {Polar} from '../../ixfx/geometry.js';

// Define settings
const settings = {
  colour: `gray`,
  lineWidth: 2,
  slowPp: Generators.pingPongPercent(0.0001),
  fastPp: Generators.pingPongPercent(0.001),
  steps: 1000
}

// Initialise state with empty values
let state = {
  slow: 0,
  fast: 0,
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}}
};

// Update state of world
const update = () => {
  const {slowPp, fastPp} = settings;

  // Update state
  state = {
    ...state,
    // Get a new value from the generator
    slow: slowPp.next().value,
    fast: fastPp.next().value
  }
}

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {slow, fast, bounds} = state;
  const c = bounds.center;
  const steps = settings.steps;
  ctx.lineWidth = settings.lineWidth;
  ctx.strokeStyle = settings.colour;

  // Use fast ping pong value, scaling from 0.1 -> 1
  const smoothness = scalePercent(fast, 0.1, 1);

  // Use slower ping pong value, scaling from 1 -> 10
  const zoom = scalePercent(slow, 1, 10);

  // Makes a generator to produce coordinates of spiral
  const spiral = Polar.spiral(smoothness, zoom);

  // Make a path of all the lines
  ctx.beginPath();
  ctx.moveTo(c.x, c.y); // Start in middle
  for (const coord of spiral) {
    let pt = Polar.toCartesian(coord, c);
    ctx.lineTo(pt.x, pt.y);
    if (coord.step >= steps) break;
  }
  ctx.stroke(); // Draw line
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size too
  /** @type {HTMLCanvasElement} */
  const canvasEl = Dom.resolveEl(`#canvas`);
  Dom.fullSizeCanvas(canvasEl, args => {
    // Update state with new size of canvas
    state = {
      ...state,
      bounds: args.bounds
    }
  });

  const ctx = canvasEl.getContext(`2d`);

  const loop = () => {
    // Clear
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    // Update state
    update();
    // Draw state
    draw(ctx);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();
