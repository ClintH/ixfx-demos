/**
 * This demo shows the Points' centroid and convexHull functions.
 * 
 * Calculates happen in `update()`.
 */
import {Lines, Points} from '../../ixfx/geometry.js';
import {Svg} from '../../ixfx/visual.js';

// Define settings
const settings = {
  pointSize: 20,
  centroidEl: document.getElementById(`centroid`),
  svgEl: document.getElementById(`svg`),
  lineStyle: {
    strokeStyle: `black`,
    strokeWidth: 3
  }
};

// Initial state with empty values
let state = {
  /** @type Points.Point[] */
  points: [],
  /** @type Points.Point[] */
  convexHull: [],
  /** @type Points.Point */
  centroid: {x: 0, y: 0}
};

const update = () => {
  state.centroid = Points.centroid(...state.points);
  state.convexHull = Points.convexHull(...state.points);
  draw();
}

/**
 * Updates visuals
 */
const draw = () => {
  const {centroidEl, pointSize, svgEl, lineStyle} = settings;
  const {centroid, convexHull} = state;

  // Position centroid
  positionThing(centroidEl, centroid, pointSize);

  // Create lines that form hull
  const lines = Lines.joinPointsToLines(...convexHull, convexHull[0]); // Add first point to close path
  Svg.clear(svgEl);
  lines.forEach((l, index) => {
    Svg.Elements.line(l, svgEl, lineStyle, `#line-${index}`);
  });
}

/**
 * Positions an element
 * @param {HTMLElement} el Element to position 
 * @param {Points.Point} point Centre 
 * @param {number} size Diameter of element 
 */
const positionThing = (el, point, size) => {
  el.style.width = size + `px`;
  el.style.height = size + `px`;
  el.style.left = (point.x - size / 2) + `px`;
  el.style.top = (point.y - size / 2) + `px`;
  el.title = Points.toString(point);
}

/**
 * Adds a point
 * @param {Points.Point} point 
 */
const addPoint = (point) => {
  const {pointSize} = settings;

  // Add to list of points
  state.points.push(point);

  // Create element for point
  const el = document.createElement(`div`);
  el.classList.add('point');

  // Position it
  positionThing(el, point, pointSize);
  document.body.append(el);

  // Update calculations
  update();
};


/**
 * Setup
 */
const setup = () => {
  // Add a point when clicking the document
  document.addEventListener(`click`, evt => {
    addPoint({x: evt.x, y: evt.y});
  })
}
setup();
