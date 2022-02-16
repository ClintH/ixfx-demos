/**
 * flow/fetch-poll
 * Demonstrates fetching JSON data from a URL at a specified interval.
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

    status(`Fetched at ${new Date().toLocaleTimeString()}`);

    // For demo purposes, log it
    // But normally you would used state.response elsewhere as needed
    dataEl.innerText = JSON.stringify(state.response);
  } catch (ex) {
    status(ex.message + ` (${new Date().toLocaleTimeString()})`);
    console.error(ex);
  }

}, settings.processIntervalMs).start();

const status = (m) => {
  document.getElementById(`status`).innerText = m;
}