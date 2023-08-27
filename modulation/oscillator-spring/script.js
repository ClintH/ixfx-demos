import * as Flow from '../../ixfx/flow.js';
import { Oscillators } from '../../ixfx/modulation.js';
import { Points } from '../../ixfx/geometry.js';
import * as Util from './util.js';

let state = Object.freeze({
  // Default spring
  spring: yieldNumber(Oscillators.spring()),
  to: { x: 0.5, y:0.5 },
  from: { x:0.5, y: 0.5 },
  /** @type number */
  amt: 0,
  /** @type boolean */
  isDone: false,
  currentPos: { x: 0.5, y:0.5 },
  bounds: { width: 0, height: 0 }
});

// Update state with value from easing
const update = () => {
  const { spring, to, from } = state;

  const v = spring();
  if (v === undefined) {
    // Spring is complete
    saveState({ 
      isDone:true
    });
  } else {
    // Calculate position
    const pos = Points.interpolate(v, from, to, true);
  
    saveState({
      amt: v,
      isDone: false,
      currentPos: pos
    });
  }
  // Trigger a visual refresh
  use();
};

// Update visuals
const use = () => {
  const { isDone, currentPos } = state;

  const thingElement = document.querySelector(`#thing`);
  if (!thingElement) return;

  if (isDone) {
    thingElement.classList.add(`isDone`);
    return;
  } else {
    thingElement.classList.remove(`isDone`);
  }

  Util.moveElement(thingElement, currentPos);
};

function setup() {
  // Run loop. This will call `update` until it returns false
  const run = Flow.continuously(update);

  // Wire up events
  const updateResize = () => {
    saveState({ 
      bounds: { 
        width: window.innerWidth, 
        height: window.innerHeight 
      },
      from: state.currentPos 
    });
  };
  document.addEventListener(`resize`, updateResize);
  updateResize();
  
  document.addEventListener(`pointerup`, event => {
    const { bounds } = state;
    saveState({ 
      to: { 
        x: event.x / bounds.width, 
        y: event.y / bounds.height 
      },
      from: state.currentPos 
    });
    saveState({ spring: yieldNumber(Oscillators.spring()) });
    run.start();
  });

  Util.moveElement(document.querySelector(`#thing`), state.currentPos);
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

function yieldNumber(generator, defaultValue) {
  return () => {
    const v = generator.next().value;
    if (v === undefined) return defaultValue;
    return v;
  };
}