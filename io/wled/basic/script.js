import * as Dom from '../../../ixfx/dom.js';
import { Wled } from "../wled.js";

const settings = Object.freeze({
  wled: new Wled(`ws://4.3.2.1/ws`)
});

/**
 * @typedef {{
 * connected: boolean
 * }} State
 */

/** @type State */
let state = Object.freeze({
  connected: false
});


/**
 * Example: Sets brightness
 * @returns 
 */
function setBrightness() {
  const { wled } = settings;

  // Eg: main brightness
  // wled.brightness = Math.random();

  // Eg. a segment
  wled.segments[0].brightness = 0.1;
}

/**
 * Example: choose an effect
 */
function setEffect() {
  const { wled } = settings;

  // Play random effect on segment 0
  wled.segments[0].effect = Math.floor(Math.random() * wled.effectCount);

  // Set effect to 0 for solid colour
  // wled.segments[0].effect = 0;

}

/**
 * Example: Change to a preset
 */
function setPreset() {
  const { wled } = settings;
  wled.preset = 1;
}

function setup() {
  const { wled } = settings;

  // Example UI
  document.querySelector(`#btnBrightness`)?.addEventListener(`click`, event => {
    setBrightness();
  });

  document.querySelector(`#btnPreset`)?.addEventListener(`click`, event => {
    setPreset();
  });

  document.querySelector(`#btnEffect`)?.addEventListener(`click`, event => {
    setEffect();
  });

  // So we see debug info on the page.
  Dom.inlineConsole();

  // Listen for connection state changes
  wled.connectionState.addEventListener(`change`, event => {
    console.log(`Connection: ${event.priorState} -> ${event.newState}`);
    saveState({ connected: event.newState === `open` });
  });

  // Eg. Listen for when we get updates from WLED
  wled.addEventListener(`updated`, event => {
    if (event.what === `state`) {
      const state = wled.wledState;
      console.log(state);
    }
  });

};

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });

  // Connected state has changed
  if (`connected` in s) {
    if (s.connected) {
      document.body.classList.add(`ws-open`);
      document.body.classList.remove(`ws-closed`);
    } else {
      document.body.classList.remove(`ws-open`);
      document.body.classList.add(`ws-closed`);
    }
  }
}
setup();
