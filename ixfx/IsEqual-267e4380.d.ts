declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;
/**
 * Function that returns true if `a` and `b` are considered equal
 */
type IsEqual<V> = (a: V, b: V) => boolean;
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

export { IsEqual as I, isEqualValueDefault as a, isEqualDefault as i, toStringDefault as t };
