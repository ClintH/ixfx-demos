/**
 * Uses Chrome's vibrate API
 * See README.md
 */
import { defaultErrorHandler } from '../../ixfx/dom.js';
import { adsrIterable, defaultAdsrOpts as defaultAdsrOptions } from '../../ixfx/modulation.js';
import { IterableAsync } from '../../ixfx/util.js';
import { interval, repeat } from '../../ixfx/flow.js';
import { interleave } from '../../ixfx/arrays.js';

const settings = Object.freeze({
  // Set up envelope
  envOpts: {
    ...defaultAdsrOptions(),
    attackDuration: 2000,
    releaseDuration: 5000,
    sustainLevel: 1,
    retrigger: false /* env continues from where it is */
  },
  sampleRateMs: 20,
  // How many millis the max env value equates to
  envScale: 100,
  // How many millis to be off between each envelope value
  restMs: 10
});

let state = Object.freeze({
  env: undefined,
  // Array to sample envelope into
  /** @type {readonly number[]} */
  envData: []
});

/**
 * Handle a pointer down
 * @param {PointerEvent} event 
 */
const onPointerDown = event => {
  const t = /** @type {HTMLElement} */(event.target);

  // Only care about BUTTONs with `vibrate` class
  if (t.nodeName !== `BUTTON`) return;
  if (!t.classList.contains(`vibrate`)) return;

  // Check for data-vibrate attribute in HTML
  const pattern = t.getAttribute(`data-vibrate`);
  if (pattern === null || pattern.length === 0) return;

  // Break up pattern into an array
  const patternArray = pattern
    .split(`, `)
    .map(string_ => Number.parseFloat(string_));
  
  console.log(`Pattern:`);
  console.log(patternArray);

  if (navigator.vibrate) {
    navigator.vibrate(patternArray);
  } else {
    throw new Error(`Browser does not support vibrate`);
  }
};

const setup = async () => {
  // Display errors on page. Useful since we'll be running on a mobile
  defaultErrorHandler();

  // We get vales from 0...1
  const buttonEnvelope = document.querySelector(`#btnEnv`);
  const labelEnvelope = document.querySelector(`#lblEnv`);
  if (labelEnvelope) labelEnvelope.textContent = `Sampling envelope...`;

  // Get envelope as an iterable
  const iter = await adsrIterable({ env: settings.envOpts, sampleRateMs: settings.sampleRateMs });
  let envelope = await IterableAsync.toArray(iter);

  // Map them to milliseconds, based on scaling setting
  envelope = envelope.map(v => Math.round(v * settings.envScale));

  // Generate an off pulse for each of the envelope's on pauses
  const pauses = [ ...repeat(envelope.length, () => settings.restMs) ];

  // Combine them together with ixfx's interleave function
  saveState({ envData: interleave(envelope, pauses) });

  if (buttonEnvelope) /** @type {HTMLButtonElement} */(buttonEnvelope).disabled = false;
  if (labelEnvelope) labelEnvelope.textContent = `Envelope sampled.`;


  document.addEventListener(`pointerdown`, onPointerDown);

  buttonEnvelope?.addEventListener(`click`, () => {
    console.log(`Running:`);
    console.log(state.envData);
    navigator.vibrate(state.envData);
  });
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