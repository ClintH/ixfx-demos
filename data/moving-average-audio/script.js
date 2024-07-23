/**
 * Uses a moving average to smooth out audio levels from the microphone.
 * See README.MD
 */
import { movingAverage } from '../../ixfx/numbers.js';
import { AudioAnalysers } from '../../ixfx/io.js';
import { clamp, flip } from '../../ixfx/numbers.js';
import { defaultErrorHandler } from '../../ixfx/dom.js';

const settings = Object.freeze({
  // Calculate an average over 100 samples
  averager: movingAverage(100),
});

// Initial state
let state = Object.freeze({
  /** @type number */
  avgLevel: 0,
  /** @type number */
  rawLevel: 0
});

/**
 * Convert a number on 0...1 scale to a human-friendly percentage
 * @param {number} v 
 * @returns 
 */
const toPercentage = (v) => {
  return Math.floor(v * 100) + `%`;
};

/**
 * Update based on state
 */
const use = () => {
  const { rawLevel, avgLevel } = state;

  // Show numeric values for debugging
  setText(`lblAvgLevel`, toPercentage(avgLevel));
  setText(`lblRawLevel`, toPercentage(rawLevel));

  // Make sure value is 0...1, and then invert it
  const rawRelative = flip(clamp(rawLevel));
  const avgRelative = flip(clamp(avgLevel));

  // Position circles according to relative level
  relativeMove(document.querySelector(`#avgLevel`), avgRelative);
  relativeMove(document.querySelector(`#rawLevel`), rawRelative);
};

/**
 * Positions an element on the y axis according to some relative amount
 * @param {HTMLElement|null} element 
 * @param {number} relativeValue 
 */
const relativeMove = (element, relativeValue) => {
  if (!element) return;
  const size = element.getBoundingClientRect();
  const h = window.innerHeight;
  const w = window.innerWidth;

  const x = (w - size.width) / 2;
  const y = (h - size.height * 3) * relativeValue;
  element.style.transform = `translate(${x}px, ${y}px)`;
};

/**
 * Sets the inner text of element by id
 * @param {string} id 
 * @param {string} txt 
 */
const setText = (id, txt) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element) element.textContent = txt;
};
/**
 * Called each time we have a new reading
 * @param {number} level 
 */
const onData = (level) => {
  // Add averaged value to state
  saveState({
    rawLevel: level,
    // Adding to averager returns current averag
    avgLevel: settings.averager(level)
  });
  use();
};

/**
 * Setup sketch
 */
function setup() {
  // Show unexpected errors on the page to help debugger;
  defaultErrorHandler();
  document.querySelector(`#btnStart`)?.addEventListener(`click`, () => {
    // Initialise analyser. 
    // Analyser runs in a loop, calling `onData` very fast. 
    // We use that loop to drive the sketch rather than make another
    AudioAnalysers.peakLevel(onData);

    // Disable button if start is clicked
    document.querySelector(`#btnStart`)?.setAttribute(`disabled`, `true`);
  });
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}