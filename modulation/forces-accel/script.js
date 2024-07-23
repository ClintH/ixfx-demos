import { Points } from '../../ixfx/geometry.js';
import { Forces } from '../../ixfx/modulation.js';
import { continuously } from '../../ixfx/flow.js';
import { point as pointTracker } from '../../ixfx/trackers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  thingEl: document.querySelector(`#thing`)
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
const update = () => {
  // Apply velocity to calculate a new position
  let changedThing = Forces.apply(state);

  // Wrap point to be between 0,0 and 1,1
  // This means if the new position is outside the bounds of the screen
  // it will carry over to other side
  const posAfterWrap = Points.wrap(changedThing.position ?? { x: 0.5, y: 0.5 });

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
const use = () => {
  const { thingEl } = settings;
  const { position, window } = state;

  // Position is given in relative coordinates, need to map to viewport
  const absPos = Points.multiply(position, window.width, window.height);

  Util.moveElement(thingEl, absPos);
};

function setup() {
  continuously(() => {
    update();
    use();
  }).start();

  // Update our tracking of window size if there's a resize
  window.addEventListener(`resize`, () => {
    saveState({
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  });

  // On pointerup, assign a new velocity based on accumulated movement
  window.addEventListener(`pointerup`, (event) => {
    const { pointerMovement } = state;

    // Get the last data from the pointTracker
    const nfo = pointerMovement.lastResult;

    // If we have some info
    if (nfo !== undefined) {
      // Normalise the average movement, and divide by 200 to reduce the speed
      const avg = Points.divide(Points.normalise(nfo.fromInitial.average), 200);

      // For debug purposes, show velocity x,y on screen
      const labelElement = /** @type HTMLElement */(document.querySelector(`#velocity`));
      if (labelElement) labelElement.innerHTML = `accel x: ${avg.x}<br />accel y: ${avg.y}`;

      const { position, velocity } = Forces.apply(state,
        Forces.accelerationForce(avg, `dampen`));
      saveState({ velocity, position });
    }

    // Reset pointTracker
    pointerMovement.reset();
  });

  document.addEventListener(`pointermove`, (event) => {
    const { pointerMovement } = state;

    // Exit if no there's no press
    if (event.buttons === 0) return;

    // Track the movement
    pointerMovement.seen({ x: event.movementX, y: event.movementY });
  });
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
