import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';
import { setCssDisplay, setHtml } from './util.js';

// Two alternative scripts to run on the Puck
const scripts = Object.freeze({
  // 1. Polls data at interval of 1 second
  // 2. Reboots Puck if Bluetooth disconnects, saving battery life.
  poll: `
  setInterval( () => { Bluetooth.println(JSON.stringify(Puck.accel())) }, 1000);
  NRF.on('disconnect',() => reset());
  `,
  // Sends back data as fast as it can
  stream: `
  Puck.accelOn(12.5);
  Puck.on('accel', (a) => { Bluetooth.println(JSON.stringify(a)); });
  NRF.on('disconnect',()=>reset());
  `
});

const settings = Object.freeze({
  // Use the slower polling method (use scripts.stream alternatively)
  script: scripts.poll,
  // Filter device list
  device: `` // Put in the name of your device here, eg `Puck.js a123`
});

/**
 * @typedef {Readonly<{
 *  acc: Vector3d
 *  gyro: Vector3d
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  acc: { x: 0, y: 0, z: 0 },
  gyro: { x: 0, y: 0, z: 0 }
});

function use() {
  const { acc, gyro } = state;
  setHtml(`lblAcc`, `acc:   x: ${acc.x} y: ${acc.y} z: ${acc.z}`);
  setHtml(`lblGyro`, `gyro: x: ${gyro.x} y: ${gyro.y} z: ${gyro.z}`);
};

/**
 * Called when data is received
 * @param {import('../../../ixfx/io.js').IoDataEvent} event 
 * @returns 
 */
function onData(event) {
  // Don't even try to parse if it doesn't
  // look like JSON
  const data = event.data.trim(); // Remove line breaks etc
  if (!data.startsWith(`{`)) return;
  if (!data.endsWith(`}`)) return;

  // So far so good, try to parse as JSON
  try {
    const d = JSON.parse(data);
    console.log(d);
    saveState({
      acc: d.acc,
      gyro: d.gyro
    });
    use();
  } catch (error) {
    console.warn(error);
  }
};

async function connect() {
  const { script } = settings;
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

function setup() {
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
};

setup();


/**
 * Called when connection state changes
 * @param {boolean} connected 
 */
function onConnected(connected) {
  setCssDisplay(`preamble`, connected ? `none` : `block`);
  setCssDisplay(`data`, connected ? `block` : `none`);
};

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

/**
 * @typedef {Readonly<{
 *  x: number
 *  y: number
 *  z: number
 * }>} Vector3d
*/