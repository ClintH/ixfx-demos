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
 * @param {KeyboardEvent} evt 
 * @returns 
 */
const onKeydown = (evt) => {
  const hintEl = document.getElementById(`hint`);
  if (!hintEl) return;

  // Hide hint box after a key event
  hintEl.classList.add(`hidden`);

  switch (evt.code) {
  case `ArrowUp`:
    updateState({ up:true });
    break;
  case `ArrowDown`:
    updateState({ down:true });
    break;
  case `ArrowLeft`:
    updateState({ left:true });
    break;
  case `ArrowRight`:
    updateState({ right:true });
    break;
  default:
    logKeyEvent(evt, `keydown`);
    return;
  }
  useState();
};

const useState = () => {
  const thingEl = document.getElementById(`thing`);
  if (!thingEl) return;

  // 1 for right, -1 for left, otherwise 0
  let x = state.right ? 1 :
    state.left ? -1 : 0;

  // 1 for down, -1 for up, otherwise 0
  let y = state.down ? 1 :
    state.up ? -1 : 0;

  moveEl(thingEl, { x, y });
};
/**
 * Move element by a given x & y
 * @param {HTMLElement} el 
 * @param {{x:number,y:number}} vector 
 */
const moveEl = (el, vector) => {
  const { pixelSteps } = settings;
  const xPx = vector.x * pixelSteps;
  const yPx = vector.y * pixelSteps;

  const trans = getTranslation(el);
  const newTrans = Points.sum(trans, xPx, yPx);

  el.style.transform = `translate(${newTrans.x}px, ${newTrans.y}px)`;
};

/**
 * Key is released
 * @param {KeyboardEvent} evt 
 */
const onKeyup = (evt) => {
  switch (evt.code) {
  case `ArrowUp`:
    updateState({ up:false });
    break;
  case `ArrowDown`:
    updateState({ down:false });
    break;
  case `ArrowLeft`:
    updateState({ left:false });
    break;
  case `ArrowRight`:
    updateState({ right:false });
    break;
  default:
    logKeyEvent(evt, `keydown`);
  }
  useState();
};

// Display key event info to console
const logKeyEvent = (evt, prefix = `key`) => console.log(`${prefix} code: ${evt.code} key: ${evt.key} alt: ${evt.altKey} ctrl: ${evt.ctrlKey} meta: ${evt.metaKey} shift: ${evt.shiftKey}`);

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