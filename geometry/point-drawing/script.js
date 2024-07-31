import { CanvasHelper } from '../../ixfx/dom.js';
import { repeatSync } from '../../ixfx/flow.js';
import { Colour } from '../../ixfx/visual.js';

/**
 * Returns a new random point with radius
 */
const randomPoint = () => ({
  x: Math.random(),
  y: Math.random(),
  radius: Math.random()
});

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
  gravity: 0.01,
  // Drawing settings
  dotColour: `hsla(${Colour.getCssVariable(`hue`, `100`)}, 100%, 80%, 0.8)`,
  radiusMax: 10
});

let state = Object.freeze({
  // Generate 100 random points
  // with x,y and radius on 0..1 scale
  points: [...repeatSync(randomPoint, { count: 100 })]
});

const use = () => {
  const { canvas } = settings;
  const { points } = state;

  // Clear canvas
  clear();

  canvas.ctx.globalCompositeOperation = `lighter`; // color-dodge also good

  // Draw each point
  for (const p of points) drawPoint(p);
};

// Update state of world
const update = () => {
  const { gravity } = settings;
  const { points } = state;

  // Make new points based on existing, with shifted Y values
  const movedPoints = points.map(pt => {
    // Add a little to the Y. Amount depends on radius & gravity
    // Larger radius will move faster
    let y = pt.y + (pt.radius * gravity);
    // If we go past 1, wrap around to 0
    if (pt.y > 1) y = 0;
    return {
      ...pt,
      y
    };
  });

  // Update state with the new points
  saveState({
    points: movedPoints
  });
};

/**
 * Each point is drawn as a circle
 * @param {{x:number, y:number,radius:number}} pt 
 */
const drawPoint = (pt) => {
  const { canvas, radiusMax, dotColour } = settings;
  const { ctx } = canvas;

  // Convert relative x,y coords to screen coords
  const { x, y } = canvas.toAbsolute(pt);

  // Calculate radius based on relative random radius
  // and the max radius.
  const radius = radiusMax * pt.radius;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(x, y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = dotColour;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

/**
 * Clear
 */
const clear = () => {
  const { ctx, width, height } = settings.canvas;

  // Make background transparent
  //ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  ctx.globalCompositeOperation = `source-over`;
  ctx.fillStyle = `hsla(${Colour.getCssVariable(`hue`, `100`)}, 100%, 1%, 0.1)`;
  ctx.fillRect(0, 0, width, height);
};

function setup() {
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
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