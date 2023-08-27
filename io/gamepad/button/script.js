const settings = Object.freeze({
  // Id of button we care about
  buttonId: 0
});

/**
 * @typedef {object} State
 * @prop {string|undefined} gamepadId
 * @prop {boolean} buttonPressed
 */

/** @type State */
let state = Object.freeze({
  gamepadId: undefined,
  buttonPressed: false
});

const use = () => {
  const { buttonPressed } = state;
 
  // Element to visualise button press
  const element = document.querySelector(`#vis`);
  if (!element) return;

  // If pressed, add a CSS class, if not, remove.
  if (buttonPressed) {
    element.classList.add(`pressed`);
  } else {
    element.classList.remove(`pressed`);
  }
};

/**
 * Read the current state of a connected gamepad
 * @param {Gamepad} gamepad 
 */
const readGamepad = (gamepad) => {
  const { buttonId } = settings;

  // Get the 'pressed' state of the button we care about
  const buttonPressed = gamepad.buttons[buttonId].pressed;

  // Update state
  saveState({ buttonPressed });
};

/**
 * Looks for connected gamepads, trying to find the
 * same one used previosuly.
 */
export function getGamepad() {
  const gamepads = /** @type Gamepad[] */(navigator.getGamepads 
    ? navigator.getGamepads() 
    // @ts-ignore
    : (navigator.webkitGetGamepads ??  []));

  gamepads.some(gm => {
    if (gm === null) return;
    if (gm.id === state.gamepadId) {
      readGamepad(gm);
    }
  });
};

function setup() {
  const loop = () => {
    getGamepad();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();  

  window.addEventListener(`gamepadconnected`, event => {
    console.log(`Gamepad connected`);
    console.log(event);
    saveState({ gamepadId: event.gamepad.id });
  });

  window.addEventListener(`gamepaddisconnected`, event => {
    console.log(`Gamepad disconnected`);
    saveState({ gamepadId: undefined });
  });
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
