import {continuously} from '/ixfx/bundle.js';
import {adsr, defaultAdsrOpts} from '/ixfx/modulation.js';

// Set up envelope
let env = adsr({
  ...defaultAdsrOpts(),
  attackDuration: 2000,
  releaseDuration: 5000,
  sustainLevel: 1
});

// Initialise state
let state = {
  amt: 0,
  stage: ``,
  raw: 0
};

// Update state - this is called by runLoop
const updateState = () => {
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
  // Grab relevant fields from state
  const {amt, stage, raw, triggered} = state;
  const isComplete = Number.isNaN(amt); // Are we done?
  const defaultColour = `gray`;
  const hsl = (v) => `hsl(60, ${v * 100}%, 40%)`;

  // Update left side
  const withoutEl = document.getElementById(`without`);
  withoutEl.style.backgroundColor = triggered ? hsl(1) : defaultColour;
  document.getElementById(`trigState`).innerText = triggered ?
    `triggered` : ``;

  // Update right side
  const withEl = document.getElementById(`with`);
  withEl.style.backgroundColor = isComplete ? defaultColour : hsl(amt);
  document.getElementById(`envStage`).innerText = isComplete ?
    `` :
    `${stage} ${percentage(raw)}`;
}

// Run loop. This will call `updateState` until it returns false
const run = continuously(updateState);

// Called on pointerdown or keydown. Triggers the envelope and
// starts the run loop if it's not running
const trigger = () => {
  // Returns if already triggered. This avoids problem of repeated keydown events while key is held
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
const release = () => {
  state = {
    ...state,
    triggered: false // Mark not triggered
  }
  env.release();
  run.start();
}

// Handle events
document.addEventListener(`pointerdown`, trigger);
document.addEventListener(`keydown`, trigger);
document.addEventListener(`pointerup`, release);
document.addEventListener(`keyup`, release);
