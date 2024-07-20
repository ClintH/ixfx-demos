type CompareResult = number;
type Comparer<V> = (a: V, b: V) => CompareResult;
/**
 * Sort numbers in ascending order.
 *
 * ```js
 * [10, 4, 5, 0].sort(numericComparer);
 * // Yields: [0, 4, 5, 10]
 * [10, 4, 5, 0].sort(comparerInverse(numericComparer));
 * // Yields: [ 10, 5, 4, 0]
 * ```
 * @param x
 * @param y
 * @returns
 */
declare const numericComparer: (x: number, y: number) => CompareResult;
/**
 * Default sort comparer, following same sematics as Array.sort.
 * Consider using {@link defaultComparer} to get more logical sorting of numbers.
 *
 * Note: numbers are sorted in alphabetical order, eg:
 * ```js
 * [ 10, 20, 5, 100 ].sort(jsComparer); // same as .sort()
 * // Yields: [10, 100, 20, 5]
 * ```
 * @param x
 * @param y
 * @returns
 */
declare const jsComparer: (x: any, y: any) => CompareResult;
/**
 * Inverts the source comparer.
 * @param comparer
 * @returns
 */
declare const comparerInverse: <V>(comparer: Comparer<V>) => Comparer<V>;
/**
 * Compares numbers by numeric value, otherwise uses the default
 * logic of string comparison.
 *
 * Is an ascending sort:
 *  b, a, c -> a, b, c
 *  10, 5, 100 -> 5, 10, 100
 * @param x
 * @param y
 * @see {@link comparerInverse} Inverted order
 * @returns
 */
declare const defaultComparer: (x: any, y: any) => CompareResult;

export { type CompareResult as C, type Comparer as a, comparerInverse as c, defaultComparer as d, jsComparer as j, numericComparer as n };
