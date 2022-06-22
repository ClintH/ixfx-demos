import { G as GetOrGenerate } from './Map-858cb6b7.js';

declare type Timestamped<V> = V & {
    readonly at: number;
};
declare type Opts = {
    readonly storeIntermediate?: boolean;
    readonly resetAfterSamples?: number;
};
declare abstract class TrackerBase<V> {
    readonly id: string;
    seenCount: number;
    protected storeIntermediate: boolean;
    protected resetAfterSamples: number;
    constructor(id: string, opts?: Opts);
    reset(): void;
    seen(...p: V[]): any;
    abstract seenImpl(p: V[]): V[];
    abstract get last(): V | undefined;
    abstract get initial(): V | undefined;
    abstract get elapsed(): number;
    onSeen(_p: V[]): void;
    abstract onReset(): void;
}
declare class PrimitiveTracker<V extends number | string> extends TrackerBase<V> {
    values: V[];
    timestamps: number[];
    constructor(id: string, opts: Opts);
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
/**
 * A tracked value of type `V`.
 */
declare class ObjectTracker<V> extends TrackerBase<V> {
    values: Timestamped<V>[];
    constructor(id: string, opts: Opts);
    /**
     * Allows sub-classes to be notified when a reset happens
     */
    onReset(): void;
    /**
     * Tracks a value
     */
    seenImpl(p: V[] | Timestamped<V>[]): Timestamped<V>[];
    /**
     * Last seen value. If no values have been added, it will return the initial value
     */
    get last(): Timestamped<V>;
    get initial(): Timestamped<V> | undefined;
    /**
     * Returns number of recorded values (this can include the initial value)
     */
    get size(): number;
    /**
     * Returns the elapsed time, in milliseconds since the instance was created
     */
    get elapsed(): number;
}
declare class TrackedValueMap<V> {
    store: Map<string, TrackerBase<V>>;
    gog: GetOrGenerate<string, TrackerBase<V>, V>;
    constructor(creator: (key: string, start: V | undefined) => TrackerBase<V>);
    /**
     * Return number of named points being tracked
     */
    get size(): number;
    /**
     * Returns true if `id` is stored
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
    protected getTrackedValue(id: string, ...values: V[]): Promise<TrackerBase<V>>;
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
    values(): Generator<TrackerBase<V>, void, undefined>;
    /**
     * Returns TrackedValues ordered with oldest first
     * @returns
     */
    trackedByAge(): readonly TrackerBase<V>[];
    valuesByAge(): readonly V[];
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

/**
 * Keeps track of the min, max and avg in a stream of values without actually storing them.
 *
 * Usage:
 *
 * ```js
 *  const t = numberTracker();
 *  t.seen(10);
 *
 *  t.avg / t.min/ t.max / t.getMinMax()
 * ```
 *
 * Use `reset()` to clear everything, or `resetAvg()` to only reset averaging calculation.
 *
 * Trackers can automatically reset after a given number of samples
 * ```
 * // reset after 100 samples
 * const t = numberTracker(`something`, 100);
 * ```
 * @class NumberTracker
 */
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
    onSeen(values: Timestamped<number>[]): void;
    getMinMaxAvg(): {
        min: number;
        max: number;
        avg: number;
    };
}
declare const numberTracker: (id?: string | undefined, opts?: Opts | undefined) => NumberTracker;

export { NumberTracker as N, Opts as O, Timestamped as T, ObjectTracker as a, TrackedValueMap as b, numberTracker as n };
