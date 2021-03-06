/**
 * Demonstates moving a DOM element by polar coordinates
 * 
 * Angle is incremented each loop with simple addition.
 * Distance is determined by a ping-pong generator (cycles between 0..1)
 * 
 * The normal amount to turn is settings.maxRadiansPerCycle. This is multiplied
 * by the state.orbitSpeedFactor to make it slower or faster.
 */
import * as Generators from '../../ixfx/generators.js';
import {Points} from '../../ixfx/geometry.js';
import {Polar} from '../../ixfx/geometry.js';

// Define settings
const settings = {
  // How much angle to increment each loop, if speed is 100%
  maxRadiansPerCycle: 0.2,
  // Generator for setting radius
  distanceGen: Generators.pingPongPercent(0.001),
  // References to HTML elements
  thingEl: document.getElementById(`thing`),
  rangeSpeed: document.getElementById(`rangeSpeed`)
}

// Initialise state with empty values
let state = {
  // Multiplier for orbit speed
  orbitSpeedFactor: 1,
  // Current angle (radians)
  angle: 0,
  // Current distance
  distance: 0,
  // Width or height of viewport, whichever is smaller
  minDimension: 0,
  // Will be set to size of screen
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}}
};

// Update state of world
const update = () => {
  const {distanceGen, maxRadiansPerCycle} = settings;
  const {angle, orbitSpeedFactor} = state;

  // Calculate new angle
  const newAngle = angle + (maxRadiansPerCycle * orbitSpeedFactor);

  // Calculate distance - relative value 0..1
  const newDistance = distanceGen.next().value;

  // Update state
  state = {
    ...state,
    angle: newAngle,
    distance: newDistance,
  }
}

const updateDom = () => {
  const {thingEl} = settings;
  const {bounds, minDimension, distance, angle} = state;
  const c = bounds.center;
  const thingSize = thingEl.getBoundingClientRect();

  // Make distance absolute, using the dimension of viewport
  const smallestDimension = minDimension / 2; // Halve because we we're setting a radius, not diameter
  const distanceAbs = distance * smallestDimension

  // Calculate position for circle based on polar coordinates (distance, angle & origin)
  // But we need to offset by the mid-point of circle, otherwise it will be off-centre
  const pt = Points.subtract(
    Polar.toCartesian(distanceAbs, angle, c),
    {x: thingSize.width / 2, y: thingSize.height / 2}
  );

  thingEl.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  const {rangeSpeed} = settings;
  const updateBounds = () => {
    const bounds = {
      width: window.innerWidth,
      height: window.innerHeight,
      center: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    };

    state = {
      ...state,
      bounds: bounds,
      minDimension: Math.min(bounds.width, bounds.height)
    }
  }
  window.addEventListener(`resize`, updateBounds)
  updateBounds();

  const loop = () => {
    // Update state
    update();
    // Update DOM
    updateDom();
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

  rangeSpeed.addEventListener(`input`, evt => {
    // Range slider is 0-500, normalise to 0..1
    state.orbitSpeedFactor = rangeSpeed.value / 500;

  });
}
setup();
