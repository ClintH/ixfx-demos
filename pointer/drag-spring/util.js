import { Points } from '../../ixfx/geometry.js';

/**
 * Move an element.
 * @param {HTMLElement|string|null|undefined} elementOrQuery
 * @param {Points.Point|undefined} pos 
 * @returns 
 */
export const moveElement = (elementOrQuery, pos) => {
  if (elementOrQuery === undefined) return;
  if (pos === undefined) return;
  if (typeof elementOrQuery === `string`) {
    elementOrQuery = /** @type HTMLElement|null */ (document.querySelector(elementOrQuery));
  }

  if (!elementOrQuery) return;

  // Move element
  elementOrQuery.style.left = pos.x + `px`;
  elementOrQuery.style.top = pos.y  + `px`;
};

/**
 * Move an element.
 * @param {HTMLElement|string|null} elementOrQuery
 * @param {Points.Point} pos 
 * @returns 
 */
export const moveElementRelative = (elementOrQuery, pos) => {
  return moveElement(elementOrQuery, relativeToAbsolute(pos));
};

/**
 * Get the middle x,y for an element, in absolute coordinates
 * @param {HTMLElement|string|null} elementOrQuery 
 * @returns 
 */
export const getMiddleForElement = (elementOrQuery) => {
  if (typeof elementOrQuery === `string`) {
    elementOrQuery = /** @type HTMLElement|null */ (document.querySelector(elementOrQuery));
  }
  if (elementOrQuery === null) return {x:0,y:0};
  
  // Interpolate from dragged position back to middle of screen
  let middle = getMiddleAbsolute();
  const elemRect = elementOrQuery.getBoundingClientRect();
  
  // Offset this position so the middle of element is at the center, not top-left.
  middle = {
    x: middle.x - elemRect.width/2,
    y: middle.y - elemRect.height/2
  };
  return middle;
};

export const getMiddleAbsolute = () => {
  return {
    x: window.innerWidth/2,
    y: window.innerHeight/2
  };
};

/**
 * Convert absolute point to relative
 * @param {PointerEvent|Points.Point} point 
 */
export const absoluteToRelative = (point) => {
  return {
    x: point.x / window.innerWidth,
    y: point.y / window.innerHeight
  };
};

/**
 * Convert relative point to absolute
 * @param {Points.Point} point 
 * @returns 
 */
export const relativeToAbsolute = (point) => {
  return {
    x: point.x*window.innerWidth,
    y: point.y*window.innerHeight
  };
};