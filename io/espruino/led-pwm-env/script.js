import { continuously } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';
import { adsr, defaultAdsrOpts as defaultAdsrOptions } from '../../../ixfx/modulation.js';
import { setCssDisplay } from './util.js';

const settings = Object.freeze({
  // Filter device list...
  device: ``, // Put in the name of your device here, eg `Puck.js a123`
  pwmLed: `LED2`,
  updateRateMs: 30,
  // Use a simple ADSR envelope
  env: adsr(defaultAdsrOptions())
});

/**
 * Type definition for state
 * @typedef {Readonly<{
 * puck: Espruino.EspruinoBleDevice|undefined
 * pwm: number
 * running: boolean
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  puck: undefined,
  pwm: 0,
  running: false
});

/**
 * Set LED pulse width modulation
 * See: https://www.espruino.com/PWM
 * and: https://www.espruino.com/Reference#l__global_analogWrite
 * @param {string} pinName Eg 'LED1'
 * @param {number} rate Pwm rate, 0..1
 */
function setLedPwm(pinName, rate) {
  const { puck } = state;
  if (!puck) throw new Error(`Puck not yet connected`);

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
 * Use value from state
 */
function use() {
  const { pwmLed } = settings;
  const { pwm, running } = state;

  if (running) {
    // Running, set brightness
    console.log(pwm);
    setLedPwm(pwmLed, pwm);
  } else {
    // Not running, turn LED off
    setLedPwm(pwmLed, 0);
  }
}

/**
 * Read value from envelope and save to state
 */
function update() {
  const { env, updateRateMs, pwmLed } = settings;
  let { running } = state;

  // Get latest value from the envelope
  const v = env.value;

  if (Number.isNaN(v)) {
    // Envelope has completed
    running = false;
  } else {
    // Envelope is running, save value into state
    running = true;
  }
  saveState({ pwm: v, running });

  // Use current state
  use();

  // If the envelope has time remaining, queue 'update' to run again
  if (running) {
    setTimeout(update, updateRateMs);
  }
};

/**
 * On keypress event
 * @param {KeyboardEvent} event 
 */
function onKeyPress(event) {
  console.log(`Trigger`);
  settings.env.trigger();
  if (!state.running) update();
}

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
 * When connection state has changed
 * @param {boolean} connected 
 */
function onConnected(connected) {
  setCssDisplay(`preamble`, connected ? `none` : `block`);
};

function setup() {
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
  document.addEventListener(`keypress`, onKeyPress);
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