// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
import { Correlate } from '../../../ixfx/data.js';
import { Points } from '../../../ixfx/geometry.js';
import { Arrays } from '../../../ixfx/collections.js';
import * as CommonPose from '../common-pose.js';

const settings = Object.freeze({
  correlation: { matchThreshold: 0.95 },
  // If true, x-axis is flipped
  horizontalMirror: true,
  remote: new Remote(),
  // Removes poses from source after they go silent for this long
  sourceExpireMs: 10000,
  tickRateMs: 100
});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type {Map<string,SourceData>} */
  data: new Map(),
  poseHues: new Map(),
  /** @type {number} */
  egDensity: 0
});

/**
 * Tick is the place to use pose data in state
 * and derive some new things to stuff into state.
 * 
 * It loops at the interval settings.tickRateMs
 */
const tick = () => {
  const { data } = state;

  // For each source...
  let sources = 0;
  let egDensity = 0;
  for (const sourceData of data.values()) {
    // Get all the poses from this source
    const poses = sourceData.poses;
  
    // Do something with the pose data...
    // In this example, we're averaging the distance between noses of all poses.

    // Eg. sort poses by nose x position
    // Returns [[pose1, noseKp], [pose2, noseKp] ...]
    const sorted = CommonPose.getSortedKeypointsByX(poses, `nose`);

    // Calculate total distances between each subsequent pose, left-to-right
    // ie. distance from pose1 <-> pose2 + distance from pose2 <-> pose3 etc.
    const distance = Arrays.reducePairwise(sorted, (acc, a, b) => {
      const ptA = a[1];
      const ptB = b[1];
      if (ptA && ptB) {
        acc += Points.distance(ptA, ptB);
      }
      return acc;
    }, 0);

    // Divide all these distances by total number of poses to get average
    const distanceAvgForSource = distance / poses.length;

    // Add this average to running total across all sources
    egDensity += distanceAvgForSource;
    sources++;
  }

  // Average total
  egDensity /= sources;

  // Sanity-check
  if (Number.isNaN(egDensity)) egDensity = 0;

  // Update state
  updateState({ egDensity });
};

/**
 * Received poses from a particular source (`from` holds the id of source)
 * @param {Pose[]} poses Poses
 * @param {string} from Sender id
 */
const onData = (poses, from) => {
  const { correlation } = settings;
  const { data } = state;

  // Get previous poses from this source, if any
  let previousPoses = data.get(from)?.poses;

  // Attempt to align new poses with previous data
  // We do this so new data is associated with an existing pose id
  // if it seems to be the same body.
  /** @ts-ignore */
  const alignedPoses = /** @type Pose[] */(Correlate.align(CommonPose.poseSimilarity, previousPoses, poses, correlation));

  // Keep track of latest set of aligned poses from this source
  data.set(from, {
    lastUpdate: Date.now(),
    poses: alignedPoses,
    from
  });
};

/**
 * Called in a loop at animation speed (see setup())
 * @returns 
 */
const useState = () => {
  // Show calculated 'density' example
  CommonPose.setText(`debug`, `
  Density: ${state.egDensity}
  `);
  
  // Draw poses
  drawState();
};

const drawState = () => {
  const { data } = state;

  const canvasEl = /** @type {HTMLCanvasElement|null}*/(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);
  
  // For each source...
  for (const sourceData of data.values()) {
    // Get all the poses from this source
    const poses = sourceData.poses;

    // Draw the set of poses
    drawPoses(ctx, sourceData.from, poses);
  }
};

/**
 * Draws all the poses from a source
 * @param {string} sourceId
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Pose[]} poses 
 */
const drawPoses = (ctx, sourceId, poses) => {
  const {  poseHues } = state;

  poses.forEach(pose => {
    // Construct an id for the pose based on source and index in array
    const poseId = `${sourceId}-${pose.id}`;

    let hue = poseHues.get(poseId);
    if (!hue) {
      // Id not found, assign a new colour
      hue = Math.floor(Math.random() * 359);
      poseHues.set(poseId, hue);
    }

    // Get pose in absolute coordinates (absPoint is defined in common-pose.js)
    const abs = CommonPose.absPose(pose, state.bounds, settings.horizontalMirror);

    // Draw pose (debugDrawPose is defined in common-pose.js)
    CommonPose.debugDrawPose(ctx, abs, {
      colour: `hsl(${hue}, 50%, 50%)`,
    });
  });
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
  const { remote } = settings;

  // Listen for data from the remote
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onData(d.data, d._from);
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
    useState();
    window.requestAnimationFrame(drawLoop);
  };
  window.requestAnimationFrame(drawLoop);

  setInterval(tick, settings.tickRateMs);

  // Every 10 seconds, check for expired sources
  setInterval(removePosesFromMissingSource, 10000);

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
 * When sources stop sending data (eg because they are closed),
 * we want to eventually remove pose data they sent.
 * 
 * This housekeeping function takes care of that
 */
function removePosesFromMissingSource() {
  const { data } = state;
  const toDelete = [];
  const expireAfter = Date.now() - settings.sourceExpireMs;

  for (const [ key,source ] of data) {
    if (source.lastUpdate < expireAfter) toDelete.push(key);
  }

  toDelete.forEach(key => {
    console.log(`Source expired: ${key}`);
    data.delete(key);
  });
}
/**
 * @typedef { import("../../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../../common-vision-source").Box } Box
 * @typedef { import("../../common-vision-source").Pose } Pose
 */

/**
 * @typedef SourceData
 * @property {number} lastUpdate
 * @property {string} from
 * @property {Pose[]} poses
 */