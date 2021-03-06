/**
 * Demonstrates using two movingAverage instances to smooth
 * pointer x,y positions in order to position an element.
 */
import {movingAverage} from '../../ixfx/data.js';
import {Points} from '../../ixfx/geometry.js';

const settings = {
  avgX: movingAverage(100),
  avgY: movingAverage(100),
  thingEl: document.getElementById(`thing`)
}

let state = {
  avg: {x: 0, y: 0},
  pointer: {x: 0, y: 0}
};

const update = () => {
  const {pointer} = state;
  // Adds the current pointer position to moving average
  addAverage(pointer.x, pointer.y);
}

const addAverage = (absX, absY) => {
  const {avgX, avgY} = settings;

  // Add relative x,y to their respective movingAverage instance
  state = {
    ...state,
    avg: {
      x: avgX.add(absX / window.innerWidth),
      y: avgY.add(absY / window.innerHeight)
    }
  }
};

/**
 * Updates position of element based on
 * computed average
 */
const draw = () => {
  const {thingEl} = settings;
  const {avg} = state;

  // Map x,y to absolute pos
  const abs = Points.multiply(avg, window.innerWidth, window.innerHeight);

  // We want to position by its middle, not the top-left
  const thingSize = thingEl.getBoundingClientRect();
  const pt = Points.subtract(abs, thingSize.width / 2, thingSize.height / 2);

  // Move thing
  thingEl.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
};

const loop = () => {
  update();
  draw();
  window.requestAnimationFrame(loop);
};

const setup = () => {
  document.addEventListener(`pointermove`, evt => {
    state = {
      ...state,
      pointer: {
        x: evt.clientX,
        y: evt.clientY
      }
    }
  });

  // If pointer leaves, use center
  document.addEventListener(`pointerout`, () => {
    state = {
      ...state,
      pointer: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    }
  });

  window.requestAnimationFrame(loop);
}
setup();