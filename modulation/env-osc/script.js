import { Points } from '../../ixfx/geometry.js';
import { Oscillators } from '../../ixfx/modulation.js';

import { adsr, defaultAdsrOpts as defaultAdsrOptions } from '../../ixfx/modulation.js';

/** 
 * Define our Thing
 * @typedef Thing
 * @property {Points.Point} position
 * @property {Generator<number>} oscillator
 * @property { import('../../ixfx/modulation.js').Adsr} envelope
 * @property {string} id
 */

const settings = Object.freeze({
  sizeEm: 10,
  envelope: {
    ...defaultAdsrOptions(),
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
  const element = /** @type HTMLElement */(document.querySelector(`#thing`));
  if (!element) return;

  const { position  } = thing;
 
  // Position
  positionFromMiddle(element, position);
};


/**
 * Continually loops, updating the thing
 * @param {Thing} thing
 */
const onTickThing = (thing) => {
  // Get latest value from this thing's envelope
  let envelopeValue = thing.envelope.value;
  
  // Returns NaN if envelope is not yet triggered
  if (Number.isNaN(envelopeValue)) envelopeValue = 0;
  
  // Get the latest vaue from this thing's oscillator
  const oscValue = thing.oscillator.next().value;

  // Combine oscillator value and envelope value
  const v = oscValue * envelopeValue;
  
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

  // Update thing
  const thing = onTickThing(state.thing);

  // Update state with changed thing
  updateState({ 
    thing,
  });

  useState();
};

const loop = () => {
  onTick(); 
  window.requestAnimationFrame(loop);
};

const setup = () => {
  // Trigger and hold envelopes when pointer is down
  window.addEventListener(`pointerdown`, event => {
    const { thing } = state;
    console.log(`Envelope trigger`);
    thing.envelope.trigger(false);
  });

  // Release envelope on pointerup
  window.addEventListener(`pointerup`, event => {
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
 * @param {HTMLElement} element
 * @param {Points.Point} relativePos 
 */
function positionFromMiddle (element, relativePos) {
  // Convert relative to absolute units
  const absPosition = Points.multiply(relativePos, window.innerWidth,window.innerHeight);
  
  const thingRect = element.getBoundingClientRect();
  const offsetPos = Points.subtract(absPosition, thingRect.width / 2, thingRect.height / 2);

  // Apply via CSS
  element.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
}