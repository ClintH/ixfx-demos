import { Points, radianToDegree, Triangles } from "../../../ixfx/geometry.js";
import { reconcileChildren, dataTableList } from '../../../ixfx/dom.js';
import { numberTracker, pointsTracker, pointTracker } from "../../../ixfx/data.js";

const settings = Object.freeze({
  currentPointsEl: document.getElementById(`current-points`),
  startPointsEl: document.getElementById(`start-points`),
  centroidEl: document.getElementById(`centroid`),
  startCentroidEl: document.getElementById(`startCentroid`),
  thingSize: 100
});

let state = Object.freeze({
  /** @type {PointsTracker} */
  pointers: pointsTracker({ trackIntermediatePoints: false }),
  twoFinger: {
    rotation: numberTracker(),
    distance: numberTracker()
  },
  threeFinger: {
    area: numberTracker()
  },
  centroid: pointTracker(),
  centroidAngle: 0
});

const gestureTwoFinger = (a, b) => {
  if (a === undefined) throw new Error(`point a undefined`);
  if (b === undefined) throw new Error(`point b undefined`);

  const { twoFinger } = state;

  // Absolute distance between points
  const distanceAbs = Points.distance(a, b); // clamp(Points.distance(a, b) / maxDimension)
  twoFinger.distance.seen(distanceAbs);

  // Calculate rotation
  const rotationAbs = radianToDegree(Points.angle(a, b));
  twoFinger.rotation.seen(rotationAbs / 180);
};

const gestureThreeFinger = (a, b, c) => {
  if (a === undefined) throw new Error(`point a undefined`);
  if (b === undefined) throw new Error(`point b undefined`);
  if (c === undefined) throw new Error(`point c undefined`);

  const tri = Triangles.fromPoints([ a, b, c ]);
  state.threeFinger.area.seen(Triangles.area(tri));
};

/**
 * 
 * @param {PointsTracker} pointers 
 */
const gestureCentroid = (pointers) => {
  if (pointers.size < 2) {
    state.centroid.reset();
    return;
  }

  const centroid = Points.centroid(...Array.from(pointers.last()));
  state.centroid.seen(centroid);
  state.centroidAngle = radianToDegree(Points.angle(centroid, state.centroid.initial));
};



const update = () => {
  const { pointers } = state;

  gestureCentroid(pointers);

  // Pointers sorted by age, oldest first
  const byAge = pointers.trackedByAge();

  if (byAge.length >= 2) {
    // Got at least two touches
    gestureTwoFinger(byAge[0].last, byAge[1].last);
  } else {
    // Reset state regarding two-finger gestures
    state.twoFinger.distance.reset();
    state.twoFinger.rotation.reset();
  }

  if (byAge.length >= 3) {
    // Got at least three touches
    gestureThreeFinger(byAge[0].last, byAge[1].last, byAge[2].last);
  } else {
    state.threeFinger.area.reset();
  }

  const displayMap = new Map();
  for (const v of byAge) {
    displayMap.set(v.id, {
      id: v.id,
      length: Math.round(v.length),
      angle: Math.round(radianToDegree(Points.angle(v.last, v.initial)))
    });
  }

  dataTableList(`#pointers`, displayMap);
  // Update visuals
  draw();
};

const draw = () => {
  const { centroidEl, startCentroidEl, thingSize, currentPointsEl, startPointsEl } = settings;
  const { pointers, gesture } = state;
  const { centroid, twoFinger, threeFinger } = state;

  // Create or remove elements based on tracked points
  reconcileChildren(currentPointsEl, pointers.store, (trackedPoint, el) => {
    if (el === null) {
      el = document.createElement(`div`);
      el.innerText = trackedPoint.id;
    }
    positionEl(el, trackedPoint, thingSize);
    return el;
  });


  reconcileChildren(startPointsEl, pointers.store, (trackedPoint, el) => {
    if (el === null) {
      el = document.createElement(`div`);
      el.innerText = trackedPoint.id;
    }
    positionEl(el, trackedPoint.initial, thingSize);
    return el;
  });

  // Update centroid circle
  document.getElementById(`centroidTravel`).innerText = val(centroid.distanceFromStart());
  if (centroid.initial === undefined) {
    positionEl(startCentroidEl, { x: -1000, y: -1000 }, thingSize);
  } else {
    positionEl(startCentroidEl, centroid.initial, thingSize);
  }
  if (centroid.last === undefined) {
    positionEl(centroidEl, { x: -1000, y: -1000 }, thingSize);
  } else {
    positionEl(centroidEl, centroid.last, thingSize);
  }

  document.getElementById(`threePtrArea`).innerText = pc(threeFinger.area.relativeDifference());
  document.getElementById(`twoPtrDistance`).innerText = pc(twoFinger.distance.relativeDifference());
  document.getElementById(`twoPtrRotation`).innerText = pc(twoFinger.rotation.difference());
  document.getElementById(`centroidAngle`).innerText = val(state.centroidAngle);

};

const val = (v) => typeof v === `undefined` ? `` : Math.round(v);
const pc = (v) => typeof v === `undefined` ? `` : Math.round(v * 100) + `%`;

/**
 * 
 * @param {PointerEvent} id 
 */
const stopTrackingPoint = (ev) => {
  state.pointers.delete(ev.pointerId);
  update();
};


/**
 * 
 * @param {PointerEvent} ev 
 */
const trackPoint = (ev) => {
  if (ev.pointerType === `mouse`) return;
  ev.preventDefault();
  const { pointers } = state;

  // Track point, associated with pointerId
  pointers.seen(ev.pointerId, { x: ev.x, y: ev.y });
  update();
};

/**
 * Position element
 * @param {HTMLElement} el 
 * @param {{x:number, y:number}} point 
 * @param {number} size 
 */
const positionEl = (el, point, size) => {
  el.style.left = (point.x - size / 2) + `px`;
  el.style.top = (point.y - size / 2) + `px`;
};

const setup = () => {
  document.addEventListener(`pointerup`, ev => stopTrackingPoint(ev));
  document.addEventListener(`pointerleave`, ev => stopTrackingPoint(ev));
  document.addEventListener(`pointerdown`, ev => trackPoint(ev));
  document.addEventListener(`pointermove`, ev => trackPoint(ev));
  document.addEventListener(`contextmenu`, ev => ev.preventDefault());
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