import * as Dom from '../../ixfx/dom.js';

const settings = Object.freeze({
  updateRateMs: 1000,
  dataDisplay: new Dom.DataDisplay()
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
  saveState({
    random: Math.random()
  });
  use();
};

const use = () => {};

function setup() {
  document.addEventListener(`pointermove`, event => {
    saveState({
      pointer: {
        x: event.x / window.innerWidth,
        y: event.y / window.innerHeight
      }
    });
  });

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
  settings.dataDisplay.update(state);
}
