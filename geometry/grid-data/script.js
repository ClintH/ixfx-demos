
import { Grids } from '../../ixfx/geometry.js';
import { Maps } from '../../ixfx/collections.js';
import { CanvasHelper } from '../../ixfx/dom.js';
import { Arrays } from '../../ixfx/data.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
  rows: 15,
  cols: 15,
  colours: [`bisque`, `cadetblue`, `cornflowerblue`, `coral`],
  tooltipEl: /** @type HTMLElement */(document.querySelector(`#tooltip`))
});

/**
 * @typedef {{
 *  karma: number
 *  colour: string
 * }} GridData
 */
/**
 * @typedef {{
 * grid: Grids.GridVisual
 * gridData: Maps.IMapImmutable<String,GridData>
 * highlightedCell: Grids.Cell|undefined
 * }} State
 */

/** @type {State} */
let state = Object.freeze({
  grid: { rows: settings.rows, cols: settings.cols, size: 15 },
  gridData: Maps.immutable(),
  highlightedCell: { x: 0, y: 0 }
});

const keyForCell = (cell) => cell.x + `-` + cell.y;

function use() {
  const { tooltipEl, canvas } = settings;
  const { grid, highlightedCell, gridData } = state;

  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const cell of Grids.cells(grid)) drawCell(cell, canvas.ctx);

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
  context.fillRect(0, 0, rect.width, rect.height);

  if (isHiglighted) {
    context.lineWidth = 4;
    //ctx.strokeRect(4, 0, rect.width, rect.height);
    context.beginPath();
    context.moveTo(0, 2);
    context.lineTo(rect.width, 2);
    context.closePath();
    context.stroke();
  }

  context.fillStyle = `black`;
  context.fillText(data.karma.toString(), 15, 15);

  // Undo translate
  context.restore();
}

function onCanvasResize() {
  const { grid } = state;
  const { size } = settings.canvas;
  // Set grid cell size to be proportional to size of viewport
  const minDimension = Math.min(size.width, size.height);
  const maxDimension = Math.max(size.width, size.height);

  // We'd use minDimension if it was important
  // to not lose cells off the viewport
  saveState({
    grid: {
      ...state.grid,
      size: Math.ceil(maxDimension / Math.max(grid.rows, grid.cols))
    }
  });
  use(); // repaint
}

function setup() {
  const { canvas, colours } = settings;
  const { grid } = state;

  canvas.addEventListener(`resize`, event => {
    onCanvasResize();
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
  onCanvasResize();
}

setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}