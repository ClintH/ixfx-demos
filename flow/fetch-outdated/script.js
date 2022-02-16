/**
 * Demonstrates fetching JSON data only when needed
 * (ie because we haven't fetched it yet, or it is too old)
 * https://clinth.github.io/ixfx/modules/Flow.html#updateOutdated
 * 
 * An alternative approach is polling, see fetch-poll demo.
 */
import {updateOutdated} from '../../ixfx/flow.js';

// Define settings
const settings = {
  // Set up the fetcher. Caches results for 10 seconds.
  fetcher: updateOutdated(async elapsedMs => {
    console.log(`Fetch running. Elapsed: ${elapsedMs}`)
    status(`Fetching...`);
    const r = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    status(`Fetched.`);
    return await r.json();
  }, 10 * 1000)
}

// Updates #status with a timestamped message
const status = (m) => {
  document.getElementById(`status`).innerText = new Date().toLocaleTimeString() + ` ` + m;
}

// Setup
const setup = () => {
  const {fetcher} = settings;

  // When button is clicked...
  document.getElementById(`btnRequest`).addEventListener(`click`, async () => {
    try {
      // Return cached result, or have its callback invoked
      const json = await fetcher();

      // For demo purposes, shove the result into a DOM
      document.getElementById(`data`).innerText = JSON.stringify(json);
    } catch (ex) {
      // Fetch failed
      status(ex);
      console.error(ex);
    }
  });
}
setup();