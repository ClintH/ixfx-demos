import {Arcs} from '/ixfx/geometry.js';
import * as Generators from '/ixfx/generators.js';

// Loop back and forth between 0 and 1, 0.0.1 steps at a time
const pingPong = Generators.pingPongPercent(0.01);

// State
let state = {
  // Arc of radius 100, start degrees 0, end degrees 90
  arc: Arcs.fromDegrees(100, 0, 90, {x: 0, y: 0}),
};

// Updates when viewport size changes
const sizeChange = () => {
  const {arc} = state;
  // Center of viewport
  const w = document.body.clientWidth;
  const h = document.body.clientHeight;

  // Update arc to size of screen
  state.arc = {
    ...arc,
    x: w / 2,
    y: h / 2,
    radius: Math.min((w / 2 - 100), (h / 2 - 100))
  };
}
window.addEventListener(`resize`, sizeChange);
sizeChange();

// Update state of world
const update = () => {
  const {arc} = state;
  let amt = pingPong.next().value;

  state = {
    ...state, // Include existing state
    // Compute location on arc
    coord: Arcs.compute(arc, amt),
  }
}

const draw = () => {
  // Grab state we need
  const {coord} = state;

  // Move button to position on arc
  const el = document.getElementById(`moved`);
  el.style.transform = `translate(${coord.x}px, ${coord.y}px)`;
}

const loop = () => {
  update();
  draw();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

