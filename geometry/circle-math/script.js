import * as Dom from '../../ixfx/dom.js';
import { Points, Circles } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  radiusViewProportion: 0.45 /* 45% keeps it within screen */,
  circle: {
    x: 0.5, y: 0.5, radius: 0.1
  }
});

let state = Object.freeze({
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
  /** @type {number} */
  scaleBy: 1,
  /** @type {Points.Point} */
  pointer: { x:0.5, y:0.5 },
  /** @type {Points.Point|undefined} */
  nearest: undefined
});

// Update state of world
const tick = () => {
  const { circle } = settings;
  const { pointer } = state;
  if (pointer) {
    const nearest = Circles.nearest(circle, pointer);
    
    if (!Points.isNaN(nearest)) {
      updateState({ nearest });
    }
  }
};

/**
 * Draw a circle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Circles.CirclePositioned} circle ö
 * @param {string} strokeStyle
 * @param {number} lineWidth
 */
const drawCircle = (ctx, circle, strokeStyle = `white`, lineWidth = 20, fillStyle = ``) => {
  const absPos = Points.multiply(circle, state.scaleBy, state.scaleBy);
  const radius = circle.radius * state.scaleBy;

  ctx.save();
  ctx.translate(absPos.x, absPos.y);

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.arc(0, 0, radius, 0, Math.PI*2);
  ctx.stroke();

  if (fillStyle.length > 0) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  ctx.closePath();

  ctx.restore();
};

const drawState = () => {
  const { nearest } = state;

  const canvasEl = /** @type {HTMLCanvasElement|null} */(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx || !canvasEl) return;

  // Clear
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  
  // Draw circle
  drawCircle(ctx, settings.circle);

  // Draw pointer
  drawCircle(ctx, { ...state.pointer, radius: 0.01 }, `yellow`, 5, `yellow`);

  // Draw nearest
  if (nearest) {
    drawCircle(ctx, { ...nearest, radius: 0.01 }, `black`, 3, `black`);
  }
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({
      bounds: args.bounds,
      scaleBy: Math.min(args.bounds.width, args.bounds.height)
    });
  });

  const loop = () => {
    tick();
    drawState();  
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointermove`, evt => {
    const rel = Points.divide(evt, state.scaleBy, state.scaleBy);
    updateState({
      pointer: rel
    });
  });
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

