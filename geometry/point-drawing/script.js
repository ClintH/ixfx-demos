import * as Dom from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';
import { repeat } from '../../ixfx/flow.js';
import { Colour } from '../../ixfx/visual.js';

/**
 * Returns a new random point with radius
 */
const randomPoint = () => ({
  x: Math.random(),
  y: Math.random(),
  radius: Math.random()
});

const settings = Object.freeze({
  gravity: 0.01,
  // Drawing settings
  dotColour: `hsla(${Colour.getCssVariable(`hue`, `100`)}, 100%, 80%, 0.8)`,
  radiusMax: 10
});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  // Generate 100 random points
  // with x,y and radius on 0..1 scale
  points: [ ...repeat(100, randomPoint) ]
});

const use = () => {
  const { points } = state;
  
  const canvasElement = /** @type {HTMLCanvasElement} */(document.querySelector(`#canvas`));
  const context = canvasElement?.getContext(`2d`);

  if (!context) return;
    
  // Clear canvas
  clear(context);

  context.globalCompositeOperation = `lighter`; // color-dodge also good

  // Draw each point
  for (const p of points) drawPoint(context, p);
};

// Update state of world
const update = () => {
  const { gravity } = settings;
  const { points } = state;

  // Make new points based on existing, with shifted Y values
  const movedPoints = points.map(pt => {
    // Add a little to the Y. Amount depends on radius & gravity
    // Larger radius will move faster
    let y = pt.y + (pt.radius * gravity);
    // If we go past 1, wrap around to 0
    if (pt.y > 1) y = 0;
    return {
      ...pt,
      y
    };
  });

  // Update state with the new points
  saveState({
    points: movedPoints
  });
};

/**
 * Each point is drawn as a circle
 * @param {CanvasRenderingContext2D} context 
 * @param {{x:number, y:number,radius:number}} pt 
 */
const drawPoint = (context, pt) => {
  const { radiusMax, dotColour } = settings;
  const { width, height } = state.bounds;

  // Convert relative x,y coords to screen coords
  const { x, y } = Points.multiply(pt, { x: width, y: height });

  // Calculate radius based on relative random radius
  // and the max radius.
  const radius = radiusMax * pt.radius;

  // Translate so 0,0 is the middle
  context.save();
  context.translate(x, y);

  // Fill a circle
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fillStyle = dotColour;
  context.fill();

  // Unwind translation
  context.restore();
};

/**
 * Clear
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
  context.fillStyle = `hsla(${Colour.getCssVariable(`hue`, `100`)}, 100%, 1%, 0.1)`;
  context.fillRect(0, 0, width, height);
};

function setup() {
  // Keep our primary canvas full size
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
  window.requestAnimationFrame(loop);
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