import * as Flow from '../../ixfx/flow.js';
import { adsr, defaultAdsrOpts } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  // Set up envelope
  env: adsr({
    ...defaultAdsrOpts(),
    attackDuration: 2000,
    releaseDuration: 5000,
    sustainLevel: 1,
    retrigger: false /* env continues from where it is */
  }),
  run: Flow.continuously(onTick)
});

// Initialise state
let state = {
  scaled: 0, 
  stage: ``, 
  raw: 0,
  triggered: false
};

// Update state - this is called repeatedly via settings.run
function onTick() {
  const { env } = settings;

  // Get state from envelope
  const [ stage, scaled, raw ] = env.compute();
  updateState({
    scaled,
    stage,
    raw
  });

  // Trigger a visual refresh
  useState();

  // Return false if envelope is done. This will stop the run loop
  return (!Number.isNaN(scaled));
}

// Make a human-friendly percentage
const percentage = (v) => Math.floor(v * 100) + `%`;

// Update visuals
const useState = () => {
  // Grab relevant fields from settings & state
  const { scaled, stage, raw, triggered } = state;
  const isComplete = Number.isNaN(scaled); // Are we done?
  const hsl = (v) => `hsl(60, ${v * 100}%, 40%)`; // Produces a hsl(60, sat%, lightness%) string

  // Print values from envelope
  console.log(`scaled: ${scaled.toPrecision(2)}\traw: ${raw.toPrecision(2)}\tstage: ${stage}`);

  // Update left side
  const withoutEl = document.getElementById(`without`);
  if (withoutEl) {
    withoutEl.style.backgroundColor = triggered ? hsl(1) : hsl(0);
    const trigEl = document.getElementById(`trigState`);
    if (trigEl) trigEl.innerText = triggered ?
      `triggered` : ``;
  }

  // Update right side
  const withEl = document.getElementById(`with`);
  if (withEl) {
    withEl.style.backgroundColor = isComplete ? hsl(0) : hsl(scaled);
    const stageEl = document.getElementById(`envStage`);
    if (stageEl) stageEl.innerText = isComplete ? `` :  `${stage} ${percentage(raw)}`;
  }
};

// Called on pointerdown or keydown. Triggers the envelope and
// starts the run loop if it's not running
const trigger = (ev) => {
  const { env, run } = settings;
  ev.preventDefault();

  // Returns if already triggered. 
  // This avoids problem of repeated keydown events while key is held
  if (state.triggered) return;

  env.trigger(true);
  updateState({
    triggered: true // Mark triggered
  });
  run.start();
};

// Called on pointerup or keyup. Releases envelope and 
// makes sure run loop is still running to animate result
const release = (ev) => {
  const { env, run } = settings;
  ev.preventDefault();
  updateState({
    triggered: false // Mark not triggered
  });
  env.release();
  run.start();
};

const setup = () => {
  // Prevent context menu popping up on touch screens when there is a long touch
  document.addEventListener(`contextmenu`, (ev) => ev.preventDefault());

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
function updateState(s) {
  state = {
    ...state,
    ...s
  };
}