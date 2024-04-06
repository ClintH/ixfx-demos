import * as Numbers from '../../ixfx/numbers.js';
import { CanvasHelper } from '../../ixfx/dom.js';

// Define settings
const settings = Object.freeze({
  arc: {
    radius: 0.3,
    x: 0.5,
    y: 0.5
  },
  canvasBackdrop: new CanvasHelper(`#backdrop`, { fill: `viewport` }),
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
  outerColour: `indigo`,
  innerColour: `pink`,
  piPi: Math.PI * 2,
  // Loop back and forth between 0 and 1, 0.0.1 steps at a time
  pingPong: Numbers.pingPongPercent(0.001)
});

/** 
 * @typedef {Readonly<{
 *  progression: number
 * }>} State
 */

/** @type {State} */
let state = {
  progression: 0
};

/**
 * Fills the drawing context with a graadient fill
 * @param {CanvasRenderingContext2D} context 
 * @param {number} width
 * @param {number} height
 */
const drawGradient = (context, width, height) => {
  const { outerColour, innerColour } = settings;
  const c = { x: width / 2, y: height / 2 };

  // Make a gradient
  //  See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  const g = context.createRadialGradient(
    c.x,
    c.y,
    10,
    c.x,
    c.y,
    width);
  g.addColorStop(0, innerColour);    // Inner circle
  g.addColorStop(1, outerColour);  // Outer circle

  // Use gradient to fill whole canvas
  context.fillStyle = g;
  context.fillRect(0, 0, width, height);
};

// Update state of world
const update = () => {
  const { pingPong } = settings;

  // Update state
  saveState({
    // Get a new value from the generator
    progression: pingPong.next().value,
  });
};

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} context 
 */
const draw = (context) => {
  const { progression } = state;
  const { canvas, piPi, arc } = settings;
  context.fillStyle = `black`;

  // Draw arcs
  context.strokeStyle = `white`;
  context.lineWidth = 5;

  const arcAbs = canvas.toAbsolute(arc);
  const arcRadiusAbs = arc.radius * canvas.dimensionMin;

  // Draw a series of arcs. 
  // Start at max radius, count down by 10 down to a min of 10
  const radiusRange = Numbers.numericRange(-10, arcRadiusAbs, 10);
  for (const radius of radiusRange) {
    context.beginPath();
    // Arc end angle is determined by the ping-pong progression
    context.arc(arcAbs.x, arcAbs.y, radius, 0, piPi * progression);
    context.stroke();
  }
};


function onBackdropResize() {
  const { ctx, width, height } = settings.canvasBackdrop;
  drawGradient(ctx, width, height);
}
/**
 * Setup and run main loop 
 */
const setup = () => {
  settings.canvasBackdrop.addEventListener(`resize`, onBackdropResize);

  // Backdrop is automatically assigned -100, we want this one to be above that.
  //canvasElement.style.zIndex = `0`;

  onBackdropResize();
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();

const use = () => {
  const { canvas } = settings;

  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw(canvas.ctx);
};


/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}