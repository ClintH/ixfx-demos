import { pointerVisualise } from '../../ixfx/dom.js';
import { Points } from '../../ixfx/geometry.js';
import * as Trackers from '../../ixfx/trackers.js';
import * as Numbers from '../../ixfx/numbers.js';

// Pointer visualiser. Useful for debugging. It's what adds the red border
pointerVisualise(document.body);

// Setings
const settings = Object.freeze({
  containerEl: /** @type HTMLElement */(document.querySelector(`#container`)),
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`))
});

/**
 * @typedef {{
 * pointers: Trackers.TrackedPointMap
 * twoFingerDistance: Trackers.NumberTracker
 * scale: number
 * }} State
 */

/** @type State */
let state = Object.freeze({
  // Track pointer locations
  pointers: Trackers.points(),
  // Track how the distance between two pointers changes
  twoFingerDistance: Trackers.number(),
  // Current text scaling value
  scale: 1
});

/**
 * Called when the pointer moves
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  const { pointers, twoFingerDistance } = state;
  let { scale } = state;

  event.preventDefault();

  // Update tracking of pointers
  pointers.seen(event.pointerId.toString(), { x: event.x, y: event.y });

  // Get list of tracked pointers, in ascending order by age
  const byAge = [...pointers.valuesByAge()];

  // We need at least two pointers for gesture
  const a = byAge[0];
  const b = byAge[1];

  if (a === undefined || b === undefined) {
    // If we don't get at least two touches,
    // reset the tracker, because gesture has been cancelled
    twoFingerDistance.reset();
    return;
  }

  // Calculate distance between first two touches
  let distanceAbs = Points.distance(a, b);

  // Pop it into a numberTracker, because what we really
  // care about is how much distances changes from its start value
  twoFingerDistance.seen(distanceAbs);

  // Read back the relative value (0..1 scale)  
  const relative = twoFingerDistance.relativeDifference();

  // If we don't have all the data, undefined is returned
  if (relative === undefined) return;

  // -1 so that if there's no change in finger distance, v will be close to 0
  // If there's a pinch, relative will be less than 1, so we make it negative
  // If there's a grow gesture, relative will be greater than one, so it will be positive
  let v = relative - 1;

  // Halve it to reduce the impact on scaling
  v = v * 0.5;

  // Add to scale factor, clamping to 0.1 ... 
  // 20 in practice means 2000%
  scale = Numbers.clamp(scale + v, 0.1, 20);

  // Save & then use
  saveState({
    scale
  });
  use();

};

/**
 * Update screen with state
 */
const use = () => {
  const { thingEl } = settings;
  const { scale } = state;
  console.log(scale);
  if (thingEl) thingEl.style.transform = `scale(${scale})`;
};

/**
 * Called when the touches end or runs out of the bounds of the viewport
 * @param {PointerEvent} event 
 */
const onLostPointer = (event) => {
  const { pointers } = state;
  event.preventDefault();

  // Delete the pointer
  pointers.delete(event.pointerId.toString());
};

const setup = () => {
  document.addEventListener(`pointermove`, onPointerMove);
  document.addEventListener(`pointerup`, onLostPointer);
  document.addEventListener(`pointerleave`, onLostPointer);

  document.addEventListener(`wheel`, event => {
    event.preventDefault();
  }, { passive: false });
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
