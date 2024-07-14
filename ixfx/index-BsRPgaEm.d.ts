import { T as TrackedValueOpts, N as NumberTracker } from './NumberTracker-YxkFQGX5.js';
import { m as minMaxAvg } from './MinMaxAvg-2uOg6Bd4.js';
import { a as MinMaxAvgOpts, M as MinMaxAvgTotal } from './Types-S_XFjbWq.js';
import { J as JitterOpts, a as Jitterer, j as jitter, b as jitterAbsolute, p as pingPong, c as pingPongPercent } from './Jitter-Ue5L368Z.js';
import { i as integer, b as integerUniqueGen } from './Integer-RRpbU78-.js';

/**
 * Apples `fn` to every key of `obj` which is numeric.
 * ```js
 * const o = {
 *  name: 'john',
 *  x: 10,
 *  y: 20
 * };
 * const o2 = applyToValues(o, (v) => v * 2);
 *
 * // Yields: { name: 'john', x: 20, y: 40 }
 * ```
 * @param object
 * @param apply
 * @returns
 */
declare const applyToValues: <T extends Record<string, any>>(object: T, apply: (v: number) => number) => T;

/**
 * Computes an average of an array with a set of weights applied.
 *
 * Weights can be provided as an array, expected to be on 0..1 scale, with indexes
 * matched up to input data. Ie. data at index 2 will be weighed by index 2 in the weightings array.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * // All items weighted evenly
 * Arrays.averageWeighted([1,2,3], [1,1,1]); // 2
 *
 * // First item has full weight, second half, third quarter
 * Arrays.averageWeighted([1,2,3], [1, 0.5, 0.25]); // 1.57
 *
 * // With reversed weighting of [0.25,0.5,1] value is 2.42
 * ```
 *
 * A function can alternatively be provided to compute the weighting based on array index, via {@link weight}.
 *
 * ```js
 * Arrays.averageWeighted[1,2,3], Easings.gaussian()); // 2.0
 * ```
 *
 * This is the same as:
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * import { Easings } from 'https://unpkg.com/ixfx/dist/modulation.js';
 *
 * const data = [1,2,3];
 * const w = Arrays.weight(data, Easings.gaussian());
 * const avg = Arrays.averageWeighted(data, w); // 2.0
 * ```
 * @param data Data to average
 * @param weightings Array of weightings that match up to data array, or an easing function
 */
declare const averageWeighted: (data: Array<number> | ReadonlyArray<number>, weightings: Array<number> | ReadonlyArray<number> | ((value: number) => number)) => number;

/**
 * Yields `amount` integers, counting by one from zero. If a negative amount is used,
 * count decreases. If `offset` is provided, this is added to the return result.
 * @example
 * ```js
 * const a = [...count(5)]; // Yields five numbers: [0,1,2,3,4]
 * const b = [...count(-5)]; // Yields five numbers: [0,-1,-2,-3,-4]
 * for (const v of count(5, 5)) {
 *  // Yields: 5, 6, 7, 8, 9
 * }
 * const c = [...count(5,1)]; // Yields [1,2,3,4,5]
 * ```
 *
 * @example Used with forEach
 * ```js
 * // Prints `Hi` 5x
 * forEach(count(5), () => // do something);
 * ```
 *
 * If you want to accumulate return values, consider using Flow.repeat.
 *
 * @example Run some code every 100ms, 10 times:
 * ```js
 * import { interval } from 'https://unpkg.com/ixfx/dist/flow.js'
 * import { count } from 'https://unpkg.com/ixfx/dist/numbers.js'
 * const counter = count(10);
 * for await (const v of interval(counter, { fixedIntervalMs: 100 })) {
 *  // Do something
 * }
 * ```
 * @param amount Number of integers to yield
 * @param offset Added to result
 */
declare function count(amount: number, offset?: number): Generator<number, void, void>;

/**
 * Filters an iterator of values, only yielding
 * those that are valid numbers
 *
 * ```js
 * import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
 *
 * const data = [true, 10, '5', { x: 5 }];
 * for (const n of Numbers.filter(data)) {
 *  // 5
 * }
 * ```
 * @param it
 */
declare function filter(it: Iterable<unknown>): Generator<unknown, void, unknown>;

/**
 * Generates a range of numbers, starting from `start` and counting by `interval`.
 * If `end` is provided, generator stops when reached.
 *
 * Unlike {@link numericRange}, numbers might contain rounding errors
 *
 * ```js
 * for (const c of numericRangeRaw(10, 100)) {
 *  // 100, 110, 120 ...
 * }
 * ```
 * @param interval Interval between numbers
 * @param start Start
 * @param end End (if undefined, range never ends)
 */
declare const numericRangeRaw: (interval: number, start?: number, end?: number, repeating?: boolean) => Generator<number, void, unknown>;
/**
 * Generates a range of numbers, with a given interval.
 *
 * @example For-loop
 * ```
 * let loopForever = numericRange(0.1); // By default starts at 0 and counts upwards forever
 * for (v of loopForever) {
 *  console.log(v);
 * }
 * ```
 *
 * @example If you want more control over when/where incrementing happens...
 * ```js
 * let percent = numericRange(0.1, 0, 1);
 *
 * let percentResult = percent.next().value;
 * ```
 *
 * Note that computations are internally rounded to avoid floating point math issues. So if the `interval` is very small (eg thousandths), specify a higher rounding
 * number.
 *
 * @param interval Interval between numbers
 * @param start Start. Defaults to 0
 * @param end End (if undefined, range never ends)
 * @param repeating Range loops from start indefinately. Default _false_
 * @param rounding A rounding that matches the interval avoids floating-point math hikinks. Eg if the interval is 0.1, use a rounding of 10
 */
declare const numericRange: (interval: number, start?: number, end?: number, repeating?: boolean, rounding?: number) => Generator<number, void, unknown>;
/**
 * Yields numeric range between 0.0-1.0.
 *
 * ```
 * // Yields: [0, 0.2, 0.4, 0.6, 0.8, 1]
 * const a = [...numericPercent(0.2)];
 *
 * // Repeating flag set to true:
 * for (const v of numericPercent(0.2, true)) {
 *  // Infinite loop. V loops back to 0 after hitting 1
 * }
 * ```
 *
 * If `repeating` is true, it loops back to 0 after reaching 1
 * @param interval Interval (default: 0.01, ie. 1%)
 * @param repeating Whether generator should loop (default: false)
 * @param start Start (default: 0)
 * @param end End (default: 1)
 * @returns
 */
declare const numericPercent: (interval?: number, repeating?: boolean, start?: number, end?: number) => Generator<number, void, unknown>;

/**
 * Returns true if `possibleNumber` is a number and not NaN
 * @param possibleNumber
 * @returns
 */
declare const isValid: (possibleNumber: unknown) => boolean;

declare function isApproximately(baseValue: number, rangePercent: number): (v: number) => boolean;
declare function isApproximately(baseValue: number, rangePercent: number, v: number): boolean;

/**
 * Generates a `step`-length series of values between `start` and `end` (inclusive).
 * Each value will be equally spaced.
 *
 * ```js
 * for (const v of linearSpace(1, 5, 6)) {
 *  // Yields: [ 1, 1.8, 2.6, 3.4, 4.2, 5 ]
 * }
 * ```
 *
 * Numbers can be produced from large to small as well
 * ```js
 * const values = [...linearSpace(10, 5, 3)];
 * // Yields: [10, 7.5, 5]
 * ```
 * @param start Start number (inclusive)
 * @param end  End number (inclusive)
 * @param steps How many steps to make from start -> end
 * @param precision Number of decimal points to round to
 */
declare function linearSpace(start: number, end: number, steps: number, precision?: number): IterableIterator<number>;

/**
 * Applies a function `fn` to the elements of an array, weighting them based on their relative position.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 *
 * // Six items
 * Arrays.weight([1,1,1,1,1,1], Easings.gaussian());
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
 * Arrays.weight([1,1,1,1,1,1], (relativePos) => relativePos);
 * // Yields:
 * // [0, 0.2, 0.4, 0.6, 0.8, 1]
 * ```
 *
 * Non-numbers in `data` will be silently ignored (this filtering happens first, so relative index values are sane still).
 *
 * @param data Array of numbers
 * @param fn Returns a weighting based on the given relative position. If unspecified, `(x) => x` is used.
 */
declare const weight: (data: Array<number> | ReadonlyArray<number>, fn?: (relativePos: number) => number) => Array<number>;
/**
 * Returns an array of all valid numbers from `data`
 *
 * @param data
 * @returns
 */
declare const validNumbers: (data: ReadonlyArray<number>) => number[];
/**
 * Returns the dot product of two arbitrary-sized arrays. Assumed they are of the same length.
 * @param a
 * @param b
 * @returns
 */
declare const dotProduct: (values: ReadonlyArray<ReadonlyArray<number>>) => number;
/**
 * Calculates the average of all numbers in an array.
 * Array items which aren't a valid number are ignored and do not factor into averaging.
 *
 * Use {@link minMaxAvg} if you want min, max and total as well.
 *
 * @example
 * ```
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 *
 * // Average of a list
 * const avg = Arrays.average([1, 1.4, 0.9, 0.1]);
 *
 * // Average of a variable
 * let data = [100,200];
 * Arrays.average(data);
 * ```
 *
 * See also: [Numbers.average](Numbers.average.html) which takes a list of parameters
 * @param data Data to average.
 * @returns Average of array
 */
declare const average: (data: ReadonlyArray<number>) => number;
/**
 * Returns the minimum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.min([10, 20, 0]); // Yields 0
 * ```
 * @param data
 * @returns Minimum number
 */
declare const min: (data: ReadonlyArray<number>) => number;
/**
 * Returns the index of the largest value.
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * const v = [ 10, 40, 5 ];
 * Arrays.maxIndex(v); // Yields 1
 * ```
 * @param data Array of numbers
 * @returns Index of largest value
 */
declare const maxIndex: (data: ReadonlyArray<number>) => number;
/**
 * Returns the index of the smallest value.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * const v = [ 10, 40, 5 ];
 * Arrays.minIndex(v); // Yields 2
 * ```
 * @param data Array of numbers
 * @returns Index of smallest value
 */
declare const minIndex: (...data: ReadonlyArray<number>) => number;
/**
 * Returns the maximum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.max(100, 200, 50); // 200
 * ```
 * @param data List of numbers
 * @returns Maximum number
 */
declare const max: (data: ReadonlyArray<number>) => number;
/**
 * Returns the total of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.total([1, 2, 3]); // 6
 * ```
 * @param data Array of numbers
 * @returns Total
 */
declare const total: (data: ReadonlyArray<number>) => number;
/**
 * Returns the maximum out of `data` without pre-filtering for speed.
 *
 * For most uses, {@link max} should suffice.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.maxFast([ 10, 0, 4 ]); // 10
 * ```
 * @param data
 * @returns Maximum
 */
declare const maxFast: (data: ReadonlyArray<number> | Float32Array) => number;
/**
 * Returns the total of `data` without pre-filtering for speed.
 *
 * For most uses, {@link total} should suffice.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.totalFast([ 10, 0, 4 ]); // 14
 * ```
 * @param data
 * @returns Maximum
 */
declare const totalFast: (data: ReadonlyArray<number> | Float32Array) => number;
/**
 * Returns the maximum out of `data` without pre-filtering for speed.
 *
 * For most uses, {@link max} should suffice.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.minFast([ 10, 0, 100 ]); // 0
 * ```
 * @param data
 * @returns Maximum
 */
declare const minFast: (data: ReadonlyArray<number> | Float32Array) => number;

/**
 * Rounds `v` by `every`. Middle values are rounded up by default.
 *
 * ```js
 * quantiseEvery(11, 10);  // 10
 * quantiseEvery(25, 10);  // 30
 * quantiseEvery(0, 10);   // 0
 * quantiseEvery(4, 10);   // 0
 * quantiseEvery(100, 10); // 100
 * ```
 *
 * @param v
 * @param every
 * @param middleRoundsUp
 * @returns
 */
declare const quantiseEvery: (v: number, every: number, middleRoundsUp?: boolean) => number;

/**
 * Returns the relative difference from the `initial` value
 * ```js
 * const rel = relativeDifference(100);
 * rel(100); // 1
 * rel(150); // 1.5
 * rel(50);  // 0.5
 * ```
 *
 * The code for this is simple:
 * ```js
 * const relativeDifference = (initial) => (v) => v/initial
 * ```
 * @param {number} initial
 * @returns
 */
declare const relativeDifference: (initial: number) => (v: number) => number;

declare function round(decimalPlaces: number, v: number): number;
declare function round(decimalPlaces: number): (v: number) => number;
/**
 * Rounds `v` up to the nearest multiple of `multiple`
 * ```
 * roundMultiple(19, 20); // 20
 * roundMultiple(21, 20); // 40
 * ```
 * @param v
 * @param multiple
 * @returns
 */
declare const roundUpToMultiple: (v: number, multiple: number) => number;

/**
 * Alias for [Data.numberTracker](https://clinth.github.io/ixfx/classes/Data.numberTracker-1.html)
 */
declare const tracker: (options?: TrackedValueOpts) => NumberTracker;

declare const index_JitterOpts: typeof JitterOpts;
declare const index_Jitterer: typeof Jitterer;
declare const index_MinMaxAvgOpts: typeof MinMaxAvgOpts;
declare const index_MinMaxAvgTotal: typeof MinMaxAvgTotal;
declare const index_applyToValues: typeof applyToValues;
declare const index_average: typeof average;
declare const index_averageWeighted: typeof averageWeighted;
declare const index_count: typeof count;
declare const index_dotProduct: typeof dotProduct;
declare const index_filter: typeof filter;
declare const index_isApproximately: typeof isApproximately;
declare const index_isValid: typeof isValid;
declare const index_jitter: typeof jitter;
declare const index_jitterAbsolute: typeof jitterAbsolute;
declare const index_linearSpace: typeof linearSpace;
declare const index_max: typeof max;
declare const index_maxFast: typeof maxFast;
declare const index_maxIndex: typeof maxIndex;
declare const index_min: typeof min;
declare const index_minFast: typeof minFast;
declare const index_minIndex: typeof minIndex;
declare const index_minMaxAvg: typeof minMaxAvg;
declare const index_numericPercent: typeof numericPercent;
declare const index_numericRange: typeof numericRange;
declare const index_numericRangeRaw: typeof numericRangeRaw;
declare const index_pingPong: typeof pingPong;
declare const index_pingPongPercent: typeof pingPongPercent;
declare const index_quantiseEvery: typeof quantiseEvery;
declare const index_relativeDifference: typeof relativeDifference;
declare const index_round: typeof round;
declare const index_roundUpToMultiple: typeof roundUpToMultiple;
declare const index_total: typeof total;
declare const index_totalFast: typeof totalFast;
declare const index_tracker: typeof tracker;
declare const index_validNumbers: typeof validNumbers;
declare const index_weight: typeof weight;
declare namespace index {
  export { index_JitterOpts as JitterOpts, index_Jitterer as Jitterer, index_MinMaxAvgOpts as MinMaxAvgOpts, index_MinMaxAvgTotal as MinMaxAvgTotal, index_applyToValues as applyToValues, index_average as average, index_averageWeighted as averageWeighted, index_count as count, index_dotProduct as dotProduct, index_filter as filter, index_isApproximately as isApproximately, index_isValid as isValid, index_jitter as jitter, index_jitterAbsolute as jitterAbsolute, index_linearSpace as linearSpace, index_max as max, index_maxFast as maxFast, index_maxIndex as maxIndex, index_min as min, index_minFast as minFast, index_minIndex as minIndex, index_minMaxAvg as minMaxAvg, index_numericPercent as numericPercent, index_numericRange as numericRange, index_numericRangeRaw as numericRangeRaw, index_pingPong as pingPong, index_pingPongPercent as pingPongPercent, index_quantiseEvery as quantiseEvery, integer as randomInteger, integerUniqueGen as randomUniqueInteger, index_relativeDifference as relativeDifference, index_round as round, index_roundUpToMultiple as roundUpToMultiple, index_total as total, index_totalFast as totalFast, index_tracker as tracker, index_validNumbers as validNumbers, index_weight as weight };
}

export { round as A, roundUpToMultiple as B, applyToValues as a, averageWeighted as b, count as c, numericRange as d, numericPercent as e, filter as f, isValid as g, isApproximately as h, index as i, dotProduct as j, average as k, linearSpace as l, min as m, numericRangeRaw as n, maxIndex as o, minIndex as p, max as q, total as r, maxFast as s, tracker as t, totalFast as u, validNumbers as v, weight as w, minFast as x, quantiseEvery as y, relativeDifference as z };
