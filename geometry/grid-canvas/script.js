/**
 * This demo draws a grid using Canvas.
 * It also shows
 *  - associating objects to cells by a string key
 *  - generating slightly variated modulators
 *  - dampening modulation value
 *  - calculating distance from a cell to pointer
 */
import { Grids, Points } from '../../ixfx/geometry.js';
import * as Modulation from '../../ixfx/modulation.js';
import * as Flow from '../../ixfx/flow.js';
import * as Dom from '../../ixfx/dom.js';
import { scalePercent } from '../../ixfx/data.js';

const settings = Object.freeze({
  colour: `hotpink`,
  piPi: Math.PI * 2,
  grid: { rows: 10, cols: 10 },
  modulators: new Map()
});

let state = Object.freeze({
  /** @type {number} */
  cellSize: 10,
  modValues: new Map(),
  pointer: { x: -1, y: -1 }
});

const keyForCell = (cell) => cell.x + `-` + cell.y;

// Update state of world
const update = () => {
  const { grid } = settings;
  const { pointer, cellSize } = state;
  const modValues = new Map();

  // Get larger of either row or col count
  const gridMax = Math.max(grid.cols, grid.rows);

  // Find cell position for pointer
  const pointerCell = Grids.cellAtPoint( { ...grid, size: cellSize }, pointer);

  // Update each cell
  for (const cell of Grids.cells(grid)) {
    updateCell(cell, pointerCell, gridMax, modValues);
  }

  // Update state with calculated modulations
  updateState({
    modValues
  });
};

const useState = () => {
  const {  grid } = settings;
  const { cellSize, modValues } = state;

  const canvasEl = /** @type {HTMLCanvasElement|null} */(document.getElementById(`canvas`));

  const ctx = /** @type {HTMLCanvasElement} */(canvasEl).getContext(`2d`);
  if (ctx === null || ctx === undefined || canvasEl === null) return;

  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  
  let sizedGrid = { ...grid, size: cellSize };
  ctx.strokeStyle = `white`;
  for (const cell of Grids.cells(grid)) {
    // Get bounds for cell, as well as current mod value
    const rect = Grids.rectangleForCell(cell, sizedGrid);
    const cellKey = keyForCell(cell);
    const modValue = modValues.get(cellKey);

    // ...pass on over to drawCell
    drawCell(modValue, rect, ctx);
  }
};

const updateCell = (cell, pointerCell, gridMax, modValues) => {
  const { modulators } = settings;

  // Get the string key for this cell `x-y`
  const key = keyForCell(cell);

  // Calc distance from cell to cell where pointer is.
  // If pointer is outside grid, distance will be set to -1
  let dist = 0;
  if (pointerCell !== undefined) {
    // Compute a relative distance based on size of grid
    dist = 1 - Math.min(1, Points.distance(pointerCell, cell) / gridMax);
    // dist will be 1 when cursor is on this cell, 0 when its furtherest away
  }

  // If we don't yet have a modulator, create and add
  if (!modulators.has(key)) {
    // Assign oscillator to the key of this cell
    modulators.set(key, initCellModulator());
  }

  // Get oscillator and compute value
  const w = modulators.get(key);
  let v = w.next().value;

  // Dampen value from oscillator based on distance from cursor
  v = scalePercent(v, 0.1, dist);

  // Save value for use in drawing later
  modValues.set(key, v);
};

const initCellModulator = () => {
  // Create a frequency-based timer
  // Max rate will be 0.5 cycles/per sec
  const t = Flow.frequencyTimer(0.5);

  // Since all oscillators are created about the same time,
  // they will be in sync. Add some random modulation to each
  // timer to introduce variation. This will dampen the frequency.
  t.mod(Math.random());

  // Create an oscillator
  const w = Modulation.Oscillators.sine(t);
  return w;
};

/** 
 * Draws a cell
 * @param {{x:number, y:number, width:number, height:number}} rect 
 * @param {CanvasRenderingContext2D} ctx 
 */
const drawCell = (modValue, rect, ctx) => {
  const { piPi, colour } = settings;

  let radius = rect.height / 2 * modValue;
  const c = { x: rect.x + rect.height / 2, y: rect.y + rect.height / 2 };

  // Debug: Draw edges of cells
  //ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

  // Translate canvas so cell middle is 0,0
  ctx.save();
  ctx.translate(c.x, c.y);

  ctx.fillStyle = colour;

  // Fill circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, piPi);
  ctx.fill();

  // Undo translate
  ctx.restore();
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const { grid } = settings;

  // Keep our primary canvas full size
  Dom.fullSizeCanvas(`#canvas`, args => {
    // Set grid cell size to be proportional to size of viewport
    const minDimension = Math.min(args.bounds.width, args.bounds.height);
    const maxDimension = Math.max(args.bounds.width, args.bounds.height);

    // We'd use minDimension if it was important
    // to not lose cells off the viewport
    updateState({
      cellSize: maxDimension / Math.max(grid.rows, grid.cols)
    });
  });

  // Pointer down
  window.addEventListener(`pointerdown`, evt => {
    evt.preventDefault();
    updateState({
      pointer: { x: evt.clientX, y: evt.clientY }
    });
  });
  
  // Pointer moving
  window.addEventListener(`pointermove`, evt => {
    evt.preventDefault();
    updateState({
      pointer: { x: evt.clientX, y: evt.clientY }
    });
  });

  // Pointer left the building
  window.addEventListener(`pointerout`, evt => {
    updateState({
      pointer: { x: -1, y: -1 }
    });
  });

  const loop = () => {
    update();
    useState();
   
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
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