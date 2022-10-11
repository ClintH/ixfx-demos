import * as Dom from '../../ixfx/dom.js';
import { clamp, numberTracker } from '../../ixfx/data.js';
import { Points, degreeToRadian, radianToDegree } from '../../ixfx/geometry.js';
import { repeat } from '../../ixfx/flow.js';

// Define settings
const settings = Object.freeze({
  dotColour: `black`,
  textColour: `white`,
  radius: 100,
});

/**
 * @typedef {{
 *  x: number,
 *  y: number,
 *  scale: number
 *  mass: number
 * }} Thing
 */

// Initial state with empty values
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  pointA: {
    y: 0.5,
    x: 0.5
  },
  pointB: {
    x: 0.8,
    y: 0.5
  },
  /** @type {readonly Thing[]} */
  things: repeat(40, randomThing),
  // thing: {
  //   x: 0.5,
  //   y: 0.5,
  //   scale: 0.5
  // },
  /** @type number */
  distance:0,
  distanceAvg: numberTracker(`distance`, {
    storeIntermediate: true,
    sampleLimit: 200
  }),
  /** @type number */
  distanceDiff: 0
});

function randomThing() {
  return {
    x: Math.random(),
    y: Math.random(),
    mass: Math.random(),
    scale: Math.random() * 0.5
  };
}

const computeState = () => {
  const { pointA, pointB, distanceAvg } = state;
  const distance = Points.distance(pointA, pointB);
  const angle = Points.angle(pointA, pointB);
  const angleDegrees = radianToDegree(angle);

  distanceAvg.seen(distance);
  
  const averageDistance = distanceAvg.avg;
  const distanceDiff = distance - averageDistance;

  updateState({
    distance, distanceDiff
  });


  const newThings = state.things.map(computeThing);
  updateState({ things: newThings });

  setText(`debug`, `
  distance: ${distance}
  distanceAvg: ${distanceAvg.avg}
  distanceDiff: ${distanceDiff.toFixed(2)}
  angle: ${angle}
  angleDegrees: ${angleDegrees}
  `);
};

/**
 * 
 * @param {Thing} thing 
 */
const computeThing = (thing) => {
  const { distanceDiff } = state;
  const { scale, mass } = thing;

  let newScale = scale * (0.9999);
  
  newScale = newScale + (distanceDiff*mass*0.1);
  newScale = clamp(newScale, 0.01);

  return {
    ...thing,
    scale: newScale
  };

};

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    if (el.innerText !== text) {
      el.innerText = text;
    }
  }
}

const drawState = () => {
  const { pointA, pointB } = state;
  /** @type HTMLCanvasElement|null */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  if (!ctx || !canvasEl) return;

  // Clear canvas
  clear(ctx);

  state.things.forEach(thing => {
    drawThing(ctx, thing);
  });

  // Draw new things
  drawCircle(ctx, pointA, `red`);
  drawCircle(ctx, pointB, `blue`);

};

/**
 * Draw a thing
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Thing} thing
 */
const drawThing = (ctx, thing) => {
  const posAbs = relativeToAbsolute(thing);
  const radius = thing.scale * window.innerWidth / 4;
  
  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(posAbs.x, posAbs.y);

  // Fill a circle
  ctx.beginPath();
  ctx.fillStyle = `hsl(${thing.mass*360}, 100%, 50%)`;
  
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

/**
 * Draw a circle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x:number, y:number}} circle
 * @param {string} fillStyle
 */
const drawCircle = (ctx, circle, fillStyle) => {
  const circlePosAbs = relativeToAbsolute(circle);
  const radius = 5;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(circlePosAbs.x, circlePosAbs.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

/**
 * Clears canvas
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
 * @param {PointerEvent} evt 
 */
const onPointerMove = (evt) => {
  const pos = absoluteToRelative(evt);
  updateState({
    pointA: pos
  });
};

function absoluteToRelative(pos) {
  return {
    x: pos.x / window.innerWidth,
    y: pos.y / window.innerHeight
  };
}

function relativeToAbsolute(pos) {
  return {
    x: pos.x * window.innerWidth,
    y: pos.y * window.innerHeight
  };
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({ bounds: args.bounds });
  });

  const loop = () => {
    drawState();
    window.requestAnimationFrame(loop);
  };
  loop();

  const updateLoop = () => {
    computeState();
    setTimeout(updateLoop, 10);
  };
  updateLoop();
  document.addEventListener(`pointermove`, onPointerMove);
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
