import { T as Triangle, B as Bezier, E as Ellipse, A as Arc, a as Triangle$1 } from './Triangle-c114a048.js';
import { d as Path, a as Point, R as RectPositioned, e as Rect, C as Circle, L as Line, f as Point3d, g as Circle$1, h as Line$1, i as Rect$1, j as Point$1, k as Path$1 } from './Point-b217e9a5.js';
import { S as SetMutable } from './Interfaces-afd3b408.js';
import { C as Coord, P as Polar } from './Polar-ba1afca0.js';
import { S as Scaler } from './Scaler-449133b0.js';

declare type CompoundPath = Path & {
    readonly segments: readonly Path[];
    readonly kind: `compound`;
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
declare const interpolate: (paths: readonly Path[], t: number, useWidth?: boolean, dimensions?: Dimensions) => Point;
declare type Dimensions = {
    /**
     * Width of each path (based on bounding box)
     *
     * @type {number[]}
     */
    readonly widths: readonly number[];
    /**
     * Length of each path
     *
     * @type {number[]}
     */
    readonly lengths: readonly number[];
    /**
     * Total length of all paths
     *
     * @type {number}
     */
    readonly totalLength: number;
    /**
     * Total width of all paths
     *
     * @type {number}
     */
    readonly totalWidth: number;
};
/**
 * Computes the widths and lengths of all paths, adding them up as well
 *
 * @param {Paths.Path[]} paths
 * @returns {Dimensions}
 */
declare const computeDimensions: (paths: readonly Path[]) => Dimensions;
/**
 * Computes the bounding box that encloses entire compoundpath
 *
 * @param {Paths.Path[]} paths
 *
 * @returns {Rects.Rect}
 */
declare const bbox: (paths: readonly Path[]) => RectPositioned;
/**
 * Produce a human-friendly representation of paths
 *
 * @param {Paths.Path[]} paths
 * @returns {string}
 */
declare const toString$1: (paths: readonly Path[]) => string;
/**
 * Throws an error if paths are not connected together, in order
 *
 * @param {Paths.Path[]} paths
 */
declare const guardContinuous: (paths: readonly Path[]) => void;
declare const toSvgString: (paths: readonly Path[]) => readonly string[];
/**
 * Create a compoundpath from an array of paths.
 * All this does is verify they are connected, and precomputes dimensions
 *
 * @param {...Paths.Path[]} paths
 * @returns {CompoundPath}
 */
declare const fromPaths: (...paths: readonly Path[]) => CompoundPath;

type CompoundPath$1_CompoundPath = CompoundPath;
declare const CompoundPath$1_setSegment: typeof setSegment;
declare const CompoundPath$1_interpolate: typeof interpolate;
type CompoundPath$1_Dimensions = Dimensions;
declare const CompoundPath$1_computeDimensions: typeof computeDimensions;
declare const CompoundPath$1_bbox: typeof bbox;
declare const CompoundPath$1_guardContinuous: typeof guardContinuous;
declare const CompoundPath$1_toSvgString: typeof toSvgString;
declare const CompoundPath$1_fromPaths: typeof fromPaths;
declare namespace CompoundPath$1 {
  export {
    CompoundPath$1_CompoundPath as CompoundPath,
    CompoundPath$1_setSegment as setSegment,
    CompoundPath$1_interpolate as interpolate,
    CompoundPath$1_Dimensions as Dimensions,
    CompoundPath$1_computeDimensions as computeDimensions,
    CompoundPath$1_bbox as bbox,
    toString$1 as toString,
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
/**
 * Neighbour selector logic. For a given set of `neighbours` pick one to visit next.
 */
declare type NeighbourSelector = (neighbours: ReadonlyArray<Neighbour>) => Neighbour | undefined;
/**
 * Identify neighbours logic. For a given `grid` and `origin`, return a list of neighbours
 */
declare type IdentifyNeighbours = (grid: Grid, origin: Cell) => ReadonlyArray<Neighbour>;
/**
 * Returns _true_ if grids `a` and `b` are equal in value
 *
 * @param a
 * @param b
 * @return
 */
declare const isEqual: (a: Grid | GridVisual, b: Grid | GridVisual) => boolean;
/**
 * Returns a key string for a cell instance
 * A key string allows comparison of instances by value rather than reference
 * @param v
 * @returns
 */
declare const cellKeyString: (v: Cell) => string;
/**
 * Returns true if two cells equal. Returns false if either cell (or both) are undefined
 *
 * @param a
 * @param b
 * @returns
 */
declare const cellEquals: (a: Cell, b: Cell) => boolean;
/**
 * Throws an exception if any of the cell's parameters are invalid
 * @private
 * @param cell
 * @param paramName
 * @param grid
 */
declare const guardCell: (cell: Cell, paramName?: string, grid?: Grid) => void;
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
 * @param cell
 * @param grid
 * @return
 */
declare const rectangleForCell: (cell: Cell, grid: Grid & GridVisual) => RectPositioned;
/**
 * Returns the cell at a specified visual coordinate
 *
 * @param position Position, eg in pixels
 * @param grid Grid
 * @return Cell at position or undefined if outside of the grid
 */
declare const cellAtPoint: (position: Point, grid: Grid & GridVisual) => Cell | undefined;
/**
 * Returns a list of all cardinal directions
 */
declare const allDirections: readonly CardinalDirection[];
/**
 * Returns a list of + shaped directions (ie. excluding diaganol)
 */
declare const crossDirections: readonly CardinalDirection[];
/**
 * Returns neighbours for a cell. If no `directions` are provided, it defaults to all.
 *
 * ```js
 * const n = neighbours = ({rows: 5, cols: 5}, {x:2, y:2} `wrap`);
 * {
 *  n: {x: 2, y: 1}
 *  s: {x: 2, y: 3}
 *  ....
 * }
 * ```
 * @returns Returns a map of cells, keyed by cardinal direction
 * @param grid Grid
 * @param cell Cell
 * @param bounds How to handle edges of grid
 * @param directions Directions to return
 */
declare const neighbours: (grid: Grid, cell: Cell, bounds?: BoundsLogic, directions?: ReadonlyArray<CardinalDirection>) => Neighbours;
/**
 * Returns the visual midpoint of a cell (eg pixel coordinate)
 *
 * @param cell
 * @param grid
 * @return
 */
declare const cellMiddle: (cell: Cell, grid: Grid & GridVisual) => Point;
/**
 * Returns the cells on the line of start and end, inclusive
 *
 * ```js
 * // Get cells that connect 0,0 and 10,10
 * const cells = getLine({x:0,y:0}, {x:10,y:10});
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
 *
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
declare const getVectorFromCardinal: (cardinal: CardinalDirection, multiplier?: number) => Cell;
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
 * Note: x and y wrapping are calculated independently. A large wrapping of x, for example won't shift down a line
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
declare const visitorRandom: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
declare const visitorRow: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
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
 * ```js
 * for (const row of Grid.rows(shape)) {
 *  // row is an array of Cells.
 * }
 * ```
 * @param grid
 * @param start
 */
declare const rows: (grid: Grid, start?: Cell) => Generator<Readonly<{
    readonly x: number;
    readonly y: number;
}>[], void, unknown>;
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

type Grid$1_GridVisual = GridVisual;
type Grid$1_Grid = Grid;
type Grid$1_Cell = Cell;
type Grid$1_Neighbours = Neighbours;
type Grid$1_CardinalDirection = CardinalDirection;
type Grid$1_BoundsLogic = BoundsLogic;
type Grid$1_VisitorLogic = VisitorLogic;
type Grid$1_VisitGenerator = VisitGenerator;
type Grid$1_VisitorOpts = VisitorOpts;
type Grid$1_Visitor = Visitor;
type Grid$1_NeighbourMaybe = NeighbourMaybe;
type Grid$1_Neighbour = Neighbour;
type Grid$1_NeighbourSelector = NeighbourSelector;
type Grid$1_IdentifyNeighbours = IdentifyNeighbours;
declare const Grid$1_isEqual: typeof isEqual;
declare const Grid$1_cellKeyString: typeof cellKeyString;
declare const Grid$1_cellEquals: typeof cellEquals;
declare const Grid$1_guardCell: typeof guardCell;
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
declare const Grid$1_rows: typeof rows;
declare const Grid$1_cells: typeof cells;
declare namespace Grid$1 {
  export {
    Grid$1_GridVisual as GridVisual,
    Grid$1_Grid as Grid,
    Grid$1_Cell as Cell,
    Grid$1_Neighbours as Neighbours,
    Grid$1_CardinalDirection as CardinalDirection,
    Grid$1_BoundsLogic as BoundsLogic,
    Grid$1_VisitorLogic as VisitorLogic,
    Grid$1_VisitGenerator as VisitGenerator,
    Grid$1_VisitorOpts as VisitorOpts,
    Grid$1_Visitor as Visitor,
    Grid$1_NeighbourMaybe as NeighbourMaybe,
    Grid$1_Neighbour as Neighbour,
    Grid$1_NeighbourSelector as NeighbourSelector,
    Grid$1_IdentifyNeighbours as IdentifyNeighbours,
    Grid$1_isEqual as isEqual,
    Grid$1_cellKeyString as cellKeyString,
    Grid$1_cellEquals as cellEquals,
    Grid$1_guardCell as guardCell,
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
    Grid$1_rows as rows,
    Grid$1_cells as cells,
  };
}

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
}) => readonly Point[];
declare type ArrowOpts = {
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
declare const arrow: (origin: Point, from: `tip` | `tail` | `middle`, opts?: ArrowOpts) => readonly Point[];

declare const Shape_center: typeof center;
declare const Shape_starburst: typeof starburst;
type Shape_ArrowOpts = ArrowOpts;
declare const Shape_arrow: typeof arrow;
declare namespace Shape {
  export {
    Shape_center as center,
    Shape_starburst as starburst,
    Shape_ArrowOpts as ArrowOpts,
    Shape_arrow as arrow,
  };
}

declare type Vector = Point | Coord;
/**
 * Create a vector from a point
 *
 * If `unipolar` normalisation is used, direction will be fixed to 0..2π
 * if `bipolar` normalisation is used, direction will be fixed to -π...π
 * @param pt Point
 * @param angleNormalisation Technique to normalise angle
 * @param origin Origin to calculate vector from or 0,0 if left empty
 * @returns
 */
declare const fromPointPolar: (pt: Point, angleNormalisation?: `` | `unipolar` | `bipolar`, origin?: Point) => Coord;
/**
 * Returns a Cartesian-coordiante vector from a line a -> b
 * @param line
 * @returns
 */
declare const fromLineCartesian: (line: Line) => Point;
/**
 * Returns a polar-coordinate vector from a line a -> b
 * @param line
 * @returns
 */
declare const fromLinePolar: (line: Line) => Coord;
/**
 * Returns the normalised vector (aka unit vector). This is where
 * direction is kept, but magnitude set to 1. This then just
 * suggests direction.
 * @param v
 * @returns
 */
declare const normalise: (v: Vector) => Vector;
declare const quadrantOffsetAngle: (p: Point) => number;
/**
 * Converts a vector to a polar coordinate. If the provided
 * value is already Polar, it is returned.
 * @param v
 * @param origin
 * @returns Polar vector
 */
declare const toPolar: (v: Vector, origin?: Readonly<{
    x: 0;
    y: 0;
}>) => Coord;
/**
 * Converts a Vector to a Cartesian coordinate. If the provided
 * value is already Cartesian, it is returned.
 * @param v
 * @returns Cartestian vector
 */
declare const toCartesian: (v: Vector) => Point;
/**
 * Return a human-friendly representation of vector
 * @param v
 * @param digits
 * @returns
 */
declare const toString: (v: Vector, digits?: number) => string;
/**
 * Calculate dot product of a vector
 * @param a
 * @param b
 * @returns
 */
declare const dotProduct: (a: Vector, b: Vector) => number;
/**
 * Clamps the magnitude of a vector
 * @param v Vector to clamp
 * @param max Maximum magnitude
 * @param min Minium magnitude
 * @returns
 */
declare const clampMagnitude: (v: Vector, max?: number, min?: number) => Point | Coord;
/**
 * Returns `a + b`.
 *
 * Vector is returned in the same type as `a`.
 * @param a
 * @param b
 * @returns
 */
declare const sum: (a: Vector, b: Vector) => Point | Coord;
/**
 * Returns `a - b`.
 *
 * Vector is returned in the same type as `a`
 * @param a
 * @param b
 */
declare const subtract: (a: Vector, b: Vector) => Point | Coord;
/**
 * Returns `a * b`.
 *
 * Vector is returned in the same type `a`.
 * @param a
 * @param b
 */
declare const multiply: (a: Vector, b: Vector) => Point | Coord;
/**
 * Returns `a / b`.
 *
 * Vector is returned in the same type `a`.
 * @param a
 * @param b
 */
declare const divide: (a: Vector, b: Vector) => Point | Coord;

type Vector$1_Vector = Vector;
declare const Vector$1_fromPointPolar: typeof fromPointPolar;
declare const Vector$1_fromLineCartesian: typeof fromLineCartesian;
declare const Vector$1_fromLinePolar: typeof fromLinePolar;
declare const Vector$1_normalise: typeof normalise;
declare const Vector$1_quadrantOffsetAngle: typeof quadrantOffsetAngle;
declare const Vector$1_toPolar: typeof toPolar;
declare const Vector$1_toCartesian: typeof toCartesian;
declare const Vector$1_toString: typeof toString;
declare const Vector$1_dotProduct: typeof dotProduct;
declare const Vector$1_clampMagnitude: typeof clampMagnitude;
declare const Vector$1_sum: typeof sum;
declare const Vector$1_subtract: typeof subtract;
declare const Vector$1_multiply: typeof multiply;
declare const Vector$1_divide: typeof divide;
declare namespace Vector$1 {
  export {
    Vector$1_Vector as Vector,
    Vector$1_fromPointPolar as fromPointPolar,
    Vector$1_fromLineCartesian as fromLineCartesian,
    Vector$1_fromLinePolar as fromLinePolar,
    Vector$1_normalise as normalise,
    Vector$1_quadrantOffsetAngle as quadrantOffsetAngle,
    Vector$1_toPolar as toPolar,
    Vector$1_toCartesian as toCartesian,
    Vector$1_toString as toString,
    Vector$1_dotProduct as dotProduct,
    Vector$1_clampMagnitude as clampMagnitude,
    Vector$1_sum as sum,
    Vector$1_subtract as subtract,
    Vector$1_multiply as multiply,
    Vector$1_divide as divide,
  };
}

declare type Opts = {
    readonly maxDistanceFromLine?: number;
    readonly enforceOrder?: boolean;
};
declare const fromPoints: (waypoints: readonly Point[], opts?: Opts) => (pt: Point) => {
    path: Path;
    index: number;
    nearest: Point;
    distance: number;
}[];
declare const init: (paths: readonly Path[], opts?: Opts) => (pt: Point) => {
    path: Path;
    index: number;
    nearest: Point;
    distance: number;
}[];

type Waypoint_Opts = Opts;
declare const Waypoint_fromPoints: typeof fromPoints;
declare const Waypoint_init: typeof init;
declare namespace Waypoint {
  export {
    Waypoint_Opts as Opts,
    Waypoint_fromPoints as fromPoints,
    Waypoint_init as init,
  };
}

declare type Sphere = Point3d & {
    readonly radius: number;
};

type Sphere$1_Sphere = Sphere;
declare namespace Sphere$1 {
  export {
    Sphere$1_Sphere as Sphere,
  };
}

/**
 * Options for a Vogel spiral
 */
declare type VogelSpiralOpts = {
    /**
     * Upper limit of points to produce.
     * By default, 5000.
     */
    readonly maxPoints?: number;
    /**
     * Density value (0..1) which determines spacing of points.
     * This is useful because it scales with whatever circle radius is given
     * Use this parameter OR the `spacing` parameter.
     */
    readonly density?: number;
    /**
     * Spacing between points.
     * Use this option OR the density value.
     */
    readonly spacing?: number;
    /**
     * Rotation offset to apply, in radians. 0 by default
     */
    readonly rotation?: number;
};
/**
 * Generates points on a Vogel spiral - a sunflower-like arrangement of points.
 *
 * @example With no arguments, assumes a unit circle
 * ```js
 * for (const pt of vogelSpiral()) {
 *  // Generate points on a unit circle, with 95% density
 * }
 * ```
 *
 *
 * @example Specifying a circle and options
 * ```js
 * const circle = { radius: 100, x: 100, y: 100 };
 * const opts = {
 *  maxPoints: 50,
 *  density: 0.99
 * };
 * for (const pt of vogelSpiral(circle, opts)) {
 *  // Do something with point...
 * }
 * ```
 *
 * @example Array format
 * ```js
 * const ptsArray = [...vogelSpiral(circle, opts)];
 * ```
 * @param circle
 * @param opts
 */
declare function vogelSpiral(circle?: Circle, opts?: VogelSpiralOpts): IterableIterator<Point>;
/**
 * Fibonacci sphere algorithm. Generates points
 * distributed on a sphere.
 *
 * @example Generate points of a unit sphere
 * ```js
 * for (const pt of sphereFibonacci(100)) {
 *  // pt.x, pt.y, pt.z
 * }
 * ```
 *
 * @example Generate points into an array
 * ```js
 * const sphere = { radius: 10, x: 10, y: 200 }
 * const pts = [...sphereFibonacci(100, 0, sphere)];
 * ```
 *
 * Source: https://codepen.io/elchininet/pen/vXeRyL
 *
 * @param samples
 * @returns
 */
declare function sphereFibonacci(samples?: number, rotationRadians?: number, sphere?: Sphere): IterableIterator<Point3d>;

type SurfacePoints_VogelSpiralOpts = VogelSpiralOpts;
declare const SurfacePoints_vogelSpiral: typeof vogelSpiral;
declare const SurfacePoints_sphereFibonacci: typeof sphereFibonacci;
declare namespace SurfacePoints {
  export {
    SurfacePoints_VogelSpiralOpts as VogelSpiralOpts,
    SurfacePoints_vogelSpiral as vogelSpiral,
    SurfacePoints_sphereFibonacci as sphereFibonacci,
  };
}

/**
 * Convert angle in degrees to angle in radians.
 * @param angleInDegrees
 * @returns
 */
declare function degreeToRadian(angleInDegrees: number): number;
/**
 * Convert angles in degrees to angles in radians
 * @param angleInDegrees
 */
declare function degreeToRadian(angleInDegrees: readonly number[]): readonly number[];
/**
 * Convert angle in radians to angle in degrees
 * @param angleInRadians
 * @returns
 */
declare function radianToDegree(angleInRadians: number): number;
/**
 * Convert angles in radians to angles in degrees
 * @param angleInRadians
 */
declare function radianToDegree(angleInRadians: readonly number[]): readonly number[];
/**
 * Angle from x-axis to point (ie. `Math.atan2`)
 * @param point
 * @returns
 */
declare const radiansFromAxisX: (point: Point) => number;

declare const index_Polar: typeof Polar;
declare const index_degreeToRadian: typeof degreeToRadian;
declare const index_radianToDegree: typeof radianToDegree;
declare const index_radiansFromAxisX: typeof radiansFromAxisX;
declare const index_Scaler: typeof Scaler;
declare const index_SurfacePoints: typeof SurfacePoints;
declare namespace index {
  export {
    Circle$1 as Circles,
    Line$1 as Lines,
    Rect$1 as Rects,
    Point$1 as Points,
    Path$1 as Paths,
    Grid$1 as Grids,
    Bezier as Beziers,
    CompoundPath$1 as Compound,
    Ellipse as Ellipses,
    Waypoint as Waypoints,
    Sphere$1 as Spheres,
    Arc as Arcs,
    Shape as Shapes,
    Vector$1 as Vectors,
    index_Polar as Polar,
    index_degreeToRadian as degreeToRadian,
    index_radianToDegree as radianToDegree,
    index_radiansFromAxisX as radiansFromAxisX,
    index_Scaler as Scaler,
    index_SurfacePoints as SurfacePoints,
    Triangle$1 as Triangles,
  };
}

export { CompoundPath$1 as C, Grid$1 as G, Sphere$1 as S, Vector$1 as V, Waypoint as W, Shape as a, radiansFromAxisX as b, SurfacePoints as c, degreeToRadian as d, index as i, radianToDegree as r };
