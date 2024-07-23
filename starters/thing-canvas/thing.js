import { Points } from '../../ixfx/geometry.js';
import { interpolate, clamp } from '../../ixfx/numbers.js';
import * as Util from './util.js';
import { CanvasHelper } from '../../ixfx/dom.js';

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
 * @param {CanvasHelper} canvas
 */
export const use = (thing, canvas) => {
  const { ctx } = canvas;

  // Grab some properties from `thing`
  const { position, surprise, hue, size } = thing;

  const absolutePosition = canvas.toAbsolute(position);

  // Translate so 0,0 is the middle of the Thing
  ctx.save();
  ctx.translate(absolutePosition.x, absolutePosition.y);

  // Radius is size of thing proportional to half the smallest canvas dimension
  const radius = size * Math.min(canvas.width, canvas.height) / 2;

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
    position: { x: 0.5, y: 0.5 },
    surprise: 1,
    hue: 0,
    size: 1
  };
};