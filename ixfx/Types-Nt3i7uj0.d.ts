import { C as CirclePositioned, P as Point, a as Path, d as Circle, S as ShapePositioned, e as CompoundPath$1, D as Dimensions, b as RectPositioned, f as Cell, G as Grid, c as CellAccessor, V as VisitGenerator, L as Line, g as Sphere, h as Point3d, i as index$2, j as CircularPath, k as Grid$1, l as index$3, m as index$4, n as PointCalculableShape, o as index$5, p as PolyLine, q as RandomPointOpts, R as Rect, r as RectArray, s as RectPositionedArray, t as index$6, u as index$7, T as Triangle, v as index$8, W as WithBeziers, w as area, x as cardinal, y as center, z as clamp, A as corners, B as distanceFromCenter, E as distanceFromExterior, F as edges, H as empty, I as emptyPositioned, J as fromCenter, K as fromElement, M as fromNumbers, N as fromTopLeft, O as getEdgeX, Q as getEdgeY, U as getEnd, X as getRectPositioned, Y as getRectPositionedParameter, Z as getStart, _ as guard, $ as guardDim, a0 as guardPositioned, a1 as intersectsPoint, a2 as isEmpty, a3 as isEqual, a4 as isEqualSize, a5 as isIntersecting, a6 as isPlaceholder, a7 as isPositioned, a8 as isRect, a9 as isRectPositioned, aa as lengths, ab as maxFromCorners, ac as multiply$2, ad as multiplyScalar, ae as normaliseByRect, af as perimeter, ag as placeholder, ah as placeholderPositioned, ai as random$1, aj as randomPoint, ak as subtract$1, al as sum$1, am as toArray } from './index-Rqn_C5-V.js';
import { R as RandomSource } from './Types-ATA4eXqe.js';
import { i as index$1, B as Bezier, a as Ellipse } from './index-8dRnCA7W.js';
import { C as Coord, P as Polar } from './Polar-Cuge3iCD.js';
import { T as TraversableTree } from './Types-fof41_Zh.js';
import { S as Scaler } from './Scaler-Q6VFkes7.js';
import { R as Rgb } from './Colour-evWjV2of.js';

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
/**
 * Relative position
 * @param paths Paths
 * @param point Point
 * @param intersectionThreshold Threshold
 * @param dimensions Pre-computed dimensions
 * @returns
 */
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
declare const toString$1: (paths: ReadonlyArray<Path>) => string;
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
  export { CompoundPath_bbox as bbox, CompoundPath_computeDimensions as computeDimensions, CompoundPath_distanceToPoint as distanceToPoint, CompoundPath_fromPaths as fromPaths, CompoundPath_guardContinuous as guardContinuous, CompoundPath_interpolate as interpolate, CompoundPath_relativePosition as relativePosition, CompoundPath_setSegment as setSegment, toString$1 as toString, CompoundPath_toSvgString as toSvgString };
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
 * QuadTreeNode. The values of the node is an array of {@link QuadTreeItem}.
 *
 * To create, you probably want the {@link quadTree} function.
 *
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
    /**
     * Iterates over immediate children
     */
    children(): IterableIterator<QuadTreeNode>;
    /**
     * Array of QuadTreeItem
     * @returns
     */
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
declare const multiply$1: (kernel: Kernel, scalar: number) => Kernel;
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
  export { type Convolve2d_CellWithValue as CellWithValue, type Convolve2d_Kernel as Kernel, type Convolve2d_Kernel2dArray as Kernel2dArray, type Convolve2d_KernelCompute as KernelCompute, type Convolve2d_KernelReduce as KernelReduce, type Convolve2d_ScalarAndValue as ScalarAndValue, Convolve2d_boxBlurKernel as boxBlurKernel, Convolve2d_convolve as convolve, Convolve2d_convolveCell as convolveCell, Convolve2d_convolveImage as convolveImage, Convolve2d_edgeDetectionKernel as edgeDetectionKernel, Convolve2d_gaussianBlur3Kernel as gaussianBlur3Kernel, Convolve2d_gaussianBlur5Kernel as gaussianBlur5Kernel, Convolve2d_identityKernel as identityKernel, Convolve2d_kernel2dToArray as kernel2dToArray, multiply$1 as multiply, Convolve2d_rgbReducer as rgbReducer, Convolve2d_sharpenKernel as sharpenKernel, Convolve2d_unsharpMasking5Kernel as unsharpMasking5Kernel };
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
declare const fromPointPolar: (pt: Point, angleNormalisation?: `` | `unipolar` | `bipolar`, origin?: Point) => Coord;
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
declare const toPolar: (v: Vector, origin?: {
    readonly x: 0;
    readonly y: 0;
}) => Coord;
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

declare const Vector$1_clampMagnitude: typeof clampMagnitude;
declare const Vector$1_divide: typeof divide;
declare const Vector$1_dotProduct: typeof dotProduct;
declare const Vector$1_fromLineCartesian: typeof fromLineCartesian;
declare const Vector$1_fromLinePolar: typeof fromLinePolar;
declare const Vector$1_fromPointPolar: typeof fromPointPolar;
declare const Vector$1_fromRadians: typeof fromRadians;
declare const Vector$1_multiply: typeof multiply;
declare const Vector$1_normalise: typeof normalise;
declare const Vector$1_quadrantOffsetAngle: typeof quadrantOffsetAngle;
declare const Vector$1_subtract: typeof subtract;
declare const Vector$1_sum: typeof sum;
declare const Vector$1_toCartesian: typeof toCartesian;
declare const Vector$1_toPolar: typeof toPolar;
declare const Vector$1_toRadians: typeof toRadians;
declare const Vector$1_toString: typeof toString;
declare namespace Vector$1 {
  export { Vector$1_clampMagnitude as clampMagnitude, Vector$1_divide as divide, Vector$1_dotProduct as dotProduct, Vector$1_fromLineCartesian as fromLineCartesian, Vector$1_fromLinePolar as fromLinePolar, Vector$1_fromPointPolar as fromPointPolar, Vector$1_fromRadians as fromRadians, Vector$1_multiply as multiply, Vector$1_normalise as normalise, Vector$1_quadrantOffsetAngle as quadrantOffsetAngle, Vector$1_subtract as subtract, Vector$1_sum as sum, Vector$1_toCartesian as toCartesian, Vector$1_toPolar as toPolar, Vector$1_toRadians as toRadians, Vector$1_toString as toString };
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
declare const index_PolyLine: typeof PolyLine;
declare const index_QuadTree: typeof QuadTree;
declare const index_RandomPointOpts: typeof RandomPointOpts;
declare const index_Rect: typeof Rect;
declare const index_RectArray: typeof RectArray;
declare const index_RectPositioned: typeof RectPositioned;
declare const index_RectPositionedArray: typeof RectPositionedArray;
declare const index_Scaler: typeof Scaler;
declare const index_ShapePositioned: typeof ShapePositioned;
declare const index_SurfacePoints: typeof SurfacePoints;
declare const index_Triangle: typeof Triangle;
type index_Vector = Vector;
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
declare const index_getRectPositioned: typeof getRectPositioned;
declare const index_getRectPositionedParameter: typeof getRectPositionedParameter;
declare const index_getStart: typeof getStart;
declare const index_guard: typeof guard;
declare const index_guardDim: typeof guardDim;
declare const index_guardPositioned: typeof guardPositioned;
declare const index_intersectsPoint: typeof intersectsPoint;
declare const index_isEmpty: typeof isEmpty;
declare const index_isEqual: typeof isEqual;
declare const index_isEqualSize: typeof isEqualSize;
declare const index_isIntersecting: typeof isIntersecting;
declare const index_isPlaceholder: typeof isPlaceholder;
declare const index_isPositioned: typeof isPositioned;
declare const index_isRect: typeof isRect;
declare const index_isRectPositioned: typeof isRectPositioned;
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
  export { index$1 as Arcs, Bezier as Beziers, index_Circle as Circle, index_CirclePositioned as CirclePositioned, index$2 as Circles, index_CircularPath as CircularPath, CompoundPath as Compound, CompoundPath$1 as CompoundPath, index_Convolve2d as Convolve2d, index_CurveSimplification as CurveSimplification, index_Dimensions as Dimensions, Ellipse as Ellipses, Grid$1 as Grids, Layout as Layouts, index_Line as Line, index$3 as Lines, index_Path as Path, index$4 as Paths, index_Point as Point, index_Point3d as Point3d, index_PointCalculableShape as PointCalculableShape, index$5 as Points, index_Polar as Polar, index_PolyLine as PolyLine, index_QuadTree as QuadTree, index_RandomPointOpts as RandomPointOpts, index_Rect as Rect, index_RectArray as RectArray, index_RectPositioned as RectPositioned, index_RectPositionedArray as RectPositionedArray, index$6 as Rects, index_Scaler as Scaler, index_ShapePositioned as ShapePositioned, index$7 as Shapes, index_SurfacePoints as SurfacePoints, index_Triangle as Triangle, index$8 as Triangles, type index_Vector as Vector, Vector$1 as Vectors, Waypoint$1 as Waypoints, index_WithBeziers as WithBeziers, index_area as area, index_cardinal as cardinal, index_center as center, index_clamp as clamp, index_corners as corners, index_degreeToRadian as degreeToRadian, index_distanceFromCenter as distanceFromCenter, index_distanceFromExterior as distanceFromExterior, index_edges as edges, index_empty as empty, index_emptyPositioned as emptyPositioned, index_fromCenter as fromCenter, index_fromElement as fromElement, index_fromNumbers as fromNumbers, index_fromTopLeft as fromTopLeft, index_getEdgeX as getEdgeX, index_getEdgeY as getEdgeY, index_getEnd as getEnd, index_getRectPositioned as getRectPositioned, index_getRectPositionedParameter as getRectPositionedParameter, index_getStart as getStart, index_guard as guard, index_guardDim as guardDim, index_guardPositioned as guardPositioned, index_intersectsPoint as intersectsPoint, index_isEmpty as isEmpty, index_isEqual as isEqual, index_isEqualSize as isEqualSize, index_isIntersecting as isIntersecting, index_isPlaceholder as isPlaceholder, index_isPositioned as isPositioned, index_isRect as isRect, index_isRectPositioned as isRectPositioned, index_lengths as lengths, index_maxFromCorners as maxFromCorners, multiply$2 as multiply, index_multiplyScalar as multiplyScalar, index_normaliseByRect as normaliseByRect, index_perimeter as perimeter, index_placeholder as placeholder, index_placeholderPositioned as placeholderPositioned, index_radianToDegree as radianToDegree, index_radiansFromAxisX as radiansFromAxisX, random$1 as random, index_randomPoint as randomPoint, subtract$1 as subtract, sum$1 as sum, index_toArray as toArray };
}

type Vector = Point | Coord;

export { CompoundPath as C, Layout as L, QuadTree as Q, SurfacePoints as S, Vector$1 as V, Waypoint$1 as W, CurveSimplification as a, Convolve2d as b, type Vector as c, degreeToRadian as d, radiansFromAxisX as e, index as i, radianToDegree as r };
