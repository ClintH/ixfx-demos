import { P as Point3d, a as Point } from './index-i31F4rTB.js';

type Sphere = Point3d & {
    readonly radius: number;
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

export type { PolarCoord as P, Sphere as S, Vector as V };
