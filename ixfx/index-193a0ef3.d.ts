import { M as MinMaxAvgTotal } from './NumericArrays-20f70b74.js';
import { ToString } from './util.js';
import { S as SimpleEventEmitter } from './Events-5892cf2f.js';
import { a as KeyValue } from './KeyValue-90e2cb76.js';
import { O as Opts, N as NumberTracker, T as TrackedValueMap, n as numberTracker } from './NumberTracker-6ed10232.js';
import { P as Point } from './Point-9785f83e.js';

/**
 * Normalises numbers, adjusting min/max as new values are processed.
 * Normalised return values will be in the range of 0-1 (inclusive).
 * [Read more in the docs]{@link https://clinth.github.io/ixfx-docs/temporal/normalising/}
 *
 * @example
 * ```js
 * const s = stream();
 * s(2);    // 1 (because 2 is highest seen)
 * s(1);    // 0 (because 1 is the lowest so far)
 * s(1.5);  // 0.5 (50% of range 1-2)
 * s(0.5);  // 0 (because it's the new lowest)
 * ```
 *
 * Since normalisation is being adjusted as new min/max are encountered, it might
 * be that value normalised to 1 at one time is different to what normalises to 1
 * at a later time.
 *
 * If you already know what to expect of the number range, passingin `minDefault`
 * and `maxDefault` primes the normalisation.
 * ```js
 * const s = stream();
 * s(5); // 1, because it's the highest seen
 *
 * // With priming:
 * const s = stream(0, 10);
 * s(5); // 0.5, because we're expecting range 0-10
 * ```
 *
 * Note that if a value exceeds the default range, normalisation adjusts.
 * @returns
 */
declare const stream: (minDefault?: number | undefined, maxDefault?: number | undefined) => (v: number) => number;
/**
 * Normalises an array. By default uses the actual min/max of the array
 * as the normalisation range. [Read more in the docs]{@link https://clinth.github.io/ixfx-docs/temporal/normalising/}
 *
 * ```js
 * // Yields: [0.5, 0.1, 0.0, 0.9, 1]
 * array([5,1,0,9,10]);
 * ```
 *
 * `minForced` and/or `maxForced` can
 * be provided to use an arbitrary range.
 * ```js
 * // Forced range 0-100
 * // Yields: [0.05, 0.01, 0.0, 0.09, 0.10]
 * array([5,1,0,9,10], 0, 100);
 * ```
 *
 * Return values are clamped to always be 0-1, inclusive.
 *
 * @param values Values
 * @param minForced If provided, this will be min value used
 * @param maxForced If provided, this will be the max value used
 */
declare const array: (values: readonly number[], minForced?: number | undefined, maxForced?: number | undefined) => number[];

declare const Normalise_stream: typeof stream;
declare const Normalise_array: typeof array;
declare namespace Normalise {
  export {
    Normalise_stream as stream,
    Normalise_array as array,
  };
}

declare type FrequencyEventMap = {
    readonly change: void;
};
/**
 * Frequency keeps track of how many times a particular value is seen, but
 * unlike a {@link Maps|Map} it does not store the data. By default compares
 * items by value (via JSON.stringify).
 *
 * Create with {@link frequencyMutable}.
 *
 * Fires `change` event when items are added or it is cleared.
 *
 * Overview
 * ```
 * const fh = frequencyMutable();
 * fh.add(value); // adds a value
 * fh.clear();    // clears all data
 * fh.keys() / .values() // returns an iterator for keys and values
 * fh.toArray();  //  returns an array of data in the shape [[key,freq],[key,freq]...]
 * ```
 *
 * Usage
 * ```
 * const fh = frequencyMutable();
 * fh.add(`apples`); // Count an occurence of `apples`
 * fh.add(`oranges)`;
 * fh.add(`apples`);
 *
 * const fhData = fh.toArray(); // Expect result [[`apples`, 2], [`oranges`, 1]]
 * fhData.forEach((d) => {
 *  const [key,freq] = d;
 *  console.log(`Key '${key}' occurred ${freq} time(s).`);
 * })
 * ```
 *
 * Custom key string
 * ```
 * const fh = frequencyMutable( person => person.name);
 * // All people with name `Samantha` will be counted in same group
 * fh.add({name:`Samantha`, city:`Brisbane`});
 * ```
 * @template V Type of items
 */
declare class FrequencyMutable<V> extends SimpleEventEmitter<FrequencyEventMap> {
    #private;
    /**
     * Constructor
     * @param keyString Function to key items. Uses JSON.stringify by default
     */
    constructor(keyString?: ToString<V> | undefined);
    /**
     * Clear data. Fires `change` event
     */
    clear(): void;
    /**
     * @returns Iterator over keys (ie. groups)
     */
    keys(): IterableIterator<string>;
    /**
     * @returns Iterator over frequency counts
     */
    values(): IterableIterator<number>;
    /**
     * @returns Copy of entries as an array of `[key, count]`
     */
    toArray(): [key: string, count: number][];
    /**
     * Returns a string with keys and counts, useful for debugging.
     * @returns
     */
    debugString(): string;
    /**
     *
     * @param value Value to count
     * @returns Frequency of value, or _undefined_ if it does not exist
     */
    frequencyOf(value: V | string): number | undefined;
    /**
     *
     * @param value Value to count
     * @returns Relative frequency of `value`, or _undefined_ if it does not exist
     */
    relativeFrequencyOf(value: V | string): number | undefined;
    /**
     * @returns Copy of entries as an array
     */
    entries(): Array<KeyValue>;
    /**
     *
     * @returns Returns `{min,max,avg,total}`
     */
    minMaxAvg(): MinMaxAvgTotal;
    /**
     *
     * @param sortStyle Sorting style (default: _value_, ie. count)
     * @returns Sorted array of [key,frequency]
     */
    entriesSorted(sortStyle?: `value` | `valueReverse` | `key` | `keyReverse`): ReadonlyArray<KeyValue>;
    /**
     *
     * @param values Values to add. Fires _change_ event after adding item(s)
     */
    add(...values: V[]): void;
}
/**
 * Creates a FrequencyMutable
 * @inheritdoc FrequencyMutable
 * @template V Data type of items
 * @param keyString Function to generate keys for items. If not specified, uses JSON.stringify
 * @returns
 */
declare const frequencyMutable: <V>(keyString?: ToString<V> | undefined) => FrequencyMutable<V>;

/**
 * A moving average calculator (exponential weighted moving average) which does not keep track of
 * previous samples. Less accurate, but uses less system resources.
 *
 * The `scaling` parameter determines smoothing. A value of `1` means that
 * the latest value is used as the average - that is, no smoothing. Higher numbers
 * introduce progressively more smoothing by weighting the accumulated prior average more heavily.
 *
 * `add()` adds a new value and returns the calculated average.
 *
 * ```
 * const ma = movingAverageLight(); // default scaling of 3
 * ma.add(50);  // 50
 * ma.add(100); // 75
 * ma.add(75);  // 75
 * ma.add(0);   // 50
 * ```
 *
 * Note that the final average of 50 is pretty far from the last value of 0. To make it more responsive,
 * we could use a lower scaling factor: `movingAverageLight(2)`. This yields a final average of `37.5` instead.
 *
 * Use `clear()` to reset the moving average, or `compute()` to get the current value without adding.
 * @param scaling Scaling factor. 1 is no smoothing. Default: 3
 * @returns {@link MovingAverage}
 */
declare const movingAverageLight: (scaling?: number) => MovingAverage;
/**
 * Creates a moving average for a set number of `samples`.
 *
 * Moving average are useful for computing the average over a recent set of numbers.
 * A lower number of samples produces a computed value that is lower-latency yet more jittery.
 * A higher number of samples produces a smoother computed value which takes longer to respond to
 * changes in data.
 *
 * Sample size is considered with respect to the level of latency/smoothness trade-off, and also
 * the rate at which new data is added to the moving average.
 *
* `add` adds a number and returns the computed average. Call `compute` to
 * get the average without adding a new value.
 *
 * ```js
 * const ma = movingAverage(10);
 * ma.add(10); // 10
 * ma.add(5);  // 7.5
 * ```
 *
 * `clear` clears the average.
 *
 * A weighting function can be provided to shape how the average is
 * calculated - eg privileging the most recent data over older data.
 * It uses `Arrays.averageWeighted` under the hood.
 *
 * ```js
 * // Give more weight to data in middle of sampling window
 * const ma = movingAverage(100, Easings.gaussian());
 * ```
 *
 * Because it keeps track of `samples` previous data, there is a memory impact. A lighter version is {@link movingAverageLight} which does not keep a buffer of prior data, but can't be as easily fine-tuned.
 * @param samples Number of samples to compute average from
 * @param weightingFn Optional weighting function
 * @returns
 */
declare const movingAverage: (samples?: number, weightingFn?: ((v: number) => number) | undefined) => MovingAverage;
/**
 * Moving average.
 * Create via {@link movingAverage} or {@link movingAverageLight}.
 */
declare type MovingAverage = {
    /**
     * Clear data
     */
    clear(): void;
    /**
     * Returns current average
     */
    compute(): number;
    /**
     * Adds a value, returning new average
     * @param v Value to add
     */
    add(v: number): number;
};

/**
 * A `Tracker` that tracks interval between calls to `mark()`
 *
 * @export
 * @class IntervalTracker
 * @extends {ValueTracker}
 */
declare class IntervalTracker extends NumberTracker {
    lastMark: number;
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
declare const intervalTracker: (id: string, opts: Opts) => IntervalTracker;

declare class TrackedPointMap extends TrackedValueMap<Point> {
    constructor(opts: Opts);
}
declare const pointsTracker: (opts: Opts) => TrackedPointMap;

declare const index_Normalise: typeof Normalise;
declare const index_numberTracker: typeof numberTracker;
declare const index_intervalTracker: typeof intervalTracker;
declare const index_pointsTracker: typeof pointsTracker;
type index_FrequencyMutable<V> = FrequencyMutable<V>;
declare const index_FrequencyMutable: typeof FrequencyMutable;
declare const index_frequencyMutable: typeof frequencyMutable;
declare const index_movingAverageLight: typeof movingAverageLight;
declare const index_movingAverage: typeof movingAverage;
type index_MovingAverage = MovingAverage;
declare namespace index {
  export {
    index_Normalise as Normalise,
    index_numberTracker as numberTracker,
    index_intervalTracker as intervalTracker,
    index_pointsTracker as pointsTracker,
    index_FrequencyMutable as FrequencyMutable,
    index_frequencyMutable as frequencyMutable,
    index_movingAverageLight as movingAverageLight,
    index_movingAverage as movingAverage,
    index_MovingAverage as MovingAverage,
  };
}

export { FrequencyMutable as F, MovingAverage as M, Normalise as N, intervalTracker as a, movingAverage as b, frequencyMutable as f, index as i, movingAverageLight as m, pointsTracker as p };
