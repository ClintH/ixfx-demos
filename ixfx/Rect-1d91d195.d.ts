declare type Path = {
    length(): number;
    /**
     * Returns a point at a relative (0.0-1.0) position along the path
     *
     * @param {number} t Relative position (0.0-1.0)
     * @returns {Point} Point
     */
    compute(t: number): Point;
    bbox(): RectPositioned;
    toString(): string;
    toSvgString(): string;
    readonly kind: `compound` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
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
 * Returns true if parameter is an arc
 * @param p Arc or number
 * @returns
 */
declare const isArc: (p: Arc | number) => p is Arc;
/**
 * Returns true if parameter has a positioned (x,y)
 * @param p Point, Arc or ArcPositiond
 * @returns
 */
declare const isPositioned$1: (p: Point | Arc | ArcPositioned) => p is Point;
/**
 * Arc, defined by radius, start and end point in radians, and whether it is counter-clockwise.
 */
declare type Arc = {
    /**
     * Radius of arc
     */
    readonly radius: number;
    /**
     * Start radian
     */
    readonly startRadian: number;
    /**
     * End radian
     */
    readonly endRadian: number;
    /**
     * If true, arc is counter-clockwise
     */
    readonly counterClockwise?: boolean;
};
/**
 * An {@link Arc} that also has a position, given in x, y
 */
declare type ArcPositioned = Point & Arc;
/**
 * Returns an arc from degrees, rather than radians
 * @param radius Radius of arc
 * @param startDegrees Start angle in degrees
 * @param endDegrees End angle in degrees
 * @param origin Optional center of arc
 * @returns Arc
 */
declare const fromDegrees: (radius: number, startDegrees: number, endDegrees: number, origin?: Point | undefined) => Arc | ArcPositioned;
/**
 * Returns a {@link Line} linking the start and end points of an {@link ArcPositioned}.
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
declare const point$1: (arc: Arc | ArcPositioned, angleRadian: number, origin?: Point | undefined) => Point;
/**
 * Throws an error if arc instance is invalid
 * @param arc
 */
declare const guard$3: (arc: Arc | ArcPositioned) => void;
/**
 * Compute relative position on arc
 * @param arc Arc
 * @param t Relative position 0-1
 * @param origin If arc is not positioned, pass in an origin
 * @returns
 */
declare const compute$2: (arc: ArcPositioned | Arc, t: number, origin?: Point | undefined) => Point;
/**
 * Creates a {@link Path} instance from the arc. This wraps up some functions for convienence.
 * @param arc
 * @returns Path
 */
declare const toPath$3: (arc: ArcPositioned) => Path;
/**
 * Calculates the length of the arc
 * @param arc
 * @returns Length
 */
declare const length$2: (arc: Arc) => number;
/**
 * Calculates a {@link Rects.Rect|Rect} bounding box for arc.
 * @param arc
 * @returns Rectangle encompassing arc.
 */
declare const bbox$3: (arc: ArcPositioned | Arc) => RectPositioned | Rect;
/**
 * Returns SVG string for an arc, suitable for Svg.js
 * @param origin Origin
 * @param radiusOrArc Radius, or {@link Arc} instance
 * @param startRadian Start radian
 * @param endRadian End radian
 * @returns Svg string
 */
declare const toSvg: (origin: Point, radiusOrArc: number | Arc, startRadian?: number | undefined, endRadian?: number | undefined) => string;
/**
 * Calculates the distance between the centers of two arcs
 * @param a
 * @param b
 * @returns Distance
 */
declare const distanceCenter$1: (a: ArcPositioned, b: ArcPositioned) => number;
/**
 * Returns true if the two arcs have the same values
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
declare const isEquals$1: (a: Arc | ArcPositioned, b: Arc | ArcPositioned) => boolean;

declare const Arc$1_isArc: typeof isArc;
type Arc$1_Arc = Arc;
type Arc$1_ArcPositioned = ArcPositioned;
declare const Arc$1_fromDegrees: typeof fromDegrees;
declare const Arc$1_toLine: typeof toLine;
declare const Arc$1_toSvg: typeof toSvg;
declare namespace Arc$1 {
  export {
    Arc$1_isArc as isArc,
    isPositioned$1 as isPositioned,
    Arc$1_Arc as Arc,
    Arc$1_ArcPositioned as ArcPositioned,
    Arc$1_fromDegrees as fromDegrees,
    Arc$1_toLine as toLine,
    point$1 as point,
    guard$3 as guard,
    compute$2 as compute,
    toPath$3 as toPath,
    length$2 as length,
    bbox$3 as bbox,
    Arc$1_toSvg as toSvg,
    distanceCenter$1 as distanceCenter,
    isEquals$1 as isEquals,
  };
}

declare type QuadraticBezier = {
    readonly a: Point;
    readonly b: Point;
    readonly quadratic: Point;
};
declare type QuadraticBezierPath = Path & QuadraticBezier;
declare type CubicBezier = {
    readonly a: Point;
    readonly b: Point;
    readonly cubic1: Point;
    readonly cubic2: Point;
};
declare type CubicBezierPath = Path & CubicBezier;
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
 * @param {Points.Point} start Start of curve
 * @param {Points.Point} end End of curve
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
declare const quadraticToSvgString: (start: Point, end: Point, handle: Point) => string;
declare const toPath$2: (cubicOrQuadratic: CubicBezier | QuadraticBezier) => CubicBezierPath | QuadraticBezierPath;
declare const cubic: (start: Point, end: Point, cubic1: Point, cubic2: Point) => CubicBezier;
declare const quadratic: (start: Point, end: Point, handle: Point) => QuadraticBezier;

type Bezier_QuadraticBezier = QuadraticBezier;
type Bezier_QuadraticBezierPath = QuadraticBezierPath;
type Bezier_CubicBezier = CubicBezier;
type Bezier_CubicBezierPath = CubicBezierPath;
declare const Bezier_isQuadraticBezier: typeof isQuadraticBezier;
declare const Bezier_isCubicBezier: typeof isCubicBezier;
declare const Bezier_quadraticBend: typeof quadraticBend;
declare const Bezier_quadraticSimple: typeof quadraticSimple;
declare const Bezier_computeQuadraticSimple: typeof computeQuadraticSimple;
declare const Bezier_quadraticToSvgString: typeof quadraticToSvgString;
declare const Bezier_cubic: typeof cubic;
declare const Bezier_quadratic: typeof quadratic;
declare namespace Bezier {
  export {
    Bezier_QuadraticBezier as QuadraticBezier,
    Bezier_QuadraticBezierPath as QuadraticBezierPath,
    Bezier_CubicBezier as CubicBezier,
    Bezier_CubicBezierPath as CubicBezierPath,
    Bezier_isQuadraticBezier as isQuadraticBezier,
    Bezier_isCubicBezier as isCubicBezier,
    Bezier_quadraticBend as quadraticBend,
    Bezier_quadraticSimple as quadraticSimple,
    Bezier_computeQuadraticSimple as computeQuadraticSimple,
    Bezier_quadraticToSvgString as quadraticToSvgString,
    toPath$2 as toPath,
    Bezier_cubic as cubic,
    Bezier_quadratic as quadratic,
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
declare const length$1: (aOrLine: Point | Line, b?: Point | undefined) => number;
declare const nearest: (line: Line, p: Point) => Point;
declare const slope: (lineOrPoint: Line | Point, b?: Point | undefined) => number;
declare const extendX: (line: Line, xIntersection: number) => Point;
/**
 * Returns a line extended from it's start (`a`) by a specified distance
 *
 * ```js
 * const line = {a: {x: 0, y:0}, b: {x:10, y:10} }
 * const extended = extendFromStart(line, 2);
 * ```
 * @param {Line} line
 * @param {number} distance
 * @return {*}  {Line}
 */
declare const extendFromStart: (line: Line, distance: number) => Line;
declare const distance$1: (l: Line, p: Point) => number;
declare const compute$1: (a: Point, b: Point, t: number) => Point;
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
declare const toSvgString: (a: Point, b: Point) => string;
declare const fromArray: (arr: readonly number[]) => Line;
declare const fromPoints: (a: Point, b: Point) => Line;
declare const joinPointsToLines: (...points: readonly Point[]) => readonly Line[];
declare const fromPointsToPath: (a: Point, b: Point) => LinePath;
declare type LinePath = Line & Path & {
    toFlatArray(): readonly number[];
};
declare const bbox$2: (line: Line) => RectPositioned;
declare const toPath$1: (line: Line) => LinePath;

type Line$1_Line = Line;
declare const Line$1_isLine: typeof isLine;
declare const Line$1_angleRadian: typeof angleRadian;
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
declare namespace Line$1 {
  export {
    Line$1_Line as Line,
    Line$1_isLine as isLine,
    equals$1 as equals,
    guard$2 as guard,
    Line$1_angleRadian as angleRadian,
    withinRange$1 as withinRange,
    length$1 as length,
    Line$1_nearest as nearest,
    Line$1_slope as slope,
    Line$1_extendX as extendX,
    Line$1_extendFromStart as extendFromStart,
    distance$1 as distance,
    compute$1 as compute,
    toString$1 as toString,
    fromNumbers$1 as fromNumbers,
    Line$1_toFlatArray as toFlatArray,
    Line$1_toSvgString as toSvgString,
    Line$1_fromArray as fromArray,
    Line$1_fromPoints as fromPoints,
    Line$1_joinPointsToLines as joinPointsToLines,
    Line$1_fromPointsToPath as fromPointsToPath,
    Line$1_LinePath as LinePath,
    bbox$2 as bbox,
    toPath$1 as toPath,
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
 * Returns true if parameter has x,y
 * @param p Circle or point
 * @returns
 */
declare const isPositioned: (p: Circle | Point) => p is Point;
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
declare const compute: (circle: CirclePositioned, t: number) => Point;
/**
 * Returns circumference of circle
 * @param circle
 * @returns
 */
declare const length: (circle: Circle) => number;
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
 * Returns the distance between two circle centers
 * @param a
 * @param b
 * @returns
 */
declare const distanceCenter: (a: CirclePositioned, b: CirclePositioned) => number;
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
declare const Circle$1_isPositioned: typeof isPositioned;
declare const Circle$1_point: typeof point;
declare const Circle$1_compute: typeof compute;
declare const Circle$1_length: typeof length;
declare const Circle$1_isContainedBy: typeof isContainedBy;
declare const Circle$1_isIntersecting: typeof isIntersecting;
declare const Circle$1_intersections: typeof intersections;
declare const Circle$1_isEquals: typeof isEquals;
declare const Circle$1_distanceCenter: typeof distanceCenter;
declare const Circle$1_toPath: typeof toPath;
declare const Circle$1_intersectionLine: typeof intersectionLine;
declare namespace Circle$1 {
  export {
    Circle$1_Circle as Circle,
    Circle$1_CirclePositioned as CirclePositioned,
    Circle$1_CircularPath as CircularPath,
    Circle$1_isPositioned as isPositioned,
    Circle$1_point as point,
    Circle$1_compute as compute,
    Circle$1_length as length,
    bbox$1 as bbox,
    Circle$1_isContainedBy as isContainedBy,
    Circle$1_isIntersecting as isIntersecting,
    Circle$1_intersections as intersections,
    Circle$1_isEquals as isEquals,
    Circle$1_distanceCenter as distanceCenter,
    Circle$1_toPath as toPath,
    Circle$1_intersectionLine as intersectionLine,
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
 * Throws an error if point parameter is invalid
 * @param p
 * @param name
 */
declare const guard$1: (p: Point, name?: string) => void;
/**
 * Returns the minimum rectangle that can enclose all provided points
 * @param points
 * @returns
 */
declare const bbox: (...points: readonly Point[]) => RectPositioned;
/**
 * Returns true if the parameter has x and y
 * @param p
 * @returns
 */
declare const isPoint: (p: Point | RectPositioned | Rect) => p is Point;
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
 * Returns true if the two points have identical values
 *
 * @param a
 * @param b
 * @returns
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
 * @param amt Relative amount, 0-1
 * @param a
 * @param b
 * @returns {@link Point}
 */
declare const lerp: (a: Point, b: Point, amt: number) => Point;
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
 * @param a
 * @param b
 * @returns Point
 */
declare const diff: (a: Point, b: Point) => Point;
/**
 * Returns `a` plus `b`
 *
 * @param a
 * @param b
 * @returns
 */
declare const sum: (a: Point, b: Point) => Point;
/**
 * Returns `a` multiplied by `b`
 *
 * @param a
 * @param b
 * @returns
 */
declare function multiply(a: Point, b: Point): Point;
/**
 * Returns `a` multipled by some x and/or y scaling factor
 *
 * @export
 * @parama Point to scale
 * @param x Scale factor for x axis
 * @param [y] Scale factor for y axis (defaults to no scaling)
 * @returns Scaled point
 */
declare function multiply(a: Point, x: number, y?: number): Point;

type Point$1_Point = Point;
declare const Point$1_findMinimum: typeof findMinimum;
declare const Point$1_distance: typeof distance;
declare const Point$1_bbox: typeof bbox;
declare const Point$1_isPoint: typeof isPoint;
declare const Point$1_toArray: typeof toArray;
declare const Point$1_toString: typeof toString;
declare const Point$1_equals: typeof equals;
declare const Point$1_withinRange: typeof withinRange;
declare const Point$1_lerp: typeof lerp;
declare const Point$1_from: typeof from;
declare const Point$1_fromNumbers: typeof fromNumbers;
declare const Point$1_diff: typeof diff;
declare const Point$1_sum: typeof sum;
declare const Point$1_multiply: typeof multiply;
declare namespace Point$1 {
  export {
    Point$1_Point as Point,
    Point$1_findMinimum as findMinimum,
    Point$1_distance as distance,
    guard$1 as guard,
    Point$1_bbox as bbox,
    Point$1_isPoint as isPoint,
    Point$1_toArray as toArray,
    Point$1_toString as toString,
    Point$1_equals as equals,
    Point$1_withinRange as withinRange,
    Point$1_lerp as lerp,
    Point$1_from as from,
    Point$1_fromNumbers as fromNumbers,
    Point$1_diff as diff,
    Point$1_sum as sum,
    Point$1_multiply as multiply,
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

export { Arc$1 as A, Bezier as B, Circle$1 as C, Line$1 as L, Path as P, QuadraticBezier as Q, RectPositioned as R, Point as a, Rect$1 as b, Point$1 as c, Path$1 as d, Rect as e, Line as f, CubicBezier as g, CirclePositioned as h, ArcPositioned as i };
