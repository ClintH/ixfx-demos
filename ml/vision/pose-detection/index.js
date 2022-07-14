import {Remote} from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';

const settings = {
  keypointScoreThreshold: 0.4,
  remote: new Remote(),
  canvasEl: document.getElementById(`canvas`),
  labelFont: `"Segoe UI", Roboto, Helvetica, Arial, sans-serif`
}

let state = {
  bounds: {
    width: 0,
    height: 0,
    center: {x: 0, y: 0}
  },
  ticks: 0,
  /** @type {Poses[]} */
  poses: [],
  colours: new Map()
};

/**
 * Received poses
 * @param {Pose[]} predictions 
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
 * 
 * @param {Pose} p 
 * @param {CanvasRenderingContext2D} ctx 
 */
const drawPose = (p, ctx) => {
  const {keypointScoreThreshold} = settings;
  const {bounds, colours} = state;
  const w = bounds.width;
  const h = bounds.height;

  const radius = 3;
  const textOffsetY = radius * 3;
  const hue = 90;

  ctx.fillStyle = `black`;
  ctx.strokeStyle = `black`;
  ctx.textBaseline = `top`;

  // Positions comes in relative terms,
  // so we need to map to viewport size. Also want to
  // mirror x,y so it feels more normal 
  const absPoint = (point) => ({
    x: (1 - point.x) * bounds.width,
    y: (1 - point.y) * bounds.height
  });

  // Draw each keypoint
  p.keypoints.forEach(kp => {
    if (kp.score < keypointScoreThreshold) return;
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

  const ctx = canvasEl.getContext(`2d`);

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
    evt.target.remove(); // Remove button too
  })
}
setup();

// https://github.com/tensorflow/tfjs-models/blob/676a0aa26f89c9864d73f4c7389ac7ec61e1b8a8/pose-detection/src/types.ts
/**
 * @typedef Keypoint
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} [z]
 * @property {number} [score]
 * @property {string} [name]
 */

/**
 * @typedef Box
 * @type {object}
 * @property {number} width
 * @property {number} height
 * @property {number} xMax
 * @property {number} xMin
 * @property {number} yMax
 * @property {number} yMin
 */

/**
 * @typedef Pose
 * @type {object}
 * @property {Keypoint[]} keypoints
 * @property {number} [score]
 * @property {Box} [box]
 */
