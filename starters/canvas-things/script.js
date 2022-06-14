import * as Dom from '../../ixfx/dom.js';
import {randomElement} from '../../ixfx/arrays.js';
import {continuously} from '../../ixfx/flow.js';

/**
 * Define our 'thing' (this is optional) which consists of x,y and msg fields
 * @typedef {{x:number, y:number, scale:number, msg:string, created:number}} Thing
 */

// Define settings
const settings = {
  msgs: [`🍎`, `🍏`, `🐈`, `🐝`, `🛹`, `🪂`, `🛰️`, `🦖`, `🐒`],
  max: 10,
  addIntervalMs: 100,
  // How much to let thing fall off edge before resetting it
  // This is needed or things can be reset too early
  edgeGrace: 0.1
};

// Initial state with empty values
let state = {
  bounds: {
    width: 0,
    height: 0,
    center: {x: 0, y: 0}
  },
  ticks: 0,
  things: []
};

/**
 * Adds a thing
 * @param {Thing} t 
 */
const addThing = (t) => {
  t.created = Date.now();
  state.things.push(t);
};

const addRandomThing = () => {
  addThing({
    scale: Math.random(),
    x: Math.random(),
    y: Math.random(),
    msg: randomElement(settings.msgs)
  });
}

/**
 * Deletes a thing
 * @param {*} t 
 */
const deleteThing = (t) => {
  state.things = state.things.filter(v => v !== t);
}

/**
 * Deletes all things older than given milliseconds.
 * It assumes things have a `created` field
 * @param {number} milliseconds 
 */
const deleteOlderThan = (milliseconds) => {
  const cutoff = Date.now() - milliseconds;
  state.things = state.things.filter(v => v.created >= cutoff);
}

/**
 * Updates a single thing
 * @param {Thing} t 
 */
const updateThing = (t) => {
  const {edgeGrace} = settings;
  // Drift thing across screen (using relative coordinates)
  t.x += 0.01;
  if (t.x > 1 + edgeGrace) t.x = 0;

  t.y += 0.001;
  if (t.y > 1 + edgeGrace) t.y = 0;
};

/**
 * Draws a single thing
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Thing} t 
 */
const drawThing = (ctx, t) => {
  const {bounds} = state;

  // Save state of drawing context before we translate
  ctx.save();

  // Translate, using absolute version of thing's x & y to be the origin
  ctx.translate(t.x * bounds.width, t.y * bounds.height);

  // This flips drawing operations so our emoji are pointing the right way
  ctx.scale(-1, 1);

  // Draw the 'msg' property of thing
  ctx.fillStyle = `black`;
  ctx.font = `${t.scale * 12}em Futura,Helvetica,Segoe,Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.shadowBlur = 1;
  ctx.shadowColor = `gray`;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fillText(t.msg, 0, 0);

  // Undo the translation
  ctx.restore();
}

// Update state of world
const update = () => {
  const {ticks} = state;
  state = {
    ...state,
    ticks: ticks + 1
  }

  // Update things
  state.things.forEach(t => updateThing(t));

  // Eg: delete things older than 1second
  // deleteOlderThan(1000);
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
const clear = (ctx) => {
  const {width, height} = state.bounds;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  // Keep our primary canvas full size
  /** @type {HTMLCanvasElement} */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl.getContext(`2d`);

  Dom.fullSizeCanvas(canvasEl, args => {
    // Update state with new size of canvas
    state = {
      ...state,
      bounds: args.bounds
    }
  });

  continuously(() => {
    // Update state
    update();

    // Clear canvas
    clear(ctx);

    // Draw things
    state.things.forEach(t => drawThing(ctx, t));
  }).start();


  // Every addIntervalMs add a thing if we're under the the max
  continuously(() => {
    const {max: maxThings} = settings;
    if (state.things.length >= maxThings) return;

    addRandomThing();
  }, settings.addIntervalMs).start();
}
setup();
