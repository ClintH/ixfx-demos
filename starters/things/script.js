import * as Thing from './thing.js';

// Settings for sketch
const settings = Object.freeze({
  thingUpdateSpeedMs: 10,
  // How many things to spawn
  spawnThings: 10,
  hueChange: 0.1
});

/** 
 * @typedef {object} State
 * @property {number} hue
 * @property {Thing.Thing[]} things
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
    things.push(Thing.create(`thing-${index}`));
  }
  saveState({ things });

  document.addEventListener(`pointermove`, (event) => {
    const relativeMovement = (event.movementX/window.innerWidth + event.movementY/window.innerHeight);
    
    if (Number.isNaN(relativeMovement)) debugger;
    // Get ids of elements under cursor
    const elementIdsUnderCursor = document.elementsFromPoint(event.clientX, event.clientY).map(element=>element.id);

    // Get new thing state
    let things = state.things.map(
      thing => Thing.onMovement(
        thing, 
        relativeMovement,
        elementIdsUnderCursor)
    );
    saveState({ things });
    
  });

  // Update things at a fixed rate
  setInterval(() => {
    let { things } = state;

    // Update all the things
    things = things.map(t => Thing.update(t, state));

    // Save updated things into state
    saveState({ things });

    // Visually update based on new state
    for (const thing of things) {
      Thing.use(thing);
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

