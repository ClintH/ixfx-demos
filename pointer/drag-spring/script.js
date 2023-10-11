import * as Flow from '../../ixfx/flow.js';
import { Oscillators } from '../../ixfx/modulation.js';
import { Points } from '../../ixfx/geometry.js';
import * as Util from './util.js';
import * as Drag from './drag.js';
import * as Shadow from './shadow.js';

/**
 * @typedef {{
 * generator:Generator<number>
 * drag:Drag.DragPoint
 * }} Spring
 */
/**
 * @typedef {Readonly<{
 * active:ReadonlyArray<Spring>
 * springUpdate:Flow.Continuously|undefined
 * shadows:ReadonlyArray<Shadow.ElementShadow>
 * }>} State
 */

const settings = Object.freeze({
  drag: new Drag.MultipointDrag()
});

/** @type State */
let state = Object.freeze({
  active:[],
  springUpdate:undefined,
  shadows:[]
});

const updateSprings = () => {
  const { active } = state;
  for (const activeSpring of active) {
    const { drag, generator } = activeSpring;
    const { element, isActive } = drag;
    const i = generator.next();
    if (i.done) {
      cancelDrag(activeSpring.drag);
    } else {
      if (isActive) continue; // Actively being dragged

      // Get latest value from spring
      const v = i.value;
      
      // How much this pointer has moved
      const offset = Points.subtract(drag.pointerLast, drag.pointerStart);
    
      // Apply to position
      let position = Points.sum(drag.elementStart, offset);
      
      // Interpolate from dragged position back to middle of screen
      // The spring value is used to determine the interpolation amount
      //const middle = Util.getMiddleForElement(element);
      position = Points.interpolate(v, position, drag.elementStart, true);

      // Move the element
      Util.moveElement(element, position);
    }
  }
  if (active.length === 0) {
    saveState({springUpdate:undefined});
    return false;
  }
};

/**
 * 
 * @param {Drag.DragPoint} drag 
 */
const cancelDrag = (drag) => {
  let {shadows, active} = state;
  const { element } = drag;

  active = active.filter(s => s.drag === drag);
  element.classList.remove(`drag-animation`);
  element.style.left = ``;
  element.style.top = ``;
  element.style.position = ``;

  // Get shadow element and remove
  const shadow = shadows.find(s => s.id === drag.id);
  if (shadow !== undefined) {
    // Remove from list of shadows and DOM
    shadows = shadows.filter(s => s.id !== drag.id);
    shadow.remove();
  }
  saveState({active, shadows});
};

function setup() {
  const { drag } = settings;

  drag.usePointerEvents();
  drag.onDragStart = (drag, source) => {
    const { element } = drag;
    let { active, shadows } = state;
    
    // Filter out existing drag spring if we've moved the same element
    const existing = active.find(s => s.drag.element === element);
    if (existing) {
      cancelDrag(existing.drag);
    }
    
    // Create a shadow element at the position of the item
    // being dragged. This is so the layout doesn't shift about
    shadows = [...shadows, Shadow.create(drag.id, element, [`draggable`,`dragging`])];

    // Mark it as being animated with this class, to take it
    // out of the usual document flow
    element.classList.add(`drag-animation`);
    //Util.moveElement(element, drag.elementStart);

    saveState({
      active, 
      shadows
    });
  };

  drag.onDragEnd = (drag,source) => {
    const { element } = drag;
    let { springUpdate } = state;
    
    if (springUpdate === undefined) {
      springUpdate = Flow.continuously(updateSprings);
      springUpdate.start();
    }
    
    const spring = {
      generator: Oscillators.spring(), 
      drag
    };

    saveState({
      // Add new spring to list of active springs
      active: [...state.active, spring], 
      // Update the reference to the 'continuously' instance to animate spring(s)
      springUpdate 
    });
  };
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