import { CanvasHelper } from '../../ixfx/dom.js';
import { Points, Circles } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport`, scaleBy: `min` }),
  circle: {
    x: 0.5, y: 0.5, radius: 0.3
  },
  ringThickness: 40
});

/** @typedef {Readonly<{
 *  pointer: Points.Point
 *  nearest: Points.Point|undefined
 * }>} State
 **/

/** @type {State} */
let state = Object.freeze({
  pointer: { x: 0.5, y: 0.5 },
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
 * Draw a filled dot
 * @param {CanvasHelper} canvas 
 * @param {Circles.CirclePositioned} circle
 * @param {string} fillStyle
 */
const drawDot = (canvas, circle, fillStyle = ``) => {
  const { ctx } = canvas;
  const absPos = canvas.toAbsolute(circle);

  // If radius is less than 1, assume it's a relative value
  // that needs converting
  const radius = circle.radius < 1 ? circle.radius * canvas.dimensionMin : circle.radius;

  ctx.save();
  ctx.translate(absPos.x, absPos.y);

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.closePath();

  ctx.restore();
};


/**
 * Draw a ring
 * @param {CanvasHelper} canvas 
 * @param {Circles.CirclePositioned} circle
 * @param {string} strokeStyle
 * @param {number} lineWidth
 */
const drawRing = (canvas, circle, strokeStyle, lineWidth) => {
  const { ctx } = canvas;
  const absPos = canvas.toAbsolute(circle);
  const radius = circle.radius < 1 ? circle.radius * canvas.dimensionMin : circle.radius;

  ctx.save();
  ctx.translate(absPos.x, absPos.y);

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.closePath();
  ctx.restore();
};

const drawState = () => {
  const { canvas, ringThickness } = settings;
  const { ctx, width, height } = canvas;
  const { nearest } = state;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw the silver ring
  drawRing(canvas, settings.circle, `silver`, ringThickness);

  // Draw filled yellow dot at pointer position
  drawDot(canvas, { ...state.pointer, radius: ringThickness / 2 }, `yellow`);

  // Draw filled black dot for closest point on circle
  if (nearest) {
    // 
    drawDot(canvas, { ...nearest, radius: ringThickness / 2.2 }, `black`);
  }
};

function setup() {
  const { canvas } = settings;
  const loop = () => {
    update();
    drawState();
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointermove`, event => {
    saveState({
      pointer: canvas.toRelative(event)
    });
  });
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

