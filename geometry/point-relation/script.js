import { Points, radianToDegree } from '../../ixfx/geometry.js';

// Initial state with empty values
let state = Object.freeze({
  /** @type {Points.PointRelation|null} */
  tracker: null,
  /** @type {Points.PointRelationResult|null} */
  results: null,
  bounds: {
    width: 0,
    height: 0
  }
});

/**
 * @param el {HTMLElement|null}
 * @param pos {{x:number, y:number}}
 */
const relativePosition = (el, pos) => {
  const { bounds } = state;
  if (!el) return;
  pos = Points.multiply(pos, bounds.width, bounds.height);

  const b = el.getBoundingClientRect();
  const p = Points.subtract(pos, b.width / 2, b.height / 2);
  el.style.transform = `translate(${p.x}px, ${p.y}px)`;
};

const useState = () => {
  const { results } = state;
  if (!results) return;

  const { angle, distance, centroid, average } = results;

  const angleDeg = radianToDegree(angle);

  const thingEl = document.getElementById(`thing`);
  const distanceEl = document.getElementById(`lblDistance`);
  const angleDegEl = document.getElementById(`lblAngleDeg`);
  const averageEl = document.getElementById(`lblAverage`);
  const centroidEl = document.getElementById(`lblCentroid`);

  if (!thingEl) return;
  if (!distanceEl || !angleDegEl || !averageEl || !centroidEl) return;
  
  // Update labels
  distanceEl.innerText = distance.toPrecision(2);
  angleDegEl.innerText = Math.round(angleDeg).toString();
  averageEl.innerText = Points.toString(average, 2);
  centroidEl.innerText = Points.toString(centroid, 2);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const relativePos = (pos) => ({
    x: pos.x / state.bounds.width,
    y: pos.y / state.bounds.height
  });

  // Keep track of screen size whenever it resizes
  const onResize = () => {
    updateState({
      bounds: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };
  document.addEventListener(`resize`, onResize);
  onResize();

  // Start tracking from location of pointer down
  document.addEventListener(`pointerdown`, e => {
    const rel = relativePos(e);
   
    updateState({ tracker: Points.relation(rel) });

    // Position 'reference' element
    const referenceEl = document.getElementById(`reference`);
    relativePosition(referenceEl, rel);

    document.body.classList.add(`moving`);
  });

  // Use tracker
  document.addEventListener(`pointermove`, e => {
    const { tracker } = state;
    if (!tracker) return;

    const rel = relativePos(e);

    const results = tracker(rel);

    // Position 'reference' element
    const referenceEl = document.getElementById(`thing`);
    relativePosition(referenceEl, rel);

    updateState({ results });
    useState();
  });

  document.addEventListener(`pointerup`, e => {
    // Hide element offscreen when there's a pointer up
    const referenceEl = document.getElementById(`reference`);
    relativePosition(referenceEl, { x: -1, y: -1 });

    updateState({ tracker: null });
    document.body.classList.remove(`moving`);

  });
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