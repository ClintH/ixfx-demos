/**
 * Demonstrates a 'pinch to zoom' style gesture
 */
import { pointerVisualise } from '../../../ixfx/dom.js';
import { Points } from '../../../ixfx/geometry.js';
import { clamp } from '../../../ixfx/data.js';
import { numberTracker, pointsTracker } from '../../../ixfx/data.js';

// Pointer visualiser. Useful for debugging. It's what adds the red border
pointerVisualise(document.body);

// Setings
const settings = Object.freeze({
  containerEl: document.getElementById(`container`),
  thingEl: document.getElementById(`thing`)
});

// State
let state = Object.freeze({
  // Track pointer locations
  pointers: pointsTracker(),
  // Track how the distance between two pointers changes
  twoFingerDistance: numberTracker(),
  // Current text scaling value
  /** @type {number} */
  scale: 1
});

/**
 * Called when the pointer moves
 * @param {PointerEvent} ev 
 */
const onPointerMove = (ev) => {
  const { pointers, twoFingerDistance } = state;

  ev.preventDefault();

  pointers.seen(ev.pointerId.toString(), { x: ev.x, y: ev.y });

  const byAge = [ ...pointers.valuesByAge() ];

  // We need at least two pointers for gesture
  if (byAge.length >= 2) {

    // Calculate distance between first two touches
    let distanceAbs = NaN;
    if (byAge[0] && byAge[1]) distanceAbs = Points.distance(byAge[0], byAge[1]);

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
    const v = relative - 1;

    // Halve it to reduce the impact on scaling
    const vv = v * 0.5;

    updateState({ scale:clamp(state.scale + vv, 0.1, 20) });
    useState();
  } else {
    // If we don't get at least two touches,
    // reset the tracker, because gesture has been cancelled
    twoFingerDistance.reset();
  }
};

/**
 * Update screen with state
 */
const useState = () => {
  const { thingEl } = settings;
  const { scale } = state;
  if (thingEl) thingEl.style.transform = `scale(${scale})`;
};

/**
 * Called when the touches end or runs out of the bounds of the viewport
 * @param {PointerEvent} ev 
 */
const onLostPointer = (ev) => {
  const { pointers } = state;
  ev.preventDefault();

  // Delete the pointer
  pointers.delete(ev.pointerId.toString());
};

const setup = () => {
  document.addEventListener(`pointermove`, onPointerMove);
  document.addEventListener(`pointerup`, onLostPointer);
  document.addEventListener(`pointerleave`, onLostPointer);

  document.addEventListener(`wheel`, evt => {
    evt.preventDefault();
  }, { passive:false });
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
