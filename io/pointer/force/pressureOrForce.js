import { clamp, scale } from '../../../ixfx/data.js';
/**
 * @typedef PressureForceState
 * @property {number} [webkitForce]
 * @property {number} normalised
 * @property {number} [pointerPressure]
 */

/**
 * @typedef PressureForceOpts
 * @property {boolean} [resetOnLeave] If true, values are zeroed if the pointer leave element. True by default
 * @property {number} [webkitForceMax]
 * @property {number} [webkitForceMin]
 */

/**
 * Helper function to bind to pressure/force events.
 * Event data is available via the `onChange` callback.
 * Returns a function to remove event handlers.
 * @param {HTMLElement} el 
 * @param {(state:PressureForceState)=>void} onChange 
 * @param {PressureForceOpts} [opts] 
 */
export function pressureOrForce(el, onChange, opts = {}) {
  const resetOnLeave = opts.resetOnLeave ?? true;
  const webkitForceMax = opts.webkitForceMax ?? 3;
  const webkitForceMin = opts.webkitForceMin ?? 1;

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