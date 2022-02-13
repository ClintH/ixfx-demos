import {Svg} from '../../ixfx/visual.js';
import {scalePercentOutput} from '../../ixfx/util.js';
import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';

// Define settings
const settings = {
  radiusMin: 20,
  // Radius will be max 40% of viewport
  radiusProportion: 0.4,
  strokeWidthMax: 70,
  strokeWidthMin: 3,
  strokeStyle: `black`,
  // Loop up and down again from 0 and 100%, 1% at a time
  genPingPong: Generators.pingPongPercent(0.01),
  // Loops from 0 to 100%, but starts back at 0. In contrast, pingPong counts down to 0
  genLoop: Generators.rangePercent(0.01, true)
};

// Initialise state
let state = {
  pingPong: 0,
  loop: 0,
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}},
  pointer: {x: 0, y: 0}
};

// Update state of world
const update = () => {
  const {genPingPong, genLoop} = settings;

  // In case generator stops returning values, default to 0
  let v = genLoop.next().value;
  if (!v) v = 0;

  state = {
    ...state,
    // Get new values from generators
    pingPong: genPingPong.next().value,
    loop: v
  }
}

/**
 * Update circle
 * @param {SVGCircleElement} circleEl 
 */
const updateSvg = (circleEl) => {
  const {radiusProportion} = settings;
  const {bounds, pingPong, loop, pointer} = state;

  // pingPong runs from 0-100%, producing a radius that is too large. Scale
  const radius = settings.radiusMin + (bounds.width * scalePercentOutput(pingPong, 0, radiusProportion));

  // Apply same pingPong value to stroke width
  const width = settings.strokeWidthMin + (pingPong * settings.strokeWidthMax);

  // Define circle, using pointer for x,y 
  const circle = {radius, ...pointer}

  // Apply stroke width
  Svg.applyOpts(circleEl, {strokeWidth: width});

  // Update circle
  Svg.Elements.circleUpdate(circleEl, circle);
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  const svg = document.querySelector(`svg`);

  // Resize SVG element to match viewport
  Dom.parentSize(svg, args => {
    state = {
      ...state,
      bounds: windowBounds()
    }
  });

  window.addEventListener(`pointermove`, (ev) => {
    state = {
      ...state,
      pointer: {x: ev.offsetX, y: ev.offsetY}
    }
  })

  // Create SVG `path` element for circle
  const circleEl = Svg.Elements.circle({radius: 10, x: 10, y: 10}, svg, {
    fillStyle: `none`,
    strokeStyle: settings.strokeStyle,
    strokeWidth: settings.strokeWidthMax
  });

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


