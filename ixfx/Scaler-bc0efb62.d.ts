import { a as Point, f as Rect } from './Point-7e80cb86.js';

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
type ScaleFn = (a: number | Point, b?: number | Rect, c?: number | Rect, d?: number) => Point;
/**
 * A scaler than can convert to a from an output range
 */
type Scaler = {
    /**
     * Relative to absolute coordinates
     */
    readonly abs: ScaleFn;
    /**
     * Absolute to relative coordintes
     */
    readonly rel: ScaleFn;
};
/**
 * Returns a set of scaler functions, to convert to and from ranges.
 *
 * ```js
 * const scaler = Scaler.scaler(`both`, window.innerWidth, window.innerHeight);
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
declare const scaler: (scaleBy?: `both` | `min` | `max` | `width` | `height`, defaultRect?: Rect) => Scaler;

type Scaler$1_ScaleFn = ScaleFn;
type Scaler$1_Scaler = Scaler;
declare const Scaler$1_scaler: typeof scaler;
declare namespace Scaler$1 {
  export {
    Scaler$1_ScaleFn as ScaleFn,
    Scaler$1_Scaler as Scaler,
    Scaler$1_scaler as scaler,
  };
}

export { ScaleFn as S, Scaler$1 as a };
