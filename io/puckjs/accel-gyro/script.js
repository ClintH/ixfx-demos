import {StateMachine} from '../../ixfx/flow.js';

// Source: https://www.espruino.com/Puck.js#accelerometer-gyro
const puckCode = `
Puck.accelOn(); // default is 12.5Hz, with gyro
// or Puck.accelOn(1.6); for 1.6Hz low power, without gyro
Puck.on('accel', function(a) {
  console.log(a);
});
`

// Init settings
const settings = {

}



// Set up
const setup = () => {
  document.getElementById(`btnConnect`).addEventListener(`click`, () => {
    Puck.connect(c => {
      if (!c) {
        console.error(`Could not connect`);
        return;
      }

    });
  });
}
setup();