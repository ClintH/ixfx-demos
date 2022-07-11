import { I as IterableAsync } from './IterableAsync-e8504cf8.js';

/**
 * Returns `fallback` if `v` is NaN, otherwise returns `v`
 * @param v
 * @param fallback
 * @returns
 */
declare const ifNaN: (v: number, fallback: number) => number;
/**
 * Returns true if `x` is a power of two
 * @param x
 * @returns True if `x` is a power of two
 */
declare const isPowerOfTwo: (x: number) => boolean;
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
/**
 * Returns a field on object `o` by a dotted path.
 * ```
 * const d = {
 *  accel: {x: 1, y: 2, z: 3},
 *  gyro:  {x: 4, y: 5, z: 6}
 * };
 * getFieldByPath(d, `accel.x`); // 1
 * getFieldByPath(d, `gyro.z`);  // 6
 * getFieldByPath(d, `gyro`);    // {x:4, y:5, z:6}
 * getFieldByPath(d, ``);        // Returns original object
 * ```
 *
 * If a field does not exist, `undefined` is returned.
 * Use {@link getFieldPaths} to get a list of paths.
 * @param o
 * @param path
 * @returns
 */
declare const getFieldByPath: (o: any, path?: string) => any | undefined;
/**
 * Returns a list of paths for all the fields on `o`
 * ```
 * const d = {
 *  accel: {x: 1, y: 2, z: 3},
 *  gyro:  {x: 4, y: 5, z: 6}
 * };
 * const paths = getFieldPaths(d);
 * // Yields [ `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
 * ```
 *
 * Use {@link getFieldByPath} to fetch data by this 'path' string.
 * @param o
 * @returns
 */
declare const getFieldPaths: (o: any) => readonly string[];
/**
 * Rounds `v` up to the nearest multiple of `multiple`
 * ```
 * roundMultiple(19, 20); // 20
 * roundMultiple(21, 20); // 40
 * ```
 * @param v
 * @param multiple
 * @returns
 */
declare const roundUpToMultiple: (v: number, multiple: number) => number;
declare type ToString<V> = (itemToMakeStringFor: V) => string;
/**
 * Function that returns true if `a` and `b` are considered equal
 */
declare type IsEqual<V> = (a: V, b: V) => boolean;
/**
 * Default comparer function is equiv to checking `a === b`
 */
declare const isEqualDefault: <V>(a: V, b: V) => boolean;
/**
 * Comparer returns true if string representation of `a` and `b` are equal.
 * Uses `toStringDefault` to generate a string representation (`JSON.stringify`)
 * @returns True if the contents of `a` and `b` are equal
 */
declare const isEqualValueDefault: <V>(a: V, b: V) => boolean;
/**
 * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
 */
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;
declare const runningiOS: () => boolean;

declare const Util_ifNaN: typeof ifNaN;
declare const Util_isPowerOfTwo: typeof isPowerOfTwo;
declare const Util_relativeDifference: typeof relativeDifference;
declare const Util_getFieldByPath: typeof getFieldByPath;
declare const Util_getFieldPaths: typeof getFieldPaths;
declare const Util_roundUpToMultiple: typeof roundUpToMultiple;
type Util_ToString<V> = ToString<V>;
type Util_IsEqual<V> = IsEqual<V>;
declare const Util_isEqualDefault: typeof isEqualDefault;
declare const Util_isEqualValueDefault: typeof isEqualValueDefault;
declare const Util_toStringDefault: typeof toStringDefault;
declare const Util_runningiOS: typeof runningiOS;
declare const Util_IterableAsync: typeof IterableAsync;
declare namespace Util {
  export {
    Util_ifNaN as ifNaN,
    Util_isPowerOfTwo as isPowerOfTwo,
    Util_relativeDifference as relativeDifference,
    Util_getFieldByPath as getFieldByPath,
    Util_getFieldPaths as getFieldPaths,
    Util_roundUpToMultiple as roundUpToMultiple,
    Util_ToString as ToString,
    Util_IsEqual as IsEqual,
    Util_isEqualDefault as isEqualDefault,
    Util_isEqualValueDefault as isEqualValueDefault,
    Util_toStringDefault as toStringDefault,
    Util_runningiOS as runningiOS,
    Util_IterableAsync as IterableAsync,
  };
}

export { IsEqual as I, ToString as T, Util as U, isPowerOfTwo as a, getFieldPaths as b, roundUpToMultiple as c, isEqualDefault as d, isEqualValueDefault as e, runningiOS as f, getFieldByPath as g, ifNaN as i, relativeDifference as r, toStringDefault as t };
