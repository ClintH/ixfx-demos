/**
 * Demonstrates moving an element toward a point, over time.
 * 
 * It also shows working with relative coordinates.
 */
import {Points} from '../../ixfx/geometry.js';

// Define settings
const settings = {
  thingEl: document.getElementById(`thing`),
  interpolateAmt: 0.05
};

// Initial state with empty values
let state = {
  bounds: {
    width: 0,
    height: 0
  },
  location: {
    x: Math.random(),
    y: Math.random()
  },
  pointer: {x: 0, y: 0}
};

// Update state of world
const update = () => {
  const {interpolateAmt} = settings;
  const {location, pointer} = state;

  // Move thing a bit closer to pointer
  const p = Points.interpolate(interpolateAmt, location, pointer);

  //console.log(`ptr y: ${pointer.y} loc.y: ${location.y}`);
  state = {
    ...state,
    location: p
  }
}

const draw = () => {
  const {thingEl} = settings;
  const {location, bounds} = state;

  // Convert relative point to an absolute one
  let loc = Points.multiply(location, bounds.width, bounds.height);

  // Positioning happens from top-left corner, so use the size of the
  // element to position from middle instead
  const b = thingEl.getBoundingClientRect();
  loc = Points.subtract(loc, b.width / 2, b.height / 2);

  // Apply final computed position to element
  thingEl.style.transform = `translate(${loc.x}px, ${loc.y}px)`;
}

/**
 * Setup and run main loop 
 */
const setup = () => {

  // Keep track of screen size whenever it resizes
  const onResize = () => {
    state = {
      ...state,
      bounds: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }
  document.addEventListener(`resize`, onResize);
  onResize();

  document.addEventListener(`pointermove`, e => {
    const {bounds} = state;
    const x = e.clientX;
    const y = e.clientY;
    state = {
      ...state,
      // Make pointer position relative (on 0..1 scale)
      pointer: Points.divide(x, y, bounds.width, bounds.height)
    }
  });

  const loop = () => {
    // Update state
    update();

    // Update elements
    draw();

    // Loop
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();
