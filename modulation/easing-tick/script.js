import {Timers} from '../../ixfx/bundle.js';
import {easeOverTicks} from '../../ixfx/modulation.js';
const thingEl = document.getElementById(`thing`);

// Set up easer
let e = easeOverTicks(`easeInSine`, 100);

// Initialise state
let state = {
  amt: 0,
  isDone: false
};

// Called on pointerup/keyup 
const updateState = () => {
  state = {
    ...state,
    amt: e.compute(), // Progresses easing by one tick
    isDone: e.isDone
  }

  // Trigger a visual refresh
  updateVisual();

  // Return false if envelope is done, stopping animation
  return !e.isDone;
}

// Make a human-friendly percentage
const percentage = (v) => Math.floor(v * 100) + '%';

// Update visuals
const updateVisual = () => {
  // Grab relevant fields from state
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

const reset = () => {
  e.reset();
  thingEl.classList.remove(`isDone`);
  thingEl.style.transform = ``;
  thingEl.innerText = ``;
};

// Handle events
document.addEventListener(`pointerdown`, reset);
document.addEventListener(`keydown`, updateState);
