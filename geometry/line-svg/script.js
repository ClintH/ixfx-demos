import * as Dom from '../../ixfx/dom.js';
import {Points} from '../../ixfx/geometry.js';
import {repeat} from '../../ixfx/flow.js';

const randomPoint = () => ({
  x: Math.random(),
  y: Math.random(),
  radius: Math.random()
});

// Define settings
const settings = {
  // Drawing settings
  dotColour: `black`,
  radiusMax: 10,

  // Generate 100 random points
  // with x,y and radius on 0..1 scale
  points: repeat(100, randomPoint)
};

// Initial state with empty values
let state = {
  bounds: {
    width: 0,
    height: 0,
    center: {x: 0, y: 0}
  }
};

// Update state of world
const update = () => {

}

/**
 * Each point is drawn as a circle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number, y:number,radius:number}} pt 
 */
const drawPoint = (ctx, pt) => {
  const {radiusMax, dotColour} = settings;
  const {width, height} = state.bounds;

  // Convert relative x,y coords to screen coords
  const {x, y} = Points.multiply(pt, {x: width, y: height});

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
}

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {points} = settings;

  // Draw each points
  points.forEach(p => {
    drawPoint(ctx, p);
  });
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const {width, height} = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  /** @type {HTMLCanvasElement} */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl.getContext(`2d`);

  Dom.fullSizeCanvas(canvasEl, args => {
    // Update state with new size of canvas
    state = {
      ...state,
      bounds: args.bounds
    }
  });

  const loop = () => {
    // Update state
    update();

    // Clear canvas
    clear(ctx);

    // Draw new things
    draw(ctx);

    // Loop
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();
