import { Points } from '../../ixfx/geometry.js';
import { interpolate, clamp } from '../../ixfx/numbers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  hueInterpolateAmount: 0.0001,
  surpriseDropAmount: 0.001,
  movementDecayAmt: 0.9
});

/**
 * Define our thing
 * @typedef {{
 *  position: Points.Point
 *  id:number
 *  surprise: number
 *  size: number
 *  movement: number
 *  element: HTMLElement
 *  hue:number
 * }} Thing
 */


/**
 * @param {Thing} thing
 * @param {number} amount
 * @param {Element[]} elements
 * @returns {Thing}
 */
export const onMovement = (thing, amount, elements) => {
  let { element, movement } = thing;

  // True if our id is in the list of ids
  const isHovering = elements.includes(element);

  // Halve the movement amount if pointer movement is not
  // over this thing
  amount = isHovering ? amount : amount * 0.01;

  movement = clamp(movement + amount);
  return {
    ...thing,
    movement
  };
};

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  // Grab some properties from `thing`
  const { position, element, surprise, hue } = thing;

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
  const { hueInterpolateAmount, surpriseDropAmount, movementDecayAmt } = settings;
  let { hue, surprise, size, movement } = thing;
  // In this function, we probably want the steps:

  // 1. Alter properties based on external state/settings
  //  eg. get the thing to chase the hue of the ambient state,
  //      in relation to size (larger ones will change faster)
  hue = interpolate(hueInterpolateAmount * size, hue, ambientState.hue);

  // 2. Alter properties based on the state of 'thing'
  // eg. 'movement' from ambient state into surprise
  surprise += movement;

  // 3. Apply 'intrinsic' logic of thing. Eg. that a variable will
  //    always decrease a little each loop
  //  eg. surprise & movement goes down over time
  surprise = surprise - surpriseDropAmount;
  movement = movement * movementDecayAmt;

  // 4. Apply sanity checks to properties, making sure they are within proper ranges
  surprise = clamp(surprise);
  hue = clamp(hue, 0, 360);
  movement = clamp(movement);

  // 5. Return a new Thing
  return Object.freeze({
    ...thing,
    hue,
    surprise,
    movement
  });
};

/**
 * Creates a new thing
 * @param {number} id
 * @returns {Thing}
 */
export const create = (id) => {
  const size = Math.random();

  const element = document.createElement(`div`);
  element.id = `thing-${id}`;
  element.classList.add(`thing`);
  element.style.width = `${size * 30}em`;
  element.style.height = `${size * 30}em`;
  document.body.append(element);

  const t = {
    position: { x: Math.random(), y: Math.random() },
    id,
    size: Math.random(),
    surprise: Math.random(),
    hue: Math.random() * 360,
    element,
    movement: 0
  };
  return t;
};