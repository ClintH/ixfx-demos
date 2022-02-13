import {Timers} from '../../ixfx/bundle.js';
import {easeOverTime} from '../../ixfx/modulation.js';

// Define settings
const settings = {
  // thing to move
  thingEl: document.getElementById(`thing`),
  // setup easing
  easing: easeOverTime(`easeInSine`, 1000)
}

// Initialise state
let state = {
  amt: 0,
  isDone: false,
};

// Update state with value from easing
const updateState = () => {
  const {easing} = settings;
  state = {
    ...state,
    amt: easing.compute(),
    isDone: easing.isDone
  }

  // Trigger a visual refresh
  updateVisual();

  // Return false if envelope is done, stopping animation
  return !easing.isDone;
}

// Make a human-friendly percentage
const percentage = (v) => Math.floor(v * 100) + '%';

// Update visuals
const updateVisual = () => {
  // Grab relevant field from settings & state
  const {thingEl} = settings;
  const {amt, isDone} = state;

  if (isDone) {
    thingEl.classList.add(`isDone`);
  }

  // Available width is width of viewport minus size of circle
  const thingElBounds = thingEl.getBoundingClientRect();
  const width = document.body.clientWidth - thingElBounds.width;

  console.log(amt);
  thingEl.innerText = percentage(amt);

  // Move element
  thingEl.style.transform = `translate(${amt * width}px, 0px)`;
}

const setup = () => {
  // Run loop. This will call `updateState` until it returns false
  const run = Timers.continuously(updateState);

  // Called on pointerup or keyup. 
  // Triggers easing function
  const trigger = () => {
    const {easing, thingEl} = settings;
    easing.reset();
    run.start();
    thingEl.classList.remove(`isDone`);
    thingEl.style.transform = ``;
    thingEl.innerText = ``;
  };

  // Wire up events
  document.addEventListener(`pointerup`, trigger);
  document.addEventListener(`keyup`, trigger);
}
setup();