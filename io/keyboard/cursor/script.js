/**
 * Simple demo of moving an element by cursor keys.
 * See README.md
 */
import { getTranslation } from '../../../ixfx/dom.js';
import { Points } from "../../../ixfx/geometry.js";

const settings = Object.freeze({
  // How many pixels to move with each key press
  pixelSteps: 1
});

let state = Object.freeze({
  /** @type {boolean} */
  up: false,
  /** @type {boolean} */
  down: false,
  /** @type {boolean} */
  left: false,
  /** @type {boolean} */
  right: false
});

/**
 * Key is bring pressed
 * @param {KeyboardEvent} event 
 * @returns 
 */
const onKeydown = (event) => {
  const hintElement = document.querySelector(`#hint`);
  if (!hintElement) return;

  // Hide hint box after a key event
  hintElement.classList.add(`hidden`);

  switch (event.code) {
  case `ArrowUp`: {
    updateState({ up:true });
    break;
  }
  case `ArrowDown`: {
    updateState({ down:true });
    break;
  }
  case `ArrowLeft`: {
    updateState({ left:true });
    break;
  }
  case `ArrowRight`: {
    updateState({ right:true });
    break;
  }
  default: {
    logKeyEvent(event, `keydown`);
    return;
  }
  }
  useState();
};

const useState = () => {
  const thingElement = /** @type HTMLElement */(document.querySelector(`#thing`));
  if (!thingElement) return;

  // 1 for right, -1 for left, otherwise 0
  let x = state.right ? 1 :
    (state.left ? -1 : 0);

  // 1 for down, -1 for up, otherwise 0
  let y = state.down ? 1 :
    (state.up ? -1 : 0);

  moveElement(thingElement, { x, y });
};
/**
 * Move element by a given x & y
 * @param {HTMLElement} element
 * @param {{x:number,y:number}} vector 
 */
const moveElement = (element, vector) => {
  const { pixelSteps } = settings;
  const xPx = vector.x * pixelSteps;
  const yPx = vector.y * pixelSteps;

  const trans = getTranslation(element);
  const transResult = Points.sum(trans, xPx, yPx);

  element.style.transform = `translate(${transResult.x}px, ${transResult.y}px)`;
};

/**
 * Key is released
 * @param {KeyboardEvent} event 
 */
const onKeyup = (event) => {
  switch (event.code) {
  case `ArrowUp`: {
    updateState({ up:false });
    break;
  }
  case `ArrowDown`: {
    updateState({ down:false });
    break;
  }
  case `ArrowLeft`: {
    updateState({ left:false });
    break;
  }
  case `ArrowRight`: {
    updateState({ right:false });
    break;
  }
  default: {
    logKeyEvent(event, `keydown`);
  }
  }
  useState();
};

// Display key event info to console
const logKeyEvent = (event, prefix = `key`) => console.log(`${prefix} code: ${event.code} key: ${event.key} alt: ${event.altKey} ctrl: ${event.ctrlKey} meta: ${event.metaKey} shift: ${event.shiftKey}`);

const setup = () => {
  // Listen for keydown/keyup
  document.addEventListener(`keydown`, onKeydown);
  document.addEventListener(`keyup`, onKeyup);
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