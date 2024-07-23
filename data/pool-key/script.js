import * as Arrays from '../../ixfx/arrays.js';
import { Pool } from '../../ixfx/data.js';

const settings = Object.freeze({
  pool: Pool.create({
    capacity: 10,
    userExpireAfterMs: 1 * 1000,
    resourcesWithoutUserExpireAfterMs: 5 * 1000,
    fullPolicy: `evictOldestUser`,
    // Generate a new resource (in this example, a HTML element)
    generate: () => {
      const element = document.createElement(`DIV`);
      element.classList.add(`pool-item`);
      document.querySelector(`#items`)?.append(element);
      return element;
    },
    /**
     * Delete the HTML element when resource is freed
     * @param {HTMLElement} element
     */
    free: (element) => {
      element.remove();
    }
  })
});

let state = Object.freeze({
  /** @type {readonly string[]} */
  keysDown: []
});

const use = () => {
  const { pool } = settings;
  const { keysDown } = state;

  for (const key of keysDown) {
    // Allocate a HTML element for each key held down
    const element = pool.useValue(key);

    // Set the text of the element to be the key
    element.textContent = key;
  }
};

/**
 * Key is down 
 * @param {KeyboardEvent} event 
 */
const onKeyDown = (event) => {
  const { keysDown } = state;
  saveState({
    // Add key to list of keys down, if it's not already there
    keysDown: Arrays.unique([...keysDown, event.key])
  });
  use();
};

/**
 * Key is released
 * @param {KeyboardEvent} event 
 */
const onKeyUp = (event) => {
  const { keysDown } = state;
  saveState({
    // Remove key from array
    keysDown: Arrays.without(keysDown, event.key)
  });
  use();
};


const setup = () => {
  document.addEventListener(`keydown`, onKeyDown);
  document.addEventListener(`keyup`, onKeyUp);
};


// #region Toolbox
/**
 * Saves state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

setup();
// #endregion