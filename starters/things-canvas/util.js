import { Points } from '../../ixfx/geometry.js';

/**
 * @typedef {object} Bounds
 * @property {number} width
 * @property {number} height
 * @property {{x:number,y:number}} center
 * @property {number} min
 * @property {number} max
 */

export const getDrawingContext = (query = `#canvas`) => {
  /** @type HTMLCanvasElement|null */
  const canvasElement = document.querySelector(query);
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) throw new Error(`Could not get canvas`);
  return context;
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
