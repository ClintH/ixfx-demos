import * as Util from './util.js';

const settings = Object.freeze({
  // Key(s) we want to monitor
  keys: [ `f`,`k`],
  // Function to update DIV
  info: Util.htmlContent(`#info`),
  // How often to update visuals based on state
  updateIntervalMs: 100
});

/** 
 * State of key(s) we are monitoring
 * @type Map<string,KeyState>
 * */
const keyStates = new Map();

/**
 * No other state needed at the moment
 */
let state = Object.freeze({});

/**
 * Where we use the state of the keys
 * @returns 
 */
const use = () => {
  const { info } = settings; 

  // Eg. get state of one key - 'f'
  //  const s = keyStates.get(`f`);
  //  if (s === undefined) return; // don't know anything about this key
  // Use state somehow...
  //  if (s.pressed) { ... }


  // Use state for all the keys
  let statesInfo = ``;
  for (const [key, keyState] of keyStates) {
    statesInfo += `<h2>Key: ${key}</h2>`;
    statesInfo += getTextForKeyState(keyState).join(` <br />`);
    statesInfo += `<hr />`;
  }
  info(statesInfo);
};

/**
   * Generate some text that describes the key state
   * @param {KeyState} state 
   */
const getTextForKeyState = (state) => {
  let text = [
    `Pressed: ${state.pressed}`,
    `Count: ${state.count}`
  ];
  if (state.pressed) {
    text.push(`Hold time: ${Math.round(performance.now() - state.startPress)}`);
  } else {
    text.push(`Last press: ${Math.round(performance.now() - state.lastRelease)}`);
  }
  return text;
};

/**
 * Key is pressed
 * @param {KeyboardEvent} event 
 * @returns 
 */
const onKeyDown = (event) => {
  // Is it a key we're tracking?
  if (!settings.keys.includes(event.key)) return;
  event.preventDefault();

  // Look up state, or initialise state for this key
  let key = getOrCreateKey(event.key);

  // Wasn't pressed before, now it is - keep track of time
  if (!key.pressed) key.startPress = performance.now();

  // Update key
  key = {
    ...key,
    // We're in keydown, so yes pressed
    pressed: true,
    // This will be true if the keydown is a continuation
    // of the key being held
    repeating: event.repeat,
    // Track the time of this event
    lastPress: performance.now()
  };

  // Save into state
  keyStates.set(event.key, key);
};

/**
 * Key is released
 * @param {KeyboardEvent} event 
 * @returns 
 */
const onKeyUp = (event) => {
  // Is it a key we're tracking?
  if (!settings.keys.includes(event.key)) return;
  event.preventDefault();

  // Look up state, or initialise state for this key
  let key = getOrCreateKey(event.key);

  // Update state
  key = {
    ...key,
    // One more press,
    count: key.count + 1,
    // Not pressed
    pressed: false,
    // Not repeating
    repeating: false,
    // Return to init
    startPress: 0,
    // Track when it was released
    lastRelease: performance.now()
  };

  // Save into state
  keyStates.set(event.key, key);
};

/**
 * Listen for key events
 */
function setup() {
  document.addEventListener(`keydown`, onKeyDown);
  document.addEventListener(`keyup`, onKeyUp);

  // Call `use()` in a loop
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

/**
 * Gets the state of a key, or
 * creates it if not found
 * @param {string} keyName 
 * @returns KeyState
 */
function getOrCreateKey(keyName) {
  let key = keyStates.get(keyName);
  if (key === undefined) {
    // Key it not found, so start it from scratch
    key = {
      lastRelease: 0,
      count: 0,
      startPress: 0,
      lastPress: 0,
      pressed: false,
      repeating: false
    };
    // Save it in the map
    keyStates.set(keyName, key);
  }
  return key;
}

/** 
 * The data we will track
 * @typedef {{
 *  pressed: boolean
 *  count: number
 *  repeating: boolean
 *  lastPress: number
 *  lastRelease: number
 *  startPress:number
 * }} KeyState 
*/