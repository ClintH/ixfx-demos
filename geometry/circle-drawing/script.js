import { Modulation, Numbers, Flow } from '../../ixfx/bundle.js';
import { CanvasHelper } from '../../ixfx/dom.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport`, scaleBy: `min` }),
  outerColour: `indigo`,
  innerColour: `pink`,
  piPi: Math.PI * 2,
  wave: Modulation.wave({ hertz: 0.1 }),
  // % to reduce radius by for each circle
  radiusDecay: 0.8,
  // Relative radius size (45% of screen)
  radius: 0.45
});

/**
 * @typedef {Readonly<{
 *  wave: number
 * }>} State
 */

/** @type {State} */
let state = Object.freeze({
  wave: 0
});

// Update state of world
const update = () => {
  const { wave } = settings;

  // Update state
  saveState({
    // Get a new value from the generator
    wave: wave(),
  });
};

/**
 * Draw a gradient-filled circle
 * @param {number} radiusAbs 
 */
const drawGradientCircle = (radiusAbs) => {
  const { wave } = state;
  const { canvas, piPi } = settings;
  const { ctx, center } = canvas;

  // Let inner circle of gradient grow in and out.
  const inner = wave * radiusAbs;

  // Create a gradient 'brush' based on size of circle
  ctx.fillStyle = getGradient(ctx, inner, canvas.center, radiusAbs);

  // Fill circle
  ctx.beginPath();
  ctx.arc(center.x, center.y, radiusAbs, 0, piPi);
  ctx.fill();
};

const use = () => {
  const { canvas } = settings;
  canvas.clear();
  draw();
};

/**
 * Draw the current state
 */
const draw = () => {
  const { radius } = settings;
  const { canvas, radiusDecay } = settings;

  // Convert radius to absolute value
  let radiusAbs = radius * canvas.dimensionMin;

  // Uses ixfx's forEach and count to run the body 10 times
  Flow.forEach(Numbers.count(10), () => {
    // Draw a circle with given radius  
    drawGradientCircle(radiusAbs);

    // Diminish radius
    radiusAbs *= radiusDecay;
    return true; // Keep looping
  });
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Returns a gradient fill
 * @param {CanvasRenderingContext2D} context 
 * @param {number} inner
 * @param {{x:number,y:number}} center
 * @param {number} width
 */
function getGradient(context, inner, center, width) {
  const { outerColour, innerColour } = settings;

  // Make a gradient
  //  See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  const g = context.createRadialGradient(
    center.x,
    center.y,
    inner,
    center.x,
    center.y,
    width);
  g.addColorStop(0, innerColour);    // Inner circle
  g.addColorStop(1, outerColour);  // Outer circle

  return g;
}

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

