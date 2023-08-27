import { Points } from '../../ixfx/geometry.js';
import { movingAverage, scalePercent, scaleClamped } from '../../ixfx/data.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Maximum speed for either x/y
  // This determines the scaling of speed
  maxSpeed: 1,

  // Range for font width
  fontWidth: [ 50, 200 ],

  // Range for font weight
  fontWeight: [ 200, 900 ],

  // Two moving averagers for x,y
  // Average over 30 samples
  avg: {
    x: movingAverage(30),
    y: movingAverage(30)
  },
  // Update rate for calculating speed (milliseconds)
  updateRateMs: 50
});

let state = Object.freeze({
  /** @type number */
  distance: 0,

  // Accumulates movement in x,y
  /** @type {{x:number, y:number}} */
  movement: { x:0, y:0 },

  // Current speed in x,y
  /** @type {{x:number, y:number}} */
  speed: { x:0, y: 0 },

  // Output of x,y movingAveragers
  /** @type {{x:number, y:number}} */
  speedAvg: { x:0, y: 0 },
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

  saveState({
    lastUpdate: now,
    // Reset accumulated movement
    movement: { x:0 , y: 0 },

    // Update with latest calculated values
    speed,
    speedAvg: {
      x: avg.x.add(speed.x),
      y: avg.y.add(speed.y)
    }
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
  setFontVariation(`speed`, width, weight);

};

/**
 * Set the CSS font variation for an element by id
 * @param {string} id 
 * @param {number} width 
 * @param {number} weight 
 * @returns 
 */
const setFontVariation = (id, width, weight) => {
  const element = /** @type HTMLElement */(document.querySelector(`#speed`));
  if (!element) return;

  // Generate CSS text for each variable font axis
  const wdth = `'wdth' ` + width;
  const wght = `'wght' ` + weight;

  // Apply to element
  // Note that axies must be in alphabetical order (!)
  element.style.fontVariationSettings = `${wdth}, ${wght}`;
};

/**
 * @param {PointerEvent} event
 */
const onPointerMove = (event) => {
  const { movement } = state;

  // Accumulate movement in x,y
  // Use Math.abs because we don't care about the direction
  saveState({
    movement: {
      x: movement.x + Math.abs(event.movementX),
      y: movement.y + Math.abs(event.movementY)
    }
  });
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
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

