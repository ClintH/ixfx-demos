
import { Envelopes } from '../../ixfx/modulation.js';
import { continuously } from '../../ixfx/flow.js';

const settings = Object.freeze({
  sampleRateMs: 5,
  // Create the envelope
  envelope: new Envelopes.Adsr({
    attackBend: 1,
    attackDuration: 10 * 1000,
    releaseLevel: 0,
    releaseDuration: 15 * 1000,
    sustainLevel: 1
  })
});

/**
 * @typedef {{
 * envelopeValue: number
 * }} State
 */

/** @type State */
let state = Object.freeze({
  envelopeValue: 0
});

const update = () => {
  let { envelope } = settings;

  // Read value from envelope and set it to state
  let envelopeValue = envelope.value;
  // Set value to 0 if envelope has not been started
  if (Number.isNaN(envelopeValue)) envelopeValue = 0;

  saveState({
    envelopeValue
  });

  use();

  window.requestAnimationFrame(update);
};

/**
 * Apply the state to visual properties etc...
 */
const use = () => {
  const { envelopeValue } = state;
  console.log(envelopeValue);
};

function setup() {
  update();

  // Trigger envelope
  settings.envelope.trigger();
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}