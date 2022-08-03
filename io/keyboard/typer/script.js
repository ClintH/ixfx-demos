/**
 * This sketch demonstrates using key events to make a
 * very simple typewriter.
 */
import { flip, clamp, scale } from "../../../ixfx/data.js";
import { intervalTracker } from "../../../ixfx/data.js";

const settings = Object.freeze({
  // Element to hold created letters
  lettersEl: document.getElementById(`letters`),
  // Keys to allow even though they aren't letters/digits
  allowCodes: [ `Backquote`, `Minus`, `Equal`, `Plus`, `Period`, `Semicolon`, `Comma`, `Slash`, `Quote`, `Backslash`, `BracketLeft`, `BracketRight` ],
  // Create a speed tracker that auto-resets after 3 samples
  speedTracker: intervalTracker(`typing`, { resetAfterSamples:3 })
});

let state = Object.freeze({
  /** @type {number} */
  speed: 0
});

const logKeyEvent = (evt, prefix = `key`) => console.log(`${prefix} code: ${evt.code} key: ${evt.key} alt: ${evt.altKey} ctrl: ${evt.ctrlKey} meta: ${evt.metaKey} shift: ${evt.shiftKey}`);

/**
 * Key is bring pressed
 * @param {KeyboardEvent} evt 
 * @returns 
 */
const onKeydown = (evt) => {
  const { allowCodes } = settings;

  // Uncomment to see some debug info on key event
  // logKeyEvent(evt, `keydown`);

  /** @type {string} */
  const code = evt.code;

  // Special case a few keys
  switch (code) {
  case `Backspace`:
    removeLastLetter();
    return;
  case `Space`:
    addLetter(`&nbsp;`);
    return;
  case `Enter`:
    addWrap();
    return;
  }

  // Ignore keys that don't seem to be letters
  // and not on our allow list
  const isKey = code.startsWith(`Key`);
  const isDigit = code.startsWith(`Digit`) || code.startsWith(`Numpad`);

  if (!(isKey || isDigit) && !allowCodes.includes(code)) return;

  // What letter?
  /** @type {string} */
  let letter = evt.key;

  // Special case letters for some keys
  switch (code) {
  case `Backquote`:
    if (evt.shiftKey) letter = `~`;
    else letter = `\``;
    break;
  case `Quote`:
    if (evt.shiftKey) letter = `"`;
    else letter = `'`;
    break;
  case `Digit6`:
    if (evt.shiftKey) letter = `^`;
    break;
  }

  // Add letter to DOM
  const letterEl = addLetter(letter);

  // Show off
  effectsDemo(letterEl, letter);
};

/**
 * Apply some demo effects
 * @param {HTMLElement|undefined} letterEl 
 * @param {string} letter 
 */
const effectsDemo = (letterEl, letter) => {
  const { speed } = state;
  if (!letterEl) return;
  
  // Example: Apply random font weight to letter
  letterEl.style.fontWeight = (200 + Math.round(400 * Math.random())).toString();

  // Example: If it's uppercase, randomly boost size
  if (letter.toLocaleUpperCase() === letter) {
    letterEl.style.fontSize = (1 + (2 * Math.random())) + `em`;
  } else {
    letterEl.style.fontSize = `1em`;
  }

  // Example: If letter is same as the one before, do a transform
  const prevSibling = letterEl.previousSibling;
  if (prevSibling && /** @type {HTMLElement}*/(prevSibling).innerHTML === letterEl.innerHTML) {
    // translate on y axis a random amount between -10 and 10
    letterEl.style.transform = `translateY(${Math.round(Math.random() * 20 - 10)}px)`;
  }

  // Example: Apply typing speed to padding
  letterEl.style.paddingRight = (speed * 10) + `px`;
};

/**
 * Key is released
 * @param {KeyboardEvent} evt 
 */
const onKeyup = (evt) => {
  const { speedTracker } = settings;

  speedTracker.mark();

  // Convert avg interval in milliseconds to a relative
  // In this case, that large interval (ie. slow) approaches 0, while fast typing approaches 1
  const avgMs = speedTracker.avg;

  // Average will be NaN until there is more than one value
  if (Number.isNaN(avgMs)) return;

  const avg = flip(clamp(scale(avgMs, 0, 200)));

  updateState({
    speed: avg
  });

};

/**
 * Removes the most recent letter (ie at the end of the parent)
 */
const removeLastLetter = () => {
  const { lettersEl } = settings;
  if (!lettersEl) return;
  lettersEl.lastChild?.remove();
};

/**
 * Adds an element that wraps letters
 */
const addWrap = () => {
  const { lettersEl } = settings;
  if (!lettersEl) return;
  const el = document.createElement(`span`);
  el.style.width = `100%`;
  lettersEl.append(el);
};

/**
 * Adds a letter (or really, any HTML string)
 * @param {string} letter 
 * @returns HTMLSpanElement
 */
const addLetter = (letter) => {
  const { lettersEl } = settings;
  const hintEl = document.getElementById(`hint`);

  if (!lettersEl || !hintEl) return;

  //hintEl.style.display = `none`;
  hintEl.classList.add(`hidden`);

  const el = document.createElement(`span`);
  el.innerHTML = letter;
  lettersEl.append(el);
  return el;
};

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

function setHtml(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = value;
}
