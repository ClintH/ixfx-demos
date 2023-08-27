import { Svg } from '../../ixfx/visual.js';
import { scalePercent } from '../../ixfx/data.js';
import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';

// Define settings
const settings = Object.freeze({
  radiusMin: 20,
  // Radius will be max 40% of viewport
  radiusProportion: 0.4,
  strokeWidthMax: 70,
  strokeWidthMin: 3,
  strokeStyle: `#EEBB55`,
  // Loop up and down again from 0 and 100%, 1% at a time
  genPingPong: Generators.pingPongPercent(0.01),
  // Loops from 0 to 100%, but starts back at 0.
  // In contrast, pingPong counts down to 0
  genLoop: Generators.numericPercent(0.01, true)
});

// Initialise state
let state = Object.freeze({
  /** @type {number} */
  pingPong: 0,
  /** @type {number} */
  loop: 0,
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
  pointer: { x: 0, y: 0 },
  /** @type {SVGCircleElement|undefined} */
  circleEl: undefined
});

// Update state of world
const update = () => {
  const { genPingPong, genLoop } = settings;

  // In case generator stops returning values, default to 0
  let v = genLoop.next().value;
  if (!v) v = 0;

  saveState({
    // Get new values from generators
    pingPong: genPingPong.next().value,
    loop: v
  });
};

const use = () => {
  const { radiusProportion } = settings;
  const { bounds, pingPong, pointer, circleEl } = state;

  if (circleEl === undefined) return;

  // pingPong runs from 0-100%, producing a radius that is too large.
  const radius = settings.radiusMin + 
    (bounds.width * scalePercent(pingPong, 0, radiusProportion));

  // Apply same pingPong value to stroke width
  const width = settings.strokeWidthMin + (pingPong * settings.strokeWidthMax);

  // Define circle, using pointer for x,y 
  const circle = { radius, ...pointer };

  // Apply stroke width
  Svg.applyStrokeOpts(circleEl, { strokeWidth: width });

  // Update circle
  Svg.Elements.circleUpdate(circleEl, circle);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const svg = document.querySelector(`svg`);
  if (svg === null) return;

  // Resize SVG element to match viewport
  Dom.parentSize(svg, () => {
    saveState({
      bounds: windowBounds()
    });
  });

  window.addEventListener(`pointerdown`, event => {
    saveState({
      pointer: { x: event.offsetX, y: event.offsetY }
    });
  });

  window.addEventListener(`pointermove`, event => {
    saveState({
      pointer: { x: event.offsetX, y: event.offsetY }
    });
  });

  // Create SVG `path` element for circle
  const options = {
    fillStyle: `none`,
    strokeStyle: settings.strokeStyle,
    strokeWidth: settings.strokeWidthMax
  };

  saveState({
    circleEl: Svg.Elements.circle({ radius: 10, x: 10, y: 10 }, svg, options) });

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};

const windowBounds = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  center: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
});

setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
