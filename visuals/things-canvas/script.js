import { CanvasHelper } from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';
import * as Things from './thing.js';
import * as Util from './util.js';

// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  // How many things to spawn
  spawnThings: 100,
  hueChange: 0.1,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

/** 
 * @typedef {{
 *  hue:number
 *  things:Things.Thing[]
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  things: [],
  hue: 0,
  movement: 0,
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { canvas } = settings;
  const { hue, things } = state;
  const { ctx } = canvas;

  // 1. Eg. use the ambient state
  ctx.fillStyle = `hsl(${hue}, 100%, 90%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Use things
  for (const thing of things) {
    Things.use(thing, canvas);
  }
};

const update = () => {
  const { hueChange } = settings;
  let { hue } = state;
  // 1. Any other state updates?
  // eg: cycle hue
  hue += hueChange;

  // 2. Sanity check
  hue = hue % 360; // 0..360 scale

  // 3. Save state
  saveState({ hue });

  // 4. Use state
  use();

  // 5. Call itself
  window.requestAnimationFrame(update);
};

function setup() {
  const things = [];
  for (let index = 1; index <= settings.spawnThings; index++) {
    things.push(Things.create(index));
  }
  saveState({ things });

  document.addEventListener(`pointermove`, (event) => {
    const { canvas } = settings;
    const relativeMovement = Util.addUpMovement(event, canvas);
    const relativePosition = canvas.toRelative({ x: event.clientX, y: event.clientY });

    // Get new thing state
    let things = state.things.map(
      thing => Things.onMovement(
        thing,
        relativeMovement,
        relativePosition)
    );
    saveState({ things });

  });

  // Update things at a fixed rate
  setInterval(() => {
    let { things } = state;

    // Update all the things
    things = things.map(t => Things.update(t, state));

    // Save updated things into state
    saveState({ things });
  }, settings.thingUpdateSpeedMs);

  // Update state of sketch and use state
  // at full speed
  update();
};

setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Update a given thing by its id. The
 * updated thing is returned,  or _undefined_
 * if it wasn't found.
 * @param {number} thingId 
 * @param {Partial<Things.Thing>} updatedThing 
 * @returns {Things.Thing|undefined}
 */
function updateThingInState(thingId, updatedThing) {
  let completedThing;

  const things = state.things.map(thing => {
    // Is it the thing we want to change?
    if (thing.id !== thingId) return thing; // no
    // Return mutated thing
    completedThing = {
      ...thing,
      ...updatedThing
    };
    return completedThing;
  });

  // Save changed things
  saveState({ things });
  return completedThing;
}