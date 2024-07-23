import { Points } from '../../ixfx/geometry.js';
import * as Util from './util.js';

const settings = Object.freeze({});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  position: Points.Point
 *  id:number
 *  element: HTMLElement
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  // Grab some properties from `thing`
  const { position, element } = thing;

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
  // In this function, we probably want the steps:

  // 1. Alter properties based on external state/settings
  // 2. Alter properties based on the state of 'thing'
  // 3. Apply 'intrinsic' logic of thing.
  // 4. Apply sanity checks to properties, making sure they are within proper ranges

  // 5. Return a new Thing, with updated fields
  return Object.freeze({
    ...thing,
    // updated fields here...
  });
};

/**
 * Creates a new thing
 * @param {number} id
 * @returns {Thing}
 */
export const create = (id) => {
  const element = document.createElement(`div`);
  element.id = `thing-${id}`;
  element.classList.add(`thing`);
  document.body.append(element);

  const t = {
    position: { x: Math.random(), y: Math.random() },
    id,
    element
  };
  return t;
};