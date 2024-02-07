import { Points, radianToDegree } from '../../ixfx/geometry.js';
import * as Util from './util.js';

/**
 * @typedef {{
 * reference: Points.Point
 * location: Points.Point
 * pointer: Points.Point
 * angleDeg: number
 * distance: number
 * }} State
 */

/** @type State */
let state = Object.freeze({
  // Point to compare against (in relative coords)
  reference: { x: 0.5, y: 0.5 },
  // Other point to compare to
  location: {
    x: Math.random(),
    y: Math.random()
  },
  // Calculated angle between reference and location
  angleDeg: 0,
  // Calculated distance between reference and location
  distance: 0,
  // Current position of pointer
  pointer: { x: 0, y: 0 }
});

// Update state of world
const update = () => {
  const { pointer, reference } = state;

  // Demo some calculations
  // Because we're using relative points, distance will be a percentage
  const distance = Points.distance(reference, pointer);

  // Angle
  const angleDeg = radianToDegree(Points.angle(reference, pointer));

  // Update state with calculations...
  saveState({
    location: pointer,
    distance,
    angleDeg
  });
};

const use = () => {
  const { location, reference, distance, angleDeg } = state;

  // Position element that tracks pointer
  Util.positionElementByRelative(`#thing`, location);

  // Position 'reference' element
  Util.positionElementByRelative(`#reference`, reference);

  // Update labels
  Util.textContent(`#lblDistance`, distance.toPrecision(2));
  Util.textContent(`#lblAngleDeg`, Math.round(angleDeg).toString());
};

/**
 * Handle pointerdown and pointermove
 * @param {PointerEvent} event 
 */
const onPointerMoveOrDown = (event) => {
  event.preventDefault();
  saveState({
    // Make pointer position relative (on 0..1 scale)
    pointer: Util.relativePoint(event.clientX, event.clientY)
  });
};

function setup() {
  document.addEventListener(`pointerdown`, onPointerMoveOrDown);
  document.addEventListener(`pointermove`, onPointerMoveOrDown);

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();
};
setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

