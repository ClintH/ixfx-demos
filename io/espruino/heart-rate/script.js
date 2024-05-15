import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';
import { setHtml, setClass, setCssDisplay } from './util.js';

const scripts = Object.freeze({
  trigger: `
  g.clear();
  g.setFont("6x15");
  g.drawString("Heart rate sender", 10, 10);
  
  Bangle.setHRMPower(true, "test");
  Bangle.on('HRM', function(hrm) {
    // console.log(hrm);
    g.clearRect(10, 20, 300,120);
    g.setFont("6x15:4");
    g.drawString(hrm.bpm + "bpm", 10, 37);
    g.setFont("6x15");
    g.drawString(hrm.confidence +"% confidence", 10, 100);
    Bluetooth.println(JSON.stringify(hrm));
  });
  `
});

const settings = Object.freeze({
  // Code to upload to MCU when this sketch runs in browser
  script: scripts.trigger,
  // Filter device list
  device: `` // Put in the name of your device here, eg `Bangle.js 6601`
});

/**
 * Type definition for State
 * @typedef {Readonly<{
 * time: number
 * bpm: number
 * confidence: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  time: 0,
  bpm: 0,
  confidence: 0
});

function use() {
  const { time, bpm, confidence } = state;
  const elapsed = Date.now() - time;
  setHtml(`bpm`, bpm);
  setHtml(`confidence`, confidence);
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
      bpm: d.bpm ?? 0,
      confidence: d.confidence ?? 0,
      time: Date.now()
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

    // Connect to device
    const p = await Espruino.bangle(options);

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