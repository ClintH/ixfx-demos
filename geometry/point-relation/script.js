import { Points, radianToDegree } from '../../ixfx/geometry.js';


// Initial state with empty values
let state = Object.freeze({
  /** 
   * PointRelation instance that tracks relation between pointerdown
   * location and current location
   * @type {Points.PointRelation|undefined} */
  relationFromPointerDown: undefined,
  /** 
   * Last result from relationFromPointerDown
   * @type {Points.PointRelationResult|undefined}
   */
  results: undefined,
});

const useState = () => {
  const { results } = state;
  if (!results) return;

  const { angle, distanceFromLast, distanceFromStart, centroid, average, speed } = results;

  const angleDeg = radianToDegree(angle);
  
  // Data to dump
  const lines = [
    `Distance start: ${distanceFromStart.toPrecision(2)}`,
    `Distance last: ${distanceFromLast.toPrecision(2)}`,
    `Angle deg: ${Math.round(angleDeg)}`,
    `Average: ${Points.toString(average, 2)}`,
    `Centroid: ${Points.toString(centroid, 2)}`,
    `Speed: ${speed.toPrecision(2)}`]
  
  // Wrap in DIVs
  const linesWithDivs = lines.map(l => `<DIV>${l}</DIV>`);
  // Update labels
  setHtml(`info`, linesWithDivs.join(``));
};

const onPointerDown = event => {
  event.preventDefault();

  // Convert to relative coordinate
  const pointerRelative = relativePos(event);
 
  // Init new 'relation', and update state
  updateState({ relationFromPointerDown: Points.relation(pointerRelative) });

  // Position 'reference' element
  positionIdByRelative(`reference`, pointerRelative);

  document.body.classList.add(`moving`);
};

const onPointerMove = event => {
  const { relationFromPointerDown } = state;
  if (!relationFromPointerDown) return;
  event.preventDefault();

  const pointerRelative = relativePos(event);

  const results = relationFromPointerDown(pointerRelative);

  // Position 'reference' element
  positionIdByRelative(`thing`, pointerRelative);

  updateState({ results });
  useState();

  return false;
};

const onPointerUp = event => {
  // Hide element offscreen when there's a pointer up
  positionIdByRelative(`reference`, { x: -1, y: -1 });

  updateState({ relationFromPointerDown: undefined });
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
function setHtml(id, text)  {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  if (element.textContent === text) return;
  element.innerHTML = text;
}

/**
 * Positions an element by a relative coordinate
 * @param id {string} Id of element to position
 * @param pos {{x:number, y:number}} Relative coordinate
 */
function positionIdByRelative(id, pos) {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));  
  if (!element) return;
  pos = Points.multiply(pos, window.innerWidth, window.innerHeight);

  const b = element.getBoundingClientRect();
  const p = Points.subtract(pos, b.width / 2, b.height / 2);
  element.style.transform = `translate(${p.x}px, ${p.y}px)`;
}