import { Points } from '../../ixfx/geometry.js';
import { interpolate } from '../../ixfx/data.js';
import * as Dom from '../../ixfx/dom.js';
import { Arrays, Maps } from '../../ixfx/collections.js';

const labelFont = `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`;


/**
 * Does a rough sanity check over keypoints, halving
 * the score of those that seem off.
 * 
 * Checks:
 * 1. Shoulders below ears/nose
 * 2. Hip below shoulders
 * 3. Knees below hip
 * 4. Ankles below knees
 * @param {Pose} pose 
 * @returns {Pose}
 */
export const sanityCheck = (pose, opts = {}) => {
  const shouldersBelowFace = opts.shouldersBelowFace ?? true;
  const hipBelowShoulders = opts.hipBelowShoulders ?? true;
  const kneesBelowHip = opts.kneesBelowHip ?? true;
  const anklesBelowKnees = opts.anklesBelowKnees ?? true;
  const scoreThreshold = opts.scoreThreshold ?? 0;

  const m = Maps.fromIterable(pose.keypoints, kp => kp.name ?? ``);

  // Reduce keypoint score by 90% if one of the checks fails
  const multiplier = 0.1;

  const leftShoulder = m.get(`left_shoulder`);
  const leftEar = m.get(`left_ear`);
  const rightShoulder = m.get(`right_shoulder`);
  const rightEar = m.get(`right_ear`);

  /**
   * If a is higher in the frame than b,
   * a's score is penalised
   * @param {Keypoint|undefined} a 
   * @param {Keypoint|undefined} b 
   */
  const beBelow = (a, b) => {
    if (a && b && a.y < b.y) {
      a.score *= multiplier;
    }
    return a;
  };

  // Shoulders below ears
  if (shouldersBelowFace) {
    beBelow(leftShoulder, leftEar);
    beBelow(rightShoulder, rightEar);
  }

  const leftHip = m.get(`left_hip`);
  const rightHip = m.get(`right_hip`);

  // Hip below shoulders
  if (hipBelowShoulders) {
    beBelow(leftHip, leftShoulder);
    beBelow(rightHip, rightShoulder);
  }

  // Knees ought to be below shoulders
  const leftKnee = m.get(`left_knee`);
  const rightKnee = m.get(`right_knee`);

  if (kneesBelowHip) {
    beBelow(leftKnee, leftHip);
    beBelow(rightKnee, rightHip);
  }

  // Ankles below knees
  const leftAnkle = m.get(`left_ankle`);
  const rightAnkle = m.get(`right_ankle`);

  if (anklesBelowKnees) {
    beBelow(leftAnkle, leftKnee);
    beBelow(rightAnkle, rightKnee);
  }

  return {
    ...pose,
    keypoints: Maps.toArray(m).filter(kp => kp.score >= scoreThreshold)
  };
};

/**
 * Returns a function that processes a pose
 * @param {number} smoothingAmt Smoothing amount 
 * @param {SanityChecks} sanityCheckOpts Options for sanity checking
 * @returns {PoseProcessor}
 */
export const poseProcessor = (smoothingAmt, sanityCheckOpts) => {
  /** @type {Pose|undefined} */
  let processed  = undefined;
  
  /** @type {string|null} */
  let id = null;
  /**
   * Process a pose
   * @param {Pose} pose
   * @returns {Pose|undefined}
   */
  const process = (pose, allowOverwrite = false) => {
    if (id && pose.id) {
      if (id !== pose.id && !allowOverwrite) throw new Error(`Cannot process pose with new id ${pose.id}, since we started processing with pose id ${id}. Set allowOverwrite to true to ignore.`);
    } else if (pose.id) {
      id = pose.id;
    }

    // Sanity check pose & remove points below threshold
    const p = sanityCheck(pose, sanityCheckOpts);

    // Smooth the first pose
    processed = smoothPose(smoothingAmt, processed, p);

    return processed;
  };
  return {
    process,
    processed,
    id
  };
};

/**
   * Gets a keypoint from a pose
   * @param {Pose|undefined} pose 
   * @param {string} name Keypoint name
   * @returns Keypoint|undefined
   */
export const getKeypoint = (pose, name) => {
  if (!pose) return;
  return pose.keypoints.find(kp => kp.name === name);
};

/**
 * Get all keypoints with given name from list of poses.
 * Keypoints are returned in array [[pose1, kp], [pose2, kp] ...]
 * @param {Pose[]} poses 
 * @param {string} keypointName 
 * @returns {[pose:Pose,kp:Keypoint|undefined][]}
 */
export const getKeypoints = (poses, keypointName) =>  poses.map(pose => [ pose, getKeypoint(pose, keypointName) ]);

/**
 * Sort by keypoint X value, where leftmost will be at position 0
 * Returns an double-array of [[pose1,kp], [pose2,kp] ...]
 * @param {Pose[]} poses 
 */
export const getSortedKeypointsByX = (poses, keypointName) => {
  const kps = getKeypoints(poses, keypointName);
  return kps.sort((a, b) => {
    if (!a[1]) return -1;
    if (!b[1]) return -1;
    return Points.compareByX(a[1], b[1]);
  });
};

/**
 * Returns poses sorted by the x value of a named keypoint
 * @param {Pose[]} poses 
 * @param {string} keypointName 
 * @returns Pose[]
 */
export const getSortedPosesByX = (poses, keypointName) => {
  const v = getSortedKeypointsByX(poses, keypointName);
  const r = v.map(v => v[0]);
  return r;
};
/**
 * Smoothes a pose
 * @param {Pose|undefined} a Earlier pose
 * @param {Pose} b Newer pose
 */
export const smoothPose = (amt, a, b) => {
  if (a === undefined && b === undefined) return;
  if (a === undefined) return b;

  const keyFn = (kp) => kp.name ?? ``;
  const reconcileFn = (kpA, kpB) => smoothKeypoint(amt, kpA, kpB);
  
  // At startup might not have existing keypoints to compare against...
  const existingKeypoints = a ? a.keypoints : [];

  // Smooth, by merging old and new data with the reconcile function
  // which in this case does the averaging
  const smoothed = Arrays.mergeByKey(keyFn, reconcileFn, existingKeypoints, b.keypoints);

  // Return a new pose with mutated keypoints
  return {
    ...b,
    keypoints: /** @type {Keypoint[]} */(smoothed)
  };

  // const existingKeypoints = Maps.fromIterable(a.keypoints, kp => kp.name ?? ``);
  // const newKeypoints = Maps.fromIterable(b.keypoints, kp => kp.name ?? ``);

  // const smoothed = existingKeypoints.map((existingKp, index) => {
  //   // Find same
  //   smoothKeypoint(amt, existingKp, newK)
  // });

  // Assumes keypoint indexes match up.
  // if the source is discarding points, this will break us
  // return {
  //   ...b,
  //   keypoints: a.keypoints.map((kp, index) => smoothKeypoint(amt, kp, b.keypoints[index]))
  // };
};

/**
 * Smoothes a key point
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
   * Returns an absolutely-positioned keypoint
   * @param {Points.Point} point
   * @param {{width:number,height:number}} bounds
   * @param {boolean} horizontalMirror 
   * @returns 
   */
export const absPoint = (point, bounds, horizontalMirror = false) => ({
  ...point,
  x: ((horizontalMirror ? 1 : 0) - point.x) * bounds.width,
  y: point.y * bounds.height
});

/**
 * Returns the leftmost of all the provided arguments
 * @param  {...Points.Point} points 
 */
export const getLeftmost = (...points) => {
  let min = Number.MAX_SAFE_INTEGER;
  let minPoint;
  for (let i=0;i<points.length;i++) {
    if (points[i].x < min) {
      min = points[i].x;
      minPoint = points[i];
    }
  }
  return minPoint;
};

/**
 * Returns the rightmost of all the provided points
 * @param  {...any} points 
 * @returns 
 */
export const getRightmost = (...points) => {
  let max = Number.MIN_SAFE_INTEGER;
  let maxPoint;
  for (let i=0;i<points.length;i++) {
    if (points[i].x > max) {
      max = points[i].x;
      maxPoint = points[i];
    }
  }
  return maxPoint;
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
   * Returns an absolutely-positioned keypoint
   * @param {Keypoint} point 
   * @returns 
   */
  const absPoint = (point) => ({
    ...point,
    x: ((horizontalMirror ? 1 : 0) - point.x) * w,
    y: point.y * h
  });

  const keypoints = p.keypoints.map(absPoint);
  
  const abs = {
    keypoints,
    id: p.id
  };
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
 * @param {PoseDrawOpts} opts
 */
export const debugDrawPose = (ctx, p, opts = {}) => {
  const radius = opts.radius ?? 10;
  const threshold = opts.threshold ?? 0;
  const fillStyle = opts.colour ?? `black`;

  ctx.fillStyle = fillStyle;
  //ctx.strokeStyle = `black`;
  ctx.textBaseline = `top`;
  ctx.font = `12pt ${labelFont}`;

  // Draw each keypoint
  p.keypoints.forEach(kp => {
    if (kp.score === undefined || kp.score < threshold) return;
    const pointOpts =  {
      title: kp.name,
      subTitle: Math.floor(kp.score * 100) + `%`,
      radius
    };
    drawAbsPoint(ctx, kp, pointOpts);
  });
};



/**
 * Draws an absolutely-positioned point
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Points.Point} abs 
 * @param {KeypointDrawOpts} opts
 */
export const drawAbsPoint = (ctx, abs, opts = {}) => {
  const radius = opts.radius ?? 10;
  const textOffsetY = radius * 3;

  // Translate canvas to be centered on predicted object
  ctx.save();
  ctx.translate(abs.x, abs.y);

  // Draw a circle
  ctx.beginPath();
  ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
  ctx.fill();

  if (opts.title) {
  // Draw label for key point
    const txtSize = drawCenteredText(opts.title, ctx, 0, textOffsetY);

    if (txtSize && opts.subTitle) {
      // Draw score
      drawCenteredText(opts.subTitle, ctx, 0, textOffsetY + txtSize.fontBoundingBoxAscent + txtSize.fontBoundingBoxDescent);
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

/**
 * Returns a similarity between two poses.
 * High values = high similarity.
 * 
 * In this case, it is determined by distance between nose keypoints.
 * 
 * TODO: It should ideally take into account all keypoints.
 * @param {Pose} a 
 * @param {Pose} b 
 */
export const poseSimilarity = (a, b) => {

  let pointA = getKeypoint(a, `nose`);// a.keypoints[0];
  let pointB = getKeypoint(b, `nose`); //b.keypoints[0];

  // If either a or b is undefined, lets
  // say they have no similarity
  if (!pointA || !pointB) return 0;
  
  return 1 - Points.distance(pointA, pointB);
};

/**
 * Returns the x-axis 'balance' of point `b` between `a` and `c`.
 * Return value of:
 * * 0.5 means `b` is in the middle.
 * * 0 means `b` is very close to `a`
 * * 1 means `b` is very close to `c`
 *  
 * @param {Keypoint|undefined} a 
 * @param {Keypoint|undefined} b 
 * @param {Keypoint|undefined} c 
 * @returns 
 */
export const pointBalanceX = (a, b, c) => {
  // If we're missing any point, return undefined
  if (a === undefined || b === undefined || c === undefined) return;

  const distToA = Points.distance(a, b);

  if (b.x < a.x) return 0;
  if (b.x > c.x) return 1;

  const total = Points.distance(a, c);
  return distToA / total;
};

export const setup = () => {
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
 * Map keypoints so we can access them by name
 * @param {Pose} pose 
 * @returns {Map<string,Keypoint>}
 */
export const mapKeypoints = (pose) => {
  const m = new Map();
  pose.keypoints.forEach(kp => m.set(kp.name, kp));
  return m;
};

export function setText(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    if (el.innerText !== msg) {
      el.innerText = msg;
    }
  }
}
/**
 * @typedef { import("../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../common-vision-source").Box } Box
 * @typedef { import("../common-vision-source").Pose } Pose
 */

/**
 * @typedef SanityChecks
 * @property {boolean} [shouldersBelowFace]
 * @property {boolean} [hipBelowShoulders]
 * @property {boolean} [kneesBelowHip]
 * @property {boolean} [anklesBelowKnees] 
 * @property {number} [scoreThreshold]
 */

/**
 * @typedef KeypointDrawOpts
 * @property {string} [title]
 * @property {string} [subTitle]
 * @property {number} [radius]
 */

/**
 * @typedef PoseDrawOpts
 * @property {string} [colour]
 * @property {number} [threshold]
 * @property {number} [radius]
 */


/**
 * @callback PoseProcess
 * @param {Pose} pose
 * @param {boolean} [allowOverwrite]
 */

/**
 * @typedef {object} PoseProcessor
 * @property {PoseProcess} process
 * @property {Pose|undefined} processed
 * @property {string|null} id
 */

