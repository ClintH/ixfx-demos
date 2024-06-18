import { P as Point } from './PointType-0vgoM_lJ.js';

type PointRelation = (a: Point | number, b?: number) => PointRelationResult;
type PointRelationResult = {
    /**
     * Angle from start
     */
    readonly angle: number;
    /**
     * Distance from start
     */
    readonly distanceFromStart: number;
    /**
     * Distance from last compared point
     */
    readonly distanceFromLast: number;
    /**
     * Center point from start
     */
    readonly centroid: Point;
    /**
     * Average of all points seen
     * This is calculated by summing x,y and dividing by total points
     */
    readonly average: Point;
    /**
     * Speed. Distance/millisecond from one sample to the next.
     */
    readonly speed: number;
};

export type { PointRelationResult as P, PointRelation as a };
