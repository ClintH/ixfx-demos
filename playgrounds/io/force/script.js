/**
 * Demonstrates a 'pinch to zoom' style gesture
 */
import { pressureOrForce } from "./pressureOrForce.js";

const settings = Object.freeze({
  // Max expected value for webkitForce
  webkitForceMax: 3,
  // Min expected value for webkitForce
  webkitForceMin: 1
});

/** @type {import("./pressureOrForce.js").PressureForceState} */
let state ={
  webkitForce: 0,
  normalised: 0,
  pointerPressure: 0
};

/**
 * Update screen with state
 */
const displayState = () => {
  const { webkitForce, normalised, pointerPressure } = state;
  const webkitForceEl = document.getElementById(`webkitForce`);
  if (webkitForceEl) {
    if (webkitForce) webkitForceEl.innerHTML = webkitForce.toString();
    else webkitForceEl.innerHTML = `?`;
  }

  const pointerPressureEl = document.getElementById(`pointerPressure`);
  if (pointerPressureEl) {
    if (pointerPressure) pointerPressureEl.innerHTML = pointerPressure.toString();
    else pointerPressureEl.innerHTML = `?`;
  }

  const normalisedEl = document.getElementById(`normalised`);
  if (normalisedEl) normalisedEl.innerHTML = normalised.toString();
};

const useState = () => {
  const { normalised } = state;

  // Display numerical readouts
  displayState();

  // Use data to change background
  const el = document.getElementById(`thing`);
  if (!el) return;
  el.style.backgroundColor = `hsl(100, ${Math.round(normalised*100)}%, 50%)`;
};

const setup = () => {
  const el = document.getElementById(`thing`);
  if (!el) return;

  // Listen for pressure or force events on element,
  // setting state and using it.
  pressureOrForce(el, state => {
    updateState(state);
    useState();
  });
  

};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState(s) {
  state = {
    ...state,
    ...s
  };
}

