import { Points } from '../../ixfx/geometry.js';
import * as Util from './util.js';

const settings = Object.freeze({});

/**
 * Define our thing
 * @typedef {{
 *  id:number
 *  position: Points.Point
 * }} Thing
 */


/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 * @param {CanvasRenderingContext2D} context
 * @param {import('./util.js').Bounds} bounds
 */
export const use = (thing, context, bounds) => {
  const { id  } = thing;
  let { position } = thing;
  context.fillStyle = `black`;

  const absolutePoint = Util.makeAbsolute(position);
  
  // Translate canvas so 0,0 will be the position of Thing
  context.save();
  context.translate(absolutePoint.x, absolutePoint.y);


  context.fillText(id.toString(), 0, 0);

  context.restore();
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
  // 3. Apply 'intrinsic' logic of thing. Eg. that a variable will
  // 4. Apply sanity checks to properties, making sure they are within proper ranges
  // 5. Return a new Thing
  return Object.freeze({
    ...thing,
    // changed properties here...
  });
};

/**
 * Creates a new thing
 * @param {number} id
 * @returns {Thing}
 */
export const create = (id) => {
  return Object.freeze({
    id,
    position: {
      x: Math.random(),
      y: Math.random()
    }
  });
};