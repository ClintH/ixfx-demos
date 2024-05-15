import { f as ReactiveOrSource, T as TransformOpts, R as Reactive, A as AnnotationElapsed, B as BatchOptions, g as CombineLatestOptions, h as RxValueTypes, i as ReactiveDisposable, j as RxValueTypeObject, D as DebounceOptions, F as FieldOptions, k as FilterPredicate, I as InitStreamOptions, l as ReactiveWritable, S as SingleFromArrayOptions, m as SplitOptions, n as ReactiveStream, o as SwitcherOptions, p as SyncOptions, q as ThrottleOptions, r as TimeoutTriggerOptions, W as WithValueOptions, s as ReactiveInitial, t as ToArrayOptions, P as Passed, u as PassedSignal, v as PassedValue, w as ReactiveDiff, x as Wrapped, y as Trigger, z as TriggerValue, E as TriggerFunction, G as TriggerGenerator, H as GeneratorOptions, J as FunctionOptions, K as CountOptions, L as DomBindSourceValue, M as PipeDomBinding, N as DomBindValueTarget, O as DomBindUnresolvedSource, Q as BindUpdateOpts, V as ElementsOptions, X as ArrayOptions, Y as ReactiveFinite, Z as ArrayObjectOptions, _ as ReactiveArray, $ as ReactiveNonInitial, a0 as EventOptions, a1 as Optional, a2 as FunctionFunction, a3 as PingedFunctionFunction, a4 as PingedFunctionOptions, a5 as ObjectOptions, a6 as symbol, U as Unsubscriber, a7 as ReactiveOp, a8 as DomBindResolvedSource, a9 as DomBindTargetNode, aa as DomBindTargetNodeResolved, ab as DomCreateOptions, ac as ElementBind, ad as InitLazyStreamOptions, ae as Lazy, af as PipeSet, ag as PrimitiveValueTypeObject, ah as ReactiveOpInit, ai as ReactiveOpLinks, aj as ResolveOptions, ak as SignalKinds, al as UpstreamOptions } from './Types-PirRH8q6.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { C as Change } from './Immutable-XxQg9zkc.js';

/**
 * Annotates values from `source`, appending new fields to values.
 * Output stream will be the type `In & Out`.
 */
declare function annotate<In, TAnnotation>(input: ReactiveOrSource<In>, transformer: (value: In) => In & TAnnotation, options?: Partial<TransformOpts>): Reactive<In & TAnnotation>;
/**
 * Annotates values from `source`, adding a `elapsedMs` field to values.
 * Elapsed will be the time in milliseconds since the last value. If it is the first value, -1 is used.
 * @param input
 * @param transformer
 * @param options
 * @returns
 */
declare const annotateElapsed: <In>(input: ReactiveOrSource<In>) => Reactive<In & AnnotationElapsed>;

/**
 * Queue from `source`, emitting when thresholds are reached.
 * The resulting Reactive produces arrays.
 *
 * Can use a combination of elapsed time or number of data items.
 *
 * By default options are OR'ed together.
 *
 * ```js
 * // Emit data in batches of 5 items
 * batch(source, { quantity: 5 });
 * // Emit data every second
 * batch(source, { elapsed: 1000 });
 * ```
 * @param batchSource
 * @param options
 * @returns
 */
declare function batch<V>(batchSource: ReactiveOrSource<V>, options?: Partial<BatchOptions>): Reactive<Array<V>>;

/**
 * Create a new object from input, based on cloning fields rather than a destructured copy.
 * This is useful for event args.
 * @param input
 * @returns
 */
declare const cloneFromFields: <In>(source: ReactiveOrSource<In>) => Reactive<In>;

/**
 * Monitors input reactive values, storing values as they happen to an array.
 * Whenever a new value is emitted, the whole array is sent out, containing current
 * values from each source, or _undefined_ if not yet emitted.
 *
 * See {@link combineLatestToObject} to combine streams by name into an object, rather than array.
 *
 * ```
 * const sources = [
 *  Rx.fromFunction(Math.random, { loop: true, interval: 100 }),
 *  Rx.fromFunction(Math.random, { loop: true, interval: 200 })
 * ];
 * const r = Rx.combineLatestToArray(sources);
 * r.value(value => {
 *  // Value will be an array of last value from each source:
 *  // [number,number]
 * });
 * ```
 *
 * The tempo of this stream will be set by the fastest source stream.
 * See {@link syncToArray} to have pace determined by slowest source, and only
 * send when each source has produce a new value compared to last time.
 *
 * Set `onSourceDone` to choose behaviour if a source stops. By default it
 * is 'break', meaning the whole merged stream stops.
 *
 * Note: unlike RxJS's `combineLatest`, does not wait for each source to emit once
 * before emitting first value.
 * @param reactiveSources Sources to merge
 * @param options Options for merging
 * @returns
 */
declare function combineLatestToArray<const T extends ReadonlyArray<ReactiveOrSource<any>>>(reactiveSources: T, options?: Partial<CombineLatestOptions>): Reactive<RxValueTypes<T>>;

/**
 * Monitors input reactive values, storing values as they happen to an object.
 * Whenever a new value is emitted, the whole object is sent out, containing current
 * values from each source (or _undefined_ if not yet emitted)
 *
 * See {@link combineLatestToArray} to combine streams by name into an array instead.
 *
 * ```
 * const sources = {
 *  fast: Rx.fromFunction(Math.random, { loop: true, interval: 100 }),
 *  slow: Rx.fromFunction(Math.random, { loop: true, interval: 200 })
 * ];
 * const r = Rx.combineLatestToObject(sources);
 * r.value(value => {
 *  // 'value' will be an object containing the labelled latest
 *  // values from each source.
 *  // { fast: number, slow: number }
 * });
 * ```
 *
 * The tempo of this stream will be set by the fastest source stream.
 * See {@link syncToObject} to have pace determined by slowest source, and only
 * send when each source has produce a new value compared to last time.
 *
 * This source ends if all source streams end.
 * @param reactiveSources Sources to merge
 * @param options Options for merging
 * @returns
 */
declare function combineLatestToObject<const T extends Record<string, ReactiveOrSource<any>>>(reactiveSources: T, options?: Partial<CombineLatestOptions>): ReactiveDisposable<RxValueTypeObject<T>> & Reactive<RxValueTypeObject<T>>;

/**
 * Debounce waits for `elapsed` time after the last received value before emitting it.
 *
 * If a flurry of values are received that are within the interval, it won't emit anything. But then
 * as soon as there is a gap in the messages that meets the interval, the last received value is sent out.
 *
 * `debounce` always emits with at least `elapsed` as a delay after a value received. While {@link throttle} potentially
 * sends immediately, if it's outside of the elapsed period.
 *
 * This is a subtly different logic to {@link throttle}. `throttle` more eagerly sends the first value, potentially
 * not sending later values. `debouce` however will send later values, potentially ignoring earlier ones.
 * @param source
 * @param options
 * @returns
 */
declare function debounce<V>(source: ReactiveOrSource<V>, options?: Partial<DebounceOptions>): Reactive<V>;

/**
 * From a source value, yields a field from it. Only works
 * if stream values are objects.
 *
 * If a source value doesn't have that field, it is skipped.
 *
 * @returns
 */
declare function field<TIn extends object, TFieldType>(fieldSource: ReactiveOrSource<TIn>, fieldName: keyof TIn, options?: Partial<FieldOptions<TFieldType>>): Reactive<TFieldType>;

/**
 * Passes all values where `predicate` function returns _true_.
 */
declare function filter<In>(input: ReactiveOrSource<In>, predicate: FilterPredicate<In>, options: Partial<InitStreamOptions>): Reactive<In>;

/**
 * Pipes the output of one stream into another, in order.
 * The stream returned is a new stream which captures the final output.
 *
 * If any stream in the pipe closes the whole pipe is closed.
 * @param streams
 * @returns
 */
declare const pipe: <TInput, TOutput>(streams_0: Reactive<TInput>, ...streams_1: (Reactive<any> & ReactiveWritable<any>)[]) => Reactive<TOutput> & ReactiveDisposable<TOutput>;

/**
 * For a stream that emits arrays of values, this op will select a single value.
 *
 * Can select based on:
 * * predicate: a function that returns _true_ for a value
 * * at: selection based on array index (can be combined with random ordering to select a random value)
 *
 * ```js
 * // If source is Reactive<Array<number>>, picks the first even number
 * singleFromArray(source, {
 *  predicate: v => v % 2 === 0
 * });
 *
 * // Selects a random value from source
 * singleFromArray(source, {
 *  order: `random`,
 *  at: 0
 * });
 * ```
 *
 * If neither `predicate` or `at` options are given, exception is thrown.
 * @param source Source to read from
 * @param options Options for selection
 * @returns
 */
declare function singleFromArray<V>(source: ReactiveOrSource<Array<V>>, options?: Partial<SingleFromArrayOptions<V>>): Reactive<V>;

/**
 * Creates a set of streams each of which receives data from `source`.
 * By default these are lazy and dispose if the upstream source closes.
 *
 * See also {@link splitLabelled} to split into named streams.
 * @param source
 * @param quantity
 * @returns
 */
declare const split: <T>(r: ReactiveOrSource<T>, options?: Partial<SplitOptions>) => ReactiveStream<T>[];
/**
 * Splits `source` into several duplicated streams.
 * Returns an object with keys according to `labels`.
 * Each value is a stream which echos the values from `source`.
 * ```js
 * const [a,b,c] = splitLabelled(source, `a`, `b`, `c`);
 * // a, b, c are Reactive types
 * ```
 *
 * See also {@link split} to get an unlabelled split
 * @param source
 * @param labels
 * @returns
 */
declare const splitLabelled: <T, K extends PropertyKey>(r: ReactiveOrSource<T>, labels: Array<K>) => Record<K, Reactive<T>>;

/**
 * Switcher generates several output streams, labelled according to the values of `cases`.
 * Values from `source` are fed to the output streams if their associated predicate function returns _true_.
 *
 * In this way, we can split one input stream into several output streams, each potentially getting a different
 * subset of the input.
 *
 * With `options`, you can specify whether to send to multiple outputs if several match, or just the first (default behaviour).
 *
 * The below example shows setting up a switcher and consuming the output streams.
 * @example
 * ```js
 * // Initialise a reactive number, starting at 0
 * const switcherSource = Reactive.number(0);
 * // Set up the switcher
 * const x = Reactive.switcher(switcherSource, {
 *  even: v => v % 2 === 0,
 *  odd: v => v % 2 !== 0
 * });
 * // Listen for outputs from each of the resulting streams
 * x.even.on(msg => {
 *   log(`even: ${msg.value}`);
 * });
 * x.odd.on(msg => {
 *   log(`odd: ${msg.value}`);
 * })
 * // Set new values to the number source, counting upwards
 * // ...this will in turn trigger the outputs above
 * setInterval(() => {
 *   switcherSource.set(switcherSource.last() + 1);
 * }, 1000);
 * ```
 *
 * If `source` closes, all the output streams will be closed as well.
 * @param reactiveOrSource
 * @param cases
 * @param options
 * @returns
 */
declare const switcher: <TValue, TRec extends Record<string, FilterPredicate<TValue>>, TLabel extends keyof TRec>(reactiveOrSource: ReactiveOrSource<TValue>, cases: TRec, options?: Partial<SwitcherOptions>) => Record<TLabel, Reactive<TValue>>;

/**
 * Waits for all sources to produce a value, sending the combined results as an array.
 * After sending, it waits again for each source to send at least one value.
 *
 * Use {@link syncToObject} to output objects based on labelled sources rather than an array of values.
 *
 * Pace will be set by the slowest source. Alternatively, use {@link combineLatestToArray} where the rate is determined by fastest source.
 *
 * Only complete results are sent. For example if source A & B finish and source C is still producing values,
 * synchronisation is not possible because A & B stopped producing values. Thus the stream will self-terminate
 * after `maximumWait` (2 seconds). The newer values from C are lost.
 */
declare function syncToArray<const T extends ReadonlyArray<ReactiveOrSource<any>>>(reactiveSources: T, options?: Partial<SyncOptions>): Reactive<RxValueTypes<T>>;

declare function syncToObject<const T extends Record<string, ReactiveOrSource<any>>>(reactiveSources: T, options?: Partial<SyncOptions>): Reactive<RxValueTypeObject<T>>;

/**
 * Only allow a value through if a minimum amount of time has elapsed.
 * since the last value. This effectively slows down a source to a given number
 * of values/ms. Values emitted by the source which are too fast are discarded.
 *
 * Throttle will fire on the first value received.
 *
 * In more detail:
 * Every time throttle passes a value, it records the time it allowed something through. For every
 * value received, it checks the elapsed time against this timestamp, throwing away values if
 * the period hasn't elapsed.
 *
 * With this logic, a fury of values of the source might be discarded if they fall within the elapsed time
 * window. But then if there is not a new value for a while, the actual duration between values can be longer
 * than expected. This is in contrast to {@link debounce}, which will emit the last value received after a duration,
 * even if the source stops sending.
 * @param options
 * @returns
 */
declare function throttle<V>(throttleSource: ReactiveOrSource<V>, options?: Partial<ThrottleOptions>): Reactive<V>;

/**
 * Emits a value if `source` does not emit a value after `interval`
 * has elapsed. For example, this allows you to reset a reactive to some
 * 'zero' state if nothing is going on.
 *
 * If `source` emits faster than the `interval`, it won't get triggered.
 *
 * Default for 'timeout': 1000s.
 *
 * ```js
 * // Emit 'hello' if 'source' doesn't emit a value after 1 minute
 * const r = Rx.timeoutTrigger(source, { value: 'hello', interval: { mins: 1 } });
 * ```
 *
 * Can also emit results from a function or generator
 * ```js
 * // Emits a random number if 'source' doesn't emit a value after 500ms
 * const r = Rx.timeoutTrigger(source, { fn: Math.random, interval: 500 });
 * ```
 *
 * If `immediate` option is _true_ (default), the timer starts from stream initialisation.
 * Otherwise it won't start until it observes the first value from `source`.
 * @param source
 * @param options
 */
declare function timeoutTrigger<TSource, TTriggerValue>(source: ReactiveOrSource<TSource>, options: TimeoutTriggerOptions<TTriggerValue>): ReactiveDisposable<TSource | TTriggerValue> & Reactive<TSource | TTriggerValue>;

/**
 * Transforms values from `source` using the `transformer` function.
 * @param transformer
 * @returns
 */
declare function transform<In, Out>(input: ReactiveOrSource<In>, transformer: (value: In) => Out, options?: Partial<TransformOpts>): Reactive<Out>;

/**
 * A reactive where the last value can be read at any time.
 * An initial value must be provided.
 * ```js
 * const r = Rx.withValue(source, { initial: `hello` });
 * r.last(); // Read last value
 * ```
 * @param input
 * @param options
 * @returns
 */
declare function withValue<In>(input: ReactiveOrSource<In>, options: WithValueOptions<In>): ReactiveInitial<In>;

/**
 * Build a graph of reactive dependencies for `rx`
 * @param _rx
 */
declare function prepare<V extends Record<string, any>>(_rx: V): Reactive<V>;

/**
 * Reads a set number of values from `source`, returning as an array. May contain
 * empty values if desired values is not reached.
 *
 * After the limit is reached (or `source` completes), `source` is unsubscribed from.
 *
 * If no limit is set, it will read until `source` completes or `maximumWait` is reached.
 * `maximumWait` is 10 seconds by default.
 *
 * Use {@link toArrayOrThrow} to throw if desired limit is not reached.
 *
 * ```js
 * // Read from `source` for 5 seconds
 * const data = await toArray()(source);
 * // Read 5 items from `source`
 * const data = await toArray({ limit: 5 })(source);
 * // Read for 10s
 * const data = await toArray({ maximumWait: 10_1000 })(source);
 * ```
 * @param source
 * @param options
 * @returns
 */
declare function toArray<V>(source: ReactiveOrSource<V>, options?: Partial<ToArrayOptions<V>>): Promise<Array<V | undefined>>;
/**
 * By default, reads all the values from `source`, or until 5 seconds has elapsed.
 *
 * If `limit` is provided as an option, it will exit early, or throw if that number of values was not acheived.
 *
 * ```js
 * // Read from `source` for 5 seconds
 * const data = await toArrayOrThrow()(source);
 * // Read 5 items from `source`
 * const data = await toArrayOrThrow({ limit: 5 })(source);
 * // Read for 10s
 * const data = await toArrayOrThrow({ maximumWait: 10_1000 })(source);
 * ```
 * @param source
 * @param options
 * @returns
 */
declare function toArrayOrThrow<V>(source: ReactiveOrSource<V>, options?: Partial<ToArrayOptions<V>>): Promise<Array<V>>;

/**
 * Returns an AsyncGenerator wrapper around Reactive.
 * This allows values to be iterated over using a `for await` loop,
 * like Chains.
 *
 * ```js
 * // Reactive numerical value
 * const number = Reactive.number(10);
 *
 * const g = Reactive.toGenerator(number);
 * for await (const v of g) {
 *  console.log(v); // Prints out whenever the reactive value changes
 * }
 * // Execution doesn't continue until Reactive finishes
 * ```
 *
 * When/if `source` closes, an exception is thrown.
 * To catch this, wrap the calling `for await` in a try-catch block
 * ```js
 * try {
 *  for await (const v of g) {
 *  }
 * } catch (error) {
 * }
 * // Completed
 * ```
 *
 * Use something like `setTimeout` to loop over the generator
 * without impeding the rest of your code flow. For example:
 * ```js
 * // Listen for every pointerup event
 * const ptr = Reactive.fromEvent(document.body, `pointerup`);
 * // Start iterating
 * setTimeout(async () => {
 *  const gen = Reactive.toGenerator(ptr);
 *  try {
 *    for await (const v of gen) {
 *      // Prints out whenever there is a click
 *      console.log(v);
 *    }
 *  } catch (e) { }
 *  console.log(`Iteration done`);
 * });
 *
 * // Execution continues here immediately
 * ```
 * @param source
 */
declare function toGenerator<V>(source: ReactiveOrSource<V>): AsyncGenerator<V>;

declare function messageIsSignal<V>(message: Passed<V> | PassedSignal): message is PassedSignal;
declare function messageIsDoneSignal<V>(message: Passed<V> | PassedSignal): boolean;
/**
 * Returns _true_ if `v` has a non-undefined value. Note that sometimes
 * _undefined_ is a legal value to pass
 * @param v
 * @returns
 */
declare function messageHasValue<V>(v: Passed<V> | PassedSignal): v is PassedValue<V>;
declare const hasLast: <V>(rx: Reactive<V> | ReactiveDiff<V> | object) => rx is ReactiveInitial<V>;
declare const isReactive: <V>(rx: object) => rx is Reactive<V>;
declare const isDisposable: <V>(v: Reactive<V> | ReactiveWritable<V>) => v is ReactiveDisposable<V>;
declare const isWrapped: <T>(v: any) => v is Wrapped<T>;
declare const opify: <V>(fn: (source: ReactiveOrSource<V>, ...args: Array<any>) => Reactive<V>, ...args: Array<any>) => (source: ReactiveOrSource<V>) => Reactive<V>;
declare const isTriggerValue: <V>(t: Trigger<V>) => t is TriggerValue<V>;
declare const isTriggerFunction: <V>(t: Trigger<V>) => t is TriggerFunction<V>;
declare const isTriggerGenerator: <V>(t: Trigger<V>) => t is TriggerGenerator<V>;
declare const isTrigger: <V>(t: any) => t is Trigger<V>;
type ResolveTriggerValue<V> = [value: V, false];
type ResolveTriggerDone = [undefined, true];
/**
 * Resolves a trigger value.
 *
 * A trigger can be a value, a function or generator. Value triggers never complete.
 * A trigger function is considered complete if it returns undefined.
 * A trigger generator is considered complete if it returns done.
 *
 * Returns `[value, _false_]` if we have a value and trigger is not completed.
 * Returns `[value, _true_]` trigger is completed
 * @param t
 * @returns
 */
declare function resolveTriggerValue<V>(t: Trigger<V>): ResolveTriggerDone | ResolveTriggerValue<V>;

/**
 * Wrap a reactive source to allow for chained
 * function calls.
 *
 * Example:
 * For every `pointerup` event on the body, batch the events over
 * periods of 200ms, get the number of events in that period,
 * and print it out.
 *
 * eg. detecting single or double-clicks
 * ```js
 * wrap(Rx.fromEvent<{ x: number, y: number }>(document.body, `pointerup`))
 *  .batch({ elapsed: 200 })
 *  .transform(v => v.length)
 *  .value(v => { console.log(v) });
 * ```
 * @param source
 * @returns
 */
declare function wrap<TIn>(source: ReactiveOrSource<TIn>): Wrapped<TIn>;

type ResolveSourceOptions = {
    /**
     * Options when creating a reactive from a generator
     * Default:  `{ lazy: true, interval: 5 }`
     */
    generator: GeneratorOptions;
    /**
     * Options when creating a reactive from a function.
     */
    function: FunctionOptions;
};
/**
 * Resolves various kinds of sources into a Reactive.
 * If `source` is an iterable/generator, it gets wrapped via `generator()`.
 *
 * Default options:
 * * generator: `{ lazy: true, interval: 5 }`
 * @param source
 * @returns
 */
declare const resolveSource: <V>(source: ReactiveOrSource<V>, options?: Partial<ResolveSourceOptions>) => Reactive<V>;

/**
 * Produces an incrementing value. By default starts at 0 and counts
 * forever, incrementing every second.
 *
 * ```js
 * const r = Rx.count();
 * r.value(c => {
 *  // 0, 1, 2, 3 ... every second
 * });
 * ```
 *
 * The `limit` is exclusive
 * ```js
 * const r = Rx.count({limit:5});
 * // Yields 0,1,2,3,4
 * ```
 *
 * If limit is less than start, it will count down instead.
 * ```js
 * const r = Rx.count({start:5, limit: 0});
 * // Yie:ds 5,4,3,2,1
 * ```
 *
 * ```js
 * // Count 10, 12, 14 ... every 500ms
 * const r = Rx.count({ start: 10, amount: 2, interval: 500 });
 * ```
 *
 * In addition to setting `limit` (which is exclusive), you can stop with an abort signal
 * ```js
 * const ac = new AbortController();
 * const r = Rx.count({signal:ac.signal});
 * ...
 * ac.abort(`stop`);
 * ```
 * @param options
 */
declare function count(options?: Partial<CountOptions>): ReactiveStream<number>;

/**
 * Reactive stream of array of elements that match `query`.
 * @param query
 * @returns
 */
declare function fromDomQuery(query: string): Reactive<HTMLElement[]> & {
    dispose(reason: string): void;
    isDisposed(): boolean;
} & ReactiveWritable<HTMLElement[]> & {
    onDiff(handler: (changes: Passed<Change<any>[]>) => void): () => void;
    update(changedPart: Record<string, any>): void;
    updateField(field: string, value: any): void;
} & {
    last(): HTMLElement[];
};
/**
 * Updates an element's `textContent` when the source value changes
 * ```js
 * bindText(source, `#blah`);
 * ```
 *
 * Uses {@link bindElement}, with `{elField:'textContent'}` as the options
 * @param elOrQuery
 * @param source
 * @param bindOpts
 */
declare const bindText: <V>(source: Reactive<V>, elOrQuery: string | HTMLElement | null, bindOpts?: Partial<DomBindSourceValue<V>>) => PipeDomBinding;
/**
 * Updates an element's `innerHTML` when the source value changes
 * ```js
 * bindHtml(source, `#blah`);
 * ```
 *
 * Uses {@link bindElement}, with `{elField:'innerHTML'}` as the options.
 * @param elOrQuery
 * @param source
 * @param bindOpts
 * @returns
 */
declare const bindHtml: <V>(source: Reactive<V>, elOrQuery: string | HTMLElement | null, bindOpts?: DomBindSourceValue<V>) => PipeDomBinding;
/**
 * Shortcut to bind to an elements attribute
 * @param elOrQuery
 * @param source
 * @param attribute
 * @param bindOpts
 * @returns
 */
/**
 * Shortcut to bind to a CSS variable
 * @param elOrQuery
 * @param source
 * @param cssVariable
 * @param bindOpts
 * @returns
 */
/**
 * Creates a new HTML element, calling {@link bind} on it to update when `source` emits new values.
 *
 *
 * ```js
 * // Set textContent of a SPAN with values from `source`
 * create(source, { tagName: `span`, parentEl: document.body })
 * ```
 *
 * If `parentEl` is not given in the options, the created element needs to be manually added
 * ```js
 * const b = create(source);
 * someEl.append(b.el); // Append manually
 * ```
 *
 * ```
 * // Set 'title' attribute based on values from `source`
 * create(source, { parentEl: document.body, attribName: `title` })
 * ```
 * @param source
 * @param options
 * @returns
 */
/**
 * Update a DOM element's field, attribute or CSS variable when `source` produces a value.
 *
 * ```js
 * // Access via DOM query. Binds to 'textContent' by default
 * bind(readableSource, `#someEl`);
 *
 * // Set innerHTML instead
 * bind(readableSource, someEl, { elField: `innerHTML` });
 *
 * // An attribute
 * bind(readableSource, someEl, { attribName: `width` });
 *
 * // A css variable ('--' optiona)
 * bind(readableSource, someEl, { cssVariable: `hue` });
 *
 * // Pluck a particular field from source data.
 * // Ie someEl.textContent = value.colour
 * bind(readableSource, someEl, { sourceField: `colour` });
 *
 * // Transform value before setting it to field
 * bind(readableSource, someEl, {
 *  field: `innerHTML`,
 *  transform: (v) => `Colour: ${v.colour}`
 * })
 * ```
 *
 * If `source` has an initial value, this is used when first bound.
 *
 * Returns {@link PipeDomBinding} to control binding:
 * ```js
 * const bind = bind(source, `#someEl`);
 * bind.remove();     // Unbind
 * bind.remove(true); // Unbind and remove HTML element
 * ```
 *
 * If several fields need to be updated based on a new value, consider using {@link bindUpdate} instead.
 * @param elOrQuery
 * @param source
 * @param bindOpts
 */
declare const bindElement: <V>(source: Reactive<V>, elOrQuery: string | HTMLElement | null, ...binds: Array<DomBindSourceValue<V> & DomBindValueTarget>) => PipeDomBinding;
/**
 * Binds `source` to one or more element(s). One or more bindings for the same source
 * can be provided.
 *
 * ```js
 * bind(source,
 *  // Binds .name field of source values to textContent of #some-element
 *  { query: `#some-element`, sourceField: `name` },
 *  { query: `section`, }
 * );
 * ```
 *
 * Can update
 * * CSS variables
 * * CSS styles
 * * textContent / innerHTML
 * * HTML DOM attributes and object fields
 *
 * Can use a particular field on source values, or use the whole value. These can
 * pass through `transformValue` or `transform` respectively.
 *
 * Returns a function to unbind from source and optionally remove HTML element
 * ```js
 * const unbind = bind( . . . );
 * unbind();     // Unbind
 * unbind(true); // Unbind and remove HTML element(s)
 * ```
 * @param source
 * @param bindsUnresolvedElements
 * @returns
 */
declare const bind: <V>(source: Reactive<V>, ...bindsUnresolvedElements: Array<DomBindUnresolvedSource<V>>) => PipeDomBinding;
/**
 * Calls `updater` whenever `source` produces a value. Useful when several fields from a value
 * are needed to update an element.
 * ```js
 * bindUpdate(source, `#someEl`, (v, el) => {
 *  el.setAttribute(`width`, v.width);
 *  el.setAttribute(`height`, v.height);
 * });
 * ```
 *
 * Returns a {@link PipeDomBinding} to manage binding
 * ```js
 * const b = bindUpdate(...);
 * b.remove();     // Disconnect binding
 * b.remove(true); // Disconnect binding and remove element
 * b.el;           // HTML element
 * ```
 * @param elOrQuery
 * @param source
 * @param updater
 * @returns
 */
declare const bindUpdate: <V>(source: Reactive<V>, elOrQuery: string | HTMLElement, updater: (v: V, el: HTMLElement) => void) => PipeDomBinding;
/**
 * Updates a HTML element based on diffs on an object.
 * ```js
 * // Wrap an object
 * const o = Rx.object({ name: `Jane`, ticks: 0 });
 * const b = bindDiffUpdate(`#test`, o, (diffs, el) => {
 *  // el = reference to #test
 * // diff = Array of Changes,
 * //  eg [ { path: `ticks`, value: 797, previous: 0 } ]
 *  for (const diff of diffs) {
 *    if (diff.path === `ticks`) el.textContent = `${diff.previous} -> ${diff.value}`
 *  }
 * })
 *
 * // Eg. update field
 * o.updateField(`ticks`, Math.floor(Math.random()*1000));
 * ```
 *
 * If `initial` is provided as an option, this will be called if `source` has an initial value. Without this, the DOM won't be updated until the first data
 * update happens.
 * ```js
 * bindDiffUpdate(el, source, updater, {
 *  initial: (v, el) => {
 *    el.innerHTML = v.name;
 *  }
 * })
 * ```
 * @param elOrQuery
 * @param source
 * @param updater
 * @param opts
 * @returns
 */
declare const bindDiffUpdate: <V>(source: ReactiveDiff<V>, elOrQuery: string | HTMLElement | null, updater: (diffs: Array<Change<any>>, el: HTMLElement) => void, opts?: Partial<BindUpdateOpts<V>>) => PipeDomBinding & {
    refresh: () => void;
};
/**
 * Creates a new HTML element and calls `bindUpdate` so values from `source` can be used
 * to update it.
 *
 *
 * ```js
 * // Creates a span, adding it to <body>
 * const b = createUpdate(dataSource, (value, el) => {
 *  el.width = value.width;
 *  el.height = value.height;
 * }, {
 *  tagName: `SPAN`,
 *  parentEl: document.body
 * })
 * ```
 * @param source
 * @param updater
 * @param options
 * @returns
 */
/**
 * Creates, updates & deletes elements based on pathed values from a reactive.
 *
 * This means that elements are only manipulated if its associated data changes,
 * and elements are not modified if there's no need to.
 * @param source
 * @param options
 */
declare const elements: <T>(source: ReactiveDiff<T> | (ReactiveDiff<T> & ReactiveInitial<T>), options: Partial<ElementsOptions>) => void;
declare function win(): {
    dispose: (reason?: string) => void;
    size: Reactive<{
        width: number;
        height: number;
    }> & {
        last(): {
            width: number;
            height: number;
        };
    } & {
        dispose(reason: string): void;
        isDisposed(): boolean;
    };
    pointer: Reactive<{
        x: number;
        y: number;
    }> & {
        last(): {
            x: number;
            y: number;
        };
    } & {
        dispose(reason: string): void;
        isDisposed(): boolean;
    };
};

declare const Dom_bind: typeof bind;
declare const Dom_bindDiffUpdate: typeof bindDiffUpdate;
declare const Dom_bindElement: typeof bindElement;
declare const Dom_bindHtml: typeof bindHtml;
declare const Dom_bindText: typeof bindText;
declare const Dom_bindUpdate: typeof bindUpdate;
declare const Dom_elements: typeof elements;
declare const Dom_fromDomQuery: typeof fromDomQuery;
declare const Dom_win: typeof win;
declare namespace Dom {
  export { Dom_bind as bind, Dom_bindDiffUpdate as bindDiffUpdate, Dom_bindElement as bindElement, Dom_bindHtml as bindHtml, Dom_bindText as bindText, Dom_bindUpdate as bindUpdate, Dom_elements as elements, Dom_fromDomQuery as fromDomQuery, Dom_win as win };
}

declare const of: <V>(source: Array<V> | Iterable<V>, options?: Partial<ArrayOptions>) => (Reactive<V> & ReactiveFinite & {
    last(): V;
}) | undefined;
/**
 * Reads the contents of `array` into a Reactive, with optional time interval
 * between values. A copy of the array is used, so changes will not
 * affect the reactive.
 *
 * See also {@link arrayObject} which monitors changes to array values.
 *
 * Reads items from an array with a given interval, by default 5ms
 * @param array
 * @param options
 * @returns
 */
declare const array: <V>(sourceArray: Array<V>, options?: Partial<ArrayOptions>) => Reactive<V> & ReactiveFinite & ReactiveInitial<V>;

/**
 * Wraps an array object
 * @param initialValue
 * @param options
 * @returns
 */
declare function arrayObject<V>(initialValue?: ReadonlyArray<V>, options?: Partial<ArrayObjectOptions<V>>): ReactiveDisposable<ReadonlyArray<V>> & ReactiveArray<V> & (ReactiveInitial<ReadonlyArray<V>> | ReactiveNonInitial<ReadonlyArray<V>>);

declare function boolean(initialValue: boolean): ReactiveDisposable<boolean> & ReactiveWritable<boolean> & ReactiveInitial<boolean>;
declare function boolean(): ReactiveDisposable<boolean> & ReactiveWritable<boolean> & ReactiveNonInitial<boolean>;

declare function event<V extends Record<string, any>>(target: EventTarget | null, name: string, options: EventOptions<V>): ReactiveInitial<V> & ReactiveDisposable<V>;
declare function event<V extends Record<string, any>>(target: EventTarget | null, name: string, options?: Optional<EventOptions<V>, `transform`>): ReactiveNonInitial<V> & ReactiveDisposable<V>;

/**
 * Produces a reactive from the basis of a function. `callback` is executed, with its result emitted via the returned reactive.
 *
 * See also {@link Rx.From.pinged} to trigger a function whenever another Reactive emits a value.
 *
 * ```js
 * // Produce a random number every second
 * const r = Rx.From.func(Math.random, { interval: 1000 });
 * ```
 *
 * `callback` can be called repeatedly by providing the `interval` option to set the rate of repeat.
 * Looping can be limited with `options.maximumRepeats`, or passing a signal `options.signal`
 * and then activating it.
 * ```js
 * // Reactive that emits a random number every second, five times
 * const r1 = Rx.From.func(Math.random, { interval: 1000, maximumRepeats: 5 }
 * ```
 *
 * ```js
 * // Generate a random number every second until ac.abort() is called
 * const ac = new AbortController();
 * const r2 = Rx.From.func(Math.random, { interval: 1000, signal: ac.signal });
 * ```
 *
 * The third option is for `callback` to fire the provided abort function.
 * ```js
 * Rx.From.func((abort) => {
 *  if (Math.random() > 0.5) abort('Random exit');
 *  return 1;
 * });
 * ```
 *
 * By default has a laziness of 'very' meaning that `callback` is run only when there's a subscriber
 * By default stream closes if `callback` throws an error. Use `options.closeOnError:'ignore'` to change.
 * @param callback
 * @param options
 * @returns
 */
declare function func<V>(callback: FunctionFunction<V>, options?: Partial<FunctionOptions>): ReactiveStream<V>;

/**
 * Creates a reactive with `callback` as a value source. This gets called whenever `source` emits a value.
 *
 * @param callback
 * @param source
 * @param options
 * @returns
 */
declare function pinged<T, TSource>(source: Reactive<TSource>, callback: PingedFunctionFunction<T, TSource>, options?: Partial<PingedFunctionOptions>): ReactiveStream<T>;

/**
 * Creates a Reactive from an AsyncGenerator or Generator
 * @param gen
 * @returns
 */
/**
 * Creates a readable reactive based on a (async)generator or iterator
 * ```js
 * // Generator a random value every 5 seconds
 * const valuesOverTime = Flow.interval(() => Math.random(), 5000);
 * // Wrap the generator
 * const r = Rx.From.iterator(time);
 * // Get notified when there is a new value
 * r.value(v => {
 *   console.log(v);
 * });
 * ```
 *
 * Awaiting values could potentially hang code. Thus there is a `readTimeout`, the maximum time to wait for a value from the generator. Default: 5 minutes.
 * If `signal` is given, this will also cancel waiting for the value.
 * @param source
 */
declare function iterator<V>(source: IterableIterator<V> | Array<V> | AsyncIterableIterator<V> | Generator<V> | AsyncGenerator<V>, options?: Partial<GeneratorOptions>): ReactiveDisposable<V> & Reactive<V>;

declare function number(initialValue: number): ReactiveDisposable<number> & ReactiveWritable<number> & ReactiveInitial<number>;
declare function number(): ReactiveDisposable<number> & ReactiveWritable<number> & ReactiveNonInitial<number>;

declare function object<V extends Record<string, any>>(initialValue: V, options?: Partial<ObjectOptions<V>>): ReactiveDiff<V> & ReactiveInitial<V>;
declare function object<V extends Record<string, any>>(initialValue: undefined, options?: Partial<ObjectOptions<V>>): ReactiveDiff<V> & ReactiveNonInitial<V>;

type ReactiveProxied<V> = V & {
    [symbol]: ReactiveDiff<V> & ReactiveInitial<V>;
};
/**
 * Creates a proxy of `target`, so that regular property setting will be intercepted and output
 * on a {@link Reactive} object as well.
 *
 * ```js
 * const { proxy, rx } = Rx.From.objectProxy({ colour: `red`, x: 10, y: 20 });
 *
 * rx.value(v => {
 *  // Get notified when proxy is changed
 * });
 *
 * // Get and set properties as usual
 * console.log(proxy.x);
 * proxy.x = 20; // Triggers Reactive
 * ```
 *
 * Keep in mind that changing `target` directly won't affect the proxied object or Reactive. Thus,
 * only update the proxied object after calling `fromProxy`.
 *
 * The benefit of `objectProxy` instead of {@link Rx.From.object} is because the proxied object can be passed to other code that doesn't need
 * to know anything about Reactive objects.
 *
 * You can assign the return values to more meaningful names using
 * JS syntax.
 * ```js
 * const { proxy:colour, rx:colourRx } = Rx.From.objectProxy({ colour: `red` });
 * ```
 *
 * See also:
 * * {@link objectProxySymbol}: Instead of {proxy,rx} return result, puts the `rx` under a symbol on the proxy.
 * @param target
 * @returns
 */
declare const objectProxy: <V extends object>(target: V) => {
    proxy: V;
    rx: ReactiveDiff<V> & ReactiveInitial<V>;
};
/**
 * Same as {@link proxy}, but the return value is the proxied object along with
 * the Reactive wrapped as symbol property.
 *
 * ```js
 * const person = Rx.fromProxySymbol({name: `marie` });
 * person.name = `blah`;
 * person[Rx.symbol].on(msg => {
 *  // Value changed...
 * });
 * ```
 *
 * This means of access can be useful as the return result is a bit neater, being a single object instead of two.
 * @param target
 * @returns
 */
declare const objectProxySymbol: <V extends object>(target: V) => ReactiveProxied<V>;

/**
 * Creates a RxJs style observable
 * ```js
 * const o = observable(stream => {
 *  // Code to run for initialisation when we go from idle to at least one subscriber
 *  // Won't run again for additional subscribers, but WILL run again if we lose
 *  // all subscribers and then get one
 *
 *  // To send a value:
 *  stream.set(someValue);
 *
 *   // Optional: return function to call when all subscribers are removed
 *   return () => {
 *     // Code to run when all subscribers are removed
 *   }
 * });
 * ```
 *
 * For example:
 * ```js
 * const xy = observable<(stream => {
 *  // Send x,y coords from PointerEvent
 *  const send = (event) => {
 *    stream.set({ x: event.x, y: event.y });
 *  }
 *  window.addEventListener(`pointermove`, send);
 *  return () => {
 *    // Unsubscribe
 *    window.removeEventListener(`pointermove`, send);
 *  }
 * });
 *
 * xy.value(value => {
 *  console.log(value);
 * });
 * ```
 * @param init
 * @returns
 */
declare function observable<V>(init: (stream: Reactive<V> & ReactiveWritable<V>) => (() => void) | undefined): {
    on: (handler: (value: Passed<V>) => void) => Unsubscriber;
    value: (callback: (value: V) => void) => Unsubscriber;
};
/**
 * As {@link observable}, but returns a Reactive that allows writing
 * @param init
 * @returns
 */
declare function observableWritable<V>(init: (stream: Reactive<V> & ReactiveWritable<V>) => (() => void) | undefined): {
    value: (callback: (value: V) => void) => Unsubscriber;
    on(handler: (value: Passed<V>) => void): Unsubscriber;
    set(value: V): void;
};

declare const index$1_ArrayObjectOptions: typeof ArrayObjectOptions;
declare const index$1_ArrayOptions: typeof ArrayOptions;
declare const index$1_EventOptions: typeof EventOptions;
declare const index$1_FunctionFunction: typeof FunctionFunction;
declare const index$1_FunctionOptions: typeof FunctionOptions;
declare const index$1_GeneratorOptions: typeof GeneratorOptions;
declare const index$1_ObjectOptions: typeof ObjectOptions;
declare const index$1_PingedFunctionFunction: typeof PingedFunctionFunction;
declare const index$1_PingedFunctionOptions: typeof PingedFunctionOptions;
type index$1_ReactiveProxied<V> = ReactiveProxied<V>;
declare const index$1_TimeoutTriggerOptions: typeof TimeoutTriggerOptions;
declare const index$1_Trigger: typeof Trigger;
declare const index$1_TriggerFunction: typeof TriggerFunction;
declare const index$1_TriggerGenerator: typeof TriggerGenerator;
declare const index$1_TriggerValue: typeof TriggerValue;
declare const index$1_array: typeof array;
declare const index$1_arrayObject: typeof arrayObject;
declare const index$1_boolean: typeof boolean;
declare const index$1_event: typeof event;
declare const index$1_func: typeof func;
declare const index$1_iterator: typeof iterator;
declare const index$1_number: typeof number;
declare const index$1_object: typeof object;
declare const index$1_objectProxy: typeof objectProxy;
declare const index$1_objectProxySymbol: typeof objectProxySymbol;
declare const index$1_observable: typeof observable;
declare const index$1_observableWritable: typeof observableWritable;
declare const index$1_of: typeof of;
declare const index$1_pinged: typeof pinged;
declare namespace index$1 {
  export { index$1_ArrayObjectOptions as ArrayObjectOptions, index$1_ArrayOptions as ArrayOptions, index$1_EventOptions as EventOptions, index$1_FunctionFunction as FunctionFunction, index$1_FunctionOptions as FunctionOptions, index$1_GeneratorOptions as GeneratorOptions, index$1_ObjectOptions as ObjectOptions, index$1_PingedFunctionFunction as PingedFunctionFunction, index$1_PingedFunctionOptions as PingedFunctionOptions, type index$1_ReactiveProxied as ReactiveProxied, index$1_TimeoutTriggerOptions as TimeoutTriggerOptions, index$1_Trigger as Trigger, index$1_TriggerFunction as TriggerFunction, index$1_TriggerGenerator as TriggerGenerator, index$1_TriggerValue as TriggerValue, index$1_array as array, index$1_arrayObject as arrayObject, index$1_boolean as boolean, index$1_event as event, index$1_func as func, index$1_iterator as iterator, index$1_number as number, index$1_object as object, index$1_objectProxy as objectProxy, index$1_objectProxySymbol as objectProxySymbol, index$1_observable as observable, index$1_observableWritable as observableWritable, index$1_of as of, index$1_pinged as pinged };
}

/**
 * Initialises a reactive that pipes values to listeners directly.
 * @returns
 */
declare function manual<V>(options?: Partial<InitStreamOptions>): Reactive<V> & ReactiveWritable<V>;
declare const Ops: {
    /**
   * Annotates values.
   *
   * For every value `input` emits, run it through `transformer`, which should
   * return the original value with additional fields.
   *
   * Conceptually the same as `transform`, just with typing to enforce result
   * values are V & TAnnotation
   * @param transformer
   * @returns
   */
    readonly annotate: <V, TAnnotation>(transformer: (input: V) => V & TAnnotation) => <In, TAnnotation_1>(source: ReactiveOrSource<In & TAnnotation_1>) => Reactive<In & TAnnotation_1>;
    /**
     * Annotates all values with the elapsed time since the last value
     * @returns
     */
    readonly annotateElapsed: <V_1>() => (source: ReactiveOrSource<V_1>) => Reactive<V_1>;
    /**
     * Takes a stream of values and batches them up (by quantity or time elapsed),
     * emitting them as an array.
     * @param options
     * @returns
     */
    readonly batch: <V_2>(options: Partial<BatchOptions>) => ReactiveOp<V_2, V_2[]>;
    readonly cloneFromFields: <V_3>() => ReactiveOp<V_3, V_3>;
    /**
   * Merges values from several sources into a single source that emits values as an array.
   * @param options
   * @returns
   */
    readonly combineLatestToArray: <const T extends readonly ReactiveOrSource<any>[]>(options?: Partial<CombineLatestOptions>) => (sources: T) => Reactive<RxValueTypes<T>>;
    /**
     * Merges values from several sources into a single source that emits values as an object.
     * @param options
     * @returns
     */
    readonly combineLatestToObject: <const T_1 extends Record<string, ReactiveOrSource<any>>>(options?: Partial<CombineLatestOptions>) => (reactiveSources: T_1) => Reactive<RxValueTypeObject<T_1>> & {
        dispose(reason: string): void;
        isDisposed(): boolean;
    };
    /**
   * Debounce values from the stream. It will wait until a certain time
   * has elapsed before emitting latest value.
   *
   * Effect is that no values are emitted if input emits faster than the provided
   * timeout.
   *
   * See also: throttle
   * @param options
   * @returns
   */
    readonly debounce: <V_4>(options: Partial<DebounceOptions>) => ReactiveOp<V_4, V_4>;
    /**
     * Yields the value of a field from an input stream of values.
     * Eg if the source reactive emits `{ colour: string, size: number }`,
     * we might use `field` to pluck out the `colour` field, thus returning
     * a stream of string values.
     * @param fieldName
     * @param options
     * @returns
     */
    readonly field: <V_5 extends object>(fieldName: keyof V_5, options: FieldOptions<V_5>) => (source: ReactiveOrSource<V_5>) => Reactive<V_5>;
    /**
     * Filters the input stream, only re-emitting values that pass the predicate
     * @param predicate
     * @returns
     */
    readonly filter: <V_6>(predicate: (value: V_6) => boolean) => <In_1>(source: ReactiveOrSource<In_1>) => Reactive<In_1>;
    readonly pipe: <TInput, TOutput>(...streams: Array<Reactive<any> & ReactiveWritable<any>>) => (source: ReactiveOrSource<TInput>) => Reactive<unknown> & {
        dispose(reason: string): void;
        isDisposed(): boolean;
    };
    readonly singleFromArray: <V_7>(options?: Partial<SingleFromArrayOptions<V_7>>) => (source: ReactiveOrSource<V_7[]>) => Reactive<V_7>;
    readonly split: <V>(options?: Partial<SplitOptions>) => (source: ReactiveOrSource<V>) => ReactiveStream<V>[];
    readonly splitLabelled: <V_1>(labels: Array<string>) => (source: ReactiveOrSource<V_1>) => Record<string, Reactive<V_1>>;
    readonly switcher: <TValue, TRec extends Record<string, FilterPredicate<TValue>>, TLabel extends keyof TRec>(cases: TRec, options?: Partial<SwitcherOptions>) => (source: ReactiveOrSource<TValue>) => Record<TLabel, Reactive<TValue>>;
    readonly syncToArray: <const T extends readonly ReactiveOrSource<any>[]>(options?: Partial<SyncOptions>) => (reactiveSources: T) => Reactive<RxValueTypes<T>>;
    readonly syncToObject: <const T_1 extends Record<string, ReactiveOrSource<any>>>(options?: Partial<SyncOptions>) => (reactiveSources: T_1) => Reactive<RxValueTypeObject<T_1>>;
    /**
   * Throttle values from the stream.
   * Only emits a value if some minimum time has elapsed.
   * @param options
   * @returns
   */
    readonly throttle: <V_2>(options: Partial<ThrottleOptions>) => (source: ReactiveOrSource<V_2>) => Reactive<V_2>;
    /**
     * Trigger a value if 'source' does not emit a value within an interval.
     * Trigger value can be a fixed value, result of function, or step through an iterator.
     * @param options
     * @returns
     */
    readonly timeoutTrigger: <V_3, TTriggerValue>(options: TimeoutTriggerOptions<TTriggerValue>) => (source: ReactiveOrSource<V_3>) => Reactive<V_3 | TTriggerValue> & {
        dispose(reason: string): void;
        isDisposed(): boolean;
    };
    readonly transform: <In, Out>(transformer: ((value: In) => Out)) => ReactiveOp<In, Out>;
    /**
    * Reactive where last (or a given initial) value is available to read
    * @param opts
    * @returns
    */
    readonly withValue: <V_4>(opts: Partial<WithValueOptions<V_4>>) => ReactiveOp<V_4, V_4>;
};
/**
 * Connects `source` to serially-connected set of ops. Values thus
 * flow from `source` to each op in turn.
 *
 * Returned result is the final reactive.
 *
 * @param source
 * @param ops
 * @returns
 */
declare function run<TIn, TOut>(source: ReactiveOrSource<TIn>, ...ops: Array<ReactiveOp<any, any>>): Reactive<TOut>;
declare function cache<T>(r: Reactive<T>, initialValue: T): {
    last(): T | undefined;
    reset(): void;
    on(handler: (value: Passed<T>) => void): Unsubscriber;
    value(handler: (value: T) => void): Unsubscriber;
};
/**
 * Grabs the next value emitted from `source`.
 * By default waits up to a maximum of one second.
 * Handles subscribing and unsubscribing.
 *
 * ```js
 * const value = await Rx.takeNextValue(source);
 * ```
 *
 * Throws an error if the source closes without
 * a value or the timeout is reached.
 *
 * @param source
 * @param maximumWait
 * @returns
 */
declare function takeNextValue<V>(source: ReactiveOrSource<V>, maximumWait?: Interval): Promise<V>;
/**
 * Connects reactive A to B, passing through a transform function.
 *
 * Returns a function to unsubcribe A->B
 * @param a
 * @param b
 * @param transform
 */
declare const to: <TA, TB>(a: Reactive<TA>, b: ReactiveWritable<TB>, transform: (valueA: TA) => TB, closeBonA?: boolean) => Unsubscriber;

declare const index_AnnotationElapsed: typeof AnnotationElapsed;
declare const index_BatchOptions: typeof BatchOptions;
declare const index_BindUpdateOpts: typeof BindUpdateOpts;
declare const index_CombineLatestOptions: typeof CombineLatestOptions;
declare const index_CountOptions: typeof CountOptions;
declare const index_DebounceOptions: typeof DebounceOptions;
declare const index_Dom: typeof Dom;
declare const index_DomBindResolvedSource: typeof DomBindResolvedSource;
declare const index_DomBindSourceValue: typeof DomBindSourceValue;
declare const index_DomBindTargetNode: typeof DomBindTargetNode;
declare const index_DomBindTargetNodeResolved: typeof DomBindTargetNodeResolved;
declare const index_DomBindUnresolvedSource: typeof DomBindUnresolvedSource;
declare const index_DomBindValueTarget: typeof DomBindValueTarget;
declare const index_DomCreateOptions: typeof DomCreateOptions;
declare const index_ElementBind: typeof ElementBind;
declare const index_ElementsOptions: typeof ElementsOptions;
declare const index_FieldOptions: typeof FieldOptions;
declare const index_FilterPredicate: typeof FilterPredicate;
declare const index_InitLazyStreamOptions: typeof InitLazyStreamOptions;
declare const index_InitStreamOptions: typeof InitStreamOptions;
declare const index_Lazy: typeof Lazy;
declare const index_Ops: typeof Ops;
declare const index_Optional: typeof Optional;
declare const index_Passed: typeof Passed;
declare const index_PassedSignal: typeof PassedSignal;
declare const index_PassedValue: typeof PassedValue;
declare const index_PipeDomBinding: typeof PipeDomBinding;
declare const index_PipeSet: typeof PipeSet;
declare const index_PrimitiveValueTypeObject: typeof PrimitiveValueTypeObject;
declare const index_Reactive: typeof Reactive;
declare const index_ReactiveArray: typeof ReactiveArray;
declare const index_ReactiveDiff: typeof ReactiveDiff;
declare const index_ReactiveDisposable: typeof ReactiveDisposable;
declare const index_ReactiveFinite: typeof ReactiveFinite;
declare const index_ReactiveInitial: typeof ReactiveInitial;
declare const index_ReactiveNonInitial: typeof ReactiveNonInitial;
declare const index_ReactiveOp: typeof ReactiveOp;
declare const index_ReactiveOpInit: typeof ReactiveOpInit;
declare const index_ReactiveOpLinks: typeof ReactiveOpLinks;
declare const index_ReactiveOrSource: typeof ReactiveOrSource;
declare const index_ReactiveStream: typeof ReactiveStream;
declare const index_ReactiveWritable: typeof ReactiveWritable;
declare const index_ResolveOptions: typeof ResolveOptions;
type index_ResolveSourceOptions = ResolveSourceOptions;
type index_ResolveTriggerDone = ResolveTriggerDone;
type index_ResolveTriggerValue<V> = ResolveTriggerValue<V>;
declare const index_RxValueTypeObject: typeof RxValueTypeObject;
declare const index_RxValueTypes: typeof RxValueTypes;
declare const index_SignalKinds: typeof SignalKinds;
declare const index_SingleFromArrayOptions: typeof SingleFromArrayOptions;
declare const index_SplitOptions: typeof SplitOptions;
declare const index_SwitcherOptions: typeof SwitcherOptions;
declare const index_SyncOptions: typeof SyncOptions;
declare const index_ThrottleOptions: typeof ThrottleOptions;
declare const index_ToArrayOptions: typeof ToArrayOptions;
declare const index_TransformOpts: typeof TransformOpts;
declare const index_Unsubscriber: typeof Unsubscriber;
declare const index_UpstreamOptions: typeof UpstreamOptions;
declare const index_WithValueOptions: typeof WithValueOptions;
declare const index_Wrapped: typeof Wrapped;
declare const index_annotate: typeof annotate;
declare const index_annotateElapsed: typeof annotateElapsed;
declare const index_batch: typeof batch;
declare const index_cache: typeof cache;
declare const index_cloneFromFields: typeof cloneFromFields;
declare const index_combineLatestToArray: typeof combineLatestToArray;
declare const index_combineLatestToObject: typeof combineLatestToObject;
declare const index_count: typeof count;
declare const index_debounce: typeof debounce;
declare const index_field: typeof field;
declare const index_filter: typeof filter;
declare const index_hasLast: typeof hasLast;
declare const index_isDisposable: typeof isDisposable;
declare const index_isReactive: typeof isReactive;
declare const index_isTrigger: typeof isTrigger;
declare const index_isTriggerFunction: typeof isTriggerFunction;
declare const index_isTriggerGenerator: typeof isTriggerGenerator;
declare const index_isTriggerValue: typeof isTriggerValue;
declare const index_isWrapped: typeof isWrapped;
declare const index_manual: typeof manual;
declare const index_messageHasValue: typeof messageHasValue;
declare const index_messageIsDoneSignal: typeof messageIsDoneSignal;
declare const index_messageIsSignal: typeof messageIsSignal;
declare const index_opify: typeof opify;
declare const index_pipe: typeof pipe;
declare const index_prepare: typeof prepare;
declare const index_resolveSource: typeof resolveSource;
declare const index_resolveTriggerValue: typeof resolveTriggerValue;
declare const index_run: typeof run;
declare const index_singleFromArray: typeof singleFromArray;
declare const index_split: typeof split;
declare const index_splitLabelled: typeof splitLabelled;
declare const index_switcher: typeof switcher;
declare const index_symbol: typeof symbol;
declare const index_syncToArray: typeof syncToArray;
declare const index_syncToObject: typeof syncToObject;
declare const index_takeNextValue: typeof takeNextValue;
declare const index_throttle: typeof throttle;
declare const index_timeoutTrigger: typeof timeoutTrigger;
declare const index_to: typeof to;
declare const index_toArray: typeof toArray;
declare const index_toArrayOrThrow: typeof toArrayOrThrow;
declare const index_toGenerator: typeof toGenerator;
declare const index_transform: typeof transform;
declare const index_withValue: typeof withValue;
declare const index_wrap: typeof wrap;
declare namespace index {
  export { index_AnnotationElapsed as AnnotationElapsed, index_BatchOptions as BatchOptions, index_BindUpdateOpts as BindUpdateOpts, index_CombineLatestOptions as CombineLatestOptions, index_CountOptions as CountOptions, index_DebounceOptions as DebounceOptions, index_Dom as Dom, index_DomBindResolvedSource as DomBindResolvedSource, index_DomBindSourceValue as DomBindSourceValue, index_DomBindTargetNode as DomBindTargetNode, index_DomBindTargetNodeResolved as DomBindTargetNodeResolved, index_DomBindUnresolvedSource as DomBindUnresolvedSource, index_DomBindValueTarget as DomBindValueTarget, index_DomCreateOptions as DomCreateOptions, index_ElementBind as ElementBind, index_ElementsOptions as ElementsOptions, index_FieldOptions as FieldOptions, index_FilterPredicate as FilterPredicate, index$1 as From, index_InitLazyStreamOptions as InitLazyStreamOptions, index_InitStreamOptions as InitStreamOptions, index_Lazy as Lazy, index_Ops as Ops, index_Optional as Optional, index_Passed as Passed, index_PassedSignal as PassedSignal, index_PassedValue as PassedValue, index_PipeDomBinding as PipeDomBinding, index_PipeSet as PipeSet, index_PrimitiveValueTypeObject as PrimitiveValueTypeObject, index_Reactive as Reactive, index_ReactiveArray as ReactiveArray, index_ReactiveDiff as ReactiveDiff, index_ReactiveDisposable as ReactiveDisposable, index_ReactiveFinite as ReactiveFinite, index_ReactiveInitial as ReactiveInitial, index_ReactiveNonInitial as ReactiveNonInitial, index_ReactiveOp as ReactiveOp, index_ReactiveOpInit as ReactiveOpInit, index_ReactiveOpLinks as ReactiveOpLinks, index_ReactiveOrSource as ReactiveOrSource, index_ReactiveStream as ReactiveStream, index_ReactiveWritable as ReactiveWritable, index_ResolveOptions as ResolveOptions, type index_ResolveSourceOptions as ResolveSourceOptions, type index_ResolveTriggerDone as ResolveTriggerDone, type index_ResolveTriggerValue as ResolveTriggerValue, index_RxValueTypeObject as RxValueTypeObject, index_RxValueTypes as RxValueTypes, index_SignalKinds as SignalKinds, index_SingleFromArrayOptions as SingleFromArrayOptions, index_SplitOptions as SplitOptions, index_SwitcherOptions as SwitcherOptions, index_SyncOptions as SyncOptions, index_ThrottleOptions as ThrottleOptions, index_ToArrayOptions as ToArrayOptions, index_TransformOpts as TransformOpts, index_Unsubscriber as Unsubscriber, index_UpstreamOptions as UpstreamOptions, index_WithValueOptions as WithValueOptions, index_Wrapped as Wrapped, index_annotate as annotate, index_annotateElapsed as annotateElapsed, index_batch as batch, index_cache as cache, index_cloneFromFields as cloneFromFields, index_combineLatestToArray as combineLatestToArray, index_combineLatestToObject as combineLatestToObject, index_count as count, index_debounce as debounce, index_field as field, index_filter as filter, index_hasLast as hasLast, index_isDisposable as isDisposable, index_isReactive as isReactive, index_isTrigger as isTrigger, index_isTriggerFunction as isTriggerFunction, index_isTriggerGenerator as isTriggerGenerator, index_isTriggerValue as isTriggerValue, index_isWrapped as isWrapped, index_manual as manual, index_messageHasValue as messageHasValue, index_messageIsDoneSignal as messageIsDoneSignal, index_messageIsSignal as messageIsSignal, index_opify as opify, index_pipe as pipe, index_prepare as prepare, index_resolveSource as resolveSource, index_resolveTriggerValue as resolveTriggerValue, index_run as run, index_singleFromArray as singleFromArray, index_split as split, index_splitLabelled as splitLabelled, index_switcher as switcher, index_symbol as symbol, index_syncToArray as syncToArray, index_syncToObject as syncToObject, index_takeNextValue as takeNextValue, index_throttle as throttle, index_timeoutTrigger as timeoutTrigger, index_to as to, index_toArray as toArray, index_toArrayOrThrow as toArrayOrThrow, index_toGenerator as toGenerator, index_transform as transform, index_withValue as withValue, index_wrap as wrap };
}

export { withValue as A, prepare as B, toArray as C, Dom as D, toArrayOrThrow as E, toGenerator as F, messageIsSignal as G, messageIsDoneSignal as H, messageHasValue as I, hasLast as J, isReactive as K, isDisposable as L, isWrapped as M, opify as N, Ops as O, isTriggerValue as P, isTriggerFunction as Q, isTriggerGenerator as R, isTrigger as S, type ResolveTriggerValue as T, type ResolveTriggerDone as U, resolveTriggerValue as V, wrap as W, type ResolveSourceOptions as X, resolveSource as Y, count as Z, to as a, index$1 as b, cache as c, annotate as d, annotateElapsed as e, batch as f, cloneFromFields as g, combineLatestToArray as h, index as i, combineLatestToObject as j, debounce as k, field as l, manual as m, filter as n, split as o, pipe as p, splitLabelled as q, run as r, singleFromArray as s, takeNextValue as t, switcher as u, syncToArray as v, syncToObject as w, throttle as x, timeoutTrigger as y, transform as z };
