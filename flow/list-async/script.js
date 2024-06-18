import { continuously } from "../../ixfx/flow.js";
import { log } from '../../ixfx/dom.js';
import { Stacks } from '../../ixfx/collections.js';

let state = {
  toProcess: Stacks.immutable()
};

const settings = Object.freeze({
  processIntervalMs: 1000,
  log: log(`#log`, {
    capacity: 10,
    timestamp: true
  })
});

const processor = continuously(() => {
  // Keeps looping until we've done everything in backlog
  const { log } = settings;
  const { toProcess } = state;

  if (toProcess.isEmpty) return false; // Stack is empty

  // Get top-most item
  const item = toProcess.peek;

  // Put stack without item back into state
  saveState({
    toProcess: toProcess.pop()
  });

  // Do something with item (in this case, print a log message)
  log.log(`🤖 Processing ${item}`);
  return true; // Keep loop running
}, settings.processIntervalMs);

// Adds item to stack
const process = (item) => {
  const { toProcess } = state;
  saveState({
    toProcess: toProcess.push(item)
  });

  // Start if it's not already running
  processor.start();
};

function setup() {
  // Adds three items to backlog
  document.querySelector(`#btnAddItems`)?.addEventListener(`click`, () => {
    const n = performance.now(); // Get a timestamp
    process(`${n} - 1`);    // Add a string, but it could be an object
    process(`${n} - 2`);
    process(`${n} - 3`);
  });
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}