import {Arcs} from '../../ixfx/geometry.js'
import {Svg} from '../../ixfx/visual.js';
import {scalePercent} from '../../ixfx/data.js';
import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';

// Define settings
const settings = {
  radiusMin: 20,
  radiusProportion: 0.4,
  startDegrees: 0,
  endDegrees: 90,
  strokeWidthMax: 70,
  strokeWidthMin: 3,
  strokeStyle: `black`,
  // Loop up and down again from 0 and 100%, 1% at a time
  genPingPong: Generators.pingPongPercent(0.01),
  // Loops from 0 to 100%, but starts back at 0. In contrast, pingPong counts down to 0
  genLoop: Generators.numericPercent(0.01, true)
};

// State
let state = {
  pingPong: 0,
  loop: 0,
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}},
};

// Update state of world
const update = () => {
  const {genPingPong, genLoop} = settings;

  // Value could potentially be undefined
  const genLoopV = genLoop.next().value;

  state = {
    ...state,
    // Get new values from generators
    pingPong: genPingPong.next().value,
    loop: genLoopV ? genLoopV : 0
  }
}

/**
 * Update path
 * @param {SVGPathElement} arcEl 
 */
const updateSvg = (arcEl) => {
  const {radiusProportion} = settings;
  const {bounds, pingPong, loop} = state;

  // pingPong runs from 0-100%, producing a radius that is too large. Scale to 0-40%
  const radius = settings.radiusMin + (bounds.width * scalePercent(pingPong, 0, radiusProportion));

  // Apply same pingPong value to stroke width
  const width = settings.strokeWidthMin + (pingPong * settings.strokeWidthMax);

  // Offset both start and end angle based on `loop` generator
  const offset = loop * 360;

  // Define arc
  const arc = Arcs.fromDegrees(radius, settings.startDegrees + offset, settings.endDegrees + offset, bounds.center);

  // Apply stroke width
  Svg.applyOpts(arcEl, {strokeWidth: width});

  // Update existing SVG element with new details
  arcEl.setAttribute(`d`, Arcs.toSvg(arc).join(` `));
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

  // Create SVG `path` element for arc
  const arcEl = Svg.Elements.path(``, svg, {
    fillStyle: `none`,
    strokeStyle: settings.strokeStyle,
    strokeWidth: settings.strokeWidthMax
  });

  const loop = () => {
    update();
    updateSvg(arcEl);
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


