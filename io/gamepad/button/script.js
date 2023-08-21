const settings = Object.freeze({
  // Id of button we care about
  buttonId: 0
});

let state = Object.freeze({
  /** @type string|undefined */
  gamepadId: undefined,
  /** @type Gamepad|undefined */
  gamepad: undefined,
  /** @type boolean */
  button: false
});

const useState = () => {
  const { button } = state;
 
  const element = document.querySelector(`#vis`);
  if (!element) return;

  if (button) {
    element.classList.add(`pressed`);
  } else {
    element.classList.remove(`pressed`);
  }
};

const getGamepad = () => {
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

/**
 * Read current state of gamepad
 * @param {Gamepad} gamepad 
 */
const readGamepad = (gamepad) => {
  const { buttonId } = settings;
  updateState({ button: gamepad.buttons[buttonId].pressed });
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
    updateState({ gamepad: event.gamepad, gamepadId: event.gamepad.id });
  });

  window.addEventListener(`gamepaddisconnected`, event => {
    console.log(`Gamepad disconnected`);
    updateState({ gamepad: undefined });
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
