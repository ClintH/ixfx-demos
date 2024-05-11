const settings = Object.freeze({});

let state = Object.freeze({});

/**
 * Bind an element
 * @param {Element} element 
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

function setup() {
  document.querySelectorAll(`.drag-edit`).forEach(bindElement);
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}