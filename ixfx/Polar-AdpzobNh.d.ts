import { P as Point } from './PointType-0vgoM_lJ.js';

/**
 * Polar coordinate, made up of a distance and angle in radians.
 * Most computations involving PolarCoord require an `origin` as well.
 */
type Coord = {
    readonly distance: number;
    readonly angleRadian: number;
};
/**
 * Converts to Cartesian coordiantes
 */
type ToCartesian = {
    (point: Coord, origin?: Point): Point;
    (distance: number, angleRadians: number, origin?: Point): Point;
};
/**
 * Returns true if `p` seems to be a {@link Polar.Coord} (ie has both distance & angleRadian fields)
 * @param p
 * @returns True if `p` seems to be a PolarCoord
 */
declare const isPolarCoord: (p: unknown) => p is Coord;
/**
 * Converts a Cartesian coordinate to polar
 *
 * ```js
 * import { Polar } from 'https://unpkg.com/ixfx/dist/geometry.js';
 *
 * // Yields: { angleRadian, distance }
 * const polar = Polar.fromCartesian({x: 50, y: 50}, origin);
 * ```
 *
 * Any additional properties of `point` are copied to object.
 * @param point Point
 * @param origin Origin
 * @returns
 */
declare const fromCartesian: (point: Point, origin: Point) => Coord;
/**
 * Converts to Cartesian coordinate from polar.
 *
 * ```js
 * import { Polar } from 'https://unpkg.com/ixfx/dist/geometry.js';
 *
 * const origin = { x: 50, y: 50}; // Polar origin
 * // Yields: { x, y }
 * const polar = Polar.toCartesian({ distance: 10, angleRadian: 0 }, origin);
 * ```
 *
 * Distance and angle can be provided as numbers intead:
 *
 * ```
 * // Yields: { x, y }
 * const polar = Polar.toCartesian(10, 0, origin);
 * ```
 *
 * @param a
 * @param b
 * @param c
 * @returns
 */
declare const toCartesian: ToCartesian;
/**
 * Produces an Archimedean spiral. It's a generator.
 *
 * ```js
 * const s = spiral(0.1, 1);
 * for (const coord of s) {
 *  // Use Polar coord...
 *  if (coord.step === 1000) break; // Stop after 1000 iterations
 * }
 * ```
 *
 * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
 * @param zoom At smoothness 0.1, zoom starting at 1 is OK
 */
declare function spiral(smoothness: number, zoom: number): IterableIterator<Coord & {
    readonly step: number;
}>;
/**
 * Returns a rotated coordinate
 * @param c Coordinate
 * @param amountRadian Amount to rotate, in radians
 * @returns
 */
declare const rotate: (c: Coord, amountRadian: number) => Coord;
declare const normalise: (c: Coord) => Coord;
/**
 * Throws an error if Coord is invalid
 * @param p
 * @param name
 */
declare const guard: (p: Coord, name?: string) => void;
/**
 * Calculate dot product of two PolarCoords.
 *
 * Eg, power is the dot product of force and velocity
 *
 * Dot products are also useful for comparing similarity of
 *  angle between two unit PolarCoords.
 * @param a
 * @param b
 * @returns
 */
declare const dotProduct: (a: Coord, b: Coord) => number;
/**
 * Inverts the direction of coordinate. Ie if pointing north, will point south.
 * @param p
 * @returns
 */
declare const invert: (p: Coord) => Coord;
/**
 * Returns true if PolarCoords have same magnitude but opposite direction
 * @param a
 * @param b
 * @returns
 */
declare const isOpposite: (a: Coord, b: Coord) => boolean;
/**
 * Returns true if Coords have the same direction, regardless of magnitude
 * @param a
 * @param b
 * @returns
 */
declare const isParallel: (a: Coord, b: Coord) => boolean;
/**
 * Returns true if coords are opposite direction, regardless of magnitude
 * @param a
 * @param b
 * @returns
 */
declare const isAntiParallel: (a: Coord, b: Coord) => boolean;
/**
 * Returns a rotated coordinate
 * @param c Coordinate
 * @param amountDeg Amount to rotate, in degrees
 * @returns
 */
declare const rotateDegrees: (c: Coord, amountDeg: number) => Coord;
/**
 * Produces an Archimedian spiral with manual stepping.
 * @param step Step number. Typically 0, 1, 2 ...
 * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
 * @param zoom At smoothness 0.1, zoom starting at 1 is OK
 * @returns
 */
declare const spiralRaw: (step: number, smoothness: number, zoom: number) => Coord;
/**
 * Multiplies the magnitude of a coord by `amt`.
 * Direction is unchanged.
 * @param v
 * @param amt
 * @returns
 */
declare const multiply: (v: Coord, amt: number) => Coord;
/**
 * Divides the magnitude of a coord by `amt`.
 * Direction is unchanged.
 * @param v
 * @param amt
 * @returns
 */
declare const divide: (v: Coord, amt: number) => Coord;
/**
 * Clamps the magnitude of a vector
 * @param v
 * @param max
 * @param min
 * @returns
 */
declare const clampMagnitude: (v: Coord, max?: number, min?: number) => Coord;
/**
 * Returns a human-friendly string representation `(distance, angleDeg)`.
 * If `precision` is supplied, this will be the number of significant digits.
 * @param p
 * @returns
 */
declare const toString: (p: Coord, digits?: number) => string;
declare const toPoint: (v: Coord, origin?: Readonly<{
    x: 0;
    y: 0;
}>) => Point;

type Polar_Coord = Coord;
declare const Polar_clampMagnitude: typeof clampMagnitude;
declare const Polar_divide: typeof divide;
declare const Polar_dotProduct: typeof dotProduct;
declare const Polar_fromCartesian: typeof fromCartesian;
declare const Polar_guard: typeof guard;
declare const Polar_invert: typeof invert;
declare const Polar_isAntiParallel: typeof isAntiParallel;
declare const Polar_isOpposite: typeof isOpposite;
declare const Polar_isParallel: typeof isParallel;
declare const Polar_isPolarCoord: typeof isPolarCoord;
declare const Polar_multiply: typeof multiply;
declare const Polar_normalise: typeof normalise;
declare const Polar_rotate: typeof rotate;
declare const Polar_rotateDegrees: typeof rotateDegrees;
declare const Polar_spiral: typeof spiral;
declare const Polar_spiralRaw: typeof spiralRaw;
declare const Polar_toCartesian: typeof toCartesian;
declare const Polar_toPoint: typeof toPoint;
declare const Polar_toString: typeof toString;
declare namespace Polar {
  export { type Polar_Coord as Coord, Polar_clampMagnitude as clampMagnitude, Polar_divide as divide, Polar_dotProduct as dotProduct, Polar_fromCartesian as fromCartesian, Polar_guard as guard, Polar_invert as invert, Polar_isAntiParallel as isAntiParallel, Polar_isOpposite as isOpposite, Polar_isParallel as isParallel, Polar_isPolarCoord as isPolarCoord, Polar_multiply as multiply, Polar_normalise as normalise, Polar_rotate as rotate, Polar_rotateDegrees as rotateDegrees, Polar_spiral as spiral, Polar_spiralRaw as spiralRaw, Polar_toCartesian as toCartesian, Polar_toPoint as toPoint, Polar_toString as toString };
}

export { type Coord as C, Polar as P };
