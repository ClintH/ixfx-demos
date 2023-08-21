import * as Flow from '../../ixfx/flow.js';
import { Easings } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  // thing to move
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`)),
  // setup easing
  easing: Easings.time(`sineIn`, 1000)
});

let state = Object.freeze({
  /** @type {number} */
  amt: 0,
  /** @type {boolean} */
  isDone: false,
});

// Update state with value from easing
const onTick = () => {
  const { easing } = settings;
  updateState({
    amt: easing.compute(),
    isDone: easing.isDone
  });

  // Trigger a visual refresh
  useState();

  // Return false if envelope is done, stopping animation
  return !easing.isDone;
};

// Make a human-friendly percentage
const percentage = (v) => Math.floor(v * 100) + `%`;

// Update visuals
const useState = () => {
  // Grab relevant field from settings & state
  const { thingEl } = settings;
  const { amt, isDone } = state;

  if (!thingEl) return;

  if (isDone) {
    thingEl.classList.add(`isDone`);
  }

  // Available width is width of viewport minus size of circle
  const thingElementBounds = thingEl.getBoundingClientRect();
  const width = document.body.clientWidth - thingElementBounds.width;

  console.log(amt);
  thingEl.textContent = percentage(amt);

  // Move element
  thingEl.style.transform = `translate(${amt * width}px, 0px)`;
};

const setup = () => {
  // Run loop. This will call `updateState` until it returns false
  const run = Flow.continuously(onTick);

  // Called on pointerup or keyup. 
  // Triggers easing function
  const trigger = () => {
    const { easing, thingEl } = settings;
    if (!thingEl) return;
    easing.reset();
    run.start();
    thingEl.classList.remove(`isDone`);
    thingEl.style.transform = ``;
    thingEl.textContent = ``;
  };

  // Wire up events
  document.addEventListener(`pointerup`, trigger);
  document.addEventListener(`keyup`, trigger);
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}