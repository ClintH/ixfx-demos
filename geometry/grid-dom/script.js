/**
 * Demonstrates creates DOM elements by row for each grid cell.
 * 
 * This makes it easy to use CSS styling and DOM elements for further interaction.
 */

import { Grids } from '../../ixfx/geometry.js';

// Define settings
const settings = Object.freeze({
  grid: { rows: 10, cols: 10, size: 10 }
});

// Initialise state
let state = Object.freeze({
  lastClicked: { x: 0, y: 0 }
});

/**
 * Returns a cell based on an HTML element that has data-x and data-y attributes set.
 * 
 * Returns -1 for x/y if attribute is not found.
 * @param {HTMLElement} element
 * @returns 
 */
const getCellFromElement = (element) => ({
  x: Number.parseInt(element.getAttribute(`data-x`) ?? `-1`),
  y: Number.parseInt(element.getAttribute(`data-y`) ?? `-1`)
});

const onCellClick = (event) => {
  const cell = getCellFromElement(event.target);
  saveState({
    lastClicked: cell
  });
  use();
};

const use = () => {
  const { lastClicked } = state;
  const feedbackElement = document.querySelector(`#feedback`);
  if (feedbackElement) feedbackElement.innerHTML = `Clicked grid cell: ${lastClicked.x}, ${lastClicked.y}`;
};

function setup() {
  const { grid } = settings;

  const gridElement = document.querySelector(`#grid`);

  if (gridElement === null) return;

  for (const row of Grids.rows(grid)) {
    // Make HTML for each cell. This produces an array of strings
    //   Note we encode the coordinate of the cell in the attributes
    const cellsHtml = row.map(cell => `<div data-x="${cell.x}" data-y="${cell.y}" class="cell"></div>`);

    // Make HTML for a row. Join together array of strings
    const rowHtml = `<div class="row"> ${cellsHtml.join(` `)}</div>`;

    // Add it to the parent element
    gridElement.insertAdjacentHTML(`beforeend`, rowHtml);
  }

  gridElement.addEventListener(`click`, onCellClick);
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