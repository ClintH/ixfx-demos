import { Points } from '../../ixfx/geometry.js';
import { interpolate, clamp } from '../../ixfx/numbers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Size in em units of thing at 100%
  sizeEm: 10,
  // Min and max range of mass
  // Note that range can go up to 4, meaning 400%
  massRange: [0.1, 4],
  // Reduction of mass per loop
  meltRate: 0.999,
  activityInterpolation: 0.1
});

/**
 * Define our thing
 * @typedef {{
 *  position: Points.Point
 *  mass: number
 *  activity: number
 *  elementSelector: string
 *  dragState:'none'|'dragging'
 * }} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { sizeEm } = settings;
  const { position, mass, elementSelector, activity } = thing;

  const element = /** @type HTMLElement */(document.querySelector(elementSelector));
  if (!element) return;

  // Change opacity based on last pointer press
  // x100 to get %, and make sure we don't drop down to zero
  // because otherwise the thing disappears
  const opacity = Math.max(Math.floor(activity * 100), 5);
  element.style.opacity = `${opacity}%`;

  // Change size based on mass
  element.style.height = element.style.width = `${sizeEm * mass}em`;

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
  const { meltRate, massRange, activityInterpolation } = settings;
  const { pressElapsed, movement } = ambientState;

  let { mass, activity } = thing;

  // Apply relevant state from the world. 0.01 is used to scale it down
  mass = mass + (mass * movement * 0.01);

  // Apply the 'logic' of the thing
  // - Our thing melts over time
  mass *= meltRate;

  // Make sure mass doesn't go outside our desired range
  mass = clamp(mass, massRange[0], massRange[1]);

  // Set 'activity' based on interpolation of current activity
  // and pressElapsed. pressElapsed is 0 when person has just pressed,
  // and 1 when maximum time has elapsed
  activity = interpolate(activityInterpolation, activity, 1 - pressElapsed);

  // Apply changes to a new Thing
  return {
    ...thing,
    activity,
    mass
  };
};

/**
 * Creates a new thing
 * @returns {Thing}
 */
export const create = (elementSelector) => {
  return {
    elementSelector,
    activity: 0.5,
    dragState: `none`,
    position: { x: 0.5, y: 0.5 },
    mass: 1
  };
};