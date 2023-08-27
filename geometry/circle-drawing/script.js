import { pingPongPercent, count } from '../../ixfx/generators.js';
import { forEach } from '../../ixfx/flow.js';
import * as Dom from '../../ixfx/dom.js';

const settings = Object.freeze({
  outerColour: `indigo`,
  innerColour: `pink`,
  piPi: Math.PI * 2,
  // Loop back and forth between 0 and 1, 1% at a time
  pingPong: pingPongPercent(0.01),
  // % to reduce radius by for each circle
  radiusDecay: 0.8,
  // Proportion of viewport size to radius
  radiusViewProportion: 0.45 /* 45% keeps it within screen */,
});

let state = Object.freeze({
  /** @type {number} */
  pingPong: 0,
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
  /** @type {number} */
  radius: 0
});

// Update state of world
const update = () => {
  const { pingPong, radiusViewProportion } = settings;
  const { bounds } = state;

  // Define radius in proportion to viewport size
  const radius = Math.min(bounds.width, bounds.height) * radiusViewProportion;

  // Update state
  saveState({
    bounds,
    radius,
    // Get a new value from the generator
    pingPong: pingPong.next().value,
  });
};

/**
 * Draw a gradient-filled circle
 * @param {CanvasRenderingContext2D} context 
 * @param {number} radius 
 */
const drawGradientCircle = (context, radius) => {
  // Grab state/settings we need
  const { pingPong, bounds } = state;
  const { piPi } = settings;
  const { center } = bounds;

  // Let inner circle of gradient grow in and out.
  const inner = pingPong * radius;

  // Define bounds based on radius. Needed for gradient creation
  const circleBounds = {
    ...bounds,
    width: radius,
    height: radius
  };

  // Create a gradient 'brush' based on size of circle
  context.fillStyle = getGradient(context, inner, circleBounds);

  // Fill circle
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, piPi);
  context.fill();
};

const use = () => {
  const canvasElement = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) return;

  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  draw(context);
};

/**
 * Draw the current state
 * @param {CanvasRenderingContext2D} context 
 */
const draw = (context) => {
  let { radius } = state;
  const { radiusDecay } = settings;

  // Uses ixfx's forEach and count to run the body 10 times
  forEach(count(10), () => {
    // Draw a circle with given radius  
    drawGradientCircle(context, radius);

    // Diminish radius
    radius *= radiusDecay;
  });
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds
    });
  });

  const loop = () => {
    update();
    use();  
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Returns a gradient fill
 * @param {CanvasRenderingContext2D} context 
 * @param {{width:number, height:number, center: {x:number, y:number}}} bounds 
 */
function getGradient (context, inner, bounds) {
  const { outerColour, innerColour } = settings;

  const c = bounds.center;

  // Make a gradient
  //  See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  const g = context.createRadialGradient(
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

