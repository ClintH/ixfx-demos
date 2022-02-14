import {Grids} from '../../ixfx/geometry.js'
import * as Modulation from '../../ixfx/modulation.js'
import * as Flow from '../../ixfx/flow.js'
import * as Dom from '../../ixfx/dom.js';

// Define settings
const settings = {
  outerColour: `black`,
  innerColour: `hotpink`,
  piPi: Math.PI * 2,
  grid: {rows: 10, cols: 10},
  modulators: new Map()
};

// Initial state with empty values
let state = {
  cellSize: 10,
  modValues: new Map()
};

const keyForCell = (cell) => cell.x + `-` + cell.y;

// Update state of world
const update = () => {
  const {grid, modulators} = settings;
  const modValues = new Map();

  for (const cell of Grids.cells(grid)) {
    // Get the string key for this cell `x-y`
    const key = keyForCell(cell);

    // If we don't yet have a modulator, create and add
    if (!modulators.has(key)) {
      // Create a frequency-based timer
      // Max rate will be 0.5 cycles/per sec
      const t = Flow.frequencyTimer(0.5);

      // Since all oscillators are created about the same time,
      // they will be in sync. Add some random modulation to each
      // timer to introduce variation. This will dampen the frequency.
      t.mod(Math.random());

      // Create an oscillator
      const w = Modulation.Oscillators.sine(t)

      // Assign oscillator to the key of this cell
      modulators.set(key, w);
    }

    // Get oscillator and compute value
    const w = modulators.get(key);
    const v = w.next().value;
    modValues.set(key, v);
  }

  state = {
    ...state,
    modValues
  }
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
  const {piPi} = settings;

  let radius = rect.height / 2 * modValue;

  const c = {x: rect.x + rect.height / 2, y: rect.y + rect.height / 2};

  // Debug: Draw edges of cells
  //ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

  ctx.save();
  ctx.translate(c.x, c.y);

  // Create a gradient 'brush' based on size of circle
  ctx.fillStyle = getGradient(ctx, 0, rect);

  // Fill circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, piPi);
  ctx.fill();

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

  const loop = () => {
    update();
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    draw(ctx);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
setup();

/**
 * Returns a gradient fill
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{width:number, height:number}} bounds 
 */
const getGradient = (ctx, innerRadius, bounds) => {
  const {outerColour, innerColour} = settings;

  // Make a gradient
  //  See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  const g = ctx.createRadialGradient(
    0,
    0,
    innerRadius,
    0,
    0,
    bounds.width);
  g.addColorStop(0, innerColour);    // Inner circle
  g.addColorStop(1, outerColour);  // Outer circle

  return g;
}