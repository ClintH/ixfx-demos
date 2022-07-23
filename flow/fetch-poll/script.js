/**
 * Demonstrates fetching JSON data from a URL at a fixed rate using 
 * continuously.
 * https://clinth.github.io/ixfx/modules/Flow.html#continuously
 * 
 * One problem with polling is that perhaps we're fetching more often
 * than we actually need to use the newer data. An alternative is 
 * demonstrated in `fetch-outdated` where data is only fetched if we 
 * haven't gotten it yet, or if it's older than some age. 
 */
import { continuously } from "../../ixfx/flow.js";

// Define settings
const settings = Object.freeze({
  // How often to fetch data
  fetchIntervalMs: 30 * 1000,
  dataEl: document.getElementById(`data`),
  statusEl: document.getElementById(`status`)
});

// Initialises state. It will keep the last data fetched
let state = {
  response: {}
};

/**
 * Update state
 * @param {Partial<state>} s 
 */
const updateState = (s) => {
  state = {
    ...state,
    ...s
  };
};

continuously(async () => {
  const { dataEl } = settings;
  try {
    // Try to fetch from URL
    status(`Fetching...`);
    const resp = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);

    // Add the JSON to state
    updateState({
      response: await resp.json()
    });

    // For demo purposes, we'll print it to the screen, but normally
    // you would use state.response elsewhere as needed, outside of
    // this callback
    if (dataEl) dataEl.innerText = JSON.stringify(state.response);
    status(`Fetched.`);
  } catch (ex) {
    // Uh-oh, an error happened!
    // You might want to leave the last response in the
    // state. But we will clear it:
    updateState({
      response: {}
    });

    status(ex.message);
    console.error(ex);
  }
}, settings.fetchIntervalMs).start();

// Puts a timestamped message in the #status element
const status = (m) => {
  const { statusEl } = settings;
  if (statusEl) statusEl.innerText = new Date().toLocaleTimeString() + ` ` + m;
};