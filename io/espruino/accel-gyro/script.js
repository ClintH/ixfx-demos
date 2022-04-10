/**
 * Sends back a stream of acceleration & gyro data
 * 
 * See also:
 * https://www.espruino.com/Puck.js#accelerometer-gyro
 * https://www.espruino.com/Reference#l_Puck_accelOn
 */
import {delay} from '../../../ixfx/flow.js';
import {Espruino} from '../../../ixfx/io.js';

const settings = {
  lblAccEl: document.getElementById(`lblAcc`),
  lblGyroEl: document.getElementById(`lblGyro`),
  script: `setInterval(()=>Bluetooth.println(JSON.stringify(Puck.accel())), 5000);NRF.on('disconnect',()=>reset());`,
  scriptStream: `
  Puck.accelOn(12.5);
  Puck.on('accel', (a) => {
    Bluetooth.println(JSON.stringify(a));
  });
  NRF.on('disconnect',()=>reset());`
}

let state = {
  acc: {x: 0, y: 0, z: 0},
  gyro: {x: 0, y: 0, z: 0}
};

const display = () => {
  const {acc, gyro} = state;
  const {lblAccEl, lblGyroEl} = settings;

  lblAccEl.innerText = `acc:   x: ${acc.x} y: ${acc.y} z: ${acc.z}`;
  lblGyroEl.innerText = `gyro: x: ${gyro.x} y: ${gyro.y} z: ${gyro.z}`;
}

const setup = () => {
  const {script} = settings;
  const onConnected = (connected) => {
    document.getElementById(`preamble`).style.display = connected ? `none` : `block`;
    document.getElementById(`data`).style.display = connected ? `block` : `none`;
  }

  const connect = async () => {
    try {
      // Connect to Puck
      const p = await Espruino.puck();

      const onData = (evt) => {
        // Don't even try to parse if it doesn't
        // look like JSON
        const data = evt.data.trim(); // Remove line breaks etc
        if (!data.startsWith(`{`)) return;
        if (!data.endsWith(`}`)) return;

        try {
          const d = JSON.parse(data);
          state = {
            ...state,
            acc: d.acc,
            gyro: d.gyro
          }
          display();
        } catch (ex) {
          console.warn(ex);
        }
      }
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
  }

  document.getElementById(`btnConnect`).addEventListener(`click`, connect);
}
setup();