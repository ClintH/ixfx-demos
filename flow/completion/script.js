// #region Imports
import { completionMs } from '../../ixfx/flow.js';
// #endregion

const settings = Object.freeze({
  // How much time is considered 100%
  totalMs: 5000
});

let state = Object.freeze({
  /** @type any */
  completion: undefined
});

const useState = () => {
  const { completion }  = state;

  const indicatorEl = document.getElementById(`indicator`);
  const indicatorLevelEl = /** @type {HTMLElement} */(indicatorEl?.children[0]);

  let v = 0;

  // If there is a function, use it
  if (completion) {
    // Get current completion 0..1 (0-100%)
    v = completion();
  }
  
  setDebug(`completion: ${v.toPrecision(2)}`);

  // Assign to height
  indicatorLevelEl.style.height = (v*100)+ `%`; 
};

document.getElementById(`one`)?.addEventListener(`pointerdown`, evt => {
  evt.stopPropagation();

  // Set a function to track elapsed time
  saveState({
    completion: completionMs(settings.totalMs)
  });
});

document.getElementById(`one`)?.addEventListener(`pointerup`, evt => {
  evt.stopPropagation();

  // Remove the function
  saveState({
    completion: undefined
  });
});

// #region Toolbox
const setup = () => {
  // Call useState every half a second
  setInterval(useState, 5);
};

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

function setDebug(msg) {
  const el = document.getElementById(`debug`);
  if (!el) return;
  if (el.innerText === msg) return;
  el.innerText = msg;
}

setup();
// #endregion