import { Points } from '../../ixfx/geometry.js';

/**
 * Position an element from its middle
 * @param {HTMLElement} element
 * @param {Points.Point} relativePos 
 */
export function positionFromMiddle(element, relativePos) {
  // Convert relative to absolute units
  const absPosition = Points.multiply(relativePos, window.innerWidth, window.innerHeight);

  const thingRect = element.getBoundingClientRect();
  const offsetPos = Points.subtract(absPosition, thingRect.width / 2, thingRect.height / 2);

  // Apply via CSS
  element.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
}