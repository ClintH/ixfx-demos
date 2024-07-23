/**
 * Receives JSON from a microcontroller
 */
import { Serial } from '../../../ixfx/io.js';
import { scale } from '../../../ixfx/numbers.js';

const settings = Object.freeze({
  serial: new Serial.Device({ name: `Arduino`, debug: true, eol: `\n` }),
  rangeMax: { x: 1023, y: 1023 },
  rangeMin: { x: 0, y: 0 }
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
    serial.addEventListener(`change`, event => {
      if (event.newState === `connected`) onConnected(true);
      else onConnected(false);
    });

    // Connect
    await serial.connect();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Sets style.display for element
 * @param {*} id Id of element
 * @param {*} value Value of style.display to set
 * @returns 
 */
const setCssDisplay = (id, value) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (!element) return;
  element.style.display = value;
};

const setHtml = (id, value) => {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  element.innerHTML = value;
};

// Called when port is disconnected/connected
const onConnected = (connected) => {
  setCssDisplay(`preamble`, connected ? `none` : `block`);
  setCssDisplay(`connected`, connected ? `block` : `none`);
};

/**
 * Updates UI with current values
 */
const use = () => {
  const { x, y, sw } = state;

  // X,y are relative values
  const pc = (v) => Math.round(v * 100) + `%`;

  setHtml(`lblX`, pc(x));
  setHtml(`lblY`, pc(y));
  setHtml(`lblSwitch`, sw ? `Pressed` : `Not pressed`);
};

function setup() {
  const { serial, rangeMax, rangeMin } = settings;
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
  serial.addEventListener(`data`, event => {
    try {
      const o = JSON.parse(event.data.trim());

      // Get relative values
      const x = scale(o.x, rangeMin.x, rangeMax.x);
      const y = scale(o.y, rangeMin.y, rangeMax.y);
      const sw = o.sw ?? false;

      saveState({ x, y, sw });
      use();
    } catch (error) {
      console.log(error);
      console.log(event.data);
    }
  });

};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}