import {Points, radianToDegree} from "../../../ixfx/geometry.js";
import {reconcileChildren} from '../../../ixfx/dom.js';
import {pointTracker} from "../../../ixfx/temporal.js";
import {clamp} from "../../../ixfx/util.js";

import * as Arrays from '../../../ixfx/arrays.js';

/** @typedef {{rotation?: { initial:number, current:number}, averageDistance?:number, centroid?: {travel:number, pos:Points.Point, start:Points.Point}}} GestureState */

const settings = {
  thingsEl: document.getElementById(`things`),
  centroidEl: document.getElementById(`centroid`),
  startCentroidEl: document.getElementById(`startCentroid`),

  thingSize: 100
};


let state = {
  /** @type PointTracker */
  pointers: pointTracker({trackIntermediatePoints: false}),
  /** @type GestureState */
  gesture: {},
  initialRotation: NaN,
  rotation: NaN
};

/**
 * 
 * @param {TrackedPoint[]} byAge 
 * @param {GestureState} prevGestureState
 * @returns {GesureState} 
 */
const gestureLengths = (byAge, prevGestureState) => {
  const centroid = prevGestureState.centroid;
  if (!centroid) throw new Error(`Needs centroid calculation`);

  // Less than two points, can't calculate the distance
  if (byAge.length < 2) {
    return {
      ...prevGestureState,
      averageDistance: undefined
    };
  }
  // Calculate average length from all touches to centroid
  const lengths = byAge.map(tp => Points.distance(tp, centroid.pos));
  const lengthsSum = lengths.reduce((acc, v) => v + acc, 0);

  // Compute total possible length
  const halfMaxDimension = Math.max(window.innerWidth, window.innerHeight) / 2;

  return {
    ...prevGestureState,
    averageDistance: clamp(lengthsSum / byAge.length / halfMaxDimension)
  }
};

const gestureRotation = (a, b, prevGestureState) => {
  if (a === undefined || b === undefined) return {
    ...prevGestureState, rotation: {}
  };

  // Track rotation of first two touches
  const r = radianToDegree(Points.angleBetween(a, b));
  const state = prevGestureState.rotation ?? {};

  if (typeof state.initial === `undefined`) {
    // First time we have two touches
    state.initial = r;
  } else {
    // Compute difference from initial
    state.current = state.initial - r;
  }
  return {
    ...prevGestureState,
    rotation: state
  };
};

/**
 * Calculate centroid of all touches
 * @param {PointTracker} pointers 
 * @param {GestureState} prevGestureState 
 * @returns {GestureState}
 */
const gestureCentroid = (pointers, prevGestureState) => {
  if (pointers.size < 2) return {...prevGestureState, centroid: {}};
  const prevState = prevGestureState.centroid ?? {};

  const centroid = Points.centroid(...Array.from(pointers.lastPoints()));

  let newState;
  if (prevState.start) {
    // Already have a start point
    newState = {
      pos: centroid,
      start: prevState.start,
      travel: Points.distance(prevState.start, centroid)
    }
  } else {
    // Do not yet have a start point
    newState = {
      pos: centroid,
      start: centroid,
      travel: 0
    };
  }
  return {
    ...prevGestureState,
    centroid: newState
  };
};

/**
 * 
 * @param {PointerEvent} ev 
 */
const trackPoint = (ev) => {
  if (ev.pointerType === `mouse`) return;
  ev.preventDefault();
  const {pointers} = state;

  // Track point, associated with pointerId
  const info = pointers.seen(ev.pointerId, {x: ev.x, y: ev.y});

  update();
};

const positionEl = (el, point, size) => {
  el.style.left = (point.x - size / 2) + `px`;
  el.style.top = (point.y - size / 2) + `px`;
}


const update = () => {
  const {pointers, gesture} = state;

  let s = state;
  s = gestureCentroid(pointers, gesture);

  // Pointers sorted by age, oldest first
  const byAge = pointers.getTrackedPointsByAge();

  s = gestureLengths(byAge, s);

  // Pluck out first and second touch
  const [first, second] = byAge;
  s = gestureRotation(first, second, s);

  state.gesture = s;

  // Update visuals
  draw();
}

const draw = () => {
  const {centroidEl, startCentroidEl, thingSize, thingsEl} = settings;
  const {pointers, gesture} = state;
  const {centroid, rotation} = gesture;

  // Create or remove elements based on tracked points
  reconcileChildren(thingsEl, pointers.store, (trackedPoint, el) => {
    if (el === null) {
      el = document.createElement(`div`);
      el.innerText = trackedPoint.id;
    }
    positionEl(el, trackedPoint.lastPoint, thingSize);
    return el;
  });

  // Update centroid circle
  if (typeof centroid.pos === `undefined`) {
    positionEl(centroidEl, {x: -1000, y: -1000}, 100);
  } else {
    positionEl(centroidEl, centroid.pos, thingSize);
  }
  document.getElementById(`centroidTravel`).innerText = val(centroid.travel);

  if (typeof centroid.start === `undefined`) {
    positionEl(startCentroidEl, {x: -1000, y: -1000}, thingSize);
  } else {
    positionEl(startCentroidEl, centroid.start, thingSize);
  }

  document.getElementById(`rotation`).innerText = val(rotation.current);
  document.getElementById(`distance`).innerText = pc(gesture.averageDistance);

  document.getElementById(`distance`).innerText = pc(gesture.averageDistance);
}

const val = (v) => typeof v === `undefined` ? `` : Math.round(v);
const pc = (v) => typeof v === `undefined` ? `` : Math.round(v * 100) + '%';
/**
 * 
 * @param {PointerEvent} id 
 */
const stopTrackingPoint = (ev) => {
  state.pointers.delete(ev.pointerId);
  update();
};

const setup = () => {
  document.addEventListener(`pointerup`, ev => stopTrackingPoint(ev));
  document.addEventListener(`pointerleave`, ev => stopTrackingPoint(ev));
  document.addEventListener(`pointerdown`, ev => trackPoint(ev));
  document.addEventListener(`pointermove`, ev => trackPoint(ev));
  document.addEventListener(`contextmenu`, ev => ev.preventDefault());
}
setup();