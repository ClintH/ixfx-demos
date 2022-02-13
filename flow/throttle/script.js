import {throttle} from '../../ixfx/timers.js';

const settings = {
  log: document.getElementById(`log`),
  raw: document.getElementById(`raw`),
  resetBtn: document.getElementById(`btnReset`)
}

const onMove = (elapsedMs, ...args) => {
  const {log} = settings;
  const evt = args[0]; // PointerEvent if we wanted it...
  log.append(`!`);
}

const setup = () => {
  const {log, raw, resetBtn} = settings;
  const moveThrottled = throttle(onMove, 500);

  // Swallow some events to avoid touch screen issues
  document.addEventListener(`contextmenu`, (ev) => ev.preventDefault());

  window.addEventListener(`pointermove`, (ev) => {
    ev.preventDefault();

    // For comparison also show unthrottled
    raw.append(`!`);
    moveThrottled();
  });

  // Reset button
  resetBtn.addEventListener(`click`, () => {
    log.innerHTML = ``;
    raw.innerHTML = ``;
  });
}
setup();