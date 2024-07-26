import { Envelopes } from '../../ixfx/modulation.js';
import { count } from '../../ixfx/numbers.js';
import * as Things from './thing.js';

const settings = Object.freeze({
  sizeEm: 10,
  howManyThings: 10,
  envelope: new Envelopes.Adsr({
    sustainLevel: 1,
    attackDuration: 2000,
    releaseDuration: 6000,
    retrigger: true
  })
});

/**
 * @typedef {{
 * things: Things.Thing[]
 * mod: number
 * }} SketchState
 */

/** @type SketchState */
let state = {
  things: [],
  mod: 0
};

const use = () => {
  for (const t of state.things) {
    Things.use(t);
  }
};

const update = async () => {
  const { envelope } = settings;
  const { things } = state;

  // Get value value & stage of envelope
  const env = envelope.compute();
  let envelopeValue = 0;
  // If the envelope is running, use the value and print it out
  if (env[0] !== undefined) {
    envelopeValue = env[1];
    //console.log(`Envelope stage: '${env[0]}' value: ${envelopeValue.toFixed(2)}`);
  }
  // Update each thing
  // 1. Things.update is async, so it returns a Promise. Make an array of these promises via .map
  const promises = things.map(t => Things.update(t, envelopeValue));

  // 2. Wait for all these promises to resolve
  const changedThings = await Promise.all(promises);

  // 3. Save final results
  saveState({
    things: changedThings,
    mod: envelopeValue
  });

  use();
  window.requestAnimationFrame(update);
};

function generateThing() {
  const thing = Things.generate();
  saveState({
    things: [...state.things, thing]
  });
  return thing;
}

const setup = () => {
  // Trigger and hold envelopes when pointer is down
  window.addEventListener(`pointerdown`, event => {
    const { envelope } = settings;
    envelope.trigger(true);
  });

  // Release envelope on pointerup
  window.addEventListener(`pointerup`, event => {
    console.log(`pointerup`);
    const { envelope } = settings;
    envelope.release();
  });

  // Create 5 things
  for (const v of count(settings.howManyThings)) {
    generateThing();
  }
  update();
};
setup();

/**
 * Update state
 * @param {Partial<SketchState>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

