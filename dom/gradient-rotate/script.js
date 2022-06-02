import {continuously} from '../../ixfx/flow.js';
import * as Generators from '../../ixfx/generators.js';

const settings = {

  // Opacity of gradient stop
  opacity: 0.8,
  // Interval between hues
  interval: 60,
  // Gradient stop
  stop: 0.65,
  // Loop continually between 0-359
  offsetRange: Generators.numericRange(1, 0, 359, true)
}

let state = {
  // Current hue offset
  offset: 0,
  // Set to hues in setup
  hues: [],
}

// Assigns gradients to body, based on settings and state
const setGradient = () => {
  const {opacity, stop} = settings;
  const {offset, hues} = state;

  // Add current offset to hues
  const huesOffset = hues.map(h => h + offset);

  // Produce a CSS gradient for each hue
  const gradients = huesOffset.map(h => `linear-gradient(${h}deg, 
    hsla(${h}, 100%, 50%, ${opacity}), 
    hsla(${h}, 100%, 50%, 0%) ${stop * 100}%
   )`);

  // Assign CSS to body
  document.body.style.background = gradients.join(`, `);
}

// Calculate a new hue offset
const update = () => {
  const {offsetRange} = settings;
  state.offset = offsetRange.next().value || 0;
}

// Setup
const setup = () => {
  const {interval} = settings;

  // Generate a set of hues
  state.hues = [...Generators.numericRange(interval, 0, 360)];

  continuously(() => {
    update();
    setGradient();
  }).start();
}
setup();
