import * as Dom from '../../ixfx/dom.js';

const settings = Object.freeze({
  log: Dom.log(`#log`, {
    capacity: 10,
    timestamp: true
  })
});

// Produce a random thing to log
const randomMessage = () => {
  const { log } = settings;
  const dice = Math.round(Math.random() * 10);
  switch (dice) {
    case 9: {
      // Log an error
      try {
        throw new Error(`This is an Error`);
      } catch (error) {
        log.error(error);
      }

      break;
    }
    case 8: {
      // Manual error message
      log.error(`This is a string error`);

      break;
    }
    case 7: {
      // Random object
      log.log({ name: `Betty`, colour: `blue`, count: 10 });

      break;
    }
    case 6: {
      // Make a random number or NaN
      let ran = Math.random();
      if (ran > 0.9) ran = Number.NaN;
      log.log(ran);

      break;
    }
    default: {
      // Make a random string
      log.log(`The random number of the moment is ${Math.floor(Math.random() * 10)}`);
    }
  }
};

function setup() {
  // Call `randomMsg` every 2 seconds
  window.setInterval(randomMessage, 2000);
};
setup();

