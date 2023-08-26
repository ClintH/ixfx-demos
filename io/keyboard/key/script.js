const settings = Object.freeze({
  // Key(s) we want to monitor
  keys: [ `f` ],
  // Function to update HTML element
  info: innerText(`#info`)
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
const useState = () => {
  const { info } = settings;

  // Get state of 'f'
  const s = keyStates.get(`f`);
  if (s === undefined) return; // don't know anything about this key

  const element = document.querySelector(`#vis`);
  if (!element) return;
  
  if (s.pressed) {
    // Eg: if being held down, for how long
    const holdTime = Math.round(performance.now() - s.startPress);
    info(`Hold time: ${holdTime}`);
  }

  if (s.pressed) {
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
  useState();
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
  useState();
};

/**
 * Listen for key events
 */
function setup() {
  document.addEventListener(`keydown`, onKeyDown);
  document.addEventListener(`keyup`, onKeyUp);
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
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
 * Function to set `textContext` for an element
 * @param {*} query 
 * @returns 
 */
function innerText(query) {
  const element = document.querySelector(query);
  return (txt) => {
    if (element) {
      element.textContent = txt;
    } else {
      console.log(txt);
    }
  };
}

/** 
 * The data we will track
 * @typedef KeyState 
 * @property {boolean} pressed
 * @property {boolean} repeating
 * @property {number} lastPress
 * @property {number} lastRelease
 * @property {number} startPress
*/