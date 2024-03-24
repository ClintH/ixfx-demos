/**
 * Read more: https://en.wikipedia.org/wiki/Archimedean_spiral
 */
import * as Generators from '../../ixfx/generators.js';
import { CanvasHelper } from '../../ixfx/dom.js';
import { scalePercent } from '../../ixfx/data.js';
import { Polar } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  colour: `gray`,
  lineWidth: 2,
  slowPp: Generators.pingPongPercent(0.0001),
  fastPp: Generators.pingPongPercent(0.001),
  steps: 1000,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

let state = Object.freeze({
  /** @type {number} */
  slow: 0,
  /** @type {number} */
  fast: 0
});

// Update state of world
const update = () => {
  const { slowPp, fastPp } = settings;

  // Update state
  saveState({
    // Get a new value from the generator
    slow: slowPp.next().value,
    fast: fastPp.next().value
  });
};

const use = () => {
  const { canvas } = settings;
  const { ctx, width, height } = canvas;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Draw state
  draw();
};

/**
 * Draw the current state
 */
const draw = () => {
  const { canvas } = settings;
  const { center, ctx } = canvas;
  const { slow, fast } = state;
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
  ctx.moveTo(center.x, center.y); // Start in middle
  for (const coord of spiral) {
    let pt = Polar.toCartesian(coord, center);
    ctx.lineTo(pt.x, pt.y);
    if (coord.step >= steps) break;
  }
  ctx.stroke(); // Draw line
};

function setup() {
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}