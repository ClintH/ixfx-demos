import { Points } from '../../ixfx/geometry.js';
import { clamp } from '../../ixfx/numbers.js';
import * as Util from './util.js';

/** 
 * Define our thing
 * @typedef {{
 * position: Points.Point
 * energy: number
 * elementId: string
 * clicked: boolean
 * hue: number
 * }}
 * Thing
 */

/** Settings for Things */
const settings = Object.freeze({
  energyGainAmount: 0.01,
  energyLoss: 0.99
});

/**
 * Handle pointer event, returning new Thing
 * @param {PointerEvent} event
 * @param {Thing} thing
 * @returns {Thing}
 */
export const onPointerEvent = (thing, event) => {
  let { clicked } = thing;
  switch (event.type) {
    case `pointerup`: {
      clicked = false;
      break;
    }
    case `pointerdown`: {
      clicked = true;
      break;
    }
    default: {
      console.log(event);
    }
  }
  return Object.freeze({
    ...thing,
    clicked
  });
};

/**
 * Visualise Thing state
 * @param {Thing} thing 
 */
export const use = (thing) => {
  // Grab some properties from `thing`
  const { position, elementId, energy, hue } = thing;

  // Resolve element
  const element = /** @type HTMLElement */(document.querySelector(`#${elementId}`));
  if (!element) return;

  // Set background
  element.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;

  // Change opacity based on 'energy'
  element.style.opacity = energy.toString();

  // Position
  Util.positionFromMiddle(element, position);
};

/**
 * Updates a given thing based on state.
 * This is called from script.js in a loop
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @returns {Thing}
 */
export const update = (thing, ambientState) => {
  const { energyGainAmount, energyLoss } = settings;
  let { energy, clicked } = thing;

  // 1. Alter properties based on external state/settings

  // 2. Alter properties based on the state of 'thing'
  // eg. increase 'energy' while being clicked
  if (clicked) {
    energy += energyGainAmount;
  }

  // 3. Apply 'intrinsic' logic of thing. Eg. that a variable will
  //    always decrease a little each loop
  //  eg. surprise goes down over time
  energy = energy * energyLoss;

  // 4. Apply sanity checks to properties, making sure they are within proper ranges
  energy = clamp(energy);

  // 5. Return a new Thing
  return Object.freeze({
    ...thing,
    energy
  });
};

/**
 * Creates a new thing
 * @param {string} elementId
 * @returns {Thing}
 */
export const create = (elementId) => {
  return Object.freeze({
    position: { x: 0.5, y: 0.5 },
    elementId,
    energy: 1,
    clicked: false,
    hue: 0
  });
};