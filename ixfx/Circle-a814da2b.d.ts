import { a as Point, P as Path, R as RectPositioned, e as Rect, f as Line } from './Rect-96323fc2';

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
declare const interpolate: (circle: CirclePositioned, t: number) => Point;
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
declare const Circle$1_interpolate: typeof interpolate;
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
    Circle$1_interpolate as interpolate,
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

export { Circle$1 as C, CirclePositioned as a };
