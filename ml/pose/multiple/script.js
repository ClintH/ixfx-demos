/**
 * This sketch uses a map to keep track of data from separate sources.
 */
// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
import { Correlate } from '../../../ixfx/data.js';
import { Points } from '../../../ixfx/geometry.js';
import { smoothPose, commonPoseSetup, absPose, debugDrawPose } from '../common-pose.js';

const settings = Object.freeze({
  correlation: { matchThreshold: 0.95 },
  // If true, x-axis is flipped
  horizontalMirror: true,
  // Ignores points under this threshold
  keypointScoreThreshold: 0.3,
  remote: new Remote(),
  // Removes poses from source after they go silent for this long
  sourceExpireMs: 10000
});

/**
 * @typedef SourceData
 * @property {number} lastUpdate
 * @property {string} from
 * @property {Pose[]} poses
 */

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type {Map<string,SourceData>} */
  data: new Map(),
  poseHues: new Map()
});

/**
 * Returns the similarity between two poses.
 * High values = high similarity
 * @param {Pose} a 
 * @param {Pose} b 
 */
const poseSimilarity = (a, b) => {
  if (!a || !b) return 0;
  
  // Keypoint 0 is the nose
  let pointA = a.keypoints[0];
  let pointB = b.keypoints[0];
  return 1 - Points.distance(pointA, pointB);
};

/**
 * Received poses
 * @param {Pose[]} poses 
 * @param {string} from Sender
 */
const onPoses = (poses, from) => {
  const { correlation } = settings;
  const { data } = state;

  // Get previous poses from this source, if any
  let previousPoses = data.get(from)?.poses;

  // Attempt to align new poses with previous data
  /** @ts-ignore */
  const alignedPoses = Correlate.align(poseSimilarity, previousPoses, poses, correlation );

  // Keep track of lastest set of aligned poses from source
  data.set(from, {
    lastUpdate: Date.now(),
    poses: /** @type Pose[] */(alignedPoses),
    from
  });
};

/**
 * Draw a pose
 * @param {Pose} p 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} hue
 */
const drawPose = (ctx, p, hue) => {
  const { labelFont } = settings;
 
  ctx.strokeStyle = ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.textBaseline = `top`;
  ctx.font = `12pt ${labelFont}`;

  // Draw each keypoint
  p.keypoints.forEach(kp => {
    drawKeypoint(ctx, kp);
  });
};

const drawKeypoint = (ctx, kp) => {
  const { keypointScoreThreshold } = settings;
  const radius = 10;

  const textOffsetY = radius * 3;

  if (kp.score === undefined || kp.score < keypointScoreThreshold) return;
  const abs = absPoint(kp);

  // Translate canvas to be centered on predicted object
  ctx.save();
  ctx.translate(abs.x, abs.y);

  // Draw a circle
  ctx.beginPath();
  ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw label for key point
  const txtSize = drawCenteredText(kp.name, ctx, 0, textOffsetY);

  // Draw score
  drawCenteredText(Math.floor(kp.score * 100) + `%`, ctx, 0, textOffsetY + txtSize.fontBoundingBoxAscent + txtSize.fontBoundingBoxDescent);

  // Undo translate transform
  ctx.restore();
};

// Draw text centered by taking into account its drawn size
const drawCenteredText = (msg, ctx, offsetX, offsetY) => {
  const x = offsetX ?? 0;
  const y = offsetY ?? 0;
  const txt = ctx.measureText(msg);
  ctx.fillText(msg,
    -(txt.width / 2) + x,
    -((txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent) / 2) + y);
  return txt;
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

const useState = () => {
  const { data, poseHues } = state;

  const canvasEl = /** @type {HTMLCanvasElement|null}*/(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);
  
  // For each source, draw each pose
  for (const sourceData of data.values()) {
    // All poses from this source
    const poses = sourceData.poses;

    poses.forEach((pose,index) => {
      // Construct an id for the pose based on source and index in array
      const poseId = `${sourceData.from}-${pose.id}`;

      let hue = poseHues.get(poseId);
      if (!hue) {
        // Id not found
        hue = Math.floor(Math.random() * 359);
        poseHues.set(poseId, hue);
      }
      drawPose(ctx, pose,  hue);
    });
  }
};


const loop = () => {
  useState();
  window.requestAnimationFrame(loop);
};

const checkExpired = () => {
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
};

const onData = (d) => {
  if (d.data && Array.isArray(d.data)) {
    onPoses(d.data, d._from);
  } else {
    console.warn(`Got data we did not expect`);
    console.log(d);
  }
};

const setup = async () => {
  const { remote } = settings;

  // Listen for data from the remote
  remote.onData = onData;

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(`#canvas`, args => {
    updateState({ bounds: args.bounds });
  });

  // Close the corner frame
  document.getElementById(`btnCloseFrame`)?.addEventListener(`click`, evt => {
    document.getElementById(`sourceSection`)?.remove();
    const el = evt.target;
    if (el) /** @type {HTMLElement} */(el).remove(); // Remove button too
  });

  // If the floating source window is there, respond to clicking on the header
  document.getElementById(`sourceSection`)?.addEventListener(`click`, evt => {
    const hdr = /** @type HTMLElement */(document.getElementById(`sourceSection`));
    Dom.cycleCssClass(hdr, [ `s`, `m`, `l` ]);
  });

  // Every 10 seconds, check for expired sources
  setInterval(checkExpired, 10000);

  window.requestAnimationFrame(loop);

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

// Positions comes in relative terms,
// so we need to map to viewport size. Also want to
// flip the horizontal so it feels more normal 
function absPoint(point) {
  const { horizontalMirror } = settings;
  const { bounds } = state;
  return {
    x: ((horizontalMirror ? 1 : 0) - point.x) * bounds.width,
    y: point.y * bounds.height
  };
}

/**
 * @typedef { import("../../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../../common-vision-source").Box } Box
 * @typedef { import("../../common-vision-source").Pose } Pose
 */
