import { Points } from '../../../ixfx/geometry.js';

/**
 * Position an element from its middle
 * @param {HTMLElement} element 
 * @param {Points.Point} relativePos 
 */
export const positionFromMiddle = (element, relativePos) => {
  if (!element) throw new Error(`Element undefined`);
  
  // Convert relative to absolute units
  const absPosition = Points.multiply(relativePos, window.innerWidth,window.innerHeight);
  
  const thingRect = element.getBoundingClientRect();
  const offsetPos = Points.subtract(absPosition, thingRect.width / 2, thingRect.height / 2);

  // Apply via CSS
  element.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
};

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
 * Add up all pointer movement in provided `events`
 * @param {PointerEvent} pointerEvent
 * @returns {number}
 */
export const addUpMovement = (pointerEvent) => {
  let movement = 0;
  const events = `getCoalescedEvents` in pointerEvent ? pointerEvent.getCoalescedEvents() : [pointerEvent];
  for (const event of events) {
    let { x, y } = relativePoint(event.movementX, event.movementY);

    // Movement can be negative,
    // we don't care about that
    x = Math.abs(x);
    y = Math.abs(y);

    // Combine movement values, using 0.01 as the lower-bound 
    movement += x + y;
  }
  return movement;
};