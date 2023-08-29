import {fullSizeCanvas} from '../../ixfx/dom.js';
import {clamp } from '../../ixfx/data.js';
import * as Things from './thing.js';
import * as Util from './util.js';

// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  hueChange: 0.5,
  movementDecay: 0.1
});

/** 
 * @typedef {{
 *  hue: number
 *  movement: number
 *  thing: Things.Thing
 *  bounds: import('./util.js').Bounds
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  thing: Things.create(),
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
  Things.use(thing, context, bounds);
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
    const relativeMovement = Util.addUpMovement(event);
    let movement = clamp(state.movement + relativeMovement);
    saveState({ movement });
  });

  // Update thing at a fixed rate
  setInterval(() => {
    // Save new thing into state
    saveState({ 
      thing: Things.update(state.thing, state)
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

