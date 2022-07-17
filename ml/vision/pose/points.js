
// @ts-ignore
import {Remote} from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

import * as Dom from '../../../ixfx/dom.js';
import {Points} from '../../../ixfx/geometry.js';
import {interpolate} from '../../../ixfx/data.js';

const settings = {
  // Ignores points under this threshold
  keypointScoreThreshold: 0.3,

  // Interpolation amount applied per frame (0...1)
  // Lower = less jitter & more latency. Higher = more jitter & lower latency
  smoothingAmt: 0.2,
  remote: new Remote(),
  canvasEl: /** @type {HTMLCanvasElement} */(document.getElementById(`canvas`)),
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`
}

let state = {
  bounds: {
    width: 0,
    height: 0,
    center: {x: 0, y: 0}
  },
  /** @type {Pose[]} */
  poses: [],
  /** @type {Pose|undefined} */
  smoothedPose: undefined
};

/**
 * Received poses
 * @param {Pose[]} poses 
 */
const onPoses = (poses) => {
  console.log(poses);
  state = {
    ...state,
    poses: poses
  }

}

const update = () => {
  const {poses} = state;
  const {smoothingAmt} = settings;

  if (poses.length === 0) return;
  state.smoothedPose = smoothPose(smoothingAmt, state.smoothedPose, poses[0]);

}

/**
 * 
 * @param {Pose|undefined} a 
 * @param {Pose} b 
 */
const smoothPose = (amt, a, b) => {
  if (a === undefined && b === undefined) return;
  if (a === undefined) return b;

  // Assumes keypoint indexes match up.
  // if the source is discarding points, this will break us
  return {
    ...b,
    keypoints: a.keypoints.map((kp, index) => smoothKeypoint(amt, kp, b.keypoints[index]))
  };
}

const smoothKeypoint = (amt, a, b) => {
  // Interpolate the score
  const score = interpolate(amt, a.score, b.score);

  // Interpolate the x,y
  const pos = Points.interpolate(amt, a, b);

  // Combine together and return
  return {
    ...pos,
    score
  }
}

/**
 * Draw poses
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {poses} = state;
  //poses.forEach(p => drawPose(p, ctx));
  if (state.smoothedPose === undefined) return;
  drawPose(ctx, state.smoothedPose);
}

/**
 * Draw a pose
 * @param {Pose} p 
 * @param {CanvasRenderingContext2D} ctx 
 */
const drawPose = (ctx, p) => {
  const {keypointScoreThreshold, labelFont} = settings;
  const {bounds} = state;

  const radius = 10;
  const textOffsetY = radius * 3;

  ctx.fillStyle = `black`;
  ctx.strokeStyle = `black`;
  ctx.textBaseline = `top`;

  ctx.font = `12pt ${labelFont}`;

  // Positions comes in relative terms,
  // so we need to map to viewport size. Also want to
  // flip the horizontal so it feels more normal 
  const absPoint = (point) => ({
    x: (1 - point.x) * bounds.width,
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
    drawCenteredText(Math.floor(kp.score * 100) + '%', ctx, 0, textOffsetY + txtSize.fontBoundingBoxAscent + txtSize.fontBoundingBoxDescent);

    // Undo translate transform
    ctx.restore();
  });


}

// Draw text centered by taking into account its drawn size
const drawCenteredText = (msg, ctx, offsetX, offsetY) => {
  const x = offsetX ?? 0;
  const y = offsetY ?? 0;
  const txt = ctx.measureText(msg);
  ctx.fillText(msg,
    -(txt.width / 2) + x,
    -((txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent) / 2) + y);
  return txt;
}

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const {width, height} = state.bounds;

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
  const {remote, canvasEl} = settings;

  // Listen for data from the remote
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onPoses(d.data);
    } else {
      console.warn('Got data we did not expect');
      console.log(d);
    }

  }

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(canvasEl, args => {
    state = {
      ...state,
      bounds: args.bounds
    }
  });

  const ctx = /** @type {CanvasRenderingContext2D}*/(canvasEl.getContext(`2d`));

  // Loop
  const loop = () => {
    update();

    // Clear and draw current state
    clear(ctx);
    draw(ctx);

    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

  document.getElementById(`btnCloseFrame`)?.addEventListener(`click`, evt => {
    document.getElementById(`sourceSection`)?.remove();
    const el = evt.target;
    if (el) /** @type {HTMLElement} */(el).remove(); // Remove button too
  })
}
setup();

/**
 * @typedef { import("../common-source").Keypoint } Keypoint
 * @typedef { import("../common-source").Box } Box
 * @typedef { import("../common-source").Pose } Pose
 */
