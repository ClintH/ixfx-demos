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
  wind: Forces.accelerationForce({ x: 0.000_01, y: 0 }, `dampen`),
  // Gravity adds acceleration. Force is magnified by mass
  gravity: Forces.accelerationForce({ x: 0, y: 0.0001 }, `multiply`),
  // Friction is calculated based on velocity. Force is magnified by mass
  friction: Forces.velocityForce(0.000_01, `multiply`),
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

const update = () => {
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

  saveState({ things: aliveThings });
};

const use = () => {
  const canvas = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const { things, bounds } = state;
  const { liquid, maxRadius, hue } = settings;

  /** @type {CanvasRenderingContext2D|null|undefined} */
  const context = canvas?.getContext(`2d`);
  if (!context) return;

  // Draw 'air'
  context.fillStyle = `pink`;
  context.fillRect(0, 0, bounds.width, bounds.height);

  // Draw 'liquid'
  context.fillStyle = `IndianRed`;
  const rectAbs = /** @type Rects.RectPositioned */(Rects.multiply(liquid, bounds));
  context.fillRect(rectAbs.x, rectAbs.y, rectAbs.width, rectAbs.height);

  // Draw things
  for (const t of things) {
    // Get canvas-relative position
    const pt = Points.multiply(t.position, bounds);

    context.fillStyle = `hsla(${hue}, 100%, 50%, ${t.life})`;
    context.beginPath();
    const radius = maxRadius * t.mass;
    context.ellipse(pt.x, pt.y, radius, radius, 0, 0, Math.PI * 2);
    context.fill();
  }
};

const spawn = () => {
  const { things, pointer } = state;
  things.push({
    life: 1,
    mass: Random.float({ min: 0.5, max: 1 }),
    position: pointer,
    velocity: {
      x: Random.float({ min:-0.001, max: 0.001 }),
      y: Random.float({ min: 0.001, max: 0.001, })
    }
  });
};

function setup() {
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({ bounds: arguments_.bounds });
  });

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointerup`, event => {
    saveState({ pointer: {
      x: event.x / window.innerWidth,
      y: event.y / window.innerHeight
    } });
    spawn();
  });

  spawn();
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
