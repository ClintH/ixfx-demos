import { flip, clamp, scale } from "../../../ixfx/numbers.js";
import { interval } from "../../../ixfx/trackers.js";

const settings = Object.freeze({
  // Element to hold created letters
  lettersEl: document.querySelector(`#letters`),
  // Keys to allow even though they aren't letters/digits
  allowCodes: [`Backquote`, `Minus`, `Equal`, `Plus`, `Period`, `Semicolon`, `Comma`, `Slash`, `Quote`, `Backslash`, `BracketLeft`, `BracketRight`],
  // Create a speed tracker that auto-resets after 3 samples
  speedTracker: interval({ id: `typing`, resetAfterSamples: 3 })
});

let state = Object.freeze({
  /** @type {number} */
  speed: 0
});

const logKeyEvent = (event, prefix = `key`) => console.log(`${prefix} code: ${event.code} key: ${event.key} alt: ${event.altKey} ctrl: ${event.ctrlKey} meta: ${event.metaKey} shift: ${event.shiftKey}`);

/**
 * Key is bring pressed
 * @param {KeyboardEvent} event 
 * @returns 
 */
const onKeydown = (event) => {
  const { allowCodes } = settings;

  // Uncomment to see some debug info on key event
  // logKeyEvent(evt, `keydown`);

  /** @type {string} */
  const code = event.code;

  // Special case a few keys
  switch (code) {
    case `Backspace`: {
      removeLastLetter();
      return;
    }
    case `Space`: {
      addLetter(`&nbsp;`);
      return;
    }
    case `Enter`: {
      addWrap();
      return;
    }
  }

  // Ignore keys that don't seem to be letters
  // and not on our allow list
  const isKey = code.startsWith(`Key`);
  const isDigit = code.startsWith(`Digit`) || code.startsWith(`Numpad`);

  if (!(isKey || isDigit) && !allowCodes.includes(code)) return;

  // What letter?
  /** @type {string} */
  let letter = event.key;

  // Special case letters for some keys
  switch (code) {
    case `Backquote`: {
      letter = event.shiftKey ? `~` : `\``;
      break;
    }
    case `Quote`: {
      letter = event.shiftKey ? `"` : `'`;
      break;
    }
    case `Digit6`: {
      if (event.shiftKey) letter = `^`;
      break;
    }
  }

  // Add letter to DOM
  const letterElement = addLetter(letter);

  // Show off
  effectsDemo(letterElement, letter);
};

/**
 * Apply some demo effects
 * @param {HTMLElement|undefined} letterElement
 * @param {string} letter 
 */
const effectsDemo = (letterElement, letter) => {
  const { speed } = state;
  if (!letterElement) return;

  // Example: Apply random font weight to letter
  letterElement.style.fontWeight = (200 + Math.round(400 * Math.random())).toString();

  // Example: If it's uppercase, randomly boost size
  letterElement.style.fontSize = letter.toLocaleUpperCase() === letter ? (1 + (2 * Math.random())) + `em` : `1em`;

  // Example: If letter is same as the one before, do a transform
  const previousSibling = letterElement.previousSibling;
  if (previousSibling && /** @type {HTMLElement}*/(previousSibling).innerHTML === letterElement.innerHTML) {
    // translate on y axis a random amount between -10 and 10
    letterElement.style.transform = `translateY(${Math.round(Math.random() * 20 - 10)}px)`;
  }

  // Example: Apply typing speed to padding
  letterElement.style.paddingRight = (speed * 10) + `px`;
};

/**
 * Key is released
 * @param {KeyboardEvent} event
 */
const onKeyup = (event) => {
  const { speedTracker } = settings;

  speedTracker.mark();

  // Convert avg interval in milliseconds to a relative
  // In this case, that large interval (ie. slow) approaches 0, while fast typing approaches 1
  const avgMs = speedTracker.avg;

  // Average will be NaN until there is more than one value
  if (Number.isNaN(avgMs)) return;

  const avg = flip(clamp(scale(avgMs, 0, 200)));

  saveState({
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
  const element = document.createElement(`span`);
  element.style.width = `100%`;
  lettersEl.append(element);
};

/**
 * Adds a letter (or really, any HTML string)
 * @param {string} letter 
 * @returns HTMLSpanElement
 */
const addLetter = (letter) => {
  const { lettersEl } = settings;
  const hintElement = document.querySelector(`#hint`);

  if (!lettersEl || !hintElement) return;

  //hintEl.style.display = `none`;
  hintElement.classList.add(`hidden`);

  const element = document.createElement(`span`);
  element.innerHTML = letter;
  lettersEl.append(element);
  return element;
};

function setup() {
  // Listen for keydown/keyup
  document.addEventListener(`keydown`, onKeydown);
  document.addEventListener(`keyup`, onKeyup);
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

