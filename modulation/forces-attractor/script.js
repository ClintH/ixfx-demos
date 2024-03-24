import { CanvasHelper } from '../../ixfx/dom.js';
import { Forces } from '../../ixfx/modulation.js';

import { Points, Rects, Shapes } from '../../ixfx/geometry.js';
import { repeat } from '../../ixfx/flow.js';
import * as Util from './util.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
  // Visual option for attractor
  attractorRadius: 50,

  // Gravity: power of attractor
  gravity: 0.0005,
  // Orientation force. A lower interpolation amt reduces quickness of turn
  orientationForce: Forces.orientationForce(1)
});

/**
 * @typedef {Readonly<{
 *  attractor: Forces.ForceAffected
 *  attractees: readonly Forces.ForceAffected[]
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  attractor: {
    position: { x: 0.5, y: 0.5 },
    mass: 1,
    angle: Math.random() * Math.PI * 2
  },
  attractees: [...repeat(20, generate)],
});

const update = () => {
  const { gravity, orientationForce } = settings;
  const { attractees, attractor } = state;

  // Apply forces: all attractees, one attractor
  let attracteesAltered = attractees.map(a => Forces.apply(a,
    Forces.computeAttractionForce(attractor, a, gravity),
    orientationForce
  ));

  // Force between attractees
  const f = Forces.attractionForce(attracteesAltered, gravity);

  // Make attractess work on each other too
  attracteesAltered = attracteesAltered.map(a => Forces.apply(a, f));

  // Set new state
  saveState({ attractees: attracteesAltered });
};

const use = () => {
  const { canvas } = settings;
  const { ctx, width, height } = canvas;

  const { attractorRadius } = settings;
  const { attractor, attractees } = state;

  // Gold background
  ctx.fillStyle = `gold`;
  ctx.fillRect(0, 0, width, height);

  // Draw attractees as arrows
  for (const a of attractees) {
    // @ts-ignore
    Util.arrow(a, canvas);
  }

  // Draw main attraction
  Util.circle(attractor, canvas, attractorRadius, `LightGoldenrodYellow`);
};

function setup() {
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointermove`, event => {
    // If there's no click/touch, not interested
    if (event.buttons === 0) return;

    // Move attractor to relative pointer position
    saveState({
      attractor: {
        ...state.attractor,
        position: settings.canvas.toRelative({ x: event.x, y: event.y })
      }
    });
  });
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

/**
 * Create a random thing.
 * Declared as a function so it is callable in `settings` init.
 * @returns 
 */
function generate() {
  return {
    position: Points.random(),
    mass: Math.random() / 20,
    angle: Math.PI,
    angularAcceleration: 0
  };
}