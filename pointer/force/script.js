import { pressureOrForce } from "./pressureOrForce.js";

const settings = Object.freeze({
  // Maximum blur, in pixels
  maxBlur: 100
});

/** @type {import("./pressureOrForce.js").PressureForceState} */
let state = Object.freeze({
  webkitForce: 0,
  normalised: 0,
  pointerPressure: 0
});

const useState = () => {
  const { normalised } = state;
  
  // Higher pressure == less blur
  setBlur(1-normalised);
};

const setBlur = (relativeAmount) => {
  const { maxBlur } = settings;
  
  // See: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
  const el = document.getElementById(`content`);
  if (!el) return;
  el.style.filter = `blur(${Math.round(relativeAmount*maxBlur)}px)`;
};

const setup = () => {
  // Listen for pressure or force events on body
  pressureOrForce(document.body, state => {
    updateState(state);
    useState();
  });

  // Start off with 100% blur
  setBlur(1);
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

