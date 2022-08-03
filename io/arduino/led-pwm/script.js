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
    serial.addEventListener(`change`, evt => {
      console.log(`${evt.priorState} -> ${evt.newState}`);
      if (evt.newState == `connected`) onConnected(true);
      else onConnected(false);
    });

    // Connect
    await serial.connect();
  } catch (ex) {
    console.error(ex);
  }
};

const setCssDisplay = (id, value) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = value;
};

// Called when port is disconnected/connected
const onConnected = (connected) => {
  setCssDisplay(`preamble`, connected ? `none` : `block`);
  setCssDisplay(`connected`, connected ? `block` : `none`);
};

/**
 * Sends current data to micocontroller
 */
const useState = () => {
  const { serial } = settings;
  const { data } = state;
  serial.write(JSON.stringify(data));
};

const setup = () => {
  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);
  document.getElementById(`inputLevel`)?.addEventListener(`input`, evt => {
    const el = /** @type {HTMLInputElement}*/(evt.target);

    // On scale of 0-100. 
    const value = parseInt(el.value);

    // Convert to 0-1
    updateState({
      data: { brightness: value / 100 }
    });

    // Trigger update
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