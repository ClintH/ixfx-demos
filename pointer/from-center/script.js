import { CanvasHelper } from '../../ixfx/dom.js';
import { Circles } from '../../ixfx/geometry.js';
import * as Util from './util.js';

// Define settings
const settings = Object.freeze({
  // Define a circle in relative coordinates
  circle: {
    radius: 0.1,
    x: 0.5,
    y: 0.5
  },
  hue: 290,
  saturation: 0.1,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

/** @typedef {{ 
 * distance: number
 * }} State */

/** @type State */
let state = Object.freeze({

  distance: 0
});

const update = () => {
  // Do nothing
};

const use = () => {
  const { hue, saturation, circle, canvas } = settings;
  const { distance } = state;
  const { ctx, width, height } = canvas;

  ctx.fillStyle = `hsl(${hue}, ${saturation * 100}%, ${Math.ceil(distance * 100)}%)`;
  ctx.fillRect(0, 0, width, height);

  drawCircle(circle);
};

/**
 * Draw the current state
 * @param {Circles.CirclePositioned} circle
 */
const drawCircle = (circle) => {
  const { canvas } = settings;
  const { ctx } = canvas;

  // Get absolute point
  const circlePos = canvas.toAbsolute(circle);

  // Translate to middle of circle
  ctx.save();
  ctx.translate(circlePos.x, circlePos.y);

  // Fill a circle
  ctx.arc(0, 0, circle.radius * window.innerWidth, 0, Math.PI * 2);
  ctx.fillStyle = `black`;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

const onPointerMove = (event) => {
  const { circle } = settings;

  // Compute relative point on a 0..1 scale
  const pointer = Util.toRelativePoint(event.x, event.y);

  // Distance to circle
  const distance = Circles.distanceFromExterior(circle, pointer);
  console.log(distance);

  saveState({ distance });
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  document.addEventListener(`pointermove`, onPointerMove);

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

