import { H as HasCompletion } from './index-e37bbe84.js';

declare type EasingFn = (x: number) => number;
/**
 * Creates an easing based on clock time
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
 * @param amt 'Progress' value passed to the easing functions
 * @param balance Mix between a and b
 * @param easingA
 * @param easingB
 * @returns Numeric value
 */
declare const mix: (amt: number, balance: number, easingA: EasingFn, easingB: EasingFn) => number;
/**
 * Returns a 'crossfade' of two easing functions, synchronised with the progress through the easing. That is:
 * * 0.0 will yield 100% of easingA at its `easing(0)` value.
 * * 0.2 will yield 80% of a, 20% of b, with both at their `easing(0.2)` values
 * * 0.5 will yield 50% of both functions both at their `easing(0.5)` values
 * * 0.8 will yield 20% of a, 80% of a, with both at their `easing(0.8)` values
 * * 1.0 will yield 100% of easingB at its `easing(1)` value.
 *
 * So easingB will only ever kick in at higher `amt` values and `easingA` will only be present in lower valus.
 * @param amt
 * @param easingA
 * @param easingB
 * @returns Numeric value
 */
declare const crossfade: (amt: number, easingA: EasingFn, easingB: EasingFn) => number;
/**
 * @private
 */
declare type EasingName = keyof typeof functions;
/**
 * Returns an easing function by name, or _undefined_ if not found.
 * This is a manual way of working with easing functions. If you want to
 * ease over time or ticks, use `Flow.Timer.msElapsedTimer` or `Flow.Timer.ticksElapsedTimer`.
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
 * Applies a function `fn` to the elements of an array, weighting them based on their relative position.
 *
 * ```js
 * // Six items
 * weight([1,1,1,1,1,1], Easings.gaussian());
 *
 * // Yields:
 * // [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
 * ```
 *
 * `fn` is expected to map (0..1) => (0..1), such as an {@link Modulation.Easings.EasingFn}. The input to the
 * `fn` is the relative position of an element. Thus the first element will be 0, the middle 0.5 and so on.
 * The output of `fn` is then multiplied by the original value.
 *
 * In the below example (which is also the default if `fn` is not specified), the relative position is
 * how values are weighted:
 *
 * ```js
 * weight([1,1,1,1,1,1], (relativePos) => relativePos);
 * // Yields:
 * // [0, 0.2, 0.4, 0.6, 0.8, 1]
 * ```
 *
 * Non-numbers in `data` will be silently ignored (this filtering happens first, so relative index values are sane still).
 *
 * @param data Array of numbers
 * @param fn Returns a weighting based on the given relative position. If unspecified, `(x) => x` is used.
 */
declare const weight: (data: readonly number[], fn?: ((relativePos: number) => number) | undefined) => readonly number[];
/**
 * Returns the dot product of two arbitrary-sized arrays. Assumed they are of the same length.
 * @param a
 * @param b
 * @returns
 */
declare const dotProduct: (values: ReadonlyArray<readonly number[]>) => number;
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
 * Returns the index of the largest value.
 * ```js
 * const v = [ 10, 40, 5 ];
 * maxIndex(v); // Yields 1
 * ```
 * @param data Array of numbers
 * @returns Index of largest value
 */
declare const maxIndex: (...data: readonly number[]) => number;
/**
 * Returns the index of the smallest value.
 *
 * ```js
 * const v = [ 10, 40, 5 ];
 * minIndex(v); // Yields 2
 * ```
 * @param data Array of numbers
 * @returns Index of smallest value
 */
declare const minIndex: (...data: readonly number[]) => number;
/**
 * Returns the maximum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 * @param data List of numbers
 * @returns Maximum number
 */
declare const max: (...data: readonly number[]) => number;
/**
 * Returns the total of `data`.
 * Undefined and non-numbers are silently ignored
 * @param data Array of numbers
 * @returns Total
 */
declare const total: (...data: readonly number[]) => number;
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
 * ```js
 * const v = [10, 2, 4.2, 99];
 * const mma = minMaxAvg(v);
 * Yields: { min: 2, max: 99, total: 115.2, avg: 28.8 }
 * ```
 *
 * Use {@link average}, {@link max}, {@link min} or {@link total} if you only need one of these.
 *
 * A start and end range can be provided if the calculation should be restricted to a part
 * of the input array. By default the whole array is used.
 *
 * @param data
 * @param startIndex If provided, starting index to do calculations (defaults full range)
 * @param endIndex If provided, the end index to do calculations (defaults full range)
 * @returns `{min, max, avg, total}`
 */
declare const minMaxAvg: (data: readonly number[], startIndex?: number, endIndex?: number) => MinMaxAvgTotal;

export { EasingName as E, MinMaxAvgTotal as M, average as a, averageWeighted as b, maxIndex as c, dotProduct as d, minIndex as e, max as f, maxFast as g, minFast as h, minMaxAvg as i, Easing$1 as j, min as m, total as t, weight as w };
