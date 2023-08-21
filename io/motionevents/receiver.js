import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({});

const r = new Remote({
  websocket: `wss://${window.location.host}/ws`,
  allowNetwork: true,
  defaultLog: `verbose`
});

r.onData = (message) => {
  console.log(message);
  const element = /** @type HTMLElement */(document.querySelector(`#data`));
  if (!element) return;
  element.innerHTML = JSON.stringify(message, undefined, 4);
};
