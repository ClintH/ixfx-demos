import { IsEqual } from './util';
import { H as HasCompletion } from './Timer-a24e02ad';

declare type EasingFn = (x: number) => number;
/**
 * Creates an easing based on clock time
 * @inheritdoc Easing
 * @example Time based easing
 * ```
 * const t = time(`quintIn`, 5*1000); // Will take 5 seconds to complete
 * ...
 * t.compute(); // Get current value of easing
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param nameOrFn Name of easing, or an easing function
 * @param durationMs Duration in milliseconds
 * @returns Easing
 */
declare const time: (nameOrFn: EasingName | EasingFn, durationMs: number) => Easing;
/**
 * Creates an easing based on ticks
 *
 * @inheritdoc Easing
 * @example Tick-based easing
 * ```
 * const t = tick(`sineIn`, 1000);   // Will take 1000 ticks to complete
 * t.compute(); // Each call to `compute` progresses the tick count
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param nameOrFn Name of easing, or an easing function
 * @param durationTicks Duration in ticks
 * @returns Easing
 */
declare const tick: (nameOrFn: EasingName | EasingFn, durationTicks: number) => Easing;
/**
 * 'Ease' from `0` to `1` over a delicious curve. Commonly used for animation
 * and basic modelling of phyical motion.
 *
 * Create via {@link tick} or {@link time}, call `compute` to calculate the next
 * value in the progression, until you reach `1` or `isDone` returns true.
 *
 */
declare type Easing = HasCompletion & {
    /**
     * Computes the current value of the easing
     *
     * @returns {number}
     */
    compute(): number;
    /**
     * Reset the easing
     */
    reset(): void;
    /**
     * Returns true if the easing is complete
     *
     * @returns {boolean}
     */
    get isDone(): boolean;
};
/**
 * Creates an easing function using a simple cubic bezier defined by two points.
 *
 * Eg: https://cubic-bezier.com/#0,1.33,1,-1.25
 *  a:0, b: 1.33, c: 1, d: -1.25
 *
 * ```js
 * // Time-based easing using bezier
 * const e = Easings.time(fromCubicBezier(1.33, -1.25), 1000);
 * e.compute();
 * ```
 * @param b
 * @param d
 * @param t
 * @returns Value
 */
declare const fromCubicBezier: (b: number, d: number) => EasingFn;
/**
 * Returns a mix of two easing functions.
 *
 * ```js
 * // Get a 50/50 mix of two easing functions at t=0.25
 * mix(0.5, 0.25, sineIn, sineOut);
 *
 * // 10% of sineIn, 90% of sineOut
 * mix(0.90, 0.25, sineIn, sineOut);
 * ```
 * @param amt
 * @param balance
 * @param easingA
 * @param easingB
 * @returns
 */
declare const mix: (amt: number, balance: number, easingA: EasingFn, easingB: EasingFn) => number;
declare const crossfade: (amt: number, easingA: EasingFn, easingB: EasingFn) => number;
/**
 * @private
 */
declare type EasingName = keyof typeof functions;
/**
 * Returns an easing function by name, or _undefined_ if not found.
 * This is a manual way of working with easing functions. If you want to
 * ease over time or ticks, use {@link time} or {@link ticks}.
 *
 * ```js
 * const fn = Easings.get(`sineIn`);
 * // Returns 'eased' transformation of 0.5
 * fn(0.5);
 * ```
 * @param easingName eg `sineIn`
 * @returns Easing function
 */
declare const get: (easingName: EasingName) => EasingFn | undefined;
/**
 * @private
 * @returns Returns list of available easing names
 */
declare const getEasings: () => readonly string[];
/**
 * Returns a roughly gaussian easing function
 * @param stdDev
 * @returns
 */
declare const gaussian$1: (stdDev?: number) => EasingFn;
declare const functions: {
    arch: (x: number) => number;
    bell: EasingFn;
    sineIn: (x: number) => number;
    sineOut: (x: number) => number;
    quadIn: (x: number) => number;
    quadOut: (x: number) => number;
    sineInOut: (x: number) => number;
    quadInOut: (x: number) => number;
    cubicIn: (x: number) => number;
    cubicOut: (x: number) => number;
    quartIn: (x: number) => number;
    quartOut: (x: number) => number;
    quintIn: (x: number) => number;
    quintOut: (x: number) => number;
    expoIn: (x: number) => number;
    expoOut: (x: number) => number;
    quintInOut: (x: number) => number;
    expoInOut: (x: number) => number;
    circIn: (x: number) => number;
    circOut: (x: number) => number;
    backIn: (x: number) => number;
    backOut: (x: number) => number;
    circInOut: (x: number) => number;
    backInOut: (x: number) => number;
    elasticIn: (x: number) => number;
    elasticOut: (x: number) => number;
    bounceIn: (x: number) => number;
    bounceOut: (x: number) => number;
    elasticInOut: (x: number) => number;
    bounceInOut: (x: number) => number;
};

type Easing$1_EasingFn = EasingFn;
declare const Easing$1_time: typeof time;
declare const Easing$1_tick: typeof tick;
type Easing$1_Easing = Easing;
declare const Easing$1_fromCubicBezier: typeof fromCubicBezier;
declare const Easing$1_mix: typeof mix;
declare const Easing$1_crossfade: typeof crossfade;
type Easing$1_EasingName = EasingName;
declare const Easing$1_get: typeof get;
declare const Easing$1_getEasings: typeof getEasings;
declare const Easing$1_functions: typeof functions;
declare namespace Easing$1 {
  export {
    Easing$1_EasingFn as EasingFn,
    Easing$1_time as time,
    Easing$1_tick as tick,
    Easing$1_Easing as Easing,
    Easing$1_fromCubicBezier as fromCubicBezier,
    Easing$1_mix as mix,
    Easing$1_crossfade as crossfade,
    Easing$1_EasingName as EasingName,
    Easing$1_get as get,
    Easing$1_getEasings as getEasings,
    gaussian$1 as gaussian,
    Easing$1_functions as functions,
  };
}

declare const defaultRandom: () => number;
declare type RandomSource = () => number;
/**
 * Returns a random number between `min-max` weighted such that values closer to `min`
 * occur more frequently
 * @param min
 * @param max
 * @returns
 */
/***
 * Returns a random number, 0..1, weighted by a given easing function.
 * Default easing is `quadIn`, which skews towards zero.
 *
 * ```js
 * weighted();          // quadIn easing by default, which skews toward low values
 * weighted(`quadOut`); // quadOut favours high values
 * ```
 *
 * @param easingName Easing name. `quadIn` by default.
 * @param rand Source random generator. `Math.random` by default.
 * @returns Random number (0-1)
 */
declare const weighted: (easingName?: EasingName, rand?: RandomSource) => number;
/**
 * Random integer, weighted according to an easing function.
 * Number will be inclusive of `min` and below `max`.
 *
 * ```js
 * // If only one parameter is provided, it's assumed to be the max:
 * // Random number that might be 0 through to 99
 * const r = weightedInteger(100);
 *
 * // If two numbers are given, it's assumed to be min, max
 * // Random number that might be 20 through to 29
 * const r = weightedInteger(20,30);
 *
 * // One number and string. First param is assumed to be
 * // the max, second parameter the easing function
 * const r = weightedInteger(100, `quadIn`)
 * ```
 *
 * Useful for accessing a random array element:
 * ```js
 * const list = [`mango`, `kiwi`, `grape`];
 * // Yields random item from list
 * list[weightedInteger(list.length)];
 * ```
 *
 * Note: result from easing function will be clamped to
 * the min/max (by default 0-1);
 *
 * @param max Maximum (exclusive)
 * @param min Minimum number (inclusive), 0 by default
 * @param rand Source random generator. `Math.random` by default.
 * @param easing Easing to use, uses `quadIn` by default
 * @returns
 */
declare const weightedInteger: (minOrMax: number, maxOrEasing?: number | "arch" | "bell" | "sineIn" | "sineOut" | "quadIn" | "quadOut" | "sineInOut" | "quadInOut" | "cubicIn" | "cubicOut" | "quartIn" | "quartOut" | "quintIn" | "quintOut" | "expoIn" | "expoOut" | "quintInOut" | "expoInOut" | "circIn" | "circOut" | "backIn" | "backOut" | "circInOut" | "backInOut" | "elasticIn" | "elasticOut" | "bounceIn" | "bounceOut" | "elasticInOut" | "bounceInOut" | undefined, easing?: "arch" | "bell" | "sineIn" | "sineOut" | "quadIn" | "quadOut" | "sineInOut" | "quadInOut" | "cubicIn" | "cubicOut" | "quartIn" | "quartOut" | "quintIn" | "quintOut" | "expoIn" | "expoOut" | "quintInOut" | "expoInOut" | "circIn" | "circOut" | "backIn" | "backOut" | "circInOut" | "backInOut" | "elasticIn" | "elasticOut" | "bounceIn" | "bounceOut" | "elasticInOut" | "bounceInOut" | undefined, rand?: RandomSource) => number;
/**
 * Returns a random number with gaussian (ie bell-curved) distribution
 * ```js
 * // Yields a random number between 0..1
 * // with a gaussian distribution
 * gaussian();
 * ```
 *
 * Distribution can also be skewed:
 * ```js
 * // Yields a skewed random value
 * gaussian(10);
 * ```
 *
 * Use the curried version in order to pass the random number generator elsewhere:
 * ```js
 * const g = gaussianSkewed(10);
 * // Now it can be called without parameters
 * g(); // Yields skewed random
 *
 * // Eg:
 * shuffle(gaussianSkewed(10));
 * ```
 * @param skew
 * @returns
 */
declare const gaussian: (skew?: number) => number;
/**
 * Returns a function of skewed gaussian values.
 *
 * This 'curried' function is useful when be
 * ```js
 * const g = gaussianSkewed(10);
 *
 * // Now it can be called without parameters
 * g(); // Returns skewed value
 *
 * // Eg:
 * shuffle(gaussianSkewed(10));
 * ```
 * @param skew
 * @returns
 */
declare const gaussianSkewed: (skew: number) => () => number;
/**
 * Returns a string of random letters and numbers of a given `length`.
 *
 * ```js
 * string(4); // eg. `4afd`
 * ```
 * @param length Length of random string
 * @returns Random string
 */
declare const string: (length: number) => string;

declare const Random_defaultRandom: typeof defaultRandom;
type Random_RandomSource = RandomSource;
declare const Random_weighted: typeof weighted;
declare const Random_weightedInteger: typeof weightedInteger;
declare const Random_gaussian: typeof gaussian;
declare const Random_gaussianSkewed: typeof gaussianSkewed;
declare const Random_string: typeof string;
declare namespace Random {
  export {
    randomIndex as arrayIndex,
    randomElement as arrayElement,
    Random_defaultRandom as defaultRandom,
    Random_RandomSource as RandomSource,
    Random_weighted as weighted,
    Random_weightedInteger as weightedInteger,
    Random_gaussian as gaussian,
    Random_gaussianSkewed as gaussianSkewed,
    Random_string as string,
  };
}

/**
 * Applies a function to the elements of an array, weighting them based on their relative position.
 *
 * ```js
 * // Six items
 * weight([1,1,1,1,1,1], Easings.gaussian());
 *
 * // Yields:
 * // [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
 * ```
 *
 * Function is expected to map (0..1) => (0..1), such as an {@link Easings.EasingFn}. The input to the
 * function is the relative position of an element, so the first element will use fn(0), the middle (0.5) and so on.
 * The output of the function s then multiplied by the original value.
 *
 * In the below example (which is also the default if `fn` is not specified), it is just the
 * position which is used to proportion the contents.
 *
 * ```js
 * weight([1,1,1,1,1,1], (relativePos) => relativePos);
 * // Yields:
 * // [0, 0.2, 0.4, 0.6, 0.8, 1]
 * ```
 *
 * Non-numbers in `data` will be silently ignored.
 * @param data Data to process. Assumed to be an array of numbers
 * @param fn Function (number)=>number. Returns a weighting based on the given relative position. If unspecified (x) => x is used.
 */
declare const weight: (data: readonly number[], fn?: ((relativePos: number) => number) | undefined) => readonly number[];
/**
 * Calculates the average of all numbers in an array.
 * Array items which aren't a valid number are ignored and do not factor into averaging.
 *
 * Use {@link minMaxAvg} if you want min, max and total as well.
 *
 * @example
 * ```
 * // Average of a list
 * const avg = average(1, 1.4, 0.9, 0.1);
 *
 * // Average of a variable
 * let data = [100,200];
 * average(...data);
 * ```
 * @param data Data to average.
 * @returns Average of array
 */
declare const average: (...data: readonly number[]) => number;
/**
 * Computes an average of an array with a set of weights applied.
 *
 * Weights can be provided as an array, expected to be on 0..1 scale, with indexes
 * matched up to input data. Ie. data at index 2 will be weighed by index 2 in the weightings array.
 *
 * ```js
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
 * averageWeighted[1,2,3], Easings.gaussian()); // 2.0
 * ```
 *
 * This is the same as:
 * ```js
 * const data = [1,2,3];
 * const w = weight(data, Easings.gaussian());
 * const avg = averageWeighted(data, w); // 2.0
 * ```
 * @param data Data to average
 * @param weightings Array of weightings that match up to data array, or an easing function
 */
declare const averageWeighted: (data: readonly number[], weightings: (readonly number[]) | EasingFn) => number;
/**
 * Returns the minimum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 * @param data
 * @returns Minimum number
 */
declare const min: (...data: readonly number[]) => number;
/**
 * Returns the maximum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 * @param data
 * @returns Maximum number
 */
declare const max: (...data: readonly number[]) => number;
/**
 * Returns the maximum out of `data` without additional processing for speed.
 *
 * For most uses, {@link max} should suffice.
 * @param data
 * @returns Maximum
 */
declare const maxFast: (data: readonly number[] | Float32Array) => number;
/**
 * Returns the min, max, avg and total of the array.
 * Any values that are invalid are silently skipped over.
 *
 * Use {@link average} if you only need average
 *
 * @param data
 * @param startIndex If provided, starting index to do calculations (defaults full range)
 * @param endIndex If provided, the end index to do calculations (defaults full range)
 * @returns `{min, max, avg, total}`
 */
declare const minMaxAvg: (data: readonly number[], startIndex?: number | undefined, endIndex?: number | undefined) => {
    /**
     * Smallest value in array
     */
    readonly min: number;
    /**
     * Total of all items
     */
    readonly total: number;
    /**
     * Largest value in array
     */
    readonly max: number;
    /**
     * Average value in array
     */
    readonly avg: number;
};

/**
 * Functions for working with primitive arrays, regardless of type
 * See Also: NumericArrays.ts
 */

/**
 * Throws an error if `array` parameter is not a valid array
 * @private
 * @param array
 * @param paramName
 */
declare const guardArray: <V>(array: ArrayLike<V>, paramName?: string) => void;
/**
 * Throws if `index` is an invalid array index for `array`, and if
 * `array` itself is not a valid array.
 * @param array
 * @param index
 */
declare const guardIndex: <V>(array: readonly V[], index: number, paramName?: string) => void;
/**
 * Returns _true_ if all the contents of the array are identical
 * @param array Array
 * @param equality Equality checker. Uses string-conversion checking by default
 * @returns
 */
declare const areValuesIdentical: <V>(array: readonly V[], equality?: IsEqual<V> | undefined) => boolean;
/**
 * Zip ombines the elements of two or more arrays based on their index.
 *
 * ```js
 * const a = [1,2,3];
 * const b = [`red`, `blue`, `green`];
 *
 * const c = zip(a, b);
 * // Yields:
 * // [
 * //   [1, `red`],
 * //   [2, `blue`],
 * //   [3, `green`]
 * // ]
 * ```
 *
 * Typically the arrays you zip together are all about the same logical item. Eg, in the above example
 * perhaps `a` is size and `b` is colour. So thing #1 (at array index 0) is a red thing of size 1. Before
 * zipping we'd access it by `a[0]` and `b[0]`. After zipping, we'd have c[0], which is array of [1, `red`].
 * @param arrays
 * @returns Zipped together array
 */
declare const zip: (...arrays: ReadonlyArray<any>) => ReadonlyArray<any>;
/**
 * Returns an copy of `data` with specified length.
 * If the input array is too long, it is truncated.
 * If the input array is too short, it will the expanded based on the `expand` strategy
 *  - undefined: fill with `undefined`
 *  - repeat: repeat array elements from position 0
 *  - first: continually use first element
 *  - last: continually use last element
 *
 * ```js
 * ensureLength([1,2,3], 2); // [1,2]
 * ensureLength([1,2,3], 5, `undefined`); // [1,2,3,undefined,undefined]
 * ensureLength([1,2,3], 5, `repeat`);    // [1,2,3,1,2]
 * ensureLength([1,2,3], 5, `first`);     // [1,2,3,1,1]
 * ensureLength([1,2,3], 5, `last`);      // [1,2,3,3,3]
 * ```
 * @param data
 * @param length
 */
declare const ensureLength: <V>(data: readonly V[], length: number, expand?: `undefined` | `repeat` | `first` | `last`) => readonly V[];
/**
 * Return elements from `array` that match a given `predicate`, and moreover are between the given `startIndex` and `endIndex`.
 *
 * While this can be done with in the in-built `array.filter` function, it will needless iterate through the whole array. It also
 * avoids another alternative of slicing the array before using `filter`.
 * @param array
 * @param predicate
 * @param startIndex
 * @param endIndex
 */
declare const filterBetween: <V>(array: readonly V[], predicate: (value: V, index: number, array: readonly V[]) => boolean, startIndex: number, endIndex: number) => readonly V[];
/**
 * Returns a random array index
 * @param array
 * @param rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomIndex: <V>(array: ArrayLike<V>, rand?: RandomSource) => number;
/**
 * Returns random element
 * @param array
 * @params rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomElement: <V>(array: ArrayLike<V>, rand?: RandomSource) => V;
/**
 * Removes a random item from an array, returning both the item and the new array as a result.
 * Does not modify the original array unless `mutate` parameter is true.
 *
 * @example Without changing source
 * ```js
 * const data = [100, 20, 40];
 * const {value, array} = randomPluck(data);
 * // value: 20, array: [100, 40], data: [100, 20, 40];
 * ```
 *
 * @example Mutating source
 * ```js
 * const data = [100, 20, 40];
 * const {value} = randomPluck(data, true);
 * // value: 20, data: [100, 40];
 * ```
 *
 * @template V Type of array
 * @param array Array to pluck item from
 * @param mutate If _true_, changes input array. _False_ by default.
 * @param random Random generatr. `Math.random` by default.
 * @return Returns an object `{value:V|undefined, array:V[]}`
 *
 */
declare const randomPluck: <V>(array: readonly V[], mutate?: boolean, rand?: RandomSource) => {
    readonly value: V | undefined;
    readonly array: V[];
};
/**
 * Returns a shuffled copy of the input array.
 * @example
 * ```js
 * const d = [1, 2, 3, 4];
 * const s = shuffle(d);
 * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
 * ```
 * @param dataToShuffle
 * @param rand Random generator. `Math.random` by default.
 * @returns Copy with items moved around randomly
 * @template V Type of array items
 */
declare const shuffle: <V>(dataToShuffle: readonly V[], rand?: RandomSource) => readonly V[];
/**
 * Returns an array with a value omitted. If value is not found, result will be a copy of input.
 * Value checking is completed via the provided `comparer` function, or by default checking whether `a === b`.
 *
 * @example
 * ```js
 * const data = [100, 20, 40];
 * const filtered = without(data, 20); // [100, 40]
 * ```
 * @template V Type of array items
 * @param data Source array
 * @param value Value to remove
 * @param comparer Comparison function. If not provided {@link isEqualDefault} is used, which compares using `===`
 * @return Copy of array without value.
 */
declare const without: <V>(data: readonly V[], value: V, comparer?: IsEqual<V>) => readonly V[];
/**
 * Groups data by a grouper function, returning data as a map with string
 * keys and array values.
 *
 * @example
 * ```js
 * const data = [
 *  { age: 39, city: `London` }
 *  { age: 14, city: `Copenhagen` }
 *  { age: 23, city: `Stockholm` }
 *  { age: 56, city: `London` }
 * ];
 * const map = groupBy(data, item => data.city);
 * ```
 *
 * Returns a map:
 * ```
 * London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
 * Stockhom: [{ age: 23, city: `Stockholm` }]
 * Copenhagen: [{ age: 14, city: `Copenhagen` }]
 * ```
 * @param array Array to group
 * @param grouper Function that returns a key for a given item
 * @template K Type of key to group by. Typically string.
 * @template V Type of values
 * @returns Map
 */
declare const groupBy: <K, V>(array: readonly V[], grouper: (item: V) => K) => Map<K, V[]>;

declare const Arrays_guardArray: typeof guardArray;
declare const Arrays_guardIndex: typeof guardIndex;
declare const Arrays_areValuesIdentical: typeof areValuesIdentical;
declare const Arrays_zip: typeof zip;
declare const Arrays_ensureLength: typeof ensureLength;
declare const Arrays_filterBetween: typeof filterBetween;
declare const Arrays_randomIndex: typeof randomIndex;
declare const Arrays_randomElement: typeof randomElement;
declare const Arrays_randomPluck: typeof randomPluck;
declare const Arrays_shuffle: typeof shuffle;
declare const Arrays_without: typeof without;
declare const Arrays_groupBy: typeof groupBy;
declare const Arrays_weight: typeof weight;
declare const Arrays_average: typeof average;
declare const Arrays_averageWeighted: typeof averageWeighted;
declare const Arrays_min: typeof min;
declare const Arrays_max: typeof max;
declare const Arrays_maxFast: typeof maxFast;
declare const Arrays_minMaxAvg: typeof minMaxAvg;
declare namespace Arrays {
  export {
    Arrays_guardArray as guardArray,
    Arrays_guardIndex as guardIndex,
    Arrays_areValuesIdentical as areValuesIdentical,
    Arrays_zip as zip,
    Arrays_ensureLength as ensureLength,
    Arrays_filterBetween as filterBetween,
    Arrays_randomIndex as randomIndex,
    Arrays_randomElement as randomElement,
    Arrays_randomPluck as randomPluck,
    Arrays_shuffle as shuffle,
    Arrays_without as without,
    Arrays_groupBy as groupBy,
    Arrays_weight as weight,
    Arrays_average as average,
    Arrays_averageWeighted as averageWeighted,
    Arrays_min as min,
    Arrays_max as max,
    Arrays_maxFast as maxFast,
    Arrays_minMaxAvg as minMaxAvg,
  };
}

export { Arrays as A, Easing$1 as E, Random as R, RandomSource as a, randomElement as b, weightedInteger as c, defaultRandom as d, gaussianSkewed as e, guardArray as f, gaussian as g, guardIndex as h, areValuesIdentical as i, ensureLength as j, filterBetween as k, randomPluck as l, shuffle as m, without as n, groupBy as o, weight as p, average as q, randomIndex as r, string as s, averageWeighted as t, min as u, max as v, weighted as w, maxFast as x, minMaxAvg as y, zip as z };
