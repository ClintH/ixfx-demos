/**
 * This sketch demonstrates applying a vector velocity to a point,
 * wrapping the coordinate based on screen dimensions.
 * 
 * It also demonstrates using `pointTracker` to track pointer movement
 * direction and use that to interactively change velocity.
 */
import { Points } from '../../ixfx/geometry.js';
import { Forces } from '../../ixfx/modulation.js';
import { continuously } from '../../ixfx/flow.js';
import { pointTracker } from '../../ixfx/data.js';

// Define settings
const settings = Object.freeze({
  thingEl: document.getElementById(`thing`)
});

let state = Object.freeze({
  // Assign random position (normalised 0..1 scale)
  position: Points.random(),
  // Random velocity on normalised 0..1 scale, and then reduced to lower speed
  velocity: Points.divide(Points.random(), 200),
  // Track the pointer movementX,movementY
  pointerMovement: pointTracker(),
  // Record size of window
  window: {
    width: window.innerWidth,
    height: window.innerHeight
  }
});

// Update state of world
const onTick = () => {
  // Apply velocity to calculate a new position
  let changedThing = Forces.apply(state);

  // Wrap point to be between 0,0 and 1,1
  // This means if the new position is outside the bounds of the screen
  // it will carry over to other side
  const posAfterWrap = Points.wrap(changedThing.position ?? { x: 0.5, y: 0.5 } );
    
  // Set to state
  state = {
    ...state,
    position: posAfterWrap,
    velocity: changedThing.velocity ?? Points.Empty
  };
};

/**
 * Position thing based on state
 */
const useState = () => {
  const {thingEl} = settings;
  const {position, window} = state;

  // Position is given in relative coordinates, need to map to viewport
  const absPos = Points.multiply(position, window.width, window.height);

  // Move the element
  moveEl(thingEl, absPos);
};

const moveEl = (el, pos) => {
  // Get size of element to move
  const size = el.getBoundingClientRect();

  // Point to move to is given point, minus half width & height -- ie the top-left corner
  const pt = Points.subtract(pos, size.width / 2, size.height / 2);

  el.style.left = `${pt.x}px`;
  el.style.top = `${pt.y}px`;
};

const setup = () => {
  continuously(() => {
    onTick();
    useState();
  }).start();

  // Update our tracking of window size if there's a resize
  window.addEventListener(`resize`, () => {
    updateState({window: {
      width: window.innerWidth,
      height: window.innerHeight
    }});
  });

  // On pointerup, assign a new velocity based on accumulated movement
  window.addEventListener(`pointerup`, (ev) => {
    const {pointerMovement} = state;

    // Get the last data from the pointTracker
    const nfo = pointerMovement.lastInfo;

    // If we have some info
    if (nfo !== undefined) {
      // Normalise the average movement, and divide by 200 to reduce the speed
      const avg = Points.divide(Points.normalise(nfo.average), 200);

      // For debug purposes, show velocity x,y on screen
      const labelEl = document.getElementById(`velocity`);
      if (labelEl) labelEl.innerText = Points.toString(avg);

      const { position, velocity } = Forces.apply(state,
         Forces.accelerationForce(avg, `dampen`));
      updateState({ velocity, position });
    }

    // Reset pointTracker
    pointerMovement.reset();
  });

  window.addEventListener(`pointermove`, (ev) => {
    const {pointerMovement} = state;

    // Exit if no there's no press
    if (ev.buttons === 0) return;

    // Track the movement
    pointerMovement.seen({x: ev.movementX, y: ev.movementY});
  });
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
