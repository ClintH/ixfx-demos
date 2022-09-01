import { continuously } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';
import { adsr, defaultAdsrOpts } from '../../../ixfx/modulation.js';

const settings = Object.freeze({
  // Filter device list...
  device: ``, // Put in the name of your device here, eg `Puck.js a123`
  pwmLed:`LED2`,
  updateRateMs: 30,
  env: adsr(defaultAdsrOpts())
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

const loop = () => {
  const { env, updateRateMs } = settings;
  const v = env.value;

  if (!Number.isNaN(v)) {
    updateState({ pwm: v, running: true });
    console.log(v);  
    setLedPwm(settings.pwmLed, state.pwm);
  
    // Queue to loop again
    setTimeout(loop, updateRateMs);
  } else {
    // Turn off
    setLedPwm(settings.pwmLed, 0);
    updateState({ running: false });
  }
};

const setup = () => {
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
  
  document.addEventListener(`keypress`, evt => {
    console.log(`Trigger`);
    settings.env.trigger();
    if (!state.running) loop();
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