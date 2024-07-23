import { Points } from '../../ixfx/geometry.js';
import { clamp } from '../../ixfx/numbers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  agitationDecay: 0.99
});

/**
 * Define our thing
 * @typedef {{
 *  position: Points.Point
 *  dragging: boolean
 *  mass: number
 *  id: number
 *  agitation: number
 *  el: HTMLElement
 * }} Thing
 */

/**
 * @typedef {{ 
 *  dragging: boolean
 *  position: Points.Point
 *  el: HTMLElement
 * }} Draggable
 */


/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { el, position, agitation } = thing;

  // Calculate top-left pos from relative center position
  Util.positionFromMiddle(el, position);

  // Calculate rotatation based on 'agitation'
  const rot = agitation * 360;
  el.style.rotate = `${rot}deg`;
};

/**
 * Updates a given thing based on state
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @returns {Thing}
 */
export const update = (thing, ambientState) => {
  const { agitationDecay } = settings;
  let { agitation, dragging, mass } = thing;

  if (dragging) {
    // Expand agitation
    agitation += Math.min(agitation, 0.001) * (1 - mass);
  } else {
    // Decay agitation
    agitation *= agitationDecay;
  }

  // Make sure we're within range
  agitation = clamp(agitation, 0.0001, 1);

  // Return new Thing
  return Object.freeze({
    ...thing,
    agitation
  });
};

/**
 * Creates a new thing
 * @param {number} id
 * @returns {Thing}
 */
export const create = (id) => {
  const element = document.createElement(`div`);
  element.classList.add(`thing`);
  document.body.append(element);

  const mass = Math.random();
  const size = mass * 100 + 100;
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;

  return {
    dragging: false,
    mass,
    id,
    agitation: 0,
    position: { x: Math.random(), y: Math.random() },
    el: element
  };
};