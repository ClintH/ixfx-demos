import { continuously } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';
import { setCssDisplay } from './util.js';

const settings = Object.freeze({
  // Filter device list...
  device: ``, // Put in the name of your device here, eg `Puck.js a123`
  blinker: continuously(blinkLed, 200),
  blinkLed: `LED1`,
  pwmLed: `LED2`
});

/**
 * Type for state
 * @typedef {Readonly<{
 * puck: Espruino.EspruinoBleDevice|undefined
 * blinkState: boolean
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  puck: undefined,
  blinkState: false
});

/**
 * Turns an LED (or any digital pin) on or off
 * @param {string} pinName Eg. 'LED1'
 * @param {boolean} on true/false
 * @returns 
 */
function setLed(pinName, on) {
  const { puck } = state;
  if (!puck) return; // No connected Puck

  const js = `digitalWrite(${pinName}, ${on ? `1` : `0`})\n`;
  console.log(js);
  puck.write(js);
};

/**
 * Set LED pulse width modulation
 * See: https://www.espruino.com/PWM
 * and: https://www.espruino.com/Reference#l__global_analogWrite
 * @param {string} pinName Eg 'LED1'
 * @param {number} rate Pwm rate, 0..1
 */
function setLedPwm(pinName, rate) {
  const { puck } = state;
  if (!puck) return;

  // Sanity check
  if (rate < 0) throw new Error(`Rate must be at least 0 (${rate})`);
  if (rate > 1) throw new Error(`Rate must no greater than 1 (${rate})`);

  let js = ``;

  if (rate === 0) {
    // Turn off
    js = `digitalWrite(${pinName}, 0)\n`;
  } else if (rate === 1) {
    // Turn to full, skip PWM
    js = `digitalWrite(${pinName}, 1)\n`;
  } else {
    // Pwm!
    js = `analogWrite(${pinName}, ${rate})\n`;
  }
  console.log(js);
  puck.write(js);
};

/**
 * Demonstrates toggling an LED remotely.
 * You'd probably rather do this in code on the Espruino
 * itself.
 * 
 * Called via settings.blinker
 */
function blinkLed() {
  const { blinkLed } = settings;
  const { blinkState } = state;
  const s = !blinkState;

  setLed(blinkLed, s);
  saveState({ blinkState: s });
}

function setup() {
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);

  // Manual checkboxes
  document.querySelector(`#manual`)?.addEventListener(`change`, event => {
    const element = /** @type {HTMLInputElement} */(event.target);
    if (!element) return;
    const value = element.checked;
    setLed(element.id.toLocaleUpperCase(), value);
  });

  document.querySelector(`#btnBlinkStart`)?.addEventListener(`click`, event => {
    settings.blinker.start();
  });

  document.querySelector(`#btnBlinkStop`)?.addEventListener(`click`, event => {
    settings.blinker.cancel();
  });

  document.querySelector(`#rangePwm`)?.addEventListener(`input`, event => {
    const element = /** @type {HTMLInputElement} */(event.target);
    if (!element) return;

    // HTML element has range of 0..100, need 0..1
    const pwm = Number.parseInt(element.value) / 100;
    setLedPwm(settings.pwmLed, pwm);
  });
};

async function connect() {
  try {
    // Filter by name, if defined in settings
    const options = settings.device.length > 0 ? { name: settings.device } : {};

    // Connect to Puck
    const p = await Espruino.puck(options);
    console.log(`Connected`);

    // Listen for events
    p.addEventListener(`change`, event => {
      console.log(`${event.priorState} -> ${event.newState}`);
    });

    onConnected(true);
    saveState({ puck: p });
  } catch (error) {
    console.error(error);
    onConnected(false);
  }
};

/**
 * Set connected state
 * @param {boolean} connected 
 */
function onConnected(connected) {
  setCssDisplay(`preamble`, connected ? `none` : `block`);
  setCssDisplay(`controls`, connected ? `inline-block` : `none`);
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}