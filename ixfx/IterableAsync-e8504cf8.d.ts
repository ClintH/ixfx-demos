/**
 *
 * ```js
 * chunks([1,2,3,4,5,6,7,8,9,10], 3);
 * // Yields [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 * @param it
 * @param size
 */
declare function chunks<V>(it: Iterable<V>, size: number): AsyncGenerator<Awaited<V>[], void, unknown>;
declare function concat<V>(...its: readonly Iterable<V>[]): AsyncGenerator<Awaited<V>, void, undefined>;
declare function dropWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, undefined>;
declare function equals<V>(it1: Iterable<V>, it2: Iterable<V>): Promise<boolean | undefined>;
/**
 * Returns true if `f` returns true for
 * every item in iterable
 * @param it
 * @param f
 * @returns
 */
declare function every<V>(it: Iterable<V>, f: (v: V) => boolean): Promise<boolean>;
/**
 * Yields `v` for each item within `it`.
 *
 * ```js
 * fill([1, 2, 3], 0);
 * // Yields: [0, 0, 0]
 * ```
 * @param it
 * @param v
 */
declare function fill<V>(it: AsyncIterable<V>, v: V): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * ```js
 * filter([1, 2, 3, 4], e => e % 2 == 0);
 * returns [2, 4]
 * ```
 * @param it
 * @param f
 */
declare function filter<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 *
 * ```js
 * find([1, 2, 3, 4], e => e > 2);
 * // Yields: 3
 * ```
 * @param it
 * @param f
 * @returns
 */
declare function find<V>(it: Iterable<V>, f: (v: V) => boolean): Promise<V | undefined>;
/**
 * ```js
 * flatten([1, [2, 3], [[4]]]);
 * // Yields: [1, 2, 3, [4]];
 * ```
 * @param it
 */
declare function flatten<V>(it: AsyncIterable<V>): AsyncGenerator<any, void, unknown>;
/**
 *
 * @param it
 * @param f
 */
declare function forEach<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Promise<void>;
declare function map<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<boolean, void, unknown>;
declare function max<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): Promise<V | undefined>;
declare function min<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): Promise<V | undefined>;
/**
 * Returns count from `start` for a given length
 * ```js
 * range(-5, 10);
 * // Yields: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
 * ```
 * @param start
 * @param len
 */
declare function range(start: number, len: number): AsyncGenerator<number, void, unknown>;
declare function reduce<V>(it: AsyncIterable<V>, f: (acc: V, current: V) => V, start: V): Promise<V>;
declare function slice<V>(it: AsyncIterable<V>, start?: number, end?: number): AsyncGenerator<Awaited<V>, void, unknown>;
declare function some<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Promise<boolean>;
declare function takeWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Returns an array of values from an iterator.
 *
 * ```js
 * const data = await toArray(adsrSample(opts, 10));
 * ```
 *
 * Note: If the iterator is infinite, be sure to provide a `count` or the function
 * will never return.
 *
 * @param it Asynchronous iterable
 * @param count Number of items to return, by default all.
 * @returns
 */
declare function toArray<V>(it: AsyncIterable<V>, count?: number): Promise<readonly V[]>;
declare function unique<V>(it: AsyncIterable<V>, f?: ((id: V) => V)): AsyncGenerator<Awaited<V>, void, unknown>;
declare function zip<V>(...its: AsyncIterable<V>[]): AsyncGenerator<any[], void, unknown>;

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
declare const IterableAsync_map: typeof map;
declare const IterableAsync_max: typeof max;
declare const IterableAsync_min: typeof min;
declare const IterableAsync_range: typeof range;
declare const IterableAsync_reduce: typeof reduce;
declare const IterableAsync_slice: typeof slice;
declare const IterableAsync_some: typeof some;
declare const IterableAsync_takeWhile: typeof takeWhile;
declare const IterableAsync_toArray: typeof toArray;
declare const IterableAsync_unique: typeof unique;
declare const IterableAsync_zip: typeof zip;
declare namespace IterableAsync {
  export {
    IterableAsync_chunks as chunks,
    IterableAsync_concat as concat,
    IterableAsync_dropWhile as dropWhile,
    IterableAsync_equals as equals,
    IterableAsync_every as every,
    IterableAsync_fill as fill,
    IterableAsync_filter as filter,
    IterableAsync_find as find,
    IterableAsync_flatten as flatten,
    IterableAsync_forEach as forEach,
    IterableAsync_map as map,
    IterableAsync_max as max,
    IterableAsync_min as min,
    IterableAsync_range as range,
    IterableAsync_reduce as reduce,
    IterableAsync_slice as slice,
    IterableAsync_some as some,
    IterableAsync_takeWhile as takeWhile,
    IterableAsync_toArray as toArray,
    IterableAsync_unique as unique,
    IterableAsync_zip as zip,
  };
}

export { IterableAsync as I };
