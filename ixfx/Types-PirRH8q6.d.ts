import { P as Primitive } from './KeyValue-tgb3aKKD.js';
import { I as IsEqual } from './IsEqual-f56NWa68.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { a as IsEqualContext, C as Change } from './Immutable-XxQg9zkc.js';

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
 * Transform options
 */
type TransformOpts = InitStreamOptions;
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
type DebounceOptions = InitStreamOptions & {
    /**
     * Minimum time between events. Default 50ms
     */
    elapsed: Interval;
};
type FilterPredicate<In> = (value: In) => boolean;
type ThrottleOptions = InitStreamOptions & {
    elapsed: Interval;
};
type AnnotationElapsed = {
    elapsedMs: number;
};
type SplitOptions = {
    quantity: number;
};
type FieldOptions<V> = InitStreamOptions & {
    /**
     * If `field` is missing on a value, this value is used in its place.
     * If not set, no value is emitted when the field is missing.
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

type TriggerValue<TTriggerValue> = {
    value: TTriggerValue;
};
/**
 * Function which returns a result. Or promised result.
 *
 * `abort` value is a callback to exit out of looped execution.
 */
type FunctionFunction<T> = ((abort: (reason: string) => void) => T) | ((abort: (reason: string) => void) => Promise<T>);
type ArrayOptions = {
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
/**
 * Function which returns a result. Or promised result.
 * Takes a `value` as first parameter, and callback to signal an abort as the second.
 */
type PingedFunctionFunction<T, TSource> = ((value: TSource, abort: (reason: string) => void) => T) | ((value: TSource, abort: (reason: string) => void) => Promise<T>);
/**
 * Trigger that calls a `fn`.
 * If `fn` returns _undefined_, it means the trigger is complete
 */
type TriggerFunction<TTriggerValue> = {
    fn: () => TTriggerValue;
};
type TriggerGenerator<TTriggerValue> = {
    gen: IterableIterator<TTriggerValue>;
};
/**
 * A trigger can be a value, a function or generator. Value triggers never complete.
 *
 * A trigger function is considered complete if it returns undefined.
 * A trigger generator is considered complete if it returns done.
 *
 */
type Trigger<TTriggerValue> = TriggerValue<TTriggerValue> | TriggerFunction<TTriggerValue> | TriggerGenerator<TTriggerValue>;
type TimeoutTriggerOptions<TTriggerValue> = Trigger<TTriggerValue> & {
    /**
     * Whether to repeatedly trigger even if upstream source doesn't emit values.
     * When _false_ (default) it will emit a max of one value after a source value if `interval` is reached.
     * When _true_, it will continue emitting values at `interval`.
     * Default: false
     */
    repeat?: boolean;
    /**
     * Interval before emitting trigger value
     * Default: 1s
     */
    interval: Interval;
    /**
     * If _true_ (default) start the timeout
     * immediately, even before the first value.
     * If _false_, it won't timeout until the first
     * upstream value happens.
     */
    immediate?: boolean;
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
/**
 * Options when creating a reactive object.
 */
type ArrayObjectOptions<V> = {
    /**
     * Uses JSON.stringify() by default.
     * Fn that returns _true_ if two values are equal, given a certain path.
     */
    eq: IsEqual<V>;
};
type FunctionOptions = Partial<InitLazyStreamOptions> & {
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
type GeneratorOptions = {
    traceLifecycle: boolean;
    /**
     * Wait between reading from generator
     * Default: 5ms
     */
    readInterval: Interval;
    /**
     * Timeout when waiting for a value
     * Default: `{ mins: 5 }`
     */
    readTimeout: Interval;
    /**
     * If _true_, only accesses the generator if there is a subscriber.
     * Default: true
     */
    lazy: Lazy;
    signal: AbortSignal;
    /**
     * Behaviour when reactive stops, for example due to having no subscribers
     * * continue: iteration continues through array where it left off
     * * reset: iteration begins from start of array
     */
    whenStopped: `continue` | `reset`;
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

type CombineLatestOptions = {
    /**
     * If _true_, disposes all the merged sources when the merged reactive closes.
     * Default: _true_.
     */
    disposeSources: boolean;
    /**
     * How to handle when a source ends.
     * * 'allow': continue combined stream, last value for done stream will kept
     * * 'break': stop combined stream
     *
     * Default: 'break'
     */
    onSourceDone: `allow` | `break`;
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
    onDispose: (reason: string) => void;
};
/**
 * Wrapped Reactive for object-oriented access
 */
type Wrapped<TIn> = {
    source: Reactive<TIn>;
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
    * Accumulate a batch of values, emitted as an array
    * @param options
    * @returns
    */
    batch: (options: Partial<BatchOptions>) => Wrapped<Array<TIn>>;
    debounce: (options: Partial<DebounceOptions>) => Wrapped<TIn>;
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
    combineLatestToArray: <const T extends ReadonlyArray<ReactiveOrSource<any>>>(sources: T, options: Partial<CombineLatestOptions>) => Wrapped<RxValueTypes<T>>;
    combineLatestToObject: <const T extends Record<string, ReactiveOrSource<any>>>(sources: T, options: {
        name: string;
    } & Partial<CombineLatestOptions>) => Wrapped<RxValueTypeObject<T>>;
    /**
     * Converts one source stream into two, with values being emitted by both
     * @param options
     * @returns
     */
    split: (options: Partial<SplitOptions>) => Array<Wrapped<TIn>>;
    /**
   * Emits values when this stream and any additional streams produce a value. The resulting stream is
   * thus an array of values, each source at a given index.
   * Waits to output a value until each stream has produced a value. Thus, the pace is determined by
   * the slowest stream.
   * @returns
   */
    syncToArray: <const T extends ReadonlyArray<ReactiveOrSource<any>>>(reactiveSources: T, options?: Partial<SyncOptions>) => Wrapped<[TIn, ...RxValueTypes<T>]>;
    syncToObject: <const T extends Record<string, ReactiveOrSource<any>>>(reactiveSources: T, options?: {
        name?: string;
    } & Partial<SyncOptions>) => Wrapped<RxValueTypeObject<T>>;
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
    timeoutTrigger: <TTriggerValue>(options: TimeoutTriggerOptions<TTriggerValue>) => Wrapped<TIn | TTriggerValue>;
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
type ReactiveOrSource<V> = Wrapped<V> | Reactive<V> | IterableIterator<V> | AsyncIterableIterator<V> | Generator<V> | AsyncGenerator<V> | Array<V> | (() => V);
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
type ReactiveDisposable<V> = Reactive<V> & {
    dispose(reason: string): void;
    isDisposed(): boolean;
};
type ReactiveArray<V> = ReactiveWritable<Array<V>> & {
    push(value: V): void;
    deleteAt(index: number): void;
    deleteWhere(filter: (value: V) => boolean): number;
    setAt(index: number, value: V): void;
    insertAt(index: number, value: V): void;
    onArray(handler: (changes: Passed<Array<ChangeRecord<number>>>) => void): () => void;
};
type ReactiveDiff<V> = ReactiveDisposable<V> & ReactiveWritable<V> & {
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
type ReactiveStream<V> = Reactive<V> & ReactiveDisposable<V> & ReactiveWritable<V> & {
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
type PipeSet<In, Out> = [
    Reactive<In>,
    ...Array<Reactive<any> & ReactiveWritable<any>>
];
type InitStreamOptions = {
    /**
     * Optional label to associate with this stream. Useful for debugging.
     */
    debugLabel: string;
    onFirstSubscribe: () => void;
    onNoSubscribers: () => void;
    onDispose: (reason: string) => void;
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
 * WithValue stream options
 */
type WithValueOptions<V> = Partial<InitStreamOptions> & {
    /**
     * Initial value
     */
    initial: V;
    /**
     * Laziness
     */
    lazy?: Lazy;
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
type RxValueTypes<T extends ReadonlyArray<ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends Reactive<infer V> ? V | undefined : T[K] extends Wrapped<infer V> ? V | undefined : T[K] extends Generator<infer V> ? V | undefined : T[K] extends AsyncGenerator<infer V> ? V | undefined : T[K] extends IterableIterator<infer V> ? V | undefined : T[K] extends AsyncIterableIterator<infer V> ? V | undefined : T[K] extends Array<infer V> ? V | undefined : never;
};
type RxValueTypeObject<T extends Record<string, ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends Reactive<infer V> ? V | undefined : T[K] extends Wrapped<infer V> ? V | undefined : T[K] extends Generator<infer V> ? V | undefined : T[K] extends AsyncGenerator<infer V> ? V | undefined : T[K] extends IterableIterator<infer V> ? V | undefined : T[K] extends AsyncIterableIterator<infer V> ? V | undefined : T[K] extends Array<infer V> ? V | undefined : never;
};
type PrimitiveValueTypeObject<T extends Record<string, Primitive>> = {
    [K in keyof T]: T[K] extends number ? number | undefined : T[K] extends string ? string | undefined : T[K] extends boolean ? boolean | undefined : T[K] extends bigint ? bigint | undefined : never;
};

export { type ReactiveNonInitial as $, type AnnotationElapsed as A, type BatchOptions as B, type ChangeKind as C, type DebounceOptions as D, type TriggerFunction as E, type FieldOptions as F, type TriggerGenerator as G, type GeneratorOptions as H, type InitStreamOptions as I, type FunctionOptions as J, type CountOptions as K, type DomBindSourceValue as L, type PipeDomBinding as M, type DomBindValueTarget as N, type DomBindUnresolvedSource as O, type Passed as P, type BindUpdateOpts as Q, type Reactive as R, type SingleFromArrayOptions as S, type TransformOpts as T, type Unsubscriber as U, type ElementsOptions as V, type WithValueOptions as W, type ArrayOptions as X, type ReactiveFinite as Y, type ArrayObjectOptions as Z, type ReactiveArray as _, type ChangeRecord as a, type EventOptions as a0, type Optional as a1, type FunctionFunction as a2, type PingedFunctionFunction as a3, type PingedFunctionOptions as a4, type ObjectOptions as a5, symbol as a6, type ReactiveOp as a7, type DomBindResolvedSource as a8, type DomBindTargetNode as a9, type DomBindTargetNodeResolved as aa, type DomCreateOptions as ab, type ElementBind as ac, type InitLazyStreamOptions as ad, type Lazy as ae, type PipeSet as af, type PrimitiveValueTypeObject as ag, type ReactiveOpInit as ah, type ReactiveOpLinks as ai, type ResolveOptions as aj, type SignalKinds as ak, type UpstreamOptions as al, type CompareChangeSet as b, changedDataFields as c, compareArrays as d, compareData as e, type ReactiveOrSource as f, type CombineLatestOptions as g, type RxValueTypes as h, type ReactiveDisposable as i, type RxValueTypeObject as j, type FilterPredicate as k, type ReactiveWritable as l, type SplitOptions as m, type ReactiveStream as n, type SwitcherOptions as o, type SyncOptions as p, type ThrottleOptions as q, type TimeoutTriggerOptions as r, type ReactiveInitial as s, type ToArrayOptions as t, type PassedSignal as u, type PassedValue as v, type ReactiveDiff as w, type Wrapped as x, type Trigger as y, type TriggerValue as z };
