/**
 * This demo draws a grid using Canvas.
 * It also shows
 *  - associating objects to cells by a string key
 *  - generating slightly variated modulators
 *  - dampening modulation value
 *  - calculating distance from a cell to pointer
 */
import {Grids, Points} from '../../ixfx/geometry.js'
import * as Modulation from '../../ixfx/modulation.js'
import * as Flow from '../../ixfx/flow.js'
import * as Dom from '../../ixfx/dom.js';
import {scalePercent} from '../../ixfx/util.js';

// Define settings
const settings = {
  colour: `hotpink`,
  piPi: Math.PI * 2,
  grid: {rows: 10, cols: 10},
  modulators: new Map()
};

// Initial state with empty values
let state = {
  cellSize: 10,
  modValues: new Map(),
  pointer: {x: -1, y: -1}
};

const keyForCell = (cell) => cell.x + `-` + cell.y;

// Update state of world
const update = () => {
  const {grid} = settings;
  const {pointer, cellSize} = state;
  const modValues = new Map();

  // Get larger of either row or col count
  const gridMax = Math.max(grid.cols, grid.rows);

  // Find cell position for pointer
  const pointerCell = Grids.cellAtPoint(pointer, {...grid, size: cellSize});

  // Update each cell
  for (const cell of Grids.cells(grid)) {
    updateCell(cell, pointerCell, gridMax, modValues);
  }

  // Update state with calculated modulations
  state = {
    ...state,
    modValues
  }
}

const updateCell = (cell, pointerCell, gridMax, modValues) => {
  const {modulators} = settings;

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
}

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
}
/**
 * Draw the grid's cells
 * @param {CanvasRenderingContext2D} ctx 
 */
const draw = (ctx) => {
  const {grid} = settings;
  const {cellSize, modValues} = state;

  let sizedGrid = {...grid, size: cellSize};
  ctx.strokeStyle = `white`;
  for (const cell of Grids.cells(grid)) {
    // Get bounds for cell, as well as current mod value
    const rect = Grids.rectangleForCell(cell, sizedGrid);
    const cellKey = keyForCell(cell);
    const modValue = modValues.get(cellKey);

    // ...pass on over to drawCell
    drawCell(modValue, rect, ctx);
  }
}

/** 
 * Draws a cell
 * @param {{x:number, y:number, width:number, height:number}} rect 
 * @param {CanvasRenderingContext2D} ctx 
 */
const drawCell = (modValue, rect, ctx) => {
  const {piPi, colour} = settings;

  let radius = rect.height / 2 * modValue;
  const c = {x: rect.x + rect.height / 2, y: rect.y + rect.height / 2};

  // Debug: Draw edges of cells
  //ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

  // Translate canvas so cell middle is 0,0
  ctx.save();
  ctx.translate(c.x, c.y);

  ctx.fillStyle = colour

  // Fill circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, piPi);
  ctx.fill();

  // Undo translate
  ctx.restore();
}

/**
 * Setup and run main loop 
 */
const setup = () => {
  const {grid} = settings;

  // Keep our primary canvas full size
  /** @type {HTMLCanvasElement} */
  const canvasEl = Dom.resolveEl(`#canvas`);
  const ctx = canvasEl.getContext(`2d`);
  Dom.fullSizeCanvas(canvasEl, args => {
    // Set grid cell size to be proportional to size of viewport
    const minDimension = Math.min(args.bounds.width, args.bounds.height);
    const maxDimension = Math.max(args.bounds.width, args.bounds.height);

    // We'd use minDimension if it was important to not lose cells off the viewport
    state = {
      ...state,
      cellSize: maxDimension / Math.max(grid.rows, grid.cols)
    }
  });

  // Pointer moving
  window.addEventListener(`pointermove`, evt => {
    evt.preventDefault();
    state = {
      ...state,
      pointer: {x: evt.clientX, y: evt.clientY}
    }
  });

  // Pointer left the building
  window.addEventListener(`pointerout`, evt => {
    state = {
      ...state,
      pointer: {x: -1, y: -1}
    };
  });

  const loop = () => {
    update();
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    draw(ctx);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();
