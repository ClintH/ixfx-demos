import { I as IsEqual } from './Util-473ad458.js';
import { w as weight, v as validNumbers, d as dotProduct, a as average, b as averageWeighted, m as min, c as maxIndex, e as minIndex, f as max, t as total, g as maxFast, h as minFast, M as MinMaxAvgTotal, i as minMaxAvg } from './NumericArrays-54faaa95.js';
import { E as EasingName } from './Easing-57384b54.js';
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
declare const goldenAngleColour: (index: number, saturation?: number, lightness?: number, alpha?: number) => string | undefined;
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

type Colour$1_Hsl = Hsl;
type Colour$1_Rgb = Rgb;
type Colour$1_Spaces = Spaces;
type Colour$1_Colour = Colour;
type Colour$1_Colourish = Colourish;
type Colour$1_InterpolationOpts = InterpolationOpts;
declare const Colour$1_toHsl: typeof toHsl;
declare const Colour$1_goldenAngleColour: typeof goldenAngleColour;
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
    Colour$1_goldenAngleColour as goldenAngleColour,
    Colour$1_randomHue as randomHue,
    Colour$1_toRgb as toRgb,
    Colour$1_toHex as toHex,
    Colour$1_opacity as opacity,
    Colour$1_getCssVariable as getCssVariable,
    Colour$1_interpolate as interpolate,
    Colour$1_scale as scale,
  };
}

/**
 * Default random number generator: `Math.random`.
 */
declare const defaultRandom: () => number;
/**
 * A random source.
 *
 * Predefined sources: {@link defaultRandom}, {@link gaussianSkewed}, {@link weightedSkewed}
 */
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
 * Use {@link weightedSkewed} for a curried version that can be used as a {@link RandomSource}:
 *
 * ```js
 * const w = weightedSkewed(`quadIn`);
 * w(); // Produce a random number
 * ```
 * @param easingName Easing name. `quadIn` by default.
 * @param rand Source random generator. `Math.random` by default.
 * @returns Random number (0-1)
 */
declare const weighted: (easingName?: EasingName, rand?: RandomSource) => number;
/**
 * Returns a curried version of {@link weighted}.
 *
 * ```js
 * const w = weightedSkewed(`quadIn`);   // Returns a function
 * w(); // Produce a random number
 * ```
 * @param easingName
 * @param rand
 * @returns
 */
declare const weightedSkewed: (easingName?: EasingName, rand?: RandomSource) => RandomSource;
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
declare const weightedInteger: (minOrMax: number, maxOrEasing?: number | EasingName, easing?: EasingName, rand?: RandomSource) => number;
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
declare const integer: (max: number, min?: number) => number;
/**
 * Random a random float between `max` (exclusive) and `min` (inclusive).
 * 1 and 0 are used as default max and min, respectively.
 *
 * ```js
 * // Random number between 0..1 (but not including 1)
 * // (this would be identical to Math.random())
 * const v = float();
 * // Random float between 0..100 (but not including 100)
 * const v = float(100);
 * // Random float between 20..40 (possibily including 20, but always lower than 40)
 * const v = float(20, 40);
 * ```
 * @param max
 * @param min
 * @returns
 */
declare const float: (max?: number, min?: number) => number;
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
declare const shortGuid: () => string;

declare const Random_defaultRandom: typeof defaultRandom;
type Random_RandomSource = RandomSource;
declare const Random_weighted: typeof weighted;
declare const Random_weightedSkewed: typeof weightedSkewed;
declare const Random_weightedInteger: typeof weightedInteger;
declare const Random_gaussian: typeof gaussian;
declare const Random_gaussianSkewed: typeof gaussianSkewed;
declare const Random_integer: typeof integer;
declare const Random_float: typeof float;
declare const Random_string: typeof string;
declare const Random_shortGuid: typeof shortGuid;
declare namespace Random {
  export {
    randomIndex as arrayIndex,
    randomElement as arrayElement,
    Random_defaultRandom as defaultRandom,
    Random_RandomSource as RandomSource,
    Random_weighted as weighted,
    Random_weightedSkewed as weightedSkewed,
    Random_weightedInteger as weightedInteger,
    Random_gaussian as gaussian,
    Random_gaussianSkewed as gaussianSkewed,
    Random_integer as integer,
    Random_float as float,
    Random_string as string,
    Random_shortGuid as shortGuid,
    randomHue as hue,
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
declare const guardIndex: <V>(array: readonly V[], index: number, paramName?: string) => void;
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
declare const areValuesIdentical: <V>(array: readonly V[], equality?: IsEqual<V> | undefined) => boolean;
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
declare const intersection: <V>(a1: readonly V[], a2: readonly V[], equality?: IsEqual<V>) => V[];
/**
 * Returns a 'flattened' copy of array, un-nesting arrays one level
 * ```js
 * flatten([1, [2, 3], [[4]]] ]);
 * // Yields: [ 1, 2, 3, [4]];
 * ```
 * @param array
 * @returns
 */
declare const flatten: <V>(array: readonly V[]) => any[];
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
declare const zip: (...arrays: ReadonlyArray<any>) => ReadonlyArray<any>;
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
declare const interleave: <V>(...arrays: readonly (readonly V[])[]) => readonly V[];
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
declare const ensureLength: <V>(data: readonly V[], length: number, expand?: `undefined` | `repeat` | `first` | `last`) => readonly V[];
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
declare const filterBetween: <V>(array: readonly V[], predicate: (value: V, index: number, array: readonly V[]) => boolean, startIndex?: number, endIndex?: number) => readonly V[];
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
declare const randomPluck: <V>(array: readonly V[], mutate?: boolean, rand?: RandomSource) => {
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
declare const shuffle: <V>(dataToShuffle: readonly V[], rand?: RandomSource) => readonly V[];
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
declare const without: <V>(data: readonly V[], value: V, comparer?: IsEqual<V>) => readonly V[];
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
declare const remove: <V>(data: readonly V[], index: number) => readonly V[];
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
declare const groupBy: <K, V>(array: readonly V[], grouper: (item: V) => K) => Map<K, V[]>;
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
declare const sample: <V>(array: readonly V[], amount: number) => readonly V[];
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
declare function chunks<V>(arr: ReadonlyArray<V>, size: number): V[][];

declare const Arrays_guardArray: typeof guardArray;
declare const Arrays_guardIndex: typeof guardIndex;
declare const Arrays_areValuesIdentical: typeof areValuesIdentical;
declare const Arrays_intersection: typeof intersection;
declare const Arrays_flatten: typeof flatten;
declare const Arrays_zip: typeof zip;
declare const Arrays_interleave: typeof interleave;
declare const Arrays_ensureLength: typeof ensureLength;
declare const Arrays_filterBetween: typeof filterBetween;
declare const Arrays_randomIndex: typeof randomIndex;
declare const Arrays_randomElement: typeof randomElement;
declare const Arrays_randomPluck: typeof randomPluck;
declare const Arrays_shuffle: typeof shuffle;
declare const Arrays_without: typeof without;
declare const Arrays_remove: typeof remove;
declare const Arrays_groupBy: typeof groupBy;
declare const Arrays_sample: typeof sample;
declare const Arrays_chunks: typeof chunks;
declare const Arrays_weight: typeof weight;
declare const Arrays_validNumbers: typeof validNumbers;
declare const Arrays_dotProduct: typeof dotProduct;
declare const Arrays_average: typeof average;
declare const Arrays_averageWeighted: typeof averageWeighted;
declare const Arrays_min: typeof min;
declare const Arrays_maxIndex: typeof maxIndex;
declare const Arrays_minIndex: typeof minIndex;
declare const Arrays_max: typeof max;
declare const Arrays_total: typeof total;
declare const Arrays_maxFast: typeof maxFast;
declare const Arrays_minFast: typeof minFast;
declare const Arrays_MinMaxAvgTotal: typeof MinMaxAvgTotal;
declare const Arrays_minMaxAvg: typeof minMaxAvg;
declare namespace Arrays {
  export {
    Arrays_guardArray as guardArray,
    Arrays_guardIndex as guardIndex,
    Arrays_areValuesIdentical as areValuesIdentical,
    Arrays_intersection as intersection,
    Arrays_flatten as flatten,
    Arrays_zip as zip,
    Arrays_interleave as interleave,
    Arrays_ensureLength as ensureLength,
    Arrays_filterBetween as filterBetween,
    Arrays_randomIndex as randomIndex,
    Arrays_randomElement as randomElement,
    Arrays_randomPluck as randomPluck,
    Arrays_shuffle as shuffle,
    Arrays_without as without,
    Arrays_remove as remove,
    Arrays_groupBy as groupBy,
    Arrays_sample as sample,
    Arrays_chunks as chunks,
    Arrays_weight as weight,
    Arrays_validNumbers as validNumbers,
    Arrays_dotProduct as dotProduct,
    Arrays_average as average,
    Arrays_averageWeighted as averageWeighted,
    Arrays_min as min,
    Arrays_maxIndex as maxIndex,
    Arrays_minIndex as minIndex,
    Arrays_max as max,
    Arrays_total as total,
    Arrays_maxFast as maxFast,
    Arrays_minFast as minFast,
    Arrays_MinMaxAvgTotal as MinMaxAvgTotal,
    Arrays_minMaxAvg as minMaxAvg,
  };
}

export { Arrays as A, remove as B, Colour$1 as C, groupBy as D, sample as E, chunks as F, Random as R, RandomSource as a, randomElement as b, weightedSkewed as c, defaultRandom as d, weightedInteger as e, gaussianSkewed as f, gaussian as g, float as h, integer as i, shortGuid as j, randomHue as k, guardArray as l, guardIndex as m, areValuesIdentical as n, intersection as o, flatten as p, interleave as q, randomIndex as r, string as s, ensureLength as t, filterBetween as u, randomPluck as v, weighted as w, shuffle as x, without as y, zip as z };
