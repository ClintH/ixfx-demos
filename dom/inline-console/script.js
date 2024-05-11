import * as Dom from '../../ixfx/dom.js';

const settings = Object.freeze({
  updateRateMs: 1000
});


/**
 * @typedef {{
 * random: number
 * pointer: {x:number, y:number}
 * }} State
 */

/** @type State */
let state = Object.freeze({
  random: 0,
  pointer: { x: 0, y: 0 }
});

const update = () => {
  const r = Math.random();
  if (r > 0.9) {
    throw new Error(`This is an error`);
  } else if (r > 0.7) {
    console.warn(`This is a message via console.warn`);
  } else {
    console.log(`This is a message via console.log.`);
  }
};

function setup() {
  // Initialise inline console
  Dom.inlineConsole();
  setInterval(update, settings.updateRateMs);
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
