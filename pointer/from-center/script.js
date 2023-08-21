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
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) return;

  context.fillStyle = `hsl(${hue}, ${saturation*100}%, ${Math.ceil(distance*100)}%)`;
  context.fillRect(0, 0, bounds.width, bounds.height);

  drawCircle(context, circle);
};

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} context 
 * @param {Circles.CirclePositioned} circle
 */
const drawCircle = (context, circle) => {
  
  // Get absolute point
  const circlePos = toAbsolutePoint(circle);

  // Translate to middle of circle
  context.save();
  context.translate(circlePos.x, circlePos.y);

  // Fill a circle
  context.arc(0, 0, circle.radius*window.innerWidth, 0, Math.PI * 2);
  context.fillStyle = `black`;
  context.fill();

  // Unwind translation
  context.restore();
};

const onPointerMove = (event) => {
  const { circle } = settings;

  // Compute relative point on a 0..1 scale
  const pointer = {
    x: clamp(event.x / window.innerWidth),
    y: clamp(event.y / window.innerHeight)
  };

  // Distance to circle
  const distance = Circles.distanceFromExterior(circle, pointer);
  console.log(distance);
  updateState({ distance });
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    updateState({ bounds: arguments_.bounds });
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