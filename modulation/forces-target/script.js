import { Points } from '../../ixfx/geometry.js';
import { Forces } from '../../ixfx/modulation.js';
import { continuously } from '../../ixfx/flow.js';

// Define settings
const settings = Object.freeze({
  /** @type Forces.TargetOpts */
  target: {
    // Getting within 1% is good enough
    range: { x: 0.01, y: 0.01 },
    // Multiplier for acceleration. Higher = faster
    diminishBy: 0.001
  },
  // Drag force so it slows down
  dragForce: Forces.magnitudeForce(0.01)
});

let state = Object.freeze({
  // Assign random position (normalised 0..1 scale)
  position: Points.random(),
  // Starting velocity is 0, at rest
  velocity: {x: 0, y: 0},
  // Default target for acceleration: middle of screen
  targetPos: {x: 0.5, y: 0.5},
  // Record size of window
  window: {
    width: window.innerWidth,
    height: window.innerHeight
  }
});

const onTick = () => {
  const { target, dragForce } = settings;
  const { targetPos, position, velocity } = state;

  // Apply targetForce
  const t = Forces.apply({velocity, position}, 
    // Push towards target
    Forces.targetForce(targetPos, target),
    dragForce
    );

  // Wrap point to be between 0,0 and 1,1
  // This means if the new position is outside the bounds of the screen
  // it will carry over to other side
  const posAfterWrap = Points.wrap(t.position ?? Points.Empty);

  // Set to state
  updateState({
    velocity: t.velocity ?? Points.Empty,
    position: posAfterWrap
  });
};

/**
 * Position thing based on state
 */
const useState = () => {
  const {position} = state;

  const thingEl =  document.getElementById(`thing`);
  
  // Move the element
  moveElement(thingEl, position);
};

const moveElement = (el, relativePos) => {
  const {window} = state;

  // Position is given in relative coordinates, need to map to viewport
  const absPos = Points.multiply(relativePos, window.width, window.height);

  // Get size of element to move
  const size = el.getBoundingClientRect();

  // Point to move to is given point, minus half width & height -- ie the top-left corner
  const pt = Points.subtract(absPos, size.width / 2, size.height / 2);

  el.style.left = `${pt.x}px`;
  el.style.top = `${pt.y}px`;
};


const setup = () => {
  const targetEl = document.getElementById(`target`);

  continuously(() => {
    onTick();
    useState();
  }).start();

  // Update our tracking of window size if there's a resize
  window.addEventListener(`resize`, () => {
    updateState({ window: { width: window.innerWidth, height: window.innerHeight } } );
  });

  window.addEventListener(`pointerup`, (ev) => {
    const {window} = state;

    // Normalise pointer to be in relative coords
    const relPointer = Points.normaliseByRect(ev, window);

    // Set new target
    updateState({targetPos: relPointer});
    moveElement(targetEl, state.targetPos);
  });

  moveElement(targetEl, state.targetPos);
}
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
 function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}