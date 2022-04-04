/**
 * Demonstates moving a DOM element by polar coordinates
 */
import * as Generators from '../../ixfx/generators.js';
import {Points} from '../../ixfx/geometry.js';
import {Polar} from '../../ixfx/geometry.js';

// Define settings
const settings = {
  minRadius: 100,
  slowPp: Generators.pingPongPercent(0.001),
  range: Generators.numericPercent(0.01, true),
  thingEl: document.getElementById(`thing`)
}

// Initialise state with empty values
let state = {
  slow: 0,
  range: 0,
  // Width or height of viewport, whichever is smaller
  maxDimension: 0,
  // Will be set to size of screen
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}}
};

// Update state of world
const update = () => {
  const {slowPp, range} = settings;

  // This generator can possibly be undefined, so
  // we have to be a bit tricksy
  let r = range.next().value;

  // Update state
  state = {
    ...state,
    // Get a new value from generators
    slow: slowPp.next().value,
    range: r ? r : 0 // if r is undefined, use 0 by default
  }
}

const updateDom = () => {
  const {thingEl, minRadius} = settings;
  const {slow, bounds, maxDimension, range} = state;
  const c = bounds.center;
  const thingSize = thingEl.getBoundingClientRect();

  // Distance is based on ping-pong value and size of screen
  const d = minRadius + (slow * (maxDimension - minRadius) / 8);

  // Use the numericPercent generator value to set angle
  const angle = Math.PI * 2 * range;

  // Calculate position for circle based on polar coordinates (distance, angle & origin)
  // But we need to offset by the mid-point of circle, otherwise it will be off-centre
  const pt = Points.subtract(
    Polar.toCartesian(d, angle, c),
    {x: thingSize.width / 2, y: thingSize.height / 2}
  );

  thingEl.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
}

/**
 * Setup and run main loop 
 */
const setup = () => {
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
      maxDimension: Math.max(bounds.width, bounds.height)
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
}
setup();
