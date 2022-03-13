import {StateMachine} from '../../ixfx/flow.js';

// Init settings
const settings = {
  sm: StateMachine.create(`sleep`, {
    sleep: `awake`,
    awake: [`sleep`, `excited`, `angry`],
    excited: `awake`,
    angry: `awake`
  }),
  stateEl: document.getElementById(`state`)
}

// Updates machine based on button presses
const updateMachine = (s) => {
  const {sm, stateEl} = settings;
  try {
    sm.state = s;
    stateEl.innerText = sm.state;
  } catch (ex) {
    console.error(ex);
    stateEl.innerHTML = sm.state + `<br />` + ex.message;
  }
}

// Set up
const setup = () => {
  document.addEventListener(`click`, (evt) => {
    /** @type HTMLElement */
    const el = evt.target;

    // If the click didn't happen on a BUTTON
    // we're not interested
    if (el.nodeName !== `BUTTON`) return;

    // Use the label of the button as 
    // the state to change to.
    updateMachine(el.innerText.toLocaleLowerCase());
  });
}
setup();