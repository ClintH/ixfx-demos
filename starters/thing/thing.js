import { Points } from '../../ixfx/geometry.js';

// Define our Thing
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
  /** @type Thing */
  thing: generateThing()
});

/**
 * Apply the data from `thing` somehow...
 * @param {Thing} thing 
 */
const useThing = (thing) => {
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
  // 5. Call `updateThing` with changed properties, returning result.
  return updateThing(thing, {  });
};

/**
 * Uses state. Uses overall sketch state,
 * and then defers to `useThing` for thing state.
 */
const useState = () => {
  const { thing } = state;

  // Use thing
  useThing(thing);
};

const setup = () => {
  const loop = () => {
    const { thing } = state;
    // Update thing
    const newThing = loopThing(thing);

    // Update state
    updateState({ 
      thing: newThing
    });

    useState();
    window.requestAnimationFrame(loop);
  };
  loop();

};
setup();


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
 * Updates `thing` with supplied `data`
 * @param {Thing} thing
 * @param {Partial<Thing>} data 
 */
function updateThing(thing, data) {
  return Object.freeze({
    ...thing,
    ...data
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