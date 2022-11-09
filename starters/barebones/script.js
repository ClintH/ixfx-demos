// #region Settings & state
const settings = Object.freeze({

});

let state = Object.freeze({
});
// #endregion

const useState = () => {
};

const setup = () => {
  // Call useState every half a second
  setInterval(useState, 500);
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