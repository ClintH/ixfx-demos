import * as Dom from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';

const labelFont = `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`;
const keypointNames = [ `nose_tip` ,`right_eye`, `left_eye`, `mouth_center`, `right_ear_tragion`, `left_ear_tragion` ];

export function setup() {
  document.querySelector(`#btnCloseFrame`)?.addEventListener(`click`, event => {
    document.querySelector(`#sourceSection`)?.remove();
    const element = event.target;
    if (element) /** @type {HTMLElement} */(element).remove(); // Remove button too
  });

  // If the floating source window is there, respond to clicking on the header
  document.querySelector(`#sourceSection`)?.addEventListener(`click`, event => {
  
    const hdr = /** @type HTMLElement */(document.querySelector(`#sourceSection`));
    Dom.cycleCssClass(hdr, [ `s`, `m`, `l` ]);
  });
}

/**
 * Draw text centered by taking into account its drawn size
 * @param {string|undefined} message 
 * @param {CanvasRenderingContext2D} context 
 * @param {number} offsetX 
 * @param {number} offsetY 
 * @returns 
 */
export const drawCenteredText = (context, message, offsetX = 0, offsetY = 0) => {
  if (!message) return;

  const txt = context.measureText(message);
  context.fillText(message,
    -(txt.width / 2) + offsetX,
    -((txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent) / 2) + offsetY);
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

  const returnValue = {
    ...b
  };
  for (const name of keypointNames) {
    returnValue[name] = smoothKeypoint(amt, a[name], b[name]);
  }
  return returnValue;
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
    abs.keypoints = f.keypoints.map((value) => absPoint(value));
  } else {
    for (const name of keypointNames) {
      abs[name] = absPoint(f[name], bounds, horizontalMirror);
    }
  }
  // @ts-ignore
  return abs;
};


/**
 * Draw a face
 * @param {FaceByKeypoint|Face} face
 * @param {CanvasRenderingContext2D} context 
 * @param {FaceDrawOpts} options
 */
export function debugDrawFace(context, face, options) {
  const radius = options.pointRadius ?? 10;
  const textOffsetY = radius * 3;
  const colour = options.colour ?? `black`;
  context.fillStyle = colour;
  context.strokeStyle = colour;
  context.textBaseline = `top`;
  context.font = `12pt ${labelFont}`;

  const drawKp = (kp) => {
    // Translate canvas to be centered on predicted object
    context.save();
    context.translate(kp.x, kp.y);

    // Draw a circle
    context.beginPath();
    context.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
    context.fill();

    // Draw label for key point
    drawCenteredText(context, kp.name, 0, textOffsetY);

    // Undo translate transform
    context.restore();
  };

  if (`keypoints` in face) {
    for (const kp of face.keypoints) drawKp(kp);
  } else {
    for (const name of keypointNames) {
      drawKp(face[name]);
    }
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