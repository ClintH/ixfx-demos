import { clamp } from '../../ixfx/numbers.js';
/**
 * Returns a position relative to size of element
 * @param {PointerEvent} event 
 * @param {HTMLElement} element 
 */
export function relativePosition(element, event) {
  const bounds = element.getBoundingClientRect();
  const s = getComputedStyle(element);
  const padding = Number.parseFloat(s.padding) * 2;
  return {
    x: clamp(event.offsetX / (bounds.width - padding)),
    y: clamp(event.offsetY / (bounds.height - padding))
  };
}

/**
 * 
 * @param {HTMLElement} fillElement 
 * @param {number} value 
 */
export function setFill(fillElement, value) {
  const parent = /** @type HTMLElement */(fillElement.parentElement);

  // Get size of level, slider & computed style of slider
  const fillBounds = fillElement.getBoundingClientRect();
  const sliderBounds = parent.getBoundingClientRect();
  const sliderStyle = getComputedStyle(parent);

  // Usable height is slider minus padding and size of level
  const usableHeight = sliderBounds.height - fillBounds.height - (Number.parseFloat(sliderStyle.padding) * 3);

  // Position by center of level indicator and current value
  fillElement.style.top = Number.parseFloat(sliderStyle.padding) + ((usableHeight * value) - fillBounds.height / 2) + `px`;
}