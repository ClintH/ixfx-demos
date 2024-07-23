import { Trackers, Numbers } from '../../ixfx/bundle.js';
import { CanvasHelper } from '../../ixfx/dom.js';
import { Points, radianToDegree } from '../../ixfx/geometry.js';
import { repeat } from '../../ixfx/flow.js';
import * as Util from './util.js';
import * as Things from './thing.js';

// Define settings
const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

// Initial state with empty values
let state = Object.freeze({
  pointA: {
    y: 0.5,
    x: 0.5
  },
  pointB: {
    x: 0.8,
    y: 0.5
  },
  /** @type {readonly Things.Thing[]} */
  things: [...repeat(40, () => Things.create())],
  /** @type number */
  distance: 0,
  distanceAvg: Trackers.number({
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

  computedScale = computedScale + (distanceDiff * mass * 0.1);
  computedScale = Numbers.clamp(computedScale, 0.01);

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
  const { canvas } = settings;
  const { pointA, pointB } = state;

  // Clear canvas
  clear(canvas);

  for (const thing of state.things) {
    drawThing(canvas, thing);
  }

  // Draw new things
  Util.drawCircle(canvas, pointA, `red`);
  Util.drawCircle(canvas, pointB, `blue`);
};

/**
 * Draw a thing
 * @param {CanvasHelper} canvas 
 * @param {Things.Thing} thing
 */
const drawThing = (canvas, thing) => {
  const { ctx } = canvas;
  const posAbs = canvas.toAbsolute(thing);
  const radius = thing.scale * window.innerWidth / 4;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(posAbs.x, posAbs.y);

  // Fill a circle
  ctx.beginPath();
  ctx.fillStyle = `hsl(${thing.mass * 360}, 100%, 50%)`;

  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

/**
 * Clears canvas
 * @param {CanvasHelper} canvas 
 */
const clear = (canvas) => {
  const { width, height, ctx } = canvas;

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
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  const { canvas } = settings;
  const pos = canvas.toRelative({ x: event.clientX, y: event.clientY });
  saveState({
    pointA: pos
  });
};


function setup() {
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
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
