import { Points, radianToDegree } from '../../ixfx/geometry.js';

/**
 * Make `x` and `y` relative with respect to window dimensions
 * @param {number} x
 * @param {number} y
 * @returns {{x:number,y:number}}  
 */
export const relativePoint = (x, y) => {
  return {
    x: x / window.innerWidth,
    y: y / window.innerHeight
  };
};


/**
 * Positions an element using relative coordinates
 * @param query {string}
 * @param position {{x:number, y:number}}
 */
export function positionElementByRelative(query, position) {
  const element = document.querySelector(query);
  if (element === null) return;
  if (element === undefined) return;

  position = Points.multiply(position, window.innerWidth, window.innerHeight);

  const b = element.getBoundingClientRect();
  const p = Points.subtract(position, b.width / 2, b.height / 2);
  /** @type HTMLElement */(element).style.transform = `translate(${p.x}px, ${p.y}px)`;
}

/**
 * Set textContent of element
 * @param {string} query Query to element
 * @param {string|undefined|number} text Text to set
 * @returns 
 */
export const textContent = (query, text) => {
  const element = document.querySelector(query);
  if (element === null) return;
  if (element === undefined) return;
  if (text === undefined) text = ``;
  if (typeof text === `number`) text =text.toString();
  element.textContent = text;
};