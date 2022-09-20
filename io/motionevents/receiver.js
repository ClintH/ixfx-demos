import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
    
});

const r = new Remote({
  websocket: `wss://${window.location.host}/ws`,
  allowNetwork: true,
  defaultLog: `verbose`
});

r.onData = (msg) => {
  console.log(msg);
  document.getElementById(`data`).innerHTML = JSON.stringify(msg, null, 4);
};
