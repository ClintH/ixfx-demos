import { throttle } from '../../ixfx/flow.js';

const settings = Object.freeze({
  log: document.querySelector(`#log`),
  raw: document.querySelector(`#raw`),
  resetBtn: document.querySelector(`#btnReset`)
});

const onMove = (elapsedMs, ...arguments_) => {
  const { log } = settings;
  
  //console.log(`Elapsed: ${elapsedMs}`);
  //console.log(args);

  /** @type {PointerEvent} */
  const pointerEvent = arguments_[0];

  log?.append(`!`);
};

function setup() {
  const { log, raw, resetBtn } = settings;
  const moveThrottled = throttle(onMove, 500);

  // Swallow some events to avoid touch screen issues
  document.addEventListener(`contextmenu`, (event) => event.preventDefault());

  document.addEventListener(`pointermove`, (event) => {
    event.preventDefault();

    // For comparison also show unthrottled
    raw?.append(`!`);
    moveThrottled(event);
  });

  // Reset button
  resetBtn?.addEventListener(`click`, () => {
    if (log) log.innerHTML = ``;
    if (raw) raw.innerHTML = ``;
  });
};
setup();