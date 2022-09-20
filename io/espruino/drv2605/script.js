import { Espruino } from '../../../ixfx/io.js';

// No settings needed for this sketch
const settings = Object.freeze({
  debug: true
});

// Keep track of Espruino instance
let state = Object.freeze({
  /** @type {Espruino.EspruinoSerialDevice|null} */
  espruino: null
});

/**
 * Triggers a effect, referenced by number of name
 * @param {string|number} triggerWhat 
 * @returns 
 */
const trigger = (triggerWhat) => {
  const { debug } = settings;
  const { espruino } = state;

  if (!triggerWhat) throw new Error(`triggerWhat parameter missing`);
  
  // Check we initialised OK
  if (!espruino) {
    console.warn(`Espruino not connected?`);
    return;
  }

  // Send command to Pico
  espruino.write(`trigger('${triggerWhat}')\n`);
};

/**
 * Received data from Espruino.
 */
const onEspruinoData = (evt) => {
  const { data } = evt;
  if (typeof data === `undefined`) return;
  console.log(data);
};

/**
 * Initiates connection
 */
const connect = async () => {
  try {
    // Connect to via serial
    const p = await Espruino.serial();

    // Listen for events
    p.addEventListener(`change`, onEspruinoStateChange);
    p.addEventListener(`data`, onEspruinoData);

    // If we got this far, assume we're connected
    onEspruinoConnected(true);

    // Keep track of Espruino instance
    updateState({ espruino: p });
  } catch (ex) {
    console.error(ex);
    onEspruinoConnected(false);
  }
};

const setup = () => {
  // Connect when button is clicked
  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);

  // When pointer enters the container #things, trigger an effect
  document.getElementById(`things`)?.addEventListener(`pointerenter`, (evt) => {
    // Get the data-trigger attribute from the HTML element
    // to find out _which_ effect to trigger based
    const triggerWhat = /** @type {HTMLElement} */(evt.target).getAttribute(`data-trigger`);
    if (triggerWhat === null) {
      //console.warn(`data-trigger attribute missing on element`);
    } else {
      trigger(triggerWhat);
    }
  }, { capture: true }
  );

  onEspruinoConnected(false);
};
setup();

/**
 * Espruino has changed state
 * @param {{priorState:string, newState:string}} evt 
 */
function onEspruinoStateChange(evt) {
  console.log(`${evt.priorState} -> ${evt.newState}`);
  onEspruinoConnected(evt.newState === `connected`);
}

/**
 * Hide or show UI depending on connection state
 * @param {boolean} connected True, if connected
 */
function onEspruinoConnected(connected) {
  // When connected, remove 'hidden' from everything with 'when-connected' class
  setClass(!connected, `.when-connected`, `hidden`);

  // When connected, add 'hidden' from everything with 'when-disconnected' class
  setClass(connected, `.when-disconnected`, `hidden`);
}

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
 * Adds/removes `className` on everything that matches `query`,
 * based on `value`.
 * @param {string} query 
 * @param {boolean} value 
 * @param {string} className 
 * @returns 
 */
function setClass(value, query, className) {
  document.querySelectorAll(query).forEach(el => {
    if (value) el.classList.add(className);
    else el.classList.remove(className);
  });
}