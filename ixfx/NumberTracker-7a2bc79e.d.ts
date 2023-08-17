import { G as GetOrGenerate } from './index-1bc3a0dc.js';

/**
 * Base tracker class
 */
declare abstract class TrackerBase<V> {
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
    constructor(opts?: TrackedValueOpts);
    /**
     * Reset tracker
     */
    reset(): void;
    seen(...p: V[]): void;
    /**
     * @ignore
     * @param p
     */
    abstract seenImpl(p: V[]): V[];
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
    onSeen(_p: V[]): void;
    /**
     * @ignore
     */
    abstract onReset(): void;
    abstract onTrimmed(): void;
    abstract trimStore(limit: number): number;
}

type Timestamped<V> = V & {
    readonly at: number;
};
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
};
/**
 * Keeps track of keyed values of type `V` (eg Point) It stores occurences in type `T`, which
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
declare class TrackedValueMap<V, T extends TrackerBase<V>> {
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
    seen(id: string, ...values: V[]): Promise<any>;
    /**
     * Creates or returns a TrackedValue instance for `id`.
     * @param id
     * @param values
     * @returns
     */
    protected getTrackedValue(id: string, ...values: V[]): Promise<T>;
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
    get(id: string): TrackerBase<V> | undefined;
}

declare class PrimitiveTracker<V extends number | string> extends TrackerBase<V> {
    values: V[];
    timestamps: number[];
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
    seenImpl(p: V[]): V[];
}

declare class NumberTracker extends PrimitiveTracker<number> {
    total: number;
    min: number;
    max: number;
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
    onSeen(values: Timestamped<number>[]): void;
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
 * import { numberTracker } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * const t = numberTracker();
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
 * const t = numberTracker({ resetAfterSamples: 100 });
 * ```
 *
 * To store values, use the `storeIntermediate` option:
 *
 * ```js
 * const t = numberTracker({ storeIntermediate: true });
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
 * @class NumberTracker
 */
declare const numberTracker: (opts?: TrackedValueOpts) => NumberTracker;

export { NumberTracker as N, TrackedValueOpts as T, TrackerBase as a, Timestamped as b, TrackedValueMap as c, numberTracker as n };
