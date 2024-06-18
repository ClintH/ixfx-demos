import { TaskQueueMutable, sleep } from "../../ixfx/flow.js";
import { log } from '../../ixfx/dom.js';

const settings = Object.freeze({
  processIntervalMs: 1000,
  log: log(`#log`, {
    capacity: 10,
    timestamp: true
  })
});

/**
 * @typedef {{
 * total:number
 * }} State
 */

/** @type State */
let state = Object.freeze({
  total: 0
});

const addTask = () => {
  const { log } = settings;
  let { total } = state;
  const timestamp = new Date().toLocaleTimeString();
  total++;
  saveState({ total });
  TaskQueueMutable.shared.enqueue(async () => {
    log.log(`${timestamp} - ${total}`);
    await sleep(2000);
  });

};

function setup() {
  const { log } = settings;

  document.querySelector(`#btnAddTask`)?.addEventListener(`click`, () => {
    addTask();
  });

  TaskQueueMutable.shared.addEventListener(`empty`, () => {
    log.log(`Queue empty`);
  });

  TaskQueueMutable.shared.addEventListener(`started`, () => {
    log.log(`Queue started`);
  });
};
setup();

/**
 * Update state
 * @param {Partial<typeof state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}