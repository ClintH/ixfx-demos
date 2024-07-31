import { a as RandomOptions, R as RandomSource } from './Types-CR0Pe5zY.js';
import { N as NumberFunction } from './Types-AjpgZy7P.js';
import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { E as EasingName } from './index-Btxtdk8X.js';
import { m as minMaxAvg } from './MinMaxAvg-1MT6_y5i.js';
import { M as MinMaxAvgOpts, a as MinMaxAvgTotal } from './Types-grp6zrDi.js';

/**
 * Apples `fn` to every key of `obj` which is numeric.
 * ```js
 * const o = {
 *  name: 'john',
 *  x: 10,
 *  y: 20
 * };
 * const o2 = applyToValues(o, (v) => v * 2);
 *
 * // Yields: { name: 'john', x: 20, y: 40 }
 * ```
 * @param object
 * @param apply
 * @returns
 */
declare const applyToValues: <T extends Record<string, any>>(object: T, apply: (v: number) => number) => T;

/**
 * Computes an average of an array with a set of weights applied.
 *
 * Weights can be provided as an array, expected to be on 0..1 scale, with indexes
 * matched up to input data. Ie. data at index 2 will be weighed by index 2 in the weightings array.
 *
 * ```js
 * import { averageWeighted } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * // All items weighted evenly
 * averageWeighted([1,2,3], [1,1,1]); // 2
 *
 * // First item has full weight, second half, third quarter
 * averageWeighted([1,2,3], [1, 0.5, 0.25]); // 1.57
 *
 * // With reversed weighting of [0.25,0.5,1] value is 2.42
 * ```
 *
 * A function can alternatively be provided to compute the weighting based on array index, via {@link weight}.
 *
 * ```js
 * import { weight,averageWeighted } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * import { gaussian } from 'https://unpkg.com/ixfx/dist/modulation.js';
 * averageWeighted[1,2,3], gaussian()); // 2.0
 * ```
 *
 * This is the same as:
 *
 * ```js
 * import { weight,averageWeighted } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * import { gaussian } from 'https://unpkg.com/ixfx/dist/modulation.js';
 *
 * const data = [1,2,3];
 * const w = weight(data, gaussian());
 * const avg = averageWeighted(data, w); // 2.0
 * ```
 * @param data Data to average
 * @param weightings Array of weightings that match up to data array, or an easing function
 * @see {@link average} Compute averages without weighting.
 */
declare const averageWeighted: (data: Array<number> | ReadonlyArray<number>, weightings: Array<number> | ReadonlyArray<number> | ((value: number) => number)) => number;

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
 * Scale & clamp resulting number to bipolar range (-1..1)
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
 * Yields `amount` integers, counting by one from zero. If a negative amount is used,
 * count decreases. If `offset` is provided, this is added to the return result.
 * @example
 * ```js
 * const a = [...count(5)]; // Yields five numbers: [0,1,2,3,4]
 * const b = [...count(-5)]; // Yields five numbers: [0,-1,-2,-3,-4]
 * for (const v of count(5, 5)) {
 *  // Yields: 5, 6, 7, 8, 9
 * }
 * const c = [...count(5,1)]; // Yields [1,2,3,4,5]
 * ```
 *
 * @example Used with forEach
 * ```js
 * // Prints `Hi` 5x
 * forEach(count(5), () => // do something);
 * ```
 *
 * If you want to accumulate return values, consider using Flow.repeat.
 *
 * @example Run some code every 100ms, 10 times:
 * ```js
 * import { interval } from 'https://unpkg.com/ixfx/dist/flow.js'
 * import { count } from 'https://unpkg.com/ixfx/dist/numbers.js'
 * const counter = count(10);
 * for await (const v of interval(counter, { fixedIntervalMs: 100 })) {
 *  // Do something
 * }
 * ```
 * @param amount Number of integers to yield
 * @param offset Added to result
 */
declare function count(amount: number, offset?: number): Generator<number, void, void>;

/**
 * Filters an iterator of values, only yielding
 * those that are valid numbers
 *
 * ```js
 * import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
 *
 * const data = [true, 10, '5', { x: 5 }];
 * for (const n of Numbers.filter(data)) {
 *  // 5
 * }
 * ```
 * @param it
 */
declare function filter(it: Iterable<unknown>): Generator<unknown, void, unknown>;

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
 * Generates a range of numbers, starting from `start` and counting by `interval`.
 * If `end` is provided, generator stops when reached.
 *
 * Unlike {@link numericRange}, numbers might contain rounding errors
 *
 * ```js
 * for (const c of numericRangeRaw(10, 100)) {
 *  // 100, 110, 120 ...
 * }
 * ```
 * @param interval Interval between numbers
 * @param start Start
 * @param end End (if undefined, range never ends)
 */
declare const numericRangeRaw: (interval: number, start?: number, end?: number, repeating?: boolean) => Generator<number, void, unknown>;
/**
 * Generates a range of numbers, with a given interval.
 *
 * @example For-loop
 * ```
 * let loopForever = numericRange(0.1); // By default starts at 0 and counts upwards forever
 * for (v of loopForever) {
 *  console.log(v);
 * }
 * ```
 *
 * @example If you want more control over when/where incrementing happens...
 * ```js
 * let percent = numericRange(0.1, 0, 1);
 *
 * let percentResult = percent.next().value;
 * ```
 *
 * Note that computations are internally rounded to avoid floating point math issues. So if the `interval` is very small (eg thousandths), specify a higher rounding
 * number.
 *
 * @param interval Interval between numbers
 * @param start Start. Defaults to 0
 * @param end End (if undefined, range never ends)
 * @param repeating Range loops from start indefinately. Default _false_
 * @param rounding A rounding that matches the interval avoids floating-point math hikinks. Eg if the interval is 0.1, use a rounding of 10
 */
declare const numericRange: (interval: number, start?: number, end?: number, repeating?: boolean, rounding?: number) => Generator<number, void, unknown>;
/**
 * Yields numeric range between 0.0-1.0.
 *
 * ```
 * // Yields: [0, 0.2, 0.4, 0.6, 0.8, 1]
 * const a = [...numericPercent(0.2)];
 *
 * // Repeating flag set to true:
 * for (const v of numericPercent(0.2, true)) {
 *  // Infinite loop. V loops back to 0 after hitting 1
 * }
 * ```
 *
 * If `repeating` is true, it loops back to 0 after reaching 1
 * @param interval Interval (default: 0.01, ie. 1%)
 * @param repeating Whether generator should loop (default: false)
 * @param start Start (default: 0)
 * @param end End (default: 1)
 * @returns
 */
declare const numericPercent: (interval?: number, repeating?: boolean, start?: number, end?: number) => Generator<number, void, unknown>;

/**
 * Returns true if `possibleNumber` is a number and not NaN
 * @param possibleNumber
 * @returns
 */
declare const isValid: (possibleNumber: unknown) => boolean;

declare const piPi: number;
/**
 *
 * Limit
 * What to do if interpolation amount exceeds 0..1 range
 * * clamp: lock to A & B (inclusive) Default.
 * * wrap: wrap from end to start again
 * * ignore: allow return values outside of A..B range
 *
 * Easing: name of easing function for non-linear interpolation
 *
 * Transform: name of function to transform `amount` prior to interpolate.
 */
type InterpolateOptions = {
    limits: `clamp` | `wrap` | `ignore`;
    easing: EasingName;
    transform: (v: number) => number;
};
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
 * @param options Options for interpolation
 * @returns
 */
declare const interpolatorStepped: (incrementAmount: number, a?: number, b?: number, startInterpolationAt?: number, options?: Partial<InterpolateOptions>) => (retargetB?: number, retargetA?: number) => number;
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
 * @param duration Duration for interpolation
 * @param a Start point
 * @param b End point
 * @param options Options for interpolation
 * @returns
 */
declare const interpolatorInterval: (duration: Interval, a?: number, b?: number, options?: Partial<InterpolateOptions>) => (retargetB?: number, retargetA?: number) => number;
/**
 * Interpolate between angles `a` and `b` by `amount`. Angles are in radians.
 *
 * ```js
 * import { interpolateAngle } from 'https://unpkg.com/ixfx/dist/data.js';
 * interpolateAngle(0.5, Math.PI, Math.PI/2);
 * ```
 * @param amount
 * @param aRadians Start angle (radian)
 * @param bRadians End angle (radian)
 * @returns
 */
declare const interpolateAngle: (amount: number, aRadians: number, bRadians: number, options?: Partial<InterpolateOptions>) => number;

/**
 * Returns a function that checks if a value is within range of a base value
 * ```js
 * const tenPercent = isApprox(0.1);
 * // Check if 101 is within 10% range of 100
 * tenPercent(100, 101);
 * ```
 * @param rangePercent
 */
declare function isApprox(rangePercent: number): (baseValue: number, value: number) => boolean;
/**
 * Returns a function to check if a value is within range of a base value
 * ```js
 * const close = isApprox(0.1, 100);
 * // Check if 101 is within 10% range of 100
 * close(101);
 * ```
 * @param rangePercent
 * @param baseValue
 */
declare function isApprox(rangePercent: number, baseValue: number): (value: number) => boolean;
/**
 * Returns _true/false_ if `value` is within `rangePercent` of `baseValue`.
 *
 * ```js
 * isApprox(0.1, 100, 101);
 * ```
 * @param rangePercent
 * @param baseValue
 * @param value
 */
declare function isApprox(rangePercent: number, baseValue: number, value: number): boolean;

/**
 * Generates a `step`-length series of values between `start` and `end` (inclusive).
 * Each value will be equally spaced.
 *
 * ```js
 * for (const v of linearSpace(1, 5, 6)) {
 *  // Yields: [ 1, 1.8, 2.6, 3.4, 4.2, 5 ]
 * }
 * ```
 *
 * Numbers can be produced from large to small as well
 * ```js
 * const values = [...linearSpace(10, 5, 3)];
 * // Yields: [10, 7.5, 5]
 * ```
 * @param start Start number (inclusive)
 * @param end  End number (inclusive)
 * @param steps How many steps to make from start -> end
 * @param precision Number of decimal points to round to
 */
declare function linearSpace(start: number, end: number, steps: number, precision?: number): IterableIterator<number>;

/**
 * A moving average calculator (exponential weighted moving average) which does not keep track of
 * previous samples. Less accurate, but uses less system resources.
 *
 * The `scaling` parameter determines smoothing. A value of `1` means that
 * the latest value is used as the average - that is, no smoothing. Higher numbers
 * introduce progressively more smoothing by weighting the accumulated prior average more heavily.
 *
 * ```
 * const ma = movingAverageLight(); // default scaling of 3
 * ma(50);  // 50
 * ma(100); // 75
 * ma(75);  // 75
 * ma(0);   // 50
 * ```
 *
 * Note that the final average of 50 is pretty far from the last value of 0. To make it more responsive,
 * we could use a lower scaling factor: `movingAverageLight(2)`. This yields a final average of `37.5` instead.
 *
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
 * It returns a function which in turn yields an average value.
 *
 * Moving average are useful for computing the average over a recent set of numbers.
 * A lower number of samples produces a computed value that is lower-latency yet more jittery.
 * A higher number of samples produces a smoother computed value which takes longer to respond to
 * changes in data.
 *
 * Sample size is considered with respect to the level of latency/smoothness trade-off, and also
 * the rate at which new data is added to the moving average.
 *
 *
 * ```js
 * import { movingAverage } from 'https://unpkg.com/ixfx/dist/data.js';
 *
 * const ma = movingAverage(10);
 * ma(10); // 10
 * ma(5);  // 7.5
 * ```
 *
 * A weighting function can be provided to shape how the average is
 * calculated - eg privileging the most recent data over older data.
 * It uses `Arrays.averageWeighted` under the hood.
 *
 * ```js
 * import { movingAverage } from 'https://unpkg.com/ixfx/dist/data.js';
 * import { gaussian } from 'https://unpkg.com/ixfx/dist/modulation.js';
 *
 * // Give more weight to data in middle of sampling window
 * const ma = movingAverage(100, gaussian());
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
 * import {Normalise} from 'https://unpkg.com/ixfx/dist/numbers.js'
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
 * If you already know what to expect of the number range, passing in `minDefault`
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
 * If a value exceeds the default range, normalisation adjusts.
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
 * import {Normalise} from 'https://unpkg.com/ixfx/dist/numbers.js'
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

/**
 * Applies a function `fn` to the elements of an array, weighting them based on their relative position.
 *
 * ```js
 * import { weight } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * import { gaussian } from 'https://unpkg.com/ixfx/dist/modulation.js';
 * // Six items
 * weight([1,1,1,1,1,1], gaussian());
 *
 * // Yields:
 * // [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
 * ```
 *
 * `fn` is expected to map (0..1) => (0..1), such as an easing function. The input to the
 * `fn` is the relative position of an element. Thus the first element will be 0, the middle 0.5 and so on.
 * The output of `fn` is then multiplied by the original value.
 *
 * In the below example (which is also the default if `fn` is not specified), the relative position is
 * how values are weighted:
 *
 * ```js
 * weight([1,1,1,1,1,1], (relativePos) => relativePos);
 * // Yields:
 * // [0, 0.2, 0.4, 0.6, 0.8, 1]
 * ```
 *
 * Non-numbers in `data` will be silently ignored (this filtering happens first, so relative index values are sane still).
 *
 * @param data Array of numbers
 * @param fn Returns a weighting based on the given relative position. If unspecified, `(x) => x` is used.
 */
declare const weight: (data: Array<number> | ReadonlyArray<number>, fn?: (relativePos: number) => number) => Array<number>;
/**
 * Returns an array of all valid numbers from `data`
 *
 * @param data
 * @returns
 */
declare const validNumbers: (data: ReadonlyArray<number>) => number[];
/**
 * Returns the dot product of arbitrary-sized arrays. Assumed they are of the same length.
 * @param values
 * @returns
 */
declare const dotProduct: (values: ReadonlyArray<ReadonlyArray<number>>) => number;
/**
 * Calculates the average of all numbers in an array.
 * Array items which aren't a valid number are ignored and do not factor into averaging.
 *
 * Use {@link minMaxAvg} if you want min, max and total as well.
 *
 * @example
 * ```js
 * import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
 *
 * // Average of a list
 * const avg = Numbers.average([1, 1.4, 0.9, 0.1]);
 *
 * // Average of a variable
 * const data = [100,200];
 * Numbers.average(data);
 * ```
 *
 * @see {@link averageWeighted} To weight items based on position in array
 * @param data Data to average.
 * @returns Average of array
 */
declare const average: (data: ReadonlyArray<number>) => number;
/**
 * Returns the minimum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import { Numbers } from 'https://unpkg.com/ixfx/dist/Numbers.js';
 * Numbers.min([10, 20, 0]); // Yields 0
 * ```
 * @param data
 * @returns Minimum number
 */
declare const min: (data: ReadonlyArray<number>) => number;
/**
 * Returns the index of the largest value.
 * ```js
 * import { Numbers } from 'https://unpkg.com/ixfx/dist/Numbers.js';
 * const v = [ 10, 40, 5 ];
 * Numbers.maxIndex(v); // Yields 1
 * ```
 * @param data Array of numbers
 * @returns Index of largest value
 */
declare const maxIndex: (data: ReadonlyArray<number>) => number;
/**
 * Returns the index of the smallest value.
 *
 * ```js
 * import { Numbers } from 'https://unpkg.com/ixfx/dist/Numbers.js';
 * const v = [ 10, 40, 5 ];
 * Numbers.minIndex(v); // Yields 2
 * ```
 * @param data Array of numbers
 * @returns Index of smallest value
 */
declare const minIndex: (...data: ReadonlyArray<number>) => number;
/**
 * Returns the maximum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * Numbers.max(100, 200, 50); // 200
 * ```
 * @param data List of numbers
 * @returns Maximum number
 */
declare const max: (data: ReadonlyArray<number>) => number;
/**
 * Returns the total of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * Numbers.total([1, 2, 3]); // 6
 * ```
 * @param data Array of numbers
 * @returns Total
 */
declare const total: (data: ReadonlyArray<number>) => number;
/**
 * Returns the maximum out of `data` without pre-filtering for speed.
 *
 * For most uses, {@link max} should suffice.
 *
 * ```js
 * import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * Numbers.maxFast([ 10, 0, 4 ]); // 10
 * ```
 * @param data
 * @returns Maximum
 */
declare const maxFast: (data: ReadonlyArray<number> | Float32Array) => number;
/**
 * Returns the total of `data` without pre-filtering for speed.
 *
 * For most uses, {@link total} should suffice.
 *
 * ```js
 * import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * Numbers.totalFast([ 10, 0, 4 ]); // 14
 * ```
 * @param data
 * @returns Maximum
 */
declare const totalFast: (data: ReadonlyArray<number> | Float32Array) => number;
/**
 * Returns the maximum out of `data` without pre-filtering for speed.
 *
 * For most uses, {@link max} should suffice.
 *
 * ```js
 * import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
 * Numbers.minFast([ 10, 0, 100 ]); // 0
 * ```
 * @param data
 * @returns Maximum
 */
declare const minFast: (data: ReadonlyArray<number> | Float32Array) => number;

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
 * Rounds `v` by `every`. Middle values are rounded up by default.
 *
 * ```js
 * quantiseEvery(11, 10);  // 10
 * quantiseEvery(25, 10);  // 30
 * quantiseEvery(0, 10);   // 0
 * quantiseEvery(4, 10);   // 0
 * quantiseEvery(100, 10); // 100
 * ```
 *
 * Also works with decimals
 * ```js
 * quantiseEvery(1.123, 0.1); // 1.1
 * quantiseEvery(1.21, 0.1);  // 1.2
 * ```
 *
 * @param v Value to quantise
 * @param every Number to quantise to
 * @param middleRoundsUp If _true_ (default), the exact middle rounds up to next step.
 * @returns
 */
declare const quantiseEvery: (v: number, every: number, middleRoundsUp?: boolean) => number;

/**
 * Returns the relative difference from the `initial` value
 * ```js
 * const rel = relativeDifference(100);
 * rel(100); // 1
 * rel(150); // 1.5
 * rel(50);  // 0.5
 * ```
 *
 * The code for this is simple:
 * ```js
 * const relativeDifference = (initial) => (v) => v/initial
 * ```
 * @param {number} initial
 * @returns
 */
declare const relativeDifference: (initial: number) => (v: number) => number;

declare function round(decimalPlaces: number, v: number): number;
declare function round(decimalPlaces: number): (v: number) => number;

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
 * * {@link average}, {@link max}, {@link min}, {@link total}: Calculate average/max/min/total
 * * {@link averageWeighted}: Calculate average, but applies a weighting function, eg to favour items at beginning of array
 * * {@link minMaxAvg}: Find smallest, largest and average
 * * {@link maxIndex}, {@link minIndex}: Return index of largest/smallest value
 * * {@link dotProduct}: Returns the dot-product between two arrays
 * * {@link weight}: Applies a weighting function to all values based on their index
 * * See also {@link Numbers} module for working with numbers in general.
 * @module
 */

declare const index_Bipolar: typeof Bipolar;
type index_InterpolateOptions = InterpolateOptions;
declare const index_MinMaxAvgOpts: typeof MinMaxAvgOpts;
declare const index_MinMaxAvgTotal: typeof MinMaxAvgTotal;
type index_MovingAverageTimedOptions = MovingAverageTimedOptions;
declare const index_Normalise: typeof Normalise;
declare const index_applyToValues: typeof applyToValues;
declare const index_average: typeof average;
declare const index_averageWeighted: typeof averageWeighted;
declare const index_clamp: typeof clamp;
declare const index_clampIndex: typeof clampIndex;
declare const index_count: typeof count;
declare const index_dotProduct: typeof dotProduct;
declare const index_filter: typeof filter;
declare const index_flip: typeof flip;
declare const index_interpolate: typeof interpolate;
declare const index_interpolateAngle: typeof interpolateAngle;
declare const index_interpolatorInterval: typeof interpolatorInterval;
declare const index_interpolatorStepped: typeof interpolatorStepped;
declare const index_isApprox: typeof isApprox;
declare const index_isValid: typeof isValid;
declare const index_linearSpace: typeof linearSpace;
declare const index_max: typeof max;
declare const index_maxFast: typeof maxFast;
declare const index_maxIndex: typeof maxIndex;
declare const index_min: typeof min;
declare const index_minFast: typeof minFast;
declare const index_minIndex: typeof minIndex;
declare const index_minMaxAvg: typeof minMaxAvg;
declare const index_movingAverage: typeof movingAverage;
declare const index_movingAverageLight: typeof movingAverageLight;
declare const index_movingAverageTimed: typeof movingAverageTimed;
declare const index_noiseFilter: typeof noiseFilter;
declare const index_numericPercent: typeof numericPercent;
declare const index_numericRange: typeof numericRange;
declare const index_numericRangeRaw: typeof numericRangeRaw;
declare const index_piPi: typeof piPi;
declare const index_proportion: typeof proportion;
declare const index_quantiseEvery: typeof quantiseEvery;
declare const index_relativeDifference: typeof relativeDifference;
declare const index_round: typeof round;
declare const index_scale: typeof scale;
declare const index_scaleClamped: typeof scaleClamped;
declare const index_scalePercent: typeof scalePercent;
declare const index_scalePercentages: typeof scalePercentages;
declare const index_scaler: typeof scaler;
declare const index_scalerPercent: typeof scalerPercent;
declare const index_softmax: typeof softmax;
declare const index_total: typeof total;
declare const index_totalFast: typeof totalFast;
declare const index_validNumbers: typeof validNumbers;
declare const index_weight: typeof weight;
declare const index_wrap: typeof wrap;
declare const index_wrapInteger: typeof wrapInteger;
declare const index_wrapRange: typeof wrapRange;
declare namespace index {
  export { index_Bipolar as Bipolar, type index_InterpolateOptions as InterpolateOptions, index_MinMaxAvgOpts as MinMaxAvgOpts, index_MinMaxAvgTotal as MinMaxAvgTotal, type index_MovingAverageTimedOptions as MovingAverageTimedOptions, index_Normalise as Normalise, index_applyToValues as applyToValues, index_average as average, index_averageWeighted as averageWeighted, index_clamp as clamp, index_clampIndex as clampIndex, index_count as count, index_dotProduct as dotProduct, index_filter as filter, index_flip as flip, index_interpolate as interpolate, index_interpolateAngle as interpolateAngle, index_interpolatorInterval as interpolatorInterval, index_interpolatorStepped as interpolatorStepped, index_isApprox as isApprox, index_isValid as isValid, index_linearSpace as linearSpace, index_max as max, index_maxFast as maxFast, index_maxIndex as maxIndex, index_min as min, index_minFast as minFast, index_minIndex as minIndex, index_minMaxAvg as minMaxAvg, index_movingAverage as movingAverage, index_movingAverageLight as movingAverageLight, index_movingAverageTimed as movingAverageTimed, index_noiseFilter as noiseFilter, index_numericPercent as numericPercent, index_numericRange as numericRange, index_numericRangeRaw as numericRangeRaw, index_piPi as piPi, index_proportion as proportion, index_quantiseEvery as quantiseEvery, index_relativeDifference as relativeDifference, index_round as round, index_scale as scale, index_scaleClamped as scaleClamped, index_scalePercent as scalePercent, index_scalePercentages as scalePercentages, index_scaler as scaler, index_scalerPercent as scalerPercent, index_softmax as softmax, index_total as total, index_totalFast as totalFast, index_validNumbers as validNumbers, index_weight as weight, index_wrap as wrap, index_wrapInteger as wrapInteger, index_wrapRange as wrapRange };
}

export { average as A, Bipolar as B, min as C, maxIndex as D, minIndex as E, max as F, total as G, maxFast as H, type InterpolateOptions as I, totalFast as J, minFast as K, proportion as L, type MovingAverageTimedOptions as M, Normalise as N, quantiseEvery as O, relativeDifference as P, round as Q, scale as R, scaler as S, scaleClamped as T, scalePercentages as U, scalePercent as V, scalerPercent as W, softmax as X, wrapInteger as Y, wrap as Z, wrapRange as _, applyToValues as a, averageWeighted as b, clamp as c, clampIndex as d, count as e, filter as f, flip as g, numericRange as h, index as i, numericPercent as j, isValid as k, interpolate as l, interpolatorStepped as m, numericRangeRaw as n, interpolatorInterval as o, piPi as p, interpolateAngle as q, isApprox as r, linearSpace as s, movingAverageLight as t, movingAverageTimed as u, movingAverage as v, noiseFilter as w, weight as x, validNumbers as y, dotProduct as z };
