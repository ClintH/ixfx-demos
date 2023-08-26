const settings = Object.freeze({
  // Id of button we care about
  buttonId: 0
});

let state = Object.freeze({
  /** @type string|undefined */
  gamepadId: undefined,
  /** @type boolean */
  buttonPressed: false
});

const useState = () => {
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
  updateState({ buttonPressed });
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const loop = () => {
    getGamepad();
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();  

  window.addEventListener(`gamepadconnected`, event => {
    console.log(`Gamepad connected`);
    console.log(event);
    updateState({ gamepadId: event.gamepad.id });
  });

  window.addEventListener(`gamepaddisconnected`, event => {
    console.log(`Gamepad disconnected`);
    updateState({ gamepadId: undefined });
  });
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

/**
 * Looks for connected gamepads, trying to find the
 * same one used previosuly.
 */
function getGamepad() {
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