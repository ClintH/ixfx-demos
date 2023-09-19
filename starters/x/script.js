import {fullSizeCanvas} from '../../ixfx/dom.js';
import { pointTracker } from '../../ixfx/data.js';
import { Points } from '../../ixfx/geometry.js';
import * as Things from './thing.js';
import * as Util from './util.js';

// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  // How many things to spawn
  spawnThings: 100,
  hueChange: 0.1,
  tracker: pointTracker({
    sampleLimit: 10, 
    storeIntermediate: true
  })
});

/** 
 * @typedef {{
 *  hue:number
 *  things:Things.Thing[]
 *  bounds: import('./util.js').Bounds
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  things: [],
  hue: 0,
  movement: 0,
  bounds: {
    width: 0, height: 0,
    min:0, max: 0,
    center: { x: 0, y: 0 },
  }
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { hue, bounds, things } = state;

  const context = Util.getDrawingContext();

  // 1. Eg. use the ambient state
  context.fillStyle = `hsl(${hue}, 100%, 90%)`;
  context.fillRect(0,0,bounds.width,bounds.height);
  
  // 2. Use things
  for (const thing of things) {
    Things.use(thing, context, bounds);
  }
};

const update = () => {
  const { hueChange } = settings;
  let { hue } = state;
  // 1. Any other state updates?
  // eg: cycle hue
  hue += hueChange;

  // 2. Sanity check
  hue = hue%360; // 0..360 scale

  // 3. Save state
  saveState({ hue });

  // 4. Use state
  use();

  // 5. Call itself
  window.requestAnimationFrame(update);
};

/**
 * 
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  const { tracker } = settings;

  const result = tracker.seen({
    x: event.x, 
    y:event.y
  });
  console.log(result);
};

function setup () {
  // Automatically size canvas to viewport
  fullSizeCanvas(`#canvas`, onResized => {
    saveState({ bounds: onResized.bounds });
  });
    
  const things = [];
  for (let index=1;index<=settings.spawnThings;index++) {
    things.push(Things.create(index));
  }
  saveState({ things });

  document.addEventListener(`pointermove`, onPointerMove);

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
function saveState (s) {
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
  saveState({things});
  return completedThing;
}