import { clamp } from '../../ixfx/data.js';
/**
 * Returns a position relative to size of element
 * @param {PointerEvent} event 
 * @param {HTMLElement} element 
 */
export function relativePosition(element, event)  {
  const bounds = element.getBoundingClientRect();
  const s = getComputedStyle(element);
  const padding = Number.parseFloat(s.padding) * 2;
  return {
    x: clamp(event.offsetX / (bounds.width - padding)),
    y: clamp(event.offsetY / (bounds.height - padding))
  };
}