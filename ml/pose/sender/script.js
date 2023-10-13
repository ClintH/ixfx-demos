import * as MoveNet from "../Poses.js";

// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const params = (new URL(document.location.toString())).searchParams;
const peerId = params.get(`peerId`);
const remote = new Remote({
  allowNetwork: false,
  // Set peer id if it's not null
  peerId: peerId === null ? undefined : peerId
  // websocket: `wss://${window.location.host}/ws`
});

// Default config for tracking 6 poses
const moveNetConfig = MoveNet.Models.MoveNetTypes.defaultMoveNetConfig(6);
/** @type Partial<MoveNet.Config> */
const config = {
  moveNet: moveNetConfig,
  debug:false,
  recordSamplingMs:50,
  preferredCameraSize: {
    width: 800,
    height: 600
  }
};
const ml = MoveNet.mount(`#container`, config);  
ml.onPoseData =(data) => {
  if (data.length === 0) return;
  remote.broadcast(data);
};

