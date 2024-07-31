import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { I as IsEqual } from './IsEqual-CTTf-Oj9.js';
import { S as SleepOpts } from './Sleep-DkIg67lN.js';
import { T as ToArrayOptions, G as GenOrData, a as GenFactoryNoInput, C as CombineLatestOptions, b as Chains } from './index-EhVF7pG7.js';
import { T as ToString } from './ToString-DO94OWoh.js';

/**
 * Yield values from `array`, one at a time.
 * Use `interval` to add time between each item.
 * The first item is yielded without delay.
 *
 * @param array Array of values
 * @param interval Interval (defaults: 1ms)
 */
declare function fromArray$2<V>(array: Array<V>, interval?: Interval): AsyncGenerator<V>;
/**
 * Yield values from `iterable`, one at a time.
 * Use `interval` to add time between each item.
 * The first item is yielded without delay.
 * @param iterable Iterable or AsyncIterable
 * @param [interval=1] Interval to wait between yield
 */
declare function fromIterable$2<V>(iterable: Iterable<V> | AsyncIterable<V>, interval?: Interval): AsyncGenerator<V>;
declare function chunks$2<V>(it: AsyncIterable<V>, size: number): AsyncGenerator<Awaited<V>[], void, unknown>;
declare function concat$2<V>(...its: ReadonlyArray<AsyncIterable<V>>): AsyncGenerator<Awaited<V>, void, undefined>;
declare function dropWhile$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
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
declare const until$2: (it: AsyncIterable<any> | Iterable<any>, callback: () => (void | Promise<boolean> | undefined | boolean | Promise<undefined> | Promise<void>)) => Promise<undefined>;
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
 * Limiting the number of repeats can be done by passing in extra parameters
 * ```js
 * repeat(generator, { count: 5} ); // Iterate over `generator` five times
 * ```
 *
 * ```js
 * const ac = new AbortController();
 * repeat(generator, { signal: ac.signal }); // Pass in signal
 * ...
 * ac.abort(); // Trigger signal at some point
 * ```
 * @param genCreator
 * @param repeatsOrSignal
 */
declare const repeat$1: <T>(genCreator: () => Iterable<T> | AsyncIterable<T>, repeatsOrSignal: number | AbortSignal) => AsyncGenerator<T>;
/**
 * Returns true if items in two iterables are equal, as
 * determined by the `equality` function.
 * Order matters. It compares items at the same 'step' of each iterable.
 * @param it1
 * @param it2
 * @param equality
 * @returns
 */
declare function equals$2<V>(it1: AsyncIterable<V>, it2: AsyncIterable<V>, equality?: IsEqual<V>): Promise<boolean | undefined>;
declare function every$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
declare function fill$2<V>(it: AsyncIterable<V>, v: V): AsyncGenerator<Awaited<V>, void, unknown>;
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
declare function filter$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): AsyncGenerator<Awaited<V>, void, unknown>;
declare function find$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<V | undefined>;
declare function flatten$2<V>(it: AsyncIterable<V>): AsyncGenerator<any, void, unknown>;
declare function forEach$2<V>(it: AsyncIterable<V>, f: (v: V) => void | boolean | Promise<boolean | void>): Promise<void>;
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
declare function map$2<V, X>(it: AsyncIterable<V>, f: (v: V) => X): AsyncGenerator<Awaited<X>, void, unknown>;
declare function max$2<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
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
declare function min$2<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<Awaited<V>, Awaited<V> | undefined, unknown>;
declare function reduce$2<V>(it: AsyncIterable<V>, f: (accumulator: V, current: V) => V, start: V): Promise<V>;
declare function slice$2<V>(it: AsyncIterable<V>, start?: number, end?: number): AsyncGenerator<Awaited<V>, void, unknown>;
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
declare function some$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
/**
 * Returns an array of values from an iterator.
 *
 * ```js
 * const data = await toArray(adsrIterable(opts, 10));
 * ```
 *
 * Note: If the iterator is infinite, be sure to provide limits via the options.
 * ```js
 * // Return maximum five items
 * const data = await toArray(iterable, { limit: 5 });
 * // Return results for a maximum of 5 seconds
 * const data = await toArray(iterable, { elapsed: 5000 });
 * ```
 * Note that limits are ORed, `toArray` will finish if either of them is true.
 *
 * @param it Asynchronous iterable
 * @param options Options when converting to array
 * @returns
 */
declare function toArray$2<V>(it: AsyncIterable<V>, options?: Partial<ToArrayOptions>): Promise<Array<V>>;
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
declare function unique$2<V>(iterable: AsyncIterable<V> | Array<AsyncIterable<V>>): AsyncGenerator<Awaited<V>, void, unknown>;
declare function uniqueByValue$2<T>(input: AsyncIterable<T>, toString?: (value: T) => string, seen?: Set<string>): AsyncGenerator<T>;
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
declare function zip$2<V>(...its: ReadonlyArray<AsyncIterable<V>>): AsyncGenerator<V[], void, unknown>;

declare const IterableAsync_fromFunction: typeof fromFunction;
declare const IterableAsync_fromFunctionAwaited: typeof fromFunctionAwaited;
declare const IterableAsync_nextWithTimeout: typeof nextWithTimeout;
declare const IterableAsync_withDelay: typeof withDelay;
declare namespace IterableAsync {
  export { chunks$2 as chunks, concat$2 as concat, dropWhile$2 as dropWhile, equals$2 as equals, every$2 as every, fill$2 as fill, filter$2 as filter, find$2 as find, flatten$2 as flatten, forEach$2 as forEach, fromArray$2 as fromArray, IterableAsync_fromFunction as fromFunction, IterableAsync_fromFunctionAwaited as fromFunctionAwaited, fromIterable$2 as fromIterable, map$2 as map, max$2 as max, min$2 as min, IterableAsync_nextWithTimeout as nextWithTimeout, reduce$2 as reduce, repeat$1 as repeat, slice$2 as slice, some$2 as some, toArray$2 as toArray, unique$2 as unique, uniqueByValue$2 as uniqueByValue, until$2 as until, IterableAsync_withDelay as withDelay, zip$2 as zip };
}

declare function slice$1<V>(it: Iterable<V>, start?: number, end?: number): Generator<V, void, unknown>;

declare function reduce$1<V>(it: Iterable<V>, f: (accumulator: V, current: V) => V, start: V): V;

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
declare const next: <T>(it: Generator<T>) => () => T | undefined;
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
 * Note: If the iterator is infinite, be sure to provide a limit via the options or the function
 * will never return.
 *
 * @param it Asynchronous iterable
 * @param options Options when converting to array.
 * @returns
 */
declare function toArray$1<V>(it: Iterable<V>, options?: Partial<ToArrayOptions>): Array<V>;
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
declare const IterableSync_next: typeof next;
declare const IterableSync_repeat: typeof repeat;
declare const IterableSync_yieldNumber: typeof yieldNumber;
declare namespace IterableSync {
  export { chunks$1 as chunks, IterableSync_chunksOverlapping as chunksOverlapping, concat$1 as concat, dropWhile$1 as dropWhile, equals$1 as equals, every$1 as every, fill$1 as fill, filter$1 as filter, find$1 as find, IterableSync_first as first, flatten$1 as flatten, forEach$1 as forEach, fromArray$1 as fromArray, fromIterable$1 as fromIterable, IterableSync_last as last, map$1 as map, max$1 as max, min$1 as min, IterableSync_next as next, reduce$1 as reduce, IterableSync_repeat as repeat, slice$1 as slice, some$1 as some, toArray$1 as toArray, unique$1 as unique, uniqueByValue$1 as uniqueByValue, until$1 as until, IterableSync_yieldNumber as yieldNumber, zip$1 as zip };
}

type WithEvents = {
    addEventListener(type: string, callbackfn: any): void;
    removeEventListener(type: string, callbackfn: any): void;
};
declare const isAsyncIterable: (v: any) => v is AsyncIterable<any>;
declare const isIterable: (v: any) => v is Iterable<any>;
declare const fromEvent: <V>(eventSource: WithEvents, eventType: string) => AsyncIterator<any>;

/**
 * {@inheritDoc Chains.combineLatestToArray}
 * @param sources
 * @param options
 * @returns
 */
declare function combineLatestToArray(sources: Array<GenOrData<any> | GenFactoryNoInput<any>>, options?: Partial<CombineLatestOptions>): AsyncGenerator<Array<any>>;
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
declare function forEach<V>(it: Array<V> | AsyncIterable<V> | Iterable<V>, f: (v: V) => boolean | Promise<boolean> | void | Promise<void>): Promise<void> | undefined;
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
declare function toArray<V>(it: AsyncIterable<V>, options?: Partial<ToArrayOptions>): Promise<Array<V>>;
declare function toArray<V>(it: Iterable<V>, options?: Partial<ToArrayOptions>): Array<V>;
declare function every<V>(it: Iterable<V> | Array<V>, f: (v: V) => boolean): boolean;
declare function every<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
declare function equals<V>(it1: AsyncIterable<V>, it2: AsyncIterable<V>, equality?: (a: V, b: V) => boolean): Promise<boolean>;
declare function equals<V>(it1: IterableIterator<V>, it2: IterableIterator<V>, equality?: (a: V, b: V) => boolean): boolean;
declare function zip<V>(...its: ReadonlyArray<AsyncIterable<V>>): Generator<Array<V>>;
declare function zip<V>(...its: ReadonlyArray<Iterable<V>>): Generator<V>;
declare function fromIterable<V>(iterable: Iterable<V>): Generator<V>;
declare function fromIterable<V>(iterable: AsyncIterable<V> | Iterable<V>, interval: Interval): AsyncGenerator<V>;

declare const index_Chains: typeof Chains;
declare const index_ToArrayOptions: typeof ToArrayOptions;
type index_WithEvents = WithEvents;
declare const index_chunks: typeof chunks;
declare const index_combineLatestToArray: typeof combineLatestToArray;
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
declare const index_fromEvent: typeof fromEvent;
declare const index_fromIterable: typeof fromIterable;
declare const index_isAsyncIterable: typeof isAsyncIterable;
declare const index_isIterable: typeof isIterable;
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
  export { IterableAsync as Async, index_Chains as Chains, IterableSync as Sync, index_ToArrayOptions as ToArrayOptions, type index_WithEvents as WithEvents, index_chunks as chunks, index_combineLatestToArray as combineLatestToArray, index_concat as concat, index_dropWhile as dropWhile, index_equals as equals, index_every as every, index_fill as fill, index_filter as filter, index_find as find, index_flatten as flatten, index_forEach as forEach, index_fromArray as fromArray, index_fromEvent as fromEvent, index_fromIterable as fromIterable, index_isAsyncIterable as isAsyncIterable, index_isIterable as isIterable, index_map as map, index_max as max, index_min as min, index_reduce as reduce, index_slice as slice, index_some as some, index_toArray as toArray, index_unique as unique, index_uniqueByValue as uniqueByValue, index_until as until, index_zip as zip };
}

export { isAsyncIterable as A, isIterable as B, fromEvent as C, IterableAsync as I, type WithEvents as W, max as a, chunks as b, combineLatestToArray as c, dropWhile as d, fill as e, filter as f, concat as g, find as h, index as i, forEach as j, map as k, fromArray as l, min as m, flatten as n, slice as o, unique as p, uniqueByValue as q, reduce as r, some as s, toArray as t, until as u, every as v, equals as w, fromIterable as x, IterableSync as y, zip as z };
