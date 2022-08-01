/**
 * Demonstrates a 'pinch to zoom' style gesture
 */
import { pointerVisualise } from '../../../ixfx/dom.js';
import { Points } from '../../../ixfx/geometry.js';
import { clamp, scale } from '../../../ixfx/data.js';
import { numberTracker, pointsTracker } from '../../../ixfx/data.js';

const settings = Object.freeze({
  // Max expected value for webkitForce
  webkitForceMax: 3,
  // Min expected value for webkitForce
  webkitForceMin: 1
});

/** @type {PressureForceState} */
let state ={
  webkitForce: 0,
  normalised: 0,
  pointerPressure: 0
};

/**
 * Update screen with state
 */
const displayState = () => {
  const { webkitForce, normalised, pointerPressure } = state;
  const webkitForceEl = document.getElementById(`webkitForce`);
  if (webkitForceEl) {
    if (webkitForce) webkitForceEl.innerHTML = webkitForce.toString();
    else webkitForceEl.innerHTML = `?`;
  }

  const pointerPressureEl = document.getElementById(`pointerPressure`);
  if (pointerPressureEl) {
    if (pointerPressure) pointerPressureEl.innerHTML = pointerPressure.toString();
    else pointerPressureEl.innerHTML = `?`;
  }

  const normalisedEl = document.getElementById(`normalised`);
  if (normalisedEl) normalisedEl.innerHTML = normalised.toString();
};

const useState = () => {
  const { normalised } = state;

  // Display numerical readouts
  displayState();

  // Use data to change background
  const el = document.getElementById(`thing`);
  if (!el) return;
  el.style.backgroundColor = `hsl(100, ${Math.round(normalised*100)}%, 50%)`;
};

const setup = () => {
  const el = document.getElementById(`thing`);
  if (!el) return;

  // Listen for pressure or force events on element,
  // setting state and using it.
  pressureOrForce(el, state => {
    updateState(state);
    useState();
  });
  

};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState(s) {
  state = {
    ...state,
    ...s
  };
}

/**
 * @typedef PressureForceState
 * @property {number} [webkitForce]
 * @property {number} normalised
 * @property {number} [pointerPressure]
 */

/**
 * Helper function to bind to pressure/force events.
 * Event data is available via the `onChange` callback.
 * Returns a function to remove event handlers.
 * @param {HTMLElement} el 
 * @param {(state:PressureForceState)=>void} onChange 
 * @param {boolean} resetOnLeave If true, values are zeroed if the pointer leave element. True by default
 */
function pressureOrForce(el, onChange, resetOnLeave = true) {
  /** @type {PressureForceState} */
  let state ={
    webkitForce: 0,
    normalised: 0,
    pointerPressure: 0
  };

  let seenWebkitForce = false;

  /**
   * Update state
   * @param {PressureForceState} s 
   */
  const updateElState = (s) => {
    state = {
      ...state,
      ...s
    };
    onChange(state);
  };

  const updateWebkitForce = (evt) => {
    const { webkitForceMax, webkitForceMin } = settings;
    seenWebkitForce = true;
    evt.preventDefault();
    updateElState({ 
      webkitForce: evt.webkitForce,
      normalised: clamp(scale(evt.webkitForce, webkitForceMin, webkitForceMax))
    });
  };

  el.addEventListener(`webkitmouseforcewillbegin`, updateWebkitForce);
  el.addEventListener(`webkitmouseforcedown`, updateWebkitForce);
  el.addEventListener(`webkitmouseforceup`, updateWebkitForce);
  el.addEventListener(`webkitmouseforcechanged`, updateWebkitForce);

  /**
   * 
   * @param {PointerEvent} evt 
   */
  const updatePressure = (evt) => {
    evt.preventDefault();
    if (evt.type === `pointerleave` || evt.type === `pointerup`) {
      if (resetOnLeave) updateElState({ pointerPressure: 0, normalised: 0, webkitForce: 0 });
    } else { 
      if (seenWebkitForce && evt.pointerType === `mouse`) {
      // Don't trample on normalised value if it seems we have Webkit force events instead
        updateElState({ 
          normalised: state.normalised,
          pointerPressure: evt.pressure
        });
      } else {
        updateElState({ 
          pointerPressure: evt.pressure,
          normalised: evt.pressure
        });
      }
    }
    useState();
  };

  el.addEventListener(`pointermove`, updatePressure);
  el.addEventListener(`pointerup`, updatePressure);
  el.addEventListener(`pointerdown`, updatePressure);
  el.addEventListener(`pointerleave`, updatePressure);

  const dispose = () => {
    el.removeEventListener(`webkitmouseforcewillbegin`, updateWebkitForce);
    el.removeEventListener(`webkitmouseforcedown`, updateWebkitForce);
    el.removeEventListener(`webkitmouseforceup`, updateWebkitForce);
    el.removeEventListener(`webkitmouseforcechanged`, updateWebkitForce);

    el.removeEventListener(`pointermove`, updatePressure);
    el.removeEventListener(`pointerup`, updatePressure);
    el.removeEventListener(`pointerdown`, updatePressure);
    el.removeEventListener(`pointerleave`, updatePressure);
  };
  return dispose;
}
