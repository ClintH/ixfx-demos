import { I as Interval } from './IntervalType-zqeNLRm6.js';
import { C as Change, a as IsEqualContext } from './Immutable-be36LyLq.js';

type DomBindOptions<V> = {
    /**
     * If set, this DOM element field is set. Eg 'textContent'
     */
    elField?: string;
    /**
     * If set, this DOM attribute is set, Eg 'width'
     */
    attribName?: string;
    /**
     * If set, this CSS variable is set, Eg 'hue' (sets '--hue')
     */
    cssVariable?: string;
    /**
     * If set, this CSS property is set, Eg 'background-color'
     */
    cssProperty?: string;
    /**
     * Field from source value to pluck and use.
     * This will also be the value passed to the transform
     */
    sourceField?: keyof V;
    transform?: (input: V) => string;
    transformValue?: (input: any) => string;
    query?: string;
    element?: HTMLElement;
};
type DomBindOptionsWithElement<V> = DomBindOptions<V> & {
    element: HTMLElement;
};
type DomCreateOptions = {
    tagName: string;
    parentEl: string | HTMLElement;
};
type PipeDomBinding = {
    /**
     * Remove binding and optionally delete element(s) (false by default)
     */
    remove(deleteElements: boolean): void;
};
/**
 * Updates an element's `textContent` when the source value changes
 * ```js
 * bindTextContent(`#blah`, source);
 * // Use function to get text value from source value
 * bindTextContent(myEl, source, v => v.name);
 * ```
 *
 * Uses {@link bind}, with `{field:'textContent'}` as the options
 * @param elOrQuery
 * @param source
 * @param transformer
 */
declare const bindTextContent: <V>(source: Reactive<V>, elOrQuery: string | HTMLElement, bindOpts?: Partial<DomBindOptions<V>>) => PipeDomBinding;
/**
 * Shortcut to bind to innerHTML
 * @param elOrQuery
 * @param source
 * @param bindOpts
 * @returns
 */
declare const bindHtmlContent: <V>(source: Reactive<V>, elOrQuery: string | HTMLElement, bindOpts?: Partial<DomBindOptions<V>>) => PipeDomBinding;
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
 * Returns a {@link PipeDomBinding} to control binding
 * ```js
 * const bind = bind(source, `#someEl`);
 * bind.remove(); // Unbind
 * bind.remove(true); // Unbind and remove HTML element
 * ```
 *
 * If several fields need to be updated based on a new value, consider using {@link bindUpdate} instead.
 * @param elOrQuery
 * @param source
 * @param bindOpts
 */
declare const bindElement: <V>(source: Reactive<V>, elOrQuery: string | HTMLElement, ...binds: Partial<DomBindOptions<V>>[]) => PipeDomBinding;
/**
 * Binds `source` to one or more element(s).
 * ```js
 * bind(source,
 *  // Binds .name field of source values to textContent of #some-element
 *  { query: `#some-element`, sourceField: `name` },
 * );
 * ```
 *
 * Can update
 * * CSS variables
 * * CSS styles
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
 * @param source
 * @param bindsUnresolvedElements
 * @returns
 */
declare const bind: <V>(source: Reactive<V>, ...bindsUnresolvedElements: DomBindOptions<V>[]) => PipeDomBinding;
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
type BindUpdateOpts<V> = {
    initial: (v: V, el: HTMLElement) => void;
};
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
declare const elements: <T>(source: ReactiveDiff<T> | (ReactiveDisposable & ReactiveWritable<T> & {
    onDiff(handler: (changes: Passed<Change<any>[]>) => void): () => void;
    update(changedPart: Record<string, any>): void;
    updateField(field: string, value: any): void;
} & Reactive<T> & {
    last(): T;
})) => void;
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

type ReactiveDom_BindUpdateOpts<V> = BindUpdateOpts<V>;
type ReactiveDom_DomBindOptions<V> = DomBindOptions<V>;
type ReactiveDom_DomBindOptionsWithElement<V> = DomBindOptionsWithElement<V>;
type ReactiveDom_DomCreateOptions = DomCreateOptions;
type ReactiveDom_PipeDomBinding = PipeDomBinding;
declare const ReactiveDom_bind: typeof bind;
declare const ReactiveDom_bindElement: typeof bindElement;
declare const ReactiveDom_bindHtmlContent: typeof bindHtmlContent;
declare const ReactiveDom_bindTextContent: typeof bindTextContent;
declare const ReactiveDom_bindUpdate: typeof bindUpdate;
declare const ReactiveDom_elements: typeof elements;
declare const ReactiveDom_win: typeof win;
declare namespace ReactiveDom {
  export { type ReactiveDom_BindUpdateOpts as BindUpdateOpts, type ReactiveDom_DomBindOptions as DomBindOptions, type ReactiveDom_DomBindOptionsWithElement as DomBindOptionsWithElement, type ReactiveDom_DomCreateOptions as DomCreateOptions, type ReactiveDom_PipeDomBinding as PipeDomBinding, ReactiveDom_bind as bind, ReactiveDom_bindElement as bindElement, ReactiveDom_bindHtmlContent as bindHtmlContent, ReactiveDom_bindTextContent as bindTextContent, ReactiveDom_bindUpdate as bindUpdate, ReactiveDom_elements as elements, ReactiveDom_win as win };
}

type TransformOpts = InitStreamOptions;
type BatchOptions = InitStreamOptions & {
    /**
     * If _true_ (default) remaining results are yielded
     * if source closes. If _false_, only 'complete' batches are yielded.
     */
    returnRemainder: boolean;
    elapsed: Interval;
    quantity: number;
};
type FieldOptions<V> = InitStreamOptions & {
    /**
     * If `field` is missing on a value, this value is used in its place.
     * If not set, the value is skipped.
     */
    missingFieldDefault: V;
};
/**
 * Connects reactive A to B, passing through a transform function.
 *
 * Returns a function to unsubcribe A->B
 * @param a
 * @param b
 * @param transform
 */
declare const to: <TA, TB>(a: Reactive<TA>, b: ReactiveWritable<TB>, transform: (valueA: TA) => TB, closeBonA?: boolean) => () => void;
type SplitOptions = {
    quantity: number;
};
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
 * Switcher options.
 *
 * match (default: 'first')
 * * 'first': Outputs to first case where predicate is _true_
 * * 'all': Outputs to all cases where predicate is _true_
 */
type SwitcherOptions = {
    match: `first` | `all`;
};
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
 * @param source
 * @param cases
 * @param options
 * @returns
 */
declare const switcher: <TValue, TRec extends Record<string, FilterPredicate<TValue>>, TLabel extends keyof TRec>(cases: TRec, options?: Partial<SwitcherOptions>) => (r: ReactiveOrSource<TValue>) => Record<TLabel, Reactive<TValue>>;
type PipeSet<In, Out> = [
    Reactive<In>,
    ...Array<Reactive<any> & ReactiveWritable<any>>,
    ReactiveWritable<Out> & Reactive<any>
];
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
type ResolveOptions = {
    /**
     * How many times to return value or call function.
     * If _infinite_ is set to true, this value is ignored
     */
    loops: number;
    /**
     * If _true_ loops forever
     */
    infinite: boolean;
    /**
     * Delay before value
     */
    interval: Interval;
    /**
     * If _true_, resolution only starts after first subscriber. Looping, if active,
     * stops if there are no subscribers.
     *
     * _False_ by default.
     *
     */
    lazy: boolean;
};
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
type FilterPredicate<In> = (value: In) => boolean;
/**
 * Passes all values where `predicate` function returns _true_.
 */
declare function filter<In>(predicate: FilterPredicate<In>, options: Partial<InitStreamOptions>): ReactiveOp<In, In>;
/**
 * Transforms values from `source` using the `transformer` function.
 * @param transformer
 * @returns
 */
declare function transform<In, Out>(transformer: (value: In) => Out, options?: Partial<TransformOpts>): ReactiveOp<In, Out>;
/**
 * Annotates values from `source`, appending new fields to values.
 * Output stream will be the type `In & Out`.
 */
declare function annotate<In, TAnnotation>(transformer: (value: In) => In & TAnnotation, options?: Partial<TransformOpts>): ReactiveOp<In, In & TAnnotation>;
type AnnotationElapsed = {
    elapsedMs: number;
};
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
declare const cloneFromFields: <In>() => ReactiveOp<In, In>;
type SingleFromArrayOptions<V> = {
    /**
     * Function to select a single value from array
     * @param value
     * @returns
     */
    predicate: (value: V) => boolean;
    /**
     * `default`: leave array in same order (default option)
     * `random`: shuffles array before further processing
     * function: function that sorts values
     */
    order: `default` | `random` | ((a: V, b: V) => number);
    /**
     * Selects an index from array. 0 being first, 1 being second.
     * Reverse indexing also works: -1 being last, -2 being second last...
     *
     * If index exceeds length of array, _undefined_ is returned
     */
    at: number;
};
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
 * Batches values from `source`, and then emits a single value according to the selection logic.
 * @param source
 * @param options
 * @returns
 */
/**
 * Wrapped Reactive for object-oriented access
 */
type Wrapped<TIn> = {
    source: Reactive<TIn>;
    /**
     * Copies values from source into an array, throwing
     * an error if expected number of items is not reached
     * @param options
     * @returns
     */
    toArrayOrThrow: (options: Partial<ToArrayOptions<TIn>>) => Promise<Array<TIn>>;
    /**
     * Copies values from source into an array.
     * @param options
     * @returns
     */
    toArray: (options: Partial<ToArrayOptions<TIn>>) => Promise<Array<TIn | undefined>>;
    /**
     * Accumulate a batch of values, emitted as an array
     * @param options
     * @returns
     */
    batch: (options: Partial<BatchOptions>) => Wrapped<Array<TIn>>;
    /**
     * Annotate values with a timestamp of elapsed time
     * (uses `annotate`)
     * @returns
     */
    annotateElapsed: () => Wrapped<TIn & AnnotationElapsed>;
    /**
     * Annotate values with some additional field(s)
     * @param transformer
     * @returns
     */
    annotate: <TAnnotation>(transformer: (value: TIn) => TIn & TAnnotation) => Wrapped<TIn & TAnnotation>;
    /**
     * Pluck and emit a single field from values
     * @param fieldName
     * @param options
     * @returns
     */
    field: <TFieldType>(fieldName: keyof TIn, options: Partial<FieldOptions<TFieldType>>) => Wrapped<TFieldType>;
    /**
     * Throws away values that don't match `predicate`
     * @param predicate
     * @param options
     * @returns
     */
    filter: (predicate: FilterPredicate<TIn>, options: Partial<InitStreamOptions>) => Wrapped<TIn>;
    /**
     * Converts one source stream into two, with values being emitted by both
     * @param options
     * @returns
     */
    split: (options: Partial<SplitOptions>) => Array<Wrapped<TIn>>;
    /**
     * Transforms all values
     * @param transformer
     * @param options
     * @returns
     */
    transform: <TOut>(transformer: (value: TIn) => TOut, options?: Partial<TransformOpts>) => Wrapped<TOut>;
    /**
     * Only allow values through if a minimum of time has elapsed. Throws away values.
     * Ie. converts a fast stream into a slower one.
     * @param options
     * @returns
     */
    throttle: (options: Partial<ThrottleOptions>) => Wrapped<TIn>;
    debounce: (options: Partial<DebounceOptions>) => Wrapped<TIn>;
    /**
     * Emits values when this stream and any additional streams produce a value.
     * Outputted values captures the last value from each stream.
     * @returns
     */
    synchronise: (...additionalSources: Array<ReactiveOrSource<TIn> | Wrapped<TIn>>) => Wrapped<Array<TIn | undefined>>;
    /**
     * Creates new streams for each case, sending values to the stream if they match the filter predicate
     * @param cases
     * @param options
     * @returns
     */
    switcher: <TRec extends Record<string, FilterPredicate<TIn>>, TLabel extends keyof TRec>(cases: TRec, options: Partial<SwitcherOptions>) => Record<TLabel, Wrapped<TIn>>;
    /**
     * Creates new streams for each case
     * @param labels
     * @returns
     */
    splitLabelled: <K extends keyof TIn>(...labels: Array<K>) => Record<K, Wrapped<TIn>>;
    /**
     * Listen for values
     * @param callback
     * @returns
     */
    value: (callback: (value: TIn) => void) => void;
};
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
declare const Ops: {
    readonly batch: <V>(options: Partial<BatchOptions>) => ReactiveOp<V, V[]>;
    readonly debounce: <V_1>(options: Partial<DebounceOptions>) => ReactiveOp<V_1, V_1>;
    readonly throttle: <V_2>(options: Partial<ThrottleOptions>) => (source: ReactiveOrSource<V_2>) => Reactive<V_2>;
};
type ReactiveOpInit<TIn, TOut, TOpts> = (options: Partial<TOpts>) => ReactiveOp<TIn, TOut>;
type ReactiveOp<TIn, TOut> = (source: ReactiveOrSource<TIn>) => Reactive<TOut>;
type ReactiveOpLinks<In, Out> = [
    ReactiveOrSource<In>,
    ...Array<ReactiveOp<any, any>>,
    ReactiveOp<any, Out>
];
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
type DebounceOptions = InitStreamOptions & {
    /**
     * Minimum time between events. Default 50ms
     */
    elapsed: Interval;
};
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
type ThrottleOptions = InitStreamOptions & {
    elapsed: Interval;
};
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
declare function prepare<V extends Record<string, any>>(rx: V): Reactive<V>;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
declare const symbol: unique symbol;
type SignalKinds = `done`;
type Passed<V> = {
    value: V | undefined;
    signal?: SignalKinds;
    context?: string;
};
type PassedSignal = Passed<any> & {
    value: undefined;
    signal: `done`;
    context: string;
};
type EventOptions<V> = {
    process: (args?: Event | undefined) => V;
    lazy?: boolean;
    /**
     * If true, log messages are emitted
     * when event handlers are added/removed
     */
    debugLifecycle?: boolean;
    /**
     * If true, log messages are emitted
     * when the source event fires
     */
    debugFiring?: boolean;
};
type PassedValue<V> = Passed<V> & {
    value: V;
};
type Reactive<V> = {
    /**
     * Subscribes to a reactive. Receives
     * data as well as signals. Use `value` if you
     * just care about values.
     *
     * Return result unsubscribes.
     *
     * ```js
     * const unsub = someReactive.on(msg => {
     *    // Do something with msg.value
     * });
     *
     * unsub(); // Unsubscribe
     * ```
     * @param handler
     */
    on(handler: (value: Passed<V>) => void): () => void;
    value(handler: (value: V) => void): () => void;
};
type ReactiveNonInitial<V> = Reactive<V> & {
    last(): V | undefined;
};
type ReactiveWritable<V> = {
    set(value: V): void;
};
type ReactiveInitial<V> = Reactive<V> & {
    last(): V;
};
type ReactiveFinite = {
    isDone(): boolean;
};
type ReactiveDisposable = {
    dispose(reason: string): void;
    isDisposed(): boolean;
};
type ReactiveDiff<V> = ReactiveDisposable & ReactiveWritable<V> & {
    /**
     * Diff information
     * @param handler
     */
    onDiff(handler: (changes: Passed<Array<Change<any>>>) => void): () => void;
    /**
     * Updates the reactive with some partial key-value pairs.
     * Keys omitted are left the same as the current value.
     * @param changedPart
     */
    update(changedPart: Record<string, any>): void;
    /**
     * Updates a particular field by its path
     * @param field
     * @param value
     */
    updateField(field: string, value: any): void;
};
type ReactiveStream<V> = Reactive<V> & ReactiveDisposable & ReactiveWritable<V> & {
    through(message: Passed<V>): void;
    /**
     * Removes all the subscribers from this stream.
     */
    reset(): void;
    /**
     * Dispatches a signal
     * @param signal
     * @param context
     */
    signal(signal: SignalKinds, context?: string): void;
};
/**
 * Options when creating a reactive object.
 */
type ObjectOptions<V> = {
    /**
     * _false_ by default.
     * If _true_, inherited fields are included. This is necessary for event args, for example.
     */
    deepEntries: boolean;
    /**
     * Uses JSON.stringify() by default.
     * Fn that returns _true_ if two values are equal, given a certain path.
     */
    eq: IsEqualContext<V>;
};
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
declare function number(initialValue: number): ReactiveDisposable & ReactiveWritable<number> & ReactiveInitial<number>;
declare function number(): ReactiveDisposable & ReactiveWritable<number> & ReactiveNonInitial<number>;
declare function fromEvent<V extends Record<string, any>>(target: EventTarget, name: string, options: EventOptions<V>): ReactiveInitial<V> & ReactiveDisposable;
declare function fromEvent<V extends Record<string, any>>(target: EventTarget, name: string, options?: Optional<EventOptions<V>, `process`>): ReactiveNonInitial<V> & ReactiveDisposable;
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
    /**
     * Subscribes to a reactive. Receives
     * data as well as signals. Use `value` if you
     * just care about values.
     *
     * Return result unsubscribes.
     *
     * ```js
     * const unsub = someReactive.on(msg => {
     *    // Do something with msg.value
     * });
     *
     * unsub(); // Unsubscribe
     * ```
     * @param handler
     */
    on(handler: (value: Passed<V>) => void): () => void;
    set(value: V): void;
};
declare function fromObject<V extends Record<string, any>>(initialValue: V, options?: Partial<ObjectOptions<V>>): ReactiveDiff<V> & ReactiveInitial<V>;
declare function fromObject<V extends Record<string, any>>(initialValue: undefined, options?: Partial<ObjectOptions<V>>): ReactiveDiff<V> & ReactiveNonInitial<V>;
type InitStreamOptions = {
    onFirstSubscribe: () => void;
    onNoSubscribers: () => void;
};
/**
 * @ignore
 * @param options
 * @returns
 */
declare function initStream<V>(options?: Partial<InitStreamOptions>): ReactiveStream<V>;
type UpstreamOptions<In> = {
    lazy: boolean;
    /**
     * If _true_ (default), we dispose the underlying stream if the upstream closes. This happens after onStop() is called.
     */
    disposeIfSourceDone: boolean;
    onValue: (v: In) => void;
    /**
     * Called just before we subscribe to source
     * @returns
     */
    onStart: () => void;
    /**
     * Called after we unsubscribe from source
     * @returns
     */
    onStop: () => void;
};
/**
 * @ignore
 * @param upstreamSource
 * @param options
 * @returns
 */
declare const initUpstream: <In, Out>(upstreamSource: ReactiveOrSource<In>, options: Partial<UpstreamOptions<In>>) => ReactiveStream<Out>;
type GeneratorOptions = {
    /**
     * By default (true) only accesses the generator if there is a subscriber.
     */
    lazy: boolean;
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
type ReactiveOrSource<V> = Reactive<V> | IterableIterator<V> | AsyncIterableIterator<V> | Generator<V> | AsyncGenerator<V> | Array<V>;
/**
 * Resolves various kinds of sources into a Reactive.
 * If `source` is an iterable/generator, it gets wrapped via `generator()`.
 * @param source
 * @returns
 */
declare const resolveSource: <V>(source: ReactiveOrSource<V>) => Reactive<V>;
type FromArrayOptions = {
    /**
     * Interval between each item being read. 5ms by default.
     */
    intervalMs: Interval;
    /**
     * If _true_, only starts after first subscriber. _False_ by default.
     */
    lazy: boolean;
    /**
     * Governs behaviour if all subscribers are removed AND lazy=true. By default continues
     * iteration.
     *
     * * pause: stop at last array index
     * * reset: go back to 0
     * * empty: continue, despite there being no listeners (default)
     */
    idle: `` | `pause` | `reset`;
};
declare const fromArray: <V>(array: V[], options?: Partial<FromArrayOptions>) => Reactive<V> & ReactiveFinite & {
    last(): V;
};
/**
 * Reads the values of a reactive into an array.
 * Use the `limit` or `elapsed` to limit how many
 * items to read, and/or for how long.
 * @param reactive
 * @param options
 * @returns
 */
type ToArrayOptions<V> = {
    /**
     * Maximim time to wait for `limit` to be reached. 10s by default.
     */
    maximumWait: Interval;
    /**
     * Number of items to read
     */
    limit: number;
    /**
     * Behaviour if threshold is not reached.
     * partial: return partial results
     * throw: throw an error
     * fill: fill remaining array slots with `fillValue`
     */
    underThreshold: `partial` | `throw` | `fill`;
    /**
     * Value to fill empty slots with if `underThreshold = 'fill'`.
     */
    fillValue: V;
};
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
        /**
         * Diff information
         * @param handler
         */
        onDiff(handler: (changes: Passed<Array<Change<any>>>) => void): () => void;
        /**
         * Updates the reactive with some partial key-value pairs.
         * Keys omitted are left the same as the current value.
         * @param changedPart
         */
        update(changedPart: Record<string, any>): void;
        /**
         * Updates a particular field by its path
         * @param field
         * @param value
         */
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

type Reactive$1_AnnotationElapsed = AnnotationElapsed;
type Reactive$1_BatchOptions = BatchOptions;
type Reactive$1_DebounceOptions = DebounceOptions;
type Reactive$1_EventOptions<V> = EventOptions<V>;
type Reactive$1_FieldOptions<V> = FieldOptions<V>;
type Reactive$1_FilterPredicate<In> = FilterPredicate<In>;
type Reactive$1_FromArrayOptions = FromArrayOptions;
type Reactive$1_GeneratorOptions = GeneratorOptions;
type Reactive$1_InitStreamOptions = InitStreamOptions;
type Reactive$1_ObjectOptions<V> = ObjectOptions<V>;
declare const Reactive$1_Ops: typeof Ops;
type Reactive$1_Optional<T, K extends keyof T> = Optional<T, K>;
type Reactive$1_Passed<V> = Passed<V>;
type Reactive$1_PassedSignal = PassedSignal;
type Reactive$1_PassedValue<V> = PassedValue<V>;
type Reactive$1_PipeSet<In, Out> = PipeSet<In, Out>;
type Reactive$1_Reactive<V> = Reactive<V>;
type Reactive$1_ReactiveDiff<V> = ReactiveDiff<V>;
type Reactive$1_ReactiveDisposable = ReactiveDisposable;
type Reactive$1_ReactiveFinite = ReactiveFinite;
type Reactive$1_ReactiveInitial<V> = ReactiveInitial<V>;
type Reactive$1_ReactiveNonInitial<V> = ReactiveNonInitial<V>;
type Reactive$1_ReactiveOp<TIn, TOut> = ReactiveOp<TIn, TOut>;
type Reactive$1_ReactiveOpInit<TIn, TOut, TOpts> = ReactiveOpInit<TIn, TOut, TOpts>;
type Reactive$1_ReactiveOpLinks<In, Out> = ReactiveOpLinks<In, Out>;
type Reactive$1_ReactiveOrSource<V> = ReactiveOrSource<V>;
type Reactive$1_ReactiveProxied<V> = ReactiveProxied<V>;
type Reactive$1_ReactiveStream<V> = ReactiveStream<V>;
type Reactive$1_ReactiveWritable<V> = ReactiveWritable<V>;
type Reactive$1_ResolveOptions = ResolveOptions;
type Reactive$1_SignalKinds = SignalKinds;
type Reactive$1_SingleFromArrayOptions<V> = SingleFromArrayOptions<V>;
type Reactive$1_SplitOptions = SplitOptions;
type Reactive$1_SwitcherOptions = SwitcherOptions;
type Reactive$1_ThrottleOptions = ThrottleOptions;
type Reactive$1_ToArrayOptions<V> = ToArrayOptions<V>;
type Reactive$1_TransformOpts = TransformOpts;
type Reactive$1_UpstreamOptions<In> = UpstreamOptions<In>;
type Reactive$1_Wrapped<TIn> = Wrapped<TIn>;
declare const Reactive$1_annotate: typeof annotate;
declare const Reactive$1_annotateElapsed: typeof annotateElapsed;
declare const Reactive$1_batch: typeof batch;
declare const Reactive$1_cloneFromFields: typeof cloneFromFields;
declare const Reactive$1_debounce: typeof debounce;
declare const Reactive$1_field: typeof field;
declare const Reactive$1_filter: typeof filter;
declare const Reactive$1_fromArray: typeof fromArray;
declare const Reactive$1_fromEvent: typeof fromEvent;
declare const Reactive$1_fromObject: typeof fromObject;
declare const Reactive$1_fromProxy: typeof fromProxy;
declare const Reactive$1_fromProxySymbol: typeof fromProxySymbol;
declare const Reactive$1_generator: typeof generator;
declare const Reactive$1_hasLast: typeof hasLast;
declare const Reactive$1_initStream: typeof initStream;
declare const Reactive$1_initUpstream: typeof initUpstream;
declare const Reactive$1_isDisposable: typeof isDisposable;
declare const Reactive$1_manual: typeof manual;
declare const Reactive$1_mergeAsArray: typeof mergeAsArray;
declare const Reactive$1_messageHasValue: typeof messageHasValue;
declare const Reactive$1_messageIsDoneSignal: typeof messageIsDoneSignal;
declare const Reactive$1_messageIsSignal: typeof messageIsSignal;
declare const Reactive$1_number: typeof number;
declare const Reactive$1_observable: typeof observable;
declare const Reactive$1_observableWritable: typeof observableWritable;
declare const Reactive$1_pipe: typeof pipe;
declare const Reactive$1_prepare: typeof prepare;
declare const Reactive$1_resolve: typeof resolve;
declare const Reactive$1_resolveSource: typeof resolveSource;
declare const Reactive$1_run: typeof run;
declare const Reactive$1_singleFromArray: typeof singleFromArray;
declare const Reactive$1_split: typeof split;
declare const Reactive$1_splitLabelled: typeof splitLabelled;
declare const Reactive$1_switcher: typeof switcher;
declare const Reactive$1_symbol: typeof symbol;
declare const Reactive$1_synchronise: typeof synchronise;
declare const Reactive$1_throttle: typeof throttle;
declare const Reactive$1_to: typeof to;
declare const Reactive$1_toArray: typeof toArray;
declare const Reactive$1_toArrayOrThrow: typeof toArrayOrThrow;
declare const Reactive$1_transform: typeof transform;
declare const Reactive$1_wrap: typeof wrap;
declare namespace Reactive$1 {
  export { type Reactive$1_AnnotationElapsed as AnnotationElapsed, type Reactive$1_BatchOptions as BatchOptions, type Reactive$1_DebounceOptions as DebounceOptions, ReactiveDom as Dom, type Reactive$1_EventOptions as EventOptions, type Reactive$1_FieldOptions as FieldOptions, type Reactive$1_FilterPredicate as FilterPredicate, type Reactive$1_FromArrayOptions as FromArrayOptions, type Reactive$1_GeneratorOptions as GeneratorOptions, type Reactive$1_InitStreamOptions as InitStreamOptions, type Reactive$1_ObjectOptions as ObjectOptions, Reactive$1_Ops as Ops, type Reactive$1_Optional as Optional, type Reactive$1_Passed as Passed, type Reactive$1_PassedSignal as PassedSignal, type Reactive$1_PassedValue as PassedValue, type Reactive$1_PipeSet as PipeSet, type Reactive$1_Reactive as Reactive, type Reactive$1_ReactiveDiff as ReactiveDiff, type Reactive$1_ReactiveDisposable as ReactiveDisposable, type Reactive$1_ReactiveFinite as ReactiveFinite, type Reactive$1_ReactiveInitial as ReactiveInitial, type Reactive$1_ReactiveNonInitial as ReactiveNonInitial, type Reactive$1_ReactiveOp as ReactiveOp, type Reactive$1_ReactiveOpInit as ReactiveOpInit, type Reactive$1_ReactiveOpLinks as ReactiveOpLinks, type Reactive$1_ReactiveOrSource as ReactiveOrSource, type Reactive$1_ReactiveProxied as ReactiveProxied, type Reactive$1_ReactiveStream as ReactiveStream, type Reactive$1_ReactiveWritable as ReactiveWritable, type Reactive$1_ResolveOptions as ResolveOptions, type Reactive$1_SignalKinds as SignalKinds, type Reactive$1_SingleFromArrayOptions as SingleFromArrayOptions, type Reactive$1_SplitOptions as SplitOptions, type Reactive$1_SwitcherOptions as SwitcherOptions, type Reactive$1_ThrottleOptions as ThrottleOptions, type Reactive$1_ToArrayOptions as ToArrayOptions, type Reactive$1_TransformOpts as TransformOpts, type Reactive$1_UpstreamOptions as UpstreamOptions, type Reactive$1_Wrapped as Wrapped, Reactive$1_annotate as annotate, Reactive$1_annotateElapsed as annotateElapsed, Reactive$1_batch as batch, Reactive$1_cloneFromFields as cloneFromFields, Reactive$1_debounce as debounce, Reactive$1_field as field, Reactive$1_filter as filter, Reactive$1_fromArray as fromArray, Reactive$1_fromEvent as fromEvent, Reactive$1_fromObject as fromObject, Reactive$1_fromProxy as fromProxy, Reactive$1_fromProxySymbol as fromProxySymbol, Reactive$1_generator as generator, Reactive$1_hasLast as hasLast, Reactive$1_initStream as initStream, Reactive$1_initUpstream as initUpstream, Reactive$1_isDisposable as isDisposable, Reactive$1_manual as manual, Reactive$1_mergeAsArray as mergeAsArray, Reactive$1_messageHasValue as messageHasValue, Reactive$1_messageIsDoneSignal as messageIsDoneSignal, Reactive$1_messageIsSignal as messageIsSignal, Reactive$1_number as number, Reactive$1_observable as observable, Reactive$1_observableWritable as observableWritable, Reactive$1_pipe as pipe, Reactive$1_prepare as prepare, Reactive$1_resolve as resolve, Reactive$1_resolveSource as resolveSource, Reactive$1_run as run, Reactive$1_singleFromArray as singleFromArray, Reactive$1_split as split, Reactive$1_splitLabelled as splitLabelled, Reactive$1_switcher as switcher, Reactive$1_symbol as symbol, Reactive$1_synchronise as synchronise, Reactive$1_throttle as throttle, Reactive$1_to as to, Reactive$1_toArray as toArray, Reactive$1_toArrayOrThrow as toArrayOrThrow, Reactive$1_transform as transform, Reactive$1_wrap as wrap };
}

export { type Passed as P, type Reactive as R, Reactive$1 as a };
