/**
 * Tracks the state of keys
 */
const settings = Object.freeze({
  keys: [ `f` ]
});

/** 
 * @typedef KeyState 
 * @property {boolean} pressed
 * @property {boolean} repeating
 * @property {number} lastPress
 * @property {number} lastRelease
 * @property {number} startPress
*/

let state = Object.freeze({
  /** @type Map<string,KeyState> */
  keys: new Map()
});

const useState = () => {
  const { keys } = state;

  // Get state of 'f'
  const s = keys.get(`f`);
  if (s === undefined) return;

  const el = document.getElementById(`vis`);
  if (!el) return;
  
  if (s.pressed) {
    // Eg: if being held down, for how long
    const holdTime = performance.now() - s.startPress;
    console.log(`Hold time: ${holdTime}`);
  }

  if (s.pressed) {
    el.classList.add(`pressed`);
  } else {
    el.classList.remove(`pressed`);
  }
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  document.addEventListener(`keydown`, evt => {
    // Is the key one that we're tracking?
    if (!settings.keys.includes(evt.key)) return;
    evt.preventDefault();

    let key = getOrCreateKey(evt.key);
    
    // State has changed
    if (!key.pressed) key.startPress = performance.now();

    // Update key
    key = {
      ...key,
      pressed: true,
      repeating: evt.repeat,
      lastPress: performance.now()
    };

    // Save into state
    state.keys.set(evt.key, key);
    useState();
  });

  document.addEventListener(`keyup`, evt => {
    // Is the key one that we're tracking?
    if (!settings.keys.includes(evt.key)) return;
    evt.preventDefault();

    let key = getOrCreateKey(evt.key);

    // Update key
    key = {
      ...key,
      pressed: false,
      repeating: false,
      startPress: 0,
      lastRelease: performance.now()
    };

    // Save into state
    state.keys.set(evt.key, key);
    useState();
  });
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

function getOrCreateKey(keyName) {
  let key = state.keys.get(keyName);
  if (key === undefined) {
    // Init
    key = {
      lastRelease: 0,
      pressed: false,
      lastPress: 0,
      repeating: false,
      startPress: 0
    };
    state.keys.set(keyName, key);
  }
  return key;
}
