import * as Dom from '../../ixfx/dom.js';
import { Points, Vectors } from '../../ixfx/geometry.js';
import { pointTracker } from '../../ixfx/data.js';

// Define settings - properties that don't change
const settings = Object.freeze({
  updateRateMs: 10,
  circleHue: 320
});

// Initial state - properties that change as code runs
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 },
  },
  /** @type number */
  scaleBy: 1,
  tracker: pointTracker({
    sampleLimit: 10,
    storeIntermediate: true
  }),
  pointer: { x:0.5, y:0.5 },
  prediction: { x:0.5, y:0.5 }
});

/**
 * This is called at a slower rate
 * than the animation loop. It's meant for
 * mutating state in some manner
 */
const update = () => {
  // Do some calculations
  // and call saveState({ ... })
};

const onPointerMove = (event) => {
  const { tracker } = state;
 
  // Get a relative version of pointer position
  const pointerRelative = Points.divide(event, state.bounds);

  // Add it to the tracker
  tracker.seen(pointerRelative);

  // Get a vector of initial -> last point
  const vector = tracker.vectorCartesian;

  // Apply vector to predict the next point
  const prediction = Points.sum( vector, pointerRelative);

  saveState({ pointer: pointerRelative, prediction });
};

/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const use = () => {
  const { circleHue } = settings;

  /** @type HTMLCanvasElement|null */
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) return;

  // Clear canvas
  clear(context);

  const { pointer, prediction } = state;
  
  drawLabelledCircle(context, prediction, `hsla(${circleHue}, 50%, 50%, 0.5)` );
  drawLabelledCircle(context, pointer, `hsl(${circleHue}, 50%, 90%)` );
};

/**
 * Clears canvas
 * @param {CanvasRenderingContext2D} context 
 */
const clear = (context) => {
  const { width, height } = state.bounds;

  // Make background transparent
  context.clearRect(0, 0, width, height);

  // Clear with a colour
  //context.fillStyle = `orange`;
  //context.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //context.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //context.fillRect(0, 0, width, height);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const { updateRateMs } = settings;

  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({ 
      bounds: arguments_.bounds,
      scaleBy: Math.min(arguments_.bounds.width, arguments_.bounds.height)
    });
  });

  // Call at a given rate
  const loop = () => {
    update();
    setTimeout(loop, updateRateMs);
  };
  loop();

  // Animation loop
  const animationLoop = () => {
    use();
    window.requestAnimationFrame(animationLoop);
  };
  animationLoop();

  window.addEventListener(`pointermove`, onPointerMove);

};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Draws a circle with optional text
 * @param {CanvasRenderingContext2D} context 
 * @param {{x:number, y:number, radius?:number}} circle 
 */
function drawLabelledCircle(context, circle, fillStyle = `black`, message = ``, textFillStyle = `white`)  {
  const { scaleBy } = state;

  // Convert relative radius to absolute
  const radius = (circle.radius ?? 0.1) * (scaleBy / 2);

  // Convert x,y to absolute point
  const abs = Points.multiply(circle, state.bounds);

  // Translate so 0,0 is the center of circle
  context.save();
  context.translate(abs.x, abs.y);
  
  // Fill a circle
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.fill();

  if (message.length > 0) {
    context.fillStyle = textFillStyle;
    context.textAlign = `center`;
    context.fillText(message, 0, 0);
  }
  context.restore();
}


function setText(id, message) {
  const element =  /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element && element.textContent !== message) {
    element.textContent = message;
  }
}