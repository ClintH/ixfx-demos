import { StateMachine } from '../../ixfx/flow.js';

// Init settings
const settings = Object.freeze({
  sm: StateMachine.create(`sleep`, {
    sleep: `awake`,
    awake: [ `sleep`, `excited`, `angry` ],
    excited: `awake`,
    angry: `awake`
  }),
  stateEl: document.getElementById(`state`)
});

// Updates machine based on button presses
const updateMachine = (s) => {
  const { sm, stateEl } = settings;
  try {
    sm.state = s;
    if (stateEl) stateEl.innerText = sm.state;
  } catch (ex) {
    console.error(ex);
    if (stateEl) stateEl.innerHTML = sm.state + `<br />` + ex.message;
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
};
setup();