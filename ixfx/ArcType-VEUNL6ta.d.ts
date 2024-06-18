import { P as Point } from './PointType-0vgoM_lJ.js';
import { a as RectPositioned } from './RectTypes-kjDrC-8b.js';

type Path = {
    /**
     * Length of path
     */
    length(): number;
    /**
     * Returns a point at a relative (0.0-1.0) position along the path
     *
     * Inverse of {@link relativePosition}.
     * @param {number} t Relative position (0.0-1.0)
     * @returns {Point} Point
     */
    interpolate(t: number): Point;
    /**
     * Returns relative position of `point` along path.
     * If `pt` is same as start, result will be 0, if it's the same as end, it will be 1.
     *
     * Inverse of {@link interpolate}.
     * @param point
     * @param intersectionThreshold
     */
    relativePosition(point: Point, intersectionThreshold: number): number;
    /**
     * Gets smallest box that encloses path
     */
    bbox(): RectPositioned;
    /**
     * Returns the nearest point on path to `point`
     * @param point
     */
    nearest(point: Point): Point;
    /**
     * Distance from start of path to this point.
     * If path is closed (eg. a circle) it may have some arbitary 'start' point
     * @param point
     */
    distanceToPoint(point: Point): number;
    /**
     * Returns a string representation of pth values
     */
    toString(): string;
    /**
     * Returns an array of SVG segments that can render path
     */
    toSvgString(): ReadonlyArray<string>;
    /**
     * Well-known path kind
     */
    readonly kind: `compound` | `elliptical` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
};
type WithBeziers = {
    getBeziers(): ReadonlyArray<Path>;
};
type CompoundPath = Path & {
    readonly segments: ReadonlyArray<Path>;
    readonly kind: `compound`;
};
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

type Triangle = {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;
};

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
declare const fromDegrees: (radiusX: number, radiusY: number, rotationDeg?: number, startAngleDeg?: number, endAngleDeg?: number) => Ellipse;
type EllipticalPath = Ellipse & Path & {
    readonly kind: `elliptical`;
};

type Ellipse$1_Ellipse = Ellipse;
type Ellipse$1_EllipsePositioned = EllipsePositioned;
type Ellipse$1_EllipticalPath = EllipticalPath;
declare const Ellipse$1_fromDegrees: typeof fromDegrees;
declare namespace Ellipse$1 {
  export { type Ellipse$1_Ellipse as Ellipse, type Ellipse$1_EllipsePositioned as EllipsePositioned, type Ellipse$1_EllipticalPath as EllipticalPath, Ellipse$1_fromDegrees as fromDegrees };
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

export { type ArcPositioned as A, type CubicBezier as C, type Dimensions as D, type EllipsePositioned as E, type Path as P, type QuadraticBezier as Q, type Triangle as T, type WithBeziers as W, type CompoundPath as a, type CubicBezierPath as b, type QuadraticBezierPath as c, type Arc as d, Ellipse$1 as e };
