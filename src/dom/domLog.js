import {Dom} from '/ixfx/ixfx.js';

const logger = Dom.domLog(`#log`, {
  capacity: 10,
  timestamp: true
});

// Produce a random thing to log
const randomMsg = () => {
  const dice = Math.round(Math.random() * 10);
  if (dice === 9) {
    try {
      throw new Error(`This is an Error`);
    } catch (err) {
      logger.error(err);
    }
  } else if (dice === 8) {
    logger.error(`This is a string error`);
  } else if (dice === 7) {
    logger.log({name: `Betty`, colour: `blue`, count: 10});
  } else if (dice === 6) {
    let ran = Math.random();
    if (ran > 0.9) ran = NaN;
    logger.log(ran);
  } else {
    logger.log(`The random number of the moment is ${Math.floor(Math.random() * 10)}`);
  }
}

// Call `randomMsg` every 2 seconds
window.setInterval(randomMsg, 2000);
