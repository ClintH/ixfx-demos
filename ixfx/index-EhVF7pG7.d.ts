import { a as RankFunction, b as RankOptions, R as RankArrayOptions } from './Types-AjpgZy7P.js';
import { I as Interval } from './IntervalType-B4PbUkjV.js';

type ToArrayOptions = {
    limit: number;
    elapsed: Interval;
};

type SyncOptions = {
    /**
     * How to handle when a source completes.
     * * 'allow' means we continue synchronising with remaining alive sources. Use 'finalValue' option to control what data is returned for completed sources
     * * 'break' means we stop the stream, because synchronisation across all sources is no longer possible.
     *
     * Default: 'break'.
     */
    onSourceDone: `allow` | `break`;
    /**
     * Maximum time to wait for synchronisation to happen.
     * If interval is exceeded, stream closes.
     * Default: 2s
     */
    maximumWait: Interval;
    /**
     * If we continue synchronisation when a source is done (via `onSourceDone:'allow'`),
     * what source should be returned for a completed source?
     * * 'undefined': _undefined_
     * * 'last': the last received value, or _undefined_
     *
     * Default: 'undefined'
     */
    finalValue: `undefined` | `last`;
};
type CombineLatestOptions = {
    onSourceDone: `allow` | `break`;
    /**
   * If we continue synchronisation when a source is done (via `onSourceDone:'allow'`),
   * what source should be returned for a completed source?
   * * 'undefined': _undefined_
   * * 'last': the last received value, or _undefined_
   *
   * Default: 'undefined'
   */
    finalValue: `undefined` | `last`;
    /**
     * After an array is emitted, what to do with
     * last values. By default, the last value is kept.
     * If 'undefined' is used, _undefined_ is used until
     * source emits again.
     *
     * Default: 'last'
     */
    afterEmit: `undefined` | `last`;
};
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
type Link<In, Out> = {
    (input: GenOrData<In>): AsyncGenerator<Out>;
    _name?: string;
};
/**
 * A function which can start a chain, since it takes no input
 */
type GenFactoryNoInput<Out> = {
    (): AsyncGenerator<Out>;
    _type: `GenFactoryNoInput`;
    _name: string;
};
/**
 * An array of chain links where first one is a source
 */
type LinksWithSource<In, Out> = [
    Link<In, any> | GenOrData<In> | GenFactoryNoInput<In>,
    ...Array<Link<any, any>>,
    Link<any, Out>
];
/**
 * An array of chain links without a source
 */
type Links$1<In, Out> = [
    Link<In, any>,
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
    sum: () => LazyChain<In, number>;
    /**
     * Emits a running tally of how many values have been emitted
     * @returns
     */
    tally: (countArrayItems: boolean) => LazyChain<In, number>;
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
     * @param reducer
     * @returns
     */
    reduce: (reducer: (values: Array<any>) => any) => LazyChain<In, Out>;
    /**
     * Transform an input value to an output
     * @param transformer
     * @returns
     */
    transform: (transformer: (v: any) => any) => LazyChain<In, Out>;
};
type GenValueTypeObject<T extends Record<string, GenOrData<any> | GenFactoryNoInput<any>>> = {
    [K in keyof T]: T[K] extends Generator<infer V> ? V | undefined : T[K] extends AsyncGenerator<infer V> ? V | undefined : T[K] extends IterableIterator<infer V> ? V | undefined : T[K] extends AsyncIterableIterator<infer V> ? V | undefined : T[K] extends Array<infer V> ? V | undefined : T[K] extends (...args: any) => any ? ReturnType<T[K]> | undefined : never;
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
 * using the provided `reducer` function.
 *
 * ```js
 * // Create a chain that flattens values
 * const reduce = Chains.reduce(values => Math.max(...values));
 * // Feed it a single input (an array), get a single output back:
 * const result = await Chains.single(reduce, [ 1, 2, 3]); // 3
 * ```
 * @param reducer Function to reduce array of values to a single value
 * @returns
 */
declare function reduce<In, Out>(reducer: (v: Array<In>) => Out): Link<Array<In>, Out>;
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
 * const chain = Chains.run(
 *  // Produce values every 10ms for 350ms
 *  Chains.From.timestamp({ interval: 10, elapsed: 350 }),
 *  // Only let a value through every 100ms
 *  Chains.Links.debounce(100)
 * );
 * ```
 * @param rate
 * @returns
 */
declare function debounce<In>(rate: Interval): Link<In, In>;
/**
 * Returns a running tally of how many items have been
 * emitted from the input source.
 * ```js
 * const ch = Chains.run(
 *  Chains.From.timestamp({ interval: 100 }),
 *  Chains.Links.tally()
 * );
 *
 * for await (const v of ch) {
 *   // Produces: 1, 2, 3 ... every 100ms
 * }
 * ```
 * This is different than {@link sum} which adds up numeric values.
 * By default it adds up individual array items
 * @returns
 */
declare function tally<In>(countArrayItems?: boolean): Link<In, number>;
/**
 * Returns the smallest value from the input.
 * Can work with numbers or number[] as input.
 * Non-numeric data is filtered out.
 * @returns
 */
declare function min(): Link<number | Array<number>, number>;
/**
 * Returns the largest value from the input.
 * - Non-numeric data is filtered out.
 * - Looks inside of numeric arrays.
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
 *  if (a.size > b.size) return `a`; // Signals the first param is highest
 *  if (a.size < b.size) return `b`; // Signals the second param is highest
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
declare function sum(): Link<number, number>;
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
declare const Links_max: typeof max;
declare const Links_min: typeof min;
declare const Links_rank: typeof rank;
declare const Links_rankArray: typeof rankArray;
declare const Links_reduce: typeof reduce;
declare const Links_sum: typeof sum;
declare const Links_take: typeof take;
declare const Links_tally: typeof tally;
declare const Links_transform: typeof transform;
declare namespace Links {
  export { Links_average as average, Links_chunk as chunk, Links_debounce as debounce, Links_delay as delay, Links_drop as drop, Links_duration as duration, Links_filter as filter, Links_max as max, Links_min as min, Links_rank as rank, Links_rankArray as rankArray, Links_reduce as reduce, Links_sum as sum, Links_take as take, Links_tally as tally, Links_transform as transform };
}

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
 * Async function that returns the chain as an array of values
 * ```js
 * const values = await asArray(tick( { interval: 1000, loops: 5 }));
 * // After 5 seconds, values will be a set of timestamps.
 * ```
 *
 * If the chain is infinite, be sure to specify limits:
 * ```js
 * // Stop after we have five items
 * const values = await asArray(chain, { limit: 5 });
 * // Stop after 5 seconds has elapsed
 * const values = await asArray(chain, { elapsed: 5000 });
 * ```
 * @param valueToWrap
 * @returns
 */
declare function asArray<Out>(valueToWrap: AsyncGenerator<Out> | GenFactoryNoInput<Out>, options?: Partial<ToArrayOptions>): Promise<Array<Out>>;

/**
 * Calls `callback` whenever the chain/generator produces a value.
 *
 * When using `asCallback`, call it with `await` to let generator
 * run its course before continuing:
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
 * Prepare a chain, allowing you to provide a source at execution time.
 * ```js
 * const chain = Chains.prepare(
 *  Chains.transform<string,number>( v => Number.parseInt(v) ),
 *  Chains.filter<number>(v => v % 2 === 0)
 * );
 *
 * // Run it with provided source
 * for await (const v of chain([`1`, `2`, `3`])) {
 *
 * }
 * ```
 * @param functions
 * @returns
 */
declare function prepare<In, Out>(...functions: Links$1<In, Out>): (source: GenOrData<In> | GenFactoryNoInput<In>) => AsyncGenerator<Out, any, unknown>;

/**
 * Creates a chain from an array, reading values at a given interval
 * @param it
 * @param delay
 * @returns
 */
declare function array<Out>(it: Array<Out>, delay?: Interval): GenFactoryNoInput<Out>;

/**
 * Create an iterable from an event
 * @param target Event source (eg HTML element)
 * @param name Name of event (eg. 'pointermove')
 * @returns
 */
declare function event<Out>(target: EventTarget, name: string): GenFactoryNoInput<Out>;

/**
 * Produce a value from a callback. When
 * the callback returns _undefined_ it is considered done.
 *
 * ```js
 * const callback = () => Math.random();
 *
 * const f = Chains.From.func(callback);
 * for await (const v of f) {
 *  // v is a new random number
 * }
 * ```
 *
 * In the context of a chain:
 * ```js
 * let produced = 0;
 * const chain = Chains.chain<number, string>(
 *  // Produce incrementing numbers
 *  Chains.From.func(() => produced++),
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
declare function func<Out>(callback: () => Promise<Out> | Out): GenFactoryNoInput<Out>;

/**
 * Creates a chain from an interable
 * @param it
 * @returns
 */
declare function iterable<Out>(it: Iterable<Out> | AsyncIterable<Out>): GenFactoryNoInput<Out>;

/**
 * Generate timestamp values at `interval` rate. By default it runs forever.
 * Use `loops` or `elapsed` to set upper limit on how long it should run.
 *
 * ```js
 * const c = Chains.From.timestamp({ interval: 1000 });
 * ```
 * Options:
 * - `asClockTime`: If _true_, yielded value will be clock time rather than elapsed milliseconds
 * @param options
 * @returns
 */
declare function timestamp(options: TickOptions): GenFactoryNoInput<number>;

declare const index_array: typeof array;
declare const index_event: typeof event;
declare const index_func: typeof func;
declare const index_iterable: typeof iterable;
declare const index_timestamp: typeof timestamp;
declare namespace index {
  export { index_array as array, index_event as event, index_func as func, index_iterable as iterable, index_timestamp as timestamp };
}

declare function lazy<In, Out>(): LazyChain<In, Out>;

/**
 * Merge values from several sources into one stream, interleaving values.
 * When all streams are complete it finishes.
 *
 * Alternatively:
 * - {@link combineLatestToArray}/{@link combineLatestToObject} emits snapshots of all the generators, as quickly as the fastest one
 * - {@link syncToArray}/{@link syncToObject} which releases a set of results when all inputs have emitted a value
 * @param sources
 */
declare function mergeFlat<Out>(...sources: Array<GenOrData<any> | GenFactoryNoInput<any>>): AsyncGenerator<Out>;

/**
 * Monitors sources, storing as they happen to an array.
 * Whenever a new value is emitted, the whole array is sent out, containing current
 * values from each source, or _undefined_ if not yet emitted.
 *
 * The tempo of this stream will be set by the fastest source stream.
 * See {@link syncToArray} to have pace determined by slowest source, and only
 * send when each source has produce a new value compared to last time.
 *
 * Set `onSourceDone` to choose behaviour if a source stops. The default is
 * 'break', meaning the whole combined stream stops.
 *
 * If a source completes and onSourceDone = 'allow', the option
 * 'finalValue' sets the logic for what values get returned for the source.
 * By default the setting is 'undefined', thus _undefined_ results. 'last' will be the last (old) value
 * from that source.
 */
declare function combineLatestToArray(sources: Array<GenOrData<any> | GenFactoryNoInput<any>>, options?: Partial<CombineLatestOptions>): AsyncGenerator<Array<any>>;

/**
 * Monitors sources, storing as they happen to an object.
 * Whenever a new value is emitted, the object is sent out, containing current
 * values from each source, or _undefined_ if not yet emitted.
 *
 * The tempo of this stream will be set by the fastest source stream.
 * See {@link syncToObject} to have pace determined by slowest source, and only
 * send when each source has produce a new value compared to last time.
 *
 * Set `onSourceDone` to choose behaviour if a source stops. By default it
 * is 'break', meaning the whole merged stream stops.
 *
 * If a source completes and onSourceDone = 'allow', the option
 * 'finalValue' sets the logic for what values get returned for the source.
 * By default the setting is 'undefined', thus _undefined_ results. 'last' will be the last (old) value
 * from that source.
 */
declare function combineLatestToObject<const T extends Record<string, GenOrData<any> | GenFactoryNoInput<any>>>(sources: T, options?: Partial<CombineLatestOptions>): AsyncGenerator<GenValueTypeObject<T>>;

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
 *
 * @example Grab the x/y coordinate from pointermove
 * ```js
 * const c1 = Chains.run(
 *  Chains.fromEvent(window, `pointermove`),
 *  Chains.Links.transform(event => ({ x: event.x, y: event.y }))
 * );
 *
 * // Eg: print out data as it comes in
 * Iterables.forEach(c1, coord => {
 *   console.log(coord);
 * });
 * // Execution continues immediately
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

/**
 * Input a single value to the chain, return a single result
 *
 *
 * ```js
 * // Create chain link
 * const f = Chains.Links.flatten<string, string>(data => data.join(`-`));
 * // Input a single value (an array)
 * const r1 = await Chains.single(f, [ `a`, `b`, `c` ]);
 * // r1 = `a-b-c`
 * ```
 * @param f
 * @param input
 * @returns
 */
declare function single<In, Out>(f: Link<In, Out>, input: In): Promise<Out | undefined>;

/**
 * Waits for all sources to produce a value, sending the combined results as an array.
 * After sending, it waits again for each source to send at least one value.
 *
 * Use {@link syncToObject} to output objects based on labelled sources rather than an array of values.
 *
 * Pace will be set by the slowest source. Alternatively, use {@link combineLatestToArray} where the rate is determined by fastest source.
 *
 * Only complete results are sent. For example if source A & B finish and
 * source C is still producing values, synchronisation is not possible
 * because A & B stopped producing values. Thus the stream will terminate
 * after `maximumWait` (2 seconds). Newer values from C are lost.
 */
declare function syncToArray(sources: Array<GenOrData<any> | GenFactoryNoInput<any>>, options?: Partial<SyncOptions>): AsyncGenerator<Array<any>>;

declare function isGenFactoryNoInput<Out>(c: any): c is GenFactoryNoInput<Out>;
/**
 * Resolve the array, data or function to a Generator
 * @param input
 * @returns
 */
declare function resolveToGen<V>(input: GenOrData<V> | GenFactoryNoInput<V>): Gen<V>;
/**
 * Resolve the data, primitive or function to an AsyncGenerator
 * @param input
 * @returns
 */
declare function resolveToAsyncGen<V>(input: GenOrData<V> | GenFactoryNoInput<V> | undefined): AsyncGenerator<V> | undefined;

type Chains_CombineLatestOptions = CombineLatestOptions;
type Chains_DelayOptions = DelayOptions;
declare const Chains_Dom: typeof Dom;
type Chains_Gen<V> = Gen<V>;
type Chains_GenFactoryNoInput<Out> = GenFactoryNoInput<Out>;
type Chains_GenOrData<V> = GenOrData<V>;
type Chains_GenValueTypeObject<T extends Record<string, GenOrData<any> | GenFactoryNoInput<any>>> = GenValueTypeObject<T>;
type Chains_LazyChain<In, Out> = LazyChain<In, Out>;
type Chains_Link<In, Out> = Link<In, Out>;
declare const Chains_Links: typeof Links;
type Chains_LinksWithSource<In, Out> = LinksWithSource<In, Out>;
type Chains_SyncOptions = SyncOptions;
type Chains_TickOptions = TickOptions;
declare const Chains_addToArray: typeof addToArray;
declare const Chains_asArray: typeof asArray;
declare const Chains_asCallback: typeof asCallback;
declare const Chains_asPromise: typeof asPromise;
declare const Chains_asValue: typeof asValue;
declare const Chains_combineLatestToArray: typeof combineLatestToArray;
declare const Chains_combineLatestToObject: typeof combineLatestToObject;
declare const Chains_isGenFactoryNoInput: typeof isGenFactoryNoInput;
declare const Chains_lazy: typeof lazy;
declare const Chains_mergeFlat: typeof mergeFlat;
declare const Chains_prepare: typeof prepare;
declare const Chains_resolveToAsyncGen: typeof resolveToAsyncGen;
declare const Chains_resolveToGen: typeof resolveToGen;
declare const Chains_run: typeof run;
declare const Chains_runN: typeof runN;
declare const Chains_single: typeof single;
declare const Chains_syncToArray: typeof syncToArray;
declare const Chains_timestamp: typeof timestamp;
declare namespace Chains {
  export { type Chains_CombineLatestOptions as CombineLatestOptions, type Chains_DelayOptions as DelayOptions, Chains_Dom as Dom, index as From, type Chains_Gen as Gen, type Chains_GenFactoryNoInput as GenFactoryNoInput, type Chains_GenOrData as GenOrData, type Chains_GenValueTypeObject as GenValueTypeObject, type Chains_LazyChain as LazyChain, type Chains_Link as Link, Chains_Links as Links, type Chains_LinksWithSource as LinksWithSource, type Chains_SyncOptions as SyncOptions, type Chains_TickOptions as TickOptions, Chains_addToArray as addToArray, Chains_asArray as asArray, Chains_asCallback as asCallback, Chains_asPromise as asPromise, Chains_asValue as asValue, Chains_combineLatestToArray as combineLatestToArray, Chains_combineLatestToObject as combineLatestToObject, Chains_isGenFactoryNoInput as isGenFactoryNoInput, Chains_lazy as lazy, Chains_mergeFlat as mergeFlat, Chains_prepare as prepare, Chains_resolveToAsyncGen as resolveToAsyncGen, Chains_resolveToGen as resolveToGen, Chains_run as run, Chains_runN as runN, Chains_single as single, Chains_syncToArray as syncToArray, Chains_timestamp as timestamp };
}

export { resolveToGen as A, resolveToAsyncGen as B, type CombineLatestOptions as C, Dom as D, type GenOrData as G, Links as L, type SyncOptions as S, type ToArrayOptions as T, type GenFactoryNoInput as a, Chains as b, type Gen as c, type Link as d, type LinksWithSource as e, type DelayOptions as f, type TickOptions as g, type LazyChain as h, index as i, type GenValueTypeObject as j, addToArray as k, asArray as l, asCallback as m, asPromise as n, asValue as o, prepare as p, lazy as q, mergeFlat as r, combineLatestToArray as s, combineLatestToObject as t, runN as u, run as v, single as w, syncToArray as x, timestamp as y, isGenFactoryNoInput as z };
