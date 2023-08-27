/**
 * Rotates a CSS linear gradient based on the angle of pointer to
 * the middle of the screen.
 * 
 * Demonstrates: screen-to-relative coordinates, 
 *  CSS linear gradients, 
 *  CSS background clipping
 */
import { Points } from '../../ixfx/geometry.js';

/**
 * Define our 'thing' (this is optional) which consists of 
 * scale,x,y,created and msg fields
 * @typedef {[stop:number, colour:string]} GradientStop
 */

const settings = Object.freeze({
  /** @type {GradientStop[]} */
  gradient: [
    // Red at 0%, blue at 100%
    // ..more colours can be added with appropriate stop points
    [ 0, `red` ],
    [ 1, `blue` ]
  ],
  /** @type {HTMLElement|null} */
  textEl: document.querySelector(`#text`),
});

let state = Object.freeze({
  // Relative pointer position
  pointer: { x: 0, y: 0 },
  // Angle of pointer to middle of screen
  /** @type {number} */
  angleRadians: 0
});

// Assigns gradient to text based on state
const setGradient = () => {
  const { gradient, textEl } = settings;
  const { angleRadians } = state;

  if (!textEl) return; // No text element for some reason

  // Convert input gradient settings
  // eg from [1, `blue`] to `blue 100%`
  const hues = gradient.map(g => {
    const stop = g[0] * 100;
    const colour = g[1];
    return `${colour} ${stop.toString()}%`;
  });

  // Produce CSS linear-gradient
  // We need to offset the radians by a quarter turn
  const linearGradient = `linear-gradient(
    ${angleRadians + Math.PI / 2}rad, 
    ${hues.join(`, `
  )}`;

  // Assign CSS to text element
  textEl.style.background = linearGradient;

  // This does the trick of restricting background to text
  textEl.style.backgroundClip = `text`;
  textEl.style.webkitBackgroundClip = `text`;
  textEl.style.webkitTextFillColor = `transparent`;
};

const use = () => {
  // Update gradient now that state has changed
  setGradient();
};
// Setup
function setup () {
  document.addEventListener(`pointermove`, event => {
    // Transform screen coordinate to relative coordinate
    const pointerRelative = Points.normaliseByRect(
      { x: event.clientX, y: event.clientY },
      window.innerWidth,
      window.innerHeight);

    // Calculate angle from center
    const angleRadians = Points.angle(pointerRelative, { x: 0.5, y: 0.5 });

    saveState({
      pointer: pointerRelative,
      angleRadians
    });

    use();
  });

  // Set initial gradient
  setGradient();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}