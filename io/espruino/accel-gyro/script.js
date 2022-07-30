/**
 * Sends back a stream of acceleration & gyro data
 * 
 * See also:
 * https://www.espruino.com/Puck.js#accelerometer-gyro
 * https://www.espruino.com/Reference#l_Puck_accelOn
 */
import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';

const settings = Object.freeze({
  lblAccEl: document.getElementById(`lblAcc`),
  lblGyroEl: document.getElementById(`lblGyro`),
  script: `setInterval(()=>Bluetooth.println(JSON.stringify(Puck.accel())), 5000);NRF.on('disconnect',()=>reset());`,
  scriptStream: `
  Puck.accelOn(12.5);
  Puck.on('accel', (a) => {
    Bluetooth.println(JSON.stringify(a));
  });
  NRF.on('disconnect',()=>reset());`
});

let state = {
  acc: { x: 0, y: 0, z: 0 },
  gyro: { x: 0, y: 0, z: 0 }
};

const useState = () => {
  const { acc, gyro } = state;
  const { lblAccEl, lblGyroEl } = settings;

  setHtml(`lblAccEl`,  `acc:   x: ${acc.x} y: ${acc.y} z: ${acc.z}`);
  setHtml(`lblGyroEl`, `gyro: x: ${gyro.x} y: ${gyro.y} z: ${gyro.z}`);
};

const setHtml = (id, value) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = value;
};


const setup = () => {
  const { script } = settings;
  const onConnected = (connected) => {
    setCssDisplay(`preamble`,  connected ? `none` : `block`);
    setCssDisplay(`data`, connected ? `block` : `none`);
  };

  const connect = async () => {
    try {
      // Connect to Puck
      const p = await Espruino.puck();

      const onData = (evt) => {
        // Don't even try to parse if it doesn't
        // look like JSON
        const data = evt.data.trim(); // Remove line breaks etc
        if (!data.startsWith(`{`)) return;
        if (!data.endsWith(`}`)) return;

        try {
          const d = JSON.parse(data);
          updateState({
            acc: d.acc,
            gyro: d.gyro
          });
          useState();
        } catch (ex) {
          console.warn(ex);
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

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState(s) {
  state = {
    ...state,
    ...s
  };
}

function setCssDisplay(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = value;
}