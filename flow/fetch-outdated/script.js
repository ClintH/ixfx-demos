/**
 * Demonstrates fetching JSON data only when needed
 * (ie because we haven't fetched it yet, or it is too old)
 * https://clinth.github.io/ixfx/modules/Flow.html#updateOutdated
 * 
 * An alternative approach is polling, see fetch-poll demo.
 */
import { updateOutdated } from '../../ixfx/flow.js';

// Define settings
const settings = Object.freeze({
  // Set up the fetcher. Caches results for 10 seconds.
  fetcher: updateOutdated(async elapsedMs => {
    console.log(`Fetch running. Elapsed: ${elapsedMs}`);
    status(`Fetching...`);
    const r = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    status(`Fetched.`);
    return await r.json();
  }, 10 * 1000),
  statusEl: document.getElementById(`status`),
  dataEl: document.getElementById(`data`)
});

// Updates #status with a timestamped message
const status = (m) => {
  const { statusEl } = settings;
  if (statusEl) statusEl.innerText = new Date().toLocaleTimeString() + ` ` + m;
};

// Setup
const setup = () => {
  const { fetcher, dataEl } = settings;

  // When button is clicked...
  document.querySelector(`#btnRequest`)?.addEventListener(`click`, async () => {
    try {
      // Return cached result, or have its callback invoked
      const json = await fetcher();

      // For demo purposes, shove the result into a DOM
      if (dataEl) dataEl.innerText = JSON.stringify(json);
    } catch (ex) {
      // Fetch failed
      status(ex);
      console.error(ex);
    }
  });
};
setup();