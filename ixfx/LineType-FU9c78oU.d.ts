import { P as Point } from './PointType-DYug3Yo5.js';

/**
 * A line, which consists of an `a` and `b` {@link Point}.
 */
type Line = {
    readonly a: Point;
    readonly b: Point;
};
/**
 * A PolyLine, consisting of more than one line.
 */
type PolyLine = ReadonlyArray<Line>;

export type { Line as L, PolyLine as P };
