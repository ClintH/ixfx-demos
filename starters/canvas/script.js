import * as Dom from '../../ixfx/dom.js';

// Define settings
const settings = Object.freeze({
  dotColour: `black`,
  textColour: `white`,
  radius: 100,
  /** @type {HTMLCanvasElement|null} */
  canvasEl: document.querySelector(`#canvas`)
});

// Initial state with empty values
let state = {
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  ticks: 0
};

/**
 * Update state
 * @param {Partial<state>} s 
 */
const updateState = (s) => {
  state = {
    ...state,
    ...s
  };
};

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const { bounds, ticks } = state;
  const { dotColour, textColour, radius } = settings;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(bounds.center.x, bounds.center.y);

  // Fill a circle
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = dotColour;
  ctx.fill();

  // Draw some text
  ctx.fillStyle = textColour;
  ctx.fillText(ticks.toString(), 0, 0);

  // Unwind translation
  ctx.restore();
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

const useState = () => {
  const { canvasEl } = settings;
  if (canvasEl === null) return; // Canvas element is missing :`(

  const ctx = canvasEl.getContext(`2d`);
  if (ctx === null) return;

  // Clear canvas
  clear(ctx);

  // Draw new things
  draw(ctx);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const { canvasEl } = settings;
  Dom.fullSizeCanvas(canvasEl, args => {
    // Update state with new size of canvas
    updateState({ bounds: args.bounds });
  });

  const loop = () => {
    updateState({ ticks: state.ticks + 1 });
    useState();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();
