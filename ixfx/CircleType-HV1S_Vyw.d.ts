import { P as Point } from './PointType-DYug3Yo5.js';

/**
 * A circle
 */
type Circle = {
    readonly radius: number;
};
/**
 * A {@link Circle} with position
 */
type CirclePositioned = Point & Circle;
type CircleRandomPointOpts = {
    /**
     * Algorithm to calculate random values.
     * Default: 'uniform'
     */
    readonly strategy: `naive` | `uniform`;
    /**
     * Random number source.
     * Default: Math.random
     */
    readonly randomSource: () => number;
    /**
     * Margin within shape to start generating random points
     * Default: 0
     */
    readonly margin: number;
};

export type { CirclePositioned as C, Circle as a, CircleRandomPointOpts as b };
