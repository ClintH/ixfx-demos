/**
 * Clamps a value between min and max (both inclusive)
 * Defaults to a 0-1 range, useful for percentages.
 *
 * @example Usage
 * ```js
 *  clamp(0.5);         // 0.5 - just fine, within default of 0 to 1
 *  clamp(1.5);         // 1 - above default max of 1
 *  clamp(-50, 0, 100); // 0 - below range
 *  clamp(50, 0, 50);   // 50 - within range
 * ```
 *
 * For clamping integer ranges, consider `clampZeroBounds`
 *
 * @param v Value to clamp
 * @param Minimum value (inclusive)
 * @param Maximum value (inclusive)
 * @returns Clamped value
 */
declare const clamp: (v: number, min?: number, max?: number) => number;
/**
 * Returns a bezier interpolated value, using the given ranges
 * @param {number} value  Value to be interpolated
 * @param {number} s1 Source range start
 * @param {number} s2  Source range end
 * @param {number} t1  Target range start
 * @param {number} t2  Target range end
 * @param {number} [slope]  Weight of the curve (0.5 = linear, 0.1 = weighted near target start, 0.9 = weighted near target end)
 * @returns {number} Interpolated value
 */
/**
 * Scales `v` from an input range to an output range.
 * For example, if a sensor's useful range is 100-500, you could
 * easily map it to a percentage:
 * ```js
 * scale(sensorReading, 100, 500, 0, 1);
 * ```
 * @param v Value to scale
 * @param inMin Input minimum
 * @param inMax Input maximum
 * @param outMin Output minimum
 * @param outMax Output maximum
 * @returns Scaled value
 */
declare const scale: (v: number, inMin: number, inMax: number, outMin: number, outMax: number) => number;
/**
 * Scales a full input percentage range to a diminished output range
 * @param v
 * @param outMin
 * @param outMax
 * @returns
 */
declare const scalePercentOutput: (v: number, outMin: number, outMax?: number) => number;
/**
 * Clamps integer `v` between 0 (inclusive) and length (exclusive). This is useful
 * for clamping an array range, because the largest allowed number will
 * be one less than length.
 *
 * @example Usage
 * ```js
 * const myArray = [`a`, `b`, `c`, `d`];
 * clampZeroBounds(0, myArray.length);    // 0
 * clampZeroBounds(1.2, myArray.length);  // 1
 * clampZeroBounds(4, myArray.length);    // 4
 * clampZeroBounds(5, myArray.length);    // 4
 * clampZeroBounds(-1, myArray.length);   // 0
 * ```
 *
 * Throws an error if `v` or `length` are not integers.
 * @param v Value to clamp (must be an interger)
 * @param length Length of bounds (must be an integer)
 * @returns Clamped value, minimum will be 0, maximum will be one less than `length`.
 */
declare const clampZeroBounds: (v: number, length: number) => number;
/**
 * Lerp calculates a relative value of `amt` between `a` and `b`.
 *
 * @example Get the halfway point between 30 and 60
 * ```js
 * lerp(0.5, 30, 60);
 * ````
 *
 * Lerp is commonly used to interpolate between numbers for animation.
 * In that case, `amt` would start at 0 and you would keep `lerp`ing up to `1`
 * @example
 * ```
 * let pp = percentPingPong(0.1); // Go back and forth between 0 and 1 by 0.1
 * continuously(() => {
 *   const amt = pp.next().value;     // Get position in ping-pong
 *   let v = lerp(amt, xStart, xEnd); // Lerp between xStart and xEnd
 *  // do something with v...
 * }).start();
 * ```
 * @param amt Lerp amount, between 0 and 1 inclusive
 * @param a Start (ie when `amt` is 0)
 * @param b End (ie. when `amt` is 1)
 * @returns Lerped value which will be betewen `a` and `b`.
 */
declare const lerp: (amt: number, a: number, b: number) => number;
/**
 * @private
 */
declare type ToString<V> = (itemToMakeStringFor: V) => string;
/**
 * @private
 */
declare type IsEqual<V> = (a: V, b: V) => boolean;
/**
 * Default comparer function is equiv to checking `a === b`
 * @private
 * @template V
 * @param {V} a
 * @param {V} b
 * @return {*}  {boolean}
 */
declare const isEqualDefault: <V>(a: V, b: V) => boolean;
/**
 * Comparer returns true if string representation of `a` and `b` are equal.
 * Uses `toStringDefault` to generate a string representation (`JSON.stringify`)
 * @private
 * @template V
 * @param {V} a
 * @param {V} b
 * @return {*}  {boolean} True if the contents of `a` and `b` are equal
 */
declare const isEqualValueDefault: <V>(a: V, b: V) => boolean;
/**
 * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
 * @private
 * @template V
 * @param {V} itemToMakeStringFor
 * @returns {string}
 */
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;

export { IsEqual as I, ToString as T, scalePercentOutput as a, clampZeroBounds as b, clamp as c, isEqualValueDefault as d, isEqualDefault as i, lerp as l, scale as s, toStringDefault as t };
