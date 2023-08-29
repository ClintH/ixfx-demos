import {fullSizeCanvas} from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';
import * as Things from './thing.js';
import * as Util from './util.js';

// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  // How many things to spawn
  spawnThings: 100,
  hueChange: 0.1
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

function setup () {
  // Automatically size canvas to viewport
  fullSizeCanvas(`#canvas`, onResized => {
    saveState({ bounds: onResized.bounds });
  });
    
  const things = [];
  for (let index=0;index<settings.spawnThings;index++) {
    things.push(Things.create(`thing-${index}`));
  }
  saveState({ things });

  document.addEventListener(`pointermove`, (event) => {
    const relativeMovement = Util.addUpMovement(event);
    const relativePosition = Points.divide({x: event.clientX, y:event.clientY}, state.bounds);

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
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

