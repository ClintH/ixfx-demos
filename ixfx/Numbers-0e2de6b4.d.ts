import { T as TrackedValueOpts, N as NumberTracker } from './NumberTracker-42223a66.js';
import { c as EasingFn } from './Arrays-3bce8efa.js';

/**
 * Calculates the average of all numbers in an array.
 * Array items which aren't a valid number are ignored and do not factor into averaging.

 * @example
 * ```
 * import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
 *
 * // Average of a list
 * const avg = Numbers.average(1, 1.4, 0.9, 0.1);
 *
 * // Average of a variable
 * let data = [100,200];
 * Numbers.average(...data);
 * ```
 *
 * See also: [Arrays.average](Collections.Arrays.average.html) which takes an array.
 * @param data Data to average.
 * @returns Average of array
 */
declare const average: (...numbers: ReadonlyArray<number>) => number;
/**
 * See [Arrays.averageWeighted](Collections.Arrays.averageWeighted.html)
 * @param weightings
 * @param numbers
 * @returns
 */
declare const averageWeighted: (weightings: ReadonlyArray<number> | EasingFn, ...numbers: ReadonlyArray<number>) => number;
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
/**
 * Returns true if `possibleNumber` is a number and not NaN
 * @param possibleNumber
 * @returns
 */
declare const isValid: (possibleNumber: unknown) => boolean;
/**
 * Alias for [Data.numberTracker](Data.numberTracker.html)
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
declare function round(decimalPlaces: number, v: number): number;
declare function round(decimalPlaces: number): (v: number) => number;
declare function isApproximately(baseValue: number, rangePercent: number): (v: number) => boolean;
declare function isApproximately(baseValue: number, rangePercent: number, v: number): boolean;

declare const Numbers_applyToValues: typeof applyToValues;
declare const Numbers_average: typeof average;
declare const Numbers_averageWeighted: typeof averageWeighted;
declare const Numbers_filter: typeof filter;
declare const Numbers_isApproximately: typeof isApproximately;
declare const Numbers_isValid: typeof isValid;
declare const Numbers_linearSpace: typeof linearSpace;
declare const Numbers_max: typeof max;
declare const Numbers_min: typeof min;
declare const Numbers_quantiseEvery: typeof quantiseEvery;
declare const Numbers_round: typeof round;
declare const Numbers_total: typeof total;
declare const Numbers_tracker: typeof tracker;
declare namespace Numbers {
  export {
    Numbers_applyToValues as applyToValues,
    Numbers_average as average,
    Numbers_averageWeighted as averageWeighted,
    Numbers_filter as filter,
    Numbers_isApproximately as isApproximately,
    Numbers_isValid as isValid,
    Numbers_linearSpace as linearSpace,
    Numbers_max as max,
    Numbers_min as min,
    Numbers_quantiseEvery as quantiseEvery,
    Numbers_round as round,
    Numbers_total as total,
    Numbers_tracker as tracker,
  };
}

export { Numbers as N, average as a, averageWeighted as b, applyToValues as c, max as d, tracker as e, filter as f, isApproximately as g, isValid as i, linearSpace as l, min as m, quantiseEvery as q, round as r, total as t };
