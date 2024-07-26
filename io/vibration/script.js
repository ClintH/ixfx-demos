import { defaultErrorHandler } from '../../ixfx/dom.js';

let state = Object.freeze({});


/**
 * Vibrate
 * @param {string} pattern 
 */
const vibrate = (pattern) => {
  // Split up space-separated pattern and convert each to a number
  const p = pattern.split(` `).map(v => Number.parseFloat(v));
  if (`vibrate` in navigator) {
    navigator.vibrate(p);
  } else {
    throw new Error(`Browser does not support vibrate`);
  }
};

const setup = async () => {
  // Display errors on page. Useful since we'll be running on a mobile
  defaultErrorHandler();

  document.querySelector(`#btnA`)?.addEventListener(`click`, () => {
    vibrate(`10`);
  });
  document.querySelector(`#btnB`)?.addEventListener(`click`, () => {
    vibrate(`10 20 30 10`);
  });

};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}