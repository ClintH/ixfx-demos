import * as Dom from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';

const labelFont = `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`;
const keypointNames = [ `nose_tip` ,`right_eye`, `left_eye`, `mouth_center`, `right_ear_tragion`, `left_ear_tragion` ];

export function setup() {
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
}

/**
 * Draw text centered by taking into account its drawn size
 * @param {string|undefined} msg 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} offsetX 
 * @param {number} offsetY 
 * @returns 
 */
export const drawCenteredText = (ctx, msg, offsetX, offsetY) => {
  if (!msg) return;
  const x = offsetX ?? 0;
  const y = offsetY ?? 0;
  const txt = ctx.measureText(msg);
  ctx.fillText(msg,
    -(txt.width / 2) + x,
    -((txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent) / 2) + y);
  return txt;
};

/**
 * @param {Face} face
 * @returns {FaceByKeypoint} 
 */
export const faceByKeypoint = (face) => {
  const getKp = (name) => {
    const k = face.keypoints.find(kp => kp.name === name);
    if (!k) throw new Error(`Keypoint ${name} not found on face`);
    return k;
  };
  // @ts-ignore
  const hue = `hue` in face ? face.hue: -1;


  return {
    score: face.score ?? 0,
    hue,
    source: face.source,
    box: face.box,
    left_eye: getKp(`leftEye`),
    right_eye: getKp(`rightEye`),
    nose_tip: getKp(`noseTip`),
    mouth_center: getKp(`mouthCenter`),
    right_ear_tragion: getKp(`rightEarTragion`),
    left_ear_tragion: getKp(`leftEarTragion`)
  };
};

/**
 * Smooth a set of key points for a face.
 * @param {number} amt
 * @param {FaceByKeypoint|undefined} a 
 * @param {FaceByKeypoint} b 
 * @return {FaceByKeypoint|undefined}
 */
export const smooth = (amt, a, b) => {
  if (a === undefined && b === undefined) return;
  if (a === undefined) return b;

  const ret = {
    ...b
  };
  keypointNames.forEach(name => {
    ret[name] = smoothKeypoint(amt, a[name], b[name]);
  });
  return ret;
};

/**
 * Smooths a single face key point
 * @param {number} amt 
 * @param {FaceKeypoint} a 
 * @param {FaceKeypoint} b 
 * @returns 
 */
const smoothKeypoint = (amt, a, b) => {
  if (a.name !== b.name) throw new Error(`Probably do not want to smooth different keypoints? ${a.name} and ${b.name}`);

  // Interpolate the x,y 
  const pos = Points.interpolate(amt, a, b);
 
  // Combine together and return
  return {
    ...pos,
    name: a.name
  };
};

/**
 * Returns an absolutely-positioned keypoint
 * @param {Points.Point} point
 * @param {{width:number,height:number}} bounds
 * @param {boolean} horizontalMirror 
 * @returns 
 */
export const absPoint = (point, bounds, horizontalMirror = false) => ({
  ...point,
  x: (horizontalMirror ? 1 - point.x : point.x) * bounds.width,
  y: point.y * bounds.height
});

/**
 * Returns a pose with all keypoints converted to absolute positions
 * @param {Face|FaceByKeypoint} f
 * @param {{width:number, height:number}} bounds 
 * @param {boolean} horizontalMirror 
 * @returns {Face|FaceByKeypoint}
 */
export const absFace = (f, bounds, horizontalMirror = false) => {
  if (f === undefined) throw new Error(`f is undefined`);
  const w = bounds.width;
  const h = bounds.height;

  const abs = {
    ...f
  };

  if (`box` in f) {
    const box = /** @type {Box} */(f.box);
    abs.box = {
      yMin: box.yMin * h,
      yMax: box.yMax * h,
      xMin: box.xMin * w,
      xMax: box.xMax * w,
      width: box.width * w,
      height: box.height * h
    };
  }

  if (`keypoints` in f) {
    // @ts-ignore
    abs.keypoints = f.keypoints.map(absPoint);
  } else {
    keypointNames.forEach(name => {
      abs[name] = absPoint(f[name], bounds, horizontalMirror);
    });
  }
  // @ts-ignore
  return abs;
};


/**
 * Draw a face
 * @param {FaceByKeypoint|Face} face
 * @param {CanvasRenderingContext2D} ctx 
 * @param {FaceDrawOpts} opts
 */
export function debugDrawFace(ctx, face, opts) {
  const radius = opts.pointRadius ?? 10;
  const textOffsetY = radius * 3;
  const colour = opts.colour ?? `black`;
  ctx.fillStyle = colour;
  ctx.strokeStyle = colour;
  ctx.textBaseline = `top`;
  ctx.font = `12pt ${labelFont}`;

  const drawKp = (kp) => {
    // Translate canvas to be centered on predicted object
    ctx.save();
    ctx.translate(kp.x, kp.y);

    // Draw a circle
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw label for key point
    drawCenteredText(ctx, kp.name, 0, textOffsetY);

    // Undo translate transform
    ctx.restore();
  };

  if (`keypoints` in face) {
    face.keypoints.forEach(kp => drawKp(kp));
  } else {
    keypointNames.forEach(name => {
      drawKp(face[name]);
    });
  }
}

/**
 * @typedef { import("../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../common-vision-source").Box } Box
 * @typedef { import("../common-vision-source").Face } Face
 * @typedef { import("../common-vision-source").FaceByKeypoint } FaceByKeypoint
 * @typedef { import("../common-vision-source").FaceKeypoint } FaceKeypoint
 */

/**
 * @typedef FaceDrawOpts
 * @property {string} [colour]
 * @property {number} [threshold]
 * @property {number} [pointRadius]
 * @property {number} [lineWidth]
 * @property {boolean} [labelKeypoints]
 * @property {boolean} [connectKeypoints]
 */