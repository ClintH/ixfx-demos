import { C as Circle, A as Arc, B as Bezier } from './Circle-d59bde4b';
import { P as Path, a as Point, R as RectPositioned, L as Line, b as Rect, c as Point$1, d as Path$1 } from './Rect-8331264b';
import { S as SetMutable } from './Interfaces-15f9add4';

declare type CompoundPath = Path & {
    segments: Path[];
    kind: `compound`;
};
/**
 * Returns a new compoundpath, replacing a path at a given index
 *
 * @param {CompoundPath} compoundPath Existing compoundpath
 * @param {number} index Index to replace at
 * @param {Paths.Path} path Path to substitute in
 * @returns {CompoundPath} New compoundpath
 */
declare const setSegment: (compoundPath: CompoundPath, index: number, path: Path) => CompoundPath;
/**
 * Computes x,y point at a relative position along compoundpath
 *
 * @param {Paths.Path[]} paths Combined paths (assumes contiguous)
 * @param {number} t Position (given as a percentage from 0 to 1)
 * @param {boolean} [useWidth] If true, widths are used for calulcating. If false, lengths are used
 * @param {Dimensions} [dimensions] Precalculated dimensions of paths, will be computed if omitted
 * @returns
 */
declare const compute: (paths: Path[], t: number, useWidth?: boolean | undefined, dimensions?: Dimensions | undefined) => Point;
declare type Dimensions = {
    /**
     * Width of each path (based on bounding box)
     *
     * @type {number[]}
     */
    widths: number[];
    /**
     * Length of each path
     *
     * @type {number[]}
     */
    lengths: number[];
    /**
     * Total length of all paths
     *
     * @type {number}
     */
    totalLength: number;
    /**
     * Total width of all paths
     *
     * @type {number}
     */
    totalWidth: number;
};
/**
 * Computes the widths and lengths of all paths, adding them up as well
 *
 * @param {Paths.Path[]} paths
 * @returns {Dimensions}
 */
declare const computeDimensions: (paths: Path[]) => Dimensions;
/**
 * Computes the bounding box that encloses entire compoundpath
 *
 * @param {Paths.Path[]} paths
 *
 * @returns {Rects.Rect}
 */
declare const bbox: (paths: Path[]) => RectPositioned;
/**
 * Produce a human-friendly representation of paths
 *
 * @param {Paths.Path[]} paths
 * @returns {string}
 */
declare const toString: (paths: Path[]) => string;
/**
 * Throws an error if paths are not connected together, in order
 *
 * @param {Paths.Path[]} paths
 */
declare const guardContinuous: (paths: Path[]) => void;
declare const toSvgString: (paths: Path[]) => readonly string[];
/**
 * Create a compoundpath from an array of paths.
 * All this does is verify they are connected, and precomputes dimensions
 *
 * @param {...Paths.Path[]} paths
 * @returns {CompoundPath}
 */
declare const fromPaths: (...paths: Path[]) => CompoundPath;

type CompoundPath$1_CompoundPath = CompoundPath;
declare const CompoundPath$1_setSegment: typeof setSegment;
declare const CompoundPath$1_compute: typeof compute;
declare const CompoundPath$1_computeDimensions: typeof computeDimensions;
declare const CompoundPath$1_bbox: typeof bbox;
declare const CompoundPath$1_toString: typeof toString;
declare const CompoundPath$1_guardContinuous: typeof guardContinuous;
declare const CompoundPath$1_toSvgString: typeof toSvgString;
declare const CompoundPath$1_fromPaths: typeof fromPaths;
declare namespace CompoundPath$1 {
  export {
    CompoundPath$1_CompoundPath as CompoundPath,
    CompoundPath$1_setSegment as setSegment,
    CompoundPath$1_compute as compute,
    CompoundPath$1_computeDimensions as computeDimensions,
    CompoundPath$1_bbox as bbox,
    CompoundPath$1_toString as toString,
    CompoundPath$1_guardContinuous as guardContinuous,
    CompoundPath$1_toSvgString as toSvgString,
    CompoundPath$1_fromPaths as fromPaths,
  };
}

declare type GridVisual = Readonly<{
    readonly size: number;
}>;
declare type Grid = Readonly<{
    readonly rows: number;
    readonly cols: number;
}>;
declare type Cell = Readonly<{
    readonly x: number;
    readonly y: number;
}>;
declare type Neighbours = Readonly<{
    readonly n: Cell | undefined;
    readonly e: Cell | undefined;
    readonly s: Cell | undefined;
    readonly w: Cell | undefined;
    readonly ne: Cell | undefined;
    readonly nw: Cell | undefined;
    readonly se: Cell | undefined;
    readonly sw: Cell | undefined;
}>;
declare type CardinalDirection = `` | `n` | `ne` | `e` | `se` | `s` | `sw` | `w` | `nw`;
declare type BoundsLogic = `unbounded` | `undefined` | `stop` | `wrap`;
declare type VisitorLogic = {
    readonly options?: IdentifyNeighbours;
    readonly select: NeighbourSelector;
};
declare type VisitGenerator = Generator<Readonly<Cell>, void, unknown>;
declare type VisitorOpts = {
    readonly visited?: SetMutable<Cell>;
    readonly reversed?: boolean;
    readonly debug?: boolean;
};
declare type Visitor = (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare type NeighbourMaybe = readonly [keyof Neighbours, Cell | undefined];
declare type Neighbour = readonly [keyof Neighbours, Cell];
declare type NeighbourSelector = (neighbours: ReadonlyArray<Neighbour>) => Neighbour | undefined;
declare type IdentifyNeighbours = (grid: Grid, origin: Cell) => ReadonlyArray<Neighbour>;
/**
 * Returns true if grids `a` and `b` are equal in value
 *
 * @param {(Grid|GridVisual)} a
 * @param {(Grid|GridVisual)} b
 * @return {*}  {boolean}
 */
declare const isEqual: (a: Grid | GridVisual, b: Grid | GridVisual) => boolean;
/**
 * Returns a key string for a cell instance
 * A key string allows comparison of instances by value rather than reference
 * @param {Cell} v
 * @returns {string}
 */
declare const cellKeyString: (v: Cell) => string;
/**
 * Returns true if two cells equal. Returns false if either cell (or both) are undefined
 *
 * @param {Cell} a
 * @param {Cell} b
 * @returns {boolean}
 */
declare const cellEquals: (a: Cell, b: Cell) => boolean;
declare const guard: (a: Cell, paramName?: string, grid?: Readonly<{
    readonly rows: number;
    readonly cols: number;
}> | undefined) => void;
/**
 * Returns true if cell coordinates are above zero and within bounds of grid
 *
 * @param {Grid} grid
 * @param {Cell} cell
 * @return {*}  {boolean}
 */
declare const inside: (grid: Grid, cell: Cell) => boolean;
/**
 * Returns a rect of the cell, positioned from the top-left corner
 *
 * @param {Cell} cell
 * @param {(Grid & GridVisual)} grid
 * @return {*}  {Rect.RectPositioned}
 */
declare const rectangleForCell: (cell: Cell, grid: Grid & GridVisual) => RectPositioned;
/**
 * Returns the cell at a specified visual coordinate
 *
 * @param {Point.Point} position Position, eg in pixels
 * @param {(Grid & GridVisual)} grid Grid
 * @return {*}  {(Cell | undefined)} Cell at position or undefined if outside of the grid
 */
declare const cellAtPoint: (position: Point, grid: Grid & GridVisual) => Cell | undefined;
declare const allDirections: readonly CardinalDirection[];
declare const crossDirections: readonly CardinalDirection[];
declare const neighbours: (grid: Grid, cell: Cell, bounds?: BoundsLogic, directions?: readonly CardinalDirection[] | undefined) => Neighbours;
/**
 * Returns the pixel midpoint of a cell
 *
 * @param {Cell} cell
 * @param {(Grid & GridVisual)} grid
 * @return {*}  {Point.Point}
 */
declare const cellMiddle: (cell: Cell, grid: Grid & GridVisual) => Point;
/**
 * Returns the cells on the line of start and end, inclusive
 *
 * @param {Cell} start Starting cel
 * @param {Cell} end End cell
 * @returns {Cell[]}
 */
declare const getLine: (start: Cell, end: Cell) => ReadonlyArray<Cell>;
/**
 * Returns cells that correspond to the cardinal directions at a specified distance
 *
 * @param grid Griod
 * @param steps Distance
 * @param start Start poiint
 * @param bound Logic for if bounds of grid are exceeded
 * @returns Cells corresponding to cardinals
 */
declare const offsetCardinals: (grid: Grid, start: Cell, steps: number, bounds?: BoundsLogic) => Neighbours;
/**
 * Returns an {x,y} signed vector corresponding to the provided cardinal direction.
 * ```
 * const n = getVectorFromCardinal(`n`); // {x: 0, y: -1}
 * ```
 * Optional `multiplier` can be applied to vector
 * ```
 * const n = getVectorFromCardinal(`n`, 10); // {x: 0, y: -10}
 * ```
 *
 * Blank direction returns {x: 0, y: 0}
 * @param cardinal Direction
 * @param multiplier Multipler
 * @returns Signed vector in the form of {x,y}
 */
declare const getVectorFromCardinal: (cardinal: CardinalDirection, multiplier?: number) => Cell;
/**
 * Returns a list of cells from `start` to `end`.
 *
 * Throws an error if start and end are not on same row or column.
 *
 * @param start Start cell
 * @param end end clel
 * @param endInclusive
 * @return {*}  {ReadonlyArray<Cell>}
 */
declare const simpleLine: (start: Cell, end: Cell, endInclusive?: boolean) => ReadonlyArray<Cell>;
/**
 *
 * Returns a coordinate offset from `start` by `vector` amount.
 *
 * Different behaviour can be specified for how to handle when coordinates exceed the bounds of the grid
 *
 *
 * Note: x and y wrapping are calculated independently. A large wrapping of x, for example won't shift down a line
 * @param {Grid} grid Grid to traverse
 * @param {Cell} vector Offset in x/y
 * @param {Cell} start Start point
 * @param {BoundsLogic} [bounds=`undefined`]
 * @returns {(Cell | undefined)}
 */
declare const offset: (grid: Grid, start: Cell, vector: Cell, bounds?: BoundsLogic) => Cell | undefined;
/**
 * Visits every cell in grid using supplied selection function
 * In-built functions to use: visitorDepth, visitorBreadth, visitorRandom
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
 * @param {(neighbourSelect: NeighbourSelector} neighbourSelect Select neighbour to visit
 * @param {Grid} grid Grid to visit
 * @param {Cell} start Starting cell
 * @param {MutableStringSet<Cell>} [visited] Optional tracker of visited cells
 * @returns {Iterable<Cell>}
 */
declare const visitor: (logic: VisitorLogic, grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorDepth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorBreadth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRandomContiguous: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRandom: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRow: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitFor: (grid: Grid, start: Cell, steps: number, visitor: Visitor) => Cell;
declare const visitorColumn: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
/**
 * Enumerate all cells in an efficient manner. If end of grid is reached, iterator will wrap to ensure all are visited.
 *
 * @param {Grid} grid
 * @param {Cell} [start={x:0, y:0}]
 */
declare const cells: (grid: Grid, start?: Cell) => Generator<{
    x: number;
    y: number;
}, void, unknown>;

type Grid$1_GridVisual = GridVisual;
type Grid$1_Grid = Grid;
type Grid$1_Cell = Cell;
type Grid$1_Neighbours = Neighbours;
type Grid$1_CardinalDirection = CardinalDirection;
type Grid$1_BoundsLogic = BoundsLogic;
type Grid$1_VisitGenerator = VisitGenerator;
type Grid$1_VisitorOpts = VisitorOpts;
type Grid$1_Visitor = Visitor;
type Grid$1_NeighbourMaybe = NeighbourMaybe;
type Grid$1_Neighbour = Neighbour;
declare const Grid$1_isEqual: typeof isEqual;
declare const Grid$1_cellKeyString: typeof cellKeyString;
declare const Grid$1_cellEquals: typeof cellEquals;
declare const Grid$1_guard: typeof guard;
declare const Grid$1_inside: typeof inside;
declare const Grid$1_rectangleForCell: typeof rectangleForCell;
declare const Grid$1_cellAtPoint: typeof cellAtPoint;
declare const Grid$1_allDirections: typeof allDirections;
declare const Grid$1_crossDirections: typeof crossDirections;
declare const Grid$1_neighbours: typeof neighbours;
declare const Grid$1_cellMiddle: typeof cellMiddle;
declare const Grid$1_getLine: typeof getLine;
declare const Grid$1_offsetCardinals: typeof offsetCardinals;
declare const Grid$1_getVectorFromCardinal: typeof getVectorFromCardinal;
declare const Grid$1_simpleLine: typeof simpleLine;
declare const Grid$1_offset: typeof offset;
declare const Grid$1_visitor: typeof visitor;
declare const Grid$1_visitorDepth: typeof visitorDepth;
declare const Grid$1_visitorBreadth: typeof visitorBreadth;
declare const Grid$1_visitorRandomContiguous: typeof visitorRandomContiguous;
declare const Grid$1_visitorRandom: typeof visitorRandom;
declare const Grid$1_visitorRow: typeof visitorRow;
declare const Grid$1_visitFor: typeof visitFor;
declare const Grid$1_visitorColumn: typeof visitorColumn;
declare const Grid$1_cells: typeof cells;
declare namespace Grid$1 {
  export {
    Grid$1_GridVisual as GridVisual,
    Grid$1_Grid as Grid,
    Grid$1_Cell as Cell,
    Grid$1_Neighbours as Neighbours,
    Grid$1_CardinalDirection as CardinalDirection,
    Grid$1_BoundsLogic as BoundsLogic,
    Grid$1_VisitGenerator as VisitGenerator,
    Grid$1_VisitorOpts as VisitorOpts,
    Grid$1_Visitor as Visitor,
    Grid$1_NeighbourMaybe as NeighbourMaybe,
    Grid$1_Neighbour as Neighbour,
    Grid$1_isEqual as isEqual,
    Grid$1_cellKeyString as cellKeyString,
    Grid$1_cellEquals as cellEquals,
    Grid$1_guard as guard,
    Grid$1_inside as inside,
    Grid$1_rectangleForCell as rectangleForCell,
    Grid$1_cellAtPoint as cellAtPoint,
    Grid$1_allDirections as allDirections,
    Grid$1_crossDirections as crossDirections,
    Grid$1_neighbours as neighbours,
    Grid$1_cellMiddle as cellMiddle,
    Grid$1_getLine as getLine,
    Grid$1_offsetCardinals as offsetCardinals,
    Grid$1_getVectorFromCardinal as getVectorFromCardinal,
    Grid$1_simpleLine as simpleLine,
    Grid$1_offset as offset,
    Grid$1_visitor as visitor,
    Grid$1_visitorDepth as visitorDepth,
    Grid$1_visitorBreadth as visitorBreadth,
    Grid$1_visitorRandomContiguous as visitorRandomContiguous,
    Grid$1_visitorRandom as visitorRandom,
    Grid$1_visitorRow as visitorRow,
    Grid$1_visitFor as visitFor,
    Grid$1_visitorColumn as visitorColumn,
    Grid$1_cells as cells,
  };
}

declare const degreeToRadian: (angleInDegrees: number) => number;
declare const radianToDegree: (angleInRadians: number) => number;
declare const radiansFromAxisX: (point: Point) => number;
declare const polarToCartesian: (center: Point, radius: number, angleRadians: number) => {
    x: number;
    y: number;
};

declare const Math_degreeToRadian: typeof degreeToRadian;
declare const Math_radianToDegree: typeof radianToDegree;
declare const Math_radiansFromAxisX: typeof radiansFromAxisX;
declare const Math_polarToCartesian: typeof polarToCartesian;
declare namespace Math {
  export {
    Math_degreeToRadian as degreeToRadian,
    Math_radianToDegree as radianToDegree,
    Math_radiansFromAxisX as radiansFromAxisX,
    Math_polarToCartesian as polarToCartesian,
  };
}

declare const index_Math: typeof Math;
declare namespace index {
  export {
    Circle as Circles,
    Arc as Arcs,
    Line as Lines,
    Rect as Rects,
    Point$1 as Points,
    Path$1 as Paths,
    Grid$1 as Grids,
    Bezier as Beziers,
    CompoundPath$1 as Compound,
    index_Math as Math,
  };
}

export { CompoundPath$1 as C, Grid$1 as G, Math as M, index as i };
