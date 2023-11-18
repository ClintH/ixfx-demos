import { a as RandomSource } from './Types-85513495.js';
import { P as Point, k as PointCalculableShape, j as Point3d, R as RectPositioned, e as Rect } from './Types-da56032e.js';

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
 * @param rect
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
 * @param Rect
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
  export {
    index_Empty as Empty,
    index_Placeholder as Placeholder,
    index_PointRelation as PointRelation,
    index_PointRelationResult as PointRelationResult,
    index_abs as abs,
    index_angle as angle,
    index_apply as apply,
    index_bbox as bbox,
    index_centroid as centroid,
    index_clamp as clamp,
    index_clampMagnitude as clampMagnitude,
    index_compare as compare,
    index_compareByX as compareByX,
    index_convexHull as convexHull,
    index_distance as distance,
    index_distanceToCenter as distanceToCenter,
    index_distanceToExterior as distanceToExterior,
    index_divide as divide,
    index_divider as divider,
    index_dotProduct as dotProduct,
    index_findMinimum as findMinimum,
    index_from as from,
    index_fromNumbers as fromNumbers,
    index_getPointParameter as getPointParameter,
    index_guard as guard,
    index_guardNonZeroPoint as guardNonZeroPoint,
    index_interpolate as interpolate,
    index_invert as invert,
    index_isEmpty as isEmpty,
    index_isEqual as isEqual,
    index_isNaN as isNaN,
    index_isNull as isNull,
    index_isPlaceholder as isPlaceholder,
    index_isPoint as isPoint,
    index_isPoint3d as isPoint3d,
    index_leftmost as leftmost,
    index_multiply as multiply,
    index_multiplyScalar as multiplyScalar,
    index_normalise as normalise,
    index_normaliseByRect as normaliseByRect,
    index_pipeline as pipeline,
    index_pipelineApply as pipelineApply,
    index_progressBetween as progressBetween,
    index_project as project,
    index_quantiseEvery as quantiseEvery,
    index_random as random,
    index_reduce as reduce,
    index_relation as relation,
    index_rightmost as rightmost,
    index_rotate as rotate,
    index_rotatePointArray as rotatePointArray,
    index_round as round,
    index_subtract as subtract,
    index_sum as sum,
    index_toArray as toArray,
    index_toIntegerValues as toIntegerValues,
    index_toString as toString,
    index_withinRange as withinRange,
    index_wrap as wrap,
  };
}

export { PointRelationResult as P, PointRelation as a, index as i };
