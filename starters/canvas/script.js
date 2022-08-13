import * as Dom from '../../ixfx/dom.js';

// Define settings
const settings = Object.freeze({
  dotColour: `black`,
  textColour: `white`,
  radius: 100,
});

// Initial state with empty values
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type {number} */
  ticks: 0
});

const useState = () => {
  /** @type HTMLCanvasElement|null */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx || !canvasEl) return;

  // Clear canvas
  clear(ctx);

  // Draw new things
  draw(ctx);
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

/**
 * Setup and run main loop 
 */
const setup = () => {
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({ bounds: args.bounds });
  });

  const loop = () => {
    updateState({ ticks: state.ticks + 1 });
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
