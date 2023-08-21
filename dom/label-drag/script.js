const settings = Object.freeze({});

let state = Object.freeze({});

/**
 * 
 * @param {Element} el 
 */
const bindElement = (element) => {
  
  element.addEventListener(`pointerdown`, event => {
    console.log(event);
    event.preventDefault();

  });
  element.addEventListener(`pointerup`, event => {
    console.log(event);
  });
  element.addEventListener(`pointermove`, event => {});
};

// Setup
const setup = () => {
  document.querySelectorAll(`.drag-edit`).forEach(bindElement);
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