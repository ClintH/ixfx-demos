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
  window.addEventListener(`pointermove`, moveThrottled);

  // For comparison also show unthrottled
  window.addEventListener(`pointermove`, () => {
    raw.append(`!`);
  });


  resetBtn.addEventListener(`click`, () => {
    log.innerHTML = ``;
    raw.innerHTML = ``;
  });


}
setup();