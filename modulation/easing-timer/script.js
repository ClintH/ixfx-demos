import { Easings } from '../../ixfx/modulation.js';
import { Flow, Data } from '../../ixfx/bundle.js';
import * as Util from './util.js';

const settings = Object.freeze({
  easing: /** @type Easings.Options */({
    name: `sineIn`,
    duration: 1000,
  }),
  // Thing to move
  thingElement: /** @type HTMLElement */(document.querySelector(`#thing`)),
});

let state = {
  easing: () => 0
};


async function update() {
  // Resolve functions in state
  const computed = await Data.resolveFields(state);

  // Use the computed state
  await use(computed);

  window.requestAnimationFrame(update);
}

/**
 * Make visual udpates based on current state
 * @param {Data.ResolvedObject<state>} computed
 * @returns 
 */
function use(computed) {
  const { thingElement } = settings;
  const { easing } = computed;

  if (easing >= 0.99) {
    thingElement.classList.add(`isDone`);
  }

  thingElement.textContent = Util.percentage(easing);
  Util.translateElement(thingElement, easing, 0);

};


// Called on pointerup or keyup. 
// Resets the easing function
function trigger() {
  const { easing, thingElement } = settings;

  // Reset visuals
  thingElement.classList.remove(`isDone`);
  thingElement.style.transform = ``;
  thingElement.textContent = ``;

  // Create a new easer. 
  // e() will return 0..1 non-linearly.
  const e = Easings.create(easing);

  saveState({ easing: e });
};

function setup() {
  // Wire up events
  document.addEventListener(`pointerup`, trigger);
  document.addEventListener(`keyup`, trigger);

  update();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}