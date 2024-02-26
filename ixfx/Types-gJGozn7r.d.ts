import { I as Interval } from './IntervalType-zqeNLRm6.js';
import { C as Change, a as IsEqualContext } from './Immutable-be36LyLq.js';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
declare const symbol: unique symbol;
type SignalKinds = `done`;
type Passed<V> = {
    value: V | undefined;
    signal?: SignalKinds;
    context?: string;
};
type GeneratorOptions = {
    /**
     * By default (true) only accesses the generator if there is a subscriber.
     */
    lazy: boolean;
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
type ReactiveOrSource<V> = Reactive<V> | IterableIterator<V> | AsyncIterableIterator<V> | Generator<V> | AsyncGenerator<V> | Array<V>;
type BindUpdateOpts<V> = {
    initial: (v: V, el: HTMLElement) => void;
    binds: Record<string, DomBindValueTarget & {
        transform?: (value: any) => string;
    }>;
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
type DomBindValueTarget = {
    /**
     * If _true_ `innerHTML` is set (a shortcut for elField:`innerHTML`)
     */
    htmlContent?: boolean;
    /**
     * If _true_, 'textContent' is set (a shortcut for elField:'textContext')
     */
    textContent?: boolean;
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
};
type ElementBind = {
    /**
     * Tag name for this binding.
     * Overrides `defaultTag`
     */
    tagName?: string;
    /**
     * If _true_, sub-paths are appended to element, rather than `container`
     */
    nestChildren?: boolean;
    transform?: (value: any) => string;
};
type ElementsOptions = {
    container: HTMLElement | string;
    defaultTag: string;
    binds: Record<string, DomBindValueTarget & ElementBind>;
};
type DomBindTargetNode = {
    query?: string;
    element?: HTMLElement;
};
type DomBindTargetNodeResolved = {
    element: HTMLElement;
};
type DomBindUnresolvedSource<V> = DomBindTargetNode & DomBindSourceValue<V> & DomBindValueTarget;
type DomBindResolvedSource<V> = DomBindTargetNodeResolved & DomBindSourceValue<V> & DomBindValueTarget;
type DomBindSourceValue<V> = {
    /**
     * Field from source value to pluck and use.
     * This will also be the value passed to the transform
     */
    sourceField?: keyof V;
    transform?: (input: V) => string;
    transformValue?: (input: any) => string;
};
type FilterPredicate<In> = (value: In) => boolean;
type PipeSet<In, Out> = [
    Reactive<In>,
    ...Array<Reactive<any> & ReactiveWritable<any>>,
    ReactiveWritable<Out> & Reactive<any>
];
type InitStreamOptions = {
    onFirstSubscribe: () => void;
    onNoSubscribers: () => void;
};
type ThrottleOptions = InitStreamOptions & {
    elapsed: Interval;
};
type AnnotationElapsed = {
    elapsedMs: number;
};
type SplitOptions = {
    quantity: number;
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
type ReactiveOpInit<TIn, TOut, TOpts> = (options: Partial<TOpts>) => ReactiveOp<TIn, TOut>;
type ReactiveOp<TIn, TOut> = (source: ReactiveOrSource<TIn>) => Reactive<TOut>;
type ReactiveOpLinks<In, Out> = [
    ReactiveOrSource<In>,
    ...Array<ReactiveOp<any, any>>,
    ReactiveOp<any, Out>
];
type DebounceOptions = InitStreamOptions & {
    /**
     * Minimum time between events. Default 50ms
     */
    elapsed: Interval;
};

export { type AnnotationElapsed as A, type BatchOptions as B, type DomBindResolvedSource as C, type DebounceOptions as D, type ElementsOptions as E, type FilterPredicate as F, type GeneratorOptions as G, type DomBindTargetNode as H, type InitStreamOptions as I, type DomBindTargetNodeResolved as J, type DomCreateOptions as K, type ElementBind as L, type PipeSet as M, type ReactiveOpInit as N, type Optional as O, type Passed as P, type ReactiveOpLinks as Q, type Reactive as R, type SplitOptions as S, type TransformOpts as T, type SignalKinds as U, type UpstreamOptions as V, type Wrapped as W, type ReactiveWritable as a, type ReactiveOrSource as b, type ReactiveStream as c, type SwitcherOptions as d, type ReactiveDisposable as e, type ResolveOptions as f, type FieldOptions as g, type ReactiveOp as h, type SingleFromArrayOptions as i, type ThrottleOptions as j, type ToArrayOptions as k, type FromArrayOptions as l, type ReactiveFinite as m, type PassedSignal as n, type PassedValue as o, type ReactiveDiff as p, type ReactiveInitial as q, type DomBindSourceValue as r, type PipeDomBinding as s, type DomBindValueTarget as t, type DomBindUnresolvedSource as u, type BindUpdateOpts as v, type ReactiveNonInitial as w, type EventOptions as x, type ObjectOptions as y, symbol as z };
