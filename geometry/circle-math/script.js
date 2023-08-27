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
const update = () => {
  const { circle } = settings;
  const { pointer } = state;
  if (pointer) {
    const nearest = Circles.nearest(circle, pointer);
    
    if (!Points.isNaN(nearest)) {
      saveState({ nearest });
    }
  }
};

/**
 * Draw a circle
 * @param {CanvasRenderingContext2D} context 
 * @param {Circles.CirclePositioned} circle ö
 * @param {string} strokeStyle
 * @param {number} lineWidth
 */
const drawCircle = (context, circle, strokeStyle = `white`, lineWidth = 20, fillStyle = ``) => {
  const absPos = Points.multiply(circle, state.scaleBy, state.scaleBy);
  const radius = circle.radius * state.scaleBy;

  context.save();
  context.translate(absPos.x, absPos.y);

  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  context.arc(0, 0, radius, 0, Math.PI*2);
  context.stroke();

  if (fillStyle.length > 0) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  context.closePath();

  context.restore();
};

const drawState = () => {
  const { nearest } = state;

  const canvasElement = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) return;

  // Clear
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
  // Draw circle
  drawCircle(context, settings.circle);

  // Draw pointer
  drawCircle(context, { ...state.pointer, radius: 0.01 }, `yellow`, 5, `yellow`);

  // Draw nearest
  if (nearest) {
    drawCircle(context, { ...nearest, radius: 0.01 }, `black`, 3, `black`);
  }
};

function setup() {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds,
      scaleBy: Math.min(arguments_.bounds.width, arguments_.bounds.height)
    });
  });

  const loop = () => {
    update();
    drawState();  
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointermove`, event => {
    const pointer = Points.divide(event, state.scaleBy, state.scaleBy);
    saveState({
      pointer: pointer
    });
  });
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

