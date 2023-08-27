
import { Grids, Points } from '../../ixfx/geometry.js';
import { Arrays, Maps } from '../../ixfx/collections.js';
import { fullSizeCanvas } from '../../ixfx/dom.js';

const settings = Object.freeze({
  rows: 15,
  cols: 15,
  colours: [ `bisque`, `cadetblue`,`cornflowerblue`, `coral` ],
  tooltipEl: /** @type HTMLElement */(document.querySelector(`#tooltip`))
});

/**
 * Data we will keep for each cell:
 * @typedef {object} GridData
 * @prop {number} karma
 * @prop {string} colour
 */

let state = Object.freeze({
  /** @type {Grids.GridVisual} */
  grid: { rows: settings.rows, cols: settings.cols, size: 15 },
  gridData: /** @type {Maps.IMapImmutable<String,GridData>} */(Maps.immutable()),
  /** @type {Grids.Cell|undefined} */
  highlightedCell: { x:0,y:0 }
});

const keyForCell = (cell) => cell.x + `-` + cell.y;

function use() {
  const { tooltipEl } = settings;
  const { grid, highlightedCell, gridData } = state;

  const canvasElement = /** @type {HTMLCanvasElement} */(document.querySelector(`#canvas`));
  const context = /** @type {HTMLCanvasElement} */(canvasElement).getContext(`2d`);
  if (context === null) return;

  context.clearRect(0, 0, canvasElement.width, canvasElement.height);

  for (const cell of Grids.cells(grid)) drawCell(cell, context);

  if (highlightedCell) {
    const cellData = gridData.get(keyForCell(highlightedCell));
    tooltipEl.textContent = cellData ? `Karma: ${cellData.karma.toString()}` : `?`;
  }
}

/** 
 * Draws a cell
 * @param {Grids.Cell} cell 
 * @param {CanvasRenderingContext2D} context 
 */
function drawCell(cell, context) {
  const { grid, highlightedCell } = state;

  const isHiglighted = Grids.cellEquals(highlightedCell, cell);

  // Get data for cell
  const data = state.gridData.get(keyForCell(cell));
  if (!data) return; // No data for cell

  // Bounds for cell
  const rect = Grids.rectangleForCell(grid, cell);
  
  // Translate so 0,0 is the top-left of cell
  context.save();
  context.translate(rect.x, rect.y);

  // Fill with cell's colour
  context.fillStyle = data.colour;
  context.fillRect(0,0,rect.width,rect.height);

  if (isHiglighted) {
    context.lineWidth = 4;
    //ctx.strokeRect(4, 0, rect.width, rect.height);
    context.beginPath();
    context.moveTo(0,2);
    context.lineTo(rect.width, 2);
    context.closePath();
    context.stroke();
  }

  context.fillStyle = `black`;
  context.fillText(data.karma.toString(), 15, 15);
  
  // Undo translate
  context.restore();
}

function setup() {
  const { colours } = settings;
  const { grid } = state;

  // Keep our primary canvas full size
  fullSizeCanvas(`#canvas`, arguments_ => {
    // Set grid cell size to be proportional to size of viewport
    const minDimension = Math.min(arguments_.bounds.width, arguments_.bounds.height);
    const maxDimension = Math.max(arguments_.bounds.width, arguments_.bounds.height);
  
    // We'd use minDimension if it was important
    // to not lose cells off the viewport
    saveState({
      grid: {
        ...state.grid,
        size: Math.ceil(maxDimension / Math.max(grid.rows, grid.cols))
      }
    });
    use(); // repaint
  });

  window.addEventListener(`pointermove`, event => {
    event.preventDefault();
    const cell = Grids.cellAtPoint(state.grid, { x: event.clientX, y: event.clientY });
    saveState({
      highlightedCell: cell
    });
    use();
  });
    
  let gridData = Maps.immutable();
  for (const cell of Grids.cells(grid)) {
    // Compute random data
    const data = {
      karma: Math.random().toFixed(2),
      colour: Arrays.randomElement(colours)
    };
    gridData = gridData.set(keyForCell(cell), data);
  }
  
  saveState({ gridData });
  use();
}

setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}