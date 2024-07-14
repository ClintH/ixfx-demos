type NumberGuardRange = 
/**
 * No range checking
 */
``
/**
 * Can be any number, except zero
 */
 | `nonZero` | `positive` | `negative`
/**
 * Must be above zero
 */
 | `aboveZero` | `belowZero` | `percentage` | `bipolar`;
type GuardResultOk = Readonly<readonly [true: boolean]>;
type GuardResultFail = Readonly<readonly [false: boolean, reason: string]>;
type GuardResult = GuardResultFail | GuardResultOk;

/**
 * Throws an error if parameter is not an array
 * @param value
 * @param parameterName
 */
declare const arrayTest: (value: unknown, parameterName?: string) => GuardResult;
declare const throwArrayTest: (value: unknown, parameterName?: string) => void;
/**
 * Returns true if parameter is an array of strings
 * @param value
 * @returns
 */
declare const isStringArray: (value: unknown) => boolean;

/**
 * Throws if `value` is _undefined_ or _null_.
 * @param value
 * @param parameterName
 */
declare const nullUndef: (value: any, parameterName?: string) => GuardResult;
declare const throwNullUndef: (value: any, parameterName?: string) => void;
/** Throws an error if parameter is not defined */
declare const defined: <T>(argument: T | undefined) => argument is T;

declare const isFunction: (object: unknown) => object is (...args: Array<any>) => any;

/**
 * Returns true if `x` is a power of two
 * @param x
 * @returns True if `x` is a power of two
 */
declare const isPowerOfTwo: (x: number) => boolean;
/**
 * Returns `fallback` if `v` is NaN, otherwise returns `v`.
 *
 * Throws if `v` is not a number type.
 * @param v
 * @param fallback
 * @returns
 */
declare const ifNaN: (v: number, fallback: number) => number;
/**
 * Parses `value` as an integer, returning it if it meets the `range` criteria.
 * If not, `defaultValue` is returned.
 *
 * ```js
 * const i = integerParse('10', 'positive');    // 10
 * const i = integerParse('10.5', 'positive');  // 10
 * const i = integerParse('0', 'nonZero', 100); // 100
 * ```
 *
 * NaN is returned if criteria does not match and no default is given
 * ```js
 * const i = integerParse('10', 'negative');    // NaN
 * ```
 *
 * @param value
 * @param range
 * @param defaultValue
 * @returns
 */
declare const integerParse: (value: any, range?: NumberGuardRange, defaultValue?: number) => number;
/**
 * Checks if `t` is not a number or within specified range.
 * Returns `[false, reason:string]` if invalid or `[true]` if valid.
 * Use {@link throwNumberTest} to throw an error rather than return result.
 *
 * Alternatives: {@link integerTest} for additional integer check, {@link percentTest} for percentage-range.
 *
 * * (empty, default): must be a number type and not NaN.
 * * positive: must be at least zero
 * * negative: must be zero or lower
 * * aboveZero: must be above zero
 * * belowZero: must be below zero
 * * percentage: must be within 0-1, inclusive
 * * nonZero: can be anything except zero
 * * bipolar: can be -1 to 1, inclusive
 * @param value Value to check
 * @param parameterName Name of parameter (for more helpful exception messages)
 * @param range Range to enforce
 * @returns
 */
declare const numberTest: (value?: unknown, range?: NumberGuardRange, parameterName?: string) => GuardResult;
/**
 * Checks if `t` is not a number or within specified range.
 * Throws if invalid. Use {@link numberTest} to test without throwing.
 *
* * (empty, default): must be a number type and not NaN.
* * positive: must be at least zero
* * negative: must be zero or lower
* * aboveZero: must be above zero
* * belowZero: must be below zero
* * percentage: must be within 0-1, inclusive
* * nonZero: can be anything except zero
* * bipolar: can be -1 to 1, inclusive
*
 * Alternatives: {@link integerTest} for additional integer check, {@link percentTest} for percentage-range.
 * @param value Value to test
 * @param range Range
 * @param parameterName Name of parameter
 */
declare const throwNumberTest: (value?: unknown, range?: NumberGuardRange, parameterName?: string) => void;
/**
 * Returns test of `value` being in the range of 0-1.
 * Equiv to `number(value, `percentage`);`
 *
 * This is the same as calling ```number(t, `percentage`)```
 * @param value Value to check
 * @param parameterName Param name for customising exception message
 * @returns
 */
declare const percentTest: (value: number, parameterName?: string) => GuardResult;
declare const throwPercentTest: (value: number, parameterName?: string) => void;
/**
 * Checks if `value` an integer and meets additional criteria.
 * See {@link numberTest} for guard details, or use that if integer checking is not required.
 *
 * Note:
 * * `bipolar` will mean -1, 0 or 1.
 * * positive: must be at least zero
 * * negative: must be zero or lower
 * * aboveZero: must be above zero
 * * belowZero: must be below zero
 * * percentage: must be within 0-1, inclusive
 * * nonZero: can be anything except zero
 * @param value Value to check
 * @param parameterName Param name for customising exception message
 * @param range Guard specifier.
 */
declare const integerTest: (value: number | undefined, range?: NumberGuardRange, parameterName?: string) => GuardResult;
declare const throwIntegerTest: (value: number | undefined, range?: NumberGuardRange, parameterName?: string) => void;

/**
 * Returns _true_ if `value` is a plain object
 *
 * ```js
 * isPlainObject(`text`); // false
 * isPlainObject(document); // false
 * isPlainObject({ hello: `there` }); // true
 * ```
 * @param value
 * @returns
 */
declare const isPlainObject: (value: unknown) => boolean;
/**
 * Returns _true_ if `value` is primitive value or plain object
 * @param value
 * @returns
 */
declare const isPlainObjectOrPrimitive: (value: unknown) => boolean;

declare const throwFromResult: (test: GuardResultFail | GuardResultOk) => boolean;

declare const guards_arrayTest: typeof arrayTest;
declare const guards_defined: typeof defined;
declare const guards_ifNaN: typeof ifNaN;
declare const guards_integerParse: typeof integerParse;
declare const guards_integerTest: typeof integerTest;
declare const guards_isFunction: typeof isFunction;
declare const guards_isPlainObject: typeof isPlainObject;
declare const guards_isPlainObjectOrPrimitive: typeof isPlainObjectOrPrimitive;
declare const guards_isPowerOfTwo: typeof isPowerOfTwo;
declare const guards_isStringArray: typeof isStringArray;
declare const guards_nullUndef: typeof nullUndef;
declare const guards_numberTest: typeof numberTest;
declare const guards_percentTest: typeof percentTest;
declare const guards_throwArrayTest: typeof throwArrayTest;
declare const guards_throwFromResult: typeof throwFromResult;
declare const guards_throwIntegerTest: typeof throwIntegerTest;
declare const guards_throwNullUndef: typeof throwNullUndef;
declare const guards_throwNumberTest: typeof throwNumberTest;
declare const guards_throwPercentTest: typeof throwPercentTest;
declare namespace guards {
  export { guards_arrayTest as arrayTest, guards_defined as defined, guards_ifNaN as ifNaN, guards_integerParse as integerParse, guards_integerTest as integerTest, guards_isFunction as isFunction, guards_isPlainObject as isPlainObject, guards_isPlainObjectOrPrimitive as isPlainObjectOrPrimitive, guards_isPowerOfTwo as isPowerOfTwo, guards_isStringArray as isStringArray, guards_nullUndef as nullUndef, guards_numberTest as numberTest, guards_percentTest as percentTest, guards_throwArrayTest as throwArrayTest, guards_throwFromResult as throwFromResult, guards_throwIntegerTest as throwIntegerTest, guards_throwNullUndef as throwNullUndef, guards_throwNumberTest as throwNumberTest, guards_throwPercentTest as throwPercentTest };
}

export { type GuardResult as G, type NumberGuardRange as N, type GuardResultFail as a, type GuardResultOk as b, arrayTest as c, throwNullUndef as d, defined as e, isFunction as f, guards as g, isPowerOfTwo as h, isStringArray as i, ifNaN as j, integerParse as k, numberTest as l, throwNumberTest as m, nullUndef as n, throwPercentTest as o, percentTest as p, integerTest as q, throwIntegerTest as r, isPlainObject as s, throwArrayTest as t, isPlainObjectOrPrimitive as u, throwFromResult as v };
