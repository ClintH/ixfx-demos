import { clamp } from '../../ixfx/numbers.js';

/**
 * Convert relative point to absolute.
 * @param {Point} relativePoint
 * @param {Rect} context
 * @returns {Point}
 */
export function toAbsolutePoint(relativePoint, context) {
  return {
    x: relativePoint.x * context.width,
    y: relativePoint.y * context.height
  };
}

/**
 * Convert to relative point, using screen size
 * @param {number} x 
 * @param {number} y 
 * @returns {Point}
 */
export function toRelativePoint(x, y) {
  return {
    x: clamp(x / window.innerWidth),
    y: clamp(y / window.innerHeight)
  };
}

/** @typedef {{
 * width:number
 * height:number
 * center: Point
 * }} Bounds 
 */

/** @typedef {{
 * width:number
 * height:number
 * }} Rect 
 */

/** @typedef {{
 * x: number
 * y: number
 * }} Point */
