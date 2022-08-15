import * as Flow from '../../ixfx/flow.js';
import { Oscillators } from '../../ixfx/modulation.js';
import { Points } from '../../ixfx/geometry.js';

let state = Object.freeze({
  spring: Oscillators.spring(),
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
const onTick = () => {
  const { spring, to, from } = state;

  const v = spring.next().value;
  if (v === undefined) {
    // Spring is complete
    updateState({ 
      isDone:true
    });
  } else {
    // Calculate position
    const pos = Points.interpolate(v, from, to, true);
  
    updateState({
      amt: v,
      isDone: false,
      currentPos: pos
    });
  }
  // Trigger a visual refresh
  useState();
};

// Update visuals
const useState = () => {
  const { isDone, currentPos } = state;

  const thingEl = document.getElementById(`thing`);
  if (!thingEl) return;

  if (isDone) {
    thingEl.classList.add(`isDone`);
    return;
  } else {
    thingEl.classList.remove(`isDone`);
  }

  positionEl(thingEl, currentPos);

};

const positionEl = (el, pos) => {
  const { bounds } = state;
  if (!el) return;

  const halfSize = el.getBoundingClientRect().width / 2;
  
  // Move element
  el.style.left = (pos.x * bounds.width) - halfSize+ `px`;
  el.style.top = (pos.y * bounds.height) - halfSize + `px`;
};

const setup = () => {
  // Run loop. This will call `onTick` until it returns false
  const run = Flow.continuously(onTick);

  // Wire up events
  const updateResize = () => {
    updateState({ 
      bounds: { 
        width: window.innerWidth, 
        height: window.innerHeight 
      },
      from: state.currentPos 
    });
  };
  document.addEventListener(`resize`, updateResize);
  updateResize();
  
  document.addEventListener(`pointerup`, evt => {
    const { bounds } = state;
    updateState({ 
      to: { 
        x: evt.x / bounds.width, 
        y: evt.y / bounds.height 
      },
      from: state.currentPos 
    });
    updateState({ spring: Oscillators.spring() });
    run.start();
  });

  positionEl(document.getElementById(`thing`), state.currentPos);
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