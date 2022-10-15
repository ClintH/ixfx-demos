import * as Dom from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';
import { clamp } from '../../ixfx/data.js';

// Define settings - properties that don't change
const settings = Object.freeze({
  circleColour: `black`,
  textColour: `white`,
  tickLoopMs: 10
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
  circle: {
    x: 0.5,
    y: 0.5,
    radius: 0.5,
    radiusIncrement: 0.01
  },
  /** @type {number} */
  ticks: 0
});

/**
 * This is called at a slower rate
 * than the animation loop. It's meant for
 * mutating state in some manner
 */
const tick = () => {
  let { ticks, circle } = state;
  let { radius, radiusIncrement } = circle;

  // Increment ticks
  ticks++;

  // If radius is at 100% or 0%, flip the
  // direction of radius incrementing (-0.1 or 0.1)
  if (radius >= 1 || radius <= 0) radiusIncrement *= -1;

  // Add a % of current radius
  const changeBy = Math.max(radius, 0.01) * radiusIncrement;
  radius = radius + changeBy;

  // Make sure we don't exceed 0 or 1
  radius = clamp(radius);

  // Make a new circle with updated values
  circle =  {
    ...circle,
    radius,
    radiusIncrement
  };

  // Save newly calculated ticks and circle into state
  updateState({ ticks, circle });
};

/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const drawState = () => {
  const { circleColour, textColour } = settings;
  const { circle, ticks } = state;

  /** @type HTMLCanvasElement|null */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx || !canvasEl) return;

  // Clear canvas
  clear(ctx);

  // Draw
  drawLabelledCircle(ctx, 
    circle, 
    circleColour, 
    ticks.toString(),
    textColour);
};

/**
 * Clears canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;

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
const setup = () => {
  const { tickLoopMs } = settings;

  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({ 
      bounds: args.bounds,
      scaleBy: Math.min(args.bounds.width, args.bounds.height)
    });
  });

  // Call `tick` at a given rate
  const tickLoop = () => {
    tick();
    setTimeout(tickLoop, tickLoopMs);
  };
  tickLoop();

  // Animation loop
  const animationLoop = () => {
    drawState();
    window.requestAnimationFrame(animationLoop);
  };
  animationLoop();
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


/**
 * Draws a circle with optional text
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number, y:number, radius:number}} circle 
 */
function drawLabelledCircle(ctx, circle, fillStyle = `black`, msg = ``, textFillStyle = `white`)  {
  const { scaleBy } = state;

  // Convert relative radius to absolute
  const radius = circle.radius * (scaleBy / 2);

  // Convert x,y to absolute point
  const abs = Points.multiply(circle, state.bounds);

  // Translate so 0,0 is the center of circle
  ctx.save();
  ctx.translate(abs.x, abs.y);
  
  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();

  if (msg.length) {
    ctx.fillStyle = textFillStyle;
    ctx.textAlign = `center`;
    ctx.fillText(msg, 0, 0);
  }
  ctx.restore();
}