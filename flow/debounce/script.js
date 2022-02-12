import {debounce} from '../../ixfx/timers.js';

const settings = {
  log: document.getElementById(`log`)
}

const onMove = (elapsedMs, ...args) => {
  const {log} = settings;
  const evt = args[0]; // PointerEvent if we wanted it...
  log.append(`Move!`);
}

const setup = () => {
  const moveDebounced = debounce(onMove, 1000);
  window.addEventListener(`pointermove`, moveDebounced);
}
setup();