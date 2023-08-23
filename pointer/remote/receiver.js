// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: true,
    websocket: `ws://${window.location.hostname}:8080/ws`
  })
});

const setup = () => {
  const { remote } = settings;
  remote.onData = (d) => {
    console.log(d);
    setText(`remote-data`,JSON.stringify(d));
  };
};
setup();

function setText(id, message) {
  const element =  /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element && element.textContent !== message) {
    element.textContent = message;
  }
}