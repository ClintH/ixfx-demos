/**
 * Clamps a value between min and max (both inclusive)
 * Defaults to a 0-1 range, useful for percentages.
 *
 * Usage:
 *  clamp(0.5);         // 0.5 - just fine, within default of 0 to 1
 *  clamp(1.5);         // 1 - above default max of 1
 *  clamp(-50, 0, 100); // 0 - below range
 *  clamp(50, 0, 50);   // 50 - within range
 *
 * For clamping integer ranges, consider `clampZeroBounds`
 * @param {number} v Value to clamp
 * @param {number} [min=0] Minimum value (inclusive)
 * @param {number} [max=1] Maximum value (inclusive)
 * @returns Clamped value
 */
declare const clamp: (v: number, min?: number, max?: number) => number;
/**
 * Clamps integer `v` between 0 (inclusive) and length (exclusive)
 * This is useful for clamping an array range, because the largest allowed number will
 * be one less than length
 *
 * ```js
 * const myArray = [`a`, `b`, `c`, `d`];
 * clampZeroBounds(0, myArray.length); // 0
 * clampZeroBounds(1.2, myArray.length); // 1
 * clampZeroBounds(4, myArray.length); // 4
 * clampZeroBounds(5, myArray.length); // 4
 * clampZeroBounds(-1, myArray.length); // 0
 * ```
 * @param {number} v Integer value to clamp
 * @param {number} length Length of bounds
 * @returns Clamped value, minimum will be 0, maximum will be one less than `length`.
 */
declare const clampZeroBounds: (v: number, length: number) => number;
declare const lerp: (amt: number, a: number, b: number) => number;
/**
 * Pauses execution
 * ```js
 * console.log(`Hello`);
 * await sleep(1000);
 * console.log(`There`); // Prints one second after
 * ```
 *
 * @param {number} milliseconds
 * @return {*}  {Promise<any>}
 */
declare const sleep: (milliseconds: number) => Promise<any>;
/**
 * Calls provided function after a delay
 *
 * ```js
 * const result = await delay(async () => Math.random(), 1000);
 * console.log(result); // Prints out result after one second
 * ```
 * @template V
 * @param {() => Promise<V>} call
 * @param {number} milliseconds
 * @return {*}  {Promise<any>}
 */
declare const delay: <V>(call: () => Promise<V>, milliseconds: number) => Promise<any>;
declare type ToString<V> = (itemToMakeStringFor: V) => string;
declare type IsEqual<V> = (a: V, b: V) => boolean;
/**
 * Default comparer function is equiv to checking `a === b`
 * ✔ UNIT TESTED
 * @template V
 * @param {V} a
 * @param {V} b
 * @return {*}  {boolean}
 */
declare const isEqualDefault: <V>(a: V, b: V) => boolean;
/**
 * Comparer returns true if string representation of `a` and `b` are equal.
 * Uses `toStringDefault` to generate a string representation (`JSON.stringify`)
 *
 * @template V
 * @param {V} a
 * @param {V} b
 * @return {*}  {boolean} True if the contents of `a` and `b` are equal
 */
declare const isEqualValueDefault: <V>(a: V, b: V) => boolean;
/**
 * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
 * ✔ UNIT TESTED
 * @template V
 * @param {V} itemToMakeStringFor
 * @returns {string}
 */
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;

export { IsEqual as I, ToString as T, clampZeroBounds as a, isEqualValueDefault as b, clamp as c, delay as d, isEqualDefault as i, lerp as l, sleep as s, toStringDefault as t };
