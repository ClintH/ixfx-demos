import { p as pingPong, a as pingPongPercent } from './PingPong-_5d7nj3a.js';
import { T as ToString, I as IterableAsync } from './Util-Voz0dRxX.js';
import { I as IsEqual } from './IsEqual-FYvx3mfi.js';
import { I as Interval } from './IntervalType-zqeNLRm6.js';
import { D as DelayOpts, d as delayLoop, i as interval } from './Delay-hF1EMMFA.js';
import { a as integerUniqueGen } from './index-4mt0l7Tl.js';

/**
 * Returns a section from an iterable
 * @param it Iterable
 * @param start Start index
 * @param end End index (or until completion)
 */
declare function slice<V>(it: Iterable<V>, start?: number, end?: number): Generator<V, void, unknown>;

/**
 * Filters the `input` iterable, only yielding unique values. Use {@link unique} to compare
 * by object reference instead.
 *
 * ```js
 * const d = ['a', 'b', 'c', 'b', 'd' ];
 * for (const v of uniqueByValue(d)) {
 *  // Yields: 'a', 'b', 'c', 'd'
 * // (extra 'b' is skipped)
 * }
 * ```
 *
 * By default, JSON.stringify is used to create a string representing value. These are added
 * to a Set of strings, which is how we keep track of uniqueness. If the value is already a string it is used as-is.
 *
 * This allows you to have custom logic for what determines uniqueness. Eg, using a single field
 * of an object as an identifier:
 *
 * ```js
 * const people = [
 *  { name: `Mary`, size: 20 }, { name: `Abdul`, size: 19 }, { name: `Mary`, size: 5 }
 * ]
 * for (const v of uniqueByValue(d, v=>v.name)) {
 *  // Yields: { name: `Mary`, size: 20 }, { name: `Abdul`, size: 19 }
 *  // Second 'Mary' is skipped because name is the same, even though size field is different.
 * }
 * ```
 *
 * If you want to keep track of the set of keys, or prime it with some existing data, provide a Set instance:
 * ```js
 * const unique = new Set();
 * unique.add(`b`);
 * const d = [`a`, `b`, `c`];
 * for (const v of uniqueByValue(d, toStringDefault, unique)) {
 *  // Yields: `a`, `c`
 *  // `b` is skipped because it was already in set
 * }
 * // After completion, `unique` contains `a`, `b` and `c`.
 * ```
 *
 * Creating your own Set is useful for tracking unique values across several calls to `uniqueByValue`.
 * @param input
 * @param seen
 * @param toString
 */
declare function uniqueByValue<T>(input: Iterable<T>, toString?: ToString<T>, seen?: Set<string>): Generator<T>;
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
declare function concat<V>(...its: ReadonlyArray<Iterable<V>>): Generator<V, void, undefined>;
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
declare function filter$1<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V, void, unknown>;
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
declare function max$1<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): V | undefined;
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
declare function min$1<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): V | undefined;
/**
 * Returns count from `start` for a given length
 * ```js
 * range(-5, 10);
 * // Yields: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
 * ```
 * @param start Start
 * @param length Length
 */
declare function range(start: number, length: number): Generator<number, void, unknown>;
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
declare function reduce<V>(it: Iterable<V>, f: (accumulator: V, current: V) => V, start: V): V;
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
 * Uses object reference to compare values.
 * Use {@link uniqueByValue} if this doesn't suffice.
 * @param iterable Iterable, or array of iterables
 */
declare function unique<V>(iterable: Iterable<V> | Array<Iterable<V>>): Generator<V, void, unknown>;
/**
 * Combine same-positioned items from several iterables
 * ```js
 * zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
 * Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
 * ```
 * @param its
 * @returns
 */
declare function zip<V>(...its: ReadonlyArray<Iterable<V>>): Generator<V[], void, unknown>;

declare const IterableSync_chunks: typeof chunks;
declare const IterableSync_chunksOverlapping: typeof chunksOverlapping;
declare const IterableSync_concat: typeof concat;
declare const IterableSync_dropWhile: typeof dropWhile;
declare const IterableSync_equals: typeof equals;
declare const IterableSync_every: typeof every;
declare const IterableSync_fill: typeof fill;
declare const IterableSync_find: typeof find;
declare const IterableSync_first: typeof first;
declare const IterableSync_forEach: typeof forEach;
declare const IterableSync_last: typeof last;
declare const IterableSync_map: typeof map;
declare const IterableSync_range: typeof range;
declare const IterableSync_reduce: typeof reduce;
declare const IterableSync_slice: typeof slice;
declare const IterableSync_some: typeof some;
declare const IterableSync_takeWhile: typeof takeWhile;
declare const IterableSync_unique: typeof unique;
declare const IterableSync_uniqueByValue: typeof uniqueByValue;
declare const IterableSync_yieldNumber: typeof yieldNumber;
declare const IterableSync_zip: typeof zip;
declare namespace IterableSync {
  export { IterableSync_chunks as chunks, IterableSync_chunksOverlapping as chunksOverlapping, IterableSync_concat as concat, IterableSync_dropWhile as dropWhile, IterableSync_equals as equals, IterableSync_every as every, IterableSync_fill as fill, filter$1 as filter, IterableSync_find as find, IterableSync_first as first, flatten$1 as flatten, IterableSync_forEach as forEach, IterableSync_last as last, IterableSync_map as map, max$1 as max, min$1 as min, IterableSync_range as range, IterableSync_reduce as reduce, IterableSync_slice as slice, IterableSync_some as some, IterableSync_takeWhile as takeWhile, IterableSync_unique as unique, IterableSync_uniqueByValue as uniqueByValue, IterableSync_yieldNumber as yieldNumber, IterableSync_zip as zip };
}

/**
 * A Generator, AsyncGenerator or IterableIterator
 */
type Gen<V> = Generator<V> | AsyncGenerator<V> | IterableIterator<V>;
/**
 * Some kind of (async) generator or an array of data of type V
 */
type GenOrData<V> = Array<V> | Gen<V>;
/**
 * A function which can form part of a chain.
 * It takes an input {@link GenOrData}, and returns a new generator.
 */
type Link<In, Out> = (input: GenOrData<In>) => AsyncGenerator<Out>;
/**
 * A function which can start a chain, since it takes no input
 */
type GenFactoryNoInput<Out> = () => AsyncGenerator<Out>;
/**
 * An array of chain links where first one is a source
 */
type LinksWithSource<In, Out> = [
    Link<In, any> | GenOrData<In> | GenFactoryNoInput<In>,
    ...Array<Link<any, any>>,
    Link<any, Out>
];
/**
 * Delay options
 */
type DelayOptions = {
    /**
     * Time before yielding
     */
    before?: Interval;
    /**
     * Time after yielding
     */
    after?: Interval;
};
type TickOptions = {
    interval: Interval;
    loops?: number;
    elapsed?: Interval;
    asClockTime?: boolean;
};
/**
 * A rank function that compares A and B.
 * Returns the highest value, 'a' or 'b'.
 * Returns 'eq' if values are equal
 */
type RankFunction<T> = (a: T, b: T) => `a` | `b` | `eq`;
type RankOptions = {
    /**
     * If set, only values with this JS type are included
     */
    includeType?: `string` | `number` | `object` | `boolean`;
    /**
     * If _true_, also emits values when they rank equal with current highest.
     * _false_ by default
     */
    emitEqualRanked?: boolean;
    /**
     * If _true_, emits the current highest value even if it hasn't changed.
     * This means it will match the tempo of the incoming stream.
     */
    emitRepeatHighest?: boolean;
};
type RankArrayOptions = RankOptions & {
    /**
     * If _true_, it's only the highest _within_ an array that is considered,
     * rather than tracking the higest between arrays
     * Default: _false_
     */
    withinArrays?: boolean;
};
/**
 * Lazy execution of a chain
 */
type LazyChain<In, Out> = {
    /**
     * Sets `data` to be the data for the chain
     * @param data
     * @returns
     */
    input: (data: GenOrData<In>) => LazyChain<In, Out>;
    /**
     * Return the results of the chain as a regular generator.
     * If `data` is not supplied, the last value given calling `input(data)` is used.
     * @param data
     * @returns
     */
    asGenerator: (data?: GenOrData<In>) => AsyncGenerator<Out>;
    /**
     * Returns the results of the chain as an array.
     * If `data` is not supplied, the last value given calling `input(data)` is used.
     * @param data
     * @returns
     */
    asArray: (data?: GenOrData<In>) => Promise<Array<Out>>;
    asAsync: (data?: GenOrData<In>) => LazyChain<In, Out>;
    /**
     * Gets the last output value from the chain.
     * If `data` is not supplied, the last value given calling `input(data)` is used.
     * @param data
     * @returns
     */
    lastOutput: (data?: GenOrData<In>) => Promise<Out | undefined>;
    /**
     * Gets the first output value from the chain.
     * If `data` is not supplied, the last value given calling `input(data)` is used.
     * @param data
     * @returns
     */
    firstOutput: (data?: GenOrData<In>) => Promise<Out | undefined>;
    /**
     * Uses a function as a source of values
     * @param callback
     * @returns
     */
    fromFunction: (callback: () => any) => LazyChain<any, any>;
    /**
     * Take `limit` number of values from the chain before ending
     * @param limit
     * @returns
     */
    take: (limit: number) => LazyChain<In, Out>;
    /**
     * Only emit values that have ranked higher than previously seen
     */
    rank: (r: RankFunction<In>, options: Partial<RankOptions>) => LazyChain<In, Out>;
    rankArray: (r: RankFunction<In>, options: Partial<RankArrayOptions>) => LazyChain<In, Out>;
    /**
     * Debounce values
     * @param duration
     * @returns
     */
    debounce: (duration: Interval) => LazyChain<In, Out>;
    /**
     * Delay emitting values
     * @param options
     * @returns
     */
    delay: (options: DelayOptions) => LazyChain<In, Out>;
    /**
     * Chunk values into arrays
     * @param size
     * @param returnRemainers
     * @returns
     */
    chunk: (size: number, returnRemainers?: boolean) => LazyChain<In, Out>;
    /**
     * Only allow values that meet `predicate` to pass
     * @param predicate
     * @returns
     */
    filter: (predicate: (input: any) => boolean) => LazyChain<In, Out>;
    /**
     * Gets the minimum numerical value (if relevant)
     * @returns
     */
    min: () => LazyChain<any, number>;
    /**
     * Gets the maximum numerical value (if relevant)
     * @returns
     */
    max: () => LazyChain<any, number>;
    /**
     * Gets the average numerical value (if relevant)
     * @returns
     */
    average: () => LazyChain<any, number>;
    /**
     * Gets the total of numerical values
     * @returns
     */
    total: () => LazyChain<In, number>;
    /**
     * Emits a running tally of how many values have been emitted
     * @returns
     */
    tally: () => LazyChain<In, number>;
    /**
     * Ignore values that match `predicate` (opposite of `filter()`)
     * @param predicate
     * @returns
     */
    drop: (predicate: (value: In) => boolean) => LazyChain<In, Out>;
    /**
     * Emit values until `period` has elapsed
     * @param period
     * @returns
     */
    duration: (period: Interval) => LazyChain<In, Out>;
    /**
     * Flatten values in an array into a single value
     * @param flattener
     * @returns
     */
    flatten: (flattener: (values: Array<any>) => any) => LazyChain<In, Out>;
    /**
     * Transform an input value to an output
     * @param transformer
     * @returns
     */
    transform: (transformer: (v: any) => any) => LazyChain<In, Out>;
};

type QueryOptions = {
    baseElement: HTMLElement;
};
type CreateOptions<In> = {
    /**
     * Parent element to create elements in. Defaults to `document.body`.
     */
    parentEl: string | HTMLElement;
    /**
     * When set, provide a custom function to return a unique key for a value.
     * This is used for matching values with elements when using immutable data.
     *
     * By default uses the
     * JSON.stringify() representation.
     *
     * To match elements with values by reference, set `byReference` instead.
     *
     * @param value
     * @returns
     */
    key: (value: In) => string;
    /**
     * Default: _false_. When _true_, associate created elements
     * to values by reference rather than value. This can be useful with mutable values.
     *
     * Use this _or_ the `key` option.
     */
    byReference: boolean;
    /**
     * What kind of HTML element to make, defaults to DIV
     */
    tagName: string;
    /**
     * Called whenever an element is created but not yet added to parent element
     * @param element
     * @returns
     */
    beforeInsert: (element: HTMLElement) => void;
    /**
     * Called after an element is inserted to the parent element
     */
    afterInsert: (element: HTMLElement) => void;
    /**
     * Called after an element has been removed
     * @param element
     * @returns
     */
    beforeRemove: (element: HTMLElement) => void;
};
type ElementWithValue<T> = {
    el: HTMLElement;
    value: T;
};
/**
 * Creates a HTML element per value. By default compares
 * values by `JSON.stringify`. Set `byReference:true` to
 * compare values based on reference. Or provide a toString
 * function via `key`.
 *
 * ```js
 * // Generate a random number between 0...4 every second
 * const looper = Generators.interval(() => Math.floor(Math.random()*5), 1000);
 *
 * // Make a chain
 * const ch = Chains.run(
 *  looper,
 *  Chains.Links.delay({before:1000}),
 *  Chains.Dom.perValue()
 * );
 *
 * setTimeout(async () => {
 *    for await (const v of ch) {
 *      const {el,value} = v;
 *      el.textContent = `${value} - ${Date.now().toString()}`;
 *    }
 *    console.log(`ch iteration done`);
 *  });
 * ```
 */
declare function perValue<In>(options?: Partial<CreateOptions<In>>): Link<In, ElementWithValue<In>>;
/**
 * From an input stream of strings, yields an output of HTMLElememnts
 * @param options
 * @returns
 */
declare function query(options?: Partial<QueryOptions>): Link<string, HTMLElement>;

type Dom_CreateOptions<In> = CreateOptions<In>;
type Dom_ElementWithValue<T> = ElementWithValue<T>;
type Dom_QueryOptions = QueryOptions;
declare const Dom_perValue: typeof perValue;
declare const Dom_query: typeof query;
declare namespace Dom {
  export { type Dom_CreateOptions as CreateOptions, type Dom_ElementWithValue as ElementWithValue, type Dom_QueryOptions as QueryOptions, Dom_perValue as perValue, Dom_query as query };
}

/**
 * Transform values from one type to another. Just like a map function.
 * @param transformer
 * @returns
 */
declare function transform<In, Out>(transformer: (v: In) => Out): Link<In, Out>;
/**
 * Take `limit` number of results from the stream, before closing
 * @param limit
 * @returns
 */
declare function take<In>(limit: number): Link<In, In>;
/**
 * Takes an array of values, flattening to a single one
 * using the provided `flattener` function.
 *
 * ```js
 * // Create a chain that flattens values
 * const flatten = Chains.flatten(values => Math.max(...values));
 * // Feed it a single input (an array), get a single output back:
 * const result = await Chains.single(flatten, [ 1, 2, 3]); // 3
 * ```
 * @param flattener Function to flatten array of values to a single value
 * @returns
 */
declare function flatten<In, Out>(flattener: (v: Array<In>) => Out): Link<Array<In>, Out>;
/**
 * Allow values through until a duration has elapsed. After
 * that, the chain stops.
 * @param elapsed
 * @returns
 */
declare function duration<In>(elapsed: Interval): Link<In, In>;
/**
 * Add delay before/after values are emitted from the input stream.
 * @param options
 * @returns
 */
declare function delay<In>(options: DelayOptions): Link<In, In>;
/**
 * Ensure a minimum length of time between values.
 * Values being produced too quickly are dropped.
 *
 * In the following example, only three values will be let through.
 * ```js
 * const chain = Chains.chain(
 *  // Produce values every 10ms for 350ms
 *  Chains.tick({ interval: 10, elapsed: 350 }),
 *  // Only let a value through every 100ms
 *  Chains.debounce(100)
 * );
 * ```
 * @param rate
 * @returns
 */
declare function debounce<In>(rate: Interval): Link<In, In>;
/**
 * Returns a running tally of how many items have been
 * emitted from the input source.
 *
 * This is different than {@link total} which adds up numeric values
 * @returns
 */
declare function tally<In>(): Link<In, number>;
/**
 * Returns the smallest value from the input.
 * Can work with numbers or number[] as input.
 * Non-numeric data is filtered out.
 * @returns
 */
declare function min(): Link<number | Array<number>, number>;
/**
 * Returns the largest value from the input
 * Non-numeric data is filtered out
 * @returns
 */
declare function max(): Link<number | Array<number>, number>;
/**
 * Emits the currently ranked 'highest' value from a stream. Only
 * values exceeding the current highest are emitted.
 *
 * eg, if we are ranking on numerical value, an input stream of:
 * ```
 * 4, 1, 6, 10, 2, 4
 * ```
 *
 * Results in the output stream of:
 * ```
 * 4, 6, 10
 * ```
 *
 * @example
 * ```js
 * // Rank based on a field
 * Chains.Links.rank((a,b) => {
 *  if (a.size > b.size) return `a`;
 *  if (a.size < b.size) return `b`;
 *  return `eq`;
 * });
 * ```
 * @param options
 * @returns
 */
declare function rank<In>(r: RankFunction<In>, options?: Partial<RankOptions>): Link<In, In>;
/**
 * Emits the highest-ranked value from amongst an array of values.
 *
 * By default, it tracks the highest-ranked _between_ arrays.
 *
 * For example:
 * ```js
 * // Input
 * [ [4,5,6], [1,2,3] ]
 * // Outputs:
 * [ 6 ]
 * ```
 *
 * This behaviour can be modified with an option to only compare _within_ arrays.
 * ```
 * // Input
 * [ [4,5,6], [1,2,3] ]
 * // Output:
 * [ 6, 3 ]
 * ```
 *
 * Uses the `rank` option to determine which is more highly ranked.
 * ```js
 * Chains.Links.rankArray(
 *  (a, b) => {
 *    if (a > b) return `a`; // a is higher
 *    else if (b > a) return `b`; // b is higher
 *    return `eq`; // same
 *  }
 * )
 * ```
 * @param options
 * @returns
 */
declare function rankArray<In>(r: RankFunction<In>, options?: Partial<RankArrayOptions>): Link<Array<In>, In>;
/**
 * Returns the average from the input.
 * Non-numeric values are filtered out.
 * @returns
 */
declare function average(): Link<number, number>;
/**
 * Returns the total of the numeric values.
 * Non-numeric values are filtered out.
 * @returns
 */
declare function total(): Link<number, number>;
/**
 * Chunks an input stream into `size` chunks.
 *
 * Eg, with a chunk size of 3, the input stream of:
 *  1, 2, 3, 4, 5, 6
 * Yields:
 *  [ 1, 2, 3 ], [ 4, 5, 6 ]
 *
 * If `returnRemainders` is _true_ (default), any left over values are returned even if
 * it's less than `size`.
 * @param size
 * @param returnRemainders If true (default) left over data that didn't make a full chunk is also returned
 * @returns
 */
declare function chunk<In>(size: number, returnRemainders?: boolean): Link<In, Array<In>>;
/**
 * Filters the input source, only allowing through
 * data for which `predicate` returns _true_
 *
 * {@link drop}, on the other hand excludes values for which predicate is _true_
 * @param predicate
 * @returns
 */
declare function filter<In>(predicate: (v: In) => boolean): Link<In, In>;
/**
 * Drops all values from input stream for which `predicate` returns _true_
 *
 * {@link filter}, on the other hand includes values where the predicate is _true_
 * @param predicate
 * @returns
 */
declare function drop<In>(predicate: (v: In) => boolean): Link<In, In>;

declare const Links_average: typeof average;
declare const Links_chunk: typeof chunk;
declare const Links_debounce: typeof debounce;
declare const Links_delay: typeof delay;
declare const Links_drop: typeof drop;
declare const Links_duration: typeof duration;
declare const Links_filter: typeof filter;
declare const Links_flatten: typeof flatten;
declare const Links_max: typeof max;
declare const Links_min: typeof min;
declare const Links_rank: typeof rank;
declare const Links_rankArray: typeof rankArray;
declare const Links_take: typeof take;
declare const Links_tally: typeof tally;
declare const Links_total: typeof total;
declare const Links_transform: typeof transform;
declare namespace Links {
  export { Links_average as average, Links_chunk as chunk, Links_debounce as debounce, Links_delay as delay, Links_drop as drop, Links_duration as duration, Links_filter as filter, Links_flatten as flatten, Links_max as max, Links_min as min, Links_rank as rank, Links_rankArray as rankArray, Links_take as take, Links_tally as tally, Links_total as total, Links_transform as transform };
}

declare function lazy<In, Out>(): LazyChain<In, Out>;
/**
 * Generate timestamp values at `interval` rate. By default it runs forever.
 * Use `loops` or `elapsed` to set upper limit on how long it should run.
 *
 * Options:
 * - `asClockTime`: If _true_, yielded value will be clock time rather than elapsed milliseconds
 * @param options
 * @returns
 */
declare function tick(options: TickOptions): GenFactoryNoInput<number>;
/**
 * Produce a value from a callback. When
 * the callback returns _undefined_ it is considered done.
 *
 * ```js
 * const callback = () => Math.random();
 *
 * const f = Chains.fromFunction(callback);
 * f(); // New random number
 * ```
 *
 * In the context of a chain:
 * ```js
 * let produced = 0;
 * const chain = Chains.chain<number, string>(
 *  // Produce incrementing numbers
 *  Chains.fromFunction(() => produced++),
 *  // Convert to `x:0`, `x:1` ...
 *  Chains.transform(v => `x:${ v }`),
 *  // Take first 5 results
 *  Chains.cap(5)
 * );
 * const data = await Chains.asArray(chain);
 * ```
 * @param callback
 * @returns
 */
declare function fromFunction<Out>(callback: () => Promise<Out> | Out): GenFactoryNoInput<Out>;
declare function fromEvent<Out>(target: EventTarget, name: string): {
    (): AsyncGenerator<Out>;
    _name: string;
};
/**
 * Treats the chain/generator as a promise
 *
 * ```js
 * const ticker = asPromise(tick({ interval: 1000 }));
 * const x = await ticker(); //  Waits for 1000ms before giving a value
 * ```
 *
 * This will only ever return one value. To return multiple values, it's necessary
 * to call `asPromise` and `await` the result in a loop.
 * @param valueToWrap
 * @returns
 */
declare function asPromise<V>(valueToWrap: AsyncGenerator<V> | GenFactoryNoInput<V>): () => Promise<V | undefined>;
/**
 * Returns the most recent value from the chain/generator, or
 * `initialValue` (defaulting to _undefined_) if no value
 * has been emitted yet.
 *
 * ```js
 * const ticker = asValue(tick({ interval: 1000 }));
 * x = ticker(); // Get the most recent value
 * ```
 *
 * Every time it's called, it fetches a new value from the generator, assuming
 * it isn't already awaiting a result.
 *
 * In the meantime, the last value (or `initialValue`) is returned.
 * @param valueToWrap Value to wrap
 * @param initialValue Initial value
 * @returns
 */
declare function asValue<V>(valueToWrap: AsyncGenerator<V> | GenFactoryNoInput<V>, initialValue?: V): () => V | undefined;
/**
 * Calls `callback` whenever the chain/generator produces a value.
 *
 * When using `asCallback`, call it with `await` to let generator run its course before continuing:
 * ```js
 * await asCallback(tick({ interval:1000, loops:5 }), x => {
 *  // Gets called 5 times, with 1000ms interval
 * });
 * console.log(`Hi`); // Prints after 5 seconds
 * ```
 *
 * Or if you skip the `await`, code continues and callback will still run:
 * ```js
 * asCallback(tick({ interval: 1000, loops: 5}), x => {
 *  // Gets called 5 times, with 1000ms interval
 * });
 * console.log(`Hi`); // Prints immediately
 * ```
 * @param valueToWrap
 * @param callback
 */
declare function asCallback<V>(valueToWrap: GenOrData<V> | GenFactoryNoInput<V>, callback: (v: V) => unknown, onDone?: () => void): Promise<void>;
/**
 * Async function that returns the chain as an array of values
 * ```js
 * const values = await asArray(tick( { interval: 1000, loops: 5 }));
 * // After 5 seconds, values will be a set of timestamps.
 * ```
 * @param valueToWrap
 * @returns
 */
declare function asArray<Out>(valueToWrap: AsyncGenerator<Out> | GenFactoryNoInput<Out>): Promise<Array<Out>>;
/**
 * Adds values to the provided array as they are produced,
 * mutating array.
 *
 * ```js
 * const data = [];
 * addToArray(data, tick({ interval: 1000, loops: 5 }));
 * // Execution continues immediately, with `data` mutated over time
 * ```
 * @param valueToWrap
 * @param array
 */
declare function addToArray<Out>(array: Array<Out>, valueToWrap: AsyncGenerator<Out> | GenFactoryNoInput<Out>): Promise<void>;
/**
 * Input a single value to the chain, return a single result
 * @param f
 * @param input
 * @returns
 */
declare function single<In, Out>(f: Link<In, Out>, input: In): Promise<Out | undefined>;
/**
 * Merge values from several sources into one stream, interleaving values.
 * When all streams are complete it finishes.
 *
 * Alternatively:
 * - {@link mergeAsArray} emits snapshots of all the generators, as quickly as the fastest one
 * - {@link synchronise} which releases a set of results when all inputs have emitted a value
 * @param sources
 */
declare function mergeFlat<Out>(...sources: Array<GenOrData<any> | GenFactoryNoInput<any>>): AsyncGenerator<Out>;
/**
 * Generate values for each source, returning results as an array.
 * If a source finishes before another, null will be used at its position in the results.
 * Use {@link synchronise} instead to only release results when all sources have yielded a value.
 *
 * Finishes when all generators finish.
 *
 * Alternatively:
 * - {@link mergeFlat} interleaves streams as single values
 * - {@link synchronise} only return results when all sourcse have yielded a value
 * @param sources
 */
declare function mergeAsArray(...sources: Array<GenOrData<any> | GenFactoryNoInput<any>>): AsyncGenerator<Array<any>>;
/**
 * Synchronise several sources, releasing a set of results when every
 * source has produced something. Finishes as soon as _any_ source finishes.
 *
 * ie. the rate of emitting data is determined by the slowest source.
 *
 * Alternatively:
 * - {@link mergeFlat} interleaves streams as single values
 * - {@link mergeAsArray} emits snapshots of all the generators, as quickly as the fastest one
 * @param sources
 */
declare function synchronise(...sources: Array<GenOrData<any> | GenFactoryNoInput<any>>): AsyncGenerator<Array<any>>;
/**
 * Chain functions together. First argument is the source.
 * `runN` takes any number of chain functions. Use {@link run} if
 * possible, because it has improved type hinting.
 *
 * @example Process an array of strings. Transforming into
 * integers, and then filtering only even numbers.
 * ```js
 * const ch = Chains.runN(
 *  [ `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` ],
 *  Chains.transform<string, number>(v => Number.parseInt(v)),
 *  Chains.filter(v => v % 2 === 0)
 *);
 * const output = await Async.toArray(ch2);
 * // [ 2, 4, 6, 8, 10 ]
 * ```
 * @param functions
 * @returns
 */
declare function runN<In, Out>(...functions: LinksWithSource<In, Out>): AsyncGenerator<Out>;
declare function run<T1>(gen: GenOrData<T1> | GenFactoryNoInput<T1>): AsyncGenerator<T1>;
declare function run<T1, T2>(gen: GenOrData<T1> | GenFactoryNoInput<T1>, l0: Link<T1, T2>): AsyncGenerator<T2>;
declare function run<T1, T2, T3>(gen: GenOrData<T1> | GenFactoryNoInput<T1>, l0: Link<T1, T2>, l1: Link<T2, T3>): AsyncGenerator<T3>;
declare function run<T1, T2, T3, T4>(gen: GenOrData<T1> | GenFactoryNoInput<T1>, l0: Link<T1, T2>, l1: Link<T2, T3>, l2: Link<T3, T4>): AsyncGenerator<T4>;
declare function run<T1, T2, T3, T4, T5>(gen: GenOrData<T1> | GenFactoryNoInput<T1>, l0: Link<T1, T2>, l1: Link<T2, T3>, l2: Link<T3, T4>, l3: Link<T4, T5>): AsyncGenerator<T5>;
declare function run<T1, T2, T3, T4, T5, T6>(gen: GenOrData<T1> | GenFactoryNoInput<T1>, l0: Link<T1, T2>, l1: Link<T2, T3>, l2: Link<T3, T4>, l3: Link<T4, T5>, l4: Link<T5, T6>): AsyncGenerator<T6>;
declare function run<T1, T2, T3, T4, T5, T6, T7>(gen: GenOrData<T1> | GenFactoryNoInput<T1>, l0: Link<T1, T2>, l1: Link<T2, T3>, l2: Link<T3, T4>, l3: Link<T4, T5>, l4: Link<T5, T6>, l5: Link<T6, T7>): AsyncGenerator<T7>;

declare const index$1_Dom: typeof Dom;
declare const index$1_Links: typeof Links;
declare const index$1_addToArray: typeof addToArray;
declare const index$1_asArray: typeof asArray;
declare const index$1_asCallback: typeof asCallback;
declare const index$1_asPromise: typeof asPromise;
declare const index$1_asValue: typeof asValue;
declare const index$1_fromEvent: typeof fromEvent;
declare const index$1_fromFunction: typeof fromFunction;
declare const index$1_lazy: typeof lazy;
declare const index$1_mergeAsArray: typeof mergeAsArray;
declare const index$1_mergeFlat: typeof mergeFlat;
declare const index$1_run: typeof run;
declare const index$1_runN: typeof runN;
declare const index$1_single: typeof single;
declare const index$1_synchronise: typeof synchronise;
declare const index$1_tick: typeof tick;
declare namespace index$1 {
  export { index$1_Dom as Dom, index$1_Links as Links, index$1_addToArray as addToArray, index$1_asArray as asArray, index$1_asCallback as asCallback, index$1_asPromise as asPromise, index$1_asValue as asValue, index$1_fromEvent as fromEvent, index$1_fromFunction as fromFunction, index$1_lazy as lazy, index$1_mergeAsArray as mergeAsArray, index$1_mergeFlat as mergeFlat, index$1_run as run, index$1_runN as runN, index$1_single as single, index$1_synchronise as synchronise, index$1_tick as tick };
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
 * Returns chunks of a string, broken up by delimiter (default '.')
 * ````js
 * stringSegmentsFromEnd(`a.b.c.d`);
 * // Yields:
 * // `a.b.c.d`
 * // `b.c.d`
 * // `c.d`
 * // `d`
 * ```
 * @param source
 * @param delimiter
 */
declare function stringSegmentsFromEnd(source: string, delimiter?: string): Generator<string, void, unknown>;
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

declare const index_DelayOpts: typeof DelayOpts;
declare const index_count: typeof count;
declare const index_delayLoop: typeof delayLoop;
declare const index_interval: typeof interval;
declare const index_numericPercent: typeof numericPercent;
declare const index_numericRange: typeof numericRange;
declare const index_numericRangeRaw: typeof numericRangeRaw;
declare const index_pingPong: typeof pingPong;
declare const index_pingPongPercent: typeof pingPongPercent;
declare const index_stringSegmentsFromEnd: typeof stringSegmentsFromEnd;
declare namespace index {
  export { IterableAsync as Async, index$1 as Chain, index_DelayOpts as DelayOpts, IterableSync as Sync, index_count as count, index_delayLoop as delayLoop, index_interval as interval, index_numericPercent as numericPercent, index_numericRange as numericRange, index_numericRangeRaw as numericRangeRaw, index_pingPong as pingPong, index_pingPongPercent as pingPongPercent, integerUniqueGen as randomUniqueInteger, index_stringSegmentsFromEnd as stringSegmentsFromEnd };
}

export { IterableSync as I, numericRange as a, numericPercent as b, count as c, index$1 as d, index as i, numericRangeRaw as n, stringSegmentsFromEnd as s };
