import { Pool } from '../../ixfx/data.js';


import * as Audio from './audio.js';

const settings = Object.freeze({
  voices: Pool.create({
    capacity: 5,
    generate: voiceAdded,
    free: voiceRemoved,
    userExpireAfterMs: 1000,
    resourcesWithoutUserExpireAfterMs: 1000,
    fullPolicy: `evictOldestUser`
  })
});

/**
 * @typedef {{
 * context: AudioContext|undefined
 * keysPressed:string[]
 * pointersPressed:number[]
 * }} State
 */

/** @type State */
let state = Object.freeze({
  context: undefined,
  keysPressed:[],
  pointersPressed:[]
});

/**
 * Need to create a new pool item
 * @returns
 */
function voiceAdded() {
  const context = getAudioContext();

  if (context === undefined) throw new Error(`AudioContext not available`);
  const a = Audio.create(context);
  return a;
}

/**
 * Pool item to be disposed
 * @param {Audio.Thing} thing 
 */
function voiceRemoved(thing) {
  Audio.remove(thing);
}

const use = () => {
  const { voices } = settings;
  const { keysPressed, pointersPressed } = state;

  // Keep alive voices that are currently triggered
  for (const key of keysPressed) {
    voices.use(key);
  }
  for (const pointer of pointersPressed) {
    voices.use(pointer.toString());
  }

  for (const o of voices.values()) {
    Audio.use(o);
  }
};

const update = () => {};

const getAudioContext = () => {
  let { context } = state;
  if (context !== undefined) return context;
  context = new AudioContext();
  saveState({context});
  return context;
};

/**
 * fa
 * @param {KeyboardEvent} event 
 */
const onKeyDown = (event) => {
  if (event.repeat) return; // Ignore repeat keydown events
  let { keysPressed } = state;

  // Add new key to list of keys being pressed
  keysPressed = [...keysPressed, event.key ];
  saveState({ keysPressed });
};

/**
 * 
 * @param {PointerEvent} event 
 */
const onPointerDown = (event) => {
  let { pointersPressed } = state;
  pointersPressed = [...pointersPressed, event.pointerId];
  saveState({ pointersPressed });
};

/**
 * 
 * @param {PointerEvent} event 
 */
const onPointerUp = (event) => {
  const { voices } = settings;
  let { pointersPressed } = state;

  // Remove this pointer from list of pointers being pressed
  pointersPressed = pointersPressed.filter(k => k !== event.pointerId);

  // Release it from the pool
  voices.release(event.pointerId.toString());

  // Save the neaw list of pointers being pressed
  saveState({ pointersPressed });
};

const onKeyUp = (event) => {
  const { voices } = settings;
  let { keysPressed } = state;

  // Remove this key from list of keys being pressed
  keysPressed = keysPressed.filter(k => k !== event.key);

  // Release it from the pool
  voices.release(event.key);

  // Save the neaw list of keys being pressed
  saveState({ keysPressed });
};

function setup () {
  document.addEventListener(`keydown`, onKeyDown);
  document.addEventListener(`keyup`, onKeyUp);
  document.addEventListener(`pointerdown`, onPointerDown);
  document.addEventListener(`pointerup`, onPointerUp);

  // Update all the pool resources
  setInterval(() => {
    for (const item of settings.voices.resources()) {
      const update = Audio.update(item.data);
      const thing = item.updateData(update);
      Audio.use(update);
    }
  });

  // Run a regular update/use cycle
  setInterval(() => {
    update();
    use();
  }, 10);
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