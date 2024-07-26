
import { Envelopes } from '../../ixfx/modulation.js';
import { Data } from '../../ixfx/bundle.js';
import * as Util from './util.js';

const settings = Object.freeze({
  sampleRateMs: 5,
  // Options for envelope
  envelope: /** @type Envelopes.AdsrTimingOpts */({
    attackBend: 1,
    attackDuration: 1500,
    releaseLevel: 0,
    sustainLevel: 1
  }),
  sliderEl: /** @type HTMLElement */(document.querySelector(`#slider`)),
  fillEl: /** @type HTMLElement */(document.querySelector(`#slider>.fill`))
});

/**
* @typedef {{
*  target: number
*  value: ()=>number
* }} State
*/

/** @type State */
let rawState = Object.freeze({
  target: 0,
  value: () => 0
});

/**
 * Make visual udpates based on current state
 * @param {Data.ResolvedObject<rawState>} state
 * @returns 
 */
const use = (state) => {
  const { fillEl } = settings;
  const { value } = state;

  // Set height
  //fillEl.style.height = `10px`;

  Util.setFill(fillEl, value);
};

/**
 * Handles 'pointerup' event on #slider
 * @param {PointerEvent} event 
 */
const onPointerUp = async (event) => {
  const { envelope, sliderEl, sampleRateMs } = settings;

  // Get relative position based on click within element
  const position = Util.relativePosition(sliderEl, event);

  // Create a new envelope
  const env = Envelopes.adsr(envelope);

  // Make a function that computes Y position 
  // based on envelope value & target value
  const compute = () => {
    // Get the current value of envelope
    const v = env();
    // Multiply by target Y
    return position.y * v;
  };

  saveState({
    value: compute
  });
};

async function update() {
  // Resolve functions in state
  const state = await Data.resolveFields(rawState);

  // Use the computed state
  await use(state);

  window.requestAnimationFrame(update);
}

const setup = () => {
  const { sliderEl } = settings;
  sliderEl.addEventListener(`pointerup`, onPointerUp);
  update();
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  rawState = Object.freeze({
    ...rawState,
    ...s
  });
}

