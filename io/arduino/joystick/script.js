/**
 * Receives JSON from a microcontroller
 */
import { Serial } from '../../../ixfx/io.js';
import { scale } from '../../../ixfx/data.js';

const settings = Object.freeze({
  serial: new Serial.Device({ name: `Arduino`, debug: true, eol: `\n` }),
  rangeMax: { x:1023, y:1023 },
  rangeMin: { x:0, y:0 }
});

// Initial state
let state = Object.freeze({
  /** @type number */
  x: 0,
  /** @type number */
  y: 0,
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
  const { x, y, sw } = state;

  // X,y are relative values
  const pc = (v) => Math.round(v*100) +`%`;
  
  setHtml(`lblX`, pc(x));
  setHtml(`lblY`, pc(y));
  setHtml(`lblSwitch`, sw ? `Pressed` : `Not pressed`);
};

const setup = () => {
  const { serial, rangeMax, rangeMin } = settings;
  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);
  serial.addEventListener(`data`, evt => {
    try {
      const o = JSON.parse(evt.data.trim());

      // Get relative values
      const x = scale(o.x, rangeMin.x, rangeMax.x);
      const y = scale(o.y, rangeMin.y, rangeMax.y);
      const sw = o.sw ?? false;

      updateState({ x, y, sw });
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