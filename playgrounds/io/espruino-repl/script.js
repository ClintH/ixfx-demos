/**
 * This code isn't meant for extending - it's just meant for running in
 * the browser, providing a REPL environment
 */
import { Espruino } from '../../../ixfx/io.js';
import { log } from '../../../ixfx/dom.js';
import { forEachAsync } from '../../../ixfx/flow.js';
import { Stacks } from '../../../ixfx/collections.js';

const settings = Object.freeze({
  log: log(`#log`, {
    css: `
    .recv { color: hsl(var(--hue-primary), 88%, 96%);}
    .meta { color: hsl(var(--hue-secondary), 0%, 76%);}
    `,
    reverse: true
  }),
  
  txtInput: /** @type {HTMLInputElement} */(document.getElementById(`txtInput`))
});

let state = Object.freeze({
  /** @type {'puck'|'pico'} */
  board: `puck`,
  /** @type Espruino.EspruinoDevice|undefined */
  espruino: undefined,
  history: Stacks.mutable(),
  /** @type {number} */
  historyIndex: 0
});

const inputSel = () => {
  const { txtInput } = settings;
  txtInput.focus();
  txtInput.setSelectionRange(0, txtInput.value.length);
};

const inputSet = (what) => {
  const { txtInput } = settings;
  txtInput.value = what;
  txtInput.setSelectionRange(0, txtInput.value.length);
};

const setDisconnected = (disconnected) => {
  const { txtInput } = settings;
  if (disconnected) {
    document.body.classList.add(`disconnected`);
    txtInput.setAttribute(`disabled`, `true`);
    document.getElementById(`btnSend`)?.setAttribute(`disabled`, `true`);
    document.getElementById(`btnConnect`)?.removeAttribute(`disabled`);
    document.getElementById(`btnDisconnect`)?.setAttribute(`disabled`, `true`);
  } else {
    document.body.classList.remove(`disconnected`);
    txtInput.removeAttribute(`disabled`);
    document.getElementById(`btnSend`)?.removeAttribute(`disabled`);
    document.getElementById(`btnConnect`)?.setAttribute(`disabled`, `true`);
    document.getElementById(`btnDisconnect`)?.removeAttribute(`disabled`);
    inputSel();
  }
};

const send = async (what) => {
  const { log, txtInput } = settings;
  const { espruino, history } = state;
  if (espruino === undefined) return;

  if (what === undefined) what = txtInput.value;
  if (what.endsWith(`;`)) what = what.substring(0, what.length - 1);

  // Only add to history if it's different
  if (history.peek !== what) history.push(what);
  updateState({
    history,
    historyIndex: history.data.length - 1
  });
  log.log(`> ${what}`)?.classList.add(`sent`);

  try {
    const result = await espruino.eval(what, { timeoutMs: 2000, assumeExclusive: true, debug: false });
    log.log(`< ${result}`)?.classList.add(`recv`);
  } catch (ex) {
    console.log(ex);
    log.error(ex);
  }
  inputSel();
};

document.getElementById(`btnDemo`)?.addEventListener(`click`, async () => {
  const { log } = settings;
  const { espruino } = state;
  const demosPuck = `
  // https://www.espruino.com/Puck.js
  // LED on/off
  LED1.set()
  LED1.reset()
  // Read button state
  BTN.read()
  // Read magnetometer
  Puck.mag()
  // Read accelerometer
  Puck.accel()
  // Read light sensor
  Puck.light()
  // Read temperature
  E.getTemperature()`;

  const demosPico = `
  // http://www.espruino.com/Pico
  // LED on/off
  LED1.set()
  LED1.reset()
  // Read analog pin 5
  analogRead(A5)
  // Read button state
  digitalRead(BTN)
  `;

  const demos = state.board === `pico` ? demosPico : demosPuck;

  const connected = !(espruino === undefined || !espruino.isConnected);
  if (!connected) {
    log.log(`// Connect to an Espruino to run this for real`);
  }

  await forEachAsync(demos.trim().split(`\n`), async (demo) => {
    if (!demo) return;
    demo = demo.trim();
    if (demo.startsWith(`//`) || (espruino === undefined || !espruino.isConnected)) {
      const el = log.log(demo);
      el?.classList.add(`meta`);
    } else {
      await send(demo);
    }
    return;
  }, connected ? 1000 : 400);
});

document.getElementById(`btnSend`)?.addEventListener(`click`, () => send());

document.getElementById(`btnDisconnect`)?.addEventListener(`click`, () => {
  const { espruino } = state;
  if (espruino === undefined) return;
  espruino.disconnect();
});

document.getElementById(`btnConnect`)?.addEventListener(`click`, async () => {
  const { log } = settings;

  const boardSel = /** @type HTMLInputElement */(document.getElementById(`board`)).value;
  if (boardSel === `pico` || boardSel === `puck`) {
    updateState({ board: boardSel });
    localStorage.setItem(`board`, boardSel);
  }

  try {
    if (state.board === `puck`) {
      const espruino = await Espruino.connectBle();
      updateState({ espruino  });
    } else if (state.board === `pico`) {
      const espruino = await Espruino.serial();
      updateState({ espruino });
    }

  } catch (ex) {
    log.error(ex);
  }
});


const setup = () => {
  const { txtInput } = settings;
  setDisconnected(true);

  txtInput.addEventListener(`keyup`, evt => {
    const { history } = state;
    let { historyIndex } = state;
    if (evt.key === `ArrowUp` || evt.key === `ArrowDown`) {
      if (evt.key === `ArrowUp`) {
        historyIndex = Math.max(0, historyIndex - 1);
      } else if (evt.key === `ArrowDown`) {
        historyIndex = Math.min(history.data.length - 1, historyIndex + 1);
      }
      updateState({ historyIndex });
      //console.log(historyIndex + `. ` + history.data[historyIndex]);
      inputSet(history.data[historyIndex]);
      evt.preventDefault();
    } else if (evt.key === `Enter`) {
      send();
      evt.preventDefault();
    }
  });

  const defaultBoard = localStorage.getItem(`board`);
  if (defaultBoard === `pico` || defaultBoard === `puck`) {
    /** @type HTMLSelectElement */(document.getElementById(`board`)).value = defaultBoard;
    updateState({ board: defaultBoard });

  }
};
setup();

function onEspruinoChange(e) {
  const { log } = settings;

  log.log(`State: ${e.newState}`)?.classList.add(`meta`);
  if (e.newState === `connected`) {
    setDisconnected(false);
  } else {
    setDisconnected(true);
  }
}
/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  const prevEspruino = state.espruino;

  state = Object.freeze({
    ...state,
    ...s
  });

  if (s.espruino) {
    if (prevEspruino) {
      prevEspruino.removeEventListener(`change`, onEspruinoChange);
    }

    s.espruino.addEventListener(`change`, onEspruinoChange);
    setDisconnected(false);
  }
}