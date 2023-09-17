import { Points, radianToDegree } from '../../ixfx/geometry.js';

/**
 * Sets the innerText of an element with `id`
 * @param {string} id
 * @param {string} text
 * @returns void
 */
export function setText(id, text)  {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  element.textContent = text;
}

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

export function rotateElementById(id, rotation) {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element) {
    element.style.transform = `rotate(${rotation}deg)`;
  }
}