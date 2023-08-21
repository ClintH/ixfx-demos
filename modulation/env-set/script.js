import { clamp } from '../../ixfx/data.js';
import { continuously } from '../../ixfx/flow.js';
import { IterableAsync } from  '../../ixfx/util.js';
import { adsr, defaultAdsrOpts as defaultAdsrOptions, adsrIterable } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  sampleRateMs: 5,
  envOpts: {
    ...defaultAdsrOptions(),
    attackBend: 1,
    attackDuration: 1500,
    releaseLevel: 0,
    sustainLevel: 1
  },
  sliderEl: /** @type {HTMLElement} */(document.querySelector(`#slider`))
});

let state = Object.freeze({
  /** @type number */
  target: 0,
  /** @type number */
  value: 0,
  abortController: new AbortController()
});

// Move visual slider based on state
const useState = () => {
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
  const target = relativePosition(sliderEl, event).y;

  // Update target based on relative y
  updateState({
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
    for await (const v of adsrIterable(options)) {
      // Modulate
      const vv = v * target;

      // Update state
      updateState({
        value: vv
      });

      // Visual refresh
      useState();
    }
  } catch {
    // Ignore errors - this can happen when we abort
  }
};

const setup = () => {
  const { sliderEl } = settings;
  sliderEl.addEventListener(`pointerup`, onPointerUp);
};
setup();

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

/**
 * Returns a position relative to size of element
 * @param {PointerEvent} event 
 * @param {HTMLElement} element 
 */
function relativePosition(element, event)  {
  const bounds = element.getBoundingClientRect();
  const s = getComputedStyle(element);
  const padding = Number.parseFloat(s.padding) * 2;
  return {
    x: clamp(event.offsetX / (bounds.width - padding)),
    y: clamp(event.offsetY / (bounds.height - padding))
  };
}