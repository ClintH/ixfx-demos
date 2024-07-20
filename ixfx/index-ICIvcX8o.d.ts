import { a as RandomOptions, R as RandomSource } from './Types-Tj0rQbez.js';
import { c as RemapObjectPropertyType, R as RecursiveReplace, e as ReactiveNonInitial, C as ChangeKind, f as ChangeRecord, g as CompareChangeSet, I as IsEqualContext, P as Pathed, h as Process, i as changedDataFields, j as compareArrays, k as compareData, l as compareKeys, m as isEmptyEntries, n as isEqualContextString } from './Types-qqK8vQyN.js';
import { N as NumberFunction, P as PointTrackerResults, V as ValueType, b as PointTrack, c as RankArrayOptions, R as RankFunction, a as RankOptions } from './Types-soOaQOq9.js';
import { M as MinMaxAvgTotal } from './Types-S_XFjbWq.js';
import { T as ToString } from './ToString-Wn1YmnlL.js';
import { S as SimpleEventEmitter } from './Events-MevXuVvQ.js';
import { S as SortSyles } from './KeyValue-DmOq6NOs.js';
import { K as KeyValue } from './PrimitiveTypes-HWqXs_XP.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { N as NumberTracker, T as TrackedValueOpts, a as TrackerBase, b as TimestampedObject, c as TrackedValueMap, d as NumberTrackerResults, P as PrimitiveTracker, e as Timestamped, f as TimestampedPrimitive, n as numberTracker } from './NumberTracker-YxkFQGX5.js';
import { C as Coord } from './Polar-AdpzobNh.js';
import { P as PolyLine, L as Line } from './LineType-Lekba5_H.js';
import { P as Point } from './PointType-0vgoM_lJ.js';
import { a as PointRelation } from './PointRelationTypes-s8dUPZOm.js';
import { b as LogSet } from './Types-Yc1lP6QG.js';
import { a as IMapImmutable } from './Map-DC36QsdS.js';
import { i as index$3 } from './index-sl5HYB0p.js';
import { G as GetOrGenerate, a as IDictionary, I as IWithEntries, b as getOrGenerate, g as getOrGenerateSync } from './GetOrGenerate-WG7g4q9M.js';
import { M as MergeReconcile, c as addKeepingExisting, m as addObject, d as deleteByValue, j as filter, n as find, f as firstEntryByIterablePredicate, b as firstEntryByIterableValue, k as fromIterable, l as fromObject, g as getClosestIntegerKey, a as getFromKeys, i as hasAnyValue, h as hasKeyValue, u as mapToArray, p as mapToObjectTransform, v as mergeByKey, o as some, s as sortByValue, e as sortByValueProperty, t as toArray, r as toObject, q as transformMap, z as zipKeyValue } from './MapFns-bJf6VOuJ.js';

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
 * @param startingValueOrBipolar Initial numeric value or BipolarWrapper instance
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
 * Scale & clamp a number to bipolar range (-1..1)
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
declare const scale$1: (inputValue: number, inMin: number, inMax: number) => number;
/**
 * Scale a number to bipolar range (-1..1). Not clamped to scale.
 *
 * ```js
 * import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * // Scale 100 on 0..100 scale
 * Bipolar.scale(100, 0, 100); // 1
 * Bipolar.scale(50, 0, 100);  // 0
 * Bipolar.scale(0, 0, 100);   // -1
 * ```
 *
 * @param inputValue Value to scale
 * @param inMin Minimum of scale
 * @param inMax Maximum of scale
 * @returns Bipolar value on -1..1 scale
 */
declare const scaleUnclamped: (inputValue: number, inMin: number, inMax: number) => number;
/**
 * Source for random bipolar values
 * ```js
 * const r = Bipolar.randomSource();
 * r(); // Produce random value on -1...1 scale
 * ```
 *
 * Options can be provided, for example
 * ```js
 * // -0.5 to 0.5 range
 * Bipolar.randomSource({ max: 0.5 });
 * ```
 *
 * Consider using {@link random} if you just want a one-off random
 * value.
 * @param maxOrOptions Maximum value (number) or options for random generation
 * @returns
 */
declare const randomSource: (maxOrOptions?: number | RandomOptions) => RandomSource;
/**
 * Returns a random bipolar value
 * ```js
 * const r = Bipolar.random(); // -1...1 random
 * ```
 *
 * Options can be provided, eg.
 * ```js
 * Bipolar.random({ max: 0.5 }); // -0.5..0.5 random
 * ```
 *
 * Use {@link randomSource} if you want to generate random
 * values with same settings repeatedly.
 * @param maxOrOptions
 * @returns
 */
declare const random: (maxOrOptions?: number | RandomOptions) => number;
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
declare const clamp$1: (bipolarValue: number) => number;
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
declare const Bipolar_fromScalar: typeof fromScalar;
declare const Bipolar_immutable: typeof immutable;
declare const Bipolar_random: typeof random;
declare const Bipolar_randomSource: typeof randomSource;
declare const Bipolar_scaleUnclamped: typeof scaleUnclamped;
declare const Bipolar_toScalar: typeof toScalar;
declare const Bipolar_towardZero: typeof towardZero;
declare namespace Bipolar {
  export { type Bipolar_BipolarWrapper as BipolarWrapper, clamp$1 as clamp, Bipolar_fromScalar as fromScalar, Bipolar_immutable as immutable, Bipolar_random as random, Bipolar_randomSource as randomSource, scale$1 as scale, Bipolar_scaleUnclamped as scaleUnclamped, Bipolar_toScalar as toScalar, Bipolar_towardZero as towardZero };
}

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
 * @param min value (inclusive)
 * @param max value (inclusive)
 * @returns Clamped value
 */
declare const clamp: (value: number, min?: number, max?: number) => number;
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
 * @param similarityFn Function to compute similarity
 * @param lastData Old data
 * @param newData New data
 * @param options Options
 * @returns
 */
declare const align: <V>(similarityFn: Similarity<V>, lastData: readonly DataWithId<V>[] | undefined, newData: readonly DataWithId<V>[], options?: AlignOpts) => readonly DataWithId<V>[];
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
 * @param fn Function to compute similarity
 * @param options Options
 * @returns
 */
declare const alignById: <V>(fn: Similarity<V>, options?: AlignOpts) => (newData: DataWithId<V>[]) => DataWithId<V>[];

type Correlate_AlignOpts = AlignOpts;
type Correlate_DataWithId<V> = DataWithId<V>;
type Correlate_Similarity<V> = Similarity<V>;
declare const Correlate_align: typeof align;
declare const Correlate_alignById: typeof alignById;
declare namespace Correlate {
  export { type Correlate_AlignOpts as AlignOpts, type Correlate_DataWithId as DataWithId, type Correlate_Similarity as Similarity, Correlate_align as align, Correlate_alignById as alignById };
}

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

type FrequencyEventMap = {
    readonly change: {
        context: any;
    };
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
    toArray(): Array<[key: string, count: number]>;
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
    entriesSorted(sortStyle?: SortSyles): ReadonlyArray<KeyValue>;
    /**
     *
     * @param values Values to add. Fires _change_ event after adding item(s)
     */
    add(...values: Array<V>): void;
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

type InterpolateOptions = {
    limits: `clamp` | `wrap` | `ignore`;
};
/**
 * Interpolates between `a` and `b` by `amount`. Aka `lerp`.
 *
 * [ixfx Guide](https://clinth.github.io/ixfx-docs/modulation/interpolate/)
 *
 * @example Get the halfway point between 30 and 60
 * ```js
 * import { interpolate } from 'https://unpkg.com/ixfx/dist/data.js';
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
 * See also {@link interpolatorStepped} and {@link interpolatorInterval} for functions
 * which help to manage progression from A->B over steps or interval.
 *
 * If two parameters are given, it instead returns a function which interpolates:
 * ```js
 * const i = interpolate(100, 200);
 * i(0.5); // 150
 *
 * // Compared to:
 * interpolate(0.5, 100, 200); // 150
 * ```
 *
 * This is useful if you want to reuse the interpolator with fixed `a` and `b` values.
 *
 * Usually interpolation amount is on a 0...1 scale, inclusive. What is the interpolation result
 * if this scale is exceeded? By default it is clamped to 0..1, so the return value is always between `a` and `b` (inclusive).
 *
 * Alternatively, set the `limits` option to process `amount`:
 * * 'wrap': wrap amount, eg 1.5 is the same as 0.5, 2 is the same as 1
 * * 'ignore': allow exceeding values. eg 1.5 will yield b*1.5.
 * * 'clamp': default behaviour of clamping interpolation amount to 0..1
 *
 * To interpolate certain types: {@link Colour.interpolator | Visual.Colour.interpolator }, {@link Points.interpolate | Points.interpolate}.
 * @param amount Interpolation amount, between 0 and 1 inclusive
 * @param a Start (ie when `amt` is 0)
 * @param b End (ie. when `amt` is 1)
 * @returns Interpolated value which will be between `a` and `b`.
 */
declare function interpolate(amount: number, options?: Partial<InterpolateOptions>): (a: number, b: number) => number;
declare function interpolate(amount: number, a: number, b: number, options?: Partial<InterpolateOptions>): number;
declare function interpolate(a: number, b: number, options?: Partial<InterpolateOptions>): (amount: number) => number;
/**
 * Returns a function that interpolates from A to B.
 * It steps through the interpolation with each call to the returned function.
 * This means that the `incrementAmount` will hinge on the rate
 * at which the function is called. Alternatively, consider {@link interpolatorInterval}
 * which steps on the basis of clock time.
 *
 * ```js
 * // Interpolate from 0..1 by 0.01
 * const v = interpolatorStepped(0.01, 100, 200);
 * v(); // Each call returns a value closer to target
 * // Eg: 100, 110, 120, 130 ...
 * ```
 *
 * Under the hood, it calls `interpolate` with an amount that
 * increases by `incrementAmount` each time.
 *
 * When calling `v()` to step the interpolator, you can also pass
 * in new B and A values. Note that the order is swapped: the B (target) is provided first, and
 * then optionally A.
 *
 * ```js
 * const v = interpolatorStepped(0.1, 100, 200); // Interpolate 100->200
 * v(300, 200); // Retarget to 200->300 and return result
 * v(150); // Retarget 200->150 and return result
 * ```
 *
 * This allows you to maintain the current interpolation progress.
 * @param incrementAmount Amount to increment by
 * @param a Start value. Default: 0
 * @param b End value. Default: 1
 * @param startInterpolationAt Starting interpolation amount. Default: 0
 * @returns
 */
declare const interpolatorStepped: (incrementAmount: number, a?: number, b?: number, startInterpolationAt?: number) => (retargetB?: number, retargetA?: number) => number;
/**
 * Interpolates between A->B over `duration`.
 * Given the same A & B values, steps will be larger if it's a longer
 * duration, and shorter if it's a smaller duration.
 *
 * A function is returned, which when invoked yields a value between A..B.
 *
 * Alternatively to step through by the same amount regardless
 * of time, use {@link interpolatorStepped}.
 *
 * ```js
 * // Interpolate from 0..1 over one minute
 * const v = interpolatorInterval({mins:1});
 * v(); // Compute current value
 * ```
 *
 * Use start and end points:
 * ```js
 * // Interpolate from 100-200 over 10 seconds
 * const v = interpolatorInterval({secs:10}, 100, 200);
 * v(); // Compute current value
 * ```
 * @param duration
 * @param a
 * @param b
 * @returns
 */
declare const interpolatorInterval: (duration: Interval, a?: number, b?: number) => (retargetB?: number, retargetA?: number) => number;
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
 * @param options Options for tracker
 * @returns New interval tracker
 */
declare const intervalTracker: (options?: TrackedValueOpts) => IntervalTracker;

/**
 * Returns a copy of `object` with integer numbers as keys instead of whatever it has.
 * ```js
 * keysToNumbers({ '1': true }); // Yields: { 1: true }
 * ```
 *
 * The `onInvalidKey` sets how to handle keys that cannot be converted to integers.
 * * 'throw' (default): throws an exception
 * * 'ignore': that key & value is ignored
 * * 'keep': uses the string key instead
 *
 *
 * ```js
 * keysToNumber({ hello: 'there' }, `ignore`); // Yields: {  }
 * keysToNumber({ hello: 'there' }, `throw`);  // Exception
 * keysToNumber({ hello: 'there' }, `keep`);   // Yields: { hello: 'there' }
 * ```
 *
 * Floating-point numbers will be converted to integer by rounding.
 * ```js
 * keysToNumbers({ '2.4': 'hello' }); // Yields: { 2: 'hello' }
 * ```
 * @param object
 * @param onInvalidKey
 * @returns
 */
declare const keysToNumbers: <T>(object: Record<any, T>, onInvalidKey?: `throw` | `ignore` | `keep`) => Record<number, T>;

/**
 * Maps the top-level properties of an object through a map function.
 * That is, run each of the values of an object through a function,
 * setting the result onto the same key structure as original.
 *
 * It is NOT recursive.
 *
 * The mapping function gets a single args object, consisting of `{ value, field, index }`,
 * where 'value' is the value of the field, 'field' the name, and 'index' a numeric count.
 * @example Double the value of all fields
 * ```js
 * const rect = { width: 100, height: 250 };
 * const doubled = mapObjectShallow(rect, args => {
 *  return args.value*2;
 * });
 * // Yields: { width: 200, height: 500 }
 * ```
 *
 * Since the map callback gets the name of the property, it can do context-dependent things.
 * ```js
 * const rect = { width: 100, height: 250, colour: 'red' }
 * const doubled = mapObjectShallow(rect, args => {
 *  if (args.field === 'width') return args.value*3;
 *  else if (typeof args.value === 'number') return args.value*2;
 *  return args.value;
 * });
 * // Yields: { width: 300, height: 500, colour: 'red' }
 * ```
 * In addition to bulk processing, it allows remapping of property types.
 *
 * In terms of type-safety, the mapped properties are assumed to have the
 * same type.
 *
 * ```js
 * const o = {
 *  x: 10,
 *  y: 20,
 *  width: 200,
 *  height: 200
 * }
 *
 * // Make each property use an averager instead
 * const oAvg = mapObjectShallow(o, args => {
 *  return movingAverage(10);
 * });
 *
 * // Instead of { x:number, y:number... }, we now have { x:movingAverage(), y:movingAverage()... }
 * // Add a value to the averager
 * oAvg.x.add(20);
 * ```
 */
declare const mapObjectShallow: <TSource extends Record<string, any>, TFieldValue>(object: TSource, mapFunction: (args: MapObjectArgs) => TFieldValue) => RemapObjectPropertyType<TSource, TFieldValue>;
type MapObjectArgs = {
    field: string;
    path: string;
    value: any;
    index: number;
};
declare function mapObjectByObject(data: any, mapper: Record<string, (value: any, context: any) => any>): {
    [k: string]: unknown;
};

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
 * @returns Function that adds to average.
 */
declare const movingAverageLight: (scaling?: number) => (value?: number) => number;
type MovingAverageTimedOptions = Readonly<{
    interval: Interval;
    default?: number;
    abort?: AbortSignal;
}>;
/**
 * Uses the same algorithm as {@link movingAverageLight}, but adds values automatically if
 * nothing has been manually added.
 *
 * ```js
 * // By default, 0 is added if interval elapses
 * const mat = movingAverageTimed({ interval: 1000 });
 * mat(10); // Add value of 10, returns latest average
 *
 * mat(); // Get current average
 * ```
 *
 * This is useful if you are averaging something based on events. For example calculating the
 * average speed of the pointer. If there is no speed, there is no pointer move event. Using
 * this function, `value` is added at a rate of `updateRateMs`. This timer is reset
 * every time a value is added, a bit like the `debounce` function.
 *
 * Use an AbortSignal to cancel the timer associated with the `movingAverageTimed` function.
 * @param options
 * @returns
 */
declare const movingAverageTimed: (options: MovingAverageTimedOptions) => (v: number) => number;
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
declare const movingAverage: (samples?: number, weighter?: (v: number) => number) => (value?: number) => number;
/**
 * Noise filtering
 *
 * Algorithm: https://gery.casiez.net/1euro/
 *
 * Based on [Jaan Tollander de Balsch's implementation](https://jaantollander.com/post/noise-filtering-using-one-euro-filter/)
 * @param cutoffMin Default: 1
 * @param speedCoefficient Default: 0
 * @param cutoffDefault Default: 1
 */
declare const noiseFilter: (cutoffMin?: number, speedCoefficient?: number, cutoffDefault?: number) => (value: number, timestamp?: number) => number;

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
declare const array: (values: ReadonlyArray<number>, minForced?: number, maxForced?: number) => number[];

declare const Normalise_array: typeof array;
declare const Normalise_stream: typeof stream;
declare namespace Normalise {
  export { Normalise_array as array, Normalise_stream as stream };
}

type RecordValue<T extends Record<string, any>, TReturn> = {
    [Property in keyof T]?: (value: T[Property], previous: T[Property], field: string) => TReturn;
};
type RecordOptions<T extends Record<string, any>, TReturn> = {
    onFieldChange: RecordValue<T, TReturn>;
};
declare const compareDataExecute: <T extends Record<string, any>, TReturn>(o: T, options: RecordOptions<T, TReturn>) => (value: T) => RecursiveReplace<T, TReturn>;

/**
 * A tracked value of type `V`.
 */
declare abstract class ObjectTracker<V extends object, SeenResultType> extends TrackerBase<V, SeenResultType> {
    values: Array<TimestampedObject<V>>;
    constructor(opts?: TrackedValueOpts);
    onTrimmed(): void;
    /**
     * Reduces size of value store to `limit`.
     * Returns number of remaining items
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
     * @param _p Point
     */
    computeResults(_p: Array<TimestampedObject<Point>>): PointTrackerResults;
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
     * This is the direct distance from initial to last,
     * not the accumulated length.
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
 * @param options
 * @returns
 */
declare const pointsTracker: (options?: TrackedValueOpts) => TrackedPointMap;
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
     * Activity is marked whenever `use` us called with that user key.
     * Default: disabled
     */
    readonly userExpireAfterMs?: number;
    /**
     * If above 0, resources with no users will be automatically removed after this interval.
     * Default: disabled
     */
    readonly resourcesWithoutUserExpireAfterMs?: number;
    /**
     * Maximum number of users per resource. Defaults to 1
     */
    readonly capacityPerResource?: number;
    /**
     * What to do if pool is full and a new resource allocation is requested.
     * Default is `error`, throwing an error when pool is full.
     */
    readonly fullPolicy?: FullPolicy;
    /**
     * If true, additional logging will trace activity of pool.
     * Default: false
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
    _dispose(reason: string, data: V): void;
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
    #private;
    readonly pool: Pool<V>;
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
     * Changes the data associated with this resource.
     * Throws an error if disposed or `data` is undefined.
     * @param data
     */
    updateData(data: V): void;
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
     * @param options Pool options
     */
    constructor(options?: Opts<V>);
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
     * @param resource
     * @returns
     */
    hasResource(resource: V): boolean;
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
 * @param options
 * @returns
 */
declare const create: <V>(options?: Opts<V>) => Pool<V>;

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
  export { type Pool$1_FullPolicy as FullPolicy, type Pool$1_Opts as Opts, Pool$1_Pool as Pool, type Pool$1_PoolState as PoolState, Pool$1_PoolUser as PoolUser, type Pool$1_PoolUserEventMap as PoolUserEventMap, Pool$1_Resource as Resource, Pool$1_create as create };
}

/**
 * Scales a percentage-scale number, ie: `v * t`.
 * The utility of this function is that it sanity-checks that
 *  both parameters are in the 0..1 scale.
 * @param v Value
 * @param t Scale amount
 * @returns Scaled value
 */
declare const proportion: (v: number | NumberFunction, t: number | NumberFunction) => number;

/**
 * Something that can resolve to a value
 */
type ResolveToValue<V> = ValueType | Promise<V> | ReactiveNonInitial<V> | Generator<V> | AsyncGenerator<V> | IterableIterator<V> | AsyncIterableIterator<V> | ((args: any) => V);
/**
 * Resolves `r` to a value, where `r` is:
 * * primitive value
 * * a/sync function
 * * a/sync generator/iterator
 * * ReactiveNonInitial
 *
 * ```js
 * await resolve(10);       // 10
 * await resolve(() => 10); // 10
 * await resole(async () => {
 *  sleep(100);
 *  return 10;
 * });                // 10
 * ```
 *
 * To resolve an object's properties, use {@link resolveFields}.
 *
 * Resolve is not recursive. So if `r` is an object, it will be returned, even
 * though its properties may be resolvable.
 * @param r
 * @param args
 * @returns
 */
declare function resolve<V extends ValueType>(r: ResolveToValue<V>, ...args: any): Promise<V>;

type ResolvedObject<T extends Record<string, ResolveToValue<any>>> = {
    [K in keyof T]: T[K] extends number ? number : T[K] extends string ? string : T[K] extends boolean ? boolean : T[K] extends bigint ? bigint : T[K] extends () => Promise<any> ? Awaited<ReturnType<T[K]>> : T[K] extends () => any ? ReturnType<T[K]> : T[K] extends ReactiveNonInitial<infer V> ? V : T[K] extends Generator<infer V> ? V : T[K] extends AsyncGenerator<infer V> ? V : T[K] extends IterableIterator<infer V> ? V : T[K] extends AsyncIterableIterator<infer V> ? V : T[K] extends Array<infer V> ? V : T[K] extends object ? T[K] : never;
};
/**
 * Returns a copy of `object`, with the same properties. For each property
 * that has a basic value (string, number, boolean, object), the value is set
 * for the return object. If the property is a function or generator, its value
 * is used instead. Async functions and generators are also usable.
 *
 * In the below example, the function for the property `random` is invoked.
 * ```js
 * const state = {
 *  length: 10,
 *  random: () => Math.random();
 * }
 * const x = resolveFields(state);
 * // { length: 10, random: 0.1235 }
 * ```
 *
 * It also works with generators
 * ```js
 * import { count } from './numbers.js';
 *
 * const state = {
 *  length: 10,
 *  index: count(2) // Generator that yields: 0, 1 and then ends
 * }
 * resolveFields(state); // { length: 10, index: 0 }
 * resolveFields(state); // { length: 10, index: 1 }
 * // Generator finishes after counting twice:
 * resolveFields(state); // { length: 10, index: undefined }
 * ```
 * @param object
 * @returns
 */
declare function resolveFields<T extends Record<string, ResolveToValue<any>>>(object: T): Promise<ResolvedObject<T>>;

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
declare const scale: (v: number, inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: (v: number) => number) => number;
/**
 * Returns a scaling function
 * @param inMin Input minimum
 * @param inMax Input maximum
 * @param outMin Output minimum. If not specified, 0
 * @param outMax Output maximum. If not specified, 1
 * @param easing Easing function
 * @returns
 */
declare const scaler: (inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: (v: number) => number) => ((v: number) => number);
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
declare const scaleClamped: (v: number, inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: (v: number) => number) => number;
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
 * Via: https://gist.github.com/cyphunk/6c255fa05dd30e69f438a930faeb53fe
 * @param logits
 * @returns
 */
declare const softmax: (logits: Array<number>) => number[];

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

type TrackUnique<T> = (value: T) => boolean;
/**
 * Tracks unique values. Returns _true_ if value is unique.
 * Alternatively: {@link trackUniqueInstances}
 *
 * ```js
 * const t = trackUnique();
 * t(`hello`); // true
 * t(`hello`); // false
 * ```
 *
 * Uses JSON.stringify to compare anything which is not a string.
 *
 * Provide a custom function to convert to string to track uniqueness
 * for more complicated objects.
 *
 * ```js
 * const t = trackUnique(p => p.name);
 * t({ name:`John`, level:2 }); // true
 *
 * // Since we're judging uniques by name only
 * t({ name:`John`, level:3 }); // false
 * ```
 *
 * Return function throws an error if `value` is null or undefined.
 * @returns
 */
declare const trackUnique: <T>(toString?: ToString<T>) => TrackUnique<T>;
/**
 * Tracks unique object instances. Returns _true_ if value is unique.
 * Alternatively: {@link trackUnique} to track by value.
 */
declare const trackUniqueInstances: <T>() => TrackUnique<T>;

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
    weight?: number;
}>, void, unknown>;
/**
 * Iterate over all the vertices of the graph
 * @param graph
 */
declare function vertices(graph: DirectedGraph): Generator<Readonly<{
    out: ReadonlyArray<Edge$1>;
    id: string;
}>, void, unknown>;
/**
 * Iterate over all the vertices connectd to `context` vertex
 * @param graph Graph
 * @param context id or Vertex
 * @returns
 */
declare function adjacentVertices$1(graph: DirectedGraph, context: Vertex$1 | string | undefined): Generator<Readonly<{
    out: ReadonlyArray<Edge$1>;
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
    out: ReadonlyArray<Edge$1>;
    id: string;
}>, void, unknown>;
/**
 * Iterates over vertices from a starting vertex in an depth-first-search
 * @param graph
 * @param startIdOrVertex
 */
declare function dfs(graph: DirectedGraph, startIdOrVertex: string | Vertex$1): Generator<Readonly<{
    out: ReadonlyArray<Edge$1>;
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
    vertices: IMapImmutable<string, Vertex$1>;
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
  export { type ConnectOptions$1 as ConnectOptions, type DirectedGraph$1_DirectedGraph as DirectedGraph, type DirectedGraph$1_DistanceCompute as DistanceCompute, type Edge$1 as Edge, type Vertex$1 as Vertex, adjacentVertices$1 as adjacentVertices, DirectedGraph$1_areAdjacent as areAdjacent, DirectedGraph$1_bfs as bfs, DirectedGraph$1_clone as clone, connect$1 as connect, connectTo$1 as connectTo, createVertex$1 as createVertex, DirectedGraph$1_dfs as dfs, DirectedGraph$1_disconnect as disconnect, DirectedGraph$1_distance as distance, DirectedGraph$1_distanceDefault as distanceDefault, dumpGraph$1 as dumpGraph, DirectedGraph$1_edges as edges, DirectedGraph$1_getCycles as getCycles, getOrCreate$1 as getOrCreate, DirectedGraph$1_getOrFail as getOrFail, graph$1 as graph, DirectedGraph$1_graphFromVertices as graphFromVertices, DirectedGraph$1_hasNoOuts as hasNoOuts, DirectedGraph$1_hasOnlyOuts as hasOnlyOuts, DirectedGraph$1_hasOut as hasOut, DirectedGraph$1_isAcyclic as isAcyclic, DirectedGraph$1_pathDijkstra as pathDijkstra, toAdjacencyMatrix$1 as toAdjacencyMatrix, DirectedGraph$1_topologicalSort as topologicalSort, DirectedGraph$1_transitiveReduction as transitiveReduction, updateGraphVertex$1 as updateGraphVertex, DirectedGraph$1_vertexHasOut as vertexHasOut, DirectedGraph$1_vertices as vertices };
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
    weight?: number;
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
  export { type UndirectedGraph_ConnectOptions as ConnectOptions, type UndirectedGraph_Edge as Edge, type UndirectedGraph_Graph as Graph, type UndirectedGraph_Vertex as Vertex, UndirectedGraph_adjacentVertices as adjacentVertices, UndirectedGraph_connect as connect, UndirectedGraph_connectTo as connectTo, UndirectedGraph_createVertex as createVertex, UndirectedGraph_dumpGraph as dumpGraph, UndirectedGraph_edgesForVertex as edgesForVertex, UndirectedGraph_getConnection as getConnection, UndirectedGraph_getOrCreate as getOrCreate, UndirectedGraph_graph as graph, UndirectedGraph_hasConnection as hasConnection, UndirectedGraph_toAdjacencyMatrix as toAdjacencyMatrix, UndirectedGraph_updateGraphVertex as updateGraphVertex };
}

declare namespace index$2 {
  export { DirectedGraph$1 as Directed, UndirectedGraph as Undirected };
}

declare const index$1_GetOrGenerate: typeof GetOrGenerate;
declare const index$1_IDictionary: typeof IDictionary;
declare const index$1_IWithEntries: typeof IWithEntries;
declare const index$1_MergeReconcile: typeof MergeReconcile;
declare const index$1_addKeepingExisting: typeof addKeepingExisting;
declare const index$1_addObject: typeof addObject;
declare const index$1_deleteByValue: typeof deleteByValue;
declare const index$1_filter: typeof filter;
declare const index$1_find: typeof find;
declare const index$1_firstEntryByIterablePredicate: typeof firstEntryByIterablePredicate;
declare const index$1_firstEntryByIterableValue: typeof firstEntryByIterableValue;
declare const index$1_fromIterable: typeof fromIterable;
declare const index$1_fromObject: typeof fromObject;
declare const index$1_getClosestIntegerKey: typeof getClosestIntegerKey;
declare const index$1_getFromKeys: typeof getFromKeys;
declare const index$1_getOrGenerate: typeof getOrGenerate;
declare const index$1_getOrGenerateSync: typeof getOrGenerateSync;
declare const index$1_hasAnyValue: typeof hasAnyValue;
declare const index$1_hasKeyValue: typeof hasKeyValue;
declare const index$1_mapToArray: typeof mapToArray;
declare const index$1_mapToObjectTransform: typeof mapToObjectTransform;
declare const index$1_mergeByKey: typeof mergeByKey;
declare const index$1_some: typeof some;
declare const index$1_sortByValue: typeof sortByValue;
declare const index$1_sortByValueProperty: typeof sortByValueProperty;
declare const index$1_toArray: typeof toArray;
declare const index$1_toObject: typeof toObject;
declare const index$1_transformMap: typeof transformMap;
declare const index$1_zipKeyValue: typeof zipKeyValue;
declare namespace index$1 {
  export { index$1_GetOrGenerate as GetOrGenerate, index$1_IDictionary as IDictionary, index$1_IWithEntries as IWithEntries, index$1_MergeReconcile as MergeReconcile, index$1_addKeepingExisting as addKeepingExisting, index$1_addObject as addObject, index$1_deleteByValue as deleteByValue, index$1_filter as filter, index$1_find as find, index$1_firstEntryByIterablePredicate as firstEntryByIterablePredicate, index$1_firstEntryByIterableValue as firstEntryByIterableValue, index$1_fromIterable as fromIterable, index$1_fromObject as fromObject, index$1_getClosestIntegerKey as getClosestIntegerKey, index$1_getFromKeys as getFromKeys, index$1_getOrGenerate as getOrGenerate, index$1_getOrGenerateSync as getOrGenerateSync, index$1_hasAnyValue as hasAnyValue, index$1_hasKeyValue as hasKeyValue, index$1_mapToArray as mapToArray, index$1_mapToObjectTransform as mapToObjectTransform, index$1_mergeByKey as mergeByKey, index$1_some as some, index$1_sortByValue as sortByValue, index$1_sortByValueProperty as sortByValueProperty, index$1_toArray as toArray, index$1_toObject as toObject, index$1_transformMap as transformMap, index$1_zipKeyValue as zipKeyValue };
}

/**
 * Work with bipolar values (-1...1)
 *
 * Import:
 * ```js
 * import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
 * ```
 *
 * Overview:
 * * {@link immutable}: Immutable wrapper around a value
 * * {@link clamp}: Clamp on -1..1 scale
 * * {@link scale}: Scale a value to -1..1
 * * {@link toScalar}: Convert -1..1 to 0..1
 * * {@link fromScalar}: Convert from 0..1 to -1..1
 * * {@link towardZero}: Nudge a bipolar value towards zero
 */

declare const piPi: number;

declare const index_Bipolar: typeof Bipolar;
declare const index_ChangeKind: typeof ChangeKind;
declare const index_ChangeRecord: typeof ChangeRecord;
declare const index_CompareChangeSet: typeof CompareChangeSet;
declare const index_Correlate: typeof Correlate;
type index_FrequencyEventMap = FrequencyEventMap;
type index_FrequencyMutable<V> = FrequencyMutable<V>;
declare const index_FrequencyMutable: typeof FrequencyMutable;
type index_InterpolateOptions = InterpolateOptions;
type index_IntervalTracker = IntervalTracker;
declare const index_IntervalTracker: typeof IntervalTracker;
declare const index_IsEqualContext: typeof IsEqualContext;
type index_MapObjectArgs = MapObjectArgs;
type index_MovingAverageTimedOptions = MovingAverageTimedOptions;
declare const index_Normalise: typeof Normalise;
declare const index_NumberFunction: typeof NumberFunction;
declare const index_NumberTracker: typeof NumberTracker;
declare const index_NumberTrackerResults: typeof NumberTrackerResults;
declare const index_Pathed: typeof Pathed;
declare const index_PointTrack: typeof PointTrack;
type index_PointTracker = PointTracker;
declare const index_PointTracker: typeof PointTracker;
declare const index_PointTrackerResults: typeof PointTrackerResults;
declare const index_PrimitiveTracker: typeof PrimitiveTracker;
declare const index_Process: typeof Process;
declare const index_RankArrayOptions: typeof RankArrayOptions;
declare const index_RankFunction: typeof RankFunction;
declare const index_RankOptions: typeof RankOptions;
type index_RecordOptions<T extends Record<string, any>, TReturn> = RecordOptions<T, TReturn>;
type index_ResolveToValue<V> = ResolveToValue<V>;
type index_ResolvedObject<T extends Record<string, ResolveToValue<any>>> = ResolvedObject<T>;
type index_Table<V> = Table<V>;
declare const index_Table: typeof Table;
declare const index_Timestamped: typeof Timestamped;
declare const index_TimestampedObject: typeof TimestampedObject;
declare const index_TimestampedPrimitive: typeof TimestampedPrimitive;
type index_TrackUnique<T> = TrackUnique<T>;
type index_TrackedPointMap = TrackedPointMap;
declare const index_TrackedPointMap: typeof TrackedPointMap;
declare const index_TrackedValueMap: typeof TrackedValueMap;
declare const index_TrackedValueOpts: typeof TrackedValueOpts;
declare const index_TrackerBase: typeof TrackerBase;
declare const index_ValueType: typeof ValueType;
declare const index_changedDataFields: typeof changedDataFields;
declare const index_clamp: typeof clamp;
declare const index_clampIndex: typeof clampIndex;
declare const index_compareArrays: typeof compareArrays;
declare const index_compareData: typeof compareData;
declare const index_compareDataExecute: typeof compareDataExecute;
declare const index_compareKeys: typeof compareKeys;
declare const index_flip: typeof flip;
declare const index_frequencyMutable: typeof frequencyMutable;
declare const index_interpolate: typeof interpolate;
declare const index_interpolateAngle: typeof interpolateAngle;
declare const index_interpolatorInterval: typeof interpolatorInterval;
declare const index_interpolatorStepped: typeof interpolatorStepped;
declare const index_intervalTracker: typeof intervalTracker;
declare const index_isEmptyEntries: typeof isEmptyEntries;
declare const index_isEqualContextString: typeof isEqualContextString;
declare const index_keysToNumbers: typeof keysToNumbers;
declare const index_mapObjectByObject: typeof mapObjectByObject;
declare const index_mapObjectShallow: typeof mapObjectShallow;
declare const index_movingAverage: typeof movingAverage;
declare const index_movingAverageLight: typeof movingAverageLight;
declare const index_movingAverageTimed: typeof movingAverageTimed;
declare const index_noiseFilter: typeof noiseFilter;
declare const index_numberTracker: typeof numberTracker;
declare const index_piPi: typeof piPi;
declare const index_pointTracker: typeof pointTracker;
declare const index_pointsTracker: typeof pointsTracker;
declare const index_proportion: typeof proportion;
declare const index_resolve: typeof resolve;
declare const index_resolveFields: typeof resolveFields;
declare const index_scale: typeof scale;
declare const index_scaleClamped: typeof scaleClamped;
declare const index_scalePercent: typeof scalePercent;
declare const index_scalePercentages: typeof scalePercentages;
declare const index_scaler: typeof scaler;
declare const index_scalerPercent: typeof scalerPercent;
declare const index_softmax: typeof softmax;
declare const index_trackUnique: typeof trackUnique;
declare const index_trackUniqueInstances: typeof trackUniqueInstances;
declare const index_wrap: typeof wrap;
declare const index_wrapInteger: typeof wrapInteger;
declare const index_wrapRange: typeof wrapRange;
declare namespace index {
  export { index$3 as Arrays, index_Bipolar as Bipolar, index_ChangeKind as ChangeKind, index_ChangeRecord as ChangeRecord, index_CompareChangeSet as CompareChangeSet, index_Correlate as Correlate, type index_FrequencyEventMap as FrequencyEventMap, index_FrequencyMutable as FrequencyMutable, index$2 as Graphs, type index_InterpolateOptions as InterpolateOptions, index_IntervalTracker as IntervalTracker, index_IsEqualContext as IsEqualContext, type index_MapObjectArgs as MapObjectArgs, index$1 as Maps, type index_MovingAverageTimedOptions as MovingAverageTimedOptions, index_Normalise as Normalise, index_NumberFunction as NumberFunction, index_NumberTracker as NumberTracker, index_NumberTrackerResults as NumberTrackerResults, index_Pathed as Pathed, index_PointTrack as PointTrack, index_PointTracker as PointTracker, index_PointTrackerResults as PointTrackerResults, Pool$1 as Pool, index_PrimitiveTracker as PrimitiveTracker, index_Process as Process, index_RankArrayOptions as RankArrayOptions, index_RankFunction as RankFunction, index_RankOptions as RankOptions, type index_RecordOptions as RecordOptions, type index_ResolveToValue as ResolveToValue, type index_ResolvedObject as ResolvedObject, index_Table as Table, index_Timestamped as Timestamped, index_TimestampedObject as TimestampedObject, index_TimestampedPrimitive as TimestampedPrimitive, type index_TrackUnique as TrackUnique, index_TrackedPointMap as TrackedPointMap, index_TrackedValueMap as TrackedValueMap, index_TrackedValueOpts as TrackedValueOpts, index_TrackerBase as TrackerBase, index_ValueType as ValueType, index_changedDataFields as changedDataFields, index_clamp as clamp, index_clampIndex as clampIndex, index_compareArrays as compareArrays, index_compareData as compareData, index_compareDataExecute as compareDataExecute, index_compareKeys as compareKeys, index_flip as flip, index_frequencyMutable as frequencyMutable, index_interpolate as interpolate, index_interpolateAngle as interpolateAngle, index_interpolatorInterval as interpolatorInterval, index_interpolatorStepped as interpolatorStepped, index_intervalTracker as intervalTracker, index_isEmptyEntries as isEmptyEntries, index_isEqualContextString as isEqualContextString, index_keysToNumbers as keysToNumbers, index_mapObjectByObject as mapObjectByObject, index_mapObjectShallow as mapObjectShallow, index_movingAverage as movingAverage, index_movingAverageLight as movingAverageLight, index_movingAverageTimed as movingAverageTimed, index_noiseFilter as noiseFilter, index_numberTracker as numberTracker, index_piPi as piPi, index_pointTracker as pointTracker, index_pointsTracker as pointsTracker, index_proportion as proportion, index_resolve as resolve, index_resolveFields as resolveFields, index_scale as scale, index_scaleClamped as scaleClamped, index_scalePercent as scalePercent, index_scalePercentages as scalePercentages, index_scaler as scaler, index_scalerPercent as scalerPercent, index_softmax as softmax, index_trackUnique as trackUnique, index_trackUniqueInstances as trackUniqueInstances, index_wrap as wrap, index_wrapInteger as wrapInteger, index_wrapRange as wrapRange };
}

export { wrap as $, pointTracker as A, Bipolar as B, Correlate as C, proportion as D, type ResolveToValue as E, type FrequencyEventMap as F, resolve as G, type ResolvedObject as H, type InterpolateOptions as I, resolveFields as J, scale as K, scaler as L, type MapObjectArgs as M, Normalise as N, scaleClamped as O, Pool$1 as P, scalePercentages as Q, type RecordOptions as R, scalePercent as S, TrackedPointMap as T, scalerPercent as U, softmax as V, Table as W, type TrackUnique as X, trackUnique as Y, trackUniqueInstances as Z, wrapInteger as _, index$2 as a, wrapRange as a0, index$1 as b, clamp as c, clampIndex as d, FrequencyMutable as e, flip as f, frequencyMutable as g, interpolate as h, index as i, interpolatorStepped as j, interpolatorInterval as k, interpolateAngle as l, IntervalTracker as m, intervalTracker as n, keysToNumbers as o, piPi as p, mapObjectShallow as q, mapObjectByObject as r, movingAverageLight as s, type MovingAverageTimedOptions as t, movingAverageTimed as u, movingAverage as v, noiseFilter as w, compareDataExecute as x, PointTracker as y, pointsTracker as z };
