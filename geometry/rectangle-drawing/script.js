/**
 * Demonstrates:
 *  - Creating a rectangle based on center and top-left reference points
 *  - Drawing a rectangle using `strokeRect` (in-built)
 *  - Computing corners coordinates, computing line geometry for a rectangle
 *  - Drawing based on these computed composite shapes
 */
import * as Dom from '../../ixfx/dom.js';
import { Rects, Lines } from '../../ixfx/geometry.js';

// Define settings
const settings = Object.freeze({
  centerColour: `yellow`,
  cornerColour: `blue`
});

// Initial state with empty values
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  pointer: { x: 0, y: 0 }
});

// Update state of world
const onTick = () => {

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
 * Draws a rectangle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number,y:number,width:number,height:number}} r 
 */
const drawRect = (ctx, r, strokeStyle) => {
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 2;
  ctx.strokeRect(r.x, r.y, r.width, r.height);
};

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
  // Get points
  const points = Lines.asPoints(lines);
  let started = false;

  ctx.beginPath();
  for (const pt of points) {
    if (started) {
      ctx.lineTo(pt.x, pt.y);
    } else {
      ctx.moveTo(pt.x, pt.y);
      started = true;
    }
  }
  ctx.stroke();
};

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const { pointer } = state;
  const { centerColour, cornerColour } = settings;

  // Create a rectangle from its center
  //   in this case, the pointer position
  const r = Rects.fromCenter(pointer, 200, 100);

  // Draw a rectangle using the in-built `strokeRect`
  drawRect(ctx, r, centerColour);

  // Draw rectangle 'manually'.
  const r2 = Rects.fromTopLeft(pointer, 100, 200);
  drawRectManual(ctx, r2, cornerColour);
};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

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

  /**
   * Handle pointerdown and pointermove
   * @param {PointerEvent} e 
   */
  const onPointer = (e) => {
    const x = e.clientX;
    const y = e.clientY;
  
    updateState({
      pointer: { x, y }
    });
  };

  document.addEventListener(`pointerdown`, onPointer);
  document.addEventListener(`pointermove`, onPointer);

  const loop = () => {
    onTick();
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}