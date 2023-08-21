import { M as MinMaxAvgTotal } from './MinMaxAvg-bf5430b4.js';
import { T as ToString } from './Util-21835c84.js';
import { S as SimpleEventEmitter } from './Events-b4b55fba.js';
import { a as KeyValue } from './KeyValue-30a823cf.js';
import { N as NumberTracker, T as TrackedValueOpts, a as TrackerBase, b as Timestamped, c as TrackedValueMap, n as numberTracker } from './NumberTracker-4722db70.js';
import { P as PointRelationResult, a as Point, b as PointRelation, c as PolyLine, L as Line } from './Point-94426255.js';
import { C as Coord } from './Polar-f6053bde.js';
import { L as LogSet } from './Debug-1701deb8.js';

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
declare const array: (values: readonly number[], minForced?: number, maxForced?: number) => number[];

declare const Normalise_array: typeof array;
declare const Normalise_stream: typeof stream;
declare namespace Normalise {
  export {
    Normalise_array as array,
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
 * @param weightingFn Optional weighting function
 * @returns
 */
declare const movingAverage: (samples?: number, weightingFn?: ((v: number) => number) | undefined) => MovingAverage;
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
declare class ObjectTracker<V extends object> extends TrackerBase<V> {
    values: Timestamped<V>[];
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
    seenImpl(p: V[] | Timestamped<V>[]): Timestamped<V>[];
    /**
     * Last seen value. If no values have been added, it will return the initial value
     */
    get last(): Timestamped<V>;
    /**
     * Returns the initial value
     */
    get initial(): Timestamped<V> | undefined;
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
type PointTrackerResults = {
    readonly fromLast: PointTrack;
    readonly fromInitial: PointTrack;
    readonly values: readonly Point[];
};
/**
 * Point tracker. Create via `pointTracker()`.
 *
 */
declare class PointTracker extends ObjectTracker<Point> {
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
    /**
     * Tracks a point, returning data on its relation to the
     * initial point and the last received point.
     * @param p Point
     */
    seen(...p: Point[] | Timestamped<Point>[]): PointTrackerResults;
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
declare class TrackedPointMap extends TrackedValueMap<Point, PointTracker> {
    constructor(opts?: TrackedValueOpts);
}
/**
 * Track several named points over time, eg a TensorFlow body pose point.
 * Call `seen()` to track a point. Mutable. If you want to compare
 * a single coordinate with a reference coordinate, [Geometry.Points.relation](Geometry.Points.relation.html) may be a better choice.
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
 * pt.size;         // How many named points are being tracked
 * pt.delete(id);  // Delete named point
 * pt.reset();     // Clear data
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
 * pt.trackedByAge();   // Iterates over tracked points, sorted by age (oldest first)
 * pt.tracked();  // Tracked values
 * pt.ids();      // Iterator over ids
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
 * * `storeIntermediate`: if true, all points are stored internally
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
 * [See the point tracker playground](https://clinth.github.io/ixfx-play/data/point-tracker/index.html)
 *
 * ```js
 * import { pointTracker } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * // Create a tracker
 * const t = pointTracker();
 *
 * // ...and later, tell it when a point is seen
 * const nfo = t.seen({x: evt.x, y:evt.y});
 * // nfo gives us some details on the relation between the seen point, the start, and points in-between
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
 * does not store intermediate 'seen' points. To use the tracker as a buffer.
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
 * When using a limited buffer, the 'initial' point will be the oldest in the
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
 *
 * @param v Value to clamp
 * @param Minimum value (inclusive)
 * @param Maximum value (inclusive)
 * @returns Clamped value
 */
declare const clamp: (v: number, min?: number, max?: number) => number;
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
declare const clampIndex: (v: number, arrayOrLength: number | readonly any[]) => number;

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
declare const scale: (v: number, inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: ((v: number) => number) | undefined) => number;
/**
 * Returns a scaling function
 * @param inMin Input minimum
 * @param inMax Input maximum
 * @param outMin Output minimum. If not specified, 0
 * @param outMax Output maximum. If not specified, 1
 * @param easing Easing function
 * @returns
 */
declare const scaleFn: (inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: ((v: number) => number) | undefined) => (v: number) => number;
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
 * @see {@link scalePercentFn} Returns a function
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
declare const scalePercentFn: (outMin: number, outMax: number) => (v: number) => number;

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

declare const piPi: number;
type NumberFunction = () => number;

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
type index_PointTrack = PointTrack;
type index_PointTracker = PointTracker;
declare const index_PointTracker: typeof PointTracker;
type index_PointTrackerResults = PointTrackerResults;
declare const index_Timestamped: typeof Timestamped;
type index_TrackedPointMap = TrackedPointMap;
declare const index_TrackedPointMap: typeof TrackedPointMap;
declare const index_TrackedValueMap: typeof TrackedValueMap;
declare const index_TrackedValueOpts: typeof TrackedValueOpts;
declare const index_TrackerBase: typeof TrackerBase;
declare const index_clamp: typeof clamp;
declare const index_clampIndex: typeof clampIndex;
declare const index_flip: typeof flip;
declare const index_frequencyMutable: typeof frequencyMutable;
declare const index_interpolate: typeof interpolate;
declare const index_interpolateAngle: typeof interpolateAngle;
declare const index_intervalTracker: typeof intervalTracker;
declare const index_movingAverage: typeof movingAverage;
declare const index_movingAverageLight: typeof movingAverageLight;
declare const index_movingAverageTimed: typeof movingAverageTimed;
declare const index_numberTracker: typeof numberTracker;
declare const index_piPi: typeof piPi;
declare const index_pointTracker: typeof pointTracker;
declare const index_pointsTracker: typeof pointsTracker;
declare const index_scale: typeof scale;
declare const index_scaleClamped: typeof scaleClamped;
declare const index_scaleFn: typeof scaleFn;
declare const index_scalePercent: typeof scalePercent;
declare const index_scalePercentFn: typeof scalePercentFn;
declare const index_scalePercentages: typeof scalePercentages;
declare const index_wrap: typeof wrap;
declare const index_wrapInteger: typeof wrapInteger;
declare const index_wrapRange: typeof wrapRange;
declare namespace index {
  export {
    index_Correlate as Correlate,
    index_FrequencyEventMap as FrequencyEventMap,
    index_FrequencyMutable as FrequencyMutable,
    index_IntervalTracker as IntervalTracker,
    index_MovingAverage as MovingAverage,
    index_Normalise as Normalise,
    index_NumberFunction as NumberFunction,
    index_NumberTracker as NumberTracker,
    index_PointTrack as PointTrack,
    index_PointTracker as PointTracker,
    index_PointTrackerResults as PointTrackerResults,
    Pool$1 as Pool,
    index_Timestamped as Timestamped,
    index_TrackedPointMap as TrackedPointMap,
    index_TrackedValueMap as TrackedValueMap,
    index_TrackedValueOpts as TrackedValueOpts,
    index_TrackerBase as TrackerBase,
    index_clamp as clamp,
    index_clampIndex as clampIndex,
    index_flip as flip,
    index_frequencyMutable as frequencyMutable,
    index_interpolate as interpolate,
    index_interpolateAngle as interpolateAngle,
    index_intervalTracker as intervalTracker,
    index_movingAverage as movingAverage,
    index_movingAverageLight as movingAverageLight,
    index_movingAverageTimed as movingAverageTimed,
    index_numberTracker as numberTracker,
    index_piPi as piPi,
    index_pointTracker as pointTracker,
    index_pointsTracker as pointsTracker,
    index_scale as scale,
    index_scaleClamped as scaleClamped,
    index_scaleFn as scaleFn,
    index_scalePercent as scalePercent,
    index_scalePercentFn as scalePercentFn,
    index_scalePercentages as scalePercentages,
    index_wrap as wrap,
    index_wrapInteger as wrapInteger,
    index_wrapRange as wrapRange,
  };
}

export { wrap as A, wrapRange as B, Correlate as C, FrequencyEventMap as F, IntervalTracker as I, MovingAverage as M, NumberFunction as N, Pool$1 as P, TrackedPointMap as T, Normalise as a, FrequencyMutable as b, movingAverageTimed as c, movingAverage as d, intervalTracker as e, frequencyMutable as f, PointTrack as g, PointTrackerResults as h, index as i, PointTracker as j, pointsTracker as k, pointTracker as l, movingAverageLight as m, clamp as n, clampIndex as o, piPi as p, scaleFn as q, scaleClamped as r, scale as s, scalePercentages as t, scalePercent as u, scalePercentFn as v, flip as w, interpolate as x, interpolateAngle as y, wrapInteger as z };
