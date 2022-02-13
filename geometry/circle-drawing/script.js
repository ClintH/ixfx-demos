import {pingPongPercent, forEach, count} from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';

// Define settings
const settings = {
  outerColour: `indigo`,
  innerColour: `pink`,
  piPi: Math.PI * 2,
  // Loop back and forth between 0 and 1, 1% at a time
  pingPong: pingPongPercent(0.01),
  // % to reduce radius by for each circle
  radiusDecay: 0.8,
  // Proportion of viewport size to radius
  radiusViewProportion: 0.45 /* 45% keeps it within screen */
};

// Initial state with empty values
let state = {
  pingPong: 0,
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}}
};

// Update state of world
const update = () => {
  const {pingPong, radiusViewProportion} = settings;
  const {bounds} = state;

  // Define radius in proportion to viewport size
  const radius = Math.min(bounds.width, bounds.height) * radiusViewProportion;

  // Update state
  state = {
    bounds,
    radius,
    // Get a new value from the generator
    pingPong: pingPong.next().value,
  }
}

/**
 * Draw a gradient-filled circle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} radius 
 */
const drawGradientCircle = (ctx, radius) => {
  // Grab state/settings we need
  const {pingPong, bounds} = state;
  const {piPi} = settings;
  const {center} = bounds;

  // Let inner circle of gradient grow in and out.
  const inner = pingPong * radius;

  // Define bounds based on radius. Needed for gradient creation
  const circleBounds = {
    ...bounds,
    width: radius,
    height: radius
  }

  // Create a gradient 'brush' based on size of circle
  ctx.fillStyle = getGradient(ctx, inner, circleBounds);

  // Fill circle
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, piPi);
  ctx.fill();
}
/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  let {radius} = state;
  const {radiusDecay} = settings;

  // Uses ixfx's forEach and count to run the body 10 times
  forEach(count(10), () => {
    // Draw a circle with given radius  
    drawGradientCircle(ctx, radius);

    // Diminish radius
    radius *= radiusDecay;
  });
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  /** @type {HTMLCanvasElement} */
  const canvasEl = Dom.resolveEl(`#canvas`);
  const ctx = canvasEl.getContext(`2d`);
  Dom.fullSizeCanvas(canvasEl, args => {
    // Update state with new size of canvas
    state = {
      ...state,
      bounds: args.bounds
    }
  });

  const loop = () => {
    update();
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    draw(ctx);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();

/**
 * Returns a gradient fill
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{width:number, height:number, center: {x:number, y:number}}} bounds 
 */
const getGradient = (ctx, inner, bounds) => {
  const {outerColour, innerColour} = settings;

  const c = bounds.center;

  // Make a gradient
  //  See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  const g = ctx.createRadialGradient(
    c.x,
    c.y,
    inner,
    c.x,
    c.y,
    bounds.width);
  g.addColorStop(0, innerColour);    // Inner circle
  g.addColorStop(1, outerColour);  // Outer circle

  return g;
}