import { R as RandomSource } from './Types-CR0Pe5zY.js';

/**
 * Returns a random array index.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * const v = [`blue`, `red`, `orange`];
 * Arrays.randomIndex(v); // Yields 0, 1 or 2
 * ```
 *
 * Use {@link randomElement} if you want a value from `array`, not index.
 *
 * @param array Array
 * @param rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomIndex: <V>(array: ArrayLike<V>, rand?: RandomSource) => number;
/**
 * Removes a random item from an array, returning both the item and the new array as a result.
 * Does not modify the original array unless `mutate` parameter is true.
 *
 * @example Without changing source
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * const data = [100, 20, 40];
 * const {value, array} = Arrays.randomPluck(data);
 * // value: 20, array: [100, 40], data: [100, 20, 40];
 * ```
 *
 * @example Mutating source
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * const data = [100, 20, 40];
 * const {value} = Arrays.randomPluck(data, true);
 * // value: 20, data: [100, 40];
 * ```
 *
 * @typeParam V - Type of items in array
 * @param array Array to pluck item from
 * @param mutate If _true_, changes input array. _False_ by default.
 * @param rand Random generatr. `Math.random` by default.
 * @return Returns an object `{value:V|undefined, array:V[]}`
 *
 */
declare const randomPluck: <V>(array: ReadonlyArray<V> | Array<V>, mutate?: boolean, rand?: RandomSource) => {
    readonly value: V | undefined;
    readonly array: Array<V>;
};
/**
 * Returns random element.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * const v = [`blue`, `red`, `orange`];
 * Arrays.randomElement(v); // Yields `blue`, `red` or `orange`
 * ```
 *
 * Use {@link randomIndex} if you want a random index within `array`.
 *
 * @param array
 * @param rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomElement: <V>(array: ArrayLike<V>, rand?: RandomSource) => V;
/**
 * Selects a random array index, biased by the provided `weightings`.
 *
 * In the below example, `a` will be picked 20% of the time, `b` 50% and so on.
 * ```js
 * const data =    [  `a`,  `b`,  `c`,  `d` ]
 * const weights = [ 0.2,  0.5,  0.1,  0.2 ]
 * ```
 * @param array
 * @param weightings
 * @param randomSource
 */
declare const randomElementWeightedSource: <V>(array: ArrayLike<V>, weightings: Array<number>, randomSource?: RandomSource) => () => V;
/**
 * Returns a shuffled copy of the input array.
 * @example
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * const d = [1, 2, 3, 4];
 * const s = Arrays.shuffle(d);
 * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
 * ```
 * @param dataToShuffle
 * @param rand Random generator. `Math.random` by default.
 * @returns Copy with items moved around randomly
 * @typeParam V - Type of array items
 */
declare const shuffle: <V>(dataToShuffle: ReadonlyArray<V>, rand?: RandomSource) => Array<V>;

export { randomIndex as a, randomElementWeightedSource as b, randomPluck as c, randomElement as r, shuffle as s };
