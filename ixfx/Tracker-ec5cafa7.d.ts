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
declare class Tracker {
    samples: number;
    total: number;
    min: number;
    max: number;
    id: string | undefined;
    resetAfterSamples?: number;
    constructor(id?: string | undefined, resetAfterSamples?: number);
    get avg(): number;
    resetAvg(newId?: string | null): void;
    reset(newId?: string | null): void;
    seen(sample: number): void;
    getMinMaxAvg(): {
        min: number;
        max: number;
        avg: number;
    };
}
declare const tracker: (id?: string | undefined, resetAfterSamples?: number | undefined) => Tracker;
/**
 * A `Tracker` that tracks interval between calls to `mark()`
 *
 * @export
 * @class IntervalTracker
 * @extends {Tracker}
 */
declare class IntervalTracker extends Tracker {
    lastMark: number;
    constructor(id?: string | undefined, resetAfterSamples?: number);
    mark(): void;
}
/**
 * Returns a new {@link IntervalTracker} instance. IntervalTracker
 * records the interval between each call to `mark`.
 *
 * ```js
 * const t = intervalTracker();
 *
 * // Call `mark` to record an interval
 * t.mark();
 * ...
 * t.mark();
 *
 * // Get average time in milliseconds between calls to `mark`
 * t.avg;
 *
 * // Longest and shortest times are available too...
 * t.min; t.max
 * ```
 *
 * Interval tracker can automatically reset after a given number of samples:
 * ```
 * // Reset after 100 samples
 * const t = intervalTracker(`tracker`, 100);
 * ```
 * @param id Optional id of instance
 * @returns New interval tracker
 */
declare const intervalTracker: (id?: string | undefined, resetAfterSamples?: number | undefined) => IntervalTracker;

export { Tracker as T, intervalTracker as i, tracker as t };
