
const settings = Object.freeze({
  keys: [ `f` ],
  info: innerText(`#info`)
});

/** 
 * The data we will track
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
  const { info } = settings;
  const { keys } = state;

  // Get state of 'f'
  const s = keys.get(`f`);
  if (s === undefined) return;

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
 * Setup and run main loop 
 */
const setup = () => {
  document.addEventListener(`keydown`, event => {
    // Is the key one that we're tracking?
    if (!settings.keys.includes(event.key)) return;
    event.preventDefault();

    let key = getOrCreateKey(event.key);
    
    // State has changed
    if (!key.pressed) key.startPress = performance.now();

    // Update key
    key = {
      ...key,
      pressed: true,
      repeating: event.repeat,
      lastPress: performance.now()
    };

    // Save into state
    state.keys.set(event.key, key);
    useState();
  });

  document.addEventListener(`keyup`, event => {
    // Is the key one that we're tracking?
    if (!settings.keys.includes(event.key)) return;
    event.preventDefault();

    let key = getOrCreateKey(event.key);

    // Update key
    key = {
      ...key,
      pressed: false,
      repeating: false,
      startPress: 0,
      lastRelease: performance.now()
    };

    // Save into state
    state.keys.set(event.key, key);
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