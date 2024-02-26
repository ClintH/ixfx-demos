import { P as Point, a as Path, L as Line, b as RectPositioned, R as Rect } from './index-jU6_fzOJ.js';

type QuadraticBezier = {
    readonly a: Point;
    readonly b: Point;
    readonly quadratic: Point;
};
type QuadraticBezierPath = Path & QuadraticBezier;
type CubicBezier = {
    readonly a: Point;
    readonly b: Point;
    readonly cubic1: Point;
    readonly cubic2: Point;
};
type CubicBezierPath = Path & CubicBezier;
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

type Bezier_CubicBezier = CubicBezier;
type Bezier_CubicBezierPath = CubicBezierPath;
type Bezier_QuadraticBezier = QuadraticBezier;
type Bezier_QuadraticBezierPath = QuadraticBezierPath;
declare const Bezier_computeQuadraticSimple: typeof computeQuadraticSimple;
declare const Bezier_cubic: typeof cubic;
declare const Bezier_isCubicBezier: typeof isCubicBezier;
declare const Bezier_isQuadraticBezier: typeof isQuadraticBezier;
declare const Bezier_quadratic: typeof quadratic;
declare const Bezier_quadraticBend: typeof quadraticBend;
declare const Bezier_quadraticSimple: typeof quadraticSimple;
declare const Bezier_quadraticToSvgString: typeof quadraticToSvgString;
declare namespace Bezier {
  export { type Bezier_CubicBezier as CubicBezier, type Bezier_CubicBezierPath as CubicBezierPath, type Bezier_QuadraticBezier as QuadraticBezier, type Bezier_QuadraticBezierPath as QuadraticBezierPath, Bezier_computeQuadraticSimple as computeQuadraticSimple, Bezier_cubic as cubic, Bezier_isCubicBezier as isCubicBezier, Bezier_isQuadraticBezier as isQuadraticBezier, Bezier_quadratic as quadratic, Bezier_quadraticBend as quadraticBend, Bezier_quadraticSimple as quadraticSimple, Bezier_quadraticToSvgString as quadraticToSvgString, toPath$1 as toPath };
}

/**
 * An ellipse
 */
type Ellipse = {
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
type EllipsePositioned = Point & Ellipse;
declare const fromDegrees$1: (radiusX: number, radiusY: number, rotationDeg?: number, startAngleDeg?: number, endAngleDeg?: number) => Ellipse;
type EllipticalPath = Ellipse & Path & {
    readonly kind: `elliptical`;
};

type Ellipse$1_Ellipse = Ellipse;
type Ellipse$1_EllipsePositioned = EllipsePositioned;
type Ellipse$1_EllipticalPath = EllipticalPath;
declare namespace Ellipse$1 {
  export { type Ellipse$1_Ellipse as Ellipse, type Ellipse$1_EllipsePositioned as EllipsePositioned, type Ellipse$1_EllipticalPath as EllipticalPath, fromDegrees$1 as fromDegrees };
}

/**
 * Arc, defined by radius, start and end point in radians, and whether it is counter-clockwise.
 */
type Arc = {
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
 * An {@link Geometry.Arcs.Arc} that also has a position, given in x, y
 */
type ArcPositioned = Point & Arc;
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
declare const guard: (arc: Arc | ArcPositioned) => void;
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
declare const bbox: (arc: ArcPositioned | Arc) => RectPositioned | Rect;
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
declare const isEqual: (a: Arc | ArcPositioned, b: Arc | ArcPositioned) => boolean;

type index_Arc = Arc;
type index_ArcPositioned = ArcPositioned;
type index_SvgOpts = SvgOpts;
declare const index_bbox: typeof bbox;
declare const index_distanceCenter: typeof distanceCenter;
declare const index_fromDegrees: typeof fromDegrees;
declare const index_guard: typeof guard;
declare const index_interpolate: typeof interpolate;
declare const index_isArc: typeof isArc;
declare const index_isEqual: typeof isEqual;
declare const index_isPositioned: typeof isPositioned;
declare const index_length: typeof length;
declare const index_point: typeof point;
declare const index_toLine: typeof toLine;
declare const index_toPath: typeof toPath;
declare const index_toSvg: typeof toSvg;
declare namespace index {
  export { type index_Arc as Arc, type index_ArcPositioned as ArcPositioned, type index_SvgOpts as SvgOpts, index_bbox as bbox, index_distanceCenter as distanceCenter, index_fromDegrees as fromDegrees, index_guard as guard, index_interpolate as interpolate, index_isArc as isArc, index_isEqual as isEqual, index_isPositioned as isPositioned, index_length as length, index_point as point, index_toLine as toLine, index_toPath as toPath, index_toSvg as toSvg };
}

export { type ArcPositioned as A, Bezier as B, type CubicBezier as C, type EllipsePositioned as E, type QuadraticBezier as Q, Ellipse$1 as a, index as i };
