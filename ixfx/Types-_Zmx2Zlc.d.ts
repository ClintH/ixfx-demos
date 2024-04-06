import { P as Primitive } from './KeyValue-C8BVtJ3M.js';
import { I as IsEqual } from './IsEqual-f56NWa68.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { C as Change, a as IsEqualContext } from './Immutable-XxQg9zkc.js';

type ChangeKind = `mutate` | `add` | `del`;
type ChangeRecord<TKey extends string | number | symbol> = [kind: ChangeKind, path: TKey, value: any];
/**
 * Result of {@link compareData}
 */
type CompareChangeSet<TKey extends string | number> = {
    /**
     * _True_ if there are any changes
     */
    hasChanged: boolean;
    /**
     * Results for child objects
     */
    children: Record<TKey, CompareChangeSet<any>>;
    /**
     * Values that have changed
     */
    changed: Record<TKey, any>;
    /**
     * Fields that have been added
     */
    added: Record<TKey, any>;
    /**
     * Fields that have been removed
     */
    removed: Array<TKey>;
    isArray: boolean;
    /**
     * Summary of changes
     */
    summary: Array<ChangeRecord<TKey>>;
};
/**
 * Returns the changed fields from A -> B. It's assumed that A and B have the same shape.
 * ie. returns an object that only consists of fields which have changed in B compared to A.
 *
 * ```js
 * const a = { msg: `hi`, v: 10 };
 *
 * changedDataFields(a, { msg: `hi`,   v: 10 }); // {}
 * changedDataFields(a, { msg: `hi!!`, v: 10 }); // { msg: `hi!!` }
 * changedDataFields(a, { msg: `hi!!` });       // { msg: `hi!!`, v: undefined }
 * ```
 *
 * Under the hood, we use {@link compareData}(a, b, true). If B has additional or removed fields,
 * this is considered an error.
 *
 * If a field is an array, the whole array is returned, rather than a diff.
 * @param a
 * @param b
 */
declare const changedDataFields: (a: object, b: object) => any[] | Record<string, any>;
declare const compareArrays: <TValue>(a: Array<TValue>, b: Array<TValue>, eq?: IsEqual<TValue>) => CompareChangeSet<number>;
/**
 * Compares A to B. Assumes they are simple objects, essentially key-value pairs, where the values are primitive values or other simple objects. It also works with arrays.
 *
 * @param a
 * @param b
 */
declare const compareData: (a: object, b: object, assumeSameShape?: boolean, eq?: IsEqual<any>) => CompareChangeSet<string>;

type MergeOptions = {
    /**
     * How to handle when a source ends.
     * * 'allow': continue mergeAsArrayStream, last value for done stream will kept
     * * 'break': stop mergeAsArrayStream
     *
     * Default: 'break'
     */
    onSourceDone: `allow` | `break`;
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
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
declare const symbol: unique symbol;
type SignalKinds = `done` | `warn`;
type Passed<V> = {
    value: V | undefined;
    signal?: SignalKinds;
    context?: string;
};
type PassedSignal = Passed<any> & {
    value: undefined;
    signal: SignalKinds;
    context: string;
};
type EventOptions<V> = {
    transform: (args?: Event | undefined) => V;
    lazy?: Lazy;
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
    lazy: Lazy;
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
    onDispose: () => void;
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
     * Emits values when this stream and any additional streams produce a value. The resulting stream is
     * thus an array of values, each source at a given index.
     * Waits to output a value until each stream has produced a value. Thus, the pace is determined by
     * the slowest stream.
     * @returns
     */
    synchronise: <const T extends ReadonlyArray<ReactiveOrSource<any>>>(reactiveSources: T, options?: Partial<SyncOptions>) => Wrapped<[TIn, ...RxValueTypes<T>]>;
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
 * Laziness
 * * start: only begins on first subscriber. Keeps running even when there are no subscribers
 * * very: only begins on first subscriber. Stops looping if there are no subscribers
 * * never: begins calling function when initalised and doesn't stop until Reactive is disposed
 */
type Lazy = `initial` | `never` | `very`;
type InitLazyStreamOptions = Partial<InitStreamOptions> & {
    lazy: Lazy;
    onStart: () => void;
    onStop: () => void;
};
type CountOptions = {
    lazy: Lazy;
    amount: number;
    offset: number;
    interval: Interval;
    signal: AbortSignal;
};
type PingedFunctionOptions = {
    /**
     * If _true_, stream closes if function throws an error.
     * If _false_, errors are emitted as signals, but stream is not closed.
     * Default: _true_
     */
    closeOnError: boolean;
    /**
     * Laziness
     * * start: only begins on first subscriber. Keeps running even when there are no subscribers
     * * very: only begins on first subscriber. Stops looping if there are no subscribers
     * * never: begins calling function when initalised and doesn't stop until Reactive is disposed
     */
    lazy: Lazy;
    /**
   * If specified, a time before invoking function.
   * If `repeat` is used, this is in addition to `interval` time.
   */
    predelay: Interval;
    /***
  * If specified, signal is checked to prevent function execution.
  * Also used for aborting a looped fromFunction.
  */
    signal: AbortSignal;
};
type FromFunctionOptions = {
    /**
     * If _true_, stream closes if function throws an error.
     * If _false_, errors are emitted as signals, but stream is not closed.
     * Default: _true_
     */
    closeOnError: boolean;
    /**
     * Laziness
     * * start: only begins on first subscriber. Keeps running even when there are no subscribers
     * * very: only begins on first subscriber. Stops looping if there are no subscribers
     * * never: begins calling function when initalised and doesn't stop until Reactive is disposed
     */
    lazy: Lazy;
    /**
     * If specified, sets an upper limit of how many times we loop
     * (if this is also enabled)
     */
    maximumRepeats: number;
    /**
     * If specified, function is called repeatedly with this delay
     */
    interval: Interval;
    /**
     * If specified, a time before invoking function.
     * If `repeat` is used, this is in addition to `interval` time.
     */
    predelay: Interval;
    /***
     * If specified, signal is checked to prevent function execution.
     * Also used for aborting a looped fromFunction.
     */
    signal: AbortSignal;
};
type ReadFromArrayOptions = {
    /**
     * Interval between each item being read. Default: 5ms.
     */
    interval: Interval;
    lazy: Lazy;
    /**
     * Behaviour when reactive stops, for example due to having no subscribers
     * * continue: iteration continues through array where it left off
     * * reset: iteration begins from start of array
     */
    whenStopped: `continue` | `reset`;
    debugLifecycle: boolean;
    signal: AbortSignal;
};
type FromGeneratorOptions = {
    /**
     * Minimum time interval between reads from generator
     * Default: 5ms
     */
    interval: Interval;
    /**
     * If _true_, only accesses the generator if there is a subscriber.
     * Default: true
     */
    lazy: Lazy;
    signal: AbortSignal;
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
type ReactiveOrSource<V> = Wrapped<V> | Reactive<V> | IterableIterator<V> | AsyncIterableIterator<V> | Generator<V> | AsyncGenerator<V> | Array<V>;
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
    on(handler: (value: Passed<V>) => void): Unsubscriber;
    value(handler: (value: V) => void): Unsubscriber;
};
type Unsubscriber = () => void;
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
type ReactiveArray<V> = ReactiveDisposable & ReactiveWritable<Array<V>> & {
    push(value: V): void;
    deleteAt(index: number): void;
    deleteWhere(filter: (value: V) => boolean): number;
    setAt(index: number, value: V): void;
    insertAt(index: number, value: V): void;
    onArray(handler: (changes: Passed<Array<ChangeRecord<number>>>) => void): () => void;
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
    onDispose: () => void;
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
/**
 * Transform options
 */
type TransformOpts = InitStreamOptions;
/**
 * Cached stream options
 */
type CacheOpts<V> = InitStreamOptions & {
    /**
     * Initial value
     */
    initialValue: V;
    /**
     * Laziness
     */
    lazy: Lazy;
};
type BatchOptions = InitStreamOptions & {
    /**
     * If _true_ (default) remaining results are yielded
     * if source closes. If _false_, only batches that meet
     * `elapsed` or `quantity` are emitted.
     */
    returnRemainder: boolean;
    /**
     * Amount of time to gather results for a batch.
     * 'elapsed' and 'quantity' is ORed. Meaning a batch will the minimum of
     * 'elapsed' and 'quantity'
     */
    elapsed: Interval;
    /**
     * Number of items to gather for a batch.
     * 'elapsed' and 'quantity' is ORed. Meaning a batch will the minimum of
     * 'elapsed' and 'quantity'
     */
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
    lazy: Lazy;
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
type RxValueTypes<T extends ReadonlyArray<ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends Reactive<infer V> ? V | undefined : T[K] extends Wrapped<infer V> ? V | undefined : T[K] extends Generator<infer V> ? V | undefined : T[K] extends AsyncGenerator<infer V> ? V | undefined : T[K] extends IterableIterator<infer V> ? V | undefined : T[K] extends AsyncIterableIterator<infer V> ? V | undefined : T[K] extends Array<infer V> ? V | undefined : never;
};
type RxValueTypeObject<T extends Record<string, ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends Reactive<infer V> ? V | undefined : T[K] extends Wrapped<infer V> ? V | undefined : T[K] extends Generator<infer V> ? V | undefined : T[K] extends AsyncGenerator<infer V> ? V | undefined : T[K] extends IterableIterator<infer V> ? V | undefined : T[K] extends AsyncIterableIterator<infer V> ? V | undefined : T[K] extends Array<infer V> ? V | undefined : never;
};
type PrimitiveValueTypeObject<T extends Record<string, Primitive>> = {
    [K in keyof T]: T[K] extends number ? number | undefined : T[K] extends string ? string | undefined : T[K] extends boolean ? boolean | undefined : T[K] extends bigint ? bigint | undefined : never;
};
type RxPrimitiveValueTypeObject<T extends Record<string, Primitive | ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends number ? number | undefined : T[K] extends string ? string | undefined : T[K] extends boolean ? boolean | undefined : T[K] extends bigint ? bigint | undefined : T[K] extends Reactive<infer V> ? V | undefined : T[K] extends Wrapped<infer V> ? V | undefined : T[K] extends Generator<infer V> ? V | undefined : T[K] extends AsyncGenerator<infer V> ? V | undefined : T[K] extends IterableIterator<infer V> ? V | undefined : T[K] extends AsyncIterableIterator<infer V> ? V | undefined : T[K] extends Array<infer V> ? V | undefined : never;
};

export { type BindUpdateOpts as $, type AnnotationElapsed as A, type BatchOptions as B, type ChangeKind as C, type DebounceOptions as D, type EventOptions as E, type FilterPredicate as F, type ReactiveDiff as G, type ReadFromArrayOptions as H, type InitStreamOptions as I, type ReactiveFinite as J, type PingedFunctionOptions as K, type FromFunctionOptions as L, type MergeOptions as M, symbol as N, type Optional as O, type Passed as P, type ObjectOptions as Q, type Reactive as R, type SplitOptions as S, type TransformOpts as T, type Unsubscriber as U, type CountOptions as V, type Wrapped as W, type DomBindSourceValue as X, type PipeDomBinding as Y, type DomBindValueTarget as Z, type DomBindUnresolvedSource as _, type ChangeRecord as a, type ElementsOptions as a0, type DomBindResolvedSource as a1, type DomBindTargetNode as a2, type DomBindTargetNodeResolved as a3, type DomCreateOptions as a4, type ElementBind as a5, type InitLazyStreamOptions as a6, type Lazy as a7, type PipeSet as a8, type PrimitiveValueTypeObject as a9, type ReactiveOpInit as aa, type ReactiveOpLinks as ab, type RxPrimitiveValueTypeObject as ac, type SignalKinds as ad, type UpstreamOptions as ae, type CompareChangeSet as b, changedDataFields as c, compareArrays as d, compareData as e, type ReactiveWritable as f, type ReactiveOrSource as g, type ReactiveStream as h, type SwitcherOptions as i, type ReactiveDisposable as j, type RxValueTypeObject as k, type RxValueTypes as l, type SyncOptions as m, type ResolveOptions as n, type FieldOptions as o, type ReactiveOp as p, type CacheOpts as q, type ReactiveInitial as r, type SingleFromArrayOptions as s, type ThrottleOptions as t, type ToArrayOptions as u, type ReactiveArray as v, type ReactiveNonInitial as w, type FromGeneratorOptions as x, type PassedSignal as y, type PassedValue as z };
