import { M as MinMaxAvgTotal } from './MinMaxAvg-bf5430b4.js';
import { T as ToString } from './Util-42bd6b26.js';
import { S as SimpleEventEmitter } from './Events-f066e560.js';
import { a as KeyValue, P as Primitive } from './KeyValue-f5a637ea.js';
import { N as NumberTracker, T as TrackedValueOpts, a as TrackerBase, b as TimestampedObject, c as TrackedValueMap, d as NumberTrackerResults, e as Timestamped, n as numberTracker } from './NumberTracker-ca200195.js';
import { P as PointRelationResult, a as Point, b as PointRelation, c as PolyLine, L as Line, R as Rect } from './Point-b43bb217.js';
import { C as Coord } from './Polar-3e0dedb0.js';
import { I as Interval } from './index-c57a52c9.js';
import { I as IMapImmutable } from './index-09f7f675.js';
import { L as LogSet } from './Debug-aa84bc8f.js';

/**
 * Normalises numbers, adjusting min/max as new values are processed.
 * Normalised return values will be in the range of 0-1 (inclusive).
 *
 * [Read more in the docs](https://clinth.github.io/ixfx-docs/data/normalising/)
 *
 * @example
 * ```js
 * import {Normalise} from 'https://unpkg.com/ixfx/dist/data.js'
 * const s = Normalise.stream();
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
 * const s = Normalise.stream();
 * s(5); // 1, because it's the highest seen
 *
 * // With priming:
 * const s = Normalise.stream(0, 10);
 * s(5); // 0.5, because we're expecting range 0-10
 * ```
 *
 * Note that if a value exceeds the default range, normalisation adjusts.
 * Errors are thrown if min/max defaults are NaN or if one attempts to
 * normalise NaN.
 * @returns
 */
declare const stream: (minDefault?: number, maxDefault?: number) => (v: number) => number;
/**
 * Normalises an array. By default uses the actual min/max of the array
 * as the normalisation range. [Read more in the docs](https://clinth.github.io/ixfx-docs/data/normalising/)
 *
 * ```js
 * import {Normalise} from 'https://unpkg.com/ixfx/dist/data.js'
 * // Yields: [0.5, 0.1, 0.0, 0.9, 1]
 * Normalise.array([5,1,0,9,10]);
 * ```
 *
 * `minForced` and/or `maxForced` can
 * be provided to use an arbitrary range.
 * ```js
 * // Forced range 0-100
 * // Yields: [0.05, 0.01, 0.0, 0.09, 0.10]
 * Normalise.array([5,1,0,9,10], 0, 100);
 * ```
 *
 * Return values are clamped to always be 0-1, inclusive.
 *
 * @param values Values
 * @param minForced If provided, this will be min value used
 * @param maxForced If provided, this will be the max value used
 */
declare const array$1: (values: readonly number[], minForced?: number, maxForced?: number) => number[];

declare const Normalise_stream: typeof stream;
declare namespace Normalise {
  export {
    array$1 as array,
    Normalise_stream as stream,
  };
}

type FrequencyEventMap = {
    readonly change: void;
};
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
 * Frequency keeps track of how many times a particular value is seen, but
 * unlike a Map it does not store the data. By default compares
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
 * Uses the same algorithm as {@link movingAverageLight}, but adds values automatically if
 * nothing has been manually added.
 *
 * This is useful if you are averaging something based on events. For example calculating the
 * average speed of the pointer. If there is no speed, there is no pointer move event. Using
 * this function, `value` is added at a rate of `updateRateMs`. This timer is reset
 * every time a value is added, a bit like the `debounce` function.
 * @param updateRateMs
 * @param value
 * @param scaling
 * @returns
 */
declare const movingAverageTimed: (updateRateMs?: number, value?: number, scaling?: number) => MovingAverage;
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
 * import { movingAverage } from 'https://unpkg.com/ixfx/dist/data.js';
 *
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
 * import { movingAverage } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * // Give more weight to data in middle of sampling window
 * const ma = movingAverage(100, Easings.gaussian());
 * ```
 *
 * Because it keeps track of `samples` previous data, there is a memory impact. A lighter version is {@link movingAverageLight} which does not keep a buffer of prior data, but can't be as easily fine-tuned.
 * @param samples Number of samples to compute average from
 * @param weighter Optional weighting function
 * @returns
 */
declare const movingAverage: (samples?: number, weighter?: ((v: number) => number) | undefined) => MovingAverage;
/**
 * Moving average.
 * Create via {@link movingAverage} or {@link movingAverageLight}.
 */
type MovingAverage = {
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
    dispose(): void;
    get isDisposed(): boolean;
};
/**
 * Noise filtering
 *
 * Algorithm: https://gery.casiez.net/1euro/
 *
 * Based on [Jaan Tollander de Balsch's implementation](https://jaantollander.com/post/noise-filtering-using-one-euro-filter/)
 * @param cutoffMin
 * @param speedCoefficient
 * @param cutoffDefault
 */
declare const noiseFilter: (cutoffMin?: number, speedCoefficient?: number, cutoffDefault?: number) => (value: number, timestamp?: number) => number;

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
 * import { intervalTracker } from 'https://unpkg.com/ixfx/dist/data.js';
 *
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
 * t.min / t.max
 * ```
 *
 * Interval tracker can automatically reset after a given number of samples:
 *
 * ```
 * // Reset after 100 samples
 * const t = intervalTracker({ resetAfterSamples: 100} );
 * ```
 * @param opts Options for tracker
 * @returns New interval tracker
 */
declare const intervalTracker: (opts?: TrackedValueOpts) => IntervalTracker;

/**
 * A tracked value of type `V`.
 */
declare abstract class ObjectTracker<V extends object, SeenResultType> extends TrackerBase<V, SeenResultType> {
    values: Array<TimestampedObject<V>>;
    constructor(opts?: TrackedValueOpts);
    onTrimmed(): void;
    /**
     * Reduces size of value store to `limit`. Returns
     * number of remaining items
     * @param limit
     */
    trimStore(limit: number): number;
    /**
     * Allows sub-classes to be notified when a reset happens
     * @ignore
     */
    onReset(): void;
    /**
     * Tracks a value
     * @ignore
     */
    filterData(p: Array<V> | Array<TimestampedObject<V>>): Array<TimestampedObject<V>>;
    /**
     * Last seen value. If no values have been added, it will return the initial value
     */
    get last(): TimestampedObject<V>;
    /**
     * Returns the initial value
     */
    get initial(): TimestampedObject<V> | undefined;
    /**
     * Returns number of recorded values (includes the initial value in the count)
     */
    get size(): number;
    /**
     * Returns the elapsed time, in milliseconds since the initial value
     */
    get elapsed(): number;
}

/**
 * Information about seen points
 */
type PointTrack = PointRelationResult & {};
/**
 * Results of point tracking
 */
type PointTrackerResults = {
    /**
     * Relation of last point to previous point
     */
    readonly fromLast: PointTrack;
    /**
     * Relation of last point to initial point.
     *
     * When the tracker is reset or resizes (eg. if it reaches its capacity), the
     * initial point will be the first new point. Thus, the initial point
     * always maintains some time horizon
     */
    readonly fromInitial: PointTrack;
    readonly values: ReadonlyArray<Point>;
};
/**
 * Point tracker. Create via `pointTracker()`.
 *
 */
declare class PointTracker extends ObjectTracker<Point, PointTrackerResults> {
    /**
     * Function that yields the relation from initial point
     */
    initialRelation: PointRelation | undefined;
    /**
     * Last result
     */
    lastResult: PointTrackerResults | undefined;
    constructor(opts?: TrackedValueOpts);
    onTrimmed(): void;
    /**
     * Returns the last x coord
     */
    get x(): number;
    /**
     * Returns the last y coord
     */
    get y(): number;
    /**
     * @ignore
     */
    onReset(): void;
    seenEvent(p: PointerEvent): PointTrackerResults;
    /**
     * Tracks a point, returning data on its relation to the
     * initial point and the last received point.
     *
     * Use {@link seenEvent} to track a raw `PointerEvent`.
     *
     * @param p Point
     */
    computeResults(p: Array<TimestampedObject<Point>>): PointTrackerResults;
    /**
     * Returns a polyline representation of stored points.
     * Returns an empty array if points were not saved, or there's only one.
     */
    get line(): PolyLine;
    /**
     * Returns a vector of the initial/last points of the tracker.
     * Returns as a polar coordinate
     */
    get vectorPolar(): Coord;
    /**
     * Returns a vector of the initial/last points of the tracker.
     * Returns as a Cartesian coordinate
     */
    get vectorCartesian(): Point;
    /**
     * Returns a line from initial point to last point.
     *
     * If there are less than two points, Lines.Empty is returned
     */
    get lineStartEnd(): Line;
    /**
     * Returns distance from latest point to initial point.
     * If there are less than two points, zero is returned.
     *
     * This is the direct distance, not the accumulated length.
     * @returns Distance
     */
    distanceFromStart(): number;
    /**
     * Difference between last point and the initial point, calculated
     * as a simple subtraction of x & y.
     *
     * `Points.Placeholder` is returned if there's only one point so far.
     */
    difference(): Point;
    /**
     * Returns angle (in radians) from latest point to the initial point
     * If there are less than two points, undefined is return.
     * @returns Angle in radians
     */
    angleFromStart(): number | undefined;
    /**
     * Returns the total length of accumulated points.
     * Returns 0 if points were not saved, or there's only one
     */
    get length(): number;
}
/**
 * A {@link TrackedValueMap} for points. Uses {@link PointTracker} to
 * track added values.
 */
declare class TrackedPointMap extends TrackedValueMap<Point, PointTracker, PointTrackerResults> {
    constructor(opts?: TrackedValueOpts);
    /**
     * Track a PointerEvent
     * @param event
     */
    seenEvent(event: PointerEvent): Promise<Array<PointTrackerResults>>;
}
/**
 * Track several named points over time, eg a TensorFlow body pose point.
 * Call `seen()` to track a point. Mutable. If you want to compare
 * a single coordinate with a reference coordinate,  may be a better choice.
 *
 * See also:
 * * [Geometry.Points.relation](Geometry.Points.relation.html): Compute relation info between two points
 * * [Data.pointTracker](Data.pointTracker-1.html): Track relation between points over time
 * * [Guide to Trackers](https://clinth.github.io/ixfx-docs/data/trackers/)
 *
 * Basic usage
 * ```js
 * import { pointsTracker } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * const pt = pointsTracker();
 *
 * // Track a point under a given id
 * document.addEventListener(`pointermove`, e => {
 *  const info = await pt.seen(e.pointerId, { x: e.x, y: e.y });
 *  // Yields some info on relation of the point to initial value
 * });
 * ```
 *
 * Do something with last values for all points
 * ```js
 * const c = Points.centroid(...Array.from(pt.last()));
 * ```
 *
 * More functions...
 * ```js
 * pt.size;       // How many named points are being tracked
 * pt.delete(id); // Delete named point
 * pt.reset();    // Clear data
 * ```
 *
 * Accessing by id:
 *
 * ```js
 * pt.get(id);  // Get named point (or _undefined_)
 * pt.has(id);  // Returns true if id exists
 * ```
 *
 * Iterating over data
 *
 * ```js
 * pt.trackedByAge(); // Iterates over tracked points, sorted by age (oldest first)
 * pt.tracked(); // Tracked values
 * pt.ids();     // Iterator over ids
 *
 * // Last received value for each named point
 * pt.last();
 *
 * pt.initialValues(); // Iterator over initial values for each point
 * ```
 *
 * You can work with 'most recently updated' points:
 *
 * ```js
 * // Iterates over points, sorted by age (oldest first)
 * pt.valuesByAge();
 * ```
 *
 * Options:
 * * `id`: Id of this tracker. Optional
 * * `sampleLimit`: How many samples to store
 * * `storeIntermediate`: If _true_, all points are stored internally
 * * `resetAfterSamples`: If set above 0, it will automatically reset after the given number of samples have been seen
 * @param opts
 * @returns
 */
declare const pointsTracker: (opts?: TrackedValueOpts) => TrackedPointMap;
/**
 * A tracked point. Create via {@link pointTracker}. Mutable. Useful for monitoring how
 * it changes over time. Eg. when a pointerdown event happens, to record the start position and then
 * track the pointer as it moves until pointerup.
 *
 * See also
 * * [Playground](https://clinth.github.io/ixfx-play/data/point-tracker/index.html)
 * * {@link pointsTracker}: Track several points, useful for multi-touch.
 * * [Guide to Trackers](https://clinth.github.io/ixfx-docs/data/trackers/)
 *
 * ```js
 * import { pointTracker } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * // Create a tracker on a pointerdown
 * const t = pointTracker();
 *
 * // ...and later, tell it when a point is seen (eg. pointermove)
 * const nfo = t.seen({x: evt.x, y:evt.y});
 * // nfo gives us some details on the relation between the seen point, the start, and points inbetween
 * // nfo.angle, nfo.centroid, nfo.speed etc.
 * ```
 *
 * Compute based on last seen point
 * ```js
 * t.angleFromStart();
 * t.distanceFromStart();
 * t.x / t.y
 * t.length; // Total length of accumulated points
 * t.elapsed; // Total duration since start
 * t.lastResult; // The PointSeenInfo for last seen point
 * ```
 *
 * Housekeeping
 * ```js
 * t.reset(); // Reset tracker
 * ```
 *
 * By default, the tracker only keeps track of the initial point and
 * does not store intermediate 'seen' points. To use the tracker as a buffer,
 * set `storeIntermediate` option to _true_.
 *
 * ```js
 * // Keep only the last 10 points
 * const t = pointTracker({
 *  sampleLimit: 10
 * });
 *
 * // Store all 'seen' points
 * const t = pointTracker({
 *  storeIntermediate: true
 * });
 *
 * // In this case, the whole tracker is automatically
 * // reset after 10 samples
 * const t = pointTracker({
 *  resetAfterSamples: 10
 * })
 * ```
 *
 * When using a buffer limited by `sampleLimit`, the 'initial' point will be the oldest in the
 * buffer, not actually the very first point seen.
 */
declare const pointTracker: (opts?: TrackedValueOpts) => PointTracker;

/**
 * Clamps a value between min and max (both inclusive)
 * Defaults to a 0-1 range, useful for percentages.
 *
 * @example Usage
 * ```js
 * // 0.5 - just fine, within default of 0 to 1
 * clamp(0.5);
 * // 1 - above default max of 1
 * clamp(1.5);
 * // 0 - below range
 * clamp(-50, 0, 100);
 * // 50 - within range
 * clamp(50, 0, 50);
 * ```
 *
 * For clamping integer ranges, consider {@link clampIndex }
 * For clamping `{ x, y }` points, consider {@link Geometry.Points.clamp | Geometry.Points.clamp}.
 * For clamping bipolar values: {@link Bipolar.clamp}
 * @param value Value to clamp
 * @param Minimum value (inclusive)
 * @param Maximum value (inclusive)
 * @returns Clamped value
 */
declare const clamp$1: (value: number, min?: number, max?: number) => number;
/**
 * Clamps integer `v` between 0 (inclusive) and array length or length (exclusive).
 * Returns value then will always be at least zero, and a valid array index.
 *
 * @example Usage
 * ```js
 * // Array of length 4
 * const myArray = [`a`, `b`, `c`, `d`];
 * clampIndex(0, myArray);    // 0
 * clampIndex(4, myArray);    // 3
 * clampIndex(-1, myArray);   // 0
 *
 * clampIndex(5, 3); // 2
 * ```
 *
 * Throws an error if `v` is not an integer.
 *
 * For some data it makes sense that data might 'wrap around' if it exceeds the
 * range. For example rotation angle. Consider using {@link wrap} for this.
 *
 * @param v Value to clamp (must be an interger)
 * @param arrayOrLength Array, or length of bounds (must be an integer)
 * @returns Clamped value, minimum will be 0, maximum will be one less than `length`.
 */
declare const clampIndex: (v: number, arrayOrLength: number | ReadonlyArray<any>) => number;

/**
 * Scales `v` from an input range to an output range (aka `map`)
 *
 * For example, if a sensor's useful range is 100-500, scale it to a percentage:
 *
 * ```js
 * import { scale } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * scale(sensorReading, 100, 500, 0, 1);
 * ```
 *
 * `scale` defaults to a percentage-range output, so you can get away with:
 * ```js
 * scale(sensorReading, 100, 500);
 * ```
 *
 * If `v` is outside of the input range, it will likewise be outside of the output range.
 * Use {@link scaleClamped} to clip value to range.
 *
 * If inMin and inMax are equal, outMax will be returned.
 *
 * An easing function can be provided for non-linear scaling. In this case
 * the input value is 'pre scaled' using the function before it is applied to the
 * output range.
 *
 * ```js
 * scale(sensorReading, 100, 500, 0, 1, Easings.gaussian());
 * ```
 * @param v Value to scale
 * @param inMin Input minimum
 * @param inMax Input maximum
 * @param outMin Output minimum. If not specified, 0
 * @param outMax Output maximum. If not specified, 1
 * @param easing Easing function
 * @returns Scaled value
 */
declare const scale$1: (v: number, inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: ((v: number) => number) | undefined) => number;
/**
 * Returns a scaling function
 * @param inMin Input minimum
 * @param inMax Input maximum
 * @param outMin Output minimum. If not specified, 0
 * @param outMax Output maximum. If not specified, 1
 * @param easing Easing function
 * @returns
 */
declare const scaler: (inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: ((v: number) => number) | undefined) => (v: number) => number;
/**
 * As {@link scale}, but result is clamped to be
 * within `outMin` and `outMax`.
 *
 * @param v
 * @param inMin
 * @param inMax
 * @param outMin 1 by default
 * @param outMax 0 by default d
 * @param easing
 * @returns
 */
declare const scaleClamped: (v: number, inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: ((v: number) => number) | undefined) => number;
/**
 * Scales an input percentage to a new percentage range.
 *
 * If you have an input percentage (0-1), `scalePercentageOutput` maps it to an
 * _output_ percentage of `outMin`-`outMax`.
 *
 * ```js
 * import { scalePercentages } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * // Scales 50% to a range of 0-10%
 * scalePercentages(0.5, 0, 0.10); // 0.05 - 5%
 * ```
 *
 * An error is thrown if any parameter is outside of percentage range. This added
 * safety is useful for catching bugs. Otherwise, you could just as well call
 * `scale(percentage, 0, 1, outMin, outMax)`.
 *
 * If you want to scale some input range to percentage output range, just use `scale`:
 * ```js
 * import { scale } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * // Yields 0.5
 * scale(2.5, 0, 5);
 * ```
 * @param percentage Input value, within percentage range
 * @param outMin Output minimum, between 0-1
 * @param outMax Output maximum, between 0-1
 * @returns Scaled value between outMin-outMax.
 */
declare const scalePercentages: (percentage: number, outMin: number, outMax?: number) => number;
/**
 * Scales an input percentage value to an output range
 * If you have an input percentage (0-1), `scalePercent` maps it to an output range of `outMin`-`outMax`.
 * ```js
 * import { scalePercent } from 'https://unpkg.com/ixfx/dist/data.js';
 * scalePercent(0.5, 10, 20); // 15
 * ```
 *
 * @see {@link scalerPercent} Returns a function
 * @param v Value to scale
 * @param outMin Minimum for output
 * @param outMax Maximum for output
 * @returns
 */
declare const scalePercent: (v: number, outMin: number, outMax: number) => number;
/**
 * Returns a function that scales an input percentage value to an output range
 * @see {@link scalePercent} Calculates value
 * @param outMin
 * @param outMax
 * @returns Function that takes a single argument
 */
declare const scalerPercent: (outMin: number, outMax: number) => (v: number) => number;

/**
 * Flips a percentage-scale number: `1 - v`.
 *
 * The utility of this function is that it sanity-checks
 * that `v` is in 0..1 scale.
 *
 * ```js
 * flip(1);   // 0
 * flip(0.5); // 0.5
 * flip(0);   // 1
 * ```
 * @param v
 * @returns
 */
declare const flip: (v: number | NumberFunction) => number;

type SignalError = {
    type: `error`;
    source: string;
    message: string;
    stack: unknown;
};
type Signal = {
    type: string;
    source: string;
};
type SignalClose = {
    type: `closed`;
    source: string;
};
type SigalTrigger = {
    type: `trigger`;
    source: string;
};
declare const close: (source: string) => InOutSignalClosed;
declare const error: (message: string, source: string, stack: unknown) => InOutSignalError;
type InOut<V> = Readonly<[value: V | undefined, signal: Signal | undefined]>;
type InOutSignal = Readonly<[value: undefined, signal: Signal]>;
type InOutValue<V> = [value: V, signal: undefined];
type InOutSignalClosed = [value: undefined, signal: SignalClose];
type InOutSignalError = [value: undefined, signal: SignalError];
type InOutEmpty = Readonly<[undefined, undefined]>;
declare const emptyInOut: InOutEmpty;
declare function isSignal<V>(v: InOut<V>): v is InOutSignal;
declare function isValue<V>(v: InOut<V>): v is InOutValue<V>;
declare function isError(v: InOut<any>): v is InOutSignalError;
declare function isClosed<V>(v: InOut<V>): v is InOutSignalClosed;
declare function isEmpty(v: InOut<any>): v is InOutEmpty;

type Signal$1_InOut<V> = InOut<V>;
type Signal$1_InOutEmpty = InOutEmpty;
type Signal$1_InOutSignal = InOutSignal;
type Signal$1_InOutSignalClosed = InOutSignalClosed;
type Signal$1_InOutSignalError = InOutSignalError;
type Signal$1_InOutValue<V> = InOutValue<V>;
type Signal$1_SigalTrigger = SigalTrigger;
type Signal$1_Signal = Signal;
type Signal$1_SignalClose = SignalClose;
type Signal$1_SignalError = SignalError;
declare const Signal$1_close: typeof close;
declare const Signal$1_emptyInOut: typeof emptyInOut;
declare const Signal$1_error: typeof error;
declare const Signal$1_isClosed: typeof isClosed;
declare const Signal$1_isEmpty: typeof isEmpty;
declare const Signal$1_isError: typeof isError;
declare const Signal$1_isSignal: typeof isSignal;
declare const Signal$1_isValue: typeof isValue;
declare namespace Signal$1 {
  export {
    Signal$1_InOut as InOut,
    Signal$1_InOutEmpty as InOutEmpty,
    Signal$1_InOutSignal as InOutSignal,
    Signal$1_InOutSignalClosed as InOutSignalClosed,
    Signal$1_InOutSignalError as InOutSignalError,
    Signal$1_InOutValue as InOutValue,
    Signal$1_SigalTrigger as SigalTrigger,
    Signal$1_Signal as Signal,
    Signal$1_SignalClose as SignalClose,
    Signal$1_SignalError as SignalError,
    Signal$1_close as close,
    Signal$1_emptyInOut as emptyInOut,
    Signal$1_error as error,
    Signal$1_isClosed as isClosed,
    Signal$1_isEmpty as isEmpty,
    Signal$1_isError as isError,
    Signal$1_isSignal as isSignal,
    Signal$1_isValue as isValue,
  };
}

type OutletCallback<V> = (value: InOut<V>) => void;
type SetOutletOptions = {
    /**
     * If true, the last value of the pipe (if available) is sent to the outlet when connected.
     */
    primeOutlet?: boolean;
};
type Readable<V> = {
    setOutlet: (callback: OutletCallback<V> | Writeable<V>, setOpts?: SetOutletOptions) => void;
    getOutlet: () => OutletCallback<V> | undefined;
    last: () => V | undefined;
    signal: (signal: Signal) => void;
};
type Finite = {
    isClosed: () => boolean;
};
declare function isFinitePipe(p: Readable<any> | Writeable<any> | Finite): p is Finite;
type Writeable<V> = {
    inlet: (value: InOut<V>) => void;
};
type PipeBidi<V> = Readable<V> & Writeable<V> & Finite;
type PipeTransform<InputType, OutputType> = Readable<OutputType> & Writeable<InputType> & Finite;
type RxNumberRw = PipeBidi<number>;

type OnePipeOp<In, Out> = {
    _type: `One`;
} & ((input: Readable<In>) => Readable<Out>);
type OneToManyOp<In, Out> = {
    _type: `OneToMany`;
} & ((input: Readable<In>) => Array<Readable<Out>>);
type ManyToOneOp<In, Out> = {
    _type: `ManyToOne`;
} & ((input: Array<Readable<In>>) => Readable<Out>);
declare function isOnePipeOp<In, Out>(v: Op<In, Out>): v is OnePipeOp<In, Out>;
type Op<In, Out> = OnePipeOp<In, Out> | OneToManyOp<In, Out>;
type OpFactory<In, Out> = (args: any) => Op<In, Out>;
type TakeOptions = {
    length: number;
    keepOpen?: boolean;
};
/**
 * Only allow a certain number of items from source through
 *
 * eg. let through the first five items.
 *
 * By default, output pipe will close when limit is reached.
 * Signals with no values do not count towards limit, but are sent to output.
 * @param p
 * @param options
 * @returns
 */
declare const take$1: <V>(options: TakeOptions) => OnePipeOp<V, V>;
/**
 * Passes every value from `p` through `monitorFunction`.
 * Values continue through
 * to returned output pipe.
 * @param p
 * @param monitorFunction
 * @param initialState
 * @returns
 */
declare const monitor: <V, State>(monitorFunction: (value: readonly [value: V | undefined, signal: Signal | undefined], state: State) => State, initialState: State) => OnePipeOp<V, V>;
/**
 * Streams values from `p` where `filterPredicate` returns true
 * @param p
 * @param filterPredicate
 * @returns
 */
declare const filter$1: <V>(filterPredicate: (v: V) => boolean) => OnePipeOp<V, V>;
declare const transform$1: <In, Out>(transformer: (v: In) => Out) => OnePipeOp<In, Out>;
type EmitOptions = {
    when: `any` | `emit-signal` | `signal`;
    passIfNotHandled?: boolean;
};
declare const chunk$1: <In>(size: RxNumberRw | number, returnRemainders?: boolean) => OnePipeOp<In, In[]>;
/**
 * Captures a sliding window of values from the source
 * @param length
 * @returns
 */
declare const window: <In>(length: RxNumberRw | number) => OnePipeOp<In, In[]>;
declare const emit: <In, Out>(compute: () => Out, options: EmitOptions) => OnePipeOp<In, Out>;
/**
 * Splits `p` into two pipes. `a` is when `filterPredicate` returns true, `b` is false.
 * @param p
 * @param filterPredicate
 * @returns
 */
declare const filterAB: <V>(filterPredicate: (v: V) => boolean) => OneToManyOp<V, V>;
/**
 * All values from `p` are sent to `regularPipe`.
 * If a value matches `filterPredicate`, it is also sent to `seenPipe`.
 * @param p
 * @param filterPredicate
 * @returns
 */
declare const filterTap: <V>(filterPredicate: (v: V) => boolean) => OneToManyOp<V, V>;
/**
 * Reduces a pipe of arrays into single values
 * using the `reducer` function.
 * @param reducer
 * @returns
 */
declare const reduce: <V>(reducer: (inputValues: V[]) => V) => OnePipeOp<V[], V>;
declare const minMaxAvgTotal: () => OnePipeOp<number, MinMaxAvgTotal>;
type SplitOptions = {
    copies?: number;
    filterSignals?: boolean;
};
/**
 * Splits output of `source` into n number of streams. By default two
 * copies are made, thus splitting
 *
 * Each output of `source` is copied to destination stream(s).
 *
 * If `numberCopies` is 1, the source pipe is returned.
 *
 * Options:
 * - filterSignals: If true, does not pass signals through to split pipes. Default: false
 * @param source
 * @returns
 */
declare const split: <V>(options?: SplitOptions) => OneToManyOp<V, V>;
type SynchroniseOptions = {
    overwritePolicy?: `latest` | `first`;
    /**
     * If true (default), will keep reset and wait for the next set of synchronised results
     * If false, will exit after first batch
     */
    loop?: boolean;
};
/**
 * Waits for each pipe to emit a value, sending the combined outcome
 * as an array.
 *
 * By default:
 * - returns the latest values from each stream
 * - after all pipes have emitted a value, loops waiting for the next batch
 *
 * @param p
 */
declare const synchronise$1: <V>(opts: SynchroniseOptions) => ManyToOneOp<V, V[]>;
declare const throttle: <In>(rate: Interval) => OnePipeOp<In, In>;
type MergeValuesOptions = {
    allowUndefinedValues?: boolean;
};
/**
 * A change in any of the inputs produces a new input
 * @param pipes
 * @returns
 */
declare const mergeValues: <In, Out>(merger: (...values: (In | undefined)[]) => Out, opts: MergeValuesOptions) => ManyToOneOp<In, Out>;

type Ops_EmitOptions = EmitOptions;
type Ops_ManyToOneOp<In, Out> = ManyToOneOp<In, Out>;
type Ops_MergeValuesOptions = MergeValuesOptions;
type Ops_OnePipeOp<In, Out> = OnePipeOp<In, Out>;
type Ops_OneToManyOp<In, Out> = OneToManyOp<In, Out>;
type Ops_Op<In, Out> = Op<In, Out>;
type Ops_OpFactory<In, Out> = OpFactory<In, Out>;
type Ops_SplitOptions = SplitOptions;
type Ops_SynchroniseOptions = SynchroniseOptions;
type Ops_TakeOptions = TakeOptions;
declare const Ops_emit: typeof emit;
declare const Ops_filterAB: typeof filterAB;
declare const Ops_filterTap: typeof filterTap;
declare const Ops_isOnePipeOp: typeof isOnePipeOp;
declare const Ops_mergeValues: typeof mergeValues;
declare const Ops_minMaxAvgTotal: typeof minMaxAvgTotal;
declare const Ops_monitor: typeof monitor;
declare const Ops_reduce: typeof reduce;
declare const Ops_split: typeof split;
declare const Ops_throttle: typeof throttle;
declare const Ops_window: typeof window;
declare namespace Ops {
  export {
    Ops_EmitOptions as EmitOptions,
    Ops_ManyToOneOp as ManyToOneOp,
    Ops_MergeValuesOptions as MergeValuesOptions,
    Ops_OnePipeOp as OnePipeOp,
    Ops_OneToManyOp as OneToManyOp,
    Ops_Op as Op,
    Ops_OpFactory as OpFactory,
    Ops_SplitOptions as SplitOptions,
    Ops_SynchroniseOptions as SynchroniseOptions,
    Ops_TakeOptions as TakeOptions,
    chunk$1 as chunk,
    Ops_emit as emit,
    filter$1 as filter,
    Ops_filterAB as filterAB,
    Ops_filterTap as filterTap,
    Ops_isOnePipeOp as isOnePipeOp,
    Ops_mergeValues as mergeValues,
    Ops_minMaxAvgTotal as minMaxAvgTotal,
    Ops_monitor as monitor,
    Ops_reduce as reduce,
    Ops_split as split,
    synchronise$1 as synchronise,
    take$1 as take,
    Ops_throttle as throttle,
    transform$1 as transform,
    Ops_window as window,
  };
}

/**
 * Functions which operate on existing pipes
 */

/**
 * Inserts `insertPipe` between output of `sourcePipe` and its existing downstream pipe.
 * Assumes `sourcePipe` is already connected to something - if it's not, it's the same as `connect`.
 * @param sourcePipe
 * @param interceptingPipe
 */
declare const insert: <V>(sourcePipe: Readable<V>, insertPipe: PipeBidi<V>) => void;
/**
 * Send the same value to several pipes
 * @param value
 * @param pipes
 */
declare const inlet: <V>(value: readonly [value: V | undefined, signal: Signal | undefined], ...pipes: Writeable<V>[]) => void;
declare const signal: (pipe: Writeable<any>, signal: Signal) => void;

declare const Functions_inlet: typeof inlet;
declare const Functions_insert: typeof insert;
declare const Functions_signal: typeof signal;
declare namespace Functions {
  export {
    Functions_inlet as inlet,
    Functions_insert as insert,
    Functions_signal as signal,
  };
}

declare function asPromise$1<V>(p: Readable<V>): Promise<V>;
declare function asAsyncIterable<V>(p: Readable<V>): AsyncGenerator<V>;
type AsArrayOptions = {
    maximumValues?: number;
};
/**
 * Gather output of readable pipe into an array. Must use await
 * ```js
 * const array = await asArray(pipe);
 * ```
 *
 * Options:
 * - maximumValues: by default returns all values. Set a value to return early.
 * @param pipe
 * @returns
 */
declare const asArray$1: <V>(pipe: Readable<V>, options?: AsArrayOptions) => Promise<V[]>;
declare const basic: <V>(p: Readable<V>, initialFire?: boolean) => {
    readonly value: V | undefined;
    on(callback: (value: V | undefined, signal?: Signal) => unknown): void;
};
declare const basicBidi: <V>(p: PipeBidi<V>) => {
    value: V | undefined;
    on(callback: (value: V | undefined, signal?: Signal) => unknown): void;
};

type As_AsArrayOptions = AsArrayOptions;
declare const As_asAsyncIterable: typeof asAsyncIterable;
declare const As_basic: typeof basic;
declare const As_basicBidi: typeof basicBidi;
declare namespace As {
  export {
    As_AsArrayOptions as AsArrayOptions,
    asArray$1 as asArray,
    As_asAsyncIterable as asAsyncIterable,
    asPromise$1 as asPromise,
    As_basic as basic,
    As_basicBidi as basicBidi,
  };
}

type FeedOptions = {
    interval?: Interval;
    keepOpen?: boolean;
    maximumValues?: number;
};
declare const feedIterable: <V>(destination: Writeable<V>, iterator: Iterator<V, any, undefined>, options?: FeedOptions) => void;
declare const feedGenerator: <V>(destination: Writeable<V>, generator: Generator<V, any, unknown> | Iterable<V>, options?: FeedOptions) => Promise<void>;
declare const feedTrigger: <V>(p: Writeable<V>) => (value: readonly [value: V | undefined, signal: Signal | undefined]) => void;
type FeedPipesOptions = {
    close?: `any` | `all` | `never`;
};
/**
 * Read values from `sourcePipes` to `destination`.
 *
 * By default closes destination if all sources close.
 *
 * Close policies
 * - any: if any source pipe closes, destination closes and all other reading stops
 * - all: destination closes when all source pipes close
 * - never: close signals are filtered
 * @param desination
 * @param sourcePipes
 * @param options
 */
declare const feedPipes: <V>(desination: Writeable<V>, sourcePipes: Readable<V>[], options?: FeedPipesOptions) => void;

type Feed_FeedOptions = FeedOptions;
type Feed_FeedPipesOptions = FeedPipesOptions;
declare const Feed_feedGenerator: typeof feedGenerator;
declare const Feed_feedIterable: typeof feedIterable;
declare const Feed_feedPipes: typeof feedPipes;
declare const Feed_feedTrigger: typeof feedTrigger;
declare namespace Feed {
  export {
    Feed_FeedOptions as FeedOptions,
    Feed_FeedPipesOptions as FeedPipesOptions,
    Feed_feedGenerator as feedGenerator,
    Feed_feedIterable as feedIterable,
    Feed_feedPipes as feedPipes,
    Feed_feedTrigger as feedTrigger,
  };
}

/**
 * Creates a pipe, reading `values` into it
 * @param values
 * @returns
 */
declare const array: <V>(values: V[], options?: FeedOptions) => Readable<V>;
declare const callback: <ResultValue, EventArguments>(computeValue: (data: EventArguments) => ResultValue) => [pipe: Readable<ResultValue>, listener: (args: EventArguments) => unknown];
/**
 * Emits a value when a listener is called
 *
 * @example Emits _true_ every click happens
 * ```js
 * const [pipe,listener] = fromTrigger(true);
 * document.addEventListener(`click`, listener);
 * ```
 *
 * @example Emits {width,height} every time resize happens
 * ```js
 * const computeValue = () => ({ width: window.innerWidth, height: window.innerHeight });
 * const [pipe,listener] = fromTrigger(computeValue);
 * document.addEventListener(`resize`, listener);
 * ```
 * @param computeValue Function that returns a value, or the value to emit
 * @param opts
 * @returns
 */
declare const trigger: <ResultValue extends object | Primitive>(computeValue: ResultValue | (() => ResultValue), opts?: BidiOptions<ResultValue>) => [pipe: Readable<ResultValue>, listener: () => unknown];
declare const number: (initialValue: RxNumberRw | number) => RxNumberRw;
declare const event: <V extends Event>(eventObject: EventTarget, eventName: string) => Readable<V>;
/**
 * Join all the input pipes into one new output pipe.
 *
 * If all input pipes close, output pipe also closes.
 * @param inputPipes
 * @returns
 */
declare const pipes: (...inputPipes: Array<Readable<any>>) => PipeBidi<any>;

declare const From_array: typeof array;
declare const From_callback: typeof callback;
declare const From_event: typeof event;
declare const From_number: typeof number;
declare const From_pipes: typeof pipes;
declare const From_trigger: typeof trigger;
declare namespace From {
  export {
    From_array as array,
    From_callback as callback,
    From_event as event,
    From_number as number,
    From_pipes as pipes,
    From_trigger as trigger,
  };
}

declare const NullSink: (_: any) => void;
declare const LogSink: (value: any, signal?: Signal) => void;
type BidiOptions<V> = {
    initialValue?: V;
    primeOutlet?: boolean;
    signalHandler?: (signal: Signal) => boolean;
};
declare const bidi: <V>(opts?: BidiOptions<V>) => PipeBidi<V>;
type RxWindowOptions = {
    throttle?: Interval;
};
type ComposeArguments<In, Out> = [
    Readable<In>,
    ...Array<Op<In, Out> | Op<In, In>>
];
declare const compose: <In, Out>(pipes_0: Readable<In>, ...pipes_1: (Op<In, Out> | Op<In, In>)[]) => Writeable<In> & Readable<Out>;
declare const rxWindow: (opts?: RxWindowOptions) => {
    size: {
        readonly value: Rect | undefined;
        on(callback: (value: Rect | undefined, signal?: Signal | undefined) => unknown): void;
    };
    dispose: () => void;
};

declare const index$2_As: typeof As;
type index$2_BidiOptions<V> = BidiOptions<V>;
type index$2_ComposeArguments<In, Out> = ComposeArguments<In, Out>;
declare const index$2_Feed: typeof Feed;
type index$2_Finite = Finite;
declare const index$2_From: typeof From;
declare const index$2_LogSink: typeof LogSink;
declare const index$2_NullSink: typeof NullSink;
declare const index$2_Ops: typeof Ops;
type index$2_OutletCallback<V> = OutletCallback<V>;
type index$2_PipeBidi<V> = PipeBidi<V>;
type index$2_PipeTransform<InputType, OutputType> = PipeTransform<InputType, OutputType>;
type index$2_Readable<V> = Readable<V>;
type index$2_RxNumberRw = RxNumberRw;
type index$2_RxWindowOptions = RxWindowOptions;
type index$2_SetOutletOptions = SetOutletOptions;
type index$2_Writeable<V> = Writeable<V>;
declare const index$2_bidi: typeof bidi;
declare const index$2_compose: typeof compose;
declare const index$2_isFinitePipe: typeof isFinitePipe;
declare const index$2_rxWindow: typeof rxWindow;
declare namespace index$2 {
  export {
    index$2_As as As,
    index$2_BidiOptions as BidiOptions,
    index$2_ComposeArguments as ComposeArguments,
    index$2_Feed as Feed,
    index$2_Finite as Finite,
    Functions as Fns,
    index$2_From as From,
    index$2_LogSink as LogSink,
    index$2_NullSink as NullSink,
    index$2_Ops as Ops,
    index$2_OutletCallback as OutletCallback,
    index$2_PipeBidi as PipeBidi,
    index$2_PipeTransform as PipeTransform,
    index$2_Readable as Readable,
    index$2_RxNumberRw as RxNumberRw,
    index$2_RxWindowOptions as RxWindowOptions,
    index$2_SetOutletOptions as SetOutletOptions,
    Signal$1 as Signals,
    index$2_Writeable as Writeable,
    index$2_bidi as bidi,
    index$2_compose as compose,
    index$2_isFinitePipe as isFinitePipe,
    index$2_rxWindow as rxWindow,
  };
}

/**
 * A Generator, AsyncGenerator or IterableIterator
 */
type Gen<V> = Generator<V> | AsyncGenerator<V> | IterableIterator<V>;
type GenOrData<V> = Array<V> | Gen<V>;
type Chain<In, Out> = (input: GenOrData<In>) => AsyncGenerator<Out>;
type GenFactoryNoInput<Out> = () => AsyncGenerator<Out>;
type ChainArguments<In, Out> = [
    Chain<In, any> | GenOrData<In> | GenFactoryNoInput<Out>,
    ...Array<Chain<any, any>>,
    Chain<any, Out>
];
/**
 * Delay options
 */
type DelayOptions = {
    /**
     * Time before yielding
     */
    before?: Interval;
    /**
     * Time after yielding
     */
    after?: Interval;
};
/**
 * Add delay before/after values are emitted from the input stream.
 * @param options
 * @returns
 */
declare function delay<In>(options: DelayOptions): Chain<In, In>;
type LazyChain<In, Out> = {
    /**
     * Return the chain as a regular generator,
     * optionally providing the starting data
     * @param data
     * @returns
     */
    asGenerator: (data?: GenOrData<In>) => AsyncGenerator<Out>;
    asArray: (data?: GenOrData<In>) => Promise<Array<Out>>;
    lastOutput: (data?: GenOrData<In>) => Promise<Out | undefined>;
    firstOutput: (data?: GenOrData<In>) => Promise<Out | undefined>;
    fromFunction: (callback: () => any) => LazyChain<any, any>;
    take: (limit: number) => LazyChain<In, Out>;
    chunk: (size: number, returnRemainers?: boolean) => LazyChain<In, Out>;
    filter: (predicate: (input: any) => boolean) => LazyChain<In, Out>;
    min: () => LazyChain<any, number>;
    max: () => LazyChain<any, number>;
    average: () => LazyChain<any, number>;
    total: () => LazyChain<In, number>;
    tally: () => LazyChain<In, number>;
    input: (data: GenOrData<In>) => LazyChain<In, Out>;
};
declare function lazy<In, Out>(): LazyChain<In, Out>;
/**
 * Ensure a minimum length of time between values.
 * Values being produced too quickly are dropped.
 *
 * In the following example, only three values will be let through.
 * ```js
 * const chain = Chains.chain(
 *  // Produce values every 10ms for 350ms
 *  Chains.tick({ interval: 10, elapsed: 350 }),
 *  // Only let a value through every 100ms
 *  Chains.debounce(100)
 * );
 * ```
 * @param rate
 * @returns
 */
declare function debounce<In>(rate: Interval): Chain<In, In>;
/**
 * Allow values through until a duration has elapsed. After
 * that, the chain stops.
 * @param duration
 * @returns
 */
declare function duration<In>(elapsed: Interval): Chain<In, In>;
type TickOptions = {
    interval: Interval;
    loops?: number;
    elapsed?: Interval;
    asClockTime?: boolean;
};
/**
 * Generate timestamp values
 * By default it runs forever.
 * Use `loops` or `elapsed` to set upper limits.
 *
 * Options:
 * - `asClockTime`: If true, yielded value will be clock time rather than elapsed
 * @param options
 * @returns
 */
declare function tick(options: TickOptions): GenFactoryNoInput<number>;
/**
 * Produce a value from a callback. When
 * the callback returns _undefined_ it is considered done.
 *
 * ```js
 * const callback = () => Math.random();
 *
 * const f = Chains.fromFunction(callback);
 * f(); // New random number
 * ```
 *
 * In the context of a chain:
 * ```js
 * let produced = 0;
 * const chain = Chains.chain<number, string>(
 *  // Produce incrementing numbers
 *  Chains.fromFunction(() => produced++),
 *  // Convert to `x:0`, `x:1` ...
 *  Chains.transform(v => `x:${ v }`),
 *  // Take first 5 results
 *  Chains.cap(5)
 * );
 * const data = await Chains.asArray(chain);
 * ```
 * @param callback
 * @returns
 */
declare function fromFunction<Out>(callback: () => Promise<Out> | Out): GenFactoryNoInput<Out>;
/**
 * Treats the chain/generator as a promise
 *
 * ```js
 * const ticker = asPromise(tick({ interval: 1000 }));
 * const x = await ticker(); //  Waits for 1000ms before giving a value
 * ```
 *
 * This will only ever return one value. To return multiple values, it's necessary
 * to call `asPromise` and `await` the result in a loop.
 * @param valueToWrap
 * @returns
 */
declare function asPromise<V>(valueToWrap: AsyncGenerator<V> | GenFactoryNoInput<V>): () => Promise<V | undefined>;
/**
 * Returns the most recent value from the chain/generator, or
 * `initialValue` (defaulting to _undefined_) if no value
 * has been emitted yet.
 *
 * ```js
 * const ticker = asValue(tick({ interval: 1000 }));
 * x = ticker(); // Get the most recent value
 * ```
 *
 * Every time it's called, it fetches a new value from the generator, assuming
 * it isn't already awaiting a result.
 *
 * In the meantime, the last value (or `initialValue`) is returned.
 * @param valueToWrap
 * @param initialValue
 * @returns
 */
declare function asValue<V>(valueToWrap: AsyncGenerator<V> | GenFactoryNoInput<V>, initialValue?: V): () => V | undefined;
/**
 * Calls `callback` whenever the chain/generator produces a value.
 *
 * When using `asCallback`, call it with `await` to let generator run its course before continuing:
 * ```js
 * await asCallback(tick({ interval:1000, loops:5 }), x => {
 *  // Gets called 5 times, with 1000ms interval
 * });
 * console.log(`Hi`); // Prints after 5 seconds
 * ```
 *
 * Or if you skip the `await`, code continues and callback will still run:
 * ```js
 * asCallback(tick({ interval: 1000, loops: 5}), x => {
 *  // Gets called 5 times, with 1000ms interval
 * });
 * console.log(`Hi`); // Prints immediately
 * ```
 * @param valueToWrap
 * @param callback
 */
declare function asCallback<V>(valueToWrap: GenOrData<V> | GenFactoryNoInput<V>, callback: (v: V) => unknown, onDone?: () => void): Promise<void>;
/**
 * Async function that returns the chain as an array of values
 * ```js
 * const values = await asArray(tick( { interval: 1000, loops: 5 }));
 * // After 5 seconds, values will be a set of timestamps.
 * ```
 * @param chain
 * @returns
 */
declare function asArray<Out>(valueToWrap: AsyncGenerator<Out> | GenFactoryNoInput<Out>): Promise<Array<Out>>;
/**
 * Adds values to the provided array as they are produced,
 * mutating array.
 *
 * ```js
 * const data = [];
 * addToArray(data, tick({ interval: 1000, loops: 5 }));
 * // Execution continues immediately, with `data` mutated over time
 * ```
 * @param chain
 * @param array
 */
declare function addToArray<Out>(array: Array<Out>, valueToWrap: AsyncGenerator<Out> | GenFactoryNoInput<Out>): Promise<void>;
/**
 * Input a single value to the chain, return a single result
 * @param f
 * @param input
 * @returns
 */
declare function single<In, Out>(f: Chain<In, Out>, input: In): Promise<Out | undefined>;
/**
 * Takes an array of values, flattening to a single one
 * using the provided `flattener` function.
 *
 * ```js
 * // Create a chain that flattens values
 * const flatten = Chains.flatten(values => Math.max(...values));
 * // Feed it a single input (an array), get a single output back:
 * const result = await Chains.single(flatten, [ 1, 2, 3]); // 3
 * ```
 * @param flattener Function to flatten array of values to a single value
 * @returns
 */
declare function flatten<In, Out>(flattener: (v: Array<In>) => Out): Chain<Array<In>, Out>;
/**
 * Transform values from one type to another. Just like a map function.
 * @param transformer
 * @returns
 */
declare function transform<In, Out>(transformer: (v: In) => Out): Chain<In, Out>;
/**
 * Merge values from several sources into one stream, interleaving values.
 * When all streams are complete it finishes.
 *
 * Alternatively:
 * - {@link mergeAsArray} emits snapshots of all the generators, as quickly as the fastest one
 * - {@link synchronise} which releases a set of results when all inputs have emitted a value
 * @param sources
 */
declare function mergeFlat<Out>(...sources: Array<GenOrData<any> | GenFactoryNoInput<any>>): AsyncGenerator<Out>;
/**
 * Generate values for each source, returning results as an array.
 * If a source finishes before another, null will be used at its position in the results.
 * Use {@link synchronise} instead to only release results when all sources have yielded a value.
 *
 * Finishes when all generators finish.
 *
 * Alternatively:
 * - {@link mergeFlat} interleaves streams as single values
 * - {@link synchronise} only return results when all sourcse have yielded a value
 * @param sources
 */
declare function mergeAsArray(...sources: Array<GenOrData<any> | GenFactoryNoInput<any>>): AsyncGenerator<Array<any>>;
/**
 * Synchronise several sources, releasing a set of results when every
 * source has produced something. Finishes as soon as _any_ source finishes.
 *
 * ie. the rate of emitting data is determined by the slowest source.
 *
 * Alternatively:
 * - {@link mergeFlat} interleaves streams as single values
 * - {@link mergeAsArray} emits snapshots of all the generators, as quickly as the fastest one
 * @param sources
 */
declare function synchronise(...sources: Array<GenOrData<any> | GenFactoryNoInput<any>>): AsyncGenerator<Array<any>>;
/**
 * Take `limit` number of results from the stream, before closing
 * @param limit
 * @returns
 */
declare function take<In>(limit: number): Chain<In, In>;
/**
 * Returns a running tally of how many items have been
 * emitted from the input source.
 *
 * This is different than {@link total} which adds up numeric values
 * @param limit
 * @returns
 */
declare function tally<In>(): Chain<In, number>;
/**
 * Returns the smallest value from the input.
 * Non-numeric data is filtered out
 * @returns
 */
declare function min(): Chain<number, number>;
/**
 * Returns the largest value from the input
 * Non-numeric data is filtered out
 * @returns
 */
declare function max(): Chain<number, number>;
/**
 * Returns the average from the input.
 * Non-numeric values are filtered out.
 * @returns
 */
declare function average(): Chain<number, number>;
/**
 * Returns the total of the numeric values.
 * Non-numeric values are filtered out.
 * @returns
 */
declare function total(): Chain<number, number>;
/**
 * Chunks an input stream into `size` chunks.
 * @param size
 * @param returnRemainders If true (default) left over data that didn't make a full chunk is also returned
 * @returns
 */
declare function chunk<In>(size: number, returnRemainders?: boolean): Chain<In, Array<In>>;
/**
 * Filters the input source, only allowing through
 * data for which `predicate` returns _true_
 *
 * {@link drop}, on the other hand excludes values for which predicate is _true_
 * @param predicate
 * @returns
 */
declare function filter<In>(predicate: (v: In) => boolean): Chain<In, In>;
/**
 * Drops all values from input stream for which `predicate` returns _true_
 *
 * {@link filter}, on the other hand includes values where the predicate is _true_
 * @param predicate
 * @returns
 */
declare function drop<In>(predicate: (v: In) => boolean): Chain<In, In>;
/**
 * Chain functions together.
 *
 * @example Process an array of strings. Transforming into
 * integers, and then filtering only even numbers.
 * ```js
 * const ch = Chains.chain(
 *  [ `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` ],
 *  Chains.transform<string, number>(v => Number.parseInt(v)),
 *  Chains.filter(v => v % 2 === 0)
 *);
 * const output = await Async.toArray(ch2);
 * // [ 2, 4, 6, 8, 10 ]
 * ```
 * @param functions
 * @returns
 */
declare function chain<In, Out>(...functions: ChainArguments<In, Out>): AsyncGenerator<Out>;

type Chain$1_Chain<In, Out> = Chain<In, Out>;
type Chain$1_ChainArguments<In, Out> = ChainArguments<In, Out>;
type Chain$1_DelayOptions = DelayOptions;
type Chain$1_Gen<V> = Gen<V>;
type Chain$1_GenFactoryNoInput<Out> = GenFactoryNoInput<Out>;
type Chain$1_GenOrData<V> = GenOrData<V>;
type Chain$1_LazyChain<In, Out> = LazyChain<In, Out>;
type Chain$1_TickOptions = TickOptions;
declare const Chain$1_addToArray: typeof addToArray;
declare const Chain$1_asArray: typeof asArray;
declare const Chain$1_asCallback: typeof asCallback;
declare const Chain$1_asPromise: typeof asPromise;
declare const Chain$1_asValue: typeof asValue;
declare const Chain$1_average: typeof average;
declare const Chain$1_chain: typeof chain;
declare const Chain$1_chunk: typeof chunk;
declare const Chain$1_debounce: typeof debounce;
declare const Chain$1_delay: typeof delay;
declare const Chain$1_drop: typeof drop;
declare const Chain$1_duration: typeof duration;
declare const Chain$1_filter: typeof filter;
declare const Chain$1_flatten: typeof flatten;
declare const Chain$1_fromFunction: typeof fromFunction;
declare const Chain$1_lazy: typeof lazy;
declare const Chain$1_max: typeof max;
declare const Chain$1_mergeAsArray: typeof mergeAsArray;
declare const Chain$1_mergeFlat: typeof mergeFlat;
declare const Chain$1_min: typeof min;
declare const Chain$1_single: typeof single;
declare const Chain$1_synchronise: typeof synchronise;
declare const Chain$1_take: typeof take;
declare const Chain$1_tally: typeof tally;
declare const Chain$1_tick: typeof tick;
declare const Chain$1_total: typeof total;
declare const Chain$1_transform: typeof transform;
declare namespace Chain$1 {
  export {
    Chain$1_Chain as Chain,
    Chain$1_ChainArguments as ChainArguments,
    Chain$1_DelayOptions as DelayOptions,
    Chain$1_Gen as Gen,
    Chain$1_GenFactoryNoInput as GenFactoryNoInput,
    Chain$1_GenOrData as GenOrData,
    Chain$1_LazyChain as LazyChain,
    Chain$1_TickOptions as TickOptions,
    Chain$1_addToArray as addToArray,
    Chain$1_asArray as asArray,
    Chain$1_asCallback as asCallback,
    Chain$1_asPromise as asPromise,
    Chain$1_asValue as asValue,
    Chain$1_average as average,
    Chain$1_chain as chain,
    Chain$1_chunk as chunk,
    Chain$1_debounce as debounce,
    Chain$1_delay as delay,
    Chain$1_drop as drop,
    Chain$1_duration as duration,
    Chain$1_filter as filter,
    Chain$1_flatten as flatten,
    Chain$1_fromFunction as fromFunction,
    Chain$1_lazy as lazy,
    Chain$1_max as max,
    Chain$1_mergeAsArray as mergeAsArray,
    Chain$1_mergeFlat as mergeFlat,
    Chain$1_min as min,
    Chain$1_single as single,
    Chain$1_synchronise as synchronise,
    Chain$1_take as take,
    Chain$1_tally as tally,
    Chain$1_tick as tick,
    Chain$1_total as total,
    Chain$1_transform as transform,
  };
}

declare class Table<V> {
    rows: Array<Array<V | undefined>>;
    rowLabels: Array<string>;
    colLabels: Array<string>;
    labelColumns(...labels: Array<string>): void;
    labelColumn(columnNumber: number, label: string): void;
    getColumnLabelIndex(label: string): number | undefined;
    print(): void;
    rowsWithLabelsArray(): Generator<[label: string | undefined, value: V | undefined][] | undefined, void, unknown>;
    /**
     * Return a copy of table as nested array
     * ```js
     * const t = new Table();
     * // add stuff
     * // ...
     * const m = t.asArray();
     * for (const row of m) {
     *  for (const colValue of row) {
     *    // iterate over all column values for this row
     *  }
     * }
     * ```
     *
     * Alternative: get value at row Y and column X
     * ```js
     * const value = m[y][x];
     * ```
     * @returns
     */
    asArray(): Array<Array<V | undefined>>;
    /**
     * Return the number of rows
     */
    get rowCount(): number;
    /**
     * Return the maximum number of columns in any row
     */
    get columnCount(): number;
    rowsWithLabelsObject(): Generator<object | undefined, void, unknown>;
    labelRows(...labels: Array<string>): void;
    appendRow(...data: Array<V | undefined>): void;
    getRowWithLabelsArray(rowNumber: number): Array<[label: string | undefined, value: V | undefined]> | undefined;
    /**
     * Return a row of objects. Keys use the column labels.
     *
     * ```js
     * const row = table.getRowWithLabelsObject(10);
     * // eg:
     * // [{ colour: red, size: 10}, { colour: blue, size: 20 }]
     * ```
     * @param rowNumber
     * @returns
     */
    getRowWithLabelsObject(rowNumber: number): object | undefined;
    /**
     * Gets or creates a row at `rowNumber`.
     * @param rowNumber
     * @returns
     */
    private getOrCreateRow;
    /**
     * Gets the values at `rowNumber`
     * @param rowNumber
     * @returns
     */
    row(rowNumber: number): Array<V | undefined> | undefined;
    /**
     * Set the value of row,column to `value`
     * @param rowNumber
     * @param columnNumber
     * @param value
     */
    set(rowNumber: number, columnNumber: number, value: V | undefined): void;
    get(rowNumber: number, column: number | string): V | undefined;
    /**
     * For a given row number, set all the columns to `value`.
     * `cols` gives the number of columns to set
     * @param rowNumber
     * @param cols
     * @param value
     */
    setRow(rowNumber: number, cols: number, value: V | undefined): void;
}

type DistanceCompute = (graph: DirectedGraph, edge: Edge$1) => number;
/**
 * Vertex. These are the _nodes_ of the graph. Immutable.
 *
 * They keep track of all of their outgoing edges, and
 * a unique id.
 *
 * Ids are used for accessing/updating vertices as well as in the
 * {@link Edge} type. They must be unique.
 */
type Vertex$1 = Readonly<{
    out: ReadonlyArray<Edge$1>;
    id: string;
}>;
/**
 * Edge. Immutable.
 *
 * Only encodes the destination vertex. The from
 * is known since edges are stored on the from vertex.
 */
type Edge$1 = Readonly<{
    /**
     * Vertex id edge connects to (ie. destination)
     */
    id: string;
    /**
     * Optional weight of edge
     */
    weight?: number;
}>;
/**
 * Create a vertex with given id
 * @param id
 * @returns
 */
declare const createVertex$1: (id: string) => Vertex$1;
/**
 * Options for connecting vertices
 */
type ConnectOptions$1 = Readonly<{
    /**
     * From, or source of connection
     */
    from: string;
    /**
     * To, or destination of connection. Can be multiple vertices for quick use
     */
    to: string | Array<string>;
    /**
     * If true, edges in opposite direction are made as well
     */
    bidi?: boolean;
    /**
     * Weight for this connection (optional)
     */
    weight?: number;
}>;
/**
 * Directed graph. Immutable
 *
 * Consists of {@link Vertex|vertices}, which all have zero or more outgoing {@link Edge|Edges}.
 */
type DirectedGraph = Readonly<{
    vertices: IMapImmutable<string, Vertex$1>;
}>;
/**
 * Returns the graph connections as an adjacency matrix
 * @param graph
 * @returns
 */
declare function toAdjacencyMatrix$1(graph: DirectedGraph): Table<boolean>;
/**
 * Return a string representation of the graph for debug inspection
 * @param graph
 * @returns
 */
declare const dumpGraph$1: (graph: DirectedGraph | Iterable<Vertex$1>) => string;
declare const distance: (graph: DirectedGraph, edge: Edge$1) => number;
/**
 * Iterate over all the edges in the graph
 * @param graph
 */
declare function edges(graph: DirectedGraph): Generator<Readonly<{
    /**
     * Vertex id edge connects to (ie. destination)
     */
    id: string;
    /**
     * Optional weight of edge
     */
    weight?: number | undefined;
}>, void, unknown>;
/**
 * Iterate over all the vertices of the graph
 * @param graph
 */
declare function vertices(graph: DirectedGraph): Generator<Readonly<{
    out: readonly Readonly<{
        /**
         * Vertex id edge connects to (ie. destination)
         */
        id: string;
        /**
         * Optional weight of edge
         */
        weight?: number | undefined;
    }>[];
    id: string;
}>, void, unknown>;
/**
 * Iterate over all the vertices connectd to `context` vertex
 * @param graph Graph
 * @param context id or Vertex
 * @returns
 */
declare function adjacentVertices$1(graph: DirectedGraph, context: Vertex$1 | string | undefined): Generator<Readonly<{
    out: readonly Readonly<{
        /**
         * Vertex id edge connects to (ie. destination)
         */
        id: string;
        /**
         * Optional weight of edge
         */
        weight?: number | undefined;
    }>[];
    id: string;
}>, void, unknown>;
/**
 * Returns _true_ if `vertex` has an outgoing connection to
 * the supplied id or vertex.
 *
 * If `vertex` is undefined, _false_ is returned.
 * @param vertex From vertex
 * @param outIdOrVertex To vertex
 * @returns
 */
declare const vertexHasOut: (vertex: Vertex$1, outIdOrVertex: string | Vertex$1) => boolean;
/**
 * Returns _true_ if `vertex` has no outgoing connections
 * @param graph
 * @param vertex
 * @returns
 */
declare const hasNoOuts: (graph: DirectedGraph, vertex: string | Vertex$1) => boolean;
/**
 * Returns _true_ if `vertex` only has the given list of vertices.
 * Returns _false_ early if the length of the list does not match up with `vertex.out`
 * @param graph
 * @param vertex
 * @param outIdOrVertex
 * @returns
 */
declare const hasOnlyOuts: (graph: DirectedGraph, vertex: string | Vertex$1, ...outIdOrVertex: Array<string | Vertex$1>) => boolean;
/**
 * Returns _true_ if `vertex` has an outgoing connection to the given vertex.
 * @param graph
 * @param vertex
 * @param outIdOrVertex
 * @returns
 */
declare const hasOut: (graph: DirectedGraph, vertex: string | Vertex$1, outIdOrVertex: string | Vertex$1) => boolean;
/**
 * Gets a vertex by id, creating it if it does not exist.
 * @param graph
 * @param id
 * @returns
 */
declare const getOrCreate$1: (graph: DirectedGraph, id: string) => Readonly<{
    graph: DirectedGraph;
    vertex: Vertex$1;
}>;
/**
 * Gets a vertex by id, throwing an error if it does not exist
 * @param graph
 * @param id
 * @returns
 */
declare const getOrFail: (graph: DirectedGraph, id: string) => Vertex$1;
/**
 * Updates a vertex by returning a mutated graph
 * @param graph Graph
 * @param vertex Newly changed vertex
 * @returns
 */
declare const updateGraphVertex$1: (graph: DirectedGraph, vertex: Vertex$1) => DirectedGraph;
/**
 * Default distance computer. Uses `weight` property of edge, or `1` if not found.
 * @param graph
 * @param edge
 * @returns
 */
declare const distanceDefault: (graph: DirectedGraph, edge: Edge$1) => number;
/**
 * Returns a mutation of `graph`, with a given edge removed.
 *
 * If edge was not there, original graph is returned.
 * @param graph
 * @param from
 * @param to
 * @returns
 */
declare function disconnect(graph: DirectedGraph, from: string | Vertex$1, to: string | Vertex$1): DirectedGraph;
/**
 * Make a connection between two vertices with a given weight.
 * It returns the new graph as wll as the created edge.
 * @param graph
 * @param from
 * @param to
 * @param weight
 * @returns
 */
declare function connectTo$1(graph: DirectedGraph, from: string, to: string, weight?: number): {
    graph: DirectedGraph;
    edge: Edge$1;
};
/**
 * Connect from -> to. By default unidirectional.
 * Returns a new graph with the connection
 * @param graph
 * @param options
 * @returns
 */
declare function connect$1(graph: DirectedGraph, options: ConnectOptions$1): DirectedGraph;
/**
 * Returns _true_ if a->b or b->a
 * @param graph
 * @param a
 * @param b
 * @returns
 */
declare function areAdjacent(graph: DirectedGraph, a: Vertex$1, b: Vertex$1): true | undefined;
/**
 * Iterates over vertices from a starting vertex in an bread-first-search
 * @param graph
 * @param startIdOrVertex
 * @param targetIdOrVertex
 * @returns
 */
declare function bfs(graph: DirectedGraph, startIdOrVertex: string | Vertex$1, targetIdOrVertex?: string | Vertex$1): Generator<Readonly<{
    out: readonly Readonly<{
        /**
         * Vertex id edge connects to (ie. destination)
         */
        id: string;
        /**
         * Optional weight of edge
         */
        weight?: number | undefined;
    }>[];
    id: string;
}>, void, unknown>;
/**
 * Iterates over vertices from a starting vertex in an depth-first-search
 * @param graph
 * @param startIdOrVertex
 */
declare function dfs(graph: DirectedGraph, startIdOrVertex: string | Vertex$1): Generator<Readonly<{
    out: readonly Readonly<{
        /**
         * Vertex id edge connects to (ie. destination)
         */
        id: string;
        /**
         * Optional weight of edge
         */
        weight?: number | undefined;
    }>[];
    id: string;
}>, void, unknown>;
/**
 * Compute shortest distance from the source vertex to the rest of the graph.
 * @param graph
 * @param sourceOrId
 * @returns
 */
declare const pathDijkstra: (graph: DirectedGraph, sourceOrId: Vertex$1 | string) => {
    distances: Map<string, number>;
    previous: Map<string, Readonly<{
        out: ReadonlyArray<Edge$1>;
        id: string;
    }> | null>;
    pathTo: (id: string) => Array<Edge$1>;
};
/**
 * Clones the graph. Uses shallow clone, because it's all immutable
 * @param graph
 * @returns
 */
declare const clone: (graph: DirectedGraph) => DirectedGraph;
/**
 * Create a graph
 * @param initialConnections
 * @returns
 */
declare const graph$1: (...initialConnections: Array<ConnectOptions$1>) => DirectedGraph;
/**
 * Returns _true_ if the graph contains is acyclic - that is, it has no loops
 * @param graph
 */
declare function isAcyclic(graph: DirectedGraph): boolean;
/**
 * Topological sort using Kahn's algorithm.
 * Returns a new graph that is sorted
 * @param graph
 */
declare function topologicalSort(graph: DirectedGraph): DirectedGraph;
/**
 * Create a graph from an iterable of vertices
 * @param vertices
 * @returns
 */
declare function graphFromVertices(vertices: Iterable<Vertex$1>): DirectedGraph;
/**
 * Get all the cycles ('strongly-connected-components') within the graph
 * [Read more](https://en.wikipedia.org/wiki/Strongly_connected_component)
 * @param graph
 * @returns
 */
declare function getCycles(graph: DirectedGraph): Array<Array<Vertex$1>>;
/**
 * Returns a new graph which is transitively reduced.
 * That is, redundant edges are removed
 * @param graph
 * @returns
 */
declare function transitiveReduction(graph: DirectedGraph): Readonly<{
    vertices: IMapImmutable<string, Readonly<{
        out: readonly Readonly<{
            /**
             * Vertex id edge connects to (ie. destination)
             */
            id: string;
            /**
             * Optional weight of edge
             */
            weight?: number | undefined;
        }>[];
        id: string;
    }>>;
}>;

type DirectedGraph$1_DirectedGraph = DirectedGraph;
type DirectedGraph$1_DistanceCompute = DistanceCompute;
declare const DirectedGraph$1_areAdjacent: typeof areAdjacent;
declare const DirectedGraph$1_bfs: typeof bfs;
declare const DirectedGraph$1_clone: typeof clone;
declare const DirectedGraph$1_dfs: typeof dfs;
declare const DirectedGraph$1_disconnect: typeof disconnect;
declare const DirectedGraph$1_distance: typeof distance;
declare const DirectedGraph$1_distanceDefault: typeof distanceDefault;
declare const DirectedGraph$1_edges: typeof edges;
declare const DirectedGraph$1_getCycles: typeof getCycles;
declare const DirectedGraph$1_getOrFail: typeof getOrFail;
declare const DirectedGraph$1_graphFromVertices: typeof graphFromVertices;
declare const DirectedGraph$1_hasNoOuts: typeof hasNoOuts;
declare const DirectedGraph$1_hasOnlyOuts: typeof hasOnlyOuts;
declare const DirectedGraph$1_hasOut: typeof hasOut;
declare const DirectedGraph$1_isAcyclic: typeof isAcyclic;
declare const DirectedGraph$1_pathDijkstra: typeof pathDijkstra;
declare const DirectedGraph$1_topologicalSort: typeof topologicalSort;
declare const DirectedGraph$1_transitiveReduction: typeof transitiveReduction;
declare const DirectedGraph$1_vertexHasOut: typeof vertexHasOut;
declare const DirectedGraph$1_vertices: typeof vertices;
declare namespace DirectedGraph$1 {
  export {
    ConnectOptions$1 as ConnectOptions,
    DirectedGraph$1_DirectedGraph as DirectedGraph,
    DirectedGraph$1_DistanceCompute as DistanceCompute,
    Edge$1 as Edge,
    Vertex$1 as Vertex,
    adjacentVertices$1 as adjacentVertices,
    DirectedGraph$1_areAdjacent as areAdjacent,
    DirectedGraph$1_bfs as bfs,
    DirectedGraph$1_clone as clone,
    connect$1 as connect,
    connectTo$1 as connectTo,
    createVertex$1 as createVertex,
    DirectedGraph$1_dfs as dfs,
    DirectedGraph$1_disconnect as disconnect,
    DirectedGraph$1_distance as distance,
    DirectedGraph$1_distanceDefault as distanceDefault,
    dumpGraph$1 as dumpGraph,
    DirectedGraph$1_edges as edges,
    DirectedGraph$1_getCycles as getCycles,
    getOrCreate$1 as getOrCreate,
    DirectedGraph$1_getOrFail as getOrFail,
    graph$1 as graph,
    DirectedGraph$1_graphFromVertices as graphFromVertices,
    DirectedGraph$1_hasNoOuts as hasNoOuts,
    DirectedGraph$1_hasOnlyOuts as hasOnlyOuts,
    DirectedGraph$1_hasOut as hasOut,
    DirectedGraph$1_isAcyclic as isAcyclic,
    DirectedGraph$1_pathDijkstra as pathDijkstra,
    toAdjacencyMatrix$1 as toAdjacencyMatrix,
    DirectedGraph$1_topologicalSort as topologicalSort,
    DirectedGraph$1_transitiveReduction as transitiveReduction,
    updateGraphVertex$1 as updateGraphVertex,
    DirectedGraph$1_vertexHasOut as vertexHasOut,
    DirectedGraph$1_vertices as vertices,
  };
}

type Vertex = Readonly<{
    id: string;
}>;
type Edge = Readonly<{
    a: string;
    b: string;
    weight?: number;
}>;
type Graph = Readonly<{
    edges: ReadonlyArray<Edge>;
    vertices: IMapImmutable<string, Vertex>;
}>;
type ConnectOptions = Readonly<{
    a: string;
    b: string | Array<string>;
    weight?: number;
}>;
declare const createVertex: (id: string) => Vertex;
declare const updateGraphVertex: (graph: Graph, vertex: Vertex) => Graph;
declare const getOrCreate: (graph: Graph, id: string) => Readonly<{
    graph: Graph;
    vertex: Vertex;
}>;
declare const hasConnection: (graph: Graph, a: string | Vertex, b: string | Vertex) => boolean;
declare const getConnection: (graph: Graph, a: string | Vertex, b: string | Vertex) => Edge | undefined;
/**
 * Connect A <-> B
 * @param graph
 * @param a
 * @param b
 * @param weight
 * @returns
 */
declare function connectTo(graph: Graph, a: string, b: string, weight?: number): {
    graph: Graph;
    edge: Edge;
};
declare function connect(graph: Graph, options: ConnectOptions): Graph;
declare const graph: (...initialConnections: Array<ConnectOptions>) => Graph;
declare function toAdjacencyMatrix(graph: Graph): Table<boolean>;
/**
 * Return a string representation of the graph for debug inspection
 * @param graph
 * @returns
 */
declare const dumpGraph: (graph: Graph) => string;
/**
 * Iterate over all the vertices connectd to `context` vertex
 * @param graph Graph
 * @param context id or Vertex
 * @returns
 */
declare function adjacentVertices(graph: Graph, context: Vertex | string | undefined): Generator<Readonly<{
    id: string;
}>, void, unknown>;
declare function edgesForVertex(graph: Graph, context: Vertex | string | undefined): Generator<Readonly<{
    a: string;
    b: string;
    weight?: number | undefined;
}>, void, unknown>;

type UndirectedGraph_ConnectOptions = ConnectOptions;
type UndirectedGraph_Edge = Edge;
type UndirectedGraph_Graph = Graph;
type UndirectedGraph_Vertex = Vertex;
declare const UndirectedGraph_adjacentVertices: typeof adjacentVertices;
declare const UndirectedGraph_connect: typeof connect;
declare const UndirectedGraph_connectTo: typeof connectTo;
declare const UndirectedGraph_createVertex: typeof createVertex;
declare const UndirectedGraph_dumpGraph: typeof dumpGraph;
declare const UndirectedGraph_edgesForVertex: typeof edgesForVertex;
declare const UndirectedGraph_getConnection: typeof getConnection;
declare const UndirectedGraph_getOrCreate: typeof getOrCreate;
declare const UndirectedGraph_graph: typeof graph;
declare const UndirectedGraph_hasConnection: typeof hasConnection;
declare const UndirectedGraph_toAdjacencyMatrix: typeof toAdjacencyMatrix;
declare const UndirectedGraph_updateGraphVertex: typeof updateGraphVertex;
declare namespace UndirectedGraph {
  export {
    UndirectedGraph_ConnectOptions as ConnectOptions,
    UndirectedGraph_Edge as Edge,
    UndirectedGraph_Graph as Graph,
    UndirectedGraph_Vertex as Vertex,
    UndirectedGraph_adjacentVertices as adjacentVertices,
    UndirectedGraph_connect as connect,
    UndirectedGraph_connectTo as connectTo,
    UndirectedGraph_createVertex as createVertex,
    UndirectedGraph_dumpGraph as dumpGraph,
    UndirectedGraph_edgesForVertex as edgesForVertex,
    UndirectedGraph_getConnection as getConnection,
    UndirectedGraph_getOrCreate as getOrCreate,
    UndirectedGraph_graph as graph,
    UndirectedGraph_hasConnection as hasConnection,
    UndirectedGraph_toAdjacencyMatrix as toAdjacencyMatrix,
    UndirectedGraph_updateGraphVertex as updateGraphVertex,
  };
}

declare namespace index$1 {
  export {
    DirectedGraph$1 as Directed,
    UndirectedGraph as Undirected,
  };
}

/**
 * Wrapper around a bipolar value. Immutable.
 *
 * ```js
 * let b = Bipolar.immutable();
 * let b = Bipolar.immutable(0.5);
 * b = b.add(0.1);
 * ```
 */
type BipolarWrapper = {
    value: number;
    towardZero: (amt: number) => BipolarWrapper;
    add: (amt: number) => BipolarWrapper;
    multiply: (amt: number) => BipolarWrapper;
    inverse: () => BipolarWrapper;
    asScalar: () => number;
    interpolate: (amt: number, b: number) => BipolarWrapper;
    [Symbol.toPrimitive]: (hint: string) => number | string | boolean;
};
/**
 * Wrapper for bipolar-based values. Immutable.
 * All functions will clamp to keep it in legal range.
 *
 * ```js
 * let v = immutable(); // Starts with 0 by default
 * v = v.add(0.1);      // v.value is 0.1
 * v = v.inverse();     // v.value is -0.1
 * v = v.multiply(0.2); // v.value is -0.02
 *
 * v = immutable(1);
 * v = v.towardZero(0.1); // 0.9
 * v = v.interpolate(0.1, 1);
 * ```
 *
 * Wrapped values can be coerced into number:
 * ```js
 * const v = immutable(1);
 * const x = +v+10;
 * // x = 11
 * ```
 * @param startingValue
 * @returns
 */
declare const immutable: (startingValueOrBipolar?: number | BipolarWrapper) => BipolarWrapper;
/**
 * Converts bipolar value to a scalar
 * ```js
 * import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
 * Bipolar.toScalar(-1); // 0.0
 * Bipolar.toScalar( 0); // 0.5
 * Bipolar.toScalar( 1); // 1.0
 * ```
 *
 * Throws an error if `bipolarValue` is not a number or NaN
 * @param bipolarValue Value to convert to scalar
 * @returns Scalar value on 0..1 range.
 */
declare const toScalar: (bipolarValue: number) => number;
/**
 * Makes a scalar into a bipolar value.
 *
 * That is, input range is 0..1, output range is -1...1
 *
 * ```js
 * import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
 * Bipolar.fromScalar(1);   // 1
 * Bipolar.fromScalar(0);   // -1
 * Bipolar.fromScalar(0.5); // 0
 * ```
 *
 * Throws an error if `scalarValue` is not on 0..1 scale.
 * @param scalarValue Scalar value to convert
 * @returns Bipolar value on -1..1 scale
 */
declare const fromScalar: (scalarValue: number) => number;
/**
 * Scale a number to -1..1 range
 * ```js
 * import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * // Scale 100 on 0..100 scale
 * Bipolar.scale(100, 0, 100); // 1
 * Bipolar.scale(50, 0, 100);  // 0
 * Bipolar.scale(0, 0, 100);   // -1
 * ```
 *
 * Return value is clamped.
 * @param inputValue Value to scale
 * @param inMin Minimum of scale
 * @param inMax Maximum of scale
 * @returns Bipolar value on -1..1 scale
 */
declare const scale: (inputValue: number, inMin: number, inMax: number) => number;
/**
 * Clamp a bipolar value
 * ```js
 * import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
 * Bipolar.clamp(-1);   // -1
 * Bipolar.clamp(-1.1); // -1
 * ```
 *
 * Throws an error if `bipolarValue` is not a number or NaN.
 * @param bipolarValue Value to clamp
 * @returns Clamped value on -1..1 scale
 */
declare const clamp: (bipolarValue: number) => number;
/**
 * Pushes a bipolar value toward zero by `amount`.
 * Return value is clamped on bipolar range of -1..1
 *
 * ```js
 * import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
 * Bipolar.towardZero(-1, 0.1); // -0.9
 * Bipolar.towardZero( 1, 0.1); //  0.9
 * Bipolar.towardZero( 0, 0.1); //  0.0
 * Bipolar.towardZero( 1, 1.1); //  0.0
 * ```
 *
 * If `amount` is greater than 1, 0 is returned.
 * Throws an error if `bipolarValue` or `amount` are not numbers.
 * Throws an error if `amount` is below zero.
 * @param bipolarValue Bipolar value to nudge toward zero
 * @param amount Amount to nudge by
 * @returns Bipolar value -1...1
 */
declare const towardZero: (bipolarValue: number, amount: number) => number;

type Bipolar_BipolarWrapper = BipolarWrapper;
declare const Bipolar_clamp: typeof clamp;
declare const Bipolar_fromScalar: typeof fromScalar;
declare const Bipolar_immutable: typeof immutable;
declare const Bipolar_scale: typeof scale;
declare const Bipolar_toScalar: typeof toScalar;
declare const Bipolar_towardZero: typeof towardZero;
declare namespace Bipolar {
  export {
    Bipolar_BipolarWrapper as BipolarWrapper,
    Bipolar_clamp as clamp,
    Bipolar_fromScalar as fromScalar,
    Bipolar_immutable as immutable,
    Bipolar_scale as scale,
    Bipolar_toScalar as toScalar,
    Bipolar_towardZero as towardZero,
  };
}

/**
 * Interpolates between `a` and `b` by `amount`. Aka `lerp`.
 *
 * [ixfx Guide](https://clinth.github.io/ixfx-docs/modulation/interpolate/)
 *
 * @example Get the halfway point between 30 and 60
 * ```js
 * import {interpolate} from 'https://unpkg.com/ixfx/dist/data.js';
 * interpolate(0.5, 30, 60);
 * ```
 *
 * Interpolation is often used for animation. In that case, `amount`
 * would start at 0 and you would keep interpolating up to `1`
 * @example
 * ```js
 * import { interpolate } from 'https://unpkg.com/ixfx/dist/data.js';
 * import { percentPingPong } from 'https://unpkg.com/ixfx/dist/modulation.js'
 *
 * // Go back and forth between 0 and 1 by 0.1
 * let pp = percentPingPong(0.1);
 * continuously(() => {
 *  // Get position in ping-pong
 *  const amt = pp.next().value;
 *  // interpolate between Math.PI and Math.PI*2
 *  const v = interpolate(amt, Math.PI, Math.PI*2);
 *  // do something with v...
 * }).start();
 * ```
 *
 * See also {@link Visual.Colour.interpolate | Visual.Colour.interpolate }, {@link Geometry.Points.interpolate | Geometry.Points.interpolate}.
 * @param amount Interpolation amount, between 0 and 1 inclusive
 * @param a Start (ie when `amt` is 0)
 * @param b End (ie. when `amt` is 1)
 * @returns Interpolated value which will be between `a` and `b`.
 */
declare const interpolate: (amount: number, a: number, b: number) => number;
/**
 * Interpolate between angles `a` and `b` by `amount`. Angles are in radians.
 *
 * ```js
 * import { interpolateAngle } from 'https://unpkg.com/ixfx/dist/data.js';
 * interpolateAngle(0.5, Math.PI, Math.PI/2);
 * ```
 * @param amount
 * @param aRadians
 * @param bRadians
 * @returns
 */
declare const interpolateAngle: (amount: number, aRadians: number, bRadians: number) => number;

/**
 * Wraps an integer number within a specified range, defaulting to degrees (0-360). Use {@link wrap} for floating-point wrapping.
 *
 * This is useful for calculations involving degree angles and hue, which wrap from 0-360.
 * Eg: to add 200 to 200, we don't want 400, but 40.
 *
 * ```js
 * const v = wrapInteger(200+200, 0, 360); // 40
 * ```
 *
 * Or if we minus 100 from 10, we don't want -90 but 270
 * ```js
 * const v = wrapInteger(10-100, 0, 360); // 270
 * ```
 *
 * `wrapInteger` uses 0-360 as a default range, so both of these
 * examples could just as well be:
 *
 * ```js
 * wrapInteger(200+200);  // 40
 * wrapInteger(10-100);  // 270
 * ```
 *
 * Non-zero starting points can be used. A range of 20-70:
 * ```js
 * const v = wrapInteger(-20, 20, 70); // 50
 * ```
 *
 * Note that the minimum value is inclusive, while the maximum is _exclusive_.
 * So with the default range of 0-360, 360 is never reached:
 *
 * ```js
 * wrapInteger(360); // 0
 * wrapInteger(361); // 1
 * ```
 *
 * If you just want to lock values to a range without wrapping, consider {@link clamp}.
 *
 * @param v Value to wrap
 * @param min Integer minimum of range (default: 0). Inclusive
 * @param max Integer maximum of range (default: 360). Exlusive
 * @returns
 */
declare const wrapInteger: (v: number, min?: number, max?: number) => number;
/**
 * Wraps floating point numbers to be within a range (default: 0..1). Use {@link wrapInteger} if you want to wrap integer values.
 *
 * This logic makes sense for some things like rotation angle.
 *
 * If you just want to lock values to a range without wrapping, consider {@link clamp}.
 *
 * ```js
 * wrap(1.2);   // 0.2
 * wrap(2);     // 1.0
 * wrap(-0.2); // 0.8
 * ```
 *
 * A range can be provided too:
 * ```js
 * wrap(30, 20, 50);  	 // 30
 * wrap(60, 20, 50);    //  30
 * ```
 * @param v
 * @param min
 * @param max
 * @returns
 */
declare const wrap: (v: number, min?: number, max?: number) => number;
/**
 * Performs a calculation within a wrapping number range. This is a lower-level function.
 * See also: {@link wrapInteger} for simple wrapping within a range.
 *
 * `min` and `max` define the start and end of the valid range, inclusive. Eg for hue degrees it'd be 0, 360.
 * `a` and `b` is the range you want to work in.
 *
 * For example, let's say you want to get the middle point between a hue of 30 and a hue of 330 (ie warmer colours):
 * ```js
 * wrapRange(0,360, (distance) => {
 *  // for a:0 and b:330, distance would be 90 from 30 degrees to 330 (via zero)
 *  return distance * 0.5; // eg return middle point
 * }, 30, 330);
 * ```
 *
 * The return value of the callback should be in the range of 0-distance. `wrapRange` will subsequently
 * conform it to the `min` and `max` range before it's returned to the caller.
 *
 * @param a Output start (eg. 60)
 * @param b Output end (eg 300)
 * @param min Range start (eg 0)
 * @param max Range end (eg 360)
 * @param fn Returns a computed value from 0 to `distance`.
 * @returns
 */
declare const wrapRange: (min: number, max: number, fn: (distance: number) => number, a: number, b: number) => number;

/**
 * Returns the similarity of `a` and `b` to each other,
 * where higher similarity should be a higher number.
 * @param a
 * @param b
 */
type Similarity<V> = (a: V, b: V) => number;
/**
 * Options for alignmnent
 */
type AlignOpts = {
    /**
     * If the similarity score is above this threshold,
     * consider them the same
     */
    readonly matchThreshold?: number;
    /**
     * If true, additional console messages are printed during
     * execution.
     */
    readonly debug?: boolean;
};
/**
 * Some data with an id property.
 */
type DataWithId<V> = V & {
    readonly id: string;
};
/**
 * Attempts to align prior data with new data, based on a provided similarity function.
 *
 * See also `alignById` for a version which encloses parameters.
 *
 * ```js
 * // Compare data based on x,y distance
 * const fn = (a, b) => {
 *  return 1-Points.distance(a, b);
 * }
 * const lastData = [
 *  { id:`1`, x:100, y:200 }
 *  ...
 * ]
 * const newData = [
 *  { id:`2`, x:101, y:200 }
 * ]
 * const aligned = Correlate.align(fn, lastdata, newData, opts);
 *
 * // Result:
 * [
 *  { id:`1`, x:101, y:200 }
 * ]
 * ```
 * @param similarityFn
 * @param lastData
 * @param newData
 * @param opts
 * @returns
 */
declare const align: <V>(similarityFn: Similarity<V>, lastData: readonly DataWithId<V>[] | undefined, newData: readonly DataWithId<V>[], opts?: AlignOpts) => readonly DataWithId<V>[];
/**
 * Returns a function that attempts to align a series of data by its id.
 * See also {@link align} for a version with no internal storage.
 *
 * ```js
 * // Compare data based on x,y distance
 * const fn = (a, b) => {
 *  return 1-Points.distance(a, b);
 * }
 * const aligner = Correlate.alignById(fn, opts);
 *
 * const lastData = [
 *  { id:`1`, x:100, y:200 }
 *  ...
 * ]
 * const aligned = aligner(lastData);
 *
 * ```
 * @param fn
 * @param opts
 * @returns
 */
declare const alignById: <V>(fn: Similarity<V>, opts?: AlignOpts) => (newData: DataWithId<V>[]) => DataWithId<V>[];

type Correlate_AlignOpts = AlignOpts;
type Correlate_DataWithId<V> = DataWithId<V>;
type Correlate_Similarity<V> = Similarity<V>;
declare const Correlate_align: typeof align;
declare const Correlate_alignById: typeof alignById;
declare namespace Correlate {
  export {
    Correlate_AlignOpts as AlignOpts,
    Correlate_DataWithId as DataWithId,
    Correlate_Similarity as Similarity,
    Correlate_align as align,
    Correlate_alignById as alignById,
  };
}

/**
 * Policy for when the pool is fully used
 */
type FullPolicy = `error` | `evictOldestUser`;
/**
 * Pool options
 */
type Opts<V> = {
    /**
     * Maximum number of resources for this pool
     */
    readonly capacity?: number;
    /**
     * If above 0, users will be removed if there is no activity after this interval.
     * Activity is marked whenever `use` us called with that user key
     */
    readonly userExpireAfterMs?: number;
    /**
     * If above 0, resources with no users will be automatically removed after this interval
     */
    readonly resourcesWithoutUserExpireAfterMs?: number;
    /**
     * Maximum number of users per resource. Defaults to 1
     */
    readonly capacityPerResource?: number;
    /**
     * What to do if pool is full and a new resource allocation is requested
     */
    readonly fullPolicy?: FullPolicy;
    /**
     * If true, additional logging will trace activity of pool
     */
    readonly debug?: boolean;
    /**
     * If specified, this function will generate new resources as needed.
     */
    readonly generate?: () => V;
    /**
     * If specified, this function will be called when a resource is disposed
     */
    readonly free?: (v: V) => void;
};
/**
 * Function that initialises a pool item
 */
/**
 * State of pool
 */
type PoolState = `idle` | `active` | `disposed`;
type PoolUserEventMap<V> = {
    readonly disposed: {
        readonly data: V;
        readonly reason: string;
    };
    readonly released: {
        readonly data: V;
        readonly reason: string;
    };
};
/**
 * A use of a pool resource
 *
 * Has two events, _disposed_ and _released_.
 */
declare class PoolUser<V> extends SimpleEventEmitter<PoolUserEventMap<V>> {
    readonly key: string;
    readonly resource: Resource<V>;
    private _lastUpdate;
    private _pool;
    private _state;
    private _userExpireAfterMs;
    /**
     * Constructor
     * @param key User key
     * @param resource Resource being used
     */
    constructor(key: string, resource: Resource<V>);
    /**
     * Returns a human readable debug string
     * @returns
     */
    toString(): string;
    /**
     * Resets countdown for instance expiry.
     * Throws an error if instance is disposed.
     */
    keepAlive(): void;
    /**
     * @internal
     * @param reason
     * @returns
     */
    _dispose(reason: string): void;
    /**
     * Release this instance
     * @param reason
     */
    release(reason: string): void;
    get data(): V;
    /**
     * Returns true if this instance has expired.
     * Expiry counts if elapsed time is greater than `userExpireAfterMs`
     */
    get isExpired(): boolean;
    /**
     * Returns elapsed time since last 'update'
     */
    get elapsed(): number;
    /**
     * Returns true if instance is disposed
     */
    get isDisposed(): boolean;
    /**
     * Returns true if instance is neither disposed nor expired
     */
    get isValid(): boolean;
}
/**
 * A resource allocated in the Pool
 */
declare class Resource<V> {
    readonly pool: Pool<V>;
    private state;
    private readonly _data;
    private users;
    private readonly capacityPerResource;
    private readonly resourcesWithoutUserExpireAfterMs;
    private lastUsersChange;
    /**
     * Constructor.
     * @param pool Pool
     * @param data Data
     */
    constructor(pool: Pool<V>, data: V);
    /**
     * Gets data associated with resource.
     * Throws an error if disposed
     */
    get data(): V;
    /**
     * Returns a human-readable debug string for resource
     * @returns
     */
    toString(): string;
    /**
     * Assigns a user to this resource.
     * @internal
     * @param user
     */
    _assign(user: PoolUser<V>): void;
    /**
     * Releases a user from this resource
     * @internal
     * @param user
     */
    _release(user: PoolUser<V>): void;
    /**
     * Returns true if resource can have additional users allocated
     */
    get hasUserCapacity(): boolean;
    /**
     * Returns number of uses of the resource
     */
    get usersCount(): number;
    /**
     * Returns true if automatic expiry is enabled, and that interval
     * has elapsed since the users list has changed for this resource
     */
    get isExpiredFromUsers(): boolean;
    /**
     * Returns true if instance is disposed
     */
    get isDisposed(): boolean;
    /**
     * Disposes the resource.
     * If it is already disposed, it does nothing.
     * @param reason
     * @returns
     */
    dispose(reason: string): void;
}
/**
 * Resource pool
 */
declare class Pool<V> {
    private _resources;
    private _users;
    readonly capacity: number;
    readonly userExpireAfterMs: number;
    readonly resourcesWithoutUserExpireAfterMs: number;
    readonly capacityPerResource: number;
    readonly fullPolicy: FullPolicy;
    private generateResource?;
    readonly freeResource?: (v: V) => void;
    readonly log: LogSet;
    /**
     * Constructor.
     *
     * By default, no capacity limit, one user per resource
     * @param opts Pool options
     */
    constructor(opts?: Opts<V>);
    /**
     * Returns a debug string of Pool state
     * @returns
     */
    dumpToString(): string;
    /**
     * Sorts users by longest elapsed time since update
     * @returns
     */
    getUsersByLongestElapsed(): PoolUser<V>[];
    /**
     * Returns resources sorted with least used first
     * @returns
     */
    getResourcesSortedByUse(): Resource<V>[];
    /**
     * Adds a resource to the pool.
     * Throws an error if the capacity limit is reached.
     * @param resource
     * @returns
     */
    addResource(resource: V): Resource<V>;
    /**
     * Performs maintenance, removing disposed/expired resources & users.
     * This is called automatically when using a resource.
     */
    maintain(): void;
    /**
     * Iterate over resources in the pool.
     * To iterate over the data associated with each resource, use
     * `values`.
     */
    resources(): Generator<Resource<V>, void, unknown>;
    /**
     * Iterate over resource values in the pool.
     * to iterate over the resources, use `resources`.
     *
     * Note that values may be returned even though there is no
     * active user.
     */
    values(): Generator<V, void, unknown>;
    /**
     * Unassociate a key with a pool item
     * @param userKey
     */
    release(userKey: string, reason?: string): void;
    /**
     * @internal
     * @param user
     */
    _release(user: PoolUser<V>): void;
    /**
     * @internal
     * @param resource
     * @param _
     */
    _releaseResource(resource: Resource<V>, _: string): void;
    /**
     * Returns true if `v` has an associted resource in the pool
     * @param res
     * @returns
     */
    hasResource(res: V): boolean;
    /**
     * Returns true if a given `userKey` is in use.
     * @param userKey
     * @returns
     */
    hasUser(userKey: string): boolean;
    /**
     * @internal
     * @param key
     * @param resource
     * @returns
     */
    private _assign;
    /**
     * @internal
     * @param userKey
     * @returns
     */
    private _findUser;
    /**
     * Return the number of users
     */
    get usersLength(): number;
    /**
     * 'Uses' a resource, returning the value
     * @param userKey
     * @returns
     */
    useValue(userKey: string): V;
    /**
     * Gets a pool item based on a user key.
     * The same key should return the same pool item,
     * for as long as it still exists.
     * @param userKey
     * @returns
     */
    use(userKey: string): PoolUser<V>;
}
/**
 * Creates an instance of a Pool
 * @param opts
 * @returns
 */
declare const create: <V>(opts?: Opts<V>) => Pool<V>;

type Pool$1_FullPolicy = FullPolicy;
type Pool$1_Opts<V> = Opts<V>;
type Pool$1_Pool<V> = Pool<V>;
declare const Pool$1_Pool: typeof Pool;
type Pool$1_PoolState = PoolState;
type Pool$1_PoolUser<V> = PoolUser<V>;
declare const Pool$1_PoolUser: typeof PoolUser;
type Pool$1_PoolUserEventMap<V> = PoolUserEventMap<V>;
type Pool$1_Resource<V> = Resource<V>;
declare const Pool$1_Resource: typeof Resource;
declare const Pool$1_create: typeof create;
declare namespace Pool$1 {
  export {
    Pool$1_FullPolicy as FullPolicy,
    Pool$1_Opts as Opts,
    Pool$1_Pool as Pool,
    Pool$1_PoolState as PoolState,
    Pool$1_PoolUser as PoolUser,
    Pool$1_PoolUserEventMap as PoolUserEventMap,
    Pool$1_Resource as Resource,
    Pool$1_create as create,
  };
}

/**
 * Normalise module
 * * {@link array}: Normalises the contents of an array of known values.
 * * {@link stream}: Normalises a stream of unknown values.
 */

declare const piPi: number;
type NumberFunction = () => number;

declare const index_Bipolar: typeof Bipolar;
declare const index_Correlate: typeof Correlate;
type index_FrequencyEventMap = FrequencyEventMap;
type index_FrequencyMutable<V> = FrequencyMutable<V>;
declare const index_FrequencyMutable: typeof FrequencyMutable;
type index_IntervalTracker = IntervalTracker;
declare const index_IntervalTracker: typeof IntervalTracker;
type index_MovingAverage = MovingAverage;
declare const index_Normalise: typeof Normalise;
type index_NumberFunction = NumberFunction;
declare const index_NumberTracker: typeof NumberTracker;
declare const index_NumberTrackerResults: typeof NumberTrackerResults;
type index_PointTrack = PointTrack;
type index_PointTracker = PointTracker;
declare const index_PointTracker: typeof PointTracker;
type index_PointTrackerResults = PointTrackerResults;
type index_Table<V> = Table<V>;
declare const index_Table: typeof Table;
declare const index_Timestamped: typeof Timestamped;
declare const index_TimestampedObject: typeof TimestampedObject;
type index_TrackedPointMap = TrackedPointMap;
declare const index_TrackedPointMap: typeof TrackedPointMap;
declare const index_TrackedValueMap: typeof TrackedValueMap;
declare const index_TrackedValueOpts: typeof TrackedValueOpts;
declare const index_TrackerBase: typeof TrackerBase;
declare const index_clampIndex: typeof clampIndex;
declare const index_flip: typeof flip;
declare const index_frequencyMutable: typeof frequencyMutable;
declare const index_interpolate: typeof interpolate;
declare const index_interpolateAngle: typeof interpolateAngle;
declare const index_intervalTracker: typeof intervalTracker;
declare const index_movingAverage: typeof movingAverage;
declare const index_movingAverageLight: typeof movingAverageLight;
declare const index_movingAverageTimed: typeof movingAverageTimed;
declare const index_noiseFilter: typeof noiseFilter;
declare const index_numberTracker: typeof numberTracker;
declare const index_piPi: typeof piPi;
declare const index_pointTracker: typeof pointTracker;
declare const index_pointsTracker: typeof pointsTracker;
declare const index_scaleClamped: typeof scaleClamped;
declare const index_scalePercent: typeof scalePercent;
declare const index_scalePercentages: typeof scalePercentages;
declare const index_scaler: typeof scaler;
declare const index_scalerPercent: typeof scalerPercent;
declare const index_wrap: typeof wrap;
declare const index_wrapInteger: typeof wrapInteger;
declare const index_wrapRange: typeof wrapRange;
declare namespace index {
  export {
    index_Bipolar as Bipolar,
    Chain$1 as Chains,
    index_Correlate as Correlate,
    index_FrequencyEventMap as FrequencyEventMap,
    index_FrequencyMutable as FrequencyMutable,
    index$1 as Graphs,
    index_IntervalTracker as IntervalTracker,
    index_MovingAverage as MovingAverage,
    index_Normalise as Normalise,
    index_NumberFunction as NumberFunction,
    index_NumberTracker as NumberTracker,
    index_NumberTrackerResults as NumberTrackerResults,
    index$2 as Pipes,
    index_PointTrack as PointTrack,
    index_PointTracker as PointTracker,
    index_PointTrackerResults as PointTrackerResults,
    Pool$1 as Pool,
    Signal$1 as Signals,
    index_Table as Table,
    index_Timestamped as Timestamped,
    index_TimestampedObject as TimestampedObject,
    index_TrackedPointMap as TrackedPointMap,
    index_TrackedValueMap as TrackedValueMap,
    index_TrackedValueOpts as TrackedValueOpts,
    index_TrackerBase as TrackerBase,
    clamp$1 as clamp,
    index_clampIndex as clampIndex,
    index_flip as flip,
    index_frequencyMutable as frequencyMutable,
    index_interpolate as interpolate,
    index_interpolateAngle as interpolateAngle,
    index_intervalTracker as intervalTracker,
    index_movingAverage as movingAverage,
    index_movingAverageLight as movingAverageLight,
    index_movingAverageTimed as movingAverageTimed,
    index_noiseFilter as noiseFilter,
    index_numberTracker as numberTracker,
    index_piPi as piPi,
    index_pointTracker as pointTracker,
    index_pointsTracker as pointsTracker,
    scale$1 as scale,
    index_scaleClamped as scaleClamped,
    index_scalePercent as scalePercent,
    index_scalePercentages as scalePercentages,
    index_scaler as scaler,
    index_scalerPercent as scalerPercent,
    index_wrap as wrap,
    index_wrapInteger as wrapInteger,
    index_wrapRange as wrapRange,
  };
}

export { flip as A, Bipolar as B, Chain$1 as C, Table as D, interpolate as E, FrequencyEventMap as F, interpolateAngle as G, wrapInteger as H, IntervalTracker as I, wrap as J, wrapRange as K, MovingAverage as M, NumberFunction as N, Pool$1 as P, Signal$1 as S, TrackedPointMap as T, Normalise as a, index$2 as b, index$1 as c, Correlate as d, FrequencyMutable as e, frequencyMutable as f, movingAverageTimed as g, movingAverage as h, index as i, intervalTracker as j, PointTrack as k, PointTrackerResults as l, movingAverageLight as m, noiseFilter as n, PointTracker as o, piPi as p, pointsTracker as q, pointTracker as r, clamp$1 as s, clampIndex as t, scale$1 as u, scaler as v, scaleClamped as w, scalePercentages as x, scalePercent as y, scalerPercent as z };
