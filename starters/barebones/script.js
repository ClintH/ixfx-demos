const settings = Object.freeze({

});

let state = Object.freeze({
});

const useState = () => {
};

const setup = () => {
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
