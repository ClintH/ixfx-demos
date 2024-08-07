import { s as string } from './String-STlznDag.js';

/**
 * Given a long string, abbreviates it with ...
 * ```js
 * abbreviate(`This is something`, 7); // `This is...`
 * ```
 *
 * If `source` is under `maxLength` the original is returned.
 * @param source
 * @param maxLength Maximum length. Defaults to 20
 * @returns
 */
declare const abbreviate: (source: string, maxLength?: number) => string;
/**
 * Uses JSON.toString() on `source`, but abbreviates result.
 * @param source Object to stringify
 * @param maxLength Default 20
 * @returns
 */
declare const toStringAbbreviate: (source: any, maxLength?: number) => string;
/**
 * Returns source text that is between `start` and `end` match strings. Returns _undefined_ if start/end is not found.
 *
 * ```js
 * // Yields ` orange `;
 * between(`apple orange melon`, `apple`, `melon`);
 * ```
 * @param source Source text
 * @param start Start match
 * @param end If undefined, the `start` string will be looked for
 * @param lastEndMatch If true, looks for the last match of `end` (default). If false, looks for the first match.
 * @returns
 */
declare const between: (source: string, start: string, end?: string, lastEndMatch?: boolean) => string | undefined;
/**
 * Like {@link between}, but also returns the source string without the start/end match and what's between.
 * ```js
 * const [src,between] = betweenChomp('hello [there] friend', '[', ']');
 * // src: 'hello  friend'
 * // between: 'there'
 * ```
 * @param source
 * @param start
 * @param end
 * @param lastEndMatch
 * @returns
 */
declare const betweenChomp: (source: string, start: string, end?: string, lastEndMatch?: boolean) => [source: string, between: string | undefined];
/**
 * Returns first position of the given character code, or -1 if not found.
 * @param source Source string
 * @param code Code to seek
 * @param start Start index, 0 by default
 * @param end End index (inclusive), source.length-1 by default
 * @returns Found position, or -1 if not found
 */
declare const indexOfCharCode: (source: string, code: number, start?: number, end?: number) => number;
/**
 * Returns `source` with a given number of characters removed from start position.
 *
 * ```js
 * // Remove three characters starting at position 1
 * omitChars(`hello there`, 1, 3); // ie. removes 'ell'
 * // Yields: `ho there`
 * ```
 * @param source
 * @param removeStart Start point to remove
 * @param removeLength Number of characters to remove
 * @returns
 */
declare const omitChars: (source: string, removeStart: number, removeLength: number) => string;
/**
 * Splits a string into `length`-size chunks.
 *
 * If `length` is greater than the length of `source`, a single element array is returned with source.
 * The final array element may be smaller if we ran out of characters.
 *
 * ```js
 * splitByLength(`hello there`, 2);
 * // Yields:
 * // [`he`, `ll`, `o `, `th`, `er`, `e`]
 * ```
 * @param source Source string
 * @param length Length of each chunk
 * @returns
 */
declare const splitByLength: (source: string | null, length: number) => ReadonlyArray<string>;
/**
 * Returns the `source` string up until (and excluding) `match`.
 *
 * By default, if match is not found, all of `source` is returned.
 *
 * ```js
 * // Yields `apple `
 * untilMarch(`apple orange melon`, `orange`);
 * ```
 *
 * If match is not found, fallback can be returned instead:
 * ```js
 * // Yields 'lemon'
 * untilMatch(`apple orange mellon`, `kiwi`, { fallback: `lemon` });
 * ```
 *
 * Or an exception thrown
 * ```js
 * // Throws
 * untilMatch(`apple orange mellon`, `kiwi`, { ifNoMatch: `throw` });
 * ```
 * @param source
 * @param match
 * @param startPos If provided, gives the starting offset. Default 0
 */
type MatchOptions = {
    startPos: number;
    fromEnd: boolean;
    ifNoMatch: `throw` | `original` | `fallback`;
    fallback: string;
};
/**
 * Returns all the text in `source` that precedes (and does not include) `match`. If not found, `source` is returned.
 *
 * See also: {@link beforeMatch}, {@link beforeAfterMatch}.
 *
 * ```js
 * afterMatch(`Hello. There`, `.`); // ' There'
 * afterMatch(`Hello, there', `,`); // 'Hello, there'
 * ```
 *
 * If `source` is _undefined_, an error is thrown.
 * @param source
 * @param match
 * @param options
 * @returns
 */
declare const beforeMatch: (source: string, match: string, options?: Partial<MatchOptions>) => string;
/**
 * Returns all the text in `source` that follows `match`. If not found, `source` is returned.
 *
 * See also: {@link beforeMatch}, {@link beforeAfterMatch}.
 *
 * ```js
 * afterMatch(`Hello. There`, `.`); // ' There'
 * afterMatch(`Hello, there', `,`); // 'Hello, there'
 * ```
 *
 * If `source` is _undefined_, an error is thrown.
 * @param source
 * @param match
 * @param options
 * @returns
 */
declare const afterMatch: (source: string, match: string, options?: Partial<MatchOptions>) => string;
/**
 * Returns the text that is before and after `match`.
 *
 * See also: {@link beforeMatch}, {@link afterMatch}.
 *
 * If `match` is at the end of start of `source`, after or before might be an empty string.
 * @param source
 * @param match
 * @param options
 * @returns
 */
declare const beforeAfterMatch: (source: string, match: string, options?: Partial<MatchOptions>) => [before: string, after: string];
/**
 * 'Unwraps' a string, removing one or more 'wrapper' strings that it starts and ends with.
 * Only removes when a matching end is found.
 * ```js
 * unwrap("'hello'", "'");        // hello
 * // No mataching end 'a', so nothing happens
 * unwrap("apple", "a");          // apple
 * unwrap("wow", "w");            // o
 * unwrap(`"'blah'"`, '"', "'");  // blah
 * ```
 * @param source
 * @param wrappers
 * @returns
 */
declare const unwrap: (source: string, ...wrappers: ReadonlyArray<string>) => string;
/**
 * A range
 */
type Range = {
    /**
     * Text of range
     */
    readonly text: string;
    /**
     * Start position, with respect to source text
     */
    readonly start: number;
    /**
     * End position, with respect to source text
     */
    readonly end: number;
    /**
     * Index of range. First range is 0
     */
    readonly index: number;
};
type LineSpan = {
    readonly start: number;
    readonly end: number;
    readonly length: number;
};
/**
 * Calculates the span, defined in {@link Range} indexes, that includes `start` through to `end` character positions.
 *
 * After using {@link splitRanges} to split text, `lineSpan` is used to associate some text coordinates with ranges.
 *
 * @param ranges Ranges
 * @param start Start character position, in source text reference
 * @param end End character position, in source text reference
 * @returns Span
 */
declare const lineSpan: (ranges: ReadonlyArray<Range>, start: number, end: number) => LineSpan;
/**
 * Splits a source string into ranges:
 * ```js
 * const ranges = splitRanges("hello;there;fella", ";");
 * ```
 *
 * Each range consists of:
 * ```js
 * {
 *  text: string  - the text of range
 *  start: number - start pos of range, wrt to source
 *  end: number   - end pos of range, wrt to source
 *  index: number - index of range (starting at 0)
 * }
 * ```
 * @param source
 * @param split
 * @returns
 */
declare const splitRanges: (source: string, split: string) => ReadonlyArray<Range>;
/**
 * Counts the number of times one of `chars` appears at the front of
 * a string, contiguously.
 *
 * ```js
 * countCharsFromStart(`  hi`, ` `); // 2
 * countCharsFromStart(`hi  `, ` `); // 0
 * countCharsFromStart(`  hi  `, ` `); // 2
 * ```
 * @param source
 * @param chars
 * @returns
 */
declare const countCharsFromStart: (source: string, ...chars: ReadonlyArray<string>) => number;
/**
 * Returns _true_ if `source` starts and ends with `start` and `end`. Case-sensitive.
 * If _end_ is omitted, the the `start` value will be used.
 *
 * ```js
 * startsEnds(`This is a string`, `This`, `string`); // True
 * startsEnds(`This is a string`, `is`, `a`); // False
 * starsEnds(`test`, `t`); // True, starts and ends with 't'
 * ```
 * @param source String to search within
 * @param start Start
 * @param end End (if omitted, start will be looked for at end as well)
 * @returns True if source starts and ends with provided values.
 */
declare const startsEnds: (source: string, start: string, end?: string) => boolean;
declare const htmlEntities: (source: string) => string;
/**
 * Simple wilcard matching. Use '*' in `pattern` to denote any number of characters.
 * ```js
 * // Must start with 'cat'
 * wildcard(`cat*`,`caterpillar`); // true
 * // Must end with 'cat'
 * wildcat(`*cat`, `bobcat`);  // true
 * // 'cat' anywhere in string
 * wildcard(`*cat*`, `see cat run`); // true
 * ```
 * @param pattern
 * @returns
 */
declare const wildcard: (pattern: string) => (value: string) => boolean;

type Text_LineSpan = LineSpan;
type Text_MatchOptions = MatchOptions;
type Text_Range = Range;
declare const Text_abbreviate: typeof abbreviate;
declare const Text_afterMatch: typeof afterMatch;
declare const Text_beforeAfterMatch: typeof beforeAfterMatch;
declare const Text_beforeMatch: typeof beforeMatch;
declare const Text_between: typeof between;
declare const Text_betweenChomp: typeof betweenChomp;
declare const Text_countCharsFromStart: typeof countCharsFromStart;
declare const Text_htmlEntities: typeof htmlEntities;
declare const Text_indexOfCharCode: typeof indexOfCharCode;
declare const Text_lineSpan: typeof lineSpan;
declare const Text_omitChars: typeof omitChars;
declare const Text_splitByLength: typeof splitByLength;
declare const Text_splitRanges: typeof splitRanges;
declare const Text_startsEnds: typeof startsEnds;
declare const Text_toStringAbbreviate: typeof toStringAbbreviate;
declare const Text_unwrap: typeof unwrap;
declare const Text_wildcard: typeof wildcard;
declare namespace Text {
  export { type Text_LineSpan as LineSpan, type Text_MatchOptions as MatchOptions, type Text_Range as Range, Text_abbreviate as abbreviate, Text_afterMatch as afterMatch, Text_beforeAfterMatch as beforeAfterMatch, Text_beforeMatch as beforeMatch, Text_between as between, Text_betweenChomp as betweenChomp, Text_countCharsFromStart as countCharsFromStart, Text_htmlEntities as htmlEntities, Text_indexOfCharCode as indexOfCharCode, Text_lineSpan as lineSpan, Text_omitChars as omitChars, string as random, Text_splitByLength as splitByLength, Text_splitRanges as splitRanges, Text_startsEnds as startsEnds, Text_toStringAbbreviate as toStringAbbreviate, Text_unwrap as unwrap, Text_wildcard as wildcard };
}

export { type LineSpan as L, type MatchOptions as M, type Range as R, Text as T, abbreviate as a, between as b, betweenChomp as c, beforeMatch as d, afterMatch as e, beforeAfterMatch as f, splitRanges as g, countCharsFromStart as h, indexOfCharCode as i, startsEnds as j, htmlEntities as k, lineSpan as l, omitChars as o, splitByLength as s, toStringAbbreviate as t, unwrap as u, wildcard as w };
