import { Arcs } from '../../ixfx/geometry.js';
import { Svg } from '../../ixfx/visual.js';
import { Numbers, Dom, Modulation } from '../../ixfx/bundle.js';

// Define settings
const settings = Object.freeze({
  radiusMin: 20,
  radiusProportion: 0.3,
  startDegrees: 0,
  endDegrees: 90,
  strokeWidthMax: 70,
  strokeWidthMin: 3,
  strokeStyle: `black`,
  // Used for radius & width
  waveSine: Modulation.wave({ hertz: 0.1, shape: `sine` }),
  // Use for rotation
  waveSaw: Modulation.wave({ hertz: 0.5, shape: `saw` })
});

// State
let state = Object.freeze({
  /** @type {number} */
  sine: 0,
  /** @type {number} */
  saw: 0,
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
});

// Update state of world
const update = () => {
  const { waveSine, waveSaw } = settings;

  saveState({
    sine: waveSine(),
    saw: waveSaw()
  });
};

/**
 * Update path
 * @param {SVGPathElement} arcElement
 */
const updateSvg = (arcElement) => {
  const { radiusProportion } = settings;
  const { bounds, sine, saw } = state;

  // Sine wave runs from 0-100%, producing a radius that is too large. 
  // Scale to 0-40%
  const radius = settings.radiusMin +
    (bounds.width * Numbers.scalePercent(sine, 0, radiusProportion));

  // Apply same sine value to stroke width
  const width = settings.strokeWidthMin + (sine * settings.strokeWidthMax);

  // Offset both start and end angle based on `saw` generator
  const offset = saw * 360;

  // Define arc
  const arc = Arcs.fromDegrees(radius,
    settings.startDegrees + offset,
    settings.endDegrees + offset,
    bounds.center);

  // Apply stroke width
  Svg.applyStrokeOpts(arcElement, { strokeWidth: width });

  // Update existing SVG element with new details
  arcElement.setAttribute(`d`, Arcs.toSvg(arc).join(` `));
};

function setup() {
  const svg = document.querySelector(`svg`);
  if (svg === null) return;

  // Resize SVG element to match viewport
  Dom.parentSize(svg, arguments_ => {
    saveState({
      bounds: windowBounds()
    });
  });

  // Create SVG `path` element for arc
  const arcElement = Svg.Elements.path(``, svg, {
    fillStyle: `none`,
    strokeStyle: settings.strokeStyle,
    strokeWidth: settings.strokeWidthMax
  });

  const loop = () => {
    update();
    updateSvg(arcElement);
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
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
