import * as Dom from '../../ixfx/dom.js';
import { scale, scaler } from '../../ixfx/data.js';
import { Oscillators, perSecond } from '../../ixfx/modulation.js';
import { continuously } from '../../ixfx/flow.js';
import { Points, Polar, Scaler, degreeToRadian } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  /**
   * Scales 0..1 to 0.1..0.5
   * This limits range of arm movement: 10% to 50%
   */
  armLengthScale: scaler(0, 1, 0.5, 0.5),
  /**
   * Scales 0..1 to -150...50
   * This limits range of arm angle movement (degrees)
   */
  armAngleScale: scaler(0, 1, -170, -90),
  /**
   * Rotate once per second
   */
  rotationByTime: perSecond(degreeToRadian(0.1)),
  drawRateMs: 50,
  /**
   * If true, the drawing arm is drawn
   */
  drawArm: true,
  /**
 * Position arm at the middle, bottom of screen
 */
  armOrigin: { x: 0.5, y: 1 },
  // Sine wave oscillator that modulates length of drawing arm
  osc: Oscillators.sine(0.1),
  osc2: Oscillators.sine(0.15),
  overlayCanvas: new Dom.CanvasHelper(`#overlay`, {
    fill: `viewport`, onResize: (context, size) => {
      saveState({
        scaleBy: Math.min(size.height, size.width)
      });
    }
  }),
  composedCanvas: new Dom.CanvasHelper(`#canvas`, { fill: `viewport` })
});

let state = Object.freeze({
  /** 
   * Current canvas angle of rotation,
   * in radians
   * @type number */
  rotation: 0,
  /** 
   * Angle of arm in radians
   */
  armAngle: degreeToRadian(-90),
  /** 
   * Computed end point of arm
   * Relative coordinates
   */
  armEndAbsolute: { x: 0, y: 0 },
  /** @type number */
  scaleBy: 1,
  armThickness: 20,
  /** @type number */
  lastDraw: 0
});

/**
 * Update state
 * This calculates everything necessary for drawing 
 * (which happens in the 'use' function)
 */
const update = () => {
  const { rotationByTime, armOrigin, osc, osc2, armLengthScale, armAngleScale } = settings;
  const { rotation, scaleBy } = state;

  // Initial arm length - will be overriden by oscillator value
  let armLength = 0.5;
  let armAngle = -90;

  // Modulate length of arm
  // 1. Get current value from the oscillator
  let oscillatorValue = osc.next().value;
  // 2. Scale value (if valid) according to the allowed range of the arm length
  if (oscillatorValue) {
    armLength = armLengthScale(oscillatorValue) * scaleBy;
  }

  oscillatorValue = osc2.next().value;
  if (oscillatorValue) {
    armAngle = degreeToRadian(armAngleScale(oscillatorValue));
  }

  const armEndAbsolute = Polar.toCartesian(armLength, armAngle, Points.multiply(armOrigin, window.innerWidth, window.innerHeight));

  saveState({
    armEndAbsolute,
    rotation: rotation + rotationByTime()
  });
};

const use = async () => {
  const { armOrigin, composedCanvas, drawRateMs } = settings;
  const { armEndAbsolute, rotation, lastDraw } = state;

  const ratio = composedCanvas.ratio;

  // Absolute position of arm start & end
  const armAbsolute = {
    // Start
    a: Points.multiply(armOrigin, window.innerWidth, window.innerHeight),
    // End
    b: armEndAbsolute
  };

  const composedCtx = composedCanvas.ctx;
  const off = new OffscreenCanvas(composedCanvas.width * ratio, composedCanvas.height * ratio);
  const offCtx = off.getContext(`2d`);
  if (offCtx) {
    offCtx.scale(1 / ratio, 1 / ratio);
    //offCtx.imageSmoothingQuality = `high`;
    //offCtx.imageSmoothingEnabled = false;
    offCtx.drawImage(composedCanvas.el, 0, 0);
  }
  composedCtx.clearRect(0, 0, composedCanvas.width, composedCanvas.height);
  composedCtx.save();
  composedCtx.imageSmoothingQuality = `high`;
  composedCtx.imageSmoothingEnabled = false;
  composedCtx.translate(composedCanvas.width / 2, composedCanvas.height / 2);
  composedCtx.rotate(rotation);
  composedCtx.drawImage(off, -composedCanvas.width / 2, -composedCanvas.height / 2);
  composedCtx.restore();

  const elapsed = performance.now() - lastDraw;
  if (elapsed >= drawRateMs) {
    composedCtx.save();
    composedCtx.translate(armAbsolute.b.x, armAbsolute.b.y);
    drawAtArmEnd(composedCtx);
    composedCtx.restore();
    saveState({ lastDraw: performance.now() });
  }
  if (settings.drawArm) drawArm(armAbsolute);
};

/**
 * Draw whatever is meant to be at the tip of the drawing arm.
 * Drawing context is pre-transformed so that 0,0 is the
 * end of the drawing arm.
 * @param {CanvasRenderingContext2D} ctx
 */
const drawAtArmEnd = (ctx) => {
  const radius = 10;
  ctx.beginPath();

  // Draw a circle
  //ctx.arc(-radius / 2, 0, radius, 0, Math.PI * 2);
  //ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.1)`;
  //ctx.fill();
  ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.1)`;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.stroke();
  ctx.closePath();
  hue += 0.1;
  if (hue === 360) hue = 0;

};

let hue = 0;

/**
 * Draws the arm of the drawing machine
 * @param {import('../../ixfx/geometry.js').Line} armAbsolute
 */
const drawArm = (armAbsolute) => {
  const { overlayCanvas } = settings;
  const { armThickness } = state;
  overlayCanvas.clear();
  const { ctx } = overlayCanvas;
  ctx.strokeStyle = `hsl(0,0%,30%)`;
  ctx.lineWidth = armThickness;
  ctx.beginPath();
  ctx.lineCap = `round`;
  ctx.moveTo(armAbsolute.a.x, armAbsolute.a.y);
  ctx.lineTo(armAbsolute.b.x, armAbsolute.b.y);
  ctx.stroke();
  ctx.closePath();
};
function setup() {
  continuously(async () => {
    update();
    await use();
  }).start();
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

