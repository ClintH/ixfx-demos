import { continuously } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';

const settings = Object.freeze({
  // Filter device list...
  device: ``, // Put in the name of your device here, eg `Puck.js a123`
  blinker:continuously(blinkLed, 200),
  blinkLed:`LED1`,
  pwmLed:`LED2`
});

let state = Object.freeze({
  /** @type Espruino.EspruinoBleDevice|undefined */
  puck:undefined,
  /** @type boolean */
  blinkState:false
});

/**
 * Turns an LED (or any digital pin) on or off
 * @param {string} pinName
 * @param {boolean} on 
 * @returns 
 */
const setLed = (pinName, on) => {
  const { puck } = state;
  if (!puck) return;
 
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
const setLedPwm = (pinName, rate) => {
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
  const newState = !blinkState;

  setLed(blinkLed, newState);
  updateState({ blinkState: newState });
}

const setup = () => {
  /**
   * Set connected state
   * @param {boolean} connected 
   */
  const onConnected = (connected) => {
    setCssDisplay(`preamble`,  connected ? `none` : `block`);
    setCssDisplay(`controls`, connected ? `inline-block` : `none`);
  };

  const connect = async () => {
    try {
      // Filter by name, if defined in settings
      const opts = settings.device.length > 0 ? { name: settings.device } : {};

      // Connect to Puck
      const p = await Espruino.puck(opts);
      console.log(`Connected`);
      
      // Listen for events
      p.addEventListener(`change`, evt => {
        console.log(`${evt.priorState} -> ${evt.newState}`);
      });

      onConnected(true);
      updateState({ puck: p });
    } catch (ex) {
      console.error(ex);
      onConnected(false);
    }
  };

  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);

  // Manual checkboxes
  document.getElementById(`manual`)?.addEventListener(`change`, evt => {
    const el = /** @type {HTMLInputElement} */(evt.target);
    if (!el) return;
    const val = el.checked;
    setLed(el.id.toLocaleUpperCase(), val);
  });

  document.getElementById(`btnBlinkStart`)?.addEventListener(`click`, evt => {
    settings.blinker.start();
  });

  document.getElementById(`btnBlinkStop`)?.addEventListener(`click`, evt => {
    settings.blinker.cancel();
  });

  document.getElementById(`rangePwm`)?.addEventListener(`input`, evt => {
    const el = /** @type {HTMLInputElement} */(evt.target);
    if (!el) return;
    
    // HTML element has range of 0..100, need 0..1
    const pwm = parseInt(el.value)/100;
    setLedPwm(settings.pwmLed, pwm);
  });
};
setup();


function setCssDisplay(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = value;
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