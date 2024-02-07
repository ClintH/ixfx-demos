import { C as CirclePositioned, a as Point, b as Path, f as Circle, S as ShapePositioned, g as CompoundPath$1, D as Dimensions, c as RectPositioned, h as Cell, G as Grid, d as CellAccessor, V as VisitGenerator, L as Line, P as Point3d, i as index$2, j as CircularPath, k as Grid$1, l as index$3, m as index$4, n as PointCalculableShape, o as index$5, p as PolyLine, q as RandomPointOpts, R as Rect, r as RectArray, s as RectPositionedArray, t as index$6, u as index$7, T as Triangle, v as index$8, W as WithBeziers, w as area, x as cardinal, y as center, z as clamp, A as corners, B as distanceFromCenter, E as distanceFromExterior, F as edges, H as empty, I as emptyPositioned, J as fromCenter, K as fromElement, M as fromNumbers, N as fromTopLeft, O as getEdgeX, Q as getEdgeY, U as getEnd, X as getStart, Y as intersectsPoint, Z as isEqual, _ as isEqualSize, $ as isIntersecting, a0 as lengths, a1 as maxFromCorners, a2 as multiply$3, a3 as multiplyScalar, a4 as normaliseByRect, a5 as perimeter, a6 as placeholder, a7 as placeholderPositioned, a8 as random$1, a9 as randomPoint, aa as subtract$1, ab as sum$1, ac as toArray } from './index-i31F4rTB.js';
import { R as RandomSource } from './Types-ATA4eXqe.js';
import { i as index$1, B as Bezier, a as Ellipse } from './index-z-qNRDPH.js';
import { P as PolarCoord, V as Vector$1, S as Sphere } from './Types-o-mlONbB.js';
import { T as TraversableTree } from './Types-Dp38nROC.js';
import { a as Scaler } from './Scaler-NaHztIth.js';
import { R as Rgb } from './Colour-IwlMqKTM.js';

type Waypoint = CirclePositioned;
type WaypointOpts = {
    readonly maxDistanceFromLine: number;
    readonly enforceOrder: boolean;
};
/**
 * Create from set of points, connected in order starting at array position 0.
 * @param waypoints
 * @param opts
 * @returns
 */
declare const fromPoints: (waypoints: ReadonlyArray<Point>, opts?: Partial<WaypointOpts>) => Waypoints;
/**
 * Result
 */
type WaypointResult = {
    /**
     * Path being compared against
     */
    path: Path;
    /**
     * Index of this path in original `paths` array
     */
    index: number;
    /**
     * Nearest point on path. See also {@link distance}
     */
    nearest: Point;
    /**
     * Closest distance to path. See also {@link nearest}
     */
    distance: number;
    /**
     * Rank of this result, 0 being highest.
     */
    rank: number;
    /**
     * Relative position on this path segment
     * 0 being start, 0.5 middle and so on.
     */
    positionRelative: number;
};
/**
 * Given point `pt`, returns a list of {@link WaypointResult}, comparing
 * this point to a set of paths.
 * ```js
 * // Init once with a set of paths
 * const w = init(paths);
 * // Now call with a point to get results
 * const results = w({ x: 10, y: 20 });
 * ```
 */
type Waypoints = (pt: Point) => Array<WaypointResult>;
/**
 * Initialise
 *
 * Options:
 * * maxDistanceFromLine: Distances greater than this are not matched. Default 0.1
 * @param paths
 * @param opts
 * @returns
 */
declare const init: (paths: ReadonlyArray<Path>, opts?: Partial<WaypointOpts>) => Waypoints;

type Waypoint$1_Waypoint = Waypoint;
type Waypoint$1_WaypointOpts = WaypointOpts;
type Waypoint$1_WaypointResult = WaypointResult;
type Waypoint$1_Waypoints = Waypoints;
declare const Waypoint$1_fromPoints: typeof fromPoints;
declare const Waypoint$1_init: typeof init;
declare namespace Waypoint$1 {
  export { type Waypoint$1_Waypoint as Waypoint, type Waypoint$1_WaypointOpts as WaypointOpts, type Waypoint$1_WaypointResult as WaypointResult, type Waypoint$1_Waypoints as Waypoints, Waypoint$1_fromPoints as fromPoints, Waypoint$1_init as init };
}

type RandomOpts = {
    readonly attempts?: number;
    readonly randomSource?: RandomSource;
};
/**
 * Naive randomised circle packing.
 * [Algorithm by Taylor Hobbs](https://tylerxhobbs.com/essays/2016/a-randomized-approach-to-cicle-packing)
 */
declare const random: (circles: ReadonlyArray<Circle>, container: ShapePositioned, opts?: RandomOpts) => CirclePositioned[];

type CirclePacking_RandomOpts = RandomOpts;
declare const CirclePacking_random: typeof random;
declare namespace CirclePacking {
  export { type CirclePacking_RandomOpts as RandomOpts, CirclePacking_random as random };
}

declare const Layout_CirclePacking: typeof CirclePacking;
declare namespace Layout {
  export { Layout_CirclePacking as CirclePacking };
}

/**
 * Returns a new compoundpath, replacing a path at a given index
 *
 * @param compoundPath Existing compoundpath
 * @param index Index to replace at
 * @param path Path to substitute in
 * @returns New compoundpath
 */
declare const setSegment: (compoundPath: CompoundPath$1, index: number, path: Path) => CompoundPath$1;
/**
 * Computes x,y point at a relative position along compoundpath
 *
 * @param paths Combined paths (assumes contiguous)
 * @param t Position (given as a percentage from 0 to 1)
 * @param useWidth If true, widths are used for calulcating. If false, lengths are used
 * @param dimensions Precalculated dimensions of paths, will be computed if omitted
 * @returns
 */
declare const interpolate: (paths: ReadonlyArray<Path>, t: number, useWidth?: boolean, dimensions?: Dimensions) => Point;
/**
 * Returns the shortest distance of `point` to any point on `paths`.
 * @param paths
 * @param point
 * @returns
 */
declare const distanceToPoint: (paths: ReadonlyArray<Path>, point: Point) => number;
declare const relativePosition: (paths: ReadonlyArray<Path>, point: Point, intersectionThreshold: number, dimensions?: Dimensions) => number;
/**
 * Computes the widths and lengths of all paths, adding them up as well
 *
 * @param paths
 * @returns
 */
declare const computeDimensions: (paths: ReadonlyArray<Path>) => Dimensions;
/**
 * Computes the bounding box that encloses entire compoundpath
 *
 * @param paths
 * @returns
 */
declare const bbox: (paths: ReadonlyArray<Path>) => RectPositioned;
/**
 * Produce a human-friendly representation of paths
 *
 * @param paths
 * @returns
 */
declare const toString$2: (paths: ReadonlyArray<Path>) => string;
/**
 * Throws an error if paths are not connected together, in order
 *
 * @param paths
 */
declare const guardContinuous: (paths: ReadonlyArray<Path>) => void;
declare const toSvgString: (paths: ReadonlyArray<Path>) => ReadonlyArray<string>;
/**
 * Create a compoundpath from an array of paths.
 * All this does is verify they are connected, and precomputes dimensions
 *
 * @param paths
 * @returns
 */
declare const fromPaths: (...paths: ReadonlyArray<Path>) => CompoundPath$1;

declare const CompoundPath_bbox: typeof bbox;
declare const CompoundPath_computeDimensions: typeof computeDimensions;
declare const CompoundPath_distanceToPoint: typeof distanceToPoint;
declare const CompoundPath_fromPaths: typeof fromPaths;
declare const CompoundPath_guardContinuous: typeof guardContinuous;
declare const CompoundPath_interpolate: typeof interpolate;
declare const CompoundPath_relativePosition: typeof relativePosition;
declare const CompoundPath_setSegment: typeof setSegment;
declare const CompoundPath_toSvgString: typeof toSvgString;
declare namespace CompoundPath {
  export { CompoundPath_bbox as bbox, CompoundPath_computeDimensions as computeDimensions, CompoundPath_distanceToPoint as distanceToPoint, CompoundPath_fromPaths as fromPaths, CompoundPath_guardContinuous as guardContinuous, CompoundPath_interpolate as interpolate, CompoundPath_relativePosition as relativePosition, CompoundPath_setSegment as setSegment, toString$2 as toString, CompoundPath_toSvgString as toSvgString };
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
declare function degreeToRadian(angleInDegrees: ReadonlyArray<number>): ReadonlyArray<number>;
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
declare function radianToDegree(angleInRadians: ReadonlyArray<number>): ReadonlyArray<number>;
/**
 * Angle from x-axis to point (ie. `Math.atan2`)
 * @param point
 * @returns
 */
declare const radiansFromAxisX: (point: Point) => number;

/**
 * Simplifies a curve by dropping points based on shortest distance.
 *
 * Values of `epsilon` approaching zero keep more of the original points.
 * Making `epsilon` larger will filter out more points, making the curve more lossy and jagged.
 *
 * ```js
 * // Source set of points that define the curve
 * const pts = [ {x:100,y:200}, {x:10, y:20}, ... ];
 *
 * const simplified = rdpShortestDistance(pts, 3); // Yields an array of points
 * ```
 * It is an implementation of the [Ramer Douglas Peucker algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm)
 * by Marius Karthaus. Try the online playground: https://karthaus.nl/rdp/
 *
 * @param points
 * @param epsilon
 * @returns
 */
declare const rdpShortestDistance: (points: Array<Point>, epsilon?: number) => Array<Point>;
/**
 * Simplifies a curve by dropping points based on perpendicular distance
 *
 * Values of `epsilon` approaching zero keep more of the original points.
 * Making `epsilon` larger will filter out more points, making the curve more lossy and jagged.
 *
 * ```js
 * // Source set of points that define the curve
 * const pts = [ {x:100,y:200}, {x:10, y:20}, ... ];
 *
 * const simplified = rdpShortestDistance(pts, 3); // Yields an array of points
 * ```
 * It is an implementation of the [Ramer Douglas Peucker algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm)
 * by Marius Karthaus. Try the online playground: https://karthaus.nl/rdp/
 *
 * @param points
 * @param epsilon
 * @returns
 */
declare const rdpPerpendicularDistance: (points: Array<Point>, epsilon?: number) => Array<Point>;

declare const CurveSimplification_rdpPerpendicularDistance: typeof rdpPerpendicularDistance;
declare const CurveSimplification_rdpShortestDistance: typeof rdpShortestDistance;
declare namespace CurveSimplification {
  export { CurveSimplification_rdpPerpendicularDistance as rdpPerpendicularDistance, CurveSimplification_rdpShortestDistance as rdpShortestDistance };
}

/**
 * Options for quad tree
 */
type QuadTreeOpts = {
    /**
     * Maximum items per node
     */
    readonly maxItems: number;
    /**
     * Maximum level of sub-division
     */
    readonly maxLevels: number;
};
/**
 * Direction
 */
declare enum Direction {
    Nw = 0,
    Ne = 1,
    Sw = 2,
    Se = 3
}
/**
 * A Point or ShapePositioned
 */
type QuadTreeItem = Point | ShapePositioned;
/**
 * Creates a QuadTreeNode
 * @param bounds Bounds of region
 * @param initialData Initial items to place in quad tree
 * @param opts Options
 * @returns New quad tree
 */
declare const quadTree: (bounds: RectPositioned, initialData?: ReadonlyArray<QuadTreeItem>, opts?: Partial<QuadTreeOpts>) => QuadTreeNode;
/**
 * QuadTreeNode
 *
 * To create, you probably want the {@link quadTree} function.
 */
declare class QuadTreeNode implements TraversableTree<Array<QuadTreeItem>> {
    #private;
    readonly boundary: RectPositioned;
    readonly level: number;
    readonly opts: QuadTreeOpts;
    /**
     * Constructor
     * @param boundary
     * @param level
     * @param opts
     */
    constructor(parent: QuadTreeNode | undefined, boundary: RectPositioned, level: number, opts: QuadTreeOpts);
    getLengthChildren(): number;
    parents(): IterableIterator<QuadTreeNode>;
    getParent(): QuadTreeNode | undefined;
    children(): IterableIterator<QuadTreeNode>;
    getValue(): QuadTreeItem[];
    getIdentity(): this;
    /**
     * Get a descendant node in a given direction
     * @param d
     * @returns
     */
    direction(d: Direction): QuadTreeNode | undefined;
    /**
     * Add an item to the quadtree
     * @param p
     * @returns False if item is outside of boundary, True if item was added
     */
    add(p: QuadTreeItem): boolean;
    /**
     * Returns true if point is inside node's boundary
     * @param p
     * @returns
     */
    couldHold(p: Point): boolean;
}

type QuadTree_Direction = Direction;
declare const QuadTree_Direction: typeof Direction;
type QuadTree_QuadTreeItem = QuadTreeItem;
type QuadTree_QuadTreeNode = QuadTreeNode;
declare const QuadTree_QuadTreeNode: typeof QuadTreeNode;
type QuadTree_QuadTreeOpts = QuadTreeOpts;
declare const QuadTree_quadTree: typeof quadTree;
declare namespace QuadTree {
  export { QuadTree_Direction as Direction, type QuadTree_QuadTreeItem as QuadTreeItem, QuadTree_QuadTreeNode as QuadTreeNode, type QuadTree_QuadTreeOpts as QuadTreeOpts, QuadTree_quadTree as quadTree };
}

type Kernel = ReadonlyArray<ReadonlyArray<number>>;
type CellWithValue<V> = readonly [cell: Cell, value: V | undefined];
type ScalarAndValue<V> = readonly [scalar: number, v: V | undefined];
type KernelCompute = <V>(offset: Cell, value: V) => V;
type KernelReduce<V> = (values: ReadonlyArray<ScalarAndValue<V>>) => V | undefined;
/**
 * Multiply every element of kernel by the same `scalar` value.
 * Returns new result, input is unmodified
 * @param kernel
 * @param scalar
 * @returns
 */
declare const multiply$2: (kernel: Kernel, scalar: number) => Kernel;
declare function convolveCell<V>(c: Cell, kernel: Kernel2dArray, source: Grid, access: CellAccessor<V>, reduce: KernelReduce<V>): V | undefined;
/**
 * Performs kernel-based convolution over `image`.
 * @param kernel
 * @param image
 */
declare function convolveImage(kernel: Kernel, image: ImageData): Generator<CellWithValue<Rgb>, void, undefined>;
declare function convolve<V>(kernel: Kernel, source: Grid, access: CellAccessor<V>, visitor: VisitGenerator, reduce: KernelReduce<V>, origin?: Cell): IterableIterator<CellWithValue<V>>;
type Kernel2dArray = ReadonlyArray<readonly [cell: Cell, value: number]>;
/**
 * For a given kernel, returns an array of offsets. These
 * consist of a cell offset (eg `{x:-1,y:-1}`) and the value at that kernel position.
 * @param kernel
 * @param origin
 * @returns
 */
declare const kernel2dToArray: (kernel: Kernel, origin?: Cell) => Kernel2dArray;
declare const rgbReducer: KernelReduce<Rgb>;
declare const identityKernel: number[][];
declare const edgeDetectionKernel: number[][];
declare const sharpenKernel: number[][];
declare const boxBlurKernel: Kernel;
declare const gaussianBlur3Kernel: Kernel;
declare const gaussianBlur5Kernel: Kernel;
declare const unsharpMasking5Kernel: Kernel;

type Convolve2d_CellWithValue<V> = CellWithValue<V>;
type Convolve2d_Kernel = Kernel;
type Convolve2d_Kernel2dArray = Kernel2dArray;
type Convolve2d_KernelCompute = KernelCompute;
type Convolve2d_KernelReduce<V> = KernelReduce<V>;
type Convolve2d_ScalarAndValue<V> = ScalarAndValue<V>;
declare const Convolve2d_boxBlurKernel: typeof boxBlurKernel;
declare const Convolve2d_convolve: typeof convolve;
declare const Convolve2d_convolveCell: typeof convolveCell;
declare const Convolve2d_convolveImage: typeof convolveImage;
declare const Convolve2d_edgeDetectionKernel: typeof edgeDetectionKernel;
declare const Convolve2d_gaussianBlur3Kernel: typeof gaussianBlur3Kernel;
declare const Convolve2d_gaussianBlur5Kernel: typeof gaussianBlur5Kernel;
declare const Convolve2d_identityKernel: typeof identityKernel;
declare const Convolve2d_kernel2dToArray: typeof kernel2dToArray;
declare const Convolve2d_rgbReducer: typeof rgbReducer;
declare const Convolve2d_sharpenKernel: typeof sharpenKernel;
declare const Convolve2d_unsharpMasking5Kernel: typeof unsharpMasking5Kernel;
declare namespace Convolve2d {
  export { type Convolve2d_CellWithValue as CellWithValue, type Convolve2d_Kernel as Kernel, type Convolve2d_Kernel2dArray as Kernel2dArray, type Convolve2d_KernelCompute as KernelCompute, type Convolve2d_KernelReduce as KernelReduce, type Convolve2d_ScalarAndValue as ScalarAndValue, Convolve2d_boxBlurKernel as boxBlurKernel, Convolve2d_convolve as convolve, Convolve2d_convolveCell as convolveCell, Convolve2d_convolveImage as convolveImage, Convolve2d_edgeDetectionKernel as edgeDetectionKernel, Convolve2d_gaussianBlur3Kernel as gaussianBlur3Kernel, Convolve2d_gaussianBlur5Kernel as gaussianBlur5Kernel, Convolve2d_identityKernel as identityKernel, Convolve2d_kernel2dToArray as kernel2dToArray, multiply$2 as multiply, Convolve2d_rgbReducer as rgbReducer, Convolve2d_sharpenKernel as sharpenKernel, Convolve2d_unsharpMasking5Kernel as unsharpMasking5Kernel };
}

declare const fromRadians: (radians: number) => Readonly<{
    x: number;
    y: number;
}>;
declare const toRadians: (point: Point) => number;
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
declare const fromPointPolar: (pt: Point, angleNormalisation?: `` | `unipolar` | `bipolar`, origin?: Point) => PolarCoord;
/**
 * Returns a Cartesian-coordinate vector from a line a -> b
 * @param line
 * @returns
 */
declare const fromLineCartesian: (line: Line) => Point;
/**
 * Returns a polar-coordinate vector from a line a -> b
 * @param line
 * @returns
 */
declare const fromLinePolar: (line: Line) => PolarCoord;
/**
 * Returns the normalised vector (aka unit vector). This is where
 * direction is kept, but magnitude set to 1. This then just
 * suggests direction.
 * @param v
 * @returns
 */
declare const normalise$1: (v: Vector$1) => Vector$1;
declare const quadrantOffsetAngle: (p: Point) => number;
/**
 * Converts a vector to a polar coordinate. If the provided
 * value is already Polar, it is returned.
 * @param v
 * @param origin
 * @returns Polar vector
 */
declare const toPolar: (v: Vector$1, origin?: {
    readonly x: 0;
    readonly y: 0;
}) => PolarCoord;
/**
 * Converts a Vector to a Cartesian coordinate. If the provided
 * value is already Cartesian, it is returned.
 * @param v
 * @returns Cartestian vector
 */
declare const toCartesian$1: (v: Vector$1) => Point;
/**
 * Return a human-friendly representation of vector
 * @param v
 * @param digits
 * @returns
 */
declare const toString$1: (v: Vector$1, digits?: number) => string;
/**
 * Calculate dot product of a vector
 * @param a
 * @param b
 * @returns
 */
declare const dotProduct$1: (a: Vector$1, b: Vector$1) => number;
/**
 * Clamps the magnitude of a vector
 * @param v Vector to clamp
 * @param max Maximum magnitude
 * @param min Minium magnitude
 * @returns
 */
declare const clampMagnitude$1: (v: Vector$1, max?: number, min?: number) => Point | PolarCoord;
/**
 * Returns `a + b`.
 *
 * Vector is returned in the same type as `a`.
 * @param a
 * @param b
 * @returns
 */
declare const sum: (a: Vector$1, b: Vector$1) => Point | PolarCoord;
/**
 * Returns `a - b`.
 *
 * Vector is returned in the same type as `a`
 * @param a
 * @param b
 */
declare const subtract: (a: Vector$1, b: Vector$1) => Point | PolarCoord;
/**
 * Returns `a * b`.
 *
 * Vector is returned in the same type `a`.
 * @param a
 * @param b
 */
declare const multiply$1: (a: Vector$1, b: Vector$1) => Point | PolarCoord;
/**
 * Returns `a / b`.
 *
 * Vector is returned in the same type `a`.
 * @param a
 * @param b
 */
declare const divide$1: (a: Vector$1, b: Vector$1) => Point | PolarCoord;

declare const Vector_fromLineCartesian: typeof fromLineCartesian;
declare const Vector_fromLinePolar: typeof fromLinePolar;
declare const Vector_fromPointPolar: typeof fromPointPolar;
declare const Vector_fromRadians: typeof fromRadians;
declare const Vector_quadrantOffsetAngle: typeof quadrantOffsetAngle;
declare const Vector_subtract: typeof subtract;
declare const Vector_sum: typeof sum;
declare const Vector_toPolar: typeof toPolar;
declare const Vector_toRadians: typeof toRadians;
declare namespace Vector {
  export { clampMagnitude$1 as clampMagnitude, divide$1 as divide, dotProduct$1 as dotProduct, Vector_fromLineCartesian as fromLineCartesian, Vector_fromLinePolar as fromLinePolar, Vector_fromPointPolar as fromPointPolar, Vector_fromRadians as fromRadians, multiply$1 as multiply, normalise$1 as normalise, Vector_quadrantOffsetAngle as quadrantOffsetAngle, Vector_subtract as subtract, Vector_sum as sum, toCartesian$1 as toCartesian, Vector_toPolar as toPolar, Vector_toRadians as toRadians, toString$1 as toString };
}

/**
 * Converts to Cartesian coordiantes
 */
type ToCartesian = {
    (point: PolarCoord, origin?: Point): Point;
    (distance: number, angleRadians: number, origin?: Point): Point;
};
/**
 * Returns true if `p` seems to be a {@link PolarCoord} (ie has both distance & angleRadian fields)
 * @param p
 * @returns True if `p` seems to be a PolarCoord
 */
declare const isPolarCoord: (p: unknown) => p is PolarCoord;
/**
 * Converts a Cartesian coordinate to polar
 *
 * ```js
 * import { Polar } from 'https://unpkg.com/ixfx/dist/geometry.js';
 *
 * // Yields: { angleRadian, distance }
 * const polar = Polar.fromCartesian({x: 50, y: 50}, origin);
 * ```
 *
 * Any additional properties of `point` are copied to object.
 * @param point Point
 * @param origin Origin
 * @returns
 */
declare const fromCartesian: (point: Point, origin: Point) => PolarCoord;
/**
 * Converts to Cartesian coordinate from polar.
 *
 * ```js
 * import { Polar } from 'https://unpkg.com/ixfx/dist/geometry.js';
 *
 * const origin = { x: 50, y: 50}; // Polar origin
 * // Yields: { x, y }
 * const polar = Polar.toCartesian({ distance: 10, angleRadian: 0 }, origin);
 * ```
 *
 * Distance and angle can be provided as numbers intead:
 *
 * ```
 * // Yields: { x, y }
 * const polar = Polar.toCartesian(10, 0, origin);
 * ```
 *
 * @param a
 * @param b
 * @param c
 * @returns
 */
declare const toCartesian: ToCartesian;
/**
 * Produces an Archimedean spiral. It's a generator.
 *
 * ```js
 * const s = spiral(0.1, 1);
 * for (const coord of s) {
 *  // Use Polar coord...
 *  if (coord.step === 1000) break; // Stop after 1000 iterations
 * }
 * ```
 *
 * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
 * @param zoom At smoothness 0.1, zoom starting at 1 is OK
 */
declare function spiral(smoothness: number, zoom: number): IterableIterator<PolarCoord & {
    readonly step: number;
}>;
/**
 * Returns a rotated coordinate
 * @param c Coordinate
 * @param amountRadian Amount to rotate, in radians
 * @returns
 */
declare const rotate: (c: PolarCoord, amountRadian: number) => PolarCoord;
declare const normalise: (c: PolarCoord) => PolarCoord;
/**
 * Throws an error if PolarCoord is invalid
 * @param p
 * @param name
 */
declare const guard: (p: PolarCoord, name?: string) => void;
/**
 * Calculate dot product of two PolarCoords.
 *
 * Eg, power is the dot product of force and velocity
 *
 * Dot products are also useful for comparing similarity of
 *  angle between two unit PolarCoords.
 * @param a
 * @param b
 * @returns
 */
declare const dotProduct: (a: PolarCoord, b: PolarCoord) => number;
/**
 * Inverts the direction of coordinate. Ie if pointing north, will point south.
 * @param p
 * @returns
 */
declare const invert: (p: PolarCoord) => PolarCoord;
/**
 * Returns true if PolarCoords have same magnitude but opposite direction
 * @param a
 * @param b
 * @returns
 */
declare const isOpposite: (a: PolarCoord, b: PolarCoord) => boolean;
/**
 * Returns true if PolarCoords have the same direction, regardless of magnitude
 * @param a
 * @param b
 * @returns
 */
declare const isParallel: (a: PolarCoord, b: PolarCoord) => boolean;
/**
 * Returns true if coords are opposite direction, regardless of magnitude
 * @param a
 * @param b
 * @returns
 */
declare const isAntiParallel: (a: PolarCoord, b: PolarCoord) => boolean;
/**
 * Returns a rotated coordinate
 * @param c Coordinate
 * @param amountDeg Amount to rotate, in degrees
 * @returns
 */
declare const rotateDegrees: (c: PolarCoord, amountDeg: number) => PolarCoord;
/**
 * Produces an Archimedian spiral with manual stepping.
 * @param step Step number. Typically 0, 1, 2 ...
 * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
 * @param zoom At smoothness 0.1, zoom starting at 1 is OK
 * @returns
 */
declare const spiralRaw: (step: number, smoothness: number, zoom: number) => PolarCoord;
/**
 * Multiplies the magnitude of a coord by `amt`.
 * Direction is unchanged.
 * @param v
 * @param amt
 * @returns
 */
declare const multiply: (v: PolarCoord, amt: number) => PolarCoord;
/**
 * Divides the magnitude of a coord by `amt`.
 * Direction is unchanged.
 * @param v
 * @param amt
 * @returns
 */
declare const divide: (v: PolarCoord, amt: number) => PolarCoord;
/**
 * Clamps the magnitude of a vector
 * @param v
 * @param max
 * @param min
 * @returns
 */
declare const clampMagnitude: (v: PolarCoord, max?: number, min?: number) => PolarCoord;
/**
 * Returns a human-friendly string representation `(distance, angleDeg)`.
 * If `precision` is supplied, this will be the number of significant digits.
 * @param p
 * @returns
 */
declare const toString: (p: PolarCoord, digits?: number) => string;
declare const toPoint: (v: PolarCoord, origin?: Readonly<{
    x: 0;
    y: 0;
}>) => Point;

declare const Polar_clampMagnitude: typeof clampMagnitude;
declare const Polar_divide: typeof divide;
declare const Polar_dotProduct: typeof dotProduct;
declare const Polar_fromCartesian: typeof fromCartesian;
declare const Polar_guard: typeof guard;
declare const Polar_invert: typeof invert;
declare const Polar_isAntiParallel: typeof isAntiParallel;
declare const Polar_isOpposite: typeof isOpposite;
declare const Polar_isParallel: typeof isParallel;
declare const Polar_isPolarCoord: typeof isPolarCoord;
declare const Polar_multiply: typeof multiply;
declare const Polar_normalise: typeof normalise;
declare const Polar_rotate: typeof rotate;
declare const Polar_rotateDegrees: typeof rotateDegrees;
declare const Polar_spiral: typeof spiral;
declare const Polar_spiralRaw: typeof spiralRaw;
declare const Polar_toCartesian: typeof toCartesian;
declare const Polar_toPoint: typeof toPoint;
declare const Polar_toString: typeof toString;
declare namespace Polar {
  export { Polar_clampMagnitude as clampMagnitude, Polar_divide as divide, Polar_dotProduct as dotProduct, Polar_fromCartesian as fromCartesian, Polar_guard as guard, Polar_invert as invert, Polar_isAntiParallel as isAntiParallel, Polar_isOpposite as isOpposite, Polar_isParallel as isParallel, Polar_isPolarCoord as isPolarCoord, Polar_multiply as multiply, Polar_normalise as normalise, Polar_rotate as rotate, Polar_rotateDegrees as rotateDegrees, Polar_spiral as spiral, Polar_spiralRaw as spiralRaw, Polar_toCartesian as toCartesian, Polar_toPoint as toPoint, Polar_toString as toString };
}

/**
 * Options for a Vogel spiral
 */
type VogelSpiralOpts = {
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
 * for (const pt of circleVogelSpiral()) {
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
 * for (const pt of circleVogelSpiral(circle, opts)) {
 *  // Do something with point...
 * }
 * ```
 *
 * @example Array format
 * ```js
 * const ptsArray = [...circleVogelSpiral(circle, opts)];
 * ```
 * @param circle
 * @param opts
 */
declare function circleVogelSpiral(circle?: Circle, opts?: VogelSpiralOpts): IterableIterator<Point>;
type CircleRingsOpts = {
    readonly rings?: number;
    /**
     * Rotation offset, in radians
     */
    readonly rotation?: number;
};
/**
 * Generates points spaced out on the given number of rings.
 *
 * Get points as array
 * ```js
 * const circle = { radius: 5, x: 100, y: 100 };
 * const opts = { rings: 5 };
 * const points = [...circleRings(circle, rings)];
 * ```
 *
 * Or iterate over them
 * ```js
 * for (const point of circleRings(circle, opts)) {
 * }
 * ```
 * Source: http://www.holoborodko.com/pavel/2015/07/23/generating-equidistant-points-on-unit-disk/#more-3453
 * @param circle
 */
declare function circleRings(circle?: Circle | CirclePositioned, opts?: CircleRingsOpts): IterableIterator<Point>;
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

type SurfacePoints_CircleRingsOpts = CircleRingsOpts;
type SurfacePoints_VogelSpiralOpts = VogelSpiralOpts;
declare const SurfacePoints_circleRings: typeof circleRings;
declare const SurfacePoints_circleVogelSpiral: typeof circleVogelSpiral;
declare const SurfacePoints_sphereFibonacci: typeof sphereFibonacci;
declare namespace SurfacePoints {
  export { type SurfacePoints_CircleRingsOpts as CircleRingsOpts, type SurfacePoints_VogelSpiralOpts as VogelSpiralOpts, SurfacePoints_circleRings as circleRings, SurfacePoints_circleVogelSpiral as circleVogelSpiral, SurfacePoints_sphereFibonacci as sphereFibonacci };
}

declare const index_Circle: typeof Circle;
declare const index_CirclePositioned: typeof CirclePositioned;
declare const index_CircularPath: typeof CircularPath;
declare const index_Convolve2d: typeof Convolve2d;
declare const index_CurveSimplification: typeof CurveSimplification;
declare const index_Dimensions: typeof Dimensions;
declare const index_Line: typeof Line;
declare const index_Path: typeof Path;
declare const index_Point: typeof Point;
declare const index_Point3d: typeof Point3d;
declare const index_PointCalculableShape: typeof PointCalculableShape;
declare const index_Polar: typeof Polar;
declare const index_PolarCoord: typeof PolarCoord;
declare const index_PolyLine: typeof PolyLine;
declare const index_QuadTree: typeof QuadTree;
declare const index_RandomPointOpts: typeof RandomPointOpts;
declare const index_Rect: typeof Rect;
declare const index_RectArray: typeof RectArray;
declare const index_RectPositioned: typeof RectPositioned;
declare const index_RectPositionedArray: typeof RectPositionedArray;
declare const index_Scaler: typeof Scaler;
declare const index_ShapePositioned: typeof ShapePositioned;
declare const index_Sphere: typeof Sphere;
declare const index_SurfacePoints: typeof SurfacePoints;
declare const index_Triangle: typeof Triangle;
declare const index_WithBeziers: typeof WithBeziers;
declare const index_area: typeof area;
declare const index_cardinal: typeof cardinal;
declare const index_center: typeof center;
declare const index_clamp: typeof clamp;
declare const index_corners: typeof corners;
declare const index_degreeToRadian: typeof degreeToRadian;
declare const index_distanceFromCenter: typeof distanceFromCenter;
declare const index_distanceFromExterior: typeof distanceFromExterior;
declare const index_edges: typeof edges;
declare const index_empty: typeof empty;
declare const index_emptyPositioned: typeof emptyPositioned;
declare const index_fromCenter: typeof fromCenter;
declare const index_fromElement: typeof fromElement;
declare const index_fromNumbers: typeof fromNumbers;
declare const index_fromTopLeft: typeof fromTopLeft;
declare const index_getEdgeX: typeof getEdgeX;
declare const index_getEdgeY: typeof getEdgeY;
declare const index_getEnd: typeof getEnd;
declare const index_getStart: typeof getStart;
declare const index_intersectsPoint: typeof intersectsPoint;
declare const index_isEqual: typeof isEqual;
declare const index_isEqualSize: typeof isEqualSize;
declare const index_isIntersecting: typeof isIntersecting;
declare const index_lengths: typeof lengths;
declare const index_maxFromCorners: typeof maxFromCorners;
declare const index_multiplyScalar: typeof multiplyScalar;
declare const index_normaliseByRect: typeof normaliseByRect;
declare const index_perimeter: typeof perimeter;
declare const index_placeholder: typeof placeholder;
declare const index_placeholderPositioned: typeof placeholderPositioned;
declare const index_radianToDegree: typeof radianToDegree;
declare const index_radiansFromAxisX: typeof radiansFromAxisX;
declare const index_randomPoint: typeof randomPoint;
declare const index_toArray: typeof toArray;
declare namespace index {
  export { index$1 as Arcs, Bezier as Beziers, index_Circle as Circle, index_CirclePositioned as CirclePositioned, index$2 as Circles, index_CircularPath as CircularPath, CompoundPath as Compound, CompoundPath$1 as CompoundPath, index_Convolve2d as Convolve2d, index_CurveSimplification as CurveSimplification, index_Dimensions as Dimensions, Ellipse as Ellipses, Grid$1 as Grids, Layout as Layouts, index_Line as Line, index$3 as Lines, index_Path as Path, index$4 as Paths, index_Point as Point, index_Point3d as Point3d, index_PointCalculableShape as PointCalculableShape, index$5 as Points, index_Polar as Polar, index_PolarCoord as PolarCoord, index_PolyLine as PolyLine, index_QuadTree as QuadTree, index_RandomPointOpts as RandomPointOpts, index_Rect as Rect, index_RectArray as RectArray, index_RectPositioned as RectPositioned, index_RectPositionedArray as RectPositionedArray, index$6 as Rects, index_Scaler as Scaler, index_ShapePositioned as ShapePositioned, index$7 as Shapes, index_Sphere as Sphere, index_SurfacePoints as SurfacePoints, index_Triangle as Triangle, index$8 as Triangles, Vector$1 as Vector, Vector as Vectors, Waypoint$1 as Waypoints, index_WithBeziers as WithBeziers, index_area as area, index_cardinal as cardinal, index_center as center, index_clamp as clamp, index_corners as corners, index_degreeToRadian as degreeToRadian, index_distanceFromCenter as distanceFromCenter, index_distanceFromExterior as distanceFromExterior, index_edges as edges, index_empty as empty, index_emptyPositioned as emptyPositioned, index_fromCenter as fromCenter, index_fromElement as fromElement, index_fromNumbers as fromNumbers, index_fromTopLeft as fromTopLeft, index_getEdgeX as getEdgeX, index_getEdgeY as getEdgeY, index_getEnd as getEnd, index_getStart as getStart, index_intersectsPoint as intersectsPoint, index_isEqual as isEqual, index_isEqualSize as isEqualSize, index_isIntersecting as isIntersecting, index_lengths as lengths, index_maxFromCorners as maxFromCorners, multiply$3 as multiply, index_multiplyScalar as multiplyScalar, index_normaliseByRect as normaliseByRect, index_perimeter as perimeter, index_placeholder as placeholder, index_placeholderPositioned as placeholderPositioned, index_radianToDegree as radianToDegree, index_radiansFromAxisX as radiansFromAxisX, random$1 as random, index_randomPoint as randomPoint, subtract$1 as subtract, sum$1 as sum, index_toArray as toArray };
}

export { CompoundPath as C, Layout as L, Polar as P, QuadTree as Q, SurfacePoints as S, Vector as V, Waypoint$1 as W, CurveSimplification as a, Convolve2d as b, radiansFromAxisX as c, degreeToRadian as d, index as i, radianToDegree as r };
