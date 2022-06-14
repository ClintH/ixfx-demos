/**
 * Demonstrates:
 *  - Creating a rectangle based on center and top-left reference points
 *  - Drawing a rectangle using `strokeRect` (in-built)
 *  - Computing corners coordinates, computing line geometry for a rectangle
 *  - Drawing based on these computed composite shapes
 */
import * as Dom from '../../ixfx/dom.js';
import {Rects, Points} from '../../ixfx/geometry.js';

// Define settings
const settings = {
  centerColour: `yellow`,
  cornerColour: `blue`
};

// Initial state with empty values
let state = {
  bounds: {
    width: 0,
    height: 0,
    center: {x: 0, y: 0}
  },
  pointer: {x: 0, y: 0}
};

// Update state of world
const update = () => {

}

/**
 * Draws a rectangle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number,y:number,width:number,height:number}} r 
 */
const drawRect = (ctx, r, strokeStyle) => {
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 2;
  ctx.strokeRect(r.x, r.y, r.width, r.height);
}

/**
 * Demonstrates drawing a rectangle line by line.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number,y:number,width:number,height:number}} r 
 */
const drawRectManual = (ctx, r, strokeStyle) => {
  // Compute corner coordinates for a rect
  const pts = Rects.corners(r);
  ctx.strokeStyle = strokeStyle;

  // Draw circles for each corner
  pts.forEach(p => {
    // Draw a circle
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Compute the lines for a rectangle
  const lines = Rects.edges(r);

  // Start at first point
  ctx.beginPath();
  const firstPoint = lines[0].a;
  ctx.moveTo(firstPoint.x, firstPoint.y);

  // For each line
  ctx.lineWidth = 1;
  lines.forEach(line => {
    const lineEnd = line.b;
    ctx.lineTo(lineEnd.x, lineEnd.y);
  });

  // ...and back to start to close the rectangle
  ctx.lineTo(firstPoint.x, firstPoint.y)
  ctx.stroke();
}

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {pointer, bounds} = state;
  const {centerColour, cornerColour} = settings;

  // Create a rectangle from its center
  //   in this case, the pointer position
  const r = Rects.fromCenter(pointer, 200, 100);

  // Draw a rectangle using the in-built `strokeRect`
  drawRect(ctx, r, centerColour);

  // Draw rectangle 'manually'.
  const r2 = Rects.fromTopLeft(pointer, 100, 200);
  drawRectManual(ctx, r2, cornerColour);
}

/**
 * Clear canvas
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

  document.addEventListener(`pointermove`, e => {
    const x = e.clientX;
    const y = e.clientY;

    state = {
      ...state,
      pointer: {x, y}
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
