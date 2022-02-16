/**
 * Demonstrates fetching JSON data from a URL at a fixed rate using continuously.
 * https://clinth.github.io/ixfx/modules/Flow.html#continuously
 * 
 * One problem with polling is that perhaps we're fetching more often than we actually need
 * to use the newer data. An alternative is demonstrated in `fetch-outdated` where data is only
 * fetched if we haven't gotten it yet, or if it's older than some age. 
 */
import {continuously} from "../../ixfx/flow.js"

const settings = {
  processIntervalMs: 60 * 1000,
}

let state = {
  response: {}
}

continuously(async () => {
  const dataEl = document.getElementById(`data`);

  try {
    status(`Fetching...`);
    const resp = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    state = {
      ...state,
      response: await resp.json()
    }

    status(`Fetched.`);

    // For demo purposes, log it
    // But normally you would used state.response elsewhere as needed
    dataEl.innerText = JSON.stringify(state.response);
  } catch (ex) {
    status(ex.message);
    console.error(ex);

    // You might want to leave the last response in the
    // state. Here we will clear it:
    state = {
      ...state,
      response: {}
    }
  }
}, settings.processIntervalMs).start();

const status = (m) => {
  document.getElementById(`status`).innerText = new Date().toLocaleTimeString() + ` ` + m;
}