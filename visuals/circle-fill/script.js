import { CanvasHelper } from '../../ixfx/dom.js';
import { repeat } from '../../ixfx/flow.js';
import * as Random from '../../ixfx/random.js';
import { Points, Circles, Polar } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  numberOfPoints: 500,
  piPi: Math.PI * 2,
  // Try also using other random sources, such as
  // Random.weightedSource(`cubicIn`), or Random.gaussian()
  randomSource: Math.random,
  pointColour: `hsl(70, 100%, 50%)`,
  pointSize: 0.005,
  origin: { x: 0.5, y: 0.5, radius: 0.5 },
  radius: 0.5,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

let state = Object.freeze({});

/**
 * Given the random number source `r`, returns a distance for a point (0..1)
 * 
 * Try these functions:
 *  r()
 *  Math.sqrt(r())
 *  1- r()
 *  1- r()*r()
 *  1- r()*r()*r()
 *  1- r()*r()*r()*r()
 *  Math.sqrt(1- r()*r()*r()*r())
 *  1 - Math.sqrt(1- r())
 *  1 - Math.sqrt(1- r() * r())
 * @param {*} r 
 * @returns number
 */
const randomDistance = (r) => r();

/**
 * 
 * @param {Circles.CirclePositioned} circle
 * @param {number} numberOfPoints 
 * @returns 
 */
const randomPoints = (circle, numberOfPoints) => {
  const { piPi, randomSource } = settings;
  const { radius } = circle;

  // Generate a random point in circle
  // Uses Polar to create a point from a random distsance and angle
  const generate = () => Polar.toCartesian(randomDistance(randomSource) * radius, randomSource() * piPi, circle);

  // Run generate() for the number of points needed, returning as an array
  return repeat(numberOfPoints, generate);
};


/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const use = () => {
  const { numberOfPoints, pointColour, origin, radius, pointSize, canvas } = settings;
  const { ctx } = canvas;

  // Make background transparent
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Get absolutely-positioned circle
  const absCircle = {
    x: origin.x * canvas.width,
    y: origin.y * canvas.height,
    radius: radius * canvas.dimensionMin
  };

  // Compute points
  const pts = randomPoints(absCircle, numberOfPoints);

  const size = pointSize * canvas.dimensionMin;
  for (const pt of pts) {
    drawPoint(ctx, pt, pointColour, size);
  }
};

function setup() {
  use();
};
setup();

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

/**
 * Draws a point (in pixel coordinates)
 * @param {CanvasRenderingContext2D} context 
 * @param {Points.Point} position 
 */
function drawPoint(context, position, fillStyle = `black`, size = 1) {
  context.fillStyle = fillStyle;
  context.beginPath();
  context.arc(position.x, position.y, size, 0, settings.piPi);
  context.fill();
}
