/**
 * This code isn't meant for extending - it's just meant for running in
 * the browser, providing a REPL environment
 */
import { Espruino } from '../../../ixfx/io.js';
import { log } from '../../../ixfx/dom.js';
import { forEachAsync } from '../../../ixfx/flow.js';
import { stackMutable } from '../../../ixfx/collections.js';

const settings = Object.freeze({
  log: log(`#log`, {
    css: `
    .recv { color: hsl(var(--hue-primary), 88%, 96%);}
    .meta { color: hsl(var(--hue-secondary), 0%, 76%);}
    `,
    reverse: true
  }),
  
  txtInput: /** @type {HTMLInputElement|null} */(document.getElementById(`txtInput`))
});

let state = {
  espruino: undefined,
  history: stackMutable(),
  historyIndex: 0
};

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
    document.getElementById(`btnSend`).setAttribute(`disabled`, `true`);
    document.getElementById(`btnConnect`).removeAttribute(`disabled`);
    document.getElementById(`btnDisconnect`).setAttribute(`disabled`, `true`);
  } else {
    document.body.classList.remove(`disconnected`);
    txtInput.removeAttribute(`disabled`);
    document.getElementById(`btnSend`).removeAttribute(`disabled`);
    document.getElementById(`btnConnect`).setAttribute(`disabled`, `true`);
    document.getElementById(`btnDisconnect`).removeAttribute(`disabled`);
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
  state = {
    ...state,
    history,
    historyIndex: history.data.length - 1
  };
  log.log(`> ${what}`).classList.add(`sent`);

  try {
    const result = await espruino.eval(what, { timeoutMs: 1000, assumeExclusive: true });
    log.log(`< ${result}`).classList.add(`recv`);
  } catch (ex) {
    log.error(ex);
  }
  inputSel();
};

document.getElementById(`btnDemo`).addEventListener(`click`, async () => {
  const { log } = settings;
  const { espruino } = state;
  const demos = `
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

  const connected = !(espruino === undefined || !espruino.isConnected);
  if (!connected) {
    log.log(`// Connect to an Espruino to run this for real`);
  }

  await forEachAsync(demos.trim().split(`\n`), async (demo) => {
    demo = demo.trim();
    if (demo.startsWith(`//`) || (espruino === undefined || !espruino.isConnected)) {
      log.log(demo).classList.add(`meta`);
    } else {
      await send(demo);
    }
    return true;
  }, connected ? 1000 : 400);
});

document.getElementById(`btnSend`).addEventListener(`click`, () => send());

document.getElementById(`btnDisconnect`).addEventListener(`click`, () => {
  const { espruino } = state;
  if (espruino === undefined) return;
  espruino.disconnect();
});

document.getElementById(`btnConnect`).addEventListener(`click`, async () => {
  const { log } = settings;

  try {
    // Connect to a generic Espruino
    const espruino = await Espruino.connect();
    state = {
      ...state,
      espruino
    };

    espruino.addEventListener(`change`, e => {
      log.log(`State: ${e.newState}`).classList.add(`meta`);
      if (e.newState === `connected`) {
        setDisconnected(false);
      } else {
        setDisconnected(true);
      }
    });
    setDisconnected(false);
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
      state = { ...state, historyIndex };
      console.log(historyIndex + `. ` + history.data[historyIndex]);
      inputSet(history.data[historyIndex]);
      evt.preventDefault();
    } else if (evt.key === `Enter`) {
      send();
      evt.preventDefault();
    }
  });
};
setup();