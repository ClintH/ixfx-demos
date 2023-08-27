import { pressureOrForce } from "./pressure-or-force.js";

const settings = Object.freeze({
  // Maximum blur, in pixels
  maxBlur: 100
});

/** @type {import("./pressure-or-force.js").PressureForceState} */
let state = Object.freeze({
  webkitForce: 0,
  normalised: 0,
  pointerPressure: 0
});

const use = () => {
  const { normalised } = state;
  
  // Higher pressure == less blur
  setBlur(1-normalised);
};

const setBlur = (relativeAmount) => {
  const { maxBlur } = settings;
  
  // See: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
  const element = /** @type HTMLElement */(document.querySelector(`#content`));
  if (!element) return;
  element.style.filter = `blur(${Math.round(relativeAmount*maxBlur)}px)`;
};

function setup() {
  // Listen for pressure or force events on body
  pressureOrForce(document.body, state => {
    saveState(state);
    use();
  });

  // Start off with 100% blur
  setBlur(1);
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

