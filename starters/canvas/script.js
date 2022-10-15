import * as Dom from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';

// Define settings - properties that don't change
const settings = Object.freeze({
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
  scaleBy: 1
});

/**
 * This is called at a slower rate
 * than the animation loop. It's meant for
 * mutating state in some manner
 */
const tick = () => {
  // Do some calculations
  // and call updateState({ ... })
};

/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const drawState = () => {
  /** @type HTMLCanvasElement|null */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx || !canvasEl) return;

  // Clear canvas
  clear(ctx);

  // TODO: drawing...
  drawLabelledCircle(ctx, { x: 0.2, y: 0.2, radius: 0.1 }, `pink` );
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