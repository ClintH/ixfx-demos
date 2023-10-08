import * as Poses from '../../lib/bundle.js';
import * as Types from '../../lib/Types.js';
import * as MoveNet from '../../lib/models/Types.js';

// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const remote = new Remote({
  allowNetwork: false,
  // websocket: `wss://${window.location.host}/ws`
});

// Default config for tracking 6 poses
const moveNetConfig = /** @type MoveNet.MoveNetConfig */(Poses.Models.MoveNetTypes.defaultMoveNetConfig(6));
/** @type Types.Config */
const config = {
  moveNet: moveNetConfig,
  debug:false,
  recordSamplingMs:50
};
const ml = Poses.mount(`#container`, config);  
ml.onPoseData =(/** @type Types.Pose[] */data) => {
  if (data.length === 0) return;
  remote.broadcast(data);
};

