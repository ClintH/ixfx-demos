import { CanvasHelper } from '../../ixfx/dom.js';
import { Colour } from '../../ixfx/visual.js';
import { Points, Lines } from '../../ixfx/geometry.js';

const piPi = Math.PI * 2;

// Define settings
const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
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
 * @param {CanvasHelper} canvas 
 * @param {{a:{x:number,y:number}, b:{x:number,y:number}}} line 
 * @param {string} strokeStyle
 */
const drawRelativeLine = (canvas, line, strokeStyle = `yellow`) => {
  const { ctx } = canvas;
  const a = canvas.toAbsolute(line.a);
  const b = canvas.toAbsolute(line.b);

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 4;
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
};

/**
 * Draw a dot at a relative position
 * @param {CanvasHelper} canvas 
 * @param {{x:number, y:number}} dot 
 * @param {string} fillStyle 
 */
const drawRelativeDot = (canvas, dot, fillStyle = `red`) => {
  const { ctx } = canvas;
  const abs = canvas.toAbsolute(dot);

  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.arc(abs.x, abs.y, 5, 0, piPi);
  ctx.fill();
};

const use = () => {
  const { canvas, lineStyle } = settings;
  const { lineMid, lineStart, lineEnd } = state;
  const { ctx, width, height } = canvas;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Draw each line, and show the point by which it is rotating...
  drawRelativeLine(canvas, lineMid, lineStyle);
  drawRelativeDot(canvas, Lines.interpolate(0.5, lineMid), lineStyle);

  drawRelativeLine(canvas, lineStart, lineStyle);
  drawRelativeDot(canvas, Lines.interpolate(0, lineStart), lineStyle);

  drawRelativeLine(canvas, lineEnd, lineStyle);
  drawRelativeDot(canvas, Lines.interpolate(1, lineEnd), lineStyle);
};

/**
 * Setup and run main loop 
 */
const setup = () => {


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
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}