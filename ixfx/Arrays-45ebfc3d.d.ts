import { I as IsEqual, T as ToString } from './Util-cfdf41d9.js';
import { M as MinMaxAvgTotal, a as average, b as averageWeighted, d as dotProduct, m as max, c as maxFast, e as maxIndex, f as min, g as minFast, h as minIndex, i as minMaxAvg, t as total, j as totalFast, v as validNumbers, w as weight } from './NumericArrays-b42becce.js';
import { b as EasingName } from './Easing-452eeb6b.js';
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

type RandomOpts = {
    max: number;
    min?: number;
    source?: RandomSource;
};
/**
 * Default random number generator: `Math.random`.
 */
declare const defaultRandom: () => number;
/**
 * A random source.
 *
 * Predefined sources: {@link defaultRandom}, {@link gaussianSkewed}, {@link weightedSkewed}
 */
type RandomSource = () => number;
type WeightedOpts = {
    easing?: EasingName;
    source?: RandomSource;
};
/***
 * Returns a random number, 0..1, weighted by a given easing function.
 * Default easing is `quadIn`, which skews towards zero.
 *
 * ```js
 * weighted();          // quadIn easing by default, which skews toward low values
 * weighted(`quadOut`); // quadOut favours high values
 * ```
 *
 * Use {@link weightedSkewed} for a curried version that can be used as a {@link RandomSource}:
 *
 * ```js
 * const w = weightedSkewed(`quadIn`);
 * w(); // Produce a random number
 * ```
 * @param easingName Easing name or options `quadIn` by default.
 * @returns Random number (0-1)
 */
declare const weighted: (easingNameOrOpts?: EasingName | WeightedOpts) => number;
/**
 * Returns a curried version of {@link weighted}.
 *
 * ```js
 * const w = weightedSkewed(`quadIn`);   // Returns a function
 * w(); // Produce a random number
 * ```
 *
 * If you want a random number directly, use {@link weighted}
 * ```js
 * weighted(`quadIn`); // Returns a random value
 * ```
 * @param easingName
 * @param rand
 * @returns
 */
declare const weightedSkewed: (easingNameOrOpts?: EasingName | WeightedOpts) => RandomSource;
type WeightedIntOpts = WeightedOpts & {
    min?: number;
    max: number;
};
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
 * @param maxOrOpts Maximum (exclusive)
 * @returns
 */
declare const weightedInteger: (maxOrOpts: number | WeightedIntOpts) => number;
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
 * @param skew Skew factor. Defaults to 1, no skewing. Above 1 will skew to left, below 1 will skew to right
 * @returns
 */
declare const gaussian: (skew?: number) => number;
/**
 * Returns a function of skewed gaussian values.
 *
 * This 'curried' function is useful when passing to other functions
 * ```js
 * // Curry
 * const g = gaussianSkewed(10);
 *
 * // Now it can be called without parameters
 * g(); // Returns skewed value
 *
 * // Eg:
 * shuffle(gaussianSkewed(10));
 * ```
 * @param skew Skew factor. Defaults to 1, no skewing. Above 1 will skew to left, below 1 will skew to right
 * @returns
 */
declare const gaussianSkewed: (skew?: number) => () => number;
/**
 * Returns a random integer between `max` (exclusive) and 0 (inclusive)
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
declare const integer: (maxOrOpts: number | RandomOpts) => number;
/**
 * Random float between `max` (exclusive) and 0 (inclusive). Max is 1 if unspecified.
 *
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
declare const float: (maxOrOpts?: number | RandomOpts) => number;
type StringOpts = {
    length: number;
    source?: RandomSource;
};
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
declare const string: (lengthOrOpts?: number | StringOpts) => void;
/**
 * Generates a short roughly unique id
 * @returns
 */
declare const shortGuid: () => string;
/**
 * Returns a random number of minutes, with a unit of milliseconds.
 * Max value is exclusive
 *
 * ```js
 * // Random value from 0 to one milli less than 5*60*1000
 * minuteMs(5);
 * ```
 *
 * Options can be specified instead:
 * ```js
 * // Random time between one minute and 5 minutes
 * minuteMs({ max: 5, min: 1 });
 * ```
 *
 * It's a very minor function, but can make
 * code a little more literate:
 * ```js
 * // Random timeout of up to 5 mins
 * setTimeout(() => { ... }, minuteMs(5));
 * ```
 * @param maxMinutesOrOpts
 * @returns Milliseconds
 */
declare const minutesMs: (maxMinutesOrOpts: number | RandomOpts) => number;
/**
 * Returns a random number of seconds, with a unit of milliseconds.
 * Maximum value is exclusive.
 *
 * ```js
 * // Random milliseconds between 0..4999
 * secondsMs(5000);
 * ```
 *
 * Options can be provided:
 * ```js
 * // Random milliseconds between 1000-4999
 * secondsMs({ max:5, min:1 });
 * ```
 * It's a very minor function, but can make
 * code a little more literate:
 * ```js
 * // Random timeout of up to 5 seconds
 * setTimeout(() => { ...}, secondsMs(5));
 * ```
 * @param maxSecondsOrOpts Maximum seconds, or options.
 * @returns Milliseconds
 */
declare const secondsMs: (maxSecondsOrOpts: number | RandomOpts) => number;
type GenerateRandomOpts = RandomOpts & {
    /**
     * If true, number range is looped
     */
    loop?: boolean;
};
/**
 * Returns a generator over random unique integers, up to
 * but not including the given max value.
 *
 * ```js
 * // 0..9 range
 * const rand = [ ...generateIntegerUnique(10) ];
 * // eg: [2, 9, 6, 0, 8, 7, 3, 4, 5, 1]
 * ```
 *
 * Options can be provided:
 * ```js
 * // 5..9 range
 * const rand = [ ...generateIntegerUnique({ min: 5, max: 10 })];
 * ```
 *
 * Range can be looped. Once the initial random walk through the number
 * range completes, it starts again in a new random way.
 *
 * ```js
 * for (const r of generateIntegerUnique({ max: 10, loop: true })) {
 *  // Warning: loops forever
 * }
 * ```
 * @param maxOrOpts
 * @returns
 */
declare function generateIntegerUnique(maxOrOpts: number | GenerateRandomOpts): IterableIterator<number>;

type Random_GenerateRandomOpts = GenerateRandomOpts;
type Random_RandomOpts = RandomOpts;
type Random_RandomSource = RandomSource;
type Random_StringOpts = StringOpts;
type Random_WeightedIntOpts = WeightedIntOpts;
type Random_WeightedOpts = WeightedOpts;
declare const Random_defaultRandom: typeof defaultRandom;
declare const Random_float: typeof float;
declare const Random_gaussian: typeof gaussian;
declare const Random_gaussianSkewed: typeof gaussianSkewed;
declare const Random_generateIntegerUnique: typeof generateIntegerUnique;
declare const Random_integer: typeof integer;
declare const Random_minutesMs: typeof minutesMs;
declare const Random_secondsMs: typeof secondsMs;
declare const Random_shortGuid: typeof shortGuid;
declare const Random_string: typeof string;
declare const Random_weighted: typeof weighted;
declare const Random_weightedInteger: typeof weightedInteger;
declare const Random_weightedSkewed: typeof weightedSkewed;
declare namespace Random {
  export {
    Random_GenerateRandomOpts as GenerateRandomOpts,
    Random_RandomOpts as RandomOpts,
    Random_RandomSource as RandomSource,
    Random_StringOpts as StringOpts,
    Random_WeightedIntOpts as WeightedIntOpts,
    Random_WeightedOpts as WeightedOpts,
    randomElement as arrayElement,
    randomIndex as arrayIndex,
    Random_defaultRandom as defaultRandom,
    Random_float as float,
    Random_gaussian as gaussian,
    Random_gaussianSkewed as gaussianSkewed,
    Random_generateIntegerUnique as generateIntegerUnique,
    randomHue as hue,
    Random_integer as integer,
    Random_minutesMs as minutesMs,
    Random_secondsMs as secondsMs,
    Random_shortGuid as shortGuid,
    Random_string as string,
    Random_weighted as weighted,
    Random_weightedInteger as weightedInteger,
    Random_weightedSkewed as weightedSkewed,
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
 * @param paramName
 */
declare const guardArray: <V>(array: ArrayLike<V>, paramName?: string) => void;
/**
 * Throws if `index` is an invalid array index for `array`, and if
 * `array` itself is not a valid array.
 * @param array
 * @param index
 */
declare const guardIndex: <V>(array: ArrayLike<V>, index: number, paramName?: string) => void;
/**
 * Returns _true_ if all the contents of the array are identical.
 *
 * @example Uses default equality function:
 * ```js
 * import { areValuesIdentical } from 'https://unpkg.com/ixfx/dist/arrays.js';
 *
 * const a1 = [10, 10, 10];
 * areValuesIdentical(a1); // True
 *
 * const a2 = [ {name:`Jane`}, {name:`John} ];
 * areValuesIdentical(a2); // True, because JSON version captures value
 * ```
 *
 * If we want to compare by value for objects that aren't readily
 * converted to JSON, you need to provide a function:
 *
 * ```js
 * areValuesIdentical(someArray, (a, b) => {
 *  return (a.eventType === b.eventType);
 * });
 * ```
 * @param array Array
 * @param equality Equality checker. Uses string-conversion checking by default
 * @returns
 */
declare const areValuesIdentical: <V>(array: V[] | readonly V[], equality?: IsEqual<V> | undefined) => boolean;
/**
 * Returns the _intersection_ of two arrays: the elements that are in common.
 *
 * ```js
 * intersection([1, 2, 3], [2, 4, 6]);
// returns [2]
 * ```
 * @param a1
 * @param a2
 * @param equality
 * @returns
 */
declare const intersection: <V>(a1: V[] | readonly V[], a2: V[] | readonly V[], equality?: IsEqual<V>) => V[];
/**
 * Returns a 'flattened' copy of array, un-nesting arrays one level
 * ```js
 * flatten([1, [2, 3], [[4]]] ]);
 * // Yields: [ 1, 2, 3, [4]];
 * ```
 * @param array
 * @returns
 */
declare const flatten: <V>(array: (V | readonly V[])[]) => V[];
/**
 * Zip ombines the elements of two or more arrays based on their index.
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
declare const zip: (...arrays: Array<any> | ReadonlyArray<any>) => Array<any>;
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
declare const interleave: <V>(...arrays: (readonly V[])[] | readonly (readonly V[])[]) => V[];
/**
 * Returns an copy of `data` with specified length.
 * If the input array is too long, it is truncated.
 *
 * If the input array is too short, it will be expanded based on the `expand` strategy:
 *  - 'undefined': fill with `undefined`
 *  - 'repeat': repeat array elements, starting from position 0
 *  - 'first': continually use first element
 *  - 'last': continually use last element
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
declare const ensureLength: <V>(data: V[] | readonly V[], length: number, expand?: `undefined` | `repeat` | `first` | `last`) => V[];
/**
 * Return elements from `array` that match a given `predicate`, and moreover are between
 * the given `startIndex` and `endIndex` (both inclusive).
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
 * @param endIndex End index (defaults to last index)
 */
declare const filterBetween: <V>(array: V[] | readonly V[], predicate: (value: V, index: number, array: V[] | readonly V[]) => boolean, startIndex?: number, endIndex?: number) => V[];
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
declare const shuffle: <V>(dataToShuffle: V[] | readonly V[], rand?: RandomSource) => V[];
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
declare const sortByNumericProperty: <V, K extends keyof V>(data: V[] | readonly V[], propertyName: K) => V[];
/**
 * Returns an array with a value omitted. If value is not found, result will be a copy of input.
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
 * @param value Value to remove
 * @param comparer Comparison function. If not provided `Util.isEqualDefault` is used, which compares using `===`
 * @return Copy of array without value.
 */
declare const without: <V>(data: V[] | readonly V[], value: V, comparer?: IsEqual<V>) => V[];
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
declare const until: <V, A>(data: V[] | readonly V[], predicate: (v: V, acc: A) => readonly [stop: boolean, acc: A], initial: A) => V[];
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
declare const remove: <V>(data: V[] | readonly V[], index: number) => V[];
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
declare const groupBy: <K, V>(array: V[], grouper: (item: V) => K) => Map<K, V[]>;
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
declare function chunks<V>(arr: Array<V> | ReadonlyArray<V>, size: number): V[][];
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
declare const mergeByKey: <V>(keyFn: ToString<V>, reconcile: MergeReconcile<V>, ...arrays: V[][]) => V[];
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
declare const reducePairwise: <V, X>(arr: readonly V[] | V[], reducer: (acc: X, a: V, b: V) => X, initial: X) => X;
/**
 * Assuming that `input` array is only unique values, this function
 * returns a new array with unique items from `values` added.
 *
 * If `comparer` function is not provided, values are compared using the
 * default === semantics (via {@link Util.isEqualDefault})
 *
 * ```js
 * const existing = [ 1, 2, 3 ];
 * const newValues = [ 3, 4, 5];
 * const v = Arrays.pushUnique(existing, newValues);
 * // [ 1, 2, 3, 4, 5]
 * ```
 *
 * To combine one or more arrays, keeping only unique items, use {@link unique}
 * @param input
 * @param values
 */
declare const pushUnique: <V>(input: readonly V[] | V[], values: readonly V[] | V[], comparer?: IsEqual<V> | undefined) => V[];
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
declare const filterAB: <V>(data: readonly V[] | V[], filter: (a: V) => boolean) => [a: V[], b: V[]];
/**
 * Combines the values of one or more arrays, removing duplicates
 * ```js
 * const v = Arrays.unique([ [1, 2, 3, 4], [ 3, 4, 5, 6] ]);
 * // [ 1, 2, 3, 4, 5, 6]
 * ```
 * @param arrays
 * @param comparer
 * @returns
 */
declare const unique: <V>(arrays: V[][], comparer?: <V_1>(a: V_1, b: V_1) => boolean) => V[];

type Arrays_MergeReconcile<V> = MergeReconcile<V>;
declare const Arrays_MinMaxAvgTotal: typeof MinMaxAvgTotal;
declare const Arrays_areValuesIdentical: typeof areValuesIdentical;
declare const Arrays_average: typeof average;
declare const Arrays_averageWeighted: typeof averageWeighted;
declare const Arrays_chunks: typeof chunks;
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
declare const Arrays_max: typeof max;
declare const Arrays_maxFast: typeof maxFast;
declare const Arrays_maxIndex: typeof maxIndex;
declare const Arrays_mergeByKey: typeof mergeByKey;
declare const Arrays_min: typeof min;
declare const Arrays_minFast: typeof minFast;
declare const Arrays_minIndex: typeof minIndex;
declare const Arrays_minMaxAvg: typeof minMaxAvg;
declare const Arrays_pushUnique: typeof pushUnique;
declare const Arrays_randomElement: typeof randomElement;
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
declare const Arrays_weight: typeof weight;
declare const Arrays_without: typeof without;
declare const Arrays_zip: typeof zip;
declare namespace Arrays {
  export {
    Arrays_MergeReconcile as MergeReconcile,
    Arrays_MinMaxAvgTotal as MinMaxAvgTotal,
    Arrays_areValuesIdentical as areValuesIdentical,
    Arrays_average as average,
    Arrays_averageWeighted as averageWeighted,
    Arrays_chunks as chunks,
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
    Arrays_max as max,
    Arrays_maxFast as maxFast,
    Arrays_maxIndex as maxIndex,
    Arrays_mergeByKey as mergeByKey,
    Arrays_min as min,
    Arrays_minFast as minFast,
    Arrays_minIndex as minIndex,
    Arrays_minMaxAvg as minMaxAvg,
    Arrays_pushUnique as pushUnique,
    Arrays_randomElement as randomElement,
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
    Arrays_weight as weight,
    Arrays_without as without,
    Arrays_zip as zip,
  };
}

export { Arrays as A, interleave as B, Colour$1 as C, ensureLength as D, filterBetween as E, randomPluck as F, GenerateRandomOpts as G, shuffle as H, sortByNumericProperty as I, without as J, until as K, remove as L, groupBy as M, sample as N, chunks as O, MergeReconcile as P, mergeByKey as Q, Random as R, StringOpts as S, reducePairwise as T, pushUnique as U, filterAB as V, WeightedOpts as W, unique as X, RandomSource as a, Rgb as b, randomElement as c, RandomOpts as d, defaultRandom as e, weightedSkewed as f, WeightedIntOpts as g, weightedInteger as h, gaussian as i, gaussianSkewed as j, integer as k, float as l, shortGuid as m, minutesMs as n, secondsMs as o, generateIntegerUnique as p, randomHue as q, randomIndex as r, string as s, guardArray as t, guardIndex as u, areValuesIdentical as v, weighted as w, intersection as x, flatten as y, zip as z };
