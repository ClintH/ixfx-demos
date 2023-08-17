import * as Arrays from '../../ixfx/arrays.js';
import { Pool } from '../../ixfx/data.js';

const settings = Object.freeze({
  pool: Pool.create({
    capacity: 10,
    userExpireAfterMs: 1*1000,
    resourcesWithoutUserExpireAfterMs: 5*1000,
    fullPolicy: `evictOldestUser`,
    // Generate a new resource (in this example, a HTML element)
    generate: () => {
      const el = document.createElement(`DIV`);
      el.classList.add(`pool-item`);
      document.getElementById(`items`)?.append(el);
      return el;
    }, 
    /**
     * Delete the HTML element when resource is freed
     * @param {HTMLElement} el 
     */
    free:(el) => {
      el.remove();
    }
  })
});

let state = Object.freeze({
  /** @type {readonly string[]} */
  keysDown: []
});

const useState = () => {
  const { pool } = settings;
  const { keysDown } = state;

  for (const key of keysDown) {
    // Allocate a HTML element for each key held down
    const el = pool.useValue(key);

    // Set the text of the element to be the key
    el.innerText = key;
  }
};

/**
 * Key is down 
 * @param {KeyboardEvent} evt 
 */
const onKeyDown = (evt) => {
  const { keysDown } = state;
  saveState({
    // Add key to list of keys down, if it's not already there
    keysDown: Arrays.unique([ ...keysDown,  evt.key  ])
  });
  useState();
};

/**
 * Key is released
 * @param {KeyboardEvent} evt 
 */
const onKeyUp = (evt) => {
  const { keysDown } = state;
  saveState({
    // Remove key from array
    keysDown: Arrays.without(keysDown, evt.key)
  });
  useState();
};


const setup = () => {
  document.addEventListener(`keydown`, onKeyDown);
  document.addEventListener(`keyup`,onKeyUp);
};


// #region Toolbox
/**
 * Saves state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

setup();
// #endregion