import * as Util from './util.js';

const settings = Object.freeze({
  // Key we want to monitor
  key: `f`,
  // Function to update HTML element
  info: Util.textContent(`#info`),
  // How often to update visuals based on state
  updateIntervalMs: 100
});

/**
 * @typedef {{
 * pressed: boolean
*  repeating: boolean
*  lastPress: number
*  lastRelease: number
*  startPress:number
 * }} State
 */

/** @type State */
let state = Object.freeze({
  pressed: false,
  repeating: false,
  lastPress: 0,
  lastRelease: 0,
  startPress: 0
});

/**
 * Where we use the state of the keys
 * @returns 
 */
const use = () => {
  const { info } = settings;
  const { pressed, startPress } = state;

  const element = document.querySelector(`#vis`);
  if (!element) return;
  
  if (pressed) {
    // Eg: if being held down, for how long
    const holdTime = Math.round(performance.now() - startPress);
    info(`Hold time: ${holdTime}`);
  }

  if (pressed) {
    element.classList.add(`pressed`);
  } else {
    element.classList.remove(`pressed`);
  }
};

/**
 * Key is pressed
 * @param {KeyboardEvent} event 
 * @returns 
 */
const onKeyDown = (event) => {
  const { key } = settings;
  let { pressed, startPress } = state;

  console.log(`onKeyDown`);

  // Is it the key we are tracking?
  if (key !== event.key) {
    console.log(`Ignoring keydown for key: ${event.key}`);
    return;
  }

  event.preventDefault();

  // Wasn't pressed before, now it is - keep track of time
  if (!pressed) startPress = performance.now();

  // Update state
  saveState({
    // We're in keydown, so yes pressed
    pressed: true,
    // This will be true if the keydown is a continuation
    // of the key being held
    repeating: event.repeat,
    // Track the time of this event
    lastPress: performance.now(),
    startPress
  });
};

/**
 * Key is released
 * @param {KeyboardEvent} event 
 * @returns 
 */
const onKeyUp = (event) => {
  const { key } = settings;

  // Is it a key we're tracking?
  if (key !== event.key) {
    console.log(`Ignoring keyup for key: ${event.key}`);
    return;
  }
  console.log(`onKeyUp`);
    
  event.preventDefault();

  // Update state
  saveState({
    // Not pressed
    pressed: false,
    // Not repeating
    repeating: false,
    // Return to init
    startPress: 0,
    // Track when it was released
    lastRelease: performance.now()
  });
};

/**
 * Listen for key events
 */
function setup() {
  document.addEventListener(`keydown`, onKeyDown);
  document.addEventListener(`keyup`, onKeyUp);

  setInterval(use, settings.updateIntervalMs);
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
