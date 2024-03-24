import { CanvasHelper } from '../../ixfx/dom.js';
import { Points, Rects } from '../../ixfx/geometry.js';

/**
 * These are the fixed settings for things
 * The 'settings' object in script.js are settings for the sketch.
 */
const settings = Object.freeze({});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  id:number
 *  position: Points.Point
 * }>} Thing
 */


/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 * @param {CanvasHelper} canvas
 */
export const use = (thing, canvas) => {
  const { id, position } = thing;
  const { ctx } = canvas;

  const absolutePosition = canvas.toAbsolute(position);

  // Translate canvas so 0,0 will be the position of Thing
  ctx.save();
  ctx.translate(absolutePosition.x, absolutePosition.y);

  // Draw the id of the thing
  ctx.fillStyle = `black`;
  ctx.fillText(id.toString(), 0, 0);

  // Remove the translation
  ctx.restore();
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