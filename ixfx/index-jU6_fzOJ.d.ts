import { R as RandomSource } from './Types-ATA4eXqe.js';
import { I as ISetMutable } from './index-XsioXNLe.js';
import { Point as Point$1 } from 'bezier-js';

type Path = {
    /**
     * Length of path
     */
    length(): number;
    /**
     * Returns a point at a relative (0.0-1.0) position along the path
     *
     * Inverse of {@link relativePosition}.
     * @param {number} t Relative position (0.0-1.0)
     * @returns {Point} Point
     */
    interpolate(t: number): Point;
    /**
     * Returns relative position of `point` along path.
     * If `pt` is same as start, result will be 0, if it's the same as end, it will be 1.
     *
     * Inverse of {@link interpolate}.
     * @param point
     * @param intersectionThreshold
     */
    relativePosition(point: Point, intersectionThreshold: number): number;
    /**
     * Gets smallest box that encloses path
     */
    bbox(): RectPositioned;
    /**
     * Returns the nearest point on path to `point`
     * @param point
     */
    nearest(point: Point): Point;
    /**
     * Distance from start of path to this point.
     * If path is closed (eg. a circle) it may have some arbitary 'start' point
     * @param point
     */
    distanceToPoint(point: Point): number;
    /**
     * Returns a string representation of pth values
     */
    toString(): string;
    /**
     * Returns an array of SVG segments that can render path
     */
    toSvgString(): ReadonlyArray<string>;
    /**
     * Well-known path kind
     */
    readonly kind: `compound` | `elliptical` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
};
type WithBeziers = {
    getBeziers(): ReadonlyArray<Path>;
};
type CompoundPath = Path & {
    readonly segments: ReadonlyArray<Path>;
    readonly kind: `compound`;
};
type Dimensions = {
    /**
     * Width of each path (based on bounding box)
     */
    readonly widths: ReadonlyArray<number>;
    /**
     * Length of each path
     */
    readonly lengths: ReadonlyArray<number>;
    /**
     * Total length of all paths
     */
    readonly totalLength: number;
    /**
     * Total width of all paths
     */
    readonly totalWidth: number;
};
/**
 * Return the start point of a path
 *
 * @param path
 * @return Point
 */
declare const getStart: (path: Path) => Point;
/**
 * Return the end point of a path
 *
 * @param path
 * @return Point
 */
declare const getEnd: (path: Path) => Point;

type index$6_CompoundPath = CompoundPath;
type index$6_Dimensions = Dimensions;
type index$6_Path = Path;
type index$6_WithBeziers = WithBeziers;
declare const index$6_getEnd: typeof getEnd;
declare const index$6_getStart: typeof getStart;
declare namespace index$6 {
  export { type index$6_CompoundPath as CompoundPath, type index$6_Dimensions as Dimensions, type index$6_Path as Path, type index$6_WithBeziers as WithBeziers, index$6_getEnd as getEnd, index$6_getStart as getStart };
}

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
declare const isEqual$5: (a: Grid | GridVisual, b: Grid | GridVisual) => boolean;
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
 * @param paramName
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
declare const toArray$2: <V>(grid: Grid, initialValue?: V | undefined) => V[][];
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
declare const allDirections: readonly CardinalDirection[];
/**
 * Returns a list of + shaped directions: n, e, s, w
 */
declare const crossDirections: readonly CardinalDirection[];
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
 * @param bound Logic for if bounds of grid are exceeded
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
 * @param neighbourSelect Select neighbour to visit
 * @param grid Grid to visit
 * @param start Starting cell
 * @param visited Optional tracker of visited cells
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
declare const access1dArray: <V>(array: readonly V[], cols: number) => CellAccessor<V>;
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
declare const array2dUpdater: <V>(grid: GridVisual, array: V[][]) => (v: V, position: Point) => void;
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
 * @param colsOrGrid
 * @param cell
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
declare const Grid$1_neighbours: typeof neighbours;
declare const Grid$1_offset: typeof offset;
declare const Grid$1_offsetCardinals: typeof offsetCardinals;
declare const Grid$1_rectangleForCell: typeof rectangleForCell;
declare const Grid$1_rows: typeof rows;
declare const Grid$1_simpleLine: typeof simpleLine;
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
  export { type Grid$1_BoundsLogic as BoundsLogic, type Grid$1_CardinalDirection as CardinalDirection, type Grid$1_CardinalDirectionOptional as CardinalDirectionOptional, type Grid$1_Cell as Cell, type Grid$1_CellAccessor as CellAccessor, type Grid$1_Grid as Grid, type Grid$1_GridVisual as GridVisual, type Grid$1_IdentifyNeighbours as IdentifyNeighbours, type Grid$1_Neighbour as Neighbour, type Grid$1_NeighbourMaybe as NeighbourMaybe, type Grid$1_NeighbourSelector as NeighbourSelector, type Grid$1_Neighbours as Neighbours, type Grid$1_VisitGenerator as VisitGenerator, type Grid$1_Visitor as Visitor, type Grid$1_VisitorLogic as VisitorLogic, type Grid$1_VisitorOpts as VisitorOpts, Grid$1_access1dArray as access1dArray, Grid$1_allDirections as allDirections, Grid$1_array2dUpdater as array2dUpdater, Grid$1_asRectangles as asRectangles, Grid$1_cellAtPoint as cellAtPoint, Grid$1_cellEquals as cellEquals, Grid$1_cellFromIndex as cellFromIndex, Grid$1_cellKeyString as cellKeyString, Grid$1_cellMiddle as cellMiddle, Grid$1_cells as cells, Grid$1_crossDirections as crossDirections, Grid$1_getLine as getLine, Grid$1_getVectorFromCardinal as getVectorFromCardinal, Grid$1_guardCell as guardCell, Grid$1_indexFromCell as indexFromCell, Grid$1_inside as inside, isEqual$5 as isEqual, Grid$1_neighbours as neighbours, Grid$1_offset as offset, Grid$1_offsetCardinals as offsetCardinals, Grid$1_rectangleForCell as rectangleForCell, Grid$1_rows as rows, Grid$1_simpleLine as simpleLine, toArray$2 as toArray, Grid$1_visitArray as visitArray, Grid$1_visitFor as visitFor, Grid$1_visitNeigbours as visitNeigbours, Grid$1_visitor as visitor, Grid$1_visitorBreadth as visitorBreadth, Grid$1_visitorColumn as visitorColumn, Grid$1_visitorDepth as visitorDepth, Grid$1_visitorRandom as visitorRandom, Grid$1_visitorRandomContiguous as visitorRandomContiguous, Grid$1_visitorRow as visitorRow };
}

/**
 * Returns a point on cardinal direction, or 'center' for the middle.
 *
 * ```js
 * cardinal({x: 10, y:10, width:100, height: 20}, 'center');
 * ```
 * @param rect Rectangle
 * @param card Cardinal direction or 'center'
 * @returns Point
 */
declare const cardinal: (rect: RectPositioned, card: CardinalDirection | `center`) => Point;

/**
 * Returns the four corners of a rectangle as an array of Points.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100, x: 0, y: 0};
 * const pts = Rects.corners(rect);
 * ```
 *
 * If the rectangle is not positioned, is origin can be provided.
 * @param rect
 * @param origin
 * @returns
 */
declare const corners$1: (rect: RectPositioned | Rect, origin?: Point) => ReadonlyArray<Point>;

/**
 * Returns the distance from the perimeter of `rect` to `pt`.
 * If the point is within the rectangle, 0 is returned.
 *
 * If `rect` does not have an x,y it's assumed to be 0,0
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100, x: 0, y: 0 };
 * Rects.distanceFromExterior(rect, { x: 20, y: 20 });
 * ```
 * @param rect Rectangle
 * @param pt Point
 * @returns Distance
 */
declare const distanceFromExterior$1: (rect: RectPositioned, pt: Point$1) => number;
/**
 * Return the distance of `pt` to the center of `rect`.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100, x: 0, y: 0 };
 * Rects.distanceFromCenter(rect, { x: 20, y: 20 });
 * ```
 * @param rect
 * @param pt
 * @returns
 */
declare const distanceFromCenter: (rect: RectPositioned, pt: Point$1) => number;

/**
 * A line, which consists of an `a` and `b` {@link Point}.
 */
type Line = {
    readonly a: Point;
    readonly b: Point;
};
/**
 * A PolyLine, consisting of more than one line.
 */
type PolyLine = ReadonlyArray<Line>;
declare const Empty$2: Readonly<{
    a: Readonly<{
        x: 0;
        y: 0;
    }>;
    b: Readonly<{
        x: 0;
        y: 0;
    }>;
}>;
declare const Placeholder$2: Readonly<{
    a: Readonly<{
        x: number;
        y: number;
    }>;
    b: Readonly<{
        x: number;
        y: number;
    }>;
}>;
/**
 * Returns true if `l` is the same as Line.Empty, that is
 * the `a` and `b` points are Points.Empty.
 * @param l
 * @returns
 */
declare const isEmpty$2: (l: Line) => boolean;
declare const isPlaceholder$2: (l: Line) => boolean;
/**
 * Returns true if `p` is a valid line, containing `a` and `b` Points.
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.isLine(l);
 * ```
 * @param p Value to check
 * @returns True if a valid line.
 */
declare const isLine: (p: Path | Line | Point) => p is Line;
/**
 * Returns true if `p` is a {@link PolyLine}, ie. an array of {@link Line}s.
 * Validates all items in array.
 * @param p
 * @returns
 */
declare const isPolyLine: (p: any) => p is PolyLine;
/**
 * Returns true if the lines have the same value. Note that only
 * the line start and end points are compared. So the lines might
 * be different in other properties, and `isEqual` will still return
 * true.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const a = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
 * const b = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
 * a === b; // false, because they are different objects
 * Lines.isEqual(a, b); // true, because they have the same value
 * ```
 * @param {Line} a
 * @param {Line} b
 * @returns {boolean}
 */
declare const isEqual$4: (a: Line, b: Line) => boolean;
/**
 * Applies `fn` to both start and end points.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * // Line 10,10 -> 20,20
 * const line = Lines.fromNumbers(10,10, 20,20);
 *
 * // Applies randomisation to both x and y.
 * const rand = (p) => ({
 *  x: p.x * Math.random(),
 *  y: p.y * Math.random()
 * });
 *
 * // Applies our randomisation function
 * const line2 = apply(line, rand);
 * ```
 * @param line Line
 * @param fn Function that takes a point and returns a point
 * @returns
 */
declare const apply$2: (line: Line, fn: (p: Point) => Point) => Readonly<Line>;
/**
 * Throws an exception if:
 * * line is undefined
 * * a or b parameters are missing
 *
 * Does not validate points
 * @param line
 * @param name
 */
declare const guard$3: (line: Line, name?: string) => void;
/**
 * Returns the angle in radians of a line, or two points
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.angleRadian(line);
 * Lines.angleRadian(ptA, ptB);
 * ```
 * @param lineOrPoint
 * @param b
 * @returns
 */
declare const angleRadian: (lineOrPoint: Line | Point, b?: Point) => number;
/**
 * Multiplies start and end of line by point.x, point.y.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 *
 * // Line 1,1 -> 10,10
 * const l = Lines.fromNumbers(1, 1, 10, 10);
 * const ll = Lines.multiply(l, {x:2, y:3});
 * // Yields: 2,20 -> 3,30
 * ```
 * @param line
 * @param point
 * @returns
 */
declare const multiply$2: (line: Line, point: Point) => Line;
/**
 * Divides both start and end points by given x,y
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 *
 * // Line 1,1 -> 10,10
 * const l = Lines.fromNumbers(1,1,10,10);
 * const ll = Lines.divide(l, {x:2, y:4});
 * // Yields: 0.5,0.25 -> 5,2.5
 * ```
 *
 * Dividing by zero will give Infinity for that dimension.
 * @param line
 * @param point
 * @returns
 */
declare const divide$1: (line: Line, point: Point) => Line;
/**
 * Adds both start and end points by given x,y
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * // Line 1,1 -> 10,10
 * const l = Lines.fromNumbers(1,1,10,10);
 * const ll = Lines.sum(l, {x:2, y:4});
 * // Yields: 3,5 -> 12,14
 * ```
 * @param line
 * @param point
 * @returns
 */
declare const sum$2: (line: Line, point: Point) => Line;
/**
 * Subtracts both start and end points by given x,y
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 *
 * // Line 1,1 -> 10,10
 * const l = Lines.fromNumbers(1,1,10,10);
 * const ll = Lines.subtract(l, {x:2, y:4});
 * // Yields: -1,-3 -> 8,6
 * ```
 * @param line
 * @param point
 * @returns
 */
declare const subtract$2: (line: Line, point: Point) => Line;
/**
 * Normalises start and end points by given width and height. Useful
 * for converting an absolutely-defined line to a relative one.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 *
 * // Line 1,1 -> 10,10
 * const l = Lines.fromNumbers(1,1,10,10);
 * const ll = Lines.normaliseByRect(l, 10, 10);
 * // Yields: 0.1,0.1 -> 1,1
 * ```
 * @param line
 * @param width
 * @param height
 * @returns
 */
declare const normaliseByRect$2: (line: Line, width: number, height: number) => Line;
/**
 * Returns true if `point` is within `maxRange` of `line`.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const line = Lines.fromNumbers(0,20,20,20);
 * Lines.withinRange(line, {x:0,y:21}, 1); // True
 * ```
 * @param line
 * @param point
 * @param maxRange
 * @returns True if point is within range
 */
declare const withinRange$1: (line: Line, point: Point, maxRange: number) => boolean;
/**
 * Returns the length between two points
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.length(ptA, ptB);
 * ```
 * @param a First point
 * @param b Second point
 * @returns
 */
declare function length$1(a: Point, b: Point): number;
/**
 * Returns length of line. If a polyline (array of lines) is provided,
 * it is the sum total that is returned.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.length(a: {x:0, y:0}, b: {x: 100, y:100});
 * Lines.length(lines);
 * ```
 * @param line Line
 */
declare function length$1(line: Line | PolyLine): number;
/**
 * Returns the mid-point of a line (same as `interpolate` with an amount of 0.5)
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.midpoint(line); // Returns {x, y}
 * ```
 * @param aOrLine
 * @param pointB
 * @returns
 */
declare const midpoint: (aOrLine: Point | Line, pointB?: Point) => Point;
/**
 * Returns [a,b] points from either a line parameter, or two points.
 * It additionally applies the guardPoint function to ensure validity.
 * This supports function overloading.
 * @ignore
 * @param aOrLine
 * @param b
 * @returns
 */
declare const getPointParameter$1: (aOrLine: Point | Line, b?: Point) => readonly [Point, Point];
/**
 * Returns the nearest point on `line` closest to `point`.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const pt = Lines.nearest(line, {x:10,y:10});
 * ```
 *
 * If an array of lines is provided, it will be the closest point amongst all the lines
 * @param line Line or array of lines
 * @param point
 * @returns Point `{ x, y }`
 */
declare const nearest$1: (line: Line | ReadonlyArray<Line>, point: Point) => Point;
/**
 * Calculates [slope](https://en.wikipedia.org/wiki/Slope) of line.
 *
 * @example
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.slope(line);
 * Lines.slope(ptA, ptB)
 * ```
 * @param lineOrPoint Line or point. If point is provided, second point must be given too
 * @param b Second point if needed
 * @returns
 */
declare const slope: (lineOrPoint: Line | Point, b?: Point) => number;
/**
 * Returns a point perpendicular to `line` at a specified `distance`. Use negative
 * distances for the other side of line.
 * ```
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * // Project a point 100 units away from line, at its midpoint.
 * const pt = Lines.perpendicularPoint(line, 100, 0.5);
 * ```
 * @param line Line
 * @param distance Distance from line. Use negatives to flip side
 * @param amount Relative place on line to project point from. 0 projects from A, 0.5 from the middle, 1 from B.
 */
declare const perpendicularPoint: (line: Line, distance: number, amount?: number) => {
    x: number;
    y: number;
};
/**
 * Returns a parallel line to `line` at `distance`.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const l = Lines.parallel(line, 10);
 * ```
 * @param line
 * @param distance
 */
declare const parallel: (line: Line, distance: number) => Line;
/**
 * Scales a line from its midpoint
 *
 * @example Shorten by 50%, anchored at the midpoint
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const l = {
 *  a: {x:50, y:50}, b: {x: 100, y: 90}
 * }
 * const l2 = Lines.scaleFromMidpoint(l, 0.5);
 * ```
 * @param line
 * @param factor
 */
declare const scaleFromMidpoint: (line: Line, factor: number) => Line;
/**
 * Calculates `y` where `line` intersects `x`.
 * @param line Line to extend
 * @param x Intersection of x-axis.
 */
declare const pointAtX: (line: Line, x: number) => Point;
/**
 * Returns a line extended from its `a` point by a specified distance
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const line = {a: {x: 0, y:0}, b: {x:10, y:10} }
 * const extended = Lines.extendFromA(line, 2);
 * ```
 * @param line
 * @param distance
 * @return Newly extended line
 */
declare const extendFromA: (line: Line, distance: number) => Line;
/**
 * Yields every integer point along `line`.
 *
 * @example Basic usage
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const l = { a: {x: 0, y: 0}, b: {x: 100, y: 100} };
 * for (const p of Lines.pointsOf(l)) {
 *  // Do something with point `p`...
 * }
 * ```
 *
 * Some precision is lost as start and end
 * point is also returned as an integer.
 *
 * Uses [Bresenham's line algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm)
 * @param line Line
 */
declare function pointsOf(line: Line): Generator<Point>;
/**
 * Returns the distance of `point` to the
 * nearest point on `line`.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const d = Lines.distance(line, {x:10,y:10});
 * ```
 *
 * If an array of lines is provided, the shortest distance is returned.
 * @param line Line (or array of lines)
 * @param point Point to check against
 * @returns Distance
 */
declare const distance$1: (line: Line | ReadonlyArray<Line>, point: Point) => number;
/**
 * Calculates a point in-between `a` and `b`.
 *
 * If an interpolation amount below 0 or above 1 is given, _and_
 * `allowOverflow_ is true, a point will be returned that is extended
 * past `line`. This is useful for easing functions which might
 * briefly go past the limits.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 *
 * // Get {x,y} at 50% along line
 * Lines.interpolate(0.5, line);
 *
 * // Get {x,y} at 80% between point A and B
 * Lines.interpolate(0.8, ptA, ptB);
 * ```
 * @param amount Relative position, 0 being at a, 0.5 being halfway, 1 being at b
 * @param a Start
 * @param pointB End
 * @returns Point between a and b
 */
declare function interpolate$2(amount: number, a: Point, pointB: Point, allowOverflow?: boolean): Point;
/**
 * Calculates a point in-between `line`'s start and end points.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 *
 * // Get {x, y } at 50% along line
 * Lines.interpolate(0.5, line);
 * ```
 *
 * Any additional properties from `b`  are returned on the result as well.
 * @param amount 0..1
 * @param line Line
 * @param allowOverflow If true, interpolation amount is permitted to exceed 0..1, extending the line
 */
declare function interpolate$2(amount: number, line: Line, allowOverflow?: boolean): Point;
/**
 * Returns a string representation of two points
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * console.log(Lines.toString(a, b)));
 * ```
 * @param a
 * @param b
 * @returns
 */
declare function toString$1(a: Point, b: Point): string;
/**
 * Returns a string representation of a line
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.toString(line);
 * ```
 * @param line
 */
declare function toString$1(line: Line): string;
/**
 * Returns a line from a basis of coordinates (x1, y1, x2, y2)
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * // Line from 0,1 -> 10,15
 * Lines.fromNumbers(0, 1, 10, 15);
 * ```
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
declare const fromNumbers$2: (x1: number, y1: number, x2: number, y2: number) => Line;
/**
 * Returns an array representation of line: [a.x, a.y, b.x, b.y]
 *
 * See {@link fromFlatArray} to create a line _from_ this representation.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.toFlatArray(line);
 * Lines.toFlatArray(pointA, pointB);
 * ```
 * @export
 * @param {Point} a
 * @param {Point} b
 * @returns {number[]}
 */
declare const toFlatArray$1: (a: Point | Line, b: Point) => ReadonlyArray<number>;
/**
 * Yields all the points of all the lines.
 *
 * ```js
 * const lines = [ ..some array of lines.. ];
 * for (const pt of Lines.asPoints(lines)) {
 *  // Yields a and then b of each point sequentially
 * }
 * ```
 * @param lines
 */
declare function asPoints(lines: Iterable<Line>): Generator<Point, void, unknown>;
/**
 * Returns an SVG description of line
 * ```
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js';
 * Lines.toSvgString(ptA, ptB);
 * ```
 * @param a
 * @param b
 * @returns
 */
declare const toSvgString: (a: Point, b: Point) => ReadonlyArray<string>;
/**
 * Returns a line from four numbers [x1,y1,x2,y2].
 *
 * See {@link toFlatArray} to create an array from a line.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const line = Lines.fromFlatArray(...[0, 0, 100, 100]);
 * // line is {a: { x:0, y:0 }, b: { x: 100, y: 100 } }
 * ```
 * @param array Array in the form [x1,y1,x2,y2]
 * @returns Line
 */
declare const fromFlatArray$1: (array: ReadonlyArray<number>) => Line;
/**
 * Returns a line from two points
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * // Line from 0,1 to 10,15
 * const line = Lines.fromPoints( { x:0, y:1 }, { x:10, y:15 });
 * // line is: { a: { x: 0, y: 1}, b: { x: 10, y: 15 } };
 * ```
 * @param a Start point
 * @param b End point
 * @returns
 */
declare const fromPoints$1: (a: Point, b: Point) => Line;
/**
 * Returns an array of lines that connects provided points. Note that line is not closed.
 *
 * Eg, if points a,b,c are provided, two lines are provided: a->b and b->c.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const lines = Lines.joinPointsToLines(ptA, ptB, ptC);
 * // lines is an array of, well, lines
 * ```
 * @param points
 * @returns
 */
declare const joinPointsToLines: (...points: ReadonlyArray<Point>) => PolyLine;
/**
 * Returns a {@link LinePath} from two points
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const path = Lines.fromPointsToPath(ptA, ptB);
 * ```
 * @param a
 * @param b
 * @returns
 */
declare const fromPointsToPath: (a: Point, b: Point) => LinePath;
/**
 * Returns a rectangle that encompasses dimension of line
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js';
 * const rect = Lines.bbox(line);
 * ```
 */
declare const bbox$3: (line: Line) => RectPositioned;
/**
 * Returns the relative position of `pt` along `line`.
 * Warning: assumes `pt` is actually on `line`. Results may be bogus if not.
 * @param line
 * @param pt
 */
declare const relativePosition: (line: Line, pt: Point) => number;
/**
 * Returns a path wrapper around a line instance. This is useful if there are a series
 * of operations you want to do with the same line because you don't have to pass it
 * in as an argument to each function.
 *
 * Note that the line is immutable, so a function like `sum` returns a new LinePath,
 * wrapping the result of `sum`.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * // Create a path
 * const l = Lines.toPath(fromNumbers(0,0,10,10));
 *
 * // Now we can use it...
 * l.length();
 *
 * // Mutate functions return a new path
 * const ll = l.sum({x:10,y:10});
 * ll.length();
 * ```
 * @param line
 * @returns
 */
declare const toPath$1: (line: Line) => LinePath;
type LinePath = Line & Path & {
    toFlatArray(): ReadonlyArray<number>;
    toPoints(): ReadonlyArray<Point>;
    rotate(amountRadian: number, origin: Point): LinePath;
    sum(point: Point): LinePath;
    divide(point: Point): LinePath;
    multiply(point: Point): LinePath;
    subtract(point: Point): LinePath;
    apply(fn: (point: Point) => Point): LinePath;
    midpoint(): Point;
    parallel(distance: number): Line;
    perpendicularPoint(distance: number, amount?: number): Point;
    slope(): number;
    withinRange(point: Point, maxRange: number): boolean;
    isEqual(otherLine: Line): boolean;
};
/**
 * Returns a line that is rotated by `angleRad`. By default it rotates
 * around its center, but an arbitrary `origin` point can be provided.
 * If `origin` is a number, it's presumed to be a 0..1 percentage of the line.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 *
 * // Rotates line by 0.1 radians around point 10,10
 * const r = Lines.rotate(line, 0.1, {x:10,y:10});
 *
 * // Rotate line by 5 degrees around its center
 * const r = Lines.rotate(line, degreeToRadian(5));
 *
 * // Rotate line by 5 degres around its end point
 * const r = Lines.rotate(line, degreeToRadian(5), line.b);
 *
 * // Rotate by 90 degrees at the 80% position
 * const r = Lines.rotated = rotate(line, Math.PI / 2, 0.8);
 * ```
 * @param line Line to rotate
 * @param amountRadian Angle in radians to rotate by
 * @param origin Point to rotate around. If undefined, middle of line will be used
 * @returns
 */
declare const rotate$2: (line: Line, amountRadian?: number, origin?: Point | number) => Line;

type index$5_Line = Line;
type index$5_LinePath = LinePath;
type index$5_PolyLine = PolyLine;
declare const index$5_angleRadian: typeof angleRadian;
declare const index$5_asPoints: typeof asPoints;
declare const index$5_extendFromA: typeof extendFromA;
declare const index$5_fromPointsToPath: typeof fromPointsToPath;
declare const index$5_isLine: typeof isLine;
declare const index$5_isPolyLine: typeof isPolyLine;
declare const index$5_joinPointsToLines: typeof joinPointsToLines;
declare const index$5_midpoint: typeof midpoint;
declare const index$5_parallel: typeof parallel;
declare const index$5_perpendicularPoint: typeof perpendicularPoint;
declare const index$5_pointAtX: typeof pointAtX;
declare const index$5_pointsOf: typeof pointsOf;
declare const index$5_relativePosition: typeof relativePosition;
declare const index$5_scaleFromMidpoint: typeof scaleFromMidpoint;
declare const index$5_slope: typeof slope;
declare const index$5_toSvgString: typeof toSvgString;
declare namespace index$5 {
  export { Empty$2 as Empty, type index$5_Line as Line, type index$5_LinePath as LinePath, Placeholder$2 as Placeholder, type index$5_PolyLine as PolyLine, index$5_angleRadian as angleRadian, apply$2 as apply, index$5_asPoints as asPoints, bbox$3 as bbox, distance$1 as distance, divide$1 as divide, index$5_extendFromA as extendFromA, fromFlatArray$1 as fromFlatArray, fromNumbers$2 as fromNumbers, fromPoints$1 as fromPoints, index$5_fromPointsToPath as fromPointsToPath, getPointParameter$1 as getPointParameter, guard$3 as guard, interpolate$2 as interpolate, isEmpty$2 as isEmpty, isEqual$4 as isEqual, index$5_isLine as isLine, isPlaceholder$2 as isPlaceholder, index$5_isPolyLine as isPolyLine, index$5_joinPointsToLines as joinPointsToLines, length$1 as length, index$5_midpoint as midpoint, multiply$2 as multiply, nearest$1 as nearest, normaliseByRect$2 as normaliseByRect, index$5_parallel as parallel, index$5_perpendicularPoint as perpendicularPoint, index$5_pointAtX as pointAtX, index$5_pointsOf as pointsOf, index$5_relativePosition as relativePosition, rotate$2 as rotate, index$5_scaleFromMidpoint as scaleFromMidpoint, index$5_slope as slope, subtract$2 as subtract, sum$2 as sum, toFlatArray$1 as toFlatArray, toPath$1 as toPath, toString$1 as toString, index$5_toSvgString as toSvgString, withinRange$1 as withinRange };
}

/**
 * Returns four lines based on each corner.
 * Lines are given in order: top, right, bottom, left
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100, x: 100, y: 100 };
 * // Yields: array of length four
 * const lines = Rects.lines(rect);
 * ```
 *
 * @param {(RectPositioned|Rect)} rect
 * @param {Points.Point} [origin]
 * @returns {Lines.Line[]}
 */
declare const edges$1: (rect: RectPositioned | Rect, origin?: Point) => ReadonlyArray<Line>;
/**
 * Returns a point on the edge of rectangle
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * const r1 = {x: 10, y: 10, width: 100, height: 50};
 * Rects.getEdgeX(r1, `right`);  // Yields: 110
 * Rects.getEdgeX(r1, `bottom`); // Yields: 10
 *
 * const r2 = {width: 100, height: 50};
 * Rects.getEdgeX(r2, `right`);  // Yields: 100
 * Rects.getEdgeX(r2, `bottom`); // Yields: 0
 * ```
 * @param rect
 * @param edge Which edge: right, left, bottom, top
 * @returns
 */
declare const getEdgeX: (rect: RectPositioned | Rect, edge: `right` | `bottom` | `left` | `top`) => number;
/**
 * Returns a point on the edge of rectangle
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * const r1 = {x: 10, y: 10, width: 100, height: 50};
 * Rects.getEdgeY(r1, `right`);  // Yields: 10
 * Rects.getEdgeY(r1, `bottom`); // Yields: 60
 *
 * const r2 = {width: 100, height: 50};
 * Rects.getEdgeY(r2, `right`);  // Yields: 0
 * Rects.getEdgeY(r2, `bottom`); // Yields: 50
 * ```
 * @param rect
 * @param edge Which edge: right, left, bottom, top
 * @returns
 */
declare const getEdgeY: (rect: RectPositioned | Rect, edge: `right` | `bottom` | `left` | `top`) => number;

/**
 * Returns a rectangle from width, height
 * ```js
 * const r = Rects.fromNumbers(100, 200);
 * // {width: 100, height: 200}
 * ```
 *
 * Use {@link toArray} for the opposite conversion.
 *
 * @param width
 * @param height
 */
declare function fromNumbers$1(width: number, height: number): Rect;
/**
 * Returns a rectangle from x,y,width,height
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const r = Rects.fromNumbers(10, 20, 100, 200);
 * // {x: 10, y: 20, width: 100, height: 200}
 * ```
 *
 * Use the spread operator (...) if the source is an array:
 * ```js
 * const r3 = Rects.fromNumbers(...[10, 20, 100, 200]);
 * ```
 *
 * Use {@link toArray} for the opposite conversion.
 *
 * @param x
 * @param y
 * @param width
 * @param height
 */
declare function fromNumbers$1(x: number, y: number, width: number, height: number): RectPositioned;

/**
 * Returns _true_ if `point` is within, or on boundary of `rect`.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * Rects.intersectsPoint(rect, { x: 100, y: 100});
 * ```
 * @param rect
 * @param point
 */
declare function intersectsPoint$1(rect: Rect | RectPositioned, point: Point): boolean;
/**
 * Returns true if x,y coordinate is within, or on boundary of `rect`.
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * Rects.intersectsPoint(rect, 100, 100);
 * ```
 * @param rect
 * @param x
 * @param y
 */
declare function intersectsPoint$1(rect: Rect | RectPositioned, x: number, y: number): boolean;
/**
 * Returns true if `a` or `b` overlap, are equal, or `a` contains `b`.
 * A rectangle can be checked for intersections with another RectPositioned, CirclePositioned or Point.
 *
 */
declare const isIntersecting$1: (a: RectPositioned, b: CirclePositioned | Point) => boolean;

/**
 * Multiplies `a` by rectangle or width/height. Useful for denormalising a value.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * // Normalised rectangle of width 50%, height 50%
 * const r = {width: 0.5, height: 0.5};
 *
 * // Map to window:
 * const rr = Rects.multiply(r, window.innerWidth, window.innerHeight);
 * ```
 *
 * ```js
 * // Returns {width: someRect.width * someOtherRect.width ...}
 * Rects.multiply(someRect, someOtherRect);
 *
 * // Returns {width: someRect.width * 100, height: someRect.height * 200}
 * Rects.multiply(someRect, 100, 200);
 * ```
 *
 * Multiplication applies to the first parameter's x/y fields, if present.
 */
declare function multiply$1(a: RectPositioned, b: Rect | number, c?: number): RectPositioned;
/**
 * Multiplies `a` by rectangle or width/height. Useful for denormalising a value.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * // Normalised rectangle of width 50%, height 50%
 * const r = {width: 0.5, height: 0.5};
 *
 * // Map to window:
 * const rr = Rects.multiply(r, window.innerWidth, window.innerHeight);
 * ```
 *
 * ```js
 * // Returns {width: someRect.width * someOtherRect.width ...}
 * Rects.multiply(someRect, someOtherRect);
 *
 * // Returns {width: someRect.width * 100, height: someRect.height * 200}
 * Rects.multiply(someRect, 100, 200);
 * ```
 *
 * Multiplication applies to the first parameter's x/y fields, if present.
 */
declare function multiply$1(a: Rect, b: Rect | number, c?: number): Rect;
declare function multiply$1(a: RectPositioned, b: Rect): RectPositioned;
/**
 * Multiplies all components of `rect` by `amount`
 * @param rect
 * @param amount
 */
declare function multiplyScalar$2(rect: Rect, amount: number): Rect;
/**
 * Multiplies all components of `rect` by `amount`
 * @param rect
 * @param amount
 */
declare function multiplyScalar$2(rect: RectPositioned, amount: number): RectPositioned;

/**
 * Returns a random positioned Rect on a 0..1 scale.
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const r = Rects.random(); // eg {x: 0.2549012, y:0.859301, width: 0.5212, height: 0.1423 }
 * ```
 *
 * A custom source of randomness can be provided:
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * import { weightedSource } from "https://unpkg.com/ixfx/dist/random.js"
 * const r = Rects.random(weightedSource(`quadIn`));
 * ```
 * @param rando
 * @returns
 */
declare const random$1: (rando?: RandomSource) => RectPositioned;
type RandomPointOpts$2 = {
    readonly strategy?: `naive`;
    readonly randomSource?: RandomSource;
    readonly margin?: {
        readonly x: number;
        readonly y: number;
    };
};
/**
 * Returns a random point within a rectangle.
 *
 * By default creates a uniform distribution.
 *
 * ```js
 * const pt = randomPoint({width: 5, height: 10});
 * ```'
 * @param within Rectangle to generate a point within
 * @param opts Options
 * @returns
 */
declare const randomPoint$2: (within: Rect | RectPositioned, opts?: RandomPointOpts$2) => Point;

/**
 * Subtracts width/height of `b` from `a` (ie: a - b), returning result.
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rectA = { width: 100, height: 100 };
 * const rectB = { width: 200, height: 200 };
 *
 * // Yields: { width: -100, height: -100 }
 * Rects.subtract(rectA, rectB);
 * ```
 * @param a
 * @param b
 */
declare function subtract$1(a: Rect, b: Rect): Rect;
/**
 * Subtracts a width/height from `a`, returning result.
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100 };
 *
 * // Yields: { width: -100, height: -100 }
 * Rects.subtract(rect, 200, 200);
 * ```
 * @param a
 * @param width
 * @param height
 */
declare function subtract$1(a: Rect, width: number, height?: number): Rect;

/**
 * Sums width/height of `b` with `a` (ie: a + b), returning result.
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rectA = { width: 100, height: 100 };
 * const rectB = { width: 200, height: 200 };
 *
 * // Yields: { width: 300, height: 300 }
 * Rects.sum(rectA, rectB);
 * ```
 * @param a
 * @param b
 */
declare function sum$1(a: Rect, b: Rect): Rect;
/**
 * Sums width/height of `b` with `a` (ie: a + b), returning result.
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100 };
 *
 * // Yields: { width: 300, height: 300 }
 * Rects.subtract(rect, 200, 200);
 * ```
 * @param a
 * @param width
 * @param height
 */
declare function sum$1(a: Rect, width: number, height?: number): Rect;

/**
 * Rectangle as array: `[width, height]`
 */
type RectArray = readonly [width: number, height: number];
/**
 * Positioned rectangle as array: `[x, y, width, height]`
 */
type RectPositionedArray = readonly [
    x: number,
    y: number,
    width: number,
    height: number
];
type Rect = {
    readonly width: number;
    readonly height: number;
};
type RectPositioned = Point & Rect;
declare const empty: Readonly<{
    width: 0;
    height: 0;
}>;
declare const emptyPositioned: Readonly<{
    x: 0;
    y: 0;
    width: 0;
    height: 0;
}>;
declare const placeholder: Readonly<{
    width: number;
    height: number;
}>;
declare const placeholderPositioned: Readonly<{
    x: number;
    y: number;
    width: number;
    height: number;
}>;
/**
 * Initialise a rectangle based on the width and height of a HTML element.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"
 * Rects.fromElement(document.querySelector(`body`));
 * ```
 * @param el
 * @returns
 */
declare const fromElement: (el: HTMLElement) => Rect;
/**
 * Returns _true_ if the width & height of the two rectangles is the same.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rectA = { width: 10, height: 10, x: 10, y: 10 };
 * const rectB = { width: 10, height: 10, x: 20, y: 20 };
 *
 * // True, even though x,y are different
 * Rects.isEqualSize(rectA, rectB);
 *
 * // False, because coordinates are different
 * Rects.isEqual(rectA, rectB)
 * ```
 * @param a
 * @param b
 * @returns
 */
declare const isEqualSize: (a: Rect, b: Rect) => boolean;
/**
 * Converts a rectangle to an array of numbers. See {@link fromNumbers} for the opposite conversion.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * const r1 = Rects.toArray({ x: 10, y:20, width: 100, height: 200 });
 * // [10, 20, 100, 200]
 * const r2 = Rects.toArray({ width: 100, height: 200 });
 * // [100, 200]
 * ```
 * @param rect
 * @see fromNumbers
 */
declare function toArray$1(rect: Rect): RectArray;
/**
 * Converts a rectangle to an array of numbers. See {@link fromNumbers} for the opposite conversion.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * const r1 = Rects.toArray({ x: 10, y:20, width: 100, height: 200 });
 * // [10, 20, 100, 200]
 * const r2 = Rects.toArray({ width: 100, height: 200 });
 * // [100, 200]
 * ```
 * @param rect
 * @see fromNumbers
 */
declare function toArray$1(rect: RectPositioned): RectPositionedArray;
/**
 * Returns _true_ if two rectangles have identical values.
 * Both rectangles must be positioned or not.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rectA = { width: 10, height: 10, x: 10, y: 10 };
 * const rectB = { width: 10, height: 10, x: 20, y: 20 };
 *
 * // False, because coordinates are different
 * Rects.isEqual(rectA, rectB)
 *
 * // True, even though x,y are different
 * Rects.isEqualSize(rectA, rectB);
 * ```
 * @param a
 * @param b
 * @returns
 */
declare const isEqual$3: (a: Rect | RectPositioned, b: Rect | RectPositioned) => boolean;
/**
 * Initialises a rectangle based on its center, a width and height
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * // Rectangle with center at 50,50, width 100 height 200
 * Rects.fromCenter({x: 50, y:50}, 100, 200);
 * ```
 * @param origin
 * @param width
 * @param height
 * @returns
 */
declare const fromCenter$2: (origin: Point, width: number, height: number) => RectPositioned;
/**
 * Returns a rectangle based on provided four corners.
 *
 * To create a rectangle that contains an arbitary set of points, use {@link Geometry.Points.bbox | Geometry.Points.bbox}.
 *
 * Does some sanity checking such as:
 *  - x will be smallest of topLeft/bottomLeft
 *  - y will be smallest of topRight/topLeft
 *  - width will be largest between top/bottom left and right
 *  - height will be largest between left and right top/bottom
 *
 */
declare const maxFromCorners: (topLeft: Point, topRight: Point, bottomRight: Point, bottomLeft: Point) => RectPositioned;
/**
 * Accepts:
 * * x,y,w,h
 * * x,y,rect
 * * point,rect
 * * RectPositioned
 * * Rect, x,y
 * * Rect, Point
 * @param a
 * @param b
 * @param c
 * @param d
 * @returns
 */
declare function getRectPositionedParameter(a: number | Point | Rect | RectPositioned, b?: Rect | number | Point, c?: number | Rect, d?: number): RectPositioned;
/**
 * Clamps `value` so it does not exceed `maximum`
 * on either dimension. x,y are ignored.
 *
 * ```js
 * clamp({ width:100, height:5 }, { width:10, height:10 }); // { width:10, height:5 }
 *
 * clamp({ width:10, height:10 }, { width:10, height:10 }); // { width:10, height:10 }
 * ```
 *
 * Any existing data on `value` is copied to output.
 * @param value Input rectangle
 * @param maximum Maximum allowed size
 */
declare const clamp$1: (value: Rect, maximum: Rect) => Rect;
/**
 * Creates a rectangle from its top-left coordinate, a width and height.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * // Rectangle at 50,50 with width of 100, height of 200.
 * const rect = Rects.fromTopLeft({ x: 50, y:50 }, 100, 200);
 * ```
 * @param origin
 * @param width
 * @param height
 * @returns
 */
declare const fromTopLeft: (origin: Point, width: number, height: number) => RectPositioned;
/**
 * Returns `rect` divided by the width,height of `normaliseBy`.
 * This can be useful for normalising based on camera frame.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * const frameSize = {width: 640, height: 320};
 * const object = { x: 320, y: 160, width: 64, height: 32};
 *
 * const n = Rects.normaliseByRect(object, frameSize);
 * // Yields: {x: 0.5, y: 0.5, width: 0.1, height: 0.1}
 * ```
 *
 * Height and width can be supplied instead of a rectangle too:
 * ```js
 * const n = Rects.normaliseByRect(object, 640, 320);
 * ```
 * @param rect
 * @param normaliseBy
 * @returns
 */
declare const normaliseByRect$1: (rect: Rect | RectPositioned, normaliseByOrWidth: Rect | number, height?: number) => Rect | RectPositioned;
/**
 * Returns the center of a rectangle as a {@link Geometry.Point}.
 *  If the rectangle lacks a position and `origin` parameter is not provided, 0,0 is used instead.
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * const p = Rects.center({x:10, y:20, width:100, height:50});
 * const p2 = Rects.center({width: 100, height: 50}); // Assumes 0,0 for rect x,y
 * ```
 * @param rect Rectangle
 * @param origin Optional origin. Overrides `rect` position if available. If no position is available 0,0 is used by default.
 * @returns
 */
declare const center$2: (rect: RectPositioned | Rect, origin?: Point) => Point;
/**
 * Returns the length of each side of the rectangle (top, right, bottom, left)
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100, x: 100, y: 100 };
 * // Yields: array of length four
 * const lengths = Rects.lengths(rect);
 * ```
 * @param rect
 * @returns
 */
declare const lengths$1: (rect: RectPositioned) => ReadonlyArray<number>;
/**
 * Returns the perimeter of `rect` (ie. sum of all edges)
 *  * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100, x: 100, y: 100 };
 * Rects.perimeter(rect);
 * ```
 * @param rect
 * @returns
 */
declare const perimeter$4: (rect: Rect) => number;
/**
 * Returns the area of `rect`
 *
 * ```js
 * import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const rect = { width: 100, height: 100, x: 100, y: 100 };
 * Rects.area(rect);
 * ```
 * @param rect
 * @returns
 */
declare const area$5: (rect: Rect) => number;

type index$4_Rect = Rect;
type index$4_RectArray = RectArray;
type index$4_RectPositioned = RectPositioned;
type index$4_RectPositionedArray = RectPositionedArray;
declare const index$4_cardinal: typeof cardinal;
declare const index$4_distanceFromCenter: typeof distanceFromCenter;
declare const index$4_empty: typeof empty;
declare const index$4_emptyPositioned: typeof emptyPositioned;
declare const index$4_fromElement: typeof fromElement;
declare const index$4_fromTopLeft: typeof fromTopLeft;
declare const index$4_getEdgeX: typeof getEdgeX;
declare const index$4_getEdgeY: typeof getEdgeY;
declare const index$4_getRectPositionedParameter: typeof getRectPositionedParameter;
declare const index$4_isEqualSize: typeof isEqualSize;
declare const index$4_maxFromCorners: typeof maxFromCorners;
declare const index$4_placeholder: typeof placeholder;
declare const index$4_placeholderPositioned: typeof placeholderPositioned;
declare namespace index$4 {
  export { type RandomPointOpts$2 as RandomPointOpts, type index$4_Rect as Rect, type index$4_RectArray as RectArray, type index$4_RectPositioned as RectPositioned, type index$4_RectPositionedArray as RectPositionedArray, area$5 as area, index$4_cardinal as cardinal, center$2 as center, clamp$1 as clamp, corners$1 as corners, index$4_distanceFromCenter as distanceFromCenter, distanceFromExterior$1 as distanceFromExterior, edges$1 as edges, index$4_empty as empty, index$4_emptyPositioned as emptyPositioned, fromCenter$2 as fromCenter, index$4_fromElement as fromElement, fromNumbers$1 as fromNumbers, index$4_fromTopLeft as fromTopLeft, index$4_getEdgeX as getEdgeX, index$4_getEdgeY as getEdgeY, index$4_getRectPositionedParameter as getRectPositionedParameter, intersectsPoint$1 as intersectsPoint, isEqual$3 as isEqual, index$4_isEqualSize as isEqualSize, isIntersecting$1 as isIntersecting, lengths$1 as lengths, index$4_maxFromCorners as maxFromCorners, multiply$1 as multiply, multiplyScalar$2 as multiplyScalar, normaliseByRect$1 as normaliseByRect, perimeter$4 as perimeter, index$4_placeholder as placeholder, index$4_placeholderPositioned as placeholderPositioned, random$1 as random, randomPoint$2 as randomPoint, subtract$1 as subtract, sum$1 as sum, toArray$1 as toArray };
}

/**
 * Returns the distance between two circle centers.
 *
 * ```js
 * import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
 * const circleA = { radius: 5, x: 5, y: 5 }
 * const circleB = { radius: 10, x: 20, y: 20 }
 * const distance = Circles.distanceCenter(circleA, circleB);
 * ```
 * Throws an error if either is lacking position.
 * @param a
 * @param b
 * @returns Distance
 */
declare const distanceCenter: (a: CirclePositioned, b: CirclePositioned | Point) => number;

/**
 * Returns the distance between the exterior of two circles, or between the exterior of a circle and point.
 * If `b` overlaps or is enclosed by `a`, distance is 0.
 *
 * ```js
 * import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
 * const circleA = { radius: 5, x: 5, y: 5 }
 * const circleB = { radius: 10, x: 20, y: 20 }
 * const distance = Circles.distanceCenter(circleA, circleB);
 * ```
 * @param a
 * @param b
 */
declare const distanceFromExterior: (a: CirclePositioned, b: CirclePositioned | Point) => number;

/**
 * Throws if radius is out of range. If x,y is present, these will be validated too.
 * @param circle
 * @param paramName
 */
declare const guard$2: (circle: CirclePositioned | Circle, parameterName?: string) => void;
/**
 * Throws if `circle` is not positioned or has dodgy fields
 * @param circle
 * @param paramName
 * @returns
 */
declare const guardPositioned: (circle: CirclePositioned, parameterName?: string) => void;
/***
 * Returns true if radius, x or y are NaN
 */
declare const isNaN$1: (a: Circle | CirclePositioned) => boolean;
/**
 * Returns true if parameter has x,y. Does not verify if parameter is a circle or not
 *
 * ```js
 * import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
 *
 * const circleA = { radius: 5 };
 * Circles.isPositioned(circle); // false
 *
 * const circleB = { radius: 5, x: 10, y: 10 }
 * Circles.isPositioned(circle); // true
 * ```
 * @param p Circle
 * @returns
 */
declare const isPositioned: (p: Circle | Point) => p is Point;
declare const isCircle: (p: any) => p is Circle;
declare const isCirclePositioned: (p: any) => p is CirclePositioned;

/**
 * Returns a positioned version of a circle.
 * If circle is already positioned, it is returned.
 * If no default position is supplied, 0,0 is used.
 * @param circle
 * @param defaultPositionOrX
 * @param y
 * @returns
 */
declare const toPositioned: (circle: Circle | CirclePositioned, defaultPositionOrX?: Point | number, y?: number) => CirclePositioned;

/**
 * Yields the points making up the exterior (ie. circumference) of the circle.
 * Uses [Midpoint Circle Algorithm](http://en.wikipedia.org/wiki/Midpoint_circle_algorithm)
 *
 * @example Draw outline of circle
 * ```js
 * const circle = { x: 100, y: 100, radius: 50 }
 * for (const pt of Circles.exteriorIntegerPoints(circle)) {
 *  // Fill 1x1 pixel
 *  ctx.fillRect(pt.x, pt.y, 1, 1);
 * }
 * ```
 * @param circle
 */
declare function exteriorIntegerPoints(circle: CirclePositioned): IterableIterator<Point>;

/**
 * Returns all integer points contained within `circle`.
 *
 * ```js
 * const c = { x:100, y:100, radius:100 };
 * for (const pt of Circles.interiorIntegerPoints(c)) {
 *   ctx.fillRect(pt.x, pt.y, 1, 1);
 * }
 * ```
 * @param circle
 */
declare function interiorIntegerPoints(circle: CirclePositioned): IterableIterator<Point>;

/**
 * A circle
 */
type Circle = {
    readonly radius: number;
};
/**
 * A {@link Circle} with position
 */
type CirclePositioned = Point & Circle;
type CircularPath = Circle & Path & {
    readonly kind: `circular`;
};
/**
 * Returns a point on a circle at a specified angle in radians
 *
 * ```js
 * import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
 *
 * // Circle without position
 * const circleA = { radius: 5 };
 *
 * // Get point at angle Math.PI, passing in a origin coordinate
 * const ptA = Circles.point(circleA, Math.PI, {x: 10, y: 10 });
 *
 * // Point on circle with position
 * const circleB = { radius: 5, x: 10, y: 10};
 * const ptB = Circles.point(circleB, Math.PI);
 * ```
 * @param circle
 * @param angleRadian Angle in radians
 * @param Origin or offset of calculated point. By default uses center of circle or 0,0 if undefined
 * @returns Point oo circle
 */
declare const point: (circle: Circle | CirclePositioned, angleRadian: number, origin?: Point) => Point;
/**
 * Returns the center of a circle
 *
 * If the circle has an x,y, that is the center.
 * If not, `radius` is used as the x and y.
 *
 * ```js
 * import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
 * const circle = { radius: 5, x: 10, y: 10};
 *
 * // Yields: { x: 5, y: 10 }
 * Circles.center(circle);
 * ```
 *
 * It's a trivial function, but can make for more understandable code
 * @param circle
 * @returns Center of circle
 */
declare const center$1: (circle: CirclePositioned | Circle) => Readonly<{
    x: number;
    y: number;
}>;
/**
 * Computes relative position along circle
 *
 * ```js
 * import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
 * const circle = { radius: 100, x: 100, y: 100 };
 *
 * // Get a point halfway around circle
 * // Yields { x, y }
 * const pt = Circles.interpolate(circle, 0.5);
 * ```
 * @param circle
 * @param t Position, 0-1
 * @returns
 */
declare const interpolate$1: (circle: CirclePositioned, t: number) => Point;
/**
 * Returns circumference of `circle` (alias of {@link circumference})
 * @param circle
 * @returns
 */
declare const length: (circle: Circle) => number;
/**
 * Returns circumference of `circle` (alias of {@link length})
 * @param circle
 * @returns
 */
declare const circumference: (circle: Circle) => number;
/**
 * Returns the area of `circle`.
 * @param circle
 * @returns
 */
declare const area$4: (circle: Circle) => number;
/**
 * Computes a bounding box that encloses circle
 * @param circle
 * @returns
 */
declare const bbox$2: (circle: CirclePositioned | Circle) => RectPositioned | Rect;
/**
 * Returns true if the two objects have the same values
 *
 * ```js
 * const circleA = { radius: 10, x: 5, y: 5 };
 * const circleB = { radius: 10, x: 5, y: 5 };
 *
 * circleA === circleB; // false, because identity of objects is different
 * Circles.isEqual(circleA, circleB); // true, because values are the same
 * ```
 *
 * Circles must both be positioned or not.
 * @param a
 * @param b
 * @returns
 */
declare const isEqual$2: (a: CirclePositioned | Circle, b: CirclePositioned | Circle) => boolean;
type RandomPointOpts$1 = {
    readonly strategy?: `naive` | `uniform`;
    readonly randomSource?: RandomSource;
};
/**
 * Returns a random point within a circle.
 *
 * By default creates a uniform distribution.
 *
 * ```js
 * const pt = randomPoint({radius: 5});
 * const pt = randomPoint({radius: 5, x: 10, y: 20});
 * ```'
 *
 * Generate points with a gaussian distribution
 * ```js
 * const pt = randomPoint(circle, {
 *  randomSource: Random.gaussian
 * })
 * ```
 * @param within Circle to generate a point within
 * @param opts Options
 * @returns
 */
declare const randomPoint$1: (within: Circle | CirclePositioned, opts?: RandomPointOpts$1) => Point;
declare function multiplyScalar$1(a: CirclePositioned, value: number): CirclePositioned;
declare function multiplyScalar$1(a: Circle, value: number): Circle;
type ToSvg = {
    (circleOrRadius: Circle | number, sweep: boolean, origin: Point): ReadonlyArray<string>;
    (circle: CirclePositioned, sweep: boolean): ReadonlyArray<string>;
};
/**
 * Creates a SVG path segment.
 * @param a Circle or radius
 * @param sweep If true, path is 'outward'
 * @param origin Origin of path. Required if first parameter is just a radius or circle is non-positioned
 * @returns
 */
declare const toSvg: ToSvg;
/**
 * Returns the nearest point on `circle` closest to `point`.
 *
 * ```js
 * import { Circles } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const pt = Circles.nearest(circle, {x:10,y:10});
 * ```
 *
 * If an array of circles is provided, it will be the closest point amongst all the circles
 * @param circle Circle or array of circles
 * @param point
 * @returns Point `{ x, y }`
 */
declare const nearest: (circle: CirclePositioned | ReadonlyArray<CirclePositioned>, b: Point) => Point;
/**
 * Returns a `CircularPath` representation of a circle
 *
 * @param {CirclePositioned} circle
 * @returns {CircularPath}
 */
declare const toPath: (circle: CirclePositioned) => CircularPath;
/**
 * Returns the point(s) of intersection between a circle and line.
 *
 * ```js
 * import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
 * const circle = { radius: 5, x: 5, y: 5 };
 * const line = { a: { x: 0, y: 0 }, b: { x: 10, y: 10 } };
 * const pts = Circles.intersectionLine(circle, line);
 * ```
 * @param circle
 * @param line
 * @returns Point(s) of intersection, or empty array
 */
declare const intersectionLine: (circle: CirclePositioned, line: Line) => ReadonlyArray<Point>;

type index$3_Circle = Circle;
type index$3_CirclePositioned = CirclePositioned;
type index$3_CircularPath = CircularPath;
declare const index$3_circumference: typeof circumference;
declare const index$3_distanceCenter: typeof distanceCenter;
declare const index$3_distanceFromExterior: typeof distanceFromExterior;
declare const index$3_exteriorIntegerPoints: typeof exteriorIntegerPoints;
declare const index$3_guardPositioned: typeof guardPositioned;
declare const index$3_interiorIntegerPoints: typeof interiorIntegerPoints;
declare const index$3_intersectionLine: typeof intersectionLine;
declare const index$3_isCircle: typeof isCircle;
declare const index$3_isCirclePositioned: typeof isCirclePositioned;
declare const index$3_isPositioned: typeof isPositioned;
declare const index$3_length: typeof length;
declare const index$3_nearest: typeof nearest;
declare const index$3_point: typeof point;
declare const index$3_toPath: typeof toPath;
declare const index$3_toPositioned: typeof toPositioned;
declare const index$3_toSvg: typeof toSvg;
declare namespace index$3 {
  export { type index$3_Circle as Circle, type index$3_CirclePositioned as CirclePositioned, type index$3_CircularPath as CircularPath, type RandomPointOpts$1 as RandomPointOpts, area$4 as area, bbox$2 as bbox, center$1 as center, index$3_circumference as circumference, index$3_distanceCenter as distanceCenter, index$3_distanceFromExterior as distanceFromExterior, index$3_exteriorIntegerPoints as exteriorIntegerPoints, guard$2 as guard, index$3_guardPositioned as guardPositioned, index$3_interiorIntegerPoints as interiorIntegerPoints, interpolate$1 as interpolate, index$3_intersectionLine as intersectionLine, index$3_isCircle as isCircle, index$3_isCirclePositioned as isCirclePositioned, isEqual$2 as isEqual, isNaN$1 as isNaN, index$3_isPositioned as isPositioned, index$3_length as length, multiplyScalar$1 as multiplyScalar, index$3_nearest as nearest, index$3_point as point, randomPoint$1 as randomPoint, index$3_toPath as toPath, index$3_toPositioned as toPositioned, index$3_toSvg as toSvg };
}

/**
 * Throws an exception if the triangle is invalid
 * @param t
 * @param name
 */
declare const guard$1: (t: Triangle, name?: string) => void;

/**
 * Calculates the area of a triangle
 * @param t
 * @returns
 */
declare const area$3: (t: Triangle) => number;

/**
 * Returns the edges (ie sides) of the triangle as an array of lines
 * @param t
 * @returns Array of length three
 */
declare const edges: (t: Triangle) => PolyLine;

/**
 * Returns the largest circle touching the corners of triangle `t`.
 * @param t
 * @returns
 */
declare const outerCircle: (t: Triangle) => CirclePositioned;

/**
 * Calculates perimeter of a triangle
 * @param t
 * @returns
 */
declare const perimeter$3: (t: Triangle) => number;

type TriangleEquilateral = {
    readonly length: number;
} | number;
/**
 * Returns a positioned `Triangle` from an equilateral triangle definition.
 * By default the rotation is such that point `a` and `c` are lying on the horizontal,
 * and `b` is the upward-facing tip.
 *
 * Default is a triangle pointing upwards with b at the top, c to the left and b to right on the baseline.
 *
 * Example rotation values in radians:
 * * ▶️ 0: a and c on vertical, b at the tip
 * * ◀️ Math.PI: `c`and `a` are on vertical, with `b` at the tip.
 * * 🔽 Math.PI/2: `c` and `a` are on horizontal, `c` to the left. `b` at the bottom.
 * * 🔼 Math.PI*1.5: `c` and `a` are on horizontal, `c` to the right. `b` at the top. (default)
 * @param t
 * @param origin
 * @param rotationRad
 * @returns
 */
declare const fromCenter$1: (t: TriangleEquilateral, origin?: Point, rotationRad?: number) => Triangle;
/**
 * Calculate center from the given point A
 * @param t
 * @param ptA
 * @returns
 */
declare const centerFromA: (t: TriangleEquilateral, ptA?: Point) => Point;
/**
 * Calculate center from the given point B
 * @param t
 * @param ptB
 * @returns
 */
declare const centerFromB: (t: TriangleEquilateral, ptB?: Point) => Point;
/**
 * Calculate center from the given point C
 * @param t
 * @param ptC
 * @returns
 */
declare const centerFromC: (t: TriangleEquilateral, ptC?: Point) => Point;
/**
 * Returns the height (or rise) of an equilateral triangle.
 * Ie. from one vertex to the perpendicular edge.
 * (line marked x in the diagram below)
 *
 * ```
 *      .
 *     .x .
 *    . x  .
 *   .  x   .
 *  ..........
 * ```
 * @param t
 */
declare const height$2: (t: TriangleEquilateral) => number;
declare const perimeter$2: (t: TriangleEquilateral) => number;
declare const area$2: (t: TriangleEquilateral) => number;
/**
 * Circle that encompasses all points of triangle
 * @param t
 */
declare const circumcircle$2: (t: TriangleEquilateral) => Circle;
/**
 * Circle that is inside the edges of the triangle
 * @param t
 * @returns
 */
declare const incircle$2: (t: TriangleEquilateral) => Circle;

type Equilateral_TriangleEquilateral = TriangleEquilateral;
declare const Equilateral_centerFromA: typeof centerFromA;
declare const Equilateral_centerFromB: typeof centerFromB;
declare const Equilateral_centerFromC: typeof centerFromC;
declare namespace Equilateral {
  export { type Equilateral_TriangleEquilateral as TriangleEquilateral, area$2 as area, Equilateral_centerFromA as centerFromA, Equilateral_centerFromB as centerFromB, Equilateral_centerFromC as centerFromC, circumcircle$2 as circumcircle, fromCenter$1 as fromCenter, height$2 as height, incircle$2 as incircle, perimeter$2 as perimeter };
}

type Right = {
    readonly adjacent?: number;
    readonly hypotenuse?: number;
    readonly opposite?: number;
};
type DefinedRight = {
    readonly adjacent: number;
    readonly hypotenuse: number;
    readonly opposite: number;
};
/**
 * Returns a positioned triangle from a point for A.
 *
 * ```
 *             c (90 deg)
 *             .
 *          .   .
 *       .       .
 *    .           .
 * a .............. b
 * ```
 * @param t
 * @param origin
 * @returns
 */
declare const fromA$1: (t: Right, origin?: Point) => Triangle;
/**
 * Returns a positioned triangle from a point for B.
 *
 * ```
 *             c (90 deg)
 *             .
 *          .   .
 *       .       .
 *    .           .
 * a .............. b
 * ```
 * @param t
 * @param origin
 * @returns
 */
declare const fromB$1: (t: Right, origin?: Point) => Triangle;
/**
 * Returns a positioned triangle from a point for C.
 *
 * ```
 *             c (90 deg)
 *             .
 *          .   .
 *       .       .
 *    .           .
 * a .............. b
 * ```
 *
 *
 * ```js
 * // Triangle pointing up to 0,0 with sides of 15
 * Triangles.Right.fromC({ adjacent: 15, opposite:15 }, { x: 0, y: 0 });
 * ```
 * @param t
 * @param origin
 * @returns
 */
declare const fromC$1: (t: Right, origin?: Point) => Triangle;
/**
 * Returns a right triangle with all lengths defined.
 * At least two lengths must already exist
 * @param t
 * @returns
 */
declare const resolveLengths: (t: Right) => DefinedRight;
/**
 * Height of right-triangle
 * @param t
 * @returns
 */
declare const height$1: (t: Right) => number;
/**
 * Returns the lengths of the hypotenuse split into p and q segments.
 * In other words, if one makes a line from the right-angle vertex down to hypotenuse.
 *
 * [See here](https://rechneronline.de/pi/right-triangle.php)
 * @param t
 * @returns
 */
declare const hypotenuseSegments: (t: Right) => readonly [p: number, q: number];
declare const perimeter$1: (t: Right) => number;
declare const area$1: (t: Right) => number;
/**
 * Angle (in radians) between hypotenuse and adjacent edge
 * @param t
 * @returns
 */
declare const angleAtPointA: (t: Right) => number;
/**
 * Angle (in radians) between opposite edge and hypotenuse
 * @param t
 * @returns
 */
declare const angleAtPointB: (t: Right) => number;
/**
 * Returns the median line lengths a, b and c in an array.
 *
 * The median lines are the lines from each vertex to the center.
 *
 * @param t
 * @returns
 */
declare const medians$1: (t: Right) => readonly [a: number, b: number, c: number];
/**
 * The circle which passes through the points of the triangle
 * @param t
 * @returns
 */
declare const circumcircle$1: (t: Right) => Circle;
/**
 * Circle enclosed by triangle
 * @param t
 * @returns
 */
declare const incircle$1: (t: Right) => Circle;
/**
 * Returns the opposite length of a right-angle triangle,
 * marked here
 *
 * ```
 *    .  <
 *   ..  <
 * ....  <
 * ```
 *
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param adjacent
 * @returns
 */
declare const oppositeFromAdjacent: (angleRad: number, adjacent: number) => number;
/**
 * Returns the opposite length of a right-angle triangle,
 * marked here
 *
 * ```
 *    .  <
 *   ..  <
 * ....  <
 * ```
 *
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param hypotenuse
 * @returns
 */
declare const oppositeFromHypotenuse: (angleRad: number, hypotenuse: number) => number;
/**
 * Returns the adjecent length of a right-angle triangle,
 * marked here
 * ```
 *    .
 *   ..  o
 * ....
 * ^^^^
 * ```
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param adjacent
 * @returns
 */
declare const adjacentFromHypotenuse: (angleRad: number, hypotenuse: number) => number;
/**
 * Returns the adjecent length of a right-angle triangle,
 * marked here
 * ```
 *    .
 *   ..  o
 * ....
 * ^^^^
 * ```
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param opposite
 * @returns
 */
declare const adjacentFromOpposite: (angleRad: number, opposite: number) => number;
/**
 * Returns the hypotenuse length of a right-angle triangle,
 * marked here
 * ```
 *      .
 * >   ..
 * >  ...
 * > ....  opp
 *  .....
 *   adj
 * ```
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param adjacent
 * @returns
 */
declare const hypotenuseFromOpposite: (angleRad: number, opposite: number) => number;
/**
 * Returns the hypotenuse length of a right-angle triangle,
 * marked here
 * ```
 *      .
 * >   ..
 * >  ...
 * > ....  opp
 *  .....
 *   adj
 * ```
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param adjacent
 * @returns
 */
declare const hypotenuseFromAdjacent: (angleRad: number, adjacent: number) => number;

type Right$1_DefinedRight = DefinedRight;
type Right$1_Right = Right;
declare const Right$1_adjacentFromHypotenuse: typeof adjacentFromHypotenuse;
declare const Right$1_adjacentFromOpposite: typeof adjacentFromOpposite;
declare const Right$1_angleAtPointA: typeof angleAtPointA;
declare const Right$1_angleAtPointB: typeof angleAtPointB;
declare const Right$1_hypotenuseFromAdjacent: typeof hypotenuseFromAdjacent;
declare const Right$1_hypotenuseFromOpposite: typeof hypotenuseFromOpposite;
declare const Right$1_hypotenuseSegments: typeof hypotenuseSegments;
declare const Right$1_oppositeFromAdjacent: typeof oppositeFromAdjacent;
declare const Right$1_oppositeFromHypotenuse: typeof oppositeFromHypotenuse;
declare const Right$1_resolveLengths: typeof resolveLengths;
declare namespace Right$1 {
  export { type Right$1_DefinedRight as DefinedRight, type Right$1_Right as Right, Right$1_adjacentFromHypotenuse as adjacentFromHypotenuse, Right$1_adjacentFromOpposite as adjacentFromOpposite, Right$1_angleAtPointA as angleAtPointA, Right$1_angleAtPointB as angleAtPointB, area$1 as area, circumcircle$1 as circumcircle, fromA$1 as fromA, fromB$1 as fromB, fromC$1 as fromC, height$1 as height, Right$1_hypotenuseFromAdjacent as hypotenuseFromAdjacent, Right$1_hypotenuseFromOpposite as hypotenuseFromOpposite, Right$1_hypotenuseSegments as hypotenuseSegments, incircle$1 as incircle, medians$1 as medians, Right$1_oppositeFromAdjacent as oppositeFromAdjacent, Right$1_oppositeFromHypotenuse as oppositeFromHypotenuse, perimeter$1 as perimeter, Right$1_resolveLengths as resolveLengths };
}

type Isosceles = {
    readonly legs: number;
    readonly base: number;
};
declare const baseAngle: (t: Isosceles) => number;
declare const apexAngle: (t: Isosceles) => number;
declare const height: (t: Isosceles) => number;
declare const legHeights: (t: Isosceles) => number;
declare const perimeter: (t: Isosceles) => number;
declare const area: (t: Isosceles) => number;
declare const circumcircle: (t: Isosceles) => Circle;
declare const incircle: (t: Isosceles) => Circle;
declare const medians: (t: Isosceles) => readonly [
    a: number,
    b: number,
    c: number
];
/**
 * Returns a positioned `Triangle` based on a center origin.
 * Center is determined by the intesecting of the medians.
 *
 * See: https://rechneronline.de/pi/isosceles-triangle.php
 * @param t
 * @param origin
 * @returns
 */
declare const fromCenter: (t: Isosceles, origin?: Point) => Triangle;
declare const fromA: (t: Isosceles, origin?: Point) => Triangle;
declare const fromB: (t: Isosceles, origin?: Point) => Triangle;
declare const fromC: (t: Isosceles, origin?: Point) => Triangle;

type Isosceles$1_Isosceles = Isosceles;
declare const Isosceles$1_apexAngle: typeof apexAngle;
declare const Isosceles$1_area: typeof area;
declare const Isosceles$1_baseAngle: typeof baseAngle;
declare const Isosceles$1_circumcircle: typeof circumcircle;
declare const Isosceles$1_fromA: typeof fromA;
declare const Isosceles$1_fromB: typeof fromB;
declare const Isosceles$1_fromC: typeof fromC;
declare const Isosceles$1_fromCenter: typeof fromCenter;
declare const Isosceles$1_height: typeof height;
declare const Isosceles$1_incircle: typeof incircle;
declare const Isosceles$1_legHeights: typeof legHeights;
declare const Isosceles$1_medians: typeof medians;
declare const Isosceles$1_perimeter: typeof perimeter;
declare namespace Isosceles$1 {
  export { type Isosceles$1_Isosceles as Isosceles, Isosceles$1_apexAngle as apexAngle, Isosceles$1_area as area, Isosceles$1_baseAngle as baseAngle, Isosceles$1_circumcircle as circumcircle, Isosceles$1_fromA as fromA, Isosceles$1_fromB as fromB, Isosceles$1_fromC as fromC, Isosceles$1_fromCenter as fromCenter, Isosceles$1_height as height, Isosceles$1_incircle as incircle, Isosceles$1_legHeights as legHeights, Isosceles$1_medians as medians, Isosceles$1_perimeter as perimeter };
}

/**
* Triangle.
*
* Helpers for creating:
*  - {@link Triangles.fromFlatArray}: Create from [x1, y1, x2, y2, x3, y3]
*  - {@link Triangles.fromPoints}: Create from three `{x,y}` sets
*  - {@link Triangles.fromRadius}: Equilateral triangle of a given radius and center
*/
type Triangle = {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;
};
/**
 * A triangle consisting of three empty points (Points.Empty)
 */
declare const Empty$1: Readonly<{
    a: {
        x: number;
        y: number;
    };
    b: {
        x: number;
        y: number;
    };
    c: {
        x: number;
        y: number;
    };
}>;
/**
 * A triangle consisting of three placeholder points (Points.Placeholder)
 */
declare const Placeholder$1: Readonly<{
    a: {
        x: number;
        y: number;
    };
    b: {
        x: number;
        y: number;
    };
    c: {
        x: number;
        y: number;
    };
}>;
/**
 * Returns true if triangle is empty
 * @param t
 * @returns
 */
declare const isEmpty$1: (t: Triangle) => boolean;
/**
 * Returns true if triangle is a placeholder
 * @param t
 * @returns
 */
declare const isPlaceholder$1: (t: Triangle) => boolean;
/**
 * Applies `fn` to each of a triangle's corner points, returning the result.
 *
 * @example Add some random to the x of each corner
 * ```
 * const t = apply(tri, p => {
 *  const r = 10;
 *  return {
 *    x: p.x + (Math.random()*r*2) - r,
 *    y: p.y
 *  }
 * });
 * ```
 * @param t
 * @param fn
 * @returns
 */
declare const apply$1: (t: Triangle, fn: (p: Point, label?: string) => Point) => Readonly<Triangle>;
/**
 * Returns true if the parameter appears to be a valid triangle
 * @param p
 * @returns
 */
declare const isTriangle: (p: unknown) => p is Triangle;
/**
 * Returns true if the two parameters have equal values
 * @param a
 * @param b
 * @returns
 */
declare const isEqual$1: (a: Triangle, b: Triangle) => boolean;
/**
 * Returns the corners (vertices) of the triangle as an array of points
 * @param t
 * @returns Array of length three
 */
declare const corners: (t: Triangle) => ReadonlyArray<Point>;
/**
 * Returns the lengths of the triangle sides
 * @param t
 * @returns Array of length three
 */
declare const lengths: (t: Triangle) => ReadonlyArray<number>;
/**
 * Return the three interior angles of the triangle, in radians.
 * @param t
 * @returns
 */
declare const angles: (t: Triangle) => ReadonlyArray<number>;
/**
 * Returns the three interior angles of the triangle, in degrees
 * @param t
 * @returns
 */
declare const anglesDegrees: (t: Triangle) => ReadonlyArray<number>;
/**
 * Returns true if it is an equilateral triangle
 * @param t
 * @returns
 */
declare const isEquilateral: (t: Triangle) => boolean;
/**
 * Returns true if it is an isosceles triangle
 * @param t
 * @returns
 */
declare const isIsosceles: (t: Triangle) => boolean;
/**
 * Returns true if at least one interior angle is 90 degrees
 * @param t
 * @returns
 */
declare const isRightAngle: (t: Triangle) => boolean;
/**
 * Returns true if triangle is oblique: No interior angle is 90 degrees
 * @param t
 * @returns
 */
declare const isOblique: (t: Triangle) => boolean;
/**
 * Returns true if triangle is actue: all interior angles less than 90 degrees
 * @param t
 * @returns
 */
declare const isAcute: (t: Triangle) => boolean;
/**
 * Returns true if triangle is obtuse: at least one interior angle is greater than 90 degrees
 * @param t
 * @returns
 */
declare const isObtuse: (t: Triangle) => boolean;
/**
 * Returns simple centroid of triangle
 * @param t
 * @returns
 */
declare const centroid$1: (t: Triangle) => Point;
/**
 * Returns the largest circle enclosed by triangle `t`.
 * @param t
 */
declare const innerCircle: (t: Triangle) => CirclePositioned;
/**
 * Returns an equilateral triangle centered at the origin.
 *
 * ```js
 * // Create a triangle at 100,100 with radius of 60
 * const tri = fromRadius({x:100,y:100}, 60);
 *
 * // Triangle with point A upwards, B to the right, C to the left
 * constr tri2 = fromRadius({x:100,y:100}, 60, {initialAngleRadian: -Math.PI / 2});
 * ```
 *
 *
 * @param origin Origin
 * @param radius Radius of triangle
 * @param opts Options
 */
declare const fromRadius: (origin: Point, radius: number, opts?: {
    readonly initialAngleRadian?: number;
}) => Triangle;
/**
 * Rotates the vertices of the triangle around one point (by default, `b`).
 * @param triangle Triangle
 * @param vertex Name of vertex: a, b or c.
 */
declare const rotateByVertex: (triangle: Triangle, amountRadian: number, vertex?: `a` | `b` | `c`) => Triangle;
/**
 * Returns a triangle anchored at `origin` with a given `length` and `angleRadian`.
 * The origin will be point `b` of the triangle, and the angle will be the angle for b.
 * @param origin Origin
 * @param length Length
 * @param angleRadian Angle
 * @returns
 */
declare const equilateralFromVertex: (origin?: Point, length?: number, angleRadian?: number) => Triangle;
/**
 * Returns the coordinates of triangle in a flat array form:
 * [xA, yA, xB, yB, xC, yC]
 * @param t
 * @returns
 */
declare const toFlatArray: (t: Triangle) => ReadonlyArray<number>;
/**
 * Returns a triangle from a set of coordinates in a flat array form:
 * [xA, yA, xB, yB, xC, yC]
 * @param coords
 * @returns
 */
declare const fromFlatArray: (coords: ReadonlyArray<number>) => Triangle;
/**
 * Returns a triangle from an array of three points
 * @param points
 * @returns
 */
declare const fromPoints: (points: ReadonlyArray<Point>) => Triangle;
/**
 * Returns the bounding box that encloses the triangle.
 * @param t
 * @param inflation If specified, box will be inflated by this much. Default: 0.
 * @returns
 */
declare const bbox$1: (t: Triangle, inflation?: number) => RectPositioned;
type BarycentricCoord = {
    readonly a: number;
    readonly b: number;
    readonly c: number;
};
/**
 * Returns the [Barycentric coordinate](https://en.wikipedia.org/wiki/Barycentric_coordinate_system) of a point within a triangle
 *
 * @param t
 * @param a
 * @param b
 * @returns
 */
declare const barycentricCoord: (t: Triangle, a: Point | number, b?: number) => BarycentricCoord;
/**
 * Convert Barycentric coordinate to Cartesian
 * @param t
 * @param bc
 * @returns
 */
declare const barycentricToCartestian: (t: Triangle, bc: BarycentricCoord) => Point;
/**
 * Returns true if point is within or on the boundary of triangle
 * @param t
 * @param a
 * @param b
 */
declare const intersectsPoint: (t: Triangle, a: Point | number, b?: number) => boolean;
/**
 * Returns a triangle that is rotated by `angleRad`. By default it rotates
 * around its center but an arbitrary `origin` point can be provided.
 *
 * ```js
 * // Rotate triangle by 5 degrees
 * rotate(triangle, degreeToRadian(5));
 *
 * // Rotate by 90 degrees
 * rotate(triangle, Math.PI / 2);
 * ```
 * @param line Line to rotate
 * @param amountRadian Angle in radians to rotate by
 * @param origin Point to rotate around. If undefined, middle of line will be used
 * @returns
 */
declare const rotate$1: (t: Triangle, amountRadian?: number, origin?: Point) => Triangle;

type index$2_BarycentricCoord = BarycentricCoord;
declare const index$2_Equilateral: typeof Equilateral;
type index$2_Triangle = Triangle;
declare const index$2_angles: typeof angles;
declare const index$2_anglesDegrees: typeof anglesDegrees;
declare const index$2_barycentricCoord: typeof barycentricCoord;
declare const index$2_barycentricToCartestian: typeof barycentricToCartestian;
declare const index$2_corners: typeof corners;
declare const index$2_edges: typeof edges;
declare const index$2_equilateralFromVertex: typeof equilateralFromVertex;
declare const index$2_fromFlatArray: typeof fromFlatArray;
declare const index$2_fromPoints: typeof fromPoints;
declare const index$2_fromRadius: typeof fromRadius;
declare const index$2_innerCircle: typeof innerCircle;
declare const index$2_intersectsPoint: typeof intersectsPoint;
declare const index$2_isAcute: typeof isAcute;
declare const index$2_isEquilateral: typeof isEquilateral;
declare const index$2_isIsosceles: typeof isIsosceles;
declare const index$2_isOblique: typeof isOblique;
declare const index$2_isObtuse: typeof isObtuse;
declare const index$2_isRightAngle: typeof isRightAngle;
declare const index$2_isTriangle: typeof isTriangle;
declare const index$2_lengths: typeof lengths;
declare const index$2_outerCircle: typeof outerCircle;
declare const index$2_rotateByVertex: typeof rotateByVertex;
declare const index$2_toFlatArray: typeof toFlatArray;
declare namespace index$2 {
  export { type index$2_BarycentricCoord as BarycentricCoord, Empty$1 as Empty, index$2_Equilateral as Equilateral, Isosceles$1 as Isosceles, Placeholder$1 as Placeholder, Right$1 as Right, type index$2_Triangle as Triangle, index$2_angles as angles, index$2_anglesDegrees as anglesDegrees, apply$1 as apply, area$3 as area, index$2_barycentricCoord as barycentricCoord, index$2_barycentricToCartestian as barycentricToCartestian, bbox$1 as bbox, centroid$1 as centroid, index$2_corners as corners, index$2_edges as edges, index$2_equilateralFromVertex as equilateralFromVertex, index$2_fromFlatArray as fromFlatArray, index$2_fromPoints as fromPoints, index$2_fromRadius as fromRadius, guard$1 as guard, index$2_innerCircle as innerCircle, index$2_intersectsPoint as intersectsPoint, index$2_isAcute as isAcute, isEmpty$1 as isEmpty, isEqual$1 as isEqual, index$2_isEquilateral as isEquilateral, index$2_isIsosceles as isIsosceles, index$2_isOblique as isOblique, index$2_isObtuse as isObtuse, isPlaceholder$1 as isPlaceholder, index$2_isRightAngle as isRightAngle, index$2_isTriangle as isTriangle, index$2_lengths as lengths, index$2_outerCircle as outerCircle, perimeter$3 as perimeter, rotate$1 as rotate, index$2_rotateByVertex as rotateByVertex, index$2_toFlatArray as toFlatArray };
}

type ContainsResult = `none` | `contained`;
type ShapePositioned = CirclePositioned | RectPositioned;
type Sphere = Point3d & {
    readonly radius: number;
};
type PointCalculableShape = PolyLine | Line | RectPositioned | Point | CirclePositioned;
/**
 * Returns the intersection result between a and b.
 * @param a
 * @param b
 */
declare const isIntersecting: (a: ShapePositioned, b: ShapePositioned | Point) => boolean;
type RandomPointOpts = {
    readonly randomSource?: RandomSource;
    readonly margin?: Point;
};
declare const randomPoint: (shape: ShapePositioned, opts?: RandomPointOpts) => Point;
/**
 * Returns the center of a shape
 * Shape can be: rectangle, triangle, circle
 * @param shape
 * @returns
 */
declare const center: (shape?: Rect | Triangle | Circle) => Point;
/**
 * Generates a starburst shape, returning an array of points. By default, initial point is top and horizontally-centred.
 *
 * ```
 * // Generate a starburst with four spikes
 * const pts = starburst(4, 100, 200);
 * ```
 *
 * `points` of two produces a lozenge shape.
 * `points` of three produces a triangle shape.
 * `points` of five is the familiar 'star' shape.
 *
 * Note that the path will need to be closed back to the first point to enclose the shape.
 *
 * @example Create starburst and draw it. Note use of 'loop' flag to close the path
 * ```
 * const points = starburst(4, 100, 200);
 * Drawing.connectedPoints(ctx, pts, {loop: true, fillStyle: `orange`, strokeStyle: `red`});
 * ```
 *
 * Options:
 * * initialAngleRadian: angle offset to begin from. This overrides the `-Math.PI/2` default.
 *
 * @param points Number of points in the starburst. Defaults to five, which produces a typical star
 * @param innerRadius Inner radius. A proportionally smaller inner radius makes for sharper spikes. If unspecified, 50% of the outer radius is used.
 * @param outerRadius Outer radius. Maximum radius of a spike to origin
 * @param opts Options
 * @param origin Origin, or `{ x:0, y:0 }` by default.
 */
declare const starburst: (outerRadius: number, points?: number, innerRadius?: number, origin?: Point, opts?: {
    readonly initialAngleRadian?: number;
}) => ReadonlyArray<Point>;
type ArrowOpts = {
    readonly arrowSize?: number;
    readonly tailLength?: number;
    readonly tailThickness?: number;
    readonly angleRadian?: number;
};
/**
 * Returns the points forming an arrow.
 *
 * @example Create an arrow anchored by its tip at 100,100
 * ```js
 * const opts = {
 *  tailLength: 10,
 *  arrowSize: 20,
 *  tailThickness: 5,
 *  angleRadian: degreeToRadian(45)
 * }
 * const arrow = Shapes.arrow({x:100, y:100}, `tip`, opts); // Yields an array of points
 *
 * // Eg: draw points
 * Drawing.connectedPoints(ctx, arrow, {strokeStyle: `red`, loop: true});
 * ```
 *
 * @param origin Origin of arrow
 * @param from Does origin describe the tip, tail or middle?
 * @param opts Options for arrow
 * @returns
 */
declare const arrow: (origin: Point, from: `tip` | `tail` | `middle`, opts?: ArrowOpts) => ReadonlyArray<Point>;

type index$1_ArrowOpts = ArrowOpts;
type index$1_ContainsResult = ContainsResult;
type index$1_PointCalculableShape = PointCalculableShape;
type index$1_RandomPointOpts = RandomPointOpts;
type index$1_ShapePositioned = ShapePositioned;
type index$1_Sphere = Sphere;
declare const index$1_arrow: typeof arrow;
declare const index$1_center: typeof center;
declare const index$1_isIntersecting: typeof isIntersecting;
declare const index$1_randomPoint: typeof randomPoint;
declare const index$1_starburst: typeof starburst;
declare namespace index$1 {
  export { type index$1_ArrowOpts as ArrowOpts, type index$1_ContainsResult as ContainsResult, type index$1_PointCalculableShape as PointCalculableShape, type index$1_RandomPointOpts as RandomPointOpts, type index$1_ShapePositioned as ShapePositioned, type index$1_Sphere as Sphere, index$1_arrow as arrow, index$1_center as center, index$1_isIntersecting as isIntersecting, index$1_randomPoint as randomPoint, index$1_starburst as starburst };
}

/**
 * Returns the distance from point `a` to the center of `shape`.
 * @param a Point
 * @param shape Point, or a positioned Rect or Circle.
 * @returns
 */
declare const distanceToCenter: (a: Point, shape: PointCalculableShape) => number;

/**
 * Returns the distance from point `a` to the exterior of `shape`.
 *
 * @example Distance from point to rectangle
 * ```
 * const distance = distanceToExterior(
 *  {x: 50, y: 50},
 *  {x: 100, y: 100, width: 20, height: 20}
 * );
 * ```
 *
 * @example Find closest shape to point
 * ```
 * import {minIndex} from '../collections/arrays.js';
 * const shapes = [ some shapes... ]; // Shapes to compare against
 * const pt = { x: 10, y: 10 };       // Comparison point
 * const distances = shapes.map(v => distanceToExterior(pt, v));
 * const closest = shapes[minIndex(...distances)];
 * ```
 * @param a Point
 * @param shape Point, or a positioned Rect or Circle.
 * @returns
 */
declare const distanceToExterior: (a: Point, shape: PointCalculableShape) => number;

declare function distance(a: Point, b?: Point): number;
declare function distance(a: Point, x: number, y: number): number;

/**
 * Throws an error if point is invalid
 * @param p
 * @param name
 */
declare function guard(p: Point, name?: string): void;
/**
 * Throws if parameter is not a valid point, or either x or y is 0
 * @param pt
 * @returns
 */
declare const guardNonZeroPoint: (pt: Point | Point3d, name?: string) => boolean;
declare function isPoint(p: number | unknown): p is Point;
declare const isPoint3d: (p: Point | unknown) => p is Point3d;
/**
 * Returns true if both x and y is 0.
 * Use `Points.Empty` to return an empty point.
 * @param p
 * @returns
 */
declare const isEmpty: (p: Point) => boolean;
/**
 * Returns true if point is a placeholder, where both x and y
 * are `NaN`.
 *
 * Use Points.Placeholder to return a placeholder point.
 * @param p
 * @returns
 */
declare const isPlaceholder: (p: Point) => boolean;

/**
 * A point, consisting of x, y and maybe z fields.
 */
type Point = {
    readonly x: number;
    readonly y: number;
    readonly z?: number;
};
type Point3d = Point & {
    readonly z: number;
};
type PointRelation = (a: Point | number, b?: number) => PointRelationResult;
type PointRelationResult = {
    /**
     * Angle from start
     */
    readonly angle: number;
    /**
     * Distance from start
     */
    readonly distanceFromStart: number;
    /**
     * Distance from last compared point
     */
    readonly distanceFromLast: number;
    /**
     * Center point from start
     */
    readonly centroid: Point;
    /**
     * Average of all points seen
     * This is calculated by summing x,y and dividing by total points
     */
    readonly average: Point;
    /**
     * Speed. Distance/millisecond from one sample to the next.
     */
    readonly speed: number;
};
/**
 * Returns a Point form of either a point, x,y params or x,y,z params.
 * If parameters are undefined, an empty point is returned (0, 0)
 * @ignore
 * @param a
 * @param b
 * @returns
 */
declare function getPointParameter(a?: Point | number | Array<number> | ReadonlyArray<number>, b?: number | boolean, c?: number): Point | Point3d;
declare const dotProduct: (...pts: ReadonlyArray<Point>) => number;
/**
 * An empty point of `{ x:0, y:0 }`.
 *
 * Use `isEmpty` to check if a point is empty.
 */
declare const Empty: {
    readonly x: 0;
    readonly y: 0;
};
/**
 * Placeholder point, where x and y is `NaN`.
 * Use `isPlaceholder` to check if a point is a placeholder.
 */
declare const Placeholder: Readonly<{
    x: number;
    y: number;
}>;
/**
 * Returns true if p.x and p.y === null
 * @param p
 * @returns
 */
declare const isNull: (p: Point) => boolean;
/***
 * Returns true if p.x or p.y isNaN
 */
declare const isNaN: (p: Point) => boolean;
/**
 * Returns the 'minimum' point from an array of points, using a comparison function.
 *
 * @example Find point closest to a coordinate
 * ```js
 * const points = [...];
 * const center = {x: 100, y: 100};
 *
 * const closestToCenter = findMinimum((a, b) => {
 *  const aDist = distance(a, center);
 *  const bDist = distance(b, center);
 *  if (aDistance < bDistance) return a;
 *  return b;
 * }, points);
 * ```
 * @param comparer Compare function returns the smallest of `a` or `b`
 * @param points
 * @returns
 */
declare const findMinimum: (comparer: (a: Point, b: Point) => Point, ...points: ReadonlyArray<Point>) => Point;
/**
 * Returns the left-most of the provided points.
 *
 * Same as:
 * ```js
 * findMinimum((a, b) => {
 *  if (a.x <= b.x) return a;
 *  return b;
 *}, ...points)
 * ```
 *
 * @param points
 * @returns
 */
declare const leftmost: (...points: ReadonlyArray<Point>) => Point;
/**
 * Returns the right-most of the provided points.
 *
 * Same as:
 * ```js
 * findMinimum((a, b) => {
 *  if (a.x >= b.x) return a;
 *  return b;
 *}, ...points)
 * ```
 *
 * @param points
 * @returns
 */
declare const rightmost: (...points: ReadonlyArray<Point>) => Point;
/**
 * Returns a point with Math.abs applied to x and y.
 * ```js
 * Points.abs({ x:1,  y:1  }); // { x: 1, y: 1 }
 * Points.abs({ x:-1, y:1  }); // { x: 1, y: 1 }
 * Points.abs({ x:-1, y:-1 }); // { x: 1, y: 1 }
 * ```
 * @param pt
 * @returns
 */
declare const abs: (pt: Point) => {
    x: number;
    y: number;
    z?: number | undefined;
};
/**
 * Returns the angle in radians between `a` and `b`.
 *
 * Eg if `a` is the origin, and `b` is another point,
 * in degrees one would get 0 to -180 when `b` was above `a`.
 *  -180 would be `b` in line with `a`.
 * Same for under `a`.
 *
 * Providing a third point `c` gives the interior angle, where `b` is the middle point.
 * @param a
 * @param b
 * @param c
 * @returns
 */
declare const angle: (a: Point, b?: Point, c?: Point) => number;
/**
 * Calculates the [centroid](https://en.wikipedia.org/wiki/Centroid#Of_a_finite_set_of_points) of a set of points
 * Undefined values are skipped over.
 *
 * ```js
 * // Find centroid of a list of points
 * const c1 = centroid(p1, p2, p3, ...);
 *
 * // Find centroid of an array of points
 * const c2 = centroid(...pointsArray);
 * ```
 * @param points
 * @returns A single point
 */
declare const centroid: (...points: ReadonlyArray<Point | undefined>) => Point;
/**
 * Returns the minimum rectangle that can enclose all provided points
 * @param points
 * @returns
 */
declare const bbox: (...points: ReadonlyArray<Point>) => RectPositioned;
/**
 * Returns point as an array in the form [x,y]. This can be useful for some libraries
 * that expect points in array form.
 *
 * ```
 * const p = {x: 10, y:5};
 * const p2 = toArray(p); // yields [10,5]
 * ```
 * @param p
 * @returns
 */
declare const toArray: (p: Point) => ReadonlyArray<number>;
/**
 * Returns a human-friendly string representation `(x, y)`.
 * If `precision` is supplied, this will be the number of significant digits.
 * @param p
 * @returns
 */
declare function toString(p: Point, digits?: number): string;
/**
 * Returns _true_ if the points have identical values
 *
 * ```js
 * const a = {x: 10, y: 10};
 * const b = {x: 10, y: 10;};
 * a === b        // False, because a and be are different objects
 * isEqual(a, b)   // True, because a and b are same value
 * ```
 * @param a
 * @param b
 * @returns _True_ if points are equal
 */
declare const isEqual: (...p: ReadonlyArray<Point>) => boolean;
/**
 * Returns true if two points are within a specified range on both axes.
 *
 * Provide a point for the range to set different x/y range, or pass a number
 * to use the same range for both axis.
 *
 * Note this simply compares x,y values it does not calcuate distance.
 *
 * @example
 * ```js
 * withinRange({x:100,y:100}, {x:101, y:101}, 1); // True
 * withinRange({x:100,y:100}, {x:105, y:101}, {x:5, y:1}); // True
 * withinRange({x:100,y:100}, {x:105, y:105}, {x:5, y:1}); // False - y axis too far
 * ```
 * @param a
 * @param b
 * @param maxRange
 * @returns
 */
declare const withinRange: (a: Point, b: Point, maxRange: Point | number) => boolean;
/**
 * Returns a relative point between two points
 * ```js
 * interpolate(0.5, a, b); // Halfway point between a and b
 * ```
 *
 * Alias for Lines.interpolate(amount, a, b);
 *
 * @param amount Relative amount, 0-1
 * @param a
 * @param b
 * @param allowOverflow If true, length of line can be exceeded for `amount` of below 0 and above `1`.
 * @returns {@link Point}
 */
declare const interpolate: (amount: number, a: Point, b: Point, allowOverflow?: boolean) => Point;
/**
 * Returns a point from two coordinates or an array of [x,y]
 * @example
 * ```js
 * let p = from([10, 5]); // yields {x:10, y:5}
 * let p = from(10, 5);   // yields {x:10, y:5}
 * let p = from(10);      // yields {x:10, y:0} 0 is used for default y
 * let p = from();        // yields {x:0, y:0}  0 used for default x & y
 * ```
 * @param xOrArray
 * @param [y]
 * @returns Point
 */
declare const from: (xOrArray?: number | ReadonlyArray<number>, y?: number) => Point;
/**
 * Returns an array of points from an array of numbers.
 *
 * Array can be a continuous series of x, y values:
 * ```
 * [1,2,3,4] would yield: [{x:1, y:2}, {x:3, y:4}]
 * ```
 *
 * Or it can be an array of arrays:
 * ```
 * [[1,2], [3,4]] would yield: [{x:1, y:2}, {x:3, y:4}]
 * ```
 * @param coords
 * @returns
 */
declare const fromNumbers: (...coords: ReadonlyArray<ReadonlyArray<number>> | ReadonlyArray<number>) => ReadonlyArray<Point>;
/**
 * Returns `a` minus `b`
 *
 * ie.
 * ```js
 * return {
 *   x: a.x - b.x,
 *   y: a.y - b.y
 * };
 * ```
 * @param a Point a
 * @param b Point b
 * @returns Point
 */
declare function subtract(a: Point, b: Point): Point;
/**
 * Returns `a` minus the given coordinates.
 *
 * ie:
 * ```js
 * return {
 *  x: a.x - x,
 *  y: a.y - y
 * }
 * ```
 * @param a Point
 * @param x X coordinate
 * @param y Y coordinate (if omitted, x is used as well)
 */
declare function subtract(a: Point, x: number, y?: number): Point;
/**
 * Subtracts two sets of x,y pairs.
 *
 * If first parameter is a Point, any additional properties of it
 * are included in returned Point.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
declare function subtract(x1: number, y1: number, x2: number, y2: number): Point;
/**
 * Applies `fn` on `x` and `y` fields, returning all other fields as well
 * ```js
 * const p = {x:1.234, y:4.9};
 * const p2 = Points.apply(p, Math.round);
 * // Yields: {x:1, y:5}
 * ```
 *
 * The name of the field is provided as well. Here we only round the `x` field:
 *
 * ```js
 * const p = {x:1.234, y:4.9};
 * const p2 = Points.apply(p, (v, field) => {
 *  if (field === `x`) return Math.round(v);
 *  return v;
 * });
 * ```
 * @param pt
 * @param fn
 * @returns
 */
declare const apply: (pt: Point, fn: (v: number, field?: string) => number) => Point;
/**
 * Runs a sequential series of functions on `pt`. The output from one feeding into the next.
 * ```js
 * const p = Points.pipelineApply(somePoint, Points.normalise, Points.invert);
 * ```
 *
 * If you want to make a reusable pipeline of functions, consider {@link pipeline} instead.
 * @param pt
 * @param pipeline
 * @returns
 */
declare const pipelineApply: (pt: Point, ...pipelineFns: readonly ((pt: Point) => Point)[]) => Point;
/**
 * Returns a pipeline function that takes a point to be transformed through a series of functions
 * ```js
 * // Create pipeline
 * const p = Points.pipeline(Points.normalise, Points.invert);
 *
 * // Now run it on `somePoint`.
 * // First we normalised, and then invert
 * const changedPoint = p(somePoint);
 * ```
 *
 * If you don't want to create a pipeline, use {@link pipelineApply}.
 * @param pipeline Pipeline of functions
 * @returns
 */
declare const pipeline: (...pipeline: readonly ((pt: Point) => Point)[]) => (pt: Point) => Point;
/**
 * Reduces over points, treating _x_ and _y_ separately.
 *
 * ```
 * // Sum x and y values
 * const total = Points.reduce(points, (p, acc) => {
 *  return {x: p.x + acc.x, y: p.y + acc.y}
 * });
 * ```
 * @param pts Points to reduce
 * @param fn Reducer
 * @param initial Initial value, uses `{ x:0, y:0 }` by default
 * @returns
 */
declare const reduce: (pts: ReadonlyArray<Point>, fn: (p: Point, accumulated: Point) => Point, initial?: Point) => Point;
type Sum = {
    /**
     * Adds two sets of coordinates. If y is omitted, the parameter for x is added to both x and y
     */
    (aX: number, aY: number, bX: number, bY: number): Point;
    /**
     * Add x,y to a
     */
    (a: Point, x: number, y?: number): Point;
    /**
     * Add two points
     */
    (a: Point, b?: Point): Point;
};
/**
 * Returns a Point of `a` plus `b`. ie:
 *
 * ```js
 * return {
 *   x: a.x + b.x,
 *   y: a.y + b.y
 * };
 * ```
 *
 * Usage:
 *
 * ```js
 * sum(ptA, ptB);
 * sum(x1, y1, x2, y2);
 * sum(ptA, x2, y2);
 * sum(ptA, xAndY);
 * ```
 */
declare const sum: Sum;
/**
 * Multiply by a width,height or x,y
 * ```
 * return {
 *  x: a.x * rect.width,
 *  y: a.y * rect.height
 * };
 * ```
 * @param a
 * @param rectOrPoint
 */
declare function multiply(a: Point, rectOrPoint: Rect | Point): Point;
/**
 * Returns `a` multipled by some x and/or y scaling factor
 *
 * ie.
 * ```js
 * return {
 *  x: a.x * x
 *   y: a.y * y
 * }
 * ```
 *
 * Usage:
 * ```js
 * multiply(pt, 10, 100); // Scale pt by x:10, y:100
 * multiply(pt, Math.min(window.innerWidth, window.innerHeight)); // Scale both x,y by viewport with or height, whichever is smaller
 * ```
 * @export
 * @parama Point to scale
 * @param x Scale factor for x axis
 * @param [y] Scale factor for y axis (if not specified, the x value is used)
 * @returns Scaled point
 */
declare function multiply(a: Point, x: number, y?: number): Point;
/**
 * Multiplies all components by `v`.
 * Existing properties of `pt` are maintained.
 *
 * ```js
 * multiplyScalar({ x:2, y:4 }, 2);
 * // Yields: { x:4, y:8 }
 * ```
 * @param pt Point
 * @param v Value to multiply by
 * @returns
 */
declare const multiplyScalar: (pt: Point | Point3d, v: number) => Point | Point3d;
/**
 * Divides point a by rectangle:
 * ```js
 * return {
 *  x: a.x / rect.width,
 *  y: a.y / rect.hight
 * };
 * ```
 *
 * Or point:
 * ```js
 * return {
 *  x: a.x / b.x,
 *  y: a.y / b.y
 * }
 * ```
 *
 *
 * Dividing by zero will give Infinity for that dimension.
 * @param a
 * @param rectOrPoint
 */
declare function divide(a: Point, rectOrPoint: Rect | Point): Point;
/**
 * Divides a point by x,y.
 * ```js
 * return {
 *  x: a.x / x,
 *  y: b.y / y
 * };
 * ```
 *
 * Dividing by zero will give Infinity for that dimension.
 * @param a Point
 * @param x X divisor
 * @param y Y divisor. If unspecified, x divisor is used.
 */
declare function divide(a: Point, x: number, y?: number): Point;
/**
 * Divides two sets of points:
 * ```js
 * return {
 *  x: x1 / x2,
 *  y: y1 / y2
 * };
 * ```
 *
 * Dividing by zero will give Infinity for that dimension.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
declare function divide(x1: number, y1: number, x2?: number, y2?: number): Point;
/**
 * Returns a function that divides a point:
 * ```js
 * const f = divider(100, 200);
 * f(50,100); // Yields: { x: 0.5, y: 0.5 }
 * ```
 *
 * Input values can be Point, separate x,y and optional z values or an array:
 * ```js
 * const f = divider({ x: 100, y: 100 });
 * const f = divider( 100, 100 );
 * const f = divider([ 100, 100 ]);
 * ```
 *
 * Likewise the returned function an take these as inputs:
 * ```js
 * f({ x: 100, y: 100});
 * f( 100, 100 );
 * f([ 100, 100 ]);
 * ```
 *
 * Function throws if divisor has 0 for any coordinate (since we can't divide by 0)
 * @param a Divisor point, array of points or x
 * @param b Divisor y value
 * @param c Divisor z value
 * @returns
 */
declare function divider(a: Point | number | Array<number>, b?: number, c?: number): (aa: Point | number | Array<number>, bb?: number, cc?: number) => Point | Point3d;
declare const quantiseEvery: (pt: Point, snap: Point, middleRoundsUp?: boolean) => Readonly<{
    x: number;
    y: number;
}>;
/**
 * Simple convex hull impementation. Returns a set of points which
 * enclose `pts`.
 *
 * For more power, see something like [Hull.js](https://github.com/AndriiHeonia/hull)
 * @param pts
 * @returns
 */
declare const convexHull: (...pts: ReadonlyArray<Point>) => ReadonlyArray<Point>;
/**
 * Returns -2 if both x & y of a is less than b
 * Returns -1 if either x/y of a is less than b
 *
 * Returns 2 if both x & y of a is greater than b
 * Returns 1 if either x/y of a is greater than b's x/y
 *
 * Returns 0 if x/y of a and b are equal
 * @param a
 * @param b
 * @returns
 */
declare const compare: (a: Point, b: Point) => number;
/**
 * Compares points based on x value.
 * Returns above 0 if a.x > b.x (to the right)
 * Returns 0 if a.x === b.x
 * Returns below 0 if a.x < b.x (to the left)
 *
 * @example Sorting by x
 * ```js
 * arrayOfPoints.sort(Points.compareByX);
 * ```
 * @param a
 * @param b
 * @returns
 */
declare const compareByX: (a: Point, b: Point) => number;
/**
 * Project `origin` by `distance` and `angle` (radians).
 *
 * To figure out rotation, imagine a horizontal line running through `origin`.
 * * Rotation = 0 deg puts the point on the right of origin, on same y-axis
 * * Rotation = 90 deg/3:00 puts the point below origin, on the same x-axis
 * * Rotation = 180 deg/6:00 puts the point on the left of origin on the same y-axis
 * * Rotation = 270 deg/12:00 puts the point above the origin, on the same x-axis
 *
 * ```js
 * // Yields a point 100 units away from 10,20 with 10 degrees rotation (ie slightly down)
 * const a = Points.project({x:10, y:20}, 100, degreeToRadian(10));
 * ```
 * @param origin
 * @param distance
 * @param angle
 * @returns
 */
declare const project: (origin: Point, distance: number, angle: number) => {
    x: number;
    y: number;
};
/**
 * Rotate a single point by a given amount in radians
 * @param pt
 * @param amountRadian
 * @param origin
 */
declare function rotate(pt: Point, amountRadian: number, origin?: Point): Point;
/**
 * Rotate several points by a given amount in radians
 * @param pt Points
 * @param amountRadian Amount to rotate in radians. If 0 is given, a copy of the input array is returned
 * @param origin Origin to rotate around. Defaults to 0,0
 */
declare function rotate(pt: ReadonlyArray<Point>, amountRadian: number, origin?: Point): ReadonlyArray<Point>;
declare const rotatePointArray: (v: ReadonlyArray<ReadonlyArray<number>>, amountRadian: number) => Array<Array<number>>;
/**
 * Normalise point as a unit vector.
 *
 * ```js
 * normalise({x:10, y:20});
 * normalise(10, 20);
 * ```
 * @param ptOrX Point, or x value
 * @param y y value if first param is x
 * @returns
 */
declare const normalise: (ptOrX: Point | number, y?: number) => Point;
/**
 * Round the point's _x_ and _y_ to given number of digits
 * @param ptOrX
 * @param yOrDigits
 * @param digits
 * @returns
 */
declare const round: (ptOrX: Point | number, yOrDigits?: number, digits?: number) => Point;
/**
 * Normalises a point by a given width and height
 * @param pt Point
 * @param width Width
 * @param height Height
 */
declare function normaliseByRect(pt: Point, width: number, height: number): Point;
declare function normaliseByRect(pt: Point, rect: Rect): Point;
/**
 * Normalises x,y by width and height so it is on a 0..1 scale
 * @param x
 * @param y
 * @param width
 * @param height
 */
declare function normaliseByRect(x: number, y: number, width: number, height: number): Point;
/**
 * Returns a random point on a 0..1 scale.
 * ```js
 * import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
 * const pt = Points.random(); // eg {x: 0.2549012, y:0.859301}
 * ```
 *
 * A custom source of randomness can be provided:
 * ```js
 * import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
 * import { weightedSource } from "https://unpkg.com/ixfx/dist/random.js"
 * const pt = Points.random(weightedSource(`quadIn`));
 * ```
 * @param rando
 * @returns
 */
declare const random: (rando?: RandomSource) => Point;
/**
 * Wraps a point to be within `ptMin` and `ptMax`.
 * Note that max values are _exclusive_, meaning the return value will always be one less.
 *
 * Eg, if a view port is 100x100 pixels, wrapping the point 150,100 yields 50,99.
 *
 * ```js
 * // Wraps 150,100 to on 0,0 -100,100 range
 * wrap({x:150,y:100}, {x:100,y:100});
 * ```
 *
 * Wrap normalised point:
 * ```js
 * wrap({x:1.2, y:1.5}); // Yields: {x:0.2, y:0.5}
 * ```
 * @param pt Point to wrap
 * @param ptMax Maximum value, or `{ x:1, y:1 }` by default
 * @param ptMin Minimum value, or `{ x:0, y:0 }` by default
 * @returns Wrapped point
 */
declare const wrap: (pt: Point, ptMax?: Point, ptMin?: Point) => Point;
/**
 * Inverts one or more axis of a point
 * ```js
 * invert({x:10, y:10}); // Yields: {x:-10, y:-10}
 * invert({x:10, y:10}, `x`); // Yields: {x:-10, y:10}
 * ```
 * @param pt Point to invert
 * @param what Which axis. If unspecified, both axies are inverted
 * @returns
 */
declare const invert: (pt: Point | Point3d, what?: `both` | `x` | `y` | `z`) => Point;
/**
 * Returns a point with rounded x,y coordinates. By default uses `Math.round` to round.
 * ```js
 * toIntegerValues({x:1.234, y:5.567}); // Yields: {x:1, y:6}
 * ```
 *
 * ```js
 * toIntegerValues(pt, Math.ceil); // Use Math.ceil to round x,y of `pt`.
 * ```
 * @param pt Point to round
 * @param rounder Rounding function, or Math.round by default
 * @returns
 */
declare const toIntegerValues: (pt: Point, rounder?: (x: number) => number) => Point;
/**
 * Clamps the magnitude of a point.
 * This is useful when using a Point as a vector, to limit forces.
 * @param pt
 * @param max Maximum magnitude (1 by default)
 * @param min Minimum magnitude (0 by default)
 * @returns
 */
declare const clampMagnitude: (pt: Point, max?: number, min?: number) => Point;
/**
 * Clamps a point to be between `min` and `max` (0 & 1 by default)
 * @param pt Point
 * @param min Minimum value (0 by default)
 * @param max Maximum value (1 by default)
 */
declare function clamp(pt: Point, min?: number, max?: number): Point;
/**
 * Clamps an x,y pair to be between `min` and `max` (0 & 1 by default)
 * @param x X coordinate
 * @param y Y coordinate
 * @param min Minimum value (0 by default)
 * @param max Maximum value (1 by default)
 */
declare function clamp(x: number, y: number, min?: number, max?: number): Point;
/**
 * Tracks the relation between two points.
 *
 * 1. Call `Points.relation` with the initial reference point
 * 2. You get back a function
 * 3. Call the function with a new point to compute relational information.
 *
 * It computes angle, average, centroid, distance and speed.
 *
 * ```js
 * import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * // Reference point: 50,50
 * const t = Points.relation({x:50,y:50}); // t is a function
 *
 * // Invoke the returned function with a point
 * const relation = t({ x:0, y:0 }); // Juicy relational data
 * ```
 *
 * Or with destructuring:
 *
 * ```js
 * const { angle, distanceFromStart, distanceFromLast, average, centroid, speed } = t({ x:0,y:0 });
 * ```
 *
 * x & y coordinates can also be used as parameters:
 * ```js
 * const t = Points.relation(50, 50);
 * const result = t(0, 0);
 * // result.speed, result.angle ...
 * ```
 *
 * Note that intermediate values are not stored. It keeps the initial
 * and most-recent point. If you want to compute something over a set
 * of prior points, you may want to use [Data.pointsTracker](./Data.pointsTracker.html)
 * @param start
 * @returns
 */
declare const relation: (a: Point | number, b?: number) => PointRelation;
declare const progressBetween: (currentPos: Point | Point3d, from: Point | Point3d, to: Point | Point3d) => number;

declare const index_Empty: typeof Empty;
declare const index_Placeholder: typeof Placeholder;
type index_Point = Point;
type index_Point3d = Point3d;
type index_PointRelation = PointRelation;
type index_PointRelationResult = PointRelationResult;
declare const index_abs: typeof abs;
declare const index_angle: typeof angle;
declare const index_apply: typeof apply;
declare const index_bbox: typeof bbox;
declare const index_centroid: typeof centroid;
declare const index_clamp: typeof clamp;
declare const index_clampMagnitude: typeof clampMagnitude;
declare const index_compare: typeof compare;
declare const index_compareByX: typeof compareByX;
declare const index_convexHull: typeof convexHull;
declare const index_distance: typeof distance;
declare const index_distanceToCenter: typeof distanceToCenter;
declare const index_distanceToExterior: typeof distanceToExterior;
declare const index_divide: typeof divide;
declare const index_divider: typeof divider;
declare const index_dotProduct: typeof dotProduct;
declare const index_findMinimum: typeof findMinimum;
declare const index_from: typeof from;
declare const index_fromNumbers: typeof fromNumbers;
declare const index_getPointParameter: typeof getPointParameter;
declare const index_guard: typeof guard;
declare const index_guardNonZeroPoint: typeof guardNonZeroPoint;
declare const index_interpolate: typeof interpolate;
declare const index_invert: typeof invert;
declare const index_isEmpty: typeof isEmpty;
declare const index_isEqual: typeof isEqual;
declare const index_isNaN: typeof isNaN;
declare const index_isNull: typeof isNull;
declare const index_isPlaceholder: typeof isPlaceholder;
declare const index_isPoint: typeof isPoint;
declare const index_isPoint3d: typeof isPoint3d;
declare const index_leftmost: typeof leftmost;
declare const index_multiply: typeof multiply;
declare const index_multiplyScalar: typeof multiplyScalar;
declare const index_normalise: typeof normalise;
declare const index_normaliseByRect: typeof normaliseByRect;
declare const index_pipeline: typeof pipeline;
declare const index_pipelineApply: typeof pipelineApply;
declare const index_progressBetween: typeof progressBetween;
declare const index_project: typeof project;
declare const index_quantiseEvery: typeof quantiseEvery;
declare const index_random: typeof random;
declare const index_reduce: typeof reduce;
declare const index_relation: typeof relation;
declare const index_rightmost: typeof rightmost;
declare const index_rotate: typeof rotate;
declare const index_rotatePointArray: typeof rotatePointArray;
declare const index_round: typeof round;
declare const index_subtract: typeof subtract;
declare const index_sum: typeof sum;
declare const index_toArray: typeof toArray;
declare const index_toIntegerValues: typeof toIntegerValues;
declare const index_toString: typeof toString;
declare const index_withinRange: typeof withinRange;
declare const index_wrap: typeof wrap;
declare namespace index {
  export { index_Empty as Empty, index_Placeholder as Placeholder, type index_Point as Point, type index_Point3d as Point3d, type index_PointRelation as PointRelation, type index_PointRelationResult as PointRelationResult, index_abs as abs, index_angle as angle, index_apply as apply, index_bbox as bbox, index_centroid as centroid, index_clamp as clamp, index_clampMagnitude as clampMagnitude, index_compare as compare, index_compareByX as compareByX, index_convexHull as convexHull, index_distance as distance, index_distanceToCenter as distanceToCenter, index_distanceToExterior as distanceToExterior, index_divide as divide, index_divider as divider, index_dotProduct as dotProduct, index_findMinimum as findMinimum, index_from as from, index_fromNumbers as fromNumbers, index_getPointParameter as getPointParameter, index_guard as guard, index_guardNonZeroPoint as guardNonZeroPoint, index_interpolate as interpolate, index_invert as invert, index_isEmpty as isEmpty, index_isEqual as isEqual, index_isNaN as isNaN, index_isNull as isNull, index_isPlaceholder as isPlaceholder, index_isPoint as isPoint, index_isPoint3d as isPoint3d, index_leftmost as leftmost, index_multiply as multiply, index_multiplyScalar as multiplyScalar, index_normalise as normalise, index_normaliseByRect as normaliseByRect, index_pipeline as pipeline, index_pipelineApply as pipelineApply, index_progressBetween as progressBetween, index_project as project, index_quantiseEvery as quantiseEvery, index_random as random, index_reduce as reduce, index_relation as relation, index_rightmost as rightmost, index_rotate as rotate, index_rotatePointArray as rotatePointArray, index_round as round, index_subtract as subtract, index_sum as sum, index_toArray as toArray, index_toIntegerValues as toIntegerValues, index_toString as toString, index_withinRange as withinRange, index_wrap as wrap };
}

export { isEqualSize as $, corners$1 as A, distanceFromCenter as B, type CirclePositioned as C, type Dimensions as D, distanceFromExterior$1 as E, edges$1 as F, type Grid as G, empty as H, emptyPositioned as I, fromCenter$2 as J, fromElement as K, type Line as L, fromNumbers$1 as M, fromTopLeft as N, getEdgeX as O, type Point as P, getEdgeY as Q, type Rect as R, type ShapePositioned as S, type Triangle as T, getEnd as U, type VisitGenerator as V, type WithBeziers as W, getRectPositionedParameter as X, getStart as Y, intersectsPoint$1 as Z, isEqual$3 as _, type Path as a, isIntersecting$1 as a0, lengths$1 as a1, maxFromCorners as a2, multiply$1 as a3, multiplyScalar$2 as a4, normaliseByRect$1 as a5, perimeter$4 as a6, placeholder as a7, placeholderPositioned as a8, random$1 as a9, randomPoint$2 as aa, subtract$1 as ab, sum$1 as ac, toArray$1 as ad, type CardinalDirection as ae, type PointRelationResult as af, type PointRelation as ag, type RectPositioned as b, type CellAccessor as c, type Circle as d, type CompoundPath as e, type Cell as f, type Sphere as g, type Point3d as h, index$3 as i, type CircularPath as j, Grid$1 as k, index$5 as l, index$6 as m, type PointCalculableShape as n, index as o, type PolyLine as p, type RandomPointOpts$2 as q, type RectArray as r, type RectPositionedArray as s, index$4 as t, index$1 as u, index$2 as v, area$5 as w, cardinal as x, center$2 as y, clamp$1 as z };
