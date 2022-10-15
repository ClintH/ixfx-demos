import { Points } from '../../ixfx/geometry.js';
import { interpolate } from '../../ixfx/data.js';
import * as Dom from '../../ixfx/dom.js';

const labelFont = `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`;

/**
 * Smooths a pose
 * @param {Pose|undefined} a 
 * @param {Pose} b 
 */
export const smoothPose = (amt, a, b) => {
  if (a === undefined && b === undefined) return;
  if (a === undefined) return b;

  // Assumes keypoint indexes match up.
  // if the source is discarding points, this will break us
  return {
    ...b,
    keypoints: a.keypoints.map((kp, index) => smoothKeypoint(amt, kp, b.keypoints[index]))
  };
};

/**
 * Smooths a key point
 * @param {number} amt Interpolation amount
 * @param {Keypoint} a 
 * @param {Keypoint} b 
 * @returns 
 */
export const smoothKeypoint = (amt, a, b) => {
  // Interpolate the score, if both a and b have it
  const score = (a.score && b.score) ? interpolate(amt, a.score, b.score) : 0;

  // Interpolate the x,y
  const pos = Points.interpolate(amt, a, b);

  // Combine together and return
  return {
    ...pos,
    score
  };
};

/**
 * Returns a pose with all keypints converted to absolute positions
 * @param {Pose} p 
 * @param {{width:number, height:number}} bounds 
 * @param {boolean} horizontalMirror 
 * @returns {Pose}
 */
export const absPose = (p, bounds, horizontalMirror = false) => {
  const w = bounds.width;
  const h = bounds.height;

  /**
   * 
   * @param {Keypoint} point 
   * @returns 
   */
  const absPoint = (point) => ({
    x: ((horizontalMirror ? 1 : 0) - point.x) * w,
    y: point.y * h,
    name: point.name,
    score: point.score
  });

  const keypoints = p.keypoints.map(absPoint);
  
  const abs = {
    keypoints  
  };
  if (p.id) abs.id = p.id;
  if (p.score) abs.score =p.score;
  if (p.box) {
    abs.box = {
      yMin: p.box.yMin * h,
      yMax: p.box.yMax * h,
      xMin: p.box.xMin * w,
      xMax: p.box.xMax* w,
      width: p.box.width * w,
      height: p.box.height * h
    };
  }
  return abs;
};

/**
 * Draw an absolutely-positioned pose
 * @param {Pose} p 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} keypointScoreThreshold Keypoints below this threshold are not rendered
 */
export const debugDrawPose = (ctx, p, keypointScoreThreshold = 0) => {
  const radius = 10;

  ctx.fillStyle = `black`;
  ctx.strokeStyle = `black`;
  ctx.textBaseline = `top`;

  ctx.font = `12pt ${labelFont}`;

  // Draw each keypoint
  p.keypoints.forEach(kp => {
    if (kp.score === undefined || kp.score < keypointScoreThreshold) return;
    drawAbsPoint(ctx, kp, radius, kp.name, Math.floor(kp.score * 100) + `%`);
  });
};

/**
 * Draws an absolutely-positioned point
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Points.Point} abs 
 * @param {number} radius 
 * @param {string|undefined} title 
 * @param {string|undefined} subtitle 
 */
export const drawAbsPoint = (ctx, abs, radius, title, subtitle) => {
  const textOffsetY = radius * 3;

  // Translate canvas to be centered on predicted object
  ctx.save();
  ctx.translate(abs.x, abs.y);

  // Draw a circle
  ctx.beginPath();
  ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
  ctx.fill();

  if (title) {
  // Draw label for key point
    const txtSize = drawCenteredText(title, ctx, 0, textOffsetY);

    if (txtSize && subtitle) {
      // Draw score
      drawCenteredText(subtitle, ctx, 0, textOffsetY + txtSize.fontBoundingBoxAscent + txtSize.fontBoundingBoxDescent);
    }
  
  }
  // Undo translate transform
  ctx.restore();
};
/**
 * Draw text centered by taking into account its drawn size
 * @param {string|undefined} msg 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} offsetX 
 * @param {number} offsetY 
 * @returns 
 */
export const drawCenteredText = (msg, ctx, offsetX, offsetY) => {
  if (!msg) return;
  const x = offsetX ?? 0;
  const y = offsetY ?? 0;
  const txt = ctx.measureText(msg);
  ctx.fillText(msg,
    -(txt.width / 2) + x,
    -((txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent) / 2) + y);
  return txt;
};

export const commonPoseSetup = () => {
  // If the floating source window is there, respond to clicking on the header
  document.getElementById(`sourceSection`)?.addEventListener(`click`, evt => {
    const hdr = /** @type HTMLElement */(document.getElementById(`sourceSection`));
    Dom.cycleCssClass(hdr, [ `s`, `m`, `l` ]);
  });
  
  document.getElementById(`btnCloseFrame`)?.addEventListener(`click`, evt => {
    document.getElementById(`sourceSection`)?.remove();
    const el = evt.target;
    if (el) /** @type {HTMLElement} */(el).remove(); // Remove button too
  });
};
/**
 * @typedef { import("../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../common-vision-source").Box } Box
 * @typedef { import("../common-vision-source").Pose } Pose
 */
