import { clamp } from '../../ixfx/numbers.js';
import * as Things from './thing.js';
import * as Util from './util.js';


// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  thingId: `thing`,
  hueChange: 0.05,
  movementDecay: 0.1
});

/** 
 * @typedef {Readonly<{
 * hue: number
 * movement: number
 * thing: Things.Thing
 * }>} State
 */

/** @type {State} */
let state = Object.freeze({
  thing: Things.create(settings.thingId),
  hue: 0,
  movement: 0
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { hue } = state;

  // 1. Eg. use the ambient state
  document.body.style.backgroundColor = `hsl(${hue}, 100%, 90%)`;
};

const update = () => {
  const { hueChange, movementDecay } = settings;
  let { hue, movement } = state;
  // 1. Any other state updates?
  // eg: cycle hue
  hue += hueChange;

  // eg. decay movement
  movement -= movementDecay;

  // 2. Sanity check
  hue = hue % 360; // 0..360 scale
  movement = clamp(movement); // 0..1 scale

  // 3. Save state
  saveState({ hue, movement });

  // 4. Use state
  use();

  // 5. Call itself
  window.requestAnimationFrame(update);
};

function setup() {
  const element = /** @type HTMLElement */(document.querySelector(`#${settings.thingId}`));
  if (!element) throw new Error(`Element with id ${settings.thingId} not found`);
  element.addEventListener(`pointermove`, (event) => {

    // Add up all the movement
    let movement = Util.addUpMovement(event);

    // Make sure total is within 0..1 range
    movement = clamp(state.movement + movement);

    // Save it
    saveState({ movement: 0.2 });
  });

  // Update thing at a fixed rate
  setInterval(() => {
    // Save new thing into state
    saveState({
      thing: Things.update(state.thing, state)
    });
    // Visually update based on new state
    Things.use(state.thing);
  }, settings.thingUpdateSpeedMs);

  // Update state of sketch and use state
  // at full speed
  update();
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

