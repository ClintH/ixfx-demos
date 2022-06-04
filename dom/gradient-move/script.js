/**
 * Rotates a CSS linear gradient based on the angle of pointer to
 * the middle of the screen.
 * 
 * Demonstrates: screen-to-relative coordinates, CSS linear gradients, CSS background clipping
 */
import {Points} from '../../ixfx/geometry.js';

const settings = {
  textEl: document.getElementById(`text`),
  gradient: [
    // Red at 0%, blue at 100%
    // ..more colours can be added with appropriate stop points
    [0, `red`],
    [1, `blue`]
  ]
}

let state = {
  // Relative pointer position
  pointer: {x: 0, y: 0},
  // Angle of pointer to middle of screen
  angleRadians: 0
}

// Assigns gradient to text based on state
const setGradient = () => {
  const {gradient, textEl} = settings;
  const {angleRadians} = state;

  // Convert input gradient settings:
  // eg from [1, `blue`] to `blue 100%`
  const hues = gradient.map(g => `${g[1]} ${g[0] * 100}%`);

  // Produce CSS linear-gradient
  // We need to offset the radians by a quarter turn
  const linearGradient = `linear-gradient(${angleRadians + Math.PI / 2}rad, ${hues.join(', ')}`;

  // Assign CSS to text element
  textEl.style.background = linearGradient;

  // This does the trick of restricting background to text
  textEl.style.backgroundClip = `text`;
  textEl.style.webkitBackgroundClip = `text`;
  textEl.style.webkitTextFillColor = `transparent`;
}

// Setup
const setup = () => {
  document.addEventListener(`pointermove`, evt => {
    // Transform screen coordinate to relative coordinate
    const relPointer = Points.normalise({x: evt.clientX, y: evt.clientY},
      window.innerWidth,
      window.innerHeight);

    // Calculate angle from center
    const angleRadians = Points.angleBetween(relPointer, {x: 0.5, y: 0.5});

    state = {
      ...state,
      pointer: relPointer,
      angleRadians
    }

    // Update gradient now that state has changed
    setGradient();
  })

  // Set initial gradient
  setGradient();
}
setup();
