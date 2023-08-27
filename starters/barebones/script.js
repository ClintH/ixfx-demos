// #region Settings & state
const settings = Object.freeze({});

let state = Object.freeze({});
// #endregion

const use = () => {};

function setup() {
  // Call every half a second
  setInterval(use, 500);
};

// #region Toolbox
/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
setup();
// #endregion