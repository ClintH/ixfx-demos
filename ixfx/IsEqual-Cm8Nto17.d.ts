/**
 * If input is a string, it is returned.
 * Otherwise, it returns the result of JSON.stringify() with fields ordered.
 *
 * This allows for more consistent comparisons when object field orders are different but values the same.
 * @param itemToMakeStringFor
 * @returns
 */
declare const toStringOrdered: (itemToMakeStringFor: any) => string;
/**
 * Function that returns true if `a` and `b` are considered equal
 */
type IsEqual<T> = (a: T, b: T) => boolean;
/**
 * Default comparer function is equiv to checking `a === b`.
 * Use {@link isEqualValueDefault} to compare by value, via comparing JSON string representation.
 */
declare const isEqualDefault: <T>(a: T, b: T) => boolean;
/**
 * Comparer returns true if string representation of `a` and `b` are equal.
 * Use {@link isEqualDefault} to compare using === semantics
 * Uses `toStringDefault` to generate a string representation (via `JSON.stringify`).
 *
 * Returns _false_ if the ordering of fields is different, even though values are identical:
 * ```js
 * isEqualValueDefault({ a: 10, b: 20}, { b: 20, a: 10 }); // false
 * ```
 *
 * Use {@link isEqualValueIgnoreOrder} to ignore order (with an overhead of additional processing).
 * ```js
 * isEqualValueIgnoreOrder({ a: 10, b: 20}, { b: 20, a: 10 }); // true
 * ```
 *
 * Use {@link isEqualValuePartial} to partially match `b` against `a`.
 * @returns True if the contents of `a` and `b` are equal
 */
declare const isEqualValueDefault: <T>(a: T, b: T) => boolean;
/**
 * Returns _true_ if `a` contains the values of `b`. `a` may contain other values, but we
 * only check against what is in `b`. `a` and `b` must both be simple objects.
 *
 * ```js
 * const obj = {
 *  name: `Elle`,
 *  size: 100,
 *  colour: {
 *    red: 0.5,
 *    green: 0.1,
 *    blue: 0.2
 *  }
 * }
 *
 * isEqualValuePartial(obj, { name: `Elle` }); // true
 * isEqualValuePartial(obj, { name: { colour: red: { 0.5, green: 0.1  }} }); // true
 *
 * isEqualValuePartial(obj, { name: `Ellen` });     // false
 * isEqualValuePartial(obj, { lastname: `Elle` });  // false
 * ```
 * @param a
 * @param b
 * @param fieldComparer
 * @returns
 */
declare const isEqualValuePartial: <T1 extends Record<string, any>, T2 extends Record<string, any>>(a: T1, b: T2, fieldComparer?: IsEqual<any>) => boolean;
/**
 * Comparer returns true if string representation of `a` and `b` are equal, regardless of field ordering.
 * Uses `toStringOrdered` to generate a string representation (via JSON.stringify`).
 *
 * ```js
 * isEqualValueIgnoreOrder({ a: 10, b: 20}, { b: 20, a: 10 }); // true
 * isEqualValue({ a: 10, b: 20}, { b: 20, a: 10 }); // false, fields are different order
 * ```
 *
 * There is an overhead to ordering fields. Use {@link isEqualValueDefault} if it's not possible that field ordering will change.
 * @returns True if the contents of `a` and `b` are equal
 */
declare const isEqualValueIgnoreOrder: <T>(a: T, b: T) => boolean;

export { type IsEqual as I, isEqualValueDefault as a, isEqualValueIgnoreOrder as b, isEqualValuePartial as c, isEqualDefault as i, toStringOrdered as t };
