import { clamp, scale } from '../../ixfx/numbers.js';
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
 * @param {HTMLElement} element 
 * @param {(state:PressureForceState)=>void} onChange 
 * @param {PressureForceOpts} [options] 
 */
export function pressureOrForce(element, onChange, options = {}) {
  const resetOnLeave = options.resetOnLeave ?? true;
  const webkitForceMax = options.webkitForceMax ?? 3;
  const webkitForceMin = options.webkitForceMin ?? 1;

  /** @type {PressureForceState} */
  let elementState = {
    webkitForce: 0,
    normalised: 0,
    pointerPressure: 0
  };

  let seenWebkitForce = false;

  /**
   * Update state
   * @param {PressureForceState} s 
   */
  const updateElementState = (s) => {
    elementState = {
      ...elementState,
      ...s
    };
    onChange(elementState);
  };

  const updateWebkitForce = (event) => {
    seenWebkitForce = true;
    event.preventDefault();
    updateElementState({
      webkitForce: event.webkitForce,
      normalised: clamp(scale(event.webkitForce, webkitForceMin, webkitForceMax))
    });
  };

  element.addEventListener(`webkitmouseforcewillbegin`, updateWebkitForce);
  element.addEventListener(`webkitmouseforcedown`, updateWebkitForce);
  element.addEventListener(`webkitmouseforceup`, updateWebkitForce);
  element.addEventListener(`webkitmouseforcechanged`, updateWebkitForce);

  /**
   * 
   * @param {PointerEvent} event 
   */
  const updatePressure = (event) => {
    event.preventDefault();
    if (event.type === `pointerleave` || event.type === `pointerup`) {
      if (resetOnLeave) updateElementState({ pointerPressure: 0, normalised: 0, webkitForce: 0 });
    } else {
      if (seenWebkitForce && event.pointerType === `mouse`) {
        // Don't trample on normalised value if it seems we have Webkit force events instead
        updateElementState({
          normalised: elementState.normalised,
          pointerPressure: event.pressure
        });
      } else {
        updateElementState({
          pointerPressure: event.pressure,
          normalised: event.pressure
        });
      }
    }
  };

  element.addEventListener(`pointermove`, updatePressure);
  element.addEventListener(`pointerup`, updatePressure);
  element.addEventListener(`pointerdown`, updatePressure);
  element.addEventListener(`pointerleave`, updatePressure);

  const dispose = () => {
    element.removeEventListener(`webkitmouseforcewillbegin`, updateWebkitForce);
    element.removeEventListener(`webkitmouseforcedown`, updateWebkitForce);
    element.removeEventListener(`webkitmouseforceup`, updateWebkitForce);
    element.removeEventListener(`webkitmouseforcechanged`, updateWebkitForce);

    element.removeEventListener(`pointermove`, updatePressure);
    element.removeEventListener(`pointerup`, updatePressure);
    element.removeEventListener(`pointerdown`, updatePressure);
    element.removeEventListener(`pointerleave`, updatePressure);
  };
  return dispose;
}