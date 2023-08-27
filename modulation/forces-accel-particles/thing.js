import { Points } from '../../ixfx/geometry.js';
import { Forces } from '../../ixfx/modulation.js';
import * as Random from '../../ixfx/random.js';
/** 
 * @typedef Thing
 * @property {Points.Point} position
 * @property {Points.Point} velocity
 * @property {number} mass
 * @property {string} id 
 */

const settings = Object.freeze({
  // Max diameter of a thing
  thingSizeMax: 100
});

/**
 * Update a thing, returning a new instance
 * @param {Thing} t 
 * @returns {Thing}
 */
export const update = (t) => {
  // Apply velocity to calculate a new position
  let changedThing = Forces.apply(t);

  // Wrap point to be between 0,0 and 1,1
  // This means if the new position is outside the bounds of the screen
  // it will carry over to other side
  const posAfterWrap = Points.wrap(changedThing.position ?? { x: 0.5, y: 0.5 } );

  // Return new thing
  return {
    ...t,
    ...changedThing,
    position: posAfterWrap
  };
};

/**
 * Creates a thing, adding it to the list
 * @returns {Thing}
 */
export const create = () => {
  const t = {
    mass: Random.float({ min: 0.5, max: 1 }),
    id: Random.shortGuid(),
    // Assign random position (normalised 0..1 scale)
    position: Points.random(),
    // Random velocity on normalised 0..1 scale, and then reduced to lower speed
    velocity: Points.divide(Points.random(), 200),
  };
  return t;
};


/**
 * Returns a HTML element for a thing. Creates if one
 * does not exist
 * @param {Thing} t 
 * @returns HTMLElement
 */
export const getOrCreateElement = (t) => {
  const { thingSizeMax } = settings;

  const id = `thing-${t.id}`;
  let element = /** @type HTMLElement|null */(document.querySelector(`#${id}`));
  if (element === null) {
    element = document.createElement(`input`);
    element.setAttribute(`type`, `checkbox`);
    element.setAttribute(`checked`, `true`);
    element.classList.add(`thing`);
    element.id = id;
    element.style.width = Math.round(t.mass * thingSizeMax) + `px`;
    element.style.height = Math.round(t.mass * thingSizeMax) + `px`;
    
    document.body.append(element);
  }
  return element;
};