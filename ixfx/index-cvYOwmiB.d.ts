import { C as CirclePositioned, a as Circle, b as CircleRandomPointOpts } from './CircleType-hb8awD7g.js';
import { P as Path, T as Triangle, a as CompoundPath$1, D as Dimensions, W as WithBeziers, Q as QuadraticBezier, C as CubicBezier, b as CubicBezierPath, c as QuadraticBezierPath, d as Arc, A as ArcPositioned, e as Ellipse } from './ArcType-VEUNL6ta.js';
import { P as Point, a as Point3d, b as Placeholder$2 } from './PointType-0vgoM_lJ.js';
import { R as RandomSource } from './Types-Tj0rQbez.js';
import { a as RectPositioned, R as Rect, b as RectArray, c as RectPositionedArray } from './RectTypes-kjDrC-8b.js';
import { P as PolyLine, L as Line } from './LineType-Lekba5_H.js';
import { a as CardinalDirection, b as Cell, G as Grid, C as CellAccessor, V as VisitGenerator, c as Grid$1 } from './Grid-DwvA8aOV.js';
import { a as PointRelation, P as PointRelationResult } from './PointRelationTypes-s8dUPZOm.js';
import { C as Coord, P as Polar } from './Polar-AdpzobNh.js';
import { T as TraversableTree } from './Types-fof41_Zh.js';
import { b as Scaler } from './Scaler-PgueV1cj.js';
import { R as Rgb } from './Colour-LRt7FU52.js';

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
declare const fromPoints$2: (waypoints: ReadonlyArray<Point>, opts?: Partial<WaypointOpts>) => Waypoints;
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
declare const Waypoint$1_init: typeof init;
declare namespace Waypoint$1 {
  export { type Waypoint$1_Waypoint as Waypoint, type Waypoint$1_WaypointOpts as WaypointOpts, type Waypoint$1_WaypointResult as WaypointResult, type Waypoint$1_Waypoints as Waypoints, fromPoints$2 as fromPoints, Waypoint$1_init as init };
}

type ShapePositioned = CirclePositioned | RectPositioned;
type ContainsResult = `none` | `contained`;
type Sphere = Point3d & {
    readonly radius: number;
};
type PointCalculableShape = PolyLine | Line | RectPositioned | Point | CirclePositioned;
/**
 * Returns the intersection result between a and b.
 * `a` can be a {@link CirclePositioned} or {@link RectPositioned}
 * `b` can be as above or a {@link Point}.
 * @param a
 * @param b
 */
declare const isIntersecting$2: (a: ShapePositioned, b: ShapePositioned | Point) => boolean;
type ShapeRandomPointOpts = {
    readonly randomSource: RandomSource;
};
/**
 * Returns a random point within a shape.
 * `shape` can be {@link CirclePositioned} or {@link RectPositioned}
 * @param shape
 * @param opts
 * @returns
 */
declare const randomPoint$2: (shape: ShapePositioned, opts?: Partial<ShapeRandomPointOpts>) => Point;
/**
 * Returns the center of a shape
 * Shape can be: rectangle, triangle, circle
 * @param shape
 * @returns
 */
declare const center$2: (shape?: Rect | Triangle | Circle) => Point;
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

type index$9_ArrowOpts = ArrowOpts;
type index$9_ContainsResult = ContainsResult;
type index$9_PointCalculableShape = PointCalculableShape;
type index$9_ShapePositioned = ShapePositioned;
type index$9_ShapeRandomPointOpts = ShapeRandomPointOpts;
type index$9_Sphere = Sphere;
declare const index$9_arrow: typeof arrow;
declare const index$9_starburst: typeof starburst;
declare namespace index$9 {
  export { type index$9_ArrowOpts as ArrowOpts, type index$9_ContainsResult as ContainsResult, type index$9_PointCalculableShape as PointCalculableShape, type index$9_ShapePositioned as ShapePositioned, type index$9_ShapeRandomPointOpts as ShapeRandomPointOpts, type index$9_Sphere as Sphere, index$9_arrow as arrow, center$2 as center, isIntersecting$2 as isIntersecting, randomPoint$2 as randomPoint, index$9_starburst as starburst };
}

type RandomOpts = {
    readonly attempts?: number;
    readonly randomSource?: RandomSource;
};
/**
 * Naive randomised circle packing.
 * [Algorithm by Taylor Hobbs](https://tylerxhobbs.com/essays/2016/a-randomized-approach-to-cicle-packing)
 */
declare const random$2: (circles: ReadonlyArray<Circle>, container: ShapePositioned, opts?: RandomOpts) => CirclePositioned[];

type CirclePacking_RandomOpts = RandomOpts;
declare namespace CirclePacking {
  export { type CirclePacking_RandomOpts as RandomOpts, random$2 as random };
}

declare const Layout_CirclePacking: typeof CirclePacking;
declare namespace Layout {
  export { Layout_CirclePacking as CirclePacking };
}

/**
 * Returns the area of `circle`.
 * @param circle
 * @returns
 */
declare const area$5: (circle: Circle) => number;

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

declare const index$8_Dimensions: typeof Dimensions;
declare const index$8_Path: typeof Path;
declare const index$8_WithBeziers: typeof WithBeziers;
declare const index$8_getEnd: typeof getEnd;
declare const index$8_getStart: typeof getStart;
declare namespace index$8 {
  export { CompoundPath$1 as CompoundPath, index$8_Dimensions as Dimensions, index$8_Path as Path, index$8_WithBeziers as WithBeziers, index$8_getEnd as getEnd, index$8_getStart as getStart };
}

type CircularPath = Circle & Path & {
    readonly kind: `circular`;
};

type Vector$1 = Point | Coord;

/**
 * Computes a bounding box that encloses circle
 * @param circle
 * @returns
 */
declare const bbox$5: (circle: CirclePositioned | Circle) => RectPositioned;

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
declare const distanceCenter$1: (a: CirclePositioned, b: CirclePositioned | Point) => number;

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
declare const distanceFromExterior$1: (a: CirclePositioned, b: CirclePositioned | Point) => number;

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
 * Throws if radius is out of range. If x,y is present, these will be validated too.
 * @param circle
 * @param parameterName
 */
declare const guard$5: (circle: CirclePositioned | Circle, parameterName?: string) => void;
/**
 * Throws if `circle` is not positioned or has dodgy fields
 * @param circle
 * @param parameterName
 * @returns
 */
declare const guardPositioned$1: (circle: CirclePositioned, parameterName?: string) => void;
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
declare const isPositioned$2: (p: Circle | Point) => p is Point;
declare const isCircle: (p: any) => p is Circle;
declare const isCirclePositioned: (p: any) => p is CirclePositioned;

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
 * Computes relative position along circle perimeter
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
declare const interpolate$4: (circle: CirclePositioned, t: number) => Point;

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
declare const area$4: (rect: Rect) => number;

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
declare const center: (rect: RectPositioned | Rect, origin?: Point) => Point;

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
 * Order of corners: ne, nw, sw, se
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
declare const distanceFromExterior: (rect: RectPositioned, pt: Point) => number;
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
declare const distanceFromCenter: (rect: RectPositioned, pt: Point) => number;

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
declare function fromNumbers$2(width: number, height: number): Rect;
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
declare function fromNumbers$2(x: number, y: number, width: number, height: number): RectPositioned;

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

declare const guardDim: (d: number, name?: string) => void;
/**
 * Throws an error if rectangle is missing fields or they
 * are not valid.
 *
 * Checks:
 * * `width` and `height` must be defined on `rect`
 * * dimensions (w & h) must not be NaN
 * * dimensions (w & h) must not be negative
 *
 * If `rect` has x,y, this value is checked as well.
 * @param rect
 * @param name
 */
declare const guard$4: (rect: Rect, name?: string) => void;
/**
 * Returns a positioned rect or if it's not possible, throws an error.
 *
 * If `rect` is positioned and `origin` is provided, returned result uses `origin` as x,y instead.
 * ```js
 * // Returns input because it's positioned
 * getRectPositioned({x:1,y:2,width:10,height:20});
 * // Returns {x:1,y:2,width:10,height:20}
 * getRectPositioned({width:10,height:20}, {x:1, y:2 });
 * // Throws, because we have no point
 * getRectPositioned({width:10,height:20})
 * ```
 * @param rect
 * @param origin
 * @returns
 */
declare const getRectPositioned: (rect: Rect | RectPositioned, origin?: Point) => RectPositioned;
declare const guardPositioned: (rect: RectPositioned, name?: string) => void;
declare const isEmpty$3: (rect: Rect) => boolean;
declare const isPlaceholder$3: (rect: Rect) => boolean;
/**
 * Returns _true_ if `p` has a position (x,y)
 * @param p Point, Rect or RectPositiond
 * @returns
 */
declare const isPositioned$1: (p: Point | Rect | RectPositioned) => p is Point;
/**
 * Returns _true_ if `p` has width and height.
 * @param p
 * @returns
 */
declare const isRect: (p: unknown) => p is Rect;
/**
 * Returns _true_ if `p` is a positioned rectangle
 * Having width, height, x and y properties.
 * @param p
 * @returns
 */
declare const isRectPositioned: (p: any) => p is RectPositioned;

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
declare const isEqual$5: (a: Rect | RectPositioned, b: Rect | RectPositioned) => boolean;

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
declare function multiply$4(a: RectPositioned, b: Rect | number, c?: number): RectPositioned;
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
declare function multiply$4(a: Rect, b: Rect | number, c?: number): Rect;
declare function multiply$4(a: RectPositioned, b: Rect): RectPositioned;
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
declare const normaliseByRect$2: (rect: Rect | RectPositioned, normaliseByOrWidth: Rect | number, height?: number) => Rect | RectPositioned;

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
type RectRandomPointOpts = {
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
 * @param options Options
 * @returns
 */
declare const randomPoint$1: (within: Rect | RectPositioned, options?: RectRandomPointOpts) => Point;

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
declare function subtract$3(a: Rect, b: Rect): Rect;
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
declare function subtract$3(a: Rect, width: number, height?: number): Rect;

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
declare function sum$3(a: Rect, b: Rect): Rect;
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
declare function sum$3(a: Rect, width: number, height?: number): Rect;

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

declare const index$7_Rect: typeof Rect;
declare const index$7_RectArray: typeof RectArray;
declare const index$7_RectPositioned: typeof RectPositioned;
declare const index$7_RectPositionedArray: typeof RectPositionedArray;
type index$7_RectRandomPointOpts = RectRandomPointOpts;
declare const index$7_cardinal: typeof cardinal;
declare const index$7_center: typeof center;
declare const index$7_distanceFromCenter: typeof distanceFromCenter;
declare const index$7_distanceFromExterior: typeof distanceFromExterior;
declare const index$7_empty: typeof empty;
declare const index$7_emptyPositioned: typeof emptyPositioned;
declare const index$7_fromElement: typeof fromElement;
declare const index$7_fromTopLeft: typeof fromTopLeft;
declare const index$7_getEdgeX: typeof getEdgeX;
declare const index$7_getEdgeY: typeof getEdgeY;
declare const index$7_getRectPositioned: typeof getRectPositioned;
declare const index$7_getRectPositionedParameter: typeof getRectPositionedParameter;
declare const index$7_guardDim: typeof guardDim;
declare const index$7_guardPositioned: typeof guardPositioned;
declare const index$7_isEqualSize: typeof isEqualSize;
declare const index$7_isRect: typeof isRect;
declare const index$7_isRectPositioned: typeof isRectPositioned;
declare const index$7_maxFromCorners: typeof maxFromCorners;
declare namespace index$7 {
  export { index$7_Rect as Rect, index$7_RectArray as RectArray, index$7_RectPositioned as RectPositioned, index$7_RectPositionedArray as RectPositionedArray, type index$7_RectRandomPointOpts as RectRandomPointOpts, area$4 as area, index$7_cardinal as cardinal, index$7_center as center, corners$1 as corners, index$7_distanceFromCenter as distanceFromCenter, index$7_distanceFromExterior as distanceFromExterior, edges$1 as edges, index$7_empty as empty, index$7_emptyPositioned as emptyPositioned, fromCenter$2 as fromCenter, index$7_fromElement as fromElement, fromNumbers$2 as fromNumbers, index$7_fromTopLeft as fromTopLeft, index$7_getEdgeX as getEdgeX, index$7_getEdgeY as getEdgeY, index$7_getRectPositioned as getRectPositioned, index$7_getRectPositionedParameter as getRectPositionedParameter, guard$4 as guard, index$7_guardDim as guardDim, index$7_guardPositioned as guardPositioned, intersectsPoint$1 as intersectsPoint, isEmpty$3 as isEmpty, isEqual$5 as isEqual, index$7_isEqualSize as isEqualSize, isIntersecting$1 as isIntersecting, isPlaceholder$3 as isPlaceholder, isPositioned$1 as isPositioned, index$7_isRect as isRect, index$7_isRectPositioned as isRectPositioned, lengths$1 as lengths, index$7_maxFromCorners as maxFromCorners, multiply$4 as multiply, multiplyScalar$2 as multiplyScalar, normaliseByRect$2 as normaliseByRect, random$1 as random, randomPoint$1 as randomPoint, subtract$3 as subtract, sum$3 as sum, toArray$1 as toArray };
}

/**
 * Returns true if `a` or `b` overlap, are equal, or `a` contains `b`.
 * A circle can be checked for intersections with another CirclePositioned, Point or RectPositioned.
 *
 * Use `intersections` to find the points of intersection.
 *
 * @param a Circle
 * @param b Circle or point to test
 * @returns True if circle overlap
 */
declare const isIntersecting: (a: CirclePositioned, b: CirclePositioned | Point | RectPositioned, c?: number) => boolean;

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
/**
 *
 * Returns the points of intersection betweeen `a` and `b`.
 *
 * Returns an empty array if circles are equal, one contains the other or if they don't touch at all.
 *
 * @param a Circle
 * @param b Circle
 * @returns Points of intersection, or an empty list if there are none
 */
declare const intersections: (a: CirclePositioned, b: CirclePositioned) => ReadonlyArray<Point>;

/**
 * Returns true if `b` is completely contained by `a`
 *
 * ```js
 * // Compare two points
 * isContainedBy(circleA, circleB);
 *
 * // Compare a circle with a point
 * isContainedBy(circleA, {x: 10, y: 20});
 *
 * // Define radius as third parameter
 * isContainedBy(circleA, {x: 10, y: 20}, 20);
 * ```
 * @param a Circle
 * @param b Circle or point to compare to
 * @param c Radius to accompany parameter b if it's a point
 * @returns
 */
declare const isContainedBy: (a: CirclePositioned, b: CirclePositioned | Point, c?: number) => boolean;

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
declare const isEqual$4: (a: CirclePositioned | Circle, b: CirclePositioned | Circle) => boolean;

declare function multiplyScalar$1(a: CirclePositioned, value: number): CirclePositioned;
declare function multiplyScalar$1(a: Circle, value: number): Circle;

/**
 * Returns the nearest point on `circle`'s perimeter closest to `point`.
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
declare const nearest$1: (circle: CirclePositioned | ReadonlyArray<CirclePositioned>, b: Point) => Point;
/**
 * Returns a point on a circle's perimeter at a specified angle in radians
 *
 * ```js
 * import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
 *
 * // Circle without position
 * const circleA = { radius: 5 };
 *
 * // Get point at angle Math.PI, passing in a origin coordinate
 * const ptA = Circles.pointOnPerimeter(circleA, Math.PI, {x: 10, y: 10 });
 *
 * // Point on circle with position
 * const circleB = { radius: 5, x: 10, y: 10};
 * const ptB = Circles.pointOnPerimeter(circleB, Math.PI);
 * ```
 * @param circle
 * @param angleRadian Angle in radians
 * @param Origin or offset of calculated point. By default uses center of circle or 0,0 if undefined
 * @returns Point oo circle
 */
declare const pointOnPerimeter: (circle: Circle | CirclePositioned, angleRadian: number, origin?: Point) => Point;
/**
 * Returns circumference of `circle` (alias of {@link length})
 * @param circle
 * @returns
 */
declare const circumference: (circle: Circle) => number;
/**
 * Returns circumference of `circle` (alias of {@link circumference})
 * @param circle
 * @returns
 */
declare const length$2: (circle: Circle) => number;

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
declare const randomPoint: (within: Circle | CirclePositioned, opts?: Partial<CircleRandomPointOpts>) => Point;

type ToSvg$1 = {
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
declare const toSvg$1: ToSvg$1;

/**
 * Returns a `CircularPath` representation of a circle
 *
 * @param {CirclePositioned} circle
 * @returns {CircularPath}
 */
declare const toPath$3: (circle: CirclePositioned) => CircularPath;

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

declare const index$6_Circle: typeof Circle;
declare const index$6_CirclePositioned: typeof CirclePositioned;
declare const index$6_CircleRandomPointOpts: typeof CircleRandomPointOpts;
type index$6_CircularPath = CircularPath;
declare const index$6_circumference: typeof circumference;
declare const index$6_exteriorIntegerPoints: typeof exteriorIntegerPoints;
declare const index$6_interiorIntegerPoints: typeof interiorIntegerPoints;
declare const index$6_intersectionLine: typeof intersectionLine;
declare const index$6_intersections: typeof intersections;
declare const index$6_isCircle: typeof isCircle;
declare const index$6_isCirclePositioned: typeof isCirclePositioned;
declare const index$6_isContainedBy: typeof isContainedBy;
declare const index$6_isIntersecting: typeof isIntersecting;
declare const index$6_pointOnPerimeter: typeof pointOnPerimeter;
declare const index$6_randomPoint: typeof randomPoint;
declare const index$6_toPositioned: typeof toPositioned;
declare namespace index$6 {
  export { index$6_Circle as Circle, index$6_CirclePositioned as CirclePositioned, index$6_CircleRandomPointOpts as CircleRandomPointOpts, type index$6_CircularPath as CircularPath, area$5 as area, bbox$5 as bbox, center$1 as center, index$6_circumference as circumference, distanceCenter$1 as distanceCenter, distanceFromExterior$1 as distanceFromExterior, index$6_exteriorIntegerPoints as exteriorIntegerPoints, guard$5 as guard, guardPositioned$1 as guardPositioned, index$6_interiorIntegerPoints as interiorIntegerPoints, interpolate$4 as interpolate, index$6_intersectionLine as intersectionLine, index$6_intersections as intersections, index$6_isCircle as isCircle, index$6_isCirclePositioned as isCirclePositioned, index$6_isContainedBy as isContainedBy, isEqual$4 as isEqual, index$6_isIntersecting as isIntersecting, isNaN$1 as isNaN, isPositioned$2 as isPositioned, length$2 as length, multiplyScalar$1 as multiplyScalar, nearest$1 as nearest, index$6_pointOnPerimeter as pointOnPerimeter, index$6_randomPoint as randomPoint, toPath$3 as toPath, index$6_toPositioned as toPositioned, toSvg$1 as toSvg };
}

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
 * Returns a rectangle that encompasses dimension of line
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js';
 * const rect = Lines.bbox(line);
 * ```
 */
declare const bbox$4: (line: Line) => RectPositioned;

/**
 * Returns the distance of `point` to the nearest point on `line`
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const distance = Lines.distanceSingleLine(line, pt);
 * ```
 * @param line Line
 * @param point Target point
 * @returns
 */
declare const distanceSingleLine: (line: Line, point: Point) => number;

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
declare const divide$2: (line: Line, point: Point) => Line;

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
declare const fromNumbers$1: (x1: number, y1: number, x2: number, y2: number) => Line;

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
 * Creates a line from an origin point.
 * ```js
 * // Line of length 0.2 with middle at 0.5,0.5
 * fromPivot({ x:0.5, y:0.5 }, 0.2);
 * // Same line, but on an angle
 * fromPivot({ x:0.5, y:0.5 }, 0.2, degreesToRadian(45));
 *
 * // ...now with pivot point at 20%, rather than center
 * fromPivot({ x:0.5, y:0.5 }, 0.2, degreesToRadian(45), 0.2);
 * ```
 *
 * Examples:
 * * Angle of 0 (deg/rad) results in a horizontal line,
 * * Angle of 90deg in a vertical line.
 * * Angle of 45deg will be angled downwards.
 *
 * @param origin Origin to pivot around
 * @param length Total length of line
 * @param angleRadian Angle of line, in radians
 * @param balance Percentage of where origin ought to be on line. Default: 0.5, meaning the middle of line
 */
declare const fromPivot: (origin?: Point, length?: number, angleRadian?: number, balance?: number) => Readonly<{
    a: Point;
    b: Point;
}>;

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
 * Returns true if `p` is a valid line, containing `a` and `b` Points.
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.isLine(l);
 * ```
 * @param p Value to check
 * @returns True if a valid line.
 */
declare const isLine: (p: any) => p is Line;
/**
 * Returns true if `p` is a {@link PolyLine}, ie. an array of {@link Line}s.
 * Validates all items in array.
 * @param p
 * @returns
 */
declare const isPolyLine: (p: any) => p is PolyLine;
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
declare function interpolate$3(amount: number, a: Point, pointB: Point, allowOverflow?: boolean): Point;
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
declare function interpolate$3(amount: number, line: Line, allowOverflow?: boolean): Point;

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
declare const isEqual$3: (a: Line, b: Line) => boolean;

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
declare const multiply$3: (line: Line, point: Point) => Line;

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
declare const nearest: (line: Line | ReadonlyArray<Line>, point: Point) => Point;

/**
 * Returns the relative position of `pt` along `line`.
 * Warning: assumes `pt` is actually on `line`. Results may be bogus if not.
 * @param line
 * @param pt
 */
declare const relativePosition$1: (line: Line, pt: Point) => number;

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
declare const toPath$2: (line: Line) => LinePath;

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
declare function toString$3(a: Point, b: Point): string;
/**
 * Returns a string representation of a line
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.toString(line);
 * ```
 * @param line
 */
declare function toString$3(line: Line): string;

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
declare const Placeholder$1: Readonly<{
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
declare const normaliseByRect$1: (line: Line, width: number, height: number) => Line;
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
declare const toSvgString$1: (a: Point, b: Point) => ReadonlyArray<string>;

declare const index$5_Line: typeof Line;
type index$5_LinePath = LinePath;
declare const index$5_PolyLine: typeof PolyLine;
declare const index$5_angleRadian: typeof angleRadian;
declare const index$5_asPoints: typeof asPoints;
declare const index$5_distanceSingleLine: typeof distanceSingleLine;
declare const index$5_extendFromA: typeof extendFromA;
declare const index$5_fromPivot: typeof fromPivot;
declare const index$5_fromPointsToPath: typeof fromPointsToPath;
declare const index$5_isLine: typeof isLine;
declare const index$5_isPolyLine: typeof isPolyLine;
declare const index$5_joinPointsToLines: typeof joinPointsToLines;
declare const index$5_midpoint: typeof midpoint;
declare const index$5_nearest: typeof nearest;
declare const index$5_parallel: typeof parallel;
declare const index$5_perpendicularPoint: typeof perpendicularPoint;
declare const index$5_pointAtX: typeof pointAtX;
declare const index$5_pointsOf: typeof pointsOf;
declare const index$5_scaleFromMidpoint: typeof scaleFromMidpoint;
declare const index$5_slope: typeof slope;
declare namespace index$5 {
  export { Empty$2 as Empty, index$5_Line as Line, type index$5_LinePath as LinePath, Placeholder$1 as Placeholder, index$5_PolyLine as PolyLine, index$5_angleRadian as angleRadian, apply$2 as apply, index$5_asPoints as asPoints, bbox$4 as bbox, distance$1 as distance, index$5_distanceSingleLine as distanceSingleLine, divide$2 as divide, index$5_extendFromA as extendFromA, fromFlatArray$1 as fromFlatArray, fromNumbers$1 as fromNumbers, index$5_fromPivot as fromPivot, fromPoints$1 as fromPoints, index$5_fromPointsToPath as fromPointsToPath, getPointParameter$1 as getPointParameter, guard$3 as guard, interpolate$3 as interpolate, isEmpty$2 as isEmpty, isEqual$3 as isEqual, index$5_isLine as isLine, isPlaceholder$2 as isPlaceholder, index$5_isPolyLine as isPolyLine, index$5_joinPointsToLines as joinPointsToLines, length$1 as length, index$5_midpoint as midpoint, multiply$3 as multiply, index$5_nearest as nearest, normaliseByRect$1 as normaliseByRect, index$5_parallel as parallel, index$5_perpendicularPoint as perpendicularPoint, index$5_pointAtX as pointAtX, index$5_pointsOf as pointsOf, relativePosition$1 as relativePosition, rotate$2 as rotate, index$5_scaleFromMidpoint as scaleFromMidpoint, index$5_slope as slope, subtract$2 as subtract, sum$2 as sum, toFlatArray$1 as toFlatArray, toPath$2 as toPath, toString$3 as toString, toSvgString$1 as toSvgString, withinRange$1 as withinRange };
}

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
    z?: number;
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
declare const apply$1: (pt: Point, fn: (v: number, field?: string) => number) => Point;

/**
 * Returns the minimum rectangle that can enclose all provided points
 * @param points
 * @returns
 */
declare const bbox$3: (...points: ReadonlyArray<Point>) => RectPositioned;

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
declare const centroid$1: (...points: ReadonlyArray<Point | undefined>) => Point;

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
 * Simple convex hull impementation. Returns a set of points which
 * enclose `pts`.
 *
 * For more power, see something like [Hull.js](https://github.com/AndriiHeonia/hull)
 * @param pts
 * @returns
 */
declare const convexHull: (...pts: ReadonlyArray<Point>) => ReadonlyArray<Point>;

declare function distance(a: Point, b?: Point): number;
declare function distance(a: Point, x: number, y: number): number;

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
 * import {minIndex} from '../data/arrays.js';
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
declare function divide$1(a: Point, rectOrPoint: Rect | Point): Point;
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
declare function divide$1(a: Point, x: number, y?: number): Point;
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
declare function divide$1(x1: number, y1: number, x2?: number, y2?: number): Point;
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

declare const dotProduct$1: (...pts: ReadonlyArray<Point>) => number;

/**
 * An empty point of `{ x:0, y:0 }`.
 *
 * Use `isEmpty` to check if a point is empty.
 */
declare const Empty$1: {
    readonly x: 0;
    readonly y: 0;
};

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
 * Returns a Point form of either a point, x,y params or x,y,z params.
 * If parameters are undefined, an empty point is returned (0, 0)
 * @ignore
 * @param a
 * @param b
 * @returns
 */
declare function getPointParameter(a?: Point | number | Array<number> | ReadonlyArray<number>, b?: number | boolean, c?: number): Point | Point3d;

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
 * Throws an error if point is invalid
 * @param p
 * @param name
 */
declare function guard$2(p: Point, name?: string): void;
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
declare const isEmpty$1: (p: Point) => boolean;
/**
 * Returns true if point is a placeholder, where both x and y
 * are `NaN`.
 *
 * Use Points.Placeholder to return a placeholder point.
 * @param p
 * @returns
 */
declare const isPlaceholder$1: (p: Point) => boolean;

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
declare const interpolate$2: (amount: number, a: Point, b: Point, allowOverflow?: boolean) => Point;

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
declare const isEqual$2: (...p: ReadonlyArray<Point>) => boolean;

/**
 * Clamps the magnitude of a point.
 * This is useful when using a Point as a vector, to limit forces.
 * @param pt
 * @param max Maximum magnitude (1 by default)
 * @param min Minimum magnitude (0 by default)
 * @returns
 */
declare const clampMagnitude$1: (pt: Point, max?: number, min?: number) => Point;

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
declare function multiply$2(a: Point, rectOrPoint: Rect | Point): Point;
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
declare function multiply$2(a: Point, x: number, y?: number): Point;
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
declare const normalise$1: (ptOrX: Point | number, y?: number) => Point;

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
declare const pipelineApply: (pt: Point, ...pipelineFns: ReadonlyArray<(pt: Point) => Point>) => Point;
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
declare const pipeline: (...pipeline: ReadonlyArray<(pt: Point) => Point>) => (pt: Point) => Point;

declare const progressBetween: (currentPos: Point | Point3d, from: Point | Point3d, to: Point | Point3d) => number;

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

declare const quantiseEvery: (pt: Point, snap: Point, middleRoundsUp?: boolean) => Readonly<{
    x: number;
    y: number;
}>;

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

/**
 * Rotate a single point by a given amount in radians
 * @param pt
 * @param amountRadian
 * @param origin
 */
declare function rotate$1(pt: Point, amountRadian: number, origin?: Point): Point;
/**
 * Rotate several points by a given amount in radians
 * @param pt Points
 * @param amountRadian Amount to rotate in radians. If 0 is given, a copy of the input array is returned
 * @param origin Origin to rotate around. Defaults to 0,0
 */
declare function rotate$1(pt: ReadonlyArray<Point>, amountRadian: number, origin?: Point): ReadonlyArray<Point>;

declare const rotatePointArray: (v: ReadonlyArray<ReadonlyArray<number>>, amountRadian: number) => Array<Array<number>>;

/**
 * Round the point's _x_ and _y_ to given number of digits
 * @param ptOrX
 * @param yOrDigits
 * @param digits
 * @returns
 */
declare const round: (ptOrX: Point | number, yOrDigits?: number, digits?: number) => Point;

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
declare function subtract$1(a: Point, b: Point): Point;
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
declare function subtract$1(a: Point, x: number, y?: number): Point;
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
declare function subtract$1(x1: number, y1: number, x2: number, y2: number): Point;

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
declare const sum$1: Sum;

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
 * Returns a human-friendly string representation `(x, y)`.
 * If `precision` is supplied, this will be the number of significant digits.
 * @param p
 * @returns
 */
declare function toString$2(p: Point, digits?: number): string;

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

declare const index$4_Point: typeof Point;
declare const index$4_Point3d: typeof Point3d;
declare const index$4_PointRelation: typeof PointRelation;
declare const index$4_PointRelationResult: typeof PointRelationResult;
declare const index$4_abs: typeof abs;
declare const index$4_angle: typeof angle;
declare const index$4_clamp: typeof clamp;
declare const index$4_compare: typeof compare;
declare const index$4_compareByX: typeof compareByX;
declare const index$4_convexHull: typeof convexHull;
declare const index$4_distance: typeof distance;
declare const index$4_distanceToCenter: typeof distanceToCenter;
declare const index$4_distanceToExterior: typeof distanceToExterior;
declare const index$4_divider: typeof divider;
declare const index$4_findMinimum: typeof findMinimum;
declare const index$4_from: typeof from;
declare const index$4_fromNumbers: typeof fromNumbers;
declare const index$4_getPointParameter: typeof getPointParameter;
declare const index$4_guardNonZeroPoint: typeof guardNonZeroPoint;
declare const index$4_invert: typeof invert;
declare const index$4_isNaN: typeof isNaN;
declare const index$4_isNull: typeof isNull;
declare const index$4_isPoint: typeof isPoint;
declare const index$4_isPoint3d: typeof isPoint3d;
declare const index$4_leftmost: typeof leftmost;
declare const index$4_multiplyScalar: typeof multiplyScalar;
declare const index$4_normaliseByRect: typeof normaliseByRect;
declare const index$4_pipeline: typeof pipeline;
declare const index$4_pipelineApply: typeof pipelineApply;
declare const index$4_progressBetween: typeof progressBetween;
declare const index$4_project: typeof project;
declare const index$4_quantiseEvery: typeof quantiseEvery;
declare const index$4_random: typeof random;
declare const index$4_reduce: typeof reduce;
declare const index$4_relation: typeof relation;
declare const index$4_rightmost: typeof rightmost;
declare const index$4_rotatePointArray: typeof rotatePointArray;
declare const index$4_round: typeof round;
declare const index$4_toArray: typeof toArray;
declare const index$4_toIntegerValues: typeof toIntegerValues;
declare const index$4_withinRange: typeof withinRange;
declare const index$4_wrap: typeof wrap;
declare namespace index$4 {
  export { Empty$1 as Empty, Placeholder$2 as Placeholder, index$4_Point as Point, index$4_Point3d as Point3d, index$4_PointRelation as PointRelation, index$4_PointRelationResult as PointRelationResult, index$4_abs as abs, index$4_angle as angle, apply$1 as apply, bbox$3 as bbox, centroid$1 as centroid, index$4_clamp as clamp, clampMagnitude$1 as clampMagnitude, index$4_compare as compare, index$4_compareByX as compareByX, index$4_convexHull as convexHull, index$4_distance as distance, index$4_distanceToCenter as distanceToCenter, index$4_distanceToExterior as distanceToExterior, divide$1 as divide, index$4_divider as divider, dotProduct$1 as dotProduct, index$4_findMinimum as findMinimum, index$4_from as from, index$4_fromNumbers as fromNumbers, index$4_getPointParameter as getPointParameter, guard$2 as guard, index$4_guardNonZeroPoint as guardNonZeroPoint, interpolate$2 as interpolate, index$4_invert as invert, isEmpty$1 as isEmpty, isEqual$2 as isEqual, index$4_isNaN as isNaN, index$4_isNull as isNull, isPlaceholder$1 as isPlaceholder, index$4_isPoint as isPoint, index$4_isPoint3d as isPoint3d, index$4_leftmost as leftmost, multiply$2 as multiply, index$4_multiplyScalar as multiplyScalar, normalise$1 as normalise, index$4_normaliseByRect as normaliseByRect, index$4_pipeline as pipeline, index$4_pipelineApply as pipelineApply, index$4_progressBetween as progressBetween, index$4_project as project, index$4_quantiseEvery as quantiseEvery, index$4_random as random, index$4_reduce as reduce, index$4_relation as relation, index$4_rightmost as rightmost, rotate$1 as rotate, index$4_rotatePointArray as rotatePointArray, index$4_round as round, subtract$1 as subtract, sum$1 as sum, index$4_toArray as toArray, index$4_toIntegerValues as toIntegerValues, toString$2 as toString, index$4_withinRange as withinRange, index$4_wrap as wrap };
}

declare const isQuadraticBezier: (path: Path | QuadraticBezier | CubicBezier) => path is QuadraticBezier;
declare const isCubicBezier: (path: Path | CubicBezier | QuadraticBezier) => path is CubicBezier;

/**
 * Returns a new quadratic bezier with specified bend amount
 *
 * @param {QuadraticBezier} b Curve
 * @param {number} [bend=0] Bend amount, from -1 to 1
 * @returns {QuadraticBezier}
 */
declare const quadraticBend: (a: Point, b: Point, bend?: number) => QuadraticBezier;
/**
 * Creates a simple quadratic bezier with a specified amount of 'bend'.
 * Bend of -1 will pull curve down, 1 will pull curve up. 0 is no curve
 * @param {Point} start Start of curve
 * @param {Point} end End of curve
 * @param {number} [bend=0] Bend amount, -1 to 1
 * @returns {QuadraticBezier}
 */
declare const quadraticSimple: (start: Point, end: Point, bend?: number) => QuadraticBezier;
/**
 * Returns a relative point on a simple quadratic
 * @param start Start
 * @param end  End
 * @param bend Bend (-1 to 1)
 * @param amt Amount
 * @returns Point
 */
declare const computeQuadraticSimple: (start: Point, end: Point, bend: number, amt: number) => Point;
declare const quadraticToSvgString: (start: Point, end: Point, handle: Point) => ReadonlyArray<string>;
declare const toPath$1: (cubicOrQuadratic: CubicBezier | QuadraticBezier) => CubicBezierPath | QuadraticBezierPath;
declare const cubic: (start: Point, end: Point, cubic1: Point, cubic2: Point) => CubicBezier;
declare const quadratic: (start: Point, end: Point, handle: Point) => QuadraticBezier;

declare const index$3_CubicBezier: typeof CubicBezier;
declare const index$3_CubicBezierPath: typeof CubicBezierPath;
declare const index$3_QuadraticBezier: typeof QuadraticBezier;
declare const index$3_QuadraticBezierPath: typeof QuadraticBezierPath;
declare const index$3_computeQuadraticSimple: typeof computeQuadraticSimple;
declare const index$3_cubic: typeof cubic;
declare const index$3_isCubicBezier: typeof isCubicBezier;
declare const index$3_isQuadraticBezier: typeof isQuadraticBezier;
declare const index$3_quadratic: typeof quadratic;
declare const index$3_quadraticBend: typeof quadraticBend;
declare const index$3_quadraticSimple: typeof quadraticSimple;
declare const index$3_quadraticToSvgString: typeof quadraticToSvgString;
declare namespace index$3 {
  export { index$3_CubicBezier as CubicBezier, index$3_CubicBezierPath as CubicBezierPath, index$3_QuadraticBezier as QuadraticBezier, index$3_QuadraticBezierPath as QuadraticBezierPath, index$3_computeQuadraticSimple as computeQuadraticSimple, index$3_cubic as cubic, index$3_isCubicBezier as isCubicBezier, index$3_isQuadraticBezier as isQuadraticBezier, index$3_quadratic as quadratic, index$3_quadraticBend as quadraticBend, index$3_quadraticSimple as quadraticSimple, index$3_quadraticToSvgString as quadraticToSvgString, toPath$1 as toPath };
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
declare const interpolate$1: (paths: ReadonlyArray<Path>, t: number, useWidth?: boolean, dimensions?: Dimensions) => Point;
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
declare const bbox$2: (paths: ReadonlyArray<Path>) => RectPositioned;
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

declare const CompoundPath_computeDimensions: typeof computeDimensions;
declare const CompoundPath_distanceToPoint: typeof distanceToPoint;
declare const CompoundPath_fromPaths: typeof fromPaths;
declare const CompoundPath_guardContinuous: typeof guardContinuous;
declare const CompoundPath_relativePosition: typeof relativePosition;
declare const CompoundPath_setSegment: typeof setSegment;
declare const CompoundPath_toSvgString: typeof toSvgString;
declare namespace CompoundPath {
  export { bbox$2 as bbox, CompoundPath_computeDimensions as computeDimensions, CompoundPath_distanceToPoint as distanceToPoint, CompoundPath_fromPaths as fromPaths, CompoundPath_guardContinuous as guardContinuous, interpolate$1 as interpolate, CompoundPath_relativePosition as relativePosition, CompoundPath_setSegment as setSegment, toString$1 as toString, CompoundPath_toSvgString as toSvgString };
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
declare function radianInvert(angleInRadians: number): number;
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

/**
 * Returns true if parameter is an arc
 * @param p Arc or number
 * @returns
 */
declare const isArc: (p: unknown) => p is Arc;
/**
 * Returns true if parameter has a positioned (x,y)
 * @param p Point, Arc or ArcPositiond
 * @returns
 */
declare const isPositioned: (p: Point | Arc | ArcPositioned) => p is Point;
/**
 * Returns an arc from degrees, rather than radians
 * @param radius Radius of arc
 * @param startDegrees Start angle in degrees
 * @param endDegrees End angle in degrees
 * @returns Arc
 */
declare function fromDegrees(radius: number, startDegrees: number, endDegrees: number): Arc;
/**
 * Returns an arc from degrees, rather than radians
 * @param radius Radius of arc
 * @param startDegrees Start angle in degrees
 * @param endDegrees End angle in degrees
 * @param origin Optional center of arc
 * @returns Arc
 */ declare function fromDegrees(radius: number, startDegrees: number, endDegrees: number, origin: Point): ArcPositioned;
/**
 * Returns a {@link Geometry.Line} linking the start and end points of an {@link ArcPositioned}.
 *
 * @param arc
 * @returns Line from start to end of arc
 */
declare const toLine: (arc: ArcPositioned) => Line;
/**
 * Calculates a coordinate on an arc, based on an angle
 * @param arc Arc
 * @param angleRadian Angle of desired coordinate
 * @param origin Origin of arc (0,0 used by default)
 * @returns Coordinate
 */
declare const point: (arc: Arc | ArcPositioned, angleRadian: number, origin?: Point) => Point;
/**
 * Throws an error if arc instance is invalid
 * @param arc
 */
declare const guard$1: (arc: Arc | ArcPositioned) => void;
type Interpolate = {
    (amount: number, arc: Arc, origin: Point): Point;
    (amount: number, arc: ArcPositioned): Point;
};
/**
 * Compute relative position on arc
 * @param arc Arc
 * @param amount Relative position 0-1
 * @param origin If arc is not positioned, pass in an origin
 * @returns
 */
declare const interpolate: Interpolate;
/**
 * Creates a {@link Geometry.Path} instance from the arc. This wraps up some functions for convienence.
 * @param arc
 * @returns Path
 */
declare const toPath: (arc: ArcPositioned) => Path;
/**
 * Calculates the length of the arc
 * @param arc
 * @returns Length
 */
declare const length: (arc: Arc) => number;
/**
 * Calculates a {@link Geometry.Rect | Rect} bounding box for arc.
 * @param arc
 * @returns Rectangle encompassing arc.
 */
declare const bbox$1: (arc: ArcPositioned | Arc) => RectPositioned | Rect;
type ToSvg = {
    /**
     * SVG path for arc description
     * @param origin Origin of arc
     * @param radius Radius
     * @param startRadian Start
     * @param endRadian End
     */
    (origin: Point, radius: number, startRadian: number, endRadian: number, opts?: SvgOpts): ReadonlyArray<string>;
    /**
     * SVG path for non-positioned arc
     */
    (arc: Arc, origin: Point, opts?: SvgOpts): ReadonlyArray<string>;
    /**
     * SVG path for positioned arc
     */
    (arc: ArcPositioned, opts?: SvgOpts): ReadonlyArray<string>;
};
/**
 * Creates an SV path snippet for arc
 * @returns
 */
declare const toSvg: ToSvg;
type SvgOpts = {
    /**
     * "If the arc should be greater or less than 180 degrees"
     * ie. tries to maximise arc length
     */
    readonly largeArc?: boolean;
    /**
     * "If the arc should begin moving at positive angles"
     * ie. the kind of bend it makes to reach end point
     */
    readonly sweep?: boolean;
};
/**
 * Calculates the distance between the centers of two arcs
 * @param a
 * @param b
 * @returns Distance
 */
declare const distanceCenter: (a: ArcPositioned, b: ArcPositioned) => number;
/**
 * Returns true if the two arcs have the same values
 *
 * ```js
 * const arcA = { radius: 5, endRadian: 0, startRadian: 1 };
 * const arcA = { radius: 5, endRadian: 0, startRadian: 1 };
 * arcA === arcB; // false, because object identities are different
 * Arcs.isEqual(arcA, arcB); // true, because values are identical
 * ```
 * @param a
 * @param b
 * @returns {boolean}
 */
declare const isEqual$1: (a: Arc | ArcPositioned, b: Arc | ArcPositioned) => boolean;

declare const index$2_Arc: typeof Arc;
declare const index$2_ArcPositioned: typeof ArcPositioned;
type index$2_SvgOpts = SvgOpts;
declare const index$2_distanceCenter: typeof distanceCenter;
declare const index$2_fromDegrees: typeof fromDegrees;
declare const index$2_interpolate: typeof interpolate;
declare const index$2_isArc: typeof isArc;
declare const index$2_isPositioned: typeof isPositioned;
declare const index$2_length: typeof length;
declare const index$2_point: typeof point;
declare const index$2_toLine: typeof toLine;
declare const index$2_toPath: typeof toPath;
declare const index$2_toSvg: typeof toSvg;
declare namespace index$2 {
  export { index$2_Arc as Arc, index$2_ArcPositioned as ArcPositioned, type index$2_SvgOpts as SvgOpts, bbox$1 as bbox, index$2_distanceCenter as distanceCenter, index$2_fromDegrees as fromDegrees, guard$1 as guard, index$2_interpolate as interpolate, index$2_isArc as isArc, isEqual$1 as isEqual, index$2_isPositioned as isPositioned, index$2_length as length, index$2_point as point, index$2_toLine as toLine, index$2_toPath as toPath, index$2_toSvg as toSvg };
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
declare const normalise: (v: Vector$1) => Vector$1;
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
}) => Coord;
/**
 * Converts a Vector to a Cartesian coordinate. If the provided
 * value is already Cartesian, it is returned.
 * @param v
 * @returns Cartestian vector
 */
declare const toCartesian: (v: Vector$1) => Point;
/**
 * Return a human-friendly representation of vector
 * @param v
 * @param digits
 * @returns
 */
declare const toString: (v: Vector$1, digits?: number) => string;
/**
 * Calculate dot product of a vector
 * @param a
 * @param b
 * @returns
 */
declare const dotProduct: (a: Vector$1, b: Vector$1) => number;
/**
 * Clamps the magnitude of a vector
 * @param v Vector to clamp
 * @param max Maximum magnitude
 * @param min Minium magnitude
 * @returns
 */
declare const clampMagnitude: (v: Vector$1, max?: number, min?: number) => Point | Coord;
/**
 * Returns `a + b`.
 *
 * Vector is returned in the same type as `a`.
 * @param a
 * @param b
 * @returns
 */
declare const sum: (a: Vector$1, b: Vector$1) => Point | Coord;
/**
 * Returns `a - b`.
 *
 * Vector is returned in the same type as `a`
 * @param a
 * @param b
 */
declare const subtract: (a: Vector$1, b: Vector$1) => Point | Coord;
/**
 * Returns `a * b`.
 *
 * Vector is returned in the same type `a`.
 * @param a
 * @param b
 */
declare const multiply: (a: Vector$1, b: Vector$1) => Point | Coord;
/**
 * Returns `a / b`.
 *
 * Vector is returned in the same type `a`.
 * @param a
 * @param b
 */
declare const divide: (a: Vector$1, b: Vector$1) => Point | Coord;

declare const Vector_clampMagnitude: typeof clampMagnitude;
declare const Vector_divide: typeof divide;
declare const Vector_dotProduct: typeof dotProduct;
declare const Vector_fromLineCartesian: typeof fromLineCartesian;
declare const Vector_fromLinePolar: typeof fromLinePolar;
declare const Vector_fromPointPolar: typeof fromPointPolar;
declare const Vector_fromRadians: typeof fromRadians;
declare const Vector_multiply: typeof multiply;
declare const Vector_normalise: typeof normalise;
declare const Vector_quadrantOffsetAngle: typeof quadrantOffsetAngle;
declare const Vector_subtract: typeof subtract;
declare const Vector_sum: typeof sum;
declare const Vector_toCartesian: typeof toCartesian;
declare const Vector_toPolar: typeof toPolar;
declare const Vector_toRadians: typeof toRadians;
declare const Vector_toString: typeof toString;
declare namespace Vector {
  export { Vector_clampMagnitude as clampMagnitude, Vector_divide as divide, Vector_dotProduct as dotProduct, Vector_fromLineCartesian as fromLineCartesian, Vector_fromLinePolar as fromLinePolar, Vector_fromPointPolar as fromPointPolar, Vector_fromRadians as fromRadians, Vector_multiply as multiply, Vector_normalise as normalise, Vector_quadrantOffsetAngle as quadrantOffsetAngle, Vector_subtract as subtract, Vector_sum as sum, Vector_toCartesian as toCartesian, Vector_toPolar as toPolar, Vector_toRadians as toRadians, Vector_toString as toString };
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

/**
 * Calculates the area of a triangle
 * @param t
 * @returns
 */
declare const area$3: (t: Triangle) => number;

/**
 * Returns simple centroid of triangle
 * @param t
 * @returns
 */
declare const centroid: (t: Triangle) => Point;

/**
 * Returns the edges (ie sides) of the triangle as an array of lines
 * @param t
 * @returns Array of length three
 */
declare const edges: (t: Triangle) => PolyLine;

/**
 * Returns the largest circle enclosed by triangle `t`.
 * @param t
 */
declare const innerCircle: (t: Triangle) => CirclePositioned;

/**
 * Throws an exception if the triangle is invalid
 * @param t
 * @param name
 */
declare const guard: (t: Triangle, name?: string) => void;

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
declare const rotate: (t: Triangle, amountRadian?: number, origin?: Point) => Triangle;

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
declare const medians: (t: Isosceles) => readonly [a: number, b: number, c: number];
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
 * A triangle consisting of three empty points (Points.Empty)
 */
declare const Empty: Readonly<{
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
declare const Placeholder: Readonly<{
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
declare const isEmpty: (t: Triangle) => boolean;
/**
 * Returns true if triangle is a placeholder
 * @param t
 * @returns
 */
declare const isPlaceholder: (t: Triangle) => boolean;
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
declare const apply: (t: Triangle, fn: (p: Point, label?: string) => Point) => Readonly<Triangle>;
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
declare const isEqual: (a: Triangle, b: Triangle) => boolean;
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
declare const bbox: (t: Triangle, inflation?: number) => RectPositioned;
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

type index$1_BarycentricCoord = BarycentricCoord;
declare const index$1_Empty: typeof Empty;
declare const index$1_Equilateral: typeof Equilateral;
declare const index$1_Placeholder: typeof Placeholder;
declare const index$1_angles: typeof angles;
declare const index$1_anglesDegrees: typeof anglesDegrees;
declare const index$1_apply: typeof apply;
declare const index$1_barycentricCoord: typeof barycentricCoord;
declare const index$1_barycentricToCartestian: typeof barycentricToCartestian;
declare const index$1_bbox: typeof bbox;
declare const index$1_centroid: typeof centroid;
declare const index$1_corners: typeof corners;
declare const index$1_edges: typeof edges;
declare const index$1_equilateralFromVertex: typeof equilateralFromVertex;
declare const index$1_fromFlatArray: typeof fromFlatArray;
declare const index$1_fromPoints: typeof fromPoints;
declare const index$1_fromRadius: typeof fromRadius;
declare const index$1_guard: typeof guard;
declare const index$1_innerCircle: typeof innerCircle;
declare const index$1_intersectsPoint: typeof intersectsPoint;
declare const index$1_isAcute: typeof isAcute;
declare const index$1_isEmpty: typeof isEmpty;
declare const index$1_isEqual: typeof isEqual;
declare const index$1_isEquilateral: typeof isEquilateral;
declare const index$1_isIsosceles: typeof isIsosceles;
declare const index$1_isOblique: typeof isOblique;
declare const index$1_isObtuse: typeof isObtuse;
declare const index$1_isPlaceholder: typeof isPlaceholder;
declare const index$1_isRightAngle: typeof isRightAngle;
declare const index$1_isTriangle: typeof isTriangle;
declare const index$1_lengths: typeof lengths;
declare const index$1_outerCircle: typeof outerCircle;
declare const index$1_rotate: typeof rotate;
declare const index$1_rotateByVertex: typeof rotateByVertex;
declare const index$1_toFlatArray: typeof toFlatArray;
declare namespace index$1 {
  export { type index$1_BarycentricCoord as BarycentricCoord, index$1_Empty as Empty, index$1_Equilateral as Equilateral, Isosceles$1 as Isosceles, index$1_Placeholder as Placeholder, Right$1 as Right, index$1_angles as angles, index$1_anglesDegrees as anglesDegrees, index$1_apply as apply, area$3 as area, index$1_barycentricCoord as barycentricCoord, index$1_barycentricToCartestian as barycentricToCartestian, index$1_bbox as bbox, index$1_centroid as centroid, index$1_corners as corners, index$1_edges as edges, index$1_equilateralFromVertex as equilateralFromVertex, index$1_fromFlatArray as fromFlatArray, index$1_fromPoints as fromPoints, index$1_fromRadius as fromRadius, index$1_guard as guard, index$1_innerCircle as innerCircle, index$1_intersectsPoint as intersectsPoint, index$1_isAcute as isAcute, index$1_isEmpty as isEmpty, index$1_isEqual as isEqual, index$1_isEquilateral as isEquilateral, index$1_isIsosceles as isIsosceles, index$1_isOblique as isOblique, index$1_isObtuse as isObtuse, index$1_isPlaceholder as isPlaceholder, index$1_isRightAngle as isRightAngle, index$1_isTriangle as isTriangle, index$1_lengths as lengths, index$1_outerCircle as outerCircle, perimeter$3 as perimeter, index$1_rotate as rotate, index$1_rotateByVertex as rotateByVertex, index$1_toFlatArray as toFlatArray };
}

declare const index_Circle: typeof Circle;
declare const index_CirclePositioned: typeof CirclePositioned;
type index_CircularPath = CircularPath;
declare const index_Convolve2d: typeof Convolve2d;
declare const index_CurveSimplification: typeof CurveSimplification;
declare const index_Dimensions: typeof Dimensions;
declare const index_Line: typeof Line;
declare const index_Path: typeof Path;
declare const index_Point: typeof Point;
declare const index_Point3d: typeof Point3d;
type index_PointCalculableShape = PointCalculableShape;
declare const index_Polar: typeof Polar;
declare const index_PolyLine: typeof PolyLine;
declare const index_QuadTree: typeof QuadTree;
declare const index_Rect: typeof Rect;
declare const index_RectArray: typeof RectArray;
declare const index_RectPositioned: typeof RectPositioned;
declare const index_RectPositionedArray: typeof RectPositionedArray;
declare const index_Scaler: typeof Scaler;
type index_ShapePositioned = ShapePositioned;
declare const index_SurfacePoints: typeof SurfacePoints;
declare const index_Triangle: typeof Triangle;
declare const index_WithBeziers: typeof WithBeziers;
declare const index_degreeToRadian: typeof degreeToRadian;
declare const index_radianInvert: typeof radianInvert;
declare const index_radianToDegree: typeof radianToDegree;
declare const index_radiansFromAxisX: typeof radiansFromAxisX;
declare namespace index {
  export { index$2 as Arcs, index$3 as Beziers, index_Circle as Circle, index_CirclePositioned as CirclePositioned, index$6 as Circles, type index_CircularPath as CircularPath, CompoundPath as Compound, CompoundPath$1 as CompoundPath, index_Convolve2d as Convolve2d, index_CurveSimplification as CurveSimplification, index_Dimensions as Dimensions, Ellipse as Ellipses, Grid$1 as Grids, Layout as Layouts, index_Line as Line, index$5 as Lines, index_Path as Path, index$8 as Paths, index_Point as Point, index_Point3d as Point3d, type index_PointCalculableShape as PointCalculableShape, index$4 as Points, index_Polar as Polar, index_PolyLine as PolyLine, index_QuadTree as QuadTree, index_Rect as Rect, index_RectArray as RectArray, index_RectPositioned as RectPositioned, index_RectPositionedArray as RectPositionedArray, index$7 as Rects, index_Scaler as Scaler, type index_ShapePositioned as ShapePositioned, index$9 as Shapes, index_SurfacePoints as SurfacePoints, index_Triangle as Triangle, index$1 as Triangles, type Vector$1 as Vector, Vector as Vectors, Waypoint$1 as Waypoints, index_WithBeziers as WithBeziers, index_degreeToRadian as degreeToRadian, index_radianInvert as radianInvert, index_radianToDegree as radianToDegree, index_radiansFromAxisX as radiansFromAxisX };
}

export { CompoundPath as C, Layout as L, type PointCalculableShape as P, QuadTree as Q, SurfacePoints as S, Vector as V, Waypoint$1 as W, index$6 as a, index$5 as b, index$7 as c, index$4 as d, index$8 as e, index$3 as f, CurveSimplification as g, Convolve2d as h, index as i, index$2 as j, index$9 as k, index$1 as l, type Vector$1 as m, type CircularPath as n, type ShapePositioned as o, degreeToRadian as p, radianToDegree as q, radianInvert as r, radiansFromAxisX as s };
