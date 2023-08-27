import * as Dom from '../../ixfx/dom.js';
import { clamp, numberTracker } from '../../ixfx/data.js';
import { Points, radianToDegree } from '../../ixfx/geometry.js';
import { repeat } from '../../ixfx/flow.js';
import * as Util from './util.js';
import * as Things from './thing.js';

// Define settings
const settings = Object.freeze({});

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
  /** @type {readonly Things.Thing[]} */
  things: [...repeat(40, () =>Things.create())],
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


const update = () => {
  const { pointA, pointB, distanceAvg } = state;
  const distance = Points.distance(pointA, pointB);
  const angle = Points.angle(pointA, pointB);
  const angleDegrees = radianToDegree(angle);

  distanceAvg.seen(distance);
  
  const averageDistance = distanceAvg.avg;
  const distanceDiff = distance - averageDistance;

  saveState({
    distance, distanceDiff
  });

  const things = state.things.map(t => updateThing(t));
  saveState({ things });

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
 * @param {Things.Thing} thing 
 */
const updateThing = (thing) => {
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

const use = () => {
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
  Util.drawCircle(context, pointA, `red`);
  Util.drawCircle(context, pointB, `blue`);
};

/**
 * Draw a thing
 * @param {CanvasRenderingContext2D} context 
 * @param {Things.Thing} thing
 */
const drawThing = (context, thing) => {
  const posAbs = Util.relativeToAbsolute(thing);
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
  const pos = Util.absoluteToRelative(event);
  saveState({
    pointA: pos
  });
};


function setup() { 
  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({ bounds: arguments_.bounds });
  });

  const loop = () => {
    use();
    window.requestAnimationFrame(loop);
  };
  loop();

  const updateLoop = () => {
    update();
    setTimeout(updateLoop, 10);
  };
  updateLoop();
  document.addEventListener(`pointermove`, onPointerMove);
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
