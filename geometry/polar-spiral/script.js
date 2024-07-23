/**
 * Read more: https://en.wikipedia.org/wiki/Archimedean_spiral
 */
import { Modulation, Numbers } from '../../ixfx/bundle.js';
import { CanvasHelper } from '../../ixfx/dom.js';
import { Polar } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  colour: `gray`,
  lineWidth: 2,
  slowWave: Modulation.wave({ shape: `sine`, hertz: 0.001 }),
  fastWave: Modulation.wave({ shape: `sine`, hertz: 0.1 }),
  steps: 1000,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

/**
 * @typedef {Readonly<{
 * slow:number
 * fast:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  slow: 0,
  fast: 0
});

// Update state of world
const update = () => {
  const { slowWave, fastWave } = settings;
  saveState({
    slow: slowWave(),
    fast: fastWave()
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
  const smoothness = Numbers.scalePercent(fast, 0.1, 1);

  // Use slower ping pong value, scaling from 1 -> 10
  const zoom = Numbers.scalePercent(slow, 1, 10);

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