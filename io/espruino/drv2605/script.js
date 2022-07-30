import { Espruino } from '../../../ixfx/io.js';

// Keep track of Espruino instance
let state = {
  /** @type {Espruino.EspruinoSerialDevice|null} */
  espruino: null
};

const setup = () => {
  // Hide or show UI depending on connection state
  const onConnected = (connected) => {
    setCssDisplay(`preamble`, connected ? `none` : `block`);
    setCssDisplay(`things`, connected ? `flex` : `none`);
  };

  const connect = async () => {
    try {
      // Connect to Pico
      const p = await Espruino.serial();

      // Listen for events
      p.addEventListener(`change`, evt => {
        console.log(`${evt.priorState} -> ${evt.newState}`);
        onConnected(evt.newState === `connected`);
      });

      p.addEventListener(`data`, (evt) => {
        if (evt.data === `=undefined`) return; // boring
        console.log(evt.data);
      });

      onConnected(true);

      updateState({ espruino: p });

    } catch (ex) {
      console.error(ex);
      onConnected(false);
    }
  };

  // Connect when button is clicked
  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);

  document.getElementById(`things`)?.addEventListener(`pointerenter`, (evt) => {
    const { espruino } = state;

    // Check we initialised OK
    if (espruino === null || espruino === undefined) {
      console.warn(`No Espruino instance`);
      return;
    }

    // Get the data-trigger attribute from the HTML element
    const trigger = /** @type {HTMLElement} */(evt.target).getAttribute(`data-trigger`);
    if (trigger === null) return; // Don't have one

    // Print it out for debug purposes
    console.log(`Trigger: ${trigger}`);

    // Send command to Pico
    espruino.write(`trigger('${trigger}')\n`);
  }, { capture: true });
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