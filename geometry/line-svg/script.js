import { Svg, Colour } from '../../ixfx/visual.js';
import { Points } from '../../ixfx/geometry.js';
import { Numbers, Dom, Modulation } from '../../ixfx/bundle.js';

const settings = Object.freeze({
  // Relative middle
  originPoint: { x: 0.5, y: 0.5 },
  strokeWidthMax: 70,
  strokeWidthMin: 3,
  strokeStyle: Colour.getCssVariable(`arc`, `#FACF5A`),
  wave: Modulation.wave({ shape: `sine`, hertz: 0.1 })
});

/**
 * @typedef {Readonly<{
 * wave: number
 * bounds: { center: {x:number, y:number}, width: number, height: number}
 * pointers: {}
 * }>} State
 */

/** @type State */
let state = {
  wave: 0,
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
  pointers: {}
};

// Update state of world
const update = () => {
  const { wave } = settings;

  saveState({
    // Get new values from generators
    wave: wave()
  });
};

/**
 * Update line
 */
const updateSvg = () => {
  const { originPoint } = settings;
  const { bounds, wave, pointers } = state;
  const svg = document.querySelector(`svg`);

  if (!svg) return;

  // Apply same sine value to stroke width
  const strokeWidth = settings.strokeWidthMin + (wave * settings.strokeWidthMax);

  // Calc absolute point of origin according to screen size
  const originAbs = Points.multiply(originPoint, bounds.width, bounds.height);

  /** @type {Svg.LineDrawingOpts} */
  const drawingOptions = {
    strokeWidth,
    strokeStyle: settings.strokeStyle,
    strokeLineCap: `round`
  };

  // Delete all existing lines
  svg.innerHTML = ``;

  for (const [id, p] of Object.entries(pointers)) {
    // Create line for pointer
    const line = { a: originAbs, b: p };

    // Create or update line
    Svg.Elements.line(line, svg, drawingOptions, `#ray${id}`);
  }
};

function setup() {
  // Resize SVG element to match viewport
  Dom.parentSize(`svg`, arguments_ => {
    saveState({
      bounds: windowBounds()
    });
  });

  window.addEventListener(`touchmove`, event => {
    event.preventDefault();
  });

  window.addEventListener(`pointerdown`, event => {
    const { pointers } = state;
    pointers[event.pointerId] = { x: event.offsetX, y: event.offsetY };
    saveState({ pointers });
    event.preventDefault();
  });

  window.addEventListener(`pointerup`, event => {
    const { pointers } = state;
    delete pointers[event.pointerId];
    saveState({ pointers });
    event.preventDefault();
  });

  window.addEventListener(`pointermove`, event => {
    // Moving, but no press/touch
    if (event.buttons === 0) return;
    const { pointers } = state;

    pointers[event.pointerId] = { x: event.offsetX, y: event.offsetY };
    saveState({ pointers });
  });

  const loop = () => {
    update();
    updateSvg();
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
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

