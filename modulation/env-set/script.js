
import { Envelopes } from '../../ixfx/modulation.js';
import * as Util from './util.js';

const settings = Object.freeze({
  sampleRateMs: 5,
  envOpts: {
    ...Envelopes.defaultAdsrOpts(),
    attackBend: 1,
    attackDuration: 1500,
    releaseLevel: 0,
    sustainLevel: 1
  },
  sliderEl: /** @type {HTMLElement} */(document.querySelector(`#slider`))
});

/**
* @typedef {{
*  target: number
*  value: number
*  abortController: AbortController
* }} State
*/

/** @type State */
let state = Object.freeze({
  target: 0,
  value: 0,
  abortController: new AbortController()
});

// Move visual slider based on state
const use = () => {
  const { sliderEl } = settings;
  const { value } = state;

  // Get HTML elements
  const fillElement = /** @type HTMLElement */(document.querySelector(`#slider>.fill`));
  if (!fillElement) return;

  // Set height
  fillElement.style.height = `10px`;

  // Get size of level, slider & computed style of slider
  const fillBounds = fillElement.getBoundingClientRect();
  const sliderBounds = sliderEl.getBoundingClientRect();
  const sliderStyle = getComputedStyle(sliderEl);

  // Usable height is slider minus padding and size of level
  const usableHeight = sliderBounds.height - fillBounds.height - (Number.parseFloat(sliderStyle.padding) * 3);

  // Position by center of level indicator and current value
  fillElement.style.top = Number.parseFloat(sliderStyle.padding) + ((usableHeight*value) - fillBounds.height/2) + `px`;
};

/**
 * Handles 'pointerup' event on #slider
 * @param {PointerEvent} event 
 */
const onPointerUp = async (event) => {
  const { envOpts,  sliderEl, sampleRateMs } = settings;
  const { abortController } = state;

  // Cancel existing envelope iteration
  abortController.abort(`onPointerUp`);
  
  // Get relative position based on click within element
  const target = Util.relativePosition(sliderEl, event).y;

  // Update target based on relative y
  saveState({
    target,
    abortController: new AbortController()
  });

  // Options for adsrIterable
  const options = {
    env: envOpts, 
    sampleRateMs, 
    signal: state.abortController.signal
  };

  try {
    // Async loop through values of envelope over time
    for await (const v of Envelopes.adsrIterable(options)) {
      // Modulate
      const vv = v * target;

      // Update state
      saveState({
        value: vv
      });

      // Visual refresh
      use();
    }
  } catch {
    // Ignore errors - this can happen when we abort
  }
};

function setup() {
  const { sliderEl } = settings;
  sliderEl.addEventListener(`pointerup`, onPointerUp);
};
setup();

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

