/**
 * This sketch expects a single source. Although it stores all received faces,
 * it smoothes and draws only the first.
 */
// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  horizontalMirror: true,
  // Interpolation amount applied per frame (0...1)
  // Lower = less jitter & more latency. Higher = more jitter & lower latency
  smoothingAmt: 0.2,
  remote: new Remote(),
  labelFont: `"Cascadia Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`
});

let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type {Face[]} */
  faces: [],
  /** @type {Face|undefined} */
  smoothedFace: undefined
});

/**
 * Received data
 * @param {Face[]} faces 
 */
const onData = (faces) => {
  const { smoothingAmt } = settings;
  // Dump raw data
  //console.log(faces);
    
  if (faces.length === 0) return;
  
  // Smooth the first face
  // Multiple faces are not smoothed, because we cannot be sure that the
  // indexes of bodies are consistent
  const firstFace = smooth(smoothingAmt, state.smoothedFace, faces[0]);
  updateState({ 
    faces,
    smoothedFace: firstFace
  });
};

/**
 * Smooth a set of key points for a face.
 * @param {number} amt
 * @param {Face|undefined} a 
 * @param {Face} b 
 */
const smooth = (amt, a, b) => {
  if (a === undefined && b === undefined) return;
  if (a === undefined) return b;

  // Assumes keypoint indexes match up.
  const smoothed = a.keypoints.map((kp, index) => smoothKeypoint(amt, kp, b.keypoints[index], index));
  return {
    ...b,
    keypoints: smoothed
  };
};

/**
 * Smooths a single face key point
 * @param {number} amt 
 * @param {FaceKeypoint} a 
 * @param {FaceKeypoint} b 
 * @returns 
 */
const smoothKeypoint = (amt, a, b, index) => {
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
 * Draw a face
 * @param {Face} p 
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx, p) => {
  const { horizontalMirror, labelFont } = settings;
  const { bounds } = state;

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
    x: ((horizontalMirror ? 1 : 0) - point.x) * bounds.width,
    y: point.y * bounds.height
  });

  // Draw each keypoint
  p.keypoints.forEach(kp => {
    const abs = absPoint(kp);

    // Translate canvas to be centered on predicted object
    ctx.save();
    ctx.translate(abs.x, abs.y);

    // Draw a circle
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw label for key point
    drawCenteredText(kp.name, ctx, 0, textOffsetY);

    // Undo translate transform
    ctx.restore();
  });


};

// Draw text centered by taking into account its drawn size
const drawCenteredText = (msg, ctx, offsetX, offsetY) => {
  const x = offsetX ?? 0;
  const y = offsetY ?? 0;
  const txt = ctx.measureText(msg);
  ctx.fillText(msg,
    -(txt.width / 2) + x,
    -((txt.fontBoundingBoxDescent + txt.fontBoundingBoxAscent) / 2) + y);
  return txt;
};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};

const useState = () => {
  const { smoothedFace } = state;

  const canvasEl = /** @type {HTMLCanvasElement|null}*/(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear and draw current state
  clear(ctx);
  
  if (smoothedFace === undefined) return;
  draw(ctx, smoothedFace);
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

  // Keep CANVAS filling the screen
  Dom.fullSizeCanvas(`#canvas`, args => {
    updateState({ bounds: args.bounds });
  });

  // Loop
  const loop = () => {
    useState();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);

  document.getElementById(`btnCloseFrame`)?.addEventListener(`click`, evt => {
    document.getElementById(`sourceSection`)?.remove();
    const el = evt.target;
    if (el) /** @type {HTMLElement} */(el).remove(); // Remove button too
  });
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
/**
 * @typedef { import("../common-vision-source").Keypoint } Keypoint
 * @typedef { import("../common-vision-source").Box } Box
 * @typedef { import("../common-vision-source").Face } Face
 * @typedef { import("../common-vision-source").FaceKeypoint } FaceKeypoint
 */
