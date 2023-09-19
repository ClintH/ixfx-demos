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
 * Convert relative coordinate to absolute,
 * based on viewport size
 * @param {Points.Point} point 
 * @returns 
 */
export const makeAbsolute = (point) => {
  return {
    x: point.x * window.innerWidth,
    y: point.y * window.innerHeight
  };
};

/**
 * Make point relative with respect to window dimensions
 * @param {Points.Point} point
 * @returns Points.Point 
 */
export const relativePoint = (point) => {
  return {
    x: point.x / window.innerWidth,
    y: point.y / window.innerHeight
  };
};
