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
 * Throws an error if `t` is not a number or within specified range.
 * Use an empty string for no special range constraints.
 * Alternatives: {@link integer} for additional integer check, {@link percent} for percentage-range.
 *
 * * positive: must be at least zero
 * * negative: must be zero or lower
 * * aboveZero: must be above zero
 * * belowZero: must be below zero
 * * percentage: must be within 0-1, inclusive
 * * nonZero: can be anything except zero
 * * bipolar: can be -1 to 1, inclusive
 * @param value Value to check
 * @param paramName Name of parameter (for more helpful exception messages)
 * @param range Range to enforce
 * @returns
 */
declare const numberTest: (value?: unknown, range?: NumberGuardRange, parameterName?: string) => GuardResult;
declare const throwNumberTest: (value?: unknown, range?: NumberGuardRange, parameterName?: string) => void;
/**
 * Test a number, returning _true_ if it passes, _false_ if not.
 * Compared to {@link number} which by default throws an exception.
 * @param value
 * @param range
 * @returns
 */
/**
 * Throws if `value` is _undefined_ or _null_.
 * @param value
 * @param paramName
 */
declare const nullUndef: (value: any, parameterName?: string) => GuardResult;
declare const throwFromResult: (test: GuardResultFail | GuardResultOk) => boolean;
/**
 * Returns test of `value` being in the range of 0-1.
 * Equiv to `number(value, `percentage`);`
 *
 * This is the same as calling ```number(t, `percentage`)```
 * @param value Value to check
 * @param paramName Param name for customising exception message
 * @returns
 */
declare const percentTest: (value: number, parameterName?: string) => GuardResult;
declare const throwPercentTest: (value: number, parameterName?: string) => void;
/**
 * Checks if `value` an integer and meets additional criteria.
 * See {@link number} for guard details, or use that if integer checking is not required.
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
 * @param paramName Param name for customising exception message
 * @param range Guard specifier.
 */
declare const integerTest: (value: number | undefined, range?: NumberGuardRange, parameterName?: string) => GuardResult;
declare const throwIntegerTest: (value: number | undefined, range?: NumberGuardRange, parameterName?: string) => void;
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
 * Returns true if parameter is an array of strings
 * @param value
 * @returns
 */
declare const isStringArray: (value: unknown) => boolean;
/**
 * Throws an error if parameter is not an array
 * @param value
 * @param paramName
 */
declare const arrayTest: (value: unknown, parameterName?: string) => GuardResult;
declare const throwArrayTest: (value: unknown, parameterName?: string) => void;
/** Throws an error if parameter is not defined */
declare const defined: <T>(argument: T | undefined) => argument is T;

export { type NumberGuardRange, arrayTest, defined, integerParse, integerTest, isStringArray, nullUndef, numberTest, percentTest, throwArrayTest, throwFromResult, throwIntegerTest, throwNumberTest, throwPercentTest };
