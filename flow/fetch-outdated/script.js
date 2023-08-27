
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
  statusEl: document.querySelector(`#status`),
  dataEl: document.querySelector(`#data`)
});

// Updates #status with a timestamped message
const status = (m) => {
  const { statusEl } = settings;
  if (statusEl) statusEl.textContent = new Date().toLocaleTimeString() + ` ` + m;
};

function setup() {
  const { fetcher, dataEl } = settings;

  // When button is clicked...
  document.querySelector(`#btnRequest`)?.addEventListener(`click`, async () => {
    try {
      // Return cached result, or have its callback invoked
      const json = await fetcher();

      // For demo purposes, shove the result into a DOM
      if (dataEl) dataEl.textContent = JSON.stringify(json);
    } catch (error) {
      // Fetch failed
      status(error);
      console.error(error);
    }
  });
};
setup();