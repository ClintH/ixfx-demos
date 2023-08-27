/**
 * @typedef {{
 *  x: number,
 *  y: number,
 *  scale: number
 *  mass: number
 * }} Thing
 */


/**
 * @returns {Thing}
 */
export function create() {
  return {
    x: Math.random(),
    y: Math.random(),
    mass: Math.random(),
    scale: Math.random() * 0.5
  };
}