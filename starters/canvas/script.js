import * as Dom from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';

// Define settings - properties that don't change
const settings = Object.freeze({
  updateRateMs: 10
});

// Initial state - properties that change as code runs
let state = Object.freeze({
  bounds: {
    width: 0, height: 0,
    center: { x: 0, y: 0 },
  },
  /** @type number */
  scaleBy: 1
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

/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const draw = () => {
  /** @type HTMLCanvasElement|null */
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) return;

  // Clear canvas
  clear(context);

  // TODO: drawing...
  drawLabelledCircle(context, { x: 0.2, y: 0.2, radius: 0.1 }, `pink` );
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
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};

/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs } = settings;

  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({ 
      bounds: arguments_.bounds,
      scaleBy: Math.min(arguments_.bounds.width, arguments_.bounds.height)
    });
  });


  const updateLoop = () => {
    update();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();

  // Animation loop
  const animationLoop = () => {
    draw();
    window.requestAnimationFrame(animationLoop);
  };
  animationLoop();

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
 * @param {{x:number, y:number, radius:number}} circle 
 */
function drawLabelledCircle(context, circle, fillStyle = `black`, message = ``, textFillStyle = `white`)  {
  const { scaleBy } = state;

  // Convert relative radius to absolute
  const radius = circle.radius * (scaleBy / 2);

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
