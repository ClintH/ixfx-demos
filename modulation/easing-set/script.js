import { clamp } from '../../ixfx/data.js';
import { continuously } from '../../ixfx/flow.js';
import { Easings } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  easing: Easings.time(`quintIn`, 1000),
  easingSample: continuously(sampleEnvelope, 20)
});

let state = Object.freeze({
  /** @type number */
  target: 0,
  /** @type number */
  value: 0.5
});

// Fill slider with current value
const useState = () => {
  const { value } = state;
  const fillEl = /** @type HTMLElement */(document.querySelector(`#slider>.fill`));
  if (!fillEl) return;

  fillEl.style.width = `${value*100}%`;
};

// Loop that runs via settings.envSample, reading
// envelope value
function sampleEnvelope() {
  const { easing } = settings;
  const { target,  value } = state;

  // End sampling loop if easing is done
  if (easing.isDone) return false;
  
  // Get value from easing
  const v = easing.compute();

  // How far to target from current
  // could be positive or negative value
  const distance = target - value;

  // Modulate distance based on easing,
  // add to current value
  const vv = (v * distance) + value;
  
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
  const { easing, easingSample } = settings;

  const slider = document.getElementById(`slider`);
  if (!slider) return;
  
  // Get relative pos based on click within element
  const pos = relativePosition(slider, evt);

  // Update target
  updateState({
    target: pos.x
  });

  // Trigger envelope & (re)start envelope sampler loop
  easing.reset();
  easingSample.start();
};

const setup = () => {
  const slider = document.getElementById(`slider`);
  if (!slider) return;

  slider.addEventListener(`pointerup`, onPointerUp);

  useState();
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