/**
 * This sketch draws rays from the center of the screen to
 * each pointer location. Use a multi-touch device to see this.
 */
import {Svg, Colour} from '../../ixfx/visual.js';
import * as Generators from '../../ixfx/generators.js';
import * as Dom from '../../ixfx/dom.js';
import {Points} from '../../ixfx/geometry.js';

// Define settings
const settings = {
  // Relative middle
  originPoint: {x: 0.5, y: 0.5},
  strokeWidthMax: 70,
  strokeWidthMin: 3,
  strokeStyle: Colour.getCssVariable(`arc`, `#FACF5A`),
  // Loop up and down again from 0 and 100%, 1% at a time
  genPingPong: Generators.pingPongPercent(0.01),
  svg: document.querySelector(`svg`)
};

// Initialise state
let state = {
  pingPong: 0,
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}},
  pointers: {}
};

// Update state of world
const update = () => {
  const {genPingPong} = settings;

  state = {
    ...state,
    // Get new values from generators
    pingPong: genPingPong.next().value
  }
}

/**
 * Update line
 */
const updateSvg = () => {
  const {originPoint, svg} = settings;
  const {bounds, pingPong, pointers} = state;

  // Apply same pingPong value to stroke width
  const strokeWidth = settings.strokeWidthMin + (pingPong * settings.strokeWidthMax);

  // Calc absolute point of origin according to screen size
  const originAbs = Points.multiply(originPoint, bounds.width, bounds.height)


  const drawingOpts = {
    strokeWidth,
    strokeStyle: settings.strokeStyle,
    strokeLineCap: "round"
  }

  // Delete all existing lines
  svg.innerHTML = ``;

  for (const [id, p] of Object.entries(pointers)) {
    // Create line for pointer
    const line = {a: originAbs, b: p};

    // Create or update line
    Svg.Elements.line(line, svg, drawingOpts, `#ray${id}`);
  }
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

  window.addEventListener(`touchmove`, ev => {
    ev.preventDefault();
  })

  window.addEventListener(`pointerdown`, ev => {
    const {pointers} = state;
    pointers[ev.pointerId] = {x: ev.offsetX, y: ev.offsetY};
    state = {...state, pointers};
    ev.preventDefault();
  });

  window.addEventListener(`pointerup`, ev => {
    const {pointers} = state;
    delete pointers[ev.pointerId];
    state = {...state, pointers};
    ev.preventDefault();
  });

  window.addEventListener(`pointermove`, ev => {
    // Moving, but no press/touch
    if (ev.buttons === 0) return;
    const {pointers} = state;

    pointers[ev.pointerId] = {x: ev.offsetX, y: ev.offsetY};
    state = {...state, pointers};
  })

  const loop = () => {
    update();
    updateSvg();
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


