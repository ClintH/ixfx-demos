import { Points, radianToDegree } from '../../ixfx/geometry.js';

// Initial state with empty values
let state = Object.freeze({
  /** 
   * PointRelation instance that tracks relation between pointerdown
   * location and current location
   * @type {Points.PointRelation|null} */
  relationFromPointerDown: null,
  /** 
   * Last result from relationFromPointerDown
   * @type {Points.PointRelationResult|null}
   */
  results: null,
});

const useState = () => {
  const { results } = state;
  if (!results) return;

  const { angle, distanceFromLast, distanceFromStart, centroid, average, speed } = results;

  const angleDeg = radianToDegree(angle);
  
  // Update labels
  setText(`info`,
    `
  Distance start: ${distanceFromStart.toPrecision(2)}
  Distance last: ${distanceFromLast.toPrecision(2)}
  Angle deg: ${Math.round(angleDeg)}
  Average: ${Points.toString(average, 2)}
  Centroid: ${Points.toString(centroid, 2)}
  Speed: ${speed.toPrecision(2)}
  `
  );
};

const onPointerDown = e => {
  e.preventDefault();

  // Convert to relative coordinate
  const rel = relativePos(e);
 
  // Init new 'relation', and update state
  updateState({ relationFromPointerDown: Points.relation(rel) });

  // Position 'reference' element
  positionIdByRelative(`reference`, rel);

  document.body.classList.add(`moving`);
};

const onPointerMove = e => {
  const { relationFromPointerDown } = state;
  if (!relationFromPointerDown) return;
  e.preventDefault();

  const rel = relativePos(e);

  const results = relationFromPointerDown(rel);

  // Position 'reference' element
  positionIdByRelative(`thing`, rel);

  updateState({ results });
  useState();

  return false;
};

const onPointerUp = e => {
  // Hide element offscreen when there's a pointer up
  positionIdByRelative(`reference`, { x: -1, y: -1 });

  updateState({ relationFromPointerDown: null });
  document.body.classList.remove(`moving`);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  document.addEventListener(`pointerdown`, onPointerDown);
  document.addEventListener(`pointermove`, onPointerMove);
  document.addEventListener(`pointerup`, onPointerUp);
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

/**
 * Returns the relative position from an absolute one
 * @param {Points.Point} pos 
 * @returns {Points.Point}
 */
function relativePos(pos) {
  return {
    x: pos.x / window.innerWidth,
    y: pos.y / window.innerHeight
  };
}

/**
 * Sets the innerText of an element with `id`
 * @param {string} id
 * @param {string} text
 * @returns void
 */
function setText(id, text)  {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.innerText === text) return;
  el.innerText = text;
}

/**
 * Positions an element by a relative coordinate
 * @param id {string} Id of element to position
 * @param pos {{x:number, y:number}} Relative coordinate
 */
function positionIdByRelative(id, pos) {
  const el = document.getElementById(id);  
  if (!el) return;
  pos = Points.multiply(pos, window.innerWidth, window.innerHeight);

  const b = el.getBoundingClientRect();
  const p = Points.subtract(pos, b.width / 2, b.height / 2);
  el.style.transform = `translate(${p.x}px, ${p.y}px)`;
}