/**
 * A point, consisting of x, y and maybe z fields.
 */
type Point = {
    readonly x: number;
    readonly y: number;
    readonly z?: number;
};
type Point3d = Point & {
    readonly z: number;
};
/**
 * A circle
 */
type Circle = {
    readonly radius: number;
};
type ShapePositioned = CirclePositioned | RectPositioned;
/**
 * A line, which consists of an `a` and `b` {@link Point}.
 */
type Line = {
    readonly a: Point;
    readonly b: Point;
};
/**
 * A {@link Circle} with position
 */
type CirclePositioned = Point & Circle;
type CircularPath = Circle & Path & {
    readonly kind: `circular`;
};
type Sphere = Point3d & {
    readonly radius: number;
};
/**
 * A PolyLine, consisting of more than one line.
 */
type PolyLine = ReadonlyArray<Line>;
/**
 * Rectangle as array: `[width, height]`
 */
type RectArray = readonly [width: number, height: number];
/**
 * Positioned rectangle as array: `[x, y, width, height]`
 */
type RectPositionedArray = readonly [
    x: number,
    y: number,
    width: number,
    height: number
];
type Rect = {
    readonly width: number;
    readonly height: number;
};
type RectPositioned = Point & Rect;
type Path = {
    length(): number;
    /**
       * Returns a point at a relative (0.0-1.0) position along the path
       *
       * @param {number} t Relative position (0.0-1.0)
       * @returns {Point} Point
       */
    interpolate(t: number): Point;
    bbox(): RectPositioned;
    /**
     * Returns the nearest point on path to `point`
     * @param point
     */
    nearest(point: Point): Point;
    toString(): string;
    toSvgString(): ReadonlyArray<string>;
    readonly kind: `compound` | `elliptical` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
};
type PointCalculableShape = PolyLine | Line | RectPositioned | Point | CirclePositioned;
/**
* Triangle.
*
* Helpers for creating:
*  - {@link Triangles.fromFlatArray}: Create from [x1, y1, x2, y2, x3, y3]
*  - {@link Triangles.fromPoints}: Create from three `{x,y}` sets
*  - {@link Triangles.fromRadius}: Equilateral triangle of a given radius and center
*/
type Triangle = {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;
};
/**
 * Polar coordinate, made up of a distance and angle in radians.
 * Most computations involving PolarCoord require an `origin` as well.
 */
type PolarCoord = {
    readonly distance: number;
    readonly angleRadian: number;
};
type Vector = Point | PolarCoord;

export { CirclePositioned as C, Line as L, Point as P, RectPositioned as R, ShapePositioned as S, Triangle as T, Vector as V, PolyLine as a, PolarCoord as b, Path as c, Circle as d, Rect as e, CircularPath as f, RectArray as g, RectPositionedArray as h, Sphere as i, Point3d as j, PointCalculableShape as k };
