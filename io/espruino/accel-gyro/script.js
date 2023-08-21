
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
  script: scripts.poll,
  // Filter device list
  device: `` // Put in the name of your device here, eg `Puck.js a123`
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
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  element.innerHTML = value;
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
      const options = settings.device.length > 0 ? { name: settings.device } : {};

      // Connect to Puck
      const p = await Espruino.puck(options);
      console.log(`Connected`);
      const onData = (event) => {
        // Don't even try to parse if it doesn't
        // look like JSON
        const data = event.data.trim(); // Remove line breaks etc
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
        } catch (error) {
          console.warn(error);
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
      },  1000);

    } catch (error) {
      console.error(error);
    }
  };

  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
};
setup();


const setCssDisplay = (id, value) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (!element) return;
  element.style.display = value;
};

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