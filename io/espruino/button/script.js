
import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';

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

const useState = () => {
  const { time, lastTime, pressed } = state;
  const elapsed = time - (lastTime ?? time);
  setHtml(`pressed`, `Pressed (${elapsed} elapsed)`);
  console.log(`time: ${time} last: ${lastTime} pressed: ${pressed} elapsed: ${elapsed}`);
  setClass(`pressed`, pressed, `on`);
};

const setHtml = (id, value) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = value;
};


const setClass = (id, value, className) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (value) el.classList.add(className);
  else el.classList.remove(className);
};

const setup = () => {
  const { script } = settings;
  const onConnected = (connected) => {
    setCssDisplay(`preamble`,  connected ? `none` : `block`);
    setCssDisplay(`data`, connected ? `block` : `none`);
  };

  const connect = async () => {
    try {
      // Filter by name, if defined in settings
      const opts = settings.device.length > 0 ? { name: settings.device } : {};

      // Connect to Puck
      const p = await Espruino.puck(opts);

      console.log(`Connected`);
      const onData = (evt) => {
        let data = evt.data.trim(); // Remove line breaks etc
        if (data.startsWith(`>`)) data = data.substring(1); // Trim off starting > if it appears
        if (!data.startsWith(`{`)) return;
        if (!data.endsWith(`}`)) return;

        try {
          const d = JSON.parse(data);
          updateState({
            pressed: d.state,
            time: d.time,
            lastTime: d.lastTime
          });
          useState();
        } catch (ex) {
          console.warn(ex);
          console.log(data);
        }
      };
      // Listen for events
      p.addEventListener(`change`, evt => {
        console.log(`${evt.priorState} -> ${evt.newState}`);
      });


      // Send script after a moment
      delay(async () => {
        await p.writeScript(script);
        onConnected(true);
        p.addEventListener(`data`, onData);
      }, 1000);

    } catch (ex) {
      console.error(ex);
    }
  };

  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);
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