import { C as CirclePositioned, P as Point, c as Path$1, d as Circle, S as ShapePositioned, R as RectPositioned, e as Rect, f as CircularPath, L as Line$1, a as PolyLine, g as RectArray, h as RectPositionedArray, T as Triangle, b as PolarCoord, V as Vector$1, i as Sphere, j as Point3d, k as PointCalculableShape } from './Types-da56032e.js';
import { a as RandomSource } from './Types-85513495.js';
import { C as CardinalDirection, a as Cell, G as Grid, b as CellAccessor, V as VisitGenerator, c as Grid$1 } from './Grid-08f46609.js';
import { Point as Point$1 } from 'bezier-js';
import { i as index$4 } from './index-151e9bd5.js';
import { A as Arc, B as Bezier, E as Ellipse } from './Arc-b5345509.js';
import { T as TraversableTree } from './Types-d483f031.js';
import { a as Scaler } from './Scaler-9e002131.js';
import { R as Rgb } from './Colour-16fb1059.js';

type Waypoint = CirclePositioned;
type Opts = {
    readonly maxDistanceFromLine?: number;
    readonly enforceOrder?: boolean;
};
declare const fromPoints$2: (waypoints: ReadonlyArray<Point>, opts?: Opts) => (pt: Point) => {
    path: Path$1;
    index: number;
    nearest: Point;
    distance: number;
}[];
declare const init: (paths: ReadonlyArray<Path$1>, opts?: Opts) => (pt: Point) => {
    path: Path$1;
    index: number;
    nearest: Point;
    distance: number;
}[];

type Waypoint$1_Opts = Opts;
type Waypoint$1_Waypoint = Waypoint;
declare const Waypoint$1_init: typeof init;
declare namespace Waypoint$1 {
  export {
    Waypoint$1_Opts as Opts,
    Waypoint$1_Waypoint as Waypoint,
    fromPoints$2 as fromPoints,
    Waypoint$1_init as init,
  };
}

type RandomOpts = {
    readonly attempts?: number;
    readonly randomSource?: RandomSource;
};
/**
 * Naive randomised circle packing.
 * [Algorithm by Taylor Hobbs](https://tylerxhobbs.com/essays/2016/a-randomized-approach-to-cicle-packing)
 */
declare const random$1: (circles: ReadonlyArray<Circle>, container: ShapePositioned, opts?: RandomOpts) => CirclePositioned[];

type CirclePacking_RandomOpts = RandomOpts;
declare namespace CirclePacking {
  export {
    CirclePacking_RandomOpts as RandomOpts,
    random$1 as random,
  };
}

declare const Layout_CirclePacking: typeof CirclePacking;
declare namespace Layout {
  export {
    Layout_CirclePacking as CirclePacking,
  };
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
declare const distanceFromExterior$1: (a: CirclePositioned, b: CirclePositioned | Point) => number;

/**
 * Throws if radius is out of range. If x,y is present, these will be validated too.
 * @param circle
 * @param paramName
 */
declare const guard$3: (circle: CirclePositioned | Circle, parameterName?: string) => void;
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
declare const isNaN: (a: Circle | CirclePositioned) => boolean;
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
declare const center$2: (circle: CirclePositioned | Circle) => Readonly<{
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
declare const interpolate$2: (circle: CirclePositioned, t: number) => Point;
/**
 * Returns circumference of `circle` (alias of {@link circumference})
 * @param circle
 * @returns
 */
declare const length$1: (circle: Circle) => number;
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
declare const area$5: (circle: Circle) => number;
/**
 * Computes a bounding box that encloses circle
 * @param circle
 * @returns
 */
declare const bbox$3: (circle: CirclePositioned | Circle) => RectPositioned | Rect;
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
declare const isEqual$3: (a: CirclePositioned | Circle, b: CirclePositioned | Circle) => boolean;
type RandomPointOpts$2 = {
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
declare const randomPoint$2: (within: Circle | CirclePositioned, opts?: RandomPointOpts$2) => Point;
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
declare const nearest$1: (circle: CirclePositioned | ReadonlyArray<CirclePositioned>, b: Point) => Point;
/**
 * Returns a `CircularPath` representation of a circle
 *
 * @param {CirclePositioned} circle
 * @returns {CircularPath}
 */
declare const toPath$1: (circle: CirclePositioned) => CircularPath;
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
declare const intersectionLine: (circle: CirclePositioned, line: Line$1) => ReadonlyArray<Point>;

declare const index$3_circumference: typeof circumference;
declare const index$3_distanceCenter: typeof distanceCenter;
declare const index$3_guardPositioned: typeof guardPositioned;
declare const index$3_intersectionLine: typeof intersectionLine;
declare const index$3_isCircle: typeof isCircle;
declare const index$3_isCirclePositioned: typeof isCirclePositioned;
declare const index$3_isNaN: typeof isNaN;
declare const index$3_isPositioned: typeof isPositioned;
declare const index$3_point: typeof point;
declare const index$3_toPositioned: typeof toPositioned;
declare const index$3_toSvg: typeof toSvg;
declare namespace index$3 {
  export {
    RandomPointOpts$2 as RandomPointOpts,
    area$5 as area,
    bbox$3 as bbox,
    center$2 as center,
    index$3_circumference as circumference,
    index$3_distanceCenter as distanceCenter,
    distanceFromExterior$1 as distanceFromExterior,
    guard$3 as guard,
    index$3_guardPositioned as guardPositioned,
    interpolate$2 as interpolate,
    index$3_intersectionLine as intersectionLine,
    index$3_isCircle as isCircle,
    index$3_isCirclePositioned as isCirclePositioned,
    isEqual$3 as isEqual,
    index$3_isNaN as isNaN,
    index$3_isPositioned as isPositioned,
    length$1 as length,
    multiplyScalar$1 as multiplyScalar,
    nearest$1 as nearest,
    index$3_point as point,
    randomPoint$2 as randomPoint,
    toPath$1 as toPath,
    index$3_toPositioned as toPositioned,
    index$3_toSvg as toSvg,
  };
}

declare const Empty$1: Readonly<{
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
declare const isEmpty$1: (l: Line$1) => boolean;
declare const isPlaceholder$1: (l: Line$1) => boolean;
/**
 * Returns true if `p` is a valid line, containing `a` and `b` Points.
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * Lines.isLine(l);
 * ```
 * @param p Value to check
 * @returns True if a valid line.
 */
declare const isLine: (p: Path$1 | Line$1 | Point) => p is Line$1;
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
declare const isEqual$2: (a: Line$1, b: Line$1) => boolean;
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
declare const apply$1: (line: Line$1, fn: (p: Point) => Point) => Readonly<Line$1>;
/**
 * Throws an exception if:
 * * line is undefined
 * * a or b parameters are missing
 *
 * Does not validate points
 * @param line
 * @param name
 */
declare const guard$2: (line: Line$1, name?: string) => void;
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
declare const angleRadian: (lineOrPoint: Line$1 | Point, b?: Point) => number;
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
declare const multiply$4: (line: Line$1, point: Point) => Line$1;
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
declare const divide$2: (line: Line$1, point: Point) => Line$1;
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
declare const sum$2: (line: Line$1, point: Point) => Line$1;
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
declare const subtract$2: (line: Line$1, point: Point) => Line$1;
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
declare const normaliseByRect$1: (line: Line$1, width: number, height: number) => Line$1;
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
declare const withinRange: (line: Line$1, point: Point, maxRange: number) => boolean;
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
declare function length(a: Point, b: Point): number;
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
declare function length(line: Line$1 | PolyLine): number;
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
declare const midpoint: (aOrLine: Point | Line$1, pointB?: Point) => Point;
/**
 * Returns [a,b] points from either a line parameter, or two points.
 * It additionally applies the guardPoint function to ensure validity.
 * This supports function overloading.
 * @ignore
 * @param aOrLine
 * @param b
 * @returns
 */
declare const getPointParameter: (aOrLine: Point | Line$1, b?: Point) => readonly [Point, Point];
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
declare const nearest: (line: Line$1 | ReadonlyArray<Line$1>, point: Point) => Point;
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
declare const slope: (lineOrPoint: Line$1 | Point, b?: Point) => number;
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
declare const perpendicularPoint: (line: Line$1, distance: number, amount?: number) => {
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
declare const parallel: (line: Line$1, distance: number) => Line$1;
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
declare const scaleFromMidpoint: (line: Line$1, factor: number) => Line$1;
/**
 * Calculates `y` where `line` intersects `x`.
 * @param line Line to extend
 * @param x Intersection of x-axis.
 */
declare const pointAtX: (line: Line$1, x: number) => Point;
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
declare const extendFromA: (line: Line$1, distance: number) => Line$1;
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
declare function pointsOf(line: Line$1): Generator<Point>;
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
declare const distance: (line: Line$1 | ReadonlyArray<Line$1>, point: Point) => number;
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
 * @param b End
 * @returns Point between a and b
 */
declare function interpolate$1(amount: number, a: Point, pointB: Point, allowOverflow?: boolean): Point;
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
declare function interpolate$1(amount: number, line: Line$1, allowOverflow?: boolean): Point;
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
declare function toString$3(line: Line$1): string;
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
declare const fromNumbers$1: (x1: number, y1: number, x2: number, y2: number) => Line$1;
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
declare const toFlatArray$1: (a: Point | Line$1, b: Point) => ReadonlyArray<number>;
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
declare function asPoints(lines: Iterable<Line$1>): Generator<Point, void, unknown>;
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
declare const fromFlatArray$1: (array: ReadonlyArray<number>) => Line$1;
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
declare const fromPoints$1: (a: Point, b: Point) => Line$1;
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
declare const bbox$2: (line: Line$1) => RectPositioned;
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
declare const toPath: (line: Line$1) => LinePath;
type LinePath = Line$1 & Path$1 & {
    toFlatArray(): ReadonlyArray<number>;
    toPoints(): ReadonlyArray<Point>;
    rotate(amountRadian: number, origin: Point): LinePath;
    sum(point: Point): LinePath;
    divide(point: Point): LinePath;
    multiply(point: Point): LinePath;
    subtract(point: Point): LinePath;
    apply(fn: (point: Point) => Point): LinePath;
    midpoint(): Point;
    distance(point: Point): number;
    parallel(distance: number): Line$1;
    perpendicularPoint(distance: number, amount?: number): Point;
    slope(): number;
    withinRange(point: Point, maxRange: number): boolean;
    isEqual(otherLine: Line$1): boolean;
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
declare const rotate$2: (line: Line$1, amountRadian?: number, origin?: Point | number) => Line$1;

type Line_LinePath = LinePath;
declare const Line_angleRadian: typeof angleRadian;
declare const Line_asPoints: typeof asPoints;
declare const Line_distance: typeof distance;
declare const Line_extendFromA: typeof extendFromA;
declare const Line_fromPointsToPath: typeof fromPointsToPath;
declare const Line_getPointParameter: typeof getPointParameter;
declare const Line_isLine: typeof isLine;
declare const Line_isPolyLine: typeof isPolyLine;
declare const Line_joinPointsToLines: typeof joinPointsToLines;
declare const Line_length: typeof length;
declare const Line_midpoint: typeof midpoint;
declare const Line_nearest: typeof nearest;
declare const Line_parallel: typeof parallel;
declare const Line_perpendicularPoint: typeof perpendicularPoint;
declare const Line_pointAtX: typeof pointAtX;
declare const Line_pointsOf: typeof pointsOf;
declare const Line_scaleFromMidpoint: typeof scaleFromMidpoint;
declare const Line_slope: typeof slope;
declare const Line_toPath: typeof toPath;
declare const Line_withinRange: typeof withinRange;
declare namespace Line {
  export {
    Empty$1 as Empty,
    Line_LinePath as LinePath,
    Placeholder$1 as Placeholder,
    Line_angleRadian as angleRadian,
    apply$1 as apply,
    Line_asPoints as asPoints,
    bbox$2 as bbox,
    Line_distance as distance,
    divide$2 as divide,
    Line_extendFromA as extendFromA,
    fromFlatArray$1 as fromFlatArray,
    fromNumbers$1 as fromNumbers,
    fromPoints$1 as fromPoints,
    Line_fromPointsToPath as fromPointsToPath,
    Line_getPointParameter as getPointParameter,
    guard$2 as guard,
    interpolate$1 as interpolate,
    isEmpty$1 as isEmpty,
    isEqual$2 as isEqual,
    Line_isLine as isLine,
    isPlaceholder$1 as isPlaceholder,
    Line_isPolyLine as isPolyLine,
    Line_joinPointsToLines as joinPointsToLines,
    Line_length as length,
    Line_midpoint as midpoint,
    multiply$4 as multiply,
    Line_nearest as nearest,
    normaliseByRect$1 as normaliseByRect,
    Line_parallel as parallel,
    Line_perpendicularPoint as perpendicularPoint,
    Line_pointAtX as pointAtX,
    Line_pointsOf as pointsOf,
    rotate$2 as rotate,
    Line_scaleFromMidpoint as scaleFromMidpoint,
    Line_slope as slope,
    subtract$2 as subtract,
    sum$2 as sum,
    toFlatArray$1 as toFlatArray,
    Line_toPath as toPath,
    toString$3 as toString,
    toSvgString$1 as toSvgString,
    Line_withinRange as withinRange,
  };
}

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
declare const distanceFromExterior: (rect: RectPositioned, pt: Point$1) => number;
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
declare function fromNumbers(width: number, height: number): Rect;
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
declare function fromNumbers(x: number, y: number, width: number, height: number): RectPositioned;

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
declare function intersectsPoint$1(rect: Rect | RectPositioned, point: Point$1): boolean;
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
declare const isIntersecting$1: (a: RectPositioned, b: CirclePositioned | Point$1) => boolean;

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
declare function multiply$3(a: RectPositioned, b: Rect | number, c?: number): RectPositioned;
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
declare function multiply$3(a: Rect, b: Rect | number, c?: number): Rect;
declare function multiply$3(a: RectPositioned, b: Rect): RectPositioned;
/**
 * Multiplies all components of `rect` by `amount`
 * @param rect
 * @param amount
 */
declare function multiplyScalar(rect: Rect, amount: number): Rect;
/**
 * Multiplies all components of `rect` by `amount`
 * @param rect
 * @param amount
 */
declare function multiplyScalar(rect: RectPositioned, amount: number): RectPositioned;

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
declare function toArray(rect: Rect): RectArray;
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
declare function toArray(rect: RectPositioned): RectPositionedArray;
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
declare const isEqual$1: (a: Rect | RectPositioned, b: Rect | RectPositioned) => boolean;
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
declare const clamp: (value: Rect, maximum: Rect) => Rect;
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
declare const normaliseByRect: (rect: Rect | RectPositioned, normaliseByOrWidth: Rect | number, height?: number) => Rect | RectPositioned;
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
declare const center$1: (rect: RectPositioned | Rect, origin?: Point) => Point;
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
declare const edges$1: (rect: RectPositioned | Rect, origin?: Point) => ReadonlyArray<Line$1>;
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
declare const area$4: (rect: Rect) => number;
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
declare const random: (rando?: RandomSource) => RectPositioned;
type RandomPointOpts$1 = {
    readonly strategy?: `naive`;
    readonly randomSource?: RandomSource;
    readonly margin?: {
        readonly x: number;
        readonly y: number;
    };
};
/**
 * Returns a random point within a circle.
 *
 * By default creates a uniform distribution.
 *
 * ```js
 * const pt = randomPoint({width: 5, height: 10});
 * ```'
 * @param within Circle to generate a point within
 * @param opts Options
 * @returns
 */
declare const randomPoint$1: (within: Rect | RectPositioned, opts?: RandomPointOpts$1) => Point;

declare const index$2_cardinal: typeof cardinal;
declare const index$2_clamp: typeof clamp;
declare const index$2_distanceFromCenter: typeof distanceFromCenter;
declare const index$2_distanceFromExterior: typeof distanceFromExterior;
declare const index$2_empty: typeof empty;
declare const index$2_emptyPositioned: typeof emptyPositioned;
declare const index$2_fromElement: typeof fromElement;
declare const index$2_fromNumbers: typeof fromNumbers;
declare const index$2_fromTopLeft: typeof fromTopLeft;
declare const index$2_getEdgeX: typeof getEdgeX;
declare const index$2_getEdgeY: typeof getEdgeY;
declare const index$2_isEqualSize: typeof isEqualSize;
declare const index$2_maxFromCorners: typeof maxFromCorners;
declare const index$2_multiplyScalar: typeof multiplyScalar;
declare const index$2_normaliseByRect: typeof normaliseByRect;
declare const index$2_placeholder: typeof placeholder;
declare const index$2_placeholderPositioned: typeof placeholderPositioned;
declare const index$2_random: typeof random;
declare const index$2_toArray: typeof toArray;
declare namespace index$2 {
  export {
    RandomPointOpts$1 as RandomPointOpts,
    area$4 as area,
    index$2_cardinal as cardinal,
    center$1 as center,
    index$2_clamp as clamp,
    corners$1 as corners,
    index$2_distanceFromCenter as distanceFromCenter,
    index$2_distanceFromExterior as distanceFromExterior,
    edges$1 as edges,
    index$2_empty as empty,
    index$2_emptyPositioned as emptyPositioned,
    fromCenter$2 as fromCenter,
    index$2_fromElement as fromElement,
    index$2_fromNumbers as fromNumbers,
    index$2_fromTopLeft as fromTopLeft,
    index$2_getEdgeX as getEdgeX,
    index$2_getEdgeY as getEdgeY,
    intersectsPoint$1 as intersectsPoint,
    isEqual$1 as isEqual,
    index$2_isEqualSize as isEqualSize,
    isIntersecting$1 as isIntersecting,
    lengths$1 as lengths,
    index$2_maxFromCorners as maxFromCorners,
    multiply$3 as multiply,
    index$2_multiplyScalar as multiplyScalar,
    index$2_normaliseByRect as normaliseByRect,
    perimeter$4 as perimeter,
    index$2_placeholder as placeholder,
    index$2_placeholderPositioned as placeholderPositioned,
    index$2_random as random,
    randomPoint$1 as randomPoint,
    subtract$1 as subtract,
    sum$1 as sum,
    index$2_toArray as toArray,
  };
}

/**
 * Return the start point of a path
 *
 * @param path
 * @return Point
 */
declare const getStart: (path: Path$1) => Point;
/**
 * Return the end point of a path
 *
 * @param path
 * @return Point
 */
declare const getEnd: (path: Path$1) => Point;
type WithBeziers = {
    getBeziers(): ReadonlyArray<Path$1>;
};

type Path_WithBeziers = WithBeziers;
declare const Path_getEnd: typeof getEnd;
declare const Path_getStart: typeof getStart;
declare namespace Path {
  export {
    Path_WithBeziers as WithBeziers,
    Path_getEnd as getEnd,
    Path_getStart as getStart,
  };
}

type CompoundPath = Path$1 & {
    readonly segments: ReadonlyArray<Path$1>;
    readonly kind: `compound`;
};
/**
 * Returns a new compoundpath, replacing a path at a given index
 *
 * @param compoundPath Existing compoundpath
 * @param index Index to replace at
 * @param path Path to substitute in
 * @returns New compoundpath
 */
declare const setSegment: (compoundPath: CompoundPath, index: number, path: Path$1) => CompoundPath;
/**
 * Computes x,y point at a relative position along compoundpath
 *
 * @param paths Combined paths (assumes contiguous)
 * @param t Position (given as a percentage from 0 to 1)
 * @param useWidth If true, widths are used for calulcating. If false, lengths are used
 * @param dimensions Precalculated dimensions of paths, will be computed if omitted
 * @returns
 */
declare const interpolate: (paths: ReadonlyArray<Path$1>, t: number, useWidth?: boolean, dimensions?: Dimensions) => Point;
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
 * Computes the widths and lengths of all paths, adding them up as well
 *
 * @param paths
 * @returns
 */
declare const computeDimensions: (paths: ReadonlyArray<Path$1>) => Dimensions;
/**
 * Computes the bounding box that encloses entire compoundpath
 *
 * @param paths
 * @returns
 */
declare const bbox$1: (paths: ReadonlyArray<Path$1>) => RectPositioned;
/**
 * Produce a human-friendly representation of paths
 *
 * @param paths
 * @returns
 */
declare const toString$2: (paths: ReadonlyArray<Path$1>) => string;
/**
 * Throws an error if paths are not connected together, in order
 *
 * @param paths
 */
declare const guardContinuous: (paths: ReadonlyArray<Path$1>) => void;
declare const toSvgString: (paths: ReadonlyArray<Path$1>) => ReadonlyArray<string>;
/**
 * Create a compoundpath from an array of paths.
 * All this does is verify they are connected, and precomputes dimensions
 *
 * @param paths
 * @returns
 */
declare const fromPaths: (...paths: ReadonlyArray<Path$1>) => CompoundPath;

type CompoundPath$1_CompoundPath = CompoundPath;
type CompoundPath$1_Dimensions = Dimensions;
declare const CompoundPath$1_computeDimensions: typeof computeDimensions;
declare const CompoundPath$1_fromPaths: typeof fromPaths;
declare const CompoundPath$1_guardContinuous: typeof guardContinuous;
declare const CompoundPath$1_interpolate: typeof interpolate;
declare const CompoundPath$1_setSegment: typeof setSegment;
declare const CompoundPath$1_toSvgString: typeof toSvgString;
declare namespace CompoundPath$1 {
  export {
    CompoundPath$1_CompoundPath as CompoundPath,
    CompoundPath$1_Dimensions as Dimensions,
    bbox$1 as bbox,
    CompoundPath$1_computeDimensions as computeDimensions,
    CompoundPath$1_fromPaths as fromPaths,
    CompoundPath$1_guardContinuous as guardContinuous,
    CompoundPath$1_interpolate as interpolate,
    CompoundPath$1_setSegment as setSegment,
    toString$2 as toString,
    CompoundPath$1_toSvgString as toSvgString,
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
  export {
    QuadTree_Direction as Direction,
    QuadTree_QuadTreeItem as QuadTreeItem,
    QuadTree_QuadTreeNode as QuadTreeNode,
    QuadTree_QuadTreeOpts as QuadTreeOpts,
    QuadTree_quadTree as quadTree,
  };
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
  export {
    Convolve2d_CellWithValue as CellWithValue,
    Convolve2d_Kernel as Kernel,
    Convolve2d_Kernel2dArray as Kernel2dArray,
    Convolve2d_KernelCompute as KernelCompute,
    Convolve2d_KernelReduce as KernelReduce,
    Convolve2d_ScalarAndValue as ScalarAndValue,
    Convolve2d_boxBlurKernel as boxBlurKernel,
    Convolve2d_convolve as convolve,
    Convolve2d_convolveCell as convolveCell,
    Convolve2d_convolveImage as convolveImage,
    Convolve2d_edgeDetectionKernel as edgeDetectionKernel,
    Convolve2d_gaussianBlur3Kernel as gaussianBlur3Kernel,
    Convolve2d_gaussianBlur5Kernel as gaussianBlur5Kernel,
    Convolve2d_identityKernel as identityKernel,
    Convolve2d_kernel2dToArray as kernel2dToArray,
    multiply$2 as multiply,
    Convolve2d_rgbReducer as rgbReducer,
    Convolve2d_sharpenKernel as sharpenKernel,
    Convolve2d_unsharpMasking5Kernel as unsharpMasking5Kernel,
  };
}

type ContainsResult = `none` | `contained`;
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

type Shape_ArrowOpts = ArrowOpts;
type Shape_ContainsResult = ContainsResult;
type Shape_RandomPointOpts = RandomPointOpts;
declare const Shape_arrow: typeof arrow;
declare const Shape_center: typeof center;
declare const Shape_isIntersecting: typeof isIntersecting;
declare const Shape_randomPoint: typeof randomPoint;
declare const Shape_starburst: typeof starburst;
declare namespace Shape {
  export {
    Shape_ArrowOpts as ArrowOpts,
    Shape_ContainsResult as ContainsResult,
    Shape_RandomPointOpts as RandomPointOpts,
    Shape_arrow as arrow,
    Shape_center as center,
    Shape_isIntersecting as isIntersecting,
    Shape_randomPoint as randomPoint,
    Shape_starburst as starburst,
  };
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
declare const fromLineCartesian: (line: Line$1) => Point;
/**
 * Returns a polar-coordinate vector from a line a -> b
 * @param line
 * @returns
 */
declare const fromLinePolar: (line: Line$1) => PolarCoord;
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
  export {
    clampMagnitude$1 as clampMagnitude,
    divide$1 as divide,
    dotProduct$1 as dotProduct,
    Vector_fromLineCartesian as fromLineCartesian,
    Vector_fromLinePolar as fromLinePolar,
    Vector_fromPointPolar as fromPointPolar,
    Vector_fromRadians as fromRadians,
    multiply$1 as multiply,
    normalise$1 as normalise,
    Vector_quadrantOffsetAngle as quadrantOffsetAngle,
    Vector_subtract as subtract,
    Vector_sum as sum,
    toCartesian$1 as toCartesian,
    Vector_toPolar as toPolar,
    Vector_toRadians as toRadians,
    toString$1 as toString,
  };
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
declare const rotate$1: (c: PolarCoord, amountRadian: number) => PolarCoord;
declare const normalise: (c: PolarCoord) => PolarCoord;
/**
 * Throws an error if PolarCoord is invalid
 * @param p
 * @param name
 */
declare const guard$1: (p: PolarCoord, name?: string) => void;
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
declare const Polar_invert: typeof invert;
declare const Polar_isAntiParallel: typeof isAntiParallel;
declare const Polar_isOpposite: typeof isOpposite;
declare const Polar_isParallel: typeof isParallel;
declare const Polar_isPolarCoord: typeof isPolarCoord;
declare const Polar_multiply: typeof multiply;
declare const Polar_normalise: typeof normalise;
declare const Polar_rotateDegrees: typeof rotateDegrees;
declare const Polar_spiral: typeof spiral;
declare const Polar_spiralRaw: typeof spiralRaw;
declare const Polar_toCartesian: typeof toCartesian;
declare const Polar_toPoint: typeof toPoint;
declare const Polar_toString: typeof toString;
declare namespace Polar {
  export {
    Polar_clampMagnitude as clampMagnitude,
    Polar_divide as divide,
    Polar_dotProduct as dotProduct,
    Polar_fromCartesian as fromCartesian,
    guard$1 as guard,
    Polar_invert as invert,
    Polar_isAntiParallel as isAntiParallel,
    Polar_isOpposite as isOpposite,
    Polar_isParallel as isParallel,
    Polar_isPolarCoord as isPolarCoord,
    Polar_multiply as multiply,
    Polar_normalise as normalise,
    rotate$1 as rotate,
    Polar_rotateDegrees as rotateDegrees,
    Polar_spiral as spiral,
    Polar_spiralRaw as spiralRaw,
    Polar_toCartesian as toCartesian,
    Polar_toPoint as toPoint,
    Polar_toString as toString,
  };
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
  export {
    SurfacePoints_CircleRingsOpts as CircleRingsOpts,
    SurfacePoints_VogelSpiralOpts as VogelSpiralOpts,
    SurfacePoints_circleRings as circleRings,
    SurfacePoints_circleVogelSpiral as circleVogelSpiral,
    SurfacePoints_sphereFibonacci as sphereFibonacci,
  };
}

/**
 * Throws an exception if the triangle is invalid
 * @param t
 * @param name
 */
declare const guard: (t: Triangle, name?: string) => void;

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
  export {
    Equilateral_TriangleEquilateral as TriangleEquilateral,
    area$2 as area,
    Equilateral_centerFromA as centerFromA,
    Equilateral_centerFromB as centerFromB,
    Equilateral_centerFromC as centerFromC,
    circumcircle$2 as circumcircle,
    fromCenter$1 as fromCenter,
    height$2 as height,
    incircle$2 as incircle,
    perimeter$2 as perimeter,
  };
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
  export {
    Right$1_DefinedRight as DefinedRight,
    Right$1_Right as Right,
    Right$1_adjacentFromHypotenuse as adjacentFromHypotenuse,
    Right$1_adjacentFromOpposite as adjacentFromOpposite,
    Right$1_angleAtPointA as angleAtPointA,
    Right$1_angleAtPointB as angleAtPointB,
    area$1 as area,
    circumcircle$1 as circumcircle,
    fromA$1 as fromA,
    fromB$1 as fromB,
    fromC$1 as fromC,
    height$1 as height,
    Right$1_hypotenuseFromAdjacent as hypotenuseFromAdjacent,
    Right$1_hypotenuseFromOpposite as hypotenuseFromOpposite,
    Right$1_hypotenuseSegments as hypotenuseSegments,
    incircle$1 as incircle,
    medians$1 as medians,
    Right$1_oppositeFromAdjacent as oppositeFromAdjacent,
    Right$1_oppositeFromHypotenuse as oppositeFromHypotenuse,
    perimeter$1 as perimeter,
    Right$1_resolveLengths as resolveLengths,
  };
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
  export {
    Isosceles$1_Isosceles as Isosceles,
    Isosceles$1_apexAngle as apexAngle,
    Isosceles$1_area as area,
    Isosceles$1_baseAngle as baseAngle,
    Isosceles$1_circumcircle as circumcircle,
    Isosceles$1_fromA as fromA,
    Isosceles$1_fromB as fromB,
    Isosceles$1_fromC as fromC,
    Isosceles$1_fromCenter as fromCenter,
    Isosceles$1_height as height,
    Isosceles$1_incircle as incircle,
    Isosceles$1_legHeights as legHeights,
    Isosceles$1_medians as medians,
    Isosceles$1_perimeter as perimeter,
  };
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
 * Returns simple centroid of triangle
 * @param t
 * @returns
 */
declare const centroid: (t: Triangle) => Point;
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
 * @param origin
 * @param length
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
  export {
    index$1_BarycentricCoord as BarycentricCoord,
    index$1_Empty as Empty,
    index$1_Equilateral as Equilateral,
    Isosceles$1 as Isosceles,
    index$1_Placeholder as Placeholder,
    Right$1 as Right,
    index$1_angles as angles,
    index$1_anglesDegrees as anglesDegrees,
    index$1_apply as apply,
    area$3 as area,
    index$1_barycentricCoord as barycentricCoord,
    index$1_barycentricToCartestian as barycentricToCartestian,
    index$1_bbox as bbox,
    index$1_centroid as centroid,
    index$1_corners as corners,
    index$1_edges as edges,
    index$1_equilateralFromVertex as equilateralFromVertex,
    index$1_fromFlatArray as fromFlatArray,
    index$1_fromPoints as fromPoints,
    index$1_fromRadius as fromRadius,
    index$1_guard as guard,
    index$1_innerCircle as innerCircle,
    index$1_intersectsPoint as intersectsPoint,
    index$1_isAcute as isAcute,
    index$1_isEmpty as isEmpty,
    index$1_isEqual as isEqual,
    index$1_isEquilateral as isEquilateral,
    index$1_isIsosceles as isIsosceles,
    index$1_isOblique as isOblique,
    index$1_isObtuse as isObtuse,
    index$1_isPlaceholder as isPlaceholder,
    index$1_isRightAngle as isRightAngle,
    index$1_isTriangle as isTriangle,
    index$1_lengths as lengths,
    index$1_outerCircle as outerCircle,
    perimeter$3 as perimeter,
    index$1_rotate as rotate,
    index$1_rotateByVertex as rotateByVertex,
    index$1_toFlatArray as toFlatArray,
  };
}

declare const index_Circle: typeof Circle;
declare const index_CirclePositioned: typeof CirclePositioned;
declare const index_CircularPath: typeof CircularPath;
declare const index_Convolve2d: typeof Convolve2d;
declare const index_Point: typeof Point;
declare const index_Point3d: typeof Point3d;
declare const index_PointCalculableShape: typeof PointCalculableShape;
declare const index_Polar: typeof Polar;
declare const index_PolarCoord: typeof PolarCoord;
declare const index_PolyLine: typeof PolyLine;
declare const index_QuadTree: typeof QuadTree;
declare const index_Rect: typeof Rect;
declare const index_RectArray: typeof RectArray;
declare const index_RectPositioned: typeof RectPositioned;
declare const index_RectPositionedArray: typeof RectPositionedArray;
declare const index_Scaler: typeof Scaler;
declare const index_ShapePositioned: typeof ShapePositioned;
declare const index_Sphere: typeof Sphere;
declare const index_SurfacePoints: typeof SurfacePoints;
declare const index_Triangle: typeof Triangle;
declare const index_degreeToRadian: typeof degreeToRadian;
declare const index_radianToDegree: typeof radianToDegree;
declare const index_radiansFromAxisX: typeof radiansFromAxisX;
declare namespace index {
  export {
    Arc as Arcs,
    Bezier as Beziers,
    index_Circle as Circle,
    index_CirclePositioned as CirclePositioned,
    index$3 as Circles,
    index_CircularPath as CircularPath,
    CompoundPath$1 as Compound,
    index_Convolve2d as Convolve2d,
    Ellipse as Ellipses,
    Grid$1 as Grids,
    Layout as Layouts,
    Line$1 as Line,
    Line as Lines,
    Path$1 as Path,
    Path as Paths,
    index_Point as Point,
    index_Point3d as Point3d,
    index_PointCalculableShape as PointCalculableShape,
    index$4 as Points,
    index_Polar as Polar,
    index_PolarCoord as PolarCoord,
    index_PolyLine as PolyLine,
    index_QuadTree as QuadTree,
    index_Rect as Rect,
    index_RectArray as RectArray,
    index_RectPositioned as RectPositioned,
    index_RectPositionedArray as RectPositionedArray,
    index$2 as Rects,
    index_Scaler as Scaler,
    index_ShapePositioned as ShapePositioned,
    Shape as Shapes,
    index_Sphere as Sphere,
    index_SurfacePoints as SurfacePoints,
    index_Triangle as Triangle,
    index$1 as Triangles,
    Vector$1 as Vector,
    Vector as Vectors,
    Waypoint$1 as Waypoints,
    index_degreeToRadian as degreeToRadian,
    index_radianToDegree as radianToDegree,
    index_radiansFromAxisX as radiansFromAxisX,
  };
}

export { CompoundPath$1 as C, Layout as L, Path as P, QuadTree as Q, Shape as S, Vector as V, Waypoint$1 as W, index$3 as a, Line as b, index$2 as c, Convolve2d as d, Polar as e, SurfacePoints as f, index$1 as g, degreeToRadian as h, index as i, radiansFromAxisX as j, radianToDegree as r };
