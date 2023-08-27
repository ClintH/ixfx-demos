
import { continuously } from '../../ixfx/flow.js';
import { Easings } from '../../ixfx/modulation.js';
import * as Util from './util.js';

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
const use = () => {
  const { value } = state;
  const fillElement = /** @type HTMLElement */(document.querySelector(`#slider>.fill`));
  if (!fillElement) return;

  fillElement.style.width = `${value*100}%`;
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
  
  saveState({
    value: vv
  });

  // Visual refresh
  use();
}

/**
 * 
 * @param {PointerEvent} event 
 */
const onPointerUp = (event) => {
  const { easing, easingSample } = settings;

  const slider = /** @type HTMLElement */(document.querySelector(`#slider`));
  if (!slider) return;
  
  // Get relative pos based on click within element
  const pos = Util.relativePosition(slider, event);

  // Update target
  saveState({
    target: pos.x
  });

  // Trigger envelope & (re)start envelope sampler loop
  easing.reset();
  easingSample.start();
};

function setup() {
  const slider = /** @type HTMLElement */(document.querySelector(`#slider`));
  if (!slider) return;

  slider.addEventListener(`pointerup`, onPointerUp);

  use();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

