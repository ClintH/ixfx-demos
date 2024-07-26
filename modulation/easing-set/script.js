import { Easings } from '../../ixfx/modulation.js';
import * as Data from '../../ixfx/data.js';
import * as Util from './util.js';

const settings = Object.freeze({
  easing: /** @type Easings.Options */({
    name: `quintIn`,
    duration: 1000,
  }),
  // The visual 'fill' element
  fillElement: /** @type HTMLElement */(document.querySelector(`#slider>.fill`)),
  sliderElement: /** @type HTMLElement */(document.querySelector(`#slider`))
});


let state = {
  // By default, compute x by just returning 0
  x: () => 0
};

/**
 * Make visual udpates based on current state
 * @param {Data.ResolvedObject<state>} computed
 * @returns 
 */
async function use(computed) {
  const { fillElement } = settings;
  const { x } = computed;

  // Update UI
  fillElement.style.width = `${x * 100}%`;
};


/**
 * Pointer up on the '#slider' element
 * @param {PointerEvent} event 
 */
const onPointerUp = (event) => {
  const { easing, sliderElement } = settings;

  // Get relative position of click according to size of element
  // This gives us {x,y} on a scale of 0..1
  const pos = Util.relativePosition(sliderElement, event);

  // The easing function will produce 0..1 on a non-linear scale (ie. curved a little)
  const e = Easings.create(easing);

  // We want to ease from the current value to the new target
  const currentX = state.x();         // Current x value
  const totalDistance = pos.x - currentX;  // Distance that needs to be travelled

  // Function to compute relative x value
  // based on progress on easing curve 
  // and the starting point
  const x = () => {
    // How far along total distance, according to
    // easing function
    const distance = e() * totalDistance;

    // Apply to the value when we started
    return currentX + distance;
  };

  // Save this function to state
  // so it will get called during update()
  saveState({
    x
  });
};

async function update() {
  // Resolve functions in state
  const computed = await Data.resolveFields(state);

  // Use the computed state
  await use(computed);

  window.requestAnimationFrame(update);
}

function setup() {
  const slider = /** @type HTMLElement */(document.querySelector(`#slider`));
  if (!slider) return;

  slider.addEventListener(`pointerup`, onPointerUp);

  update();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}