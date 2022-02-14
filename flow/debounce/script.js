import {debounce} from '../../ixfx/flow.js';

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
  document.addEventListener(`pointermove`, moveDebounced);
}
setup();