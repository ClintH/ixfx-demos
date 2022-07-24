import * as Dom from '../../ixfx/dom.js';
import { Points, Lines, radianToDegree, Polar, degreeToRadian } from '../../ixfx/geometry.js';

const piPi = Math.PI * 2;

// Define settings
const settings = Object.freeze({
  // Line, using relative coordinates
  line: {
    a: {
      x: 0.2,
      y: 0.8
    },
    b: {
      x: 0.8,
      y: 0.2
    }
  },
  // How much to increment by on each loop (radians)
  rotationIncrement: 0.005,
  lineStyle: `#C1FFD7`,
  pointerStyle: `#B5DEFF`,
  nearestStyle: `#CAB8FF`
});

// Initial state with empty values
let state = {
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  rotatedLine: { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } },
  pointer: { x: 0, y: 0 },
  distance: 0,
  nearestPoint: { x: 0, y: 0 },
  // Current rotation in radians
  rotation: 0
};

// Update state of world
const update = () => {
  const { line, rotationIncrement } = settings;
  let { pointer, rotation } = state;

  rotation += rotationIncrement;

  // Rotate around middle of line
  const origin = Lines.interpolate(0.5, line);

  // Compute rotated line
  const rotatedLine = Lines.rotate(line, rotation, origin);

  // Compute distance to pointer, and nearest point on line
  const distance = Lines.distance(rotatedLine, pointer);
  const nearestPoint = Lines.nearest(rotatedLine, pointer);

  updateState({
    distance,
    rotatedLine,
    rotation,
    nearestPoint
  });
};

/**
 * Update state
 * @param {Partial<state>} s 
 */
const updateState = (s) => {
  state = {
    ...state,
    ...s
  };
};

/**
 * Draws a line using relative coordinates
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
const drawRelativeDot = (ctx, dot, fillStyle = `red`, label = ``) => {
  const { bounds } = state;
  const abs = Points.multiply(dot, bounds.width, bounds.height);

  drawDot(ctx, abs, fillStyle);
  if (label.length > 0) {
    ctx.fillStyle = `black`;
    ctx.fillText(label, abs.x, abs.y);
  }

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
  const { width, height } = state.bounds;
  const { lineStyle, pointerStyle, nearestStyle  } = settings;
  const { pointer, nearestPoint, distance, rotatedLine } = state;
  
  const canvasEl = /** @type {HTMLCanvasElement|null} */(document.getElementById(`canvas`));

  const ctx = canvasEl?.getContext(`2d`);

  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw new things
  const lblAngleRad = document.getElementById(`lblAngleRad`);
  const lblSlope = document.getElementById(`lblSlope`);
  const lblDistance = document.getElementById(`lblDistance`);

  // Draw rotated line and end points
  drawRelativeLine(ctx, rotatedLine, lineStyle);
  drawRelativeDot(ctx, rotatedLine.a, lineStyle, `A`);
  drawRelativeDot(ctx, rotatedLine.b, lineStyle, `B`);

  // Draw a dot for the pointer
  drawRelativeDot(ctx, pointer, pointerStyle);

  // Draw dot for closest point
  drawRelativeDot(ctx, nearestPoint, nearestStyle);

  // Print out current distance to cursor
  if (lblDistance) lblDistance.innerText = distance.toPrecision(2);
  if (lblAngleRad) lblAngleRad.innerText = Lines.angleRadian(rotatedLine).toPrecision(2);
  if (lblSlope) lblSlope.innerText = Lines.slope(rotatedLine).toPrecision(2);
  
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Resize canvas to match viewport
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({
      bounds: args.bounds
    });
  });

  document.addEventListener(`pointermove`, e => {
    const { bounds } = state;
    updateState({
      // Calc relative pointer position (on 0..1 scale)
      pointer: Points.divide(e.clientX, e.clientY, bounds.width, bounds.height)
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
