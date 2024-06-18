import { P as Point } from './PointType-0vgoM_lJ.js';

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
