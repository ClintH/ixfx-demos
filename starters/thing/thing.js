import { Points } from '../../ixfx/geometry.js';
import { interpolate, clamp } from '../../ixfx/numbers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  hueInterpolateAmount: 0.01,
  surpriseDropAmount: 0.001
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  position: Points.Point
 *  surprise: number
 *  elementId: string
 *  hue: number
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  // Grab some properties from `thing`
  const { position, elementId, surprise, hue } = thing;

  // Resolve element
  const element = /** @type HTMLElement */(document.querySelector(`#${elementId}`));
  if (!element) return;

  // Set background
  element.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;

  // Change opacity based on 'surprise'
  element.style.opacity = surprise.toString();

  // Position
  Util.positionFromMiddle(element, position);
};

/**
 * Updates a given thing based on state
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @returns {Thing}
 */
export const update = (thing, ambientState) => {
  const { hueInterpolateAmount, surpriseDropAmount } = settings;
  let { hue, surprise } = thing;
  // In this function, we probably want the steps:

  // 1. Alter properties based on external state/settings
  //  eg. get the thing to chase the hue of the ambient state
  hue = interpolate(hueInterpolateAmount, hue, ambientState.hue);

  // eg. incorporate 'movement' from ambient state into surprise
  surprise += ambientState.movement;

  // 2. Alter properties based on the state of 'thing'

  // 3. Apply 'intrinsic' logic of thing. Eg. that a variable will
  //    always decrease a little each loop
  //  eg. surprise goes down over time
  surprise = surprise - surpriseDropAmount;

  // 4. Apply sanity checks to properties, making sure they are within proper ranges
  surprise = clamp(surprise);
  hue = clamp(hue, 0, 360);

  // 5. Return a new Thing
  return Object.freeze({
    ...thing,
    hue,
    surprise
  });
};

/**
 * Creates a new thing
 * @param {string} elementId
 * @returns {Thing}
 */
export const create = (elementId) => {
  return {
    position: { x: 0.5, y: 0.5 },
    elementId,
    surprise: 1,
    hue: 0
  };
};