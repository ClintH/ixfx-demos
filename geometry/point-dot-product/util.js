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
 * @returns {{x:number,y:number}}
 */
export const addUpMovement = (pointerEvent) => {
  let xx = 0;
  let yy = 0;
  const events = `getCoalescedEvents` in pointerEvent ? pointerEvent.getCoalescedEvents() : [pointerEvent];
  for (const event of events) {
    // Combine movement values, using 0.01 as the lower-bound 
    xx += event.movementX;
    yy += event.movementY;
  }
  return {x: xx, y: yy };
};