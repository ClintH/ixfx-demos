import { R as RandomSource, a as RandomOptions, G as GenerateRandomOptions, S as StringOptions, d as defaultRandom } from './Types-Tj0rQbez.js';
import { i as integer, a as integerSource, b as integerUniqueGen } from './Integer-RRpbU78-.js';
import { s as string } from './String-EN5daJkd.js';
import { a as EasingName } from './Easing-yyYzToch.js';
import { r as randomElement, a as randomIndex } from './Random-ltagXG1c.js';
import { r as randomHue } from './Colour-LRt7FU52.js';

/**
 * Chance of returning `a` or `b`, based on probability `p`.
 *
 * `p` sets the weighting for picking `b`. The higher the value (up to 1),
 * the more likely `b` will be picked.
 *
 * ```js
 * // 50% of the time it will return 100, 50% 110
 * chance(0.5, 100, 110);
 * // 90% of the time it will yield 110, 10% it will yield 100
 * chance(0.9, 100, 110);
 * ```
 *
 * All parameters can be either a function returning a value, or a value.
 * @param p
 * @param initial
 * @param compute
 * @param randomSource
 * @returns
 */
declare const chance: <T>(p: number | (() => number), a: T | (() => T), b: T | (() => T), randomSource?: RandomSource) => T;

/**
 * Returns a function that produces random float values.
 * Use {@link float} to produce a valued directly.
 *
 * Random float between `max` (exclusive) and 0 (inclusive). Max is 1 if unspecified.
 *
 *
 * ```js
 * // Random number between 0..1 (but not including 1)
 * // (this would be identical to Math.random())
 * const r = floatSource();
 * r(); // Execute to produce random value
 *
 * // Random float between 0..100 (but not including 100)
 * const v = floatSource(100)();
 * ```
 *
 * Options can be used:
 * ```js
 * // Random float between 20..40 (possibly including 20, but always lower than 40)
 * const r = floatSource({ min: 20, max: 40 });
 * ```
 * @param maxOrOptions Maximum value (exclusive) or options
 * @returns Random number
 */
declare const floatSource: (maxOrOptions?: number | RandomOptions) => RandomSource;
/**
 * Returns a random float between `max` (exclusive) and 0 (inclusive). Max is 1 if unspecified.
 * Use {@link floatSource} to get a function that produces values. This is used internally.
 *
 * ```js
 * // Random number between 0..1 (but not including 1)
 * // (this would be identical to Math.random())
 * const v = float();
 * // Random float between 0..100 (but not including 100)
 * const v = float(100);
 * ```
 *
 * Options can be used:
 * ```js
 * // Random float between 20..40 (possibly including 20, but always lower than 40)
 * const v = float({ min: 20, max: 40 });
 * ```
 * @param maxOrOptions Maximum value (exclusive) or options
 * @returns Random number
 */
declare const float: (maxOrOptions?: number | RandomOptions) => number;

/**
 * Returns a random number with gaussian (ie. bell-curved) distribution
 *
 * @example Random number between 0..1 with gaussian distribution
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 * Random.gaussian();
 * ```
 *
 * @example Distribution can be skewed
 * ```js
 * Random.gaussian(10);
 * ```
 *

 * @param skew Skew factor. Defaults to 1, no skewing. Above 1 will skew to left, below 1 will skew to right
 * @returns
 */
declare const gaussian: (skew?: number) => number;
/**
 * Returns a function that generates a gaussian-distributed random number
 *  * @example Random number between 0..1 with gaussian distribution
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 *
 * // Create function
 * const r = Random.gaussianFn();
 *
 * // Generate random value
 * r();
 * ```
 *
 * @example Pass the random number generator elsewhere
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 * import * as Arrays from 'https://unpkg.com/ixfx/dist/arrays.js';
 * const r = Random.gaussianFn(10);
 *
 * // Randomise array with gaussian distribution
 * Arrays.shuffle(r);
 * ```
 * @param skew
 * @returns
 */
declare const gaussianSource: (skew?: number) => RandomSource;

/**
 * Generates a short roughly unique id
 * ```js
 * const id = shortGuid();
 * ```
 * @param options Options.
 * @returns
 */
declare const shortGuid: (options?: Readonly<{
    source?: RandomSource;
}>) => string;

declare const calculateNonZero: (source?: RandomSource) => number;

/**
 * Returns a random number of minutes, with a unit of milliseconds.
 * Max value is exclusive.
 * Use {@link minutesMs} to get a value directly, or {@link minutesMsSource} to return a function.
 *
 * @example Random value from 0 to one milli less than 5 * 60 * 1000
 * ```js
 * // Create function that returns value
 * const f = minutesMsSource(5);
 *
 * f(); // Generate value
 * ```
 *
 * @example Specified options:
 * ```js
 * // Random time between one minute and 5 minutes
 * const f = minutesMsSource({ max: 5, min: 1 });
 * f();
 * ```
 *
 * @remarks
 * It's a very minor function, but can make
 * code a little more literate:
 * ```js
 * // Random timeout of up to 5 mins
 * setTimeout(() => { ... }, minutesMsSource(5));
 * ```
 * @param maxMinutesOrOptions
 * @see {@link minutesMs}
 * @returns Function that produces a random value
 */
declare const minutesMsSource: (maxMinutesOrOptions: number | RandomOptions) => RandomSource;
/**
 * @example Random value from 0 to one milli less than 5 * 60 * 1000
 * ```js
 * // Random value from 0 to one milli less than 5*60*1000
 * minuteMs(5);
 * ```
 *
 * @example Specified options:
 * ```js
 * // Random time between one minute and 5 minutes
 * minuteMs({ max: 5, min: 1 });
 * ```
 * @inheritDoc minutesMsSource
 *
 * @param maxMinutesOrOptions
 * @see {@link minutesMsSource}
 * @returns Milliseconds
 */
declare const minutesMs: (maxMinutesOrOptions: number | RandomOptions) => number;
/**
 * Returns function which produces a random number of seconds, with a unit of milliseconds.
 * Maximum value is exclusive.
 * Use {@link secondsMs} to return a random value directly, or {@link secondsMsSource} to return a function.
 *
 * @example Random milliseconds between 0..4999
 * ```js
 * // Create function
 * const f = secondsMsSource(5000);
 * // Produce a value
 * const value = f();
 * ```
 *
 * @example Options can be provided
 * ```js
 * // Random milliseconds between 1000-4999
 * const value = secondsMsSource({ max:5, min:1 })();
 * // Note the extra () at the end to execute the function
 * ```
 *
 * @remarks
 * It's a very minor function, but can make
 * code a little more literate:
 * ```js
 * // Random timeout of up to 5 seconds
 * setTimeout(() => { ...}, secondsMsSource(5));
 * ```
 * @param maxSecondsOrOptions Maximum seconds, or options.
 * @returns Milliseconds
 */
declare const secondsMsSource: (maxSecondsOrOptions: number | RandomOptions) => RandomSource;
/**
 * @example Random milliseconds between 0..4999
 * ```js
 * secondsMs(5000);
 * ```
 *
 * @example Options can be provided
 * ```js
 * // Random milliseconds between 1000-4999
 * secondsMs({ max:5, min:1 });
 * ```
 * @inheritDoc secondsMsSource
 * @param maxSecondsOrOptions
 * @returns
 */
declare const secondsMs: (maxSecondsOrOptions: number | RandomOptions) => number;

/**
 * Options for producing weighted distribution
 */
type WeightedOptions = Readonly<{
    /**
     * Easing function to use (optional)
     */
    easing?: EasingName;
    /**
     * Random source (optional)
     */
    source?: RandomSource;
}>;
/***
 * Returns a random number, 0..1, weighted by a given easing function.
 * Default easing is `quadIn`, which skews towards zero.
 *
 * Use {@link weightedSource} to return a function instead.
 *
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 * Random.weighted();          // quadIn easing by default, which skews toward low values
 * Random.weighted(`quadOut`); // quadOut favours high values
 * ```
 * @param easingNameOrOptions Options. Uses 'quadIn' by default.
 * @see {@link weightedSource} Returns a function rather than value
 * @returns Random number (0-1)
 */
declare const weighted: (easingNameOrOptions?: EasingName | WeightedOptions) => number;
/***
 * Returns a random number, 0..1, weighted by a given easing function.
 * Default easing is `quadIn`, which skews towards zero.
 * Use {@link weighted} to get a value directly.
 *
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 * const r1 = Random.weightedSource();          // quadIn easing by default, which skews toward low values
 * r1(); // Produce a value
 *
 * const r2 = Random.weightedSource(`quadOut`); // quadOut favours high values
 * r2(); // Produce a value
 * ```
 * @param easingNameOrOptions Easing name or options `quadIn` by default.
 * @see {@link weighted} Returns value instead of function
 * @returns Function which returns a weighted random value
 */
declare const weightedSource: (easingNameOrOptions?: EasingName | WeightedOptions) => RandomSource;

/**
* Returns a random number from 0..weightings.length, distributed by the weighting values.
*
* eg: produces 0 20% of the time, 1 50% of the time, 2 30% of the time
* ```js
* weightedIndex([0.2, 0.5, 0.3]);
* ```
* @param weightings
* @param rand
* @returns
*/
declare const weightedIndex: (weightings: Array<number>, rand?: RandomSource) => () => number;

type WeightedIntegerOptions = WeightedOptions & Readonly<{
    min?: number;
    max: number;
}>;
/**
 * Random integer, weighted according to an easing function.
 * Number will be inclusive of `min` and below `max`.
 *
 * @example 0..99
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 * const r = Random.weightedIntegerFn(100);
 * r(); // Produce value
 * ```
 *
 * @example 20..29
 * ```js
 * const r = Random.weightedIntegerFn({ min: 20, max: 30 });
 * r(); // Produce value
 * ```
 *
 * @example  0..99 with 'quadIn' easing
 * ```js
 * const r = Random.weightedInteger({ max: 100, easing: `quadIn` });
 * ```
 *
 * Note: result from easing function will be clamped to
 * the min/max (by default 0-1);
 *
 * @param maxOrOptions Maximum (exclusive)
 * @returns Function that produces a random weighted integer
 */
declare const weightedIntegerSource: (maxOrOptions: number | WeightedIntegerOptions) => RandomSource;
/**
 * @example 0..99
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 * Random.weightedInteger(100);
 * ```
 *
 * @example 20..29
 * ```js
 * Random.weightedInteger({ min: 20, max: 30 });
 * ```
 *
 * @example  0..99 with 'quadIn' easing
 * ```js
 * Random.weightedInteger({ max: 100, easing: `quadIn` })
 * ```
 * @inheritDoc {@link weightedIntegerSource}
 * @param maxOrOptions
 * @returns Random weighted integer
 */
declare const weightedInteger: (maxOrOptions: number | WeightedIntegerOptions) => number;

declare const index_GenerateRandomOptions: typeof GenerateRandomOptions;
declare const index_RandomOptions: typeof RandomOptions;
declare const index_RandomSource: typeof RandomSource;
declare const index_StringOptions: typeof StringOptions;
type index_WeightedIntegerOptions = WeightedIntegerOptions;
type index_WeightedOptions = WeightedOptions;
declare const index_calculateNonZero: typeof calculateNonZero;
declare const index_chance: typeof chance;
declare const index_defaultRandom: typeof defaultRandom;
declare const index_float: typeof float;
declare const index_floatSource: typeof floatSource;
declare const index_gaussian: typeof gaussian;
declare const index_gaussianSource: typeof gaussianSource;
declare const index_integer: typeof integer;
declare const index_integerSource: typeof integerSource;
declare const index_integerUniqueGen: typeof integerUniqueGen;
declare const index_minutesMs: typeof minutesMs;
declare const index_minutesMsSource: typeof minutesMsSource;
declare const index_secondsMs: typeof secondsMs;
declare const index_secondsMsSource: typeof secondsMsSource;
declare const index_shortGuid: typeof shortGuid;
declare const index_string: typeof string;
declare const index_weighted: typeof weighted;
declare const index_weightedIndex: typeof weightedIndex;
declare const index_weightedInteger: typeof weightedInteger;
declare const index_weightedIntegerSource: typeof weightedIntegerSource;
declare const index_weightedSource: typeof weightedSource;
declare namespace index {
  export { index_GenerateRandomOptions as GenerateRandomOptions, index_RandomOptions as RandomOptions, index_RandomSource as RandomSource, index_StringOptions as StringOptions, type index_WeightedIntegerOptions as WeightedIntegerOptions, type index_WeightedOptions as WeightedOptions, randomElement as arrayElement, randomIndex as arrayIndex, index_calculateNonZero as calculateNonZero, index_chance as chance, index_defaultRandom as defaultRandom, index_float as float, index_floatSource as floatSource, index_gaussian as gaussian, index_gaussianSource as gaussianSource, randomHue as hue, index_integer as integer, index_integerSource as integerSource, index_integerUniqueGen as integerUniqueGen, index_minutesMs as minutesMs, index_minutesMsSource as minutesMsSource, index_secondsMs as secondsMs, index_secondsMsSource as secondsMsSource, index_shortGuid as shortGuid, index_string as string, index_weighted as weighted, index_weightedIndex as weightedIndex, index_weightedInteger as weightedInteger, index_weightedIntegerSource as weightedIntegerSource, index_weightedSource as weightedSource };
}

export { type WeightedOptions as W, float as a, gaussianSource as b, chance as c, calculateNonZero as d, minutesMs as e, floatSource as f, gaussian as g, secondsMsSource as h, index as i, secondsMs as j, weightedSource as k, weightedIndex as l, minutesMsSource as m, type WeightedIntegerOptions as n, weightedIntegerSource as o, weightedInteger as p, shortGuid as s, weighted as w };
