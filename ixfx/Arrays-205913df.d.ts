import { b as EasingName, a as EasingFn } from './Easing-e712c8ff.js';
import { T as ToString } from './Util-82e375df.js';
import { I as IsEqual } from './IsEqual-267e4380.js';
import { a as MinMaxAvgOpts, M as MinMaxAvgTotal, m as minMaxAvg } from './MinMaxAvg-bf5430b4.js';
import * as d3Colour from 'd3-color';

type Hsl = {
    h: number;
    s: number;
    l: number;
    opacity?: number;
};
type Rgb = {
    r: number;
    g: number;
    b: number;
    opacity?: number;
};
type Spaces = `hsl` | `rgb` | `lab` | `hcl` | `cubehelix`;
/**
 * @private
 */
type Colour = d3Colour.RGBColor | d3Colour.HSLColor;
/**
 * A representation of colour. Eg: `blue`, `rgb(255,0,0)`, `hsl(20,100%,50%)`
 */
type Colourish = string | d3Colour.ColorCommonInstance;
/**
 * Options for interpolation
 */
type InterpolationOpts = {
    /**
     * Gamma correction. Eg 4 brightens values. Only applies to rgb and cubehelix
     * [Read more](https://github.com/d3/d3-interpolate#interpolate_gamma)
     */
    gamma?: number;
    /**
     * Colour space
     */
    space?: Spaces;
    /**
     * If true, interpolation happens the longer distance. Only applies to hsl, hcl and cubehelix
     */
    long?: boolean;
};
/**
 * Parses colour to `{ h, s, l }`. `opacity` field is added if it exists on source.
 * @param colour
 * @returns
 */
declare const toHsl: (colour: Colourish) => Hsl;
/**
 * Returns a full HSL colour string (eg `hsl(20,50%,75%)`) based on a index.
 * It's useful for generating perceptually different shades as the index increments.
 *
 * ```
 * el.style.backgroundColor = goldenAgeColour(10);
 * ```
 *
 * Saturation and lightness can be specified, as numeric ranges of 0-1.
 *
 * @param saturation Saturation (0-1), defaults to 0.5
 * @param lightness Lightness (0-1), defaults to 0.75
 * @param alpha Opacity (0-1), defaults to 1.0
 * @returns HSL colour string eg `hsl(20,50%,75%)`
 */
declare const goldenAngleColour: (index: number, saturation?: number, lightness?: number, alpha?: number) => string;
/**
 * Returns a random hue component
 * ```
 * // Generate hue
 * const h =randomHue(); // 0-359
 *
 * // Generate hue and assign as part of a HSL string
 * el.style.backgroundColor = `hsl(${randomHue(), 50%, 75%})`;
 * ```
 * @param rand
 * @returns
 */
declare const randomHue: (rand?: RandomSource) => number;
/**
 * Parses colour to `{ r, g, b }`. `opacity` field is added if it exists on source.
 * [Named colours](https://html-color-codes.info/color-names/)
 * @param colour
 * @returns
 */
declare const toRgb: (colour: Colourish) => Rgb;
/**
 * Returns a colour in hex format `#000000`
 * @param colour
 * @returns Hex format, including #
 */
declare const toHex: (colour: Colourish) => string;
/**
 * Returns a variation of colour with its opacity multiplied by `amt`.
 *
 * ```js
 * // Return a colour string for blue that is 50% opaque
 * opacity(`blue`, 0.5);
 * // eg: `rgba(0,0,255,0.5)`
 *
 * // Returns a colour string that is 50% more opaque
 * opacity(`hsla(200,100%,50%,50%`, 0.5);
 * // eg: `hsla(200,100%,50%,25%)`
 * ```
 *
 * [Named colours](https://html-color-codes.info/color-names/)
 * @param colour A valid CSS colour
 * @param amt Amount to multiply opacity by
 * @returns String representation of colour
 */
declare const opacity: (colour: Colourish, amt: number) => string;
/**
 * Gets a CSS variable.
 * @example Fetch --accent variable, or use `yellow` if not found.
 * ```
 * getCssVariable(`accent`, `yellow`);
 * ```
 * @param name Name of variable. Omit the `--`
 * @param fallbackColour Fallback colour if not found
 * @param root  Element to search variable from
 * @returns Colour or fallback.
 */
declare const getCssVariable: (name: string, fallbackColour?: string, root?: HTMLElement) => string;
/**
 * Interpolates between two colours, returning a string in the form `rgb(r,g,b)`
 *
 * @example
 * ```js
 * // Get 50% between blue and red
 * interpolate(0.5, `blue`, `red`);
 *
 * // Get midway point, with specified colour space
 * interpolate(0.5, `hsl(200, 100%, 50%)`, `pink`, {space: `hcl`});
 * ```
 *
 * [Named colours](https://html-color-codes.info/color-names/)
 * @param amount Amount (0 = from, 0.5 halfway, 1= to)
 * @param from Starting colour
 * @param to Final colour
 * @param optsOrSpace Options for interpolation, or string name for colour space, eg `hsl`.
 * @returns String representation of colour, eg. `rgb(r,g,b)`
 */
declare const interpolate: (amount: number, from: Colourish, to: Colourish, optsOrSpace?: string | InterpolationOpts) => string;
/**
 * Produces a scale of colours as a string array
 *
 * @example
 * ```js
 * // Yields array of 5 colour strings
 * const s = scale(5, {space:`hcl`}, `blue`, `red`);
 * // Produces scale between three colours
 * const s = scale(5, {space:`hcl`}, `blue`, `yellow`, `red`);
 * ```
 * @param steps Number of colours
 * @param opts Options for interpolation, or string colour space eg `hsl`
 * @param colours From/end colours (or more)
 * @returns
 */
declare const scale: (steps: number, opts: InterpolationOpts | string, ...colours: Colourish[]) => string[];

type Colour$1_Colour = Colour;
type Colour$1_Colourish = Colourish;
type Colour$1_Hsl = Hsl;
type Colour$1_InterpolationOpts = InterpolationOpts;
type Colour$1_Rgb = Rgb;
type Colour$1_Spaces = Spaces;
declare const Colour$1_getCssVariable: typeof getCssVariable;
declare const Colour$1_goldenAngleColour: typeof goldenAngleColour;
declare const Colour$1_interpolate: typeof interpolate;
declare const Colour$1_opacity: typeof opacity;
declare const Colour$1_randomHue: typeof randomHue;
declare const Colour$1_scale: typeof scale;
declare const Colour$1_toHex: typeof toHex;
declare const Colour$1_toHsl: typeof toHsl;
declare const Colour$1_toRgb: typeof toRgb;
declare namespace Colour$1 {
  export {
    Colour$1_Colour as Colour,
    Colour$1_Colourish as Colourish,
    Colour$1_Hsl as Hsl,
    Colour$1_InterpolationOpts as InterpolationOpts,
    Colour$1_Rgb as Rgb,
    Colour$1_Spaces as Spaces,
    Colour$1_getCssVariable as getCssVariable,
    Colour$1_goldenAngleColour as goldenAngleColour,
    Colour$1_interpolate as interpolate,
    Colour$1_opacity as opacity,
    Colour$1_randomHue as randomHue,
    Colour$1_scale as scale,
    Colour$1_toHex as toHex,
    Colour$1_toHsl as toHsl,
    Colour$1_toRgb as toRgb,
  };
}

type RandomOptions = Readonly<{
    max: number;
    min?: number;
    source?: RandomSource;
}>;
/**
 * Default random number generator: `Math.random`.
 */
declare const defaultRandom: () => number;
/**
 * A random source.
 *
 * Predefined sources: {@link defaultRandom}, {@link gaussianSource}, {@link weightedSource}
 */
type RandomSource = () => number;
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
 * @param easingName Easing name or options `quadIn` by default.
 * @see {@link weighted} Returns value instead of function
 * @returns Function which returns a weighted random value
 */
declare const weightedSource: (easingNameOrOptions?: EasingName | WeightedOptions) => RandomSource;
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
 * @param easingNameOrOpts Options. Uses 'quadIn' by default.
 * @see {@link weightedSource} Returns a function rather than value
 * @returns Random number (0-1)
 */
declare const weighted: (easingNameOrOptions?: EasingName | WeightedOptions) => number;
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
 * @param maxOrOpts Maximum (exclusive)
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
 * @param maxOrOpts
 * @returns Random weighted integer
 */
declare const weightedInteger: (maxOrOptions: number | WeightedIntegerOptions) => number;
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
 * Returns a function that produces a random integer between `max` (exclusive) and 0 (inclusive)
 * Use {@link integer} if you want a random number directly.
 *
 * Invoke directly:
 * ```js
 * integerSource(10)();  // Random number 0-9
 * ```
 *
 * Or keep a reference to re-compute:
 * ```js
 * const r = integerSource(10);
 * r(); // Produce a random integer
 * ```
 *
 * If a negative value is given, this is assumed to be the
 * minimum (inclusive), with 0 as the max (inclusive)
 * ```js
 * integerSource(-5)();  // Random number from -5 to 0
 * ```
 *
 * Specify options for a custom minimum or source of random:
 * ```js
 * integerSource({ max: 5,  min: 10 })();  // Random number 4-10
 * integerSource({ max: -5, min: -10 })(); // Random number from -10 to -6
 * integerSource({ max: 10, source: Math.random })(); // Random number between 0-9, with custom source of random
 * ```
 *
 * Throws an error if max & min are equal
 * @param maxOrOpts Max value (exclusive), or set of options
 * @returns Random integer
 */
declare const integerSource: (maxOrOptions: number | RandomOptions) => RandomSource;
/**
 * Returns a random integer between `max` (exclusive) and 0 (inclusive)
 * Use {@link integerSource} to return a function instead.
 *
 * ```js
 * integer(10);  // Random number 0-9
 * ```
 *
 * If a negative value is given, this is assumed to be the
 * minimum (inclusive), with 0 as the max (inclusive)
 * ```js
 * integer(-5);  // Random number from -5 to 0
 * ```
 *
 * Specify options for a custom minimum or source of random:
 * ```js
 * integer({ max: 5,  min: 10 });  // Random number 4-10
 * integer({ max: -5, min: -10 }); // Random number from -10 to -6
 * integer({ max: 10, source: Math.random }); // Random number between 0-9, with custom source of random
 * ```
 *
 * Throws an error if max & min are equal
 * @param maxOrOpts Max value (exclusive), or set of options
 * @returns Random integer
 */
declare const integer: (maxOrOptions: number | RandomOptions) => number;
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
 * @param maxOrOpts Maximum value (exclusive) or options
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
 * @param maxOrOpts Maximum value (exclusive) or options
 * @returns Random number
 */
declare const float: (maxOrOptions?: number | RandomOptions) => number;
type StringOptions = Readonly<{
    length: number;
    source?: RandomSource;
}>;
/**
 * Returns a string of random letters and numbers of a given `length`.
 *
 * ```js
 * string();  // Random string of length 5
 * string(4); // eg. `4afd`
 * ```
 * @param length Length of random string
 * @returns Random string
 */
declare const string: (lengthOrOptions?: number | StringOptions) => string;
/**
 * Generates a short roughly unique id
 * ```js
 * const id = shortGuid();
 * ```
 * @param opts Options.
 * @returns
 */
declare const shortGuid: (options?: Readonly<{
    source?: RandomSource;
}>) => string;
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
 * @param maxMinutesOrOpts
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
 * @param maxMinutesOrOpts
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
 * @param maxSecondsOrOpts Maximum seconds, or options.
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
 * @param maxSecondsOrOpts
 * @returns
 */
declare const secondsMs: (maxSecondsOrOptions: number | RandomOptions) => number;
type GenerateRandomOptions = RandomOptions & Readonly<{
    /**
     * If true, number range is looped
     */
    loop?: boolean;
}>;
/**
 * Returns a generator over random unique integers, up to
 * but not including the given max value.
 *
 * @example 0..9 range
 * ```js
 * const rand = [ ...integerUniqueGen(10) ];
 * // eg: [2, 9, 6, 0, 8, 7, 3, 4, 5, 1]
 * ```
 *
 * @example Options can be provided:
 * ```js
 * // 5..9 range
 * const rand = [ ...integerUniqueGen({ min: 5, max: 10 })];
 * ```
 *
 * Range can be looped. Once the initial random walk through the number
 * range completes, it starts again in a new random way.
 *
 * ```js
 * for (const r of integerUniqueGen({ max: 10, loop: true })) {
 *  // Warning: loops forever
 * }
 * ```
 *
 * Behind the scenes, an array of numbers is created that captures the range, this is then
 * shuffled on the first run, and again whenever the iterator loops, if that's allowed.
 *
 * As a consequence, large ranges will consume larger amounts of memory.
 * @param maxOrOpts
 * @returns
 */
declare function integerUniqueGen(maxOrOptions: number | GenerateRandomOptions): IterableIterator<number>;

type Random_GenerateRandomOptions = GenerateRandomOptions;
type Random_RandomOptions = RandomOptions;
type Random_RandomSource = RandomSource;
type Random_StringOptions = StringOptions;
type Random_WeightedIntegerOptions = WeightedIntegerOptions;
type Random_WeightedOptions = WeightedOptions;
declare const Random_defaultRandom: typeof defaultRandom;
declare const Random_float: typeof float;
declare const Random_floatSource: typeof floatSource;
declare const Random_gaussian: typeof gaussian;
declare const Random_gaussianSource: typeof gaussianSource;
declare const Random_integer: typeof integer;
declare const Random_integerSource: typeof integerSource;
declare const Random_integerUniqueGen: typeof integerUniqueGen;
declare const Random_minutesMs: typeof minutesMs;
declare const Random_minutesMsSource: typeof minutesMsSource;
declare const Random_secondsMs: typeof secondsMs;
declare const Random_secondsMsSource: typeof secondsMsSource;
declare const Random_shortGuid: typeof shortGuid;
declare const Random_string: typeof string;
declare const Random_weighted: typeof weighted;
declare const Random_weightedIndex: typeof weightedIndex;
declare const Random_weightedInteger: typeof weightedInteger;
declare const Random_weightedIntegerSource: typeof weightedIntegerSource;
declare const Random_weightedSource: typeof weightedSource;
declare namespace Random {
  export {
    Random_GenerateRandomOptions as GenerateRandomOptions,
    Random_RandomOptions as RandomOptions,
    Random_RandomSource as RandomSource,
    Random_StringOptions as StringOptions,
    Random_WeightedIntegerOptions as WeightedIntegerOptions,
    Random_WeightedOptions as WeightedOptions,
    randomElement as arrayElement,
    randomIndex as arrayIndex,
    Random_defaultRandom as defaultRandom,
    Random_float as float,
    Random_floatSource as floatSource,
    Random_gaussian as gaussian,
    Random_gaussianSource as gaussianSource,
    randomHue as hue,
    Random_integer as integer,
    Random_integerSource as integerSource,
    Random_integerUniqueGen as integerUniqueGen,
    Random_minutesMs as minutesMs,
    Random_minutesMsSource as minutesMsSource,
    Random_secondsMs as secondsMs,
    Random_secondsMsSource as secondsMsSource,
    Random_shortGuid as shortGuid,
    Random_string as string,
    Random_weighted as weighted,
    Random_weightedIndex as weightedIndex,
    Random_weightedInteger as weightedInteger,
    Random_weightedIntegerSource as weightedIntegerSource,
    Random_weightedSource as weightedSource,
  };
}

/**
 * Computes an average of an array with a set of weights applied.
 *
 * Weights can be provided as an array, expected to be on 0..1 scale, with indexes
 * matched up to input data. Ie. data at index 2 will be weighed by index 2 in the weightings array.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * // All items weighted evenly
 * Arrays.averageWeighted([1,2,3], [1,1,1]); // 2
 *
 * // First item has full weight, second half, third quarter
 * Arrays.averageWeighted([1,2,3], [1, 0.5, 0.25]); // 1.57
 *
 * // With reversed weighting of [0.25,0.5,1] value is 2.42
 * ```
 *
 * A function can alternatively be provided to compute the weighting based on array index, via {@link weight}.
 *
 * ```js
 * Arrays.averageWeighted[1,2,3], Easings.gaussian()); // 2.0
 * ```
 *
 * This is the same as:
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * import { Easings } from 'https://unpkg.com/ixfx/dist/modulation.js';
 *
 * const data = [1,2,3];
 * const w = Arrays.weight(data, Easings.gaussian());
 * const avg = Arrays.averageWeighted(data, w); // 2.0
 * ```
 * @param data Data to average
 * @param weightings Array of weightings that match up to data array, or an easing function
 */
declare const averageWeighted: (data: Array<number> | ReadonlyArray<number>, weightings: Array<number> | ReadonlyArray<number> | EasingFn) => number;
/**
 * Applies a function `fn` to the elements of an array, weighting them based on their relative position.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 *
 * // Six items
 * Arrays.weight([1,1,1,1,1,1], Easings.gaussian());
 *
 * // Yields:
 * // [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
 * ```
 *
 * `fn` is expected to map (0..1) => (0..1), such as an {@link Modulation.Easings.EasingFn}. The input to the
 * `fn` is the relative position of an element. Thus the first element will be 0, the middle 0.5 and so on.
 * The output of `fn` is then multiplied by the original value.
 *
 * In the below example (which is also the default if `fn` is not specified), the relative position is
 * how values are weighted:
 *
 * ```js
 * Arrays.weight([1,1,1,1,1,1], (relativePos) => relativePos);
 * // Yields:
 * // [0, 0.2, 0.4, 0.6, 0.8, 1]
 * ```
 *
 * Non-numbers in `data` will be silently ignored (this filtering happens first, so relative index values are sane still).
 *
 * @param data Array of numbers
 * @param fn Returns a weighting based on the given relative position. If unspecified, `(x) => x` is used.
 */
declare const weight: (data: Array<number> | ReadonlyArray<number>, fn?: ((relativePos: number) => number) | undefined) => Array<number>;
/**
 * Returns an array of all valid numbers from `data`
 *
 * @param data
 * @returns
 */
declare const validNumbers: (data: ReadonlyArray<number>) => number[];
/**
 * Returns the dot product of two arbitrary-sized arrays. Assumed they are of the same length.
 * @param a
 * @param b
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
 * ```
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 *
 * // Average of a list
 * const avg = Arrays.average([1, 1.4, 0.9, 0.1]);
 *
 * // Average of a variable
 * let data = [100,200];
 * Arrays.average(data);
 * ```
 *
 * See also: [Numbers.average](Numbers.average.html) which takes a list of parameters
 * @param data Data to average.
 * @returns Average of array
 */
declare const average: (data: ReadonlyArray<number>) => number;
/**
 * Returns the minimum number out of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.min([10, 20, 0]); // Yields 0
 * ```
 * @param data
 * @returns Minimum number
 */
declare const min$1: (data: ReadonlyArray<number>) => number;
/**
 * Returns the index of the largest value.
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * const v = [ 10, 40, 5 ];
 * Arrays.maxIndex(v); // Yields 1
 * ```
 * @param data Array of numbers
 * @returns Index of largest value
 */
declare const maxIndex: (data: ReadonlyArray<number>) => number;
/**
 * Returns the index of the smallest value.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * const v = [ 10, 40, 5 ];
 * Arrays.minIndex(v); // Yields 2
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
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.max(100, 200, 50); // 200
 * ```
 * @param data List of numbers
 * @returns Maximum number
 */
declare const max$1: (data: ReadonlyArray<number>) => number;
/**
 * Returns the total of `data`.
 * Undefined and non-numbers are silently ignored.
 *
 * ```js
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.total([1, 2, 3]); // 6
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
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.maxFast([ 10, 0, 4 ]); // 10
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
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.totalFast([ 10, 0, 4 ]); // 14
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
 * import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
 * Arrays.minFast([ 10, 0, 100 ]); // 0
 * ```
 * @param data
 * @returns Maximum
 */
declare const minFast: (data: ReadonlyArray<number> | Float32Array) => number;

declare const max: <V>(iterable: Iterable<V>, scorer: (v: V) => number) => V | undefined;
declare const min: <V>(iterable: Iterable<V>, scorer: (v: V) => number) => V | undefined;
/**
 * Returns _true_ if all values in iterables are equal, regardless
 * of their position. Uses === equality semantics by default.
 *
 * @example Default equality checking
 * ```js
 * const a = ['apples','oranges','pears'];
 * const b = ['pears','oranges','apples'];
 * compareValuesEqual(a, b); // True
 * ```
 *
 * @example Custom equality checking
 * ```js
 * const a = [ { name: 'John' }];
 * const b = [ { name: 'John' }];
 * // False, since object identies are different
 * compareValuesEqual(a, b);
 * // True, since now we're comparing by value
 * compareValuesEqual(a, b, (aa,bb) => aa.name === bb.name);
 * ```
 * @param arrays
 * @param eq
 */
declare const compareValuesEqual: <V>(iterableA: Iterable<V>, iterableB: Iterable<V>, eq?: (a: V, b: V) => boolean) => boolean;
/**
 * Compares the values of two iterables, returning a list
 * of items they have in common, and those unique in `a` or `b`.
 *
 * ```js
 * const a = ['apples', 'oranges', 'pears' ]
 * const b = ['pears', 'kiwis', 'bananas' ];
 *
 * const r = compareValues(a, b);
 * r.shared;  // [ 'pears' ]
 * r.a;       // [ 'apples', 'oranges' ]
 * r.b;       // [ 'kiwis', 'bananas' ]
 * @param a
 * @param b
 * @param eq
 * @returns
 */
declare const compareValues: <V>(a: Iterable<V>, b: Iterable<V>, eq?: (a: V, b: V) => boolean) => {
    shared: V[];
    a: V[];
    b: V[];
};

declare const Iterables_compareValues: typeof compareValues;
declare const Iterables_compareValuesEqual: typeof compareValuesEqual;
declare const Iterables_max: typeof max;
declare const Iterables_min: typeof min;
declare namespace Iterables {
  export {
    Iterables_compareValues as compareValues,
    Iterables_compareValuesEqual as compareValuesEqual,
    Iterables_max as max,
    Iterables_min as min,
  };
}

/**
 * Functions for working with primitive arrays, regardless of type
 * See Also: NumericArrays.ts
 */

/**
 * Throws an error if `array` parameter is not a valid array
 *
 * ```js
 * import { guardArray } from 'https://unpkg.com/ixfx/dist/arrays.js';
 * guardArray(someVariable);
 * ```
 * @private
 * @param array
 * @param name
 */
declare const guardArray: <V>(array: ArrayLike<V>, name?: string) => void;
/**
 * Throws if `index` is an invalid array index for `array`, and if
 * `array` itself is not a valid array.
 * @param array
 * @param index
 */
declare const guardIndex: <V>(array: ArrayLike<V>, index: number, name?: string) => void;
/**
 * Returns _true_ if all the contents of the array are identical.
 *
 * @example Uses default equality function:
 * ```js
 * import { valuesEqual } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const a1 = [10, 10, 10];
 * valuesEqual(a1); // True
 *
 * const a2 = [ {name:`Jane`}, {name:`John} ];
 * valuesEqual(a2); // True, because JSON version captures value
 * ```
 *
 * If we want to compare by value for objects that aren't readily
 * converted to JSON, you need to provide a function:
 *
 * ```js
 * valuesEqual(someArray, (a, b) => {
 *  return (a.eventType === b.eventType);
 * });
 * ```
 *
 * Returns _true_ if `array` is empty.
 * @param array Array
 * @param equality Equality checker. Uses string-conversion checking by default
 * @returns
 */
declare const valuesEqual: <V>(array: readonly V[] | V[], equality?: IsEqual<V> | undefined) => boolean;
/**
 * Returns the _intersection_ of two arrays: the elements that are in common.
 *
 * ```js
 * intersection([1, 2, 3], [2, 4, 6]);
// returns [2]
 * ```
 * See also:
 * * {@link unique}: Unique set of items amongst one or more arrays
 * @param arrayA
 * @param arrayB
 * @param equality
 * @returns
 */
declare const intersection: <V>(arrayA: readonly V[] | V[], arrayB: readonly V[] | V[], equality?: IsEqual<V>) => V[];
/**
 * Returns a 'flattened' copy of array, un-nesting arrays one level
 * ```js
 * flatten([1, [2, 3], [[4]] ]);
 * // Yields: [ 1, 2, 3, [4]];
 * ```
 * @param array
 * @returns
 */
declare const flatten: (array: ReadonlyArray<any> | Array<any>) => Array<any>;
/**
 * Zip combines the elements of two or more arrays based on their index.
 *
 * ```js
 * import { zip } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
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
declare const zip: (...arrays: Array<Array<any>> | ReadonlyArray<Array<any>> | ReadonlyArray<ReadonlyArray<any>>) => Array<any>;
/**
 * Returns an interleaving of two or more arrays. All arrays must be the same length.
 *
 * ```js
 * import { interleave } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const a = [`a`, `b`, `c`];
 * const b = [`1`, `2`, `3`];
 * const c = interleave(a, b);
 * // Yields:
 * // [`a`, `1`, `b`, `2`, `c`, `3`]
 * ```
 * @param arrays
 * @returns
 */
declare const interleave: <V>(...arrays: readonly (readonly V[])[] | V[][]) => V[];
/**
 * Returns a copy of `data` with specified length.
 * If the input array is too long, it is truncated.
 *
 * If the input array is too short, it will be expanded based on the `expand` strategy:
 *  - 'undefined': fill with `undefined`
 *  - 'repeat': repeat array elements, starting from position 0
 *  - 'first': repeat with first element from `data`
 *  - 'last': repeat with last element from `data`
 *
 * ```js
 * import { ensureLength } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * ensureLength([1,2,3], 2); // [1,2]
 * ensureLength([1,2,3], 5, `undefined`); // [1,2,3,undefined,undefined]
 * ensureLength([1,2,3], 5, `repeat`);    // [1,2,3,1,2]
 * ensureLength([1,2,3], 5, `first`);     // [1,2,3,1,1]
 * ensureLength([1,2,3], 5, `last`);      // [1,2,3,3,3]
 * ```
 * @param data Input array to expand
 * @param length Desired length
 * @param expand Expand strategy
 * @typeParam V Type of array
 */
declare const ensureLength: <V>(data: readonly V[] | V[], length: number, expand?: `undefined` | `repeat` | `first` | `last`) => V[];
/**
 * Return elements from `array` that match a given `predicate`, and moreover are between
 * the given `startIndex` (inclusive) and `endIndex` (exclusive).
 *
 * While this can be done with in the in-built `array.filter` function, it will
 * needlessly iterate through the whole array. It also avoids another alternative
 * of slicing the array before using `filter`.
 *
 * ```js
 * import { filterBetween } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * // Return 'registered' people between and including array indexes 5-10
 * const filtered = filterBetween(people, person => person.registered, 5, 10);
 * ```
 * @param array Array to filter
 * @param predicate Filter function
 * @param startIndex Start index (defaults to 0)
 * @param endIndex End index (by default runs until end)
 */
declare const filterBetween: <V>(array: readonly V[] | V[], predicate: (value: V, index: number, array: readonly V[] | V[]) => boolean, startIndex?: number, endIndex?: number) => V[];
/**
 * Returns a random array index.
 *
 * ```js
 * import { randomIndex } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const v = [`blue`, `red`, `orange`];
 * randomIndex(v); // Yields 0, 1 or 2
 * ```
 *
 * Use {@link randomElement} if you want a value from `array`, not index.
 *
 * @param array Array
 * @param rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomIndex: <V>(array: ArrayLike<V>, rand?: RandomSource) => number;
/**
 * Selects a random array index, biased by the provided `weightings`.
 *
 * In the below example, `a` will be picked 20% of the time, `b` 50% and so on.
 * ```js
 * const data =    [  `a`,  `b`,  `c`,  `d` ]
 * const weights = [ 0.2,  0.5,  0.1,  0.2 ]
 * ```
 * @param array
 * @param weightings
 * @param randomSource
 */
declare const randomElementWeightedSource: <V>(array: ArrayLike<V>, weightings: Array<number>, randomSource?: RandomSource) => () => V;
/**
 * Returns random element.
 *
 * ```js
 * import { randomElement } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const v = [`blue`, `red`, `orange`];
 * randomElement(v); // Yields `blue`, `red` or `orange`
 * ```
 *
 * Use {@link randomIndex} if you want a random index within `array`.
 *
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
 * import { randomPluck } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [100, 20, 40];
 * const {value, array} = randomPluck(data);
 * // value: 20, array: [100, 40], data: [100, 20, 40];
 * ```
 *
 * @example Mutating source
 * ```js
 * import { randomPluck } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
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
declare const randomPluck: <V>(array: readonly V[] | V[], mutate?: boolean, rand?: RandomSource) => {
    readonly value: V | undefined;
    readonly array: V[];
};
/**
 * Returns a shuffled copy of the input array.
 * @example
 * ```js
 * import { shuffle } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const d = [1, 2, 3, 4];
 * const s = shuffle(d);
 * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
 * ```
 * @param dataToShuffle
 * @param rand Random generator. `Math.random` by default.
 * @returns Copy with items moved around randomly
 * @template V Type of array items
 */
declare const shuffle: <V>(dataToShuffle: readonly V[], rand?: RandomSource) => V[];
/**
 * Sorts an array of objects in ascending order
 * by the given property name, assuming it is a number.
 *
 * ```js
 * const data = [
 *  { size: 10, colour: `red` },
 *  { size: 20, colour: `blue` },
 *  { size: 5, colour: `pink` }
 * ];
 * const sorted = Arrays.sortByNumericProperty(data, `size`);
 *
 * Yields items ascending order:
 * [ { size: 5, colour: `pink` }, { size: 10, colour: `red` }, { size: 20, colour: `blue` } ]
 * ```
 * @param data
 * @param propertyName
 */
declare const sortByNumericProperty: <V, K extends keyof V>(data: readonly V[] | V[], propertyName: K) => V[];
/**
 * Returns an array with value(s) omitted. If value is not found, result will be a copy of input.
 * Value checking is completed via the provided `comparer` function.
 * By default checking whether `a === b`. To compare based on value, use the `isEqualValueDefault` comparer.
 *
 * @example
 * ```js
 * import { without } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [100, 20, 40];
 * const filtered = without(data, 20); // [100, 40]
 * ```
 *
 * @example Using value-based comparison
 * ```js
 * import { without } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [{name: `Alice`}, {name:`Sam`}];
 *
 * // This wouldn't work as expected, because the default comparer uses instance,
 * // not value:
 * without(data, {name: `Alice`});
 *
 * // So instead we can use a value comparer:
 * without(data, {name:`Alice`}, isEqualValueDefault);
 * ```
 *
 * @example Use a function
 * ```js
 * import { without } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [{name: `Alice`}, {name:`Sam`}];
 * without(data, {name:`ALICE`}, (a, b) => {
 *  return (a.name.toLowerCase() === b.name.toLowerCase());
 * });
 * ```
 *
 * Consider {@link remove} to remove an item by index.
 *
 * @template V Type of array items
 * @param data Source array
 * @param value Value(s) to remove
 * @param comparer Comparison function. If not provided `Util.isEqualDefault` is used, which compares using `===`
 * @return Copy of array without value.
 */
declare const without: <V>(data: readonly V[] | V[], value: V | V[], comparer?: IsEqual<V>) => V[];
declare const withoutUndefined: <V>(data: readonly V[] | V[]) => V[];
/**
 * Returns all items in `data` for as long as `predicate` returns true.
 *
 * `predicate` returns an array of `[stop:boolean, acc:A]`. The first value
 * is _true_ when the iteration should stop, and the `acc` is the accumulated value.
 * This allows `until` to be used to carry over some state from item to item.
 *
 * @example Stop when we hit an item with value of 3
 * ```js
 * const v = Arrays.until([1,2,3,4,5], v => [v === 3, 0]);
 * // [ 1, 2 ]
 * ```
 *
 * @example Stop when we reach a total
 * ```js
 * // Stop when accumulated value reaches 6
 * const v = Arrays.until[1,2,3,4,5], (v, acc) => [acc >= 7, v+acc], 0);
 * // [1, 2, 3]
 * ```
 * @param data
 * @param predicate
 * @returns
 */
declare const until: <V, A>(data: readonly V[] | V[], predicate: (v: V, accumulator: A) => readonly [stop: boolean, acc: A], initial: A) => V[];
/**
 * Removes an element at `index` index from `data`, returning the resulting array without modifying the original.
 *
 * ```js
 * import { remove } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const v = [ 100, 20, 50 ];
 * const vv = remove(2);
 *
 * Yields:
 *  v: [ 100, 20, 50 ]
 * vv: [ 100, 20 ]
 * ```
 *
 * Consider {@link without} if you want to remove an item by value.
 *
 * Throws an exception if `index` is outside the range of `data` array.
 * @param data Input array
 * @param index Index to remove
 * @typeParam V Type of array
 * @returns
 */
declare const remove: <V>(data: readonly V[] | V[], index: number) => V[];
/**
 * Groups data by a function `grouper`, returning data as a map with string
 * keys and array values. Multiple values can be assigned to the same group.
 *
 * `grouper` must yield a string designated group for a given item.
 *
 * @example
 * ```js
 * import { groupBy } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const data = [
 *  { age: 39, city: `London` }
 *  { age: 14, city: `Copenhagen` }
 *  { age: 23, city: `Stockholm` }
 *  { age: 56, city: `London` }
 * ];
 *
 * // Whatever the function returns will be the designated group
 * // for an item
 * const map = groupBy(data, item => data.city);
 * ```
 *
 * This yields a Map with keys London, Stockholm and Copenhagen, and the corresponding values.
 *
 * ```
 * London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
 * Stockhom: [{ age: 23, city: `Stockholm` }]
 * Copenhagen: [{ age: 14, city: `Copenhagen` }]
 * ```
 * @param array Array to group
 * @param grouper Function that returns a key for a given item
 * @typeParam K Type of key to group by. Typically string.
 * @typeParam V Type of values
 * @returns Map
 */
declare const groupBy: <K, V>(array: Iterable<V>, grouper: (item: V) => K) => Map<K, V[]>;
/**
 * Samples array
 *
 * @example By percentage - get half of the items
 * ```
 * import { sample } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const list = [1,2,3,4,5,6,7,8,9,10];
 * const sub = sample(list, 0.5);
 * // Yields: [2, 4, 6, 8, 10]
 * ```
 *
 * @example By steps - every third
 * ```
 * import { sample } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const list = [1,2,3,4,5,6,7,8,9,10];
 * const sub = sample(list, 3);
 * // Yields:
 * // [3, 6, 9]
 * ```
 * @param array Array to sample
 * @param amount Amount, given as a percentage (0..1) or the number of interval (ie 3 for every third item)
 * @returns
 */
declare const sample: <V>(array: ArrayLike<V>, amount: number) => V[];
/**
 * Return `arr` broken up into chunks of `size`
 *
 * ```js
 * chunks([1,2,3,4,5,6,7,8,9,10], 3);
 * // Yields: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 * @param arr
 * @param size
 * @returns
 */
declare function chunks<V>(array: ReadonlyArray<V>, size: number): V[][];
/**
 * Returns a result of a merged into b.
 * B is always the 'newer' data that takes
 * precedence.
 */
type MergeReconcile<V> = (a: V, b: V) => V;
/**
 * Merges arrays left to right, using the provided
 * `reconcile` function to choose a winner when keys overlap.
 *
 * There's also [Maps.mergeByKey](functions/Collections.Maps.mergeByKey.html) if the input data is in Map form.
 *
 * For example, if we have the array A:
 * [`A-1`, `A-2`, `A-3`]
 *
 * And array B:
 * [`B-1`, `B-2`, `B-4`]
 *
 * And with the key function:
 * ```js
 * // Make a key for value based on last char
 * const keyFn = (v) => v.substr(-1, 1);
 * ```
 *
 * If they are merged with the reconile function:
 * ```js
 * const reconcile = (a, b) => b.replace(`-`, `!`);
 * const output = mergeByKey(keyFn, reconcile, arrayA, arrayB);
 * ```
 *
 * The final result will be:
 *
 * [`B!1`, `B!2`, `A-3`, `B-4`]
 *
 * In this toy example, it's obvious how the reconciler transforms
 * data where the keys overlap. For the keys that do not overlap -
 * 3 and 4 in this example - they are copied unaltered.
 *
 * A practical use for `mergeByKey` has been in smoothing keypoints
 * from a TensorFlow pose. In this case, we want to smooth new keypoints
 * with older keypoints. But if a keypoint is not present, for it to be
 * passed through.
 *
 * @param keyFn Function to generate a unique key for data
 * @param reconcile Returns value to decide 'winner' when keys conflict.
 * @param arrays Arrays of data to merge
 */
declare const mergeByKey: <V>(keyFunction: ToString<V>, reconcile: MergeReconcile<V>, ...arrays: readonly (readonly V[])[]) => V[];
/**
 * Reduces in a pairwise fashion.
 *
 * Eg, if we have input array of [1, 2, 3, 4, 5], the
 * `reducer` fn will run with 1,2 as parameters, then 2,3, then 3,4 etc.
 * ```js
 * const values = [1, 2, 3, 4, 5]
 * reducePairwise(values, (acc, a, b) => {
 *  return acc + (b - a);
 * }, 0);
 * ```
 *
 * If input array has less than two elements, the initial value is returned.
 *
 * ```js
 * const reducer = (acc:string, a:string, b:string) => acc + `[${a}-${b}]`;
 * const result = reducePairwise(`a b c d e f g`.split(` `), reducer, `!`);
 * Yields: `![a-b][b-c][c-d][d-e][e-f][f-g]`
 * ```
 * @param arr
 * @param reducer
 * @param initial
 * @returns
 */
declare const reducePairwise: <V, X>(array: readonly V[], reducer: (accumulator: X, a: V, b: V) => X, initial: X) => X;
/**
 * Returns two separate arrays of everything that `filter` returns _true_,
 * and everything it returns _false_ on. The in-built Array.filter() in
 * constrast only returns things that `filter` returns _true_ for.
 *
 * ```js
 * const [ matching, nonMatching ] = filterAB(data, v => v.enabled);
 * // `matching` is a list of items from `data` where .enabled is true
 * // `nonMatching` is a list of items from `data` where .enabled is false
 * ```
 * @param data Array of data to filter
 * @param filter Function which returns _true_ to add items to the A list, or _false_ for items to add to the B list
 * @returns Array of two elements. The first is items that match `filter`, the second is items that do not.
 */
declare const filterAB: <V>(data: readonly V[], filter: (a: V) => boolean) => [a: V[], b: V[]];
/**
 * Combines the values of one or more arrays, removing duplicates
 * ```js
 * const v = Arrays.unique([ [1, 2, 3, 4], [ 3, 4, 5, 6] ]);
 * // [ 1, 2, 3, 4, 5, 6]
 * ```
 *
 * A single array can be provided as well:
 * ```js
 * const v = Arrays.unique([ 1, 2, 3, 1, 2, 3 ]);
 * // [ 1, 2, 3 ]
 * ```
 * See also:
 * * {@link intersection}: Overlap between two arrays
 * * {@link additionalValues}: Yield values from an iterable not present in the other
 * @param arrays
 * @param comparer
 * @returns
 */
declare const unique: <V>(arrays: V[] | V[][] | readonly V[] | readonly (readonly V[])[], comparer?: (a: V, b: V) => boolean) => readonly V[];
/**
 * Returns _true_ if array contains duplicate values.
 *
 * ```js
 *
 * containsDuplicateValues(['a','b','a']); // True
 * containsDuplicateValues([
 *  { name: 'Apple' },
 *  { name: 'Apple' }
 * ]); // True
 * ```
 * @param array
 * @param comparer
 * @returns
 */
declare const containsDuplicateValues: <V>(array: V[] | readonly V[], keyFunction?: (itemToMakeStringFor: V) => string) => boolean;
/**
 * Returns _true_ if contents of `needles` is contained by `haystack`.
 * ```js
 * const a = ['apples','oranges','pears','mandarins'];
 * const b = ['pears', 'apples'];
 * contains(a, b); // True
 *
 * const c = ['pears', 'bananas'];
 * contains(a, b); // False ('bananas' does not exist in a)
 * ```
 * @param haystack
 * @param needles
 * @param eq
 */
declare const contains: <V>(haystack: ArrayLike<V>, needles: ArrayLike<V>, eq?: (a: V, b: V) => boolean) => boolean;
/**
 * Yield values from an iterable not present in the other.
 *
 * Assuming that `input` array is unique values, this function
 * yields items from `values` which are not present in `input`.
 *
 * Duplicate items in `values` are ignored - only the first is yielded.
 *
 * If `eq` function is not provided, values are compared using the
 * default === semantics (via {@link isEqualDefault})
 *
 * ```js
 * const existing = [ 1, 2, 3 ];
 * const newValues = [ 3, 4, 5];
 * const v = [...additionalValues(existing, newValues)];
 * // [ 1, 2, 3, 4, 5]
 * ```
 *
 * ```js
 * const existing = [ 1, 2, 3 ];
 * const newValues = [ 3, 4, 5 ];
 * for (const v of additionalValues(existing, newValues)) {
 *  // 4, 5
 * }
 * To combine one or more iterables, keeping only unique items, use {@link unique}
 * @param input
 * @param values
 */
declare function additionalValues<V>(input: Array<V>, values: Iterable<V>, eq?: IsEqual<V>): Iterable<V>;

type Arrays_MergeReconcile<V> = MergeReconcile<V>;
declare const Arrays_MinMaxAvgOpts: typeof MinMaxAvgOpts;
declare const Arrays_MinMaxAvgTotal: typeof MinMaxAvgTotal;
declare const Arrays_additionalValues: typeof additionalValues;
declare const Arrays_average: typeof average;
declare const Arrays_averageWeighted: typeof averageWeighted;
declare const Arrays_chunks: typeof chunks;
declare const Arrays_compareValues: typeof compareValues;
declare const Arrays_compareValuesEqual: typeof compareValuesEqual;
declare const Arrays_contains: typeof contains;
declare const Arrays_containsDuplicateValues: typeof containsDuplicateValues;
declare const Arrays_dotProduct: typeof dotProduct;
declare const Arrays_ensureLength: typeof ensureLength;
declare const Arrays_filterAB: typeof filterAB;
declare const Arrays_filterBetween: typeof filterBetween;
declare const Arrays_flatten: typeof flatten;
declare const Arrays_groupBy: typeof groupBy;
declare const Arrays_guardArray: typeof guardArray;
declare const Arrays_guardIndex: typeof guardIndex;
declare const Arrays_interleave: typeof interleave;
declare const Arrays_intersection: typeof intersection;
declare const Arrays_maxFast: typeof maxFast;
declare const Arrays_maxIndex: typeof maxIndex;
declare const Arrays_mergeByKey: typeof mergeByKey;
declare const Arrays_minFast: typeof minFast;
declare const Arrays_minIndex: typeof minIndex;
declare const Arrays_minMaxAvg: typeof minMaxAvg;
declare const Arrays_randomElement: typeof randomElement;
declare const Arrays_randomElementWeightedSource: typeof randomElementWeightedSource;
declare const Arrays_randomIndex: typeof randomIndex;
declare const Arrays_randomPluck: typeof randomPluck;
declare const Arrays_reducePairwise: typeof reducePairwise;
declare const Arrays_remove: typeof remove;
declare const Arrays_sample: typeof sample;
declare const Arrays_shuffle: typeof shuffle;
declare const Arrays_sortByNumericProperty: typeof sortByNumericProperty;
declare const Arrays_total: typeof total;
declare const Arrays_totalFast: typeof totalFast;
declare const Arrays_unique: typeof unique;
declare const Arrays_until: typeof until;
declare const Arrays_validNumbers: typeof validNumbers;
declare const Arrays_valuesEqual: typeof valuesEqual;
declare const Arrays_weight: typeof weight;
declare const Arrays_without: typeof without;
declare const Arrays_withoutUndefined: typeof withoutUndefined;
declare const Arrays_zip: typeof zip;
declare namespace Arrays {
  export {
    Arrays_MergeReconcile as MergeReconcile,
    Arrays_MinMaxAvgOpts as MinMaxAvgOpts,
    Arrays_MinMaxAvgTotal as MinMaxAvgTotal,
    Arrays_additionalValues as additionalValues,
    Arrays_average as average,
    Arrays_averageWeighted as averageWeighted,
    Arrays_chunks as chunks,
    Arrays_compareValues as compareValues,
    Arrays_compareValuesEqual as compareValuesEqual,
    Arrays_contains as contains,
    Arrays_containsDuplicateValues as containsDuplicateValues,
    Arrays_dotProduct as dotProduct,
    Arrays_ensureLength as ensureLength,
    Arrays_filterAB as filterAB,
    Arrays_filterBetween as filterBetween,
    Arrays_flatten as flatten,
    Arrays_groupBy as groupBy,
    Arrays_guardArray as guardArray,
    Arrays_guardIndex as guardIndex,
    Arrays_interleave as interleave,
    Arrays_intersection as intersection,
    max$1 as max,
    Arrays_maxFast as maxFast,
    Arrays_maxIndex as maxIndex,
    Arrays_mergeByKey as mergeByKey,
    min$1 as min,
    Arrays_minFast as minFast,
    Arrays_minIndex as minIndex,
    Arrays_minMaxAvg as minMaxAvg,
    Arrays_randomElement as randomElement,
    Arrays_randomElementWeightedSource as randomElementWeightedSource,
    Arrays_randomIndex as randomIndex,
    Arrays_randomPluck as randomPluck,
    Arrays_reducePairwise as reducePairwise,
    Arrays_remove as remove,
    Arrays_sample as sample,
    Arrays_shuffle as shuffle,
    Arrays_sortByNumericProperty as sortByNumericProperty,
    Arrays_total as total,
    Arrays_totalFast as totalFast,
    Arrays_unique as unique,
    Arrays_until as until,
    Arrays_validNumbers as validNumbers,
    Arrays_valuesEqual as valuesEqual,
    Arrays_weight as weight,
    Arrays_without as without,
    Arrays_withoutUndefined as withoutUndefined,
    Arrays_zip as zip,
  };
}

export { MergeReconcile as $, Arrays as A, guardArray as B, Colour$1 as C, guardIndex as D, valuesEqual as E, intersection as F, GenerateRandomOptions as G, flatten as H, Iterables as I, zip as J, interleave as K, ensureLength as L, filterBetween as M, randomElementWeightedSource as N, randomPluck as O, shuffle as P, sortByNumericProperty as Q, Random as R, StringOptions as S, without as T, withoutUndefined as U, until as V, WeightedOptions as W, remove as X, groupBy as Y, sample as Z, chunks as _, RandomOptions as a, mergeByKey as a0, reducePairwise as a1, filterAB as a2, unique as a3, containsDuplicateValues as a4, contains as a5, additionalValues as a6, compareValues as a7, compareValuesEqual as a8, averageWeighted as a9, weight as aa, validNumbers as ab, dotProduct as ac, average as ad, min$1 as ae, maxIndex as af, minIndex as ag, max$1 as ah, total as ai, maxFast as aj, totalFast as ak, minFast as al, RandomSource as b, Rgb as c, defaultRandom as d, weighted as e, WeightedIntegerOptions as f, weightedIntegerSource as g, weightedInteger as h, integerUniqueGen as i, weightedIndex as j, gaussian as k, gaussianSource as l, integerSource as m, integer as n, floatSource as o, float as p, shortGuid as q, minutesMsSource as r, string as s, minutesMs as t, secondsMsSource as u, secondsMs as v, weightedSource as w, randomElement as x, randomHue as y, randomIndex as z };
