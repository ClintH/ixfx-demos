import { log, Forms } from '../../ixfx/dom.js';

const settings = Object.freeze({
  lastEl: /** @type HTMLElement */(document.querySelector(`#last`)),
  log: log(`#log`, { timestamp: true })
});

/**
 * 
 * @param {KeyboardEvent} event 
 */
const extract = (event) => {
  // Pull out some fields from the KeyEvent
  const { altKey, metaKey, ctrlKey, shiftKey, key, code, repeat, type } = event;
  return { altKey, metaKey, ctrlKey, shiftKey, key, code, repeat, type };
};

/**
 * 
 * @param {KeyboardEvent} event
 */
const toString = (event) => {
  const t = extract(event);
  return `{
    key: ${t.key},
    code: ${t.code},
    altKey: ${t.altKey},
    metaKey: ${t.metaKey},
    ctrlKey: ${t.ctrlKey},
    shiftKey: ${t.shiftKey},
    repeat: ${t.repeat},
    type: ${t.type}
  }`;
};

const onMotion = (event) => {
  console.log(event);
};

const startEvents = async () => {
  // @ts-ignore
  if (typeof DeviceMotionEvent.requestPermission === `function`) {
  // @ts-ignore
    const p = await DeviceMotionEvent.requestPermission();
    if (p === `granted`) {
      window.addEventListener(`devicemotion`, onMotion);
    } else {
      console.log(`Permission denied`);
    }
  } else {
    window.addEventListener(`devicemotion`, onMotion);
  }
};

const setup = () => {
  const { log, lastEl } = settings;

  const chkKeydown = Forms.checkbox(`#evKeydown`);
  const chkKeyup = Forms.checkbox(`#evKeyup`);
  const chkKeypress = Forms.checkbox(`#evKeypress`);

  const handle = (event) => {
    const s = toString(event);
    log.log(s.split(`\n`).join(``));
    lastEl.textContent = s;
  };

  document.addEventListener(`keydown`, (event) => {
    if (!chkKeydown.checked) return;
    handle(event);
  });

  document.addEventListener(`keyup`, (event) => {
    if (!chkKeyup.checked) return;
    handle(event);
  });

  document.addEventListener(`keypress`, (event) => {
    if (!chkKeypress.checked) return;
    handle(event);
  });

  document.querySelector(`#btnLogClear`)?.addEventListener(`click`, () => {
    log.clear();
  });

  document.querySelector(`#btnStart`)?.addEventListener(`click`, startEvents);
};
setup();