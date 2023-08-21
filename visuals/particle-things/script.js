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
  things: [...repeat(40, randomThing)],
  // thing: {
  //   x: 0.5,
  //   y: 0.5,
  //   scale: 0.5
  // },
  /** @type number */
  distance:0,
  distanceAvg: numberTracker({
    id: `distance`,
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


  const things = state.things.map(t => computeThing(t));
  updateState({ things });

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

  let computedScale = scale * (0.9999);
  
  computedScale = computedScale + (distanceDiff*mass*0.1);
  computedScale = clamp(computedScale, 0.01);

  return {
    ...thing,
    scale: computedScale
  };

};

function setText(id, text) {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element && element.textContent !== text) {
    element.textContent = text;
  }
}

const drawState = () => {
  const { pointA, pointB } = state;
  /** @type HTMLCanvasElement|null */
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  if (!context || !canvasElement) return;

  // Clear canvas
  clear(context);

  for (const thing of state.things) {
    drawThing(context, thing);
  }

  // Draw new things
  drawCircle(context, pointA, `red`);
  drawCircle(context, pointB, `blue`);

};

/**
 * Draw a thing
 * @param {CanvasRenderingContext2D} context 
 * @param {Thing} thing
 */
const drawThing = (context, thing) => {
  const posAbs = relativeToAbsolute(thing);
  const radius = thing.scale * window.innerWidth / 4;
  
  // Translate so 0,0 is the middle
  context.save();
  context.translate(posAbs.x, posAbs.y);

  // Fill a circle
  context.beginPath();
  context.fillStyle = `hsl(${thing.mass*360}, 100%, 50%)`;
  
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fill();

  // Unwind translation
  context.restore();
};

/**
 * Draw a circle
 * @param {CanvasRenderingContext2D} context 
 * @param {{x:number, y:number}} circle
 * @param {string} fillStyle
 */
const drawCircle = (context, circle, fillStyle) => {
  const circlePosAbs = relativeToAbsolute(circle);
  const radius = 5;

  // Translate so 0,0 is the middle
  context.save();
  context.translate(circlePosAbs.x, circlePosAbs.y);

  // Fill a circle
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.fill();

  // Unwind translation
  context.restore();
};

/**
 * Clears canvas
 * @param {CanvasRenderingContext2D} context 
 */
const clear = (context) => {
  const { width, height } = state.bounds;

  // Make background transparent
  context.clearRect(0, 0, width, height);

  // Clear with a colour
  //context.fillStyle = `orange`;
  //context.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //context.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //context.fillRect(0, 0, width, height);
};

/**
 * 
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  const pos = absoluteToRelative(event);
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
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    updateState({ bounds: arguments_.bounds });
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
