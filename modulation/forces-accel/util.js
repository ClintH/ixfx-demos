import { Points } from '../../ixfx/geometry.js';

export const moveElement = (element, pos) => {
  // Get size of element to move
  const size = element.getBoundingClientRect();

  // Point to move to is given point, minus half width & height -- ie the top-left corner
  const pt = Points.subtract(pos, size.width / 2, size.height / 2);

  element.style.left = `${pt.x}px`;
  element.style.top = `${pt.y}px`;
};