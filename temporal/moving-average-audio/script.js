/**
 * Uses a moving average to smooth out audio levels from the microphone.
 * 
 * Try adjusting the number of samples on line 12 (default: 100) of the averager
 *  to explore the trade off of responsiveness-smoothness. Note the difference in peaks
 *  between raw and average values
 */
import {movingAverage} from '../../ixfx/temporal.js';
import {Analysers} from '../../ixfx/audio.js';
import {clamp, flip} from '../../ixfx/util.js';

const settings = {
  averager: movingAverage(100),
  lblAvgLevelEl: document.getElementById(`lblAvgLevel`),
  lblRawLevelEl: document.getElementById(`lblRawLevel`),
  avgLevelEl: document.getElementById(`avgLevel`),
  rawLevelEl: document.getElementById(`rawLevel`)
}

let state = {
  avgLevel: 0,
  rawLevel: 0
};

const display = () => {
  const {rawLevel, avgLevel} = state;
  const {lblAvgLevelEl, lblRawLevelEl, avgLevelEl, rawLevelEl} = settings;

  // Show numeric values
  lblAvgLevelEl.innerText = avgLevel.toString();
  lblRawLevelEl.innerText = rawLevel.toString();

  // Make sure value is 0...1, and then invert it
  const rawLevelRel = flip(clamp(rawLevel));
  const avgLevelRel = flip(clamp(avgLevel));

  // Position circles according to relative level
  relativeMove(avgLevelEl, avgLevelRel);
  relativeMove(rawLevelEl, rawLevelRel);
}

/**
 * Positions an element on the y axis according to some relative amount
 * @param {*} el 
 * @param {*} relAmount 
 */
const relativeMove = (el, relAmount) => {
  const size = el.getBoundingClientRect();
  const h = window.innerHeight;
  const w = window.innerWidth;

  const x = (w - size.width) / 2;
  const y = (h - size.height * 3) * relAmount;
  el.style.transform = `translate(${x}px, ${y}px)`;
}

const setup = () => {
  // Called each time we have a new reading
  const onData = (level) => {
    // Add averaged value to state
    state = {
      ...state,
      rawLevel: level,
      avgLevel: settings.averager.add(level)
    }
    display();
  }
  document.getElementById(`btnStart`).addEventListener(`click`, () => {
    // Init analyser. 
    // Analyser runs in a loop, calling `onData` very fast. 
    // So we use that loop to drive the sketch
    Analysers.peakLevel(onData);

    document.getElementById(`btnStart`).setAttribute(`disabled`, `true`);
  })
}
setup();