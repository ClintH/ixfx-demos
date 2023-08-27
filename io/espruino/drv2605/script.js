import { Espruino } from '../../../ixfx/io.js';
import {setClassAll} from './util.js';

// No settings needed for this sketch
const settings = Object.freeze({
  debug: true
});

// Keep track of Espruino instance
let state = Object.freeze({
  /** @type {Espruino.EspruinoSerialDevice|undefined} */
  espruino: undefined
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
const onEspruinoData = (event) => {
  const { data } = event;
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
    saveState({ espruino: p });
  } catch (error) {
    console.error(error);
    onEspruinoConnected(false);
  }
};

function setup() {
  // Connect when button is clicked
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);

  // When pointer enters the container #things, trigger an effect
  document.querySelector(`#things`)?.addEventListener(`pointerenter`, (event) => {
    // Get the data-trigger attribute from the HTML element
    // to find out _which_ effect to trigger based
    const triggerWhat = /** @type {HTMLElement} */(event.target).getAttribute(`data-trigger`);
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
 * @param {{priorState:string, newState:string}} event
 */
function onEspruinoStateChange(event) {
  console.log(`${event.priorState} -> ${event.newState}`);
  onEspruinoConnected(event.newState === `connected`);
}

/**
 * Hide or show UI depending on connection state
 * @param {boolean} connected True, if connected
 */
function onEspruinoConnected(connected) {
  // When connected, remove 'hidden' from everything with 'when-connected' class
  setClassAll(!connected, `.when-connected`, `hidden`);

  // When connected, add 'hidden' from everything with 'when-disconnected' class
  setClassAll(connected, `.when-disconnected`, `hidden`);
}

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

