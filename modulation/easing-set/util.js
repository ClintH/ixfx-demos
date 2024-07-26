import { clamp } from '../../ixfx/numbers.js';

/**
 * Returns a position relative to size of element
 * @param {PointerEvent} event 
 * @param {HTMLElement|null|EventTarget} elementOrEvent 
 */
export function relativePosition(elementOrEvent, event) {
  if (!elementOrEvent) throw new Error(`Param 'element' is null`);
  const element = /** @type HTMLElement */(elementOrEvent);
  const bounds = element.getBoundingClientRect();
  const s = getComputedStyle(element);
  const padding = Number.parseFloat(s.padding) * 2;
  return {
    x: clamp(event.offsetX / (bounds.width - padding)),
    y: clamp(event.offsetY / (bounds.height - padding))
  };
}