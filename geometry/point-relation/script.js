import { Points, radianToDegree } from '../../ixfx/geometry.js';
import * as Util from './util.js';

/**
 * @typedef {{
 * relationFromPointerDown: Points.PointRelation|undefined
 * results: Points.PointRelationResult|undefined
 * }} State
 */

/** @type State */
let state = Object.freeze({
  // Track relation from pointerdown location
  relationFromPointerDown: undefined,
  // Last result from the tracker
  results: undefined,
});

const use = () => {
  const { results } = state;
  
  if (!results) return; // No results, nothing to do 🤷🏼‍♂️
  
  // TODO: Do something interesting with data from results
  const { centroid } = results;

  // ...but we don't do anything interesting with data, just display it
  displayData(results);
};

/**
 * Display PointRelationResult data
 * @param {Points.PointRelationResult|undefined} result 
 */
const displayData = (result) => {
  if (result === undefined) return;
  const { angle, distanceFromLast, distanceFromStart, centroid, average, speed } = result;

  // Get angle in a more typical degrees
  const angleDeg = radianToDegree(angle);
  
  // Data to dump
  const lines = [
    `Distance start: ${distanceFromStart.toPrecision(2)}`,
    `Distance last: ${distanceFromLast.toPrecision(2)}`,
    `Angle deg: ${Math.round(angleDeg)}`,
    `Average: ${Points.toString(average, 2)}`,
    `Centroid: ${Points.toString(centroid, 2)}`,
    `Speed: ${speed.toPrecision(2)}`];
  
  // Wrap in DIVs
  const linesWithDivs = lines.map(line => `<div>${line}</div>`);

  // Update page
  Util.setHtml(`info`, linesWithDivs.join(``));
};

const onPointerDown = event => {
  event.preventDefault();

  // Convert to relative coordinate
  const pointerRelative = Util.relativePos(event);
 
  // Init new 'relation', and update state
  saveState({ relationFromPointerDown: Points.relation(pointerRelative) });

  // Position 'reference' element to pointer location
  Util.positionIdByRelative(`reference`, pointerRelative);

  document.body.classList.add(`moving`);
};

const onPointerMove = event => {
  const { relationFromPointerDown } = state;
  if (!relationFromPointerDown) return;
  event.preventDefault();

  const pointerRelative = Util.relativePos(event);

  const results = relationFromPointerDown(pointerRelative);

  // Position 'reference' element
  Util.positionIdByRelative(`thing`, pointerRelative);

  saveState({ results });
  use();

  return false;
};

const onPointerUp = event => {
  // Hide element offscreen when there's a pointer up
  Util.positionIdByRelative(`reference`, { x: -1, y: -1 });

  saveState({ relationFromPointerDown: undefined });
  document.body.classList.remove(`moving`);
};

function setup() {
  document.addEventListener(`pointerdown`, onPointerDown);
  document.addEventListener(`pointermove`, onPointerMove);
  document.addEventListener(`pointerup`, onPointerUp);
};
setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
