import { Points } from '../../ixfx/geometry.js';
import { interpolate, clamp } from '../../ixfx/data.js';
import * as Util from './util.js';

const settings = Object.freeze({
  hueInterpolateAmount: 0.01,
  surpriseDropAmount: 0.001,
});

/**
 * Define our thing
 * @typedef {{
*  position: Points.Point
*  surprise: number
*  hue: number
*  size: number
* }} Thing
*/

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 * @param {CanvasRenderingContext2D} context
 * @param {import('./util.js').Bounds} bounds
 */
export const use = (thing, context, bounds) => {
  // Grab some properties from `thing`
  const { position, surprise, hue, size } = thing;

  const absolutePosition = Points.multiply(position, bounds.width, bounds.height);
  
  // Translate so 0,0 is the middle of the Thing
  context.save();
  context.translate(absolutePosition.x, absolutePosition.y);

  // Radius is size of thing proportional to half the smallest screen dimension
  const radius = size * bounds.min / 2;
  
  // Opacity is based on 'surprise'
  const opacity = surprise;

  // Draw circle
  const fillStyle = `hsl(${hue}, 50%, 50%, ${opacity})`;
  Util.drawLabelledCircle(context, radius, fillStyle);
  
  // Unwind translation
  context.restore();
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
 * @returns {Thing}
 */
export const create = () => {
  return {
    position: { x: 0.5, y:0.5 },
    surprise: 1,
    hue: 0,
    size: 1
  };
};