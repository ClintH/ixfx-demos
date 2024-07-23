import { clamp } from '../../ixfx/numbers.js';
import { CanvasHelper } from '../../ixfx/dom.js';
import { Colour } from '../../ixfx/visual.js';
import { StateMachine, Elapsed } from '../../ixfx/flow.js';
import { Circles } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),

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
  /** @type number[] */
  distances: [1, 1, 1],
});

/**
* Create a state machine that has states init <-> one <-> two <-> three
*/
const stateMachine = StateMachine.fromListBidirectional(`init`, `one`, `two`, `three`);

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
  {
    if: `two`,
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
  let { elapsed } = state;
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
 * @returns 
 */
const use = () => {
  const { distances, current } = state;
  const { canvas, hue, circles } = settings;
  const { ctx, width, height } = canvas;

  setText(`state`, current);
  ctx.clearRect(0, 0, width, height);
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
    let strokeStyle = `hsl(${hue}, 50%, ${lightness * 100}%)`;

    // Draw
    drawCircle(c, fillStyle, strokeStyle);
  }
};

/**
 * Draw a circle
 * @param {Circles.CirclePositioned} circle
 */
const drawCircle = (circle, fillStyle, strokeStyle) => {
  const { canvas } = settings;
  const { ctx } = canvas;

  // Get absolute point
  const circlePos = canvas.toAbsolute(circle);

  // Translate to middle of circle
  ctx.save();
  ctx.translate(circlePos.x, circlePos.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, circle.radius * window.innerWidth, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
  ctx.closePath();

  // Unwind translation
  ctx.restore();
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

  document.addEventListener(`pointermove`, onPointerMove);

  const loop = () => {
    use();
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
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

/**
 * Sets the innerText of an element with `id`
 * @param {string} id
 * @param {string} text
 * @returns void
 */
function setText(id, text) {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  if (element.textContent === text) return;
  element.textContent = text;
}
//#endregion