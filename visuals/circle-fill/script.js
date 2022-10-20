/**
 * Based on Guido Schmidt's sketch:
 * https://editor.p5js.org/guidoschmidt/sketches/njMWGIsv1?s=09
 */
import * as Dom from '../../ixfx/dom.js';
import { repeat } from '../../ixfx/flow.js';
import * as Random from '../../ixfx/random.js';
import { Points, Circles, Polar } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  numberOfPoints: 500,
  piPi:Math.PI*2,
  randomSource: Math.random,
  radius: 0.1,
  dotColor: `hsl(70, 100%, 50%)`
});

let state = Object.freeze({
  bounds: { width: 0, height: 0 },
  /** @type number */
  scaleBy: 1,
  circles: [
    { x:0.15, y:0.3,  fn:(r) => r() },
    { x:0.35, y:0.3,  fn:(r) => Math.sqrt(r()) },
    { x:0.15, y:0.55, fn:(r) => 1- r() },
    { x:0.35, y:0.55, fn:(r) => 1- r()*r() },
    { x:0.55, y:0.55, fn:(r) => 1- r()*r()*r() },
    { x:0.75, y:0.55, fn:(r) => 1- r()*r()*r()*r() },
    { x:0.15, y:0.80, fn:(r) => Math.sqrt(1- r()*r()*r()*r()) },
    { x:0.35, y:0.8,  fn:(r) => 1 - Math.sqrt(1- r()) },
    { x:0.55, y:0.8,  fn:(r) => 1 - Math.sqrt(1- r() * r()) }
  ],
});

/**
 * This is called at a slower rate
 * than the animation loop. It's meant for
 * mutating state in some manner
 */
const tick = () => {
  // Do some calculations
  // and call updateState({ ... })
};

/**
 * 
 * @param {Circles.CirclePositioned} circle
 * @param {number} numberOfPoints 
 * @param {(source:Random.RandomSource)=>number} randomDistance 
 * @param {Random.RandomSource} randomSource 
 * @returns 
 */
const randomPoints = (circle, numberOfPoints, randomDistance, randomSource) => {
  const { piPi, radius } =  settings;

  const r = circle.radius ?? settings.radius;
  // Generate a random point in circle
  // Uses Polar to create a point from a random distsance and angle
  const generate = () => Polar.toCartesian(randomDistance(randomSource) * r, randomSource()*piPi, circle);

  // Run generate() for the number of points needed, returning as an array
  return repeat(numberOfPoints, generate);
};


/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const drawState = () => {
  const { numberOfPoints, radius, dotColor } = settings;
  const { scaleBy, bounds } = state;

  /** @type HTMLCanvasElement|null */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx || !canvasEl) return;

  // Make background transparent
  ctx.clearRect(0, 0, bounds.width, bounds.height);

  // Draw each circle
  const randomSource = Math.random;
  for (const c of state.circles) {
    // Get absolutely-positioned circle
    const absCircle = Circles.multiplyScalar({ x: c.x, y:c.y, radius }, scaleBy);
    
    // Compute points
    const pts = randomPoints(absCircle, numberOfPoints, c.fn, randomSource);

    pts.forEach(pt => drawDot(ctx, pt, dotColor));
  }
};


/**
 * Setup and run main loop 
 */
const setup = () => {
  Dom.fullSizeCanvas(`#canvas`, args => {
    updateState({ 
      bounds: args.bounds,
      scaleBy: Math.min(args.bounds.width, args.bounds.height)
    });
    drawState();
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

/**
 * Draws a point (in pixel coordinates)
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Points.Point} position 
 */
function drawDot(ctx, position, fillStyle = `black`, size = 1)  {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(position.x, position.y, size, size);
}
