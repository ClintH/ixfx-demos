import { T as ToString, I as IterableAsync } from './Util-t5Kadl8C.js';
import { I as IsEqual } from './IsEqual-f56NWa68.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';

declare function slice$1<V>(it: Iterable<V>, start?: number, end?: number): Generator<V, void, unknown>;

declare function uniqueByValue$1<T>(input: Iterable<T>, toString?: ToString<T>, seen?: Set<string>): Generator<T>;
/**
 * Returns a function that yields a value from a generator.
 * ```js
 * const spring = yieldNumber(Oscillators.spring());
 *
 * spring(); // latest value
 * ```
 *
 * Instead of:
 * ```js
 * const spring = Oscillators.spring();
 *
 * spring.next().value
 * ```
 *
 * A `defaultValue` can be provided if the source generator returns undefined:
 * ```js
 * const spring = yieldNumber(Oscillators.spring(), 0);
 * spring(); // Returns 0 if the generator returns undefined
 * ```
 * @param generator
 * @param defaultValue
 * @returns
 */
declare function yieldNumber(generator: Generator<number>, defaultValue?: number): () => number | undefined;
/**
 * Return first value from an iterable, or _undefined_ if
 * no values are generated
 * @param it
 * @returns
 */
declare function first<V>(it: Iterable<V>): V | undefined;
/**
 * Returns last value from an iterable, or _undefined_
 * if no values are generated
 * @param it
 */
declare function last<V>(it: Iterable<V>): V | undefined;
/**
 * Yields chunks of the iterable `it` such that the end of a chunk is the
 * start of the next chunk.
 *
 * Eg, with the input [1,2,3,4,5] and a size of 2, we would get back
 * [1,2], [2,3], [3,4], [4,5].
 *
 *
 * @param it
 * @param size
 * @returns
 */
declare function chunksOverlapping<V>(it: Iterable<V>, size: number): Generator<V[], void, unknown>;
declare function chunks$1<V>(it: Iterable<V>, size: number): Generator<V[], void, unknown>;
declare function concat$1<V>(...its: ReadonlyArray<Iterable<V>>): Generator<V, void, undefined>;
declare function dropWhile$1<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V, void, unknown>;
/**
* Loops over a generator until it finishes, calling `callback`.
* Useful if you don't care about the value generator produces, just the number of loops.
*
* ```js
* until(count(5), () => {
* // do something 5 times
* });
* ```
*
* If you want the value from the generator, use a `for of` loop as usual.
* If `callback` explicitly returns _false_, the generator is aborted.
* @param it Generator to run
* @param callback Code to call for each iteration
*/
declare const until$1: (it: Iterable<any>, callback: () => (void | boolean | never)) => void;
/**
 * Returns true if items in two iterables are equal, as
 * determined by the `equality` function.
 * @param it1
 * @param it2
 * @param equality
 * @returns
 */
declare function equals$1<V>(it1: IterableIterator<V>, it2: IterableIterator<V>, equality?: IsEqual<V>): boolean | undefined;
declare function every$1<V>(it: Iterable<V>, f: (v: V) => boolean): boolean;
declare function fill$1<V>(it: Iterable<V>, v: V): Generator<V, void, unknown>;
declare function forEach$1<V>(it: Iterable<V>, f: (v: V) => boolean | void): void;
/**
 * ```js
 * filter([1, 2, 3, 4], e => e % 2 == 0);
 * returns [2, 4]
 * ```
 * @param it
 * @param f
 */
declare function filter$1<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V, void, unknown>;
declare function find$1<V>(it: Iterable<V>, f: (v: V) => boolean): V | undefined;
declare function flatten$1<V>(it: Iterable<V>): Generator<any, void, unknown>;
/**
 * Maps an iterable of type `V` to type `X`.
 * ```js
 * map([1, 2, 3], e => e*e)
 * returns [1, 4, 9]
 * ```
 * @param it
 * @param f
 */
declare function map$1<V, X>(it: Iterable<V>, f: (v: V) => X): Generator<X, void, unknown>;
declare function max$1<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): Generator<V>;
declare function min$1<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): Generator<V, void, unknown>;
declare function reduce$1<V>(it: Iterable<V>, f: (accumulator: V, current: V) => V, start: V): V;
declare function some$1<V>(it: Iterable<V>, f: (v: V) => boolean): boolean;
declare function repeat<T>(genCreator: () => Iterable<T>, repeatsOrSignal: number | AbortSignal): Generator<T>;
declare function unique$1<V>(iterable: Iterable<V> | Array<Iterable<V>>): Generator<V, void, unknown>;
/**
 * Combine same-positioned items from several iterables
 * ```js
 * zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
 * Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
 * ```
 * @param its
 * @returns
 */
declare function zip$1<V>(...its: ReadonlyArray<Iterable<V>>): Generator<V[], void, unknown>;
declare function fromIterable$1<T>(iterable: Iterable<T>): Generator<T, void, unknown>;
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
declare function toArray$1<V>(it: Iterable<V>, count?: number): Array<V>;
/**
 * Yield values from `array`, one at a time.
 * Use `interval` to add time between each item.
 * The first item is yielded without delay.
 * @param array Array of values
 */
declare function fromArray$1<V>(array: Array<V>): Generator<V>;

declare const IterableSync_chunksOverlapping: typeof chunksOverlapping;
declare const IterableSync_first: typeof first;
declare const IterableSync_last: typeof last;
declare const IterableSync_repeat: typeof repeat;
declare const IterableSync_yieldNumber: typeof yieldNumber;
declare namespace IterableSync {
  export { chunks$1 as chunks, IterableSync_chunksOverlapping as chunksOverlapping, concat$1 as concat, dropWhile$1 as dropWhile, equals$1 as equals, every$1 as every, fill$1 as fill, filter$1 as filter, find$1 as find, IterableSync_first as first, flatten$1 as flatten, forEach$1 as forEach, fromArray$1 as fromArray, fromIterable$1 as fromIterable, IterableSync_last as last, map$1 as map, max$1 as max, min$1 as min, reduce$1 as reduce, IterableSync_repeat as repeat, slice$1 as slice, some$1 as some, toArray$1 as toArray, unique$1 as unique, uniqueByValue$1 as uniqueByValue, until$1 as until, IterableSync_yieldNumber as yieldNumber, zip$1 as zip };
}

declare function min<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<V>;
declare function min<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): Generator<V>;
declare function max<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<V>;
declare function max<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): Generator<V>;
declare function dropWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<V>;
declare function dropWhile<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V>;
declare function until(it: AsyncIterable<any>, f: () => Promise<boolean> | Promise<undefined>): Promise<undefined>;
declare function until(it: Iterable<any>, f: () => boolean | never): void;
declare function until(it: Iterable<any>, f: () => Promise<boolean>): Promise<undefined>;
declare function chunks<V>(it: Iterable<V>, size: number): Generator<Array<V>>;
declare function chunks<V>(it: AsyncIterable<V>, size: number): AsyncGenerator<Array<V>>;
declare function filter<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): AsyncGenerator<V>;
declare function filter<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Generator<V>;
declare function fill<V>(it: AsyncIterable<V>, v: V): AsyncGenerator<V>;
declare function fill<V>(it: Iterable<V>, v: V): Generator<V>;
declare function concat<V>(...its: Array<Iterable<V>>): Generator<V>;
declare function concat<V>(...its: Array<AsyncIterable<V>>): AsyncGenerator<V>;
declare function find<V>(it: Array<V> | Iterable<V>, f: (v: V) => boolean): V | undefined;
declare function find<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<V | undefined>;
/**
 * Execute function `f` for each item in iterable.
 * If `f` returns _false_, iteration stops.
 * ```js
 * forEach(iterable, v => {
 *  // do something with value
 * });
 * ```
 *
 * When using an async iterable, `f` can also be async.
 * @param it
 * @param f
 */
declare function forEach<V>(it: Array<V> | AsyncIterable<V> | Iterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<void> | undefined;
declare function map<V, X>(it: AsyncIterable<V>, f: (v: V) => Promise<X> | X): Generator<X>;
declare function map<V, X>(it: Array<V> | Iterable<V>, f: (v: V) => X): Generator<X>;
declare function fromArray<V>(array: Array<V>, interval: Interval): AsyncGenerator<V>;
declare function fromArray<V>(array: Array<V>): Generator<V>;
declare function flatten<V>(it: AsyncIterable<Array<V> | V>): AsyncIterable<V>;
declare function flatten<V>(it: Iterable<Array<V> | V> | Array<V>): Iterable<V>;
declare function some<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
declare function some<V>(it: Iterable<V> | Array<V>, f: (v: V) => boolean): boolean;
declare function reduce<V>(it: AsyncIterable<V>, f: (accumulator: V, current: V) => V, start: V): Promise<V>;
declare function reduce<V>(it: Iterable<V> | Array<V>, f: (accumulator: V, current: V) => V, start: V): V;
declare function slice<V>(it: AsyncIterable<V>, start?: number, end?: number): AsyncGenerator<V>;
declare function slice<V>(it: Iterable<V> | Array<V>, start?: number, end?: number): Generator<V>;
declare function unique<V>(iterable: Iterable<V> | Array<Iterable<V>>): Generator<V>;
declare function unique<V>(iterable: AsyncIterable<V> | Array<AsyncIterable<V>>): AsyncGenerator<V>;
declare function uniqueByValue<T>(input: Iterable<T> | Array<T>, toString: (v: T) => string, seen?: Set<string>): Generator<T>;
declare function uniqueByValue<T>(input: AsyncIterable<T>, toString: (v: T) => string, seen?: Set<string>): AsyncGenerator<T>;
declare function toArray<V>(it: AsyncIterable<V>, count?: number): Promise<Array<V>>;
declare function toArray<V>(it: Iterable<V>, count?: number): Array<V>;
declare function every<V>(it: Iterable<V> | Array<V>, f: (v: V) => boolean): boolean;
declare function every<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
declare function equals<V>(it1: AsyncIterable<V>, it2: AsyncIterable<V>, equality?: (a: V, b: V) => boolean): Promise<boolean>;
declare function equals<V>(it1: IterableIterator<V>, it2: IterableIterator<V>, equality?: (a: V, b: V) => boolean): boolean;
declare function zip<V>(...its: ReadonlyArray<AsyncIterable<V>>): Generator<Array<V>>;
declare function zip<V>(...its: ReadonlyArray<Iterable<V>>): Generator<V>;
declare function fromIterable<V>(iterable: Iterable<V>): Generator<V>;
declare function fromIterable<V>(iterable: AsyncIterable<V> | Iterable<V>, interval: Interval): AsyncGenerator<V>;

declare const index_chunks: typeof chunks;
declare const index_concat: typeof concat;
declare const index_dropWhile: typeof dropWhile;
declare const index_equals: typeof equals;
declare const index_every: typeof every;
declare const index_fill: typeof fill;
declare const index_filter: typeof filter;
declare const index_find: typeof find;
declare const index_flatten: typeof flatten;
declare const index_forEach: typeof forEach;
declare const index_fromArray: typeof fromArray;
declare const index_fromIterable: typeof fromIterable;
declare const index_map: typeof map;
declare const index_max: typeof max;
declare const index_min: typeof min;
declare const index_reduce: typeof reduce;
declare const index_slice: typeof slice;
declare const index_some: typeof some;
declare const index_toArray: typeof toArray;
declare const index_unique: typeof unique;
declare const index_uniqueByValue: typeof uniqueByValue;
declare const index_until: typeof until;
declare const index_zip: typeof zip;
declare namespace index {
  export { IterableAsync as Async, IterableSync as Sync, index_chunks as chunks, index_concat as concat, index_dropWhile as dropWhile, index_equals as equals, index_every as every, index_fill as fill, index_filter as filter, index_find as find, index_flatten as flatten, index_forEach as forEach, index_fromArray as fromArray, index_fromIterable as fromIterable, index_map as map, index_max as max, index_min as min, index_reduce as reduce, index_slice as slice, index_some as some, index_toArray as toArray, index_unique as unique, index_uniqueByValue as uniqueByValue, index_until as until, index_zip as zip };
}

export { IterableSync as I, max as a, fill as b, chunks as c, dropWhile as d, concat as e, filter as f, find as g, forEach as h, index as i, map as j, fromArray as k, flatten as l, min as m, slice as n, unique as o, uniqueByValue as p, every as q, reduce as r, some as s, toArray as t, until as u, equals as v, fromIterable as w, zip as z };
