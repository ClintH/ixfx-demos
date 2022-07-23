import * as Dom from '../../ixfx/dom.js';

const settings = Object.freeze({
  log: Dom.log(`#log`, {
    capacity: 10,
    timestamp: true
  })
});

// Produce a random thing to log
const randomMsg = () => {
  const { log } = settings;
  const dice = Math.round(Math.random() * 10);
  if (dice === 9) {
    // Log an error
    try {
      throw new Error(`This is an Error`);
    } catch (err) {
      log.error(err);
    }
  } else if (dice === 8) {
    // Manual error message
    log.error(`This is a string error`);
  } else if (dice === 7) {
    // Random object
    log.log({ name: `Betty`, colour: `blue`, count: 10 });
  } else if (dice === 6) {
    // Make a random number or NaN
    let ran = Math.random();
    if (ran > 0.9) ran = NaN;
    log.log(ran);
  } else {
    // Make a random string
    log.log(`The random number of the moment is ${Math.floor(Math.random() * 10)}`);
  }
};

const setup = () => {
  // Call `randomMsg` every 2 seconds
  window.setInterval(randomMsg, 2000);
};
setup();

