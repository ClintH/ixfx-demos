/**
 * This playground is not meant for extending in code
 */
import {Espruino} from '../../../ixfx/io.js';
import snarkdown from './snarkdown.es.js';
import * as Dom from '../../../ixfx/dom.js';
import {Plot2, Colour} from '../../../ixfx/visual.js';

Split(['#editor', '#data'], {
  sizes: [50, 50],
  direction: `horizontal`
})

Split(['#plot', '#stream'], {
  sizes: [50, 50],
  direction: `vertical`
})

let state = {
  jsonWarning: false,
  clearedWelcome: false,
  p: undefined,
  frozen: false
};

const settings = {
  log: Dom.log(`#log`, {
    capacity: 50,
    timestamp: true
  }),
  // @ts-ignore
  plot: new Plot2.Plot(document.getElementById(`plotCanvas`), {
    autoSize: true,
    axisColour: Colour.getCssVariable(`fg`)
  }),
  txtCode: document.getElementById(`txtCode`),
  dlgHelp: document.getElementById(`dlgHelp`)
}

const onConnected = (connected) => {
  if (connected) {
    document.getElementById(`btnConnect`).setAttribute(`disabled`, `true`);
    document.getElementById(`btnSend`).removeAttribute(`disabled`);
  } else {
    document.getElementById(`btnSend`).setAttribute(`disabled`, `true`);
    document.getElementById(`btnConnect`).removeAttribute(`disabled`);
  }
}

const logWelcome = () => {
  const {log} = settings;
  log.log(`eg: Bluetooth.println(JSON.stringify(v));`);
  log.log(`eg: let v =  { light: Puck.light() };`)
  log.log(`Once connected, tap 'Send' to upload code. Code should send back string-formatted JSON to be properly displayed in this playground.`);
  log.log(`Power on your Espruino, and tap 'Connect'.`);
}

const connect = async () => {
  const {log, plot} = settings;
  let p;
  try {
    // Connect to Puck
    p = await Espruino.puck();
    state.p = p;
    const onData = (evt) => {
      const data = evt.data.trim(); // Remove line breaks etc

      if (!data.startsWith(`{`) || !data.endsWith(`}`)) {
        if (!state.jsonWarning) {
          console.warn(`Plotter expects JSON response`);
          state.jsonWarning = true;
        } else {
          state.jsonWarning = true;
        }
        log.log(data);
        return;
      }

      try {
        const d = JSON.parse(data);
        if (!state.frozen) {
          log.log(data);
          plot.plot(d);
          plot.update();
        }
      } catch (ex) {
        console.warn(ex);
      }
    }
    // Listen for events
    p.addEventListener(`change`, evt => {
      log.log(`${evt.priorState} -> ${evt.newState}`);
      onConnected(evt.newState === `connected`);
    });

    p.addEventListener(`data`, onData);
    if (!state.clearedWelcome) {
      log.clear();
      state.clearedWelcome = true;
    }
    plot.clear();
    plot.frozen = false;
    if (p.isConnected) onConnected(true);

  } catch (ex) {
    console.error(ex);
  }
}


const send = () => {
  const {p} = state;
  const {log, plot} = settings;
  if (p === undefined) return; // No Espruino

  // @ts-ignore
  const code = txtCode.value.trim();
  const codeWithSuffix = code + `NRF.on('disconnect',()=>reset());`;
  console.log(code);

  try {
    plot.clear();
    p.writeScript(codeWithSuffix);
    localStorage.setItem(`last`, code);
  } catch (ex) {
    log.error(ex);
  }
};

const setup = () => {
  const {log, plot, txtCode, dlgHelp} = settings;

  // Setup plotter
  plot.axisX.visible = false;
  plot.axisY.visible = false;

  // Show last code
  const lastCode = localStorage.getItem(`last`);
  if (lastCode !== null) txtCode.value = lastCode;

  // Setup UI
  Dom.Forms.textAreaKeyboard(txtCode);


  document.getElementById(`btnClear`).addEventListener(`click`, () => {
    log.clear();
    plot.clear();
  });
  document.getElementById(`btnHelp`).addEventListener(`click`, async evt => {
    const contentEl = dlgHelp.querySelector('section');
    dlgHelp.showModal();
    try {
      let resp = await fetch('README.md');
      if (resp.ok) {
        const md = await resp.text();
        contentEl.innerHTML = snarkdown(md);
      } else {
        contentEl.innerHTML = 'Could not load help :/';
        console.log(resp);
      }
    } catch (ex) {
      console.log(ex);
      contentEl.innerHTML = `Could not load help :/`;
    }
  });
  document.getElementById(`btnHelpClose`).addEventListener(`click`, evt => {
    dlgHelp.close();
  });

  document.getElementById(`btnFreeze`).addEventListener(`click`, () => {
    state.frozen = !state.frozen;
  });
  document.getElementById(`btnSend`).addEventListener(`click`, send);
  document.getElementById(`txtCode`).addEventListener(`keyup`, evt => {
    if (evt.key === `Enter` && evt.ctrlKey) {
      send();
    }
  });


  document.getElementById(`btnConnect`).addEventListener(`click`, connect);
  onConnected(false);

  logWelcome();
}
setup();

// Test
/*
setInterval(() => {
  const {log, plot} = settings;
  const d = {
    acc: {x: 6995, y: -3834, z: -1644},
    gyro: {x: -35, y: 102, z: 213 * Math.random()}
  }
  if (!plot.frozen) {
    log.log(d);
    plot.plot(d);
    plot.update();
  }
}, 100);
*/