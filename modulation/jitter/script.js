import * as Flow from '../../ixfx/flow.js';
import * as Mod from '../../ixfx/modulation.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Define our jitterer
  jitter: Mod.jitter({ absolute: 0.1 })
});
/**
 * @typedef {Readonly<{
 * pointer: { x:number, y:number }
 * elem: { x:number, y:number }
 * }>} State
 */

/** @type State */
let state = {
  pointer: { x: 0, y: 0 },
  elem: { x: 0, y: 0 }
};

// Calculate new state
const update = () => {
  const { jitter } = settings;
  let { pointer } = state;

  // Compute new position for element
  let elem = {
    x: jitter(pointer.x),
    y: jitter(pointer.y)
  };
  saveState({ elem });
};

// Update visuals
const use = () => {
  const { elem } = state;

  const thingElement = document.querySelector(`#thing`);
  if (!thingElement) return;

  Util.moveElement(thingElement, elem);
};

function setup() {
  document.addEventListener(`pointermove`, event => {
    saveState({
      pointer: {
        x: event.x / window.innerWidth,
        y: event.y / window.innerHeight
      }
    });
  });
  document.addEventListener(`pointerleave`, () => {
    saveState({ pointer: { x: 0.5, y: 0.5 } });
  });

  Flow.continuously(() => {
    update();
    use();
  }, 100).start();
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
