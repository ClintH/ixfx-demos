import {log, Forms} from '../../../ixfx/dom.js';

const settings = {
  lastEl: document.getElementById(`last`),
  log: log(`#log`, {timestamp: true})
}

/**
 * 
 * @param {KeyboardEvent} ev 
 */
const extract = (ev) => {
  // Pull out some fields from the KeyEvent
  const {altKey, metaKey, ctrlKey, shiftKey, key, code, repeat, type} = ev;
  return {altKey, metaKey, ctrlKey, shiftKey, key, code, repeat, type}
};

/**
 * 
 * @param {KeyboardEvent} ev 
 */
const toString = (ev) => {
  const t = extract(ev);
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

const setup = () => {
  const {log, lastEl} = settings;

  const chkKeydown = Forms.checkbox(`#evKeydown`);
  const chkKeyup = Forms.checkbox(`#evKeyup`);
  const chkKeypress = Forms.checkbox(`#evKeypress`);

  const handle = (ev) => {
    const s = toString(ev);
    log.log(s.split(`\n`).join(``));
    lastEl.innerText = s;
  };

  document.addEventListener(`keydown`, (ev) => {
    if (!chkKeydown.checked) return;
    handle(ev);
  });

  document.addEventListener(`keyup`, (ev) => {
    if (!chkKeyup.checked) return;
    handle(ev);
  });

  document.addEventListener(`keypress`, (ev) => {
    if (!chkKeypress.checked) return;
    handle(ev);
  });

  document.getElementById(`btnLogClear`).addEventListener(`click`, () => {
    log.clear();
  });

};
setup();