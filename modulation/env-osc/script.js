
import { Envelopes } from '../../ixfx/modulation.js';
import * as Things from './thing.js';

const settings = Object.freeze({
  sizeEm: 10,
  envelope: {
    ...Envelopes.defaultAdsrOpts(),
    // Override some envelope options...
    // See: https://clinth.github.io/ixfx-docs/modulation/envelope/
    sustainLevel: 1,
    releaseDuration: 1000,
    retrigger: true
  }
});

/**
 * @typedef {{
*  thing: Things.Thing
* }} State
*/

/** @type State */
let state = Object.freeze({
  /** 
   * Create a thing, to control HTML element with id 'thing'
   */
  thing: Things.generate(`thing`, settings.envelope),
});

const use = () => {
  Things.use(state.thing);
};

const update = () => {
  // Update state with changed thing
  saveState({ 
    thing: Things.update(state.thing)
  });

  use(); 
  window.requestAnimationFrame(update);
};

const setup = () => {
  console.log(`Envelope looks like:`);
  console.log(settings.envelope);

  // Trigger and hold envelopes when pointer is down
  window.addEventListener(`pointerdown`, event => {
    const { thing } = state;
    console.log(`Envelope trigger`);
    thing.envelope.trigger(false);
  });

  // Release envelope on pointerup
  window.addEventListener(`pointerup`, event => {
    const { thing } = state;
    console.log(`Envelope release`);
    thing.envelope.release();
  });
  update();
};
setup();

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

