const settings = Object.freeze({
  // Id of button we care about
  buttonId: 0
});

let state = Object.freeze({
  /** @type string|null */
  gamepadId: null,
  /** @type Gamepad|null */
  gamepad: null,
  /** @type boolean */
  button: false
});

const useState = () => {
  const { button } = state;
 
  const el = document.getElementById(`vis`);
  if (!el) return;

  if (button) {
    el.classList.add(`pressed`);
  } else {
    el.classList.remove(`pressed`);
  }
};

const getGamepad = () => {
  const gamepads = /** @type Gamepad[] */(navigator.getGamepads 
    ? navigator.getGamepads() 
    : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []));

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

  window.addEventListener(`gamepadconnected`, evt => {
    console.log(`Gamepad connected`);
    console.log(evt);
    updateState({ gamepad: evt.gamepad, gamepadId: evt.gamepad.id });
  });

  window.addEventListener(`gamepaddisconnected`, evt => {
    console.log(`Gamepad disconnected`);
    updateState({ gamepad:null });
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
