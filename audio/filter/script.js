import { scaleClamped } from '../../ixfx/numbers.js';
import { Oscillators } from '../../ixfx/modulation.js';
import { interval } from '../../ixfx/flow.js';
import * as Random from '../../ixfx/random.js';

const settings = Object.freeze({
  audioId: `rainstorm`,
  autoFilterRate: 0.2,
  autoFilterUpdateRateMs: 2,
  /** @type {"allpass" | "bandpass" | "highpass" | "highshelf" | "lowpass" | "lowshelf" | "notch" | "peaking"} */
  filterType: `bandpass`
});

let state = Object.freeze({
  /** @type boolean */
  initialised: false,
  /** @type Map<string,BasicAudio> */
  audio: new Map(),

  // Filter frequency in Hz
  /** @type number */
  filterFreq: 0,

  // Q-factor of filter
  filterQ: 0,
  /** @type boolean */
  readingAutoFilter: false
});

const use = () => {
  const { audioId } = settings;
  const a = state.audio.get(audioId);
  if (!a) return;

  const { filter } = a;
  const { filterFreq, filterQ } = state;
  filter.frequency.value = filterFreq;
  //filter.Q.value = filterQ;
};


const play = () => {
  initAudio();
  const { audioId } = settings;
  const a = state.audio.get(audioId);
  if (!a) {
    console.log(`Could not find AUDIO element with id '${audioId}'`);
    return;
  }
  const { el } = a;

  // Ensure playing & looping
  el.loop = true;
  el.play();
};


const stop = () => {
  initAudio();
  const { audioId } = settings;
  const a = state.audio.get(audioId);
  if (!a) {
    console.log(`Could not find AUDIO element with id '${audioId}'`);
    return;
  }
  const { el } = a;
  el.pause();
};

function setup() {
  const { audioId } = settings;

  // Set pan to a random value
  document.querySelector(`#btnRandom`)?.addEventListener(`click`, event => {
    initAudio();
    const a = state.audio.get(audioId);
    if (!a) {
      console.log(`Could not find AUDIO element with id '${audioId}'`);
      return;
    }

    saveState({ readingAutoFilter: false });
    play();

    // Random value of 200Hz - 2kHz
    saveState({ filterFreq: Random.integer({ min: 200, max: 2000 }) });
    use();
  });

  // Stops playback (or rather, pauses it)
  document.querySelector(`#btnStop`)?.addEventListener(`click`, stop);

  document.querySelector(`#panArea`)?.addEventListener(`click`, event => {
    play();
  });

  document.querySelector(`#panArea`)?.addEventListener(`pointermove`, event => {
    const pointerEvent = /** @type PointerEvent */(event);
    initAudio();
    // Size of area element
    const bounds = /** @type HTMLElement */(event.target).getBoundingClientRect();

    // Compute relative value
    const freq = scaleClamped(pointerEvent.x, 0, bounds.width, 200, 2000);

    // But we want -1 to 1 range
    saveState({ filterFreq: freq });
    use();
  });

  document.querySelector(`#btnAutoStart`)?.addEventListener(`click`, async event => {
    const { autoFilterRate: autoPanRate, autoFilterUpdateRateMs: autoPanUpdateRateMs } = settings;
    initAudio();

    saveState({ readingAutoFilter: true });
    const autoPan = Oscillators.sine(autoPanRate);
    play();
    for await (const v of interval(autoPan, autoPanUpdateRateMs)) {
      // Value from oscillator will be 0..1. We need 200Hz...2kHz
      const freq = scaleClamped(v, 0, 1, 200, 2000);
      saveState({ filterFreq: freq });
      use();
      if (!state.readingAutoFilter) break;
    }
  });

  document.querySelector(`#btnAutoStop`)?.addEventListener(`click`, event => {
    saveState({ readingAutoFilter: false });
  });

};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Initialise all audio elements on the page
 * @returns 
 */
function initAudio() {
  // Already initialised
  if (state.initialised) return;

  saveState({ initialised: true });
  /** @type Map<string,BasicAudio> */
  const ac = new Map();
  for (const element of document.querySelectorAll(`audio`)) {
    ac.set(element.id, initBasicAudio(element));
  }
  saveState({ audio: ac });
  return ac;
}

/**
 * Initialise audio
 * @param {HTMLMediaElement} audioElement 
 * @returns {BasicAudio}
 */
function initBasicAudio(audioElement) {
  const context = new AudioContext();

  // Source from AUDIO element
  const source = context.createMediaElementSource(audioElement);

  // Create stereo panner
  const pan = context.createStereoPanner();

  // Create gain node
  const gain = context.createGain();

  // Create filter
  const filter = context.createBiquadFilter();
  filter.type = settings.filterType;

  // Patch in
  // AUDIO elem -> gain -> panner -> speakers
  source.connect(gain);
  gain.connect(pan);
  pan.connect(filter);
  filter.connect(context.destination);

  return {
    pan, gain, filter,
    id: audioElement.id,
    ctx: context,
    el: audioElement
  };
}

/**
 * @typedef BasicAudio
 * @property {AudioContext} ctx
 * @property {StereoPannerNode} pan
 * @property {GainNode} gain
 * @property {BiquadFilterNode} filter
 * @property {string} id
 * @property {HTMLMediaElement} el
 */