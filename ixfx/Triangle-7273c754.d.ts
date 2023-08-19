import { a as Point, L as Line, d as Path, R as RectPositioned, f as Rect, g as Circle, c as PolyLine, e as CirclePositioned } from './Point-acfe68c7.js';

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
 * Returns a {@link Geometry.Lines.Line} linking the start and end points of an {@link ArcPositioned}.
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
declare const guard$1: (arc: Arc | ArcPositioned) => void;
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
 * Creates a {@link Geometry.Paths.Path} instance from the arc. This wraps up some functions for convienence.
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
 * Calculates a {@link Geometry.Rects.Rect | Rect} bounding box for arc.
 * @param arc
 * @returns Rectangle encompassing arc.
 */
declare const bbox$1: (arc: ArcPositioned | Arc) => RectPositioned | Rect;
type ToSvg = {
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
declare const isEqual$1: (a: Arc | ArcPositioned, b: Arc | ArcPositioned) => boolean;

type Arc$1_Arc = Arc;
type Arc$1_ArcPositioned = ArcPositioned;
type Arc$1_SvgOpts = SvgOpts;
declare const Arc$1_distanceCenter: typeof distanceCenter;
declare const Arc$1_interpolate: typeof interpolate;
declare const Arc$1_isArc: typeof isArc;
declare const Arc$1_isPositioned: typeof isPositioned;
declare const Arc$1_length: typeof length;
declare const Arc$1_point: typeof point;
declare const Arc$1_toLine: typeof toLine;
declare const Arc$1_toSvg: typeof toSvg;
declare namespace Arc$1 {
  export {
    Arc$1_Arc as Arc,
    Arc$1_ArcPositioned as ArcPositioned,
    Arc$1_SvgOpts as SvgOpts,
    bbox$1 as bbox,
    Arc$1_distanceCenter as distanceCenter,
    fromDegrees$1 as fromDegrees,
    guard$1 as guard,
    Arc$1_interpolate as interpolate,
    Arc$1_isArc as isArc,
    isEqual$1 as isEqual,
    Arc$1_isPositioned as isPositioned,
    Arc$1_length as length,
    Arc$1_point as point,
    Arc$1_toLine as toLine,
    toPath$1 as toPath,
    Arc$1_toSvg as toSvg,
  };
}

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
declare const Bezier_toPath: typeof toPath;
declare namespace Bezier {
  export {
    Bezier_CubicBezier as CubicBezier,
    Bezier_CubicBezierPath as CubicBezierPath,
    Bezier_QuadraticBezier as QuadraticBezier,
    Bezier_QuadraticBezierPath as QuadraticBezierPath,
    Bezier_computeQuadraticSimple as computeQuadraticSimple,
    Bezier_cubic as cubic,
    Bezier_isCubicBezier as isCubicBezier,
    Bezier_isQuadraticBezier as isQuadraticBezier,
    Bezier_quadratic as quadratic,
    Bezier_quadraticBend as quadraticBend,
    Bezier_quadraticSimple as quadraticSimple,
    Bezier_quadraticToSvgString as quadraticToSvgString,
    Bezier_toPath as toPath,
  };
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
declare const fromDegrees: (radiusX: number, radiusY: number, rotationDeg?: number, startAngleDeg?: number, endAngleDeg?: number) => Ellipse;
type EllipticalPath = Ellipse & Path & {
    readonly kind: `elliptical`;
};

type Ellipse$1_Ellipse = Ellipse;
type Ellipse$1_EllipsePositioned = EllipsePositioned;
type Ellipse$1_EllipticalPath = EllipticalPath;
declare const Ellipse$1_fromDegrees: typeof fromDegrees;
declare namespace Ellipse$1 {
  export {
    Ellipse$1_Ellipse as Ellipse,
    Ellipse$1_EllipsePositioned as EllipsePositioned,
    Ellipse$1_EllipticalPath as EllipticalPath,
    Ellipse$1_fromDegrees as fromDegrees,
  };
}

type TriangleEquilateral = {
    readonly length: number;
} | number;
/**
 * Returns a positioned `Triangle` from an equilateral triangle definition.
 * By default the rotation is such that point `a` and `c` are lying on the horizontal,
 * and `b` is the upward-facing tip.
 *
 * Default is a triangle pointing upwards with b at the top, c to the left and b to right on the baseline.
 *
 * Example rotation values in radians:
 * * ▶️ 0: a and c on vertical, b at the tip
 * * ◀️ Math.PI: `c`and `a` are on vertical, with `b` at the tip.
 * * 🔽 Math.PI/2: `c` and `a` are on horizontal, `c` to the left. `b` at the bottom.
 * * 🔼 Math.PI*1.5: `c` and `a` are on horizontal, `c` to the right. `b` at the top. (default)
 * @param t
 * @param origin
 * @param rotationRad
 * @returns
 */
declare const fromCenter$1: (t: TriangleEquilateral, origin?: Point, rotationRad?: number) => Triangle;
/**
 * Calculate center from the given point A
 * @param t
 * @param ptA
 * @returns
 */
declare const centerFromA: (t: TriangleEquilateral, ptA?: Point) => Point;
/**
 * Calculate center from the given point B
 * @param t
 * @param ptB
 * @returns
 */
declare const centerFromB: (t: TriangleEquilateral, ptB?: Point) => Point;
/**
 * Calculate center from the given point C
 * @param t
 * @param ptC
 * @returns
 */
declare const centerFromC: (t: TriangleEquilateral, ptC?: Point) => Point;
/**
 * Returns the height (or rise) of an equilateral triangle.
 * Ie. from one vertex to the perpendicular edge.
 * (line marked x in the diagram below)
 *
 * ```
 *      .
 *     .x .
 *    . x  .
 *   .  x   .
 *  ..........
 * ```
 * @param t
 */
declare const height$2: (t: TriangleEquilateral) => number;
declare const perimeter$3: (t: TriangleEquilateral) => number;
declare const area$3: (t: TriangleEquilateral) => number;
/**
 * Circle that encompasses all points of triangle
 * @param t
 */
declare const circumcircle$2: (t: TriangleEquilateral) => Circle;
/**
 * Circle that is inside the edges of the triangle
 * @param t
 * @returns
 */
declare const incircle$2: (t: TriangleEquilateral) => Circle;

type TriangleEquilateral$1_TriangleEquilateral = TriangleEquilateral;
declare const TriangleEquilateral$1_centerFromA: typeof centerFromA;
declare const TriangleEquilateral$1_centerFromB: typeof centerFromB;
declare const TriangleEquilateral$1_centerFromC: typeof centerFromC;
declare namespace TriangleEquilateral$1 {
  export {
    TriangleEquilateral$1_TriangleEquilateral as TriangleEquilateral,
    area$3 as area,
    TriangleEquilateral$1_centerFromA as centerFromA,
    TriangleEquilateral$1_centerFromB as centerFromB,
    TriangleEquilateral$1_centerFromC as centerFromC,
    circumcircle$2 as circumcircle,
    fromCenter$1 as fromCenter,
    height$2 as height,
    incircle$2 as incircle,
    perimeter$3 as perimeter,
  };
}

type Right = {
    readonly adjacent?: number;
    readonly hypotenuse?: number;
    readonly opposite?: number;
};
type DefinedRight = {
    readonly adjacent: number;
    readonly hypotenuse: number;
    readonly opposite: number;
};
/**
 * Returns a positioned triangle from a point for A.
 *
 * ```
 *             c (90 deg)
 *             .
 *          .   .
 *       .       .
 *    .           .
 * a .............. b
 * ```
 * @param t
 * @param origin
 * @returns
 */
declare const fromA$1: (t: Right, origin?: Point) => Triangle;
/**
 * Returns a positioned triangle from a point for B.
 *
 * ```
 *             c (90 deg)
 *             .
 *          .   .
 *       .       .
 *    .           .
 * a .............. b
 * ```
 * @param t
 * @param origin
 * @returns
 */
declare const fromB$1: (t: Right, origin?: Point) => Triangle;
/**
 * Returns a positioned triangle from a point for C.
 *
 * ```
 *             c (90 deg)
 *             .
 *          .   .
 *       .       .
 *    .           .
 * a .............. b
 * ```
 *
 *
 * ```js
 * // Triangle pointing up to 0,0 with sides of 15
 * Triangles.Right.fromC({ adjacent: 15, opposite:15 }, { x: 0, y: 0 });
 * ```
 * @param t
 * @param origin
 * @returns
 */
declare const fromC$1: (t: Right, origin?: Point) => Triangle;
/**
 * Returns a right triangle with all lengths defined.
 * At least two lengths must already exist
 * @param t
 * @returns
 */
declare const resolveLengths: (t: Right) => DefinedRight;
/**
 * Height of right-triangle
 * @param t
 * @returns
 */
declare const height$1: (t: Right) => number;
/**
 * Returns the lengths of the hypotenuse split into p and q segments.
 * In other words, if one makes a line from the right-angle vertex down to hypotenuse.
 *
 * [See here](https://rechneronline.de/pi/right-triangle.php)
 * @param t
 * @returns
 */
declare const hypotenuseSegments: (t: Right) => readonly [p: number, q: number];
declare const perimeter$2: (t: Right) => number;
declare const area$2: (t: Right) => number;
/**
 * Angle (in radians) between hypotenuse and adjacent edge
 * @param t
 * @returns
 */
declare const angleAtPointA: (t: Right) => number;
/**
 * Angle (in radians) between opposite edge and hypotenuse
 * @param t
 * @returns
 */
declare const angleAtPointB: (t: Right) => number;
/**
 * Returns the median line lengths a, b and c in an array.
 *
 * The median lines are the lines from each vertex to the center.
 *
 * @param t
 * @returns
 */
declare const medians$1: (t: Right) => readonly [a: number, b: number, c: number];
/**
 * The circle which passes through the points of the triangle
 * @param t
 * @returns
 */
declare const circumcircle$1: (t: Right) => Circle;
/**
 * Circle enclosed by triangle
 * @param t
 * @returns
 */
declare const incircle$1: (t: Right) => Circle;
/**
 * Returns the opposite length of a right-angle triangle,
 * marked here
 *
 * ```
 *    .  <
 *   ..  <
 * ....  <
 * ```
 *
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param adjacent
 * @returns
 */
declare const oppositeFromAdjacent: (angleRad: number, adjacent: number) => number;
/**
 * Returns the opposite length of a right-angle triangle,
 * marked here
 *
 * ```
 *    .  <
 *   ..  <
 * ....  <
 * ```
 *
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param hypotenuse
 * @returns
 */
declare const oppositeFromHypotenuse: (angleRad: number, hypotenuse: number) => number;
/**
 * Returns the adjecent length of a right-angle triangle,
 * marked here
 * ```
 *    .
 *   ..  o
 * ....
 * ^^^^
 * ```
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param adjacent
 * @returns
 */
declare const adjacentFromHypotenuse: (angleRad: number, hypotenuse: number) => number;
/**
 * Returns the adjecent length of a right-angle triangle,
 * marked here
 * ```
 *    .
 *   ..  o
 * ....
 * ^^^^
 * ```
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param opposite
 * @returns
 */
declare const adjacentFromOpposite: (angleRad: number, opposite: number) => number;
/**
 * Returns the hypotenuse length of a right-angle triangle,
 * marked here
 * ```
 *      .
 * >   ..
 * >  ...
 * > ....  opp
 *  .....
 *   adj
 * ```
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param adjacent
 * @returns
 */
declare const hypotenuseFromOpposite: (angleRad: number, opposite: number) => number;
/**
 * Returns the hypotenuse length of a right-angle triangle,
 * marked here
 * ```
 *      .
 * >   ..
 * >  ...
 * > ....  opp
 *  .....
 *   adj
 * ```
 * This is just:
 * ```js
 * opposite = Math.tan(angle) * adjacent
 * ```
 * @param angleRad
 * @param adjacent
 * @returns
 */
declare const hypotenuseFromAdjacent: (angleRad: number, adjacent: number) => number;

type TriangleRight_DefinedRight = DefinedRight;
type TriangleRight_Right = Right;
declare const TriangleRight_adjacentFromHypotenuse: typeof adjacentFromHypotenuse;
declare const TriangleRight_adjacentFromOpposite: typeof adjacentFromOpposite;
declare const TriangleRight_angleAtPointA: typeof angleAtPointA;
declare const TriangleRight_angleAtPointB: typeof angleAtPointB;
declare const TriangleRight_hypotenuseFromAdjacent: typeof hypotenuseFromAdjacent;
declare const TriangleRight_hypotenuseFromOpposite: typeof hypotenuseFromOpposite;
declare const TriangleRight_hypotenuseSegments: typeof hypotenuseSegments;
declare const TriangleRight_oppositeFromAdjacent: typeof oppositeFromAdjacent;
declare const TriangleRight_oppositeFromHypotenuse: typeof oppositeFromHypotenuse;
declare const TriangleRight_resolveLengths: typeof resolveLengths;
declare namespace TriangleRight {
  export {
    TriangleRight_DefinedRight as DefinedRight,
    TriangleRight_Right as Right,
    TriangleRight_adjacentFromHypotenuse as adjacentFromHypotenuse,
    TriangleRight_adjacentFromOpposite as adjacentFromOpposite,
    TriangleRight_angleAtPointA as angleAtPointA,
    TriangleRight_angleAtPointB as angleAtPointB,
    area$2 as area,
    circumcircle$1 as circumcircle,
    fromA$1 as fromA,
    fromB$1 as fromB,
    fromC$1 as fromC,
    height$1 as height,
    TriangleRight_hypotenuseFromAdjacent as hypotenuseFromAdjacent,
    TriangleRight_hypotenuseFromOpposite as hypotenuseFromOpposite,
    TriangleRight_hypotenuseSegments as hypotenuseSegments,
    incircle$1 as incircle,
    medians$1 as medians,
    TriangleRight_oppositeFromAdjacent as oppositeFromAdjacent,
    TriangleRight_oppositeFromHypotenuse as oppositeFromHypotenuse,
    perimeter$2 as perimeter,
    TriangleRight_resolveLengths as resolveLengths,
  };
}

type Isosceles = {
    readonly legs: number;
    readonly base: number;
};
declare const baseAngle: (t: Isosceles) => number;
declare const apexAngle: (t: Isosceles) => number;
declare const height: (t: Isosceles) => number;
declare const legHeights: (t: Isosceles) => number;
declare const perimeter$1: (t: Isosceles) => number;
declare const area$1: (t: Isosceles) => number;
declare const circumcircle: (t: Isosceles) => Circle;
declare const incircle: (t: Isosceles) => Circle;
declare const medians: (t: Isosceles) => readonly [
    a: number,
    b: number,
    c: number
];
/**
 * Returns a positioned `Triangle` based on a center origin.
 * Center is determined by the intesecting of the medians.
 *
 * See: https://rechneronline.de/pi/isosceles-triangle.php
 * @param t
 * @param origin
 * @returns
 */
declare const fromCenter: (t: Isosceles, origin?: Point) => Triangle;
declare const fromA: (t: Isosceles, origin?: Point) => Triangle;
declare const fromB: (t: Isosceles, origin?: Point) => Triangle;
declare const fromC: (t: Isosceles, origin?: Point) => Triangle;

type TriangleIsosceles_Isosceles = Isosceles;
declare const TriangleIsosceles_apexAngle: typeof apexAngle;
declare const TriangleIsosceles_baseAngle: typeof baseAngle;
declare const TriangleIsosceles_circumcircle: typeof circumcircle;
declare const TriangleIsosceles_fromA: typeof fromA;
declare const TriangleIsosceles_fromB: typeof fromB;
declare const TriangleIsosceles_fromC: typeof fromC;
declare const TriangleIsosceles_fromCenter: typeof fromCenter;
declare const TriangleIsosceles_height: typeof height;
declare const TriangleIsosceles_incircle: typeof incircle;
declare const TriangleIsosceles_legHeights: typeof legHeights;
declare const TriangleIsosceles_medians: typeof medians;
declare namespace TriangleIsosceles {
  export {
    TriangleIsosceles_Isosceles as Isosceles,
    TriangleIsosceles_apexAngle as apexAngle,
    area$1 as area,
    TriangleIsosceles_baseAngle as baseAngle,
    TriangleIsosceles_circumcircle as circumcircle,
    TriangleIsosceles_fromA as fromA,
    TriangleIsosceles_fromB as fromB,
    TriangleIsosceles_fromC as fromC,
    TriangleIsosceles_fromCenter as fromCenter,
    TriangleIsosceles_height as height,
    TriangleIsosceles_incircle as incircle,
    TriangleIsosceles_legHeights as legHeights,
    TriangleIsosceles_medians as medians,
    perimeter$1 as perimeter,
  };
}

/**
 * Triangle.
 *
 * Helpers for creating:
 *  - {@link fromFlatArray}: Create from [x1, y1, x2, y2, x3, y3]
 *  - {@link fromPoints}: Create from three `{x,y}` sets
 *  - {@link fromRadius}: Equilateral triangle of a given radius and center
 */
type Triangle = {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;
};
/**
 * A triangle consisting of three empty points (Points.Empty)
 */
declare const Empty: Readonly<{
    a: {
        x: number;
        y: number;
    };
    b: {
        x: number;
        y: number;
    };
    c: {
        x: number;
        y: number;
    };
}>;
/**
 * A triangle consisting of three placeholder points (Points.Placeholder)
 */
declare const Placeholder: Readonly<{
    a: {
        x: number;
        y: number;
    };
    b: {
        x: number;
        y: number;
    };
    c: {
        x: number;
        y: number;
    };
}>;
/**
 * Returns true if triangle is empty
 * @param t
 * @returns
 */
declare const isEmpty: (t: Triangle) => boolean;
/**
 * Returns true if triangle is a placeholder
 * @param t
 * @returns
 */
declare const isPlaceholder: (t: Triangle) => boolean;
/**
 * Applies `fn` to each of a triangle's corner points, returning the result.
 *
 * @example Add some random to the x of each corner
 * ```
 * const t = apply(tri, p => {
 *  const r = 10;
 *  return {
 *    x: p.x + (Math.random()*r*2) - r,
 *    y: p.y
 *  }
 * });
 * ```
 * @param t
 * @param fn
 * @returns
 */
declare const apply: (t: Triangle, fn: (p: Point, label?: string) => Point) => Readonly<Triangle>;
/**
 * Throws an exception if the triangle is invalid
 * @param t
 * @param name
 */
declare const guard: (t: Triangle, name?: string) => void;
/**
 * Returns true if the parameter appears to be a valid triangle
 * @param p
 * @returns
 */
declare const isTriangle: (p: number | unknown) => p is Triangle;
/**
 * Returns true if the two parameters have equal values
 * @param a
 * @param b
 * @returns
 */
declare const isEqual: (a: Triangle, b: Triangle) => boolean;
/**
 * Returns the corners (vertices) of the triangle as an array of points
 * @param t
 * @returns Array of length three
 */
declare const corners: (t: Triangle) => readonly Point[];
/**
 * Returns the edges (ie sides) of the triangle as an array of lines
 * @param t
 * @returns Array of length three
 */
declare const edges: (t: Triangle) => PolyLine;
/**
 * Returns the lengths of the triangle sides
 * @param t
 * @returns Array of length three
 */
declare const lengths: (t: Triangle) => readonly number[];
/**
 * Return the three interior angles of the triangle, in radians.
 * @param t
 * @returns
 */
declare const angles: (t: Triangle) => readonly number[];
/**
 * Returns the three interior angles of the triangle, in degrees
 * @param t
 * @returns
 */
declare const anglesDegrees: (t: Triangle) => readonly number[];
/**
 * Returns true if it is an equilateral triangle
 * @param t
 * @returns
 */
declare const isEquilateral: (t: Triangle) => boolean;
/**
 * Returns true if it is an isosceles triangle
 * @param t
 * @returns
 */
declare const isIsosceles: (t: Triangle) => boolean;
/**
 * Returns true if at least one interior angle is 90 degrees
 * @param t
 * @returns
 */
declare const isRightAngle: (t: Triangle) => boolean;
/**
 * Returns true if triangle is oblique: No interior angle is 90 degrees
 * @param t
 * @returns
 */
declare const isOblique: (t: Triangle) => boolean;
/**
 * Returns true if triangle is actue: all interior angles less than 90 degrees
 * @param t
 * @returns
 */
declare const isAcute: (t: Triangle) => boolean;
/**
 * Returns true if triangle is obtuse: at least one interior angle is greater than 90 degrees
 * @param t
 * @returns
 */
declare const isObtuse: (t: Triangle) => boolean;
/**
 * Returns simple centroid of triangle
 * @param t
 * @returns
 */
declare const centroid: (t: Triangle) => Point;
/**
 * Calculates perimeter of a triangle
 * @param t
 * @returns
 */
declare const perimeter: (t: Triangle) => number;
/**
 * Calculates the area of a triangle
 * @param t
 * @returns
 */
declare const area: (t: Triangle) => number;
/**
 * Returns the largest circle enclosed by triangle `t`.
 * @param t
 */
declare const innerCircle: (t: Triangle) => CirclePositioned;
/**
 * Returns the largest circle touching the corners of triangle `t`.
 * @param t
 * @returns
 */
declare const outerCircle: (t: Triangle) => CirclePositioned;
/**
 * Returns an equilateral triangle centered at the origin.
 *
 * ```js
 * // Create a triangle at 100,100 with radius of 60
 * const tri = fromRadius({x:100,y:100}, 60);
 *
 * // Triangle with point A upwards, B to the right, C to the left
 * constr tri2 = fromRadius({x:100,y:100}, 60, {initialAngleRadian: -Math.PI / 2});
 * ```
 *
 *
 * @param origin
 * @param length
 */
declare const fromRadius: (origin: Point, radius: number, opts?: {
    readonly initialAngleRadian?: number;
}) => Triangle;
/**
 * Rotates the vertices of the triangle around one point (by default, `b`).
 * @param triangle Triangle
 * @param vertex Name of vertex: a, b or c.
 */
declare const rotateByVertex: (triangle: Triangle, amountRadian: number, vertex?: `a` | `b` | `c`) => Triangle;
/**
 * Returns a triangle anchored at `origin` with a given `length` and `angleRadian`.
 * The origin will be point `b` of the triangle, and the angle will be the angle for b.
 * @param origin Origin
 * @param length Length
 * @param angleRadian Angle
 * @returns
 */
declare const equilateralFromVertex: (origin?: Point, length?: number, angleRadian?: number) => Triangle;
/**
 * Returns the coordinates of triangle in a flat array form:
 * [xA, yA, xB, yB, xC, yC]
 * @param t
 * @returns
 */
declare const toFlatArray: (t: Triangle) => readonly number[];
/**
 * Returns a triangle from a set of coordinates in a flat array form:
 * [xA, yA, xB, yB, xC, yC]
 * @param coords
 * @returns
 */
declare const fromFlatArray: (coords: readonly number[]) => Triangle;
/**
 * Returns a triangle from an array of three points
 * @param points
 * @returns
 */
declare const fromPoints: (points: readonly Point[]) => Triangle;
/**
 * Returns the bounding box that encloses the triangle.
 * @param t
 * @param inflation If specified, box will be inflated by this much. Default: 0.
 * @returns
 */
declare const bbox: (t: Triangle, inflation?: number) => RectPositioned;
type BarycentricCoord = {
    readonly a: number;
    readonly b: number;
    readonly c: number;
};
/**
 * Returns the [Barycentric coordinate](https://en.wikipedia.org/wiki/Barycentric_coordinate_system) of a point within a triangle
 *
 * @param t
 * @param a
 * @param b
 * @returns
 */
declare const barycentricCoord: (t: Triangle, a: Point | number, b?: number) => BarycentricCoord;
/**
 * Convert Barycentric coordinate to Cartesian
 * @param t
 * @param bc
 * @returns
 */
declare const barycentricToCartestian: (t: Triangle, bc: BarycentricCoord) => Point;
/**
 * Returns true if point is within or on the boundary of triangle
 * @param t
 * @param a
 * @param b
 */
declare const intersectsPoint: (t: Triangle, a: Point | number, b?: number) => boolean;
/**
 * Returns a triangle that is rotated by `angleRad`. By default it rotates
 * around its center but an arbitrary `origin` point can be provided.
 *
 * ```js
 * // Rotate triangle by 5 degrees
 * rotate(triangle, degreeToRadian(5));
 *
 * // Rotate by 90 degrees
 * rotate(triangle, Math.PI / 2);
 * ```
 * @param line Line to rotate
 * @param amountRadian Angle in radians to rotate by
 * @param origin Point to rotate around. If undefined, middle of line will be used
 * @returns
 */
declare const rotate: (t: Triangle, amountRadian?: number, origin?: Point) => Triangle;

type Triangle$1_BarycentricCoord = BarycentricCoord;
declare const Triangle$1_Empty: typeof Empty;
declare const Triangle$1_Placeholder: typeof Placeholder;
type Triangle$1_Triangle = Triangle;
declare const Triangle$1_angles: typeof angles;
declare const Triangle$1_anglesDegrees: typeof anglesDegrees;
declare const Triangle$1_apply: typeof apply;
declare const Triangle$1_area: typeof area;
declare const Triangle$1_barycentricCoord: typeof barycentricCoord;
declare const Triangle$1_barycentricToCartestian: typeof barycentricToCartestian;
declare const Triangle$1_bbox: typeof bbox;
declare const Triangle$1_centroid: typeof centroid;
declare const Triangle$1_corners: typeof corners;
declare const Triangle$1_edges: typeof edges;
declare const Triangle$1_equilateralFromVertex: typeof equilateralFromVertex;
declare const Triangle$1_fromFlatArray: typeof fromFlatArray;
declare const Triangle$1_fromPoints: typeof fromPoints;
declare const Triangle$1_fromRadius: typeof fromRadius;
declare const Triangle$1_guard: typeof guard;
declare const Triangle$1_innerCircle: typeof innerCircle;
declare const Triangle$1_intersectsPoint: typeof intersectsPoint;
declare const Triangle$1_isAcute: typeof isAcute;
declare const Triangle$1_isEmpty: typeof isEmpty;
declare const Triangle$1_isEqual: typeof isEqual;
declare const Triangle$1_isEquilateral: typeof isEquilateral;
declare const Triangle$1_isIsosceles: typeof isIsosceles;
declare const Triangle$1_isOblique: typeof isOblique;
declare const Triangle$1_isObtuse: typeof isObtuse;
declare const Triangle$1_isPlaceholder: typeof isPlaceholder;
declare const Triangle$1_isRightAngle: typeof isRightAngle;
declare const Triangle$1_isTriangle: typeof isTriangle;
declare const Triangle$1_lengths: typeof lengths;
declare const Triangle$1_outerCircle: typeof outerCircle;
declare const Triangle$1_perimeter: typeof perimeter;
declare const Triangle$1_rotate: typeof rotate;
declare const Triangle$1_rotateByVertex: typeof rotateByVertex;
declare const Triangle$1_toFlatArray: typeof toFlatArray;
declare namespace Triangle$1 {
  export {
    Triangle$1_BarycentricCoord as BarycentricCoord,
    Triangle$1_Empty as Empty,
    TriangleEquilateral$1 as Equilateral,
    TriangleIsosceles as Isosceles,
    Triangle$1_Placeholder as Placeholder,
    TriangleRight as Right,
    Triangle$1_Triangle as Triangle,
    Triangle$1_angles as angles,
    Triangle$1_anglesDegrees as anglesDegrees,
    Triangle$1_apply as apply,
    Triangle$1_area as area,
    Triangle$1_barycentricCoord as barycentricCoord,
    Triangle$1_barycentricToCartestian as barycentricToCartestian,
    Triangle$1_bbox as bbox,
    Triangle$1_centroid as centroid,
    Triangle$1_corners as corners,
    Triangle$1_edges as edges,
    Triangle$1_equilateralFromVertex as equilateralFromVertex,
    Triangle$1_fromFlatArray as fromFlatArray,
    Triangle$1_fromPoints as fromPoints,
    Triangle$1_fromRadius as fromRadius,
    Triangle$1_guard as guard,
    Triangle$1_innerCircle as innerCircle,
    Triangle$1_intersectsPoint as intersectsPoint,
    Triangle$1_isAcute as isAcute,
    Triangle$1_isEmpty as isEmpty,
    Triangle$1_isEqual as isEqual,
    Triangle$1_isEquilateral as isEquilateral,
    Triangle$1_isIsosceles as isIsosceles,
    Triangle$1_isOblique as isOblique,
    Triangle$1_isObtuse as isObtuse,
    Triangle$1_isPlaceholder as isPlaceholder,
    Triangle$1_isRightAngle as isRightAngle,
    Triangle$1_isTriangle as isTriangle,
    Triangle$1_lengths as lengths,
    Triangle$1_outerCircle as outerCircle,
    Triangle$1_perimeter as perimeter,
    Triangle$1_rotate as rotate,
    Triangle$1_rotateByVertex as rotateByVertex,
    Triangle$1_toFlatArray as toFlatArray,
  };
}

export { Arc$1 as A, Bezier as B, CubicBezier as C, Ellipse$1 as E, QuadraticBezier as Q, Triangle as T, Triangle$1 as a, ArcPositioned as b, EllipsePositioned as c };
