/**
 * Moves an element with relative x,y values
 * @param {HTMLElement} el 
 * @param {number} x 
 * @param {number} y 
 */
export function translateElement(el, x, y) {
  // Available width is width of viewport minus size of circle
  const bounds = el.getBoundingClientRect();
  const width = document.body.clientWidth - bounds.width;
  const height = document.body.clientHeight - bounds.height;

  el.style.transform = `translate(${x * width}px, ${y * height}px)`;
}

/**
 * Make a human-friendly percentage
 * @param {number} v 
 * @returns 
 */
export const percentage = (v) => Math.floor(v * 100) + `%`;

