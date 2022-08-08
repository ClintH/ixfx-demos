import { a as RandomSource } from './Arrays-14a37599.js';

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
 * A line, which consists of an `a` and `b` {@link Points.Point}.
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
 * be different in other properties, and `equals` will still return
 * true.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const a = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
 * const b = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
 * a === b; // false, because they are different objects
 * Lines.equals(a, b); // true, because they have the same value
 * ```
 * @param {Line} a
 * @param {Line} b
 * @returns {boolean}
 */
declare const equals: (a: Line, b: Line) => boolean;
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
declare const apply$1: (line: Line, fn: (p: Point) => Point) => Readonly<Line>;
/**
 * Throws an exception if:
 * * line is undefined
 * * a or b parameters are missing
 *
 * Does not validate points
 * @param line
 * @param paramName
 */
declare const guard$2: (line: Line, paramName?: string) => void;
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
declare const sum$1: (line: Line, point: Point) => Line;
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
declare const getPointsParam: (aOrLine: Point | Line, b?: Point) => readonly [Point, Point];
/**
 * Returns the nearest point on `line` closest to `point`.
 *
 * ```js
 * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
 * const pt = Linesnearest(line, {x:10,y:10});
 * ```
 *
 * If an array of lines is provided, it will be the closest point amongst all the lines
 * @param line Line or array of lines
 * @param point
 * @returns Point `{ x, y }`
 */
declare const nearest: (line: Line | readonly Line[], point: Point) => Point;
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
 * @param b End
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
declare const toFlatArray: (a: Point | Line, b: Point) => readonly number[];
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
declare const toSvgString: (a: Point, b: Point) => readonly string[];
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
 * @param arr Array in the form [x1,y1,x2,y2]
 * @returns Line
 */
declare const fromFlatArray: (arr: readonly number[]) => Line;
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
declare const fromPoints: (a: Point, b: Point) => Line;
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
declare const joinPointsToLines: (...points: readonly Point[]) => PolyLine;
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
declare const bbox$2: (line: Line) => RectPositioned;
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
declare type LinePath = Line & Path & {
    toFlatArray(): readonly number[];
    toPoints(): readonly Point[];
    rotate(amountRadian: number, origin: Point): LinePath;
    sum(point: Point): LinePath;
    divide(point: Point): LinePath;
    multiply(point: Point): LinePath;
    subtract(point: Point): LinePath;
    apply(fn: (point: Point) => Point): LinePath;
    midpoint(): Point;
    distance(point: Point): number;
    parallel(distance: number): Line;
    perpendicularPoint(distance: number, amount?: number): Point;
    slope(): number;
    withinRange(point: Point, maxRange: number): boolean;
    equals(otherLine: Line): boolean;
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
declare const rotate$1: (line: Line, amountRadian?: number, origin?: Point | number) => Line;

type Line$1_Line = Line;
type Line$1_PolyLine = PolyLine;
declare const Line$1_isLine: typeof isLine;
declare const Line$1_isPolyLine: typeof isPolyLine;
declare const Line$1_equals: typeof equals;
declare const Line$1_angleRadian: typeof angleRadian;
declare const Line$1_midpoint: typeof midpoint;
declare const Line$1_getPointsParam: typeof getPointsParam;
declare const Line$1_nearest: typeof nearest;
declare const Line$1_slope: typeof slope;
declare const Line$1_perpendicularPoint: typeof perpendicularPoint;
declare const Line$1_parallel: typeof parallel;
declare const Line$1_scaleFromMidpoint: typeof scaleFromMidpoint;
declare const Line$1_pointAtX: typeof pointAtX;
declare const Line$1_extendFromA: typeof extendFromA;
declare const Line$1_pointsOf: typeof pointsOf;
declare const Line$1_toFlatArray: typeof toFlatArray;
declare const Line$1_toSvgString: typeof toSvgString;
declare const Line$1_fromFlatArray: typeof fromFlatArray;
declare const Line$1_fromPoints: typeof fromPoints;
declare const Line$1_joinPointsToLines: typeof joinPointsToLines;
declare const Line$1_fromPointsToPath: typeof fromPointsToPath;
type Line$1_LinePath = LinePath;
declare namespace Line$1 {
  export {
    Line$1_Line as Line,
    Line$1_PolyLine as PolyLine,
    Line$1_isLine as isLine,
    Line$1_isPolyLine as isPolyLine,
    Line$1_equals as equals,
    apply$1 as apply,
    guard$2 as guard,
    Line$1_angleRadian as angleRadian,
    multiply$2 as multiply,
    divide$1 as divide,
    sum$1 as sum,
    subtract$2 as subtract,
    normaliseByRect$2 as normaliseByRect,
    withinRange$1 as withinRange,
    length$1 as length,
    Line$1_midpoint as midpoint,
    Line$1_getPointsParam as getPointsParam,
    Line$1_nearest as nearest,
    Line$1_slope as slope,
    Line$1_perpendicularPoint as perpendicularPoint,
    Line$1_parallel as parallel,
    Line$1_scaleFromMidpoint as scaleFromMidpoint,
    Line$1_pointAtX as pointAtX,
    Line$1_extendFromA as extendFromA,
    Line$1_pointsOf as pointsOf,
    distance$1 as distance,
    interpolate$2 as interpolate,
    toString$1 as toString,
    fromNumbers$2 as fromNumbers,
    Line$1_toFlatArray as toFlatArray,
    Line$1_toSvgString as toSvgString,
    Line$1_fromFlatArray as fromFlatArray,
    Line$1_fromPoints as fromPoints,
    Line$1_joinPointsToLines as joinPointsToLines,
    Line$1_fromPointsToPath as fromPointsToPath,
    bbox$2 as bbox,
    toPath$1 as toPath,
    Line$1_LinePath as LinePath,
    rotate$1 as rotate,
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
declare const point: (circle: Circle | CirclePositioned, angleRadian: number, origin?: Point) => Point;
/**
 * Returns the center of a circle
 * If the circle has an x,y, that is the center.
 * If not, `radius` is used as the x and y.
 * @param circle
 * @returns Center of circle
 */
declare const center$1: (circle: CirclePositioned | Circle) => Readonly<{
    x: number;
    y: number;
}>;
/**
 * Computes relative position along circle
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
declare const area$1: (circle: Circle) => number;
/**
 * Computes a bounding box that encloses circle
 * @param circle
 * @returns
 */
declare const bbox$1: (circle: CirclePositioned | Circle) => RectPositioned | Rect;
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
declare const Circle$1_length: typeof length;
declare const Circle$1_circumference: typeof circumference;
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
    center$1 as center,
    interpolate$1 as interpolate,
    Circle$1_length as length,
    Circle$1_circumference as circumference,
    area$1 as area,
    bbox$1 as bbox,
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
declare const isEmpty$1: (rect: Rect) => boolean;
declare const isPlaceholder$1: (rect: Rect) => boolean;
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
 * ```js
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
 * Rectangle as array
 */
declare type RectArray = readonly [width: number, height: number];
/**
 * Positioned rectangle as array
 */
declare type RectPositionedArray = readonly [x: number, y: number, width: number, height: number];
/**
 * Converts a rectangle to an array of numbers. See {@link fromNumbers} for the opposite conversion.
 *
 * ```js
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
 * const r1 = Rects.toArray({ x: 10, y:20, width: 100, height: 200 });
 * // [10, 20, 100, 200]
 * const r2 = Rects.toArray({ width: 100, height: 200 });
 * // [100, 200]
 * ```
 * @param rect
 * @see fromNumbers
 */
declare function toArray$1(rect: RectPositioned): RectPositionedArray;
declare const isEqual$1: (a: Rect | RectPositioned, b: Rect | RectPositioned) => boolean;
/**
 * Subtracts width/height of `b` from `a` (ie: a - b), returning result.
 *
 * x,y coords from `a` will be unchanged
 * @param a
 * @param b
 */
declare function subtract$1(a: Rect, b: Rect): Rect;
/**
 * Subtracts a width/height from `a`, returning result.
 *
 * x,y coords from a will be unchanged
 * @param a
 * @param width
 * @param height
 */
declare function subtract$1(a: Rect, width: number, height?: number): Rect;
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
 * To create a rectangle that contains an arbitary set of points, use {@link Geometry.Points.bbox | Geometry.Points.bbox}.
 *
 * Does some sanity checking such as:
 *  - x will be smallest of topLeft/bottomLeft
 *  - y will be smallest of topRight/topLeft
 *  - width will be largest between top/bottom left and right
 *  - height will be largest between left and right top/bottom
 */
declare const maxFromCorners: (topLeft: Point, topRight: Point, bottomRight: Point, bottomLeft: Point) => RectPositioned;
declare const guard$1: (rect: Rect, name?: string) => void;
declare const fromTopLeft: (origin: Point, width: number, height: number) => RectPositioned;
declare const corners: (rect: RectPositioned | Rect, origin?: Point) => readonly Point[];
/**
 * Returns a point on the edge of rectangle
 * ```js
 * const r1 = {x: 10, y: 10, width: 100, height: 50};
 * getEdgeX(r1, `right`);  // Yields: 110
 * getEdgeX(r1, `bottom`); // Yields: 60
 *
 * const r2 = {width: 100, height: 50};
 * getEdgeX(r2, `right`);  // Yields: 100
 * getEdgeX(r2, `bottom`); // Yields: 50
 * ```
 * @param rect
 * @param edge Which edge: right, left, bottom, top
 * @returns
 */
declare const getEdgeX: (rect: RectPositioned | Rect, edge: `right` | `bottom` | `left` | `top`) => number;
declare const getEdgeY: (rect: RectPositioned | Rect, edge: `right` | `bottom` | `left` | `top`) => number;
/**
 * Returns `rect` divided by the width,height of `normaliseBy`. This can be useful for
 * normalising based on camera frame.
 * ```js
 * const frameSize = {width: 640, height: 320};
 * const object = { x: 320, y: 160, width: 64, height: 32};
 *
 * const n = normaliseByRect(object, frameSize);
 * // Yields: {x: 0.5, y: 0.5, width: 0.1, height: 0.1}
 * ```
 *
 * Height and width can be supplied instead of a rectangle too:
 * ```js
 * const n = normaliseByRect(object, 640, 320);
 * ```
 * @param rect
 * @param normaliseBy
 * @returns
 */
declare const normaliseByRect$1: (rect: Rect | RectPositioned, normaliseByOrWidth: Rect | number, height?: number) => Rect | RectPositioned;
/**
 * Multiplies `a` by rectangle or width/height. Useful for denormalising a value.
 *
 * ```js
 * // Normalised rectangle of width 50%, height 50%
 * const r = {width: 0.5, height: 0.5};
 *
 * // Map to window:
 * const rr = multiply(r, window.innerWidth, window.innerHeight);
 * ```
 *
 * ```js
 * // Returns {width: someRect.width * someOtherRect.width ...}
 * multiply(someRect, someOtherRect);
 *
 * // Returns {width: someRect.width * 100, height: someRect.height * 200}
 * multiply(someRect, 100, 200);
 * ```
 *
 * Multiplication applies to the first parameter's x/y fields, if present.
 */
declare function multiply$1(a: RectPositioned, b: Rect | number, c?: number): RectPositioned;
/**
 * Multiplies `a` by rectangle or width/height. Useful for denormalising a value.
 *
 * ```js
 * // Normalised rectangle of width 50%, height 50%
 * const r = {width: 0.5, height: 0.5};
 *
 * // Map to window:
 * const rr = multiply(r, window.innerWidth, window.innerHeight);
 * ```
 *
 * ```js
 * // Returns {width: someRect.width * someOtherRect.width ...}
 * multiply(someRect, someOtherRect);
 *
 * // Returns {width: someRect.width * 100, height: someRect.height * 200}
 * multiply(someRect, 100, 200);
 * ```
 *
 * Multiplication applies to the first parameter's x/y fields, if present.
 */
declare function multiply$1(a: Rect, b: Rect | number, c?: number): Rect;
/**
 * Returns the center of a rectangle as a {@link Geometry.Points.Point}.
 *  If the rectangle lacks a position and `origin` parameter is not provided, 0,0 is used instead.
 *
 * ```js
 * const p = center({x:10, y:20, width:100, height:50});
 * const p2 = center({width: 100, height: 50}); // Assumes 0,0 for rect x,y
 * ```
 * @param rect Rectangle
 * @param origin Optional origin. Overrides `rect` position if available. If no position is available 0,0 is used by default.
 * @returns
 */
declare const center: (rect: RectPositioned | Rect, origin?: Point) => Point;
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
declare const edges: (rect: RectPositioned | Rect, origin?: Point) => readonly Line[];
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
declare const Rect$1_isPositioned: typeof isPositioned;
declare const Rect$1_isRect: typeof isRect;
declare const Rect$1_isRectPositioned: typeof isRectPositioned;
declare const Rect$1_fromElement: typeof fromElement;
declare const Rect$1_isEqualSize: typeof isEqualSize;
type Rect$1_RectArray = RectArray;
type Rect$1_RectPositionedArray = RectPositionedArray;
declare const Rect$1_intersectsPoint: typeof intersectsPoint;
declare const Rect$1_fromCenter: typeof fromCenter;
declare const Rect$1_distanceFromExterior: typeof distanceFromExterior;
declare const Rect$1_distanceFromCenter: typeof distanceFromCenter;
declare const Rect$1_maxFromCorners: typeof maxFromCorners;
declare const Rect$1_fromTopLeft: typeof fromTopLeft;
declare const Rect$1_corners: typeof corners;
declare const Rect$1_getEdgeX: typeof getEdgeX;
declare const Rect$1_getEdgeY: typeof getEdgeY;
declare const Rect$1_center: typeof center;
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
    isEmpty$1 as isEmpty,
    isPlaceholder$1 as isPlaceholder,
    Rect$1_isPositioned as isPositioned,
    Rect$1_isRect as isRect,
    Rect$1_isRectPositioned as isRectPositioned,
    Rect$1_fromElement as fromElement,
    Rect$1_isEqualSize as isEqualSize,
    fromNumbers$1 as fromNumbers,
    Rect$1_RectArray as RectArray,
    Rect$1_RectPositionedArray as RectPositionedArray,
    toArray$1 as toArray,
    isEqual$1 as isEqual,
    subtract$1 as subtract,
    Rect$1_intersectsPoint as intersectsPoint,
    Rect$1_fromCenter as fromCenter,
    Rect$1_distanceFromExterior as distanceFromExterior,
    Rect$1_distanceFromCenter as distanceFromCenter,
    Rect$1_maxFromCorners as maxFromCorners,
    guard$1 as guard,
    Rect$1_fromTopLeft as fromTopLeft,
    Rect$1_corners as corners,
    Rect$1_getEdgeX as getEdgeX,
    Rect$1_getEdgeY as getEdgeY,
    normaliseByRect$1 as normaliseByRect,
    multiply$1 as multiply,
    Rect$1_center as center,
    Rect$1_lengths as lengths,
    Rect$1_edges as edges,
    Rect$1_perimeter as perimeter,
    Rect$1_area as area,
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
declare type Point3d = Point & {
    readonly z: number;
};
/**
 *
 * @ignore
 * @param a
 * @param b
 * @returns
 */
declare const getPointParam: (a?: Point | number, b?: number) => Point;
declare const dotProduct: (...pts: readonly Point[]) => number;
/**
 * An empty point of `{ x:0, y:0 }`.
 *
 * Use `isEmpty` to check if a point is empty.
 */
declare const Empty: Readonly<{
    x: 0;
    y: 0;
}>;
/**
 * Placeholder point, where x and y is `NaN`.
 * Use `isPlaceholder` to check if a point is a placeholder.
 */
declare const Placeholder: Readonly<{
    x: number;
    y: number;
}>;
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
 * Returns true if p.x and p.y === null
 * @param p
 * @returns
 */
declare const isNull: (p: Point) => boolean;
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
declare const leftmost: (...points: readonly Point[]) => Point;
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
declare const rightmost: (...points: readonly Point[]) => Point;
declare function distance(a: Point, b: Point): number;
declare function distance(a: Point, x: number, y: number): number;
declare function distance(a: Point): number;
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
declare const guard: (p: Point, name?: string) => void;
/**
 * Throws if parameter is not a valid point, or either x or y is 0
 * @param pt
 * @returns
 */
declare const guardNonZeroPoint: (pt: Point, name?: string) => boolean;
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
declare const bbox: (...points: readonly Point[]) => RectPositioned;
/**
 * Returns _true_ if the parameter has x and y fields
 * @param p
 * @returns
 */
declare const isPoint: (p: number | unknown) => p is Point;
declare const isPoint3d: (p: Point | unknown) => p is Point3d;
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
 * Returns a human-friendly string representation `(x, y)`.
 * If `precision` is supplied, this will be the number of significant digits.
 * @param p
 * @returns
 */
declare const toString: (p: Point, precision?: number) => string;
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
declare const isEqual: (...p: readonly Point[]) => boolean;
/**
 * Returns true if two points are within a specified range.
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
declare const from: (xOrArray?: number | readonly number[], y?: number) => Point;
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
declare const fromNumbers: (...coords: readonly ReadonlyArray<number>[] | readonly number[]) => readonly Point[];
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
 * Subtracts two sets of x,y pairs
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
declare const apply: (pt: Point, fn: (v: number, field?: string) => number) => Point;
/**
 * Runs a sequential series of functions on `pt`. The output from one feeding into the next.
 * ```js
 * const p = pipelineApply(somePoint, Points.normalise, Points.invert);
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
 * const p = pipeline(Points.normalise, Points.invert);
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
 * const total = reduce(points, (p, acc) => {
 *  return {x: p.x + acc.x, y: p.y + acc.y}
 * });
 * ```
 * @param pts Points to reduce
 * @param fn Reducer
 * @param initial Initial value, uses `{ x:0, y:0 }` by default
 * @returns
 */
declare const reduce: (pts: readonly Point[], fn: (p: Point, accumulated: Point) => Point, initial?: Point) => Point;
declare type Sum = {
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
declare function multiply(a: Point, b: Point): Point;
/**
 * Multiply by a width,height:
 * ```
 * return {
 *  x: a.x * rect.width,
 *  y: a.y * rect.height
 * };
 * ```
 * @param a
 * @param rect
 */
declare function multiply(a: Point, rect: Rect): Point;
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
 * Divides a / b:
 * ```js
 * return {
 *  x: a.x / b.x,
 *  y: a.y / b.y
 * }
 * ```
 * @param a
 * @param b
 */
declare function divide(a: Point, b: Point): Point;
/**
 * Divides point a by rectangle:
 * ```js
 * return {
 *  x: a.x / rect.width,
 *  y: a.y / rect.hight
 * };
 * ```
 * @param a
 * @param Rect
 */
declare function divide(a: Point, rect: Rect): Point;
/**
 * Divides a point by x,y.
 * ```js
 * return {
 *  x: a.x / x,
 *  y: b.y / y
 * };
 * ```
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
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
declare function divide(x1: number, y1: number, x2?: number, y2?: number): Point;
/**
 * Simple convex hull impementation. Returns a set of points which
 * enclose `pts`.
 *
 * For more power, see something like [Hull.js](https://github.com/AndriiHeonia/hull)
 * @param pts
 * @returns
 */
declare const convexHull: (...pts: readonly Point[]) => readonly Point[];
/**
 * Returns -1 if either x/y of a is less than b's x/y
 * Returns 1 if either x/y of a is greater than b's x/y
 * Returns 0 if x/y of a and b are equal
 * @param a
 * @param b
 * @returns
 */
declare const compare: (a: Point, b: Point) => number;
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
declare const rotatePointArray: (v: ReadonlyArray<readonly number[]>, amountRadian: number) => number[][];
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
 * import { weightedSkewed } from "https://unpkg.com/ixfx/dist/random.js"
 * const pt = Points.random(weightedSkewed(`quadIn`));
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
 * @param m
 * @returns
 */
declare const clampMagnitude: (pt: Point, m: number) => Point;
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
declare type PointRelation = (a: Point | number, b?: number) => PointRelationResult;
declare type PointRelationResult = {
    /**
     * Angle from start
     */
    readonly angle: number;
    /**
    * Distance from start
    */
    readonly distance: number;
    /**
    * Center point from start
    */
    readonly centroid: Point;
    /**
    * Average of all points seen
    * This is calculated by summing x,y and dividing by total points
    */
    readonly average: Point;
};
/**
 * Tracks the relation between two points
 *
 * ```js
 * import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
 *
 * // Start point: 50,50
 * const t = Points.relation({x:50,y:50});
 *
 * // Compare to a 0,0
 * const {angle, distance, average, centroid} = t({x:0,y:0});
 * ```
 *
 * X,y coordinates can also be used as parameters:
 * ```js
 * const t = Points.relation(50, 50);
 * const {angle, distance, centroid} = t(0, 0);
 * ```
 * @param start
 * @returns
 */
declare const relation: (a: Point | number, b?: number) => PointRelation;

type Point$1_Point = Point;
type Point$1_Point3d = Point3d;
declare const Point$1_getPointParam: typeof getPointParam;
declare const Point$1_dotProduct: typeof dotProduct;
declare const Point$1_Empty: typeof Empty;
declare const Point$1_Placeholder: typeof Placeholder;
declare const Point$1_isEmpty: typeof isEmpty;
declare const Point$1_isPlaceholder: typeof isPlaceholder;
declare const Point$1_isNull: typeof isNull;
declare const Point$1_findMinimum: typeof findMinimum;
declare const Point$1_leftmost: typeof leftmost;
declare const Point$1_rightmost: typeof rightmost;
declare const Point$1_distance: typeof distance;
declare const Point$1_distanceToExterior: typeof distanceToExterior;
declare const Point$1_distanceToCenter: typeof distanceToCenter;
type Point$1_PointCalculableShape = PointCalculableShape;
declare const Point$1_guard: typeof guard;
declare const Point$1_guardNonZeroPoint: typeof guardNonZeroPoint;
declare const Point$1_angle: typeof angle;
declare const Point$1_centroid: typeof centroid;
declare const Point$1_bbox: typeof bbox;
declare const Point$1_isPoint: typeof isPoint;
declare const Point$1_isPoint3d: typeof isPoint3d;
declare const Point$1_toArray: typeof toArray;
declare const Point$1_toString: typeof toString;
declare const Point$1_isEqual: typeof isEqual;
declare const Point$1_withinRange: typeof withinRange;
declare const Point$1_interpolate: typeof interpolate;
declare const Point$1_from: typeof from;
declare const Point$1_fromNumbers: typeof fromNumbers;
declare const Point$1_subtract: typeof subtract;
declare const Point$1_apply: typeof apply;
declare const Point$1_pipelineApply: typeof pipelineApply;
declare const Point$1_pipeline: typeof pipeline;
declare const Point$1_reduce: typeof reduce;
declare const Point$1_sum: typeof sum;
declare const Point$1_multiply: typeof multiply;
declare const Point$1_divide: typeof divide;
declare const Point$1_convexHull: typeof convexHull;
declare const Point$1_compare: typeof compare;
declare const Point$1_compareByX: typeof compareByX;
declare const Point$1_project: typeof project;
declare const Point$1_rotate: typeof rotate;
declare const Point$1_rotatePointArray: typeof rotatePointArray;
declare const Point$1_normalise: typeof normalise;
declare const Point$1_normaliseByRect: typeof normaliseByRect;
declare const Point$1_random: typeof random;
declare const Point$1_wrap: typeof wrap;
declare const Point$1_invert: typeof invert;
declare const Point$1_toIntegerValues: typeof toIntegerValues;
declare const Point$1_clampMagnitude: typeof clampMagnitude;
declare const Point$1_clamp: typeof clamp;
type Point$1_PointRelation = PointRelation;
type Point$1_PointRelationResult = PointRelationResult;
declare const Point$1_relation: typeof relation;
declare namespace Point$1 {
  export {
    Point$1_Point as Point,
    Point$1_Point3d as Point3d,
    Point$1_getPointParam as getPointParam,
    Point$1_dotProduct as dotProduct,
    Point$1_Empty as Empty,
    Point$1_Placeholder as Placeholder,
    Point$1_isEmpty as isEmpty,
    Point$1_isPlaceholder as isPlaceholder,
    Point$1_isNull as isNull,
    Point$1_findMinimum as findMinimum,
    Point$1_leftmost as leftmost,
    Point$1_rightmost as rightmost,
    Point$1_distance as distance,
    Point$1_distanceToExterior as distanceToExterior,
    Point$1_distanceToCenter as distanceToCenter,
    Point$1_PointCalculableShape as PointCalculableShape,
    Point$1_guard as guard,
    Point$1_guardNonZeroPoint as guardNonZeroPoint,
    Point$1_angle as angle,
    Point$1_centroid as centroid,
    Point$1_bbox as bbox,
    Point$1_isPoint as isPoint,
    Point$1_isPoint3d as isPoint3d,
    Point$1_toArray as toArray,
    Point$1_toString as toString,
    Point$1_isEqual as isEqual,
    Point$1_withinRange as withinRange,
    Point$1_interpolate as interpolate,
    Point$1_from as from,
    Point$1_fromNumbers as fromNumbers,
    Point$1_subtract as subtract,
    Point$1_apply as apply,
    Point$1_pipelineApply as pipelineApply,
    Point$1_pipeline as pipeline,
    Point$1_reduce as reduce,
    Point$1_sum as sum,
    Point$1_multiply as multiply,
    Point$1_divide as divide,
    Point$1_convexHull as convexHull,
    Point$1_compare as compare,
    Point$1_compareByX as compareByX,
    Point$1_project as project,
    Point$1_rotate as rotate,
    Point$1_rotatePointArray as rotatePointArray,
    Point$1_normalise as normalise,
    Point$1_normaliseByRect as normaliseByRect,
    Point$1_random as random,
    Point$1_wrap as wrap,
    Point$1_invert as invert,
    Point$1_toIntegerValues as toIntegerValues,
    Point$1_clampMagnitude as clampMagnitude,
    Point$1_clamp as clamp,
    Point$1_PointRelation as PointRelation,
    Point$1_PointRelationResult as PointRelationResult,
    Point$1_relation as relation,
  };
}

export { Circle as C, Line$1 as L, Point as P, RectPositioned as R, PointRelation as a, PolyLine as b, Path as c, Rect as d, Circle$1 as e, Rect$1 as f, Point$1 as g, Path$1 as h, Line as i, CirclePositioned as j };
