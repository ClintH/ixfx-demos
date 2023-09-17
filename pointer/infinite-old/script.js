import { Points } from '../../ixfx/geometry.js';
import { clamp } from '../../ixfx/data.js';

// Define our Thing
/** 
 * @typedef Thing
 * @property {Points.Point} position
 * @property {number} mass
 */

const settings = Object.freeze({
  meltRate: 0.9995,
  movementMax: 50,
  sizeEm: 10,
  massRange: [ 0.1, 4 ]
});

let state = Object.freeze({
  /** @type number */
  freezeRay: 1,
  /** @type Thing */
  thing: generateThing(),
  /** @type number */
  currentMovement: 0
});

/**
 * Use the data of the Thing somehow...
 * @param {Thing} thing 
 */
const useThing = (thing) => {
  const { sizeEm } = settings;

  const element = /** @type HTMLElement */(document.querySelector(`#thing`));
  if (!element) return;

  const { position, mass } = thing;

  // Change opacity based on mass
  element.style.opacity = mass.toString();

  // Change size based on mass
  element.style.height = element.style.width = `${sizeEm*mass}em`;

  // Position
  positionFromMiddle(element, position);
};

/**
 * Position an element from its middle
 * @param {HTMLElement} element 
 * @param {Points.Point} relativePos 
 */
const positionFromMiddle = (element, relativePos) => {
  // Convert relative to absolute units
  const absPosition = Points.multiply(relativePos, window.innerWidth,window.innerHeight);
  
  const thingRect = element.getBoundingClientRect();
  const offsetPos = Points.subtract(absPosition, thingRect.width / 2, thingRect.height / 2);

  // Apply via CSS
  element.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
};

/**
 * Continually loops, updating the thing
 * @param {Thing} thing
 */
const loopThing = (thing) => {
  const { meltRate, massRange } = settings;
  const { freezeRay } = state; // Get thing from state

  let { mass } = thing;

  // Apply relevant state from the world. 0.01 is used to scale it down
  mass = mass + (mass*freezeRay*0.01);

  // Apply the 'logic' of the thing
  // - Our thing melts over time
  mass *= meltRate;

  // Make sure mass doesn't go outside our desired range
  mass = clamp(mass, massRange[0], massRange[1]);

  // Apply changes to a new Thing
  return updateThing(thing, { mass });
};

const use = () => {
  const { thing } = state;

  // Use thing
  useThing(thing);
};

const update = () => {
  const { thing } = state;
  
  // Update freeze ray based on movement
  const freezeRay = state.currentMovement / settings.movementMax;

  // Update thing
  const thingUpdated = loopThing(thing);

  // Update state
  saveState({ 
    thing: thingUpdated,
    freezeRay: freezeRay,
    currentMovement: 0
  });

  use();
  window.requestAnimationFrame(update);
};

/**
 * Handles pointermove event
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  //console.log(`${evt.movementX}, ${evt.movementY}`);

  // Get magnitude of movement
  const magnitude = Points.distance({ x: event.movementX, y: event.movementY });
  // Add to state
  saveState({ 
    currentMovement: state.currentMovement + magnitude 
  });
};

function setup() {
  const buttonStart = document.querySelector(`#btnStart`);
  const buttonStop = document.querySelector(`#btnStop`);

  buttonStart?.addEventListener(`click`, () => {
    document.body.requestPointerLock();
  });

  buttonStop?.addEventListener(`click`, () => {
    document.exitPointerLock();
  });

  // Handle when pointer lock is turned on/off
  document.addEventListener(`pointerlockchange`, event => {
    if (document.pointerLockElement === document.body) {
      // Pointer lock on
      buttonStart?.classList.add(`hidden`);
      buttonStop?.classList.remove(`hidden`);
    } else {
      // Pointer lock off
      buttonStart?.classList.remove(`hidden`);
      buttonStop?.classList.add(`hidden`);
    }
  });

  document.addEventListener(`pointermove`, onPointerMove);

  // Kick off animation loop
  update();
};
setup();


/**
 * Generates a Thing
 * @returns {Thing}
 */
function generateThing () {
  return {
    position: { x: 0.5, y:0.5 },
    mass: 1
  };
}

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Updates `thing` with supplied `data`
 * @param {Thing} thing
 * @param {Partial<Thing>} data 
 */
function updateThing(thing, data) {
  return Object.freeze({
    ...thing,
    ...data
  });
}