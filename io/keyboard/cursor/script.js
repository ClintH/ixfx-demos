/**
 * Simple demo of moving an element by cursor keys.
 * See README.md
 */
import {getTranslation} from '../../../ixfx/dom.js';
import {Points} from "../../../ixfx/geometry.js";

const settings = {
  hintEl: document.getElementById(`hint`),
  thingEl: document.getElementById(`thing`),
  // How many pixels to move with each key press
  pixelSteps: 1
}

let state = {
  up: false,
  down: false,
  left: false,
  right: false
};

/**
 * Key is bring pressed
 * @param {KeyboardEvent} evt 
 * @returns 
 */
const onKeydown = (evt) => {
  const {hintEl} = settings;
  // Hide hint box after a key event
  hintEl.classList.add(`hidden`);

  switch (evt.code) {
    case `ArrowUp`:
      state.up = true;
      break;
    case `ArrowDown`:
      state.down = true;
      break;
    case `ArrowLeft`:
      state.left = true;
      break;
    case `ArrowRight`:
      state.right = true;
      break;
    default:
      logKeyEvent(evt, `keydown`);
      return;
  }
  update();
};

const update = () => {
  const {thingEl} = settings;

  // 1 for right, -1 for left, otherwise 0
  let x = state.right ? 1 :
    state.left ? -1 : 0;

  // 1 for down, -1 for up, otherwise 0
  let y = state.down ? 1 :
    state.up ? -1 : 0;

  moveEl(thingEl, {x, y});
}
/**
 * Move element by a given x & y
 * @param {HTMLElement} el 
 * @param {{x:number,y:number}} vector 
 */
const moveEl = (el, vector) => {
  const {pixelSteps} = settings;
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
      state.up = false;
      break;
    case `ArrowDown`:
      state.down = false;
      break;
    case `ArrowLeft`:
      state.left = false;
      break;
    case `ArrowRight`:
      state.right = false;
      break;
    default:
      logKeyEvent(evt, `keydown`);
  }
};

// Display key event info to console
const logKeyEvent = (evt, prefix = 'key') => console.log(`${prefix} code: ${evt.code} key: ${evt.key} alt: ${evt.altKey} ctrl: ${evt.ctrlKey} meta: ${evt.metaKey} shift: ${evt.shiftKey}`);

const setup = () => {
  // Listen for keydown/keyup
  document.addEventListener(`keydown`, onKeydown);
  document.addEventListener(`keyup`, onKeyup);
}
setup();