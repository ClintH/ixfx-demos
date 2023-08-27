import * as Flow from '../../ixfx/flow.js';
import { adsr, defaultAdsrOpts as defaultAdsrOptions } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  // Set up envelope
  env: adsr({
    ...defaultAdsrOptions(),
    attackDuration: 2000,
    releaseDuration: 5000,
    sustainLevel: 1,
    retrigger: false /* env continues from where it is */
  }),
  run: Flow.continuously(update)
});

// Initialise state
let state = Object.freeze({
  /** @type {number} */
  scaled: 0, 
  /** @type {string} */
  stage: ``, 
  /** @type {number} */
  raw: 0,
  /** @type {boolean} */
  triggered: false
});

// Update state - this is called repeatedly via settings.run
function update() {
  const { env } = settings;

  // Get state from envelope
  const [ stage, scaled, raw ] = env.compute();
  saveState({
    scaled,
    stage,
    raw
  });

  // Trigger a visual refresh
  use();

  // Return false if envelope is done. This will stop the run loop
  return (!Number.isNaN(scaled));
}

// Make a human-friendly percentage
const percentage = (v) => Math.floor(v * 100) + `%`;

// Update visuals
const use = () => {
  // Grab relevant fields from settings & state
  const { scaled, stage, raw, triggered } = state;
  const isComplete = Number.isNaN(scaled); // Are we done?
  const hsl = (v) => `hsl(60, ${v * 100}%, 40%)`; // Produces a hsl(60, sat%, lightness%) string

  // Print values from envelope
  console.log(`scaled: ${scaled.toPrecision(2)}\traw: ${raw.toPrecision(2)}\tstage: ${stage}`);

  // Update left side
  const withoutElement = /** @type HTMLElement */(document.querySelector(`#without`));
  if (withoutElement) {
    withoutElement.style.backgroundColor = triggered ? hsl(1) : hsl(0);
    const trigElement = document.querySelector(`#trigState`);
    if (trigElement) trigElement.textContent = triggered ?
      `triggered` : ``;
  }

  // Update right side
  const withElement = /** @type HTMLElement */(document.querySelector(`#with`));
  if (withElement) {
    withElement.style.backgroundColor = isComplete ? hsl(0) : hsl(scaled);
    const stageElement = document.querySelector(`#envStage`);
    if (stageElement) stageElement.textContent = isComplete ? `` :  `${stage} ${percentage(raw)}`;
  }
};

// Called on pointerdown or keydown. Triggers the envelope and
// starts the run loop if it's not running
const trigger = (event) => {
  const { env, run } = settings;
  event.preventDefault();

  // Returns if already triggered. 
  // This avoids problem of repeated keydown events while key is held
  if (state.triggered) return;

  env.trigger(true);
  saveState({
    triggered: true // Mark triggered
  });
  run.start();
};

// Called on pointerup or keyup. Releases envelope and 
// makes sure run loop is still running to animate result
const release = (event) => {
  const { env, run } = settings;
  event.preventDefault();
  saveState({
    triggered: false // Mark not triggered
  });
  env.release();
  run.start();
};

function setup() {
  // Prevent context menu popping up on touch screens when there is a long touch
  document.addEventListener(`contextmenu`, (event) => event.preventDefault());

  // Trigger envelope
  document.addEventListener(`pointerdown`, trigger);
  document.addEventListener(`keydown`, trigger);

  // Release envelope
  document.addEventListener(`pointerup`, release);
  document.addEventListener(`keyup`, release);
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}