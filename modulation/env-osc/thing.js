import { Points } from '../../ixfx/geometry.js';
import { Data, Flow, Modulation, Random, Numbers } from '../../ixfx/bundle.js';
import { Envelopes } from '../../ixfx/modulation.js';
import * as Util from './util.js';
import { Bipolar } from '../../ixfx/numbers.js';

const settings = Object.freeze({
  minimumDistance: 0.1
});
/** 
 * Define our Thing
 * @typedef {{
 * el: HTMLElement
 * osc: ()=>number
 * position: { x:number, y:number }
 * }} Thing
 */

/**
 * Make visual updates based on thing's data
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { position } = thing;

  // Position it
  Util.positionFromMiddle(thing.el, position);
};

/**
 * For a given `thing`, compute state for it
 * @param {Thing} thing
 * @param {number} modValue
 * @returns {Promise<Thing>}
 */
export const update = async (thing, modValue) => {
  const { minimumDistance } = settings;

  // Resolve any functions
  const state = await Data.resolveFields(thing);
  const { position, osc } = state;

  // Oscillator ranges from 0..1, 
  // we want -0.1 to 1 such that 0 is middle of screen
  let oscScaled = Bipolar.fromScalar(osc);

  // Effect of oscillator gets governed by the modValue
  const oscMod = oscScaled * modValue;

  // But if there's no modulation, oscMod will be zero, so
  // add in a little touch of the original value, trying
  // to ensure range stays -1..1
  oscScaled = oscScaled * 0.1 + oscMod * 0.9;

  // Get oscillator on 0..0.5 scale
  //let oscMod = modValue * osc * 0.5;

  // Convert bipolar value of -1..1 to 0...1 scale
  let y = Bipolar.toScalar(oscScaled);

  // Compute relative position based on value
  const newPosition = {
    x: position.x,
    y
  };

  // Apply changes to a new Thing
  return Object.freeze({
    ...thing,
    position: newPosition
  });
};


/**
 * Generates a Thing
 * @returns {Thing}
 */
export function generate() {
  // Create a copy of our proto-thing
  const protoThing = /** @type HTMLElement */(document.querySelector(`#proto-thing`));
  const cloned = /** @type HTMLElement */(protoThing.cloneNode(true));

  // Add to the body
  cloned.id = ``;
  document.body.append(cloned);
  return {
    // Element in document
    el: cloned,
    // Sine wave
    osc: Modulation.wave({
      shape: `sine`,
      // Random frequency of 0.01-1.0 Hz
      hertz: Random.float({ min: 0.01, max: 1 })
    }),
    // Random initial position
    position: {
      x: Math.random(),
      y: Math.random()
    }
  };
}