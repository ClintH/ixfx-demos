import { scaleClamped } from '../../ixfx/data.js';
import { Oscillators } from '../../ixfx/modulation.js';
import { interval } from '../../ixfx/flow.js';

const settings = Object.freeze({
  audioId: `rainstorm`,
  autoPanRate: 0.2,
  autoPanUpdateRateMs: 2
});

let state = Object.freeze({
  /** @type boolean */
  initialised: false,
  /** @type Map<string,BasicAudio> */
  audio: new Map(),
  /** @type number */
  pan: 0, // -1 to 1,
  /** @type boolean */
  readingAutoPan: false
});

const useState = () => {
  const { audioId } = settings;
  const a = state.audio.get(audioId); 
  if (!a) return;

  const { pan } = state;
  // Eg to set the pan value at a designated time...
  //a.pan.pan.setValueAtTime(pan, a.ctx.currentTime);
  a.pan.pan.value = pan;
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

    updateState({ readingAutoPan: false });
    play();

    // Random value of -1 to 1
    updateState({ pan: Math.random()*2-1 });
    useState();
  });

  // Stops playback (or rather, pauses it)
  document.getElementById(`btnStop`)?.addEventListener(`click`, stop);

  document.getElementById(`panArea`)?.addEventListener(`click`, evt => {
    console.log(`click`);
    play();
  });

  document.getElementById(`panArea`)?.addEventListener(`pointermove`, evt => {
    // Can't init from a pointermove
    if (!state.initialised) return;

    // Size of pan area element
    const bounds = /** @type HTMLElement */(evt.target).getBoundingClientRect();

    // Compute relative value: -1..1
    const pan = scaleClamped(evt.x, 0, bounds.width, -1, 1);

    // But we want -1 to 1 range
    updateState({ pan });
    useState();
  });

  document.getElementById(`btnAutoStart`)?.addEventListener(`click`, async evt => {
    const { autoPanRate, autoPanUpdateRateMs } = settings;
    initAudio();

    updateState({ readingAutoPan: true });
    const autoPan = Oscillators.sine(autoPanRate);
    play();
    for await (const v of interval(autoPan, autoPanUpdateRateMs)) {
      // Value from oscillator will be 0..1. We need -1...1
      const pan = scaleClamped(v, 0, 1, -1, 1);
      updateState({ pan });
      useState();
      if (!state.readingAutoPan) break;
    }
  });

  document.getElementById(`btnAutoStop`)?.addEventListener(`click`, evt => {
    updateState({ readingAutoPan:false });
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