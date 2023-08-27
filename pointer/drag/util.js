import { Points } from '../../ixfx/geometry.js';
export function pointToRelative(p) {
  return {
    x: p.x / window.innerWidth,
    y: p.y / window.innerHeight
  };
}

/**
 * Return position for element
 * @param {HTMLElement} element 
 * @param {Points.Point} relativePos 
 */
export function calcPositionByMiddle(element, relativePos) {
  // Convert relative to absolute units
  const absPosition = Points.multiply(relativePos, window.innerWidth,window.innerHeight);
  
  const thingRect = element.getBoundingClientRect();
  const offsetPos = Points.subtract(absPosition, thingRect.width / 2, thingRect.height / 2);

  return offsetPos;
}