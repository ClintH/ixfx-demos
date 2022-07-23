import * as Dom from '../../ixfx/dom.js';
import { randomElement } from '../../ixfx/arrays.js';
import { continuously } from '../../ixfx/flow.js';

/**
 * Define our 'thing' (this is optional) which consists of 
 * scale,x,y,created and msg fields
 * @typedef {{
 *  x:number, 
 *  y:number, 
 *  scale:number, 
 *  msg:string, 
 *  created:number}} Thing
 */

// Define settings
const settings = Object.freeze({
  msgs: [ `🍎`, `🍏`, `🐈`, `🐝`, `🛹`, `🪂`, `🛰️`, `🦖`, `🐒` ],
  max: 10,
  addIntervalMs: 1000,
  // How much to let thing fall off edge before resetting it
  // This is needed or things can be reset too early
  edgeMax: 1.10,
  // Value to reset thing to if it goes past max
  edgeMin: -0.1,
  xSpeed: 0.01,
  ySpeed: 0.001,
  /** @type {HTMLCanvasElement|null} */
  canvasEl: document.querySelector(`#canvas`)
});

// Initial state with empty values
let state = {
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  ticks: 0,
  /** @type Thing[] */
  things: []
};

/**
 * Adds a thing.
 * @param {Thing} t 
 */
const addThing = (t) => {
  updateState({ things: [ ...state.things, Object.freeze(t) ] });
};

/**
 * Adds a random thing
 */
const addRandomThing = () => {
  addThing({
    scale: Math.random(),
    x: Math.random(),
    y: Math.random(),
    created: Date.now(),
    msg: randomElement(settings.msgs)
  });
};

/**
 * Deletes a thing
 * @param {Thing} t 
 */
const deleteThing = (t) => {
  updateState({
    things: state.things.filter(v => v !== t)
  });
};

/**
 * Returns all things younger than given milliseconds.
 * It assumes things have a `created` field
 * @param {Thing[]} things
 * @param {number} milliseconds 
 */
const deleteOlderThan = (things, milliseconds) => {
  const cutoff = Date.now() - milliseconds;
  return things.filter(v => v.created >= cutoff);
};

/**
 * Updates a single thing, returning a changed copy
 * @param {Thing} t 
 * @returns {Thing}
 */
const updateThing = (t) => {
  const { edgeMax, edgeMin, xSpeed, ySpeed } = settings;

  // Drift thing across screen (using relative coordinates)
  let x = t.x + xSpeed;
  if (x > edgeMax) {
    x = edgeMin; // Reset x
  }

  let y = t.y + ySpeed;
  if (y > edgeMax) {
    x = y = edgeMin; // Reset x & y
  }
  return Object.freeze({ ...t, x, y });
};

/**
 * Draws a single thing
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Thing} t 
 */
const drawThing = (ctx, t) => {
  const { bounds } = state;

  // Save state of drawing context before we translate
  ctx.save();

  // Translate, using absolute version of thing's x & y to be the origin
  ctx.translate(t.x * bounds.width, t.y * bounds.height);

  // This flips drawing operations so our emoji are pointing the right way
  ctx.scale(-1, 1);

  // Draw the 'msg' property of thing
  ctx.fillStyle = `black`;
  ctx.font = `${t.scale * 12}em Futura,Helvetica,Segoe,Arial`;
  ctx.textAlign = `center`;
  ctx.textBaseline = `top`;
  ctx.shadowBlur = 1;
  ctx.shadowColor = `gray`;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fillText(t.msg, 0, 0);

  // Undo the translation
  ctx.restore();
};

// Update state of world
const update = () => {
  const ticks = state.ticks + 1;

  // Update things, creating new instances
  let things = state.things.map(t => updateThing(t));

  // Eg: delete things older than 1second
  // things = deleteOlderThan(things, 1000);

  updateState({ ticks, things });
};

const useState = () => {
  const { canvasEl } = settings;
  const { things } = state;

  // Get drawing context, or exit if element is missing
  const ctx = canvasEl?.getContext(`2d`);
  if (ctx === undefined || ctx === null) return;

  // Clear canvas
  clear(ctx);

  // Draw things
  things.forEach(t => drawThing(ctx, t));

};

/**
 * Clear canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const { width, height } = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};

/**
 * 
 * @param {Partial<state>} s 
 */
const updateState = (s) => {
  state = {
    ...state,
    ...s
  };
};
/**
 * Setup and run main loop 
 */
const setup = () => {
  const { canvasEl, addIntervalMs } = settings;

  // Keep our primary canvas full size
  if (canvasEl) {
    Dom.fullSizeCanvas(canvasEl, args => {
      state = {
        ...state,
        bounds: args.bounds
      };
    });
  }

  // Keep updating and using state
  continuously(() => {
    update();
    useState();
  }).start();

  // Every addIntervalMs add a thing if we're under the the max
  continuously(() => {
    const { max } = settings;
    if (state.things.length >= max) return;

    addRandomThing();
  }, addIntervalMs).start();
};
setup();
