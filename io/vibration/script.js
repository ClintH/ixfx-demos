/**
 * Uses Chrome's vibrate API
 * See README.md
 */
import {defaultErrorHandler} from '../../ixfx/dom.js';
import {adsrSample, defaultAdsrOpts} from '../../ixfx/modulation.js';
import {IterableAsync} from '../../ixfx/util.js';
import {repeat} from '../../ixfx/flow.js';
import {interleave} from '../../ixfx/arrays.js';


const settings = {
  // Set up envelope
  envOpts: {
    ...defaultAdsrOpts(),
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
}

let state = {
  // Array to sample envelope into
  envData: []
};

// Update state - this is called by runLoop
const update = () => {
  const {env} = settings;

  // Get state from envelope
  const [stage, scaled, raw] = env.compute();
  state = {
    ...state,
    amt: scaled,
    stage,
    raw
  }

  console.log()
  // Return false if envelope is done. This will stop the run loop
  return (!Number.isNaN(scaled));
}

/**
 * Handle a pointer down
 * @param {PointerEvent} evt 
 */
const onPointerDown = evt => {
  const t = evt.target;

  // Only care about BUTTONs with `vibrate` class
  if (t.nodeName !== `BUTTON`) return;
  if (!t.classList.contains(`vibrate`)) return;

  // Check for data-vibrate attribute in HTML
  const pattern = t.getAttribute(`data-vibrate`);
  if (pattern === null || pattern.length === 0) return;

  // Break up pattern into an array
  const patternArray = pattern.split(', ');
  console.log(`Pattern:`);
  console.log(patternArray);

  if (navigator.vibrate) {
    navigator.vibrate(patternArray);
  } else {
    throw new Error(`Browser does not support vibrate`);
  }
}

const setup = async () => {

  // Display errors on page. Useful since we'll be running on a mobile
  defaultErrorHandler();

  // We get vales from 0...1
  const btnEnv = document.getElementById(`btnEnv`);
  const lblEnvEl = document.getElementById(`lblEnv`);
  lblEnvEl.innerText = `Sampling envelope...`;

  IterableAsync.toArray(adsrSample(settings.envOpts, settings.sampleRateMs)).then(env => {
    // Map them to milliseconds, based on scaling setting
    env = env.map(v => Math.round(v * settings.envScale));

    // Generate an off pulse for each of the envelope's on pauses
    const pauses = repeat(env.length, () => settings.restMs);

    // Combine them together with ixfx's interleave function
    state.envData = interleave(env, pauses);

    btnEnv.disabled = false;
    lblEnvEl.innerText = `Envelope sampled.`;
  });

  document.addEventListener(`pointerdown`, onPointerDown);

  btnEnv.addEventListener(`click`, () => {
    console.log(`Running:`);
    console.log(state.envData);
    navigator.vibrate(state.envData);
  });
}
setup();



