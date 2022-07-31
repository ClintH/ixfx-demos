import * as Dom from '../../ixfx/dom.js';
import { repeat } from '../../ixfx/flow.js';
import { jitter } from '../../ixfx/modulation.js';
import { flip, clamp } from '../../ixfx/data.js';
import { gaussian } from '../../ixfx/random.js';

/**
 * @typedef Particle
 * @property {number} x
 * @property {number} y
 * @property {number} age
 * @property {number} weight
 * @property {number} intensity
 */

const settings = Object.freeze({
  // How much to age with each loop (% of current age)
  agePerLoop: 0.02,
  // How many particles to spawn each loop
  spawnPerLoop: 3,
  // How much to float upwards each loop (also affected by randomness and weight). Percentage of screen height
  yMovement: 0.01,
  // Maximum jitter on x-axis (%)
  xJitter: 0.03,
  // Drawing settings
  dotHue: `194`,
  bgHue: `194`,
  radiusMax: 30,
  radiusMin: 20
});

let state = Object.freeze({
  /** @type {Particle[]} */
  particles: [],
  pointer: { x: 0, y: 0 },
  /** @type {boolean} */
  pointerDown: false,
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  }
});

// Runs at animation speed
const onTick = () => {
  const { yMovement, spawnPerLoop, agePerLoop, xJitter } = settings;
  const { particles }  = state;

  // 1. Age particles, deleting those that are too old
  const aged = particles
    .map(p => ({ ...p, age: p.age * flip(agePerLoop) }))
    .filter(p => p.age > 0.001);

  // 2. Spawn new particles
  const withNew = [ ...aged, ...repeat(spawnPerLoop, createParticle) ];

  // 3. Move particles: some jitter applied to X, and drift upwards
  const moved = withNew.map(p => ({
    ...p, 
    x: jitter(clamp(p.x), xJitter * flip(p.weight), { type: `rel`, random: gaussian }),
    y: p.y - (p.weight*yMovement*Math.random())
  }));

  // 3. Update state for later drawing
  updateState({
    particles: moved
  });
};

const useState = () => {
  const { particles } = state;

  /** @type {HTMLCanvasElement|null}} */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx) return;

  // Clear canvas
  clear(ctx);

  ctx.globalCompositeOperation = `lighter`;

  // Draw particles  
  particles.forEach(p => {
    drawPoint(ctx, p);
  });
};

/**
 * Each point is drawn as a circle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Particle} pt 
 */
const drawPoint = (ctx, pt) => {
  const { radiusMax, radiusMin, dotHue } = settings;
  const { width, height } = state.bounds;

  // Calculate radius based on relative 
  // random radius, max radius & age of particle
  const radius = (radiusMax - radiusMin) * (pt.weight * pt.age) + (radiusMin* pt.age);

  // Calculate colour for dot, with age determining the opacity
  const fillStyle = `hsla(${dotHue}, 60%, ${Math.floor(pt.intensity*100)}%, ${pt.age})`;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(pt.x*width, pt.y*height);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

/**
 * Clears the canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;
  const { bgHue } = settings;

  // Clear screen  
  // ctx.globalCompositeOperation = `source-over`;
  // ctx.fillStyle = `hsl(${bgHue}, 100%, 33%)`;
  // ctx.fillRect(0, 0, width, height);

  // Use the composite operation to leave some
  // traces behind
  ctx.fillStyle = `hsla(${bgHue}, 100%, 50%, 0.5)`;
  ctx.globalCompositeOperation = `luminosity`;
  ctx.fillRect(0, 0, width, height);
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

  // Animation loop
  const loop = () => {
    onTick();
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();

  const defaultPosition = () => {
    updateState({ pointer: {
      x: 0.5, //window.innerWidth / 2,
      y: 0.5, //window.innerHeight / 2
    } });
  };
  defaultPosition();
  
  // Keep track of pointer moving
  document.addEventListener(`pointermove`, evt => {
    updateState({ pointer: {
      x: evt.x/window.innerWidth,
      y: evt.y/window.innerHeight
    } });
  });

  // Keep track of pointer up/down status
  document.addEventListener(`pointerdown`, evt => {
    updateState({ pointerDown: true });
  });

  document.addEventListener(`pointerup`, evt => {
    updateState({ pointerDown: false });
  });

  document.addEventListener(`pointerleave`, evt => {
    defaultPosition();
  });
};
setup();

/**
 * 
 * @returns {Particle}
 */
function createParticle() {
  const { pointer, pointerDown } = state;
  return {
    ...pointer,
    weight: Math.random(),
    age: 1,
    // If pointer is down 50% intensity, otherwise 1%
    // Would be nicer to use an envelope here so it ramps up and down.
    intensity: pointerDown ? 0.5 : 0.01
  };
}

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState(s) {
  state = {
    ...state,
    ...s
  };
}