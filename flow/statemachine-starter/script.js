import { StateMachine } from '../../ixfx/flow.js';

// Init settings
const settings = Object.freeze({
  transitions: {
    sleep: `awake`,
    awake: [ `sleep`, `excited`, `angry` ],
    excited: `awake`,
    angry: `awake`
  },
  stateEl: /** @type HTMLElement */(document.getElementById(`state`)),
  possibleStatesEl:  /** @type HTMLElement */(document.getElementById(`possibleStates`))
});

let state = Object.freeze({
  sm: StateMachine.init(settings.transitions)
});

const useState = () => {
  const { stateEl, possibleStatesEl } =settings;
  const { sm } = state;
  stateEl.innerText = sm.value;
  possibleStatesEl.innerText = StateMachine.possible(sm).join(`, `);
};

// Updates machine based on button presses
const updateMachine = (s) => {
  const { stateEl } = settings;
  let { sm } = state;
  try {
    console.log(`updateMachine: to: ${s}`);
    // Try to transition machine, saving it to state
    saveState({
      sm: StateMachine.to(sm, s)
    });
    useState();
  } catch (ex) {
    console.error(ex);
    if (stateEl) stateEl.innerHTML = sm.value + `<br />` + ex.message;
  }
};

// Set up
const setup = () => {
  document.addEventListener(`click`, (evt) => {
    const el = /** @type HTMLElement */(evt.target);

    // If the click didn't happen on a BUTTON
    // we're not interested
    if (el.nodeName !== `BUTTON`) return;

    // Use the label of the button as 
    // the state to change to.
    updateMachine(el.innerText.toLocaleLowerCase());
  });
  useState();
};
setup();

/**
 * Saves state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}