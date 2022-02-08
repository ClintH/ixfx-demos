import {Circles} from '../../ixfx/geometry.js'
import {Svg} from '../../ixfx/visual.js';
import {scale} from '../../ixfx/util.js';
import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';

// Settings used for sketch
const settings = {
  // Radius will be 30% of viewport
  radiusProportion: 0.3,
  text: `Hello there text on a path`,
  // Loops from 0 to 100%, but starts back at 0. In contrast, pingPong counts down to 0
  genLoop: Generators.rangePercent(0.001, true)
};

// State
let state = {
  loop: 0,
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}},
  pointer: {x: 0, y: 0}
};

// Update state of world
const update = () => {
  const {genLoop} = settings;

  state = {
    ...state,
    // Get new values from generator
    loop: genLoop.next().value
  }
}

/**
 * Update path
 * @param {SVGPathElement} circleEl 
 */
const updateSvg = (circleEl) => {
  const {radiusProportion} = settings;
  const {bounds, loop} = state;

  const radius = radiusProportion * Math.min(bounds.width, bounds.height);

  // Define circle, using center for x,y 
  const circle = {radius, ...bounds.center}

  // Rotate circle (and thus text with it)
  circleEl.style.transformOrigin = `50% 50%`;            // Rotate from middle
  circleEl.style.transform = `rotate(${loop * 360}deg)`; // Calculate rotation based on generator value

  // Update existing SVG element with new details
  const sweep = true;
  circleEl.setAttribute(`d`, Circles.toSvg(circle, sweep).join(` `));
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  const {text} = settings;
  const svg = document.querySelector(`svg`);

  // Resize SVG element to match viewport
  Dom.parentSize(svg, args => {
    state = {
      ...state,
      bounds: windowBounds()
    }
  });

  // Create an empty SVG path element for circle
  const circleEl = Svg.pathEl(``, svg, {
    fillStyle: `none`,
    strokeStyle: `none`,
    strokeWidth: 1
  });
  circleEl.id = `circlePath`;

  // Create text to go on path
  Svg.textPathEl(`#circlePath`, text, svg);

  const loop = () => {
    update();
    updateSvg(circleEl);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}

const windowBounds = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  center: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
});

setup();


