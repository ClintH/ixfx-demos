/**
 * Demonstrates fetching JSON data only when needed
 * (ie because we haven't fetched it yet, or it is too old)
 * https://clinth.github.io/ixfx/modules/Flow.html#updateOutdated
 * 
 * An alternative approach is polling, see fetch-poll demo.
 */
import {updateOutdated} from '../../ixfx/flow.js';

const settings = {
  fetcher: updateOutdated(async elapsedMs => {
    console.log(`Fetch running. Elapsed: ${elapsedMs}`)
    status(`Fetching...`);
    const r = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    status(`Fetched.`);
    return await r.json();
  }, 10 * 1000)
}

const status = (m) => {
  document.getElementById(`status`).innerText = new Date().toLocaleTimeString() + ` ` + m;
}

const setup = () => {
  const {fetcher} = settings;
  document.getElementById(`btnRequest`).addEventListener(`click`, async () => {
    try {
      const json = await fetcher();
      document.getElementById(`data`).innerText = JSON.stringify(json);
    } catch (ex) {
      status(ex);
      console.error(ex);
    }
  });
}
setup();