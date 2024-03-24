import { CanvasHelper } from '../../ixfx/dom.js';
import { Forces } from '../../ixfx/modulation.js';
import { Points, Rects } from '../../ixfx/geometry.js';
import * as Random from '../../ixfx/random.js';
/**
 * @typedef {Readonly<{ 
*  position: Points.Point
*  velocity: Points.Point
*  mass: number
*  life: number
* }>} Thing
*/

/**
* @typedef {Readonly<{
* things: Thing[],
* pointer: Points.Point
* }>} State
*/

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
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
  drag: Forces.magnitudeForce(0.1, `dampen`)
});


/** @type State */
let state = Object.freeze({
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
  const { things } = state;
  const { liquid, maxRadius, hue, canvas } = settings;
  const { ctx, width, height } = canvas;

  // Draw 'air'
  ctx.fillStyle = `pink`;
  ctx.fillRect(0, 0, width, height);

  // Draw 'liquid'
  ctx.fillStyle = `IndianRed`;
  const liquidPosition = canvas.toAbsolute(liquid);
  ctx.fillRect(liquidPosition.x, liquidPosition.y, liquid.width * width, liquid.height * height);

  // Draw things
  for (const t of things) {
    // Get canvas-relative position
    const pt = canvas.toAbsolute(t.position);

    ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${t.life})`;
    ctx.beginPath();
    const radius = maxRadius * t.mass;
    ctx.ellipse(pt.x, pt.y, radius, radius, 0, 0, Math.PI * 2);
    ctx.fill();
  }
};

const spawn = () => {
  const { things, pointer } = state;
  things.push({
    life: 1,
    mass: Random.float({ min: 0.5, max: 1 }),
    position: pointer,
    velocity: {
      x: Random.float({ min: -0.001, max: 0.001 }),
      y: Random.float({ min: 0.001, max: 0.001, })
    }
  });
};

function setup() {

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointerup`, event => {
    saveState({
      pointer: settings.canvas.toRelative({
        x: event.x,
        y: event.y
      })
    });
    spawn();
  });

  spawn();
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
