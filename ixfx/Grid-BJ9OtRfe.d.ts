import { P as Point } from './PointType-DYug3Yo5.js';
import { I as ISetMutable } from './ISetMutable-hVNWApH3.js';
import { a as RectPositioned } from './RectTypes-Brg8Cmy-.js';

type GridVisual = Grid & {
    readonly size: number;
};
type Grid = {
    readonly rows: number;
    readonly cols: number;
};
type Cell = {
    readonly x: number;
    readonly y: number;
};
type Neighbours = {
    readonly n: Cell | undefined;
    readonly e: Cell | undefined;
    readonly s: Cell | undefined;
    readonly w: Cell | undefined;
    readonly ne: Cell | undefined;
    readonly nw: Cell | undefined;
    readonly se: Cell | undefined;
    readonly sw: Cell | undefined;
};
type CardinalDirection = `n` | `ne` | `e` | `se` | `s` | `sw` | `w` | `nw`;
type CardinalDirectionOptional = CardinalDirection | ``;
type BoundsLogic = `unbounded` | `undefined` | `stop` | `wrap`;
type VisitorLogic = {
    readonly options?: IdentifyNeighbours;
    readonly select: NeighbourSelector;
};
type VisitGenerator = Generator<Readonly<Cell>, void>;
type VisitorOpts = {
    readonly visited?: ISetMutable<Cell>;
    readonly reversed?: boolean;
    readonly debug?: boolean;
    readonly boundsWrap?: BoundsLogic;
};
/**
 * Visitor function.
 *
 * Implementations:
 * * {@link cells}: left-to-right, top-to-bottom. Same as {@link visitorRow}
 * * {@link visitorBreadth}, {@link visitorDepth}
 * * {@link visitorColumn}: top-to-bottom, left-to-right.
 * * {@link visitorRandom}: Any unvisited location
 * * {@link visitorRandomContiguous}: A random direct neighbour of current cell
 */
type Visitor = (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
type NeighbourMaybe = readonly [keyof Neighbours, Cell | undefined];
type Neighbour = readonly [keyof Neighbours, Cell];
/**
 * A function that returns a value (or _undefined_) based on a _cell_
 *
 * Implementations:
 * * {@link access1dArray}: For accessing a single-dimension array as a grid
 */
type CellAccessor<V> = (cell: Cell, wrap: BoundsLogic) => V | undefined;
/**
 * Neighbour selector logic. For a given set of `neighbours` pick one to visit next.
 */
type NeighbourSelector = (neighbours: ReadonlyArray<Neighbour>) => Neighbour | undefined;
/**
 * Identify neighbours logic. For a given `grid` and `origin`, return a list of neighbours
 */
type IdentifyNeighbours = (grid: Grid, origin: Cell) => ReadonlyArray<Neighbour>;
/**
 * Returns _true_ if grids `a` and `b` are equal in value.
 * Returns _false_ if either parameter is undefined.
 *
 * @param a
 * @param b
 * @return
 */
declare const isEqual: (a: Grid | GridVisual, b: Grid | GridVisual) => boolean;
/**
 * Returns a key string for a cell instance
 * A key string allows comparison of instances by value rather than reference
 *
 * ```js
 * cellKeyString({x:10,y:20});
 * // Yields: "Cell{10,20}";
 * ```
 * @param v
 * @returns
 */
declare const cellKeyString: (v: Cell) => string;
/**
 * Returns _true_ if two cells equal.
 * Returns _false_ if either cell are undefined
 *
 * @param a
 * @param b
 * @returns
 */
declare const cellEquals: (a: Cell | undefined, b: Cell | undefined) => boolean;
/**
 * Throws an exception if any of the cell's parameters are invalid
 * @private
 * @param cell
 * @param parameterName
 * @param grid
 */
declare const guardCell: (cell: Cell, parameterName?: string, grid?: Grid) => void;
/**
 * Returns _true_ if cell coordinates are above zero and within bounds of grid
 *
 * @param grid
 * @param cell
 * @return
 */
declare const inside: (grid: Grid, cell: Cell) => boolean;
/**
 * Returns a visual rectangle of the cell, positioned from the top-left corner
 *
 * ```js
 * const cell = { x: 1, y: 0 };
 *
 * // 5x5 grid, each cell 5px in size
 * const grid = { rows: 5, cols: 5, size: 5 }
 *
 * const r = rectangleForCell(grid, cell,);
 *
 * // Yields: { x: 5, y: 0, width: 5, height: 5 }
 * ```
 * @param cell
 * @param grid
 * @return
 */
declare const rectangleForCell: (grid: GridVisual, cell: Cell) => RectPositioned;
/**
 * Generator that returns rectangles for each cell in a grid
 *
 * @example Draw rectangles
 * ```js
 * import { Drawing } from 'visuals.js'
 * const rects = [...Grids.asRectangles(grid)];
 * Drawing.rect(ctx, rects, { strokeStyle: `silver`});
 * ```
 * @param grid
 */
declare function asRectangles(grid: GridVisual): IterableIterator<RectPositioned>;
/**
 * Returns a two-dimensional array according to `grid`
 * size.
 *
 * ```js
 * const a = Grids.toArray({ rows: 3, cols: 2 });
 * Yields:
 * [ [_,_] ]
 * [ [_,_] ]
 * [ [_,_] ]
 * ```
 *
 * `initialValue` can be provided to set the value
 * for all cells.
 * @param grid Grid
 * @param initialValue Initial value
 * @returns
 */
declare const toArray: <V>(grid: Grid, initialValue?: V) => Array<Array<V>>;
/**
 * Returns the cell at a specified visual coordinate
 * or _undefined_ if the position is outside of the grid.
 *
 * `position` must be in same coordinate/scale as the grid.
 *
 * @param position Position, eg in pixels
 * @param grid Grid
 * @return Cell at position or undefined if outside of the grid
 */
declare const cellAtPoint: (grid: GridVisual, position: Point) => Cell | undefined;
/**
 * Returns a list of all cardinal directions: n, ne, nw, e, s, se, sw, w
 */
declare const allDirections: ReadonlyArray<CardinalDirection>;
/**
 * Returns a list of + shaped directions: n, e, s, w
 */
declare const crossDirections: ReadonlyArray<CardinalDirection>;
/**
 * Returns neighbours for a cell. If no `directions` are provided, it defaults to {@link allDirections}.
 *
 * ```js
 * const grid = { rows: 5, cols: 5 };
 * const cell = { x:2, y:2 };
 *
 * // Get n,ne,nw,e,s,se,sw and w neighbours
 * const n = Grids.neighbours(grid, cell, `wrap`);
 *
 * Yields:
 * {
 *  n: {x: 2, y: 1}
 *  s: {x: 2, y: 3}
 *  ....
 * }
 * ```
 *
 * Returns neighbours without diagonals (ie n, e, s, w):
 * ```js
 * const n = Grids.neighbours(grid, cell, `stop`, Grids.crossDirections);
 * ```
 * @returns Returns a map of cells, keyed by cardinal direction
 * @param grid Grid
 * @param cell Cell
 * @param bounds How to handle edges of grid
 * @param directions Directions to return
 */
declare const neighbours: (grid: Grid, cell: Cell, bounds?: BoundsLogic, directions?: ReadonlyArray<CardinalDirection>) => Neighbours;
declare function visitNeigbours(grid: Grid, cell: Cell, bounds?: BoundsLogic, directions?: ReadonlyArray<CardinalDirection>): Generator<Cell, void, unknown>;
/**
 * Returns the visual midpoint of a cell (eg. pixel coordinate)
 *
 * @param cell
 * @param grid
 * @return
 */
declare const cellMiddle: (grid: GridVisual, cell: Cell) => Point;
/**
 * Returns the cells on the line of `start` and `end`, inclusive
 *
 * ```js
 * // Get cells that connect 0,0 and 10,10
 * const cells = Grids.getLine({x:0,y:0}, {x:10,y:10});
 * ```
 *
 * This function does not handle wrapped coordinates.
 * @param start Starting cell
 * @param end End cell
 * @returns
 */
declare const getLine: (start: Cell, end: Cell) => ReadonlyArray<Cell>;
/**
 * Returns cells that correspond to the cardinal directions at a specified distance
 * i.e. it projects a line from `start` cell in all cardinal directions and returns the cells at `steps` distance.
 * @param grid Grid
 * @param steps Distance
 * @param start Start poiint
 * @param bounds Logic for if bounds of grid are exceeded
 * @returns Cells corresponding to cardinals
 */
declare const offsetCardinals: (grid: Grid, start: Cell, steps: number, bounds?: BoundsLogic) => Neighbours;
/**
 * Returns an `{ x, y }` signed vector corresponding to the provided cardinal direction.
 * ```js
 * const n = getVectorFromCardinal(`n`); // {x: 0, y: -1}
 * ```
 *
 * Optional `multiplier` can be applied to vector
 * ```js
 * const n = getVectorFromCardinal(`n`, 10); // {x: 0, y: -10}
 * ```
 *
 * Blank direction returns `{ x: 0, y: 0 }`
 * @param cardinal Direction
 * @param multiplier Multipler
 * @returns Signed vector in the form of `{ x, y }`
 */
declare const getVectorFromCardinal: (cardinal: CardinalDirectionOptional, multiplier?: number) => Cell;
/**
 * Returns a list of cells from `start` to `end`.
 *
 * Throws an error if start and end are not on same row or column.
 *
 * @param start Start cell
 * @param end end clel
 * @param endInclusive
 * @return Array of cells
 */
declare const simpleLine: (start: Cell, end: Cell, endInclusive?: boolean) => ReadonlyArray<Cell>;
/**
 *
 * Returns a coordinate offset from `start` by `vector` amount.
 *
 * Different behaviour can be specified for how to handle when coordinates exceed the bounds of the grid
 *
 *
 * Note: x and y wrapping are calculated independently. A large wrapping of x, for example won't shift up/down a line
 * @param grid Grid to traverse
 * @param vector Offset in x/y
 * @param start Start point
 * @param bounds
 * @returns Cell
 */
declare const offset: (grid: Grid, start: Cell, vector: Cell, bounds?: BoundsLogic) => Cell | undefined;
/**
 * Visits every cell in grid using supplied selection function
 * In-built functions to use: visitorDepth, visitorBreadth, visitorRandom,
 * visitorColumn, visitorRow.
 *
 * Usage example:
 * ```js
 *  let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell);
 *  for (let cell of visitor) {
 *   // do something with cell
 *  }
 * ```
 *
 * If you want to keep tabs on the visitor, pass in a MutableValueSet. This is
 * updated with visited cells (and is used internally anyway)
 * ```js
 *  let visited = new mutableValueSet<Grids.Cell>(c => Grids.cellKeyString(c));
 *  let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell, visited);
 * ```
 *
 * To visit with some delay, try this pattern
 * ```js
 *  const delayMs = 100;
 *  const run = () => {
 *   let cell = visitor.next().value;
 *   if (cell === undefined) return;
 *   // Do something with cell
 *   setTimeout(run, delayMs);
 *  }
 *  setTimeout(run, delayMs);
 * ```
 * @param logic Logic for selecting next cell
 * @param grid Grid to visit
 * @param start Starting cell
 * @param opts Options
 * @returns Cells
 */
declare const visitor: (logic: VisitorLogic, grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorDepth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorBreadth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRandomContiguous: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
/**
 * Visit by following rows. Normal order is left-to-right, top-to-bottom.
 * @param grid
 * @param start
 * @param opts
 * @returns
 */
declare const visitorRandom: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRow: (grid: Grid, start?: Cell, opts?: VisitorOpts) => VisitGenerator;
/**
 * Runs the provided `visitor` for `steps`, returning the cell we end at
 *
 * ```js
 * // Get a cell 10 steps away (row-wise) from start
 * const cell = visitFor(grid, start, 10, visitorRow);
 * ```
 * @param grid Grid to traverse
 * @param start Start point
 * @param steps Number of steps
 * @param visitor Visitor function
 * @returns
 */
declare const visitFor: (grid: Grid, start: Cell, steps: number, visitor: Visitor) => Cell;
/**
 * Visits cells running down columns, left-to-right.
 * @param grid Grid to traverse
 * @param start Start cell
 * @param opts Options
 * @returns Visitor generator
 */
declare const visitorColumn: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
/**
 * Enumerate rows of grid, returning all the cells in the row
 * as an array
 *
 * ```js
 * for (const row of Grid.rows(shape)) {
 *  // row is an array of Cells.
 *  // [ {x:0, y:0}, {x:1, y:0} ... ]
 * }
 * ```
 * @param grid
 * @param start
 */
declare const rows: (grid: Grid, start?: Cell) => Generator<Cell[], void, unknown>;
/**
 * Enumerate all cells in an efficient manner. Runs left-to-right, top-to-bottom.
 * If end of grid is reached, iterator will wrap to ensure all are visited.
 *
 * @param grid
 * @param start
 */
declare const cells: (grid: Grid, start?: Cell) => Generator<{
    x: number;
    y: number;
}, void, unknown>;
declare const access1dArray: <V>(array: ReadonlyArray<V>, cols: number) => CellAccessor<V>;
/**
 * Returns a function that updates a 2D array representation
 * of a grid. Array is mutated.
 *
 * ```js
 * const m = Grids.array2dUpdater(grid, array);
 * m(someValue, { x:2, y:3 });
 * ```
 * @param grid
 * @param array
 * @returns
 */
declare const array2dUpdater: <V>(grid: GridVisual, array: Array<Array<V>>) => (v: V, position: Point) => void;
/**
 * Visits a grid packed into an array.
 *
 * @example By default visits left-to-right, top-to-bottom:
 * ```js
 * const data = [1, 2, 3, 4, 5, 6];
 * const cols = 2;
 * for (const [value,index] of visitArray(data, cols)) {
 *  // Yields: 1, 2, 3, 4, 5, 6
 * }
 * ```
 *
 * @example
 * ```js
 * ```
 * @param array Array
 * @param cols Columns
 * @param iteratorFunction Visitor function
 * @param opts Options
 */
declare function visitArray<V>(array: ReadonlyArray<V>, cols: number, iteratorFunction?: Visitor, opts?: VisitorOpts): IterableIterator<readonly [data: V, index: number]>;
/**
 * Returns the index for a given cell.
 * This is useful if a grid is stored in an array.
 *
 * ```js
 * const data = [
 *  1, 2,
 *  3, 4,
 *  5, 6 ];
 * const cols = 2; // Grid of 2 columns wide
 * const index = indexFromCell(cols, {x: 1, y: 1});
 * // Yields an index of 3
 * console.log(data[index]); // Yields 4
 * ```
 *
 * Bounds logic is applied to cell.x/y separately. Wrapping
 * only ever happens in same col/row.
 * @see cellFromIndex
 * @param grid Grid
 * @param cell Cell to get index for
 * @param wrap Logic for if we hit bounds of grid
 * @returns
 */
declare const indexFromCell: (grid: Grid, cell: Cell, wrap: BoundsLogic) => number | undefined;
/**
 * Returns x,y from an array index.
 *
 * ```js
 *  const data = [
 *   1, 2,
 *   3, 4,
 *   5, 6 ];
 *
 * // Cols of 2, index 2 (ie. data[2] == 3)
 * const cell = cellFromIndex(2, 2);
 * // Yields: {x: 0, y: 1}
 * ```
 * @see indexFromCell
 * @param colsOrGrid
 * @param index
 * @returns
 */
declare const cellFromIndex: (colsOrGrid: number | Grid, index: number) => Cell;

type Grid$1_BoundsLogic = BoundsLogic;
type Grid$1_CardinalDirection = CardinalDirection;
type Grid$1_CardinalDirectionOptional = CardinalDirectionOptional;
type Grid$1_Cell = Cell;
type Grid$1_CellAccessor<V> = CellAccessor<V>;
type Grid$1_Grid = Grid;
type Grid$1_GridVisual = GridVisual;
type Grid$1_IdentifyNeighbours = IdentifyNeighbours;
type Grid$1_Neighbour = Neighbour;
type Grid$1_NeighbourMaybe = NeighbourMaybe;
type Grid$1_NeighbourSelector = NeighbourSelector;
type Grid$1_Neighbours = Neighbours;
type Grid$1_VisitGenerator = VisitGenerator;
type Grid$1_Visitor = Visitor;
type Grid$1_VisitorLogic = VisitorLogic;
type Grid$1_VisitorOpts = VisitorOpts;
declare const Grid$1_access1dArray: typeof access1dArray;
declare const Grid$1_allDirections: typeof allDirections;
declare const Grid$1_array2dUpdater: typeof array2dUpdater;
declare const Grid$1_asRectangles: typeof asRectangles;
declare const Grid$1_cellAtPoint: typeof cellAtPoint;
declare const Grid$1_cellEquals: typeof cellEquals;
declare const Grid$1_cellFromIndex: typeof cellFromIndex;
declare const Grid$1_cellKeyString: typeof cellKeyString;
declare const Grid$1_cellMiddle: typeof cellMiddle;
declare const Grid$1_cells: typeof cells;
declare const Grid$1_crossDirections: typeof crossDirections;
declare const Grid$1_getLine: typeof getLine;
declare const Grid$1_getVectorFromCardinal: typeof getVectorFromCardinal;
declare const Grid$1_guardCell: typeof guardCell;
declare const Grid$1_indexFromCell: typeof indexFromCell;
declare const Grid$1_inside: typeof inside;
declare const Grid$1_isEqual: typeof isEqual;
declare const Grid$1_neighbours: typeof neighbours;
declare const Grid$1_offset: typeof offset;
declare const Grid$1_offsetCardinals: typeof offsetCardinals;
declare const Grid$1_rectangleForCell: typeof rectangleForCell;
declare const Grid$1_rows: typeof rows;
declare const Grid$1_simpleLine: typeof simpleLine;
declare const Grid$1_toArray: typeof toArray;
declare const Grid$1_visitArray: typeof visitArray;
declare const Grid$1_visitFor: typeof visitFor;
declare const Grid$1_visitNeigbours: typeof visitNeigbours;
declare const Grid$1_visitor: typeof visitor;
declare const Grid$1_visitorBreadth: typeof visitorBreadth;
declare const Grid$1_visitorColumn: typeof visitorColumn;
declare const Grid$1_visitorDepth: typeof visitorDepth;
declare const Grid$1_visitorRandom: typeof visitorRandom;
declare const Grid$1_visitorRandomContiguous: typeof visitorRandomContiguous;
declare const Grid$1_visitorRow: typeof visitorRow;
declare namespace Grid$1 {
  export { type Grid$1_BoundsLogic as BoundsLogic, type Grid$1_CardinalDirection as CardinalDirection, type Grid$1_CardinalDirectionOptional as CardinalDirectionOptional, type Grid$1_Cell as Cell, type Grid$1_CellAccessor as CellAccessor, type Grid$1_Grid as Grid, type Grid$1_GridVisual as GridVisual, type Grid$1_IdentifyNeighbours as IdentifyNeighbours, type Grid$1_Neighbour as Neighbour, type Grid$1_NeighbourMaybe as NeighbourMaybe, type Grid$1_NeighbourSelector as NeighbourSelector, type Grid$1_Neighbours as Neighbours, type Grid$1_VisitGenerator as VisitGenerator, type Grid$1_Visitor as Visitor, type Grid$1_VisitorLogic as VisitorLogic, type Grid$1_VisitorOpts as VisitorOpts, Grid$1_access1dArray as access1dArray, Grid$1_allDirections as allDirections, Grid$1_array2dUpdater as array2dUpdater, Grid$1_asRectangles as asRectangles, Grid$1_cellAtPoint as cellAtPoint, Grid$1_cellEquals as cellEquals, Grid$1_cellFromIndex as cellFromIndex, Grid$1_cellKeyString as cellKeyString, Grid$1_cellMiddle as cellMiddle, Grid$1_cells as cells, Grid$1_crossDirections as crossDirections, Grid$1_getLine as getLine, Grid$1_getVectorFromCardinal as getVectorFromCardinal, Grid$1_guardCell as guardCell, Grid$1_indexFromCell as indexFromCell, Grid$1_inside as inside, Grid$1_isEqual as isEqual, Grid$1_neighbours as neighbours, Grid$1_offset as offset, Grid$1_offsetCardinals as offsetCardinals, Grid$1_rectangleForCell as rectangleForCell, Grid$1_rows as rows, Grid$1_simpleLine as simpleLine, Grid$1_toArray as toArray, Grid$1_visitArray as visitArray, Grid$1_visitFor as visitFor, Grid$1_visitNeigbours as visitNeigbours, Grid$1_visitor as visitor, Grid$1_visitorBreadth as visitorBreadth, Grid$1_visitorColumn as visitorColumn, Grid$1_visitorDepth as visitorDepth, Grid$1_visitorRandom as visitorRandom, Grid$1_visitorRandomContiguous as visitorRandomContiguous, Grid$1_visitorRow as visitorRow };
}

export { type CellAccessor as C, type Grid as G, type VisitGenerator as V, type CardinalDirection as a, type Cell as b, Grid$1 as c };
