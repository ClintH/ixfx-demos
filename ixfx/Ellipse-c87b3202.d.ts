import { a as Point, f as Line, P as Path, R as RectPositioned, e as Rect } from './Rect-c61822ed';

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
declare const isPositioned: (p: Point | Arc | ArcPositioned) => p is Point;
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
declare function fromDegrees$1(radius: number, startDegrees: number, endDegrees: number): Arc;
declare function fromDegrees$1(radius: number, startDegrees: number, endDegrees: number, origin: Point): ArcPositioned;
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
declare const point: (arc: Arc | ArcPositioned, angleRadian: number, origin?: Point | undefined) => Point;
/**
 * Throws an error if arc instance is invalid
 * @param arc
 */
declare const guard: (arc: Arc | ArcPositioned) => void;
declare type Interpolate = {
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
 * Creates a {@link Path} instance from the arc. This wraps up some functions for convienence.
 * @param arc
 * @returns Path
 */
declare const toPath$1: (arc: ArcPositioned) => Path;
/**
 * Calculates the length of the arc
 * @param arc
 * @returns Length
 */
declare const length: (arc: Arc) => number;
/**
 * Calculates a {@link Rects.Rect|Rect} bounding box for arc.
 * @param arc
 * @returns Rectangle encompassing arc.
 */
declare const bbox: (arc: ArcPositioned | Arc) => RectPositioned | Rect;
declare type ToSvg = {
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
declare const toSvg: ToSvg;
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
declare const distanceCenter: (a: ArcPositioned, b: ArcPositioned) => number;
/**
 * Returns true if the two arcs have the same values
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
declare const isEquals: (a: Arc | ArcPositioned, b: Arc | ArcPositioned) => boolean;

declare const Arc$1_isArc: typeof isArc;
declare const Arc$1_isPositioned: typeof isPositioned;
type Arc$1_Arc = Arc;
type Arc$1_ArcPositioned = ArcPositioned;
declare const Arc$1_toLine: typeof toLine;
declare const Arc$1_point: typeof point;
declare const Arc$1_guard: typeof guard;
declare const Arc$1_interpolate: typeof interpolate;
declare const Arc$1_length: typeof length;
declare const Arc$1_bbox: typeof bbox;
declare const Arc$1_toSvg: typeof toSvg;
declare const Arc$1_distanceCenter: typeof distanceCenter;
declare const Arc$1_isEquals: typeof isEquals;
declare namespace Arc$1 {
  export {
    Arc$1_isArc as isArc,
    Arc$1_isPositioned as isPositioned,
    Arc$1_Arc as Arc,
    Arc$1_ArcPositioned as ArcPositioned,
    fromDegrees$1 as fromDegrees,
    Arc$1_toLine as toLine,
    Arc$1_point as point,
    Arc$1_guard as guard,
    Arc$1_interpolate as interpolate,
    toPath$1 as toPath,
    Arc$1_length as length,
    Arc$1_bbox as bbox,
    Arc$1_toSvg as toSvg,
    Arc$1_distanceCenter as distanceCenter,
    Arc$1_isEquals as isEquals,
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
declare const toPath: (cubicOrQuadratic: CubicBezier | QuadraticBezier) => CubicBezierPath | QuadraticBezierPath;
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
declare const Bezier_toPath: typeof toPath;
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
    Bezier_toPath as toPath,
    Bezier_cubic as cubic,
    Bezier_quadratic as quadratic,
  };
}

/**
 * An ellipse
 */
declare type Ellipse = {
    readonly radiusX: number;
    readonly radiusY: number;
    /**
     * Rotation, in radians
     */
    readonly rotation?: number;
    readonly startAngle?: number;
    readonly endAngle?: number;
};
/**
 * A {@link Ellipse} with position
 */
declare type EllipsePositioned = Point & Ellipse;
declare const fromDegrees: (radiusX: number, radiusY: number, rotationDeg?: number, startAngleDeg?: number, endAngleDeg?: number) => Ellipse;
declare type EllipticalPath = Ellipse & Path & {
    readonly kind: `elliptical`;
};

type Ellipse$1_Ellipse = Ellipse;
type Ellipse$1_EllipsePositioned = EllipsePositioned;
declare const Ellipse$1_fromDegrees: typeof fromDegrees;
type Ellipse$1_EllipticalPath = EllipticalPath;
declare namespace Ellipse$1 {
  export {
    Ellipse$1_Ellipse as Ellipse,
    Ellipse$1_EllipsePositioned as EllipsePositioned,
    Ellipse$1_fromDegrees as fromDegrees,
    Ellipse$1_EllipticalPath as EllipticalPath,
  };
}

export { Arc$1 as A, Bezier as B, CubicBezier as C, Ellipse$1 as E, QuadraticBezier as Q, ArcPositioned as a, EllipsePositioned as b };
