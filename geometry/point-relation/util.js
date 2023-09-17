import { Points, radianToDegree } from '../../ixfx/geometry.js';

/**
 * Returns the relative position from an absolute one
 * @param {Points.Point} pos 
 * @returns {Points.Point}
 */
export function relativePos(pos) {
  return {
    x: pos.x / window.innerWidth,
    y: pos.y / window.innerHeight
  };
}

/**
 * Sets the innerText of an element with `id`
 * @param {string} id
 * @param {string} text
 * @returns void
 */
export function setHtml(id, text)  {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  if (element.textContent === text) return;
  element.innerHTML = text;
}

/**
 * Positions an element by a relative coordinate
 * @param id {string} Id of element to position
 * @param pos {{x:number, y:number}} Relative coordinate
 */
export function positionIdByRelative(id, pos) {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));  
  if (!element) return;
  pos = Points.multiply(pos, window.innerWidth, window.innerHeight);

  const b = element.getBoundingClientRect();
  const p = Points.subtract(pos, b.width / 2, b.height / 2);
  element.style.transform = `translate(${p.x}px, ${p.y}px)`;
}