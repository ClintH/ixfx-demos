import { CanvasHelper } from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';



/**
 * Draws a circle with optional text
 * @param {CanvasRenderingContext2D} context 
 * @param {number} radius
 */
export function drawLabelledCircle(context, radius, fillStyle = `black`, message = ``, textFillStyle = `white`) {
  // Fill a circle
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.fill();

  if (message.length > 0) {
    context.fillStyle = textFillStyle;
    context.textAlign = `center`;
    context.fillText(message, 0, 0);
  }
}


/**
 * Add up all pointer movement in provided `events`
 * @param {PointerEvent} pointerEvent
 * @param {CanvasHelper} canvas
 * @returns {number}
 */
export const addUpMovement = (pointerEvent, canvas) => {
  let movement = 0;
  const events = `getCoalescedEvents` in pointerEvent ? pointerEvent.getCoalescedEvents() : [pointerEvent];
  for (const event of events) {
    let { x, y } = canvas.toRelative(event.movementX, event.movementY);

    // Movement can be negative,
    // we don't care about that
    x = Math.abs(x);
    y = Math.abs(y);

    // Combine movement values, using 0.01 as the lower-bound 
    movement += x + y;
  }
  return movement;
};