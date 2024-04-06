/**
 * Generates a stacked set of gradients based on a given
 * angle interval. Gradient hues are rotated over time.
 */
import { continuously } from '../../ixfx/flow.js';
import * as Numbers from '../../ixfx/numbers.js';

const settings = Object.freeze({
  // Opacity of gradient stop
  opacity: 0.8,
  // Interval between hues
  interval: 60,
  // Gradient stop
  stop: 0.65,
  // Loop continually between 0-359
  offsetRange: Numbers.numericRange(1, 0, 359, true)
});

let state = Object.freeze({
  // Current hue offset
  /** @type {number} */
  offset: 0,
  // Set to hues in setup
  hues: [0, 1, 2], // Dummy values to start
});

// Assigns gradients to body, based on settings and state
const use = () => {
  const { opacity, stop } = settings;
  const { offset, hues } = state;

  // Add current offset to hues
  const huesOffset = hues.map(h => h + offset);

  // Produce a CSS gradient for each hue
  const gradients = huesOffset.map(h => `linear-gradient(${h}deg, 
    hsla(${h}, 100%, 50%, ${opacity}), 
    hsla(${h}, 100%, 50%, 0%) ${stop * 100}%
   )`);

  // Assign CSS to body
  document.body.style.background = gradients.join(`, `);
};

// Calculate a new hue offset
const update = () => {
  const { offsetRange } = settings;
  saveState({
    offset: offsetRange.next().value || 0
  });
};

function setup() {
  const { interval } = settings;

  // Generate a set of hues
  saveState({ hues: [...Numbers.numericRange(interval, 0, 360)] });

  continuously(() => {
    update();
    use();
  }).start();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}