import { H as HasCompletion } from './Timer-1403e151';

declare type EasingFn = (x: number) => number;
/**
 * Creates an easing based on clock time
 * @inheritdoc Easing
 * @example Time based easing
 * ```
 * const t = time(`quintIn`, 5*1000); // Will take 5 seconds to complete
 * ...
 * t.compute(); // Get current value of easing
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param nameOrFn Name of easing, or an easing function
 * @param durationMs Duration in milliseconds
 * @returns Easing
 */
declare const time: (nameOrFn: EasingName | EasingFn, durationMs: number) => Easing;
/**
 * Creates an easing based on ticks
 *
 * @inheritdoc Easing
 * @example Tick-based easing
 * ```
 * const t = tick(`sineIn`, 1000);   // Will take 1000 ticks to complete
 * t.compute(); // Each call to `compute` progresses the tick count
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param nameOrFn Name of easing, or an easing function
 * @param durationTicks Duration in ticks
 * @returns Easing
 */
declare const tick: (nameOrFn: EasingName | EasingFn, durationTicks: number) => Easing;
/**
 * 'Ease' from `0` to `1` over a delicious curve. Commonly used for animation
 * and basic modelling of phyical motion.
 *
 * Create via {@link tick} or {@link time}, call `compute` to calculate the next
 * value in the progression, until you reach `1` or `isDone` returns true.
 *
 */
declare type Easing = HasCompletion & {
    /**
     * Computes the current value of the easing
     *
     * @returns {number}
     */
    compute(): number;
    /**
     * Reset the easing
     */
    reset(): void;
    /**
     * Returns true if the easing is complete
     *
     * @returns {boolean}
     */
    get isDone(): boolean;
};
/**
 * Creates an easing function using a simple cubic bezier defined by two points.
 *
 * Eg: https://cubic-bezier.com/#0,1.33,1,-1.25
 *  a:0, b: 1.33, c: 1, d: -1.25
 *
 * ```js
 * // Time-based easing using bezier
 * const e = Easings.time(fromCubicBezier(1.33, -1.25), 1000);
 * e.compute();
 * ```
 * @param b
 * @param d
 * @param t
 * @returns Value
 */
declare const fromCubicBezier: (b: number, d: number) => EasingFn;
/**
 * Returns a mix of two easing functions.
 *
 * ```js
 * // Get a 50/50 mix of two easing functions at t=0.25
 * mix(0.5, 0.25, sineIn, sineOut);
 *
 * // 10% of sineIn, 90% of sineOut
 * mix(0.90, 0.25, sineIn, sineOut);
 * ```
 * @param amt
 * @param balance
 * @param easingA
 * @param easingB
 * @returns
 */
declare const mix: (amt: number, balance: number, easingA: EasingFn, easingB: EasingFn) => number;
declare const crossfade: (amt: number, easingA: EasingFn, easingB: EasingFn) => number;
/**
 * @private
 */
declare type EasingName = keyof typeof functions;
/**
 * Returns an easing function by name, or _undefined_ if not found.
 * This is a manual way of working with easing functions. If you want to
 * ease over time or ticks, use {@link time} or {@link ticks}.
 *
 * ```js
 * const fn = Easings.get(`sineIn`);
 * // Returns 'eased' transformation of 0.5
 * fn(0.5);
 * ```
 * @param easingName eg `sineIn`
 * @returns Easing function
 */
declare const get: (easingName: EasingName) => EasingFn | undefined;
/**
 * @private
 * @returns Returns list of available easing names
 */
declare const getEasings: () => readonly string[];
/**
 * Returns a roughly gaussian easing function
 * @param stdDev
 * @returns
 */
declare const gaussian: (stdDev?: number) => EasingFn;
declare const functions: {
    arch: (x: number) => number;
    bell: EasingFn;
    sineIn: (x: number) => number;
    sineOut: (x: number) => number;
    quadIn: (x: number) => number;
    quadOut: (x: number) => number;
    sineInOut: (x: number) => number;
    quadInOut: (x: number) => number;
    cubicIn: (x: number) => number;
    cubicOut: (x: number) => number;
    quartIn: (x: number) => number;
    quartOut: (x: number) => number;
    quintIn: (x: number) => number;
    quintOut: (x: number) => number;
    expoIn: (x: number) => number;
    expoOut: (x: number) => number;
    quintInOut: (x: number) => number;
    expoInOut: (x: number) => number;
    circIn: (x: number) => number;
    circOut: (x: number) => number;
    backIn: (x: number) => number;
    backOut: (x: number) => number;
    circInOut: (x: number) => number;
    backInOut: (x: number) => number;
    elasticIn: (x: number) => number;
    elasticOut: (x: number) => number;
    bounceIn: (x: number) => number;
    bounceOut: (x: number) => number;
    elasticInOut: (x: number) => number;
    bounceInOut: (x: number) => number;
};

type Easing$1_EasingFn = EasingFn;
declare const Easing$1_time: typeof time;
declare const Easing$1_tick: typeof tick;
type Easing$1_Easing = Easing;
declare const Easing$1_fromCubicBezier: typeof fromCubicBezier;
declare const Easing$1_mix: typeof mix;
declare const Easing$1_crossfade: typeof crossfade;
type Easing$1_EasingName = EasingName;
declare const Easing$1_get: typeof get;
declare const Easing$1_getEasings: typeof getEasings;
declare const Easing$1_gaussian: typeof gaussian;
declare const Easing$1_functions: typeof functions;
declare namespace Easing$1 {
  export {
    Easing$1_EasingFn as EasingFn,
    Easing$1_time as time,
    Easing$1_tick as tick,
    Easing$1_Easing as Easing,
    Easing$1_fromCubicBezier as fromCubicBezier,
    Easing$1_mix as mix,
    Easing$1_crossfade as crossfade,
    Easing$1_EasingName as EasingName,
    Easing$1_get as get,
    Easing$1_getEasings as getEasings,
    Easing$1_gaussian as gaussian,
    Easing$1_functions as functions,
  };
}

/**
 * Applies a function to the elements of an array, weighting them based on their relative position.
 *
 * ```js
 * // Six items
 * weight([1,1,1,1,1,1], Easings.gaussian());
 *
 * // Yields:
 * // [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
 * ```
 *
 * Function is expected to map (0..1) => (0..1), such as an {@link Easings.EasingFn}. The input to the
 * function is the relative position of an element, so the first element will use fn(0), the middle (0.5) and so on.
 * The output of the function s then multiplied by the original value.
 *
 * In the below example (which is also the default if `fn` is not specified), it is just the
 * position which is used to proportion the contents.
 *
 * ```js
 * weight([1,1,1,1,1,1], (relativePos) => relativePos);
 * // Yields:
 * // [0, 0.2, 0.4, 0.6, 0.8, 1]
 * ```
 *
 * Non-numbers in `data` will be silently ignored.
 * @param data Data to process. Assumed to be an array of numbers
 * @param fn Function (number)=>number. Returns a weighting based on the given relative position. If unspecified (x) => x is used.
 */
declare const weight: (data: readonly number[], fn?: ((relativePos: number) => number) | undefined) => readonly number[];
/**
 * Calculates the average of all numbers in an array.
 * Array items which aren't a valid number are ignored and do not factor into averaging.
 *
 * Use {@link minMaxAvg} if you want min, max and total as well.
 *
 * @example
 * ```
 * // Average of a list
 * const avg = average(1, 1.4, 0.9, 0.1);
 *
 * // Average of a variable
 * let data = [100,200];
 * average(...data);
 * ```
 * @param data Data to average.
 * @returns Average of array
 */
declare const average: (...data: readonly number[]) => number;
/**
 * Computes an average of an array with a set of weights applied.
 *
 * Weights can be provided as an array, expected to be on 0..1 scale, with indexes
 * matched up to input data. Ie. data at index 2 will be weighed by index 2 in the weightings array.
 *
 * ```js
 * // All items weighted evenly
 * averageWeighted([1,2,3], [1,1,1]); // 2
 *
 * // First item has full weight, second half, third quarter
 * averageWeighted([1,2,3], [1, 0.5, 0.25]); // 1.57
 *
 * // With reversed weighting of [0.25,0.5,1] value is 2.42
 * ```
 *
 * A function can alternatively be provided to compute the weighting based on array index, via {@link weight}.
 *
 * ```js
 * averageWeighted[1,2,3], Easings.gaussian()); // 2.0
 * ```
 *
 * This is the same as:
 * ```js
 * const data = [1,2,3];
 * const w = weight(data, Easings.gaussian());
 * const avg = averageWeighted(data, w); // 2.0
 * ```
 * @param data Data to average
 * @param weightings Array of weightings that match up to data array, or an easing function
 */
declare const averageWeighted: (data: readonly number[], weightings: (readonly number[]) | EasingFn) => number;
/**
 * Returns the minimum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 * @param data
 * @returns Minimum number
 */
declare const min: (...data: readonly number[]) => number;
/**
 * Returns the index of the largest value
 * @param data
 * @returns
 */
declare const maxIndex: (...data: readonly number[]) => number;
/**
 * Returns the index of the smallest value
 * @param data
 * @returns
 */
declare const minIndex: (...data: readonly number[]) => number;
/**
 * Returns the maximum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 * @param data
 * @returns Maximum number
 */
declare const max: (...data: readonly number[]) => number;
/**
 * Returns the maximum out of `data` without pre-filtering for speed.
 *
 * For most uses, {@link max} should suffice.
 * @param data
 * @returns Maximum
 */
declare const maxFast: (data: readonly number[] | Float32Array) => number;
/**
 * Returns the maximum out of `data` without pre-filtering for speed.
 *
 * For most uses, {@link max} should suffice.
 * @param data
 * @returns Maximum
 */
declare const minFast: (data: readonly number[] | Float32Array) => number;
declare type MinMaxAvgTotal = {
    /**
     * Smallest value in array
     */
    readonly min: number;
    /**
     * Total of all items
     */
    readonly total: number;
    /**
     * Largest value in array
     */
    readonly max: number;
    /**
     * Average value in array
     */
    readonly avg: number;
};
/**
 * Returns the min, max, avg and total of the array.
 * Any values that are invalid are silently skipped over.
 *
 * Use {@link average} if you only need average
 *
 * @param data
 * @param startIndex If provided, starting index to do calculations (defaults full range)
 * @param endIndex If provided, the end index to do calculations (defaults full range)
 * @returns `{min, max, avg, total}`
 */
declare const minMaxAvg: (data: readonly number[], startIndex?: number | undefined, endIndex?: number | undefined) => MinMaxAvgTotal;

export { Easing$1 as E, MinMaxAvgTotal as M, EasingName as a, average as b, averageWeighted as c, maxIndex as d, minIndex as e, max as f, maxFast as g, minFast as h, minMaxAvg as i, min as m, weight as w };
