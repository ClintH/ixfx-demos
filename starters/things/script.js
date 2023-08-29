import * as Things from './thing.js';
import * as Util from './util.js';

// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  // How many things to spawn
  spawnThings: 10,
  hueChange: 0.1
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
  movement: 0
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { hue } = state;

  // 1. Eg. use the ambient state
  document.body.style.backgroundColor = `hsl(${hue}, 100%, 90%)`;
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

function setup() {
  const things = [];
  for (let index=0;index<settings.spawnThings;index++) {
    things.push(Things.create(`thing-${index}`));
  }
  saveState({ things });

  document.addEventListener(`pointermove`, (event) => {
    // Add up all the movement
    let movement = Util.addUpMovement(event);

    // Get ids of elements under cursor
    const elementIdsUnderCursor = document.elementsFromPoint(event.clientX, event.clientY).map(element=>element.id);

    // Get new thing state
    let things = state.things.map(
      thing => Things.onMovement(
        thing, 
        movement,
        elementIdsUnderCursor)
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

    // Visually update based on new state
    for (const thing of things) {
      Things.use(thing);
    }
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

