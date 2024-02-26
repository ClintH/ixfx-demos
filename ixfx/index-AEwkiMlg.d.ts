import { T as ToString } from './Util-Voz0dRxX.js';
import { I as IsEqual } from './IsEqual-FYvx3mfi.js';
import { R as RandomSource } from './Types-ATA4eXqe.js';
import { a as MinMaxAvgOpts, M as MinMaxAvgTotal, m as minMaxAvg } from './MinMaxAvg-X_wBRrCz.js';

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
declare const weight: (data: Array<number> | ReadonlyArray<number>, fn?: ((relativePos: number) => number) | undefined) => Array<number>;
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
declare const min$1: (data: ReadonlyArray<number>) => number;
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
declare const max$1: (data: ReadonlyArray<number>) => number;
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
 * Cycle through the contents of an array. By default starts at index 0.
 * ```js
 * const c = arrayCycle([`apples`, `oranges`, `pears`]);
 * c.current; // `apples`
 * c.next();  // `oranges`
 * c.next();  // `pears`
 * c.next();  // `apples`
 * c.prev();  // `pears`
 * ```
 *
 * You can select an item by index or value:
 * ```
 * c.select(1); // `oranges`
 * c.select(`pears`); // `pears`
 * ```
 *
 * Other features:
 * ```js
 * c.current;   // Current value
 * c.toArray(); // Copy of array being cycled over
 * ```
 *
 * Additional info:
 * * Selecting by value uses === semantics.
 * * Works with a copy of input array
 * @param options Array to cycle over
 * @returns
 */
declare const cycle: <T>(options: readonly T[] | T[]) => {
    toArray: () => T[];
    next: () => T;
    prev: () => T;
    readonly current: T;
    select: (indexOrValue: number | T) => void;
};

/**
 * Return elements from `array` that match a given `predicate`, and moreover are between
 * the given `startIndex` (inclusive) and `endIndex` (exclusive).
 *
 * While this can be done with in the in-built `array.filter` function, it will
 * needlessly iterate through the whole array. It also avoids another alternative
 * of slicing the array before using `filter`.
 *
 * ```js
 * import { filterBetween } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * // Return 'registered' people between and including array indexes 5-10
 * const filtered = filterBetween(people, person => person.registered, 5, 10);
 * ```
 * @param array Array to filter
 * @param predicate Filter function
 * @param startIndex Start index (defaults to 0)
 * @param endIndex End index (by default runs until end)
 */
declare const filterBetween: <V>(array: readonly V[] | V[], predicate: (value: V, index: number, array: readonly V[] | V[]) => boolean, startIndex?: number, endIndex?: number) => V[];

/**
 * Throws an error if `array` parameter is not a valid array
 *
 * ```js
 * import { guardArray } from 'https://unpkg.com/ixfx/dist/arrays.js';
 * guardArray(someVariable);
 * ```
 * @private
 * @param array
 * @param name
 */
declare const guardArray: <V>(array: ArrayLike<V>, name?: string) => void;

/**
 * Throws if `index` is an invalid array index for `array`, and if
 * `array` itself is not a valid array.
 * @param array
 * @param index
 */
declare const guardIndex: <V>(array: ArrayLike<V>, index: number, name?: string) => void;

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
declare const averageWeighted: (data: Array<number> | ReadonlyArray<number>, weightings: number[] | readonly number[] | ((value: number) => number)) => number;

/**
 * Zip combines the elements of two or more arrays based on their index.
 *
 * ```js
 * import { zip } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const a = [1,2,3];
 * const b = [`red`, `blue`, `green`];
 *
 * const c = zip(a, b);
 * // Yields:
 * // [
 * //   [1, `red`],
 * //   [2, `blue`],
 * //   [3, `green`]
 * // ]
 * ```
 *
 * Typically the arrays you zip together are all about the same logical item. Eg, in the above example
 * perhaps `a` is size and `b` is colour. So thing #1 (at array index 0) is a red thing of size 1. Before
 * zipping we'd access it by `a[0]` and `b[0]`. After zipping, we'd have c[0], which is array of [1, `red`].
 * @param arrays
 * @returns Zipped together array
 */
declare const zip: (...arrays: Array<Array<any>> | ReadonlyArray<Array<any>> | ReadonlyArray<ReadonlyArray<any>>) => Array<any>;

/**
 * Returns _true_ if the contents of the array are all the same.
 * Uses value-based equality checking by default.
 *
 * @example Uses default equality function:
 * ```js
 * import { valuesEqual } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const a1 = [ 10, 10, 10 ];
 * valuesEqual(a1); // True
 *
 * const a2 = [ { name:`Jane` }, { name:`John` } ];
 * valuesEqual(a2); // True, even though object references are different
 * ```
 *
 * If we want to compare by value for objects that aren't readily
 * converted to JSON, you need to provide a function:
 *
 * ```js
 * valuesEqual(someArray, (a, b) => {
 *  return (a.eventType === b.eventType);
 * });
 * ```
 *
 * Returns _true_ if `array` is empty.
 * @param array Array
 * @param equality Equality checker. Uses string-conversion checking by default
 * @returns
 */
declare const valuesEqual: <V>(array: readonly V[] | V[], equality?: IsEqual<V> | undefined) => boolean;

/**
 * Sorts an array of objects in ascending order
 * by the given property name, assuming it is a number.
 *
 * ```js
 * const data = [
 *  { size: 10, colour: `red` },
 *  { size: 20, colour: `blue` },
 *  { size: 5, colour: `pink` }
 * ];
 * const sorted = Arrays.sortByNumericProperty(data, `size`);
 *
 * Yields items ascending order:
 * [ { size: 5, colour: `pink` }, { size: 10, colour: `red` }, { size: 20, colour: `blue` } ]
 * ```
 * @param data
 * @param propertyName
 */
declare const sortByNumericProperty: <V, K extends keyof V>(data: readonly V[] | V[], propertyName: K) => V[];

declare const max: <V>(iterable: Iterable<V>, scorer: (v: V) => number) => V | undefined;
declare const min: <V>(iterable: Iterable<V>, scorer: (v: V) => number) => V | undefined;
/**
 * Returns _true_ if all values in iterables are equal, regardless
 * of their position. Uses === equality semantics by default.
 *
 * @example Default equality checking
 * ```js
 * const a = ['apples','oranges','pears'];
 * const b = ['pears','oranges','apples'];
 * compareValuesEqual(a, b); // True
 * ```
 *
 * @example Custom equality checking
 * ```js
 * const a = [ { name: 'John' }];
 * const b = [ { name: 'John' }];
 * // False, since object identies are different
 * compareValuesEqual(a, b);
 * // True, since now we're comparing by value
 * compareValuesEqual(a, b, (aa,bb) => aa.name === bb.name);
 * ```
 * @param arrays
 * @param eq
 */
declare const compareValuesEqual: <V>(iterableA: Iterable<V>, iterableB: Iterable<V>, eq?: (a: V, b: V) => boolean) => boolean;
/**
 * Compares the values of two iterables, returning a list
 * of items they have in common, and those unique in `a` or `b`.
 *
 * ```js
 * const a = ['apples', 'oranges', 'pears' ]
 * const b = ['pears', 'kiwis', 'bananas' ];
 *
 * const r = compareValues(a, b);
 * r.shared;  // [ 'pears' ]
 * r.a;       // [ 'apples', 'oranges' ]
 * r.b;       // [ 'kiwis', 'bananas' ]
 * ```
 * @param a
 * @param b
 * @param eq
 * @returns
 */
declare const compareValues: <V>(a: Iterable<V>, b: Iterable<V>, eq?: (a: V, b: V) => boolean) => {
    shared: V[];
    a: V[];
    b: V[];
};

declare const Iterables_compareValues: typeof compareValues;
declare const Iterables_compareValuesEqual: typeof compareValuesEqual;
declare const Iterables_max: typeof max;
declare const Iterables_min: typeof min;
declare namespace Iterables {
  export { Iterables_compareValues as compareValues, Iterables_compareValuesEqual as compareValuesEqual, Iterables_max as max, Iterables_min as min };
}

/**
 * Functions for working with primitive arrays, regardless of type
 * See Also: NumericArrays.ts
 */

/**
 * Returns the _intersection_ of two arrays: the elements that are in common.
 *
 * ```js
 * intersection([1, 2, 3], [2, 4, 6]);
// returns [2]
 * ```
 * See also:
 * * {@link unique}: Unique set of items amongst one or more arrays
 * @param arrayA
 * @param arrayB
 * @param equality
 * @returns
 */
declare const intersection: <V>(arrayA: readonly V[] | V[], arrayB: readonly V[] | V[], equality?: IsEqual<V>) => V[];
/**
 * Returns a 'flattened' copy of array, un-nesting arrays one level
 * ```js
 * flatten([1, [2, 3], [[4]] ]);
 * // Yields: [ 1, 2, 3, [4]];
 * ```
 * @param array
 * @returns
 */
declare const flatten: (array: ReadonlyArray<any> | Array<any>) => Array<any>;
/**
 * Returns an interleaving of two or more arrays. All arrays must be the same length.
 *
 * ```js
 * import { interleave } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const a = [`a`, `b`, `c`];
 * const b = [`1`, `2`, `3`];
 * const c = interleave(a, b);
 * // Yields:
 * // [`a`, `1`, `b`, `2`, `c`, `3`]
 * ```
 * @param arrays
 * @returns
 */
declare const interleave: <V>(...arrays: readonly (readonly V[])[] | V[][]) => V[];
/**
 * Returns a copy of `data` with specified length.
 * If the input array is too long, it is truncated.
 *
 * If the input array is too short, it will be expanded based on the `expand` strategy:
 *  - 'undefined': fill with `undefined`
 *  - 'repeat': repeat array elements, starting from position 0
 *  - 'first': repeat with first element from `data`
 *  - 'last': repeat with last element from `data`
 *
 * ```js
 * import { ensureLength } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * ensureLength([1,2,3], 2); // [1,2]
 * ensureLength([1,2,3], 5, `undefined`); // [1,2,3,undefined,undefined]
 * ensureLength([1,2,3], 5, `repeat`);    // [1,2,3,1,2]
 * ensureLength([1,2,3], 5, `first`);     // [1,2,3,1,1]
 * ensureLength([1,2,3], 5, `last`);      // [1,2,3,3,3]
 * ```
 * @param data Input array to expand
 * @param length Desired length
 * @param expand Expand strategy
 * @typeParam V Type of array
 */
declare const ensureLength: <V>(data: readonly V[] | V[], length: number, expand?: `undefined` | `repeat` | `first` | `last`) => V[];
/**
 * Returns a random array index.
 *
 * ```js
 * import { randomIndex } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const v = [`blue`, `red`, `orange`];
 * randomIndex(v); // Yields 0, 1 or 2
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
 * Returns random element.
 *
 * ```js
 * import { randomElement } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const v = [`blue`, `red`, `orange`];
 * randomElement(v); // Yields `blue`, `red` or `orange`
 * ```
 *
 * Use {@link randomIndex} if you want a random index within `array`.
 *
 * @param array
 * @params rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomElement: <V>(array: ArrayLike<V>, rand?: RandomSource) => V;
/**
 * Removes a random item from an array, returning both the item and the new array as a result.
 * Does not modify the original array unless `mutate` parameter is true.
 *
 * @example Without changing source
 * ```js
 * import { randomPluck } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [100, 20, 40];
 * const {value, array} = randomPluck(data);
 * // value: 20, array: [100, 40], data: [100, 20, 40];
 * ```
 *
 * @example Mutating source
 * ```js
 * import { randomPluck } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [100, 20, 40];
 * const {value} = randomPluck(data, true);
 * // value: 20, data: [100, 40];
 * ```
 *
 * @template V Type of array
 * @param array Array to pluck item from
 * @param mutate If _true_, changes input array. _False_ by default.
 * @param random Random generatr. `Math.random` by default.
 * @return Returns an object `{value:V|undefined, array:V[]}`
 *
 */
declare const randomPluck: <V>(array: readonly V[] | V[], mutate?: boolean, rand?: RandomSource) => {
    readonly value: V | undefined;
    readonly array: V[];
};
/**
 * Returns a shuffled copy of the input array.
 * @example
 * ```js
 * import { shuffle } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const d = [1, 2, 3, 4];
 * const s = shuffle(d);
 * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
 * ```
 * @param dataToShuffle
 * @param rand Random generator. `Math.random` by default.
 * @returns Copy with items moved around randomly
 * @template V Type of array items
 */
declare const shuffle: <V>(dataToShuffle: readonly V[], rand?: RandomSource) => V[];
/**
 * Returns an array with value(s) omitted. If value is not found, result will be a copy of input.
 * Value checking is completed via the provided `comparer` function.
 * By default checking whether `a === b`. To compare based on value, use the `isEqualValueDefault` comparer.
 *
 * @example
 * ```js
 * import { without } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [100, 20, 40];
 * const filtered = without(data, 20); // [100, 40]
 * ```
 *
 * @example Using value-based comparison
 * ```js
 * import { without } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [{name: `Alice`}, {name:`Sam`}];
 *
 * // This wouldn't work as expected, because the default comparer uses instance,
 * // not value:
 * without(data, {name: `Alice`});
 *
 * // So instead we can use a value comparer:
 * without(data, {name:`Alice`}, isEqualValueDefault);
 * ```
 *
 * @example Use a function
 * ```js
 * import { without } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [{name: `Alice`}, {name:`Sam`}];
 * without(data, {name:`ALICE`}, (a, b) => {
 *  return (a.name.toLowerCase() === b.name.toLowerCase());
 * });
 * ```
 *
 * Consider {@link remove} to remove an item by index.
 *
 * @template V Type of array items
 * @param sourceArray Source array
 * @param toRemove Value(s) to remove
 * @param comparer Comparison function. If not provided `Util.isEqualDefault` is used, which compares using `===`
 * @return Copy of array without value.
 */
declare const without: <V>(sourceArray: readonly V[] | V[], toRemove: V | V[], comparer?: IsEqual<V>) => V[];
declare const withoutUndefined: <V>(data: readonly V[] | V[]) => V[];
/**
 * Returns all items in `data` for as long as `predicate` returns true.
 *
 * `predicate` returns an array of `[stop:boolean, acc:A]`. The first value
 * is _true_ when the iteration should stop, and the `acc` is the accumulated value.
 * This allows `until` to be used to carry over some state from item to item.
 *
 * @example Stop when we hit an item with value of 3
 * ```js
 * const v = Arrays.until([1,2,3,4,5], v => [v === 3, 0]);
 * // [ 1, 2 ]
 * ```
 *
 * @example Stop when we reach a total
 * ```js
 * // Stop when accumulated value reaches 6
 * const v = Arrays.until[1,2,3,4,5], (v, acc) => [acc >= 7, v+acc], 0);
 * // [1, 2, 3]
 * ```
 * @param data
 * @param predicate
 * @returns
 */
declare const until: <V, A>(data: readonly V[] | V[], predicate: (v: V, accumulator: A) => readonly [stop: boolean, acc: A], initial: A) => V[];
/**
 * Removes an element at `index` index from `data`, returning the resulting array without modifying the original.
 *
 * ```js
 * import { remove } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const v = [ 100, 20, 50 ];
 * const vv = remove(2);
 *
 * Yields:
 *  v: [ 100, 20, 50 ]
 * vv: [ 100, 20 ]
 * ```
 *
 * Consider {@link without} if you want to remove an item by value.
 *
 * Throws an exception if `index` is outside the range of `data` array.
 * @param data Input array
 * @param index Index to remove
 * @typeParam V Type of array
 * @returns
 */
declare const remove: <V>(data: readonly V[] | V[], index: number) => V[];
/**
 * Groups data by a function `grouper`, returning data as a map with string
 * keys and array values. Multiple values can be assigned to the same group.
 *
 * `grouper` must yield a string designated group for a given item.
 *
 * @example
 * ```js
 * import { groupBy } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [
 *  { age: 39, city: `London` }
 *  { age: 14, city: `Copenhagen` }
 *  { age: 23, city: `Stockholm` }
 *  { age: 56, city: `London` }
 * ];
 *
 * // Whatever the function returns will be the designated group
 * // for an item
 * const map = groupBy(data, item => data.city);
 * ```
 *
 * This yields a Map with keys London, Stockholm and Copenhagen, and the corresponding values.
 *
 * ```
 * London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
 * Stockhom: [{ age: 23, city: `Stockholm` }]
 * Copenhagen: [{ age: 14, city: `Copenhagen` }]
 * ```
 * @param array Array to group
 * @param grouper Function that returns a key for a given item
 * @typeParam K Type of key to group by. Typically string.
 * @typeParam V Type of values
 * @returns Map
 */
declare const groupBy: <K, V>(array: Iterable<V>, grouper: (item: V) => K) => Map<K, V[]>;
/**
 * Samples array
 *
 * @example By percentage - get half of the items
 * ```
 * import { sample } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const list = [1,2,3,4,5,6,7,8,9,10];
 * const sub = sample(list, 0.5);
 * // Yields: [2, 4, 6, 8, 10]
 * ```
 *
 * @example By steps - every third
 * ```
 * import { sample } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const list = [1,2,3,4,5,6,7,8,9,10];
 * const sub = sample(list, 3);
 * // Yields:
 * // [3, 6, 9]
 * ```
 * @param array Array to sample
 * @param amount Amount, given as a percentage (0..1) or the number of interval (ie 3 for every third item)
 * @returns
 */
declare const sample: <V>(array: ArrayLike<V>, amount: number) => V[];
/**
 * Return `arr` broken up into chunks of `size`
 *
 * ```js
 * chunks([1,2,3,4,5,6,7,8,9,10], 3);
 * // Yields: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 * @param array
 * @param size
 * @returns
 */
declare function chunks<V>(array: ReadonlyArray<V>, size: number): V[][];
/**
 * Returns a result of a merged into b.
 * B is always the 'newer' data that takes
 * precedence.
 */
type MergeReconcile<V> = (a: V, b: V) => V;
/**
 * Merges arrays left to right, using the provided
 * `reconcile` function to choose a winner when keys overlap.
 *
 * There's also [Maps.mergeByKey](functions/Collections.Maps.mergeByKey.html) if the input data is in Map form.
 *
 * For example, if we have the array A:
 * [`A-1`, `A-2`, `A-3`]
 *
 * And array B:
 * [`B-1`, `B-2`, `B-4`]
 *
 * And with the key function:
 * ```js
 * // Make a key for value based on last char
 * const keyFn = (v) => v.substr(-1, 1);
 * ```
 *
 * If they are merged with the reconile function:
 * ```js
 * const reconcile = (a, b) => b.replace(`-`, `!`);
 * const output = mergeByKey(keyFn, reconcile, arrayA, arrayB);
 * ```
 *
 * The final result will be:
 *
 * [`B!1`, `B!2`, `A-3`, `B-4`]
 *
 * In this toy example, it's obvious how the reconciler transforms
 * data where the keys overlap. For the keys that do not overlap -
 * 3 and 4 in this example - they are copied unaltered.
 *
 * A practical use for `mergeByKey` has been in smoothing keypoints
 * from a TensorFlow pose. In this case, we want to smooth new keypoints
 * with older keypoints. But if a keypoint is not present, for it to be
 * passed through.
 *
 * @param keyFn Function to generate a unique key for data
 * @param reconcile Returns value to decide 'winner' when keys conflict.
 * @param arrays Arrays of data to merge
 */
declare const mergeByKey: <V>(keyFunction: ToString<V>, reconcile: MergeReconcile<V>, ...arrays: readonly (readonly V[])[]) => V[];
/**
 * Reduces in a pairwise fashion.
 *
 * Eg, if we have input array of [1, 2, 3, 4, 5], the
 * `reducer` fn will run with 1,2 as parameters, then 2,3, then 3,4 etc.
 * ```js
 * const values = [1, 2, 3, 4, 5]
 * reducePairwise(values, (acc, a, b) => {
 *  return acc + (b - a);
 * }, 0);
 * ```
 *
 * If input array has less than two elements, the initial value is returned.
 *
 * ```js
 * const reducer = (acc:string, a:string, b:string) => acc + `[${a}-${b}]`;
 * const result = reducePairwise(`a b c d e f g`.split(` `), reducer, `!`);
 * Yields: `![a-b][b-c][c-d][d-e][e-f][f-g]`
 * ```
 * @param array
 * @param reducer
 * @param initial
 * @returns
 */
declare const reducePairwise: <V, X>(array: readonly V[], reducer: (accumulator: X, a: V, b: V) => X, initial: X) => X;
/**
 * Returns two separate arrays of everything that `filter` returns _true_,
 * and everything it returns _false_ on. The in-built Array.filter() in
 * constrast only returns things that `filter` returns _true_ for.
 *
 * ```js
 * const [ matching, nonMatching ] = filterAB(data, v => v.enabled);
 * // `matching` is a list of items from `data` where .enabled is true
 * // `nonMatching` is a list of items from `data` where .enabled is false
 * ```
 * @param data Array of data to filter
 * @param filter Function which returns _true_ to add items to the A list, or _false_ for items to add to the B list
 * @returns Array of two elements. The first is items that match `filter`, the second is items that do not.
 */
declare const filterAB: <V>(data: readonly V[], filter: (a: V) => boolean) => [a: V[], b: V[]];
/**
 * Combines the values of one or more arrays, removing duplicates
 * ```js
 * const v = Arrays.unique([ [1, 2, 3, 4], [ 3, 4, 5, 6] ]);
 * // [ 1, 2, 3, 4, 5, 6]
 * ```
 *
 * A single array can be provided as well:
 * ```js
 * const v = Arrays.unique([ 1, 2, 3, 1, 2, 3 ]);
 * // [ 1, 2, 3 ]
 * ```
 *
 * By default uses JSON.toString() to compare values.
 *
 * See also:
 * * {@link intersection}: Overlap between two arrays
 * * {@link additionalValues}: Yield values from an iterable not present in the other
 * * {@link containsDuplicateValues}: Returns true if array contains duplicates
 * @param arrays
 * @param comparer
 * @returns
 */
declare const unique: <V>(arrays: V[] | V[][] | readonly V[] | readonly (readonly V[])[], comparer?: (a: V, b: V) => boolean) => readonly V[];
/**
 * Returns _true_ if array contains duplicate values.
 *
 * ```js
 * containsDuplicateValues(['a','b','a']); // True
 * containsDuplicateValues([
 *  { name: 'Apple' },
 *  { name: 'Apple' }
 * ]); // True
 * ```
 *
 * Uses JSON.toString() by default to compare values.
 *
 * See also:
 * * {@link containsDuplicateInstances}: Compare based on reference, rather than value
 * * {@link unique} Get unique set of values in an array
 * @param array Array to examine
 * @param comparer Comparer, uses JSON.toString by default
 * @returns
 */
declare const containsDuplicateValues: <V>(array: V[] | readonly V[], keyFunction?: (itemToMakeStringFor: V) => string) => boolean;
/**
 * Returns _true_ if array contains duplicate instances.
 * Use {@link containsDuplicateValues} if you'd rather compare by value.
 * @param array
 * @returns
 */
declare const containsDuplicateInstances: <V>(array: V[] | readonly V[]) => boolean;
/**
 * Returns _true_ if the two arrays have the same items at same indexes.
 * Returns _false_ if arrays are of different length.
 * By default uses === semantics for equality checking.
 *
 * ```js
 * isEqual([ 1, 2, 3], [ 1, 2, 3 ]); // true
 * isEqual([ 1, 2, 3], [ 3, 2, 1 ]); // false
 * ```
 *
 * Compare by value
 * ```js
 * isEqual(a, b, isEqualValueDefault);
 * ```
 *
 * Custom compare, eg based on `name` field:
 * ```js
 * isEqual(a, b, (compareA, compareB) => compareA.name === compareB.name);
 * ```
 * @param arrayA
 * @param arrayB
 * @param isEqual
 */
declare const isEqual: <V>(arrayA: V[], arrayB: V[], isEqual?: (a: V, b: V) => boolean) => boolean;
/**
 * Returns _true_ if contents of `needles` is contained by `haystack`.
 * ```js
 * const a = ['apples','oranges','pears','mandarins'];
 * const b = ['pears', 'apples'];
 * contains(a, b); // True
 *
 * const c = ['pears', 'bananas'];
 * contains(a, b); // False ('bananas' does not exist in a)
 * ```
 * @param haystack
 * @param needles
 * @param eq
 */
declare const contains: <V>(haystack: ArrayLike<V>, needles: ArrayLike<V>, eq?: (a: V, b: V) => boolean) => boolean;
/**
 * Yield values from an iterable not present in the other.
 *
 * Assuming that `input` array is unique values, this function
 * yields items from `values` which are not present in `input`.
 *
 * Duplicate items in `values` are ignored - only the first is yielded.
 *
 * If `eq` function is not provided, values are compared using the
 * default === semantics (via {@link isEqualDefault})
 *
 * ```js
 * const existing = [ 1, 2, 3 ];
 * const newValues = [ 3, 4, 5];
 * const v = [...additionalValues(existing, newValues)];
 * // [ 1, 2, 3, 4, 5]
 * ```
 *
 * ```js
 * const existing = [ 1, 2, 3 ];
 * const newValues = [ 3, 4, 5 ];
 * for (const v of additionalValues(existing, newValues)) {
 *  // 4, 5
 * }
 * To combine one or more iterables, keeping only unique items, use {@link unique}
 * @param input
 * @param values
 */
declare function additionalValues<V>(input: Array<V>, values: Iterable<V>, eq?: IsEqual<V>): Iterable<V>;

type index_MergeReconcile<V> = MergeReconcile<V>;
declare const index_MinMaxAvgOpts: typeof MinMaxAvgOpts;
declare const index_MinMaxAvgTotal: typeof MinMaxAvgTotal;
declare const index_additionalValues: typeof additionalValues;
declare const index_average: typeof average;
declare const index_averageWeighted: typeof averageWeighted;
declare const index_chunks: typeof chunks;
declare const index_compareValues: typeof compareValues;
declare const index_compareValuesEqual: typeof compareValuesEqual;
declare const index_contains: typeof contains;
declare const index_containsDuplicateInstances: typeof containsDuplicateInstances;
declare const index_containsDuplicateValues: typeof containsDuplicateValues;
declare const index_cycle: typeof cycle;
declare const index_dotProduct: typeof dotProduct;
declare const index_ensureLength: typeof ensureLength;
declare const index_filterAB: typeof filterAB;
declare const index_filterBetween: typeof filterBetween;
declare const index_flatten: typeof flatten;
declare const index_groupBy: typeof groupBy;
declare const index_guardArray: typeof guardArray;
declare const index_guardIndex: typeof guardIndex;
declare const index_interleave: typeof interleave;
declare const index_intersection: typeof intersection;
declare const index_isEqual: typeof isEqual;
declare const index_maxFast: typeof maxFast;
declare const index_maxIndex: typeof maxIndex;
declare const index_mergeByKey: typeof mergeByKey;
declare const index_minFast: typeof minFast;
declare const index_minIndex: typeof minIndex;
declare const index_minMaxAvg: typeof minMaxAvg;
declare const index_randomElement: typeof randomElement;
declare const index_randomElementWeightedSource: typeof randomElementWeightedSource;
declare const index_randomIndex: typeof randomIndex;
declare const index_randomPluck: typeof randomPluck;
declare const index_reducePairwise: typeof reducePairwise;
declare const index_remove: typeof remove;
declare const index_sample: typeof sample;
declare const index_shuffle: typeof shuffle;
declare const index_sortByNumericProperty: typeof sortByNumericProperty;
declare const index_total: typeof total;
declare const index_totalFast: typeof totalFast;
declare const index_unique: typeof unique;
declare const index_until: typeof until;
declare const index_validNumbers: typeof validNumbers;
declare const index_valuesEqual: typeof valuesEqual;
declare const index_weight: typeof weight;
declare const index_without: typeof without;
declare const index_withoutUndefined: typeof withoutUndefined;
declare const index_zip: typeof zip;
declare namespace index {
  export { type index_MergeReconcile as MergeReconcile, index_MinMaxAvgOpts as MinMaxAvgOpts, index_MinMaxAvgTotal as MinMaxAvgTotal, index_additionalValues as additionalValues, index_average as average, index_averageWeighted as averageWeighted, index_chunks as chunks, index_compareValues as compareValues, index_compareValuesEqual as compareValuesEqual, index_contains as contains, index_containsDuplicateInstances as containsDuplicateInstances, index_containsDuplicateValues as containsDuplicateValues, index_cycle as cycle, index_dotProduct as dotProduct, index_ensureLength as ensureLength, index_filterAB as filterAB, index_filterBetween as filterBetween, index_flatten as flatten, index_groupBy as groupBy, index_guardArray as guardArray, index_guardIndex as guardIndex, index_interleave as interleave, index_intersection as intersection, index_isEqual as isEqual, max$1 as max, index_maxFast as maxFast, index_maxIndex as maxIndex, index_mergeByKey as mergeByKey, min$1 as min, index_minFast as minFast, index_minIndex as minIndex, index_minMaxAvg as minMaxAvg, index_randomElement as randomElement, index_randomElementWeightedSource as randomElementWeightedSource, index_randomIndex as randomIndex, index_randomPluck as randomPluck, index_reducePairwise as reducePairwise, index_remove as remove, index_sample as sample, index_shuffle as shuffle, index_sortByNumericProperty as sortByNumericProperty, index_total as total, index_totalFast as totalFast, index_unique as unique, index_until as until, index_validNumbers as validNumbers, index_valuesEqual as valuesEqual, index_weight as weight, index_without as without, index_withoutUndefined as withoutUndefined, index_zip as zip };
}

export { compareValues as A, compareValuesEqual as B, weight as C, validNumbers as D, dotProduct as E, average as F, min$1 as G, maxIndex as H, Iterables as I, minIndex as J, max$1 as K, total as L, type MergeReconcile as M, maxFast as N, totalFast as O, minFast as P, cycle as Q, filterBetween as R, guardArray as S, guardIndex as T, averageWeighted as U, zip as V, valuesEqual as W, sortByNumericProperty as X, randomIndex as a, intersection as b, interleave as c, randomElementWeightedSource as d, ensureLength as e, flatten as f, randomPluck as g, withoutUndefined as h, index as i, remove as j, groupBy as k, sample as l, chunks as m, mergeByKey as n, reducePairwise as o, filterAB as p, unique as q, randomElement as r, shuffle as s, containsDuplicateValues as t, until as u, containsDuplicateInstances as v, without as w, isEqual as x, contains as y, additionalValues as z };
