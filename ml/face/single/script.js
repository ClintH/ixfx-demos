// #region Imports
// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../../ixfx/dom.js';
import { Points } from '../../../ixfx/geometry.js';
import * as CommonFace from '../common-face.js';
// #endregion

// #region Settings & state
const settings = Object.freeze({
  horizontalMirror: true,
  // Interpolation amount applied per frame (0...1)
  // Lower = less jitter & more latency. Higher = more jitter & lower latency
  smoothingAmt: 0.2,
  pointRadius: 0.01,
  remote: new Remote(),
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`
});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type {FaceByKeypoint|undefined} */
  processedFace: undefined
});
// #endregion

/**
 * Received data
 * @param {Face[]} faces 
 */
const onData = (faces) => {
  const { smoothingAmt } = settings;
  // Dump raw data
  //console.log(faces);
    
  if (faces.length === 0) return;

  const targetFace = CommonFace.faceByKeypoint(faces[0]);

  // Smooth the first face
  // Multiple faces are not smoothed, because we cannot be sure that the
  // indexes of bodies are consistent
  const processedFace = CommonFace.smooth(smoothingAmt, state.processedFace, targetFace);

  // Save processed face
  saveState({ 
    processedFace
  });
};


/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} context 
 */
const clear = (context) => {
  const { width, height } = state.bounds;

  // Make background transparent
  context.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};

const use = () => {
  const { processedFace, bounds } = state;
  const { pointRadius, horizontalMirror } = settings;
  if (processedFace === undefined) return;

  const canvasElement = /** @type {HTMLCanvasElement|null}*/(document.querySelector(`#canvas`));
  const context = canvasElement?.getContext(`2d`);
  if (!context) return;

  // Clear and draw current state
  clear(context);

  // Convert coordinates to viewport-relative coordinates
  const abs = /** @type {FaceByKeypoint} */(CommonFace.absFace(processedFace, bounds, horizontalMirror));

  const pointRadiusAbs = pointRadius * bounds.width; 
  CommonFace.debugDrawFace(context, abs, {
    pointRadius: pointRadiusAbs,
    colour: `black`
  });
};

const setup = async () => {
  const { remote } = settings;

  // Listen for data from the remote
  remote.onData = (d) => {
    if (d.data && Array.isArray(d.data)) {
      onData(d.data);
    } else {
      console.warn(`Got data we did not expect`);
      console.log(d);
    }
  };

  // Fill viewport with Canvas element
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    saveState({ bounds: arguments_.bounds });
  });

  // Loop
  const loop = () => {
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);

  // Set up UI event handlers for the mini-source window
  CommonFace.setup();

};
setup();

// #region Toolbox
/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
/**
 * @typedef { import("../../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../../common-vision-source").Box } Box
 * @typedef { import("../../common-vision-source").FaceByKeypoint } FaceByKeypoint
 * @typedef { import("../../common-vision-source").Face } Face
 * @typedef { import("../../common-vision-source").FaceKeypoint } FaceKeypoint
 */

// #endregion