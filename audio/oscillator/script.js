import { scaleClamped, scalePercent } from '../../ixfx/numbers.js';

const settings = Object.freeze({
  /** @type OscillatorOpts */
  oscillator: {
    type: `sawtooth`,
    frequency: 440
  },
  freqRange: [120, 1000]
});

let state = Object.freeze({
  /** @type BasicAudio|undefined */
  audio: undefined,
  /** @type number */
  x: 0.5,
  /** @type number */
  y: 0.5
});

const use = () => {
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

function setup() {
  const freqAreaElement = /** @type HTMLElement */document.querySelector(`#freqArea`);
  if (!freqAreaElement) return;

  freqAreaElement.addEventListener(`pointerup`, muteOscillator);
  freqAreaElement.addEventListener(`pointerleave`, muteOscillator);
  freqAreaElement.addEventListener(`pointermove`, event => {
    const pointerEvent = /** @type PointerEvent */(event);
    // No button press
    if (!pointerEvent.buttons) return;

    // Size of DOM element
    const bounds = freqAreaElement.getBoundingClientRect();

    // Calculate relative x,y
    const x = scaleClamped(pointerEvent.offsetX, 0, bounds.width);
    const y = scaleClamped(pointerEvent.offsetY, 0, bounds.height);

    // Set to state and use state
    saveState({ x, y });
    use();
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

  saveState({
    audio: ac
  });
  return ac;
}

/**
 * Initialise audio with an oscillator source
 * @param {OscillatorOpts} [oscillatorOptions] 
 * @returns {BasicAudio}
 */
function initBasicAudio(oscillatorOptions = {}) {

  const context = new AudioContext();
  const oscType = oscillatorOptions.type ?? `sawtooth`;
  const oscFreq = oscillatorOptions.frequency ?? 440;

  // Source oscillator
  const source = context.createOscillator();
  source.type = oscType;
  source.frequency.setValueAtTime(oscFreq, context.currentTime);

  // Create stereo panner
  const pan = context.createStereoPanner();

  // Create gain node
  const gain = context.createGain();

  // Create filter
  const filter = context.createBiquadFilter();

  // Patch in
  // Oscillator -> gain -> panner -> speakers
  source.connect(gain);
  gain.connect(pan);
  pan.connect(filter);
  filter.connect(context.destination);

  return {
    pan, gain, filter,
    ctx: context,
    osc: source
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