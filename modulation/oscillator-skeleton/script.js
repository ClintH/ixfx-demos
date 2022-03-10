import {frequencyTimer} from '../../ixfx/flow.js';
import {Oscillators} from '../../ixfx/modulation.js';

// Define settings
const settings = {
  osc: Oscillators.sine(frequencyTimer(10))
}

// Initialise state
let state = {
  oscValue: 0
}

// Update state
const updateState = () => {
  const {osc} = settings;

  state = {
    ...state,                  // Copy any other values in state
    oscValue: osc.next().value // Sample oscillator
  }
}

// Apply state
const applyState = () => {
  const {oscValue} = state;

  // Use oscValue somehow...
  document.getElementById(`oscValue`).innerText = oscValue.toString();
}

const loop = () => {
  updateState();
  applyState();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);