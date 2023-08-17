import { D as DelayOpts, d as delayLoop, a as interval } from './index-e1bed935.js';
import { i as integerUniqueGen } from './Arrays-83c49f17.js';
import { p as pingPong, a as pingPongPercent } from './PingPong-8ac9a1c4.js';
import { I as IsEqual, T as ToString, a as IterableAsync } from './Util-21835c84.js';

/**
 * Return `it` broken up into chunks of `size`
 *
 * ```js
 * chunks([1,2,3,4,5,6,7,8,9,10], 3);
 * // Yields: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 * @param it
 * @param size
 * @returns
 */

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
declare function yieldNumber(generator: Generator<number>, defaultValue?: undefined): () => any;
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
/**
 * Breaks an iterable into array chunks
 * ```js
 * chunks([1,2,3,4,5,6,7,8,9,10], 3);
 * // Yields [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 * @param it
 * @param size
 */
declare function chunks<V>(it: Iterable<V>, size: number): Generator<V[], void, unknown>;
/**
 * Return concatenation of iterators
 * @param its
 */
declare function concat<V>(...its: readonly Iterable<V>[]): Generator<V, void, undefined>;
/**
 * Drops elements that do not meet the predicate `f`.
 * ```js
 * dropWhile([1, 2, 3, 4], e => e < 3);
 * returns [3, 4]
 * ```
 * @param it
 * @param f
 */
declare function dropWhile<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V, void, undefined>;
/**
 * Returns true if items in two iterables are equal, as
 * determined by the `equality` function.
 * @param it1
 * @param it2
 * @param equality
 * @returns
 */
declare function equals<V>(it1: IterableIterator<V>, it2: IterableIterator<V>, equality?: IsEqual<V>): boolean | undefined;
/**
 * Returns true if `f` returns true for
 * every item in iterable
 * @param it
 * @param f
 * @returns
 */
declare function every<V>(it: Iterable<V>, f: (v: V) => boolean): boolean;
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
declare function fill<V>(it: Iterable<V>, v: V): Generator<V, void, unknown>;
/**
 * Execute function `f` for each item in iterable
 * @param it
 * @param f
 */
declare function forEach<V>(it: Iterable<V>, f: (v: V) => boolean): void;
/**
 * ```js
 * filter([1, 2, 3, 4], e => e % 2 == 0);
 * returns [2, 4]
 * ```
 * @param it
 * @param f
 */
declare function filter<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V, void, unknown>;
/**
 * Returns first item from iterable `it` that matches predicate `f`
 * ```js
 * find([1, 2, 3, 4], e => e > 2);
 * // Yields: 3
 * ```
 * @param it
 * @param f
 * @returns
 */
declare function find<V>(it: Iterable<V>, f: (v: V) => boolean): V | undefined;
/**
 * Returns a 'flattened' copy of array, un-nesting arrays one level
 * ```js
 * flatten([1, [2, 3], [[4]]]);
 * // Yields: [1, 2, 3, [4]];
 * ```
 * @param it
 */
declare function flatten<V>(it: Iterable<V>): Generator<any, void, unknown>;
/**
 * Maps an iterable of type `V` to type `X`.
 * ```js
 * map([1, 2, 3], e => e*e)
 * returns [1, 4, 9]
 * ```
 * @param it
 * @param f
 */
declare function map<V, X>(it: Iterable<V>, f: (v: V) => X): Generator<X, void, unknown>;
/**
 * Returns the maximum seen of an iterable
 * ```js
 * min([
 *  {i:0,v:1},
 *  {i:1,v:9},
 *  {i:2,v:-2}
 * ], (a, b) => a.v > b.v);
 * // Yields: {i:1, v:-9}
 * ```
 * @param it Iterable
 * @param gt Should return _true_ if `a` is greater than `b`.
 * @returns
 */
declare function max<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): V | undefined;
/**
 * Returns the minimum seen of an iterable
 * ```js
 * min([
 *  {i:0,v:1},
 *  {i:1,v:9},
 *  {i:2,v:-2}
 * ], (a, b) => a.v > b.v);
 * // Yields: {i:2, v:-2}
 * ```
 * @param it Iterable
 * @param gt Should return _true_ if `a` is greater than `b`.
 * @returns
 */
declare function min<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): V | undefined;
/**
 * Returns count from `start` for a given length
 * ```js
 * range(-5, 10);
 * // Yields: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
 * ```
 * @param start
 * @param len
 */
declare function range(start: number, len: number): Generator<number, void, unknown>;
/**
 * Reduce for iterables
 * ```js
 * reduce([1, 2, 3], (acc, cur) => acc + cur, 0);
 * // Yields: 6
 * ```
 * @param it Iterable
 * @param f Function
 * @param start Start value
 * @returns
 */
declare function reduce<V>(it: Iterable<V>, f: (acc: V, current: V) => V, start: V): V;
/**
 * Returns a section from an iterable
 * @param it Iterable
 * @param start Start index
 * @param end End index (or until completion)
 */
declare function slice<V>(it: Iterable<V>, start?: number, end?: number): Generator<V, void, unknown>;
/**
 * Returns true the first time `f` returns true. Useful for spotting any occurrence of
 * data, and exiting quickly
 * ```js
 * some([1, 2, 3, 4], e => e % 3 === 0);
 * // Yields: true
 * ```
 * @param it Iterable
 * @param f Filter function
 * @returns
 */
declare function some<V>(it: Iterable<V>, f: (v: V) => boolean): boolean;
/**
 * Returns items for which the filter function returns _true_
 * ```js
 * takeWhile([ 1, 2, 3, 4 ], e => e < 3);
 * // Yields: [ 1, 2 ]
 * ```
 * @param it Iterable
 * @param f Filter function
 * @returns
 */
declare function takeWhile<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V, void, unknown>;
/**
 * Returns unique items from an iterable or
 * array of iterables.
 *
 * ```js
 * const data = [ 'apples', 'oranges' ]
 * const data2 = [ 'oranges', 'pears' ]
 * const unique = [...unique([data,data2]];
 * // Yields: [ 'apples', 'oranges', 'pears' ]
 * ```
 *
 * Custom function can be used that returns a key for
 * an item, determining equality. By default uses
 * JSON.stringify.
 *
 * ```js
 * const data = [ {i:0,v:2}, {i:1,v:3}, {i:2,v:2} ];
 *
 * // Item identity based on 'v' field
 * unique(data, e => e.v);
 * //Yields: [ {i:0,v:2}, {i:1,v:3} ]
 * ```
 * @param iterable Iterable, or array of iterables
 * @param f
 */
declare function unique<V>(iterable: Iterable<V> | Iterable<V>[], keyFn?: ToString<V>): Generator<V, void, unknown>;
/**
 * Combine same-positioned items from several iterables
 * ```js
 * zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
 * Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
 * ```
 * @param its
 * @returns
 */
declare function zip<V>(...its: readonly Iterable<V>[]): Generator<any[], void, unknown>;

declare const IterableSync_chunks: typeof chunks;
declare const IterableSync_chunksOverlapping: typeof chunksOverlapping;
declare const IterableSync_concat: typeof concat;
declare const IterableSync_dropWhile: typeof dropWhile;
declare const IterableSync_equals: typeof equals;
declare const IterableSync_every: typeof every;
declare const IterableSync_fill: typeof fill;
declare const IterableSync_filter: typeof filter;
declare const IterableSync_find: typeof find;
declare const IterableSync_first: typeof first;
declare const IterableSync_flatten: typeof flatten;
declare const IterableSync_forEach: typeof forEach;
declare const IterableSync_last: typeof last;
declare const IterableSync_map: typeof map;
declare const IterableSync_max: typeof max;
declare const IterableSync_min: typeof min;
declare const IterableSync_range: typeof range;
declare const IterableSync_reduce: typeof reduce;
declare const IterableSync_slice: typeof slice;
declare const IterableSync_some: typeof some;
declare const IterableSync_takeWhile: typeof takeWhile;
declare const IterableSync_unique: typeof unique;
declare const IterableSync_yieldNumber: typeof yieldNumber;
declare const IterableSync_zip: typeof zip;
declare namespace IterableSync {
  export {
    IterableSync_chunks as chunks,
    IterableSync_chunksOverlapping as chunksOverlapping,
    IterableSync_concat as concat,
    IterableSync_dropWhile as dropWhile,
    IterableSync_equals as equals,
    IterableSync_every as every,
    IterableSync_fill as fill,
    IterableSync_filter as filter,
    IterableSync_find as find,
    IterableSync_first as first,
    IterableSync_flatten as flatten,
    IterableSync_forEach as forEach,
    IterableSync_last as last,
    IterableSync_map as map,
    IterableSync_max as max,
    IterableSync_min as min,
    IterableSync_range as range,
    IterableSync_reduce as reduce,
    IterableSync_slice as slice,
    IterableSync_some as some,
    IterableSync_takeWhile as takeWhile,
    IterableSync_unique as unique,
    IterableSync_yieldNumber as yieldNumber,
    IterableSync_zip as zip,
  };
}

/**
 * Generates a range of numbers, starting from `start` and counting by `interval`.
 * If `end` is provided, generator stops when reached.
 *
 * Unlike {@link numericRange}, numbers might contain rounding errors
 *
 * ```js
 * for (const c of numericRangeRaw(10, 100)) {
 *  // 100, 110, 120 ...
 * }
 * ```
 * @param interval Interval between numbers
 * @param start Start
 * @param end End (if undefined, range never ends)
 */
declare const numericRangeRaw: (interval: number, start?: number, end?: number, repeating?: boolean) => Generator<number, void, unknown>;
/**
 * Generates a range of numbers, with a given interval.
 *
 * @example For-loop
 * ```
 * let loopForever = numericRange(0.1); // By default starts at 0 and counts upwards forever
 * for (v of loopForever) {
 *  console.log(v);
 * }
 * ```
 *
 * @example If you want more control over when/where incrementing happens...
 * ```js
 * let percent = numericRange(0.1, 0, 1);
 *
 * let percentResult = percent.next().value;
 * ```
 *
 * Note that computations are internally rounded to avoid floating point math issues. So if the `interval` is very small (eg thousandths), specify a higher rounding
 * number.
 *
 * @param interval Interval between numbers
 * @param start Start. Defaults to 0
 * @param end End (if undefined, range never ends)
 * @param repeating Range loops from start indefinately. Default _false_
 * @param rounding A rounding that matches the interval avoids floating-point math hikinks. Eg if the interval is 0.1, use a rounding of 10
 */
declare const numericRange: (interval: number, start?: number, end?: number, repeating?: boolean, rounding?: number) => Generator<number, void, unknown>;
/**
 * Yields `amount` integers, counting by one from zero. If a negative amount is used,
 * count decreases. If `offset` is provided, this is added to the return result.
 * @example
 * ```js
 * const a = [...count(5)]; // Yields five numbers: [0,1,2,3,4]
 * const b = [...count(-5)]; // Yields five numbers: [0,-1,-2,-3,-4]
 * for (const v of count(5, 5)) {
 *  // Yields: 5, 6, 7, 8, 9
 * }
 * const c = [...count(5,1)]; // Yields [1,2,3,4,5]
 * ```
 *
 * @example Used with forEach
 * ```js
 * // Prints `Hi` 5x
 * forEach(count(5), () => // do something);
 * ```
 *
 * If you want to accumulate return values, consider using
 * {@link Flow.repeat}.
 *
 * @example Run some code every 100ms, 10 times:
 * ```js
 * import { interval } from 'https://unpkg.com/ixfx/dist/flow.js'
 * import { count } from 'https://unpkg.com/ixfx/dist/generators.js'
 * const counter = count(10);
 * for await (const v of interval(counter, { fixedIntervalMs: 100 })) {
 *  // Do something
 * }
 * ```
 * @param amount Number of integers to yield
 * @param offset Added to result
 */
declare const count: (amount: number, offset?: number) => Generator<number, void, unknown>;
/**
 * Returns a number range between 0.0-1.0.
 *
 * ```
 * // Yields: [0, 0.2, 0.4, 0.6, 0.8, 1]
 * const a = [...numericPercent(0.2)];
 *
 * // Repeating flag set to true:
 * for (const v of numericPercent(0.2, true)) {
 *  // Infinite loop. V loops back to 0 after hitting 1
 * }
 * ```
 *
 * If `repeating` is true, it loops back to 0 after reaching 1
 * @param interval Interval (default: 0.01, ie. 1%)
 * @param repeating Whether generator should loop (default: false)
 * @param start Start (default: 0)
 * @param end End (default: 1)
 * @returns
 */
declare const numericPercent: (interval?: number, repeating?: boolean, start?: number, end?: number) => Generator<number, void, unknown>;

declare const Generators_DelayOpts: typeof DelayOpts;
declare const Generators_count: typeof count;
declare const Generators_delayLoop: typeof delayLoop;
declare const Generators_interval: typeof interval;
declare const Generators_numericPercent: typeof numericPercent;
declare const Generators_numericRange: typeof numericRange;
declare const Generators_numericRangeRaw: typeof numericRangeRaw;
declare const Generators_pingPong: typeof pingPong;
declare const Generators_pingPongPercent: typeof pingPongPercent;
declare namespace Generators {
  export {
    IterableAsync as Async,
    Generators_DelayOpts as DelayOpts,
    IterableSync as Sync,
    Generators_count as count,
    Generators_delayLoop as delayLoop,
    Generators_interval as interval,
    Generators_numericPercent as numericPercent,
    Generators_numericRange as numericRange,
    Generators_numericRangeRaw as numericRangeRaw,
    Generators_pingPong as pingPong,
    Generators_pingPongPercent as pingPongPercent,
    integerUniqueGen as randomUniqueInteger,
  };
}

export { Generators as G, IterableSync as I, numericRange as a, numericPercent as b, count as c, numericRangeRaw as n };
