import { G as GetOrGenerate } from './Map-a4cd7179.js';

declare type Timestamped<V> = V & {
    readonly at: number;
};
declare type Opts = {
    readonly storeIntermediate?: boolean;
    readonly resetAfterSamples?: number;
};
declare abstract class TrackedBase<V> {
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
declare class TrackedPrimitiveValue<V extends number | string> extends TrackedBase<V> {
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
declare class TrackedValueMap<V> {
    store: Map<string, TrackedBase<V>>;
    gog: GetOrGenerate<string, TrackedBase<V>, V>;
    constructor(creator: (key: string, start: V | undefined) => TrackedBase<V>);
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
    protected getTrackedValue(id: string, ...values: V[]): Promise<TrackedBase<V>>;
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
    values(): Generator<TrackedBase<V>, void, undefined>;
    /**
     * Returns TrackedValues ordered with oldest first
     * @returns
     */
    trackedByAge(): readonly TrackedBase<V>[];
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
    get(id: string): TrackedBase<V> | undefined;
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
declare class NumberTracker extends TrackedPrimitiveValue<number> {
    total: number;
    min: number;
    max: number;
    get avg(): number;
    onReset(): void;
    onSeen(values: Timestamped<number>[]): void;
    getMinMaxAvg(): {
        min: number;
        max: number;
        avg: number;
    };
}
declare const numberTracker: (id?: string | undefined, opts?: Opts | undefined) => NumberTracker;

export { NumberTracker as N, Opts as O, TrackedValueMap as T, numberTracker as n };
