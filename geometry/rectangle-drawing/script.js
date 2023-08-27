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
const update = () => {};

const use = () => {
  /** @type {HTMLCanvasElement|null}} */
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  if (!context) return;

  // Clear canvas
  clear(context);

  // Draw new things
  draw(context);
};
/**
 * Draws a rectangle
 * @param {CanvasRenderingContext2D} context 
 * @param {{x:number,y:number,width:number,height:number}} r 
 */
const drawRect = (context, r, strokeStyle) => {
  context.strokeStyle = strokeStyle;
  context.lineWidth = 2;
  context.strokeRect(r.x, r.y, r.width, r.height);
};

/**
 * Demonstrates drawing a rectangle line by line.
 * @param {CanvasRenderingContext2D} context 
 * @param {{x:number,y:number,width:number,height:number}} r 
 */
const drawRectManual = (context, r, strokeStyle) => {
  // Compute corner coordinates for a rect
  const pts = Rects.corners(r);
  context.strokeStyle = strokeStyle;

  // Draw circles for each corner
  for (const p of pts) {
    // Draw a circle
    context.beginPath();
    context.arc(p.x, p.y, 5, 0, Math.PI * 2);
    context.stroke();
  }

  // Compute the lines for a rectangle
  const lines = Rects.edges(r);
  // Get points
  const points = Lines.asPoints(lines);
  let started = false;

  context.beginPath();
  for (const pt of points) {
    if (started) {
      context.lineTo(pt.x, pt.y);
    } else {
      context.moveTo(pt.x, pt.y);
      started = true;
    }
  }
  context.stroke();
};

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} context 
 */
const draw = (context) => {
  const { pointer } = state;
  const { centerColour, cornerColour } = settings;

  // Create a rectangle from its center
  //   in this case, the pointer position
  const r = Rects.fromCenter(pointer, 200, 100);

  // Draw a rectangle using the in-built `strokeRect`
  drawRect(context, r, centerColour);

  // Draw rectangle 'manually'.
  const r2 = Rects.fromTopLeft(pointer, 100, 200);
  drawRectManual(context, r2, cornerColour);
};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} context 
 */
const clear = (context) => {
  const { width, height } = state.bounds;

  // Make background transparent
  context.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};

function setup() {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds
    });
  });

  /**
   * Handle pointerdown and pointermove
   * @param {PointerEvent} event 
   */
  const onPointer = (event) => {
    const x = event.clientX;
    const y = event.clientY;
  
    saveState({
      pointer: { x, y }
    });
  };

  document.addEventListener(`pointerdown`, onPointer);
  document.addEventListener(`pointermove`, onPointer);

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}