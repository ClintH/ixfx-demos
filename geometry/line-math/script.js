import { CanvasHelper } from '../../ixfx/dom.js';
import { Points, Lines, radianToDegree, Polar, degreeToRadian } from '../../ixfx/geometry.js';

const piPi = Math.PI * 2;

// Define settings
const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
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
 * @param {{a:{x:number,y:number}, b:{x:number,y:number}}} line 
 * @param {string} strokeStyle
 */
const drawRelativeLine = (line, strokeStyle = `yellow`) => {
  const { canvas } = settings;
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
 * @param {{x:number, y:number}} dot 
 * @param {string} fillStyle 
 */
const drawRelativeDot = (dot, fillStyle = `red`, label = ``) => {
  const { canvas } = settings;
  const { ctx } = canvas;
  const abs = canvas.toAbsolute(dot);

  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.arc(abs.x, abs.y, 5, 0, piPi);
  ctx.fill();

  if (label.length > 0) {
    ctx.fillStyle = `black`;
    ctx.fillText(label, abs.x, abs.y);
  }
};


const use = () => {
  const { canvas, lineStyle, pointerStyle, nearestStyle } = settings;
  const { ctx, width, height } = canvas;
  const { pointer, nearestPoint, distance, rotatedLine } = state;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw new things
  const lblAngleRad = document.querySelector(`#lblAngleRad`);
  const lblSlope = document.querySelector(`#lblSlope`);
  const lblDistance = document.querySelector(`#lblDistance`);

  // Draw rotated line and end points
  drawRelativeLine(rotatedLine, lineStyle);
  drawRelativeDot(rotatedLine.a, lineStyle, `A`);
  drawRelativeDot(rotatedLine.b, lineStyle, `B`);

  // Draw a dot for the pointer
  drawRelativeDot(pointer, pointerStyle);

  // Draw dot for closest point
  drawRelativeDot(nearestPoint, nearestStyle);

  // Print out current distance to cursor
  if (lblDistance) lblDistance.textContent = distance.toPrecision(2);
  if (lblAngleRad) lblAngleRad.textContent = Lines.angleRadian(rotatedLine).toPrecision(2);
  if (lblSlope) lblSlope.textContent = Lines.slope(rotatedLine).toPrecision(2);

};

function setup() {
  const { canvas } = settings;
  document.addEventListener(`pointermove`, event => {
    saveState({
      // Calc relative pointer position (on 0..1 scale)
      pointer: canvas.toRelative({ x: event.clientX, y: event.clientY })
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
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}