import * as Dom from '../../ixfx/dom.js';
import { Colour } from '../../ixfx/visual.js';
import { Points, Lines } from '../../ixfx/geometry.js';

const piPi = Math.PI * 2;

// Define settings
const settings = Object.freeze({
  // Set up three lines, using relative coordinates
  lineMid: {
    a: { x: 0.1, y: 0.5 },
    b: { x: 0.3, y: 0.5 }
  },
  lineStart: {
    a: { x: 0.5, y: 0.5 },
    b: { x: 0.65, y: 0.5 }
  },
  lineEnd: {
    a: { x: 0.7, y: 0.5 },
    b: { x: 0.8, y: 0.5 }
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
  saveState({
    lineMid: Lines.rotate(lineMid, rotation),
    lineStart: Lines.rotate(lineStart, rotation, 0),
    lineEnd: Lines.rotate(lineEnd, rotation, 1),
    rotation
  });
};

/**
 * Draw a line based on relative coordinates
 * @param {CanvasRenderingContext2D} context 
 * @param {{a:{x:number,y:number}, b:{x:number,y:number}}} line 
 * @param {string} strokeStyle
 */
const drawRelativeLine = (context, line, strokeStyle = `yellow`) => {
  const { bounds } = state;
  const a = Points.multiply(line.a, bounds.width, bounds.height);
  const b = Points.multiply(line.b, bounds.width, bounds.height);

  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.lineWidth = 4;
  context.moveTo(a.x, a.y);
  context.lineTo(b.x, b.y);
  context.stroke();
};

/**
 * Draw a dot at a relative position
 * @param {CanvasRenderingContext2D} context 
 * @param {{x:number, y:number}} dot 
 * @param {string} fillStyle 
 */
const drawRelativeDot = (context, dot, fillStyle = `red`) => {
  const { bounds } = state;
  const abs = Points.multiply(dot, bounds.width, bounds.height);
  drawDot(context, abs, fillStyle);
};

/**
 * Draw a dot at an absolute position
 * @param {CanvasRenderingContext2D} context 
 * @param {{x:number, y:number}} dot 
 * @param {string} fillStyle 
 */
const drawDot = (context, dot, fillStyle = `red`) => {
  context.beginPath();
  context.fillStyle = fillStyle;
  context.arc(dot.x, dot.y, 5, 0, piPi);
  context.fill();
};

const use = () => {
  const { lineStyle } = settings;
  const { lineMid, lineStart, lineEnd } = state;
  const { width, height } = state.bounds;

  const canvasElement = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const context = canvasElement?.getContext(`2d`);

  if (!context) return;

  // Clear
  context.clearRect(0, 0, width, height);

  // Draw each line, and show the point by which it is rotating...
  drawRelativeLine(context, lineMid, lineStyle);
  drawRelativeDot(context, Lines.interpolate(0.5, lineMid), lineStyle);

  drawRelativeLine(context, lineStart, lineStyle);
  drawRelativeDot(context, Lines.interpolate(0, lineStart), lineStyle);

  drawRelativeLine(context, lineEnd, lineStyle);
  drawRelativeDot(context, Lines.interpolate(1, lineEnd), lineStyle);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds
    });
  });

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();

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