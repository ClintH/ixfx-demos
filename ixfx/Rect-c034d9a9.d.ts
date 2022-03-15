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

declare type Line = {
    readonly a: Point;
    readonly b: Point;
};
declare const isLine: (p: Path | Line | Point) => p is Line;
/**
 * Returns true if the lines have the same value
 *
 * @param {Line} a
 * @param {Line} b
 * @returns {boolean}
 */
declare const equals$1: (a: Line, b: Line) => boolean;
declare const guard$2: (l: Line, paramName?: string) => void;
declare const angleRadian: (lineOrPoint: Line | Point, b?: Point | undefined) => number;
declare const withinRange$1: (l: Line, p: Point, maxRange: number) => boolean;
declare const length: (aOrLine: Point | Line, b?: Point | undefined) => number;
declare const nearest: (line: Line, p: Point) => Point;
/**
 * Calculates slope of line
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
declare const extendX: (line: Line, xIntersection: number) => Point;
/**
 * Returns a line extended from it's start (`a`) by a specified distance
 *
 * ```js
 * const line = {a: {x: 0, y:0}, b: {x:10, y:10} }
 * const extended = extendFromStart(line, 2);
 * ```
 * @param ine
 * @param distance
 * @return Newly extended line
 */
declare const extendFromStart: (line: Line, distance: number) => Line;
declare const distance$1: (l: Line, p: Point) => number;
/**
 * Calculates a point in-between a and b
 * @param amount Relative position, 0 being at a, 0.5 being halfway, 1 being at b
 * @param a Start
 * @param b End
 * @returns Point between a and b
 */
declare const interpolate$1: (amount: number, a: Point, b: Point) => Point;
declare const toString$1: (a: Point, b: Point) => string;
declare const fromNumbers$1: (x1: number, y1: number, x2: number, y2: number) => Line;
/**
 * Returns an array representation of line: [a.x, a.y, b.x, b.y]
 *
 * @export
 * @param {Point} a
 * @param {Point} b
 * @returns {number[]}
 */
declare const toFlatArray: (a: Point, b: Point) => readonly number[];
declare const toSvgString: (a: Point, b: Point) => readonly string[];
/**
 * Returns a line from four numbers [x1,y1,x2,y2]
 * @param arr Array in the form [x1,y1,x2,y2]
 * @returns Line
 */
declare const fromArray: (arr: readonly number[]) => Line;
declare const fromPoints: (a: Point, b: Point) => Line;
declare const joinPointsToLines: (...points: readonly Point[]) => readonly Line[];
declare const fromPointsToPath: (a: Point, b: Point) => LinePath;
declare type LinePath = Line & Path & {
    toFlatArray(): readonly number[];
};
declare const bbox$1: (line: Line) => RectPositioned;
declare const toPath: (line: Line) => LinePath;

type Line$1_Line = Line;
declare const Line$1_isLine: typeof isLine;
declare const Line$1_angleRadian: typeof angleRadian;
declare const Line$1_length: typeof length;
declare const Line$1_nearest: typeof nearest;
declare const Line$1_slope: typeof slope;
declare const Line$1_extendX: typeof extendX;
declare const Line$1_extendFromStart: typeof extendFromStart;
declare const Line$1_toFlatArray: typeof toFlatArray;
declare const Line$1_toSvgString: typeof toSvgString;
declare const Line$1_fromArray: typeof fromArray;
declare const Line$1_fromPoints: typeof fromPoints;
declare const Line$1_joinPointsToLines: typeof joinPointsToLines;
declare const Line$1_fromPointsToPath: typeof fromPointsToPath;
type Line$1_LinePath = LinePath;
declare const Line$1_toPath: typeof toPath;
declare namespace Line$1 {
  export {
    Line$1_Line as Line,
    Line$1_isLine as isLine,
    equals$1 as equals,
    guard$2 as guard,
    Line$1_angleRadian as angleRadian,
    withinRange$1 as withinRange,
    Line$1_length as length,
    Line$1_nearest as nearest,
    Line$1_slope as slope,
    Line$1_extendX as extendX,
    Line$1_extendFromStart as extendFromStart,
    distance$1 as distance,
    interpolate$1 as interpolate,
    toString$1 as toString,
    fromNumbers$1 as fromNumbers,
    Line$1_toFlatArray as toFlatArray,
    Line$1_toSvgString as toSvgString,
    Line$1_fromArray as fromArray,
    Line$1_fromPoints as fromPoints,
    Line$1_joinPointsToLines as joinPointsToLines,
    Line$1_fromPointsToPath as fromPointsToPath,
    Line$1_LinePath as LinePath,
    bbox$1 as bbox,
    Line$1_toPath as toPath,
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
 * An empty point of {x:0, y:0}
 */
declare const Empty: Readonly<{
    x: number;
    y: number;
}>;
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
 * Calculate distance between two points
 * @param a
 * @param b
 * @returns
 */
declare const distance: (a: Point, b: Point) => number;
/**
 * Throws an error if point is invalid
 * @param p
 * @param name
 */
declare const guard$1: (p: Point, name?: string) => void;
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
declare const toString: (p: Point) => string;
/**
 * Returns _true_ if the two points have identical values
 *
 * ```js
 * const a = {x: 10, y: 10};
 * const b = {x: 10, y: 10;};
 * a === b        // False, because a and be are different objects
 * equals(a, b)   // True, because a and b are same value
 * ```
 * @param a
 * @param b
 * @returns _True_ if points are equal
 */
declare const equals: (a: Point, b: Point) => boolean;
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
 * @returns {@link Point}
 */
declare const interpolate: (amount: number, a: Point, b: Point) => Point;
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
 * @param a
 * @param b
 * @returns Point
 */
declare const subtract: (a: Point, b: Point) => Point;
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
declare function multiply(a: Point, x: number, y?: number): Point;
/**
 * Normalises a point by a given width and height
 * @param pt Point
 * @param width Width
 * @param height Height
 */
declare function normalise(pt: Point, width: number, height: number): Point;
/**
 * Normalises x,y by width and height so it is on a 0..1 scale
 * @param x
 * @param y
 * @param width
 * @param height
 */
declare function normalise(x: number, y: number, width: number, height: number): Point;

type Point$1_Point = Point;
declare const Point$1_Empty: typeof Empty;
declare const Point$1_findMinimum: typeof findMinimum;
declare const Point$1_distance: typeof distance;
declare const Point$1_angleBetween: typeof angleBetween;
declare const Point$1_bbox: typeof bbox;
declare const Point$1_isPoint: typeof isPoint;
declare const Point$1_toArray: typeof toArray;
declare const Point$1_toString: typeof toString;
declare const Point$1_equals: typeof equals;
declare const Point$1_withinRange: typeof withinRange;
declare const Point$1_interpolate: typeof interpolate;
declare const Point$1_from: typeof from;
declare const Point$1_fromNumbers: typeof fromNumbers;
declare const Point$1_subtract: typeof subtract;
declare const Point$1_sum: typeof sum;
declare const Point$1_multiply: typeof multiply;
declare const Point$1_normalise: typeof normalise;
declare namespace Point$1 {
  export {
    Point$1_Point as Point,
    Point$1_Empty as Empty,
    Point$1_findMinimum as findMinimum,
    Point$1_distance as distance,
    guard$1 as guard,
    Point$1_angleBetween as angleBetween,
    Point$1_bbox as bbox,
    Point$1_isPoint as isPoint,
    Point$1_toArray as toArray,
    Point$1_toString as toString,
    Point$1_equals as equals,
    Point$1_withinRange as withinRange,
    Point$1_interpolate as interpolate,
    Point$1_from as from,
    Point$1_fromNumbers as fromNumbers,
    Point$1_subtract as subtract,
    Point$1_sum as sum,
    Point$1_multiply as multiply,
    Point$1_normalise as normalise,
  };
}

declare type Rect = {
    readonly width: number;
    readonly height: number;
};
declare type RectPositioned = Point & Rect;
declare const fromElement: (el: HTMLElement) => Rect;
declare const isEqual: (a: Rect, b: Rect) => boolean;
declare const fromCenter: (origin: Point, width: number, height: number) => RectPositioned;
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
declare const getCorners: (rect: RectPositioned | Rect, origin?: Point | undefined) => readonly Point[];
declare const getCenter: (rect: RectPositioned | Rect, origin?: Point | undefined) => Point;
/**
 * Returns four lines based on each corner.
 * Lines are given in order: top, right, bottom, left
 *
 * @param {(RectPositioned|Rect)} rect
 * @param {Points.Point} [origin]
 * @returns {Lines.Line[]}
 */
declare const getLines: (rect: RectPositioned | Rect, origin?: Point | undefined) => readonly Line[];

type Rect$1_Rect = Rect;
type Rect$1_RectPositioned = RectPositioned;
declare const Rect$1_fromElement: typeof fromElement;
declare const Rect$1_isEqual: typeof isEqual;
declare const Rect$1_fromCenter: typeof fromCenter;
declare const Rect$1_maxFromCorners: typeof maxFromCorners;
declare const Rect$1_guard: typeof guard;
declare const Rect$1_fromTopLeft: typeof fromTopLeft;
declare const Rect$1_getCorners: typeof getCorners;
declare const Rect$1_getCenter: typeof getCenter;
declare const Rect$1_getLines: typeof getLines;
declare namespace Rect$1 {
  export {
    Rect$1_Rect as Rect,
    Rect$1_RectPositioned as RectPositioned,
    Rect$1_fromElement as fromElement,
    Rect$1_isEqual as isEqual,
    Rect$1_fromCenter as fromCenter,
    Rect$1_maxFromCorners as maxFromCorners,
    Rect$1_guard as guard,
    Rect$1_fromTopLeft as fromTopLeft,
    Rect$1_getCorners as getCorners,
    Rect$1_getCenter as getCenter,
    Rect$1_getLines as getLines,
  };
}

export { Line$1 as L, Path as P, RectPositioned as R, Point as a, Rect$1 as b, Point$1 as c, Path$1 as d, Rect as e, Line as f };
