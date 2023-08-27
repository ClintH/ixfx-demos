import { Lines, Points } from '../../ixfx/geometry.js';
import { Svg } from '../../ixfx/visual.js';

// Define settings
const settings = Object.freeze({
  pointSize: 20,
  lineStyle: {
    strokeStyle: `black`,
    strokeWidth: 3
  }
});

// Initial state with empty values
let state = Object.freeze({
  /** @type Points.Point[] */
  points: [],
  /** @type readonly Points.Point[] */
  convexHull: [],
  /** @type Points.Point */
  centroid: { x: 0, y: 0 }
});

const update = () => {
  saveState({
    centroid: Points.centroid(...state.points),
    convexHull: Points.convexHull(...state.points)
  });
  use();
};

const use = () => {
  const {  pointSize, lineStyle } = settings;
  const { centroid, convexHull } = state;

  const centroidElement = /** @type {HTMLElement} */ (document.querySelector(`#centroid`));
  const svgElement = /** @type {SVGSVGElement|null} */(document.querySelector(`#svg`));
  
  // Position centroid
  if (centroidElement) positionThing(centroidElement, centroid, pointSize);

  // Create lines that form hull
  if (!svgElement) return;
  const lines = Lines.joinPointsToLines(...convexHull, convexHull[0]); // Add first point to close path
  Svg.clear(svgElement);
  for (const [index, l] of lines.entries()) {
    Svg.Elements.line(l, svgElement, lineStyle, `#line-${index}`);
  }
};

/**
 * Positions an element
 * @param {HTMLElement} element Element to position 
 * @param {Points.Point} point Centre 
 * @param {number} size Diameter of element 
 */
const positionThing = (element, point, size) => {
  element.style.width = size + `px`;
  element.style.height = size + `px`;
  element.style.left = (point.x - size / 2) + `px`;
  element.style.top = (point.y - size / 2) + `px`;
  element.title = Points.toString(point);
};

/**
 * Adds a point
 * @param {Points.Point} point 
 */
const addPoint = (point) => {
  const { pointSize } = settings;

  // Add to list of points
  saveState({
    points: [ ...state.points, point ]
  });
  
  // Create element for point
  const element = document.createElement(`div`);
  element.classList.add(`point`);

  // Position it
  positionThing(element, point, pointSize);
  document.body.append(element);

  // Update calculations
  update();
};

function setup() {
  // Add a point when clicking the document
  document.addEventListener(`click`, event => {
    addPoint({ x: event.x, y: event.y });
  });
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}