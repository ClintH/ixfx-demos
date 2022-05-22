/**
 * Sends JSON to a microcontroller
 */
import {Serial} from '../../../ixfx/io.js';

const settings = {
  serial: new Serial.Device({name: `Arduino`, debug: true})
}

let state = {
  data: {brightness: 0}
};

const connect = async () => {
  const {serial} = settings;
  try {
    // Listen for events
    serial.addEventListener(`change`, evt => {
      console.log(`${evt.priorState} -> ${evt.newState}`);
      if (evt.newState == `connected`) onConnected(true);
      else onConnected(false);
    });

    // Connect
    await serial.connect();
  } catch (ex) {
    console.error(ex);
  }
}

// Called when port is disconnected/connected
const onConnected = (connected) => {
  document.getElementById(`preamble`).style.display = connected ? `none` : `block`;
  document.getElementById(`connected`).style.display = connected ? `block` : `none`;
}

/**
 * Sends current data to micocontroller
 */
const update = () => {
  const {serial} = settings;
  const {data} = state;
  serial.write(JSON.stringify(data));
}

const setup = () => {
  document.getElementById(`btnConnect`).addEventListener(`click`, connect);
  document.getElementById(`inputLevel`).addEventListener(`input`, evt => {
    const el = evt.target;

    // On scale of 0-100. 
    const value = parseInt(el.value);

    // Convert to 0-1
    state = {
      ...state,
      data: {brightness: value / 100}
    };

    // Trigger update
    update();
  });
}
setup();