import { Points } from '../../../ixfx/geometry.js';
import {interpolate} from '../../../ixfx/data.js';
import * as MoveNet from "../Poses.js";
import * as Util from './util.js';

const settings = Object.freeze({
  positionInterpolate: 0.1
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  position: Points.Point
 *  id:string
 *  distance:number
 *  element: HTMLElement
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { position, element, distance } = thing;
  
  element.textContent = Math.round(distance*100).toString() + `%`;

  // Position
  Util.positionFromMiddle(element, position);
};

/**
 * Updates a given thing based on state
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @param {MoveNet.PoseTracker} poseTracker
 * @returns {Thing}
 */
export const update = (thing, ambientState, poseTracker) => {
  const {positionInterpolate} = settings;
  let {x,y} = thing.position;
  const avgDistance = computeDistance(thing, ambientState) ?? thing.distance;
  
  const middle = poseTracker.middle();
  x = interpolate(positionInterpolate, x, middle.x);
  return Object.freeze({
    ...thing,
    position: { x, y },
    distance: avgDistance
  });
};

/**
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 */
const computeDistance = (thing, ambientState) => {
// Add up distance from this thing to all other things
  const ourMiddle = ambientState.middles.find(m => m.id === thing.id);
  if (ourMiddle !== undefined) {
    let distance = 0;
    let counted = 0;
    for (const p of ambientState.middles) {
      if (p.id === thing.id) continue; // Skip itself
      distance += Points.distance(ourMiddle.position, p.position);
      counted++; 
    }
    return distance/counted;
  }
  return 1;
};

/**
 * Removes a thing
 * @param {Thing} thing 
 */
export const remove = (thing) => {
  const element = thing.element;
  element.remove();
};

/**
 * Creates a new thing
 * @param {string} id
 * @param {number} x
 * @returns {Thing}
 */
export const create = (id, x) => {
  const element = document.createElement(`div`);
  element.id = `thing-${id}`;
  element.classList.add(`thing`);
  document.body.append(element);

  const t = {
    distance: 0,
    position: { x, y: 0.5 },
    id,
    element
  };
  return t;
};