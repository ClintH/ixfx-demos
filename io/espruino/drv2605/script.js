import {Espruino} from '../../../ixfx/io.js';

const settings = {
  // Container for things that should respond to pointer move events
  containerEl: document.getElementById(`things`),
}

// Keep track of Espruino instance
let state = {
  espruino: null
};

const setup = () => {
  const {containerEl} = settings;

  // Hide or show UI depending on connection state
  const onConnected = (connected) => {
    document.getElementById(`preamble`).style.display = connected ? `none` : `block`;
    containerEl.style.display = connected ? `flex` : `none`;
  }

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

      state.espruino = p;

    } catch (ex) {
      console.error(ex);
      onConnected(false);
    }
  }

  // Connect when button is clicked
  document.getElementById(`btnConnect`).addEventListener(`click`, connect);

  containerEl.addEventListener(`pointerenter`, (evt) => {
    const {espruino} = state;

    // Check we initialised OK
    if (espruino === null || espruino === undefined) {
      console.warn(`No Espruino instance`);
      return;
    }

    // Get the data-trigger attribute from the HTML element
    const trigger = evt.target.getAttribute(`data-trigger`);
    if (trigger === null) return; // Don't have one

    // Print it out for debug purposes
    console.log(`Trigger: ${trigger}`);

    // Send command to Pico
    espruino.write(`trigger('${trigger}')\n`);
  }, {capture: true});
}
setup();