import { Points } from '../../ixfx/geometry.js';
import { interpolate } from '../../ixfx/data.js';
import * as Dom from '../../ixfx/dom.js';
import { Arrays } from '../../ixfx/collections.js';

const labelFont = `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`;
const keypointNames = [ `left_ankle`,`right_ankle`,`left_shoulder`,`right_shoulder`,`left_hip`,`right_hip`,`nose`,`left_wrist`,`right_wrist`,`left_knee`,`right_knee`,`left_ear`,`right_ear`, `left_eye`, `right_eye`, `left_elbow`, `right_elbow` ];


/**
 * Does a rough sanity check over keypoints, reducing
 * score of those that seem off
 * 
 * Checks:
 * 1. Shoulders below ears/nose
 * 2. Hip below shoulders
 * 3. Knees below hip
 * 4. Ankles below knees
 * @param {Pose|PoseByKeypoint} pose 
 * @returns {Pose|PoseByKeypoint}
 */
export const sanityCheck = (pose, opts = {}) => {
  const shouldersBelowFace = opts.shouldersBelowFace ?? true;
  const hipBelowShoulders = opts.hipBelowShoulders ?? true;
  const kneesBelowHip = opts.kneesBelowHip ?? true;
  const anklesBelowKnees = opts.anklesBelowKnees ?? true;
  
  const isRaw = `keypoints` in pose;
 
  /**
   * Gets a keypoint
   * @param {string} name 
   * @returns {Keypoint|undefined}
   */
  const getKp = (name) => {
    if (isRaw) {
      return pose.keypoints.find(kp => kp.name === name);
    } else {
      return pose[name];
    }
  };

  // Reduce keypoint score by 90% if one of the checks fails
  const multiplier = 0.1;

  const leftShoulder = getKp(`left_shoulder`);
  const leftEar = getKp(`left_ear`);
  const rightShoulder = getKp(`right_shoulder`);
  const rightEar = getKp(`right_ear`);

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

  const leftHip = getKp(`left_hip`);
  const rightHip = getKp(`right_hip`);

  // Hip below shoulders
  if (hipBelowShoulders) {
    beBelow(leftHip, leftShoulder);
    beBelow(rightHip, rightShoulder);
  }

  // Knees ought to be below shoulders
  const leftKnee = getKp(`left_knee`);
  const rightKnee = getKp(`right_knee`);

  if (kneesBelowHip) {
    beBelow(leftKnee, leftHip);
    beBelow(rightKnee, rightHip);
  }

  // Ankles below knees
  const leftAnkle = getKp(`left_ankle`);
  const rightAnkle = getKp(`right_ankle`);

  if (anklesBelowKnees) {
    beBelow(leftAnkle, leftKnee);
    beBelow(rightAnkle, rightKnee);
  }

  if (isRaw) {
    return {
      ...pose
    };
    //  keypoints: pose.keypoints.filter(kp => kp.score >= scoreThreshold)
    //};
  } else {
    const pp = { ...pose };
    keypointNames.forEach(name => {
      //const kp = pp[name];
      //if (kp.score < scoreThreshold) delete pp[name];
    });
    return pp;
  }

};

/**
 * @typedef PoseProcessorOpts
 * @property {number} [smoothingAmt]
 * @property {boolean} [autoReset]
 * @property {SanityChecks} [sanityChecks]
 */
/**
 * Returns a function that processes a pose
 * @param {PoseProcessorOpts} opts
 * @returns {PoseProcessor}
 */
export const poseProcessor = (opts = {}) => {
  const smoothingAmt = opts.smoothingAmt ?? 0.5;
  const autoReset = opts.autoReset ?? false;
  const sanityCheckOpts = opts.sanityChecks;
  
  /** @type {Pose|PoseByKeypoint|undefined} */
  let processed  = undefined;
  
  /** @type {string|undefined} */
  let poseId = undefined;

  /**
   * Process a pose
   * @param {Pose|PoseByKeypoint} pose
   * @returns {Pose|PoseByKeypoint|undefined}
   */
  const process = (pose, allowOverwrite = false) => {
    if (!(`id` in pose)) throw new Error(`pose does not have id parameter`);
    if (!pose.id) throw new Error(`pose.id is null/undefined`);
    if (poseId && pose.id) {
      if (poseId !== pose.id) {
        if (autoReset) {
          poseId = pose.id;
          processed = undefined;
        } else if (!allowOverwrite) throw new Error(`Cannot process pose with new id ${pose.id}, since we started processing with pose id ${poseId}. Set allowOverwrite to true to ignore.`);
      }
    } else if (pose.id) {
      poseId = pose.id;
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
    id: () => poseId
  };
};

/**
   * Gets a keypoint from a pose
   * @param {Pose|PoseByKeypoint|undefined} pose 
   * @param {string} name Keypoint name
   * @returns Keypoint|undefined
   */
export const getKeypoint = (pose, name, threshold = 0) => {
  if (!pose) return undefined;
  /** @type {Keypoint|undefined} */
  let kp;
  if (`keypoints` in pose) {
    kp = pose.keypoints.find(kp => kp.name === name);
  } else {
    kp = pose[name];
  }
  if (!kp) return undefined;
  if (kp && kp.score >= threshold) return kp;
};

/**
 * Get all keypoints with given name from list of poses.
 * Keypoints are returned in array [[pose1, kp], [pose2, kp] ...]
 * @param {(Pose|PoseByKeypoint)[]} poses 
 * @param {string} keypointName 
 * @returns {[pose:Pose|PoseByKeypoint,kp:Keypoint|undefined][]}
 */
export const getKeypoints = (poses, keypointName, threshold = 0) =>  {
  return poses.map(pose => {
    const kp = getKeypoint(pose, keypointName, threshold);
    return [ pose, kp ];
  });
};

/**
 * Sort by keypoint X value, where leftmost will be at position 0
 * Returns an double-array of [[pose1,kp], [pose2,kp] ...]
 * @param {(Pose|PoseByKeypoint)[]} poses 
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
 * @template {Pose|PoseByKeypoint} P
 * @param {P[]} poses 
 * @param {string} keypointName 
 * @returns P[]
 */
export const getSortedPosesByX = (poses, keypointName) => {
  const v = getSortedKeypointsByX(poses, keypointName);
  const r = v.map(v => v[0]);
  return r;
};

/**
 * Smoothes a pose
 * @param {Pose|PoseByKeypoint|undefined} a Earlier pose
 * @param {Pose|PoseByKeypoint} b Newer pose
 */
export const smoothPose = (amt, a, b) => {
  if (a === undefined && b === undefined) return;
  if (a === undefined) return b;

  const keyFn = (kp) => kp.name ?? ``;
  const reconcileFn = (kpA, kpB) => smoothKeypoint(amt, kpA, kpB);
  
  // At startup might not have existing keypoints to compare against...
  let existingKeypoints = getKeypointList(a);
  let newKeypoints = getKeypointList(b);

  // debugger;
  // Smooth, by merging old and new data with the reconcile function
  // which in this case does the averaging
  const smoothed = /** @type {Keypoint[]} */(Arrays.mergeByKey(keyFn, reconcileFn, existingKeypoints, newKeypoints));

  // Return a new pose with mutated keypoints
  if (`keypoints` in b) {
    return {
      ...b,
      keypoints: smoothed
    };    
  } else {
    let temp = {
      ...b,
    };
    for (const kp of smoothed) {
      if (kp.name) temp[kp.name] = kp;
    } 
    return temp;
  }

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
  x: (horizontalMirror ? 1 - point.x : point.x) * bounds.width,
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
 * 
 * @param {Pose|PoseByKeypoint} pose 
 * @returns {Keypoint[]}
 */
export const getKeypointList = (pose) => {
  if (!pose) return [];
  if (`keypoints` in pose) {
    return pose.keypoints;
  } else {
    return keypointNames.map(name => pose[name]);
  }
};

/**
 * 
 * @param {Pose|PoseByKeypoint} pose 
 * @returns {Pose|PoseByKeypoint}
 */
export const ensureBoundingBox = (pose) => {
  if (`box` in pose) return pose;

  const kps = getKeypointList(pose);
  const r = Points.bbox(...kps);
  const box = {
    yMin: r.y,
    yMax: r.y + r.height,
    xMin: r.x,
    xMax: r.x + r.width,
    width: r.width,
    height: r.height
  };

  return {
    // @ts-ignore
    ...pose,
    box: box
  };
};

/**
 * Returns a pose with all keypoints converted to absolute positions
 * @param {Pose|PoseByKeypoint} p 
 * @param {{width:number, height:number}} bounds 
 * @param {boolean} horizontalMirror 
 * @returns {Pose|PoseByKeypoint}
 */
export const absPose = (p, bounds, horizontalMirror = false) => {
  if (p === undefined) throw new Error(`p is undefined`);
  const w = bounds.width;
  const h = bounds.height;

  /**
   * Returns an absolutely-positioned keypoint
   * @param {Keypoint} point 
   * @returns 
   */
  const absPoint = (point) => {
    if (!point) return;
    return {
      ...point,
      x: ((horizontalMirror ? 1  - point.x : point.x)) * w,
      y: point.y * h
    };
  };

  const abs = {
    ...p,
    id: p.id,
    source: p.source,
    score:p.score
  };

  if (`box` in p) {
    abs.box = {
      yMin: p.box.yMin * h,
      yMax: p.box.yMax * h,
      xMin: p.box.xMin * w,
      xMax: p.box.xMax * w,
      width: p.box.width * w,
      height: p.box.height * h
    };
  }

  if (`keypoints` in p) {
    // @ts-ignore
    abs.keypoints = p.keypoints.map(absPoint);
  } else {
    keypointNames.forEach(name => {
      abs[name] = absPoint(p[name]);
    });
  }
  // @ts-ignore
  return abs;
};

/**
 * Draw an absolutely-positioned pose
 * @param {Pose|PoseByKeypoint} p 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {PoseDrawOpts} opts
 */
export const debugDrawPose = (ctx, p, opts = {}) => {
  const radius = opts.pointRadius ?? 10;
  const threshold = opts.threshold ?? 0;
  const fillStyle = opts.colour ?? `black`;
  const lineWidth = opts.lineWidth ?? radius;
  const labelKeypoints = opts.labelKeypoints ?? true;

  ctx.fillStyle = fillStyle;
  ctx.textBaseline = `top`;
  ctx.font = `12pt ${labelFont}`;

  // Draw each keypoint
  const keypoints = (`keypoints` in p) ? p.keypoints : keypointNames.map(n => /** @type {Keypoint} */(p[n]));

  keypoints.forEach(kp => {
    if (!kp) return;
    if (kp.score === undefined || kp.score < threshold) return;
    const pointOpts =  {
      title: labelKeypoints ? kp.name : undefined,
      subTitle: Math.floor(kp.score * 100) + `%`,
      radius,
      lineWidth
    };
    drawAbsPoint(ctx, kp, pointOpts);
  });

  if (opts.connectKeypoints) {
    const m = `keypoints` in p ? poseByKeypoint(p) : p;
    drawAbsKeypointLine(ctx, m, `right_hip`, `right_knee`, opts);
    drawAbsKeypointLine(ctx, m, `left_hip`, `left_knee`, opts);
    drawAbsKeypointLine(ctx, m, `right_elbow`, `right_wrist`, opts);
    drawAbsKeypointLine(ctx, m, `left_elbow`, `left_wrist`, opts);
    drawAbsKeypointLine(ctx, m, `left_knee`, `left_ankle`, opts);
    drawAbsKeypointLine(ctx, m, `right_knee`, `right_ankle`, opts);
    drawAbsKeypointLine(ctx, m, `right_shoulder`, `right_hip`, opts);
    drawAbsKeypointLine(ctx, m, `left_shoulder`, `left_hip`, opts);
    drawAbsKeypointLine(ctx, m, `left_shoulder`, `right_shoulder`, opts);
    drawAbsKeypointLine(ctx, m, `right_shoulder`, `right_elbow`, opts);
    drawAbsKeypointLine(ctx, m, `left_shoulder`, `left_elbow`, opts);
    drawAbsKeypointLine(ctx, m, `left_hip`, `right_hip`, opts);
    drawAbsKeypointLine(ctx, m, `left_eye`, `nose`, opts);
    drawAbsKeypointLine(ctx, m, `right_eye`, `nose`, opts);

  }
};

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {PoseByKeypoint} pose 
 * @param {string} a 
 * @param {string} b 
 * @param {PoseDrawOpts} opts 
 * @returns 
 */
export const drawAbsKeypointLine = (ctx, pose, a, b, opts) => {
  const kpA = pose[a];
  const kpB = pose[b];
  const lineWidth = opts.lineWidth ?? 10;

  if (!kpA || !kpB) return;
  if (opts.threshold) {
    if (kpA.score < opts.threshold || kpB.score < opts.threshold) return;
  }

  ctx.beginPath();
  if (opts.colour) ctx.strokeStyle = opts.colour;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(kpA.x,kpA.y);
  ctx.lineTo(kpB.x, kpB.y);
  ctx.stroke();

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
 * @param {PoseByKeypoint} a 
 * @param {PoseByKeypoint} b 
 */
export const poseSimilarity = (a, b) => {
  let centroidA = Points.centroid(a.nose, a.left_shoulder, a.left_hip, a.right_shoulder, a.right_hip);
  let centroidB = Points.centroid(b.nose, b.left_shoulder, b.left_hip, b.right_shoulder, b.right_hip);
  return 1 - Points.distance(centroidA, centroidB);
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

  document.getElementById(`lnkNewWindow`)?.addEventListener(`click`, evt => {
    document.getElementById(`sourceSection`)?.remove();
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


/**
 * Returns a Pose mapped by keypoint name
 * @param {Pose} pose
 * @returns {PoseByKeypoint} 
 */
export const poseByKeypoint = (pose) => {
  const getKp = (name) => {
    const k = pose.keypoints.find(kp => kp.name === name);
    if (!k) throw new Error(`Keypoint ${name} not found on pose`);
    return k;
  };
  // @ts-ignore
  const hue = `hue` in pose ? pose.hue: -1;
  return {
    score: pose.score ?? 0,
    id: pose.id,
    hue,
    source: pose.source,
    box: pose.box,
    left_eye: getKp(`left_eye`),
    right_eye: getKp(`right_eye`),
    left_elbow: getKp(`left_elbow`),
    right_elbow: getKp(`right_elbow`),
    left_ankle: getKp( `left_ankle`),
    right_ankle: getKp(`right_ankle`),
    left_shoulder: getKp(`left_shoulder`),
    right_shoulder: getKp(`right_shoulder`),
    left_hip: getKp(`left_hip`),
    right_hip: getKp(`right_hip`),
    nose: getKp(`nose`),
    left_wrist: getKp(`left_wrist`),
    right_wrist: getKp(`right_wrist`),
    left_knee: getKp(`left_knee`),
    right_knee: getKp(`right_knee`),
    left_ear: getKp(`left_ear`),
    right_ear: getKp(`right_ear`),
  };
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
 * @property {number} [pointRadius]
 * @property {number} [lineWidth]
 * @property {boolean} [labelKeypoints]
 * @property {boolean} [connectKeypoints]
 */

/**
 * @callback PoseProcess
 * @param {Pose|PoseByKeypoint} pose
 * @param {boolean} [allowOverwrite]
 * @returns {Pose|PoseByKeypoint|undefined}
 */

/**
 * @typedef {object} PoseProcessor
 * @property {PoseProcess} process
 * @property {Pose|PoseByKeypoint|undefined} processed
 * @property {()=>string|undefined} id
 */

/**
 * @typedef {Object} PoseByKeypoint
 * @property {Keypoint} nose
 * @property {Keypoint} left_wrist
 * @property {Keypoint} right_wrist
 * @property {Keypoint} left_ankle
 * @property {Keypoint} right_ankle
 * @property {Keypoint} left_hip
 * @property {Keypoint} right_hip
 * @property {Keypoint} left_knee
 * @property {Keypoint} right_knee
 * @property {Keypoint} left_shoulder
 * @property {Keypoint} right_shoulder
 * @property {Keypoint} left_ear
 * @property {Keypoint} right_ear 
 * @property {Keypoint} left_elbow
 * @property {Keypoint} right_elbow
 * @property {Keypoint} left_eye
 * @property {Keypoint} right_eye
 * @property {string} id
 * @property {string} source
 * @property {number} score
 * @property {number} hue
 * @property {Box} box
 */