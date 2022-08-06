import * as Dom from '../../ixfx/dom.js';
import { Forces } from '../../ixfx/modulation.js';
import { Points, Rects } from '../../ixfx/geometry.js';
import * as Random from '../../ixfx/random.js';

const settings = Object.freeze({
  maxRadius: 50,
  hue: 200,
  aging: 0.99,
  // 'Liquid' area, in relative coordinates
  liquid: {
    width: 1,
    height: 0.5,
    x: 0,
    y: 0.5
  },
  // FORCES
  // Wind adds acceleration. Force is dampened by mass
  wind: Forces.accelerationForce({ x: 0.00001, y: 0 }, `dampen`),
  // Gravity adds acceleration. Force is magnified by mass
  gravity: Forces.accelerationForce({ x: 0, y: 0.0001 }, `multiply`),
  // Friction is calculated based on velocity. Force is magnified by mass
  friction: Forces.velocityForce(0.00001, `multiply`),
  // Flip movement velocity if we hit a wall. And dampen it by 10%
  bouncer: Forces.constrainBounce({ width: 1, height: 1 }, 0.9),
  // Drag 
  drag:Forces.magnitudeForce(0.1, `dampen`)
});

/**
 * @typedef Thing
 * @property {Points.Point} position
 * @property {Points.Point} velocity
 * @property {number} mass
 * @property {number} life
 */

// Initial state with empty values
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type Thing[] */
  things: [],
  pointer: { x: 0.5, y: 0.5 }
});

const onTick = () => {
  const { gravity, friction, bouncer, wind, drag, liquid } = settings;
  const { aging } = settings;
  const { things } = state;
  
  const changedThings = things.map(t => {
    let withForce = Forces.apply(t,
      gravity,
      Rects.intersectsPoint(liquid, t.position) ? Forces.nullForce : wind,
      friction,
      Rects.intersectsPoint(liquid, t.position) ? drag : Forces.nullForce,
      bouncer
    );
    return {
      ...t,
      ...withForce,
      life: t.life * aging
    };
  });

  // Remove dead things
  const aliveThings = changedThings.filter(t => t.life > 0.001);

  updateState({ things: aliveThings });
};

const useState = () => {
  const canvas = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const { things, bounds } = state;
  const { liquid, maxRadius, hue } = settings;

  /** @type {CanvasRenderingContext2D|null|undefined} */
  const ctx = canvas?.getContext(`2d`);
  if (!ctx) return;

  // Draw 'air'
  ctx.fillStyle = `pink`;
  ctx.fillRect(0, 0, bounds.width, bounds.height);

  // Draw 'liquid'
  ctx.fillStyle = `IndianRed`;
  const rectAbs = /** @type Rects.RectPositioned */(Rects.multiply(liquid, bounds));
  ctx.fillRect(rectAbs.x, rectAbs.y, rectAbs.width, rectAbs.height);

  // Draw things
  things.forEach(t => {
    // Get canvas-relative position
    const pt = Points.multiply(t.position, bounds);

    ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${t.life})`;
    ctx.beginPath();
    const radius = maxRadius * t.mass;
    ctx.ellipse(pt.x, pt.y, radius, radius, 0, 0, Math.PI * 2);
    ctx.fill();
  });
};

const spawn = () => {
  const { things, pointer } = state;
  things.push({
    life: 1,
    mass: Random.float(1, 0.5),
    position: pointer,
    velocity: {
      x: Random.float(0.001, -0.001),
      y: Random.float(0.001, 0.001)
    }
  });
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({ bounds: args.bounds });
  });

  const loop = () => {
    onTick();
    useState();
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointerup`, evt => {
    updateState({ pointer: {
      x: evt.x / window.innerWidth,
      y: evt.y / window.innerHeight
    } });
    spawn();
  });

  spawn();
};
setup();

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
