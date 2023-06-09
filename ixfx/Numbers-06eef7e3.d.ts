import { T as TrackedValueOpts, N as NumberTracker } from './NumberTracker-ec2c15f9.js';
import { a as EasingFn } from './Easing-452eeb6b.js';

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
declare const average: (...numbers: readonly number[]) => number;
/**
 * See [Arrays.averageWeighted](Collections.Arrays.averageWeighted.html)
 * @param weightings
 * @param numbers
 * @returns
 */
declare const averageWeighted: (weightings: (readonly number[]) | EasingFn, ...numbers: readonly number[]) => number;
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
declare const min: (...data: readonly number[]) => number;
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
declare const max: (...data: readonly number[]) => number;
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
declare const total: (...data: readonly number[]) => number;
/**
 * Returns true if `possibleNumber` is a number and not NaN
 * @param possibleNumber
 * @returns
 */
declare const isValid: (possibleNumber: number | unknown) => boolean;
/**
 * Alias for [Data.numberTracker](Data.numberTracker.html)
 */
declare const tracker: (opts?: TrackedValueOpts) => NumberTracker;
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
 *  // Yields: 1, 2, 3, 4, 5, 6
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
 * Rounds a number to given number of decimal places.
 *
 * If you are reusing the same rounding, consider {@link rounder}.
 * ```js
 * round(10.12345, 2); // 10.12
 * round(10.12345, 1); // 10.1
 * round(10.12345);    // 10
 * ```
 * @param v
 * @param decimalPlaces
 */
declare const round: (v: number, decimalPlaces?: number) => number;
/**
 * Returns a number rounding function
 * ```js
 * const r = rounder(2);
 * r(10.12355); // 10.12
 * ```
 * @param decimalPlaces
 * @returns
 */
declare const rounder: (decimalPlaces?: number) => (x: number) => number;

declare const Numbers_average: typeof average;
declare const Numbers_averageWeighted: typeof averageWeighted;
declare const Numbers_filter: typeof filter;
declare const Numbers_isValid: typeof isValid;
declare const Numbers_linearSpace: typeof linearSpace;
declare const Numbers_max: typeof max;
declare const Numbers_min: typeof min;
declare const Numbers_quantiseEvery: typeof quantiseEvery;
declare const Numbers_round: typeof round;
declare const Numbers_rounder: typeof rounder;
declare const Numbers_total: typeof total;
declare const Numbers_tracker: typeof tracker;
declare namespace Numbers {
  export {
    Numbers_average as average,
    Numbers_averageWeighted as averageWeighted,
    Numbers_filter as filter,
    Numbers_isValid as isValid,
    Numbers_linearSpace as linearSpace,
    Numbers_max as max,
    Numbers_min as min,
    Numbers_quantiseEvery as quantiseEvery,
    Numbers_round as round,
    Numbers_rounder as rounder,
    Numbers_total as total,
    Numbers_tracker as tracker,
  };
}

export { Numbers as N, average as a, averageWeighted as b, max as c, tracker as d, rounder as e, filter as f, isValid as i, linearSpace as l, min as m, quantiseEvery as q, round as r, total as t };
