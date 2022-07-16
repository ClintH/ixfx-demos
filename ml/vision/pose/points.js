
// @ts-ignore
import {Remote} from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

import * as Dom from '../../../ixfx/dom.js';

const settings = {
  keypointScoreThreshold: 0.4,
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
  colours: new Map()
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


/**
 * Draw poses
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {poses} = state;
  poses.forEach(p => drawPose(p, ctx));
}

/**
 * Draw a pose
 * @param {Pose} p 
 * @param {CanvasRenderingContext2D} ctx 
 */
const drawPose = (p, ctx) => {
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

  const loop = () => {
    // Clear and draw current state
    clear(ctx);
    draw(ctx);

    // Loop
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
