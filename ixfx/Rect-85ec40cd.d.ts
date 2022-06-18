declare type Path = {
    length(): number;
    /**
     * Returns a point at a relative (0.0-1.0) position along the path
     *
     * @param {number} t Relative position (0.0-1.0)
     * @returns {Point} Point
     */
    interpolate(t: number): Point;
    bbox(): RectPositioned;
    toString(): string;
    toSvgString(): readonly string[];
    readonly kind: `compound` | `elliptical` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
};
/**
 * Return the start point of a path
 *
 * @param {Path} path
 * @return {*}  {Point}
 */
declare const getStart: (path: Path) => Point;
/**
 * Return the end point of a path
 *
 * @param {Path} path
 * @return {*}  {Point}
 */
declare const getEnd: (path: Path) => Point;
declare type WithBeziers = {
    getBeziers(): readonly Path[];
};

type Path$1_Path = Path;
declare const Path$1_getStart: typeof getStart;
declare const Path$1_getEnd: typeof getEnd;
type Path$1_WithBeziers = WithBeziers;
declare namespace Path$1 {
  export {
    Path$1_Path as Path,
    Path$1_getStart as getStart,
    Path$1_getEnd as getEnd,
    Path$1_WithBeziers as WithBeziers,
  };
}

/**
 * A point, consisting of x, y and maybe z fields.
 */
declare type Point = {
    readonly x: number;
    readonly y: number;
    readonly z?: number;
};
/**
 *
 * @ignore
 * @param a
 * @param b
 * @returns
 */
declare const getPointParam: (a?: number | Point | undefined, b?: number | undefined) => Point;
declare const dotProduct: (...pts: readonly Point[]) => number;
/**
 * An empty point of {x:0, y:0}
 */
declare const Empty: Readonly<{
    x: number;
    y: number;
}>;
declare const Placeholder: Readonly<{
    x: number;
    y: number;
}>;
declare const isEmpty$1: (p: Point) => boolean;
declare const isPlaceholder$1: (p: Point) => boolean;
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
 * @param compareFn Compare function returns the smallest of `a` or `b`
 * @param points
 * @returns
 */
declare const findMinimum: (compareFn: (a: Point, b: Point) => Point, ...points: readonly Point[]) => Point;
declare function distance$1(a: Point, b: Point): number;
declare function distance$1(a: Point, x: number, y: number): number;
declare function distance$1(a: Point): number;
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
/**
 * Returns the distance from point `a` to the center of `shape`.
 * @param a Point
 * @param shape Point, or a positioned Rect or Circle.
 * @returns
 */
declare const distanceToCenter: (a: Point, shape: PointCalculableShape) => number;
declare type PointCalculableShape = PolyLine | Line | RectPositioned | Point | CirclePositioned;
/**
 * Throws an error if point is invalid
 * @param p
 * @param name
 */
declare const guard$2: (p: Point, name?: string) => void;
/**
 * Throws if parameter is not a valid point, or either x or y is 0
 * @param pt
 * @returns
 */
declare const guardNonZeroPoint: (pt: Point, name?: string) => boolean;
/**
 * Returns the angle in radians between `a` and `b`.
 * Eg if `a` is the origin, and `b` is another point,
 * in degrees one would get 0 to -180 when `b` was above `a`.
 *  -180 would be `b` in line with `a`.
 * Same for under `a`.
 * @param a
 * @param b
 * @returns
 */
declare const angleBetween: (a: Point, b: Point) => number;
/**
 * Calculates the centroid of a set of points
 *
 * As per {@link https://en.wikipedia.org/wiki/Centroid#Of_a_finite_set_of_points}
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
declare const centroid: (...points: readonly Point[]) => Point;
/**
 * Returns the minimum rectangle that can enclose all provided points
 * @param points
 * @returns
 */
declare const bbox$2: (...points: readonly Point[]) => RectPositioned;
/**
 * Returns _true_ if the parameter has x and y fields
 * @param p
 * @returns
 */
declare const isPoint: (p: number | unknown) => p is Point;
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
declare const toArray: (p: Point) => readonly number[];
/**
 * Returns a human-friendly string representation `(x, y)`
 * @param p
 * @returns
 */
declare const toString$1: (p: Point) => string;
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
declare const isEqual$1: (...p: readonly Point[]) => boolean;
/**
 * Returns true if two points are within a specified range.
 * Provide a point for the range to set different x/y range, or pass a number
 * to use the same range for both axis.
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
declare const withinRange$1: (a: Point, b: Point, maxRange: Point | number) => boolean;
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
 * @returns {@link Point}
 */
declare const interpolate$2: (amount: number, a: Point, b: Point) => Point;
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
declare const from: (xOrArray?: number | readonly number[] | undefined, y?: number | undefined) => Point;
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
declare const fromNumbers$1: (...coords: readonly ReadonlyArray<number>[] | readonly number[]) => readonly Point[];
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
declare function subtract$2(a: Point, b: Point): Point;
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
 * @param y Y coordinate
 */
declare function subtract$2(a: Point, x: number, y: number): Point;
/**
 * Subtracts two sets of x,y pairs
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
declare function subtract$2(x1: number, y1: number, x2: number, y2: number): Point;
/**
 * Applies `fn` on `x` and `y` fields, returning all other fields as well
 * ```js
 * const p = {x:1.234, y:4.9};
 * const p2 = apply(p, Math.round);
 * // Yields: {x:1, y:5}
 * ```
 *
 * The name of the field is provided as well. Here we only round the `x` field:
 *
 * ```js
 * const p = {x:1.234, y:4.9};
 * const p2 = apply(p, (v, field) => {
 *  if (field === `x`) return Math.round(v);
 *  return v;
 * });
 * ```
 * @param pt
 * @param fn
 * @returns
 */
declare const apply$1: (pt: Point, fn: (v: number, field?: string | undefined) => number) => Point;
/**
 * Reduces over points, treating x,y separately.
 *
 * ```
 * // Sum x and y valuse
 * const total = reduce(points, (p, acc) => {
 *  return {x: p.x + acc.x, y: p.y + acc.y}
 * });
 * ```
 * @param pts Points to reduce
 * @param fn Reducer
 * @param initial Initial value, uses {x:0,y:0} by default
 * @returns
 */
declare const reduce: (pts: readonly Point[], fn: (p: Point, accumulated: Point) => Point, initial?: Point) => Point;
declare type Sum = {
    /**
     * Adds two sets of coordinates
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
 * Returns `a` plus `b`
 * ie.
 * ```js
 * return {
 *   x: a.x + b.x,
 *   y: a.y + b.y
 * };
 * ```
 */
declare const sum$1: Sum;
/**
 * Returns `a` multiplied by `b`
 *
 * ie.
 * ```js
 * return {
 *  x: a.x * b.x,
*   y: a.y * b.y
 * }
 * ```
 * @param a
 * @param b
 * @returns
 */
declare function multiply$1(a: Point, b: Point): Point;
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
 * @export
 * @parama Point to scale
 * @param x Scale factor for x axis
 * @param [y] Scale factor for y axis (defaults to no scaling)
 * @returns Scaled point
 */
declare function multiply$1(a: Point, x: number, y?: number): Point;
/**
 * Divides a / b
 * @param a
 * @param b
 */
declare function divide$1(a: Point, b: Point): Point;
/**
 * Divides a point by x,y.
 * ie: a.x / x, b.y / y
 * @param a Point
 * @param x X divisor
 * @param y Y divisor
 */
declare function divide$1(a: Point, x: number, y: number): Point;
declare function divide$1(x1: number, y1: number, x2?: number, y2?: number): Point;
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
 * @param amountRadian Amount to rotate in radians
 * @param origin Origin to rotate around. Defaults to 0,0
 */
declare function rotate$1(pt: ReadonlyArray<Point>, amountRadian: number, origin?: Point): ReadonlyArray<Point>;
declare const rotatePointArray: (v: ReadonlyArray<readonly number[]>, amountRadian: number) => number[][];
/**
 * Normalise point as a unit vector
 *
 * @param ptOrX
 * @param y
 * @returns
 */
declare const normalise: (ptOrX: Point | number, y?: number | undefined) => Point;
/**
 * Normalises a point by a given width and height
 * @param pt Point
 * @param width Width
 * @param height Height
 */
declare function normaliseByRect$1(pt: Point, width: number, height: number): Point;
declare function normaliseByRect$1(pt: Point, rect: Rect): Point;
/**
 * Normalises x,y by width and height so it is on a 0..1 scale
 * @param x
 * @param y
 * @param width
 * @param height
 */
declare function normaliseByRect$1(x: number, y: number, width: number, height: number): Point;
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
 * If `ptMin` is not specified, {x:0,y:0} is used.
 * @param pt Point to wrap
 * @param ptMax Maximum value
 * @param ptMin Minimum value, or {x:0, y:0} by default
 * @returns Wrapped point
 */
declare const wrap: (pt: Point, ptMax: Point, ptMin?: Point) => Point;
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

type Point$1_Point = Point;
declare const Point$1_getPointParam: typeof getPointParam;
declare const Point$1_dotProduct: typeof dotProduct;
declare const Point$1_Empty: typeof Empty;
declare const Point$1_Placeholder: typeof Placeholder;
declare const Point$1_findMinimum: typeof findMinimum;
declare const Point$1_distanceToExterior: typeof distanceToExterior;
declare const Point$1_distanceToCenter: typeof distanceToCenter;
type Point$1_PointCalculableShape = PointCalculableShape;
declare const Point$1_guardNonZeroPoint: typeof guardNonZeroPoint;
declare const Point$1_angleBetween: typeof angleBetween;
declare const Point$1_centroid: typeof centroid;
declare const Point$1_isPoint: typeof isPoint;
declare const Point$1_toArray: typeof toArray;
declare const Point$1_from: typeof from;
declare const Point$1_reduce: typeof reduce;
declare const Point$1_rotatePointArray: typeof rotatePointArray;
declare const Point$1_normalise: typeof normalise;
declare const Point$1_wrap: typeof wrap;
declare const Point$1_clamp: typeof clamp;
declare namespace Point$1 {
  export {
    Point$1_Point as Point,
    Point$1_getPointParam as getPointParam,
    Point$1_dotProduct as dotProduct,
    Point$1_Empty as Empty,
    Point$1_Placeholder as Placeholder,
    isEmpty$1 as isEmpty,
    isPlaceholder$1 as isPlaceholder,
    Point$1_findMinimum as findMinimum,
    distance$1 as distance,
    Point$1_distanceToExterior as distanceToExterior,
    Point$1_distanceToCenter as distanceToCenter,
    Point$1_PointCalculableShape as PointCalculableShape,
    guard$2 as guard,
    Point$1_guardNonZeroPoint as guardNonZeroPoint,
    Point$1_angleBetween as angleBetween,
    Point$1_centroid as centroid,
    bbox$2 as bbox,
    Point$1_isPoint as isPoint,
    Point$1_toArray as toArray,
    toString$1 as toString,
    isEqual$1 as isEqual,
    withinRange$1 as withinRange,
    interpolate$2 as interpolate,
    Point$1_from as from,
    fromNumbers$1 as fromNumbers,
    subtract$2 as subtract,
    apply$1 as apply,
    Point$1_reduce as reduce,
    sum$1 as sum,
    multiply$1 as multiply,
    divide$1 as divide,
    rotate$1 as rotate,
    Point$1_rotatePointArray as rotatePointArray,
    Point$1_normalise as normalise,
    normaliseByRect$1 as normaliseByRect,
    Point$1_wrap as wrap,
    Point$1_clamp as clamp,
  };
}

/**
 * A line, which consists of an `a` and `b` {@link Point}.
 */
declare type Line = {
    readonly a: Point;
    readonly b: Point;
};
/**
 * A PolyLine, consisting of more than one line.
 */
declare type PolyLine = ReadonlyArray<Line>;
/**
 * Returns true if `p` is a valid line, containing `a` and `b` Points.
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
 * Returns true if the lines have the same value
 *
 * @param {Line} a
 * @param {Line} b
 * @returns {boolean}
 */
declare const equals: (a: Line, b: Line) => boolean;
/**
 * Applies `fn` to both start and end points.
 *
 * ```js
 * // Line 10,10 -> 20,20
 * const line = Lines.fromNumbers(10,10, 20,20);
 *
 * // Applies randomisation to x&y
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
declare const apply: (line: Line, fn: (p: Point) => Point) => Readonly<Line>;
/**
 * Throws an exception if:
 * * line is undefined
 * * a or b parameters are missing
 *
 * Does not validate points
 * @param line
 * @param paramName
 */
declare const guard$1: (line: Line, paramName?: string) => void;
/**
 * Returns the angle in radians of a line, or two points
 * ```js
 * angleRadian(line);
 * angleRadian(ptA, ptB);
 * ```
 * @param lineOrPoint
 * @param b
 * @returns
 */
declare const angleRadian: (lineOrPoint: Line | Point, b?: Point | undefined) => number;
/**
 * Multiplies start and end of line by x,y given in `p`.
 * ```js
 * // Line 1,1 -> 10,10
 * const l = fromNumbers(1,1,10,10);
 * const ll = multiply(l, {x:2, y:3});
 * // Yields: 2,20 -> 3,30
 * ```
 * @param line
 * @param point
 * @returns
 */
declare const multiply: (line: Line, point: Point) => Line;
/**
 * Divides both start and end points by given x,y
 * ```js
 * // Line 1,1 -> 10,10
 * const l = fromNumbers(1,1,10,10);
 * const ll = divide(l, {x:2, y:4});
 * // Yields: 0.5,0.25 -> 5,2.5
 * ```
 * @param line
 * @param point
 * @returns
 */
declare const divide: (line: Line, point: Point) => Line;
/**
 * Adds both start and end points by given x,y
 * ```js
 * // Line 1,1 -> 10,10
 * const l = fromNumbers(1,1,10,10);
 * const ll = sum(l, {x:2, y:4});
 * // Yields: 3,5 -> 12,14
 * ```
 * @param line
 * @param point
 * @returns
 */
declare const sum: (line: Line, point: Point) => Line;
/**
 * Subtracts both start and end points by given x,y
 * ```js
 * // Line 1,1 -> 10,10
 * const l = fromNumbers(1,1,10,10);
 * const ll = subtract(l, {x:2, y:4});
 * // Yields: -1,-3 -> 8,6
 * ```
 * @param line
 * @param point
 * @returns
 */
declare const subtract$1: (line: Line, point: Point) => Line;
/**
 * Normalises start and end points by given width and height. Useful
 * for converting an absolutely-defined line to a relative one.
 * ```js
 * // Line 1,1 -> 10,10
 * const l = fromNumbers(1,1,10,10);
 * const ll = normaliseByRect(l, 10, 10);
 * // Yields: 0.1,0.1 -> 1,1
 * ```
 * @param line
 * @param width
 * @param height
 * @returns
 */
declare const normaliseByRect: (line: Line, width: number, height: number) => Line;
/**
 * Returns true if `point` is within `maxRange` of `line`.
 * ```js
 * const line = Lines.fromNumbers(0,20,20,20);
 * Lines.withinRange(line, {x:0,y:21}, 1); // True
 * ```
 * @param line
 * @param point
 * @param maxRange
 * @returns True if point is within range
 */
declare const withinRange: (line: Line, point: Point, maxRange: number) => boolean;
/**
 * Returns the length of a line or length between two points
 * ```js
 * length(line);
 * length(ptA, ptB);
 * ```
 * @param aOrLine Line or first point
 * @param b Second point
 * @returns
 */
declare const length$1: (aOrLine: Point | Line, pointB?: Point | undefined) => number;
declare const midpoint: (aOrLine: Point | Line, pointB?: Point | undefined) => Point;
declare const points: (aOrLine: Point | Line, b?: Point | undefined) => readonly [Point, Point];
/**
 * Returns the nearest point on `line` closest to `point`.
 *
 * ```js
 * const pt = nearest(line, {x:10,y:10});
 * ```
 *
 * If an array of lines is provided, it will be the closest point amongst all the lines
 * @param line Line or array of lines
 * @param point
 * @returns Point {x,y}
 */
declare const nearest: (line: Line | readonly Line[], point: Point) => Point;
/**
 * Calculates [slope](https://en.wikipedia.org/wiki/Slope) of line.
 *
 * @example
 * ```js
 * slope(line);
 * slope(ptA, ptB)
 * ```
 * @param lineOrPoint Line or point. If point is provided, second point must be given too
 * @param b Second point if needed
 * @returns
 */
declare const slope: (lineOrPoint: Line | Point, b?: Point | undefined) => number;
/**
 * Returns a point perpendicular to `line` at a specified `distance`. Use negative
 * distances for the other side of line.
 * ```
 * // Project a point 100 units away from line, at its midpoint.
 * const pt = perpendicularPoint(line, 100, 0.5);
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
 * @param line
 * @param distance
 */
declare const parallel: (line: Line, distance: number) => Line;
/**
 * Scales a line from its midpoint
 *
 * @example Shorten by 50%, anchored at the midpoint
 * ```js
 * const l = {
 *  a: {x:50, y:50}, b: {x: 100, y: 90}
 * }
 * const l2 = scaleFromMidpoint(l, 0.5);
 * ```
 * @param line
 * @param factor
 */
declare const scaleFromMidpoint: (line: Line, factor: number) => Line;
/**
 * Extends a line to intersection the x-axis at a specified location
 * @param line Line to extend
 * @param xIntersection Intersection of x-axis.
 */
declare const extendX: (line: Line, xIntersection: number) => Point;
/**
 * Returns a line extended from its `a` point by a specified distance
 *
 * ```js
 * const line = {a: {x: 0, y:0}, b: {x:10, y:10} }
 * const extended = extendFromStart(line, 2);
 * ```
 * @param ine
 * @param distance
 * @return Newly extended line
 */
declare const extendFromA: (line: Line, distance: number) => Line;
/**
 * Returns the distance of `point` to the
 * nearest point on `line`.
 *
 * ```js
 * const d = distance(line, {x:10,y:10});
 * ```
 *
 * If an array of lines is provided, the shortest distance is returned.
 * @param line Line (or array of lines)
 * @param point Point to check against
 * @returns Distance
 */
declare const distance: (line: Line | ReadonlyArray<Line>, point: Point) => number;
/**
 * Calculates a point in-between `a` and `b`.
 *
 * ```js
 * // Get {x,y} at 50% along line
 * interpolate(0.5, line);
 *
 * // Get {x,y} at 80% between point A and B
 * interpolate(0.8, ptA, ptB);
 * ```
 * @param amount Relative position, 0 being at a, 0.5 being halfway, 1 being at b
 * @param a Start
 * @param b End
 * @returns Point between a and b
 */
declare function interpolate$1(amount: number, a: Point, pointB: Point): Point;
declare function interpolate$1(amount: number, line: Line): Point;
/**
 * Returns a string representation of two points
 * @param a
 * @param b
 * @returns
 */
declare function toString(a: Point, b: Point): string;
/**
 * Returns a string representation of a line
 * @param line
 */
declare function toString(line: Line): string;
/**
 * Returns a line from a basis of coordinates
 * ```js
 * // Line from 0,1 -> 10,15
 * fromNumbers(0,1,10,15);
 * ```
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
declare const fromNumbers: (x1: number, y1: number, x2: number, y2: number) => Line;
/**
 * Returns an array representation of line: [a.x, a.y, b.x, b.y]
 *
 * See {@link fromArray} to create a line _from_ this representation.
 *
 * @export
 * @param {Point} a
 * @param {Point} b
 * @returns {number[]}
 */
declare const toFlatArray: (a: Point, b: Point) => readonly number[];
/**
 * Returns an SVG description of line
 * @param a
 * @param b
 * @returns
 */
declare const toSvgString: (a: Point, b: Point) => readonly string[];
/**
 * Returns a line from four numbers [x1,y1,x2,y2].
 *
 * See {@link toFlatArray} to create an array from a line.
 *
 * @param arr Array in the form [x1,y1,x2,y2]
 * @returns Line
 */
declare const fromFlatArray: (arr: readonly number[]) => Line;
/**
 * Returns a line from two points
 * ```js
 * // Line from 0,1 to 10,15
 * fromPoints({x:0,y:1}, {x:10,y:15});
 * ```
 * @param a Start point
 * @param b End point
 * @returns
 */
declare const fromPoints: (a: Point, b: Point) => Line;
/**
 * Returns an array of lines that connects provided points.
 *
 * Eg, if points a,b,c are provided, two lines are provided: a->b and b->c
 * @param points
 * @returns
 */
declare const joinPointsToLines: (...points: readonly Point[]) => PolyLine;
/**
 * Returns a {@link LinePath} from two points
 * @param a
 * @param b
 * @returns
 */
declare const fromPointsToPath: (a: Point, b: Point) => LinePath;
/**
 * Returns a rectangle that encompasses dimension of line
 */
declare const bbox$1: (line: Line) => RectPositioned;
/**
 * Returns a path wrapper around a line instance. This is useful if there are a series
 * of operations you want to do with the same line because you don't have to pass it
 * in as an argument to each function.
 *
 * Note that the line is immutable, so a function like `sum` returns a new LinePath,
 * wrapping the result of `sum`.
 *
 * ```js
 * // Create a path
 * const l = toPath(fromNumbers(0,0,10,10));
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
declare type LinePath = Line & Path & {
    toFlatArray(): readonly number[];
    toPoints(): readonly Point[];
    rotate(amountRadian: number, origin: Point): LinePath;
    sum(point: Point): LinePath;
    divide(point: Point): LinePath;
    multiply(point: Point): LinePath;
    subtract(point: Point): LinePath;
    apply(fn: (point: Point) => Point): LinePath;
};
/**
 * Returns a line that is rotated by `angleRad`. By default it rotates
 * around its center, but an arbitrary `origin` point can be provided.
 * If `origin` is a number, it's presumed to be a 0..1 percentage of the line.
 *
 * ```js
 * // Rotates line by 0.1 radians around point 10,10
 * rotate(line, 0.1, {x:10,y:10});
 *
 * // Rotate line by 5 degrees around its center
 * rotate(line, degreeToRadian(5));
 *
 * // Rotate line by 5 degres around its end point
 * rotate(line, degreeToRadian(5), line.b);
 *
 * // Rotate by 90 degrees at the 80% position
 * rotated = rotate(line, Math.PI / 2, 0.8);
 *
 * ```
 * @param line Line to rotate
 * @param amountRadian Angle in radians to rotate by
 * @param origin Point to rotate around. If undefined, middle of line will be used
 * @returns
 */
declare const rotate: (line: Line, amountRadian?: number | undefined, origin?: number | Point | undefined) => Line;

type Line$1_Line = Line;
type Line$1_PolyLine = PolyLine;
declare const Line$1_isLine: typeof isLine;
declare const Line$1_isPolyLine: typeof isPolyLine;
declare const Line$1_equals: typeof equals;
declare const Line$1_apply: typeof apply;
declare const Line$1_angleRadian: typeof angleRadian;
declare const Line$1_multiply: typeof multiply;
declare const Line$1_divide: typeof divide;
declare const Line$1_sum: typeof sum;
declare const Line$1_normaliseByRect: typeof normaliseByRect;
declare const Line$1_withinRange: typeof withinRange;
declare const Line$1_midpoint: typeof midpoint;
declare const Line$1_points: typeof points;
declare const Line$1_nearest: typeof nearest;
declare const Line$1_slope: typeof slope;
declare const Line$1_perpendicularPoint: typeof perpendicularPoint;
declare const Line$1_parallel: typeof parallel;
declare const Line$1_scaleFromMidpoint: typeof scaleFromMidpoint;
declare const Line$1_extendX: typeof extendX;
declare const Line$1_extendFromA: typeof extendFromA;
declare const Line$1_distance: typeof distance;
declare const Line$1_toString: typeof toString;
declare const Line$1_fromNumbers: typeof fromNumbers;
declare const Line$1_toFlatArray: typeof toFlatArray;
declare const Line$1_toSvgString: typeof toSvgString;
declare const Line$1_fromFlatArray: typeof fromFlatArray;
declare const Line$1_fromPoints: typeof fromPoints;
declare const Line$1_joinPointsToLines: typeof joinPointsToLines;
declare const Line$1_fromPointsToPath: typeof fromPointsToPath;
type Line$1_LinePath = LinePath;
declare const Line$1_rotate: typeof rotate;
declare namespace Line$1 {
  export {
    Line$1_Line as Line,
    Line$1_PolyLine as PolyLine,
    Line$1_isLine as isLine,
    Line$1_isPolyLine as isPolyLine,
    Line$1_equals as equals,
    Line$1_apply as apply,
    guard$1 as guard,
    Line$1_angleRadian as angleRadian,
    Line$1_multiply as multiply,
    Line$1_divide as divide,
    Line$1_sum as sum,
    subtract$1 as subtract,
    Line$1_normaliseByRect as normaliseByRect,
    Line$1_withinRange as withinRange,
    length$1 as length,
    Line$1_midpoint as midpoint,
    Line$1_points as points,
    Line$1_nearest as nearest,
    Line$1_slope as slope,
    Line$1_perpendicularPoint as perpendicularPoint,
    Line$1_parallel as parallel,
    Line$1_scaleFromMidpoint as scaleFromMidpoint,
    Line$1_extendX as extendX,
    Line$1_extendFromA as extendFromA,
    Line$1_distance as distance,
    interpolate$1 as interpolate,
    Line$1_toString as toString,
    Line$1_fromNumbers as fromNumbers,
    Line$1_toFlatArray as toFlatArray,
    Line$1_toSvgString as toSvgString,
    Line$1_fromFlatArray as fromFlatArray,
    Line$1_fromPoints as fromPoints,
    Line$1_joinPointsToLines as joinPointsToLines,
    Line$1_fromPointsToPath as fromPointsToPath,
    bbox$1 as bbox,
    toPath$1 as toPath,
    Line$1_LinePath as LinePath,
    Line$1_rotate as rotate,
  };
}

/**
 * A circle
 */
declare type Circle = {
    readonly radius: number;
};
/**
 * A {@link Circle} with position
 */
declare type CirclePositioned = Point & Circle;
declare type CircularPath = Circle & Path & {
    readonly kind: `circular`;
};
/**
 * Returns true if parameter has x,y. Does not verify if parameter is a circle or not
 * @param p Circle or point
 * @returns
 */
declare const isPositioned$1: (p: Circle | Point) => p is Point;
declare const isCircle: (p: Circle | CirclePositioned | any) => p is Circle;
declare const isCirclePositioned: (p: Circle | CirclePositioned | any) => p is CirclePositioned;
/**
 * Returns a point on a circle at a specified angle in radians
 * @param circle
 * @param angleRadian Angle in radians
 * @param Origin or offset of calculated point. By default uses center of circle or 0,0 if undefined
 * @returns Point oo circle
 */
declare const point: (circle: Circle | CirclePositioned, angleRadian: number, origin?: Point | undefined) => Point;
/**
 * Computes relative position along circle
 * @param circle
 * @param t Position, 0-1
 * @returns
 */
declare const interpolate: (circle: CirclePositioned, t: number) => Point;
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
declare const area$1: (circle: Circle) => number;
/**
 * Computes a bounding box that encloses circle
 * @param circle
 * @returns
 */
declare const bbox: (circle: CirclePositioned | Circle) => RectPositioned | Rect;
/**
 * Returns true if `b` is completely contained by `a`
 *
 * @param a
 * @param b
 * @returns
 */
declare const isContainedBy: (a: CirclePositioned, b: CirclePositioned) => boolean;
/**
 * Returns true if a or b overlap or are equal
 *
 * Use `intersections` to find the points of intersection
 *
 * @param a
 * @param b
 * @returns True if circle overlap
 */
declare const isIntersecting: (a: CirclePositioned, b: CirclePositioned) => boolean;
/**
 * Returns the points of intersection betweeen `a` and `b`.
 *
 * Returns an empty array if circles are equal, one contains the other or if they don't touch at all.
 *
 * @param a Circle
 * @param b Circle
 * @returns Points of intersection, or an empty list if there are none
 */
declare const intersections: (a: CirclePositioned, b: CirclePositioned) => readonly Point[];
/**
 * Returns true if the two objects have the same values
 *
 * @param a
 * @param b
 * @returns
 */
declare const isEquals: (a: CirclePositioned | Circle, b: CirclePositioned | Circle) => boolean;
/**
 * Returns the distance between two circle centers.
 *
 * Throws an error if either is lacking position.
 * @param a
 * @param b
 * @returns Distance
 */
declare const distanceCenter: (a: CirclePositioned, b: CirclePositioned) => number;
/**
 * Returns the distance between the exterior of two circles, or between the exterior of a circle and point.
 * If `b` overlaps or is enclosed by `a`, distance is 0.
 * @param a
 * @param b
 */
declare const distanceFromExterior$1: (a: CirclePositioned, b: CirclePositioned | Point) => number;
declare type ToSvg = {
    (radius: number, sweep: boolean, origin: Point): readonly string[];
    (circle: Circle, sweep: boolean, origin: Point): readonly string[];
    (circle: CirclePositioned, sweep: boolean): readonly string[];
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
 * Returns a `CircularPath` representation of a circle
 *
 * @param {CirclePositioned} circle
 * @returns {CircularPath}
 */
declare const toPath: (circle: CirclePositioned) => CircularPath;
/**
 * Returns the point(s) of intersection between a circle and line.
 * @param circle
 * @param line
 * @returns Point(s) of intersection, or empty array
 */
declare const intersectionLine: (circle: CirclePositioned, line: Line) => readonly Point[];

type Circle$1_Circle = Circle;
type Circle$1_CirclePositioned = CirclePositioned;
type Circle$1_CircularPath = CircularPath;
declare const Circle$1_isCircle: typeof isCircle;
declare const Circle$1_isCirclePositioned: typeof isCirclePositioned;
declare const Circle$1_point: typeof point;
declare const Circle$1_interpolate: typeof interpolate;
declare const Circle$1_length: typeof length;
declare const Circle$1_circumference: typeof circumference;
declare const Circle$1_bbox: typeof bbox;
declare const Circle$1_isContainedBy: typeof isContainedBy;
declare const Circle$1_isIntersecting: typeof isIntersecting;
declare const Circle$1_intersections: typeof intersections;
declare const Circle$1_isEquals: typeof isEquals;
declare const Circle$1_distanceCenter: typeof distanceCenter;
declare const Circle$1_toSvg: typeof toSvg;
declare const Circle$1_toPath: typeof toPath;
declare const Circle$1_intersectionLine: typeof intersectionLine;
declare namespace Circle$1 {
  export {
    Circle$1_Circle as Circle,
    Circle$1_CirclePositioned as CirclePositioned,
    Circle$1_CircularPath as CircularPath,
    isPositioned$1 as isPositioned,
    Circle$1_isCircle as isCircle,
    Circle$1_isCirclePositioned as isCirclePositioned,
    Circle$1_point as point,
    Circle$1_interpolate as interpolate,
    Circle$1_length as length,
    Circle$1_circumference as circumference,
    area$1 as area,
    Circle$1_bbox as bbox,
    Circle$1_isContainedBy as isContainedBy,
    Circle$1_isIntersecting as isIntersecting,
    Circle$1_intersections as intersections,
    Circle$1_isEquals as isEquals,
    Circle$1_distanceCenter as distanceCenter,
    distanceFromExterior$1 as distanceFromExterior,
    Circle$1_toSvg as toSvg,
    Circle$1_toPath as toPath,
    Circle$1_intersectionLine as intersectionLine,
  };
}

declare type Rect = {
    readonly width: number;
    readonly height: number;
};
declare type RectPositioned = Point & Rect;
declare const empty: Readonly<{
    width: number;
    height: number;
}>;
declare const emptyPositioned: Readonly<{
    x: number;
    y: number;
    width: number;
    height: number;
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
declare const isEmpty: (rect: Rect) => boolean;
declare const isPlaceholder: (rect: Rect) => boolean;
/**
 * Returns true if parameter has a positioned (x,y)
 * @param p Point, Rect or RectPositiond
 * @returns
 */
declare const isPositioned: (p: Point | Rect | RectPositioned) => p is Point;
declare const isRect: (p: number | unknown) => p is Rect;
/**
 * Returns true if `p` is a positioned rectangle
 * @param p
 * @returns
 */
declare const isRectPositioned: (p: Rect | RectPositioned | any) => p is RectPositioned;
declare const fromElement: (el: HTMLElement) => Rect;
declare const isEqualSize: (a: Rect, b: Rect) => boolean;
declare const isEqual: (a: Rect | RectPositioned, b: Rect | RectPositioned) => boolean;
/**
 * Subtracts width/height of `b` from `a` (ie: a - b), returning result.
 *
 * x,y coords from `a` will be unchanged
 * @param a
 * @param b
 */
declare function subtract(a: Rect, b: Rect): Rect;
/**
 * Subtracts a width/height from `a`, returning result.
 *
 * x,y coords from a will be unchanged
 * @param a
 * @param width
 * @param height
 */
declare function subtract(a: Rect, width: number, height?: number): Rect;
/**
 * Returns true if `point` is within, or on boundary of `rect`.
 * @param rect
 * @param point
 */
declare function intersectsPoint(rect: Rect | RectPositioned, point: Point): boolean;
/**
 * Returns true if x,y coordinate is within, or on boundary of `rect`.
 * @param rect
 * @param x
 * @param y
 */
declare function intersectsPoint(rect: Rect | RectPositioned, x: number, y: number): boolean;
declare const fromCenter: (origin: Point, width: number, height: number) => RectPositioned;
/**
 * Returns the distance from the perimeter of `rect` to `pt`.
 * If the point is within the rectangle, 0 is returned.
 *
 * If `rect` does not have an x,y it's assumed to be 0,0
 * @param rect Rectangle
 * @param pt Point
 * @returns Distance
 */
declare const distanceFromExterior: (rect: RectPositioned, pt: Point) => number;
declare const distanceFromCenter: (rect: RectPositioned, pt: Point) => number;
/**
 * Returns a rectangle based on provided four corners.
 *
 * To create a rectangle that contains an arbitary set of points, use {@links Points.bbox}.
 *
 * Does some sanity checking such as:
 *  - x will be smallest of topLeft/bottomLeft
 *  - y will be smallest of topRight/topLeft
 *  - width will be largest between top/bottom left and right
 *  - height will be largest between left and right top/bottom
 */
declare const maxFromCorners: (topLeft: Point, topRight: Point, bottomRight: Point, bottomLeft: Point) => RectPositioned;
declare const guard: (rect: Rect, name?: string) => void;
declare const fromTopLeft: (origin: Point, width: number, height: number) => RectPositioned;
declare const corners: (rect: RectPositioned | Rect, origin?: Point | undefined) => readonly Point[];
declare const getCenter: (rect: RectPositioned | Rect, origin?: Point | undefined) => Point;
/**
 * Returns the length of each side of the rectangle (top, right, bottom, left)
 * @param rect
 * @returns
 */
declare const lengths: (rect: RectPositioned) => readonly number[];
/**
 * Returns four lines based on each corner.
 * Lines are given in order: top, right, bottom, left
 *
 * @param {(RectPositioned|Rect)} rect
 * @param {Points.Point} [origin]
 * @returns {Lines.Line[]}
 */
declare const edges: (rect: RectPositioned | Rect, origin?: Point | undefined) => readonly Line[];
/**
 * Returns the perimeter of `rect` (ie. sum of all edges)
 * @param rect
 * @returns
 */
declare const perimeter: (rect: Rect) => number;
/**
 * Returns the area of `rect`
 * @param rect
 * @returns
 */
declare const area: (rect: Rect) => number;

type Rect$1_Rect = Rect;
type Rect$1_RectPositioned = RectPositioned;
declare const Rect$1_empty: typeof empty;
declare const Rect$1_emptyPositioned: typeof emptyPositioned;
declare const Rect$1_placeholder: typeof placeholder;
declare const Rect$1_placeholderPositioned: typeof placeholderPositioned;
declare const Rect$1_isEmpty: typeof isEmpty;
declare const Rect$1_isPlaceholder: typeof isPlaceholder;
declare const Rect$1_isPositioned: typeof isPositioned;
declare const Rect$1_isRect: typeof isRect;
declare const Rect$1_isRectPositioned: typeof isRectPositioned;
declare const Rect$1_fromElement: typeof fromElement;
declare const Rect$1_isEqualSize: typeof isEqualSize;
declare const Rect$1_isEqual: typeof isEqual;
declare const Rect$1_subtract: typeof subtract;
declare const Rect$1_intersectsPoint: typeof intersectsPoint;
declare const Rect$1_fromCenter: typeof fromCenter;
declare const Rect$1_distanceFromExterior: typeof distanceFromExterior;
declare const Rect$1_distanceFromCenter: typeof distanceFromCenter;
declare const Rect$1_maxFromCorners: typeof maxFromCorners;
declare const Rect$1_guard: typeof guard;
declare const Rect$1_fromTopLeft: typeof fromTopLeft;
declare const Rect$1_corners: typeof corners;
declare const Rect$1_getCenter: typeof getCenter;
declare const Rect$1_lengths: typeof lengths;
declare const Rect$1_edges: typeof edges;
declare const Rect$1_perimeter: typeof perimeter;
declare const Rect$1_area: typeof area;
declare namespace Rect$1 {
  export {
    Rect$1_Rect as Rect,
    Rect$1_RectPositioned as RectPositioned,
    Rect$1_empty as empty,
    Rect$1_emptyPositioned as emptyPositioned,
    Rect$1_placeholder as placeholder,
    Rect$1_placeholderPositioned as placeholderPositioned,
    Rect$1_isEmpty as isEmpty,
    Rect$1_isPlaceholder as isPlaceholder,
    Rect$1_isPositioned as isPositioned,
    Rect$1_isRect as isRect,
    Rect$1_isRectPositioned as isRectPositioned,
    Rect$1_fromElement as fromElement,
    Rect$1_isEqualSize as isEqualSize,
    Rect$1_isEqual as isEqual,
    Rect$1_subtract as subtract,
    Rect$1_intersectsPoint as intersectsPoint,
    Rect$1_fromCenter as fromCenter,
    Rect$1_distanceFromExterior as distanceFromExterior,
    Rect$1_distanceFromCenter as distanceFromCenter,
    Rect$1_maxFromCorners as maxFromCorners,
    Rect$1_guard as guard,
    Rect$1_fromTopLeft as fromTopLeft,
    Rect$1_corners as corners,
    Rect$1_getCenter as getCenter,
    Rect$1_lengths as lengths,
    Rect$1_edges as edges,
    Rect$1_perimeter as perimeter,
    Rect$1_area as area,
  };
}

export { Circle$1 as C, Line$1 as L, Path as P, RectPositioned as R, Point as a, Rect$1 as b, Point$1 as c, Path$1 as d, Rect as e, Line as f, CirclePositioned as g, PolyLine as h };
