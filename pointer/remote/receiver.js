import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: true
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

function setText(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.innerText === text) return;
  el.innerText = text;
}