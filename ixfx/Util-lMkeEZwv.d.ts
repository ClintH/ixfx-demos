import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { I as IsEqual } from './IsEqual-f56NWa68.js';
import { S as SleepOpts } from './Sleep-ezLnv9Vt.js';

/**
 * Yield values from `array`, one at a time.
 * Use `interval` to add time between each item.
 * The first item is yielded without delay.
 *
 * @param array Array of values
 * @param interval Interval (defaults: 1ms)
 */
declare function fromArray<V>(array: Array<V>, interval?: Interval): AsyncGenerator<V>;
/**
 * Yield values from `iterable`, one at a time.
 * Use `interval` to add time between each item.
 * The first item is yielded without delay.
 * @param iterable Iterable or AsyncIterable
 * @param [interval=1] Interval to wait between yield
 */
declare function fromIterable<V>(iterable: Iterable<V> | AsyncIterable<V>, interval?: Interval): AsyncGenerator<V>;
declare function chunks<V>(it: AsyncIterable<V>, size: number): AsyncGenerator<Awaited<V>[], void, unknown>;
declare function concat<V>(...its: ReadonlyArray<AsyncIterable<V>>): AsyncGenerator<Awaited<V>, void, undefined>;
declare function dropWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Loops over a generator until it finishes, calling `callback`.
 * Useful if you don't care about the value generator produces, just the number of loops.
 *
 * In this version, we do a `for await of` over `gen`, and also `await callback()`.

 * ```js
 * await until(count(5), () => {
 * // do something 5 times
 * });
 * ```
 *
 * If you want the value from the generator, use a `for of` loop as usual.
 *
 * If `callback` explicitly returns _false_, the generator is aborted.
 * @param it Generator to run
 * @param callback Code to call for each iteration
 */
declare const until: (it: AsyncIterable<any> | Iterable<any>, callback: () => (void | Promise<boolean> | undefined | boolean | Promise<undefined> | Promise<void>)) => Promise<undefined>;
/**
 * This generator will repeat another generator up until some condition. This is the version
 * that can handle async generators.
 *
 * For example, {@link count} will count from 0..number and then finish:
 * ```js
 * for (const v of count(5)) {
 *  // v: 0, 1, 2, 3, 4
 * }
 * ```
 *
 * But what if we want to repeat the count? We have to provide a function to create the generator,
 * rather than using the generator directly, since it's "one time use"
 * ```js
 * for await (const v of repeat(() => count(5))) {
 *  // v: 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, ...
 *  // warning: never ends
 * }
 * ```
 *
 * Limiting the number of repeats can be done by passing in a number or AbortSignal as a second parameter.
 * ```js
 * repeat(generator, 5); // Iterate over `generator` five times
 * ```
 *
 * ```js
 * const ac = new AbortController();
 * repeat(generator, ac.signal); // Pass in signal
 * ...
 * ac.abort(); // Trigger signal at some point
 * ```
 * @param gen
 * @param maximumRepeats
 */
declare const repeat: <T>(genCreator: () => Iterable<T> | AsyncIterable<T>, repeatsOrSignal: number | AbortSignal) => AsyncGenerator<T>;
/**
 * Returns true if items in two iterables are equal, as
 * determined by the `equality` function.
 * Order matters. It compares items at the same 'step' of each iterable.
 * @param it1
 * @param it2
 * @param equality
 * @returns
 */
declare function equals<V>(it1: AsyncIterable<V>, it2: AsyncIterable<V>, equality?: IsEqual<V>): Promise<boolean | undefined>;
declare function every<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
declare function fill<V>(it: AsyncIterable<V>, v: V): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Filters an iterable, only yielding items which match `f`.
 *
 * ```js
 * filter([1, 2, 3, 4], e => e % 2 == 0);
 * returns [2, 4]
 * ```
 * @param it
 * @param f
 */
declare function filter<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): AsyncGenerator<Awaited<V>, void, unknown>;
declare function find<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<V | undefined>;
declare function flatten<V>(it: AsyncIterable<V>): AsyncGenerator<any, void, unknown>;
declare function forEach<V>(it: AsyncIterable<V>, f: (v: V) => void | boolean | Promise<boolean | void>): Promise<void>;
/**
 * Maps an iterable through function `f`
 * ```js
 * // For every input value, multiply it by itself
 * map([1, 2, 3], e => e*e)
 * // Yields: 1, 4, 9
 * ```
 *
 * It can also be used to transform types:
 * ```js
 * map([1, 2, 3], e => { value: e });
 * // Yields: { value: 1 }, { value: 2 }, { value: 3 }
 * ```
 * @param it
 * @param f
 */
declare function map<V, X>(it: AsyncIterable<V>, f: (v: V) => X): AsyncGenerator<Awaited<X>, void, unknown>;
declare function max<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Returns the minimum seen of an iterable as it changes.
 * Streaming result: works with endless iterables.
 *
 * Note that `gt` function returns true if A is _greater_ than B, even
 * though we're looking for the minimum.
 *
 * ```js
 * // Rank objects based on 'v' value
 * const rank = (a,b) => a.v > b.v;
 * min([
 *  {i:0,v:1},
 *  {i:1,v:9},
 *  {i:2,v:-2}
 * ], rank);
 * // Yields: {i:2, v:1}, {i:2,v:-2}
 * ```
 * @param it Iterable
 * @param gt Should return _true_ if `a` is greater than `b`.
 * @returns
 */
declare function min<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<Awaited<V>, Awaited<V> | undefined, unknown>;
declare function reduce<V>(it: AsyncIterable<V>, f: (accumulator: V, current: V) => V, start: V): Promise<V>;
declare function slice<V>(it: AsyncIterable<V>, start?: number, end?: number): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Enumerates over an input iterable, with a delay between items.
 * @param it
 * @param delay
 */
declare function withDelay<V>(it: Iterable<V>, delay: Interval): AsyncGenerator<Awaited<V>, void, unknown>;
/***
 * Returns the next IteratorResult,
 * throwing an error if it does not happen
 * within `interval` (default: 1s)
 */
declare function nextWithTimeout<V>(it: AsyncIterableIterator<V> | IterableIterator<V>, options: SleepOpts<any>): Promise<IteratorResult<V, any>>;
declare function some<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
/**
 * Returns an array of values from an iterator.
 *
 * ```js
 * const data = await toArray(adsrIterable(opts, 10));
 * ```
 *
 * Note: If the iterator is infinite, be sure to provide a `count` or the function
 * will never return.
 *
 * @param it Asynchronous iterable
 * @param count Number of items to return, by default all.
 * @returns
 */
declare function toArray<V>(it: AsyncIterable<V>, count?: number): Promise<Array<V>>;
/**
 * Access awaited `callback` as an iterable:
 * ```js
 * const fn = () => Math.random();
 * for await (const v of fromFunctionAwaited(fn)) {
 *  // Generate infinite random numbers
 * }
 * ```
 *
 * `callback` can be async, result is awaited.
 * This requires the use of `for await`.
 * Use {@link fromFunction} otherwise;
 * @param callback
 */
declare function fromFunctionAwaited<T>(callback: () => Promise<T> | T): AsyncGenerator<Awaited<T>, void, unknown>;
/**
 * Access `callback` as an iterable:
 * ```js
 * const fn = () => Math.random();
 * for (const v of fromFunctionAwaited(fn)) {
 *  // Generate infinite random numbers
 * }
 * ```
 *
 * Use {@link fromFunctionAwaited} to await `callback`.
 * @param callback
 */
declare function fromFunction<T>(callback: () => T): Generator<T, void, unknown>;
declare function unique<V>(iterable: AsyncIterable<V> | Array<AsyncIterable<V>>): AsyncGenerator<Awaited<V>, void, unknown>;
declare function uniqueByValue<T>(input: AsyncIterable<T>, toString?: ToString<T>, seen?: Set<string>): AsyncGenerator<T>;
/**
 * Returns unique items from iterables, given a particular key function
 * ```js
 * unique([{i:0,v:2},{i:1,v:3},{i:2,v:2}], e => e.v);
 * Yields:  [{i:0,v:2},{i:1,v:3}]
 * @param it
 * @param f
 */
/**
 * Combine same-positioned items from several iterables
 * ```js
 * zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
 * Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
 * ```
 * @param its
 * @returns
 */
declare function zip<V>(...its: ReadonlyArray<AsyncIterable<V>>): AsyncGenerator<V[], void, unknown>;

declare const IterableAsync_chunks: typeof chunks;
declare const IterableAsync_concat: typeof concat;
declare const IterableAsync_dropWhile: typeof dropWhile;
declare const IterableAsync_equals: typeof equals;
declare const IterableAsync_every: typeof every;
declare const IterableAsync_fill: typeof fill;
declare const IterableAsync_filter: typeof filter;
declare const IterableAsync_find: typeof find;
declare const IterableAsync_flatten: typeof flatten;
declare const IterableAsync_forEach: typeof forEach;
declare const IterableAsync_fromArray: typeof fromArray;
declare const IterableAsync_fromFunction: typeof fromFunction;
declare const IterableAsync_fromFunctionAwaited: typeof fromFunctionAwaited;
declare const IterableAsync_fromIterable: typeof fromIterable;
declare const IterableAsync_map: typeof map;
declare const IterableAsync_max: typeof max;
declare const IterableAsync_min: typeof min;
declare const IterableAsync_nextWithTimeout: typeof nextWithTimeout;
declare const IterableAsync_reduce: typeof reduce;
declare const IterableAsync_repeat: typeof repeat;
declare const IterableAsync_slice: typeof slice;
declare const IterableAsync_some: typeof some;
declare const IterableAsync_toArray: typeof toArray;
declare const IterableAsync_unique: typeof unique;
declare const IterableAsync_uniqueByValue: typeof uniqueByValue;
declare const IterableAsync_until: typeof until;
declare const IterableAsync_withDelay: typeof withDelay;
declare const IterableAsync_zip: typeof zip;
declare namespace IterableAsync {
  export { IterableAsync_chunks as chunks, IterableAsync_concat as concat, IterableAsync_dropWhile as dropWhile, IterableAsync_equals as equals, IterableAsync_every as every, IterableAsync_fill as fill, IterableAsync_filter as filter, IterableAsync_find as find, IterableAsync_flatten as flatten, IterableAsync_forEach as forEach, IterableAsync_fromArray as fromArray, IterableAsync_fromFunction as fromFunction, IterableAsync_fromFunctionAwaited as fromFunctionAwaited, IterableAsync_fromIterable as fromIterable, IterableAsync_map as map, IterableAsync_max as max, IterableAsync_min as min, IterableAsync_nextWithTimeout as nextWithTimeout, IterableAsync_reduce as reduce, IterableAsync_repeat as repeat, IterableAsync_slice as slice, IterableAsync_some as some, IterableAsync_toArray as toArray, IterableAsync_unique as unique, IterableAsync_uniqueByValue as uniqueByValue, IterableAsync_until as until, IterableAsync_withDelay as withDelay, IterableAsync_zip as zip };
}

type ArrayLengthMutationKeys = `splice` | `push` | `pop` | `shift` | `unshift` | number;
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never;
type FixedLengthArray<T extends Array<any>> = Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>> & {
    [Symbol.iterator]: () => IterableIterator<ArrayItems<T>>;
};
declare const isFunction: (object: unknown) => object is (...args: Array<any>) => any;
/**
 * Returns _true_ if `value` is a plain object
 *
 * ```js
 * isPlainObject(`text`); // false
 * isPlainObject(document); // false
 * isPlainObject({ hello: `there` }); // true
 * ```
 * @param value
 * @returns
 */
declare const isPlainObject: (value: unknown) => boolean;
/**
 * Returns _true_ if `value` is an integer. Parses string input, but
 * all other data types return _false_.
 *
 * ```js
 * isInteger(1);      // true
 * isInteger(1.1);    // false
 * isInteger(`1`);    // true
 * isInteger(`1.1`);  // false
 * isInteger(true);   // false
 * isInteger(false);  // false
 * ```
 *
 * Returns _false_ for _undefined_, NaN, booleans and infinite numbers.
 * @param value
 * @returns
 */
declare const isInteger: (value: string | number) => boolean;
/**
 * Returns _true_ if `value` is primitive value or plain object
 * @param value
 * @returns
 */
declare const isPlainObjectOrPrimitive: (value: unknown) => boolean;
/**
 * Returns `fallback` if `v` is NaN, otherwise returns `v`.
 *
 * Throws if `v` is not a number type.
 * @param v
 * @param fallback
 * @returns
 */
declare const ifNaN: (v: number, fallback: number) => number;
/**
 * Returns true if `x` is a power of two
 * @param x
 * @returns True if `x` is a power of two
 */
declare const isPowerOfTwo: (x: number) => boolean;
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
type ToString<V> = (itemToMakeStringFor: V) => string;
declare const isMap: (value: unknown) => value is Map<any, any>;
declare const isSet: (value: unknown) => value is Set<any>;
/**
 * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
 */
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;
declare const runningiOS: () => boolean;
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
/**
 * Inverts the source comparer.
 * @param fn
 * @returns
 */
declare const comparerInverse: <V>(comparer: Comparer<V>) => Comparer<V>;
/**
 * If values are strings, uses that as the key.
 * Otherwise uses `JSON.stringify`.
 * @param a
 * @returns
 */
declare const defaultKeyer: <V>(a: V) => string;

type Util_ArrayItems<T extends Array<any>> = ArrayItems<T>;
type Util_ArrayLengthMutationKeys = ArrayLengthMutationKeys;
type Util_CompareResult = CompareResult;
type Util_Comparer<V> = Comparer<V>;
type Util_FixedLengthArray<T extends Array<any>> = FixedLengthArray<T>;
declare const Util_IterableAsync: typeof IterableAsync;
type Util_ToString<V> = ToString<V>;
declare const Util_comparerInverse: typeof comparerInverse;
declare const Util_defaultComparer: typeof defaultComparer;
declare const Util_defaultKeyer: typeof defaultKeyer;
declare const Util_ifNaN: typeof ifNaN;
declare const Util_isFunction: typeof isFunction;
declare const Util_isInteger: typeof isInteger;
declare const Util_isMap: typeof isMap;
declare const Util_isPlainObject: typeof isPlainObject;
declare const Util_isPlainObjectOrPrimitive: typeof isPlainObjectOrPrimitive;
declare const Util_isPowerOfTwo: typeof isPowerOfTwo;
declare const Util_isSet: typeof isSet;
declare const Util_jsComparer: typeof jsComparer;
declare const Util_numericComparer: typeof numericComparer;
declare const Util_relativeDifference: typeof relativeDifference;
declare const Util_roundUpToMultiple: typeof roundUpToMultiple;
declare const Util_runningiOS: typeof runningiOS;
declare const Util_toStringDefault: typeof toStringDefault;
declare namespace Util {
  export { type Util_ArrayItems as ArrayItems, type Util_ArrayLengthMutationKeys as ArrayLengthMutationKeys, type Util_CompareResult as CompareResult, type Util_Comparer as Comparer, type Util_FixedLengthArray as FixedLengthArray, Util_IterableAsync as IterableAsync, type Util_ToString as ToString, Util_comparerInverse as comparerInverse, Util_defaultComparer as defaultComparer, Util_defaultKeyer as defaultKeyer, Util_ifNaN as ifNaN, Util_isFunction as isFunction, Util_isInteger as isInteger, Util_isMap as isMap, Util_isPlainObject as isPlainObject, Util_isPlainObjectOrPrimitive as isPlainObjectOrPrimitive, Util_isPowerOfTwo as isPowerOfTwo, Util_isSet as isSet, Util_jsComparer as jsComparer, Util_numericComparer as numericComparer, Util_relativeDifference as relativeDifference, Util_roundUpToMultiple as roundUpToMultiple, Util_runningiOS as runningiOS, Util_toStringDefault as toStringDefault };
}

export { type ArrayLengthMutationKeys as A, type CompareResult as C, type FixedLengthArray as F, IterableAsync as I, type ToString as T, Util as U, type ArrayItems as a, isPlainObject as b, isInteger as c, isPlainObjectOrPrimitive as d, ifNaN as e, isPowerOfTwo as f, roundUpToMultiple as g, isMap as h, isFunction as i, isSet as j, runningiOS as k, type Comparer as l, jsComparer as m, numericComparer as n, defaultComparer as o, comparerInverse as p, defaultKeyer as q, relativeDifference as r, toStringDefault as t };
