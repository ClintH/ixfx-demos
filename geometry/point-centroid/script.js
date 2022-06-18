/**
 * This demo shows the Points.centroid function
 */
import {Points} from '../../ixfx/geometry.js';

// @typedef {{x:number, y:number}} Point

// Define settings
const settings = {
  pointSize: 20,
  centroidEl: document.getElementById(`centroid`)
};

// Initial state with empty values
let state = {
  /** @type Point[] */
  points: []
};


const update = () => {
  state.centroid = Points.centroid(...state.points);
  draw();
}

const draw = () => {
  const {centroidEl, pointSize} = settings;
  const {centroid} = state;
  console.log(centroid);
  positionThing(centroidEl, centroid, pointSize);
}

const positionThing = (el, point, size) => {
  el.style.width = size + `px`;
  el.style.height = size + `px`;
  el.style.left = (point.x - size / 2) + `px`;
  el.style.top = (point.y - size / 2) + `px`;
}

/**
 * Adds a point
 * @param {Point} point 
 */
const addPoint = (point) => {
  const {pointSize} = settings;

  state.points.push(point);

  const el = document.createElement(`div`);
  el.classList.add('point');


  positionThing(el, point, pointSize);
  document.body.append(el);

  // Since we've added a new point, update
  update();
};


/**
 * Setup
 */
const setup = () => {
  document.addEventListener(`click`, evt => {
    addPoint({x: evt.x, y: evt.y});
  })
}
setup();
