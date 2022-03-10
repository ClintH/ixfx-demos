import {Easings} from '../../ixfx/modulation.js';

// Define settings
const settings = {
  // thing we'll move
  thingEl: document.getElementById(`thing`),
  // setup easing
  easing: Easings.tick(`sineIn`, 100)
}

// Initialise state
let state = {
  amt: 0,
  isDone: false
};

// Called on pointerup/keyup 
const updateState = (ev) => {
  ev.preventDefault();
  const {easing} = settings;
  state = {
    ...state,
    amt: easing.compute(), // Progresses easing by one tick
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
  // Grab relevant fields from settings & state
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

const reset = (ev) => {
  const {thingEl, easing} = settings;

  // Don't reset if circle is clicked 
  if (ev.target === thingEl) return;

  // Reset
  easing.reset();
  thingEl.classList.remove(`isDone`);
  thingEl.style.transform = ``;
  thingEl.innerText = ``;
};

const setup = () => {
  const {thingEl} = settings;

  // Handle events
  document.addEventListener(`pointerdown`, reset);
  document.addEventListener(`keydown`, updateState);
  thingEl.addEventListener(`click`, updateState);
}
setup();