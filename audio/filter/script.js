import { scaleClamped } from '../../ixfx/data.js';
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

const useState = () => {
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

const setup = () => {
  const { audioId } = settings;

  // Set pan to a random value
  document.getElementById(`btnRandom`)?.addEventListener(`click`, evt => {
    initAudio();
    const a = state.audio.get(audioId);
    if (!a) {
      console.log(`Could not find AUDIO element with id '${audioId}'`);
      return;
    }

    updateState({ readingAutoFilter: false });
    play();

    // Random value of 200Hz - 2kHz
    updateState({ filterFreq: Random.integer({ min: 200, max: 2000 }) });
    useState();
  });

  // Stops playback (or rather, pauses it)
  document.getElementById(`btnStop`)?.addEventListener(`click`, stop);

  document.getElementById(`panArea`)?.addEventListener(`click`, evt => {
    play();
  });

  document.getElementById(`panArea`)?.addEventListener(`pointermove`, evt => {
    initAudio();
    // Size of area element
    const bounds = /** @type HTMLElement */(evt.target).getBoundingClientRect();

    // Compute relative value
    const freq = scaleClamped(evt.x, 0, bounds.width, 200, 2000);

    // But we want -1 to 1 range
    updateState({ filterFreq: freq });
    useState();
  });

  document.getElementById(`btnAutoStart`)?.addEventListener(`click`, async evt => {
    const { autoFilterRate: autoPanRate, autoFilterUpdateRateMs: autoPanUpdateRateMs } = settings;
    initAudio();

    updateState({ readingAutoFilter: true });
    const autoPan = Oscillators.sine(autoPanRate);
    play();
    for await (const v of interval(autoPan, autoPanUpdateRateMs)) {
      // Value from oscillator will be 0..1. We need 200Hz...2kHz
      const freq = scaleClamped(v, 0, 1, 200, 2000);
      updateState({ filterFreq: freq });
      useState();
      if (!state.readingAutoFilter) break;
    }
  });

  document.getElementById(`btnAutoStop`)?.addEventListener(`click`, evt => {
    updateState({ readingAutoFilter:false });
  });
  
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
 * Initialise all audio elements on the page
 * @returns 
 */
function initAudio() {
  // Already initialised
  if (state.initialised) return;

  updateState({ initialised:true });
  /** @type Map<string,BasicAudio> */
  const ac = new Map();
  document.querySelectorAll(`audio`).forEach(el => {
    ac.set(el.id, initBasicAudio(el));
  });
  updateState({ audio:ac });
  return ac;
}

/**
 * Initialise audio
 * @param {HTMLMediaElement} audioEl 
 * @returns {BasicAudio}
 */
function initBasicAudio(audioEl) {
  const ctx = new AudioContext();

  // Source from AUDIO element
  const source = ctx.createMediaElementSource(audioEl);
  
  // Create stereo panner
  const pan = ctx.createStereoPanner();

  // Create gain node
  const gain = ctx.createGain();

  // Create filter
  const filter = ctx.createBiquadFilter();
  filter.type = settings.filterType;

  // Patch in
  // AUDIO elem -> gain -> panner -> speakers
  source.connect(gain);
  gain.connect(pan);
  pan.connect(filter);
  filter.connect(ctx.destination);

  return {
    pan, gain, filter,
    id: audioEl.id,
    ctx,
    el:audioEl
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