import { CanvasHelper } from '../../ixfx/dom.js';
import { clamp } from '../../ixfx/numbers.js';
import * as Things from './thing.js';
import * as Util from './util.js';

// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  hueChange: 0.5,
  movementDecay: 0.1,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

/** 
 * @typedef {{
 *  hue: number
 *  movement: number
 *  thing: Things.Thing
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  thing: Things.create(),
  hue: 0,
  movement: 0
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { canvas } = settings;
  const { ctx } = canvas;
  const { hue, thing } = state;


  // 1. Eg. use the ambient state
  ctx.fillStyle = `hsl(${hue}, 100%, 90%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Get Thing to draw itself
  Things.use(thing, canvas);
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
  hue = hue % 360; // 0..360 scale
  movement = clamp(movement); // 0..1 scale

  // 3. Save state
  saveState({ hue, movement });

  // 4. Use state
  use();

  // 5. Call itself
  window.requestAnimationFrame(update);
};

function setup() {
  document.addEventListener(`pointermove`, (event) => {
    const relativeMovement = Util.addUpMovement(event, settings.canvas);
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
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

