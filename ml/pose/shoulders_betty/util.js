import { Points } from '../../../ixfx/geometry.js';

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

export const textContent = (query, text) => {
  const element = document.querySelector(query);
  if (element === null) return;
  element.textContent = text;
};

/**
 * Draws a circle at 0,0 with optional text
 * @param {CanvasRenderingContext2D} context 
 * @param {number} radius
 */
export function drawLabelledCircle(context, radius, fillStyle = `black`, message = ``, textFillStyle = `white`)  {
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
