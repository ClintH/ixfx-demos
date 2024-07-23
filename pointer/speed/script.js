import { Points } from '../../ixfx/geometry.js';
import { movingAverage, scalePercent, scaleClamped } from '../../ixfx/numbers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Maximum speed for either x/y
  // This determines the scaling of speed
  maxSpeed: 1,
  // Range for font width
  fontWidth: [50, 200],
  // Range for font weight
  fontWeight: [200, 900],
  // Two moving averagers for x,y
  // Average over 30 samples
  avg: {
    x: movingAverage(30),
    y: movingAverage(30)
  },
  // Update rate for calculating speed (milliseconds)
  updateRateMs: 50
});

/**
 * @typedef {{
 * distance: number
 * lastUpdate: number
 * movement: Points.Point
 * speed: Points.Point
 * speedAvg: Points.Point
 * }} State
 */

/** @type State */
let state = Object.freeze({
  distance: 0,
  // Accumulates movement in x,y
  movement: { x: 0, y: 0 },
  // Current speed in x,y
  speed: { x: 0, y: 0 },
  // Output of x,y movingAveragers
  speedAvg: { x: 0, y: 0 },
  lastUpdate: Date.now()
});

const update = () => {
  const { avg } = settings;
  const { movement, lastUpdate } = state;
  const now = performance.now();

  // Speed in x,y, made relative.
  const speed = {
    x: scale(movement.x / (now - lastUpdate)),
    y: scale(movement.y / (now - lastUpdate))
  };

  let speedAvg = {
    x: avg.x(speed.x),
    y: avg.y(speed.y)
  };

  saveState({
    movement: { x: 0, y: 0 }, // Reset accumulated movement
    lastUpdate: now,
    speed,
    speedAvg
  });
};

const use = () => {
  const { speed, speedAvg } = state;
  const { fontWidth, fontWeight } = settings;

  Util.textContent(`debug`,
    `
    Speed: ${Points.toString(speed, 2)}
    Speed average: ${Points.toString(speedAvg, 2)}
  `);

  const width = Math.round(scalePercent(speedAvg.x, fontWidth[0], fontWidth[1]));
  const weight = Math.round(scalePercent(speedAvg.y, fontWeight[0], fontWeight[1]));
  Util.setFontVariation(`speed`, width, weight);
};

/**
 * Pointer move
 * @param {PointerEvent} event
 */
const onPointerMove = (event) => {
  let { movement } = state;

  // Accumulate movement in x,y
  // Use Math.abs because we don't care about the direction
  movement = {
    x: movement.x + Math.abs(event.movementX),
    y: movement.y + Math.abs(event.movementY)
  };

  // Save in state
  saveState({ movement });
};

// Scale & clamp speed with an input range of 0..maxSpeed. This yields a value of 0..1
const scale = (v) => scaleClamped(v, 0, settings.maxSpeed);

const setup = () => {
  document.addEventListener(`pointermove`, onPointerMove);

  // Update speed every 50ms
  setInterval(() => {
    update();
    use();
  }, settings.updateRateMs);
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

