import * as Dom from '../../ixfx/dom.js';
import { Forces } from '../../ixfx/modulation.js';

import { Points, Rects, Shapes } from '../../ixfx/geometry.js';
import { repeat } from '../../ixfx/flow.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Visual option for attractor
  attractorRadius: 50,

  // Gravity: power of attractor
  gravity: 0.0005,
  // Orientation force. A lower interpolation amt reduces quickness of turn
  orientationForce: Forces.orientationForce(1)
});

let state = Object.freeze({
  attractor: {
    position: { x: 0.5, y: 0.5 },
    mass: 1,
    angle: Math.random() * Math.PI * 2
  },
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type readonly Forces.ForceAffected[] */
  attractees: [ ...repeat(20, generate) ],
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
  const canvas = /** @type {HTMLCanvasElement|null} */(document.querySelector(`#canvas`));
  const { attractorRadius } = settings;
  const { attractor, attractees, bounds } = state;
  
  /** @type {CanvasRenderingContext2D|null|undefined} */
  const context = canvas?.getContext(`2d`);
  if (!context) return;

  // Gold background
  context.fillStyle = `gold`;
  context.fillRect(0, 0, bounds.width, bounds.height);
  
  // Draw attractees as arrows
  for (const a of attractees) {
    // @ts-ignore
    Util.arrow(a, context, bounds);
  }

  // Draw main attraction
  Util.circle(attractor, context, bounds, attractorRadius, `LightGoldenrodYellow`);
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

  document.addEventListener(`pointermove`, event => {
    // If there's no click/touch, not interested
    if (event.buttons === 0) return;

    // Compute relative pointer position
    const position = Points.divide({ x: event.x, y: event.y }, state.bounds);

    // Move attractor to relative pointer position
    saveState({
      attractor: {
        ...state.attractor,
        position
      }
    }); 
  });
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