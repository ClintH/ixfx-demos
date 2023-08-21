import * as Dom from '../../ixfx/dom.js';
import { repeat } from '../../ixfx/flow.js';
import { jitter } from '../../ixfx/modulation.js';
import { flip } from '../../ixfx/data.js';
import { gaussian } from '../../ixfx/random.js';

const settings = Object.freeze({
  // How much to age with each loop (% of current age)
  agePerLoop: 0.02,
  // How many particles to spawn each loop
  spawnPerLoop: 3,
  // How much to float upwards each loop (also affected by randomness and weight). Percentage of screen height
  yMovement: 0.01,
  // Jitter to apply to particle x-axis
  xJitter: jitter({ relative: 0.01, source: gaussian }),
  // Drawing settings
  dotHue: `194`,
  bgHue: `194`,
  radiusMax: 30,
  radiusMin: 20
});

let state = Object.freeze({
  /** @type {Particle[]} */
  particles: [],
  /** 
   * Relative pointer position (0,0) -> (1,1) 
   * @type {Point}
   * */
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

  // 1. Age particles, deleting when they are too old
  const aged = particles
    .map(p => ({ ...p, age: p.age * flip(agePerLoop) }))
    .filter(p => p.age > 0.001);

  // 2. Spawn new particles
  const withNew = [ ...aged, ...repeat(spawnPerLoop, createParticle) ];

  // 3. Move particles: some jitter applied to X, and drift upwards
  const moved = withNew.map(p => ({
    ...p, 
    x: xJitter(p.x),
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
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  if (!context) return;

  // Clear canvas
  clear(context);

  context.globalCompositeOperation = `lighter`;

  // Draw particles  
  for (const p of particles) {
    drawPoint(context, p);
  }
};

/**
 * Each point is drawn as a circle
 * @param {CanvasRenderingContext2D} context 
 * @param {Particle} pt 
 */
const drawPoint = (context, pt) => {
  const { radiusMax, radiusMin, dotHue } = settings;
  const { width, height } = state.bounds;

  // Calculate radius based on relative 
  // random radius, max radius & age of particle
  const radius = (radiusMax - radiusMin) * (pt.weight * pt.age) + (radiusMin* pt.age);

  // Calculate colour for dot, with age determining the opacity
  const fillStyle = `hsla(${dotHue}, 60%, ${Math.floor(pt.intensity*100)}%, ${pt.age})`;

  // Translate so 0,0 is the middle
  context.save();
  context.translate(pt.x*width, pt.y*height);

  // Fill a circle
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.fill();

  // Unwind translation
  context.restore();
};

/**
 * Clears the canvas
 * @param {CanvasRenderingContext2D} context 
 */
const clear = (context) => {
  const { width, height } = state.bounds;
  const { bgHue } = settings;

  // Clear screen  
  // ctx.globalCompositeOperation = `source-over`;
  // ctx.fillStyle = `hsl(${bgHue}, 100%, 33%)`;
  // ctx.fillRect(0, 0, width, height);

  // Use the composite operation to leave some
  // traces behind
  context.fillStyle = `hsla(${bgHue}, 100%, 50%, 0.5)`;
  context.globalCompositeOperation = `luminosity`;
  context.fillRect(0, 0, width, height);
};

const defaultPosition = () => {
  updateState({ pointer: {
    x: 0.5, //window.innerWidth / 2,
    y: 0.5, //window.innerHeight / 2
  } });
};

/**
 * Set up
 */
const setup = () => {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    updateState({
      bounds: arguments_.bounds
    });
  });

  // Animation loop
  const loop = () => {
    onTick();
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();


  defaultPosition();
  
  // Keep track of pointer moving
  document.addEventListener(`pointermove`, event => {
    event.preventDefault();
    updateState({ 
      pointer: {
        x: event.x/window.innerWidth,
        y: event.y/window.innerHeight
      }
    });
  });

  // Keep track of pointer up/down status
  document.addEventListener(`pointerdown`, event => {
    event.preventDefault();
    updateState({ pointerDown: true });
  });

  document.addEventListener(`pointerup`, event => {
    event.preventDefault();
    updateState({ pointerDown: false });
  });

  document.addEventListener(`pointerleave`, event => {
    defaultPosition();
  });
};
setup();

/**
 * Creates a particle
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
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * @typedef Particle
 * @property {number} x
 * @property {number} y
 * @property {number} age
 * @property {number} weight
 * @property {number} intensity
 */

/**
 * @typedef Point
 * @property {number} x
 * @property {number} y
 */