import { P as Primitive } from './PrimitiveTypes-HWqXs_XP.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { a as IsEqualContext, C as Change } from './Immutable-ZCanoHO-.js';
import { I as IsEqual } from './IsEqual-EdZcaNvH.js';
import { R as RankFunction, a as RankOptions } from './Types-0RfFkd3L.js';

type Process<TIn, TOut> = (value: TIn) => TOut;
type ProcessFactory<TIn, TOut> = () => Process<TIn, TOut>;
type Processors1<T1, T2> = [
    Process<T1, T2>
];
type Processors2<T1, T2, T3> = [
    Process<T1, T2>,
    Process<T2, T3>
];
type Processors3<T1, T2, T3, T4> = [
    Process<T1, T2>,
    Process<T2, T3>,
    Process<T3, T4>
];
type Processors4<T1, T2, T3, T4, T5> = [
    Process<T1, T2>,
    Process<T2, T3>,
    Process<T3, T4>,
    Process<T4, T5>
];
type Processors5<T1, T2, T3, T4, T5, T6> = [
    Process<T1, T2>,
    Process<T2, T3>,
    Process<T3, T4>,
    Process<T4, T5>,
    Process<T5, T6>
];
type Processors<T1, T2, T3, T4, T5, T6> = Processors1<T1, T2> | Processors2<T1, T2, T3> | Processors3<T1, T2, T3, T4> | Processors4<T1, T2, T3, T4, T5> | Processors5<T1, T2, T3, T4, T5, T6>;
declare function processChain<T1, T2>(...processors: [Process<T1, T2>]): (value: T1) => T2;
declare function processChain<T1, T2, T3>(...processors: [Process<T1, T2>, Process<T2, T3>]): (value: T1) => T3;
declare function processChain<T1, T2, T3, T4>(...processors: [Process<T1, T2>, Process<T2, T3>, Process<T3, T4>]): (value: T1) => T4;
declare function processChain<T1, T2, T3, T4, T5>(...processors: [Process<T1, T2>, Process<T2, T3>, Process<T3, T4>, Process<T4, T5>]): (value: T1) => T5;
declare function processChain<T1, T2, T3, T4, T5, T6>(...processors: [Process<T1, T2>, Process<T2, T3>, Process<T3, T4>, Process<T4, T5>, Process<T5, T6>]): (value: T1) => T6;

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
type TransformOpts = InitStreamOptions & {
    traceInput: boolean;
    traceOutput: boolean;
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
type SplitOptions = {
    quantity: number;
};
type FieldOptions<TSource, TValue> = InitStreamOptions & {
    /**
     * If `field` is missing on a value, it is query from this object instead.
     * If this also is missing, `fallbackFieldValue` is attempted.
     */
    fallbackObject: TSource;
    /**
     * If `field` is missing on a value and `fallbackObject` (if specified),
     * this value is used in its place.
     * If not set, no value is emitted when the field is missing.
     */
    fallbackFieldValue: TValue;
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
type OpAsAnnotation = {
    annotate: true;
};
type OpMathOptions = Partial<InitStreamOptions> & {
    annotate?: boolean;
    /**
     * If _true_ (default) operations that return _undefined_ do not emit a value.
     * If _false_, _undefined_ is potentially emitted
     */
    skipUndefined?: boolean;
    /**
     * If _true_ (default) operations only emit a value if it has changed.
     * In the case of `max()`, for example, a stream of '1, 2, 3, 2, 1' would emit '1, 2, 3'.
     * If _false_ was used, same input would emit '1, 2, 3, 3, 3'
     */
    skipIdentical?: boolean;
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
type EventOptions = {
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
type EventTriggerOptions = EventOptions & {
    /**
     * If _true_ sends an initial trigger when starting
     * Default: false
     */
    fireInitial: boolean;
};
type EventPluckedFieldOptions<T> = {
    lazy?: Lazy;
    initialValue: T;
};
type EventPluckedFieldOptions2<TDomSource, TValueDestination> = {
    lazy?: Lazy;
    initialValue: TValueDestination;
    domToValue: (value: TDomSource | undefined) => TValueDestination | undefined;
    valueToDom: (value: TValueDestination) => TDomSource;
};
type DomValueOptions = EventOptions & {
    /**
     * If true, the current value will be emitted even though it wasn't
     * triggered by an event.
     * Default: false
     */
    emitInitialValue: boolean;
    attributeName: string;
    fieldName: string;
    /**
     * Respond to when value has changed or when value is changing
     * Default: `changed`
     */
    when: `changed` | `progress`;
    fallbackValue: string;
};

type SetHtmlOptionsQuery = {
    query: string;
};
type SetHtmlOptionsElement = {
    el: HTMLElement;
};
type SetHtmlOptions = (SetHtmlOptionsQuery | SetHtmlOptionsElement) & {
    /**
     * If _true_ .innerHTML is used
     * If _false_ (default) .textContent is used
     */
    asHtml?: boolean;
};
/**
 * Values from `input` are set to the textContent/innerHTML of an element.
 * ```js
 * const rxSource = Rx.From.string('hello');
 * const rxSet = Rx.Sinks.setHtmlText(rxSource, { query: })
 * ```
 * @param input
 * @param options
 */
declare const setHtmlText: (input: ReactiveOrSource<any>, optionsOrElementOrQuery: SetHtmlOptions | string | HTMLElement) => Unsubscriber;

declare function max(input: ReactiveOrSource<any>, options: OpMathOptions): Reactive<number>;
declare function max(input: ReactiveOrSource<any>, options: OpAsAnnotation & OpMathOptions): Reactive<{
    value: number;
    max: number;
}>;
declare function min(input: ReactiveOrSource<any>, options: OpMathOptions): Reactive<number>;
declare function min(input: ReactiveOrSource<any>, options: OpAsAnnotation & OpMathOptions): Reactive<{
    value: number;
    min: number;
}>;
declare function average(input: ReactiveOrSource<any>, options: OpMathOptions): Reactive<number>;
declare function average(input: ReactiveOrSource<any>, options: OpAsAnnotation & OpMathOptions): Reactive<{
    value: number;
    average: number;
}>;
declare function sum(input: ReactiveOrSource<any>, options: OpMathOptions): Reactive<number>;
declare function sum(input: ReactiveOrSource<any>, options: OpAsAnnotation & OpMathOptions): Reactive<{
    value: number;
    sum: number;
}>;
type TallyOptions = OpMathOptions & {
    countArrayItems: boolean;
};
declare function tally(input: ReactiveOrSource<any>, options: Partial<TallyOptions>): Reactive<number>;
declare function tally<TIn>(input: ReactiveOrSource<TIn>, options: OpAsAnnotation & Partial<TallyOptions>): Reactive<{
    value: TIn;
    tally: number;
}>;
declare function rank<TIn>(input: ReactiveOrSource<any>, rank: RankFunction<TIn>, options: Partial<RankOptions & OpMathOptions>): Reactive<TIn>;
declare function rank<TIn>(input: ReactiveOrSource<any>, rank: RankFunction<TIn>, options: OpAsAnnotation & Partial<RankOptions & OpMathOptions>): Reactive<{
    value: TIn;
    rank: TIn;
}>;

type ChangeKind = `mutate` | `add` | `del`;
type ChangeRecord<TKey extends string | number | symbol> = [kind: ChangeKind, path: TKey, value: any];

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
    enacts: {
        setHtmlText: (options: SetHtmlOptions) => () => void;
    };
    source: Reactive<TIn>;
    /**
     * Annotate values with output from the `annotation` function.
     * Returned values will be in the form `{ value:TIn, annotation:TAnnotation }`
     * @param transformer
     * @returns
     */
    annotate: <TAnnotation>(transformer: (value: TIn) => TAnnotation) => Wrapped<{
        value: TIn;
        annotation: TAnnotation;
    }>;
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
    field: <TSource, TFieldType>(fieldName: keyof TIn, options: Partial<FieldOptions<TSource, TFieldType>>) => Wrapped<TFieldType>;
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
    min: (options?: Partial<OpMathOptions>) => Wrapped<number>;
    max: (options?: Partial<OpMathOptions>) => Wrapped<number>;
    average: (options?: Partial<OpMathOptions>) => Wrapped<number>;
    sum: (options?: Partial<OpMathOptions>) => Wrapped<number>;
    tally: (options?: Partial<TallyOptions>) => Wrapped<number>;
    /**
     * Converts one source stream into two, with values being emitted by both
     * @param options
     * @returns
     */
    split: (options?: Partial<SplitOptions>) => Array<Wrapped<TIn>>;
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
     * Taps the stream, passing values to one or more 'processor' functions.
     * This processing essentially happens in parallel, not affecting the main stream.
     *
     * ```js
     * // Stream of pointermove events with {x:0,y:0} as default
     * const move = Rx.From.event(document.body, `pointermove`, {x:0,y:0});
     * // Wrap it for fluent access
     * const ptr = Rx.wrap(move)
     *  .tapProcess(
     *    // Create a string representation
     *    v => `${v.x},${v.y}`
     *    // Set to DOM
     *    v => {
     *      document.getElementById(`coords`).innerText = v;
     *    }
     *   )
     *  .onValue(value => {
     *    // 'value' will be original PointerEvent, since .tapProcess happened in parallel,
     *    // not affecting stream
     *  });
     * ```
     * @param processors One-five processing functions
     * @returns
     */
    tapProcess: <T2, T3, T4, T5, T6>(...processors: Processors<TIn, T2, T3, T4, T5, T6>) => Wrapped<TIn>;
    tapStream: (divergedStream: ReactiveWritable<TIn>) => Wrapped<TIn>;
    tapOps: <TOut>(source: ReactiveOrSource<TIn>, ...ops: Array<ReactiveOp<TIn, TOut>>) => Wrapped<TIn>;
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
    onValue: (callback: (value: TIn) => void) => void;
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
type InitLazyStreamInitedOptions<T> = InitLazyStreamOptions & {
    initialValue: T;
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
    onValue(handler: (value: V) => void): Unsubscriber;
    dispose(reason: string): void;
    isDisposed(): boolean;
};
type Unsubscriber = () => void;
type ReactiveNonInitial<V> = Reactive<V> & {
    last(): V | undefined;
};
type ReactiveWritable<V> = Reactive<V> & {
    set(value: V): void;
};
type ReactiveInitial<V> = Reactive<V> & {
    last(): V;
};
type ReactiveFinite = {
    isDone(): boolean;
};
type ReactiveArray<V> = ReactiveWritable<Array<V>> & {
    push(value: V): void;
    deleteAt(index: number): void;
    deleteWhere(filter: (value: V) => boolean): number;
    setAt(index: number, value: V): void;
    insertAt(index: number, value: V): void;
    onArray(handler: (changes: Passed<Array<ChangeRecord<number>>>) => void): () => void;
};
type ReactiveDiff<V> = Reactive<V> & ReactiveWritable<V> & {
    /**
     * Notifies when the value of `fieldName` is changed.
     *
     * Use the returned function to unsubscribe.
     * @param fieldName
     * @param handler
     */
    onField(fieldName: string, handler: (value: any, fieldName: string) => void): () => void;
    /**
     * Notifies of which field(s) were changed.
     * If you just care about the whole, changed data use the `value` event.
     *
     * Use the returned function to unsubscribe.
     * @param handler
     */
    onDiff(handler: (changes: Passed<Array<Change<any>>>) => void): () => void;
    /**
     * Updates the reactive with some partial key-value pairs.
     * Keys omitted are left the same as the current value.
     * @param changedPart
     * @returns Returns new value
     */
    update(changedPart: Record<string, any>): V;
    /**
     * Updates a particular field by its path
     * @param field
     * @param value
     */
    updateField(field: string, value: any): void;
};
type ReactiveStream<V> = Reactive<V> & ReactiveWritable<V> & {
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
type DomBindUnresolvedSource<TSource, TDestination> = DomBindTargetNode & DomBindSourceValue<TSource, TDestination> & DomBindValueTarget;
type DomBindResolvedSource<TSource, TDestination> = DomBindTargetNodeResolved & DomBindSourceValue<TSource, TDestination> & DomBindValueTarget;
type DomBindSourceValue<TSource, TDestination> = {
    twoway?: boolean;
    /**
     * Field from source value to pluck and use.
     * This will also be the value passed to the transform
     */
    sourceField?: keyof TSource;
    transform?: (input: TSource) => TDestination;
    transformValue?: (input: any) => TDestination;
};
type DomBindInputOptions<TSource, TDestination> = DomBindSourceValue<TSource, TDestination> & {
    transformFromInput: (input: TDestination) => TSource;
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

export { type ArrayObjectOptions as $, type Wrapped as A, type BatchOptions as B, type CombineLatestOptions as C, type DebounceOptions as D, type Trigger as E, type FieldOptions as F, type TriggerValue as G, type TriggerFunction as H, type InitStreamOptions as I, type TriggerGenerator as J, type GeneratorOptions as K, type FunctionOptions as L, type CountOptions as M, type DomBindSourceValue as N, type PipeDomBinding as O, type Passed as P, type DomBindValueTarget as Q, type Reactive as R, type SingleFromArrayOptions as S, type TransformOpts as T, type Unsubscriber as U, type DomBindUnresolvedSource as V, type WithValueOptions as W, type BindUpdateOpts as X, type ElementsOptions as Y, type ArrayOptions as Z, type ReactiveFinite as _, type Process as a, type ReactiveArray as a0, type ReactiveNonInitial as a1, type EventOptions as a2, type EventTriggerOptions as a3, type DomValueOptions as a4, type FunctionFunction as a5, type PingedFunctionFunction as a6, type PingedFunctionOptions as a7, type ObjectOptions as a8, symbol as a9, max as aA, min as aB, rank as aC, setHtmlText as aD, sum as aE, tally as aF, type EventPluckedFieldOptions as aa, type EventPluckedFieldOptions2 as ab, type SetHtmlOptions as ac, type OpMathOptions as ad, type TallyOptions as ae, type DomBindInputOptions as af, type DomBindResolvedSource as ag, type DomBindTargetNode as ah, type DomBindTargetNodeResolved as ai, type DomCreateOptions as aj, type ElementBind as ak, type InitLazyStreamInitedOptions as al, type InitLazyStreamOptions as am, type Lazy as an, type OpAsAnnotation as ao, type Optional as ap, type PipeSet as aq, type PrimitiveValueTypeObject as ar, type ReactiveOpInit as as, type ReactiveOpLinks as at, type ResolveOptions as au, type SetHtmlOptionsElement as av, type SetHtmlOptionsQuery as aw, type SignalKinds as ax, type UpstreamOptions as ay, average as az, type ProcessFactory as b, type Processors as c, type Processors1 as d, type Processors2 as e, type Processors3 as f, type Processors4 as g, type Processors5 as h, type ReactiveOrSource as i, type ReactiveOp as j, type RxValueTypes as k, type RxValueTypeObject as l, type ReactiveInitial as m, type FilterPredicate as n, type SplitOptions as o, processChain as p, type ReactiveStream as q, type SwitcherOptions as r, type SyncOptions as s, type ReactiveWritable as t, type ThrottleOptions as u, type TimeoutTriggerOptions as v, type ToArrayOptions as w, type PassedSignal as x, type PassedValue as y, type ReactiveDiff as z };
