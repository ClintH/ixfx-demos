import { R as Reactive, a as ReactiveWritable, S as SplitOptions, b as ReactiveOrSource, c as ReactiveStream, F as FilterPredicate, d as SwitcherOptions, e as ReactiveDisposable, f as ResolveOptions, g as FieldOptions, h as ReactiveOp, I as InitStreamOptions, T as TransformOpts, A as AnnotationElapsed, i as SingleFromArrayOptions, B as BatchOptions, D as DebounceOptions, j as ThrottleOptions, k as ToArrayOptions, l as FromArrayOptions, m as ReactiveFinite, G as GeneratorOptions, P as Passed, n as PassedSignal, o as PassedValue, p as ReactiveDiff, q as ReactiveInitial, W as Wrapped, r as DomBindSourceValue, s as PipeDomBinding, t as DomBindValueTarget, u as DomBindUnresolvedSource, v as BindUpdateOpts, E as ElementsOptions, w as ReactiveNonInitial, x as EventOptions, O as Optional, y as ObjectOptions, z as symbol, C as DomBindResolvedSource, H as DomBindTargetNode, J as DomBindTargetNodeResolved, K as DomCreateOptions, L as PipeSet, M as ReactiveOpInit, N as ReactiveOpLinks, Q as SignalKinds, U as UpstreamOptions } from './Types-XahV3uZo.js';
import { C as Change } from './Immutable-be36LyLq.js';

/**
 * Connects reactive A to B, passing through a transform function.
 *
 * Returns a function to unsubcribe A->B
 * @param a
 * @param b
 * @param transform
 */
declare const to: <TA, TB>(a: Reactive<TA>, b: ReactiveWritable<TB>, transform: (valueA: TA) => TB, closeBonA?: boolean) => () => void;
/**
 * Creates a set of streams each of which receives data from `source`.
 * By default these are lazy and dispose if the upstream source closes.
 *
 * See also {@link splitLabelled} to split into named streams.
 * @param source
 * @param quantity
 * @returns
 */
declare const split: <T>(options?: Partial<SplitOptions>) => (r: ReactiveOrSource<T>) => ReactiveStream<T>[];
/**
 * Splits `source` into several duplicated streams. Returns an object with keys according to `labels`.
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
declare const splitLabelled: <T, K extends PropertyKey>(...labels: K[]) => (r: ReactiveOrSource<T>) => Record<K, Reactive<T>>;
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
 *   console.log(`even: ${msg.value}`);
 * });
 * x.odd.on(msg => {
 *   console.log(`odd: ${msg.value}`);
 * })
 * // Set new values to the number source, counting upwards
 * // ...this will in turn trigger the console outputs above
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
 * Pipes the output of one stream into another, in order.
 * The stream returned is a new stream which captures the final output.
 *
 * If any stream in the pipe closes the whole pipe is closed.
 * @param streams
 * @returns
 */
declare const pipe: <TInput, TOutput>(...streams: [Reactive<TInput>, ...(Reactive<any> & ReactiveWritable<any>)[], ReactiveWritable<TOutput> & Reactive<any>]) => Reactive<TOutput> & ReactiveDisposable;
/**
 * Monitors input reactive values, storing values as they happen to an array.
 * Whenever a new value is emitted, the whole array is sent out, containing current
 * values from each source.
 *
 * @param values
 * @returns
 */
declare function mergeAsArray<V>(...values: Array<Reactive<V>>): Reactive<Array<V | undefined>>;
/**
 * Waits for all sources to produce a value, sending the combined results as an array.
 * After sending, it waits again for each source to send a value.
 *
 * Each source's latest value is returned, in the case of some sources producing results
 * faster than others.
 *
 * If a value completes, we won't wait for it and the result set gets smaller.
 *
 */
declare function synchronise<V>(): (...sources: Array<ReactiveOrSource<V>>) => Reactive<Array<V | undefined>>;
/**
 * Wraps a function or value as a reactive. Can optionally wait for a given period or continually produce the value.
 *
 * ```js
 * const rx = resolve('hello', { interval: 5000 });
 * rx.on(msg => {
 *  // 'hello' after 5 seconds
 *  console.log(msg.value);
 * });
 * ```
 *
 * ```js
 * // Produces a random number every second, but only
 * // when there is a subscriber.
 * const rx = resolve(() => Math.floor(Math.random()*100), { interval: 1000, infinite: true, lazy: true });
 * ```
 *
 * Options:
 * - Set _loops_ or _infinite_. If neither of these are set, it runs once.
 * - _interval_ is 0 by default.
 * @param callbackOrValue
 * @param options
 * @returns
 */
declare function resolve<V>(callbackOrValue: V | (() => V), options?: Partial<ResolveOptions>): Reactive<V>;
/**
 * From a source value, yields a field from it.
 *
 * If a source value doesn't have that field, it is skipped.

 * @returns
 */
declare function field<TIn, TFieldType>(fieldName: keyof TIn, options?: Partial<FieldOptions<TFieldType>>): ReactiveOp<TIn, TFieldType>;
/**
 * Passes all values where `predicate` function returns _true_.
 */
declare function filter<In>(predicate: FilterPredicate<In>, options: Partial<InitStreamOptions>): ReactiveOp<In, In>;
/**
 * Transforms values from `source` using the `transformer` function.
 * @param transformer
 * @returns
 */
declare function transform<In, Out>(input: ReactiveOrSource<In>, transformer: (value: In) => Out, options?: Partial<TransformOpts>): Reactive<Out>;
/**
 * Annotates values from `source`, appending new fields to values.
 * Output stream will be the type `In & Out`.
 */
declare function annotate<In, TAnnotation>(transformer: (value: In) => In & TAnnotation, options?: Partial<TransformOpts>): ReactiveOp<In, In & TAnnotation>;
/**
 * Annotates values from `source`, adding a `elapsedMs` field to values.
 * Elapsed will be the time in milliseconds since the last value. If it is the first value, -1 is used.
 * @param input
 * @param transformer
 * @param options
 * @returns
 */
declare const annotateElapsed: <In>() => (input: ReactiveOrSource<In>) => Reactive<In & AnnotationElapsed>;
/**
 * Create a new object from input, based on cloning fields rather than a destructured copy.
 * This is useful for event args.
 * @param input
 * @returns
 */
declare const cloneFromFields: <In>(source: ReactiveOrSource<In>) => Reactive<In>;
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
/**
 * Queue from `source`, emitting when thresholds are reached. Returns a new Reactive
 * which produces arrays.
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
 * Build a graph of reactive dependencies for `rx`
 * @param rx
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

declare const fromArray: <V>(array: V[], options?: Partial<FromArrayOptions>) => Reactive<V> & ReactiveFinite & {
    last(): V;
};

/**
 * Creates a readable reactive based on a generator
 * ```js
 * // Generators that makes a random value every 5 seconds
 * const valuesOverTime = Flow.interval(() => Math.random(), 5000);
 * // Wrap the generator
 * const r = Reactive.generator(time);
 * // Get notified when there is a new value
 * r.on(v => {
 *   console.log(v.value);
 * });
 * ```
 * @param generator
 */
declare function generator<V>(generator: IterableIterator<V> | AsyncIterableIterator<V> | Generator<V> | AsyncGenerator<V>, options?: Partial<GeneratorOptions>): ReactiveDisposable & Reactive<V>;

declare function messageIsSignal<V>(message: Passed<V> | PassedSignal): message is PassedSignal;
declare function messageIsDoneSignal<V>(message: Passed<V> | PassedSignal): boolean;
/**
 * Returns _true_ if `v` has a non-undefined value. Note that sometimes
 * _undefined_ is a legal value to pass
 * @param v
 * @returns
 */
declare function messageHasValue<V>(v: Passed<V> | PassedSignal): v is PassedValue<V>;
declare const hasLast: <V>(rx: Reactive<V> | ReactiveDiff<V>) => rx is ReactiveInitial<V>;
declare const isDisposable: (v: object) => v is ReactiveDisposable;
declare const opify: <V>(fn: (source: ReactiveOrSource<V>, ...args: Array<any>) => Reactive<V>, ...args: Array<any>) => (source: ReactiveOrSource<V>) => Reactive<V>;

/**
 * Wrap a reactive source in a OOP wrapper to allow for chained
 * function calls.
 *
 * For every `pointerup` event on the body, batch the events over
 * periods of 200ms, and then get the number of events in that period,
 * finally printing it out.
 *
 * eg. detecting single or double-clicks
 * ```js
 * wrap(event<{ x: number, y: number }>(document.body, `pointerup`))
 *  .batch({ elapsed: 200 })
 *  .transform(v => v.length)
 *  .value(v => { console.log(v) });
 * ```
 * @param source
 * @returns
 */
declare function wrap<TIn>(source: ReactiveOrSource<TIn>): Wrapped<TIn>;

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
declare const bindElement: <V>(source: Reactive<V>, elOrQuery: string | HTMLElement | null, ...binds: (DomBindSourceValue<V> & DomBindValueTarget)[]) => PipeDomBinding;
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
declare const bind: <V>(source: Reactive<V>, ...bindsUnresolvedElements: DomBindUnresolvedSource<V>[]) => PipeDomBinding;
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
declare const elements: <T>(source: ReactiveDiff<T> | (ReactiveDisposable & ReactiveWritable<T> & {
    onDiff(handler: (changes: Passed<Change<any>[]>) => void): () => void;
    update(changedPart: Record<string, any>): void;
    updateField(field: string, value: any): void;
} & Reactive<T> & {
    last(): T;
}), options: Partial<ElementsOptions>) => void;
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
    } & ReactiveDisposable;
    pointer: Reactive<{
        x: number;
        y: number;
    }> & {
        last(): {
            x: number;
            y: number;
        };
    } & ReactiveDisposable;
};

declare const Dom_bind: typeof bind;
declare const Dom_bindDiffUpdate: typeof bindDiffUpdate;
declare const Dom_bindElement: typeof bindElement;
declare const Dom_bindHtml: typeof bindHtml;
declare const Dom_bindText: typeof bindText;
declare const Dom_bindUpdate: typeof bindUpdate;
declare const Dom_elements: typeof elements;
declare const Dom_win: typeof win;
declare namespace Dom {
  export { Dom_bind as bind, Dom_bindDiffUpdate as bindDiffUpdate, Dom_bindElement as bindElement, Dom_bindHtml as bindHtml, Dom_bindText as bindText, Dom_bindUpdate as bindUpdate, Dom_elements as elements, Dom_win as win };
}

declare function number(initialValue: number): ReactiveDisposable & ReactiveWritable<number> & ReactiveInitial<number>;
declare function number(): ReactiveDisposable & ReactiveWritable<number> & ReactiveNonInitial<number>;
declare function fromEvent<V extends Record<string, any>>(target: EventTarget | null, name: string, options: EventOptions<V>): ReactiveInitial<V> & ReactiveDisposable;
declare function fromEvent<V extends Record<string, any>>(target: EventTarget | null, name: string, options?: Optional<EventOptions<V>, `process`>): ReactiveNonInitial<V> & ReactiveDisposable;
/**
 * Reactive stream of array of elements that match `query`.
 * @param query
 * @returns
 */
declare function fromQuery(query: string): ReactiveDisposable & ReactiveWritable<HTMLElement[]> & {
    onDiff(handler: (changes: Passed<Change<any>[]>) => void): () => void;
    update(changedPart: Record<string, any>): void;
    updateField(field: string, value: any): void;
} & Reactive<HTMLElement[]> & {
    last(): HTMLElement[];
};
/**
 * Initialises a reactive that pipes values to listeners directly.
 * @returns
 */
declare function manual<V>(options?: Partial<InitStreamOptions>): Reactive<V> & ReactiveWritable<V>;
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
    on: (handler: (value: Passed<V>) => void) => () => void;
    value: (callback: (value: V) => void) => () => void;
};
/**
 * As {@link observable}, but returns a Reactive that allows writing
 * @param init
 * @returns
 */
declare function observableWritable<V>(init: (stream: Reactive<V> & ReactiveWritable<V>) => (() => void) | undefined): {
    value: (callback: (value: V) => void) => () => void;
    on(handler: (value: Passed<V>) => void): () => void;
    set(value: V): void;
};
declare function fromObject<V extends Record<string, any>>(initialValue: V, options?: Partial<ObjectOptions<V>>): ReactiveDiff<V> & ReactiveInitial<V>;
declare function fromObject<V extends Record<string, any>>(initialValue: undefined, options?: Partial<ObjectOptions<V>>): ReactiveDiff<V> & ReactiveNonInitial<V>;
/**
 * Creates a Reactive from an AsyncGenerator or Generator
 * @param gen
 * @returns
 */
declare function fromGenerator<V>(gen: AsyncGenerator<V> | Generator<V>): ReactiveStream<V>;
declare const Ops: {
    readonly batch: <V>(options: Partial<BatchOptions>) => ReactiveOp<V, V[]>;
    readonly debounce: <V_1>(options: Partial<DebounceOptions>) => ReactiveOp<V_1, V_1>;
    readonly transform: <In, Out>(transformer: (value: In) => Out) => ReactiveOp<In, Out>;
    readonly throttle: <V_2>(options: Partial<ThrottleOptions>) => (source: ReactiveOrSource<V_2>) => Reactive<V_2>;
};
/**
 * Reads the values of a reactive into an array.
 * Use the `limit` or `elapsed` to limit how many
 * items to read, and/or for how long.
 * @param reactive
 * @param options
 * @returns
 */
type ReactiveProxied<V> = V & {
    [symbol]: ReactiveDiff<V> & ReactiveInitial<V>;
};
/**
 * Creates a proxy of `target`, so that regular property setting will be intercepted and output
 * on a {@link Reactive} object as well.
 *
 * ```js
 * const { proxy, rx } = fromProxy({ colour: `red`, x: 10, y: 20 });
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
 * The benefit of `fromProxy` instead of {@link fromObject} is because the proxied object can be passed to other code that doesn't need
 * to know anything about Reactive objects.
 *
 * You can assign the return values to more meaningful names using
 * JS syntax.
 * ```js
 * const { proxy:colour, rx:colourRx } = fromProxy({ colour: `red` });
 * ```
 *
 * See also:
 * * {@link fromProxySymbol}: Instead of {proxy,rx} return result, puts the `rx` under a symbol on the proxy.
 * @param target
 * @returns
 */
declare const fromProxy: <V extends object>(target: V) => {
    proxy: V;
    rx: ReactiveDisposable & ReactiveWritable<V> & {
        onDiff(handler: (changes: Passed<Change<any>[]>) => void): () => void;
        update(changedPart: Record<string, any>): void;
        updateField(field: string, value: any): void;
    } & Reactive<V> & {
        last(): V;
    };
};
/**
 * Same as {@link fromProxy}, but the return value is the proxied object along with
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
declare const fromProxySymbol: <V extends object>(target: V) => ReactiveProxied<V>;

declare const index_AnnotationElapsed: typeof AnnotationElapsed;
declare const index_BatchOptions: typeof BatchOptions;
declare const index_BindUpdateOpts: typeof BindUpdateOpts;
declare const index_DebounceOptions: typeof DebounceOptions;
declare const index_Dom: typeof Dom;
declare const index_DomBindResolvedSource: typeof DomBindResolvedSource;
declare const index_DomBindSourceValue: typeof DomBindSourceValue;
declare const index_DomBindTargetNode: typeof DomBindTargetNode;
declare const index_DomBindTargetNodeResolved: typeof DomBindTargetNodeResolved;
declare const index_DomBindUnresolvedSource: typeof DomBindUnresolvedSource;
declare const index_DomBindValueTarget: typeof DomBindValueTarget;
declare const index_DomCreateOptions: typeof DomCreateOptions;
declare const index_ElementsOptions: typeof ElementsOptions;
declare const index_EventOptions: typeof EventOptions;
declare const index_FieldOptions: typeof FieldOptions;
declare const index_FilterPredicate: typeof FilterPredicate;
declare const index_FromArrayOptions: typeof FromArrayOptions;
declare const index_GeneratorOptions: typeof GeneratorOptions;
declare const index_InitStreamOptions: typeof InitStreamOptions;
declare const index_ObjectOptions: typeof ObjectOptions;
declare const index_Ops: typeof Ops;
declare const index_Optional: typeof Optional;
declare const index_Passed: typeof Passed;
declare const index_PassedSignal: typeof PassedSignal;
declare const index_PassedValue: typeof PassedValue;
declare const index_PipeDomBinding: typeof PipeDomBinding;
declare const index_PipeSet: typeof PipeSet;
declare const index_Reactive: typeof Reactive;
declare const index_ReactiveDiff: typeof ReactiveDiff;
declare const index_ReactiveDisposable: typeof ReactiveDisposable;
declare const index_ReactiveFinite: typeof ReactiveFinite;
declare const index_ReactiveInitial: typeof ReactiveInitial;
declare const index_ReactiveNonInitial: typeof ReactiveNonInitial;
declare const index_ReactiveOp: typeof ReactiveOp;
declare const index_ReactiveOpInit: typeof ReactiveOpInit;
declare const index_ReactiveOpLinks: typeof ReactiveOpLinks;
declare const index_ReactiveOrSource: typeof ReactiveOrSource;
type index_ReactiveProxied<V> = ReactiveProxied<V>;
declare const index_ReactiveStream: typeof ReactiveStream;
declare const index_ReactiveWritable: typeof ReactiveWritable;
declare const index_ResolveOptions: typeof ResolveOptions;
declare const index_SignalKinds: typeof SignalKinds;
declare const index_SingleFromArrayOptions: typeof SingleFromArrayOptions;
declare const index_SplitOptions: typeof SplitOptions;
declare const index_SwitcherOptions: typeof SwitcherOptions;
declare const index_ThrottleOptions: typeof ThrottleOptions;
declare const index_ToArrayOptions: typeof ToArrayOptions;
declare const index_TransformOpts: typeof TransformOpts;
declare const index_UpstreamOptions: typeof UpstreamOptions;
declare const index_Wrapped: typeof Wrapped;
declare const index_annotate: typeof annotate;
declare const index_annotateElapsed: typeof annotateElapsed;
declare const index_batch: typeof batch;
declare const index_cloneFromFields: typeof cloneFromFields;
declare const index_debounce: typeof debounce;
declare const index_field: typeof field;
declare const index_filter: typeof filter;
declare const index_fromArray: typeof fromArray;
declare const index_fromEvent: typeof fromEvent;
declare const index_fromGenerator: typeof fromGenerator;
declare const index_fromObject: typeof fromObject;
declare const index_fromProxy: typeof fromProxy;
declare const index_fromProxySymbol: typeof fromProxySymbol;
declare const index_fromQuery: typeof fromQuery;
declare const index_generator: typeof generator;
declare const index_hasLast: typeof hasLast;
declare const index_isDisposable: typeof isDisposable;
declare const index_manual: typeof manual;
declare const index_mergeAsArray: typeof mergeAsArray;
declare const index_messageHasValue: typeof messageHasValue;
declare const index_messageIsDoneSignal: typeof messageIsDoneSignal;
declare const index_messageIsSignal: typeof messageIsSignal;
declare const index_number: typeof number;
declare const index_observable: typeof observable;
declare const index_observableWritable: typeof observableWritable;
declare const index_opify: typeof opify;
declare const index_pipe: typeof pipe;
declare const index_prepare: typeof prepare;
declare const index_resolve: typeof resolve;
declare const index_run: typeof run;
declare const index_singleFromArray: typeof singleFromArray;
declare const index_split: typeof split;
declare const index_splitLabelled: typeof splitLabelled;
declare const index_switcher: typeof switcher;
declare const index_symbol: typeof symbol;
declare const index_synchronise: typeof synchronise;
declare const index_throttle: typeof throttle;
declare const index_to: typeof to;
declare const index_toArray: typeof toArray;
declare const index_toArrayOrThrow: typeof toArrayOrThrow;
declare const index_toGenerator: typeof toGenerator;
declare const index_transform: typeof transform;
declare const index_wrap: typeof wrap;
declare namespace index {
  export { index_AnnotationElapsed as AnnotationElapsed, index_BatchOptions as BatchOptions, index_BindUpdateOpts as BindUpdateOpts, index_DebounceOptions as DebounceOptions, index_Dom as Dom, index_DomBindResolvedSource as DomBindResolvedSource, index_DomBindSourceValue as DomBindSourceValue, index_DomBindTargetNode as DomBindTargetNode, index_DomBindTargetNodeResolved as DomBindTargetNodeResolved, index_DomBindUnresolvedSource as DomBindUnresolvedSource, index_DomBindValueTarget as DomBindValueTarget, index_DomCreateOptions as DomCreateOptions, index_ElementsOptions as ElementsOptions, index_EventOptions as EventOptions, index_FieldOptions as FieldOptions, index_FilterPredicate as FilterPredicate, index_FromArrayOptions as FromArrayOptions, index_GeneratorOptions as GeneratorOptions, index_InitStreamOptions as InitStreamOptions, index_ObjectOptions as ObjectOptions, index_Ops as Ops, index_Optional as Optional, index_Passed as Passed, index_PassedSignal as PassedSignal, index_PassedValue as PassedValue, index_PipeDomBinding as PipeDomBinding, index_PipeSet as PipeSet, index_Reactive as Reactive, index_ReactiveDiff as ReactiveDiff, index_ReactiveDisposable as ReactiveDisposable, index_ReactiveFinite as ReactiveFinite, index_ReactiveInitial as ReactiveInitial, index_ReactiveNonInitial as ReactiveNonInitial, index_ReactiveOp as ReactiveOp, index_ReactiveOpInit as ReactiveOpInit, index_ReactiveOpLinks as ReactiveOpLinks, index_ReactiveOrSource as ReactiveOrSource, type index_ReactiveProxied as ReactiveProxied, index_ReactiveStream as ReactiveStream, index_ReactiveWritable as ReactiveWritable, index_ResolveOptions as ResolveOptions, index_SignalKinds as SignalKinds, index_SingleFromArrayOptions as SingleFromArrayOptions, index_SplitOptions as SplitOptions, index_SwitcherOptions as SwitcherOptions, index_ThrottleOptions as ThrottleOptions, index_ToArrayOptions as ToArrayOptions, index_TransformOpts as TransformOpts, index_UpstreamOptions as UpstreamOptions, index_Wrapped as Wrapped, index_annotate as annotate, index_annotateElapsed as annotateElapsed, index_batch as batch, index_cloneFromFields as cloneFromFields, index_debounce as debounce, index_field as field, index_filter as filter, index_fromArray as fromArray, index_fromEvent as fromEvent, index_fromGenerator as fromGenerator, index_fromObject as fromObject, index_fromProxy as fromProxy, index_fromProxySymbol as fromProxySymbol, index_fromQuery as fromQuery, index_generator as generator, index_hasLast as hasLast, index_isDisposable as isDisposable, index_manual as manual, index_mergeAsArray as mergeAsArray, index_messageHasValue as messageHasValue, index_messageIsDoneSignal as messageIsDoneSignal, index_messageIsSignal as messageIsSignal, index_number as number, index_observable as observable, index_observableWritable as observableWritable, index_opify as opify, index_pipe as pipe, index_prepare as prepare, index_resolve as resolve, index_run as run, index_singleFromArray as singleFromArray, index_split as split, index_splitLabelled as splitLabelled, index_switcher as switcher, index_symbol as symbol, index_synchronise as synchronise, index_throttle as throttle, index_to as to, index_toArray as toArray, index_toArrayOrThrow as toArrayOrThrow, index_toGenerator as toGenerator, index_transform as transform, index_wrap as wrap };
}

export { run as A, batch as B, debounce as C, Dom as D, throttle as E, prepare as F, toArray as G, toArrayOrThrow as H, toGenerator as I, fromArray as J, generator as K, messageIsSignal as L, messageIsDoneSignal as M, messageHasValue as N, Ops as O, hasLast as P, isDisposable as Q, type ReactiveProxied as R, opify as S, wrap as T, fromQuery as a, observableWritable as b, fromObject as c, fromGenerator as d, fromProxy as e, fromEvent as f, fromProxySymbol as g, splitLabelled as h, index as i, switcher as j, mergeAsArray as k, synchronise as l, manual as m, number as n, observable as o, pipe as p, field as q, resolve as r, split as s, to as t, filter as u, transform as v, annotate as w, annotateElapsed as x, cloneFromFields as y, singleFromArray as z };
