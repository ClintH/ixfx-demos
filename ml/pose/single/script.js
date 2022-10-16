// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
import * as CommonPose from '../common-pose.js';

const settings = Object.freeze({
  horizontalMirror: true,
  // Interpolation amount applied per frame (0...1)
  // Lower = less jitter & more latency. Higher = more jitter & lower latency
  smoothingAmt: 0.2,
  remote: new Remote(),
  tickRateMs: 100,
  /** @type {import("../common-pose.js").SanityChecks} */
  sanityCheck: {
    anklesBelowKnees: true,
    kneesBelowHip: true,
    shouldersBelowFace: true,
    hipBelowShoulders: true,
    scoreThreshold: 0.6
  }
});

let state = Object.freeze({
  /**
   * Bounds of screen
   */
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** 
   * All poses received from source
   * @type {Pose[]} */
  poses: [],
  /**
   * Processor of pose we're tracking
   */
  firstPoseProcessor: CommonPose.poseProcessor(settings.smoothingAmt, settings.sanityCheck),
  /** 
   * Processed first pose
   * @type {Pose|undefined} */
  firstPose:undefined
});


/**
 * Received data from a source
 * @param {Pose[]} poses 
 */
const onData = (poses) => {
  const { firstPoseProcessor } = state;

  // Exit if we didn't get any poses
  if (poses.length === 0) return;
  
  // Try to get the pose with same ID as before.
  let targetPose;
  if (firstPoseProcessor.id) {
    targetPose = poses.find(p=>p.id === firstPoseProcessor.id);
  }

  // Couldn't find target pose, or we haven't yet processed anything
  if (!targetPose) {
    // Return an array of [[pose1,kp],[pose2,kp] ...]
    // Sorted by 'nose' keypoint's X value
    const sorted = CommonPose.getSortedKeypointsByX(poses, `nose`);

    // We want the leftmost pose
    targetPose = sorted[0][0];
  }

  // Send to processor:
  // Sanity check keypoint location, removes low confidence points and smoothes pose
  const processed = firstPoseProcessor.process(targetPose);
  
  // Update state with list of all poses
  // as well as output of pose processor
  updateState({ 
    poses,
    firstPose: processed
  });
};


const tick = () => {
  // Gets called every 100ms.
  // A good place to slowly influence state
};

// Is called at animation speed
const drawState = () => {
  const { firstPose } = state;

  const canvasEl = /** @type {HTMLCanvasElement|null}*/(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);
  
  // If there is no smoothed pose, exit out
  if (firstPose === undefined) return;

  // Convert coordinates to viewport-relative coordinates
  const abs = CommonPose.absPose(firstPose, state.bounds, settings.horizontalMirror);

  // Use `debugDrawPose`, defined in common-pose.js
  CommonPose.debugDrawPose(ctx, abs, { 
    radius: 5
  });
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
  CommonPose.setup();
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
