import { Points } from '../../ixfx/geometry.js';
import { interpolate, clamp } from '../../ixfx/numbers.js';
import { CanvasHelper } from '../../ixfx/dom.js';
import * as Util from './util.js';

const settings = Object.freeze({
  hueInterpolateAmount: 0.0001,
  surpriseDropAmount: 0.001,
  movementDecayAmt: 0.8,
  distanceScale: 0.1
});

/**
 * Define our thing
 * @typedef {{
*  position: Points.Point
*  surprise: number
*  size: number
*  movement: number
*  hue:number
*  id:number
* }} Thing
*/

/**
 * @param {Thing} thing
 * @param {number} amount
 * @param {{x:number, y:number}} lastPosition
 * @returns {Thing}
 */
export const onMovement = (thing, amount, lastPosition) => {
  const { distanceScale } = settings;
  let { movement } = thing;

  // Inverse distance from thing to pointer
  // ie. directly in the middle will be 1, further away will be closer to 0
  const distance = (1 - Points.distance(thing.position, lastPosition));

  // Scale movement movement amount in relation to distance
  //  - makes it have a smaller effect furtherer away it us
  amount = amount * distance * distanceScale;

  // Sanity check
  movement = clamp(movement + amount);

  return {
    ...thing,
    movement
  };
};

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 * @param {CanvasHelper} canvas
 */
export const use = (thing, canvas) => {
  const { ctx } = canvas;
  // Grab some properties from `thing`
  const { position, size, surprise, hue } = thing;

  const absolutePosition = canvas.toAbsolute(position);

  // Translate so 0,0 is the middle of the Thing
  ctx.save();
  ctx.translate(absolutePosition.x, absolutePosition.y);

  // Max radius is 8th of canvas
  const radius = size * canvas.dimensionMin / 8;

  // Opacity is based on 'surprise'
  const opacity = surprise;

  // Draw circle
  const fillStyle = `hsl(${hue}, 50%, 50%, ${opacity})`;
  Util.drawLabelledCircle(ctx, radius, fillStyle);

  // Unwind translation
  ctx.restore();
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
  return Object.freeze({
    position: { x: Math.random(), y: Math.random() },
    id,
    size: Math.random(),
    surprise: Math.random(),
    hue: Math.random() * 360,
    movement: 0
  });
};