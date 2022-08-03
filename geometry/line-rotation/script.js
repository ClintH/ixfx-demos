import * as Dom from '../../ixfx/dom.js';
import { Colour } from '../../ixfx/visual.js';
import { Points, Lines } from '../../ixfx/geometry.js';

const piPi = Math.PI * 2;

// Define settings
const settings = Object.freeze({
  // Set up three lines, using relative coordinates
  lineMid: {
    a: { x: 0.10, y: 0.5 },
    b: { x: 0.3, y: 0.5 }
  },
  lineStart: {
    a: { x: 0.5, y: 0.5 },
    b: { x: 0.65, y: 0.5 }
  },
  lineEnd: {
    a: { x: 0.7, y: 0.5 },
    b: { x: 0.80, y: 0.5 }
  },
  // How much to increment by on each loop (radians)
  rotationIncrement: 0.005,
  lineStyle: Colour.getCssVariable(`fg`, `#22EACA`)
});

// Initial state with empty values
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  lineMid: { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } },
  lineStart: { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } },
  lineEnd: { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } },
  // Current rotation in radians
  /** @type {number} */
  rotation: 0
});

// Update state of world
const update = () => {
  const { lineMid, lineStart, lineEnd, rotationIncrement } = settings;
  let { rotation } = state;

  rotation += rotationIncrement;
  updateState({
    lineMid: Lines.rotate(lineMid, rotation),
    lineStart: Lines.rotate(lineStart, rotation, 0),
    lineEnd: Lines.rotate(lineEnd, rotation, 1),
    rotation
  });
};

/**
 * Draw a line based on relative coordinates
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{a:{x:number,y:number}, b:{x:number,y:number}}} line 
 * @param {string} strokeStyle
 */
const drawRelativeLine = (ctx, line, strokeStyle = `yellow`) => {
  const { bounds } = state;
  const a = Points.multiply(line.a, bounds.width, bounds.height);
  const b = Points.multiply(line.b, bounds.width, bounds.height);

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 4;
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
};

/**
 * Draw a dot at a relative position
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number, y:number}} dot 
 * @param {string} fillStyle 
 */
const drawRelativeDot = (ctx, dot, fillStyle = `red`) => {
  const { bounds } = state;
  const abs = Points.multiply(dot, bounds.width, bounds.height);
  drawDot(ctx, abs, fillStyle);
};

/**
 * Draw a dot at an absolute position
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number, y:number}} dot 
 * @param {string} fillStyle 
 */
const drawDot = (ctx, dot, fillStyle = `red`) => {
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.arc(dot.x, dot.y, 5, 0, piPi);
  ctx.fill();
};

const useState = () => {
  const { lineStyle } = settings;
  const { lineMid, lineStart, lineEnd } = state;
  const { width, height } = state.bounds;

  const canvasEl = /** @type {HTMLCanvasElement|null} */(document.getElementById(`canvas`));
  const ctx = canvasEl?.getContext(`2d`);

  if (!ctx) return;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Draw each line, and show the point by which it is rotating...
  drawRelativeLine(ctx, lineMid, lineStyle);
  drawRelativeDot(ctx, Lines.interpolate(0.5, lineMid), lineStyle);

  drawRelativeLine(ctx, lineStart, lineStyle);
  drawRelativeDot(ctx, Lines.interpolate(0, lineStart), lineStyle);

  drawRelativeLine(ctx, lineEnd, lineStyle);
  drawRelativeDot(ctx, Lines.interpolate(1, lineEnd), lineStyle);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({
      bounds: args.bounds
    });
  });

  const loop = () => {
    update();
    useState();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
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