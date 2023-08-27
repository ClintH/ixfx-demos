import {fullSizeCanvas} from '../../ixfx/dom.js';
import {clamp } from '../../ixfx/data.js';
import * as Thing from './thing.js';
import * as Util from './util.js';

// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  hueChange: 0.5,
  movementDecay: 0.1
});


/** 
 * @typedef {object} State
 * @property {number} hue
 * @property {number} movement
 * @property {Thing.Thing} thing
 * @property {import('./util.js').Bounds} bounds
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  thing: Thing.create(),
  bounds: {
    width: 0, height: 0,
    min:0, max: 0,
    center: { x: 0, y: 0 },
  },
  hue: 0,
  movement: 0
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { hue, bounds, thing } = state;
  const context = Util.getDrawingContext();

  // 1. Eg. use the ambient state
  context.fillStyle = `hsl(${hue}, 100%, 90%)`;
  context.fillRect(0,0,bounds.width,bounds.height);

  // 2. Get Thing to draw itself
  Thing.use(thing, context, bounds);
};

const update = () => {
  const { hueChange, movementDecay } = settings;
  let { hue, movement } = state;
  // 1. Any other state updates?
  // eg: cycle hue
  hue += hueChange;

  // eg. decay movement
  movement -= movementDecay;

  // 2. Sanity check
  hue = hue%360; // 0..360 scale
  movement = clamp(movement); // 0..1 scale

  // 3. Save state
  saveState({ hue, movement });

  // 4. Use state
  use();

  // 5. Call itself
  window.requestAnimationFrame(update);
};

function setup() {
  // Automatically size canvas to viewport
  fullSizeCanvas(`#canvas`, onResized => {
    saveState({ bounds: onResized.bounds });
  });

  document.addEventListener(`pointermove`, (event) => {
    const relativeMovement = (event.movementX/window.innerWidth + event.movementY/window.innerHeight);
    let movement = clamp(state.movement + relativeMovement);
    saveState({ movement });
  });

  // Update thing at a fixed rate
  setInterval(() => {
    // Save new thing into state
    saveState({ 
      thing: Thing.update(state.thing, state)
    });
  }, settings.thingUpdateSpeedMs);

  // Update state of sketch and use state
  // at full speed
  update();
};

setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

