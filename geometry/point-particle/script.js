import * as Dom from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';
import { repeat } from '../../ixfx/flow.js';
import { jitter } from '../../ixfx/modulation.js';
import { flip } from '../../ixfx/data.js';

const settings = Object.freeze({
  // Drawing settings
  dotColour: `#fed9b7`,
  bgColour: `hsla(194, 100%, 33%, 40%)`,
  radiusMax: 10,
  particles: 300
});

let state = {
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  // Generate random points
  points: repeat(settings.particles, randomPoint)
};

// Update state of world
const onTick = () => {
  const { points } = state;

  // Alter points
  const pts = points.map(pt => {
    const p = {
      // Jitter x,y based on a max amount multiplied by the inverse
      // of the radius. So smaller things will jitter more than larger
      x: jitter(pt.x, 0.001 * flip(pt.radius)),
      y: jitter(pt.y, 0.002 * flip(pt.radius)),
      radius: pt.radius
    };
    return p;
  });

  updateState({
    points: pts
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
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const { points } = state;

  // Draw each points
  points.forEach(p => {
    drawPoint(ctx, p);
  });
};

const useState = () => {
  /** @type {HTMLCanvasElement|null}} */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);

  // Draw new things
  draw(ctx);
};
/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;
  const { bgColour } = settings;

  // Make background transparent
  //ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  ctx.fillStyle = bgColour;

  ctx.globalCompositeOperation = `luminosity`; // Changing the composition style can give an interesting effect...
  ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
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
    onTick();
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

function randomPoint() {
  return {
    x: Math.random(),
    y: Math.random(),
    radius: Math.random()
  };
}

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState(s) {
  state = {
    ...state,
    ...s
  };
}