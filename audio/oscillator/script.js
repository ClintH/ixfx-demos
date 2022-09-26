import { scaleClamped, scale, scalePercent } from '../../ixfx/data.js';

const settings = Object.freeze({
  /** @type OscillatorOpts */
  oscillator:  {
    type: `sawtooth`,
    frequency: 440
  },
  freqRange: [ 120, 1000 ]
});

let state = Object.freeze({
  /** @type BasicAudio|undefined */
  audio: undefined,
  /** @type number */
  x: 0.5,
  /** @type number */
  y: 0.5
});

const useState = () => {
  const { freqRange } = settings;
  const { x, y } = state;
  
  const audio = initAudio();
  if (!audio) return;

  // Scale 0..1 to desired frequency range from settings
  const freq = scalePercent(x, freqRange[0], freqRange[1]);
  // Gain can use 0..1 range
  const level = y;

  const { ctx, gain, osc } = audio;

  // Set frequency (based on x)
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  // Set volume (based on y)
  gain.gain.setValueAtTime(level, ctx.currentTime);
};

const muteOscillator = () => {
  if (!state.audio) return; // Haven't initialised yet

  // Initialise if we haven't already
  const audio = initAudio();
  if (!audio) return;

  const { gain, ctx } = audio;
  
  gain.gain.setValueAtTime(0, ctx.currentTime);
};

const setup = () => {
  const freqAreaEl = /** @type HTMLElement */document.getElementById(`freqArea`);
  if (!freqAreaEl) return;

  freqAreaEl.addEventListener(`pointerup`, muteOscillator);
  freqAreaEl.addEventListener(`pointerleave`, muteOscillator);

  freqAreaEl.addEventListener(`pointermove`, evt => {
    // No button press
    if (!evt.buttons) return;

    // Size of DOM element
    const bounds = freqAreaEl.getBoundingClientRect();

    // Calculate relative x,y
    const x = scaleClamped(evt.offsetX, 0, bounds.width);
    const y = scaleClamped(evt.offsetY, 0, bounds.height);

    // Set to state and use state
    updateState({ x, y });
    useState();
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
 * @returns BasicAudio
 */
function initAudio() {
  const { oscillator } = settings;

  // Already initialised
  if (state.audio) return state.audio;

  const ac = initBasicAudio(oscillator);
  
  // Mute oscillator
  ac.gain.gain.setValueAtTime(0, ac.ctx.currentTime);

  // Start oscillator
  ac.osc.start();

  updateState({
    audio:ac
  });
  return ac;
}

/**
 * Initialise audio with an oscillator source
 * @param {OscillatorOpts} [oscillatorOpts] 
 * @returns {BasicAudio}
 */
function initBasicAudio(oscillatorOpts = {}) {
  
  const ctx = new AudioContext();
  const oscType = oscillatorOpts.type ?? `sawtooth`;
  const oscFreq = oscillatorOpts.frequency ?? 440;

  // Source oscillator
  const source = ctx.createOscillator();
  source.type = oscType;
  source.frequency.setValueAtTime(oscFreq, ctx.currentTime);

  // Create stereo panner
  const pan = ctx.createStereoPanner();

  // Create gain node
  const gain = ctx.createGain();

  // Create filter
  const filter = ctx.createBiquadFilter();

  // Patch in
  // Oscillator -> gain -> panner -> speakers
  source.connect(gain);
  gain.connect(pan);
  pan.connect(filter);
  filter.connect(ctx.destination);

  return {
    pan, gain, filter,
    ctx,
    osc:source
  };
}

/**
 * @typedef OscillatorOpts
 * @property {OscillatorType} [type]
 * @property {number} [frequency]
 */

/**
 * @typedef BasicAudio
 * @property {AudioContext} ctx
 * @property {StereoPannerNode} pan
 * @property {GainNode} gain
 * @property {BiquadFilterNode} filter
 * @property {OscillatorNode} osc
 */