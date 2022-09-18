/**
 * This playground is not meant for extending in code
 */
import { Espruino } from '../../../ixfx/io.js';
import snarkdown from './snarkdown.es.js';
import * as Dom from '../../../ixfx/dom.js';
import { Plot2, Colour } from '../../../ixfx/visual.js';

//eslint-disable-next-line no-undef
Split([ `#editor`, `#data` ], {
  sizes: [ 50, 50 ],
  direction: `horizontal`
});

//eslint-disable-next-line no-undef
Split([ `#plot`, `#stream` ], {
  sizes: [ 50, 50 ],
  direction: `vertical`
});

let state = Object.freeze({
  /** @type {'puck'|'pico'} */
  board: `puck`,
  /** @type {boolean} */
  jsonWarning: false,
  /** @type {boolean} */
  clearedWelcome: false,
  /** @type {Espruino.EspruinoDevice|undefined} */
  p: undefined,
  /** @type {boolean} */
  frozen: false
});

const settings = Object.freeze({
  puckIntro: `
Puck.accelOn(12.5);
Puck.on('accel', (a) => {
  Bluetooth.println(JSON.stringify(a));
});`,
  picoIntro: `
setInterval(() => {
  const data = { x: analogRead(A5) };
  USB.println(JSON.stringify(data));
}, 500);`,
  log: Dom.log(`#log`, {
    capacity: 50,
    timestamp: true
  }),
  // @ts-ignore
  plot: new Plot2.Plot(document.getElementById(`plotCanvas`), {
    autoSize: true,
    axisColour: Colour.getCssVariable(`fg`)
  }),
  txtCode: /** @type {HTMLTextAreaElement} */(document.getElementById(`txtCode`)),
  dlgHelp: /** @type {HTMLDialogElement} */(document.getElementById(`dlgHelp`))
});

const onConnected = (connected) => {
  const { plot } = settings;

  if (connected) {
    plot.clear();
    plot.frozen = false;
    document.getElementById(`btnConnect`)?.setAttribute(`disabled`, `true`);
    document.getElementById(`btnSend`)?.removeAttribute(`disabled`);
  } else {
    document.getElementById(`btnSend`)?.setAttribute(`disabled`, `true`);
    document.getElementById(`btnConnect`)?.removeAttribute(`disabled`);
  }
};

const onData = (evt) => {
  const { log, plot } = settings;

  const data = evt.data.trim(); // Remove line breaks etc

  if (!data.startsWith(`{`) || !data.endsWith(`}`)) {
    if (!state.jsonWarning) {
      console.warn(`Plotter expects JSON response. Got: ${data}`);
      updateState({ jsonWarning: true });
    } else {
      updateState({ jsonWarning: true });
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
};

const logWelcome = () => {
  const { log } = settings;
  log.log(`eg: Bluetooth.println(JSON.stringify(v));`);
  log.log(`eg: let v =  { light: Puck.light() };`);
  log.log(`Once connected, tap 'Send' to upload code. Code should send back string-formatted JSON to be properly displayed in this playground.`);
  log.log(`Power on your Espruino, and tap 'Connect'.`);
};

const connect = async () => {
  const { log, plot } = settings;
  let p;

  const boardSel = /** @type HTMLInputElement */(document.getElementById(`board`)).value;
  if (boardSel === `pico` || boardSel === `puck`) {
    updateState({ board: boardSel });
    localStorage.setItem(`board`, boardSel);
  }

  try {
    if (state.board === `puck`) {
      const p = await Espruino.connectBle();
      updateState({ p  });
    } else if (state.board === `pico`) {
      const p = await Espruino.serial();
      updateState({ p });
    }

    if (!state.clearedWelcome) {
      log.clear();
      updateState({ clearedWelcome: true });
    }
  } catch (ex) {
    console.error(ex);
  }
};


const send = () => {
  const { p } = state;
  const { log, plot,txtCode } = settings;
  if (p === undefined) return; // No Espruino

  // @ts-ignore
  const code = txtCode.value.trim();
  const codeWithSuffix = code + (state.board === `puck` ? `NRF.on('disconnect',()=>reset());` : ``);
  console.log(code);

  try {
    plot.clear();
    p.writeScript(codeWithSuffix);
    localStorage.setItem(`last-${state.board}`, code);
  } catch (ex) {
    log.error(ex);
  }
};

const setup = () => {
  const { log, plot, txtCode, dlgHelp } = settings;

  const boardSelEl = /** @type HTMLSelectElement */(document.getElementById(`board`));
  const defaultBoard = localStorage.getItem(`board`);
  if (defaultBoard === `pico` || defaultBoard === `puck`) {
    boardSelEl.value = defaultBoard;
    updateState({ board: defaultBoard });
  }

  // Setup plotter
  plot.axisX.visible = false;
  plot.axisY.visible = false;

  // Setup UI
  Dom.Forms.textAreaKeyboard(txtCode);

  document.getElementById(`btnClear`)?.addEventListener(`click`, () => {
    log.clear();
    plot.clear();
  });
  document.getElementById(`btnHelp`)?.addEventListener(`click`, async evt => {
    const contentEl = dlgHelp.querySelector(`section`);
    if (!contentEl) return;
    dlgHelp.showModal();
    try {
      let resp = await fetch(`README.md`);
      if (resp.ok) {
        const md = await resp.text();
        contentEl.innerHTML = snarkdown(md);
      } else {
        contentEl.innerHTML = `Could not load help :/`;
        console.log(resp);
      }
    } catch (ex) {
      console.log(ex);
      contentEl.innerHTML = `Could not load help :/`;
    }
  });
  document.getElementById(`btnHelpClose`)?.addEventListener(`click`, evt => {
    dlgHelp.close();
  });

  document.getElementById(`btnFreeze`)?.addEventListener(`click`, () => {
    updateState({ frozen: !state.frozen });
  });
  document.getElementById(`btnSend`)?.addEventListener(`click`, send);
  document.getElementById(`txtCode`)?.addEventListener(`keyup`, evt => {
    if (evt.key === `Enter` && evt.ctrlKey) {
      send();
    }
  });


  document.getElementById(`btnConnect`)?.addEventListener(`click`, connect);
  onConnected(false);

  logWelcome();
  
  boardSelEl.addEventListener(`change`, evt => {
    updateInitialCode();
  });
};
setup();
updateInitialCode();

function updateInitialCode() {
  const {  txtCode } = settings;

  const boardSelEl = /** @type HTMLSelectElement */(document.getElementById(`board`));

  const initialCode = boardSelEl.value === `pico` ? settings.picoIntro : settings.puckIntro;
  
  // Show last code
  const lastCode = localStorage.getItem(`last-${state.board}`);
  if (lastCode === null) {
    txtCode.value = initialCode.trim();
  } else {
    txtCode.value = lastCode;
  }
}

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  const prevEspruino = state.p;

  state = Object.freeze({
    ...state,
    ...s
  });

  if (s.p) {
    console.log(`connected`);
    if (prevEspruino) {
      prevEspruino.removeEventListener(`change`, onEspruinoChange);
      prevEspruino.removeEventListener(`data`, onData);

    }

    // Listen for events
    s.p.addEventListener(`change`, onEspruinoChange);
    s.p.addEventListener(`data`, onData);

    if (s.p.isConnected) onConnected(true);

  }
}

function onEspruinoChange(evt) {
  const { log } = settings;
  log.log(`${evt.priorState} -> ${evt.newState}`);
  onConnected(evt.newState === `connected`);
}

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