import { continuously } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';
import { adsr, defaultAdsrOpts as defaultAdsrOptions } from '../../../ixfx/modulation.js';
import {setCssDisplay} from './util.js';

const settings = Object.freeze({
  // Filter device list...
  device: ``, // Put in the name of your device here, eg `Puck.js a123`
  pwmLed:`LED2`,
  updateRateMs: 30,
  env: adsr(defaultAdsrOptions())
});

let state = Object.freeze({
  /** @type Espruino.EspruinoBleDevice|undefined */
  puck:undefined,
  /** @type number */
  pwm: 0,
  /** @type boolean */
  running: false
});

/**
 * Set LED pulse width modulation
 * See: https://www.espruino.com/PWM
 * and: https://www.espruino.com/Reference#l__global_analogWrite
 * @param {string} pinName Eg 'LED1'
 * @param {number} rate Pwm rate, 0..1
 */
const setLedPwm = (pinName, rate) => {
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

const update = () => {
  const { env, updateRateMs } = settings;
  const v = env.value;

  if (Number.isNaN(v)) {
    // Turn off
    setLedPwm(settings.pwmLed, 0);
    saveState({ running: false });
  } else {
    saveState({ pwm: v, running: true });
    console.log(v);  
    setLedPwm(settings.pwmLed, state.pwm);
  
    // Queue to loop again
    setTimeout(update, updateRateMs);
  }
};

function setup() {
  /**
   * Set connected state
   * @param {boolean} connected 
   */
  const onConnected = (connected) => {
    setCssDisplay(`preamble`,  connected ? `none` : `block`);
  };

  const connect = async () => {
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

  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
  
  document.addEventListener(`keypress`, event => {
    console.log(`Trigger`);
    settings.env.trigger();
    if (!state.running) update();
  });
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}