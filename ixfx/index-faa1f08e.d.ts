import { T as Triangle, C as Cell, G as Grid, a as CellAccessor, V as VisitGenerator, b as Grid$1, B as Bezier, E as Ellipse, A as Arc, c as Triangle$1 } from './Triangle-f83e3fdb.js';
import { d as Path, a as Point, R as RectPositioned, C as CirclePositioned, e as Rect, f as Circle, L as Line, g as Point3d, h as Circle$1, i as Line$1, j as Rect$1, k as Point$1, l as Path$1 } from './Point-dc9b6d16.js';
import { a as RandomSource, b as Rgb } from './Arrays-df946e2d.js';
import { C as Coord, P as Polar } from './Polar-77e5625f.js';
import { T as TreeNode } from './Trees-65d39eeb.js';
import { S as Scaler } from './Scaler-4ba92fd8.js';

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

declare type ContainsResult = `none` | `contained`;
declare type ShapePositioned = CirclePositioned | RectPositioned;
/**
 * Returns the intersection result between a and b.
 * @param a
 * @param b
 */
declare const isIntersecting: (a: ShapePositioned, b: ShapePositioned | Point) => boolean;
declare type RandomPointOpts = {
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

type Shape_ContainsResult = ContainsResult;
type Shape_ShapePositioned = ShapePositioned;
declare const Shape_isIntersecting: typeof isIntersecting;
type Shape_RandomPointOpts = RandomPointOpts;
declare const Shape_randomPoint: typeof randomPoint;
declare const Shape_center: typeof center;
declare const Shape_starburst: typeof starburst;
type Shape_ArrowOpts = ArrowOpts;
declare const Shape_arrow: typeof arrow;
declare namespace Shape {
  export {
    Shape_ContainsResult as ContainsResult,
    Shape_ShapePositioned as ShapePositioned,
    Shape_isIntersecting as isIntersecting,
    Shape_RandomPointOpts as RandomPointOpts,
    Shape_randomPoint as randomPoint,
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
declare const multiply$1: (a: Vector, b: Vector) => Point | Coord;
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
    multiply$1 as multiply,
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

declare type RandomOpts = {
    readonly attempts?: number;
    readonly randomSource?: RandomSource;
};
/**
 * Naive randomised circle packing.
 * [Algorithm by Taylor Hobbs](https://tylerxhobbs.com/essays/2016/a-randomized-approach-to-cicle-packing)
 */
declare const random: (circles: readonly Circle[], container: ShapePositioned, opts?: RandomOpts) => CirclePositioned[];

type CirclePacking_RandomOpts = RandomOpts;
declare const CirclePacking_random: typeof random;
declare namespace CirclePacking {
  export {
    CirclePacking_RandomOpts as RandomOpts,
    CirclePacking_random as random,
  };
}

declare const Layout_CirclePacking: typeof CirclePacking;
declare namespace Layout {
  export {
    Layout_CirclePacking as CirclePacking,
  };
}

declare enum Direction {
    Nw = 0,
    Ne = 1,
    Sw = 2,
    Se = 3
}
declare type QuadTreeItem = Point | ShapePositioned;
declare const quadTree: (bounds: RectPositioned, initialData?: readonly QuadTreeItem[], opts?: Partial<QuadTreeOpts>) => QuadTreeNode;
declare class QuadTreeNode extends TreeNode<void> {
    #private;
    readonly boundary: RectPositioned;
    readonly level: number;
    readonly opts: QuadTreeOpts;
    items: QuadTreeItem[];
    constructor(boundary: RectPositioned, level: number, opts: QuadTreeOpts);
    direction(d: Direction): QuadTreeNode | undefined;
    add(p: QuadTreeItem): boolean;
    couldHold(p: Point): boolean;
}
declare type QuadTreeOpts = {
    readonly maxItems: number;
    readonly maxLevels: number;
};

declare type Kernel = readonly (readonly number[])[];
declare type CellWithValue<V> = readonly [cell: Cell, value: V | undefined];
declare type ScalarAndValue<V> = readonly [scalar: number, v: V | undefined];
declare type KernelCompute = <V>(offset: Cell, value: V) => V;
declare type KernelReduce<V> = (values: readonly ScalarAndValue<V>[]) => V | undefined;
/**
 * Multiply every element of kernel by the same `scalar` value.
 * Returns new result, input is unmodified
 * @param kernel
 * @param scalar
 * @returns
 */
declare const multiply: (kernel: Kernel, scalar: number) => Kernel;
declare function convolveCell<V>(c: Cell, kernel: Kernel2dArray, source: Grid, access: CellAccessor<V>, reduce: KernelReduce<V>): V | undefined;
/**
 * Performs kernel-based convolution over `image`.
 * @param kernel
 * @param image
 */
declare function convolveImage(kernel: Kernel, image: ImageData): Generator<CellWithValue<Rgb>, void, undefined>;
declare function convolve<V>(kernel: Kernel, source: Grid, access: CellAccessor<V>, visitor: VisitGenerator, reduce: KernelReduce<V>, origin?: Cell): IterableIterator<CellWithValue<V>>;
declare type Kernel2dArray = ReadonlyArray<readonly [cell: Cell, value: number]>;
/**
 * For a given kernel, returns an array of offsets. These
 * consist of a cell offset (eg {x:-1,y:-1}) and the value at that kernel position.
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

type Convolve2d_Kernel = Kernel;
type Convolve2d_CellWithValue<V> = CellWithValue<V>;
type Convolve2d_ScalarAndValue<V> = ScalarAndValue<V>;
type Convolve2d_KernelCompute = KernelCompute;
type Convolve2d_KernelReduce<V> = KernelReduce<V>;
declare const Convolve2d_multiply: typeof multiply;
declare const Convolve2d_convolveCell: typeof convolveCell;
declare const Convolve2d_convolveImage: typeof convolveImage;
declare const Convolve2d_convolve: typeof convolve;
declare const Convolve2d_kernel2dToArray: typeof kernel2dToArray;
declare const Convolve2d_rgbReducer: typeof rgbReducer;
declare const Convolve2d_identityKernel: typeof identityKernel;
declare const Convolve2d_edgeDetectionKernel: typeof edgeDetectionKernel;
declare const Convolve2d_sharpenKernel: typeof sharpenKernel;
declare const Convolve2d_boxBlurKernel: typeof boxBlurKernel;
declare const Convolve2d_gaussianBlur3Kernel: typeof gaussianBlur3Kernel;
declare const Convolve2d_gaussianBlur5Kernel: typeof gaussianBlur5Kernel;
declare const Convolve2d_unsharpMasking5Kernel: typeof unsharpMasking5Kernel;
declare namespace Convolve2d {
  export {
    Convolve2d_Kernel as Kernel,
    Convolve2d_CellWithValue as CellWithValue,
    Convolve2d_ScalarAndValue as ScalarAndValue,
    Convolve2d_KernelCompute as KernelCompute,
    Convolve2d_KernelReduce as KernelReduce,
    Convolve2d_multiply as multiply,
    Convolve2d_convolveCell as convolveCell,
    Convolve2d_convolveImage as convolveImage,
    Convolve2d_convolve as convolve,
    Convolve2d_kernel2dToArray as kernel2dToArray,
    Convolve2d_rgbReducer as rgbReducer,
    Convolve2d_identityKernel as identityKernel,
    Convolve2d_edgeDetectionKernel as edgeDetectionKernel,
    Convolve2d_sharpenKernel as sharpenKernel,
    Convolve2d_boxBlurKernel as boxBlurKernel,
    Convolve2d_gaussianBlur3Kernel as gaussianBlur3Kernel,
    Convolve2d_gaussianBlur5Kernel as gaussianBlur5Kernel,
    Convolve2d_unsharpMasking5Kernel as unsharpMasking5Kernel,
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
declare type CircleRingsOpts = {
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

type SurfacePoints_VogelSpiralOpts = VogelSpiralOpts;
declare const SurfacePoints_circleVogelSpiral: typeof circleVogelSpiral;
type SurfacePoints_CircleRingsOpts = CircleRingsOpts;
declare const SurfacePoints_circleRings: typeof circleRings;
declare const SurfacePoints_sphereFibonacci: typeof sphereFibonacci;
declare namespace SurfacePoints {
  export {
    SurfacePoints_VogelSpiralOpts as VogelSpiralOpts,
    SurfacePoints_circleVogelSpiral as circleVogelSpiral,
    SurfacePoints_CircleRingsOpts as CircleRingsOpts,
    SurfacePoints_circleRings as circleRings,
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
declare const index_quadTree: typeof quadTree;
declare const index_Scaler: typeof Scaler;
declare const index_Convolve2d: typeof Convolve2d;
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
    Layout as Layouts,
    Arc as Arcs,
    Shape as Shapes,
    Vector$1 as Vectors,
    index_Polar as Polar,
    index_degreeToRadian as degreeToRadian,
    index_radianToDegree as radianToDegree,
    index_radiansFromAxisX as radiansFromAxisX,
    index_quadTree as quadTree,
    index_Scaler as Scaler,
    index_Convolve2d as Convolve2d,
    index_SurfacePoints as SurfacePoints,
    Triangle$1 as Triangles,
  };
}

export { CompoundPath$1 as C, Layout as L, Sphere$1 as S, Vector$1 as V, Waypoint as W, Shape as a, radiansFromAxisX as b, Convolve2d as c, degreeToRadian as d, SurfacePoints as e, index as i, quadTree as q, radianToDegree as r };
