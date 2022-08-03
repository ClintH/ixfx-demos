import { Easings } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  // thing we'll move
  thingEl: document.getElementById(`thing`),
  // setup easing
  easing: Easings.tick(`sineIn`, 100)
});

let state = Object.freeze({
  /** @type {number} */
  amt: 0,
  /** @type {boolean} */
  isDone: false
});

const onPointerOrKeyUp = (ev) => {
  ev.preventDefault();
  const { easing } = settings;
  updateState({
    amt: easing.compute(), // Progresses easing by one tick
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
  // Grab relevant fields from settings & state
  const { thingEl } = settings;
  const { amt, isDone } = state;

  if (!thingEl) return;

  if (isDone)  {
    thingEl.classList.add(`isDone`);
  }

  // Available width is width of viewport minus size of circle
  const thingElBounds = thingEl.getBoundingClientRect();
  const width = document.body.clientWidth - thingElBounds.width;

  console.log(amt);
  thingEl.innerText = percentage(amt);

  // Move element
  thingEl.style.transform = `translate(${amt * width}px, 0px)`;
};

const reset = (ev) => {
  const { thingEl, easing } = settings;

  if (!thingEl) return;

  // Don't reset if circle is clicked 
  if (ev.target === thingEl) return;

  // Reset
  easing.reset();
  thingEl.classList.remove(`isDone`);
  thingEl.style.transform = ``;
  thingEl.innerText = ``;
};

const setup = () => {
  const { thingEl } = settings;
  if (!thingEl) return;

  // Handle events
  document.addEventListener(`pointerdown`, reset);
  document.addEventListener(`keydown`, onPointerOrKeyUp);
  thingEl.addEventListener(`click`, onPointerOrKeyUp);
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