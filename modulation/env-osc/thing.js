import { Points } from '../../ixfx/geometry.js';

import { Oscillators } from '../../ixfx/modulation.js';
import { Envelopes } from '../../ixfx/modulation.js';

import * as Util from './util.js';

/** 
 * Define our Thing
 * @typedef Thing
 * @property {Points.Point} position
 * @property {Generator<number>} oscillator
 * @property { import('../../ixfx/modulation.js').Adsr} envelope
 * @property {string} id
 */


/**
 * Use the data of the Thing somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const element = /** @type HTMLElement */(document.querySelector(`#thing`));
  if (!element) return;

  const { position  } = thing;
 
  // Position
  Util.positionFromMiddle(element, position);
};

/**
 * Continually loops, updating the thing
 * @param {Thing} thing
 * @returns {Thing}
 */
export const update = (thing) => {
  // Get latest value from this thing's envelope
  let envelopeValue = thing.envelope.value;
  
  // Returns NaN if envelope is not yet triggered
  if (Number.isNaN(envelopeValue)) envelopeValue = 0;
  
  // Get the latest vaue from this thing's oscillator
  const oscValue = thing.oscillator.next().value;

  // Fold in oscillator value to envelope value
  // Try commenting out the next line to see the difference
  envelopeValue = oscValue * envelopeValue;
  
  // Compute relative position based on value
  const position = {
    x: 0.5,
    y: envelopeValue
  };

  // Apply changes to a new Thing
  return Object.freeze({
    ...thing,
    position
  });
};


/**
 * Generates a Thing
 * @param {string} id Id of HTML element associated with this element
 * @param {import('../../ixfx/modulation.js').EnvelopeOpts} envelope
 * @returns {Thing}
 */
export function generate (id, envelope) {
  return {
    id,
    // Random frequency 0.5 -> 1.5
    oscillator: Oscillators.sine(Math.random() + 0.5),
    position: { x: 0.5, y:0.5 },
    // Create an envelope based on settings
    envelope: Envelopes.adsr(envelope)
  };
}