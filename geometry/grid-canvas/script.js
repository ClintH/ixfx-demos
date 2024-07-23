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
import { CanvasHelper } from '../../ixfx/dom.js';
import { scalePercent } from '../../ixfx/numbers.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` }),
  colour: `hotpink`,
  piPi: Math.PI * 2,
  rows: 10,
  cols: 10,
  modulators: new Map()
});

let state = Object.freeze({
  /** @type {Grids.GridVisual} */
  grid: { rows: settings.rows, cols: settings.cols, size: 10 },
  modValues: new Map(),
  pointer: { x: -1, y: -1 }
});

const keyForCell = (cell) => cell.x + `-` + cell.y;

// Update state of world
const update = () => {
  const { pointer, grid } = state;
  const moduleValues = new Map();

  // Get larger of either row or col count
  const gridMax = Math.max(grid.cols, grid.rows);

  // Find cell position for pointer
  //console.log(grid);
  const pointerCell = Grids.cellAtPoint(grid, pointer);

  // Update each cell
  for (const cell of Grids.cells(grid)) {
    updateCell(cell, pointerCell, gridMax, moduleValues);
  }

  // Update state with calculated modulations
  saveState({
    modValues: moduleValues
  });
};

const use = () => {
  const { canvas } = settings;
  const { grid, modValues } = state;
  const { ctx } = canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = `white`;
  for (const cell of Grids.cells(grid)) {
    // Get bounds for cell, as well as current mod value
    const rect = Grids.rectangleForCell(grid, cell);
    const cellKey = keyForCell(cell);
    const moduleValue = modValues.get(cellKey);

    // ...pass on over to drawCell
    drawCell(moduleValue, rect, ctx);
  }
};

const updateCell = (cell, pointerCell, gridMax, moduleValues) => {
  const { modulators } = settings;

  // Get the string key for this cell `x-y`
  const key = keyForCell(cell);

  // Calc distance from cell to cell where pointer is.
  // If pointer is outside grid, distance will be set to -1
  let distribution = 0;
  if (pointerCell !== undefined) {
    // Compute a relative distance based on size of grid
    distribution = 1 - Math.min(1, Points.distance(pointerCell, cell) / gridMax);
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
  v = scalePercent(v, 0.1, distribution);

  // Save value for use in drawing later
  moduleValues.set(key, v);
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
 * @param {CanvasRenderingContext2D} context
 */
const drawCell = (moduleValue, rect, context) => {
  const { piPi, colour } = settings;

  let radius = rect.height / 2 * moduleValue;
  const c = { x: rect.x + rect.height / 2, y: rect.y + rect.height / 2 };

  // Debug: Draw edges of cells
  //ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

  // Translate canvas so cell middle is 0,0
  context.save();
  context.translate(c.x, c.y);

  context.fillStyle = colour;

  // Fill circle
  context.beginPath();
  context.arc(0, 0, radius, 0, piPi);
  context.fill();

  // Undo translate
  context.restore();
};

function onCanvasResize() {
  const { width, height } = settings.canvas;
  // Set grid cell size to be proportional to size of viewport
  const minDimension = Math.min(width, height);
  const maxDimension = Math.max(width, height);

  // We'd use minDimension if it was important
  // to not lose cells off the viewport
  saveState({
    grid: {
      rows: settings.rows,
      cols: settings.cols,
      size: Math.ceil(maxDimension / Math.max(settings.rows, settings.cols))
    }
  });

}

function setup() {
  settings.canvas.addEventListener(`resize`, () => onCanvasResize());
  // Pointer down
  window.addEventListener(`pointerdown`, event => {
    event.preventDefault();
    saveState({
      pointer: { x: event.clientX, y: event.clientY }
    });
  });

  // Pointer moving
  window.addEventListener(`pointermove`, event => {
    event.preventDefault();
    saveState({
      pointer: { x: event.clientX, y: event.clientY }
    });
  });

  // Pointer left the building
  window.addEventListener(`pointerout`, event => {
    saveState({
      pointer: { x: -1, y: -1 }
    });
  });

  onCanvasResize();

  const loop = () => {
    update();
    use();

    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
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