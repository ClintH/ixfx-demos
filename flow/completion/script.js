// #region Imports
import { Elapsed } from '../../ixfx/flow.js';
// #endregion

const settings = Object.freeze({
  // How much time is considered 100%
  totalMs: 5000
});

let state = Object.freeze({
  /** @type Elapsed.Since */
  completion: Elapsed.infinity()
});

const use = () => {
  const { completion }  = state;

  const indicatorElement = document.querySelector(`#indicator`);
  const indicatorLevelElement = /** @type {HTMLElement} */(indicatorElement?.children[0]);

  let v = completion();
  
  // If we've reset, use 0 instead
  if (!Number.isFinite(v)) {
    v = 0;
  }
  
  setDebug(`completion: ${v.toPrecision(2)}`);

  // Assign to height
  indicatorLevelElement.style.height = (v*100)+ `%`; 
};

document.querySelector(`#one`)?.addEventListener(`pointerdown`, event => {
  event.stopPropagation();

  // Set a function to track elapsed time
  saveState({
    completion: Elapsed.progress(settings.totalMs, { clampValue: true })
  });
});

document.querySelector(`#one`)?.addEventListener(`pointerup`, event => {
  event.stopPropagation();

  // Remove the function
  saveState({
    completion: Elapsed.infinity()
  });
});

// #region Toolbox
function setup() {

  // Call use() every half a second
  setInterval(use, 5);
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

function setDebug(message) {
  const element = document.querySelector(`#debug`);
  if (!element) return;
  if (element.textContent === message) return;
  element.textContent = message;
}

setup();
// #endregion