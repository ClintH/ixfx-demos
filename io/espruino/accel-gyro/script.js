
import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';

const scripts = Object.freeze({
  // Polls data at interval of 1 second
  poll: `setInterval(()=>Bluetooth.println(JSON.stringify(Puck.accel())), 1000);NRF.on('disconnect',()=>reset());`,
  // Sends back data as fast as it can
  stream: `
  Puck.accelOn(12.5);
  Puck.on('accel', (a) => {
    Bluetooth.println(JSON.stringify(a));
  });
  NRF.on('disconnect',()=>reset());`
});

const settings = Object.freeze({
  script: scripts.stream
});

let state = Object.freeze({
  acc: { x: 0, y: 0, z: 0 },
  gyro: { x: 0, y: 0, z: 0 }
});

const useState = () => {
  const { acc, gyro } = state;
  
  setHtml(`lblAcc`,  `acc:   x: ${acc.x} y: ${acc.y} z: ${acc.z}`);
  setHtml(`lblGyro`, `gyro: x: ${gyro.x} y: ${gyro.y} z: ${gyro.z}`);
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
      console.log(`Connected`);
      const onData = (evt) => {
        // Don't even try to parse if it doesn't
        // look like JSON
        const data = evt.data.trim(); // Remove line breaks etc
        if (!data.startsWith(`{`)) return;
        if (!data.endsWith(`}`)) return;

        try {
          const d = JSON.parse(data);
          console.log(d);
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