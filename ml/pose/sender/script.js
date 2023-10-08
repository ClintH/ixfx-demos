import * as Poses from '../../lib/bundle.js';
import * as Types from '../../lib/Types.js';

// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  ml: Poses.mount(`#container`),
  remote: new Remote({
    allowNetwork: false,
    // websocket: `wss://${window.location.host}/ws`
  })
});

function setup() {
  const { ml, remote } = settings;
  
  ml.onPoseData =(/** @type Types.Pose[] */data) => {
    if (data.length === 0) return;
    remote.broadcast(data);
  };
}

setup();
