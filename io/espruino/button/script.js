import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';
import { setHtml, setClass, setCssDisplay } from './util.js';

const scripts = Object.freeze({
  // Whenever `BTN` changes, send data
  // Whenever Bluetooth disconnects, reset the MCU so our code doesn't run. Saves battery!
  trigger: `
  setWatch((evt) => {
    const data = { state: evt.state, time: evt.time, lastTime: evt.lastTime };
    Bluetooth.println(JSON.stringify(data));
  }, BTN, { edge:"both", debounce:50, repeat:true } );
  NRF.on('disconnect', () => reset());`
});

const settings = Object.freeze({
  // Code to upload to MCU when this sketch runs in browser
  script: scripts.trigger,
  // Filter device list
  device: `` // Put in the name of your device here, eg `Puck.js a123`
});

/**
 * Type definition for State
 * @typedef {Readonly<{
 * time: number
 * lastTime: number
 * pressed: false
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  time: 0,
  lastTime: 0,
  pressed: false
});

function use() {
  const { time, lastTime, pressed } = state;
  const elapsed = time - (lastTime ?? time);
  setHtml(`pressed`, `Pressed (${elapsed} elapsed)`);
  console.log(`time: ${time} last: ${lastTime} pressed: ${pressed} elapsed: ${elapsed}`);
  setClass(`pressed`, pressed, `on`);
};

/**
 * Called when data is received from Espruino
 * @param {import('../../../ixfx/io.js').IoDataEvent} event 
 * @returns 
 */
function onData(event) {
  // Check that received data is legit
  // before trying to parse it as JSON
  let data = event.data.trim(); // Remove line breaks etc
  if (data.startsWith(`>`)) data = data.slice(1); // Trim off starting > if it appears
  if (!data.startsWith(`{`)) return;
  if (!data.endsWith(`}`)) return;

  // So far so good, try to parse as JSON
  try {
    const d = JSON.parse(data);

    // Update with received data
    // We used '?? <value>' to be a default in case field was not sent
    saveState({
      pressed: d.state ?? false,
      time: d.time ?? 0,
      lastTime: d.lastTime ?? 0
    });
    use();
  } catch (error) {
    console.warn(error);
    console.log(data);
  }
};

function setup() {
  // Listen for a click
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);

  // Trigger connection
  connect();
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

    delay(async () => {
      // Send script after a moment
      await p.writeScript(script);

      // Handle connection
      onConnected(true);

      // Listen for dat
      p.addEventListener(`data`, onData);
    }, 1000);

  } catch (error) {
    console.error(error);
  }
};


/**
 * Called when connection succeds/fails
 * @param {boolean} connected _True_ if connected successfully
 */
function onConnected(connected) {
  setCssDisplay(`preamble`, connected ? `none` : `block`);
  setCssDisplay(`data`, connected ? `block` : `none`);
};
setup();


/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}