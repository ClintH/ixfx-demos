import { G as GetOrGenerate } from './GetOrGenerate-CVpu5gTc.js';

/**
 * Base tracker class
 */
declare abstract class TrackerBase<V, SeenResultType> {
    /**
     * @ignore
     */
    seenCount: number;
    /**
     * @ignore
     */
    protected storeIntermediate: boolean;
    /**
     * @ignore
     */
    protected resetAfterSamples: number;
    /**
     * @ignore
     */
    protected sampleLimit: number;
    readonly id: string;
    protected debug: boolean;
    constructor(opts?: TrackedValueOpts);
    /**
     * Reset tracker
     */
    reset(): void;
    /**
     * Calculate results
     *
     * @param p
     * @returns
     */
    seen(...p: Array<V>): SeenResultType;
    /**
     * @ignore
     * @param p
     */
    abstract filterData(p: Array<V>): Array<Timestamped>;
    abstract get last(): V | undefined;
    /**
     * Returns the initial value, or undefined
     */
    abstract get initial(): V | undefined;
    /**
     * Returns the elapsed milliseconds since the initial value
     */
    abstract get elapsed(): number;
    /**
     * @ignore
     */
    abstract computeResults(_p: Array<Timestamped>): SeenResultType;
    /**
     * @ignore
     */
    abstract onReset(): void;
    abstract onTrimmed(): void;
    abstract trimStore(limit: number): number;
}

type Timestamped = {
    readonly at: number;
};
type TimestampedObject<V> = V & Timestamped;
/**
 * Options
 */
type TrackedValueOpts = {
    readonly id?: string;
    /**
     * If true, intermediate points are stored. False by default
     */
    readonly storeIntermediate?: boolean;
    /**
     * If above zero, tracker will reset after this many samples
     */
    readonly resetAfterSamples?: number;
    /**
     * If above zero, there will be a limit to intermediate values kept.
     *
     * When the seen values is twice `sampleLimit`, the stored values will be trimmed down
     * to `sampleLimit`. We only do this when the values are double the size so that
     * the collections do not need to be trimmed repeatedly whilst we are at the limit.
     *
     * Automatically implies storeIntermediate
     */
    readonly sampleLimit?: number;
    /**
     * If true
     */
    readonly debug?: boolean;
};
/**
 * Keeps track of keyed values of type `V` (eg Point). It stores occurences in type `T`, which
 * must extend from `TrackerBase<V>`, eg `PointTracker`.
 *
 * The `creator` function passed in to the constructor is responsible for instantiating
 * the appropriate `TrackerBase` sub-class.
 *
 * @example Sub-class
 * ```js
 * export class TrackedPointMap extends TrackedValueMap<Points.Point> {
 *  constructor(opts:TrackOpts = {}) {
 *   super((key, start) => {
 *    if (start === undefined) throw new Error(`Requires start point`);
 *    const p = new PointTracker(key, opts);
 *    p.seen(start);
 *    return p;
 *   });
 *  }
 * }
 * ```
 *
 */
declare class TrackedValueMap<V, T extends TrackerBase<V, TResult>, TResult> {
    store: Map<string, T>;
    gog: GetOrGenerate<string, T, V>;
    constructor(creator: (key: string, start: V | undefined) => T);
    /**
     * Number of named values being tracked
     */
    get size(): number;
    /**
     * Returns _true_ if `id` is stored
     * @param id
     * @returns
     */
    has(id: string): boolean;
    /**
     * For a given id, note that we have seen one or more values.
     * @param id Id
     * @param values Values(s)
     * @returns Information about start to last value
     */
    seen(id: string, ...values: Array<V>): Promise<TResult>;
    /**
     * Creates or returns a TrackedValue instance for `id`.
     * @param id
     * @param values
     * @returns
     */
    protected getTrackedValue(id: string, ...values: Array<V>): Promise<T>;
    /**
     * Remove a tracked value by id.
     * Use {@link reset} to clear them all.
     * @param id
     */
    delete(id: string): void;
    /**
     * Remove all tracked values.
     * Use {@link delete} to remove a single value by id.
     */
    reset(): void;
    /**
     * Enumerate ids
     */
    ids(): Generator<string, void, undefined>;
    /**
     * Enumerate tracked values
     */
    tracked(): Generator<T, void, undefined>;
    /**
     * Iterates TrackedValues ordered with oldest first
     * @returns
     */
    trackedByAge(): Generator<T, void, unknown>;
    /**
     * Iterates underlying values, ordered by age (oldest first)
     * First the named values are sorted by their `elapsed` value, and then
     * we return the last value for that group.
     */
    valuesByAge(): Generator<V | undefined, void, unknown>;
    /**
     * Enumerate last received values
     *
     * @example Calculate centroid of latest-received values
     * ```js
     * const pointers = pointTracker();
     * const c = Points.centroid(...Array.from(pointers.lastPoints()));
     * ```
     */
    last(): Generator<V | undefined, void, unknown>;
    /**
     * Enumerate starting values
     */
    initialValues(): Generator<V | undefined, void, unknown>;
    /**
     * Returns a tracked value by id, or undefined if not found
     * @param id
     * @returns
     */
    get(id: string): TrackerBase<V, TResult> | undefined;
}

type TimestampedPrimitive<V extends number | string> = {
    at: number;
    value: V;
};
declare abstract class PrimitiveTracker<V extends number | string, TResult> extends TrackerBase<V, TResult> {
    values: Array<V>;
    timestamps: Array<number>;
    constructor(opts?: TrackedValueOpts);
    /**
     * Reduces size of value store to `limit`. Returns
     * number of remaining items
     * @param limit
     */
    trimStore(limit: number): number;
    onTrimmed(): void;
    get last(): V | undefined;
    get initial(): V | undefined;
    /**
     * Returns number of recorded values (this can include the initial value)
     */
    get size(): number;
    /**
     * Returns the elapsed time, in milliseconds since the instance was created
     */
    get elapsed(): number;
    onReset(): void;
    /**
     * Tracks a value
     */
    filterData(rawValues: Array<V>): Array<TimestampedPrimitive<V>>;
}

type NumberTrackerResults = {
    readonly total: number;
    readonly min: number;
    readonly max: number;
    readonly avg: number;
};
declare class NumberTracker extends PrimitiveTracker<number, NumberTrackerResults> {
    total: number;
    min: number;
    max: number;
    constructor(opts?: TrackedValueOpts);
    get avg(): number;
    /**
     * Difference between last value and initial.
     * Eg. if last value was 10 and initial value was 5, 5 is returned (10 - 5)
     * If either of those is missing, undefined is returned
     */
    difference(): number | undefined;
    /**
     * Relative difference between last value and initial.
     * Eg if last value was 10 and initial value was 5, 2 is returned (200%)
     */
    relativeDifference(): number | undefined;
    onReset(): void;
    onTrimmed(): void;
    computeResults(values: Array<TimestampedPrimitive<number>>): NumberTrackerResults;
    getMinMaxAvg(): {
        min: number;
        max: number;
        avg: number;
    };
}
/**
 * Keeps track of the total, min, max and avg in a stream of values. By default values
 * are not stored.
 *
 * Usage:
 *
 * ```js
 * import { number } from 'https://unpkg.com/ixfx/dist/trackers.js';
 *
 * const t = number();
 * t.seen(10);
 *
 * t.avg / t.min/ t.max
 * t.initial; // initial value
 * t.size;    // number of seen values
 * t.elapsed; // milliseconds since intialisation
 * t.last;    // last value
 * ```
 *
 * To get `{ avg, min, max, total }`
 * ```
 * t.getMinMax()
 * ```
 *
 * Use `t.reset()` to clear everything.
 *
 * Trackers can automatically reset after a given number of samples
 * ```
 * // reset after 100 samples
 * const t = number({ resetAfterSamples: 100 });
 * ```
 *
 * To store values, use the `storeIntermediate` option:
 *
 * ```js
 * const t = number({ storeIntermediate: true });
 * ```
 *
 * Difference between last value and initial value:
 * ```js
 * t.relativeDifference();
 * ```
 *
 * Get raw data (if it is being stored):
 * ```js
 * t.values; // array of numbers
 * t.timestampes; // array of millisecond times, indexes correspond to t.values
 * ```
 */
declare const number: (opts?: TrackedValueOpts) => NumberTracker;

export { NumberTracker as N, PrimitiveTracker as P, type TrackedValueOpts as T, TrackerBase as a, type TimestampedObject as b, TrackedValueMap as c, type NumberTrackerResults as d, type Timestamped as e, type TimestampedPrimitive as f, number as n };
