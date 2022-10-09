import { scalePercent, clamp } from '../../ixfx/data.js';
import * as Dom from '../../ixfx/dom.js';
import { Points, Circles } from '../../ixfx/geometry.js';

// Define settings
const settings = Object.freeze({
  // Define a circle in relative coordinates
  circle: {
    radius: 0.1,
    x: 0.5,
    y: 0.5
  },
  hue: 290,
  saturation: 0.1
});

// Initial state with empty values
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type number */
  distance: 0
});

const useState = () => {
  const { distance, bounds } = state;
  const { hue, saturation, circle } = settings;

  /** @type HTMLCanvasElement|null */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx || !canvasEl) return;

  ctx.fillStyle = `hsl(${hue}, ${saturation*100}%, ${Math.ceil(distance*100)}%)`;
  ctx.fillRect(0, 0, bounds.width, bounds.height);

  drawCircle(ctx, circle);
};

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Circles.CirclePositioned} circle
 */
const drawCircle = (ctx, circle) => {
  
  // Get absolute point
  const circlePos = toAbsolutePoint(circle);

  // Translate to middle of circle
  ctx.save();
  ctx.translate(circlePos.x, circlePos.y);

  // Fill a circle
  ctx.arc(0, 0, circle.radius*window.innerWidth, 0, Math.PI * 2);
  ctx.fillStyle = `black`;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

const onPointerMove = (evt) => {
  const { circle } = settings;

  // Compute relative point on a 0..1 scale
  const rel = {
    x: clamp(evt.x / window.innerWidth),
    y: clamp(evt.y / window.innerHeight)
  };

  // Distance to circle
  const distance = Circles.distanceFromExterior(circle, rel);
  console.log(distance);
  updateState({ distance });
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({ bounds: args.bounds });
  });

  document.addEventListener(`pointermove`, onPointerMove);

  const loop = () => {
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();
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

function toAbsolutePoint(p) {
  return {
    x: p.x * state.bounds.width,
    y: p.y * state.bounds.height
  };
}