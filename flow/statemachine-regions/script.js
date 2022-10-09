import { clamp } from '../../ixfx/data.js';
import * as Dom from '../../ixfx/dom.js';
import { Colour } from '../../ixfx/visual.js';
import { StateMachine } from '../../ixfx/flow.js';
import { Circles } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  /**
   * Create a state machine that has states init <-> one <-> two <-> three
   */
  sm: StateMachine.fromListBidirectional(`init`,`one`, `two`, `three`),
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
  bounds: {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 }
  },
  /** @type number[] */
  distances: [ 1, 1, 1 ], 
});

/**
* State machine 'driver'
*/
const driver = StateMachine.drive(settings.sm, {
  init: () => {
    if (state.distances[0] > settings.distanceThreshold) return;
    return { state: `one` };
  },
  one: () => {
    if (state.distances[1] > settings.distanceThreshold) return;
    return { state: `two` };
  },
  two: () => {
    if (state.distances[2] > settings.distanceThreshold) return;
    return { next: true };
  },
});


/**
 * Process state gets called every second
 */
const processState = () => {
  const { sm, resetMachineAfterMs } = settings;

  // Get driver to do its thing
  driver();

  // If nothing has changed for a while, reset machine
  if (sm.elapsed >= resetMachineAfterMs) {
    sm.reset();
  }
};

/**
 * useState does the visual drawing.
 * Gets called at animation speed.
 * @param {CanvasRenderingContext2D} ctx 
 * @returns 
 */
const useState = (ctx) => {
  const { bounds, distances } = state;
  const { hue, circles, sm } = settings;

  setText(`state`, settings.sm.state);
  ctx.clearRect(0,0,bounds.width,bounds.height);
  const stateLabel = sm.state;

  // Draw each circle
  circles.forEach((c, index) =>  {
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
    drawCircle(ctx, c, fillStyle, strokeStyle);
  
  });
};

/**
 * Draw a circle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Circles.CirclePositioned} circle
 */
const drawCircle = (ctx, circle, fillStyle, strokeStyle) => {
  // Get absolute point
  const circlePos = toAbsolutePoint(circle);

  // Translate to middle of circle
  ctx.save();
  ctx.translate(circlePos.x, circlePos.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, circle.radius*window.innerWidth, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
  ctx.closePath();

  // Unwind translation
  ctx.restore();
};

const onPointerMove = (evt) => {
  const { circles } = settings;

  // Compute relative point on a 0..1 scale
  const rel = {
    x: clamp(evt.x / window.innerWidth),
    y: clamp(evt.y / window.innerHeight)
  };

  // Compute distances to each circle
  const distances = circles.map(c => Circles.distanceCenter(c, rel));

  updateState({ distances });
};


/**
 * Setup and run main loop 
 */
const setup = () => {
  const createCircle = (x, y) => {
    return {
      radius: 0.1,
      x, y
    };
  };
  settings.circles.push(createCircle(0.2, 0.5));
  settings.circles.push(createCircle(0.5, 0.5));
  settings.circles.push(createCircle(0.8, 0.5));

  Dom.fullSizeCanvas(`#canvas`, args => {
    // Update state with new size of canvas
    updateState({ bounds: args.bounds });
  });

  document.addEventListener(`pointermove`, onPointerMove);

  /** @type HTMLCanvasElement|null */
  const canvasEl = document.querySelector(`#canvas`);
  const ctx = canvasEl?.getContext(`2d`);
  
  const loop = () => {
    if (ctx) useState(ctx);
    window.setTimeout(loop, 10);
  };
  loop();
  
  const processStateLoop = () => {
    processState();
    window.setTimeout(processStateLoop, 1000);
  };
  processStateLoop();
};
setup();

//#region helpers
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
  const el = document.getElementById(id);
  if (!el) return;
  if (el.innerText === text) return;
  el.innerText = text;
}
//#endregion