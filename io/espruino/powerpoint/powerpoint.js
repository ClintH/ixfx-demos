/* eslint-disable */
// @ts-nocheck

// Example from:
// https://www.espruino.com/BLE%20Keyboard
var kb = require(`ble_hid_keyboard`);
NRF.setServices(undefined, { hid : kb.report });

const settings = {
  // Minimum time (seconds) to be considered
  // a double-click
  intervalQuick: 0.3
};

let state = {
  // Time of last button press
  lastPress: 0,
  // Interval between last two presses
  lastInterval: 0
};

function onDoubleClick() {
  console.log(`Double click`);
}

function onClick() {
  console.log(`Click`);
}


function useState() {
  if (state.lastInterval < settings.intervalQuick) {
    // Reset
    state = updateState({ lastPress: 0 });
    onDoubleClick();
  } else {
    onClick();
  }
}

function updateState(s) {
  state = Object.assign({}, state, s);
  return state;
}
  
setWatch(e => {
  updateState({ 
    lastPress: e.time,
    lastInterval: e.time - state.lastPress
  });
  useState();
}, BTN, { edge:`rising`,repeat:true,debounce:50 });