import { P as Point } from './PointType-DYug3Yo5.js';

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

export type { Rect as R, RectPositioned as a, RectArray as b, RectPositionedArray as c };
