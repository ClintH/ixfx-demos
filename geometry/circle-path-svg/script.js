import { Circles } from '../../ixfx/geometry.js';
import { Svg } from '../../ixfx/visual.js';
import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';

const settings = Object.freeze({
  // Colour for text
  textStyle: `#54BAB9`,
  // Radius will be 30% of viewport
  radiusProportion: 0.3,
  text: `Hello there text on a path`,
  // Loops from 0 to 100%, but starts back at 0. 
  // In contrast, pingPong counts down to 0
  genLoop: Generators.numericPercent(0.001, true)
});

let state = Object.freeze({
  /** @type {number} */
  loop: 0,
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
  pointer: { x: 0, y: 0 },
  /** @type {SVGPathElement|undefined} */
  circleEl: undefined
});

// Update state of world
const update = () => {
  const { genLoop } = settings;

  // Get new values from generator
  const v = genLoop.next().value;
  if (!v) return; // Exit if generator doesn't return a value

  saveState({
    loop: v
  });
};

const use = () => {
  const { radiusProportion } = settings;
  const { circleEl, bounds, loop } = state;
  if (!circleEl) return;

  const radius = radiusProportion * Math.min(bounds.width, bounds.height);

  // Define circle, using center for x,y 
  const circle = { radius, ...bounds.center };

  // Rotate circle (and thus text with it)
  circleEl.style.transformOrigin = `50% 50%`; // Rotate from middle
  // Calculate rotation based on generator value
  circleEl.style.transform = `rotate(${loop * 360}deg)`;

  // Update existing SVG element with new details
  const sweep = true;
  circleEl.setAttribute(`d`, Circles.toSvg(circle, sweep).join(` `));
};

function setup() {
  const { text, textStyle } = settings;
  const svg = document.querySelector(`svg`);
  if (svg === null) return;

  // Resize SVG element to match viewport
  Dom.parentSize(svg, arguments_ => {
    saveState({
      bounds: windowBounds()
    });
  });

  // Create an empty SVG path element for circle
  const circleElement = Svg.Elements.path(``, svg, {
    fillStyle: `none`,
    strokeStyle: `none`,
    strokeWidth: 1
  });
  circleElement.id = `circlePath`;
  saveState({ circleEl: circleElement });

  // Create text to go on path
  Svg.Elements.textPath(`#circlePath`, text, svg, {
    fillStyle: textStyle
  });

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
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
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}