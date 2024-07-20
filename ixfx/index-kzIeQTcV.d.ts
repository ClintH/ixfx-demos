import { G as GuardResult, a as GuardResultFail, b as GuardResultOk, g as guards, N as NumberGuardRange } from './guards-Zz32TgeG.js';
import { C as CompareResult, a as Comparer, c as comparerInverse, d as defaultComparer, j as jsComparer, n as numericComparer } from './Comparers-lcqIj54O.js';
import { I as IsEqual, i as isEqualDefault, a as isEqualValueDefault, b as isEqualValueIgnoreOrder, c as isEqualValuePartial, t as toStringOrdered } from './IsEqual-EdZcaNvH.js';
import { R as Result, a as ResultError, b as ResultOk, t as throwResult } from './Results-mPoPoaRi.js';
import { T as ToString, d as defaultToString, i as isMap, a as isSet, t as toStringDefault } from './ToString-Wn1YmnlL.js';

type ArrayLengthMutationKeys = `splice` | `push` | `pop` | `shift` | `unshift` | number;
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never;
type FixedLengthArray<T extends Array<any>> = Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>> & {
    [Symbol.iterator]: () => IterableIterator<ArrayItems<T>>;
};

/**
 * Wraps the `eq` function, tracing the input data result
 * ```js
 * // Init trace
 * const traceEq = isEqualTrace(isEqualValueDefault);
 * // Use it in some function that takes IsEqual<T>
 * compare(a, b, eq);
 * ```
 * @param eq
 * @returns
 */
declare const isEqualTrace: <T>(eq: IsEqual<T>) => IsEqual<T>;

/**
 * Returns _true_ if `value` is an integer. Parses string input, but
 * all other data types return _false_.
 *
 * ```js
 * isInteger(1);      // true
 * isInteger(1.1);    // false
 * isInteger(`1`);    // true
 * isInteger(`1.1`);  // false
 * isInteger(true);   // false
 * isInteger(false);  // false
 * ```
 *
 * Returns _false_ for _undefined_, NaN, booleans and infinite numbers.
 * @param value
 * @returns
 */
declare const isInteger: (value: string | number) => boolean;

declare const mapKeys: <TKey extends string | number | symbol>(object: Record<any, any>, mapFunction: (key: string) => TKey) => Record<TKey, any>;

declare const runningiOS: () => boolean;

type index_ArrayItems<T extends Array<any>> = ArrayItems<T>;
type index_ArrayLengthMutationKeys = ArrayLengthMutationKeys;
declare const index_CompareResult: typeof CompareResult;
declare const index_Comparer: typeof Comparer;
type index_FixedLengthArray<T extends Array<any>> = FixedLengthArray<T>;
declare const index_GuardResult: typeof GuardResult;
declare const index_GuardResultFail: typeof GuardResultFail;
declare const index_GuardResultOk: typeof GuardResultOk;
declare const index_IsEqual: typeof IsEqual;
declare const index_NumberGuardRange: typeof NumberGuardRange;
declare const index_Result: typeof Result;
declare const index_ResultError: typeof ResultError;
declare const index_ResultOk: typeof ResultOk;
declare const index_ToString: typeof ToString;
declare const index_comparerInverse: typeof comparerInverse;
declare const index_defaultComparer: typeof defaultComparer;
declare const index_defaultToString: typeof defaultToString;
declare const index_isEqualDefault: typeof isEqualDefault;
declare const index_isEqualTrace: typeof isEqualTrace;
declare const index_isEqualValueDefault: typeof isEqualValueDefault;
declare const index_isEqualValueIgnoreOrder: typeof isEqualValueIgnoreOrder;
declare const index_isEqualValuePartial: typeof isEqualValuePartial;
declare const index_isInteger: typeof isInteger;
declare const index_isMap: typeof isMap;
declare const index_isSet: typeof isSet;
declare const index_jsComparer: typeof jsComparer;
declare const index_mapKeys: typeof mapKeys;
declare const index_numericComparer: typeof numericComparer;
declare const index_runningiOS: typeof runningiOS;
declare const index_throwResult: typeof throwResult;
declare const index_toStringDefault: typeof toStringDefault;
declare const index_toStringOrdered: typeof toStringOrdered;
declare namespace index {
  export { type index_ArrayItems as ArrayItems, type index_ArrayLengthMutationKeys as ArrayLengthMutationKeys, index_CompareResult as CompareResult, index_Comparer as Comparer, type index_FixedLengthArray as FixedLengthArray, index_GuardResult as GuardResult, index_GuardResultFail as GuardResultFail, index_GuardResultOk as GuardResultOk, guards as Guards, index_IsEqual as IsEqual, index_NumberGuardRange as NumberGuardRange, index_Result as Result, index_ResultError as ResultError, index_ResultOk as ResultOk, index_ToString as ToString, index_comparerInverse as comparerInverse, index_defaultComparer as defaultComparer, index_defaultToString as defaultToString, index_isEqualDefault as isEqualDefault, index_isEqualTrace as isEqualTrace, index_isEqualValueDefault as isEqualValueDefault, index_isEqualValueIgnoreOrder as isEqualValueIgnoreOrder, index_isEqualValuePartial as isEqualValuePartial, index_isInteger as isInteger, index_isMap as isMap, index_isSet as isSet, index_jsComparer as jsComparer, index_mapKeys as mapKeys, index_numericComparer as numericComparer, index_runningiOS as runningiOS, index_throwResult as throwResult, index_toStringDefault as toStringDefault, index_toStringOrdered as toStringOrdered };
}

export { type ArrayLengthMutationKeys as A, type FixedLengthArray as F, type ArrayItems as a, isEqualTrace as b, isInteger as c, index as i, mapKeys as m, runningiOS as r };
