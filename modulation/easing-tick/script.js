import { Easings } from '../../ixfx/modulation.js';

const settings = Object.freeze({
  // thing we'll move
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`)),
  // setup easing
  easing: Easings.tick(`sineIn`, 100)
});

let state = Object.freeze({
  /** @type {number} */
  amt: 0,
  /** @type {boolean} */
  isDone: false
});

const onPointerOrKeyUp = (event) => {
  event.preventDefault();
  const { easing } = settings;
  saveState({
    amt: easing.compute(), // Progresses easing by one tick
    isDone: easing.isDone
  });

  // Trigger a visual refresh
  use();

  // Return false if envelope is done, stopping animation
  return !easing.isDone;
};

// Make a human-friendly percentage
const percentage = (v) => Math.floor(v * 100) + `%`;

// Update visuals
const use = () => {
  // Grab relevant fields from settings & state
  const { thingEl } = settings;
  const { amt, isDone } = state;

  if (!thingEl) return;

  if (isDone)  {
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

const reset = (event) => {
  const { thingEl, easing } = settings;

  if (!thingEl) return;

  // Don't reset if circle is clicked 
  if (event.target === thingEl) return;

  // Reset
  easing.reset();
  thingEl.classList.remove(`isDone`);
  thingEl.style.transform = ``;
  thingEl.textContent = ``;
};

function setup() {
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
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}