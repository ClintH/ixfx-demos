import * as Flow from '../../ixfx/flow.js';
import { Oscillators } from '../../ixfx/modulation.js';
import { Points } from '../../ixfx/geometry.js';


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
const onTick = () => {
  const { spring, to, from } = state;

  const v = spring();
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

  const thingElement = document.querySelector(`#thing`);
  if (!thingElement) return;

  if (isDone) {
    thingElement.classList.add(`isDone`);
    return;
  } else {
    thingElement.classList.remove(`isDone`);
  }

  positionElement(thingElement, currentPos);

};

const positionElement = (element, pos) => {
  const { bounds } = state;
  if (!element) return;

  const halfSize = element.getBoundingClientRect().width / 2;
  
  // Move element
  element.style.left = (pos.x * bounds.width) - halfSize+ `px`;
  element.style.top = (pos.y * bounds.height) - halfSize + `px`;
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
  
  document.addEventListener(`pointerup`, event => {
    const { bounds } = state;
    updateState({ 
      to: { 
        x: event.x / bounds.width, 
        y: event.y / bounds.height 
      },
      from: state.currentPos 
    });
    updateState({ spring: yieldNumber(Oscillators.spring()) });
    run.start();
  });

  positionElement(document.querySelector(`#thing`), state.currentPos);
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

function yieldNumber(generator, defaultValue) {
  return () => {
    const v = generator.next().value;
    if (v === undefined) return defaultValue;
    return v;
  };
}