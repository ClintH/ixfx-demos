/**
 * Uses a moving average to smooth out audio levels from the microphone.
 * See README.MD
 */
import {movingAverage} from '../../ixfx/temporal.js';
import {AudioAnalysers} from '../../ixfx/io.js';
import {clamp, flip} from '../../ixfx/util.js';

const settings = {
  // Calculate an average over 100 samples
  averager: movingAverage(100),
  // Grab references to HTML elements we'll manipulate
  lblAvgLevelEl: document.getElementById(`lblAvgLevel`),
  lblRawLevelEl: document.getElementById(`lblRawLevel`),
  avgLevelEl: document.getElementById(`avgLevel`),
  rawLevelEl: document.getElementById(`rawLevel`)
}

// Initial state
let state = {
  avgLevel: 0,
  rawLevel: 0
};

/**
 * Convert a number on 0...1 scale to a human-friendly percentage
 * @param {number} v 
 * @returns 
 */
const toPercentage = (v) => {
  return Math.floor(v * 100) + '%';
};

/**
 * Update based on state
 */
const display = () => {
  const {rawLevel, avgLevel} = state;
  const {lblAvgLevelEl, lblRawLevelEl, avgLevelEl, rawLevelEl} = settings;

  // Show numeric values for debugging
  lblAvgLevelEl.innerText = toPercentage(avgLevel);
  lblRawLevelEl.innerText = toPercentage(rawLevel);

  // Make sure value is 0...1, and then invert it
  const rawLevelRel = flip(clamp(rawLevel));
  const avgLevelRel = flip(clamp(avgLevel));

  // Position circles according to relative level
  relativeMove(avgLevelEl, avgLevelRel);
  relativeMove(rawLevelEl, rawLevelRel);
}

/**
 * Positions an element on the y axis according to some relative amount
 * @param {HTMLElement} el 
 * @param {number} relAmount 
 */
const relativeMove = (el, relAmount) => {
  const size = el.getBoundingClientRect();
  const h = window.innerHeight;
  const w = window.innerWidth;

  const x = (w - size.width) / 2;
  const y = (h - size.height * 3) * relAmount;
  el.style.transform = `translate(${x}px, ${y}px)`;
}

/**
 * Called each time we have a new reading
 * @param {number} level 
 */
const onData = (level) => {
  // Add averaged value to state
  state = {
    ...state,
    rawLevel: level,
    // Adding to averager returns current averag
    avgLevel: settings.averager.add(level)
  }
  display();
}

/**
 * Setup sketch
 */
const setup = () => {
  document.getElementById(`btnStart`).addEventListener(`click`, () => {
    // Initialise analyser. 
    // Analyser runs in a loop, calling `onData` very fast. 
    // We use that loop to drive the sketch rather than make another
    AudioAnalysers.peakLevel(onData);

    // Disable button if start is clicked
    document.getElementById(`btnStart`).setAttribute(`disabled`, `true`);
  })
}
setup();