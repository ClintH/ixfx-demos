import { clamp } from '../../ixfx/numbers.js';
import * as Things from './thing.js';
import * as Util from './util.js';

// Settings for sketch
const settings = Object.freeze({
  // What constitutes maximum movement
  movementMax: 0.3,
  thingUpdateSpeedMs: 10,
  movementDecay: 0.8,
  elapsedMax: 5000
});

/** 
 * @typedef {{
 * movement: number
 * pressElapsed: number
 * lastPress: number
 * thing: Things.Thing
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  movement: 0,
  lastPress: 0,
  pressElapsed: 0,
  thing: Things.create(`#thing`)
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {};

const update = () => {
  const { movementDecay, elapsedMax } = settings;
  let { movement, pressElapsed, lastPress } = state;

  // Decay movement
  movement *= movementDecay;

  // Calculate relative time since last press
  pressElapsed = (performance.now() - lastPress) / elapsedMax;

  saveState({
    movement: clamp(movement),
    pressElapsed: clamp(pressElapsed)
  });

  use();
  setTimeout(update);
};

const onPointerMove = (event) => {
  const { movementMax } = settings;

  // Calculate movement based on pointer event
  const movement = Util.addUpMovement(event);
  const scaledMovement = movement / movementMax;

  // Add to state
  saveState({
    movement: clamp(state.movement + scaledMovement)
  });
};

const onPointerDown = (event) => {
  // Keep track of when pointer is pressed
  saveState({
    lastPress: performance.now()
  });
};

function setup() {
  const buttonStart = document.querySelector(`#btnStart`);
  const buttonStop = document.querySelector(`#btnStop`);

  buttonStart?.addEventListener(`click`, () => {
    document.body.requestPointerLock();
  });

  buttonStop?.addEventListener(`click`, () => {
    document.exitPointerLock();
  });

  // Handle when pointer lock is turned on/off
  document.addEventListener(`pointerlockchange`, event => {
    if (document.pointerLockElement === document.body) {
      // Pointer lock on
      buttonStart?.classList.add(`hidden`);
      buttonStop?.classList.remove(`hidden`);
    } else {
      // Pointer lock off
      buttonStart?.classList.remove(`hidden`);
      buttonStop?.classList.add(`hidden`);
    }
  });

  document.addEventListener(`pointermove`, onPointerMove);
  document.addEventListener(`pointerdown`, onPointerDown);

  // Update thing at a fixed rate
  setInterval(() => {
    // Calculate new thing and save it into state
    saveState({
      thing: Things.update(state.thing, state)
    });

    // Visually update thing based on its state
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

