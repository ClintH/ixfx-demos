import { clamp } from '../../ixfx/data.js';
import { continuously } from '../../ixfx/flow.js';
import { adsr, defaultAdsrOpts } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  env: adsr({
    ...defaultAdsrOpts(),
    attackBend: 1,
    attackDuration: 1500,
    releaseLevel: 0,
    sustainLevel: 1
  }),
  envSample: continuously(sampleEnvelope, 5)
});

let state = Object.freeze({
  /** @type number */
  target: 0,
  /** @type number */
  value: 0
});

// Move level based on state
const useState = () => {
  const { value } = state;

  // Get HTML elements
  const fillEl = /** @type HTMLElement */(document.querySelector(`#slider>.fill`));
  if (!fillEl) return;
  const slider = /** @type HTMLElement */fillEl.parentElement;
  if (!slider) return;

  // Set height
  fillEl.style.height = `10px`;

  // Get size of level, slider & computed style of slider
  const fillBounds = fillEl.getBoundingClientRect();
  const sliderBounds = slider.getBoundingClientRect();
  const sliderStyle = getComputedStyle(slider);

  // Usable height is slider minus padding and size of level
  const usableHeight = sliderBounds.height - fillBounds.height - (parseFloat(sliderStyle.padding) * 3);

  // Position by center of level indicator and current value
  fillEl.style.top = parseFloat(sliderStyle.padding) + ((usableHeight*value) - fillBounds.height/2) + `px`;
};

// Loop that runs via settings.envSample, reading
// envelope value
function sampleEnvelope() {
  const { env } = settings;
  const { target } = state;

  // End sampling loop if envelope is done
  if (env.isDone) return false;
  
  // Get value from envelope
  const v = env.value;

  // Modulate
  const vv = v *  target;
  
  updateState({
    value: vv
  });

  // Visual refresh
  useState();
}

/**
 * 
 * @param {PointerEvent} evt 
 */
const onPointerUp = (evt) => {
  const { env, envSample } = settings;

  const slider = document.getElementById(`slider`);
  if (!slider) return;
  
  // Get relative pos based on click within element
  const pos = relativePosition(slider, evt);

  // Update target based on relative y
  updateState({
    target: pos.y
  });

  // Trigger envelope & (re)start envelope sampler loop
  env.trigger();
  envSample.start();
};

const setup = () => {
  const slider = document.getElementById(`slider`);
  if (!slider) return;

  slider.addEventListener(`pointerup`, onPointerUp);
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
 * @param {PointerEvent} evt 
 * @param {HTMLElement} el 
 */
function relativePosition(el, evt)  {
  const bounds = el.getBoundingClientRect();
  const s = getComputedStyle(el);
  const padding = parseFloat(s.padding) * 2;
  return {
    x: clamp(evt.offsetX / (bounds.width - padding)),
    y: clamp(evt.offsetY / (bounds.height - padding))
  };
}