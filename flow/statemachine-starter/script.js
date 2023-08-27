import { StateMachine } from '../../ixfx/flow.js';

// Init settings
const settings = Object.freeze({
  transitions: {
    sleep: `awake`,
    awake: [ `sleep`, `excited`, `angry` ],
    excited: `awake`,
    angry: `awake`
  },
  stateEl: /** @type HTMLElement */(document.querySelector(`#state`)),
  possibleStatesEl:  /** @type HTMLElement */(document.querySelector(`#possibleStates`))
});

let state = Object.freeze({
  sm: StateMachine.init(settings.transitions)
});

const use = () => {
  const { stateEl, possibleStatesEl } =settings;
  const { sm } = state;
  stateEl.textContent = sm.value;
  possibleStatesEl.textContent = StateMachine.possible(sm).join(`, `);
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
    use();
  } catch (error) {
    console.error(error);
    if (stateEl) stateEl.innerHTML = sm.value + `<br />` + error.message;
  }
};

function setup() {
  document.addEventListener(`click`, (event) => {
    const element = /** @type HTMLElement */(event.target);

    // If the click didn't happen on a BUTTON
    // we're not interested
    if (element.nodeName !== `BUTTON`) return;

    // Use the label of the button as 
    // the state to change to.
    updateMachine(element.textContent?.toLocaleLowerCase());
  });
  use();
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