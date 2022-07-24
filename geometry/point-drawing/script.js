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

let state = {
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  // Generate 100 random points
  // with x,y and radius on 0..1 scale
  points: repeat(100, randomPoint)
};

/**
 * Update state
 * @param {Partial<state>} s 
 */
const updateState = (s) => {
  state = {
    ...state,
    ...s
  };
};

const useState = () => {
  const { points } = state;
  
  const canvasEl = /** @type {HTMLCanvasElement} */(document.querySelector(`#canvas`));
  const ctx = canvasEl?.getContext(`2d`);

  if (!ctx) return;
    
  // Clear canvas
  clear(ctx);

  ctx.globalCompositeOperation = `lighter`; // color-dodge also good

  // Draw each point
  points.forEach(p => drawPoint(ctx, p));
};

// Update state of world
const update = () => {
  const { gravity } = settings;
  const { points } = state;

  // Make new points based on existing, with shifted Y values
  const movedPoints = points.map(pt => {
    // Add a little to the Y. Amount depends on radius & gravity
    // Larger radius will move faster
    let newY = pt.y + (pt.radius * gravity);
    // If we go past 1, wrap around to 0
    if (pt.y > 1) newY = 0;
    return {
      ...pt,
      y: newY
    };
  });

  // Update state with the new points
  updateState({
    points: movedPoints
  });
};

/**
 * Each point is drawn as a circle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number, y:number,radius:number}} pt 
 */
const drawPoint = (ctx, pt) => {
  const { radiusMax, dotColour } = settings;
  const { width, height } = state.bounds;

  // Convert relative x,y coords to screen coords
  const { x, y } = Points.multiply(pt, { x: width, y: height });

  // Calculate radius based on relative random radius
  // and the max radius.
  const radius = radiusMax * pt.radius;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(x, y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = dotColour;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

/**
 * Clear
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
  ctx.fillStyle = `hsla(${Colour.getCssVariable(`hue`, `100`)}, 100%, 1%, 0.1)`;
  ctx.fillRect(0, 0, width, height);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({
      bounds: args.bounds
    });
  });

  const loop = () => {
    update();
    useState();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();
