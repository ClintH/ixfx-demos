// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
import { ExpiringMap } from '../../../ixfx/collections.js';
import { Pool } from '../../../ixfx/data.js';
import { Points } from '../../../ixfx/geometry.js';
import { Sync as IterableSync } from '../../../ixfx/generators.js';
import * as CommonPose from '../common-pose.js';
import { PosesManager } from "../pose-manager.js";
/**
 * @typedef GradientStop
 * @property {number} position
 * @property {string} poseId
 * @property {number} hue
 */
const settings = Object.freeze({
  // If true, x-axis is flipped
  horizontalMirror: false,
  remote: new Remote(),
  // Interpolation amount applied per frame (0...1)
  // Lower = less jitter & more latency. Higher = more jitter & lower latency
  smoothingAmt: 0.8,
  tickRateMs: 200,
  pool: new Pool.Pool({
    autoExpireAfterMs: 5000,
    fullPolicy:`evictOldestUser`,
    capacity: 5,
    generate:() => {
      return {
        number: 0.5,
        poseId:  ``,
        hue: Math.random()
      };
    }
  }),
  poseManager: new PosesManager()
});

let state = Object.freeze({
  /**
   * Bounds of the viewport. Needed for going back and forth from
   * relative to absolute coordinates
   */
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },

  gradientStops: new ExpiringMap({
    capacity: 5
  })
});

/**
 * Tick is the place to use pose data in state
 * and derive some new things to stuff into state.
 * 
 * It loops at the interval settings.tickRateMs
 */
const tick = () => {
  const { poseManager } = settings;

  // Get all the poses, regardless of source
  const poses = Array.from(poseManager.iteratePoses());

  // Eg. sort poses by nose x position
  // Returns [[pose1, noseKp], [pose2, noseKp] ...]
  //const sorted = CommonPose.getSortedPosesByX(poses, `nose`);

  // Get pairwise combinations of poses
  // eg pose1 <-> pose2, pose2 <-> pose 3 ...
  //const pairs = Array.from(IterableSync.chunksOverlapping(sorted, 2));


};



/**
 * Called in a loop at animation speed (see setup())
 * @returns 
 */
const useState = () => {
  // Show calculated 'density' example
  // CommonPose.setText(`debug`, `
  // Density: ${state.egDensity}
  // `);
  
  // Draw poses
  drawState();
};

const drawState = () => {
  const { poseManager } = settings;
  const canvasEl = /** @type {HTMLCanvasElement|null}*/(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);
  
  // For pose (regardless of source)
  for (const pose of poseManager.iteratePoses()) {
    // Draw the set of poses
    drawPose(ctx, pose);
  }
};

/**
 * Draw pose
 * @param {CanvasRenderingContext2D} ctx 
 * @param {import("../common-pose.js").PoseByKeypoint} pose
 */
const drawPose = (ctx, pose) => {
  if (pose === undefined) throw new Error(`pose is undefined`);
  // Get pose in absolute coordinates (absPoint is defined in common-pose.js)
  const abs = CommonPose.absPose(pose, state.bounds, settings.horizontalMirror);
  const hueToUse = pose.hue;// typeof hue === `undefined` ? pose.hue : hue;
  const colour = `hsl(${hueToUse}, 50%, 50%)`; 

  // Draw pose (debugDrawPose is defined in common-pose.js)
  CommonPose.debugDrawPose(ctx, abs, {
    colour,
    labelKeypoints: false,
    connectKeypoints: true
  });
  
  let boxMin = CommonPose.absPoint({
    x: pose.box?.xMax ?? 0,
    y: pose.box?.yMin ?? 0
  }, state.bounds, settings.horizontalMirror);

  ctx.fillStyle = colour;
  ctx.fillText(`Id: ${pose.id}`, boxMin.x, boxMin.y);
};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};

const setup = async () => {
  const { remote, poseManager } = settings;

  /**
   * Received data from remote
   * @param {ReceivedData} d 
   */
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      poseManager.onData(d.data, d._from);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(`#canvas`, args => updateState({ bounds: args.bounds }));

  const drawLoop = () => {
    useState();
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
 * @typedef { import("../../common-vision-source").ReceivedData } ReceivedData
 */
