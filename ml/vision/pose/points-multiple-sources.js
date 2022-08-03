/**
 * This sketch uses a map to keep track of data from separate sources.
 */
// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';

const settings = Object.freeze({
  // If true, x-axis is flipped
  horizontalMirror: true,
  // Ignores points under this threshold
  keypointScoreThreshold: 0.3,
  remote: new Remote(),
  // Removes poses from source after they go silent for this long
  sourceExpireMs: 10000,
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`
});

/**
 * @typedef SourceData
 * @property {number} lastUpdate
 * @property {number} hue
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
});

/**
 * Received poses
 * @param {Pose[]} poses 
 * @param {string} from Sender
 */
const onPoses = (poses, from) => {
  const { data } = state;

  // Get existing hue for this source, if we have it
  let hue = data.get(from)?.hue;

  // Otherwise, compute a hue based on the number of sources recorded
  if (hue === undefined) hue = [ ...data.entries() ].length * 30;

  // Keep track of lastest data from source
  data.set(from, {
    lastUpdate: Date.now(),
    poses,
    hue
  });
};

/**
 * Draw a pose
 * @param {Pose} p 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} hue
 */
const drawPose = (ctx, p, hue) => {
  const { horizontalMirror, keypointScoreThreshold, labelFont } = settings;
  const { bounds } = state;

  const radius = 10;
  const textOffsetY = radius * 3;

  ctx.strokeStyle = ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.textBaseline = `top`;

  ctx.font = `12pt ${labelFont}`;

  // Positions comes in relative terms,
  // so we need to map to viewport size. Also want to
  // flip the horizontal so it feels more normal 
  const absPoint = (point) => ({
    x: ((horizontalMirror ? 1 : 0) - point.x) * bounds.width,
    y: point.y * bounds.height
  });

  // Draw each keypoint
  p.keypoints.forEach(kp => {
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
  });
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
  const { data } = state;

  const canvasEl = /** @type {HTMLCanvasElement|null}*/(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);
  
  // For each source, draw each pose
  for (const sourceData of data.values()) {
    sourceData.poses.forEach(pose => drawPose(ctx, pose, sourceData.hue));
  }
};

const setup = async () => {
  const { remote } = settings;

  // Listen for data from the remote
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onPoses(d.data, d._from);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(`#canvas`, args => {
    updateState({ bounds: args.bounds });
  });

  // Loop
  const loop = () => {
    useState();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);

  // Close the corner frame
  document.getElementById(`btnCloseFrame`)?.addEventListener(`click`, evt => {
    document.getElementById(`sourceSection`)?.remove();
    const el = evt.target;
    if (el) /** @type {HTMLElement} */(el).remove(); // Remove button too
  });

  // Every 10 seconds, check for expired sources
  setInterval(() => {
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
  }, 10000);
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
 * @typedef { import("../common-source").Keypoint } Keypoint
 * @typedef { import("../common-source").Box } Box
 * @typedef { import("../common-source").Pose } Pose
 */
