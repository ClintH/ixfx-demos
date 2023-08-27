import { clamp } from '../../ixfx/data.js';
import * as Dom from '../../ixfx/dom.js';
import { Colour } from '../../ixfx/visual.js';
import { StateMachine, Elapsed } from '../../ixfx/flow.js';
import { Circles } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  resetMachineAfterMs: 2000,
  // Distance threshold for circles to activate
  distanceThreshold: 0.1,
  /**
   * Define a circle in relative coordinates
   * @type {Circles.CirclePositioned[]}
   */ 
  circles: [],
  // Get --hue variable from the HTML
  hue: Colour.getCssVariable(`hue`, `100`)
});

let state = Object.freeze({
  elapsed: Elapsed.infinity(),
  /** @type string */
  current: ``,
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type number[] */
  distances: [ 1, 1, 1 ], 
});

/**
* Create a state machine that has states init <-> one <-> two <-> three
*/
const stateMachine = StateMachine.bidirectionalFromList(`init`,`one`, `two`, `three`);

/**
* State machine 'driver'
*/
const driver = await StateMachine.driver(stateMachine, [
  {
    if: `init`,
    then: () => {
      if (state.distances[0] > settings.distanceThreshold) return;
      return { next: `one` };
    },
  },
  {
    if: `one`,
    then: () => {
      if (state.distances[1] > settings.distanceThreshold) return;
      return { next: `two` };
    }
  },
  { if: `two`,
    then: () => {
      if (state.distances[2] > settings.distanceThreshold) return;
      return { next: true };
    }
  }
]);


/**
 * Gets called every second
 */
const update = async () => {
  const { resetMachineAfterMs } = settings;
  const { current } = state;
  let { elapsed } =state;
  // Get driver to do its thing
  const result = await driver.run();

  if (result?.value !== current) {
    // State has changed, keep track of it
    elapsed = Elapsed.since();
    state = { 
      ...state, 
      elapsed, 
      current: /** @type string */(result?.value) 
    };
  }

  // If nothing has changed for a while, reset machine
  if (elapsed() >= resetMachineAfterMs) {
    driver.reset();
  }
};

/**
 * Does the visual drawing.
 * Gets called at animation speed.
 * @param {CanvasRenderingContext2D} context 
 * @returns 
 */
const use = (context) => {
  const { bounds, distances, current } = state;
  const { hue, circles } = settings;

  setText(`state`, current);
  context.clearRect(0,0,bounds.width,bounds.height);
  const stateLabel = current;

  // Draw each circle
  for (const [index, c] of circles.entries()) {
    // Distance inverted (so 1 is close, 0 far)
    const d = Math.floor((1 - distances[index]) * 100);

    // Change fill style depending on distance
    const fillStyle = `hsl(${hue}, ${d}%, 50%)`;

    // Determine lightness of border depending on state
    let lightness = 0.1;
    if (stateLabel === `one` && index === 0) lightness = 0.5;
    else if (stateLabel === `two` && index <= 1) lightness = 0.5;
    else if (stateLabel === `three` && index <= 2) lightness = 0.5;
    let strokeStyle = `hsl(${hue}, 50%, ${lightness*100}%)`;

    // Draw
    drawCircle(context, c, fillStyle, strokeStyle);
  
  }
};

/**
 * Draw a circle
 * @param {CanvasRenderingContext2D} context 
 * @param {Circles.CirclePositioned} circle
 */
const drawCircle = (context, circle, fillStyle, strokeStyle) => {
  // Get absolute point
  const circlePos = toAbsolutePoint(circle);

  // Translate to middle of circle
  context.save();
  context.translate(circlePos.x, circlePos.y);

  // Fill a circle
  context.beginPath();
  context.arc(0, 0, circle.radius*window.innerWidth, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = strokeStyle;
  context.stroke();
  context.closePath();

  // Unwind translation
  context.restore();
};

const onPointerMove = (event) => {
  const { circles } = settings;

  // Compute relative point on a 0..1 scale
  const pointer = {
    x: clamp(event.x / window.innerWidth),
    y: clamp(event.y / window.innerHeight)
  };

  // Compute distances to each circle
  const distances = circles.map(c => Circles.distanceCenter(c, pointer));

  saveState({ distances });
};

const createCircle = (x, y) => {
  return {
    radius: 0.1,
    x, y
  };
};

function setup() {
  settings.circles.push(
    createCircle(0.2, 0.5),
    createCircle(0.5, 0.5),
    createCircle(0.8, 0.5)
  );

  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({ bounds: arguments_.bounds });
  });

  document.addEventListener(`pointermove`, onPointerMove);

  /** @type HTMLCanvasElement|null */
  const canvasElement = document.querySelector(`#canvas`);
  const context = canvasElement?.getContext(`2d`);
  
  const loop = () => {
    if (context) use(context);
    window.setTimeout(loop, 10);
  };
  loop();
  
  const processStateLoop = () => {
    update();
    window.setTimeout(processStateLoop, 1000);
  };
  processStateLoop();
};
setup();

//#region helpers
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

function toAbsolutePoint(p) {
  return {
    x: p.x * state.bounds.width,
    y: p.y * state.bounds.height
  };
}

/**
 * Sets the innerText of an element with `id`
 * @param {string} id
 * @param {string} text
 * @returns void
 */
function setText(id, text)  {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  if (element.textContent === text) return;
  element.textContent = text;
}
//#endregion