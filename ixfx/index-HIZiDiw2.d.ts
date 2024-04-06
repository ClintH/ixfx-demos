import { T as TrackedValueOpts, N as NumberTracker } from './NumberTracker-H3s2ZmQk.js';
import { J as JitterOpts, a as Jitterer, j as jitter, b as jitterAbsolute, p as pingPong, c as pingPongPercent } from './Jitter-yLvPP3QG.js';
import { a as integer } from './index-GtWXiyi4.js';

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
 * import { count } from 'https://unpkg.com/ixfx/dist/generators.js'
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

declare function average(...values: Array<number>): number;
/**
 * Returns the minimum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
 * Numbers.min(10, 20, 0); // Yields 0
 * ```
 * @param data
 * @returns Minimum number
 */
declare const min: (...data: ReadonlyArray<number>) => number;
/**
 * Returns the maximum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
 * Numbers.max(10, 20, 0); // Yields 20
 * ```
 * @param data
 * @returns Maximum number
 */
declare const max: (...data: ReadonlyArray<number>) => number;
/**
 * Returns the total of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
 * Numbers.total(10, 20, 0); // Yields 30
 * ```
 * @param data
 * @returns Total
 */
declare const total: (...data: ReadonlyArray<number>) => number;

declare function round(decimalPlaces: number, v: number): number;
declare function round(decimalPlaces: number): (v: number) => number;

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
 * Returns true if `possibleNumber` is a number and not NaN
 * @param possibleNumber
 * @returns
 */
declare const isValid: (possibleNumber: unknown) => boolean;

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
 * @param obj
 * @param apply
 * @returns
 */
declare const applyToValues: <T extends Record<string, any>>(object: T, apply: (v: number) => number) => T;
/**
 * Alias for [Data.numberTracker](https://clinth.github.io/ixfx/classes/Data.numberTracker-1.html)
 */
declare const tracker: (options?: TrackedValueOpts) => NumberTracker;
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

declare const index_JitterOpts: typeof JitterOpts;
declare const index_Jitterer: typeof Jitterer;
declare const index_applyToValues: typeof applyToValues;
declare const index_average: typeof average;
declare const index_count: typeof count;
declare const index_filter: typeof filter;
declare const index_isApproximately: typeof isApproximately;
declare const index_isValid: typeof isValid;
declare const index_jitter: typeof jitter;
declare const index_jitterAbsolute: typeof jitterAbsolute;
declare const index_linearSpace: typeof linearSpace;
declare const index_max: typeof max;
declare const index_min: typeof min;
declare const index_numericPercent: typeof numericPercent;
declare const index_numericRange: typeof numericRange;
declare const index_numericRangeRaw: typeof numericRangeRaw;
declare const index_pingPong: typeof pingPong;
declare const index_pingPongPercent: typeof pingPongPercent;
declare const index_quantiseEvery: typeof quantiseEvery;
declare const index_round: typeof round;
declare const index_total: typeof total;
declare const index_tracker: typeof tracker;
declare namespace index {
  export { index_JitterOpts as JitterOpts, index_Jitterer as Jitterer, index_applyToValues as applyToValues, index_average as average, index_count as count, index_filter as filter, index_isApproximately as isApproximately, index_isValid as isValid, index_jitter as jitter, index_jitterAbsolute as jitterAbsolute, index_linearSpace as linearSpace, index_max as max, index_min as min, index_numericPercent as numericPercent, index_numericRange as numericRange, index_numericRangeRaw as numericRangeRaw, index_pingPong as pingPong, index_pingPongPercent as pingPongPercent, index_quantiseEvery as quantiseEvery, integer as randomUniqueInteger, index_round as round, index_total as total, index_tracker as tracker };
}

export { applyToValues as a, numericRange as b, count as c, numericPercent as d, average as e, filter as f, max as g, total as h, index as i, isApproximately as j, isValid as k, linearSpace as l, min as m, numericRangeRaw as n, quantiseEvery as q, round as r, tracker as t };
