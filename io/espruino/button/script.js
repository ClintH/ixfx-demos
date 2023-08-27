
import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';
import {setHtml, setClass, setCssDisplay} from './util.js';

const scripts = Object.freeze({
  // Whenever `BTN` changes, send data
  trigger: `setWatch((evt) => Bluetooth.println(JSON.stringify({state:evt.state,time:evt.time,lastTime:evt.lastTime})), BTN, {edge:"both", debounce:50, repeat:true});NRF.on('disconnect', () => reset());`
});

const settings = Object.freeze({
  script: scripts.trigger,
  // Filter device list
  device: `` // Put in the name of your device here, eg `Puck.js a123`
});

let state = Object.freeze({
  /** @type number */
  time: 0,
  /** @type number */
  lastTime: 0,
  /** @type boolean */
  pressed:false
});

const use = () => {
  const { time, lastTime, pressed } = state;
  const elapsed = time - (lastTime ?? time);
  setHtml(`pressed`, `Pressed (${elapsed} elapsed)`);
  console.log(`time: ${time} last: ${lastTime} pressed: ${pressed} elapsed: ${elapsed}`);
  setClass(`pressed`, pressed, `on`);
};

function setup() {
  const { script } = settings;
  const onConnected = (connected) => {
    setCssDisplay(`preamble`,  connected ? `none` : `block`);
    setCssDisplay(`data`, connected ? `block` : `none`);
  };

  const connect = async () => {
    try {
      // Filter by name, if defined in settings
      const options = settings.device.length > 0 ? { name: settings.device } : {};

      // Connect to Puck
      const p = await Espruino.puck(options);

      console.log(`Connected`);
      const onData = (event) => {
        let data = event.data.trim(); // Remove line breaks etc
        if (data.startsWith(`>`)) data = data.slice(1); // Trim off starting > if it appears
        if (!data.startsWith(`{`)) return;
        if (!data.endsWith(`}`)) return;

        try {
          const d = JSON.parse(data);
          saveState({
            pressed: d.state,
            time: d.time,
            lastTime: d.lastTime
          });
          use();
        } catch (error) {
          console.warn(error);
          console.log(data);
        }
      };
      // Listen for events
      p.addEventListener(`change`, event => {
        console.log(`${event.priorState} -> ${event.newState}`);
      });


      // Send script after a moment
      delay(async () => {
        await p.writeScript(script);
        onConnected(true);
        p.addEventListener(`data`, onData);
      }, 1000);

    } catch (error) {
      console.error(error);
    }
  };

  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
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