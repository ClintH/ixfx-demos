import { frequencyTimer } from '../../ixfx/flow.js';
import { Oscillators } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  osc: Oscillators.sine(frequencyTimer(0.1))
});

let state = Object.freeze({
  /** @type {number} */
  oscValue: 0
});

const onTick = () => {
  const { osc } = settings;

  const v = osc.next().value; // Sample oscillator
  updateState ({
    oscValue: v ?? NaN
  });
};

const useState = () => {
  const { oscValue } = state;

  // Use oscValue somehow... here's two examples:

  // 1. Display value
  const oscVal = document.getElementById(`oscValue`);
  if (oscVal) oscVal.innerText = oscValue.toFixed(2);

  // 2. Use it to offset an element
  const thing = document.getElementById(`thing`);
  if (thing) thing.style.transform = `translate(${oscValue*300}px, 0px)`;
};

const loop = () => {
  onTick();
  useState();
  window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}