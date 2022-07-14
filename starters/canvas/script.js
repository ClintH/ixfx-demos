import * as Dom from '../../ixfx/dom.js';

// Define settings
const settings = {
  dotColour: `black`,
  textColour: `white`,
  radius: 100
};

// Initial state with empty values
let state = {
  bounds: {
    width: 0,
    height: 0,
    center: {x: 0, y: 0}
  },
  ticks: 0
};

// Update state of world
const update = () => {
  const {ticks} = state;
  state = {
    ...state,
    ticks: ticks + 1
  }
}

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {bounds, ticks} = state;
  const {dotColour, textColour, radius} = settings;

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
}

/**
 * Clears canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const {width, height} = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  /** @type {HTMLCanvasElement} */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl.getContext(`2d`);

  Dom.fullSizeCanvas(canvasEl, args => {
    // Update state with new size of canvas
    state = {
      ...state,
      bounds: args.bounds
    }
  });

  const loop = () => {
    // Update state
    update();

    // Clear canvas
    clear(ctx);

    // Draw new things
    draw(ctx);

    // Loop
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();
