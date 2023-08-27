/**
 * Sends JSON to a microcontroller
 */
import { Serial } from '../../../ixfx/io.js';

const settings = Object.freeze({
  serial: new Serial.Device({ name: `Arduino`, debug: true })
});

let state = Object.freeze({
  data: { brightness: 0 }
});

const connect = async () => {
  const { serial } = settings;
  try {
    // Listen for events
    serial.addEventListener(`change`, event => {
      console.log(`${event.priorState} -> ${event.newState}`);
      if (event.newState === `connected`) onConnected(true);
      else onConnected(false);
    });

    // Connect
    await serial.connect();
  } catch (error) {
    console.error(error);
  }
};

const setCssDisplay = (id, value) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (!element) return;
  element.style.display = value;
};

// Called when port is disconnected/connected
const onConnected = (connected) => {
  setCssDisplay(`preamble`, connected ? `none` : `block`);
  setCssDisplay(`connected`, connected ? `block` : `none`);
};

/**
 * Sends current data to micocontroller
 */
const use = () => {
  const { serial } = settings;
  const { data } = state;
  serial.write(JSON.stringify(data));
};

function setup() {
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
  document.querySelector(`#inputLevel`)?.addEventListener(`input`, event => {
    const element = /** @type {HTMLInputElement}*/(event.target);

    // On scale of 0-100. 
    const value = Number.parseInt(element.value);

    // Convert to 0-1
    saveState({
      data: { brightness: value / 100 }
    });

    // Trigger update
    use();
  });
};
setup();

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