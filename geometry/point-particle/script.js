import * as Dom from '../../ixfx/dom.js';
import { repeat } from '../../ixfx/flow.js';
import { jitter } from '../../ixfx/modulation.js';
import { flip } from '../../ixfx/data.js';
import { gaussian } from '../../ixfx/random.js';
import * as Particle from './particle.js';

const settings = Object.freeze({
  // How much to age with each loop (% of current age)
  agePerLoop: 0.02,
  // How many particles to spawn each loop
  spawnPerLoop: 3,
  // How much to float upwards each loop (also affected by randomness and weight). Percentage of screen height
  yMovement: 0.01,
  // Jitter to apply to particle x-axis
  xJitter: jitter({ relative: 0.01, source: gaussian }),
  bgHue: `194`,
});


/**
 * @typedef {{
 * particles: Particle[]
 * pointer: Point
 * pointerDown: boolean
 * bounds: {width:number,height:number,center:{x:number,y:number}}
 * }} State
 */

/** @type {State} */
let state = Object.freeze({
  particles: [],
  pointer: { x: 0, y: 0 },
  pointerDown: false,
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  }
});

// Runs at animation speed
const update = () => {
  const { yMovement, spawnPerLoop, agePerLoop, xJitter } = settings;
  const { particles }  = state;

  // 1. Age particles, deleting when they are too old
  const aged = particles
    .map(p => ({ ...p, age: p.age * flip(agePerLoop) }))
    .filter(p => p.age > 0.001);

  // 2. Spawn new particles
  const withNew = [ ...aged, ...repeat(spawnPerLoop, () => Particle.create(state)) ];

  // 3. Move particles: some jitter applied to X, and drift upwards
  const moved = withNew.map(p => ({
    ...p, 
    x: xJitter(p.x),
    y: p.y - (p.weight*yMovement*Math.random())
  }));

  // 3. Update state for later drawing
  saveState({
    particles: moved
  });
};

const use = () => {
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
    Particle.draw(context, p, state);
  }
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
  saveState({ pointer: {
    x: 0.5, //window.innerWidth / 2,
    y: 0.5, //window.innerHeight / 2
  } });
};

function setup() {
  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds
    });
  });

  // Animation loop
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();


  defaultPosition();
  
  // Keep track of pointer moving
  document.addEventListener(`pointermove`, event => {
    event.preventDefault();
    saveState({ 
      pointer: {
        x: event.x/window.innerWidth,
        y: event.y/window.innerHeight
      }
    });
  });

  // Keep track of pointer up/down status
  document.addEventListener(`pointerdown`, event => {
    event.preventDefault();
    saveState({ pointerDown: true });
  });

  document.addEventListener(`pointerup`, event => {
    event.preventDefault();
    saveState({ pointerDown: false });
  });

  document.addEventListener(`pointerleave`, event => {
    defaultPosition();
  });
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

/**
 * @typedef {import('./particle.js').Particle} Particle
 * @typedef {import('./particle.js').Point} Point
 */
