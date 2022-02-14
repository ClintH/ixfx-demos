import * as Flow from '../../ixfx/flow.js';
import {adsr, defaultAdsrOpts} from '../../ixfx/modulation.js';

const settings = {
  // Set up envelope
  env: adsr({
    ...defaultAdsrOpts(),
    attackDuration: 2000,
    releaseDuration: 5000,
    sustainLevel: 1,
    retrigger: false /* env continues from where it is */
  }),
  // continuously instance, initialised in setup()
  run: null
}

// Initialise state
let state = {amt: 0, stage: ``, raw: 0};

// Update state - this is called by runLoop
const updateState = () => {
  const {env} = settings;

  // Get state from envelope
  const [stage, scaled, raw] = env.compute();
  state = {
    ...state,
    amt: scaled,
    stage,
    raw
  }

  // Trigger a visual refresh
  updateVisual();

  // Return false if envelope is done. This will stop the run loop
  return (!Number.isNaN(scaled));
}

// Make a human-friendly percentage
const percentage = (v) => Math.floor(v * 100) + '%';

// Update visuals
const updateVisual = () => {
  // Grab relevant fields from settings & state
  const {amt, stage, raw, triggered} = state;
  const isComplete = Number.isNaN(amt); // Are we done?
  const hsl = (v) => `hsl(60, ${v * 100}%, 40%)`; // Produces a hsl(60, sat%, lightness%) string

  console.log(amt);
  // Update left side
  const withoutEl = document.getElementById(`without`);
  withoutEl.style.backgroundColor = triggered ? hsl(1) : hsl(0);
  document.getElementById(`trigState`).innerText = triggered ?
    `triggered` : ``;

  // Update right side
  const withEl = document.getElementById(`with`);
  withEl.style.backgroundColor = isComplete ? hsl(0) : hsl(amt);
  document.getElementById(`envStage`).innerText = isComplete ?
    `` :
    `${stage} ${percentage(raw)}`;
}

// Called on pointerdown or keydown. Triggers the envelope and
// starts the run loop if it's not running
const trigger = (ev) => {
  const {env, run} = settings;
  ev.preventDefault();

  // Returns if already triggered. 
  // This avoids problem of repeated keydown events while key is held
  if (state.triggered) return;

  env.trigger(true);
  state = {
    ...state,
    triggered: true // Mark triggered
  }
  run.start();
};

// Called on pointerup or keyup. Releases envelope and 
// makes sure run loop is still running to animate result
const release = (ev) => {
  const {env, run} = settings;
  ev.preventDefault();
  state = {
    ...state,
    triggered: false // Mark not triggered
  }
  env.release();
  run.start();
}

const setup = () => {
  // Run loop. This will call `updateState` until it returns false
  settings.run = Flow.continuously(updateState)

  // Prevent context menu popping up on touch screens when there is a long touch
  document.addEventListener(`contextmenu`, (ev) => ev.preventDefault());

  // Trigger envelope
  document.addEventListener(`pointerdown`, trigger);
  document.addEventListener(`keydown`, trigger);

  // Release envelope
  document.addEventListener(`pointerup`, release);
  document.addEventListener(`keyup`, release);
}
setup();


