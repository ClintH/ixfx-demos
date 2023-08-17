type MinMaxAvgTotal = {
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
type MinMaxAvgOpts = {
    /**
     * Start index, inclusive
     */
    readonly startIndex?: number;
    /**
     * End index, exclusive
     */
    readonly endIndex?: number;
};
/**
 * Returns the min, max, avg and total of the array or iterable.
 * Any values that are invalid are silently skipped over.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 *
 * const v = [10, 2, 4.2, 99];
 * const mma = Arrays.minMaxAvg(v);
 * Yields: { min: 2, max: 99, total: 115.2, avg: 28.8 }
 * ```
 *
 * Use {@link average}, {@link max}, {@link min} or {@link total} if you only need one of these.
 *
 * A start and end range can be provided if the calculation should be restricted to a part
 * of the input array. By default the whole array is used.
 *
 * It's also possible to use an iterable as input.
 * ```js
 * Arrays.minMaxAvg(count(5,1)); // Averages 1,2,3,4,5
 * ```
 * @param data
 * @param opts Allows restriction of range that is examined
 * @returns `{min, max, avg, total}`
 */
declare const minMaxAvg: (data: readonly number[] | number[] | Iterable<number>, opts?: MinMaxAvgOpts) => MinMaxAvgTotal;

export { MinMaxAvgTotal as M, MinMaxAvgOpts as a, minMaxAvg as m };
