/**
 * Read more: https://en.wikipedia.org/wiki/Archimedean_spiral
 */
import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';
import { scalePercent } from '../../ixfx/data.js';
import { Polar } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  colour: `gray`,
  lineWidth: 2,
  slowPp: Generators.pingPongPercent(0.0001),
  fastPp: Generators.pingPongPercent(0.001),
  steps: 1000
});

let state = Object.freeze({
  /** @type {number} */
  slow: 0,
  /** @type {number} */
  fast: 0,
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } }
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
  /** @type {HTMLCanvasElement|null}} */
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) return;
    
  // Clear
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
  // Draw state
  draw(context);
};

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} context 
 */
const draw = (context) => {
  const { slow, fast, bounds } = state;
  const c = bounds.center;
  const steps = settings.steps;
  context.lineWidth = settings.lineWidth;
  context.strokeStyle = settings.colour;

  // Use fast ping pong value, scaling from 0.1 -> 1
  const smoothness = scalePercent(fast, 0.1, 1);

  // Use slower ping pong value, scaling from 1 -> 10
  const zoom = scalePercent(slow, 1, 10);

  // Makes a generator to produce coordinates of spiral
  const spiral = Polar.spiral(smoothness, zoom);

  // Make a path of all the lines
  context.beginPath();
  context.moveTo(c.x, c.y); // Start in middle
  for (const coord of spiral) {
    let pt = Polar.toCartesian(coord, c);
    context.lineTo(pt.x, pt.y);
    if (coord.step >= steps) break;
  }
  context.stroke(); // Draw line
};

function setup() {
  // Keep our primary canvas full size too
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds
    });
  });

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
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}