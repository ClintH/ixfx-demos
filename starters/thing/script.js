import { Points } from '../../ixfx/geometry.js';

// Define our Thing
// In this demo, things have a position, suprise and elementId
/** 
 * @typedef Thing
 * @property {Points.Point} position
 * @property {number} surprise
 * @property {string} elementId
 */

// Settings for sketch
const settings = Object.freeze({

});

// State
let state = Object.freeze({
  // Create a thing when starting
  /** @type Thing */
  thing: generateThing()
});

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
const useThing = (thing) => {
  // Grab some properties from `thing`
  const { position, elementId, surprise } = thing;
  
  // Resolve element
  const el = document.getElementById(elementId);
  if (!el) return;

  // Change opacity based on 'surprise'
  el.style.opacity = surprise.toString();

  // Position
  positionFromMiddle(el, position);
};

/**
 * Continually loops, updating the thing
 * @param {Thing} thing
 */
const loopThing = (thing) => {
  // In this function, we probably want the steps:
  
  // 1. Alter properties based on external state/settings
  // 2. Alter properties based on the state of 'thing'
  // 3. Apply 'intrinsic' logic of thing. Eg, that a variable will
  //    always decrease a little each loop
  // 4. Apply sanity checks to properties, making sure they are within proper ranges
  // 5. Return a new Thing
  return Object.freeze({
    ...thing,
    /** data to update here */
  });
};

/**
 * Makes use of the data contained in `state`
 * (including `thing`)
 */
const useState = () => {
  const { thing } = state;

  // Use thing
  useThing(thing);
};

const loop = () => {
  const { thing } = state;

  // Compute new thing
  const newThing = loopThing(thing);

  // Save new thing into state
  updateState({ 
    thing: newThing
  });

  // Use new state
  useState();

  // Loop
  window.requestAnimationFrame(loop);
};

const setup = () => {
  
};
setup();
loop();

/**
 * Generates a Thing
 * @returns {Thing}
 */
function generateThing () {
  return {
    position: { x: 0.5, y:0.5 },
    elementId: `thing`,
    surprise: 0
  };
}

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

/**
 * Position an element from its middle
 * @param {HTMLElement} el 
 * @param {Points.Point} relativePos 
 */
function positionFromMiddle(el, relativePos) {
  // Convert relative to absolute units
  const absPosition = Points.multiply(relativePos, window.innerWidth,window.innerHeight);
  
  const thingRect = el.getBoundingClientRect();
  const offsetPos = Points.subtract(absPosition, thingRect.width / 2, thingRect.height / 2);

  // Apply via CSS
  el.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
}