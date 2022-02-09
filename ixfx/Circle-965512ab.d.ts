import { a as Point, f as Line, P as Path, R as RectPositioned, e as Rect } from './Rect-a483e621';

/**
 * Returns true if parameter is an arc
 * @param p Arc or number
 * @returns
 */
declare const isArc: (p: Arc | number | unknown) => p is Arc;
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
declare function fromDegrees(radius: number, startDegrees: number, endDegrees: number): Arc;
declare function fromDegrees(radius: number, startDegrees: number, endDegrees: number, origin: Point): ArcPositioned;
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
declare const guard: (arc: Arc | ArcPositioned) => void;
declare type Compute = {
    (arc: Arc, t: number, origin: Point): Point;
    (arc: ArcPositioned, t: number): Point;
};
/**
 * Compute relative position on arc
 * @param arc Arc
 * @param t Relative position 0-1
 * @param origin If arc is not positioned, pass in an origin
 * @returns
 */
declare const compute$1: Compute;
/**
 * Creates a {@link Path} instance from the arc. This wraps up some functions for convienence.
 * @param arc
 * @returns Path
 */
declare const toPath$2: (arc: ArcPositioned) => Path;
/**
 * Calculates the length of the arc
 * @param arc
 * @returns Length
 */
declare const length$1: (arc: Arc) => number;
/**
 * Calculates a {@link Rects.Rect|Rect} bounding box for arc.
 * @param arc
 * @returns Rectangle encompassing arc.
 */
declare const bbox$1: (arc: ArcPositioned | Arc) => RectPositioned | Rect;
declare type ToSvg$1 = {
    /**
     * SVG path for arc description
     * @param origin Origin of arc
     * @param radius Radius
     * @param startRadian Start
     * @param endRadian End
     */
    (origin: Point, radius: number, startRadian: number, endRadian: number, opts?: SvgOpts): readonly string[];
    /**
     * SVG path for non-positioned arc
     */
    (arc: Arc, origin: Point, opts?: SvgOpts): readonly string[];
    /**
     * SVG path for positioned arc
     */
    (arc: ArcPositioned, opts?: SvgOpts): readonly string[];
};
/**
 * Creates an SV path snippet for arc
 * @returns
 */
declare const toSvg$1: ToSvg$1;
declare type SvgOpts = {
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
declare const Arc$1_guard: typeof guard;
declare namespace Arc$1 {
  export {
    Arc$1_isArc as isArc,
    isPositioned$1 as isPositioned,
    Arc$1_Arc as Arc,
    Arc$1_ArcPositioned as ArcPositioned,
    Arc$1_fromDegrees as fromDegrees,
    Arc$1_toLine as toLine,
    point$1 as point,
    Arc$1_guard as guard,
    compute$1 as compute,
    toPath$2 as toPath,
    length$1 as length,
    bbox$1 as bbox,
    toSvg$1 as toSvg,
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
declare const quadraticToSvgString: (start: Point, end: Point, handle: Point) => readonly string[];
declare const toPath$1: (cubicOrQuadratic: CubicBezier | QuadraticBezier) => CubicBezierPath | QuadraticBezierPath;
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
    toPath$1 as toPath,
    Bezier_cubic as cubic,
    Bezier_quadratic as quadratic,
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
declare const isCircle: (p: any) => p is Circle;
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
 * Returns the distance between two circle centers
 * @param a
 * @param b
 * @returns
 */
declare const distanceCenter: (a: CirclePositioned, b: CirclePositioned) => number;
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
declare const Circle$1_isPositioned: typeof isPositioned;
declare const Circle$1_isCircle: typeof isCircle;
declare const Circle$1_point: typeof point;
declare const Circle$1_compute: typeof compute;
declare const Circle$1_length: typeof length;
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
    Circle$1_isPositioned as isPositioned,
    Circle$1_isCircle as isCircle,
    Circle$1_point as point,
    Circle$1_compute as compute,
    Circle$1_length as length,
    Circle$1_bbox as bbox,
    Circle$1_isContainedBy as isContainedBy,
    Circle$1_isIntersecting as isIntersecting,
    Circle$1_intersections as intersections,
    Circle$1_isEquals as isEquals,
    Circle$1_distanceCenter as distanceCenter,
    Circle$1_toSvg as toSvg,
    Circle$1_toPath as toPath,
    Circle$1_intersectionLine as intersectionLine,
  };
}

export { Arc$1 as A, Bezier as B, Circle$1 as C, QuadraticBezier as Q, CubicBezier as a, CirclePositioned as b, ArcPositioned as c };
