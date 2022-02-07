import { I as IsEqual } from './util-9f4d985a';

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
 * Returns the min, max, avg and total of the array.
 * Any values that are invalid are silently skipped over.
 *
 * Use {@link average} if you only need average
 *
 * @param data
 * @returns `{min, max, avg, total}`
 */
declare const minMaxAvg: (data: readonly number[]) => {
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
 * Functions for working with primitive arrays, regardless of type
 * See Also: NumericArrays.ts
 */

/**
 * Throws an error if `array` parameter is not a valid array
 * @private
 * @param array
 * @param paramName
 */
declare const guardArray: <V>(array: ArrayLike<V>, paramName?: string) => void;
/**
 * Returns a random array index
 * @param array
 * @returns
 */
declare const randomIndex: <V>(array: ArrayLike<V>) => number;
/**
 * Returns random element
 * @param array
 * @returns
 */
declare const randomElement: <V>(array: ArrayLike<V>) => V;
/**
 * Removes a random item from an array, returning both the item and the new array as a result.
 * Does not modify the original array unless `mutate` parameter is true.
 *
 * @example Without changing source
 * ```js
 * const data = [100, 20, 40];
 * const {value, array} = randomPluck(data);
 * // value: 20, array: [100, 40], data: [100, 20, 40];
 * ```
 *
 * @example Mutating source
 * ```js
 * const data = [100, 20, 40];
 * const {value} = randomPluck(data, true);
 * // value: 20, data: [100, 40];
 * ```
 *
 * @template V Type of array
 * @param array Array to pluck item from
 * @param mutate If _true_, changes input array. _False_ by default.
 * @return Returns an object `{value:V|undefined, array:V[]}`
 */
declare const randomPluck: <V>(array: readonly V[], mutate?: boolean) => {
    readonly value: V | undefined;
    readonly array: V[];
};
/**
 * Returns a shuffled copy of the input array.
 * @example
 * ```js
 * const d = [1, 2, 3, 4];
 * const s = shuffle(d);
 * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
 * ```
 * @param dataToShuffle
 * @returns Copy with items moved around randomly
 * @template V Type of array items
 */
declare const shuffle: <V>(dataToShuffle: readonly V[]) => readonly V[];
/**
 * Returns an array with a value omitted. If value is not found, result will be a copy of input.
 * Value checking is completed via the provided `comparer` function, or by default checking whether `a === b`.
 *
 * @example
 * ```js
 * const data = [100, 20, 40];
 * const filtered = without(data, 20); // [100, 40]
 * ```
 * @template V Type of array items
 * @param data Source array
 * @param value Value to remove
 * @param comparer Comparison function. If not provided {@link isEqualDefault} is used, which compares using `===`
 * @return Copy of array without value.
 */
declare const without: <V>(data: readonly V[], value: V, comparer?: IsEqual<V>) => readonly V[];
/**
 * Groups data by a grouper function, returning data as a map with string
 * keys and array values.
 *
 * @example
 * ```js
 * const data = [
 *  { age: 39, city: `London` }
 *  { age: 14, city: `Copenhagen` }
 *  { age: 23, city: `Stockholm` }
 *  { age: 56, city: `London` }
 * ];
 * const map = groupBy(data, item => data.city);
 * ```
 *
 * Returns a map:
 *
 * London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
 * Stockhom: [{ age: 23, city: `Stockholm` }]
 * Copenhagen: [{ age: 14, city: `Copenhagen` }]
 *
 * @param array Array to group
 * @param grouper Function that returns a key for a given item
 * @template K Type of key to group by. Typically string.
 * @template V Type of values
 * @returns Map
 */
declare const groupBy: <K, V>(array: readonly V[], grouper: (item: V) => K) => Map<K, V[]>;

declare const Arrays_guardArray: typeof guardArray;
declare const Arrays_randomIndex: typeof randomIndex;
declare const Arrays_randomElement: typeof randomElement;
declare const Arrays_randomPluck: typeof randomPluck;
declare const Arrays_shuffle: typeof shuffle;
declare const Arrays_without: typeof without;
declare const Arrays_groupBy: typeof groupBy;
declare const Arrays_average: typeof average;
declare const Arrays_minMaxAvg: typeof minMaxAvg;
declare namespace Arrays {
  export {
    Arrays_guardArray as guardArray,
    Arrays_randomIndex as randomIndex,
    Arrays_randomElement as randomElement,
    Arrays_randomPluck as randomPluck,
    Arrays_shuffle as shuffle,
    Arrays_without as without,
    Arrays_groupBy as groupBy,
    Arrays_average as average,
    Arrays_minMaxAvg as minMaxAvg,
  };
}

export { Arrays as A, randomElement as a, randomPluck as b, groupBy as c, average as d, guardArray as g, minMaxAvg as m, randomIndex as r, shuffle as s, without as w };
