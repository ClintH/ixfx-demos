/**
 * Returns source text that is between `start` and `end` match strings. Returns _undefined_ if start/end is not found.
 *
 * ```js
 * // Yields ` orange `;
 * between(`apple orange melon`, `apple`, `melon`);
 * ```
 * @param source Source text
 * @param start Start match
 * @param end If undefined, `start` will be used instead
 * @param lastEndMatch If true, looks for the last match of `end` (default). If false, looks for the first match.
 * @returns
 */
declare const between: (source: string, start: string, end?: string | undefined, lastEndMatch?: boolean) => string | undefined;
declare const indexOfCode: (source: string, code: number, start?: number, end?: number) => number;
/**
 * Returns the `source` string up until (and excluding) `match`. If match is not
 * found, all of `source` is returned.
 *
 * ```js
 * // Yields `apple `
 * untilMarch(`apple orange melon`, `orange`);
 * ```
 * @param source
 * @param match
 * @param startPos If provided, gives the starting offset. Default 0
 */
declare const untilMatch: (source: string, match: string, startPos?: number) => string;
/**
 * 'Unwraps' a string, removing one or more 'wrapper' strings that it starts and ends with.
 * ```js
 * unwrap("'hello'", "'");        // hello
 * unwrap("apple", "a");          // apple
 * unwrap("wow", "w");            // o
 * unwrap(`"'blah'"`, '"', "'");  // blah
 * ```
 * @param source
 * @param wrappers
 * @returns
 */
declare const unwrap: (source: string, ...wrappers: readonly string[]) => string;
/**
 * A range
 */
declare type Range = {
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
declare type LineSpan = {
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
declare const lineSpan: (ranges: readonly Range[], start: number, end: number) => LineSpan;
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
declare const splitRanges: (source: string, split: string) => readonly Range[];
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
declare const countCharsFromStart: (source: string, ...chars: readonly string[]) => number;
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

declare const Text_between: typeof between;
declare const Text_indexOfCode: typeof indexOfCode;
declare const Text_untilMatch: typeof untilMatch;
declare const Text_unwrap: typeof unwrap;
type Text_Range = Range;
type Text_LineSpan = LineSpan;
declare const Text_lineSpan: typeof lineSpan;
declare const Text_splitRanges: typeof splitRanges;
declare const Text_countCharsFromStart: typeof countCharsFromStart;
declare const Text_startsEnds: typeof startsEnds;
declare namespace Text {
  export {
    Text_between as between,
    Text_indexOfCode as indexOfCode,
    Text_untilMatch as untilMatch,
    Text_unwrap as unwrap,
    Text_Range as Range,
    Text_LineSpan as LineSpan,
    Text_lineSpan as lineSpan,
    Text_splitRanges as splitRanges,
    Text_countCharsFromStart as countCharsFromStart,
    Text_startsEnds as startsEnds,
  };
}

export { LineSpan as L, Range as R, Text as T, unwrap as a, between as b, countCharsFromStart as c, startsEnds as d, indexOfCode as i, lineSpan as l, splitRanges as s, untilMatch as u };
