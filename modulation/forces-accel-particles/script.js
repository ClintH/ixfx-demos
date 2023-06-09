/**
 * An extention of `velocity` with arbitrary number of things
 * being moved.
 */
import { Points } from '../../ixfx/geometry.js';
import { Forces } from '../../ixfx/modulation.js';
import { continuously } from '../../ixfx/flow.js';
import { pointTracker } from '../../ixfx/data.js';
import { Random } from '../../ixfx/bundle.js';

/** 
 * @typedef Thing
 * @property {Points.Point} position
 * @property {Points.Point} velocity
 * @property {number} mass
 * @property {string} id 
 */

// Define settings
const settings = Object.freeze({
  thingsCount: 5,
  // Max diameter of a thing
  thingSizeMax: 100
});

let state = Object.freeze({
  /** @type {Thing[]} */
  things: [], // things we'll be moving
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
  // Update all the things
  updateState({ things: state.things.map(updateThing) });
};

/**
 * Update a thing, returning a new instance
 * @param {Thing} t 
 * @returns {Thing}
 */
const updateThing = (t) => {
  // Apply velocity to calculate a new position
  let changedThing = Forces.apply(t);

  // Wrap point to be between 0,0 and 1,1
  // This means if the new position is outside the bounds of the screen
  // it will carry over to other side
  const posAfterWrap = Points.wrap(changedThing.position ?? { x: 0.5, y: 0.5 } );

  // Return new thing
  return {
    ...t,
    ...changedThing,
    position: posAfterWrap
  };
};

/**
 * Position thing based on state
 */
const useState = () => {
  state.things.forEach((t) => {
    // Get element for thing
    const thingEl = getOrCreateElementForThing(t);
    if (thingEl === null) return;

    // Move the element
    moveElement(thingEl, t.position);
  });
};

const moveElement = (el, relativePosition) => {
  const { window } = state;

  // Position is given in relative coordinates, need to map to viewport
  const absPos = Points.multiply(relativePosition, window.width, window.height);

  // Get size of element to move
  const size = el.getBoundingClientRect();

  // Point to move to is given point, minus half width & height -- ie the top-left corner
  const pt = Points.subtract(absPos, size.width / 2, size.height / 2);

  el.style.left = `${pt.x}px`;
  el.style.top = `${pt.y}px`;
};

/**
 * Creates a thing, adding it to the list
 */
const createThing = () => {
  const t = {
    mass: Random.float({ min: 0.5, max: 1 }),
    id: Random.shortGuid(),
    // Assign random position (normalised 0..1 scale)
    position: Points.random(),
    // Random velocity on normalised 0..1 scale, and then reduced to lower speed
    velocity: Points.divide(Points.random(), 200),
  };

  // Add to list of things
  state.things.push(t);
};

/**
 * Returns a HTML element for a thing. Creates if one
 * does not exist
 * @param {Thing} t 
 * @returns HTMLElement
 */
const getOrCreateElementForThing = (t) => {
  const { thingSizeMax } = settings;

  const id = `thing-${t.id}`;
  let el = document.getElementById(id);
  if (el === null) {
    el = document.createElement(`input`);
    el.setAttribute(`type`, `checkbox`);
    el.setAttribute(`checked`, `true`);
    el.classList.add(`thing`);
    el.id = id;
    el.style.width = Math.round(t.mass * thingSizeMax) + `px`;
    el.style.height = Math.round(t.mass * thingSizeMax) + `px`;
    
    document.body.append(el);
  }
  return el;
};

const setup = () => {
  continuously(() => {
    onTick();
    useState();
  }).start();

  // Update our tracking of window size if there's a resize
  window.addEventListener(`resize`, () => {
    updateState({
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  });

  // On pointerup, assign a new velocity based on accumulated movement
  window.addEventListener(`pointerup`, (ev) => {
    const { pointerMovement } = state;

    // Get the last data from the pointTracker
    const nfo = pointerMovement.lastResult;

    // If we have some info
    if (nfo !== undefined) {
      // Normalise the average movement, and divide to reduce the speed
      const avg = Points.divide(Points.normalise(nfo.fromInitial.average), 500);

      // For debug purposes, show velocity x,y on screen
      const labelEl = document.getElementById(`velocity`);
      if (labelEl) labelEl.innerText = Points.toString(avg, 2);

      // Apply pointer movement as acceleration to all things
      const things = /** @type Thing[] */(state.things.map(t => Forces.apply(t, Forces.accelerationForce(avg, `dampen`))
      ));
      updateState({ things });
    }

    // Reset pointTracker
    pointerMovement.reset();
  });

  window.addEventListener(`pointermove`, (ev) => {
    const { pointerMovement } = state;

    // Exit if no there's no press
    if (ev.buttons === 0) return;

    // Track the movement amount
    pointerMovement.seen({ x: ev.movementX, y: ev.movementY });
  });

  // Create things
  for (let i = 0; i < settings.thingsCount; i++) createThing();
};
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