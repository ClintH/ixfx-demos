import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';

const settings = {
  outerColour: `indigo`,
  innerColour: `pink`,
  piPi: Math.PI * 2,
  // Loop back and forth between 0 and 1, 0.0.1 steps at a time
  pingPong: Generators.pingPongPercent(0.001)
}

// Initial state with empty values
let state = {
  progression: 0,
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}}
};

/**
 * Fills the drawing context with a graadient fill
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{width:number, height:number, center: {x:number, y:number}}} bounds 
 */
const drawGradient = (ctx, bounds) => {
  const {outerColour, innerColour} = settings;

  const c = bounds.center;

  // Make a gradient
  //  See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  const g = ctx.createRadialGradient(
    c.x,
    c.y,
    10,
    c.x,
    c.y,
    bounds.width);
  g.addColorStop(0, innerColour);    // Inner circle
  g.addColorStop(1, outerColour);  // Outer circle

  // Use gradient to fill whole canvas
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, bounds.width, bounds.height);
}

// Update state of world
const update = () => {
  const {pingPong} = settings;
  const {bounds} = state;

  // Create an arc based on size of canvas (which itself is determined by viewport size)
  const arc = {
    x: bounds.center.x,
    y: bounds.center.y,
    radius: Math.min(bounds.width, bounds.height) * 0.3, /* 30% of width/height */
    startRadian: 0,
    endRadian: Math.PI
  }

  // Update state
  state = {
    bounds,
    arc,
    // Get a new value from the generator
    progression: pingPong.next().value,
  }
}

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {progression, arc} = state;
  const {piPi} = settings;
  ctx.fillStyle = `black`;

  // Draw arcs
  ctx.strokeStyle = `white`;
  ctx.lineWidth = 5;

  // Draw a series of arcs. Start at max radius, count down by 10 down to a min of 10
  const radiusRange = Generators.numericRange(-10, arc.radius, 10);
  for (const radius of radiusRange) {
    ctx.beginPath();
    // Arc end angle is determined by the ping-pong progression
    ctx.arc(arc.x, arc.y, radius, 0, piPi * progression);
    ctx.stroke();
  }
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Automatically keeps canvas full size, drawing gradient background whenver it change
  Dom.fullSizeCanvas(`#backdrop`, args => {
    drawGradient(args.ctx, args.bounds);
  });

  // Keep our primary canvas full size too
  /** @type {HTMLCanvasElement} */
  const canvasEl = Dom.resolveEl(`#canvas`);
  Dom.fullSizeCanvas(canvasEl, args => {
    // Update state with new size of canvas
    state = {
      ...state,
      bounds: args.bounds
    }
  });
  canvasEl.style.zIndex = `0`; // Backdrop is automatically assigned -100, we want this one to be above that.

  const ctx = canvasEl.getContext(`2d`);


  const clear = () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  };

  const loop = () => {
    clear();
    update();
    draw(ctx);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();


/**
 * @param {HTMLCanvasElement} el 
 * @returns Bounds of element 
 */
const bounds = (el) => {
  const w = el.width;
  const h = el.height;
  return {
    center: {x: w / 2, y: h / 2},
    width: w,
    height: h
  }
}