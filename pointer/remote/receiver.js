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
  };
};
setup();
