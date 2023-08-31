import * as Thing from './thing.js';

// Settings for sketch
const settings = Object.freeze({
  // How quickly to update the state of the thing
  thingUpdateSpeedMs: 10,
  // Id of the HTML element
  thingId: `thing`
});

/** 
 * @typedef {{
 *  thing: Thing.Thing
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  thing: Thing.create(settings.thingId),
});

/**
 * Use data in `state`
 */
const use = () => {};

/**
 * Update `state`
 */
const update = () => {
  use();
  window.requestAnimationFrame(update);
};

const setup = () => {
  const element = /** @type HTMLElement */(document.querySelector(`#${settings.thingId}`));
  if (!element) throw new Error(`Element with id ${settings.thingId} not found`);

  // Listen for pointerdown event on the 'thing' element
  element.addEventListener(`pointerdown`, (event) => {
    const thing = Thing.onPointerEvent(state.thing, event);
    saveState({ thing });
  });

  // Listen for 'pointerup' event that happens on the thing
  element.addEventListener(`pointerup`, (event) => {
    const thing = Thing.onPointerEvent(state.thing, event);
    saveState({ thing });
  });

  // Update thing at a fixed rate
  setInterval(() => {
    saveState({ 
      thing: Thing.update(state.thing, state)
    });

    // Visually update based on new state
    Thing.use(state.thing);
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
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

