
import { delay } from '../../../ixfx/flow.js';
import { Espruino } from '../../../ixfx/io.js';

const scripts = Object.freeze({
  // Define a function that sends back data
  poll: `
  function sampleData() {
    const data = [analogRead(A0), analogRead(A3), analogRead(A5)];
    USB.println(JSON.stringify(data));
  }`,
  // Defines a function that sends back data,
  // and automatically call it at a fixed interval
  stream: `
  function sampleData() {
    const data = [analogRead(A0), analogRead(A3), analogRead(A5)];
    USB.println(JSON.stringify(data));
  }
  setInterval(sampleData, 2000);`
});

const settings = Object.freeze({
  script: scripts.stream
});

let state = Object.freeze({
  /** @type number[] */
  data: [],
  /** @type {Espruino.EspruinoSerialDevice|null} */
  espruino: null
});

const useState = () => {
  const { data } = state;
  
  const dataEl = /** @type HTMLElement */(document.getElementById(`data`));
  if (!dataEl) return;

  const dataStr = data.map((v,i) => `<div>${i}. ${v}</div>`);
  dataEl.innerHTML = dataStr.join(`\n`);
};

/**
 * Called when string data is received from Pico
 * @param {*} evt 
 * @returns 
 */
const onData = (evt) => {
  // Remove line breaks etc
  const data = evt.data.trim(); 

  // Don't even try to parse if it doesn't
  // look like JSON
  if (!data.startsWith(`{`) && !data.startsWith(`[`)) return;
  if (!data.endsWith(`}`) && !data.endsWith(`]`)) return;

  try {
    const d = JSON.parse(data);
   
    // Assuming its an array of numbers
    updateState({ data: d });
    useState();
  } catch (ex) {
    console.warn(ex);
  }
};

/**
 * Toggle CSS based on connection status
 * @param {*} connected 
 */
const onConnected = (connected) => {
  setCssDisplay(`preamble`,  connected ? `none` : `block`);
  setCssDisplay(`data`, connected ? `block` : `none`);
  setCssDisplay(`controls`, connected ? `block` : `none`);
};

/**
 * Connect to Pico
 */
const connect = async () => {
  const { script } = settings;

  try {
    // Connect to Pico
    const p = await Espruino.serial();
    console.log(`Connected`);

    // Listen for events
    p.addEventListener(`change`, evt => {
      console.log(`${evt.priorState} -> ${evt.newState}`);
    });

    // Send init script after a moment
    delay(async () => {
      await p.writeScript(script);

      // If we got this far, consider ourselves connected
      onConnected(true);

      updateState({ espruino: p });

      // Listen for data from the Pico
      p.addEventListener(`data`, onData);
    }, 1000);
  } catch (ex) {
    console.error(ex);
  }
};

const setup = () => {
  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);

  document.getElementById(`btnRequest`)?.addEventListener(`click`, () => {
    const { espruino } = state;
    espruino?.write(`sampleData()\n`);
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