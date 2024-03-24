import { CanvasHelper } from '../../ixfx/dom.js';

// Define settings - properties that don't change
const settings = Object.freeze({
  updateRateMs: 10,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

// Initial state - properties that change as code runs
let state = Object.freeze({});

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
  // Get canvas
  const { canvas } = settings;
  // Get drawing context
  const { ctx } = canvas;

  // Clear canvas
  clear(canvas);

  // TODO: drawing...
  drawLabelledCircle({ x: 0.2, y: 0.2, radius: 0.1 }, `pink`);
};

/**
 * Clears canvas
 * @param {CanvasHelper} canvas 
 */
const clear = (canvas) => {
  const { width, height } = canvas.size;
  const { ctx } = canvas;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

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
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Draws a circle with optional text
 * @param {{x:number, y:number, radius:number}} circle 
 */
function drawLabelledCircle(circle, fillStyle = `black`, message = ``, textFillStyle = `white`) {
  const { canvas } = settings;
  const { ctx } = canvas;

  // Convert relative radius based on canvas size
  const radius = circle.radius * (canvas.dimensionMax / 2);

  // Convert x,y to absolute point
  const absolutePoint = canvas.toAbsolute(circle);

  // Translate so 0,0 is the center of circle
  ctx.save();
  ctx.translate(absolutePoint.x, absolutePoint.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();

  if (message.length > 0) {
    ctx.fillStyle = textFillStyle;
    ctx.textAlign = `center`;
    ctx.fillText(message, 0, 0);
  }
  ctx.restore();
}
