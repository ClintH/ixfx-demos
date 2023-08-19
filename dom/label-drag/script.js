const settings = Object.freeze({

});

let state = Object.freeze({
});

/**
 * 
 * @param {Element} el 
 */
const bindElement = (el) => {
  
  el.addEventListener(`pointerdown`, evt => {
    console.log(evt);
    evt.preventDefault();

  });
  el.addEventListener(`pointerup`, evt => {
    console.log(evt);
  });
  el.addEventListener(`pointermove`, evt => {

  });
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