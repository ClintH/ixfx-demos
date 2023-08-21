// #region Imports
import * as Dom from '../../ixfx/dom.js';
import { Points, SurfacePoints, Circles } from '../../ixfx/geometry.js';
import { numericRange } from '../../ixfx/generators.js';
import { clamp } from '../../ixfx/data.js';
const piPi = Math.PI*2;
// #endregion

// #region Settings & state
const settings = Object.freeze({
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
  radiansRange: numericRange(0.001, 0, Math.PI*2, true),
});

let state = Object.freeze({
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 }, min: 1 },
  pointerAbs: { x:0, y:0  },
  /** @type {Points.Point[]} */
  pointsAbs: [],
  circleAbs: { radius: 0, x: 0, y: 0 }
});
// #endregion

// Update state of world: Rotate sphere, generate points
const update = () => {
  const { radiansRange, vogelOpts } = settings;
  const { circleAbs } = state;
  const rotation = /** @type number */(radiansRange.next().value);

  // Produce points on a Vogel spiral
  const pointsAbs = [ ...SurfacePoints.circleVogelSpiral(circleAbs, {
    ...vogelOpts,
    rotation
  }) ];

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
 * @param {CanvasRenderingContext2D} context 
 */
const draw = (context) => {
  const { bounds, pointsAbs, pointerAbs } = state;
  const { dots } = settings;

  const dotRadiusScaled = dots.radius*bounds.min;

  context.clearRect(0, 0, bounds.width, bounds.height);
  context.save();
  context.translate(0,0);
  for (const [index, ptAbs] of pointsAbs.entries()) {
    // Calc a % distance of pointer to this point
    const distance =  1-clamp(Points.distance(pointerAbs, ptAbs) / bounds.min);

    drawPoint(
      context, 
      ptAbs, 
      dotRadiusScaled, 
      // Scale hue based on the distance to cursor
      dots.hue*distance
    );
  }
  context.restore();
};

document.addEventListener(`pointermove`, event => {
  saveState({
    pointerAbs: { 
      x: event.x, 
      y: event.y
    }
  });
});


// #region Toolbox
/**
 * Initialise and run main loop 
 */
const init = () => {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds,
      circleAbs: {
        radius: settings.circle.radius * arguments_.bounds.min,
        ...arguments_.bounds.center
      }
    });
  });

  const canvasElement = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const context =/** @type {CanvasRenderingContext2D} */(canvasElement?.getContext(`2d`));

  const loop = () => {
    update();
    draw(context);  
    window.requestAnimationFrame(loop);
  };
  loop();
};
init();

/**
 * Draws a point
 * @param {CanvasRenderingContext2D} context 
 * @param {Points.Point} pt 
 * @param {number} radius
 * @param {number} hue
 */
function drawPoint(context, pt, radius = 5, hue = 200) {
  // Translate so point is 0,0
  context.save();
  context.translate(pt.x, pt.y);
  
  context.fillStyle = `hsl(${hue},100%,50%)`;

  // Draw a circle
  context.beginPath();
  context.arc(0,0,radius,0,piPi);
  context.closePath();
  context.fill();
  
  context.restore();
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