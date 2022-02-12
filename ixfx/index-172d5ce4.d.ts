import { C as Circle, A as Arc, B as Bezier } from './Circle-4b23ec3d';
import { P as Path, a as Point, R as RectPositioned, L as Line, b as Rect, c as Point$1, d as Path$1 } from './Rect-a9541cdc';
import { G as Grid } from './Grid-fb234a52';

declare type CompoundPath = Path & {
    segments: Path[];
    kind: `compound`;
};
/**
 * Returns a new compoundpath, replacing a path at a given index
 *
 * @param {CompoundPath} compoundPath Existing compoundpath
 * @param {number} index Index to replace at
 * @param {Paths.Path} path Path to substitute in
 * @returns {CompoundPath} New compoundpath
 */
declare const setSegment: (compoundPath: CompoundPath, index: number, path: Path) => CompoundPath;
/**
 * Computes x,y point at a relative position along compoundpath
 *
 * @param {Paths.Path[]} paths Combined paths (assumes contiguous)
 * @param {number} t Position (given as a percentage from 0 to 1)
 * @param {boolean} [useWidth] If true, widths are used for calulcating. If false, lengths are used
 * @param {Dimensions} [dimensions] Precalculated dimensions of paths, will be computed if omitted
 * @returns
 */
declare const compute: (paths: Path[], t: number, useWidth?: boolean | undefined, dimensions?: Dimensions | undefined) => Point;
declare type Dimensions = {
    /**
     * Width of each path (based on bounding box)
     *
     * @type {number[]}
     */
    widths: number[];
    /**
     * Length of each path
     *
     * @type {number[]}
     */
    lengths: number[];
    /**
     * Total length of all paths
     *
     * @type {number}
     */
    totalLength: number;
    /**
     * Total width of all paths
     *
     * @type {number}
     */
    totalWidth: number;
};
/**
 * Computes the widths and lengths of all paths, adding them up as well
 *
 * @param {Paths.Path[]} paths
 * @returns {Dimensions}
 */
declare const computeDimensions: (paths: Path[]) => Dimensions;
/**
 * Computes the bounding box that encloses entire compoundpath
 *
 * @param {Paths.Path[]} paths
 *
 * @returns {Rects.Rect}
 */
declare const bbox: (paths: Path[]) => RectPositioned;
/**
 * Produce a human-friendly representation of paths
 *
 * @param {Paths.Path[]} paths
 * @returns {string}
 */
declare const toString: (paths: Path[]) => string;
/**
 * Throws an error if paths are not connected together, in order
 *
 * @param {Paths.Path[]} paths
 */
declare const guardContinuous: (paths: Path[]) => void;
declare const toSvgString: (paths: Path[]) => readonly string[];
/**
 * Create a compoundpath from an array of paths.
 * All this does is verify they are connected, and precomputes dimensions
 *
 * @param {...Paths.Path[]} paths
 * @returns {CompoundPath}
 */
declare const fromPaths: (...paths: Path[]) => CompoundPath;

type CompoundPath$1_CompoundPath = CompoundPath;
declare const CompoundPath$1_setSegment: typeof setSegment;
declare const CompoundPath$1_compute: typeof compute;
declare const CompoundPath$1_computeDimensions: typeof computeDimensions;
declare const CompoundPath$1_bbox: typeof bbox;
declare const CompoundPath$1_toString: typeof toString;
declare const CompoundPath$1_guardContinuous: typeof guardContinuous;
declare const CompoundPath$1_toSvgString: typeof toSvgString;
declare const CompoundPath$1_fromPaths: typeof fromPaths;
declare namespace CompoundPath$1 {
  export {
    CompoundPath$1_CompoundPath as CompoundPath,
    CompoundPath$1_setSegment as setSegment,
    CompoundPath$1_compute as compute,
    CompoundPath$1_computeDimensions as computeDimensions,
    CompoundPath$1_bbox as bbox,
    CompoundPath$1_toString as toString,
    CompoundPath$1_guardContinuous as guardContinuous,
    CompoundPath$1_toSvgString as toSvgString,
    CompoundPath$1_fromPaths as fromPaths,
  };
}

declare type Coord = {
    readonly distance: number;
    readonly angleRadian: number;
};
declare type ToCartesian = {
    (point: Coord, origin?: Point): Point;
    (distance: number, angleRadians: number, origin?: Point): Point;
};
declare const isCoord: (p: number | unknown) => p is Coord;
declare const fromCartesian: (point: Point, origin: Point) => Coord;
declare const toCartesian: ToCartesian;
/**
 * Produces an Archimedean spiral
 *
 *
 * This is a generator:
 * ```
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
 * Produces an Archimedian spiral with manual stepping.
 * @param step Step number. Typically 0, 1, 2 ...
 * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
 * @param zoom At smoothness 0.1, zoom starting at 1 is OK
 * @returns
 */
declare const spiralRaw: (step: number, smoothness: number, zoom: number) => Coord;

type Polar_Coord = Coord;
declare const Polar_isCoord: typeof isCoord;
declare const Polar_fromCartesian: typeof fromCartesian;
declare const Polar_toCartesian: typeof toCartesian;
declare const Polar_spiral: typeof spiral;
declare const Polar_spiralRaw: typeof spiralRaw;
declare namespace Polar {
  export {
    Polar_Coord as Coord,
    Polar_isCoord as isCoord,
    Polar_fromCartesian as fromCartesian,
    Polar_toCartesian as toCartesian,
    Polar_spiral as spiral,
    Polar_spiralRaw as spiralRaw,
  };
}

declare const degreeToRadian: (angleInDegrees: number) => number;
declare const radianToDegree: (angleInRadians: number) => number;
declare const radiansFromAxisX: (point: Point) => number;

declare const index_degreeToRadian: typeof degreeToRadian;
declare const index_radianToDegree: typeof radianToDegree;
declare const index_radiansFromAxisX: typeof radiansFromAxisX;
declare const index_Polar: typeof Polar;
declare namespace index {
  export {
    Circle as Circles,
    Arc as Arcs,
    Line as Lines,
    Rect as Rects,
    Point$1 as Points,
    Path$1 as Paths,
    Grid as Grids,
    Bezier as Beziers,
    CompoundPath$1 as Compound,
    index_degreeToRadian as degreeToRadian,
    index_radianToDegree as radianToDegree,
    index_radiansFromAxisX as radiansFromAxisX,
    index_Polar as Polar,
  };
}

export { CompoundPath$1 as C, Polar as P, radiansFromAxisX as a, degreeToRadian as d, index as i, radianToDegree as r };
