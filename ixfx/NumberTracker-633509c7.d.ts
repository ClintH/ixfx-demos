import { G as GetOrGenerate } from './Map-d55a38ae.js';

declare type Timestamped<V> = V & {
    readonly at: number;
};
declare type Opts = {
    readonly storeIntermediate?: boolean;
    readonly resetAfterSamples?: number;
};
/**
 * A tracked value of type `V`.
 */
declare class TrackedValue<V> {
    readonly id: string;
    values: Timestamped<V>[];
    seenCount: number;
    protected storeIntermediate: boolean;
    protected resetAfterSamples: number;
    constructor(id: string, initial: V, opts?: Opts);
    reset(): void;
    /**
     * Allows sub-classes to be notified when a reset happens
     */
    protected onReset(): void;
    /**
     * Tracks a value
     */
    seen(...p: V[] | Timestamped<V>[]): any;
    protected onSeen(_values: Timestamped<V>[]): void;
    /**
     * Last seen value. If no values have been added, it will return the initial value
     */
    get last(): Timestamped<V>;
    /**
     * Returns number of recorded values (this can include the initial value)
     */
    get size(): number;
    /**
     * Returns the elapsed time, in milliseconds since the instance was created
     */
    get elapsed(): number;
}
/**
 * PointTracker. Mutable.
 */
declare class TrackedValueMap<V> {
    store: Map<string, TrackedValue<V>>;
    gog: GetOrGenerate<string, TrackedValue<V>, V>;
    constructor(creator: (key: string, start: V | undefined) => TrackedValue<V>);
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
    protected getTrackedValue(id: string, ...values: V[]): Promise<TrackedValue<V>>;
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
    values(): Generator<TrackedValue<V>, void, undefined>;
    /**
     * Returns TrackedValues ordered with oldest first
     * @returns
     */
    getByAge(): readonly TrackedValue<V>[];
    /**
     * Enumerate last received values
     *
     * @example Calculate centroid of latest-received values
     * ```js
     * const pointers = pointTracker();
     * const c = Points.centroid(...Array.from(pointers.lastPoints()));
     * ```
     */
    last(): Generator<Timestamped<V>, void, unknown>;
    /**
     * Enumerate starting values
     */
    startValues(): Generator<Timestamped<V>, void, unknown>;
    /**
     * Returns a tracked value by id, or undefined if not found
     * @param id
     * @returns
     */
    get(id: string): TrackedValue<V> | undefined;
}

/**
 * Keeps track of the min, max and avg in a stream of values without actually storing them.
 *
 * Usage:
 *
 * ```js
 *  const t = tracker();
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
 * const t = tracker(`something`, 100);
 * ```
 * @class Tracker
 */
declare class NumberTracker extends TrackedValue<number> {
    total: number;
    min: number;
    max: number;
    constructor(id: string, opts: Opts);
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
