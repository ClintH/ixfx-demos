import { P as Point } from './PointType-0vgoM_lJ.js';
import { R as Rect } from './RectTypes-kjDrC-8b.js';

/**
 * A scale function that takes an input value to scale.
 * Input can be in the form of `{ x, y }` or two number parameters.
 *
 * ```js
 * scale(10, 20);
 * scale({ x:10, y:20 });
 * ```
 *
 * Output range can be specified as a `{ width, height }` or two number parameters.
 * If omitted, the default range
 * is used.
 *
 * ```js
 * // Scale 10,20 with range w:800 h:600
 * scale(10, 20, 800, 600);
 * scale({x:10, y:20}, 800, 600);
 * scale({x:10, y:20}, {width: 800, height: 600});
 * ```
 */
type Scaler = (a: number | Point, b?: number | Rect, c?: number | Rect, d?: number) => Point;
/**
 * A scaler than can convert to a from an output range
 */
type ScalerCombined = {
    /**
     * Relative to absolute coordinates
     */
    readonly abs: Scaler;
    /**
     * Absolute to relative coordintes
     */
    readonly rel: Scaler;
    readonly width: number;
    readonly height: number;
    computeScale(): Point;
};
type ScaleBy = `both` | `min` | `max` | `width` | `height`;
/**
 * Returns a set of scaler functions, to convert to and from ranges.
 *
 * ```js
 * const scaler = Scaler.scaler(`both`, {width:window.innerWidth, height:window.innerHeight});
 * // Assuming screen of 800x400...
 * scaler.abs(400,200);          // Yields { x:0.5, y:0.5 }
 * scaler.abs({ x:400, y:200 }); // Yields { x:0.5, y:0.5 }
 *
 * scaler.rel(0.5, 0.5);         // Yields: { x:400, y:200 }
 * scaler.rel({ x:0.5, y:0.5 }); // Yields: { x:400, y:200 }
 * ```
 *
 * If no default range is provided, it must be given each time the scale function is used.
 *
 * ```js
 * const scaler = Scaler.scaler(`both`);
 *
 * scaler.abs(400, 200, 800, 400);
 * scaler.abs(400, 200, { width: 800, height: 400 });
 * scaler.abs({ x:400, y: 200}, { width: 800, height: 400 });
 * scaler.abs({ x:400, y: 200}, 800, 400);
 * // All are the same, yielding { x:0.5, y:0.5 }
 *
 * scaler.abs(400, 200); // Throws an exception because there is no scale
 * ```
 * @param scaleBy Dimension to scale by
 * @param defaultRect Default range
 * @returns
 */
declare const scaler: (scaleBy?: ScaleBy, defaultRect?: Rect) => ScalerCombined;

type Scaler$1_ScaleBy = ScaleBy;
type Scaler$1_Scaler = Scaler;
type Scaler$1_ScalerCombined = ScalerCombined;
declare const Scaler$1_scaler: typeof scaler;
declare namespace Scaler$1 {
  export { type Scaler$1_ScaleBy as ScaleBy, type Scaler$1_Scaler as Scaler, type Scaler$1_ScalerCombined as ScalerCombined, Scaler$1_scaler as scaler };
}

export { type ScaleBy as S, type Scaler as a, Scaler$1 as b };
