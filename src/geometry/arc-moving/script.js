import {Arcs} from '/ixfx/geometry.js';
import * as Generators from '/ixfx/generators.js';

// Loop back and forth between 0 and 1, 0.0.1 steps at a time
const pingPong = Generators.pingPongPercent(0.01);

// Arc of radius 100, start degrees 0, end degrees 90
const arc = Arcs.fromDegrees(100, 0, 90);


// State
let state = {
  coord: {x: 0, y: 0}
};

// Update state of world
const update = () => {
  let amt = pingPong.next().value;

  // Center of viewport
  const center = {
    x: document.body.clientWidth / 2,
    y: document.body.clientHeight / 2
  }

  console.log(arc);
  state = {
    ...state, // Include existing state
    coord: Arcs.compute(arc, amt, center),
  }
}

const draw = () => {
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

