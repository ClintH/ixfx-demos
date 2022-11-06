// #region Imports
import * as Dom from '../../ixfx/dom.js';
import { Points, SurfacePoints } from '../../ixfx/geometry.js';
import { numericRange } from '../../ixfx/generators.js';
import { clamp } from '../../ixfx/data.js';
const piPi = Math.PI*2;
// #endregion

// #region Settings & state
const settings = Object.freeze({
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
  radiansRange: numericRange(0.01, 0, Math.PI*2, true),
});

let state = Object.freeze({
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
  /** @type {number} */
  scaleFactor: 1,
  pointer: { x:0.5, y:0.5  },
  /** @type {Points.Point3d[]} */
  points: []
});
// #endregion

// Update state of world: Rotate sphere, generate points
const update = () => {
  const { radiansRange, sphere } = settings;
  const rotation = /** @type number */(radiansRange.next().value);
  const points = [ ...SurfacePoints.sphereFibonacci(500, rotation, sphere) ];

  saveState({
    points
  });
};

/**
 * Draw state of world
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const { bounds, scaleFactor, points, pointer } = state;
  const { sphere,  dotRadius } = settings;
  
  // How much hue to increase by with each subsequent point.
  // Increase 60 to cover more of the spectrum
  const hueIncrease = (1/points.length) * 60;

  const radius = sphere.radius * scaleFactor;
  const dotRadiusScaled = dotRadius*scaleFactor;
  let hue = settings.dotHue;
  ctx.clearRect(0, 0, bounds.width, bounds.height);

  ctx.save();
  ctx.translate(bounds.center.x - radius/2, bounds.center.y - radius/2);
  points.forEach((pt,index) => {
    // Calc a % distance of pointer to this point
    const distance = 1-clamp(Points.distance(pointer, pt) / 0.7);

    // Draw a point, scaling it by the
    // absolute radius in pixels
    drawPoint(ctx, {
      x: pt.x * radius,
      y: pt.y * radius,
      // Invert z for the opacity effect we want
      z: 0.8 - pt.z
    }, 
    // Scale size of point by distance
    dotRadiusScaled*distance, 
    hue);
    hue += hueIncrease;
  });
  ctx.restore();
};

document.addEventListener(`pointermove`, evt => {
  const { bounds } = state;
  saveState({
    pointer: { 
      x: evt.x / bounds.width, 
      y: evt.y / bounds.height
    }
  });
});


// #region Toolbox
/**
 * Initialise and run main loop 
 */
const init = () => {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    saveState({
      bounds: args.bounds,
      scaleFactor: Math.min(args.bounds.width, args.bounds.height)
    });
  });

  const canvasEl = /** @type {HTMLCanvasElement|null} */(document.getElementById(`canvas`));
  const ctx =/** @type {CanvasRenderingContext2D} */(canvasEl?.getContext(`2d`));

  const loop = () => {
    update();
    draw(ctx);  
    window.requestAnimationFrame(loop);
  };
  loop();
};
init();

/**
 * Draws a point
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Points.Point3d} pt 
 * @param {number} radius
 * @param {number} hue
 */
function drawPoint(ctx, pt, radius = 5, hue = 200) {
  
  // Translate so point is 0,0
  ctx.save();
  ctx.translate(pt.x, pt.y);
  
  // Make a colour with opacity determined by Z of point
  ctx.fillStyle = `hsla(${hue},100%,50%,${pt.z})`;

  // Draw a circle
  ctx.beginPath();
  ctx.arc(0,0,radius,0,piPi);
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();
}

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

// #endregion