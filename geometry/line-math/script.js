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
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  rotatedLine: { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } },
  pointer: { x: 0, y: 0 },
  /** @type {number} */
  distance: 0,
  nearestPoint: { x: 0, y: 0 },
  // Current rotation in radians
  /** @type {number} */
  rotation: 0
});

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

  saveState({
    distance,
    rotatedLine,
    rotation,
    nearestPoint
  });
};


/**
 * Draws a line using relative coordinates
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
const drawRelativeDot = (context, dot, fillStyle = `red`, label = ``) => {
  const { bounds } = state;
  const abs = Points.multiply(dot, bounds.width, bounds.height);

  drawDot(context, abs, fillStyle);
  if (label.length > 0) {
    context.fillStyle = `black`;
    context.fillText(label, abs.x, abs.y);
  }

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
  const { width, height } = state.bounds;
  const { lineStyle, pointerStyle, nearestStyle  } = settings;
  const { pointer, nearestPoint, distance, rotatedLine } = state;
  
  const canvasElement = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));

  const context = canvasElement?.getContext(`2d`);

  if (!context) return;

  // Clear canvas
  context.clearRect(0, 0, width, height);

  // Draw new things
  const lblAngleRad = document.querySelector(`#lblAngleRad`);
  const lblSlope = document.querySelector(`#lblSlope`);
  const lblDistance = document.querySelector(`#lblDistance`);

  // Draw rotated line and end points
  drawRelativeLine(context, rotatedLine, lineStyle);
  drawRelativeDot(context, rotatedLine.a, lineStyle, `A`);
  drawRelativeDot(context, rotatedLine.b, lineStyle, `B`);

  // Draw a dot for the pointer
  drawRelativeDot(context, pointer, pointerStyle);

  // Draw dot for closest point
  drawRelativeDot(context, nearestPoint, nearestStyle);

  // Print out current distance to cursor
  if (lblDistance) lblDistance.textContent = distance.toPrecision(2);
  if (lblAngleRad) lblAngleRad.textContent = Lines.angleRadian(rotatedLine).toPrecision(2);
  if (lblSlope) lblSlope.textContent = Lines.slope(rotatedLine).toPrecision(2);
  
};

function setup() {
  // Resize canvas to match viewport
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds
    });
  });

  document.addEventListener(`pointermove`, event => {
    const { bounds } = state;
    saveState({
      // Calc relative pointer position (on 0..1 scale)
      pointer: Points.divide(event.clientX, event.clientY, bounds.width, bounds.height)
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
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}