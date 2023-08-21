
import { Grids, Points } from '../../ixfx/geometry.js';
import { Arrays, Maps } from '../../ixfx/collections.js';
import { fullSizeCanvas } from '../../ixfx/dom.js';

const settings = Object.freeze({
  rows: 15,
  cols: 15,
  colours: [ `bisque`, `cadetblue`,`cornflowerblue`, `coral` ],
  tooltipEl: /** @type HTMLElement */(document.getElementById(`tooltip`))
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

function useState() {
  const { tooltipEl } = settings;
  const { grid, highlightedCell, gridData } = state;

  const canvasEl = /** @type {HTMLCanvasElement} */(document.getElementById(`canvas`));
  const ctx = /** @type {HTMLCanvasElement} */(canvasEl).getContext(`2d`);
  if (ctx === null) return;

  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  for (const cell of Grids.cells(grid)) drawCell(cell, ctx);

  if (highlightedCell) {
    const cellData = gridData.get(keyForCell(highlightedCell));
    if (cellData) tooltipEl.innerText = `Karma: ${cellData.karma.toString()}`;
    else tooltipEl.innerText = `?`;
  }
}

/** 
 * Draws a cell
 * @param {Grids.Cell} cell 
 * @param {CanvasRenderingContext2D} ctx 
 */
function drawCell(cell, ctx) {
  const { grid, highlightedCell } = state;

  const isHiglighted = Grids.cellEquals(highlightedCell, cell);

  // Get data for cell
  const data = state.gridData.get(keyForCell(cell));
  if (!data) return; // No data for cell

  // Bounds for cell
  const rect = Grids.rectangleForCell(grid, cell);
  
  // Translate so 0,0 is the top-left of cell
  ctx.save();
  ctx.translate(rect.x, rect.y);

  // Fill with cell's colour
  ctx.fillStyle = data.colour;
  ctx.fillRect(0,0,rect.width,rect.height);

  if (isHiglighted) {
    ctx.lineWidth = 4;
    //ctx.strokeRect(4, 0, rect.width, rect.height);
    ctx.beginPath();
    ctx.moveTo(0,2);
    ctx.lineTo(rect.width, 2);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.fillStyle = `black`;
  ctx.fillText(data.karma.toString(), 15, 15);
  
  // Undo translate
  ctx.restore();
}

/**
 * Setup and run main loop 
 */
function setup()  {
  const { colours } = settings;
  const { grid } = state;

  // Keep our primary canvas full size
  fullSizeCanvas(`#canvas`, args => {
    // Set grid cell size to be proportional to size of viewport
    const minDimension = Math.min(args.bounds.width, args.bounds.height);
    const maxDimension = Math.max(args.bounds.width, args.bounds.height);
  
    // We'd use minDimension if it was important
    // to not lose cells off the viewport
    updateState({
      grid: {
        ...state.grid,
        size: maxDimension / Math.max(grid.rows, grid.cols)
      }
    });
    useState(); // repaint
  });

  window.addEventListener(`pointermove`, evt => {
    evt.preventDefault();
    const cell = Grids.cellAtPoint(state.grid, { x: evt.clientX, y: evt.clientY });
    updateState({
      highlightedCell: cell
    });
    useState();
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
  
  updateState({ gridData });
  useState();
}

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