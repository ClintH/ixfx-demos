/**
 * Demonstates moving a DOM element by polar coordinates
 * 
 * Angle is incremented each loop with simple addition.
 * Distance is determined by a ping-pong generator (cycles between 0..1)
 * 
 * The normal amount to turn is settings.maxRadiansPerCycle. This is multiplied
 * by the state.orbitSpeedFactor to make it slower or faster.
 */
import { Points } from '../../ixfx/geometry.js';
import { Polar } from '../../ixfx/geometry.js';
import { Modulation } from '../../ixfx/bundle.js';

const settings = Object.freeze({
  // How much angle to increment each loop, if speed is 100%
  maxRadiansPerCycle: 0.2,
  distanceWave: Modulation.wave({ shape: `sine`, hertz: 0.05 }),
});

/** @typedef {Readonly<{
 * orbitSpeedFactor:number
 * angle:number
 * distance:number
 * minDimension:number
 * bounds: { center: {x:number,y:number}, width:number,height:number}
 * }>} State */

/** @type State */
let state = Object.freeze({
  // Multiplier for orbit speed
  orbitSpeedFactor: 1,
  // Current angle (radians)
  angle: 0,
  // Current distance
  distance: 0,
  // Width or height of viewport, whichever is smaller
  minDimension: 0,
  // Will be set to size of screen
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } }
});

// Update state of world
const update = () => {
  const { distanceWave, maxRadiansPerCycle } = settings;

  // Calculate new angle
  const angle = state.angle + (maxRadiansPerCycle * state.orbitSpeedFactor);

  // Calculate distance - relative value 0..1
  const distance = distanceWave();

  // Update state
  saveState({
    ...state,
    angle,
    distance,
  });
};

const use = () => {
  const { bounds, minDimension, distance, angle } = state;
  const c = bounds.center;
  const thingElement = /** @type HTMLElement */(document.querySelector(`#thing`));
  if (!thingElement) return;

  const thingSize = thingElement.getBoundingClientRect();

  // Make distance absolute, using the dimension of viewport
  const smallestDimension = minDimension / 2; // Halve because we we're setting a radius, not diameter
  const distanceAbs = distance * smallestDimension;

  // Calculate position for circle based on polar coordinates (distance, angle & origin)
  // But we need to offset by the mid-point of circle, otherwise it will be off-centre
  const pt = Points.subtract(
    Polar.toCartesian(distanceAbs, angle, c),
    { x: thingSize.width / 2, y: thingSize.height / 2 }
  );

  thingElement.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
};

function setup() {
  const updateBounds = () => {
    const bounds = {
      width: window.innerWidth,
      height: window.innerHeight,
      center: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    };

    saveState({
      bounds: bounds,
      minDimension: Math.min(bounds.width, bounds.height)
    });
  };
  window.addEventListener(`resize`, updateBounds);
  updateBounds();

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();

  document.querySelector(`#rangeSpeed`)?.addEventListener(`input`, event => {
    const element = /** @type {HTMLInputElement}*/(event.target);

    // Range slider is 0-500, normalise to 0..1
    saveState({ orbitSpeedFactor: Number.parseInt(element.value) / 500 });
  });
};
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