import { CanvasHelper } from '../../ixfx/dom.js';
import { Points, SurfacePoints } from '../../ixfx/geometry.js';
import { numericRange, clamp } from '../../ixfx/numbers.js';
const piPi = Math.PI * 2;

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
  // Visualisation of points
  dotRadius: 0.01,
  dotHue: 270,
  // Sphere
  sphere: {
    x: 0.5,
    y: 0.5,
    z: 0,
    // 60% of viewport width/height, whichever is smaller
    radius: 0.6
  },
  // Continually generate numbers on the radian angle range
  radiansRange: numericRange(0.01, 0, Math.PI * 2, true),
});

/**
 * @typedef {Readonly<{
 *  pointer: Points.Point
 *  points: Points.Point3d[]
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  pointer: { x: 0.5, y: 0.5 },
  points: []
});

// Update state of world: Rotate sphere, generate points
const update = () => {
  const { radiansRange, sphere } = settings;
  const rotation = /** @type number */(radiansRange.next().value);
  const points = [...SurfacePoints.sphereFibonacci(500, rotation, sphere)];

  saveState({ points });
};

/**
 * Draw state of world
 */
const use = () => {
  const { points, pointer } = state;
  const { sphere, dotRadius, canvas } = settings;
  const { ctx, dimensionMin, center, width, height } = canvas;

  // How much hue to increase by with each subsequent point.
  // Increase 60 to cover more of the spectrum
  const hueIncrease = (1 / points.length) * 60;

  const radius = sphere.radius * dimensionMin;
  const dotRadiusScaled = dotRadius * dimensionMin;
  let hue = settings.dotHue;
  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.translate(center.x - radius / 2, center.y - radius / 2);

  // For every point...
  for (const [index, pt] of points.entries()) {
    // Calc a % distance of pointer to this point
    const distance = 1 - clamp(Points.distance(pointer, pt) / 0.7);

    // Scale size of point by distance
    const pointRadius = dotRadiusScaled * distance;
    // Draw a point, scaling it by the
    // absolute radius in pixels
    drawPoint(ctx, {
      x: pt.x * radius,
      y: pt.y * radius,
      // Invert z for the opacity effect we want
      z: 0.8 - pt.z
    }, pointRadius, hue);
    hue += hueIncrease;
  }
  ctx.restore();
};

document.addEventListener(`pointermove`, event => {
  const { canvas } = settings;
  saveState({
    pointer: canvas.toRelative({ x: event.x, y: event.y })
  });
});

/**
 * Initialise and run main loop 
 */
const init = () => {
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};
init();

/**
 * Draws a point
 * @param {CanvasRenderingContext2D} context 
 * @param {Points.Point3d} pt 
 * @param {number} radius
 * @param {number} hue
 */
function drawPoint(context, pt, radius = 5, hue = 200) {

  // Translate so point is 0,0
  context.save();
  context.translate(pt.x, pt.y);

  // Make a colour with opacity determined by Z of point
  context.fillStyle = `hsla(${hue},100%,50%,${pt.z})`;

  // Draw a circle
  context.beginPath();
  context.arc(0, 0, radius, 0, piPi);
  context.closePath();
  context.fill();

  context.restore();
}

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
