import { P as Point } from './PointType-0vgoM_lJ.js';

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

export type { CirclePositioned as C, Circle as a };
