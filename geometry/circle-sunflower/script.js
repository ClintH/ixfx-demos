// #region Imports
import { CanvasHelper } from '../../ixfx/dom.js';
import { Points, SurfacePoints } from '../../ixfx/geometry.js';
import { numericRange, clamp } from '../../ixfx/numbers.js';
const piPi = Math.PI * 2;
// #endregion

// #region Settings & state
const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
  // Visualisation of points
  dots: {
    radius: 0.005,
    hue: 270
  },
  circle: {
    x: 0.5,
    y: 0.5,
    // 40% of viewport width/height, whichever is smaller
    radius: 0.4
  },
  /**
  * Options for Vogel spiral generation
  * @type {SurfacePoints.VogelSpiralOpts} 
  */
  vogelOpts: {
    density: 0.95
  },
  // Continually generate numbers on the radian angle range
  // This is used for rotating the spiral
  radiansRange: numericRange(0.001, 0, Math.PI * 2, true),
});

let state = Object.freeze({
  pointerAbs: { x: 0, y: 0 },
  /** @type {Points.Point[]} */
  pointsAbs: [],
});
// #endregion

// Update state of world: Rotate sphere, generate points
const update = () => {
  const { canvas, radiansRange, vogelOpts, circle } = settings;
  const rotation = /** @type number */(radiansRange.next().value);

  const circleAbs = { ...canvas.toAbsolute(circle), radius: circle.radius * canvas.dimensionMin };
  // Produce points on a Vogel spiral
  const pointsAbs = [...SurfacePoints.circleVogelSpiral(circleAbs, {
    ...vogelOpts,
    rotation
  })];

  // As an alternative...
  // Produce points across 15 rings
  // const pointsAbs = [ ...SurfacePoints.circleRings(circleAbs, { 
  //   rings: 15,
  //   rotation 
  // }) ];

  saveState({
    pointsAbs
  });
};

/**
 * Draw state of world
 */
const draw = () => {
  const { pointsAbs, pointerAbs } = state;
  const { canvas, dots } = settings;
  const { ctx, width, height } = canvas;

  const dotRadiusScaled = dots.radius * canvas.dimensionMin;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(0, 0);
  for (const [index, ptAbs] of pointsAbs.entries()) {
    // Calc a % distance of pointer to this point
    const distance = 1 - clamp(Points.distance(pointerAbs, ptAbs) / canvas.dimensionMin);

    drawPoint(
      ctx,
      ptAbs,
      dotRadiusScaled,
      // Scale hue based on the distance to cursor
      dots.hue * distance
    );
  }
  ctx.restore();
};

document.addEventListener(`pointermove`, event => {
  saveState({
    pointerAbs: {
      x: event.x,
      y: event.y
    }
  });
});

/**
 * Initialise and run main loop 
 */
const init = () => {
  const loop = () => {
    update();
    draw();
    window.requestAnimationFrame(loop);
  };
  loop();
};
init();

/**
 * Draws a point
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Points.Point} pt 
 * @param {number} radius
 * @param {number} hue
 */
function drawPoint(ctx, pt, radius = 5, hue = 200) {
  // Translate so point is 0,0
  ctx.save();
  ctx.translate(pt.x, pt.y);

  ctx.fillStyle = `hsl(${hue},100%,50%)`;

  // Draw a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, piPi);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
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
