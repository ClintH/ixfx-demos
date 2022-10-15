// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
import { smoothPose, commonPoseSetup, absPose, debugDrawPose } from '../common-pose.js';

const settings = Object.freeze({
  horizontalMirror: true,
  // Ignores points under this threshold
  keypointScoreThreshold: 0.3,

  // Interpolation amount applied per frame (0...1)
  // Lower = less jitter & more latency. Higher = more jitter & lower latency
  smoothingAmt: 0.2,
  remote: new Remote(),
  tickRateMs: 100
});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type {Pose[]} */
  poses: [],
  /** @type {Pose|undefined} */
  smoothedPose: undefined
});

/**
 * Received data from a source
 * @param {Pose[]} poses 
 */
const onData = (poses) => {
  const { smoothingAmt } = settings;

  // Exit if we didn't get any poses
  if (poses.length === 0) return;
  
  // Smooth the first pose
  const smoothedPose = smoothPose(smoothingAmt, state.smoothedPose, poses[0]);

  // Update state with list of all poses,
  // as well as single smoothed pose
  updateState({ 
    poses,
    smoothedPose
  });
};

const tick = () => {
  // Gets called every 100ms.
  // A good place to slowly influence state
};

// Is called at animation speed
const drawState = () => {
  const { smoothedPose } = state;

  const canvasEl = /** @type {HTMLCanvasElement|null}*/(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);
  
  // If there is no smoothed pose, exit out
  if (smoothedPose === undefined) return;

  // Convert coordinates to viewport-relative coordinates
  const smoothedPoseAbs = absPose(smoothedPose, state.bounds, settings.horizontalMirror);

  // Use `debugDrawPose`, defined in common-pose.js
  debugDrawPose(ctx, smoothedPoseAbs);
};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
function clear(ctx) {
  const { width, height } = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
}

const setup = async () => {
  const { remote } = settings;

  // Listen for data from the remote
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onData(d.data);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(`#canvas`, args => {
    updateState({ bounds: args.bounds });
  });

  const drawLoop = () => {
    drawState();
    window.requestAnimationFrame(drawLoop);
  };
  window.requestAnimationFrame(drawLoop);

  setInterval(tick, settings.tickRateMs);

  // Listen for button presses, etc
  commonPoseSetup();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
/**
 * @typedef { import("../../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../../common-vision-source").Box } Box
 * @typedef { import("../../common-vision-source").Pose } Pose
 */
