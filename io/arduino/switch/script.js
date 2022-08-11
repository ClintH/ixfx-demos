import { Serial } from '../../../ixfx/io.js';

const settings = Object.freeze({
  serial: new Serial.Device({ name: `Arduino`, debug: true, eol: `\n` }),
});

let state = Object.freeze({
  /** @type boolean */
  sw: false
});

const connect = async () => {
  const { serial } = settings;
  try {
    // Listen for events
    serial.addEventListener(`change`, evt => {
      if (evt.newState === `connected`) onConnected(true);
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

const setHtml = (id, value) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = value;
};

// Called when port is disconnected/connected
const onConnected = (connected) => {
  setCssDisplay(`preamble`, connected ? `none` : `block`);
  setCssDisplay(`connected`, connected ? `block` : `none`);
};

/**
 * Updates UI with current values
 */
const useState = () => {
  const { sw } = state;

  setHtml(`lblSwitch`, sw ? `Pressed` : `Not pressed`);
};

const setup = () => {
  const { serial } = settings;
  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);
  serial.addEventListener(`data`, evt => {
    try {
      const o = JSON.parse(evt.data.trim());
      const sw = o.sw ?? false;

      updateState({ sw });
      useState();
    } catch (ex) {
      console.log(ex);
      console.log(evt.data);
    }
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