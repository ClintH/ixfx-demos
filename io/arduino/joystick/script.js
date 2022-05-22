/**
 * Receives JSON from a microcontroller
 */
import {Serial} from '../../../ixfx/io.js';

const settings = {
  serial: new Serial.Device({name: `Arduino`, debug: true}),
  lblX: document.getElementById(`lblX`),
  lblY: document.getElementById(`lblY`),
  lblSwitch: document.getElementById(`lblSwitch`)
}

// Initial state
let state = {
  x: 0,
  y: 0,
  sw: false
};

const connect = async () => {
  const {serial} = settings;
  try {
    // Listen for events
    serial.addEventListener(`change`, evt => {
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
 * Updates UI with current values
 */
const update = () => {
  const {lblX, lblY, lblSwitch} = settings;
  const {x, y, sw} = state;
  lblX.innerText = x.toString();
  lblY.innerHTML = y.toString();
  lblSwitch.innerHTML = sw ? `Pressed` : `Not pressed`;
}

const setup = () => {
  const {serial} = settings;
  document.getElementById(`btnConnect`).addEventListener(`click`, connect);
  serial.addEventListener(`data`, evt => {
    try {
      const o = JSON.parse(evt.data);

      state = {
        ...state,
        ...o
      };
      update();
    } catch (ex) {

    }
  })

}
setup();