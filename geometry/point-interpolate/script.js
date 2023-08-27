import { Points } from '../../ixfx/geometry.js';

// Define settings
const settings = Object.freeze({
  interpolateAmt: 0.05
});

// Initial state with empty values
let state = Object.freeze({
  bounds: {
    width: 0,
    height: 0
  },
  location: {
    x: Math.random(),
    y: Math.random()
  },
  pointer: { x: 0, y: 0 }
});

// Update state of world
const update = () => {
  const { interpolateAmt } = settings;
  const { location, pointer } = state;

  // Move thing a bit closer to pointer
  const p = Points.interpolate(interpolateAmt, location, pointer);

  //console.log(`ptr y: ${pointer.y} loc.y: ${location.y}`);
  saveState({
    location: p
  });
};

const use = () => {
  const { location, bounds } = state;

  const thingElement = /** @type HTMLElement */(document.querySelector(`#thing`));

  if (!thingElement) return;

  // Convert relative point to an absolute one
  let loc = Points.multiply(location, bounds.width, bounds.height);

  // Positioning happens from top-left corner, so use the size of the
  // element to position from middle instead
  const b = thingElement.getBoundingClientRect();
  loc = Points.subtract(loc, b.width / 2, b.height / 2);

  // Apply final computed position to element
  thingElement.style.transform = `translate(${loc.x}px, ${loc.y}px)`;
};

// Keep track of screen size whenever it resizes
const onResize = () => {
  saveState ({
    bounds: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  });
};
  

/**
 * Handle pointerdown and pointermove
 * @param {PointerEvent} event 
 */
const onPointer = (event) => {
  const { bounds } = state;
  const x = event.clientX;
  const y = event.clientY;
  saveState({
    // Make pointer position relative (on 0..1 scale)
    pointer: Points.divide(x, y, bounds.width, bounds.height)
  });
};

function setup() {
  document.addEventListener(`resize`, onResize);
  onResize();
  document.addEventListener(`pointermove`, onPointer);
  document.addEventListener(`pointerdown`, onPointer);

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}