import { IsEqual } from './util.js';
import { a as EasingName, w as weight, b as average, c as averageWeighted, m as min, d as maxIndex, e as minIndex, f as max, g as maxFast, h as minFast, M as MinMaxAvgTotal, i as minMaxAvg } from './NumericArrays-31f025d3.js';
import * as d3Colour from 'd3-color';

declare type Hsl = {
    h: number;
    s: number;
    l: number;
    opacity?: number;
};
declare type Rgb = {
    r: number;
    g: number;
    b: number;
    opacity?: number;
};
declare type Spaces = `hsl` | `rgb` | `lab` | `hcl` | `cubehelix`;
/**
 * @private
 */
declare type Colour = d3Colour.RGBColor | d3Colour.HSLColor;
/**
 * A representation of colour. Eg: `blue`, `rgb(255,0,0)`, `hsl(20,100%,50%)`
 */
declare type Colourish = string | d3Colour.ColorCommonInstance;
/**
 * Options for interpolation
 */
declare type InterpolationOpts = {
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
 * Parses colour to {h,s,l}. `opacity` field is added if it exists on source.
 * @param colour
 * @returns
 */
declare const toHsl: (colour: Colourish) => Hsl;
declare const randomHue: (rand?: RandomSource) => number;
/**
 * Parses colour to {r,g,b}. `opacity` field is added if it exists on source.
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
 * @param name Name of variable. Do not starting `--`
 * @param fallbackColour Fallback colour if not found
 * @param root  Element to search variable from
 * @returns Colour or fallback.
 */
declare const getCssVariable: (name: string, fallbackColour?: string, root?: HTMLElement | undefined) => string;
/**
 * Interpolates between two colours, returning a string
 *
 * @example
 * ```js
 * // Get 50% between blue and red
 * interpolate(0.5, `blue`, `red`);
 *
 * // Get midway point, with specified colour space
 * interpolate(0.5, `hsl(200, 100%, 50%)`, `pink`, {space: `hcl`});
 * ```
 * @param amount Amount (0 = from, 0.5 halfway, 1= to)
 * @param from Starting colour
 * @param to Final colour
 * @param optsOrSpace Options for interpolation, or string name for colour space, eg `hsl`.
 * @returns String representation of colour, eg. `rgb(x,x,x)`
 */
declare const interpolate: (amount: number, from: Colourish, to: Colourish, optsOrSpace?: string | InterpolationOpts | undefined) => string;
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

type Colour$1_Hsl = Hsl;
type Colour$1_Rgb = Rgb;
type Colour$1_Spaces = Spaces;
type Colour$1_Colour = Colour;
type Colour$1_Colourish = Colourish;
type Colour$1_InterpolationOpts = InterpolationOpts;
declare const Colour$1_toHsl: typeof toHsl;
declare const Colour$1_randomHue: typeof randomHue;
declare const Colour$1_toRgb: typeof toRgb;
declare const Colour$1_toHex: typeof toHex;
declare const Colour$1_opacity: typeof opacity;
declare const Colour$1_getCssVariable: typeof getCssVariable;
declare const Colour$1_interpolate: typeof interpolate;
declare const Colour$1_scale: typeof scale;
declare namespace Colour$1 {
  export {
    Colour$1_Hsl as Hsl,
    Colour$1_Rgb as Rgb,
    Colour$1_Spaces as Spaces,
    Colour$1_Colour as Colour,
    Colour$1_Colourish as Colourish,
    Colour$1_InterpolationOpts as InterpolationOpts,
    Colour$1_toHsl as toHsl,
    Colour$1_randomHue as randomHue,
    Colour$1_toRgb as toRgb,
    Colour$1_toHex as toHex,
    Colour$1_opacity as opacity,
    Colour$1_getCssVariable as getCssVariable,
    Colour$1_interpolate as interpolate,
    Colour$1_scale as scale,
  };
}

declare const defaultRandom: () => number;
declare type RandomSource = () => number;
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
 * Returns a random integer between `max` (exclusive) and `min` (inclusive)
 * If `min` is not specified, 0 is used.
 *
 * ```js
 * integer(10);    // Random number 0-9
 * integer(5, 10); // Random number 5-9
 * integer(-5);       // Random number from -4 to 0
 * integer(-5, -10); // Random number from -10 to -6
 * ```
 * @param max
 * @param min
 * @returns
 */
declare const integer: (max: number, min?: number | undefined) => number;
/**
 * Random a random float between `max` (exclusive) and `min` (inclusive).
 * If `min` is not specified, 0 is used.
 * @param max
 * @param min
 * @returns
 */
declare const float: (max: number, min?: number) => number;
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
declare const Random_integer: typeof integer;
declare const Random_float: typeof float;
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
    Random_integer as integer,
    Random_float as float,
    Random_string as string,
    randomHue as hue,
  };
}

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
declare const Arrays_maxIndex: typeof maxIndex;
declare const Arrays_minIndex: typeof minIndex;
declare const Arrays_max: typeof max;
declare const Arrays_maxFast: typeof maxFast;
declare const Arrays_minFast: typeof minFast;
declare const Arrays_MinMaxAvgTotal: typeof MinMaxAvgTotal;
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
    Arrays_maxIndex as maxIndex,
    Arrays_minIndex as minIndex,
    Arrays_max as max,
    Arrays_maxFast as maxFast,
    Arrays_minFast as minFast,
    Arrays_MinMaxAvgTotal as MinMaxAvgTotal,
    Arrays_minMaxAvg as minMaxAvg,
  };
}

export { Arrays as A, Colour$1 as C, Random as R, RandomSource as a, randomElement as b, weightedInteger as c, defaultRandom as d, gaussianSkewed as e, float as f, gaussian as g, randomHue as h, integer as i, guardArray as j, guardIndex as k, areValuesIdentical as l, ensureLength as m, filterBetween as n, randomPluck as o, shuffle as p, without as q, randomIndex as r, string as s, groupBy as t, weighted as w, zip as z };
