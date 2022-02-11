import {Arcs} from '../../ixfx/geometry.js';
import {timeout, continuously} from '../../ixfx/timers.js';
import * as Generators from '../../ixfx/generators.js';

// Define settings
const settings = {
  // Loop back and forth between 0 and 1, 0.0.1 steps at a time
  pingPong: Generators.pingPongPercent(0.01),
  // Arc settings
  endAngle: 180,
  radiusProportion: 0.3,
  startAngle: 0,
}

// Initial state
let state = {
  bounds: {width: 0, height: 0, center: {x: 0, y: 0}},
};

// Update state when viewport size changes
const sizeChange = () => {
  // Center of viewport
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const center = {x: width / 2, y: height / 2};

  // Update state
  state = {
    ...state,
    bounds: {width, height, center},
  };
}
window.addEventListener(`resize`, sizeChange);
sizeChange(); // Trigger to use current size

// Update state of world
const update = () => {
  // Get fields we need
  const {pingPong, radiusProportion} = settings;
  const bounds = state.bounds;
  const center = bounds.center;

  // Set radius to be proportional to screen size so it's always visible
  // - Radius will be radiusProportion% of viewport width or height, whichever is smaller
  const radius = Math.min(bounds.width, bounds.height) * radiusProportion;

  // Define arc
  const arc = Arcs.fromDegrees(radius, settings.startAngle, settings.endAngle, center);

  // Calculate relative point on arc using current pingpong amount
  const coord = Arcs.compute(arc, pingPong.next().value);

  // Update state
  state = {
    ...state,
    coord
  }
}

/**
 * 
 * @param {HTMLElement} el Element to move 
 */
const updateEl = (el) => {
  // Grab state we need
  const {coord} = state;

  // Move calculated position on arc
  el.style.transform = `translate(${coord.x}px, ${coord.y}px)`;
}

// After 2 seconds, reset button text
const clickedTimeout = timeout(() => {
  document.getElementById(`moved`).innerText = `Click me!`;
}, 2000);

// If button is clicked, change text and start reset timeout
document.getElementById(`moved`).addEventListener(`click`, () => {
  document.getElementById(`moved`).innerText = `Bravo!`;
  clickedTimeout.start();
});

const setup = () => {
  const elToMove = document.getElementById(`moved`);

  // Keeps running at animation speed
  continuously(() => {
    update();
    updateEl(elToMove);
  }).start();
}
setup();
