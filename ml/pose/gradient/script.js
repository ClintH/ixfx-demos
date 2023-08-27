// #region Imports
import { Correlate, interpolate } from '../../../ixfx/data.js';

// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
import { Pool,scale } from '../../../ixfx/data.js';
import { Points, Rects, Triangles } from '../../../ixfx/geometry.js';
import * as CommonPose from '../common-pose.js';
// #endregion

// #region Settings & state
const settings = Object.freeze({
  correlateOpts: {
    matchThreshold: 0.2
  },
  interpolateAmt: 0.1,
  // If true, x-axis is flipped
  horizontalMirror: false,
  // Remote instance to receive data
  remote: new Remote(),
  // Pool to manage gradient stops
  // Poses will be assigned a value from the pool
  gradientStops: new Pool.Pool({
    // Assigned pose expires after 2s
    userExpireAfterMs: 500,
    resourcesWithoutUserExpireAfterMs: 1000,
    // Limit for number of stops
    capacity: 5,
    // Generate a new gradient stop
    // This is called on demand
    generate: () => {
      const hue = state.hue + 80;
      saveState({ hue:hue });
      return {
        position: -1,
        index: -1,
        hue: hue
      };
    }
  }),
  // Size of colour chip in gradient preview
  chipSize: 40,
  // Thickness of lines in gradient preview
  lineWidth: 10,
  // Rectangle for gradient preview
  gradientRect: {
    x: 0.1,
    y: 0.5,
    width: 0.8,
    height: 0.2
  }
});

let state = Object.freeze({
  /**
   * Bounds of the viewport. Needed for going back and forth from
   * relative to absolute coordinates
   */
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } },
  /** 
   * Current poses
   * @type {PoseWithExtra[]} */
  poses:[],
  /**
   * How to scale relative coordinates
   */
  scaleBy: { width: 0, height: 0 },
  /** 
   * Where we are in assigning hues
   * @type {number} */
  hue: 10
});
// #endregion

/**
 * Called in a loop at animation speed (see setup())
 * @returns 
 */
const use = () => {
  drawState();
};


/**
 * Received a set of poses from a source
 * @param {Pose[]} poses 
 */
const onData = (poses) => {
  const { gradientRect, correlateOpts, interpolateAmt } = settings;

  // Compute extra data for each pose
  const posesWithExtra = /** @type {PoseWithExtra[]} */(poses.map(p => {
    // Centroid of all points
    const centroid = Points.centroid(...p.keypoints);

    // 100% pose height (ie full camera frame) == height of gradient bar
    const scalePoseBy = p.box.height * gradientRect.height;

    return {
      ...p,
      // Add height, centroid
      height: p.box.height,
      centroid: centroid,
      // Transform each keypoint
      keypoints: p.keypoints.map(kp => {
        // Rebase so that centroid is 0,0
        let pt = Points.subtract(kp, centroid);
        // Scale
        pt = Points.multiplyScalar(pt, scalePoseBy);
        return {
          ...kp,
          ...pt
        };
      })
    };
  }));

  const alignedPoses = /** @type {PoseWithExtra[]} */(Correlate.align(poseCentroidSimilarity, state.poses, posesWithExtra, correlateOpts));

  settings.gradientStops.maintain();

  // Sort poses left to right by their centroid
  alignedPoses.sort((a, b) => {
    return Points.compareByX(a.centroid, b.centroid);
  });

  // Make sure there are gradient stops for each pose
  for (const [index, pose] of alignedPoses.entries()) {
    const stop = settings.gradientStops.useValue(index.toString());
    stop.index = index;

    // Calculate new gradient stop position
    const poseScaled = scale(pose.centroid.x,  gradientRect.x, gradientRect.x + gradientRect.width);

    // Only set stop position if it seems legit
    if (poseScaled >= 0 && poseScaled <= 1) {
      stop.position = interpolate(interpolateAmt, stop.position, poseScaled); 
    }
  }

  saveState({ poses: alignedPoses });
};

const drawState = () => {
  const { poses, bounds  } = state;
  const { gradientStops } = settings;

  const gradRect = /** @type {Rects.RectPositioned} */(Rects.multiply(settings.gradientRect, state.bounds));

  const canvasElement = /** @type {HTMLCanvasElement|null}*/(document.querySelector(`#canvas`));
  const context = canvasElement?.getContext(`2d`);
  if (!context) return;

  // Transparent background
  context.clearRect(0, 0, bounds.width, bounds.height);
  
  // Draw each pose
  for (const [index, pose] of poses.entries()) {
    // Get associated gradient stop
    const stop = gradientStops.useValue(index.toString());

    // Horizontal position
    const x = stop.position * gradRect.width + gradRect.x;

    // Draw mini-pose
    context.save();
    context.translate(x, gradRect.y - (pose.height*gradRect.height));
    drawPose(context, pose);
    context.restore();
  }

  drawGradient(context, gradRect);
};

/**
 * Draws gradient preview
 * @param {CanvasRenderingContext2D} context 
 * @param {Rects.RectPositioned} gradRect 
 */
const drawGradient = (context, gradRect) => {
  const { lineWidth, chipSize, gradientStops } = settings;
  const chipOuter = chipSize + lineWidth;
  const chipY = gradRect.y + gradRect.height + chipOuter;

  // Draw black outline for gradient
  context.strokeStyle =`black`;
  context.lineWidth = lineWidth;
  context.strokeRect(
    gradRect.x - lineWidth/2, 
    gradRect.y - lineWidth/2, 
    gradRect.width+lineWidth, 
    gradRect.height+lineWidth);

  // Init gradient
  const gradient = context.createLinearGradient(gradRect.x, gradRect.y, gradRect.x + gradRect.width, gradRect.y );
  
  // Draw stops
  for (const stop of gradientStops.values()) {
    const x = stop.position * gradRect.width + gradRect.x;
    const colour = `hsl(${stop.hue}, 100%, 50%)`;

    // Add pose as a stop on the gradient
    if (stop.position > 0 && stop.position <= 1)
      gradient.addColorStop(stop.position, colour);

    context.save();
    context.translate(x, chipY);
   
    // Black inner
    context.strokeStyle = `black`;
    context.lineWidth = lineWidth;
    context.strokeRect(-chipOuter/2, 0, chipOuter, chipOuter);

    // Chip colour
    context.fillStyle = colour;
    context.fillRect(-chipSize/2, lineWidth/2, chipSize, chipSize);

    // Triangle
    const t = Triangles.Right.fromC({ adjacent:chipOuter-lineWidth, opposite: chipOuter-lineWidth }, { x: 0, y:-chipOuter/2 - lineWidth });
    context.lineWidth = lineWidth/3;
    drawTriangle(context, t);

    context.restore();
  }

  // Draw gradient
  context.fillStyle = gradient;
  context.fillRect(gradRect.x, gradRect.y, gradRect.width, gradRect.height);
};

const setup = async () => {
  const { remote } = settings;

  /**
   * Received data from remote
   * @param {ReceivedData} d 
   */
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onData(d.data);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Resize canvas to fill screen
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    saveState({ 
      bounds: arguments_.bounds, 
      scaleBy: {
        width: Math.max(arguments_.bounds.width, arguments_.bounds.height),
        height: Math.max(arguments_.bounds.width, arguments_.bounds.height)
      }
    });
  });

  const drawLoop = () => {
    use();
    window.requestAnimationFrame(drawLoop);
  };
  window.requestAnimationFrame(drawLoop);

  // Listen for button presses, etc
  CommonPose.setup();
};
setup();

// #region Toolbox
/**
 * Draw pose
 * @param {CanvasRenderingContext2D} context 
 * @param {import("../common-pose.js").Pose} pose
 */
function drawPose(context, pose)  {
  if (pose === undefined) throw new Error(`pose is undefined`);
  // Get pose in absolute coordinates (absPoint is defined in common-pose.js)
  const abs = CommonPose.absPose(pose, state.scaleBy, settings.horizontalMirror);
  const colour = `hsla(0,0%,55%,100%)`; 

  const stroke = state.bounds.width/200;

  // Draw pose (debugDrawPose is defined in common-pose.js)
  CommonPose.debugDrawPose(context, abs, {
    colour,
    labelKeypoints: false,
    connectKeypoints: true,
    pointRadius: 2,
    lineWidth: stroke
  });
}

/**
 * Returns a similarity score for two poses, based on their centroid
 * @param {PoseWithExtra} a 
 * @param {PoseWithExtra} b 
 * @returns 
 */
function poseCentroidSimilarity (a, b) {
  return 1-Points.distance(a.centroid, b.centroid);
}

/**
 * Saves state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Draws a triangle
 * @param {CanvasRenderingContext2D} context 
 * @param {Triangles.Triangle} t 
 */
function drawTriangle(context, t) {
  const tEdges = Triangles.corners(t);
  context.beginPath();
  context.moveTo(tEdges[0].x, tEdges[0].y);
  context.lineTo(tEdges[1].x, tEdges[1].y);
  context.lineTo(tEdges[2].x, tEdges[2].y);
  context.lineTo(tEdges[0].x, tEdges[0].y);
  context.fillStyle = `black`;
  context.fill();
  context.stroke();
}
// #endregion

/**
 * @typedef { import("../../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../../common-vision-source").Box } Box
 * @typedef { import("../../common-vision-source").Pose } Pose
 * @typedef { import("../../common-vision-source").ReceivedData } ReceivedData
 */

/**
 * @typedef {Pose & ExtraPoseData} PoseWithExtra
 */

/**
 * @typedef ExtraPoseData
 * @property {Points.Point} centroid
 * @property {number} height
 */

/**
 * @typedef GradientStop
 * @property {number} position
 * @property {number} index
 * @property {number} hue
 */