import { Points } from '../../ixfx/geometry.js';
import { Oscillators } from '../../ixfx/modulation.js';
import { scale } from '../../ixfx/data.js';

import { adsr, defaultAdsrOpts } from '../../ixfx/modulation.js';

// Define our Thing
/** 
 * @typedef Thing
 * @property {Points.Point} position
 * @property {Generator<number>} oscillator
 * @property { import('../../ixfx/modulation.js').Adsr} envelope
 * @property {string} id
 */

const settings = Object.freeze({
  sizeEm: 10,
  envelope: {
    ...defaultAdsrOpts(),
    // Override some envelope options...
    // See: https://clinth.github.io/ixfx-docs/modulation/envelope/
    sustainLevel: 1,
    releaseDuration: 1000,
    retrigger: true
  }
});

console.log(`Envelope looks like:`);
console.log(settings.envelope);

let state = Object.freeze({
  // Create a thing, to control HTML element with id 'thing'
  /** @type Thing */
  thing: generateThing(`thing`),

});

/**
 * Use the data of the Thing somehow...
 * @param {Thing} thing 
 */
const useThing = (thing) => {
  const el = document.getElementById(`thing`);
  if (!el) return;

  const { position  } = thing;
 
  // Position
  positionFromMiddle(el, position);
};


/**
 * Continually loops, updating the thing
 * @param {Thing} thing
 */
const onTickThing = (thing) => {
  // Get latest value from this thing's envelope
  let envValue = thing.envelope.value;
  
  // Returns NaN if envelope is not yet triggered
  if (Number.isNaN(envValue)) envValue = 0;
  
  // Get the latest vaue from this thing's oscillator
  const oscValue = thing.oscillator.next().value;

  // Combine!
  const v = oscValue * envValue;
  
  // Compute relative position based on value
  const position = {
    x: 0.5,
    y: v
  };

  // Apply changes to a new Thing
  return  Object.freeze({
    ...thing,
    position
  });
};


const useState = () => {
  const { thing } = state;

  // Use thing
  useThing(thing);
};

const onTick = () => {
  const { thing } = state;

  // Update thing
  const newThing = onTickThing(thing);

  // Update state with changed thing
  updateState({ 
    thing: newThing,
  });

  useState();
};

const loop = () => {
  onTick(); 
  window.requestAnimationFrame(loop);
};

const setup = () => {
  // Trigger and hold envelopes when pointer is down
  window.addEventListener(`pointerdown`, evt => {
    const { thing } = state;
    console.log(`Envelope trigger`);
    thing.envelope.trigger(false);
  });

  // Release envelope on pointerup
  window.addEventListener(`pointerup`, evt => {
    const { thing } = state;
    console.log(`Envelope release`);
    thing.envelope.release();
  });
  loop();
};
setup();



/**
 * Generates a Thing
 * @param {string} id Id of HTML element associated with this element
 * @returns {Thing}
 */
function generateThing (id) {
  return {
    id,
    // Random frequency 0.5 -> 1.5
    oscillator: Oscillators.sine(Math.random() + 0.5),
    position: { x: 0.5, y:0.5 },
    // Create an envelope based on settings
    envelope: adsr(settings.envelope)
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
function positionFromMiddle (el, relativePos) {
  // Convert relative to absolute units
  const absPosition = Points.multiply(relativePos, window.innerWidth,window.innerHeight);
  
  const thingRect = el.getBoundingClientRect();
  const offsetPos = Points.subtract(absPosition, thingRect.width / 2, thingRect.height / 2);

  // Apply via CSS
  el.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
}