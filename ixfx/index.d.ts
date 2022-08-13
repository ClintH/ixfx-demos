/// <reference types="@types/web-bluetooth" />
/// <reference types="@types/w3c-web-serial" />
declare module "Guards" {
    export type NumberGuardRange = 
    /**
     * No range checking
     */
    `` | 
    /**
     * Can be any number, except zero
     */
    `nonZero` | `positive` | `negative` | 
    /**
     * Must be above zero
     */
    `aboveZero` | `belowZero` | `percentage` | `bipolar`;
    /**
     * Throws an error if `t` is not a number or within specified range.
     * Alternatives: {@link integer} for additional integer check, {@link percentage}.
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
    export const number: (value: number, range?: NumberGuardRange, paramName?: string) => boolean;
    /**
     * Throws an error if `value` is not in the range of 0-1.
     * Equiv to `number(value, `percentage`);`
     *
     * This is the same as calling ```number(t, `percentage`)```
     * @param value Value to check
     * @param paramName Param name for customising exception message
     * @returns
     */
    export const percent: (value: number, paramName?: string) => boolean;
    /**
     * Throws an error if `value` is not an integer, or does not meet guard criteria.
     * See {@link number} for guard details, or use that if integer checking is not required.
     * @param value Value to check
     * @param paramName Param name for customising exception message
     * @param range Guard specifier.
     */
    export const integer: (value: number, range?: NumberGuardRange, paramName?: string) => void;
    /**
     * Returns true if parameter is an array of strings
     * @param value
     * @returns
     */
    export const isStringArray: (value: unknown) => boolean;
    /**
     * Throws an error if parameter is not an array
     * @param value
     * @param paramName
     */
    export const array: (value: unknown, paramName?: string) => void;
    /** Throws an error if parameter is not defined */
    export const defined: <T>(argument: T | undefined) => argument is T;
}
declare module "Text" {
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
    export const between: (source: string, start: string, end?: string, lastEndMatch?: boolean) => string | undefined;
    /**
     * Returns first position of the given character code, or -1 if not found.
     * @param source Source string
     * @param code Code to seek
     * @param start Start index, 0 by default
     * @param end End index (inclusive), source.length-1 by default
     * @returns Found position, or -1 if not found
     */
    export const indexOfCharCode: (source: string, code: number, start?: number, end?: number) => number;
    /**
     * Returns `source` with chars removed at `removeStart` position
     * ```js
     * omitChars(`hello there`, 1, 3);
     * // Yields: `ho there`
     * ```
     * @param source
     * @param removeStart Start point to remove
     * @param removeLength Number of characters to remove
     * @returns
     */
    export const omitChars: (source: string, removeStart: number, removeLength: number) => string;
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
    export const splitByLength: (source: string, length: number) => readonly string[];
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
    export const untilMatch: (source: string, match: string, startPos?: number) => string;
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
    export const unwrap: (source: string, ...wrappers: readonly string[]) => string;
    /**
     * A range
     */
    export type Range = {
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
    export type LineSpan = {
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
    export const lineSpan: (ranges: readonly Range[], start: number, end: number) => LineSpan;
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
    export const splitRanges: (source: string, split: string) => readonly Range[];
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
    export const countCharsFromStart: (source: string, ...chars: readonly string[]) => number;
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
    export const startsEnds: (source: string, start: string, end?: string) => boolean;
    export const htmlEntities: (source: string) => string;
}
declare module "IterableAsync" {
    /**
     *
     * ```js
     * chunks([1,2,3,4,5,6,7,8,9,10], 3);
     * // Yields [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
     * ```
     * @param it
     * @param size
     */
    export function chunks<V>(it: Iterable<V>, size: number): AsyncGenerator<Awaited<V>[], void, unknown>;
    export function concat<V>(...its: readonly Iterable<V>[]): AsyncGenerator<Awaited<V>, void, undefined>;
    export function dropWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, undefined>;
    export function equals<V>(it1: Iterable<V>, it2: Iterable<V>): Promise<boolean | undefined>;
    /**
     * Returns true if `f` returns true for
     * every item in iterable
     * @param it
     * @param f
     * @returns
     */
    export function every<V>(it: Iterable<V>, f: (v: V) => boolean): Promise<boolean>;
    /**
     * Yields `v` for each item within `it`.
     *
     * ```js
     * fill([1, 2, 3], 0);
     * // Yields: [0, 0, 0]
     * ```
     * @param it
     * @param v
     */
    export function fill<V>(it: AsyncIterable<V>, v: V): AsyncGenerator<Awaited<V>, void, unknown>;
    /**
     * ```js
     * filter([1, 2, 3, 4], e => e % 2 == 0);
     * returns [2, 4]
     * ```
     * @param it
     * @param f
     */
    export function filter<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
    /**
     *
     * ```js
     * find([1, 2, 3, 4], e => e > 2);
     * // Yields: 3
     * ```
     * @param it
     * @param f
     * @returns
     */
    export function find<V>(it: Iterable<V>, f: (v: V) => boolean): Promise<V | undefined>;
    /**
     * ```js
     * flatten([1, [2, 3], [[4]]]);
     * // Yields: [1, 2, 3, [4]];
     * ```
     * @param it
     */
    export function flatten<V>(it: AsyncIterable<V>): AsyncGenerator<any, void, unknown>;
    /**
     *
     * @param it
     * @param f
     */
    export function forEach<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Promise<void>;
    export function map<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<boolean, void, unknown>;
    export function max<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): Promise<V | undefined>;
    export function min<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): Promise<V | undefined>;
    /**
     * Returns count from `start` for a given length
     * ```js
     * range(-5, 10);
     * // Yields: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
     * ```
     * @param start
     * @param len
     */
    export function range(start: number, len: number): AsyncGenerator<number, void, unknown>;
    export function reduce<V>(it: AsyncIterable<V>, f: (acc: V, current: V) => V, start: V): Promise<V>;
    export function slice<V>(it: AsyncIterable<V>, start?: number, end?: number): AsyncGenerator<Awaited<V>, void, unknown>;
    export function some<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Promise<boolean>;
    export function takeWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;
    /**
     * Returns an array of values from an iterator.
     *
     * ```js
     * const data = await toArray(adsrSample(opts, 10));
     * ```
     *
     * Note: If the iterator is infinite, be sure to provide a `count` or the function
     * will never return.
     *
     * @param it Asynchronous iterable
     * @param count Number of items to return, by default all.
     * @returns
     */
    export function toArray<V>(it: AsyncIterable<V>, count?: number): Promise<readonly V[]>;
    export function unique<V>(it: AsyncIterable<V>, f?: ((id: V) => V)): AsyncGenerator<Awaited<V>, void, unknown>;
    export function zip<V>(...its: AsyncIterable<V>[]): AsyncGenerator<any[], void, unknown>;
}
declare module "Util" {
    export * as IterableAsync from "IterableAsync";
    /**
     * Returns `fallback` if `v` is NaN, otherwise returns `v`
     * @param v
     * @param fallback
     * @returns
     */
    export const ifNaN: (v: number, fallback: number) => number;
    /**
     * Returns true if `x` is a power of two
     * @param x
     * @returns True if `x` is a power of two
     */
    export const isPowerOfTwo: (x: number) => boolean;
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
    export const relativeDifference: (initial: number) => (v: number) => number;
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
    export const getFieldByPath: (o: any, path?: string) => any | undefined;
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
    export const getFieldPaths: (o: any) => readonly string[];
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
    export const roundUpToMultiple: (v: number, multiple: number) => number;
    export type ToString<V> = (itemToMakeStringFor: V) => string;
    /**
     * Function that returns true if `a` and `b` are considered equal
     */
    export type IsEqual<V> = (a: V, b: V) => boolean;
    /**
     * Default comparer function is equiv to checking `a === b`
     */
    export const isEqualDefault: <V>(a: V, b: V) => boolean;
    /**
     * Comparer returns true if string representation of `a` and `b` are equal.
     * Uses `toStringDefault` to generate a string representation (`JSON.stringify`)
     * @returns True if the contents of `a` and `b` are equal
     */
    export const isEqualValueDefault: <V>(a: V, b: V) => boolean;
    /**
     * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
     */
    export const toStringDefault: <V>(itemToMakeStringFor: V) => string;
    export const runningiOS: () => boolean;
}
declare module "collections/Map" {
    import { IsEqual, ToString } from "Util";
    /**
     * Returns true if map contains `value` under `key`, using `comparer` function. Use {@link hasAnyValue} if you don't care
     * what key value might be under.
     *
     * Having a comparer function is useful to check by value rather than object reference.
     *
     * @example Find key value based on string equality
     * ```js
     * hasKeyValue(map,`hello`, `samantha`, (a, b) => a === b);
     * ```
     * @param map Map to search
     * @param key Key to search
     * @param value Value to search
     * @param comparer Function to determine match
     * @returns True if key is found
     */
    export const hasKeyValue: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V, comparer: IsEqual<V>) => boolean;
    export type GetOrGenerate<K, V, Z> = (key: K, args?: Z) => Promise<V>;
    /**
     * Returns a function that fetches a value from a map, or generates and sets it if not present.
     * Undefined is never returned, because if `fn` yields that, an error is thrown.
     *
     * See {@link getOrGenerateSync} for a synchronous version.
     *
     * ```
     * const m = getOrGenerate(new Map(), (key) => {
     *  return key.toUppercase();
     * });
     *
     * // Not contained in map, so it will run the uppercase function,
     * // setting the value to the key 'hello'.
     * const v = await m(`hello`);  // Yields 'HELLO'
     * const v1 = await m(`hello`); // Value exists, so it is returned ('HELLO')
     * ```
     *
     */
    export const getOrGenerate: <K, V, Z>(map: Map<K, V>, fn: (key: K, args?: Z | undefined) => V | Promise<V>) => GetOrGenerate<K, V, Z>;
    /**
     * @inheritDoc getOrGenerate
     * @param map
     * @param fn
     * @returns
     */
    export const getOrGenerateSync: <K, V, Z>(map: Map<K, V>, fn: (key: K, args?: Z | undefined) => V) => (key: K, args?: Z | undefined) => V;
    /**
     * Adds items to a map only if their key doesn't already exist
     *
     * Uses provided {@link Util.ToString} function to create keys for items. Item is only added if it doesn't already exist.
     * Thus the older item wins out, versus normal `Map.set` where the newest wins.
     *
     *
     * @example
     * ```js
     * const map = new Map();
     * const peopleArray = [ _some people objects..._];
     * addUniqueByHash(map, p => p.name, ...peopleArray);
     * ```
     * @param set
     * @param hashFunc
     * @param values
     * @returns
     */
    export const addUniqueByHash: <V>(set: ReadonlyMap<string, V> | undefined, hashFunc: ToString<V>, ...values: readonly V[]) => Map<any, any>;
    /**
     * Returns true if _any_ key contains `value`, based on the provided `comparer` function. Use {@link hasKeyValue}
     * if you only want to find a value under a certain key.
     *
     * Having a comparer function is useful to check by value rather than object reference.
     * @example Finds value where name is 'samantha', regardless of other properties
     * ```js
     * hasAnyValue(map, {name:`samantha`}, (a, b) => a.name === b.name);
     * ```
     *
     * Works by comparing `value` against all values contained in `map` for equality using the provided `comparer`.
     *
     * @param map Map to search
     * @param value Value to find
     * @param comparer Function that determines matching. Should return true if `a` and `b` are considered equal.
     * @returns True if value is found
     */
    export const hasAnyValue: <K, V>(map: ReadonlyMap<K, V>, value: V, comparer: IsEqual<V>) => boolean;
    /**
     * Returns values where `predicate` returns true.
     *
     * If you just want the first match, use `find`
     *
     * @example All people over thirty
     * ```js
     * // for-of loop
     * for (const v of filter(people, person => person.age > 30)) {
     *
     * }
     * // If you want an array
     * const overThirty = Array.from(filter(people, person => person.age > 30));
     * ```
     * @param map Map
     * @param predicate Filtering predicate
     * @returns Values that match predicate
     */
    export function filter<V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean): Generator<V, void, unknown>;
    /**
     * Copies data to an array
     * @param map
     * @returns
     */
    export const toArray: <V>(map: ReadonlyMap<string, V>) => readonly V[];
    /**
     * Returns the first found item that matches `predicate` or _undefined_.
     *
     * If you want all matches, use {@link filter}.
     *
     * @example First person over thirty
     * ```js
     * const overThirty = find(people, person => person.age > 30);
     * ```
     * @param map Map to search
     * @param predicate Function that returns true for a matching item
     * @returns Found item or _undefined_
     */
    export const find: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => V | undefined;
    /**
     * Converts a map to a simple object, transforming from type `T` to `K` as it does so. If no transforms are needed, use {@link mapToObj}.
     *
     * ```js
     * const map = new Map();
     * map.set(`name`, `Alice`);
     * map.set(`pet`, `dog`);
     *
     * const o = mapToObjTransform(map, v => {
     *  ...v,
     *  registered: true
     * });
     *
     * // Yields: { name: `Alice`, pet: `dog`, registered: true }
     * ```
     *
     * If the goal is to create a new map with transformed values, use {@link transformMap}.
     * @param m
     * @param valueTransform
     * @typeParam T Value type of input map
     * @typeParam K Value type of destination map
     * @returns
     */
    export const mapToObjTransform: <T, K>(m: ReadonlyMap<string, T>, valueTransform: (value: T) => K) => {
        readonly [key: string]: K;
    };
    /**
     * Zips together an array of keys and values into an object. Requires that
     * `keys` and `values` are the same length.
     *
     * @example
     * ```js
     * const o = zipKeyValue([`a`, `b`, `c`], [0, 1, 2])
     * Yields: { a: 0, b: 1, c: 2}
     *```
      * @param keys String keys
      * @param values Values
      * @typeParam V Type of values
      * @return Object with keys and values
      */
    export const zipKeyValue: <V>(keys: ReadonlyArray<string>, values: ArrayLike<V | undefined>) => {
        [k: string]: V | undefined;
    };
    /**
     * Like `Array.map`, but for a Map. Transforms from Map<K,V> to Map<K,R>, returning as a new Map.
     *
     * @example
     * ```js
     * const mapOfStrings = new Map();
     * mapOfStrings.set(`a`, `10`);
     * mapOfStrings.get(`a`); // Yields `10` (a string)
     *
     * // Convert a map of string->string to string->number
     * const mapOfInts = transformMap(mapOfStrings, (value, key) => parseInt(value));
     *
     * mapOfInts.get(`a`); // Yields 10 (a proper number)
     * ```
     *
     * If you want to combine values into a single object, consider instead  {@link mapToObjTransform}.
     * @param source
     * @param transformer
     * @typeParam K Type of keys (generally a string)
     * @typeParam V Type of input map values
     * @typeParam R Type of output map values
     * @returns
     */
    export const transformMap: <K, V, R>(source: ReadonlyMap<K, V>, transformer: (value: V, key: K) => R) => Map<K, R>;
    /**
     * Converts a `Map` to a plain object, useful for serializing to JSON
     *
     * @example
     * ```js
     * const str = JSON.stringify(mapToObj(map));
     * ```
     * @param m
     * @returns
     */
    export const mapToObj: <T>(m: ReadonlyMap<string, T>) => {
        readonly [key: string]: T;
    };
    /**
     * Converts Map to Array with a provided `transformer` function. Useful for plucking out certain properties
     * from contained values and for creating a new map based on transformed values from an input map.
     *
     * @example Get an array of ages from a map of Person objects
     * ```js
     * let person = { age: 29, name: `John`};
     * map.add(person.name, person);
     *
     * const ages = mapToArray(map, (key, person) => person.age);
     * // [29, ...]
     * ```
     *
     * In the above example, the `transformer` function returns a number, but it could
     * just as well return a transformed version of the input:
     *
     * ```js
     * // Return with random heights and uppercased name
     * mapToArray(map, (key, person) => ({
     *  ...person,
     *  height: Math.random(),
     *  name: person.name.toUpperCase();
     * }))
     * // Yields:
     * // [{height: 0.12, age: 29, name: "JOHN"}, ...]
     * ```
     * @param m
     * @param transformer A function that takes a key and item, returning a new item.
     * @returns
     */
    export const mapToArray: <K, V, R>(m: ReadonlyMap<K, V>, transformer: (key: K, item: V) => R) => readonly R[];
}
declare module "data/Clamp" {
    /**
     * Clamps a value between min and max (both inclusive)
     * Defaults to a 0-1 range, useful for percentages.
     *
     * @example Usage
     * ```js
     * // 0.5 - just fine, within default of 0 to 1
     * clamp(0.5);
     * // 1 - above default max of 1
     * clamp(1.5);
     * // 0 - below range
     * clamp(-50, 0, 100);
     * // 50 - within range
     * clamp(50, 0, 50);
     * ```
     *
     * For clamping integer ranges, consider {@link clampIndex }
     * For clamping `{ x, y }` points, consider {@link Geometry.Points.clamp | Geometry.Points.clamp}.
     *
     * @param v Value to clamp
     * @param Minimum value (inclusive)
     * @param Maximum value (inclusive)
     * @returns Clamped value
     */
    export const clamp: (v: number, min?: number, max?: number) => number;
    /**
     * Clamps integer `v` between 0 (inclusive) and array length or length (exclusive).
     * Returns value then will always be at least zero, and a valid array index.
     *
     * @example Usage
     * ```js
     * // Array of length 4
     * const myArray = [`a`, `b`, `c`, `d`];
     * clampIndex(0, myArray);    // 0
     * clampIndex(4, myArray);    // 3
     * clampIndex(-1, myArray);   // 0
     *
     * clampIndex(5, 3); // 2
     * ```
     *
     * Throws an error if `v` is not an integer.
     *
     * For some data it makes sense that data might 'wrap around' if it exceeds the
     * range. For example rotation angle. Consider using {@link wrap} for this.
     *
     * @param v Value to clamp (must be an interger)
     * @param arrayOrLength Array, or length of bounds (must be an integer)
     * @returns Clamped value, minimum will be 0, maximum will be one less than `length`.
     */
    export const clampIndex: (v: number, arrayOrLength: number | readonly any[]) => number;
}
declare module "data/Scale" {
    /**
     * Scales `v` from an input range to an output range (aka `map`)
     *
     * For example, if a sensor's useful range is 100-500, scale it to a percentage:
     * ```js
     * scale(sensorReading, 100, 500, 0, 1);
     * ```
     *
     * `scale` defaults to a percentage-range output, so you can get away with:
     * ```js
     * scale(sensorReading, 100, 500);
     * ```
     *
     * If `v` is outside of the input range, it will likewise be outside of the output range.
     * Use {@link clamp} to ensure output range is maintained.
     *
     * If inMin and inMax are equal, outMax will be returned.
     *
     * An easing function can be provided for non-linear scaling. In this case
     * the input value is 'pre scaled' using the function before it is applied to the
     * output range.
     * ```js
     * scale(sensorReading, 100, 500, 0, 1, Easings.gaussian());
     * ```
     * @param v Value to scale
     * @param inMin Input minimum
     * @param inMax Input maximum
     * @param outMin Output minimum. If not specified, 0
     * @param outMax Output maximum. If not specified, 1
     * @param easing Easing function
     * @returns Scaled value
     */
    export const scale: (v: number, inMin: number, inMax: number, outMin?: number, outMax?: number, easing?: ((v: number) => number) | undefined) => number;
    /**
     * Scales an input percentage to a new percentage range.
     *
     * If you have an input percentage (0-1), `scalePercentageOutput` maps it to an
     * _output_ percentage of `outMin`-`outMax`.
     *
     * ```js
     * // Scales 50% to a range of 0-10%
     * scalePercentages(0.5, 0, 0.10); // 0.05 - 5%
     * ```
     *
     * An error is thrown if any parameter is outside of percentage range. This added
     * safety is useful for catching bugs. Otherwise, you could just as well call
     * `scale(percentage, 0, 1, outMin, outMax)`.
     *
     * If you want to scale some input range to percentage output range, just use `scale`:
     * ```js
     * // Yields 0.5
     * scale(2.5, 0, 5);
     * ```
     * @param percentage Input value, within percentage range
     * @param outMin Output minimum, between 0-1
     * @param outMax Output maximum, between 0-1
     * @returns Scaled value between outMin-outMax.
     */
    export const scalePercentages: (percentage: number, outMin: number, outMax?: number) => number;
    /**
     * Scales an input percentage value to an output range
     * If you have an input percentage (0-1), `scalePercent` maps it to an output range of `outMin`-`outMax`.
     * ```js
     * scalePercent(0.5, 10, 20); // 15
     * ```
     *
     * @param v Value to scale
     * @param outMin Minimum for output
     * @param outMax Maximum for output
     * @returns
     */
    export const scalePercent: (v: number, outMin: number, outMax: number) => number;
}
declare module "data/Normalise" {
    /**
     * Normalises numbers, adjusting min/max as new values are processed.
     * Normalised return values will be in the range of 0-1 (inclusive).
     *
     * [Read more in the docs](https://clinth.github.io/ixfx-docs/temporal/normalising/)
     *
     * @example
     * ```js
     * import {Normalise} from 'https://unpkg.com/ixfx/dist/data.js'
     * const s = Normalise.stream();
     * s(2);    // 1 (because 2 is highest seen)
     * s(1);    // 0 (because 1 is the lowest so far)
     * s(1.5);  // 0.5 (50% of range 1-2)
     * s(0.5);  // 0 (because it's the new lowest)
     * ```
     *
     * Since normalisation is being adjusted as new min/max are encountered, it might
     * be that value normalised to 1 at one time is different to what normalises to 1
     * at a later time.
     *
     * If you already know what to expect of the number range, passingin `minDefault`
     * and `maxDefault` primes the normalisation.
     * ```js
     * const s = Normalise.stream();
     * s(5); // 1, because it's the highest seen
     *
     * // With priming:
     * const s = Normalise.stream(0, 10);
     * s(5); // 0.5, because we're expecting range 0-10
     * ```
     *
     * Note that if a value exceeds the default range, normalisation adjusts.
     * @returns
     */
    export const stream: (minDefault?: number, maxDefault?: number) => (v: number) => number;
    /**
     * Normalises an array. By default uses the actual min/max of the array
     * as the normalisation range. [Read more in the docs](https://clinth.github.io/ixfx-docs/data/normalising/)
     *
     * ```js
     * import {Normalise} from 'https://unpkg.com/ixfx/dist/data.js'
     * // Yields: [0.5, 0.1, 0.0, 0.9, 1]
     * Normalise.array([5,1,0,9,10]);
     * ```
     *
     * `minForced` and/or `maxForced` can
     * be provided to use an arbitrary range.
     * ```js
     * // Forced range 0-100
     * // Yields: [0.05, 0.01, 0.0, 0.09, 0.10]
     * Normalise.array([5,1,0,9,10], 0, 100);
     * ```
     *
     * Return values are clamped to always be 0-1, inclusive.
     *
     * @param values Values
     * @param minForced If provided, this will be min value used
     * @param maxForced If provided, this will be the max value used
     */
    export const array: (values: readonly number[], minForced?: number, maxForced?: number) => number[];
}
declare module "collections/Interfaces" {
    import { SimpleEventEmitter } from "Events";
    import { ToString, IsEqual } from "Util";
    export type ArrayKeys<K, V> = ReadonlyArray<readonly [key: K, value: V]>;
    export type ObjKeys<K, V> = ReadonlyArray<{
        readonly key: K;
        readonly value: V;
    }>;
    export type EitherKey<K, V> = ArrayKeys<K, V> | ObjKeys<K, V>;
    export type MapSetOpts<V> = MapMultiOpts<V> & {
        readonly hash: ToString<V>;
    };
    export type MapCircularOpts<V> = MapMultiOpts<V> & {
        readonly capacity: number;
    };
    /**
     * @private
     */
    export type MultiValue<V, M> = Readonly<{
        get name(): string;
        has(source: M, value: V): boolean;
        add(destination: M | undefined, values: ReadonlyArray<V>): M;
        toArray(source: M): ReadonlyArray<V> | undefined;
        find(source: M, predicate: (v: V) => boolean): V | unknown;
        filter(source: M, predicate: (v: V) => boolean): Iterable<V>;
        without(source: M, value: V): ReadonlyArray<V>;
        count(source: M): number;
    }>;
    export type MapMultiOpts<V> = {
        /**
         * Returns a group for values added via `addValue`. Eg. maybe you want to
         * group values in the shape `{name: 'Samantha' city: 'Copenhagen'}` by city:
         *
         * ```
         * const opts = {
         *  groupBy: (v) => v.city
         * }
         * ```
         *
         * @type {(ToString<V>|undefined)}
         */
        readonly groupBy?: ToString<V> | undefined;
    };
    export type MapArrayOpts<V> = MapMultiOpts<V> & {
        readonly comparer?: IsEqual<V>;
        readonly toString?: ToString<V>;
    };
    export type ValueSetEventMap<V> = {
        readonly add: {
            readonly value: V;
            readonly updated: boolean;
        };
        readonly clear: boolean;
        readonly delete: V;
    };
    export type DiscardPolicy = `older` | `newer` | `additions`;
    /**
     * Queue (immutable). See also {@link QueueMutable}.
     *
     * Queues are useful if you want to treat 'older' or 'newer'
     * items differently. _Enqueing_ adds items at the back of the queue, while
     * _dequeing_ removes items from the front (ie. the oldest).
     *
     * ```js
     * let q = queue();           // Create
     * q = q.enqueue(`a`, `b`);   // Add two strings
     * const front = q.peek;      // `a` is at the front of queue (oldest)
     * q = q.dequeue();           // q now just consists of `b`
     * ```
     * @example Cap size to 5 items, throwing away newest items already in queue.
     * ```js
     * const q = queue({capacity: 5, discardPolicy: `newer`});
     * ```
     *
     */
    export interface Queue<V> {
        /**
         * Enumerates queue from back-to-front
         *
        */
        forEach(fn: (v: V) => void): void;
        /**
         * Enumerates queue from front-to-back
         * @param fn
         */
        forEachFromFront(fn: (v: V) => void): void;
        /**
         * Returns a new queue with items added
         * @param toAdd Items to add
         */
        enqueue(...toAdd: ReadonlyArray<V>): Queue<V>;
        /**
         * Dequeues (removes oldest item / item at front of queue).
         * Use {@link peek} to get item that will be removed.
         *
         * @returns Queue with item removed
         */
        dequeue(): Queue<V>;
        /**
         * Returns true if queue is empty
         */
        get isEmpty(): boolean;
        /**
       * Is queue full? Returns _false_ if no capacity has been set
       */
        get isFull(): boolean;
        /**
         * Number of items in queue
         */
        get length(): number;
        /**
         * Returns front of queue (oldest item), or _undefined_ if queue is empty
         */
        get peek(): V | undefined;
        /**
       * Data in queue as an array
       */
        get data(): readonly V[];
    }
    /**
     * Queue (mutable). See also {@link Queue} for the immutable version.
     *
     * Queues are useful if you want to treat 'older' or 'newer'
     * items differently. _Enqueing_ adds items at the back of the queue, while
     * _dequeing_ removes items from the front (ie. the oldest).
     *
     * ```js
     * const q = queue();       // Create
     * q.enqueue(`a`, `b`);     // Add two strings
     * const front = q.dequeue();  // `a` is at the front of queue (oldest)
     * ```
     *
     * @example Cap size to 5 items, throwing away newest items already in queue.
     * ```js
     * const q = queue({capacity: 5, discardPolicy: `newer`});
     * ```
     *
     */
    export interface QueueMutable<V> {
        /**
         * Returns true if queue is empty
         */
        get isEmpty(): boolean;
        /**
         * Dequeues (removes oldest item / item at front of queue)
         * @returns Item, or undefined if queue is empty
         */
        readonly dequeue: () => V | undefined;
        /**
         * Enqueues (adds items to back of queue).
         * If a capacity is set, not all items might be added.
         * @returns How many items were added
         */
        readonly enqueue: (...toAdd: ReadonlyArray<V>) => number;
        /**
       * Returns front of queue (oldest item), or _undefined_ if queue is empty
       */
        get peek(): V | undefined;
        /**
         * Number of items in queue
         */
        get length(): number;
        /**
         * Is queue full? Returns _false_ if no capacity has been set
         */
        get isFull(): boolean;
        /**
         * Data in queue as an array
         */
        get data(): readonly V[];
    }
    /**
     * A Set which stores unique items determined by their value, rather
     * than object reference (unlike the default JS Set). Create with {@link setMutable}. Mutable.
     *
     * By default the `JSON.stringify()` representation is considered the 'key' for an object.
     * Pass in a function to `setMutable` to define your own way of creating keys for values. The principle should
     * be that objects that you consider identical should have the same string key value.
     *
     * SetMutable fires `add`, `clear` and `delete` events.
     *
     * @example Overview of functions
     * ```js
     * const s = setMutable();
     * s.add(item);    // Add one or more items. Items with same key are overriden.
     * s.has(item);    // Returns true if item value is present
     * s.clear();      // Remove everything
     * s.delete(item); // Delete item by value
     * s.toArray();    // Returns values as an array
     * s.values();     // Returns an iterator over values
     * ```
     *
     * @example Example usage
     * ```js
     * // Data to add
     * const people = [
     *  {name: `Barry`, city: `London`}
     *  {name: `Sally`, city: `Bristol`}
     * ];
     *
     * // Create a set, defining how keys will be generated
     * const set = setMutable(person => {
     *    // Key person objects by name and city.
     *    // ie. Generated keys will be: `Barry-London`, `Sally-Bristol`
     *    return `${person.name}-${person.city}`
     * });
     *
     * // Add list
     * set.add(...people);
     *
     * // Demo:
     * set.has({name:`Barry`, city:`Manchester`})); // False, key is different (Barry-Manchester)
     * set.has({name:`Barry`, city:`London`}));     // True, we have Barry-London as a key
     * set.has(people[1]);   // True, key of object is found (Sally-Bristol)
     * ```
     *
     * @example Events
     * ```js
     * set.addEventListener(`add`, ev => {
     *  console.log(`New item added: ${ev.value}`);
     * });
     * ```
     *
     * @template V Type of data stored
     */
    export interface SetMutable<V> extends SimpleEventEmitter<ValueSetEventMap<V>> {
        /**
         * Add `values` to set.
         * Corresponding keys will be generated according to the
         * function provided to `setMutable`, or `JSON.stringify` by default.
         * @param v Value(s) to add
         */
        add(...values: ReadonlyArray<V>): void;
        /**
         * Iterate over values
         * ```js
         * for (let value of set.values()) {
         *    // use value...
         * }
         * ```
         */
        values(): IterableIterator<V>;
        /**
         * Clears set
         */
        clear(): void;
        /**
         * Deletes specified value, if present.
         * @param value
         * @returns True if value was found
         */
        delete(value: V): boolean;
        /**
         * Returns _true_ if _value_ is contained in Set
         * @param v
         */
        has(value: V): boolean;
        /**
         * Returns an array of values
         */
        toArray(): V[];
    }
    /**
     * Like a `Map` but multiple values can be stored for each key.
     * Duplicate values can be added to the same or even a several keys.
     *
     * Three pre-defined MapOf's are available:
     * * {@link mapArray} - Map of arrays
     * * {@link mapSet} - Map of unique items
     * * {@link mapCircularMutable} - Hold a limited set of values per key
     *
     * Adding
     * ```js
     * // Add one or more values using the predefined key function to generate a key
     * map.addValue(value1, value2, ...);
     * // Add one or more values under a specified key
     * map.addKeyedValues(key, value1, value2, ...);
     * ```
     *
     * Finding/accessing
     * ```js
     * // Returns all values stored under key
     * map.get(key);
     * // Returns the first key where value is found, or _undefined_ if not found
     * map.findKeyForValue(value);
     * // Returns _true_  if value is stored under key
     * map.hasKeyValue(key, value);
     * // Returns _true_ if map contains key
     * map.has(key);
     * ```
     *
     * Removing
     * ```js
     * // Removes everything
     * map.clear();
     * // Delete values under key. Returns _true_ if key was found.
     * map.delete(key);
     * // Deletes specified value under key. Returns _true_ if found.
     * map.deleteKeyValue(key, value);
     * ```
     *
     * Metadata about the map:
     * ```js
     * map.isEmpty;         // True/false
     * map.lengthMax;       // Largest count of items under any key
     * map.count(key);      // Count of items stored under key, or 0 if key is not present.
     * map.keys();          // Returns a string array of keys
     * map.keysAndCounts(); // Returns an array of [string,number] for all keys and number of values for each key
     * map.debugString();   // Returns a human-readable string dump of the contents
     * ```
     *
     * Events can be listened to via `addEventListener`
     * * `addedKey`, `addedValue` - when a new key is added, or when a new value is added
     * * `clear` - when contents are cleared
     * * `deleteKey` - when a key is deleted
     *
     * @example Event example
     * ```js
     * map.addEventLister(`addedKey`, ev => {
     *  console.log(`New key ${evt.key} seen.`);
     * });
     * ```
     *
     * @template V Values stored under keys
     * @template M Type of data structure managing values
     */
    export interface MapOfMutable<V, M> extends SimpleEventEmitter<MapArrayEvents<V>> {
        /**
         * Returns the type name. For in-built implementations, it will be one of: array, set or circular
         */
        get typeName(): string;
        /**
         * Returns a human-readable rendering of contents
         */
        debugString(): string;
        /**
         * Returns list of keys
         */
        keys(): readonly string[];
        /**
         * Returns a list of all keys and count of items therein
         */
        keysAndCounts(): Array<[string, number]>;
        /**
         * Returns items under `key` or undefined if `key` is not found
         * @param key
         */
        get(key: string): ReadonlyArray<V> | undefined;
        /**
         * Returns the object managing values under the specified `key`
         * @private
         * @param key
         */
        getSource(key: string): M | undefined;
        /**
         * Returns _true_ if `value` is stored under `key`.
         *
         * @param key Key
         * @param value Value
         */
        hasKeyValue(key: string, value: V): boolean;
        /**
         * Returns _true_ if `key` is stored
         * @param key
         */
        has(key: string): boolean;
        /**
       * Adds several `values` under the same `key`. Duplicate values are permitted, depending on implementation.
       * @param key
       * @param values
       */
        addKeyedValues(key: string, ...values: ReadonlyArray<V>): void;
        /**
         * Adds a value, automatically extracting a key via the
         * `groupBy` function assigned in the constructor options.
         * @param values Adds several values
         */
        addValue(...values: ReadonlyArray<V>): void;
        /**
         * Clears the map
         */
        clear(): void;
        /**
         * Deletes all values under `key` that match `value`.
         * @param key Key
         * @param value Value
         */
        deleteKeyValue(key: string, value: V): boolean;
        /**
         * Deletes all values stored under `key`. Returns _true_ if key was found
         * @param key
         */
        delete(key: string): boolean;
        /**
         * Returns true if the map is empty
         */
        get isEmpty(): boolean;
        /**
         * REturns the length of the longest child item
         */
        get lengthMax(): number;
        /**
         * Finds the first key where value is stored.
         * Note: value could be stored in multiple keys
         * @param value Value to seek
         * @returns Key, or undefined if value not found
         */
        findKeyForValue(value: V): string | undefined;
        /**
         * Returns the number of values stored under `key`, or _0_ if `key` is not present.
         * @param key Key
         */
        count(key: string): number;
    }
    export type MapArrayEvents<V> = {
        readonly addedValues: {
            readonly values: ReadonlyArray<V>;
        };
        readonly addedKey: {
            readonly key: string;
        };
        readonly clear: boolean;
        readonly deleteKey: {
            readonly key: string;
        };
    };
    /**
     * The circular array is immutable. It keeps up to `capacity` items.
     * Old items are overridden with new items.
     *
     * `CircularArray` extends the regular JS array. Only use `add` to change the array if you want
     * to keep the `CircularArray` behaviour.
     * @example
     * ```js
     * let a = circularArray(10);
     * a = a.add(`hello`); // Because it's immutable, capture the return result of `add`
     * a.isFull;  // True if circular array is full
     * a.pointer; // The current position in array it will write to
     * ```
     * @class CircularArray
     * @extends {Array}
     * @template V
     */
    export interface CircularArray<V> extends Array<V> {
        /**
         * Returns true if the array has filled to capacity and is now
         * recycling array indexes.
         */
        get isFull(): boolean;
        /**
         * Returns a new Circular with item added
         *
         * Items are added at `pointer` position, which automatically cycles through available array indexes.
         *
         * @param {V} thing Thing to add
         * @returns {Circular<V>} Circular with item added
         * @memberof Circular
         */
        add(v: V): CircularArray<V>;
        get length(): number;
        /**
         * Returns the current add position of array.
         */
        get pointer(): number;
    }
    /**
     * A simple mutable map of arrays, without events. It can store multiple values
     * under the same key.
     *
     * For a fancier approaches, consider {@link mapArray}, {@link mapCircularMutable} or {@link mapSet}.
     *
     * @example
     * ```js
     * const m = simpleMapArrayMutable();
     * m.add(`hello`, 1, 2, 3); // Adds numbers under key `hello`
     * m.delete(`hello`);       // Deletes everything under `hello`
     *
     * const hellos = m.get(`hello`); // Get list of items under `hello`
     * ```
     *
     * @template V Type of items
     */
    export interface SimpleMapArrayMutable<V> {
        /**
         * Adds `values` under specified `key`
         * @param key
         * @param values
         */
        add(key: string, ...values: ReadonlyArray<V>): void;
        /**
         * Get items at key. Returns _undefined_ if key does not exist
         * @param key
         */
        get(key: string): ReadonlyArray<V> | undefined;
        /**
         * Deletes the specified `value` under `key`. Returns true if found.
         * @param key
         * @param value
         */
        delete(key: string, value: V): boolean;
        /**
         * Removes all data
         */
        clear(): void;
        keys(): IterableIterator<string>;
    }
    /**
     * An immutable map. Rather than changing the map, functions like `add` and `delete`
     * return a new map reference which must be captured.
     *
     * Immutable data is useful because as it gets passed around your code, it never
     * changes from underneath you. You have what you have.
     *
     * @example
     * ```js
     * let m = map(); // Create
     * let m2 = m.set(`hello`, `samantha`);
     * // m is still empty, only m2 contains a value.
     * ```
     *
     * @template K Type of map keys. Typically `string`
     * @template V Type of stored values
     */
    export interface MapImmutable<K, V> {
        /**
         * Adds one or more items, returning the changed map.
         *
         * Can add items in the form of `[key,value]` or `{key, value}`.
         * @example These all produce the same result
         * ```js
         * map.set(`hello`, `samantha`);
         * map.add([`hello`, `samantha`]);
         * map.add({key: `hello`, value: `samantha`})
         * ```
         * @param itemsToAdd
         */
        add(...itemsToAdd: EitherKey<K, V>): MapImmutable<K, V>;
        /**
         * Deletes an item by key, returning the changed map
         * @param key
         */
        delete(key: K): MapImmutable<K, V>;
        /**
         * Returns an empty map
         */
        clear(): MapImmutable<K, V>;
        /**
         * Returns an item by key, or _undefined_ if not found
         * @example
         * ```js
         * const item = map.get(`hello`);
         * ```
         * @param key
         */
        get(key: K): V | undefined;
        /**
         * Returns _true_ if map contains `key`
         * @example
         * ```js
         * if (map.has(`hello`)) ...
         * ```
         * @param key
         */
        has(key: K): boolean;
        /**
         * Returns _true_ if map is empty
         */
        isEmpty(): boolean;
        /**
         * Iterates over entries (in the form of [key,value])
         *
         * @example
         * ```js
         * for (const [key, value] of map.entries()) {
         *  // Use key, value...
         * }
         * ```
         */
        entries(): IterableIterator<readonly [K, V]>;
    }
    /**
     * A mutable map.
     *
     * It is a wrapper around the in-built Map type, but adds roughly the same API as {@link MapImmutable}.
     *
     * @template K Type of map keys. Typically `string`
     * @template V Type of stored values
     */
    export interface MapMutable<K, V> {
        /**
         * Adds one or more items to map
         *
         * Can add items in the form of [key,value] or `{key, value}`.
         * @example These all produce the same result
         * ```js
         * map.set(`hello`, `samantha`);
         * map.add([`hello`, `samantha`]);
         * map.add({key: `hello`, value: `samantha`})
         * ```
         * @param itemsToAdd
         * @param itemsToAdd
         */
        add(...itemsToAdd: EitherKey<K, V>): void;
        /**
         * Sets a value to a specified key
         * @param key
         * @param value
         */
        set(key: K, value: V): void;
        /**
         * Deletes an item by key
         * @param key
         */
        delete(key: K): void;
        /**
         * Clears map
         */
        clear(): void;
        /**
         * Gets an item by key
         * @example
         * ```js
         * const item = map.get(`hello`);
         * ```
         * @param key
         */
        get(key: K): V | undefined;
        /**
         * Returns _true_ if map contains key
         * @example
         * ```js
         * if (map.has(`hello`)) ...
         * ```
         * @param key
         */
        has(key: K): boolean;
        /**
         * Returns _true_ if map is empty
         */
        isEmpty(): boolean;
        /**
         * Iterates over entries (consisting of [key,value])
         * @example
         * ```js
         * for (const [key, value] of map.entries()) {
         *  // Use key, value...
         * }
         * ```
         */
        entries(): IterableIterator<readonly [K, V]>;
    }
    /**
     * Stack (mutable)
     *
     * @example Overview
     * ```
     * stack.push(item); // Add one or more items to the top of the stack
     * stack.pop(); // Removes and retiurns the item at the top of the stack (ie the newest thing)
     * stack.peek; // Return what is at the top of the stack or undefined if empty
     * stack.isEmpty/.isFull;
     * stack.length; // How many items in stack
     * stack.data; // Get the underlying array
     * ```
     *
     * @example
     * ```
     * const sanga = new MutableStack();
     * sanga.push(`bread`, `tomato`, `cheese`);
     * sanga.peek;  // `cheese`
     * sanga.pop(); // removes `cheese`
     * sanga.peek;  // `tomato`
     * sanga.push(`lettuce`, `cheese`); // Stack is now [`bread`, `tomato`, `lettuce`, `cheese`]
     * ```
     *
     * Stack can also be created from the basis of an existing array. First index of array will be the bottom of the stack.
     * @template V
     */
    export interface StackMutable<V> extends StackBase<V> {
        /**
         * Add items to the 'top' of the stack.
         *
         * @param toAdd Items to add.
         * @returns How many items were added
         */
        push(...toAdd: ReadonlyArray<V>): number;
        /**
         * Remove and return item from the top of the stack, or _undefined_ if empty.
         * If you just want to find out what's at the top, use {@link peek}.
         */
        pop(): V | undefined;
    }
    /**
     * Stack (immutable)
     *
     * @example Overview
     * ```js
     * stack.push(item); // Return a new stack with item(s) added
     * stack.pop();      // Return a new stack with top-most item removed (ie. newest)
     * stack.peek;       // Return what is at the top of the stack or undefined if empty
     * stack.isEmpty;
     * stack.isFull;
     * stack.length;     // How many items in stack
     * stack.data;       // Get the underlying array
     * ```
     *
     * @example
     * ```js
     * let sanga = new Stack();
     * sanga = sanga.push(`bread`, `tomato`, `cheese`);
     * sanga.peek;  // `cheese`
     * sanga = sanga.pop(); // removes `cheese`
     * sanga.peek;  // `tomato`
     * const sangaAlt = sanga.push(`lettuce`, `cheese`); // sanga stays [`bread`, `tomato`], while sangaAlt is [`bread`, `tomato`, `lettuce`, `cheese`]
     * ```
     *
     * Stack can also be created from the basis of an existing array. First index of array will be the bottom of the stack.
     * @class Stack
     * @template V
     */
    export interface Stack<V> extends StackBase<V> {
        push(...toAdd: ReadonlyArray<V>): Stack<V>;
        pop(): Stack<V>;
    }
    export interface StackBase<V> {
        /**
         * Enumerates stack from bottom-to-top
         *
         */
        forEach(fn: (v: V) => void): void;
        /**
         * Enumerates stack from top-to-bottom
         * @param fn
         */
        forEachFromTop(fn: (v: V) => void): void;
        get data(): readonly V[];
        /**
          * _True_ if stack is empty
          */
        get isEmpty(): boolean;
        /**
         * _True_ if stack is at its capacity. _False_ if not, or if there is no capacity.
         */
        get isFull(): boolean;
        /**
         * Get the item at the top of the stack without removing it (like `pop` would do)
         * @returns Item at the top of the stack, or _undefined_ if empty.
         */
        get peek(): V | undefined;
        /**
         * Number of items in stack
         */
        get length(): number;
    }
}
declare module "collections/SimpleMapArray" {
    import { SimpleMapArrayMutable } from "collections/Interfaces";
    /**
     * A simple mutable map of arrays, without events. It can store multiple values
     * under the same key.
     *
     * For a fancier approaches, consider {@link mapArray}, {@link mapCircularMutable} or {@link mapSet}.
     *
     * @example
     * ```js
     * const m = simpleMapArrayMutable();
     * m.add(`hello`, 1, 2, 3); // Adds numbers under key `hello`
     * m.delete(`hello`);       // Deletes everything under `hello`
     *
     * const hellos = m.get(`hello`); // Get list of items under `hello`
     * ```
     *
     * @template V Type of items
     * @returns New instance
     */
    export const simpleMapArrayMutable: <V>() => SimpleMapArrayMutable<V>;
}
declare module "Events" {
    export type Listener<Events> = (ev: unknown, sender: SimpleEventEmitter<Events>) => void;
    export interface ISimpleEventEmitter<Events> {
        addEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
        removeEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
    }
    export class SimpleEventEmitter<Events> implements ISimpleEventEmitter<Events> {
        #private;
        /**
         * Fire event
         * @private
         * @param type Type of event
         * @param args Arguments for event
         * @returns
         */
        protected fireEvent<K extends keyof Events>(type: K, args: Events[K]): void;
        /**
         * Adds event listener
         *
         * @template K
         * @param {K} type
         * @param {Listener<Events>} listener
         * @memberof SimpleEventEmitter
         */
        addEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
        /**
         * Remove event listener
         *
         * @param {Listener<Events>} listener
         * @memberof SimpleEventEmitter
         */
        removeEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
        /**
         * Clear all event listeners
         * @private
         * @memberof SimpleEventEmitter
         */
        clearEventListeners(): void;
    }
}
declare module "KeyValue" {
    export type Primitive = string | number;
    export type KeyValue = readonly [key: string, value: Primitive];
    export const byValueString: (reverse?: boolean) => import("fp-ts/Ord").Ord<KeyValue>;
    export const sortByKey: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
    export const sortByValueString: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
    export const sortByValueNumber: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
    export type SortingFn = (data: KeyValue[]) => KeyValue[];
    export const getSorter: (sortStyle: `value` | `valueReverse` | `key` | `keyReverse`) => <A extends KeyValue>(as: A[]) => A[];
    export const minMaxAvg: (entries: readonly KeyValue[], conversionFn?: ((v: KeyValue) => number) | undefined) => import("collections/NumericArrays").MinMaxAvgTotal;
}
declare module "geometry/Path" {
    import { Rects, Points } from "geometry/index";
    export type Path = {
        length(): number;
        /**
           * Returns a point at a relative (0.0-1.0) position along the path
           *
           * @param {number} t Relative position (0.0-1.0)
           * @returns {Point} Point
           */
        interpolate(t: number): Points.Point;
        bbox(): Rects.RectPositioned;
        toString(): string;
        toSvgString(): readonly string[];
        readonly kind: `compound` | `elliptical` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
    };
    /**
     * Return the start point of a path
     *
     * @param path
     * @return Point
     */
    export const getStart: (path: Path) => Points.Point;
    /**
     * Return the end point of a path
     *
     * @param path
     * @return Point
     */
    export const getEnd: (path: Path) => Points.Point;
    export type WithBeziers = {
        getBeziers(): readonly Path[];
    };
}
declare module "collections/CircularArray" {
    import { CircularArray } from "collections/Interfaces";
    /**
     * Returns a new circular array. Immutable. A circular array only keeps up to `capacity` items.
     * Old items are overridden with new items.
     *
     * `CircularArray` extends the regular JS array. Only use `add` to change the array if you want
     * to keep the `CircularArray` behaviour.
     *
     * @example Basic functions
     * ```js
     * let a = circularArray(10);
     * a = a.add(`hello`);  // Because it's immutable, capture the return result of `add`
     * a.isFull;            // True if circular array is full
     * a.pointer;           // The current position in array it will write to
     * ```
     *
     * Since it extends the regular JS array, you can access items as usual:
     * @example Accessing
     * ```js
     * let a = circularArray(10);
     * ... add some stuff ..
     * a.forEach(item => console.log(item));
     * ```
     * @param capacity Maximum capacity before recycling array entries
     * @return Circular array
     */
    export const circularArray: <V>(capacity: number) => CircularArray<V>;
}
declare module "collections/MapMultiMutable" {
    import { SimpleEventEmitter } from "Events";
    import { ToString } from "Util";
    import { CircularArray, MapArrayEvents, MapArrayOpts, MapCircularOpts, MapMultiOpts, MapOfMutable, MapSetOpts, MultiValue } from "collections/Interfaces";
    /**
     * @internal
     */
    export class MapOfMutableImpl<V, M> extends SimpleEventEmitter<MapArrayEvents<V>> {
        #private;
        readonly groupBy: ToString<V>;
        readonly type: MultiValue<V, M>;
        constructor(type: MultiValue<V, M>, opts?: MapMultiOpts<V>);
        /**
         * Returns the type name. For in-built implementations, it will be one of: array, set or circular
         */
        get typeName(): string;
        /**
         * Returns the length of the longest child list
         */
        get lengthMax(): number;
        debugString(): string;
        get isEmpty(): boolean;
        clear(): void;
        addKeyedValues(key: string, ...values: ReadonlyArray<V>): void;
        addValue(...values: ReadonlyArray<V>): void;
        hasKeyValue(key: string, value: V): boolean;
        has(key: string): boolean;
        deleteKeyValue(key: string, value: V): boolean;
        delete(key: string): boolean;
        findKeyForValue(value: V): string | undefined;
        count(key: string): number;
        /**
         * Returns the array of values stored under `key`
         * or undefined if key does not exist
         */
        get(key: string): readonly V[] | undefined;
        getSource(key: string): M | undefined;
        keys(): string[];
        keysAndCounts(): Array<[string, number]>;
        merge(other: MapOfMutable<V, M>): void;
    }
    /**
     * Returns a {@link MapOfMutable} to allow storing multiple values under a key, unlike a regular Map.
     * @example
     * ```js
     * const map = mapArray();
     * map.add(`hello`, [1,2,3,4]); // Adds series of numbers under key `hello`
     *
     * const hello = map.get(`hello`); // Get back values
     * ```
     *
     * Takes options:
     * * `comparer`: {@link Util.IsEqual}
     * * `toString`: {@link Util.ToString}
     *
     * A custom {@link Util.ToString} function can be provided which is used when checking value equality (`has`, `without`)
     * ```js
     * const map = mapArray({toString:(v) => v.name}); // Compare values based on their `name` field;
     * ```
     *
     * Alternatively, a {@link Util.IsEqual} function can be used:
     * ```js
     * const map = mapArray({comparer: (a, b) => a.name === b.name });
     * ```
     * @param opts
     * @template V Data type of items
     * @returns {@link MapOfMutable}
     */
    export const mapArray: <V>(opts?: MapArrayOpts<V>) => MapOfMutable<V, readonly V[]>;
    /**
     * Returns a {@link MapOfMutable} that uses a set to hold values.
     * This means that only unique values are stored under each key. By default it
     * uses the JSON representation to compare items.
     *
     * Options: `{ hash: toStringFn } }`
     *
     * `hash` is a {@link Util.ToString} function: `(object) => string`. By default it uses
     * `JSON.stringify`.
     *
     * @example Only storing the newest three items per key
     * ```js
     * const map = mapSetMutable();
     * map.add(`hello`, [1, 2, 3, 1, 2, 3]);
     * const hello = map.get(`hello`); // [1, 2, 3]
     * ```
     *
     * @example
     * ```js
     * const hash = (v) => v.name; // Use name as the key
     * const map = mapSetMutable(hash);
     * map.add(`hello`, {age:40, name: `Mary`});
     * map.add(`hello`, {age:29, name: `Mary`}); // Value ignored as same name exists
     * ```
     * @param opts
     * @returns
     */
    export const mapSet: <V>(opts?: MapSetOpts<V> | undefined) => MapOfMutable<V, ReadonlyMap<string, V>>;
    /**
     * Returns a {@link MapOfMutable} that uses a {@link CircularArray} to hold values. Mutable.
     * This means that the number of values stored under each key will be limited to the defined
     * capacity.
     *
     * Required option:
     * * `capacity`: how many items to hold
     *
     * @example Only store the most recent three items per key
     * ```js
     * const map = mapCircularMutable({capacity: 3});
     * map.add(`hello`, [1, 2, 3, 4, 5]);
     * const hello = map.get(`hello`); // [3, 4, 5]
     * ```
     *
     *
     * @param opts
     * @returns
     */
    export const mapCircularMutable: <V>(opts: MapCircularOpts<V>) => MapOfMutable<V, CircularArray<V>>;
}
declare module "collections/Set" {
    import { ToString } from "Util";
    import { SetMutable } from "collections/Interfaces";
    /**
     * Creates a {@link SetMutable}.
     * @param keyString Function that produces a key for items. If unspecified uses JSON.stringify
     * @returns
     */
    export const setMutable: <V>(keyString?: ToString<V> | undefined) => SetMutable<V>;
}
declare module "collections/Stack" {
    import { DiscardPolicy, Stack } from "collections/Interfaces";
    import { StackMutable } from "collections/Interfaces";
    export type StackOpts = {
        readonly debug?: boolean;
        readonly capacity?: number;
        readonly discardPolicy?: DiscardPolicy;
    };
    /**
     * Returns a stack. Immutable. Use {@link stackMutable} for a mutable alternative.
     *
     * The basic usage is `push`/`pop` to add/remove, returning the modified stack. Use the
     * property `peek` to see what's on top.
     *
     * @example Basic usage
     * ```js
     * // Create
     * let s = stack();
     * // Add one or more items
     * s = s.push(1, 2, 3, 4);
     * // See what's at the top of the stack
     * s.peek;      // 4
     *
     * // Remove from the top of the stack, returning
     * // a new stack without item
     * s = s.pop();
     * s.peek;        // 3
     * ```
     * @param opts Options
     * @param startingItems List of items to add to stack. Items will be pushed 'left to right', ie array index 0 will be bottom of the stack.
     */
    export const stack: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => Stack<V>;
    /**
     * Creates a stack. Mutable. Use {@link stack} for an immutable alternative.
     *
     * @example Basic usage
     * ```js
     * // Create
     * const s = stackMutable();
     * // Add one or more items
     * s.push(1, 2, 3, 4);
     *
     * // See what's on top
     * s.peek;  // 4
     *
     * // Remove the top-most, and return it
     * s.pop();   // 4
     *
     * // Now there's a new top-most element
     * s.peek;  // 3
     * ```
     */
    export const stackMutable: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => StackMutable<V>;
}
declare module "collections/Queue" {
    import { QueueMutable, Queue, DiscardPolicy } from "collections/Interfaces";
    /**
     * Queue options.
     *
     * @example Cap size to 5 items, throwing away newest items already in queue.
     * ```js
     * const q = queue({capacity: 5, discardPolicy: `newer`});
     * ```
     */
    export type QueueOpts = {
        /**
         * @private
         */
        readonly debug?: boolean;
        /**
         * Capcity limit
         */
        readonly capacity?: number;
        /**
         * Default is `additions`, meaning new items are discarded.
         *
         * `older`: Removes items front of the queue (ie older items are discarded)
         *
         * `newer`: Remove from rear of queue to make space for new items (ie newer items are discarded)
         *
         * `additions`: Only adds new items that there are room for (ie. brand new items are discarded)
         *
         */
        readonly discardPolicy?: DiscardPolicy;
    };
    /**
     * Returns an immutable queue. Queues are useful if you want to treat 'older' or 'newer'
     * items differently. _Enqueing_ adds items at the back of the queue, while
     * _dequeing_ removes items from the front (ie. the oldest).
     *
     * ```js
     * let q = queue();           // Create
     * q = q.enqueue(`a`, `b`);   // Add two strings
     * const front = q.peek();    // `a` is at the front of queue (oldest)
     * q = q.dequeue();           // q now just consists of `b`
     * ```
     * @example Cap size to 5 items, throwing away newest items already in queue.
     * ```js
     * const q = queue({capacity: 5, discardPolicy: `newer`});
     * ```
     *
     * @template V Data type of items
     * @param opts
     * @param startingItems Index 0 is the front of the queue
     * @returns A new queue
     */
    export const queue: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => Queue<V>;
    /**
     * Returns a mutable queue. Queues are useful if you want to treat 'older' or 'newer'
     * items differently. _Enqueing_ adds items at the back of the queue, while
     * _dequeing_ removes items from the front (ie. the oldest).
     *
     * ```js
     * const q = queue();       // Create
     * q.enqueue(`a`, `b`);     // Add two strings
     * const front = q.dequeue();  // `a` is at the front of queue (oldest)
     * ```
     *
     * @example Cap size to 5 items, throwing away newest items already in queue.
     * ```js
     * const q = queue({capacity: 5, discardPolicy: `newer`});
     * ```
     *
     * @template V Data type of items
     * @param opts
     * @param startingItems Items are added in array order. So first item will be at the front of the queue.
     */
    export const queueMutable: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => QueueMutable<V>;
}
declare module "collections/MapImmutable" {
    import { EitherKey, MapImmutable } from "collections/Interfaces";
    /**
     * Returns true if map contains key
     *
     * @example
     * ```js
     * if (has(map, `London`)) ...
     * ```
     * @param map Map to search
     * @param key Key to find
     * @returns True if map contains key
     */
    export const has: <K, V>(map: ReadonlyMap<K, V>, key: K) => boolean;
    /**
     * Adds data to a map, returning the new map.
     *
     * Can add items in the form of [key,value] or {key, value}.
     * @example These all produce the same result
     * ```js
     * map.set(`hello`, `samantha`);
     * map.add([`hello`, `samantha`]);
     * map.add({key: `hello`, value: `samantha`})
     * ```
     * @param map Initial data
     * @param data One or more data to add in the form of [key,value] or {key, value}
     * @returns New map with data added
     */
    export const add: <K, V>(map: ReadonlyMap<K, V>, ...data: EitherKey<K, V>) => ReadonlyMap<K, V>;
    /**
     * Sets data in a copy of the initial map
     * @param map Initial map
     * @param key Key
     * @param value Value to  set
     * @returns New map with data set
     */
    export const set: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V) => Map<K, V>;
    /**
     * Delete a key from the map, returning a new map
     * @param map Initial data
     * @param key
     * @returns New map with data deleted
     */
    export const del: <K, V>(map: ReadonlyMap<K, V>, key: K) => ReadonlyMap<K, V>;
    /**
     * Returns an {@link MapImmutable}.
     * Use {@link mapMutable} as a mutable alternatve.
     *
     * @example Basic usage
     * ```js
     * // Creating
     * let m = map();
     * // Add
     * m = m.add(["name", "sally"]);
     * // Recall
     * m.get("name");
     * ```
     *
     * @example Enumerating
     * ```js
     * for (const [key, value] of map.entries()) {
     *  console.log(`${key} = ${value}`);
     * }
     * ```
     *
     * @example Overview
     * ```js
     * // Create
     * let m = map();
     * // Add
     * m = m.add(["name" , "sally"]);
     * m.get("name");   // "sally";
     * m.has("age");    // false
     * m.has("name");   // true
     * m.isEmpty;       // false
     * m = m.delete("name");
     * m.entries();     // Iterator of key value pairs
     * ```
     *
     * Since it is immutable, `add()`, `delete()` and `clear()` return a new version with change.
     *
     * @param dataOrMap Optional initial data in the form of an array of `{ key: value }` or `[ key, value ]`
     */
    export const map: <K, V>(dataOrMap?: ReadonlyMap<K, V> | EitherKey<K, V> | undefined) => MapImmutable<K, V>;
}
declare module "collections/MapMutable" {
    import { EitherKey, MapMutable } from "collections/Interfaces";
    /**
     * Returns a {@link MapMutable} (which just wraps the in-built Map)
     * Use {@link map} for the immutable alternative.
     *
     * @example Basic usage
     * ```js
     * const m = mapMutable();
     * // Add one or more entries
     * m.add(["name", "sally"]);
     * // Alternatively:
     * m.set("name", "sally");
     * // Recall
     * m.get("name");           // "sally"
     * m.delete("name");
     * m.isEmpty; // True
     * m.clear();
     * ```
     * @param data Optional initial data in the form of an array of `{ key: value }` or `[ key, value ]`
     */
    export const mapMutable: <K, V>(...data: EitherKey<K, V>) => MapMutable<K, V>;
}
declare module "collections/index" {
    export * from "collections/Interfaces";
    export { mapSet, mapCircularMutable, mapArray } from "collections/MapMultiMutable";
    export { circularArray } from "collections/CircularArray";
    export { simpleMapArrayMutable } from "collections/SimpleMapArray";
    export { setMutable } from "collections/Set";
    export { stack, stackMutable } from "collections/Stack";
    export { queue, queueMutable } from "collections/Queue";
    export { map } from "collections/MapImmutable";
    export { mapMutable } from "collections/MapMutable";
    export { MapOfMutableImpl } from "collections/MapMultiMutable";
    /**
     * Stacks store items in order.
     *
     * Stacks and queues can be helpful when it's necessary to process data in order, but each one has slightly different behaviour.
     *
     * Like a stack of plates, the newest item (on top) is removed
     * before the oldest items (at the bottom). {@link Queues} operate differently, with
     * the oldest items (at the front of the queue) removed before the newest items (at the end of the queue).
     *
     * Create stacks with {@link stack} or {@link stackMutable}. These return a {@link Stack} or {@link StackMutable} respectively.
     *
     * The ixfx implementation allow you to set a capacity limit with three {@link DiscardPolicy |policies} for
     * how items are evicted.
     *
     */
    export * as Stacks from "collections/Stack";
    /**
     * Arrays are a list of data. ixfx provides a number of functions for working with arrays in an immutable manner.
     * This means that the input array is not changed.
     *
     * For arrays of numbers:
     * * {@link average}, {@link max}, {@link min}, {@link total}: Calculate average/max/min/total
     * * {@link averageWeighted}: Calculate average, but applies a weighting function, eg to favour items at beginning of array
     * * {@link minMaxAvg}: Find smallest, largest and average
     * * {@link maxIndex}, {@link minIndex}: Return index of largest/smallest value
     * * {@link dotProduct}: Returns the dot-product between two arrays
     * * {@link weight}: Applies a weighting function to all values based on their index
     *
     * Randomisation
     * * {@link randomIndex}: Return a random array index
     * * {@link randomElement}: Return a random value
     * * {@link randomPluck}: Remove a random element from an array, returning it and the new array
     * * {@link shuffle}: Returns a randomly-sorted copy of arra
     *
     * Finding/accessing
     * * {@link filterBetween}: Same as `Array.filter` but only looks within a specified index range
     * * {@link sample}: Returns a new array with a random sampling of input
     * * {@link areValuesIdentical}: Returns true if all the values in the array are identical
     *
     * Changing the shape
     * * {@link ensureLength}: Returns a copy of array with designated length, either padding it out or truncating as necessary
     * * {@link groupBy}: Groups data into a new Map
     * * {@link remove}: Remove an item by index
     * * {@link without}: Returns an array with specified value omitted
     * * {@link zip}: Groups together elements from several arrays based on their index
     */
    export * as Arrays from "collections/Arrays";
    /**
     * Sets store unique items.
     *
     * ixfx's {@link SetMutable} compares items by value rather than reference, unlike the default JS implementation.
     *
     * Create using {@link setMutable}
     */
    export * as Sets from "collections/Set";
    /**
     * Queues store items in the order in which they are added.
     *
     * Stacks and queues can be helpful when it's necessary to process data in order, but each one has slightly different behaviour.
     *
     * Like lining up at a bakery, the oldest items (at the front of the queue) are removed
     * before the newest items (at the end of the queue). This is different to {@link Stacks},
     * where the newest item (on top) is removed before the oldest items (at the bottom).
     *
     * The ixfx implementations allow you to set a capacity limit with three {@link DiscardPolicy |policies} for
     * how items are evicted.
     *
     * Create queues with {@link queue} or {@link queueMutable}. These return a {@link Queue} or {@link QueueMutable} respectively.
     */
    export * as Queues from "collections/Queue";
    /**
     * Maps associate keys with values. Several helper functions are provided
     * for working with the standard JS Map class.
     *
     * ixfx also includes {@link MapMutable}, {@link MapImmutable}
     *
     * Overview:
     * * {@link getOrGenerate}: Solves a common scenario of wanting a value by a particular key, or generating it if it doesn't exist
     * * {@link filter}: Yields values in map that match a predicate
     * * {@link find}: Finds the first value that matches a predicate, or _undefined_ if nothing found
     * * {@link hasAnyValue}: Searches through all keys, returning true if any occurence of _value_ was found
     *
     * Transformations:
     * * {@link toArray}: Returns the values of the map as an array
     * * {@link mapToArray}: Applies a function to convert a map's values to an array
     * * {@link mapToObj}: Coverts a Map to a plain object, useful for JSON serialising.
     * * {@link mapToObjTransform}: Converts a map to a plain object, but applying a function to values
     * * {@link transformMap}: Like `Array.map`, but for Maps. Useful for generating a map as a transform of an input map.
     * * {@link zipKeyValue}: Given an array of keys and values, combines them together into a map
     */
    export * as Maps from "collections/Map";
}
declare module "geometry/Line" {
    import { Point } from "geometry/Point";
    import { Path } from "geometry/Path";
    import { Rects, Points } from "geometry/index";
    /**
     * A line, which consists of an `a` and `b` {@link Points.Point}.
     */
    export type Line = {
        readonly a: Points.Point;
        readonly b: Points.Point;
    };
    /**
     * A PolyLine, consisting of more than one line.
     */
    export type PolyLine = ReadonlyArray<Line>;
    /**
     * Returns true if `p` is a valid line, containing `a` and `b` Points.
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * Lines.isLine(l);
     * ```
     * @param p Value to check
     * @returns True if a valid line.
     */
    export const isLine: (p: Path | Line | Points.Point) => p is Line;
    /**
     * Returns true if `p` is a {@link PolyLine}, ie. an array of {@link Line}s.
     * Validates all items in array.
     * @param p
     * @returns
     */
    export const isPolyLine: (p: any) => p is PolyLine;
    /**
     * Returns true if the lines have the same value. Note that only
     * the line start and end points are compared. So the lines might
     * be different in other properties, and `equals` will still return
     * true.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const a = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
     * const b = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
     * a === b; // false, because they are different objects
     * Lines.equals(a, b); // true, because they have the same value
     * ```
     * @param {Line} a
     * @param {Line} b
     * @returns {boolean}
     */
    export const equals: (a: Line, b: Line) => boolean;
    /**
     * Applies `fn` to both start and end points.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * // Line 10,10 -> 20,20
     * const line = Lines.fromNumbers(10,10, 20,20);
     *
     * // Applies randomisation to both x and y.
     * const rand = (p) => ({
     *  x: p.x * Math.random(),
     *  y: p.y * Math.random()
     * });
     *
     * // Applies our randomisation function
     * const line2 = apply(line, rand);
     * ```
     * @param line Line
     * @param fn Function that takes a point and returns a point
     * @returns
     */
    export const apply: (line: Line, fn: (p: Points.Point) => Points.Point) => Readonly<Line>;
    /**
     * Throws an exception if:
     * * line is undefined
     * * a or b parameters are missing
     *
     * Does not validate points
     * @param line
     * @param paramName
     */
    export const guard: (line: Line, paramName?: string) => void;
    /**
     * Returns the angle in radians of a line, or two points
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * Lines.angleRadian(line);
     * Lines.angleRadian(ptA, ptB);
     * ```
     * @param lineOrPoint
     * @param b
     * @returns
     */
    export const angleRadian: (lineOrPoint: Line | Points.Point, b?: Points.Point) => number;
    /**
     * Multiplies start and end of line by point.x, point.y.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     *
     * // Line 1,1 -> 10,10
     * const l = Lines.fromNumbers(1, 1, 10, 10);
     * const ll = Lines.multiply(l, {x:2, y:3});
     * // Yields: 2,20 -> 3,30
     * ```
     * @param line
     * @param point
     * @returns
     */
    export const multiply: (line: Line, point: Points.Point) => Line;
    /**
     * Divides both start and end points by given x,y
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     *
     * // Line 1,1 -> 10,10
     * const l = Lines.fromNumbers(1,1,10,10);
     * const ll = Lines.divide(l, {x:2, y:4});
     * // Yields: 0.5,0.25 -> 5,2.5
     * ```
     * @param line
     * @param point
     * @returns
     */
    export const divide: (line: Line, point: Points.Point) => Line;
    /**
     * Adds both start and end points by given x,y
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * // Line 1,1 -> 10,10
     * const l = Lines.fromNumbers(1,1,10,10);
     * const ll = Lines.sum(l, {x:2, y:4});
     * // Yields: 3,5 -> 12,14
     * ```
     * @param line
     * @param point
     * @returns
     */
    export const sum: (line: Line, point: Points.Point) => Line;
    /**
     * Subtracts both start and end points by given x,y
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     *
     * // Line 1,1 -> 10,10
     * const l = Lines.fromNumbers(1,1,10,10);
     * const ll = Lines.subtract(l, {x:2, y:4});
     * // Yields: -1,-3 -> 8,6
     * ```
     * @param line
     * @param point
     * @returns
     */
    export const subtract: (line: Line, point: Points.Point) => Line;
    /**
     * Normalises start and end points by given width and height. Useful
     * for converting an absolutely-defined line to a relative one.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     *
     * // Line 1,1 -> 10,10
     * const l = Lines.fromNumbers(1,1,10,10);
     * const ll = Lines.normaliseByRect(l, 10, 10);
     * // Yields: 0.1,0.1 -> 1,1
     * ```
     * @param line
     * @param width
     * @param height
     * @returns
     */
    export const normaliseByRect: (line: Line, width: number, height: number) => Line;
    /**
     * Returns true if `point` is within `maxRange` of `line`.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const line = Lines.fromNumbers(0,20,20,20);
     * Lines.withinRange(line, {x:0,y:21}, 1); // True
     * ```
     * @param line
     * @param point
     * @param maxRange
     * @returns True if point is within range
     */
    export const withinRange: (line: Line, point: Points.Point, maxRange: number) => boolean;
    /**
     * Returns the length between two points
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * Lines.length(ptA, ptB);
     * ```
     * @param a First point
     * @param b Second point
     * @returns
     */
    export function length(a: Points.Point, b: Points.Point): number;
    /**
     * Returns length of line. If a polyline (array of lines) is provided,
     * it is the sum total that is returned.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * Lines.length(a: {x:0, y:0}, b: {x: 100, y:100});
     * Lines.length(lines);
     * ```
     * @param line Line
     */
    export function length(line: Line | PolyLine): number;
    /**
     * Returns the mid-point of a line (same as `interpolate` with an amount of 0.5)
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * Lines.midpoint(line); // Returns {x, y}
     * ```
     * @param aOrLine
     * @param pointB
     * @returns
     */
    export const midpoint: (aOrLine: Points.Point | Line, pointB?: Points.Point) => Points.Point;
    /**
     * Returns [a,b] points from either a line parameter, or two points.
     * It additionally applies the guardPoint function to ensure validity.
     * This supports function overloading.
     * @ignore
     * @param aOrLine
     * @param b
     * @returns
     */
    export const getPointsParam: (aOrLine: Points.Point | Line, b?: Points.Point) => readonly [Points.Point, Points.Point];
    /**
     * Returns the nearest point on `line` closest to `point`.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const pt = Linesnearest(line, {x:10,y:10});
     * ```
     *
     * If an array of lines is provided, it will be the closest point amongst all the lines
     * @param line Line or array of lines
     * @param point
     * @returns Point `{ x, y }`
     */
    export const nearest: (line: Line | readonly Line[], point: Points.Point) => Points.Point;
    /**
     * Calculates [slope](https://en.wikipedia.org/wiki/Slope) of line.
     *
     * @example
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * Lines.slope(line);
     * Lines.slope(ptA, ptB)
     * ```
     * @param lineOrPoint Line or point. If point is provided, second point must be given too
     * @param b Second point if needed
     * @returns
     */
    export const slope: (lineOrPoint: Line | Points.Point, b?: Points.Point) => number;
    /**
     * Returns a point perpendicular to `line` at a specified `distance`. Use negative
     * distances for the other side of line.
     * ```
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * // Project a point 100 units away from line, at its midpoint.
     * const pt = Lines.perpendicularPoint(line, 100, 0.5);
     * ```
     * @param line Line
     * @param distance Distance from line. Use negatives to flip side
     * @param amount Relative place on line to project point from. 0 projects from A, 0.5 from the middle, 1 from B.
     */
    export const perpendicularPoint: (line: Line, distance: number, amount?: number) => {
        x: number;
        y: number;
    };
    /**
     * Returns a parallel line to `line` at `distance`.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const l = Lines.parallel(line, 10);
     * ```
     * @param line
     * @param distance
     */
    export const parallel: (line: Line, distance: number) => Line;
    /**
     * Scales a line from its midpoint
     *
     * @example Shorten by 50%, anchored at the midpoint
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const l = {
     *  a: {x:50, y:50}, b: {x: 100, y: 90}
     * }
     * const l2 = Lines.scaleFromMidpoint(l, 0.5);
     * ```
     * @param line
     * @param factor
     */
    export const scaleFromMidpoint: (line: Line, factor: number) => Line;
    /**
     * Calculates `y` where `line` intersects `x`.
     * @param line Line to extend
     * @param x Intersection of x-axis.
     */
    export const pointAtX: (line: Line, x: number) => Points.Point;
    /**
     * Returns a line extended from its `a` point by a specified distance
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const line = {a: {x: 0, y:0}, b: {x:10, y:10} }
     * const extended = Lines.extendFromA(line, 2);
     * ```
     * @param line
     * @param distance
     * @return Newly extended line
     */
    export const extendFromA: (line: Line, distance: number) => Line;
    /**
     * Yields every integer point along `line`.
     *
     * @example Basic usage
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const l = { a: {x: 0, y: 0}, b: {x: 100, y: 100} };
     * for (const p of Lines.pointsOf(l)) {
     *  // Do something with point `p`...
     * }
     * ```
     *
     * Some precision is lost as start and end
     * point is also returned as an integer.
     *
     * Uses [Bresenham's line algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm)
     * @param line Line
     */
    export function pointsOf(line: Line): Generator<Points.Point>;
    /**
     * Returns the distance of `point` to the
     * nearest point on `line`.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const d = Lines.distance(line, {x:10,y:10});
     * ```
     *
     * If an array of lines is provided, the shortest distance is returned.
     * @param line Line (or array of lines)
     * @param point Point to check against
     * @returns Distance
     */
    export const distance: (line: Line | ReadonlyArray<Line>, point: Points.Point) => number;
    /**
     * Calculates a point in-between `a` and `b`.
     *
     * If an interpolation amount below 0 or above 1 is given, _and_
     * `allowOverflow_ is true, a point will be returned that is extended
     * past `line`. This is useful for easing functions which might
     * briefly go past the limits.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     *
     * // Get {x,y} at 50% along line
     * Lines.interpolate(0.5, line);
     *
     * // Get {x,y} at 80% between point A and B
     * Lines.interpolate(0.8, ptA, ptB);
     * ```
     * @param amount Relative position, 0 being at a, 0.5 being halfway, 1 being at b
     * @param a Start
     * @param b End
     * @returns Point between a and b
     */
    export function interpolate(amount: number, a: Points.Point, pointB: Points.Point, allowOverflow?: boolean): Points.Point;
    /**
     * Calculates a point in-between `line`'s start and end points.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     *
     * // Get {x, y } at 50% along line
     * Lines.interpolate(0.5, line);
     * ```
     *
     * Any additional properties from `b`  are returned on the result as well.
     * @param amount 0..1
     * @param line Line
     * @param allowOverflow If true, interpolation amount is permitted to exceed 0..1, extending the line
     */
    export function interpolate(amount: number, line: Line, allowOverflow?: boolean): Points.Point;
    /**
     * Returns a string representation of two points
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * console.log(Lines.toString(a, b)));
     * ```
     * @param a
     * @param b
     * @returns
     */
    export function toString(a: Points.Point, b: Points.Point): string;
    /**
     * Returns a string representation of a line
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * Lines.toString(line);
     * ```
     * @param line
     */
    export function toString(line: Line): string;
    /**
     * Returns a line from a basis of coordinates (x1, y1, x2, y2)
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * // Line from 0,1 -> 10,15
     * Lines.fromNumbers(0, 1, 10, 15);
     * ```
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns
     */
    export const fromNumbers: (x1: number, y1: number, x2: number, y2: number) => Line;
    /**
     * Returns an array representation of line: [a.x, a.y, b.x, b.y]
     *
     * See {@link fromFlatArray} to create a line _from_ this representation.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * Lines.toFlatArray(line);
     * Lines.toFlatArray(pointA, pointB);
     * ```
     * @export
     * @param {Point} a
     * @param {Point} b
     * @returns {number[]}
     */
    export const toFlatArray: (a: Points.Point | Line, b: Points.Point) => readonly number[];
    /**
     * Returns an SVG description of line
     * ```
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js';
     * Lines.toSvgString(ptA, ptB);
     * ```
     * @param a
     * @param b
     * @returns
     */
    export const toSvgString: (a: Points.Point, b: Points.Point) => readonly string[];
    /**
     * Returns a line from four numbers [x1,y1,x2,y2].
     *
     * See {@link toFlatArray} to create an array from a line.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const line = Lines.fromFlatArray(...[0, 0, 100, 100]);
     * // line is {a: { x:0, y:0 }, b: { x: 100, y: 100 } }
     * ```
     * @param arr Array in the form [x1,y1,x2,y2]
     * @returns Line
     */
    export const fromFlatArray: (arr: readonly number[]) => Line;
    /**
     * Returns a line from two points
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * // Line from 0,1 to 10,15
     * const line = Lines.fromPoints( { x:0, y:1 }, { x:10, y:15 });
     * // line is: { a: { x: 0, y: 1}, b: { x: 10, y: 15 } };
     * ```
     * @param a Start point
     * @param b End point
     * @returns
     */
    export const fromPoints: (a: Points.Point, b: Points.Point) => Line;
    /**
     * Returns an array of lines that connects provided points. Note that line is not closed.
     *
     * Eg, if points a,b,c are provided, two lines are provided: a->b and b->c.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const lines = Lines.joinPointsToLines(ptA, ptB, ptC);
     * // lines is an array of, well, lines
     * ```
     * @param points
     * @returns
     */
    export const joinPointsToLines: (...points: readonly Points.Point[]) => PolyLine;
    /**
     * Returns a {@link LinePath} from two points
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * const path = Lines.fromPointsToPath(ptA, ptB);
     * ```
     * @param a
     * @param b
     * @returns
     */
    export const fromPointsToPath: (a: Points.Point, b: Points.Point) => LinePath;
    /**
     * Returns a rectangle that encompasses dimension of line
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js';
     * const rect = Lines.bbox(line);
     * ```
     */
    export const bbox: (line: Line) => Rects.RectPositioned;
    /**
     * Returns a path wrapper around a line instance. This is useful if there are a series
     * of operations you want to do with the same line because you don't have to pass it
     * in as an argument to each function.
     *
     * Note that the line is immutable, so a function like `sum` returns a new LinePath,
     * wrapping the result of `sum`.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     * // Create a path
     * const l = Lines.toPath(fromNumbers(0,0,10,10));
     *
     * // Now we can use it...
     * l.length();
     *
     * // Mutate functions return a new path
     * const ll = l.sum({x:10,y:10});
     * ll.length();
     * ```
     * @param line
     * @returns
     */
    export const toPath: (line: Line) => LinePath;
    export type LinePath = Line & Path & {
        toFlatArray(): readonly number[];
        toPoints(): readonly Points.Point[];
        rotate(amountRadian: number, origin: Points.Point): LinePath;
        sum(point: Points.Point): LinePath;
        divide(point: Points.Point): LinePath;
        multiply(point: Points.Point): LinePath;
        subtract(point: Points.Point): LinePath;
        apply(fn: (point: Points.Point) => Points.Point): LinePath;
        midpoint(): Point;
        distance(point: Point): number;
        parallel(distance: number): Line;
        perpendicularPoint(distance: number, amount?: number): Point;
        slope(): number;
        withinRange(point: Point, maxRange: number): boolean;
        equals(otherLine: Line): boolean;
    };
    /**
     * Returns a line that is rotated by `angleRad`. By default it rotates
     * around its center, but an arbitrary `origin` point can be provided.
     * If `origin` is a number, it's presumed to be a 0..1 percentage of the line.
     *
     * ```js
     * import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
     *
     * // Rotates line by 0.1 radians around point 10,10
     * const r = Lines.rotate(line, 0.1, {x:10,y:10});
     *
     * // Rotate line by 5 degrees around its center
     * const r = Lines.rotate(line, degreeToRadian(5));
     *
     * // Rotate line by 5 degres around its end point
     * const r = Lines.rotate(line, degreeToRadian(5), line.b);
     *
     * // Rotate by 90 degrees at the 80% position
     * const r = Lines.rotated = rotate(line, Math.PI / 2, 0.8);
     * ```
     * @param line Line to rotate
     * @param amountRadian Angle in radians to rotate by
     * @param origin Point to rotate around. If undefined, middle of line will be used
     * @returns
     */
    export const rotate: (line: Line, amountRadian?: number, origin?: Points.Point | number) => Line;
}
declare module "geometry/Point" {
    import { Circles, Lines, Points, Rects } from "geometry/index";
    import { RandomSource } from "Random";
    /**
     * A point, consisting of x, y and maybe z fields.
     */
    export type Point = {
        readonly x: number;
        readonly y: number;
        readonly z?: number;
    };
    export type Point3d = Point & {
        readonly z: number;
    };
    /**
     *
     * @ignore
     * @param a
     * @param b
     * @returns
     */
    export const getPointParam: (a?: Point | number, b?: number) => Point;
    export const dotProduct: (...pts: readonly Point[]) => number;
    /**
     * An empty point of `{ x:0, y:0 }`.
     *
     * Use `isEmpty` to check if a point is empty.
     */
    export const Empty: Readonly<{
        x: 0;
        y: 0;
    }>;
    /**
     * Placeholder point, where x and y is `NaN`.
     * Use `isPlaceholder` to check if a point is a placeholder.
     */
    export const Placeholder: Readonly<{
        x: number;
        y: number;
    }>;
    /**
     * Returns true if both x and y is 0.
     * Use `Points.Empty` to return an empty point.
     * @param p
     * @returns
     */
    export const isEmpty: (p: Point) => boolean;
    /**
     * Returns true if point is a placeholder, where both x and y
     * are `NaN`.
     *
     * Use Points.Placeholder to return a placeholder point.
     * @param p
     * @returns
     */
    export const isPlaceholder: (p: Point) => boolean;
    /**
     * Returns true if p.x and p.y === null
     * @param p
     * @returns
     */
    export const isNull: (p: Point) => boolean;
    /**
     * Returns the 'minimum' point from an array of points, using a comparison function.
     *
     * @example Find point closest to a coordinate
     * ```js
     * const points = [...];
     * const center = {x: 100, y: 100};
     *
     * const closestToCenter = findMinimum((a, b) => {
     *  const aDist = distance(a, center);
     *  const bDist = distance(b, center);
     *  if (aDistance < bDistance) return a;
     *  return b;
     * }, points);
     * ```
     * @param compareFn Compare function returns the smallest of `a` or `b`
     * @param points
     * @returns
     */
    export const findMinimum: (compareFn: (a: Point, b: Point) => Point, ...points: readonly Point[]) => Point;
    /**
     * Returns the left-most of the provided points.
     *
     * Same as:
     * ```js
     * findMinimum((a, b) => {
     *  if (a.x <= b.x) return a;
     *  return b;
     *}, ...points)
     * ```
     *
     * @param points
     * @returns
     */
    export const leftmost: (...points: readonly Point[]) => Point;
    /**
     * Returns the right-most of the provided points.
     *
     * Same as:
     * ```js
     * findMinimum((a, b) => {
     *  if (a.x >= b.x) return a;
     *  return b;
     *}, ...points)
     * ```
     *
     * @param points
     * @returns
     */
    export const rightmost: (...points: readonly Point[]) => Point;
    export function distance(a: Point, b: Point): number;
    export function distance(a: Point, x: number, y: number): number;
    export function distance(a: Point): number;
    /**
     * Returns the distance from point `a` to the exterior of `shape`.
     *
     * @example Distance from point to rectangle
     * ```
     * const distance = distanceToExterior(
     *  {x: 50, y: 50},
     *  {x: 100, y: 100, width: 20, height: 20}
     * );
     * ```
     *
     * @example Find closest shape to point
     * ```
     * import {minIndex} from '../collections/arrays.js';
     * const shapes = [ some shapes... ]; // Shapes to compare against
     * const pt = { x: 10, y: 10 };       // Comparison point
     * const distances = shapes.map(v => distanceToExterior(pt, v));
     * const closest = shapes[minIndex(...distances)];
     * ```
     * @param a Point
     * @param shape Point, or a positioned Rect or Circle.
     * @returns
     */
    export const distanceToExterior: (a: Point, shape: PointCalculableShape) => number;
    /**
     * Returns the distance from point `a` to the center of `shape`.
     * @param a Point
     * @param shape Point, or a positioned Rect or Circle.
     * @returns
     */
    export const distanceToCenter: (a: Point, shape: PointCalculableShape) => number;
    export type PointCalculableShape = Lines.PolyLine | Lines.Line | Rects.RectPositioned | Point | Circles.CirclePositioned;
    /**
     * Throws an error if point is invalid
     * @param p
     * @param name
     */
    export const guard: (p: Point, name?: string) => void;
    /**
     * Throws if parameter is not a valid point, or either x or y is 0
     * @param pt
     * @returns
     */
    export const guardNonZeroPoint: (pt: Point, name?: string) => boolean;
    /**
     * Returns a point with Math.abs applied to x and y.
     * ```js
     * Points.abs({ x:1,  y:1  }); // { x: 1, y: 1 }
     * Points.abs({ x:-1, y:1  }); // { x: 1, y: 1 }
     * Points.abs({ x:-1, y:-1 }); // { x: 1, y: 1 }
     * ```
     * @param pt
     * @returns
     */
    export const abs: (pt: Point) => {
        x: number;
        y: number;
        z?: number | undefined;
    };
    /**
     * Returns the angle in radians between `a` and `b`.
     *
     * Eg if `a` is the origin, and `b` is another point,
     * in degrees one would get 0 to -180 when `b` was above `a`.
     *  -180 would be `b` in line with `a`.
     * Same for under `a`.
     *
     * Providing a third point `c` gives the interior angle, where `b` is the middle point.
     * @param a
     * @param b
     * @param c
     * @returns
     */
    export const angle: (a: Point, b?: Point, c?: Point) => number;
    /**
     * Calculates the [centroid](https://en.wikipedia.org/wiki/Centroid#Of_a_finite_set_of_points) of a set of points
     *
     * ```js
     * // Find centroid of a list of points
     * const c1 = centroid(p1, p2, p3, ...);
     *
     * // Find centroid of an array of points
     * const c2 = centroid(...pointsArray);
     * ```
     * @param points
     * @returns A single point
     */
    export const centroid: (...points: readonly Point[]) => Point;
    /**
     * Returns the minimum rectangle that can enclose all provided points
     * @param points
     * @returns
     */
    export const bbox: (...points: readonly Point[]) => Rects.RectPositioned;
    /**
     * Returns _true_ if the parameter has x and y fields
     * @param p
     * @returns
     */
    export const isPoint: (p: number | unknown) => p is Points.Point;
    export const isPoint3d: (p: Point | unknown) => p is Points.Point3d;
    /**
     * Returns point as an array in the form [x,y]. This can be useful for some libraries
     * that expect points in array form.
     *
     * ```
     * const p = {x: 10, y:5};
     * const p2 = toArray(p); // yields [10,5]
     * ```
     * @param p
     * @returns
     */
    export const toArray: (p: Point) => readonly number[];
    /**
     * Returns a human-friendly string representation `(x, y)`.
     * If `precision` is supplied, this will be the number of significant digits.
     * @param p
     * @returns
     */
    export const toString: (p: Point, digits?: number) => string;
    /**
     * Returns _true_ if the points have identical values
     *
     * ```js
     * const a = {x: 10, y: 10};
     * const b = {x: 10, y: 10;};
     * a === b        // False, because a and be are different objects
     * isEqual(a, b)   // True, because a and b are same value
     * ```
     * @param a
     * @param b
     * @returns _True_ if points are equal
     */
    export const isEqual: (...p: readonly Point[]) => boolean;
    /**
     * Returns true if two points are within a specified range.
     * Provide a point for the range to set different x/y range, or pass a number
     * to use the same range for both axis.
     *
     * Note this simply compares x,y values it does not calcuate distance.
     *
     * @example
     * ```js
     * withinRange({x:100,y:100}, {x:101, y:101}, 1); // True
     * withinRange({x:100,y:100}, {x:105, y:101}, {x:5, y:1}); // True
     * withinRange({x:100,y:100}, {x:105, y:105}, {x:5, y:1}); // False - y axis too far
     * ```
     * @param a
     * @param b
     * @param maxRange
     * @returns
     */
    export const withinRange: (a: Point, b: Point, maxRange: Point | number) => boolean;
    /**
     * Returns a relative point between two points
     * ```js
     * interpolate(0.5, a, b); // Halfway point between a and b
     * ```
     *
     * Alias for Lines.interpolate(amount, a, b);
     *
     * @param amount Relative amount, 0-1
     * @param a
     * @param b
     * @param allowOverflow If true, length of line can be exceeded for `amount` of below 0 and above `1`.
     * @returns {@link Point}
     */
    export const interpolate: (amount: number, a: Point, b: Point, allowOverflow?: boolean) => Point;
    /**
     * Returns a point from two coordinates or an array of [x,y]
     * @example
     * ```js
     * let p = from([10, 5]); // yields {x:10, y:5}
     * let p = from(10, 5);   // yields {x:10, y:5}
     * let p = from(10);      // yields {x:10, y:0} 0 is used for default y
     * let p = from();        // yields {x:0, y:0}  0 used for default x & y
     * ```
     * @param xOrArray
     * @param [y]
     * @returns Point
     */
    export const from: (xOrArray?: number | readonly number[], y?: number) => Point;
    /**
     * Returns an array of points from an array of numbers.
     *
     * Array can be a continuous series of x, y values:
     * ```
     * [1,2,3,4] would yield: [{x:1, y:2}, {x:3, y:4}]
     * ```
     *
     * Or it can be an array of arrays:
     * ```
     * [[1,2], [3,4]] would yield: [{x:1, y:2}, {x:3, y:4}]
     * ```
     * @param coords
     * @returns
     */
    export const fromNumbers: (...coords: readonly ReadonlyArray<number>[] | readonly number[]) => readonly Point[];
    /**
     * Returns `a` minus `b`
     *
     * ie.
     * ```js
     * return {
     *   x: a.x - b.x,
     *   y: a.y - b.y
     * };
     * ```
     * @param a Point a
     * @param b Point b
     * @returns Point
     */
    export function subtract(a: Point, b: Point): Point;
    /**
     * Returns `a` minus the given coordinates.
     *
     * ie:
     * ```js
     * return {
     *  x: a.x - x,
     *  y: a.y - y
     * }
     * ```
     * @param a Point
     * @param x X coordinate
     * @param y Y coordinate (if omitted, x is used as well)
     */
    export function subtract(a: Point, x: number, y?: number): Point;
    /**
     * Subtracts two sets of x,y pairs
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    export function subtract(x1: number, y1: number, x2: number, y2: number): Point;
    /**
     * Applies `fn` on `x` and `y` fields, returning all other fields as well
     * ```js
     * const p = {x:1.234, y:4.9};
     * const p2 = apply(p, Math.round);
     * // Yields: {x:1, y:5}
     * ```
     *
     * The name of the field is provided as well. Here we only round the `x` field:
     *
     * ```js
     * const p = {x:1.234, y:4.9};
     * const p2 = apply(p, (v, field) => {
     *  if (field === `x`) return Math.round(v);
     *  return v;
     * });
     * ```
     * @param pt
     * @param fn
     * @returns
     */
    export const apply: (pt: Point, fn: (v: number, field?: string) => number) => Point;
    /**
     * Runs a sequential series of functions on `pt`. The output from one feeding into the next.
     * ```js
     * const p = pipelineApply(somePoint, Points.normalise, Points.invert);
     * ```
     *
     * If you want to make a reusable pipeline of functions, consider {@link pipeline} instead.
     * @param pt
     * @param pipeline
     * @returns
     */
    export const pipelineApply: (pt: Point, ...pipelineFns: readonly ((pt: Point) => Point)[]) => Point;
    /**
     * Returns a pipeline function that takes a point to be transformed through a series of functions
     * ```js
     * // Create pipeline
     * const p = pipeline(Points.normalise, Points.invert);
     *
     * // Now run it on `somePoint`.
     * // First we normalised, and then invert
     * const changedPoint = p(somePoint);
     * ```
     *
     * If you don't want to create a pipeline, use {@link pipelineApply}.
     * @param pipeline Pipeline of functions
     * @returns
     */
    export const pipeline: (...pipeline: readonly ((pt: Point) => Point)[]) => (pt: Point) => Points.Point;
    /**
     * Reduces over points, treating _x_ and _y_ separately.
     *
     * ```
     * // Sum x and y values
     * const total = reduce(points, (p, acc) => {
     *  return {x: p.x + acc.x, y: p.y + acc.y}
     * });
     * ```
     * @param pts Points to reduce
     * @param fn Reducer
     * @param initial Initial value, uses `{ x:0, y:0 }` by default
     * @returns
     */
    export const reduce: (pts: readonly Point[], fn: (p: Point, accumulated: Point) => Point, initial?: Point) => Point;
    type Sum = {
        /**
         * Adds two sets of coordinates. If y is omitted, the parameter for x is added to both x and y
         */
        (aX: number, aY: number, bX: number, bY: number): Point;
        /**
         * Add x,y to a
         */
        (a: Point, x: number, y?: number): Point;
        /**
         * Add two points
         */
        (a: Point, b?: Point): Point;
    };
    /**
     * Returns a Point of `a` plus `b`. ie:
     *
     * ```js
     * return {
     *   x: a.x + b.x,
     *   y: a.y + b.y
     * };
     * ```
     *
     * Usage:
     *
     * ```js
     * sum(ptA, ptB);
     * sum(x1, y1, x2, y2);
     * sum(ptA, x2, y2);
     * sum(ptA, xAndY);
     * ```
     */
    export const sum: Sum;
    /**
     * Returns `a` multiplied by `b`
     *
     * ie.
     * ```js
     * return {
     *  x: a.x * b.x,
    *   y: a.y * b.y
     * }
     * ```
     * @param a
     * @param b
     * @returns
     */
    export function multiply(a: Point, b: Point): Point;
    /**
     * Multiply by a width,height:
     * ```
     * return {
     *  x: a.x * rect.width,
     *  y: a.y * rect.height
     * };
     * ```
     * @param a
     * @param rect
     */
    export function multiply(a: Point, rect: Rects.Rect): Point;
    /**
     * Returns `a` multipled by some x and/or y scaling factor
     *
     * ie.
     * ```js
     * return {
     *  x: a.x * x
    *   y: a.y * y
     * }
     * ```
     *
     * Usage:
     * ```js
     * multiply(pt, 10, 100); // Scale pt by x:10, y:100
     * multiply(pt, Math.min(window.innerWidth, window.innerHeight)); // Scale both x,y by viewport with or height, whichever is smaller
     * ```
     * @export
     * @parama Point to scale
     * @param x Scale factor for x axis
     * @param [y] Scale factor for y axis (if not specified, the x value is used)
     * @returns Scaled point
     */
    export function multiply(a: Point, x: number, y?: number): Point;
    /**
     * Divides a / b:
     * ```js
     * return {
     *  x: a.x / b.x,
     *  y: a.y / b.y
     * }
     * ```
     * @param a
     * @param b
     */
    export function divide(a: Point, b: Point): Point;
    /**
     * Divides point a by rectangle:
     * ```js
     * return {
     *  x: a.x / rect.width,
     *  y: a.y / rect.hight
     * };
     * ```
     * @param a
     * @param Rect
     */
    export function divide(a: Point, rect: Rects.Rect): Point;
    /**
     * Divides a point by x,y.
     * ```js
     * return {
     *  x: a.x / x,
     *  y: b.y / y
     * };
     * ```
     * @param a Point
     * @param x X divisor
     * @param y Y divisor. If unspecified, x divisor is used.
     */
    export function divide(a: Point, x: number, y?: number): Point;
    /**
     * Divides two sets of points:
     * ```js
     * return {
     *  x: x1 / x2,
     *  y: y1 / y2
     * };
     * ```
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    export function divide(x1: number, y1: number, x2?: number, y2?: number): Point;
    /**
     * Simple convex hull impementation. Returns a set of points which
     * enclose `pts`.
     *
     * For more power, see something like [Hull.js](https://github.com/AndriiHeonia/hull)
     * @param pts
     * @returns
     */
    export const convexHull: (...pts: readonly Point[]) => readonly Point[];
    /**
     * Returns -2 if both x & y of a is less than b
     * Returns -1 if either x/y of a is less than b
     *
     * Returns 2 if both x & y of a is greater than b
     * Returns 1 if either x/y of a is greater than b's x/y
     *
     * Returns 0 if x/y of a and b are equal
     * @param a
     * @param b
     * @returns
     */
    export const compare: (a: Point, b: Point) => number;
    export const compareByX: (a: Point, b: Point) => number;
    /**
     * Project `origin` by `distance` and `angle` (radians).
     *
     * To figure out rotation, imagine a horizontal line running through `origin`.
     * * Rotation = 0 deg puts the point on the right of origin, on same y-axis
     * * Rotation = 90 deg/3:00 puts the point below origin, on the same x-axis
     * * Rotation = 180 deg/6:00 puts the point on the left of origin on the same y-axis
     * * Rotation = 270 deg/12:00 puts the point above the origin, on the same x-axis
     *
     * ```js
     * // Yields a point 100 units away from 10,20 with 10 degrees rotation (ie slightly down)
     * const a = Points.project({x:10, y:20}, 100, degreeToRadian(10));
     * ```
     * @param origin
     * @param distance
     * @param angle
     * @returns
     */
    export const project: (origin: Point, distance: number, angle: number) => {
        x: number;
        y: number;
    };
    /**
     * Rotate a single point by a given amount in radians
     * @param pt
     * @param amountRadian
     * @param origin
     */
    export function rotate(pt: Point, amountRadian: number, origin?: Point): Point;
    /**
     * Rotate several points by a given amount in radians
     * @param pt Points
     * @param amountRadian Amount to rotate in radians. If 0 is given, a copy of the input array is returned
     * @param origin Origin to rotate around. Defaults to 0,0
     */
    export function rotate(pt: ReadonlyArray<Point>, amountRadian: number, origin?: Point): ReadonlyArray<Point>;
    export const rotatePointArray: (v: ReadonlyArray<readonly number[]>, amountRadian: number) => number[][];
    /**
     * Normalise point as a unit vector.
     *
     * ```js
     * normalise({x:10, y:20});
     * normalise(10, 20);
     * ```
     * @param ptOrX Point, or x value
     * @param y y value if first param is x
     * @returns
     */
    export const normalise: (ptOrX: Point | number, y?: number) => Point;
    /**
     * Normalises a point by a given width and height
     * @param pt Point
     * @param width Width
     * @param height Height
     */
    export function normaliseByRect(pt: Point, width: number, height: number): Point;
    export function normaliseByRect(pt: Point, rect: Rects.Rect): Point;
    /**
     * Normalises x,y by width and height so it is on a 0..1 scale
     * @param x
     * @param y
     * @param width
     * @param height
     */
    export function normaliseByRect(x: number, y: number, width: number, height: number): Point;
    /**
     * Returns a random point on a 0..1 scale.
     * ```js
     * import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
     * const pt = Points.random(); // eg {x: 0.2549012, y:0.859301}
     * ```
     *
     * A custom source of randomness can be provided:
     * ```js
     * import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
     * import { weightedSkewed } from "https://unpkg.com/ixfx/dist/random.js"
     * const pt = Points.random(weightedSkewed(`quadIn`));
     * ```
     * @param rando
     * @returns
     */
    export const random: (rando?: RandomSource) => Point;
    /**
     * Wraps a point to be within `ptMin` and `ptMax`.
     * Note that max values are _exclusive_, meaning the return value will always be one less.
     *
     * Eg, if a view port is 100x100 pixels, wrapping the point 150,100 yields 50,99.
     *
     * ```js
     * // Wraps 150,100 to on 0,0 -100,100 range
     * wrap({x:150,y:100}, {x:100,y:100});
     * ```
     *
     * Wrap normalised point:
     * ```js
     * wrap({x:1.2, y:1.5}); // Yields: {x:0.2, y:0.5}
     * ```
     * @param pt Point to wrap
     * @param ptMax Maximum value, or `{ x:1, y:1 }` by default
     * @param ptMin Minimum value, or `{ x:0, y:0 }` by default
     * @returns Wrapped point
     */
    export const wrap: (pt: Point, ptMax?: Point, ptMin?: Point) => Point;
    /**
     * Inverts one or more axis of a point
     * ```js
     * invert({x:10, y:10}); // Yields: {x:-10, y:-10}
     * invert({x:10, y:10}, `x`); // Yields: {x:-10, y:10}
     * ```
     * @param pt Point to invert
     * @param what Which axis. If unspecified, both axies are inverted
     * @returns
     */
    export const invert: (pt: Point | Point3d, what?: `both` | `x` | `y` | `z`) => Point;
    /**
     * Returns a point with rounded x,y coordinates. By default uses `Math.round` to round.
     * ```js
     * toIntegerValues({x:1.234, y:5.567}); // Yields: {x:1, y:6}
     * ```
     *
     * ```js
     * toIntegerValues(pt, Math.ceil); // Use Math.ceil to round x,y of `pt`.
     * ```
     * @param pt Point to round
     * @param rounder Rounding function, or Math.round by default
     * @returns
     */
    export const toIntegerValues: (pt: Point, rounder?: (x: number) => number) => Point;
    /**
     * Clamps the magnitude of a point.
     * This is useful when using a Point as a vector, to limit forces.
     * @param pt
     * @param m
     * @returns
     */
    export const clampMagnitude: (pt: Point, m: number) => Point;
    /**
     * Clamps a point to be between `min` and `max` (0 & 1 by default)
     * @param pt Point
     * @param min Minimum value (0 by default)
     * @param max Maximum value (1 by default)
     */
    export function clamp(pt: Point, min?: number, max?: number): Point;
    /**
     * Clamps an x,y pair to be between `min` and `max` (0 & 1 by default)
     * @param x X coordinate
     * @param y Y coordinate
     * @param min Minimum value (0 by default)
     * @param max Maximum value (1 by default)
     */
    export function clamp(x: number, y: number, min?: number, max?: number): Point;
    export type PointRelation = (a: Point | number, b?: number) => PointRelationResult;
    export type PointRelationResult = {
        /**
         * Angle from start
         */
        readonly angle: number;
        /**
        * Distance from start
        */
        readonly distance: number;
        /**
        * Center point from start
        */
        readonly centroid: Point;
        /**
        * Average of all points seen
        * This is calculated by summing x,y and dividing by total points
        */
        readonly average: Point;
    };
    /**
     * Tracks the relation between two points
     *
     * ```js
     * import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
     *
     * // Start point: 50,50
     * const t = Points.relation({x:50,y:50});
     *
     * // Compare to a 0,0
     * const {angle, distance, average, centroid} = t({x:0,y:0});
     * ```
     *
     * X,y coordinates can also be used as parameters:
     * ```js
     * const t = Points.relation(50, 50);
     * const {angle, distance, centroid} = t(0, 0);
     * ```
     * @param start
     * @returns
     */
    export const relation: (a: Point | number, b?: number) => PointRelation;
}
declare module "geometry/Arc" {
    import { Path } from "geometry/Path";
    import { Lines, Points, Rects } from "geometry/index";
    /**
     * Returns true if parameter is an arc
     * @param p Arc or number
     * @returns
     */
    export const isArc: (p: Arc | number | unknown) => p is Arc;
    /**
     * Returns true if parameter has a positioned (x,y)
     * @param p Point, Arc or ArcPositiond
     * @returns
     */
    export const isPositioned: (p: Points.Point | Arc | ArcPositioned) => p is Points.Point;
    /**
     * Arc, defined by radius, start and end point in radians, and whether it is counter-clockwise.
     */
    export type Arc = {
        /**
         * Radius of arc
         */
        readonly radius: number;
        /**
         * Start radian
         */
        readonly startRadian: number;
        /**
         * End radian
         */
        readonly endRadian: number;
        /**
         * If true, arc is counter-clockwise
         */
        readonly counterClockwise?: boolean;
    };
    /**
     * An {@link Geometry.Arcs.Arc} that also has a position, given in x, y
     */
    export type ArcPositioned = Points.Point & Arc;
    /**
     * Returns an arc from degrees, rather than radians
     * @param radius Radius of arc
     * @param startDegrees Start angle in degrees
     * @param endDegrees End angle in degrees
     * @param origin Optional center of arc
     * @returns Arc
     */
    export function fromDegrees(radius: number, startDegrees: number, endDegrees: number): Arc;
    export function fromDegrees(radius: number, startDegrees: number, endDegrees: number, origin: Points.Point): ArcPositioned;
    /**
     * Returns a {@link Geometry.Lines.Line} linking the start and end points of an {@link ArcPositioned}.
     *
     * @param arc
     * @returns Line from start to end of arc
     */
    export const toLine: (arc: ArcPositioned) => Lines.Line;
    /**
     * Calculates a coordinate on an arc, based on an angle
     * @param arc Arc
     * @param angleRadian Angle of desired coordinate
     * @param origin Origin of arc (0,0 used by default)
     * @returns Coordinate
     */
    export const point: (arc: Arc | ArcPositioned, angleRadian: number, origin?: Points.Point) => Points.Point;
    /**
     * Throws an error if arc instance is invalid
     * @param arc
     */
    export const guard: (arc: Arc | ArcPositioned) => void;
    type Interpolate = {
        (amount: number, arc: Arc, origin: Points.Point): Points.Point;
        (amount: number, arc: ArcPositioned): Points.Point;
    };
    /**
     * Compute relative position on arc
     * @param arc Arc
     * @param amount Relative position 0-1
     * @param origin If arc is not positioned, pass in an origin
     * @returns
     */
    export const interpolate: Interpolate;
    /**
     * Creates a {@link Geometry.Paths.Path} instance from the arc. This wraps up some functions for convienence.
     * @param arc
     * @returns Path
     */
    export const toPath: (arc: ArcPositioned) => Path;
    /**
     * Calculates the length of the arc
     * @param arc
     * @returns Length
     */
    export const length: (arc: Arc) => number;
    /**
     * Calculates a {@link Geometry.Rects.Rect | Rect} bounding box for arc.
     * @param arc
     * @returns Rectangle encompassing arc.
     */
    export const bbox: (arc: ArcPositioned | Arc) => Rects.RectPositioned | Rects.Rect;
    type ToSvg = {
        /**
         * SVG path for arc description
         * @param origin Origin of arc
         * @param radius Radius
         * @param startRadian Start
         * @param endRadian End
         */
        (origin: Points.Point, radius: number, startRadian: number, endRadian: number, opts?: SvgOpts): readonly string[];
        /**
         * SVG path for non-positioned arc
         */
        (arc: Arc, origin: Points.Point, opts?: SvgOpts): readonly string[];
        /**
         * SVG path for positioned arc
         */
        (arc: ArcPositioned, opts?: SvgOpts): readonly string[];
    };
    /**
     * Creates an SV path snippet for arc
     * @returns
     */
    export const toSvg: ToSvg;
    export type SvgOpts = {
        /**
         * "If the arc should be greater or less than 180 degrees"
         * ie. tries to maximise arc length
         */
        readonly largeArc?: boolean;
        /**
         * "If the arc should begin moving at positive angles"
         * ie. the kind of bend it makes to reach end point
         */
        readonly sweep?: boolean;
    };
    /**
     * Calculates the distance between the centers of two arcs
     * @param a
     * @param b
     * @returns Distance
     */
    export const distanceCenter: (a: ArcPositioned, b: ArcPositioned) => number;
    /**
     * Returns true if the two arcs have the same values
     *
     * @param a
     * @param b
     * @returns {boolean}
     */
    export const isEquals: (a: Arc | ArcPositioned, b: Arc | ArcPositioned) => boolean;
}
declare module "geometry/Bezier" {
    import { Paths, Points } from "geometry/index";
    export type QuadraticBezier = {
        readonly a: Points.Point;
        readonly b: Points.Point;
        readonly quadratic: Points.Point;
    };
    export type QuadraticBezierPath = Paths.Path & QuadraticBezier;
    export type CubicBezier = {
        readonly a: Points.Point;
        readonly b: Points.Point;
        readonly cubic1: Points.Point;
        readonly cubic2: Points.Point;
    };
    export type CubicBezierPath = Paths.Path & CubicBezier;
    export const isQuadraticBezier: (path: Paths.Path | QuadraticBezier | CubicBezier) => path is QuadraticBezier;
    export const isCubicBezier: (path: Paths.Path | CubicBezier | QuadraticBezier) => path is CubicBezier;
    /**
     * Returns a new quadratic bezier with specified bend amount
     *
     * @param {QuadraticBezier} b Curve
     * @param {number} [bend=0] Bend amount, from -1 to 1
     * @returns {QuadraticBezier}
     */
    export const quadraticBend: (a: Points.Point, b: Points.Point, bend?: number) => QuadraticBezier;
    /**
     * Creates a simple quadratic bezier with a specified amount of 'bend'.
     * Bend of -1 will pull curve down, 1 will pull curve up. 0 is no curve
     * @param {Points.Point} start Start of curve
     * @param {Points.Point} end End of curve
     * @param {number} [bend=0] Bend amount, -1 to 1
     * @returns {QuadraticBezier}
     */
    export const quadraticSimple: (start: Points.Point, end: Points.Point, bend?: number) => QuadraticBezier;
    /**
     * Returns a relative point on a simple quadratic
     * @param start Start
     * @param end  End
     * @param bend Bend (-1 to 1)
     * @param amt Amount
     * @returns Point
     */
    export const computeQuadraticSimple: (start: Points.Point, end: Points.Point, bend: number, amt: number) => Points.Point;
    export const quadraticToSvgString: (start: Points.Point, end: Points.Point, handle: Points.Point) => readonly string[];
    export const toPath: (cubicOrQuadratic: CubicBezier | QuadraticBezier) => CubicBezierPath | QuadraticBezierPath;
    export const cubic: (start: Points.Point, end: Points.Point, cubic1: Points.Point, cubic2: Points.Point) => CubicBezier;
    export const quadratic: (start: Points.Point, end: Points.Point, handle: Points.Point) => QuadraticBezier;
}
declare module "geometry/Circle" {
    import { Path } from "geometry/Path";
    import { Line } from "geometry/Line";
    import { Points, Rects } from "geometry/index";
    /**
     * A circle
     */
    export type Circle = {
        readonly radius: number;
    };
    /**
     * A {@link Circle} with position
     */
    export type CirclePositioned = Points.Point & Circle;
    export type CircularPath = Circle & Path & {
        readonly kind: `circular`;
    };
    /**
     * Returns true if parameter has x,y. Does not verify if parameter is a circle or not
     * @param p Circle or point
     * @returns
     */
    export const isPositioned: (p: Circle | Points.Point) => p is Points.Point;
    export const isCircle: (p: Circle | CirclePositioned | any) => p is Circle;
    export const isCirclePositioned: (p: Circle | CirclePositioned | any) => p is CirclePositioned;
    /**
     * Returns a point on a circle at a specified angle in radians
     * @param circle
     * @param angleRadian Angle in radians
     * @param Origin or offset of calculated point. By default uses center of circle or 0,0 if undefined
     * @returns Point oo circle
     */
    export const point: (circle: Circle | CirclePositioned, angleRadian: number, origin?: Points.Point) => Points.Point;
    /**
     * Returns the center of a circle
     * If the circle has an x,y, that is the center.
     * If not, `radius` is used as the x and y.
     * @param circle
     * @returns Center of circle
     */
    export const center: (circle: CirclePositioned | Circle) => Readonly<{
        x: number;
        y: number;
    }>;
    /**
     * Computes relative position along circle
     * @param circle
     * @param t Position, 0-1
     * @returns
     */
    export const interpolate: (circle: CirclePositioned, t: number) => Points.Point;
    /**
     * Returns circumference of `circle` (alias of {@link circumference})
     * @param circle
     * @returns
     */
    export const length: (circle: Circle) => number;
    /**
     * Returns circumference of `circle` (alias of {@link length})
     * @param circle
     * @returns
     */
    export const circumference: (circle: Circle) => number;
    /**
     * Returns the area of `circle`.
     * @param circle
     * @returns
     */
    export const area: (circle: Circle) => number;
    /**
     * Computes a bounding box that encloses circle
     * @param circle
     * @returns
     */
    export const bbox: (circle: CirclePositioned | Circle) => Rects.RectPositioned | Rects.Rect;
    /**
     * Returns true if `b` is completely contained by `a`
     *
     * @param a
     * @param b
     * @returns
     */
    export const isContainedBy: (a: CirclePositioned, b: CirclePositioned) => boolean;
    /**
     * Returns true if a or b overlap or are equal
     *
     * Use `intersections` to find the points of intersection
     *
     * @param a
     * @param b
     * @returns True if circle overlap
     */
    export const isIntersecting: (a: CirclePositioned, b: CirclePositioned) => boolean;
    /**
     * Returns the points of intersection betweeen `a` and `b`.
     *
     * Returns an empty array if circles are equal, one contains the other or if they don't touch at all.
     *
     * @param a Circle
     * @param b Circle
     * @returns Points of intersection, or an empty list if there are none
     */
    export const intersections: (a: CirclePositioned, b: CirclePositioned) => readonly Points.Point[];
    /**
     * Returns true if the two objects have the same values
     *
     * @param a
     * @param b
     * @returns
     */
    export const isEquals: (a: CirclePositioned | Circle, b: CirclePositioned | Circle) => boolean;
    /**
     * Returns the distance between two circle centers.
     *
     * Throws an error if either is lacking position.
     * @param a
     * @param b
     * @returns Distance
     */
    export const distanceCenter: (a: CirclePositioned, b: CirclePositioned) => number;
    /**
     * Returns the distance between the exterior of two circles, or between the exterior of a circle and point.
     * If `b` overlaps or is enclosed by `a`, distance is 0.
     * @param a
     * @param b
     */
    export const distanceFromExterior: (a: CirclePositioned, b: CirclePositioned | Points.Point) => number;
    type ToSvg = {
        (radius: number, sweep: boolean, origin: Points.Point): readonly string[];
        (circle: Circle, sweep: boolean, origin: Points.Point): readonly string[];
        (circle: CirclePositioned, sweep: boolean): readonly string[];
    };
    /**
     * Creates a SVG path segment.
     * @param a Circle or radius
     * @param sweep If true, path is 'outward'
     * @param origin Origin of path. Required if first parameter is just a radius or circle is non-positioned
     * @returns
     */
    export const toSvg: ToSvg;
    /**
     * Returns a `CircularPath` representation of a circle
     *
     * @param {CirclePositioned} circle
     * @returns {CircularPath}
     */
    export const toPath: (circle: CirclePositioned) => CircularPath;
    /**
     * Returns the point(s) of intersection between a circle and line.
     * @param circle
     * @param line
     * @returns Point(s) of intersection, or empty array
     */
    export const intersectionLine: (circle: CirclePositioned, line: Line) => readonly Points.Point[];
}
declare module "geometry/CompoundPath" {
    import { Points, Paths, Rects } from "geometry/index";
    export type CompoundPath = Paths.Path & {
        readonly segments: readonly Paths.Path[];
        readonly kind: `compound`;
    };
    /**
     * Returns a new compoundpath, replacing a path at a given index
     *
     * @param {CompoundPath} compoundPath Existing compoundpath
     * @param {number} index Index to replace at
     * @param {Paths.Path} path Path to substitute in
     * @returns {CompoundPath} New compoundpath
     */
    export const setSegment: (compoundPath: CompoundPath, index: number, path: Paths.Path) => CompoundPath;
    /**
     * Computes x,y point at a relative position along compoundpath
     *
     * @param {Paths.Path[]} paths Combined paths (assumes contiguous)
     * @param {number} t Position (given as a percentage from 0 to 1)
     * @param {boolean} [useWidth] If true, widths are used for calulcating. If false, lengths are used
     * @param {Dimensions} [dimensions] Precalculated dimensions of paths, will be computed if omitted
     * @returns
     */
    export const interpolate: (paths: readonly Paths.Path[], t: number, useWidth?: boolean, dimensions?: Dimensions) => Points.Point;
    export type Dimensions = {
        /**
         * Width of each path (based on bounding box)
         *
         * @type {number[]}
         */
        readonly widths: readonly number[];
        /**
         * Length of each path
         *
         * @type {number[]}
         */
        readonly lengths: readonly number[];
        /**
         * Total length of all paths
         *
         * @type {number}
         */
        readonly totalLength: number;
        /**
         * Total width of all paths
         *
         * @type {number}
         */
        readonly totalWidth: number;
    };
    /**
     * Computes the widths and lengths of all paths, adding them up as well
     *
     * @param {Paths.Path[]} paths
     * @returns {Dimensions}
     */
    export const computeDimensions: (paths: readonly Paths.Path[]) => Dimensions;
    /**
     * Computes the bounding box that encloses entire compoundpath
     *
     * @param {Paths.Path[]} paths
     *
     * @returns {Rects.Rect}
     */
    export const bbox: (paths: readonly Paths.Path[]) => Rects.RectPositioned;
    /**
     * Produce a human-friendly representation of paths
     *
     * @param {Paths.Path[]} paths
     * @returns {string}
     */
    export const toString: (paths: readonly Paths.Path[]) => string;
    /**
     * Throws an error if paths are not connected together, in order
     *
     * @param {Paths.Path[]} paths
     */
    export const guardContinuous: (paths: readonly Paths.Path[]) => void;
    export const toSvgString: (paths: readonly Paths.Path[]) => readonly string[];
    /**
     * Create a compoundpath from an array of paths.
     * All this does is verify they are connected, and precomputes dimensions
     *
     * @param {...Paths.Path[]} paths
     * @returns {CompoundPath}
     */
    export const fromPaths: (...paths: readonly Paths.Path[]) => CompoundPath;
}
declare module "geometry/Grid" {
    import { Rects, Points } from "geometry/index";
    import { SetMutable } from "collections/Interfaces";
    export type GridVisual = Readonly<{
        readonly size: number;
    }>;
    export type Grid = Readonly<{
        readonly rows: number;
        readonly cols: number;
    }>;
    export type Cell = Readonly<{
        readonly x: number;
        readonly y: number;
    }>;
    export type Neighbours = Readonly<{
        readonly n: Cell | undefined;
        readonly e: Cell | undefined;
        readonly s: Cell | undefined;
        readonly w: Cell | undefined;
        readonly ne: Cell | undefined;
        readonly nw: Cell | undefined;
        readonly se: Cell | undefined;
        readonly sw: Cell | undefined;
    }>;
    export type CardinalDirection = `` | `n` | `ne` | `e` | `se` | `s` | `sw` | `w` | `nw`;
    export type BoundsLogic = `unbounded` | `undefined` | `stop` | `wrap`;
    export type VisitorLogic = {
        readonly options?: IdentifyNeighbours;
        readonly select: NeighbourSelector;
    };
    export type VisitGenerator = Generator<Readonly<Cell>, void, unknown>;
    export type VisitorOpts = {
        readonly visited?: SetMutable<Cell>;
        readonly reversed?: boolean;
        readonly debug?: boolean;
    };
    export type Visitor = (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export type NeighbourMaybe = readonly [keyof Neighbours, Cell | undefined];
    export type Neighbour = readonly [keyof Neighbours, Cell];
    /**
     * Neighbour selector logic. For a given set of `neighbours` pick one to visit next.
     */
    export type NeighbourSelector = (neighbours: ReadonlyArray<Neighbour>) => Neighbour | undefined;
    /**
     * Identify neighbours logic. For a given `grid` and `origin`, return a list of neighbours
     */
    export type IdentifyNeighbours = (grid: Grid, origin: Cell) => ReadonlyArray<Neighbour>;
    /**
     * Returns _true_ if grids `a` and `b` are equal in value
     *
     * @param a
     * @param b
     * @return
     */
    export const isEqual: (a: Grid | GridVisual, b: Grid | GridVisual) => boolean;
    /**
     * Returns a key string for a cell instance
     * A key string allows comparison of instances by value rather than reference
     * @param v
     * @returns
     */
    export const cellKeyString: (v: Cell) => string;
    /**
     * Returns true if two cells equal. Returns false if either cell (or both) are undefined
     *
     * @param a
     * @param b
     * @returns
     */
    export const cellEquals: (a: Cell, b: Cell) => boolean;
    /**
     * Throws an exception if any of the cell's parameters are invalid
     * @private
     * @param cell
     * @param paramName
     * @param grid
     */
    export const guardCell: (cell: Cell, paramName?: string, grid?: Grid) => void;
    /**
     * Returns _true_ if cell coordinates are above zero and within bounds of grid
     *
     * @param grid
     * @param cell
     * @return
     */
    export const inside: (grid: Grid, cell: Cell) => boolean;
    /**
     * Returns a visual rectangle of the cell, positioned from the top-left corner
     *
     * @param cell
     * @param grid
     * @return
     */
    export const rectangleForCell: (cell: Cell, grid: Grid & GridVisual) => Rects.RectPositioned;
    /**
     * Returns the cell at a specified visual coordinate
     *
     * @param position Position, eg in pixels
     * @param grid Grid
     * @return Cell at position or undefined if outside of the grid
     */
    export const cellAtPoint: (position: Points.Point, grid: Grid & GridVisual) => Cell | undefined;
    /**
     * Returns a list of all cardinal directions
     */
    export const allDirections: readonly CardinalDirection[];
    /**
     * Returns a list of + shaped directions (ie. excluding diaganol)
     */
    export const crossDirections: readonly CardinalDirection[];
    /**
     * Returns neighbours for a cell. If no `directions` are provided, it defaults to all.
     *
     * ```js
     * const n = neighbours = ({rows: 5, cols: 5}, {x:2, y:2} `wrap`);
     * {
     *  n: {x: 2, y: 1}
     *  s: {x: 2, y: 3}
     *  ....
     * }
     * ```
     * @returns Returns a map of cells, keyed by cardinal direction
     * @param grid Grid
     * @param cell Cell
     * @param bounds How to handle edges of grid
     * @param directions Directions to return
     */
    export const neighbours: (grid: Grid, cell: Cell, bounds?: BoundsLogic, directions?: ReadonlyArray<CardinalDirection>) => Neighbours;
    /**
     * Returns the visual midpoint of a cell (eg pixel coordinate)
     *
     * @param cell
     * @param grid
     * @return
     */
    export const cellMiddle: (cell: Cell, grid: Grid & GridVisual) => Points.Point;
    /**
     * Returns the cells on the line of start and end, inclusive
     *
     * ```js
     * // Get cells that connect 0,0 and 10,10
     * const cells = getLine({x:0,y:0}, {x:10,y:10});
     * ```
     *
     * This function does not handle wrapped coordinates.
     * @param start Starting cell
     * @param end End cell
     * @returns
     */
    export const getLine: (start: Cell, end: Cell) => ReadonlyArray<Cell>;
    /**
     * Returns cells that correspond to the cardinal directions at a specified distance
     *
     * @param grid Grid
     * @param steps Distance
     * @param start Start poiint
     * @param bound Logic for if bounds of grid are exceeded
     * @returns Cells corresponding to cardinals
     */
    export const offsetCardinals: (grid: Grid, start: Cell, steps: number, bounds?: BoundsLogic) => Neighbours;
    /**
     * Returns an `{ x, y }` signed vector corresponding to the provided cardinal direction.
     * ```js
     * const n = getVectorFromCardinal(`n`); // {x: 0, y: -1}
     * ```
     *
     * Optional `multiplier` can be applied to vector
     * ```js
     * const n = getVectorFromCardinal(`n`, 10); // {x: 0, y: -10}
     * ```
     *
     * Blank direction returns `{ x: 0, y: 0 }`
     * @param cardinal Direction
     * @param multiplier Multipler
     * @returns Signed vector in the form of `{ x, y }`
     */
    export const getVectorFromCardinal: (cardinal: CardinalDirection, multiplier?: number) => Cell;
    /**
     * Returns a list of cells from `start` to `end`.
     *
     * Throws an error if start and end are not on same row or column.
     *
     * @param start Start cell
     * @param end end clel
     * @param endInclusive
     * @return Array of cells
     */
    export const simpleLine: (start: Cell, end: Cell, endInclusive?: boolean) => ReadonlyArray<Cell>;
    /**
     *
     * Returns a coordinate offset from `start` by `vector` amount.
     *
     * Different behaviour can be specified for how to handle when coordinates exceed the bounds of the grid
     *
     *
     * Note: x and y wrapping are calculated independently. A large wrapping of x, for example won't shift down a line
     * @param grid Grid to traverse
     * @param vector Offset in x/y
     * @param start Start point
     * @param bounds
     * @returns Cell
     */
    export const offset: (grid: Grid, start: Cell, vector: Cell, bounds?: BoundsLogic) => Cell | undefined;
    /**
     * Visits every cell in grid using supplied selection function
     * In-built functions to use: visitorDepth, visitorBreadth, visitorRandom,
     * visitorColumn, visitorRow.
     *
     * Usage example:
     * ```js
     *  let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell);
     *  for (let cell of visitor) {
     *   // do something with cell
     *  }
     * ```
     *
     * If you want to keep tabs on the visitor, pass in a MutableValueSet. This is
     * updated with visited cells (and is used internally anyway)
     * ```js
     *  let visited = new mutableValueSet<Grids.Cell>(c => Grids.cellKeyString(c));
     *  let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell, visited);
     * ```
     *
     * To visit with some delay, try this pattern
     * ```js
     *  const delayMs = 100;
     *  const run = () => {
     *   let cell = visitor.next().value;
     *   if (cell === undefined) return;
     *   // Do something with cell
     *   setTimeout(run, delayMs);
     *  }
     *  setTimeout(run, delayMs);
     * ```
     * @param neighbourSelect Select neighbour to visit
     * @param grid Grid to visit
     * @param start Starting cell
     * @param visited Optional tracker of visited cells
     * @returns Cells
     */
    export const visitor: (logic: VisitorLogic, grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorDepth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorBreadth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorRandomContiguous: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorRandom: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorRow: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    /**
     * Runs the provided `visitor` for `steps`, returning the cell we end at
     *
     * ```js
     * // Get a cell 10 steps away (row-wise) from start
     * const cell = visitFor(grid, start, 10, visitorRow);
     * ```
     * @param grid Grid to traverse
     * @param start Start point
     * @param steps Number of steps
     * @param visitor Visitor function
     * @returns
     */
    export const visitFor: (grid: Grid, start: Cell, steps: number, visitor: Visitor) => Cell;
    /**
     * Visits cells running down columns, left-to-right.
     * @param grid Grid to traverse
     * @param start Start cell
     * @param opts Options
     * @returns Visitor generator
     */
    export const visitorColumn: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    /**
     * Enumerate rows of grid, returning all the cells in the row
     * ```js
     * for (const row of Grid.rows(shape)) {
     *  // row is an array of Cells.
     * }
     * ```
     * @param grid
     * @param start
     */
    export const rows: (grid: Grid, start?: Cell) => Generator<Readonly<{
        readonly x: number;
        readonly y: number;
    }>[], void, unknown>;
    /**
     * Enumerate all cells in an efficient manner. Runs left-to-right, top-to-bottom.
     * If end of grid is reached, iterator will wrap to ensure all are visited.
     *
     * @param grid
     * @param start
     */
    export const cells: (grid: Grid, start?: Cell) => Generator<{
        x: number;
        y: number;
    }, void, unknown>;
}
declare module "geometry/Rect" {
    import { Points, Lines } from "geometry/index";
    export type Rect = {
        readonly width: number;
        readonly height: number;
    };
    export type RectPositioned = Points.Point & Rect;
    export const empty: Readonly<{
        width: 0;
        height: 0;
    }>;
    export const emptyPositioned: Readonly<{
        x: 0;
        y: 0;
        width: 0;
        height: 0;
    }>;
    export const placeholder: Readonly<{
        width: number;
        height: number;
    }>;
    export const placeholderPositioned: Readonly<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    export const isEmpty: (rect: Rect) => boolean;
    export const isPlaceholder: (rect: Rect) => boolean;
    /**
     * Returns true if parameter has a positioned (x,y)
     * @param p Point, Rect or RectPositiond
     * @returns
     */
    export const isPositioned: (p: Points.Point | Rect | RectPositioned) => p is Points.Point;
    export const isRect: (p: number | unknown) => p is Rect;
    /**
     * Returns true if `p` is a positioned rectangle
     * @param p
     * @returns
     */
    export const isRectPositioned: (p: Rect | RectPositioned | any) => p is RectPositioned;
    export const fromElement: (el: HTMLElement) => Rect;
    export const isEqualSize: (a: Rect, b: Rect) => boolean;
    /**
     * Returns a rectangle from width, height
     * ```js
     * const r = Rects.fromNumbers(100, 200);
     * // {width: 100, height: 200}
     * ```
     *
     * Use {@link toArray} for the opposite conversion.
     *
     * @param width
     * @param height
     */
    export function fromNumbers(width: number, height: number): Rect;
    /**
     * Returns a rectangle from x,y,width,height
     * ```js
     * const r = Rects.fromNumbers(10, 20, 100, 200);
     * // {x: 10, y: 20, width: 100, height: 200}
     * ```
     *
     * Use the spread operator (...) if the source is an array:
     * ```js
     * const r3 = Rects.fromNumbers(...[10, 20, 100, 200]);
     * ```
     *
     * Use {@link toArray} for the opposite conversion.
     *
     * @param x
     * @param y
     * @param width
     * @param height
     */
    export function fromNumbers(x: number, y: number, width: number, height: number): RectPositioned;
    /**
     * Rectangle as array
     */
    export type RectArray = readonly [width: number, height: number];
    /**
     * Positioned rectangle as array
     */
    export type RectPositionedArray = readonly [x: number, y: number, width: number, height: number];
    /**
     * Converts a rectangle to an array of numbers. See {@link fromNumbers} for the opposite conversion.
     *
     * ```js
     * const r1 = Rects.toArray({ x: 10, y:20, width: 100, height: 200 });
     * // [10, 20, 100, 200]
     * const r2 = Rects.toArray({ width: 100, height: 200 });
     * // [100, 200]
     * ```
     * @param rect
     * @see fromNumbers
     */
    export function toArray(rect: Rect): RectArray;
    /**
     * Converts a rectangle to an array of numbers. See {@link fromNumbers} for the opposite conversion.
     *
     * ```js
     * const r1 = Rects.toArray({ x: 10, y:20, width: 100, height: 200 });
     * // [10, 20, 100, 200]
     * const r2 = Rects.toArray({ width: 100, height: 200 });
     * // [100, 200]
     * ```
     * @param rect
     * @see fromNumbers
     */
    export function toArray(rect: RectPositioned): RectPositionedArray;
    export const isEqual: (a: Rect | RectPositioned, b: Rect | RectPositioned) => boolean;
    /**
     * Subtracts width/height of `b` from `a` (ie: a - b), returning result.
     *
     * x,y coords from `a` will be unchanged
     * @param a
     * @param b
     */
    export function subtract(a: Rect, b: Rect): Rect;
    /**
     * Subtracts a width/height from `a`, returning result.
     *
     * x,y coords from a will be unchanged
     * @param a
     * @param width
     * @param height
     */
    export function subtract(a: Rect, width: number, height?: number): Rect;
    /**
     * Returns true if `point` is within, or on boundary of `rect`.
     * @param rect
     * @param point
     */
    export function intersectsPoint(rect: Rect | RectPositioned, point: Points.Point): boolean;
    /**
     * Returns true if x,y coordinate is within, or on boundary of `rect`.
     * @param rect
     * @param x
     * @param y
     */
    export function intersectsPoint(rect: Rect | RectPositioned, x: number, y: number): boolean;
    export const fromCenter: (origin: Points.Point, width: number, height: number) => RectPositioned;
    /**
     * Returns the distance from the perimeter of `rect` to `pt`.
     * If the point is within the rectangle, 0 is returned.
     *
     * If `rect` does not have an x,y it's assumed to be 0,0
     * @param rect Rectangle
     * @param pt Point
     * @returns Distance
     */
    export const distanceFromExterior: (rect: RectPositioned, pt: Points.Point) => number;
    export const distanceFromCenter: (rect: RectPositioned, pt: Points.Point) => number;
    /**
     * Returns a rectangle based on provided four corners.
     *
     * To create a rectangle that contains an arbitary set of points, use {@link Geometry.Points.bbox | Geometry.Points.bbox}.
     *
     * Does some sanity checking such as:
     *  - x will be smallest of topLeft/bottomLeft
     *  - y will be smallest of topRight/topLeft
     *  - width will be largest between top/bottom left and right
     *  - height will be largest between left and right top/bottom
     */
    export const maxFromCorners: (topLeft: Points.Point, topRight: Points.Point, bottomRight: Points.Point, bottomLeft: Points.Point) => RectPositioned;
    export const guard: (rect: Rect, name?: string) => void;
    export const fromTopLeft: (origin: Points.Point, width: number, height: number) => RectPositioned;
    export const corners: (rect: RectPositioned | Rect, origin?: Points.Point) => readonly Points.Point[];
    /**
     * Returns a point on the edge of rectangle
     * ```js
     * const r1 = {x: 10, y: 10, width: 100, height: 50};
     * getEdgeX(r1, `right`);  // Yields: 110
     * getEdgeX(r1, `bottom`); // Yields: 60
     *
     * const r2 = {width: 100, height: 50};
     * getEdgeX(r2, `right`);  // Yields: 100
     * getEdgeX(r2, `bottom`); // Yields: 50
     * ```
     * @param rect
     * @param edge Which edge: right, left, bottom, top
     * @returns
     */
    export const getEdgeX: (rect: RectPositioned | Rect, edge: `right` | `bottom` | `left` | `top`) => number;
    export const getEdgeY: (rect: RectPositioned | Rect, edge: `right` | `bottom` | `left` | `top`) => number;
    /**
     * Returns `rect` divided by the width,height of `normaliseBy`. This can be useful for
     * normalising based on camera frame.
     * ```js
     * const frameSize = {width: 640, height: 320};
     * const object = { x: 320, y: 160, width: 64, height: 32};
     *
     * const n = normaliseByRect(object, frameSize);
     * // Yields: {x: 0.5, y: 0.5, width: 0.1, height: 0.1}
     * ```
     *
     * Height and width can be supplied instead of a rectangle too:
     * ```js
     * const n = normaliseByRect(object, 640, 320);
     * ```
     * @param rect
     * @param normaliseBy
     * @returns
     */
    export const normaliseByRect: (rect: Rect | RectPositioned, normaliseByOrWidth: Rect | number, height?: number) => Rect | RectPositioned;
    /**
     * Multiplies `a` by rectangle or width/height. Useful for denormalising a value.
     *
     * ```js
     * // Normalised rectangle of width 50%, height 50%
     * const r = {width: 0.5, height: 0.5};
     *
     * // Map to window:
     * const rr = multiply(r, window.innerWidth, window.innerHeight);
     * ```
     *
     * ```js
     * // Returns {width: someRect.width * someOtherRect.width ...}
     * multiply(someRect, someOtherRect);
     *
     * // Returns {width: someRect.width * 100, height: someRect.height * 200}
     * multiply(someRect, 100, 200);
     * ```
     *
     * Multiplication applies to the first parameter's x/y fields, if present.
     */
    export function multiply(a: RectPositioned, b: Rect | number, c?: number): RectPositioned;
    /**
     * Multiplies `a` by rectangle or width/height. Useful for denormalising a value.
     *
     * ```js
     * // Normalised rectangle of width 50%, height 50%
     * const r = {width: 0.5, height: 0.5};
     *
     * // Map to window:
     * const rr = multiply(r, window.innerWidth, window.innerHeight);
     * ```
     *
     * ```js
     * // Returns {width: someRect.width * someOtherRect.width ...}
     * multiply(someRect, someOtherRect);
     *
     * // Returns {width: someRect.width * 100, height: someRect.height * 200}
     * multiply(someRect, 100, 200);
     * ```
     *
     * Multiplication applies to the first parameter's x/y fields, if present.
     */
    export function multiply(a: Rect, b: Rect | number, c?: number): Rect;
    /**
     * Returns the center of a rectangle as a {@link Geometry.Points.Point}.
     *  If the rectangle lacks a position and `origin` parameter is not provided, 0,0 is used instead.
     *
     * ```js
     * const p = center({x:10, y:20, width:100, height:50});
     * const p2 = center({width: 100, height: 50}); // Assumes 0,0 for rect x,y
     * ```
     * @param rect Rectangle
     * @param origin Optional origin. Overrides `rect` position if available. If no position is available 0,0 is used by default.
     * @returns
     */
    export const center: (rect: RectPositioned | Rect, origin?: Points.Point) => Points.Point;
    /**
     * Returns the length of each side of the rectangle (top, right, bottom, left)
     * @param rect
     * @returns
     */
    export const lengths: (rect: RectPositioned) => readonly number[];
    /**
     * Returns four lines based on each corner.
     * Lines are given in order: top, right, bottom, left
     *
     * @param {(RectPositioned|Rect)} rect
     * @param {Points.Point} [origin]
     * @returns {Lines.Line[]}
     */
    export const edges: (rect: RectPositioned | Rect, origin?: Points.Point) => readonly Lines.Line[];
    /**
     * Returns the perimeter of `rect` (ie. sum of all edges)
     * @param rect
     * @returns
     */
    export const perimeter: (rect: Rect) => number;
    /**
     * Returns the area of `rect`
     * @param rect
     * @returns
     */
    export const area: (rect: Rect) => number;
}
declare module "geometry/Ellipse" {
    import { Path } from "geometry/Path";
    import { Points } from "geometry/index";
    /**
     * An ellipse
     */
    export type Ellipse = {
        readonly radiusX: number;
        readonly radiusY: number;
        /**
         * Rotation, in radians
         */
        readonly rotation?: number;
        readonly startAngle?: number;
        readonly endAngle?: number;
    };
    /**
     * A {@link Ellipse} with position
     */
    export type EllipsePositioned = Points.Point & Ellipse;
    export const fromDegrees: (radiusX: number, radiusY: number, rotationDeg?: number, startAngleDeg?: number, endAngleDeg?: number) => Ellipse;
    export type EllipticalPath = Ellipse & Path & {
        readonly kind: `elliptical`;
    };
}
declare module "geometry/Polar" {
    import * as Points from "geometry/Point";
    /**
     * Polar coordinate, made up of a distance and angle in radians.
     * Most computations involving Coords require an `origin` as well.
     */
    export type Coord = {
        readonly distance: number;
        readonly angleRadian: number;
    };
    /**
     * Converts to Cartesian coordiantes
     */
    type ToCartesian = {
        (point: Coord, origin?: Points.Point): Points.Point;
        (distance: number, angleRadians: number, origin?: Points.Point): Points.Point;
    };
    /**
     * Returns true if `p` seems to be a {@link Coord} (ie has both distance & angleRadian fields)
     * @param p
     * @returns True if `p` seems to be a Coord
     */
    export const isCoord: (p: number | unknown) => p is Coord;
    /**
     * Converts a Cartesian coordinate to polar
     * @param point Point
     * @param origin Origin
     * @returns
     */
    export const fromCartesian: (point: Points.Point, origin: Points.Point) => Coord;
    /**
     * Converts a polar coordinate to a Cartesian one
     * @param a
     * @param b
     * @param c
     * @returns
     */
    export const toCartesian: ToCartesian;
    /**
     * Produces an Archimedean spiral. It's a generator.
     *
     * ```js
     * const s = spiral(0.1, 1);
     * for (const coord of s) {
     *  // Use Polar coord...
     *  if (coord.step === 1000) break; // Stop after 1000 iterations
     * }
     * ```
     *
     * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
     * @param zoom At smoothness 0.1, zoom starting at 1 is OK
     */
    export function spiral(smoothness: number, zoom: number): IterableIterator<Coord & {
        readonly step: number;
    }>;
    /**
     * Returns a rotated coordiante
     * @param c Coordinate
     * @param amountRadian Amount to rotate, in radians
     * @returns
     */
    export const rotate: (c: Coord, amountRadian: number) => Coord;
    /**
     * Returns a rotated coordinate
     * @param c Coordinate
     * @param amountDeg Amount to rotate, in degrees
     * @returns
     */
    export const rotateDegrees: (c: Coord, amountDeg: number) => Coord;
    /**
     * Produces an Archimedian spiral with manual stepping.
     * @param step Step number. Typically 0, 1, 2 ...
     * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
     * @param zoom At smoothness 0.1, zoom starting at 1 is OK
     * @returns
     */
    export const spiralRaw: (step: number, smoothness: number, zoom: number) => Coord;
}
declare module "geometry/Shape" {
    import { Triangles, Points, Rects, Circles } from "geometry/index";
    /**
     * Returns the center of a shape
     * Shape can be: rectangle, triangle, circle
     * @param shape
     * @returns
     */
    export const center: (shape?: Rects.Rect | Triangles.Triangle | Circles.Circle) => Points.Point;
    /**
     * Generates a starburst shape, returning an array of points. By default, initial point is top and horizontally-centred.
     *
     * ```
     * // Generate a starburst with four spikes
     * const pts = starburst(4, 100, 200);
     * ```
     *
     * `points` of two produces a lozenge shape.
     * `points` of three produces a triangle shape.
     * `points` of five is the familiar 'star' shape.
     *
     * Note that the path will need to be closed back to the first point to enclose the shape.
     *
     * @example Create starburst and draw it. Note use of 'loop' flag to close the path
     * ```
     * const points = starburst(4, 100, 200);
     * Drawing.connectedPoints(ctx, pts, {loop: true, fillStyle: `orange`, strokeStyle: `red`});
     * ```
     *
     * Options:
     * * initialAngleRadian: angle offset to begin from. This overrides the `-Math.PI/2` default.
     *
     * @param points Number of points in the starburst. Defaults to five, which produces a typical star
     * @param innerRadius Inner radius. A proportionally smaller inner radius makes for sharper spikes. If unspecified, 50% of the outer radius is used.
     * @param outerRadius Outer radius. Maximum radius of a spike to origin
     * @param opts Options
     * @param origin Origin, or `{ x:0, y:0 }` by default.
     */
    export const starburst: (outerRadius: number, points?: number, innerRadius?: number, origin?: Points.Point, opts?: {
        readonly initialAngleRadian?: number;
    }) => readonly Points.Point[];
    export type ArrowOpts = {
        readonly arrowSize?: number;
        readonly tailLength?: number;
        readonly tailThickness?: number;
        readonly angleRadian?: number;
    };
    /**
     * Returns the points forming an arrow.
     *
     * @example Create an arrow anchored by its tip at 100,100
     * ```js
     * const opts = {
     *  tailLength: 10,
     *  arrowSize: 20,
     *  tailThickness: 5,
     *  angleRadian: degreeToRadian(45)
     * }
     * const arrow = Shapes.arrow({x:100, y:100}, `tip`, opts); // Yields an array of points
     *
     * // Eg: draw points
     * Drawing.connectedPoints(ctx, arrow, {strokeStyle: `red`, loop: true});
     * ```
     *
     * @param origin Origin of arrow
     * @param from Does origin describe the tip, tail or middle?
     * @param opts Options for arrow
     * @returns
     */
    export const arrow: (origin: Points.Point, from: `tip` | `tail` | `middle`, opts?: ArrowOpts) => readonly Points.Point[];
}
declare module "geometry/TriangleEquilateral" {
    import { Circle } from "geometry/Circle";
    import { Point } from "geometry/Point";
    import { Triangle } from "geometry/Triangle";
    export type TriangleEquilateral = {
        readonly length: number;
    } | number;
    /**
     * Returns a positioned `Triangle` from an equilateral triangle definition.
     * By default the rotation is such that point `a` and `c` are lying on the horizontal,
     * and `b` is the upward-facing tip.
     *
     * Default is a triangle pointing upwards with b at the top, c to the left and b to right on the baseline.
     *
     * Example rotation values in radians:
     * * ▶️ 0: a and c on vertical, b at the tip
     * * ◀️ Math.PI: `c`and `a` are on vertical, with `b` at the tip.
     * * 🔽 Math.PI/2: `c` and `a` are on horizontal, `c` to the left. `b` at the bottom.
     * * 🔼 Math.PI*1.5: `c` and `a` are on horizontal, `c` to the right. `b` at the top. (default)
     * @param t
     * @param origin
     * @param rotationRad
     * @returns
     */
    export const fromCenter: (t: TriangleEquilateral, origin?: Point, rotationRad?: number) => Triangle;
    /**
     * Calculate center from the given point A
     * @param t
     * @param ptA
     * @returns
     */
    export const centerFromA: (t: TriangleEquilateral, ptA?: Point) => Point;
    /**
     * Calculate center from the given point B
     * @param t
     * @param ptB
     * @returns
     */
    export const centerFromB: (t: TriangleEquilateral, ptB?: Point) => Point;
    /**
     * Calculate center from the given point C
     * @param t
     * @param ptC
     * @returns
     */
    export const centerFromC: (t: TriangleEquilateral, ptC?: Point) => Point;
    /**
     * Returns the height (or rise) of an equilateral triangle.
     * Ie. from one vertex to the perpendicular edge.
     * (line marked x in the diagram below)
     *
     * ```
     *      .
     *     .x .
     *    . x  .
     *   .  x   .
     *  ..........
     * ```
     * @param t
     */
    export const height: (t: TriangleEquilateral) => number;
    export const perimeter: (t: TriangleEquilateral) => number;
    export const area: (t: TriangleEquilateral) => number;
    /**
     * Circle that encompasses all points of triangle
     * @param t
     */
    export const circumcircle: (t: TriangleEquilateral) => Circle;
    /**
     * Circle that is inside the edges of the triangle
     * @param t
     * @returns
     */
    export const incircle: (t: TriangleEquilateral) => Circle;
}
declare module "geometry/TriangleRight" {
    import { Points, Triangles } from "geometry/index";
    import { Circle } from "geometry/Circle";
    export type Right = {
        readonly adjacent?: number;
        readonly hypotenuse?: number;
        readonly opposite?: number;
    };
    export type DefinedRight = {
        readonly adjacent: number;
        readonly hypotenuse: number;
        readonly opposite: number;
    };
    /**
     * Returns a positioned triangle from a point for A.
     *
     * ```
     *             c (90 deg)
     *             .
     *          .   .
     *       .       .
     *    .           .
     * a .............. b
     * ```
     * @param t
     * @param origin
     * @returns
     */
    export const fromA: (t: Right, origin?: Points.Point) => Triangles.Triangle;
    /**
     * Returns a positioned triangle from a point for B.
     *
     * ```
     *             c (90 deg)
     *             .
     *          .   .
     *       .       .
     *    .           .
     * a .............. b
     * ```
     * @param t
     * @param origin
     * @returns
     */
    export const fromB: (t: Right, origin?: Points.Point) => Triangles.Triangle;
    /**
     * Returns a positioned triangle from a point for C.
     *
     * ```
     *             c (90 deg)
     *             .
     *          .   .
     *       .       .
     *    .           .
     * a .............. b
     * ```
     * @param t
     * @param origin
     * @returns
     */
    export const fromC: (t: Right, origin?: Points.Point) => Triangles.Triangle;
    /**
     * Returns a right triangle with all lengths defined.
     * At least two lengths must already exist
     * @param t
     * @returns
     */
    export const resolveLengths: (t: Right) => DefinedRight;
    /**
     * Height of right-triangle
     * @param t
     * @returns
     */
    export const height: (t: Right) => number;
    /**
     * Returns the lengths of the hypotenuse split into p and q segments.
     * In other words, if one makes a line from the right-angle vertex down to hypotenuse.
     *
     * [See here](https://rechneronline.de/pi/right-triangle.php)
     * @param t
     * @returns
     */
    export const hypotenuseSegments: (t: Right) => readonly [p: number, q: number];
    export const perimeter: (t: Right) => number;
    export const area: (t: Right) => number;
    /**
     * Angle (in radians) between hypotenuse and adjacent edge
     * @param t
     * @returns
     */
    export const angleAtPointA: (t: Right) => number;
    /**
     * Angle (in radians) between opposite edge and hypotenuse
     * @param t
     * @returns
     */
    export const angleAtPointB: (t: Right) => number;
    /**
     * Returns the median line lengths a, b and c in an array.
     *
     * The median lines are the lines from each vertex to the center.
     *
     * @param t
     * @returns
     */
    export const medians: (t: Right) => readonly [a: number, b: number, c: number];
    /**
     * The circle which passes through the points of the triangle
     * @param t
     * @returns
     */
    export const circumcircle: (t: Right) => Circle;
    /**
     * Circle enclosed by triangle
     * @param t
     * @returns
     */
    export const incircle: (t: Right) => Circle;
    /**
     * Returns the opposite length of a right-angle triangle,
     * marked here
     *
     * ```
     *    .  <
     *   ..  <
     * ....  <
     * ```
     *
     * This is just:
     * ```js
     * opposite = Math.tan(angle) * adjacent
     * ```
     * @param angleRad
     * @param adjacent
     * @returns
     */
    export const oppositeFromAdjacent: (angleRad: number, adjacent: number) => number;
    /**
     * Returns the opposite length of a right-angle triangle,
     * marked here
     *
     * ```
     *    .  <
     *   ..  <
     * ....  <
     * ```
     *
     * This is just:
     * ```js
     * opposite = Math.tan(angle) * adjacent
     * ```
     * @param angleRad
     * @param hypotenuse
     * @returns
     */
    export const oppositeFromHypotenuse: (angleRad: number, hypotenuse: number) => number;
    /**
     * Returns the adjecent length of a right-angle triangle,
     * marked here
     * ```
     *    .
     *   ..  o
     * ....
     * ^^^^
     * ```
     * This is just:
     * ```js
     * opposite = Math.tan(angle) * adjacent
     * ```
     * @param angleRad
     * @param adjacent
     * @returns
     */
    export const adjacentFromHypotenuse: (angleRad: number, hypotenuse: number) => number;
    /**
     * Returns the adjecent length of a right-angle triangle,
     * marked here
     * ```
     *    .
     *   ..  o
     * ....
     * ^^^^
     * ```
     * This is just:
     * ```js
     * opposite = Math.tan(angle) * adjacent
     * ```
     * @param angleRad
     * @param opposite
     * @returns
     */
    export const adjacentFromOpposite: (angleRad: number, opposite: number) => number;
    /**
     * Returns the hypotenuse length of a right-angle triangle,
     * marked here
     * ```
     *      .
     * >   ..
     * >  ...
     * > ....  opp
     *  .....
     *   adj
     * ```
     * This is just:
     * ```js
     * opposite = Math.tan(angle) * adjacent
     * ```
     * @param angleRad
     * @param adjacent
     * @returns
     */
    export const hypotenuseFromOpposite: (angleRad: number, opposite: number) => number;
    /**
     * Returns the hypotenuse length of a right-angle triangle,
     * marked here
     * ```
     *      .
     * >   ..
     * >  ...
     * > ....  opp
     *  .....
     *   adj
     * ```
     * This is just:
     * ```js
     * opposite = Math.tan(angle) * adjacent
     * ```
     * @param angleRad
     * @param adjacent
     * @returns
     */
    export const hypotenuseFromAdjacent: (angleRad: number, adjacent: number) => number;
}
declare module "geometry/TriangleIsosceles" {
    import { Points, Triangles } from "geometry/index";
    import { Circle } from "geometry/Circle";
    export type Isosceles = {
        readonly legs: number;
        readonly base: number;
    };
    export const baseAngle: (t: Isosceles) => number;
    export const apexAngle: (t: Isosceles) => number;
    export const height: (t: Isosceles) => number;
    export const legHeights: (t: Isosceles) => number;
    export const perimeter: (t: Isosceles) => number;
    export const area: (t: Isosceles) => number;
    export const circumcircle: (t: Isosceles) => Circle;
    export const incircle: (t: Isosceles) => Circle;
    export const medians: (t: Isosceles) => readonly [a: number, b: number, c: number];
    /**
     * Returns a positioned `Triangle` based on a center origin.
     * Center is determined by the intesecting of the medians.
     *
     * See: https://rechneronline.de/pi/isosceles-triangle.php
     * @param t
     * @param origin
     * @returns
     */
    export const fromCenter: (t: Isosceles, origin?: Points.Point) => Triangles.Triangle;
    export const fromA: (t: Isosceles, origin?: Points.Point) => Triangles.Triangle;
    export const fromB: (t: Isosceles, origin?: Points.Point) => Triangles.Triangle;
    export const fromC: (t: Isosceles, origin?: Points.Point) => Triangles.Triangle;
}
declare module "geometry/Triangle" {
    import { Lines, Circles, Rects } from "geometry/index";
    import * as Points from "geometry/Point";
    /**
     * Functions for working with equilateral triangles, defined by length
     */
    export * as Equilateral from "geometry/TriangleEquilateral";
    /**
     * Functions for working with right-angled triangles, defined by two of three edges
     */
    export * as Right from "geometry/TriangleRight";
    export * as Isosceles from "geometry/TriangleIsosceles";
    /**
     * Triangle.
     *
     * Helpers for creating:
     *  - {@link fromFlatArray}: Create from [x1, y1, x2, y2, x3, y3]
     *  - {@link fromPoints}: Create from three `{x,y}` sets
     *  - {@link fromRadius}: Equilateral triangle of a given radius and center
     */
    export type Triangle = {
        readonly a: Points.Point;
        readonly b: Points.Point;
        readonly c: Points.Point;
    };
    /**
     * A triangle consisting of three empty points (Points.Empty)
     */
    export const Empty: Readonly<{
        a: {
            x: number;
            y: number;
        };
        b: {
            x: number;
            y: number;
        };
        c: {
            x: number;
            y: number;
        };
    }>;
    /**
     * A triangle consisting of three placeholder points (Points.Placeholder)
     */
    export const Placeholder: Readonly<{
        a: {
            x: number;
            y: number;
        };
        b: {
            x: number;
            y: number;
        };
        c: {
            x: number;
            y: number;
        };
    }>;
    /**
     * Returns true if triangle is empty
     * @param t
     * @returns
     */
    export const isEmpty: (t: Triangle) => boolean;
    /**
     * Returns true if triangle is a placeholder
     * @param t
     * @returns
     */
    export const isPlaceholder: (t: Triangle) => boolean;
    /**
     * Applies `fn` to each of a triangle's corner points, returning the result.
     *
     * @example Add some random to the x of each corner
     * ```
     * const t = apply(tri, p => {
     *  const r = 10;
     *  return {
     *    x: p.x + (Math.random()*r*2) - r,
     *    y: p.y
     *  }
     * });
     * ```
     * @param t
     * @param fn
     * @returns
     */
    export const apply: (t: Triangle, fn: (p: Points.Point, label?: string) => Points.Point) => Readonly<Triangle>;
    /**
     * Throws an exception if the triangle is invalid
     * @param t
     * @param name
     */
    export const guard: (t: Triangle, name?: string) => void;
    /**
     * Returns true if the parameter appears to be a valid triangle
     * @param p
     * @returns
     */
    export const isTriangle: (p: number | unknown) => p is Triangle;
    /**
     * Returns true if the two parameters have equal values
     * @param a
     * @param b
     * @returns
     */
    export const isEqual: (a: Triangle, b: Triangle) => boolean;
    /**
     * Returns the corners (vertices) of the triangle as an array of points
     * @param t
     * @returns Array of length three
     */
    export const corners: (t: Triangle) => readonly Points.Point[];
    /**
     * Returns the edges (ie sides) of the triangle as an array of lines
     * @param t
     * @returns Array of length three
     */
    export const edges: (t: Triangle) => Lines.PolyLine;
    /**
     * Returns the lengths of the triangle sides
     * @param t
     * @returns Array of length three
     */
    export const lengths: (t: Triangle) => readonly number[];
    /**
     * Return the three interior angles of the triangle, in radians.
     * @param t
     * @returns
     */
    export const angles: (t: Triangle) => readonly number[];
    /**
     * Returns the three interior angles of the triangle, in degrees
     * @param t
     * @returns
     */
    export const anglesDegrees: (t: Triangle) => readonly number[];
    /**
     * Returns true if it is an equilateral triangle
     * @param t
     * @returns
     */
    export const isEquilateral: (t: Triangle) => boolean;
    /**
     * Returns true if it is an isoceles triangle
     * @param t
     * @returns
     */
    export const isIsoceles: (t: Triangle) => boolean;
    /**
     * Returns true if at least one interior angle is 90 degrees
     * @param t
     * @returns
     */
    export const isRightAngle: (t: Triangle) => boolean;
    /**
     * Returns true if triangle is oblique: No interior angle is 90 degrees
     * @param t
     * @returns
     */
    export const isOblique: (t: Triangle) => boolean;
    /**
     * Returns true if triangle is actue: all interior angles less than 90 degrees
     * @param t
     * @returns
     */
    export const isAcute: (t: Triangle) => boolean;
    /**
     * Returns true if triangle is obtuse: at least one interior angle is greater than 90 degrees
     * @param t
     * @returns
     */
    export const isObtuse: (t: Triangle) => boolean;
    /**
     * Returns simple centroid of triangle
     * @param t
     * @returns
     */
    export const centroid: (t: Triangle) => Points.Point;
    /**
     * Calculates perimeter of a triangle
     * @param t
     * @returns
     */
    export const perimeter: (t: Triangle) => number;
    /**
     * Calculates the area of a triangle
     * @param t
     * @returns
     */
    export const area: (t: Triangle) => number;
    /**
     * Returns the largest circle enclosed by triangle `t`.
     * @param t
     */
    export const innerCircle: (t: Triangle) => Circles.CirclePositioned;
    /**
     * Returns the largest circle touching the corners of triangle `t`.
     * @param t
     * @returns
     */
    export const outerCircle: (t: Triangle) => Circles.CirclePositioned;
    /**
     * Returns an equilateral triangle centered at the origin.
     *
     * ```js
     * // Create a triangle at 100,100 with radius of 60
     * const tri = fromRadius({x:100,y:100}, 60);
     *
     * // Triangle with point A upwards, B to the right, C to the left
     * constr tri2 = fromRadius({x:100,y:100}, 60, {initialAngleRadian: -Math.PI / 2});
     * ```
     *
     *
     * @param origin
     * @param length
     */
    export const fromRadius: (origin: Points.Point, radius: number, opts?: {
        readonly initialAngleRadian?: number;
    }) => Triangle;
    /**
     * Rotates the vertices of the triangle around one point (by default, `b`).
     * @param triangle Triangle
     * @param vertex Name of vertex: a, b or c.
     */
    export const rotateByVertex: (triangle: Triangle, amountRadian: number, vertex?: `a` | `b` | `c`) => Triangle;
    /**
     * Returns a triangle anchored at `origin` with a given `length` and `angleRadian`.
     * The origin will be point `b` of the triangle, and the angle will be the angle for b.
     * @param origin Origin
     * @param length Length
     * @param angleRadian Angle
     * @returns
     */
    export const equilateralFromVertex: (origin?: Points.Point, length?: number, angleRadian?: number) => Triangle;
    /**
     * Returns the coordinates of triangle in a flat array form:
     * [xA, yA, xB, yB, xC, yC]
     * @param t
     * @returns
     */
    export const toFlatArray: (t: Triangle) => readonly number[];
    /**
     * Returns a triangle from a set of coordinates in a flat array form:
     * [xA, yA, xB, yB, xC, yC]
     * @param coords
     * @returns
     */
    export const fromFlatArray: (coords: readonly number[]) => Triangle;
    /**
     * Returns a triangle from an array of three points
     * @param points
     * @returns
     */
    export const fromPoints: (points: readonly Points.Point[]) => Triangle;
    /**
     * Returns the bounding box that encloses the triangle.
     * @param t
     * @param inflation If specified, box will be inflated by this much. Default: 0.
     * @returns
     */
    export const bbox: (t: Triangle, inflation?: number) => Rects.RectPositioned;
    export type BarycentricCoord = {
        readonly a: number;
        readonly b: number;
        readonly c: number;
    };
    /**
     * Returns the [Barycentric coordinate](https://en.wikipedia.org/wiki/Barycentric_coordinate_system) of a point within a triangle
     *
     * @param t
     * @param a
     * @param b
     * @returns
     */
    export const barycentricCoord: (t: Triangle, a: Points.Point | number, b?: number) => BarycentricCoord;
    /**
     * Convert Barycentric coordinate to Cartesian
     * @param t
     * @param bc
     * @returns
     */
    export const barycentricToCartestian: (t: Triangle, bc: BarycentricCoord) => Points.Point;
    /**
     * Returns true if point is within or on the boundary of triangle
     * @param t
     * @param a
     * @param b
     */
    export const intersectsPoint: (t: Triangle, a: Points.Point | number, b?: number) => boolean;
    /**
     * Returns a triangle that is rotated by `angleRad`. By default it rotates
     * around its center but an arbitrary `origin` point can be provided.
     *
     * ```js
     * // Rotate triangle by 5 degrees
     * rotate(triangle, degreeToRadian(5));
     *
     * // Rotate by 90 degrees
     * rotate(triangle, Math.PI / 2);
     * ```
     * @param line Line to rotate
     * @param amountRadian Angle in radians to rotate by
     * @param origin Point to rotate around. If undefined, middle of line will be used
     * @returns
     */
    export const rotate: (t: Triangle, amountRadian?: number, origin?: Points.Point) => Triangle;
}
declare module "geometry/index" {
    import * as Arcs from "geometry/Arc";
    import * as Beziers from "geometry/Bezier";
    import * as Circles from "geometry/Circle";
    import * as Compound from "geometry/CompoundPath";
    import * as Grids from "geometry/Grid";
    import * as Lines from "geometry/Line";
    import * as Paths from "geometry/Path";
    import * as Points from "geometry/Point";
    import * as Rects from "geometry/Rect";
    import * as Ellipses from "geometry/Ellipse";
    import * as Polar from "geometry/Polar";
    import * as Shapes from "geometry/Shape";
    export { Circles, Arcs, Lines, Rects, Points, Paths, Grids, Beziers, Compound, Ellipses, Polar, Shapes };
    /**
     * Triangle processing.
     *
     * Helpers for creating:
     * - {@link Triangles.fromFlatArray}: Create from `[ x1, y1, x2, y2, x3, y3 ]`
     * - {@link Triangles.fromPoints}: Create from three `{ x, y }` sets
     * - {@link Triangles.fromRadius}: Equilateral triangle of a given radius and center
     *
     * There are two sub-modules for dealing with particular triangles:
     * - {@link Triangles.Equilateral}: Equilateral triangls
     * - {@link Triangles.Right}: Right-angled triangles
     */
    export * as Triangles from "geometry/Triangle";
    /**
     * Convert angle in degrees to angle in radians.
     * @param angleInDegrees
     * @returns
     */
    export function degreeToRadian(angleInDegrees: number): number;
    /**
     * Convert angles in degrees to angles in radians
     * @param angleInDegrees
     */
    export function degreeToRadian(angleInDegrees: readonly number[]): readonly number[];
    /**
     * Convert angle in radians to angle in degrees
     * @param angleInRadians
     * @returns
     */
    export function radianToDegree(angleInRadians: number): number;
    /**
     * Convert angles in radians to angles in degrees
     * @param angleInRadians
     */
    export function radianToDegree(angleInRadians: readonly number[]): readonly number[];
    /**
     * Angle from x-axis to point (ie. `Math.atan2`)
     * @param point
     * @returns
     */
    export const radiansFromAxisX: (point: Points.Point) => number;
}
declare module "flow/StateMachine" {
    import { SimpleEventEmitter } from "Events";
    export interface Options {
        readonly debug?: boolean;
    }
    export interface StateChangeEvent {
        readonly newState: string;
        readonly priorState: string;
    }
    export interface StopEvent {
        readonly state: string;
    }
    export type StateMachineEventMap = {
        readonly change: StateChangeEvent;
        readonly stop: StopEvent;
    };
    export type StateEvent = (args: unknown, sender: StateMachine) => void;
    export type StateHandler = string | StateEvent | null;
    export interface State {
        readonly [event: string]: StateHandler;
    }
    export interface MachineDescription {
        readonly [key: string]: string | readonly string[] | null;
    }
    /**
     * Returns a machine description based on a list of strings. The final string is the final
     * state.
     *
     * ```js
     * const states = [`one`, `two`, `three`];
     * const sm = StateMachine.create(states[0], descriptionFromList(states));
     * ```
     * @param states List of states
     * @return MachineDescription
     */
    export const descriptionFromList: (...states: readonly string[]) => MachineDescription;
    /**
     * Returns a state machine based on a list of strings. The first string is used as the initial state,
     * the last string is considered the final. To just generate a description, use {@link descriptionFromList}.
     *
     * ```js
     * const states = [`one`, `two`, `three`];
     * const sm = StateMachine.fromList(states);
     * ```
     */
    export const fromList: (...states: readonly string[]) => StateMachine;
    /**
     * Creates a new state machine
     * @param initial Initial state
     * @param m Machine description
     * @param opts Options
     * @returns State machine instance
     */
    export const create: (initial: string, m: MachineDescription, opts?: Options) => StateMachine;
    /**
     * State machine
     *
     * Machine description is a simple object of possible state names to allowed state(s). Eg. the following
     * has four possible states (`wakeup, sleep, coffee, breakfast, bike`). `Sleep` can only transition to the `wakeup`
     * state, while `wakeup` can transition to either `coffee` or `breakfast`.
     *
     * Use `null` to signify the final state. Multiple states can terminate the machine if desired.
     * ```
     * const description = {
     *  sleep: 'wakeup',
     *  wakeup: ['coffee', 'breakfast'],
     *  coffee: `bike`,
     *  breakfast: `bike`,
     *  bike: null
     * }
     * ```
     * Create the machine with the starting state (`sleep`)
     * ```
     * const machine = StateMachine.create(`sleep`, description);
     * ```
     *
     * Change the state by name:
     * ```
     * machine.state = `wakeup`
     * ```
     *
     * Or request an automatic transition (will use first state if there are several options)
     * ```
     * machine.next();
     * ```
     *
     * Check status
     * ```
     * if (machine.state === `coffee`) ...;
     * if (machine.isDone()) ...
     * ```
     *
     * Listen for state changes
     * ```
     * machine.addEventListener(`change`, (evt) => {
     *  const {priorState, newState} = evt;
     *  console.log(`State change from ${priorState} -> ${newState}`);
     * });
     * ```
     * @export
     * @class StateMachine
     * @extends {SimpleEventEmitter<StateMachineEventMap>}
     */
    export class StateMachine extends SimpleEventEmitter<StateMachineEventMap> {
        #private;
        /**
         * Create a state machine with initial state, description and options
         * @param string initial Initial state
         * @param MachineDescription m Machine description
         * @param Options Options for machine (defaults to `{debug:false}`)
         * @memberof StateMachine
         */
        constructor(initial: string, m: MachineDescription, opts?: Options);
        get states(): readonly string[];
        static validate(initial: string, m: MachineDescription): readonly [boolean, string];
        /**
         * Moves to the next state if possible. If multiple states are possible, it will use the first.
         * If machine is finalised, no error is thrown and null is returned.
         *
         * @returns {(string|null)} Returns new state, or null if machine is finalised
         * @memberof StateMachine
         */
        next(): string | null;
        /**
         * Returns true if state machine is in its final state
         *
         * @returns
         * @memberof StateMachine
         */
        get isDone(): boolean;
        /**
         * Resets machine to initial state
         *
         * @memberof StateMachine
         */
        reset(): void;
        /**
         * Checks whether a state change is valid.
         *
         * @static
         * @param priorState From state
         * @param newState To state
         * @param description Machine description
         * @returns If valid: [true,''], if invalid: [false, 'Error msg here']
         * @memberof StateMachine
         */
        static isValid(priorState: string, newState: string, description: MachineDescription): readonly [boolean, string];
        isValid(newState: string): readonly [boolean, string];
        /**
         * Gets or sets state. Throws an error if an invalid transition is attempted.
         * Use `StateMachine.isValid` to check validity without changing.
         *
         * @memberof StateMachine
         */
        set state(newState: string);
        get state(): string;
    }
}
declare module "io/Codec" {
    /**
     * Handles utf-8 text encoding/decoding
     */
    export class Codec {
        enc: TextEncoder;
        dec: TextDecoder;
        /**
         * Convert string to Uint8Array buffer
         * @param str
         * @returns
         */
        toBuffer(str: string): Uint8Array;
        /**
         * Returns a string from a provided buffer
         * @param buffer
         * @returns
         */
        fromBuffer(buffer: ArrayBuffer): string;
    }
}
declare module "io/StringReceiveBuffer" {
    /**
     * Receives text
     */
    export class StringReceiveBuffer {
        private onData;
        separator: string;
        buffer: string;
        stream: WritableStream<string> | undefined;
        constructor(onData: (data: string) => void, separator?: string);
        clear(): void;
        writable(): WritableStream<string>;
        private createWritable;
        addImpl(str: string): string;
        add(str: string): void;
    }
}
declare module "flow/Sleep" {
    /**
     * Returns after `timeoutMs`.
     *
     * @example In an async function
     * ```js
     * console.log(`Hello`);
     * await sleep(1000);
     * console.log(`There`); // Prints one second after
     * ```
     *
     * @example As a promise
     * ```js
     * console.log(`Hello`);
     * sleep(1000)
     *  .then(() => console.log(`There`)); // Prints one second after
     * ```
     *
     * If a timeout of 0 is given, `requestAnimationFrame` is used instead of `setTimeout`.
     *
     * {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
     *
     * @param timeoutMs
     * @return
     */
    export const sleep: <V>(timeoutMs: number, value?: V | undefined) => Promise<V | undefined>;
}
declare module "flow/Timer" {
    import { HasCompletion } from "flow/index";
    /**
     * Creates a timer
     */
    export type TimerSource = () => Timer;
    /**
     * A timer instance
     */
    export type Timer = {
        reset(): void;
        get elapsed(): number;
    };
    export type ModTimer = Timer & {
        mod(amt: number): void;
    };
    export const frequencyTimerSource: (frequency: number) => TimerSource;
    /**
     * Wraps a timer, returning a relative elapsed value.
     *
     * ```js
     * let t = relativeTimer(1000, msElapsedTimer());
     * ```
     *
     * @private
     * @param total
     * @param timer
     * @param clampValue If true, returned value never exceeds 1.0
     * @returns
     */
    export const relativeTimer: (total: number, timer: Timer, clampValue?: boolean) => ModTimer & HasCompletion;
    export const frequencyTimer: (frequency: number, timer?: Timer) => ModTimer;
    /**
     * A timer that uses clock time
     * @private
     * @returns {Timer}
     */
    export const msElapsedTimer: () => Timer;
    /**
     * A timer that progresses with each call
     * @private
     * @returns {Timer}
     */
    export const ticksElapsedTimer: () => Timer;
}
declare module "flow/Interval" {
    export type IntervalAsync<V> = (() => V | Promise<V>) | Generator<V>;
    /**
     * Generates values from `produce` with `intervalMs` time delay.
     * `produce` can be a simple function that returns a value, an async function, or a generator.
     *
     * @example Produce a random number every 500ms:
     * ```
     * const randomGenerator = interval(() => Math.random(), 1000);
     * for await (const r of randomGenerator) {
     *  // Random value every 1 second
     *  // Warning: does not end by itself, a `break` statement is needed
     * }
     * ```
     *
     * @example Return values from a generator every 500ms:
     * ```js
     * // Make a generator that counts to 10
     * const counter = count(10);
     * for await (const v of interval(counter, 1000)) {
     *  // Do something with `v`
     * }
     * ```
     *
     * If you just want to loop at a certain speed, consider using {@link continuously} instead.
     * @template V Returns value of `produce` function
     * @param intervalMs Interval between execution
     * @param produce Function to call
     * @template V Data type
     * @returns
     */
    export const interval: <V>(produce: IntervalAsync<V>, intervalMs: number) => AsyncGenerator<Awaited<V>, void, unknown>;
}
declare module "flow/Timeout" {
    import { HasCompletion } from "flow/index";
    export type TimeoutSyncCallback = (elapsedMs?: number, ...args: readonly unknown[]) => void;
    export type TimeoutAsyncCallback = (elapsedMs?: number, ...args: readonly unknown[]) => Promise<void>;
    /**
     * A resettable timeout, returned by {@link timeout}
     */
    export type Timeout = HasCompletion & {
        start(altTimeoutMs?: number, args?: readonly unknown[]): void;
        cancel(): void;
        get isDone(): boolean;
    };
    /**
     * Returns a {@link Timeout} that can be triggered, cancelled and reset
     *
     * Once `start()` is called, `callback` will be scheduled to execute after `timeoutMs`.
     * If `start()` is called again, the waiting period will be reset to `timeoutMs`.
     *
     * @example Essential functionality
     * ```js
     * const fn = () => {
     *  console.log(`Executed`);
     * };
     * const t = timeout(fn, 60*1000);
     * t.start();   // After 1 minute `fn` will run, printing to the console
     * ```
     *
     * @example Control execution functionality
     * ```
     * t.cancel();  // Cancel it from running
     * t.start();   // Schedule again after 1 minute
     * t.start(30*1000); // Cancel that, and now scheduled after 30s
     * t.isDone;    // True if a scheduled event is pending
     * ```
     *
     * Callback function receives any additional parameters passed in from start.
     * This can be useful for passing through event data:
     *
     * @example
     * ```js
     * const t = timeout( (elapsedMs, ...args) => {
     *  // args contains event data
     * }, 1000);
     * el.addEventListener(`click`, t.start);
     * ```
     *
     * Asynchronous callbacks can be used as well:
     * ```js
     * timeout(async () => {...}, 100);
     * ```
     *
     * If you don't expect to need to control the timeout, consider using {@link delay},
     * which can run a given function after a specified delay.
     * @param callback
     * @param timeoutMs
     * @returns {@link Timeout}
     */
    export const timeout: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, timeoutMs: number) => Timeout;
}
declare module "flow/UpdateOutdated" {
    export type UpdateFailPolicy = `fast` | `slow` | `backoff`;
    /**
     * Calls the async `fn` to generate a value if there is no prior value or
     * `intervalMs` has elapsed since value was last generated.
     * @example
     * ```js
     * const f = updateOutdated(async () => {
     *  const r = await fetch(`blah`);
     *  return await r.json();
     * }, 60*1000);
     *
     * // Result will be JSON from fetch. If fetch happened already in the
     * // last 60s, return cached result. Otherwise it will fetch data
     * const result = await f();
     * ```
     *
     * Callback `fn` is passed how many milliseconds have elapsed since last update. It's
     * minimum value will be `intervalMs`.
     *
     * ```js
     * const f = updateOutdated(async elapsedMs => {
     *  // Do something with elapsedMs?
     * }, 60*1000;
     * ```
     *
     * There are different policies for what to happen if `fn` fails. `slow` is the default.
     * * `fast`: Invocation will happen immediately on next attempt
     * * `slow`: Next invocation will wait `intervalMs` as if it was successful
     * * `backoff`: Attempts will get slower and slower until next success. Interval is multipled by 1.2 each time.
     *
     * @param fn Async function to call. Must return a value.
     * @param intervalMs Maximum age of cached result
     * @param updateFail `slow` by default
     * @returns Value
     */
    export const updateOutdated: <V>(fn: (elapsedMs?: number) => Promise<V>, intervalMs: number, updateFail?: UpdateFailPolicy) => () => Promise<V>;
}
declare module "flow/Continuously" {
    import { HasCompletion } from "flow/index";
    /**
     * Runs a function continuously, returned by {@link Continuously}
     */
    export type Continuously = HasCompletion & {
        /**
         * Starts loop. If already running, it is reset
         */
        start(): void;
        /**
         * How many milliseconds since start() was last called
         */
        get elapsedMs(): number;
        /**
         * How many iterations of the loop since start() was last called
         */
        get ticks(): number;
        /**
         * Whether loop has finished
         */
        get isDone(): boolean;
        /**
         * Stops loop
         */
        cancel(): void;
        set intervalMs(ms: number);
        get intervalMs(): number;
    };
    export type ContinuouslySyncCallback = (ticks?: number, elapsedMs?: number) => boolean | void;
    export type ContinuouslyAsyncCallback = (ticks?: number, elapsedMs?: number) => Promise<boolean | void>;
    /**
     * Returns a {@link Continuously} that continuously executes `callback`.
     * If callback returns _false_, loop exits.
     *
     * Call `start` to begin/reset loop. `cancel` stops loop.
     *
     * @example Animation loop
     * ```js
     * const draw = () => {
     *  // Draw on canvas
     * }
     *
     * // Run draw() synchronised with monitor refresh rate via `window.requestAnimationFrame`
     * continuously(draw).start();
     * ```
     *
     * @example With delay
     * ```js
     * const fn = () => {
     *  console.log(`1 minute`);
     * }
     * const c = continuously(fn, 60*1000);
     * c.start(); // Runs `fn` every minute
     * ```
     *
     * @example Control a 'continuously'
     * ```js
     * c.cancel();   // Stop the loop, cancelling any up-coming calls to `fn`
     * c.elapsedMs;  // How many milliseconds have elapsed since start
     * c.ticks;      // How many iterations of loop since start
     * ```
     *
     * Asynchronous callback functions are supported too:
     * ```js
     * continuously(async () => { ..});
     * ```
     *
     * The `callback` function can receive a few arguments:
     * ```js
     * continuously( (ticks, elapsedMs) => {
     *  // ticks: how many times loop has run
     *  // elapsedMs:  how long since last loop
     * }).start();
     * ```
     *
     * And if `callback` explicitly returns _false_, the loop will exit:
     * ```js
     * continuously((ticks) => {
     *  // Stop after 100 iterations
     *  if (ticks > 100) return false;
     * }).start();
     * ```
     * @param callback Function to run. If it returns false, loop exits.
     * @param resetCallback Callback when/if loop is reset. If it returns false, loop exits
     * @param intervalMs
     * @returns
     */
    export const continuously: (callback: ContinuouslyAsyncCallback | ContinuouslySyncCallback, intervalMs?: number, resetCallback?: ((ticks?: number, elapsedMs?: number) => boolean | void) | undefined) => Continuously;
}
declare module "flow/Debounce" {
    import { TimeoutSyncCallback, TimeoutAsyncCallback } from "flow/Timeout";
    /**
     * Returns a debounce function which acts to filter calls to a given function `fn`.
     *
     * Eg, Let's create a debounced wrapped for a function:
     * ```js
     * const fn = () => console.log('Hello');
     * const debouncedFn = debounce(fn, 1000);
     * ```
     *
     * Now we can call `debouncedFn()` as often as we like, but it will only execute
     * `fn()` after 1 second has elapsed since the last invocation. It essentially filters
     * many calls to fewer calls. Each time `debounceFn()` is called, the timeout is
     * reset, so potentially `fn` could never be called if the rate of `debounceFn` being called
     * is faster than the provided timeout.
     *
     * Remember that to benefit from `debounce`, you must call the debounced wrapper, not the original function.
     *
     * ```js
     * // Create
     * const d = debounce(fn, 1000);
     *
     * // Don't do this if we want to benefit from the debounce
     * fn();
     *
     * // Use the debounced wrapper
     * d(); // Only calls fn after 1000s
     * ```
     *
     * A practical use for this is handling high-frequency streams of data, where we don't really
     * care about processing every event, only last event after a period. Debouncing is commonly
     * used on microcontrollers to prevent button presses being counted twice.
     *
     * @example Handle most recent pointermove event after 1000ms
     * ```js
     * // Set up debounced handler
     * const moveDebounced = debounce((elapsedMs, evt) => {
     *    // Handle event
     * }, 500);
     *
     * // Wire up event
     * el.addEventListener(`pointermove`, moveDebounced);
     * ```
     *
     * Arguments can be passed to the debounced function:
     *
     * ```js
     * const fn = (x) => console.log(x);
     * const d = debounce(fn, 1000);
     * d(10);
     * ```
     *
     * If the provided function is asynchronous, it's possible to await the debounced
     * version as well. If the invocation was filtered, it returns instantly.
     *
     * ```js
     * const d = debounce(fn, 1000);
     * await d();
     * ```
     * @param callback Function to filter access to
     * @param timeoutMs Minimum time between invocations
     * @returns Debounce function
     */
    export const debounce: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, timeoutMs: number) => DebouncedFunction;
    /**
     * Debounced function
     */
    export type DebouncedFunction = (...args: readonly unknown[]) => void;
}
declare module "flow/Throttle" {
    /***
     * Throttles a function. Callback only allowed to run after minimum of `intervalMinMs`.
     *
     * @example Only handle move event every 500ms
     * ```js
     * const moveThrottled = throttle( (elapsedMs, args) => {
     *  // Handle ar
     * }, 500);
     * el.addEventListener(`pointermove`, moveThrottled)
     * ```
     *
     * Note that `throttle` does not schedule invocations, but rather acts as a filter that
     * sometimes allows follow-through to `callback`, sometimes not. There is an expectation then
     * that the return function from `throttle` is repeatedly called, such as the case for handling
     * a stream of data/events.
     *
     * @example Manual trigger
     * ```js
     * // Set up once
     * const t = throttle( (elapsedMs, args) => { ... }, 5000);
     *
     * // Later, trigger throttle. Sometimes the callback will run,
     * // with data passed in to args[0]
     * t(data);
     * ```
     */
    export const throttle: (callback: (elapsedMs: number, ...args: readonly unknown[]) => void | Promise<unknown>, intervalMinMs: number) => (...args: unknown[]) => Promise<void>;
}
declare module "flow/WaitFor" {
    /**
     * Helper function for calling code that should fail after a timeout.
     * In short, it allows you to signal when the function succeeded, to cancel it, or
     * to be notified if it was canceled or completes.
     *
     *
     * @example Verbose example
     * ```js
     * // This function is called by `waitFor` if it was cancelled
     * const onAborted = (reason:string) => {
     *  // 'reason' is a string describing why it has aborted.
     *  // ie: due to timeout or because done() was called with an error
     * };
     *
     * // This function is called by `waitFor` if it completed
     * const onComplete = (success:boolean) => {
     *  // Called if we were aborted or finished succesfully.
     *  // onComplete will be called after onAborted, if it was an error case
     * }
     *
     * // If done() is not called after 1000, onAborted will be called
     * // if done() is called or there was a timeout, onComplete is called
     * const done = waitFor(1000, onAborted, onComplete);
     *
     * // Signal completed successfully (thus calling onComplete(true))
     * done();
     *
     * // Signal there was an error (thus calling onAborted and onComplete(false))
     * done(`Some error`);
     * ```
     *
     * The completion handler is useful for removing event handlers.
     *
     * @example Compact example
     * ```js
     * const done = waitFor(1000,
     *  (reason) => {
     *    console.log(`Aborted: ${reason}`);
     *  },
     *  (success) => {
     *    console.log(`Completed. Success: ${success ?? `Yes!` : `No`}`)
     *  });
     *
     * try {
     *  runSomethingThatMightScrewUp();
     *  done(); // Signal it succeeded
     * } catch (e) {
     *  done(e); // Signal there was an error
     * }
     * ```
     * @param timeoutMs
     * @param onAborted
     * @param onComplete
     * @returns
     */
    export const waitFor: (timeoutMs: number, onAborted: (reason: string) => void, onComplete?: ((success: boolean) => void) | undefined) => (error?: string) => void;
}
declare module "flow/Delay" {
    /**
     * Pauses execution for `timeoutMs` after which the asynchronous `callback` is executed and awaited.
     *
     * @example Pause and wait for function
     * ```js
     * const result = await delay(async () => Math.random(), 1000);
     * console.log(result); // Prints out result after one second
     * ```
     *
     * If `await` is omitted, the function will run after the provided timeout, and code will continue to run.
     *
     * @example Schedule a function without waiting
     * ```js
     * delay(async () => {
     *  console.log(Math.random())
     * }, 1000);
     * // Prints out a random number after 1 second.
     * ```
     *
     * {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
     *
     *
     * If you want to be able to cancel or re-run a delayed function, consider using
     * {@link timeout} instead.
     *
     * @template V
     * @param callback What to run after `timeoutMs`
     * @param timeoutMs How long to delay
     * @return Returns result of `callback`.
     */
    export const delay: <V>(callback: () => Promise<V>, timeoutMs: number) => Promise<V>;
    /**
     * Async generator that loops at a given `timeoutMs`.
     *
     * @example Loop runs every second
     * ```
     * // Loop forever
     * (async () => {
     *  const loop = delayLoop(1000);
     *  while (true) {
     *    await loop.next();
     *
     *    // Do something...
     *    // Warning: loops forever
     *  }
     * })();
     * ```
     *
     * @example For Await loop every second
     * ```
     * const loop = delayLoop(1000);
     * for await (const o of loop) {
     *  // Do something...
     *  // Warning: loops forever
     * }
     * ```
     * @param timeoutMs Delay. If 0 is given, `requestAnimationFrame` is used over `setTimeout`.
     */
    export function delayLoop(timeoutMs: number): AsyncGenerator<undefined, void, unknown>;
}
declare module "flow/index" {
    import * as StateMachine from "flow/StateMachine";
    export { StateMachine };
    export * from "flow/Timer";
    export * from "flow/Interval";
    export * from "flow/Timeout";
    export * from "flow/UpdateOutdated";
    export * from "flow/Continuously";
    export * from "flow/Debounce";
    export * from "flow/Throttle";
    export * from "flow/Sleep";
    export * from "flow/WaitFor";
    export * from "flow/Delay";
    export type HasCompletion = {
        get isDone(): boolean;
    };
    /**
     * Iterates over `iterator` (iterable/array), calling `fn` for each value.
     * If `fn` returns _false_, iterator cancels.
     *
     * Over the default JS `forEach` function, this one allows you to exit the
     * iteration early.
     *
     * @example
     * ```js
     * forEach(count(5), () => console.log(`Hi`));  // Prints `Hi` 5x
     * forEach(count(5), i => console.log(i));      // Prints 0 1 2 3 4
     * forEach([0,1,2,3,4], i => console.log(i));   // Prints 0 1 2 3 4
     * ```
     *
     * Use {@link forEachAsync} if you want to use an async `iterator` and async `fn`.
     * @param iterator Iterable or array
     * @typeParam V Type of iterable
     * @param fn Function to call for each item. If function returns _false_, iteration cancels
     */
    export const forEach: <V>(iterator: IterableIterator<V> | readonly V[], fn: (v?: V | undefined) => boolean | void) => void;
    /**
     * Iterates over an async iterable or array, calling `fn` for each value, with optional
     * interval between each loop. If the async `fn` returns _false_, iterator cancels.
     *
     * Use {@link forEach} for a synchronous version.
     *
     * ```
     * // Prints items from array every second
     * await forEachAsync([0,1,2,3], i => console.log(i), 1000);
     * ```
     *
     * @example Retry `doSomething` up to five times, with 5 seconds between each attempt
     * ```
     * await forEachAsync(count(5), i=> {
     *  try {
     *    await doSomething();
     *    return false; // Succeeded, exit early
     *  } catch (ex) {
     *    console.log(ex);
     *    return true; // Keep trying
     *  }
     * }, 5000);
     * ```
     * @param iterator Iterable thing to loop over
     * @param fn Function to invoke on each item. If it returns _false_ loop ends.
     * @typeParam V Type of iterable
     */
    export const forEachAsync: <V>(iterator: AsyncIterableIterator<V> | readonly V[], fn: (v?: V | undefined) => Promise<boolean> | Promise<void>, intervalMs?: number) => Promise<void>;
    export type RepeatPredicate = (repeats: number, valuesProduced: number) => boolean;
    /**
     * Runs `fn` a certain number of times, accumulating result into an array.
     * If `fn` returns undefined, the result is ignored.
     *
     * ```js
     * // Results will be an array with five random numbers
     * const results = repeat(5, () => Math.random());
     * ```
     *
     * Repeats can be specified as an integer (eg. 5 for five repeats), or a function
     * that gives _false_ when repeating should stop.
     *
     * ```js
     * // Keep running `fn` until we've accumulated 10 values
     * // Useful if `fn` sometimes returns _undefined_
     * const results = repeat((repeats, valuesProduced) => valuesProduced < 10, fn);
     * ```
     *
     * If you don't need to accumulate return values, consider {@link Generators.count | Generators.count} with {@link Flow.forEach | Flow.forEach}.
     *
     * @param countOrPredicate Number of repeats or function returning false when to stop
     * @param fn Function to run, must return a value to accumulate into array or _undefined_
     * @returns Array of accumulated results
     */
    export const repeat: <V>(countOrPredicate: number | RepeatPredicate, fn: () => V | undefined) => readonly V[];
}
declare module "io/StringWriteBuffer" {
    import { QueueMutable } from "collections/index";
    import { Continuously } from "flow/index";
    export class StringWriteBuffer {
        private onData;
        private chunkSize;
        paused: boolean;
        queue: QueueMutable<string>;
        writer: Continuously;
        intervalMs: number;
        stream: WritableStream<string> | undefined;
        constructor(onData: (data: string) => Promise<void>, chunkSize?: number);
        clear(): void;
        writable(): WritableStream<string>;
        private createWritable;
        onWrite(): Promise<boolean>;
        add(str: string): void;
    }
}
declare module "flow/Retry" {
    export type CancelToken = {
        readonly cancel: boolean;
    };
    /**
     * Keeps executing `calback` until it runs without an exception being thrown.
     *
     * ```
     * // Retry up to five times, starting at 200ms delay
     * await retry(async () => {
     *  // Do something, sometimes throwing an error
     * }, 5, 200);
     * ```
     *
     * Each loop will run at twice the duration of the last, beginning at `startingTimeoutMs`.
     *
     * @param callback Async code to run
     * @param attempts Number of times to try
     * @param startingTimeoutMs Time to sleep for first iteration
     * @param cancelToken If provided, this is checked before and after each sleep to see if retry should continue. If cancelled, promise will be rejected
     * @returns
     */
    export const retry: <V>(callback: () => Promise<V>, attempts?: number, startingTimeoutMs?: number, cancelToken?: CancelToken) => Promise<V>;
}
declare module "io/EspruinoBleDevice" {
    import { EvalOpts, Options } from "io/Espruino";
    import { NordicBleDevice } from "io/NordicBleDevice";
    /**
     * An Espruino BLE-connection
     *
     * Use the `puck` function to initialise and connect to a Puck.js.
     * It must be called in a UI event handler for browser security reasons.
     *
     * ```js
     * const e = await puck();
     * ```
     *
     * Listen for events:
     * ```js
     * // Received something
     * e.addEventListener(`data`, d => console.log(d.data));
     * // Monitor connection state
     * e.addEventListener(`change`, c => console.log(`${d.priorState} -> ${d.newState}`));
     * ```
     *
     * Write to the device (note the \n for a new line at the end of the string). This will
     * execute the code on the Espruino.
     *
     * ```js
     * e.write(`digitalPulse(LED1,1,[10,500,10,500,10]);\n`);
     * ```
     *
     * Run some code and return result:
     * ```js
     * const result = await e.eval(`2+2\n`);
     * ```
     */
    export class EspruinoBleDevice extends NordicBleDevice {
        evalTimeoutMs: number;
        evalReplyBluetooth: boolean;
        /**
         * Creates instance. You probably would rather use {@link puck} to create.
         * @param device
         * @param opts
         */
        constructor(device: BluetoothDevice, opts?: Options);
        /**
         * Writes a script to Espruino.
         *
         * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
         * and then the provided `code` followed by a new line.
         *
         * Use {@link eval} instead to execute remote code and get the result back.
         *
         * ```js
         * // Eg from https://www.espruino.com/Web+Bluetooth
         * writeScript(`
         *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
         *  NRF.on('disconnect',()=>reset());
         * `);
         * ```
         *
         * @param code Code to send. A new line is added automatically.
         */
        writeScript(code: string): Promise<void>;
        /**
         * Sends some code to be executed on the Espruino. The result
         * is packaged into JSON and sent back to your code. An exception is
         * thrown if code can't be executed for some reason.
         *
         * ```js
         * const sum = await e.eval(`2+2`);
         * ```
         *
         * It will wait for a period of time for a well-formed response from the
         * Espruino. This might not happen if there is a connection problem
         * or a syntax error in the code being evaled. In cases like the latter,
         * it will take up to `timeoutMs` (default 5 seconds) before we give up
         * waiting for a correct response and throw an error.
         *
         * Tweaking of the timeout may be required if `eval()` is giving up too quickly
         * or too slowly. A default timeout can be given when creating the class.
         *
         * Options:
         *  timeoutMs: Timeout for execution. 5 seconds by default
         *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. True by default
         * @param code Code to run on the Espruino.
         * @param opts Options
         */
        eval(code: string, opts?: EvalOpts): Promise<string>;
    }
}
declare module "io/JsonDevice" {
    import { SimpleEventEmitter } from "Events";
    import { StateChangeEvent, StateMachine } from "flow/StateMachine";
    import { Codec } from "io/Codec";
    import { StringReceiveBuffer } from "io/StringReceiveBuffer";
    import { StringWriteBuffer } from "io/StringWriteBuffer";
    /**
     * Options for JsonDevice
     */
    export type JsonDeviceOpts = {
        /**
         * How much data to transfer at a time
         */
        readonly chunkSize?: number;
        /**
         * Name of device. This is only used for assisting the console.log output
         */
        readonly name?: string;
        /**
         * Number of times to automatically try to reconnect
         */
        readonly connectAttempts?: number;
        /**
         * If true, additional logging will be done
         */
        readonly debug?: boolean;
    };
    /**
     * Data received event
     */
    export type JsonDataEvent = {
        /**
         * Data received
         */
        readonly data: string;
    };
    /**
     * Events emitted by JsonDevice
     */
    export type JsonDeviceEvents = {
        /**
         * Data received
         */
        readonly data: JsonDataEvent;
        /**
         * State changed
         */
        readonly change: StateChangeEvent;
    };
    export abstract class JsonDevice extends SimpleEventEmitter<JsonDeviceEvents> {
        states: StateMachine;
        codec: Codec;
        verboseLogging: boolean;
        name: string;
        connectAttempts: number;
        chunkSize: number;
        rxBuffer: StringReceiveBuffer;
        txBuffer: StringWriteBuffer;
        constructor(config?: JsonDeviceOpts);
        get isConnected(): boolean;
        get isClosed(): boolean;
        write(txt: string): void;
        /**
         * Writes text to output device
         * @param txt
         */
        protected abstract writeInternal(txt: string): void;
        close(): void;
        /**
         * Must change state
         */
        abstract onClosed(): void;
        abstract onPreConnect(): Promise<void>;
        connect(): Promise<void>;
        /**
         * Should throw if did not succeed.
         */
        protected abstract onConnectAttempt(): Promise<void>;
        private onRx;
        protected verbose(m: string): void;
        protected log(m: string): void;
        protected warn(m: unknown): void;
    }
}
declare module "io/Serial" {
    import { JsonDevice, JsonDeviceOpts, JsonDeviceEvents, JsonDataEvent } from "io/JsonDevice";
    export { JsonDeviceEvents, JsonDeviceOpts, JsonDataEvent };
    export type SerialOpts = JsonDeviceOpts & {
        readonly filters?: ReadonlyArray<SerialPortFilter>;
        readonly baudRate?: number;
        /**
         * End-of-line string sequence. \r\n by default.
         */
        readonly eol?: string;
    };
    /**
     * Serial device. Assumes data is sent with new line characters (\r\n) between messages.
     *
     * ```
     * const s = new Device();
     * s.addEventListener(`change`, evt => {
     *  console.log(`State change ${evt.priorState} -> ${evt.newState}`);
     *  if (evt.newState === `connected`) {
     *    // Do something when connected...
     *  }
     * });
     *
     * // In a UI event handler...
     * s.connect();
     * ```
     *
     * Reading incoming data:
     * ```
     * // Parse incoming data as JSON
     * s.addEventListener(`data`, evt => {
     *  try {
     *    const o = JSON.parse(evt.data);
     *    // If we get this far, JSON is legit
     *  } catch (ex) {
     *  }
     * });
     * ```
     *
     * Writing to the microcontroller
     * ```
     * s.write(JSON.stringify({msg:"hello"}));
     * ```
     */
    export class Device extends JsonDevice {
        private config;
        port: SerialPort | undefined;
        tx: WritableStreamDefaultWriter<string> | undefined;
        baudRate: number;
        constructor(config?: SerialOpts);
        /**
         * Writes text collected in buffer
         * @param txt
         */
        protected writeInternal(txt: string): Promise<void>;
        onClosed(): void;
        onPreConnect(): Promise<void>;
        onConnectAttempt(): Promise<void>;
    }
}
declare module "io/EspruinoSerialDevice" {
    import { EvalOpts } from "io/Espruino";
    import { Device as SerialDevice, SerialOpts } from "io/Serial";
    export type EspruinoSerialDeviceOpts = SerialOpts & {
        readonly evalTimeoutMs?: number;
    };
    export class EspruinoSerialDevice extends SerialDevice {
        evalTimeoutMs: number;
        evalReplyBluetooth: boolean;
        constructor(opts?: EspruinoSerialDeviceOpts);
        disconnect(): void;
        /**
         * Writes a script to Espruino.
         *
         * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
         * and then the provided `code` followed by a new line.
         *
         * Use {@link eval} instead to execute remote code and get the result back.
         *
         * ```js
         * // Eg from https://www.espruino.com/Web+Bluetooth
         * writeScript(`
         *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
         *  NRF.on('disconnect',()=>reset());
         * `);
         * ```
         *
         * @param code Code to send. A new line is added automatically.
         */
        writeScript(code: string): Promise<void>;
        /**
         * Sends some code to be executed on the Espruino. The result
         * is packaged into JSON and sent back to your code. An exception is
         * thrown if code can't be executed for some reason.
         *
         * ```js
         * const sum = await e.eval(`2+2`);
         * ```
         *
         * It will wait for a period of time for a well-formed response from the
         * Espruino. This might not happen if there is a connection problem
         * or a syntax error in the code being evaled. In cases like the latter,
         * it will take up to `timeoutMs` (default 5 seconds) before we give up
         * waiting for a correct response and throw an error.
         *
         * Tweaking of the timeout may be required if `eval()` is giving up too quickly
         * or too slowly. A default timeout can be given when creating the class.
         *
         * Options:
         *  timeoutMs: Timeout for execution. 5 seconds by default
         *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. True by default
         * @param code Code to run on the Espruino.
         * @param opts Options
         */
        eval(code: string, opts?: EvalOpts): Promise<string>;
    }
}
declare module "io/Espruino" {
    import { EspruinoBleDevice } from "io/EspruinoBleDevice";
    import { StateChangeEvent } from "flow/StateMachine";
    import { ISimpleEventEmitter } from "Events";
    import { EspruinoSerialDevice, EspruinoSerialDeviceOpts } from "io/EspruinoSerialDevice";
    export { EspruinoBleDevice, EspruinoSerialDevice, EspruinoSerialDeviceOpts };
    export type DataEvent = {
        readonly data: string;
    };
    export type Events = {
        readonly data: DataEvent;
        readonly change: StateChangeEvent;
    };
    /**
     * Options for device
     */
    export type Options = {
        /**
         * Default milliseconds to wait before giving up on a well-formed reply. 5 seconds is the default.
         */
        readonly evalTimeoutMs?: number;
        /**
         * Name of device. Only used for printing log mesages to the console
         */
        readonly name?: string;
        /**
         * If true, additional logging information is printed
         */
        readonly debug?: boolean;
    };
    /**
     * Options for code evaluation
     */
    export type EvalOpts = {
        /**
         * Milliseconds to wait before giving up on well-formed reply. 5 seconds is the default.
         */
        readonly timeoutMs?: number;
        /**
         * If true (default), it assumes that anything received from the board
         * is a response to the eval
         */
        readonly assumeExclusive?: boolean;
    };
    /**
     * Instantiates a Puck.js. See {@link EspruinoBleDevice} for more info.
     * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
     */
    export const puck: (opts?: {
        readonly name?: string;
        readonly debug?: boolean;
    }) => Promise<EspruinoBleDevice>;
    /**
     * Create a serial-connected Espruino device. See {@link EspruinoSerialDevice} for more info.
     * @param opts
     * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
     */
    export const serial: (opts?: {
        readonly name?: string;
        readonly debug?: boolean;
        readonly evalTimeoutMs?: number;
    }) => Promise<EspruinoSerialDevice>;
    /**
     * Connects to a generic Espruino BLE device. See  {@link EspruinoBleDevice} for more info.
     * Use {@link puck} if you're connecting to a Puck.js
     * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
     */
    export const connectBle: () => Promise<EspruinoBleDevice>;
    export interface EspruinoDevice extends ISimpleEventEmitter<Events> {
        write(m: string): void;
        writeScript(code: string): void;
        disconnect(): void;
        get evalTimeoutMs(): number;
    }
    export const deviceEval: (code: string, opts: EvalOpts | undefined, device: EspruinoDevice, evalReplyPrefix: string, debug: boolean, warn: (m: string) => void) => Promise<string>;
}
declare module "io/BleDevice" {
    import { SimpleEventEmitter } from "Events";
    import { StateMachine } from "flow/StateMachine";
    import { Codec } from "io/Codec";
    import { StringReceiveBuffer } from "io/StringReceiveBuffer";
    import { StringWriteBuffer } from "io/StringWriteBuffer";
    import { Events } from "io/Espruino";
    export type Opts = {
        readonly service: string;
        readonly rxGattCharacteristic: string;
        readonly txGattCharacteristic: string;
        readonly chunkSize: number;
        readonly name: string;
        readonly connectAttempts: number;
        readonly debug: boolean;
    };
    export class BleDevice extends SimpleEventEmitter<Events> {
        private device;
        private config;
        states: StateMachine;
        codec: Codec;
        rx: BluetoothRemoteGATTCharacteristic | undefined;
        tx: BluetoothRemoteGATTCharacteristic | undefined;
        gatt: BluetoothRemoteGATTServer | undefined;
        verboseLogging: boolean;
        rxBuffer: StringReceiveBuffer;
        txBuffer: StringWriteBuffer;
        constructor(device: BluetoothDevice, config: Opts);
        get isConnected(): boolean;
        get isClosed(): boolean;
        write(txt: string): void;
        private writeInternal;
        disconnect(): void;
        connect(): Promise<void>;
        private onRx;
        protected verbose(m: string): void;
        protected log(m: string): void;
        protected warn(m: unknown): void;
    }
}
declare module "io/NordicBleDevice" {
    import { BleDevice } from "io/BleDevice";
    export const defaultOpts: {
        chunkSize: number;
        service: string;
        txGattCharacteristic: string;
        rxGattCharacteristic: string;
        name: string;
        connectAttempts: number;
        debug: boolean;
    };
    export type Opts = {
        readonly chunkSize?: number;
        readonly name?: string;
        readonly connectAttempts?: number;
        readonly debug?: boolean;
    };
    export class NordicBleDevice extends BleDevice {
        constructor(device: BluetoothDevice, opts?: Opts);
    }
}
declare module "data/TrackedValue" {
    import { GetOrGenerate } from "collections/Map";
    export type Timestamped<V> = V & {
        readonly at: number;
    };
    /**
     * Options
     */
    export type TrackedValueOpts = {
        /**
         * If true, intermediate points are stored. False by default
         */
        readonly storeIntermediate?: boolean;
        /**
         * If above zero, tracker will reset after this many samples
         */
        readonly resetAfterSamples?: number;
    };
    export abstract class TrackerBase<V> {
        readonly id: string;
        /**
         * @ignore
         */
        seenCount: number;
        /**
        * @ignore
        */
        protected storeIntermediate: boolean;
        /**
        * @ignore
        */
        protected resetAfterSamples: number;
        constructor(id: string, opts?: TrackedValueOpts);
        /**
         * Reset tracker
         */
        reset(): void;
        seen(...p: V[]): any;
        /**
         * @ignore
         * @param p
         */
        abstract seenImpl(p: V[]): V[];
        abstract get last(): V | undefined;
        /**
         * Returns the initial value, or undefined
         */
        abstract get initial(): V | undefined;
        /**
         * Returns the elapsed milliseconds since the initial value
         */
        abstract get elapsed(): number;
        /**
         * @ignore
         */
        onSeen(_p: V[]): void;
        /**
         * @ignore
         */
        abstract onReset(): void;
    }
    export class PrimitiveTracker<V extends number | string> extends TrackerBase<V> {
        values: V[];
        timestamps: number[];
        constructor(id: string, opts: TrackedValueOpts);
        get last(): V | undefined;
        get initial(): V | undefined;
        /**
       * Returns number of recorded values (this can include the initial value)
       */
        get size(): number;
        /**
         * Returns the elapsed time, in milliseconds since the instance was created
         */
        get elapsed(): number;
        onReset(): void;
        /**
         * Tracks a value
         */
        seenImpl(p: V[]): V[];
    }
    /**
     * A tracked value of type `V`.
     */
    export class ObjectTracker<V> extends TrackerBase<V> {
        values: Timestamped<V>[];
        constructor(id: string, opts?: TrackedValueOpts);
        /**
         * Allows sub-classes to be notified when a reset happens
         * @ignore
         */
        onReset(): void;
        /**
         * Tracks a value
         * @ignore
         */
        seenImpl(p: V[] | Timestamped<V>[]): Timestamped<V>[];
        /**
         * Last seen value. If no values have been added, it will return the initial value
         */
        get last(): Timestamped<V>;
        /**
         * Returns the initial value
         */
        get initial(): Timestamped<V> | undefined;
        /**
         * Returns number of recorded values (includes the initial value in the count)
         */
        get size(): number;
        /**
         * Returns the elapsed time, in milliseconds since the initial value
         */
        get elapsed(): number;
    }
    export class TrackedValueMap<V> {
        store: Map<string, TrackerBase<V>>;
        gog: GetOrGenerate<string, TrackerBase<V>, V>;
        constructor(creator: (key: string, start: V | undefined) => TrackerBase<V>);
        /**
         * Return number of named points being tracked
         */
        get size(): number;
        /**
         * Returns true if `id` is stored
         * @param id
         * @returns
         */
        has(id: string): boolean;
        /**
         * For a given id, note that we have seen one or more values.
         * @param id Id
         * @param values Values(s)
         * @returns Information about start to last value
         */
        seen(id: string, ...values: V[]): Promise<any>;
        /**
         * Creates or returns a TrackedValue instance for `id`.
         * @param id
         * @param values
         * @returns
         */
        protected getTrackedValue(id: string, ...values: V[]): Promise<TrackerBase<V>>;
        /**
         * Remove a tracked value by id.
         * Use {@link reset} to clear them all.
         * @param id
         */
        delete(id: string): void;
        /**
         * Remove all tracked values.
         * Use {@link delete} to remove a single value by id.
         */
        reset(): void;
        /**
         * Enumerate ids
         */
        ids(): Generator<string, void, undefined>;
        /**
         * Enumerate tracked values
         */
        values(): Generator<TrackerBase<V>, void, undefined>;
        /**
         * Returns TrackedValues ordered with oldest first
         * @returns
         */
        trackedByAge(): readonly TrackerBase<V>[];
        valuesByAge(): readonly V[];
        /**
         * Enumerate last received values
         *
         * @example Calculate centroid of latest-received values
         * ```js
         * const pointers = pointTracker();
         * const c = Points.centroid(...Array.from(pointers.lastPoints()));
         * ```
         */
        last(): Generator<V | undefined, void, unknown>;
        /**
         * Enumerate starting values
         */
        initialValues(): Generator<V | undefined, void, unknown>;
        /**
         * Returns a tracked value by id, or undefined if not found
         * @param id
         * @returns
         */
        get(id: string): TrackerBase<V> | undefined;
    }
}
declare module "data/NumberTracker" {
    import { TrackedValueOpts as TrackOpts, Timestamped, PrimitiveTracker } from "data/TrackedValue";
    export class NumberTracker extends PrimitiveTracker<number> {
        total: number;
        min: number;
        max: number;
        get avg(): number;
        /**
         * Difference between last value and initial.
         * Eg. if last value was 10 and initial value was 5, 5 is returned (10 - 5)
         * If either of those is missing, undefined is returned
         */
        difference(): number | undefined;
        /**
         * Relative difference between last value and initial.
         * Eg if last value was 10 and initial value was 5, 2 is returned (200%)
         */
        relativeDifference(): number | undefined;
        onReset(): void;
        onSeen(values: Timestamped<number>[]): void;
        getMinMaxAvg(): {
            min: number;
            max: number;
            avg: number;
        };
    }
    /**
     * Keeps track of the min, max and avg in a stream of values without actually storing them.
     *
     * Usage:
     *
     * ```js
     *  const t = numberTracker();
     *  t.seen(10);
     *
     *  t.avg / t.min/ t.max / t.getMinMax()
     * ```
     *
     * Use `reset()` to clear everything, or `resetAvg()` to only reset averaging calculation.
     *
     * Trackers can automatically reset after a given number of samples
     * ```
     * // reset after 100 samples
     * const t = numberTracker(`something`, 100);
     * ```
     * @class NumberTracker
     */
    export const numberTracker: (id?: string, opts?: TrackOpts) => NumberTracker;
}
declare module "io/AudioVisualiser" {
    import { Points } from "geometry/index";
    import { AudioAnalyser } from "io/AudioAnalyser";
    export default class AudioVisualiser {
        freqMaxRange: number;
        audio: AudioAnalyser;
        parent: HTMLElement;
        lastPointer: Points.Point;
        pointerDown: boolean;
        pointerClicking: boolean;
        pointerClickDelayMs: number;
        pointerDelaying: boolean;
        waveTracker: import("data/NumberTracker").NumberTracker;
        freqTracker: import("data/NumberTracker").NumberTracker;
        el: HTMLElement;
        constructor(parentElem: HTMLElement, audio: AudioAnalyser);
        renderFreq(freq: readonly number[]): void;
        isExpanded(): boolean;
        setExpanded(value: boolean): void;
        clear(): void;
        clearCanvas(canvas: HTMLCanvasElement | null): void;
        renderWave(wave: readonly number[], bipolar?: boolean): void;
        getPointerRelativeTo(elem: HTMLElement): {
            x: number;
            y: number;
        };
        onPointer(evt: MouseEvent | PointerEvent): void;
    }
}
declare module "io/AudioAnalyser" {
    import AudioVisualiser from "io/AudioVisualiser";
    /**
     * Options for audio processing
     *
     * fftSize: Must be a power of 2, from 32 - 32768. Higher number means
     * more precision and higher CPU overhead
     * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
     *
     * smoothingTimeConstant: Range from 0-1, default is 0.8.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
     *
     * debug: If true, additonal console logging will happen
     */
    export type Opts = Readonly<{
        readonly showVis?: boolean;
        /**
         * FFT size. Must be a power of 2, from 32 - 32768. Higher number means
         * more precision and higher CPU overhead
         * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
         */
        readonly fftSize?: number;
        /**
         * Range from 0-1, default is 0.8
         * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
         */
        readonly smoothingTimeConstant?: number;
        readonly debug?: boolean;
    }>;
    export type DataAnalyser = (node: AnalyserNode, analyser: AudioAnalyser) => void;
    /**
     * Basic audio analyser. Returns back waveform and FFT analysis. Use {@link peakLevel} if you want sound level, or {@link freq} if you just want FFT results.
     *
     * ```js
     * const onData = (freq, wave, analyser) => {
     *  // Demo: Get FFT results just for 100Hz-1KHz.
     *  const freqSlice = analyser.sliceByFrequency(100,1000,freq);
     *
     *  // Demo: Get FFT value for a particular frequency (1KHz)
     *  const amt = freq[analyser.getIndexForFrequency(1000)];
     * }
     * basic(onData, {fftSize: 512});
     * ```
     *
     * An `Analyser` instance is returned and can be controlled:
     * ```js
     * const analyser = basic(onData);
     * analyser.paused = true;
     * ```
     *
     * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
     *
     * @param onData Handler for data
     * @param opts Options
     * @returns Analyser instance
     */
    export const basic: (onData: (freq: Float32Array, wave: Float32Array, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
    /**
     * Basic audio analyser. Returns FFT analysis. Use {@link peakLevel} if you want the sound level, or {@link basic} if you also want the waveform.
     *
     * ```js
     * const onData = (freq, analyser) => {
     *  // Demo: Print out each sound frequency (Hz) and amount of energy in that band
     *  for (let i=0;i<freq.length;i++) {
     *    const f = analyser.getFrequencyAtIndex(0);
     *    console.log(`${i}. frequency: ${f} amount: ${freq[i]}`);
     *  }
     * }
     * freq(onData, {fftSize:512});
     * ```
     *
     * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
     *
     * @param onData
     * @param opts
     * @returns
     */
    export const freq: (onData: (freq: Float32Array, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
    /**
     * Basic audio analyser which reports the peak sound level.
     *
     * ```js
     * peakLevel(level => {
     *  console.log(level);
     * });
     * ```
     *
     * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
     * @param onData
     * @param opts
     * @returns
     */
    export const peakLevel: (onData: (level: number, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
    /**
     * Helper for doing audio analysis. It takes case of connecting the audio stream, running in a loop and pause capability.
     *
     * Provide a function which works with an [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode), and does something with the result.
     * ```js
     * const myAnalysis = (node, analyser) => {
     *  const freq = new Float32Array(node.frequencyBinCount);
     *  node.getFloatFrequencyData(freq);
     *  // Do something with frequency data...
     * }
     * const a = new Analyser(myAnalysis);
     * ```
     *
     * Two helper functions provide ready-to-use Analysers:
     * * {@link peakLevel} peak decibel reading
     * * {@link freq} FFT results
     * * {@link basic} FFT results and waveform
     *
     * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
     *
     */
    export class AudioAnalyser {
        #private;
        showVis: boolean;
        fftSize: number;
        smoothingTimeConstant: number;
        debug: boolean;
        visualiser: AudioVisualiser | undefined;
        audioCtx: AudioContext | undefined;
        analyserNode: AnalyserNode | undefined;
        analyse: DataAnalyser;
        constructor(analyse: DataAnalyser, opts?: Opts);
        init(): void;
        get paused(): boolean;
        set paused(v: boolean);
        private setup;
        private onMicSuccess;
        private analyseLoop;
        /**
         * Returns the maximum FFT value within the given frequency range
         */
        getFrequencyRangeMax(lowFreq: number, highFreq: number, freqData: readonly number[]): number;
        /**
         * Returns a sub-sampling of frequency analysis data that falls between
         * `lowFreq` and `highFreq`.
         * @param lowFreq Low frequency
         * @param highFreq High frequency
         * @param freqData Full-spectrum frequency data
         * @returns Sub-sampling of analysis
         */
        sliceByFrequency(lowFreq: number, highFreq: number, freqData: readonly number[]): number[];
        /**
         * Returns the starting frequency for a given binned frequency index.
         * @param index Array index
         * @returns Sound frequency
         */
        getFrequencyAtIndex(index: number): number;
        /**
         * Returns a binned array index for a given frequency
         * @param freq Sound frequency
         * @returns Array index into frequency bins
         */
        getIndexForFrequency(freq: number): number;
    }
}
declare module "io/Camera" {
    import * as Rects from "geometry/Rect";
    /**
     * Print available media devices to console
     * @param filterKind Defaults `videoinput`
     */
    export const dumpDevices: (filterKind?: string) => Promise<void>;
    /**
     * Constraints when requesting a camera source
     */
    export type Constraints = {
        /**
         * Camera facing: user is front-facing, environment is a rear camera
         */
        readonly facingMode?: `user` | `environment`;
        /**
         * Maximum resolution
         */
        readonly max?: Rects.Rect;
        /**
         * Minimum resolution
         */
        readonly min?: Rects.Rect;
        /**
         * Ideal resolution
         */
        readonly ideal?: Rects.Rect;
        /**
         * If specified, will try to use this media device id
         */
        readonly deviceId?: string;
        /**
         * Number of milliseconds to wait on `getUserMedia` before giving up.
         * Defaults to 30seconds
         */
        readonly startTimeoutMs?: number;
    };
    /**
     * Result from starting a camera
     */
    export type StartResult = {
        /**
         * Call dispose to stop the camera feed and remove any created resources,
         * such as a VIDEO element
         */
        readonly dispose: () => void;
        /**
         * Video element camera is connected to
         */
        readonly videoEl: HTMLVideoElement;
    };
    /**
     * Attempts to start a video-only stream from a camera into a hidden
     * VIDEO element for frame capture. The VIDEO element is created automatically.
     *
     *
     * ```js
     * import {Camera} from 'https://unpkg.com/ixfx/dist/visual.js'
     * try
     *  const { videoEl, dispose } = await Camera.start();
     *  for await (const frame of frames(videoEl)) {
     *   // Do something with pixels...
     *  }
     * } catch (ex) {
     *  console.error(`Video could not be started`);
     * }
     * ```
     *
     * Be sure to call the dispose() function to stop the video stream and remov
     * the created VIDEO element.
     *
     * _Constraints_ can be specified to select a camera and resolution:
     * ```js
     * import {Camera} from 'https://unpkg.com/ixfx/dist/visual.js'
     * try
     *  const { videoEl, dispose } = await Camera.start({
     *    facingMode: `environment`,
     *    max: { width: 640, height: 480 }
     *  });
     *  for await (const frame of frames(videoEl)) {
     *   // Do something with pixels...
     *  }
     * } catch (ex) {
     *  console.error(`Video could not be started`);
     * }
     * ```
     * @param constraints
     * @returns Returns `{ videoEl, dispose }`, where `videoEl` is the created VIDEO element, and `dispose` is a function for removing the element and stopping the video.
     */
    export const start: (constraints?: Constraints) => Promise<StartResult>;
}
declare module "visual/Video" {
    export type Capturer = {
        start(): void;
        cancel(): void;
        readonly canvasEl: HTMLCanvasElement;
    };
    export type ManualCapturer = {
        capture(): ImageData;
        readonly canvasEl: HTMLCanvasElement;
        dispose(): void;
    };
    export type CaptureOpts = {
        readonly maxIntervalMs?: number;
        readonly showCanvas?: boolean;
        readonly workerScript?: string;
        readonly onFrame?: (pixels: ImageData) => void;
    };
    export type ManualCaptureOpts = {
        /**
         * If true, the intermediate canvas is shown
         * The intermediate canvas is where captures from the source are put in order
         * to get the ImageData
         */
        readonly showCanvas?: boolean;
        /**
         * If specified, this function will be called after ImageData is captured
         * from the intermediate canvs. This allows for drawing on top of the
         * captured image.
         */
        readonly postCaptureDraw?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
    };
    /**
     * Options for frames generator
     */
    export type FramesOpts = {
        /**
         * Max frame rate (millis per frame), or 0 for animation speed
         */
        readonly maxIntervalMs?: number;
        /**
         * False by default, created canvas will be hidden
         */
        readonly showCanvas?: boolean;
        /**
         * If provided, this canvas will be used as the buffer rather than creating one.
         */
        readonly canvasEl?: HTMLCanvasElement;
    };
    /**
     * Generator that yields frames from a video element as [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
     *
     * ```js
     * import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
     *
     * const ctx = canvasEl.getContext(`2d`);
     * for await (const frame of Video.frames(videoEl)) {
     *   // TODO: Some processing of pixels
     *
     *   // Draw image on to the visible canvas
     *   ctx.putImageData(frame, 0, 0);
     * }
     * ```
     *
     * Under the hood it creates a hidden canvas where frames are drawn to. This is necessary
     * to read back pixel data. An existing canvas can be used if it is passed in as an option.
     *
     * Options:
     * * `canvasEl`: CANVAS element to use as a buffer (optional)
     * * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
     * * `showCanvas`: Whether buffer canvas will be shown (false by default)
     * @param sourceVideoEl
     * @param opts
     */
    export function frames(sourceVideoEl: HTMLVideoElement, opts?: FramesOpts): AsyncIterable<ImageData>;
    /**
     * Captures frames from a video element. It can send pixel data to a function or post to a worker script.
     *
     * @example Using a function
     * ```js
     * import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
     *
     * // Capture from a VIDEO element, handling frame data
     * // imageData is ImageData type: https://developer.mozilla.org/en-US/docs/Web/API/ImageData
     * Video.capture(sourceVideoEl, {
     *  onFrame(imageData => {
     *    // Do something with pixels...
     *  });
     * });
     * ```
     *
     * @example Using a worker
     * ```js
     * import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
     *
     * Video.capture(sourceVideoEl, {
     *  workerScript: `./frameProcessor.js`
     * });
     * ```
     *
     * In frameProcessor.js:
     * ```
     * const process = (frame) => {
     *  // ...process frame
     *
     *  // Send image back?
     *  self.postMessage({frame});
     * };
     *
     * self.addEventListener(`message`, evt => {
     *   const {pixels, width, height} = evt.data;
     *   const frame = new ImageData(new Uint8ClampedArray(pixels),
     *     width, height);
     *
     *   // Process it
     *   process(frame);
     * });
     * ```
     *
     * Options:
     * * `canvasEl`: CANVAS element to use as a buffer (optional)
     * * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
     * * `showCanvas`: Whether buffer canvas will be shown (false by default)
     * * `workerScript`: If this specified, this URL will be loaded as a Worker, and frame data will be automatically posted to it
     *
     * Implementation: frames are captured using a animation-speed loop to a hidden canvas. From there
     * the pixel data is extracted and sent to either destination. In future the intermediate drawing to a
     * canvas could be skipped if it becomes possible to get pixel data from an ImageBitmap.
     * @param sourceVideoEl Source VIDEO element
     * @param opts
     * @returns
     */
    export const capture: (sourceVideoEl: HTMLVideoElement, opts?: CaptureOpts) => Capturer;
    export const manualCapture: (sourceVideoEl: HTMLVideoElement, opts?: ManualCaptureOpts) => ManualCapturer;
}
declare module "io/FrameProcessor" {
    export type Sources = `` | `camera`;
    import * as Camera from "io/Camera";
    import * as Video from "visual/Video";
    export type FrameProcessorOpts = {
        readonly showCanvas?: boolean;
        readonly showPreview?: boolean;
        /**
         * If specified, this function will be called after ImageData is captured
         * from the intermediate canvs. This allows for drawing on top of the
         * captured image.
         */
        readonly postCaptureDraw?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
        readonly cameraConstraints?: Camera.Constraints;
    };
    export class FrameProcessor {
        private _source;
        private _state;
        private _teardownNeeded;
        private _cameraConstraints;
        private _cameraStartResult;
        private _cameraCapture;
        private _showCanvas;
        private _showPreview;
        private _postCaptureDraw;
        private _timer;
        constructor(opts?: FrameProcessorOpts);
        showPreview(enabled: boolean): void;
        showCanvas(enabled: boolean): void;
        getCapturer(): Video.ManualCapturer | undefined;
        useCamera(constraints?: Camera.Constraints): Promise<void>;
        private initCamera;
        dispose(): void;
        private init;
        private teardown;
        getFrame(): ImageData | undefined;
        getTimestamp(): number;
        private getFrameCamera;
    }
}
declare module "io/index" {
    /**
     * Generic support for Bluetooth LE devices
     */
    export * as Bluetooth from "io/NordicBleDevice";
    export * as AudioAnalysers from "io/AudioAnalyser";
    export * as AudioVisualisers from "io/AudioVisualiser";
    export { StringReceiveBuffer } from "io/StringReceiveBuffer";
    export { StringWriteBuffer } from "io/StringWriteBuffer";
    export { Codec } from "io/Codec";
    /**
     * Espruino-based devices connected via Bluetooth LE
     *
     * Overview:
     * * {@link puck}: Connect ./EspruinoBleDevice.js
     * * {@link Espruino.connectBle}: Connect to a generic Espruino via BLE
     */
    export * as Espruino from "io/Espruino";
    export * as Camera from "io/Camera";
    export { FrameProcessor, FrameProcessorOpts } from "io/FrameProcessor";
    /**
     * Microcontrollers such as Arduinos connected via USB serial
     *
     * Overview
     * * {@link Serial.Device}
     *
     */
    export * as Serial from "io/Serial";
}
declare module "modulation/PingPong" {
    /**
     * Continually loops up and down between 0 and 1 by a specified interval.
     * Looping returns start value, and is inclusive of 0 and 1.
     *
     * @example Usage
     * ```js
     * import {percentPingPong} from 'https://unpkg.com/ixfx/dist/modulation.js';
     * for (const v of percentPingPong(0.1)) {
     *  // v will go up and down. Make sure you have a break somewhere because it is infinite
     * }
     * ```
     *
     * @example Alternative:
     * ```js
     * const pp = pingPongPercent(0.1, 0.5); // Setup generator one time
     * const v = pp.next().value; // Call .next().value whenever a new value is needed
     * ```
     *
     * Because limits are capped to -1 to 1, using large intervals can produce uneven distribution. Eg an interval of 0.8 yields 0, 0.8, 1
     *
     * `upper` and `lower` define the percentage range. Eg to ping pong between 40-60%:
     * ```
     * const pp = pingPongPercent(0.1, 0.4, 0.6);
     * ```
     * @param interval Amount to increment by. Defaults to 10%
     * @param start Starting point within range. Defaults to 0 using a positive interval or 1 for negative intervals
     * @param rounding Rounding to apply. Defaults to 1000. This avoids floating-point rounding errors.
     */
    export const pingPongPercent: (interval?: number, lower?: number, upper?: number, start?: number, rounding?: number) => Generator<number, never, unknown>;
    /**
     * Ping-pongs continually back and forth `start` and `end` with a given `interval`. Use `pingPongPercent` for 0-1 ping-ponging
     *
     * In a loop:
     * ```
     * for (const c of pingPong(10, 0, 100)) {
     *  // 0, 10, 20 .. 100, 90, 80, 70 ...
     * }
     * ```
     *
     * Manual:
     * ```
     * const pp = pingPong(10, 0, 100);
     * let v = pp.next().value; // Call .next().value whenever a new value is needed
     * ```
     * @param interval Amount to increment by. Use negative numbers to start counting down
     * @param lower Lower bound (inclusive)
     * @param upper Upper bound (inclusive, must be greater than start)
     * @param start Starting point within bounds (defaults to `lower`)
     * @param rounding Rounding is off by default. Use say 1000 if interval is a fractional amount to avoid rounding errors.
     */
    export const pingPong: (interval: number, lower: number, upper: number, start?: number, rounding?: number) => Generator<number, never, unknown>;
}
declare module "Generators" {
    export { pingPong, pingPongPercent } from "modulation/PingPong";
    export * as IterableAsync from "IterableAsync";
    export { interval } from "flow/Interval";
    export { delayLoop } from "flow/Delay";
    /**
     * Generates a range of numbers, starting from `start` and counting by `interval`.
     * If `end` is provided, generator stops when reached.
     *
     * Unlike {@link numericRange}, numbers might contain rounding errors
     *
     * ```js
     * for (const c of numericRangeRaw(10, 100)) {
     *  // 100, 110, 120 ...
     * }
     * ```
     * @param interval Interval between numbers
     * @param start Start
     * @param end End (if undefined, range never ends)
     */
    export const numericRangeRaw: (interval: number, start?: number, end?: number, repeating?: boolean) => Generator<number, void, unknown>;
    /**
     * Generates a range of numbers, with a given interval.
     *
     * @example For-loop
     * ```
     * let loopForever = numericRange(0.1); // By default starts at 0 and counts upwards forever
     * for (v of loopForever) {
     *  console.log(v);
     * }
     * ```
     *
     * @example If you want more control over when/where incrementing happens...
     * ```js
     * let percent = numericRange(0.1, 0, 1);
     *
     * let percentResult = percent.next().value;
     * ```
     *
     * Note that computations are internally rounded to avoid floating point math issues. So if the `interval` is very small (eg thousandths), specify a higher rounding
     * number.
     *
     * @param interval Interval between numbers
     * @param start Start. Defaults to 0
     * @param end End (if undefined, range never ends)
     * @param repeating Range loops from start indefinately. Default _false_
     * @param rounding A rounding that matches the interval avoids floating-point math hikinks. Eg if the interval is 0.1, use a rounding of 10
     */
    export const numericRange: (interval: number, start?: number, end?: number, repeating?: boolean, rounding?: number) => Generator<number, void, unknown>;
    /**
     * Yields `amount` integers, counting by one from zero. If a negative amount is used,
     * count decreases. If `offset` is provided, this is added to the return result.
     * @example
     * ```js
     * const a = [...count(5)]; // Yields five numbers: [0,1,2,3,4]
     * const b = [...count(-5)]; // Yields five numbers: [0,-1,-2,-3,-4]
     * for (const v of count(5, 5)) {
     *  // Yields: 5, 6, 7, 8, 9
     * }
     * const c = [...count(5,1)]; // Yields [1,2,3,4,5]
     * ```
     *
     * @example Used with forEach
     * ```js
     * // Prints `Hi` 5x
     * forEach(count(5), () => console.log(`Hi`));
     * ```
     *
     * If you want to accumulate return values, consider using
     * {@link Flow.repeat}.
     * @param amount Number of integers to yield
     * @param offset Added to result
     */
    export const count: (amount: number, offset?: number) => Generator<number, void, unknown>;
    /**
     * Returns a number range between 0.0-1.0.
     *
     * ```
     * // Yields: [0, 0.2, 0.4, 0.6, 0.8, 1]
     * const a = [...numericPercent(0.2)];
     *
     * // Repeating flag set to true:
     * for (const v of numericPercent(0.2, true)) {
     *  // Infinite loop. V loops back to 0 after hitting 1
     * }
     * ```
     *
     * If `repeating` is true, it loops back to 0 after reaching 1
     * @param interval Interval (default: 0.01, ie. 1%)
     * @param repeating Whether generator should loop (default: false)
     * @param start Start (default: 0)
     * @param end End (default: 1)
     * @returns
     */
    export const numericPercent: (interval?: number, repeating?: boolean, start?: number, end?: number) => Generator<number, void, unknown>;
}
declare module "dom/Util" {
    import { Observable } from 'rxjs';
    import * as Points from "geometry/Point";
    export type ElementResizeArgs<V extends HTMLElement | SVGSVGElement> = {
        readonly el: V;
        readonly bounds: {
            readonly width: number;
            readonly height: number;
            readonly center: Points.Point;
        };
    };
    export type CanvasResizeArgs = ElementResizeArgs<HTMLCanvasElement> & {
        readonly ctx: CanvasRenderingContext2D;
    };
    export const fullSizeElement: <V extends HTMLElement>(domQueryOrEl: string | V, onResized?: ((args: ElementResizeArgs<V>) => void) | undefined) => Observable<Event>;
    /**
     * Resizes given canvas element to match window size.
     * To resize canvas to match its parent, use {@link parentSizeCanvas}.
     *
     * To make the canvas appear propery, it sets the following CSS:
     * ```css
     * {
     *  top: 0;
     *  left: 0;
     *  zIndex: -1;
     *  position: fixed;
     * }
     * ```
     * Pass _true_ for `skipCss` to avoid this.
     *
     * Provide a callback for when resize happens.
     * @param domQueryOrEl Query string or reference to canvas element
     * @param onResized Callback for when resize happens, eg for redrawing canvas
     * @param skipCss if true, style are not added
     * @returns Observable
     */
    export const fullSizeCanvas: (domQueryOrEl: string | HTMLCanvasElement | undefined | null, onResized?: ((args: CanvasResizeArgs) => void) | undefined, skipCss?: boolean) => Observable<Event>;
    /**
     * Sets width/height atributes on the given element according to the size of its parent.
     * @param domQueryOrEl Elememnt to resize
     * @param onResized Callback when resize happens
     * @param timeoutMs Timeout for debouncing events
     * @returns
     */
    export const parentSize: <V extends HTMLElement | SVGSVGElement>(domQueryOrEl: string | V, onResized?: ((args: ElementResizeArgs<V>) => void) | undefined, timeoutMs?: number) => import("rxjs").Subscription;
    /**
     * Source: https://zellwk.com/blog/translate-in-javascript
     * @param domQueryOrEl
     */
    export const getTranslation: (domQueryOrEl: string | HTMLElement) => Points.Point;
    /**
     * Resizes given canvas to its parent element.
     * To resize canvas to match the viewport, use {@link fullSizeCanvas}.
     *
     * Provide a callback for when resize happens.
     * @param domQueryOrEl Query string or reference to canvas element
     * @param onResized Callback for when resize happens, eg for redrawing canvas
     * @returns Observable
     */
    export const parentSizeCanvas: (domQueryOrEl: string | HTMLCanvasElement, onResized?: ((args: CanvasResizeArgs) => void) | undefined, timeoutMs?: number) => import("rxjs").Subscription;
    /**
     * Returns an Observable for window resize. Default 100ms debounce.
     * @param timeoutMs
     * @returns
     */
    export const windowResize: (timeoutMs?: number) => Observable<Event>;
    /**
     * Resolves either a string or HTML element to an element.
     * Useful when an argument is either an HTML element or query.
     *
     * ```js
     * resolveEl(`#someId`);
     * resolveEl(someElement);
     * ```
     * @param domQueryOrEl
     * @returns
     */
    export const resolveEl: <V extends Element>(domQueryOrEl: string | V) => V;
    /**
     * Creates an element after `sibling`
     * ```
     * const el = createAfter(siblingEl, `DIV`);
     * ```
     * @param sibling Element
     * @param tagName Element to create
     * @returns New element
     */
    export const createAfter: (sibling: HTMLElement, tagName: string) => HTMLElement;
    /**
     * Creates an element inside of `parent`
     * ```
     * const newEl = createIn(parentEl, `DIV`);
     * ```
     * @param parent Parent element
     * @param tagName Tag to create
     * @returns New element
     */
    export const createIn: (parent: HTMLElement, tagName: string) => HTMLElement;
    /**
     * Creates a table based on a list of objects
     * ```
     * const t = dataTableList(parentEl, map);
     *
     * t(newMap)
     * ```
     */
    export const dataTableList: (parentOrQuery: HTMLElement | string, data: ReadonlyMap<string, object>) => (data: ReadonlyMap<string, object>) => void;
    /**
     * Format data. Return _undefined_ to signal that
     * data was not handled.
     */
    export type DataFormatter = (data: object, path: string) => string | undefined;
    export type DataTableOpts = {
        readonly formatter?: DataFormatter;
        readonly precision?: number;
        readonly roundNumbers?: boolean;
    };
    /**
     * Creates a HTML table where each row is a key-value pair from `data`.
     * First column is the key, second column data.
     *
     * ```js
     * const dt = dataTable(`#hostDiv`);
     * dt({
     *  name: `Blerg`,
     *  height: 120
     * });
     * ```
     */
    export const dataTable: (parentOrQuery: HTMLElement | string, data?: object, opts?: DataTableOpts) => (data: object) => void;
    /**
     * Remove all child nodes from `parent`
     * @param parent
     */
    export const clear: (parent: HTMLElement) => void;
    /**
     * Observer when document's class changes
     *
     * ```js
     * const c = themeChangeObservable();
     * c.subscribe(() => {
     *  // Class has changed...
     * });
     * ```
     * @returns
     */
    export const themeChangeObservable: () => Observable<readonly MutationRecord[]>;
    /**
     * Observer when element resizes. Specify `timeoutMs` to debounce.
     *
     * ```
     * const o = resizeObservable(myEl, 500);
     * o.subscribe(() => {
     *  // called 500ms after last resize
     * });
     * ```
     * @param elem
     * @param timeoutMs Tiemout before event gets triggered
     * @returns
     */
    export const resizeObservable: (elem: Element, timeoutMs?: number) => Observable<readonly ResizeObserverEntry[]>;
    /**
     * Copies string representation of object to clipboard
     * @param obj
     * @returns Promise
     */
    export const copyToClipboard: (obj: object) => Promise<unknown>;
    export type CreateUpdateElement<V> = (item: V, el: HTMLElement | null) => HTMLElement;
    export const reconcileChildren: <V>(parentEl: HTMLElement, list: ReadonlyMap<string, V>, createUpdate: CreateUpdateElement<V>) => void;
}
declare module "visual/Drawing" {
    import * as Points from "geometry/Point";
    import * as Paths from "geometry/Path";
    import * as Lines from "geometry/Line";
    import * as Triangles from "geometry/Triangle";
    import * as Circles from "geometry/Circle";
    import * as Arcs from "geometry/Arc";
    import * as Beziers from "geometry/Bezier";
    import * as Rects from "geometry/Rect";
    import * as Ellipses from "geometry/Ellipse";
    import { Stack } from "collections/index";
    export type CanvasCtxQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
    /**
     * Gets a 2d drawing context from canvas element or query, or throws an error
     * @param canvasElCtxOrQuery Canvas element reference or DOM query
     * @returns Drawing context.
     */
    export const getCtx: (canvasElCtxOrQuery: CanvasCtxQuery) => CanvasRenderingContext2D;
    /**
     * Makes a helper object that wraps together a bunch of drawing functions that all use the same drawing context
     * @param ctxOrCanvasEl Drawing context or canvs element reference
     * @param canvasBounds Bounds of drawing (optional). Used for limiting `textBlock`
     * @returns
     */
    export const makeHelper: (ctxOrCanvasEl: CanvasCtxQuery, canvasBounds?: Rects.Rect) => {
        paths(pathsToDraw: Paths.Path[], opts?: DrawingOpts): void;
        line(lineToDraw: Lines.Line | Lines.Line[], opts?: DrawingOpts): void;
        rect(rectsToDraw: Rects.RectPositioned | Rects.RectPositioned[], opts?: DrawingOpts & {
            filled?: boolean;
        }): void;
        bezier(bezierToDraw: Beziers.QuadraticBezier | Beziers.CubicBezier, opts?: DrawingOpts): void;
        connectedPoints(pointsToDraw: Points.Point[], opts?: DrawingOpts & {
            loop?: boolean;
        }): void;
        pointLabels(pointsToDraw: Points.Point[], opts?: DrawingOpts): void;
        dot(dotPosition: Points.Point | Points.Point[], opts?: DrawingOpts & {
            radius: number;
            outlined?: boolean;
            filled?: boolean;
        }): void;
        circle(circlesToDraw: Circles.CirclePositioned | Circles.CirclePositioned[], opts: DrawingOpts): void;
        arc(arcsToDraw: Arcs.ArcPositioned | Arcs.ArcPositioned[], opts: DrawingOpts): void;
        textBlock(lines: string[], opts: DrawingOpts & {
            anchor: Points.Point;
            anchorPadding?: number;
            bounds?: Rects.RectPositioned;
        }): void;
    };
    /**
     * Drawing options
     */
    export type DrawingOpts = {
        /**
         * Stroke style
         */
        readonly strokeStyle?: string;
        /**
         * Fill style
         */
        readonly fillStyle?: string;
        /**
         * If true, diagnostic helpers will be drawn
         */
        readonly debug?: boolean;
    };
    export type LineOpts = {
        readonly lineWidth?: number;
        readonly lineCap?: CanvasLineCap;
        readonly lineJoin?: CanvasLineJoin;
    };
    /**
     * Draws one or more arcs.
     * @param ctx
     * @param arcs
     * @param opts
     */
    export const arc: (ctx: CanvasRenderingContext2D, arcs: Arcs.ArcPositioned | ReadonlyArray<Arcs.ArcPositioned>, opts?: DrawingOpts) => void;
    /**
     * A drawing stack operation
     */
    export type StackOp = (ctx: CanvasRenderingContext2D) => void;
    /**
     * A drawing stack (immutable)
     */
    export type DrawingStack = Readonly<{
        /**
         * Push a new drawing op
         * @param op Operation to add
         * @returns stack with added op
         */
        push(...ops: readonly StackOp[]): DrawingStack;
        /**
         * Pops an operatiomn
         * @returns Drawing stack with item popped
         */
        pop(): DrawingStack;
        /**
         * Applies drawing stack
         */
        apply(): DrawingStack;
    }>;
    /**
     * Creates and returns an immutable drawing stack for a context
     * @param ctx Context
     * @param stk Initial stack operations
     * @returns
     */
    export const drawingStack: (ctx: CanvasRenderingContext2D, stk?: Stack<StackOp>) => DrawingStack;
    export const lineThroughPoints: (ctx: CanvasRenderingContext2D, points: readonly Points.Point[], opts?: DrawingOpts) => void;
    /**
     * Draws one or more circles. Will draw outline/fill depending on
     * whether `strokeStyle` or `fillStyle` params are present in the drawing options.
     *
     * ```js
     * // Draw a circle with radius of 10 at 0,0
     * circle(ctx, {radius:10});
     *
     * // Draw a circle of radius 10 at 100,100
     * circle(ctx, {radius: 10, x: 100, y: 100});
     *
     * // Draw two blue outlined circles
     * circle(ctx, [ {radius: 5}, {radius: 10} ], {strokeStyle:`blue`});
     * ```
     * @param ctx Drawing context
     * @param circlesToDraw Circle(s) to draw
     * @param opts Drawing options
     */
    export const circle: (ctx: CanvasRenderingContext2D, circlesToDraw: Circles.CirclePositioned | readonly Circles.CirclePositioned[], opts?: DrawingOpts) => void;
    /**
     * Draws one or more ellipses. Will draw outline/fill depending on
     * whether `strokeStyle` or `fillStyle` params are present in the drawing options.
     * @param ctx
     * @param ellipsesToDraw
     * @param opts
     */
    export const ellipse: (ctx: CanvasRenderingContext2D, ellipsesToDraw: Ellipses.EllipsePositioned | readonly Ellipses.EllipsePositioned[], opts?: DrawingOpts) => void;
    /**
     * Draws one or more paths.
     * supported paths are quadratic beziers and lines.
     * @param ctx
     * @param pathsToDraw
     * @param opts
     */
    export const paths: (ctx: CanvasRenderingContext2D, pathsToDraw: readonly Paths.Path[] | Paths.Path, opts?: Readonly<{
        readonly strokeStyle?: string;
        readonly debug?: boolean;
    }>) => void;
    /**
     * Draws a line between all the given points.
     * If a fillStyle is specified, it will be filled.
     *
     * See also:
     * * {@link line}: Draw one or more lines
     *
     * @param ctx
     * @param pts
     */
    export const connectedPoints: (ctx: CanvasRenderingContext2D, pts: readonly Points.Point[], opts?: {
        readonly loop?: boolean;
        readonly fillStyle?: string;
        readonly strokeStyle?: string;
    }) => void;
    /**
     * Draws labels for a set of points
     * @param ctx
     * @param pts Points to draw
     * @param opts
     * @param labels Labels for points
     */
    export const pointLabels: (ctx: CanvasRenderingContext2D, pts: readonly Points.Point[], opts?: {
        readonly fillStyle?: string;
    }, labels?: readonly string[]) => void;
    /**
     * Returns `point` with the canvas's translation matrix applied
     * @param ctx
     * @param point
     * @returns
     */
    export const translatePoint: (ctx: CanvasRenderingContext2D, point: Points.Point) => Points.Point;
    /**
     * Creates a new HTML IMG element with a snapshot of the
     * canvas. Element will need to be inserted into the document.
     *
     * ```
     * const myCanvas = document.getElementById('someCanvas');
     * const el = copyToImg(myCanvas);
     * document.getElementById('images').appendChild(el);
     * ```
     * @param canvasEl
     * @returns
     */
    export const copyToImg: (canvasEl: HTMLCanvasElement) => HTMLImageElement;
    /**
     * Draws filled circle(s) at provided point(s)
     * @param ctx
     * @param pos
     * @param opts
     */
    export const dot: (ctx: CanvasRenderingContext2D, pos: Points.Point | readonly Points.Point[], opts?: DrawingOpts & {
        readonly radius?: number;
        readonly outlined?: boolean;
        readonly filled?: boolean;
    }) => void;
    /**
     * Draws a cubic or quadratic bezier
     * @param ctx
     * @param bezierToDraw
     * @param opts
     */
    export const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: Beziers.QuadraticBezier | Beziers.CubicBezier, opts?: DrawingOpts) => void;
    /**
     * Draws one or more lines.
     *
     * Each line is drawn independently, ie it's not assumed lines are connected.
     *
     * See also:
     * * {@link connectedPoints}: Draw a series of connected points
     * @param ctx
     * @param toDraw
     * @param opts
     */
    export const line: (ctx: CanvasRenderingContext2D, toDraw: Lines.Line | readonly Lines.Line[], opts?: LineOpts & DrawingOpts) => void;
    /**
     * Draws one or more triangles
     * @param ctx
     * @param toDraw
     * @param opts
     */
    export const triangle: (ctx: CanvasRenderingContext2D, toDraw: Triangles.Triangle | readonly Triangles.Triangle[], opts?: DrawingOpts & {
        readonly filled?: boolean;
    }) => void;
    /**
     * Draws one or more rectangles
     * @param ctx
     * @param toDraw
     * @param opts
     */
    export const rect: (ctx: CanvasRenderingContext2D, toDraw: Rects.RectPositioned | readonly Rects.RectPositioned[], opts?: DrawingOpts & {
        readonly filled?: boolean;
    }) => void;
    /**
     * Returns the width of `text`. Rounds number up to nearest multiple if provided. If
     * text is empty or undefined, 0 is returned.
     * @param ctx
     * @param text
     * @param widthMultiple
     * @returns
     */
    export const textWidth: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number, widthMultiple?: number) => number;
    /**
     * Draws a block of text. Each array item is considered a line.
     * @param ctx
     * @param lines
     * @param opts
     */
    export const textBlock: (ctx: CanvasRenderingContext2D, lines: readonly string[], opts: DrawingOpts & {
        readonly anchor: Points.Point;
        readonly anchorPadding?: number;
        readonly bounds?: Rects.RectPositioned;
    }) => void;
    export type HorizAlign = `left` | `right` | `center`;
    export type VertAlign = `top` | `center` | `bottom`;
    /**
     * Draws an aligned text block
     */
    export const textBlockAligned: (ctx: CanvasRenderingContext2D, text: readonly string[] | string, opts: DrawingOpts & {
        readonly bounds: Rects.RectPositioned;
        readonly horiz?: HorizAlign;
        readonly vert?: VertAlign;
    }) => void;
}
declare module "visual/SvgMarkers" {
    import { MarkerOpts, DrawingOpts } from "visual/Svg";
    export const createMarker: (id: string, opts: MarkerOpts, childCreator?: () => SVGElement) => SVGMarkerElement;
    export const markerPrebuilt: (elem: SVGElement | null, opts: MarkerOpts, _context: DrawingOpts) => string;
}
declare module "visual/SvgElements" {
    import { CirclePositioned } from "geometry/Circle";
    import * as Lines from "geometry/Line";
    import * as Points from "geometry/Point";
    import * as Svg from "visual/Svg";
    /**
     * Creates and adds an SVG path element
     * @example
     * ```js
     * const paths = [
     *  `M300,200`,
     *  `a25,25 -30 0,1 50, -25 l 50,-25`
     * ]
     * const pathEl = path(paths, parentEl);
     * ```
     * @param svgOrArray Path syntax, or array of paths. Can be empty if path data will be added later
     * @param parent SVG parent element
     * @param opts Options Drawing options
     * @returns
     */
    export const path: (svgOrArray: string | readonly string[], parent: SVGElement, opts?: Svg.PathDrawingOpts, queryOrExisting?: string | SVGPathElement) => SVGPathElement;
    export const pathUpdate: (elem: SVGPathElement, opts?: Svg.PathDrawingOpts) => SVGPathElement;
    /**
     * Updates an existing `SVGCircleElement` with potentially updated circle data and drawing options
     * @param elem Element
     * @param circle Circle
     * @param opts Drawing options
     * @returns SVGCircleElement
     */
    export const circleUpdate: (elem: SVGCircleElement, circle: CirclePositioned, opts?: Svg.CircleDrawingOpts) => SVGCircleElement;
    /**
     * Creates or reuses a `SVGCircleElement`.
     *
     * To update an existing element, use `circleUpdate`
     * @param circle
     * @param parent
     * @param opts
     * @param queryOrExisting
     * @returns
     */
    export const circle: (circle: CirclePositioned, parent: SVGElement, opts?: Svg.CircleDrawingOpts, queryOrExisting?: string | SVGCircleElement) => SVGCircleElement;
    /**
     * Creates or reuses a SVGLineElement.
     *
     * @param line
     * @param parent
     * @param opts
     * @param queryOrExisting
     * @returns
     */
    export const line: (line: Lines.Line, parent: SVGElement, opts?: Svg.LineDrawingOpts, queryOrExisting?: string | SVGLineElement) => SVGLineElement;
    /**
     * Updates a SVGLineElement instance with potentially changed line and drawing data
     * @param lineEl
     * @param line
     * @param opts
     * @returns
     */
    export const lineUpdate: (lineEl: SVGLineElement, line: Lines.Line, opts?: Svg.LineDrawingOpts) => SVGLineElement;
    /**
     * Updates an existing SVGTextPathElement instance with text and drawing options
     * @param el
     * @param text
     * @param opts
     * @returns
     */
    export const textPathUpdate: (el: SVGTextPathElement, text?: string, opts?: Svg.TextPathDrawingOpts) => SVGTextPathElement;
    /**
     * Creates or reuses a SVGTextPathElement.
     * @param pathRef
     * @param text
     * @param parent
     * @param opts
     * @param queryOrExisting
     * @returns
     */
    export const textPath: (pathRef: string, text: string, parent: SVGElement, opts?: Svg.TextPathDrawingOpts, queryOrExisting?: string | SVGTextPathElement) => SVGTextPathElement;
    /**
     * Updates an existing SVGTextElement instance with position, text and drawing options
     * @param el
     * @param pos
     * @param text
     * @param opts
     * @returns
     */
    export const textUpdate: (el: SVGTextElement, pos?: Points.Point, text?: string, opts?: Svg.TextDrawingOpts) => SVGTextElement;
    /**
     * Creates or reuses a SVGTextElement
     * @param pos Position of text
     * @param text Text
     * @param parent
     * @param opts
     * @param queryOrExisting
     * @returns
     */
    export const text: (text: string, parent: SVGElement, pos?: Points.Point, opts?: Svg.TextDrawingOpts, queryOrExisting?: string | SVGTextElement) => SVGTextElement;
    /**
     * Creates a square grid based at a center point, with cells having `spacing` height and width.
     *
     * It fits in as many cells as it can within `width` and `height`.
     *
     * Returns a SVG group, consisting of horizontal and vertical lines
     * @param parent Parent element
     * @param center Center point of grid
     * @param spacing Width/height of cells
     * @param width How wide grid should be
     * @param height How high grid should be
     * @param opts
     */
    export const grid: (parent: SVGElement, center: Points.Point, spacing: number, width: number, height: number, opts?: Svg.LineDrawingOpts) => SVGGElement;
}
declare module "visual/Svg" {
    import { CirclePositioned } from "geometry/Circle";
    import * as Lines from "geometry/Line";
    import * as Points from "geometry/Point";
    import * as Elements from "visual/SvgElements";
    import * as Rects from "geometry/Rect";
    export { Elements };
    export type MarkerOpts = StrokeOpts & DrawingOpts & {
        readonly id: string;
        readonly markerWidth?: number;
        readonly markerHeight?: number;
        readonly orient?: string;
        readonly viewBox?: string;
        readonly refX?: number;
        readonly refY?: number;
    };
    /**
     * Drawing options
     */
    export type DrawingOpts = {
        /**
         * Style for fill. Eg `black`.
         * @see [fill](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
         */
        readonly fillStyle?: string;
        /**
         * If true, debug helpers are drawn
         */
        readonly debug?: boolean;
    };
    export type StrokeOpts = {
        /**
         * Line cap
         * @see [stroke-linecap](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap)
         */
        readonly strokeLineCap?: `butt` | `round` | `square`;
        /**
         * Width of stroke, eg `2`
         * @see [stroke-width](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width)
         */
        readonly strokeWidth?: number;
        /**
        * Stroke dash pattern, eg `5`
        * @see [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
        */
        readonly strokeDash?: string;
        /**
         * Style for lines. Eg `white`.
         * @see [stroke](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke)
         */
        readonly strokeStyle?: string;
    };
    /**
     * Line drawing options
     */
    export type LineDrawingOpts = DrawingOpts & MarkerDrawingOpts & StrokeOpts;
    export type CircleDrawingOpts = DrawingOpts & StrokeOpts & MarkerDrawingOpts;
    export type PathDrawingOpts = DrawingOpts & StrokeOpts & MarkerDrawingOpts;
    export type MarkerDrawingOpts = {
        readonly markerEnd?: MarkerOpts;
        readonly markerStart?: MarkerOpts;
        readonly markerMid?: MarkerOpts;
    };
    /**
     * Text drawing options
     */
    export type TextDrawingOpts = StrokeOpts & DrawingOpts & {
        readonly anchor?: `start` | `middle` | `end`;
        readonly align?: `text-bottom` | `text-top` | `baseline` | `top` | `hanging` | `middle`;
    };
    /**
     * Text path drawing options
     */
    export type TextPathDrawingOpts = TextDrawingOpts & {
        readonly method?: `align` | `stretch`;
        readonly side?: `left` | `right`;
        readonly spacing?: `auto` | `exact`;
        readonly startOffset?: number;
        readonly textLength?: number;
    };
    /**
     * Creates and appends a SVG element.
     *
     * ```js
     * // Create a circle
     * const circleEl = createOrResolve(parentEl, `SVGCircleElement`);
     * ```
     *
     * If `queryOrExisting` is specified, it is used as a query to find an existing element. If
     * query starts with `#`, this will be set as the element id, if created.
     *
     * ```js
     * // Creates an element with id 'myCircle' if it doesn't exist
     * const circleEl = createOrResolve(parentEl, `SVGCircleElement`, `#myCircle`);
     * ```
     * @param parent Parent element
     * @param type Type of SVG element
     * @param queryOrExisting Query, eg `#id`
     * @returns
     */
    export const createOrResolve: <V extends SVGElement>(parent: SVGElement, type: string, queryOrExisting?: string | V | undefined) => V;
    export const remove: <V extends SVGElement>(parent: SVGElement, queryOrExisting: string | V) => void;
    export const clear: (parent: SVGElement) => void;
    /**
     * Creates an element of `type` and with `id` (if specified)
     * @param type Element type, eg `circle`
     * @param id Optional id to assign to element
     * @returns Element
     */
    export const createEl: <V extends SVGElement>(type: string, id?: string) => V;
    /**
     * Applies path drawing options to given element
     * Applies: markerEnd, markerStart, markerMid
     * @param elem Element (presumed path)
     * @param opts Options
     */
    export const applyPathOpts: (elem: SVGElement, opts: PathDrawingOpts) => void;
    /**
     * Applies drawing options to given SVG element.
     * Applies: fillStyle
     * @param elem Element
     * @param opts Drawing options
     */
    export const applyOpts: (elem: SVGElement, opts: DrawingOpts) => void;
    /**
     * Applies drawing options to given SVG element.
     * Applies: strokeStyle, strokeWidth, strokeDash, strokeLineCap
     * @param elem Element
     * @param opts
     */
    export const applyStrokeOpts: (elem: SVGElement, opts: StrokeOpts) => void;
    /**
     * Helper to make SVG elements with a common parent.
     *
     * Create with {@link makeHelper}.
     */
    export type SvgHelper = {
        remove(queryOrExisting: string | SVGElement): void;
        /**
         * Creates a text element
         * @param text Text
         * @param pos Position
         * @param opts Drawing options
         * @param queryOrExisting DOM query to look up existing element, or the element instance
         */
        text(text: string, pos: Points.Point, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextElement): SVGTextElement;
        /**
         * Creates text on a path
         * @param pathRef Reference to path element
         * @param text Text
         * @param opts Drawing options
         * @param queryOrExisting DOM query to look up existing element, or the element instance
         */
        textPath(pathRef: string, text: string, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextPathElement): SVGTextPathElement;
        /**
         * Creates a line
         * @param line Line
         * @param opts Drawing options
         * @param queryOrExisting DOM query to look up existing element, or the element instance
         */
        line(line: Lines.Line, opts?: LineDrawingOpts, queryOrExisting?: string | SVGLineElement): SVGLineElement;
        /**
         * Creates a circle
         * @param circle Circle
         * @param opts Drawing options
         * @param queryOrExisting DOM query to look up existing element, or the element instance
         */
        circle(circle: CirclePositioned, opts?: CircleDrawingOpts, queryOrExisting?: string | SVGCircleElement): SVGCircleElement;
        /**
         * Creates a path
         * @param svgStr Path description, or empty string
         * @param opts Drawing options
         * @param queryOrExisting DOM query to look up existing element, or the element instance
         */
        path(svgStr: string | readonly string[], opts?: PathDrawingOpts, queryOrExisting?: string | SVGPathElement): SVGPathElement;
        /**
         * Creates a grid of horizontal and vertical lines inside of a group
         * @param center Grid origin
         * @param spacing Cell size
         * @param width Width of grid
         * @param height Height of grid
         * @param opts Drawing options
         */
        grid(center: Points.Point, spacing: number, width: number, height: number, opts?: LineDrawingOpts): SVGGElement;
        /**
         * Returns an element if it exists in parent
         * @param selectors Eg `#path`
         */
        query<V extends SVGElement>(selectors: string): V | null;
        /**
         * Gets/sets the width of the parent
         */
        get width(): number;
        set width(width: number);
        /**
         * Gets the parent
         */
        get parent(): SVGElement;
        /**
         * Gets/sets the height of the parent
         */
        get height(): number;
        set height(height: number);
        /**
         * Deletes all child elements
         */
        clear(): void;
    };
    /**
     * Get the bounds of an SVG element (determined by its width/height attribs)
     * @param svg
     * @returns
     */
    export const getBounds: (svg: SVGElement) => Rects.Rect;
    /**
     * Set the bounds of an element, using its width/height attribs.
     * @param svg
     * @param bounds
     */
    export const setBounds: (svg: SVGElement, bounds: Rects.Rect) => void;
    /**
     * Creates a {@link SvgHelper} for the creating and management of SVG elements.
     * @param parent
     * @param parentOpts
     * @returns
     */
    export const makeHelper: (parent: SVGElement, parentOpts?: DrawingOpts & StrokeOpts) => SvgHelper;
}
declare module "visual/Plot" {
    import { CircularArray, MapOfMutable } from "collections/Interfaces";
    import { Rect } from "geometry/Rect";
    export type Plotter = {
        add(value: number, series?: string, skipDrawing?: boolean): void;
        drawValue(index: number): void;
        /**
         * Draws current data. Useful if skipDrawing was true for earlier add() calls.
         */
        draw(): void;
        clear(): void;
        dispose(): void;
    };
    /**
     * Series
     */
    export type Series = {
        min: number;
        max: number;
        range: number;
        name: string;
        colour: string;
        lastValue?: number;
        hoverValue?: number;
    };
    /**
     * Drawing options
     */
    export type DrawingOpts = PlotOpts & {
        x: Axis;
        y: Axis;
        ctx: CanvasRenderingContext2D;
        textHeight: number;
        capacity: number;
        coalesce: boolean;
        margin: number;
        canvasSize: Rect;
        clearCanvas: boolean;
        translucentPlot?: boolean;
        highlightIndex?: number;
        leadingEdgeDot: boolean;
        debug: boolean;
        digitsPrecision: number;
        lineWidth: number;
        defaultSeriesColour: string;
        defaultSeriesVariable?: string;
        showLegend: boolean;
        pointer: {
            x: number;
            y: number;
        };
    };
    /**
     * Properties for an axis
     */
    export type Axis = {
        allowedSeries?: string[];
        /**
         * Name of axis, eg `x`
         */
        name: string;
        /**
         * Colour to use for axis labels
         */
        colour?: string;
        /**
         * Forced scale for values
         */
        scaleRange?: [number, number];
        /**
         * Forced range for labelling, by default
         * uses scaleRange
         */
        labelRange?: [number, number];
        /**
         * Width of axis line
         */
        lineWidth: number;
        /**
         * How line ends
         */
        endWith: `none` | `arrow`;
        /**
         * Where to place the name of the axis
         */
        namePosition: `none` | `end` | `side`;
        /**
         * Width for y axis, height for x axis
         */
        textSize: number;
        /**
         * If true, axis labels (ie numeric scale) are shown. Default: true
         */
        showLabels: boolean;
        /**
         * If true, a line is drawn to represent axis. Default: true
         */
        showLine: boolean;
    };
    export type SeriesColours = {
        [id: string]: string | undefined;
    };
    /**
     * Plotter options
     */
    export type PlotOpts = {
        debug?: boolean;
        seriesColours?: SeriesColours;
        /**
         * Default: 2
         */
        digitsPrecision?: number;
        x?: Axis;
        y?: Axis;
        plotSize?: Rect;
        autoSizeCanvas?: boolean;
        style?: `connected` | `dots` | `none`;
        /**
         * Number of items to keep in the circular array
         * Default: 10
         */
        capacity?: number;
        textHeight?: number;
        /**
         * Width of plotted line
         */
        lineWidth?: number;
        /**
         * If true, sub-pixel data points are ignored
         */
        coalesce?: boolean;
        /**
         * Fixed range to scale Y values. By default normalises values
         * as they come in. This will also determine the y-axis labels and drawing
         */
        /**
         * How many horizontal pixels per data point. If unspecified,
         * it will scale based on width of canvas and capacity.
         */
        defaultSeriesColour?: string;
        defaultSeriesVariable?: string;
        showLegend?: boolean;
    };
    export const defaultAxis: (name: string) => Axis;
    export const calcScale: (buffer: BufferType, drawingOpts: DrawingOpts, seriesColours?: SeriesColours) => Series[];
    export const add: (buffer: BufferType, value: number, series?: string) => void;
    export type BufferType = MapOfMutable<number, CircularArray<number>> | MapOfMutable<number, ReadonlyArray<number>>;
    export const drawValue: (index: number, buffer: BufferType, drawing: DrawingOpts) => void;
    /**
     * Draws a `buffer` of data with `drawing` options.
     *
     * @param buffer
     * @param drawing
     */
    export const draw: (buffer: BufferType, drawing: DrawingOpts) => void;
    /**
     * Creates a simple horizontal data plot within a DIV.
     *
     * ```
     * const p = plot(`#parentDiv`);
     * p.add(10);
     * p.clear();
     *
     * // Plot data using series
     * p.add(-1, `temp`);
     * p.add(0.4, `humidty`);
     * ```
     *
     * Options can be specified to customise plot
     * ```
     * const p = plot(`#parentDiv`, {
     *  capacity: 100,     // How many data points to store (default: 10)
     *  showYAxis: false,  // Toggle whether y axis is shown (default: true)
     *  lineWidth: 2,      // Width of plot line (default: 2)
     *  yAxes:  [`temp`],  // Only show these y axes (by default all are shown)
     *  coalesce: true,    // If true, sub-pixel data points are skipped, improving performance for dense plots at the expense of plot precision
     * });
     * ```
     *
     * For all `capacity` values other than `0`, a circular array is used to track data. Otherwise an array is used that will
     * grow infinitely.
     *
     * By default, will attempt to use CSS variable `--series[seriesName]` for axis colours.
     *  `--series[name]-axis` for titles. Eg `--seriesX`. For data added without a named series,
     * it will use `--series` and `--series-axis`.
     * @param parentElOrQuery
     * @param opts
     * @return Plotter instance
     */
    export const plot: (parentElOrQuery: string | HTMLElement, opts: PlotOpts) => Plotter;
}
declare module "visual/SceneGraph" {
    import { Points } from "geometry/index";
    import * as Rects from "geometry/Rect";
    export type Measurement = {
        size: Rects.Rect | Rects.RectPositioned;
        ref: Box;
        children: Array<Measurement | undefined>;
    };
    export type PxUnit = {
        value: number;
        type: `px`;
    };
    export type BoxUnit = PxUnit;
    export type BoxRect = {
        x?: BoxUnit;
        y?: BoxUnit;
        width?: BoxUnit;
        height?: BoxUnit;
    };
    export class MeasureState {
        bounds: Rects.Rect;
        pass: number;
        measurements: Map<string, Measurement>;
        constructor(bounds: Rects.Rect);
        getSize(id: string): Rects.Rect | undefined;
        resolveToPx(u: BoxUnit | undefined, defaultValue: number): number;
    }
    export abstract class Box {
        visual: Rects.RectPositioned;
        private _desiredSize;
        private _lastMeasure;
        protected children: Box[];
        protected readonly _parent: Box | undefined;
        private _idMap;
        debugLayout: boolean;
        private _visible;
        protected _ready: boolean;
        takesSpaceWhenInvisible: boolean;
        needsDrawing: boolean;
        protected _needsLayout: boolean;
        debugHue: number;
        readonly id: string;
        constructor(parent: Box | undefined, id: string);
        hasChild(box: Box): boolean;
        notify(msg: string, source: Box): void;
        protected onNotify(msg: string, source: Box): void;
        protected onChildAdded(child: Box): void;
        setReady(ready: boolean, includeChildren?: boolean): void;
        get visible(): boolean;
        set visible(v: boolean);
        get desiredSize(): BoxRect | undefined;
        set desiredSize(v: BoxRect | undefined);
        onLayoutNeeded(): void;
        private notifyChildLayoutNeeded;
        get root(): Box;
        protected measurePreflight(): void;
        /**
         * Applies measurement, returning true if size is different than before
         * @param size
         * @returns
         */
        measureApply(m: Measurement, force: boolean): boolean;
        debugLog(m: any): void;
        measureStart(opts: MeasureState, force: boolean, parent?: Measurement): Measurement | undefined;
        protected measureSelf(opts: MeasureState, parent?: Measurement): Rects.RectPositioned | Rects.Rect | undefined;
        /**
         * Called when update() is called
         * @param force
         */
        protected abstract updateBegin(force: boolean): MeasureState;
        protected updateDone(state: MeasureState, force: boolean): void;
        abstract onUpdateDone(state: MeasureState, force: boolean): void;
        update(force?: boolean): void;
    }
    export class CanvasMeasureState extends MeasureState {
        readonly ctx: CanvasRenderingContext2D;
        constructor(bounds: Rects.Rect, ctx: CanvasRenderingContext2D);
    }
    export class CanvasBox extends Box {
        readonly canvasEl: HTMLCanvasElement;
        constructor(parent: CanvasBox | undefined, canvasEl: HTMLCanvasElement, id: string);
        private designateRoot;
        protected onClick(p: Points.Point): void;
        private notifyClick;
        private notifyPointerLeave;
        private notifyPointerMove;
        protected onPointerLeave(): void;
        protected onPointerMove(p: Points.Point): void;
        protected updateBegin(): MeasureState;
        onUpdateDone(state: MeasureState, force: boolean): void;
        protected drawSelf(ctx: CanvasRenderingContext2D): void;
    }
}
declare module "visual/Plot2" {
    import { Points, Rects } from "geometry/index";
    import * as Sg from "visual/SceneGraph";
    /**
     * A data source
     */
    export interface DataSource {
        dirty: boolean;
        type: string;
        get range(): DataRange;
        add(value: number): void;
        clear(): void;
    }
    /**
     * Plot options
     */
    export type Opts = {
        /**
         * If true, Canvas will be resized to fit parent
         */
        autoSize?: boolean;
        /**
         * Colour for axis lines & labels
         */
        axisColour?: string;
        /**
         * Width for axis lines
         */
        axisWidth?: number;
    };
    /**
     * Series options
     */
    export type SeriesOpts = {
        /**
         * Colour for series
         */
        colour: string;
        /**
         * Visual width/height (depends on drawingStyle)
         */
        width?: number;
        /**
         * How series should be rendered
         */
        drawingStyle?: `line` | `dotted` | `bar`;
        /**
         * Preferred data range
         */
        axisRange?: DataRange;
        /**
         * If true, range will stay at min/max, rather than continuously adapting
         * to the current data range.
         */
        visualRangeStretch?: boolean;
    };
    export type DataPoint = {
        value: number;
        index: number;
        title?: string;
    };
    export type DataHitPoint = (pt: Points.Point) => [point: DataPoint | undefined, distance: number];
    export type DataRange = {
        min: number;
        max: number;
        changed?: boolean;
    };
    export class Series {
        private plot;
        name: string;
        colour: string;
        source: DataSource;
        drawingStyle: `line` | `dotted` | `bar`;
        width: number;
        dataHitPoint: DataHitPoint | undefined;
        tooltip?: string;
        precision: number;
        lastPxPerPt: number;
        protected _visualRange: DataRange;
        protected _visualRangeStretch: boolean;
        constructor(name: string, sourceType: `array` | `stream`, plot: Plot, opts: SeriesOpts);
        formatValue(v: number): string;
        get visualRange(): DataRange;
        scaleValue(value: number): number;
        add(value: number): void;
        clear(): void;
    }
    export class PlotArea extends Sg.CanvasBox {
        private plot;
        paddingPx: number;
        piPi: number;
        pointerDistanceThreshold: number;
        lastRangeChange: number;
        pointer: Points.Point | undefined;
        constructor(plot: Plot);
        clear(): void;
        protected measureSelf(opts: Sg.MeasureState, parent?: Sg.Measurement): Rects.Rect | Rects.RectPositioned | undefined;
        protected onNotify(msg: string, source: Sg.Box): void;
        protected onPointerLeave(): void;
        protected onPointerMove(p: Points.Point): void;
        protected measurePreflight(): void;
        updateTooltip(): void;
        protected drawSelf(ctx: CanvasRenderingContext2D): void;
        computeY(series: Series, rawValue: number): number;
        drawDataSet(series: Series, d: number[], ctx: CanvasRenderingContext2D): void;
    }
    export class Legend extends Sg.CanvasBox {
        private plot;
        sampleSize: {
            width: number;
            height: number;
        };
        padding: number;
        widthSnapping: number;
        constructor(plot: Plot);
        clear(): void;
        protected measureSelf(opts: Sg.MeasureState, parent?: Sg.Measurement): Rects.Rect | Rects.RectPositioned | undefined;
        protected drawSelf(ctx: CanvasRenderingContext2D): void;
        protected onNotify(msg: string, source: Sg.Box): void;
    }
    export class AxisX extends Sg.CanvasBox {
        private plot;
        paddingPx: number;
        colour?: string;
        constructor(plot: Plot);
        clear(): void;
        protected onNotify(msg: string, source: Sg.Box): void;
        protected drawSelf(ctx: CanvasRenderingContext2D): void;
        protected measureSelf(opts: Sg.MeasureState, parent?: Sg.Measurement): Rects.Rect | Rects.RectPositioned | undefined;
    }
    export class AxisY extends Sg.CanvasBox {
        private plot;
        private _maxDigits;
        seriesToShow: string | undefined;
        paddingPx: number;
        colour?: string;
        lastRange: DataRange;
        lastPlotAreaHeight: number;
        constructor(plot: Plot);
        clear(): void;
        protected measurePreflight(): void;
        protected onNotify(msg: string, source: Sg.Box): void;
        protected measureSelf(opts: Sg.MeasureState): Rects.RectPositioned;
        protected drawSelf(ctx: CanvasRenderingContext2D): void;
        getSeries(): Series | undefined;
        seriesAxis(series: Series, ctx: CanvasRenderingContext2D): void;
    }
    /**
     * Canvas-based data plotter.
     *
     * ```
     * const p = new Plot(document.getElementById(`myCanvas`), opts);
     *
     * // Plot 1-5 as series  test'
     * p.createSeries(`test`, `array`, [1,2,3,4,5]);
     *
     * // Create a streaming series, add a random number
     * const s = p.createSeries(`test2`, `stream`);
     * s.add(Math.random());
     * ```
     *
     *
     * `createSeries` returns the {@link Series} instance with properties for fine-tuning
     */
    export class Plot extends Sg.CanvasBox {
        plotArea: PlotArea;
        legend: Legend;
        axisX: AxisX;
        axisY: AxisY;
        axisColour: string;
        axisWidth: number;
        series: Map<string, Series>;
        private _frozen;
        defaultSeriesOpts?: SeriesOpts;
        constructor(canvasEl: HTMLCanvasElement, opts?: Opts);
        clear(): void;
        get frozen(): boolean;
        set frozen(v: boolean);
        seriesArray(): Series[];
        get seriesLength(): number;
        plot(o: any): void;
        createSeriesFromObject(o: any, prefix?: string): Series[];
        createSeries(name?: string, type?: `stream` | `array`, seriesOpts?: SeriesOpts): Series;
    }
}
declare module "visual/Palette" {
    /**
     * Manage a set of colours. Uses CSS variables as a fallback if colour is not added
     *
     */
    export type Palette = {
        setElementBase(el: Element): void;
        has(key: string): boolean;
        /**
         * Returns a colour by name.
         *
         * If the colour is not found:
         *  1. Try to use a CSS variable `--key`, or
         *  2. The next fallback colour is used (array cycles)
         *
         * @param key
         * @returns
         */
        get(key: string, fallback?: string): string;
        /**
         * Gets a colour by key, adding and returning fallback if not present
         * @param key Key of colour
         * @param fallback Fallback colour if key is not found
         */
        getOrAdd(key: string, fallback?: string): string;
        /**
         * Adds a colour with a given key
         *
         * @param key
         * @param colour
         */
        add(key: string, value: string): void;
        alias(from: string, to: string): void;
    };
    export const create: (fallbacks?: readonly string[]) => Palette;
}
declare module "visual/index" {
    import * as Drawing from "visual/Drawing";
    import * as Svg from "visual/Svg";
    import * as Plot from "visual/Plot";
    import * as Plot2 from "visual/Plot2";
    import * as Palette from "visual/Palette";
    import * as Colour from "visual/Colour";
    import * as SceneGraph from "visual/SceneGraph";
    import * as Video from "visual/Video";
    /**
     * Colour interpolation, scale generation and parsing
     *
     * Overview
     * * {@link interpolate}: Blend colours
     * * {@link scale}: Produce colour scale
     * * {@link opacity}: Give a colour opacity
     * * {@link randomHue}: Generate a random hue
     * * {@link goldenAngleColour}: Pick perceptually different shades
     *
     * CSS
     * * {@link getCssVariable}: Parse a CSS-defined colour
     *
     * Conversions: convert from 'blue', 'rgb(255,0,0)',  'hsl(0, 100%, 50%)' etc:
     * * {@link toHex}: to a hex format string
     * * {@link toHsl}: to a `{h, s, l}` object
     * * {@link toRgb}: to a `{r, g, b}` object
     */
    export { Colour };
    /**
     * Working with video, either playback from a file or stream from a video camera.
     *
     * Overview
     * * {@link frames}: Yields frames from a video camera
     * * {@link capture}: Capture frames from a VIDEO element
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {Video} from '../../ixfx/dist/visual.js';
     * // Import from web
     * import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
     * ```
     */
    export { Video };
    export { Palette, Drawing, Svg, Plot, Plot2, SceneGraph };
}
declare module "dom/ShadowDom" {
    export const addShadowCss: (parentEl: HTMLElement, styles: string) => ShadowRoot;
}
declare module "dom/Log" {
    export type LogOpts = {
        readonly reverse?: boolean;
        readonly capacity?: number;
        readonly timestamp?: boolean;
        readonly collapseDuplicates?: boolean;
        readonly monospaced?: boolean;
        readonly minIntervalMs?: number;
        readonly css?: string;
    };
    export type Log = Readonly<{
        clear(): void;
        error(msgOrError: string | Error | unknown): void;
        log(msg?: string | object | number): HTMLElement | undefined;
        append(el: HTMLElement): void;
        dispose(): void;
        readonly isEmpty: boolean;
    }>;
    /**
     * Allows writing to a DOM element in console.log style. Element grows in size, so use
     * something like `overflow-y: scroll` on its parent
     *
     * ```
     * const l = log(`#dataStream`); // Assumes HTML element with id `dataStream` exists
     * l.log(`Hi`);
     * l.log(); // Displays a horizontal rule
     *
     * const l = log(document.getElementById(`dataStream`), {
     *  timestamp: true,
     *  truncateEntries: 20
     * });
     * l.log(`Hi`);
     * l.error(`Some error`); // Adds class `error` to line
     * ```
     *
     * For logging high-throughput streams:
     * ```
     * // Silently drop log if it was less than 5ms since the last
     * const l = log(`#dataStream`, { minIntervalMs: 5 });
     *
     * // Only the last 100 entries are kept
     * const l = log(`#dataStream`, { capacity: 100 });
     * ```
     *
     * @param {(HTMLElement | string | undefined)} elOrId Element or id of element
     * @param {LogOpts} opts
     * @returns {Log}
     */
    export const log: (domQueryOrEl: HTMLElement | string, opts?: LogOpts) => Log;
}
declare module "dom/DomRx" {
    export type PluckOpts = {
        readonly pluck: string;
    };
    export type TransformOpts = {
        transform(ev: Event): any;
    };
    /**
     * Responsive value
     */
    export type Rx<V> = {
        /**
         * Last value
         */
        readonly value: V;
        /**
         * Clears last value
         */
        readonly clear: () => void;
    };
    export type DomRxOpts = PluckOpts | TransformOpts;
    /**
     * Keeps track of last event data
     *
     * ```js
     * const pointer = rx(`#myDiv`, `pointermove`).value;
     *
     * if (pointer.clientX > ...)
     * ```
     *
     * Pluck a field:
     * ```js
     * const pointerX = rx(`#myDiv`, `pointermove`, {pluck: `clientX`}).value;
     *
     * if (pointerX > ...)
     * ```
     * @template V Event type
     * @param opts
     * @return
     */
    export const rx: <V>(elOrQuery: HTMLElement | string, event: string, opts?: DomRxOpts) => Rx<V>;
}
declare module "dom/Forms" {
    /**
     * Adds tab and shift+tab to TEXTAREA
     * @param el
     */
    export const textAreaKeyboard: (el: HTMLTextAreaElement) => void;
    /**
     * Quick access to <input type="checkbox"> value.
     * Provide a checkbox by string id or object reference. If a callback is
     * supplied, it will be called when the checkbox changes value.
     *
     * ```
     * const opt = checkbox(`#chkMate`);
     * opt.checked; // Gets/sets
     *
     * const opt = checkbox(document.getElementById(`#chkMate`), newVal => {
     *  if (newVal) ...
     * });
     * ```
     * @param {(string | HTMLInputElement)} domIdOrEl
     * @param {(currentVal:boolean) => void} [onChanged]
     * @returns
     */
    export const checkbox: (domIdOrEl: string | HTMLInputElement, onChanged?: ((currentVal: boolean) => void) | undefined) => {
        checked: boolean;
    };
    /**
     * Numeric INPUT
     *
     * ```
     * const el = numeric(`#num`, (currentValue) => {
     *  // Called when input changes
     * })
     * ```
     *
     * Get/set value
     * ```
     * el.value = 10;
     * ```
     * @param domIdOrEl
     * @param onChanged
     * @param live If true, event handler fires based on `input` event, rather than `change`
     * @returns
     */
    export const numeric: (domIdOrEl: string | HTMLInputElement, onChanged?: ((currentVal: number) => void) | undefined, live?: boolean) => {
        value: number;
    };
    /**
     * SELECT options
     */
    export type SelectOpts = {
        /**
         * Placeholder item
         */
        readonly placeholderOpt?: string;
        /**
         * If true, a placeholder option 'Choose' is added to the list
         */
        readonly shouldAddChoosePlaceholder?: boolean;
        /**
         * Item to choose after a selection is made
         */
        readonly autoSelectAfterChoice?: number;
    };
    /**
     * Button
     *
     * ```
     * const b = button(`#myButton`, () => {
     *  console.log(`Button clicked`);
     * });
     * ```
     *
     * ```
     * b.click(); // Call the click handler
     * b.disabled = true / false;
     * ```
     * @param domQueryOrEl Query string or element instance
     * @param onClick Callback when button is clicked
     * @returns
     */
    export const button: (domQueryOrEl: string | HTMLButtonElement, onClick?: () => void) => {
        click(): void;
        disabled: boolean;
    };
    /**
     * SELECT handler
     */
    export interface SelectHandler {
        /**
         * Gets/Sets disabled
         */
        set disabled(value: boolean);
        get disabled(): boolean;
        /**
         * Gets value
         */
        get value(): string;
        /**
         * Sets selected index
         */
        get index(): number;
        /**
         * _True_ if currently selected item is the placeholder
         */
        get isSelectedPlaceholder(): boolean;
        /**
         * Set options
         * @param opts Options
         * @param preSelect Item to preselect
         */
        setOpts(opts: readonly string[], preSelect?: string): void;
        /**
         * Select item by index
         * @param index Index
         * @param trigger If true, triggers change event
         */
        select(index?: number, trigger?: boolean): void;
    }
    /**
     * SELECT element.
     *
     * Handle changes in value:
     * ```
     * const mySelect = select(`#mySelect`, (newValue) => {
     *  console.log(`Value is now ${newValue}`);
     * });
     * ```
     *
     * Enable/disable:
     * ```
     * mySelect.disabled = true / false;
     * ```
     *
     * Get currently selected index or value:
     * ```
     * mySelect.value / mySelect.index
     * ```
     *
     * Is the currently selected value a placeholder?
     * ```
     * mySelect.isSelectedPlaceholder
     * ```
     *
     * Set list of options
     * ```
     * // Adds options, preselecting `opt2`.
     * mySelect.setOpts([`opt1`, `opt2 ...], `opt2`);
     * ```
     *
     * Select an element
     * ```
     * mySelect.select(1); // Select second item
     * mySelect.select(1, true); // If true is added, change handler fires as well
     * ```
     * @param domQueryOrEl Query (eg `#id`) or element
     * @param onChanged Callback when a selection is made
     * @param opts Options
     * @return
     */
    export const select: (domQueryOrEl: string | HTMLSelectElement, onChanged?: ((currentVal: string) => void) | undefined, opts?: SelectOpts) => SelectHandler;
}
declare module "data/PointTracker" {
    import * as Points from "geometry/Point";
    import * as Line from "geometry/Line";
    import { Timestamped, ObjectTracker, TrackedValueMap, TrackedValueOpts as TrackOpts } from "data/TrackedValue";
    /**
     * Information about seen points
     */
    export type PointTrack = Points.PointRelationResult & {
        /**
         * Distance
         */
        /**
         * Centroid
         */
        /**
         * Units/millisecond
         */
        readonly speed: number;
    };
    export type PointTrackerResults = {
        readonly fromLast: PointTrack;
        readonly fromInitial: PointTrack;
        readonly values: readonly Points.Point[];
    };
    export class PointTracker extends ObjectTracker<Points.Point> {
        readonly id: string;
        /**
         * Function that yields the relation from initial point
         */
        initialRelation: Points.PointRelation | undefined;
        /**
         * Last result
         */
        lastResult: PointTrackerResults | undefined;
        constructor(id: string, opts?: TrackOpts);
        /**
         * Returns the last x coord
         */
        get x(): number;
        /**
         * Returns the last y coord
         */
        get y(): number;
        /**
         * @ignore
         */
        onReset(): void;
        /**
         * Tracks a point, returning data on its relation to the
         * initial point and the last received point.
         * @param p Point
         */
        seen(...p: Points.Point[] | Timestamped<Points.Point>[]): PointTrackerResults;
        /**
         * Returns a polyline representation of stored points.
         * Returns an empty array if points were not saved, or there's only one.
         */
        get line(): Line.PolyLine;
        /**
         * Returns distance from latest point to initial point.
         * If there are less than two points, zero is returned.
         *
         * This is the direct distance, not the accumulated length.
         * @returns Distance
         */
        distanceFromStart(): number;
        /**
         * Difference between last point and the initial point, calculated
         * as a simple subtraction of x & y.
         *
         * `Points.Placeholder` is returned if there's only one point so far.
         */
        difference(): Points.Point;
        /**
         * Returns angle (in radians) from latest point to the initial point
         * If there are less than two points, undefined is return.
         * @returns Angle in radians
         */
        angleFromStart(): number | undefined;
        /**
         * Returns the total length of accumulated points.
         * Returns 0 if points were not saved, or there's only one
         */
        get length(): number;
    }
    export class TrackedPointMap extends TrackedValueMap<Points.Point> {
        constructor(opts?: TrackOpts);
    }
    /**
     * Track several named points. Call `seen()` to track a point. Mutable.
     *
     * Basic usage
     * ```js
     * const pt = pointsTracker();
     *
     * // Track a point under a given id
     * document.addEventListener(`pointermove`, e => {
     *  const info = await pt.seen(e.pointerId, { x: e.x, y: e.y });
     *  // Yields some info on relation of the point to initial value
     * });
     * ```
     *
     * Do something with last values for all points
     * ```js
     * const c = Points.centroid(...Array.from(pointers.last()));
     * ```
     *
     * More functions...
     * ```js
     * pt.size; // How many named points are being tracked
     * pt.delete(id);  // Delete named point
     * pt.reset();
     * ```
     *
     * Accessors:
     * ```js
     * pt.get(id);  // Get named point (or _undefined_)
     * pt.has(id); // Returns true if id exists
     * pt.trackedByAge(); // Returns array of tracked points, sorted by age
     * pt.valuesByAge(); // Returns array of tracked values, sorted by age
     * ```
     
    * Iterators:
     * ```js
     * pt.values(); // Tracked values
     * pt.ids(); // Iterator over ids
     * pt.last(); // Last received value for each point
     * pt.initialValues(); // Iterator over initial values for each point
     * ```
     * Options:
     * * `storeIntermediate`: if true, all points are stored internally
     * * `resetAfterSamples`: If set above 0, it will automatically reset after the given number of samples have been seen
     * @param opts
     * @returns
     */
    export const pointsTracker: (opts?: TrackOpts) => TrackedPointMap;
    /**
     * A tracked point. Create via {@link pointTracker}. Mutable. Useful for monitoring how
     * it changes over time. Eg. when a pointerdown event happens, to record the start position and then
     * track the pointer as it moves until pointerup.
     *
     * ```js
     * // Create a tracker
     * const t = pointTracker(`pointer-0`);
     *
     * // ...and later, tell it when a point is seen
     * const nfo = t.seen({x: evt.x, y:evt.y});
     * // nfo gives us some details on the relation between the seen point, the start, and points in-between
     * // nfo.angle, nfo.centroid, nfo.speed etc.
     * ```
     *
     * Compute based on last seen point
     * ```js
     * t.angleFromStart();
     * t.distanceFromStart();
     * t.x / t.y
     * t.length; // Total length of accumulated points
     * t.elapsed; // Total duration since start
     * t.lastInfo; // The PointSeenInfo for last seen point
     * ```
     *
     * Housekeeping
     * ```js
     * t.reset(); // Reset tracker
     * ```
     */
    export const pointTracker: (id?: string, opts?: TrackOpts) => PointTracker;
}
declare module "dom/PointerVisualise" {
    export type Opts = {
        readonly touchRadius?: number;
        readonly mouseRadius?: number;
        readonly trace?: boolean;
        readonly hue?: number;
    };
    /**
     * Visualises pointer events within a given element.
     *
     * ```js
     * // Show pointer events for whole document
     * pointerVis(document);
     * ```
     *
     * Note you may need to set the following CSS properties on the target element:
     *
     * ```css
     * touch-action: none;
     * user-select: none;
     * overscroll-behavior: none;
     * ```
     *
     * Options
     * * touchRadius/mouseRadius: size of circle for these kinds of pointer events
     * * trace: if true, intermediate events are captured and displayed
     * @param elOrQuery
     * @param opts
     */
    export const pointerVisualise: (elOrQuery: HTMLElement | string, opts?: Opts) => void;
}
declare module "dom/ErrorHandler" {
    /**
     * Creates an error handler to show errors on-screen.
     * This is useful when testing on mobile devices that lack access to the console.
     *
     * ```js
     * const e = defaultErrorHandler();
     * ```
     *
     * Manual control:
     * ```js
     * const e = defaultErrorHandler();
     * e.show(someError);
     * e.hide();
     * ```
     * @returns
     */
    export const defaultErrorHandler: () => {
        show: (ex: Error | string | Event) => void;
        hide: () => void;
    };
}
declare module "dom/index" {
    export * from "dom/Log";
    export * from "dom/DomRx";
    export * from "dom/Util";
    /**
     * Functions for working with DOM elements
     */
    export * as Forms from "dom/Forms";
    export * from "dom/PointerVisualise";
    export * from "dom/ErrorHandler";
}
declare module "modulation/Envelope" {
    import { SimpleEventEmitter } from "Events";
    /**
     * @returns Returns a full set of default ADSR options
     */
    export const defaultAdsrOpts: () => EnvelopeOpts;
    export type EnvelopeOpts = AdsrOpts & AdsrTimingOpts;
    /**
     * Options for the ADSR envelope.
     *
     * Use {@link defaultAdsrOpts} to get an initial default:
     * @example
     * ```js
     * let env = adsr({
     *  ...defaultAdsrOpts(),
     *  attackDuration: 2000,
     *  releaseDuration: 5000,
     *  sustainLevel: 1,
     *  retrigger: false
     * });
     * ```
     */
    export type AdsrOpts = {
        /**
         * Attack bezier 'bend'. Bend from -1 to 1. 0 for a straight line
         */
        readonly attackBend: number;
        /**
         * Decay bezier 'bend'. Bend from -1 to 1. 0 for a straight line
         */
        readonly decayBend: number;
        /**
         * Release bezier 'bend'. Bend from -1 to 1. 0 for a straight line
         */
        readonly releaseBend: number;
        /**
         * Peak level (maximum of attack stage)
         */
        readonly peakLevel: number;
        /**
         * Starting level (usually 0)
         */
        readonly initialLevel?: number;
        /**
         * Sustain level. Only valid if trigger and hold happens
         */
        readonly sustainLevel: number;
        /**
         * Release level, when envelope is done (usually 0)
         */
        readonly releaseLevel?: number;
        /**
         * When _false_, envelope starts from it's current level when being triggered.
         * _True_ by default.
         */
        readonly retrigger?: boolean;
    };
    export type AdsrTimingOpts = {
        /**
         * If true, envelope indefinately returns to attack stage after release
         *
         * @type {boolean}
         */
        readonly shouldLoop: boolean;
        /**
         * Duration for attack stage
         * Unit depends on timer source
         * @type {number}
         */
        readonly attackDuration: number;
        /**
         * Duration for decay stage
         * Unit depends on timer source
         * @type {number}
         */
        readonly decayDuration: number;
        /**
         * Duration for release stage
         * Unit depends on timer source
         * @type {number}
         */
        readonly releaseDuration: number;
    };
    /**
     * State change event
     */
    export interface StateChangeEvent {
        readonly newState: string;
        readonly priorState: string;
    }
    export interface CompleteEvent {
    }
    export type Events = {
        readonly change: StateChangeEvent;
        readonly complete: CompleteEvent;
    };
    /**
     * ADSR (Attack Decay Sustain Release) envelope. An envelope is a value that changes over time,
     * usually in response to an intial trigger.
     *
     * Created with the {@link adsr} function.
     *
     * @example Setup
     * ```js
     * import {adsr, defaultAdsrOpts} from 'https://unpkg.com/ixfx/dist/modulation.js'
     * const opts = {
     *  ...defaultAdsrOpts(),
     *  attackDuration: 1000,
     *  decayDuration: 200,
     *  sustainDuration: 100
     * }
     * const env = adsr(opts);
     * ```
     *
     * @example Using
     * ```js
     * env.trigger(); // Start envelope
     * ...
     * // Get current value of envelope
     * const [state, scaled, raw] = env.compute();
     * ```
     *
     * * `state` is a string, one of the following: 'attack', 'decay', 'sustain', 'release', 'complete'
     * * `scaled` is a value scaled according to the stage's _levels_
     * * `raw` is the progress from 0 to 1 within a stage. ie. 0.5 means we're halfway through a stage.
     *
     * Instead of `compute()`, most usage of the envelope is just fetching the `value` property, which returns the same scaled value of `compute()`:
     *
     * ```js
     * const value = env.value; // Get scaled number
     * ```
     *
     * @example Hold & release
     * ```js
     * env.trigger(true);   // Pass in true to hold
     * ...envelope will stop at sustain stage...
     * env.release();      // Release into decay
     * ```
     *
     * Check if it's done:
     *
     * ```js
     * env.isDone; // True if envelope is completed
     * ```
     *
     * Envelope has events to track activity: 'change' and 'complete':
     *
     * ```
     * env.addEventListener(`change`, ev => {
     *  console.log(`Old: ${evt.oldState} new: ${ev.newState}`);
     * })
     * ```
     */
    export interface Adsr extends SimpleEventEmitter<Events> {
        /**
         * Compute value of envelope at this point in time.
         *
         * Returns an array of [stage, scaled, raw]. Most likely you want to use {@link value} to just get the scaled value.
         * @param allowStateChange If true (default) envelope will be allowed to change state if necessary before returning value
         */
        compute(allowStateChange?: boolean): readonly [stage: string | undefined, scaled: number, raw: number];
        /**
         * Returns the scaled value
         * Same as .compute()[1]
         */
        get value(): number;
        /**
         * Releases a held envelope. Has no effect if envelope was not held or is complete.
         */
        release(): void;
        /**
         * Triggers envelope.
         *
         * If event is already trigged,
         * it will be _retriggered_. If`opts.retriggered` is false (default)
         * envelope starts again at `opts.initialValue`. Otherwise it starts at
         * the current value.
         *
         * @param hold If _true_ envelope will hold at sustain stage
         */
        trigger(hold?: boolean): void;
        /**
         * _True_ if envelope is completed
         */
        get isDone(): boolean;
    }
    /**
     * Creates an {@link Adsr} envelope.
     * @param opts
     * @returns New {@link Adsr} Envelope
     */
    export const adsr: (opts: EnvelopeOpts) => Adsr;
    /**
     * Creates and runs an envelope, sampling its values at `sampleRateMs`.
     *
     * ```
     * import {adsrSample, defaultAdsrOpts} from 'https://unpkg.com/ixfx/dist/modulation.js';
     * import {IterableAsync} from  'https://unpkg.com/ixfx/dist/util.js';
     *
     * const opts = {
     *  ...defaultAdsrOpts(),
     *  attackDuration: 1000,
     *  releaseDuration: 1000,
     *  sustainLevel: 1,
     *  attackBend: 1,
     *  decayBend: -1
     * };
     *
     * // Sample an envelope every 5ms into an array
     * const data = await IterableAsync.toArray(adsrSample(opts, 20));
     *
     * // Work with values as sampled
     * for await (const v of adsrSample(opts, 5)) {
     *  // Work with envelope value `v`...
     * }
     * ```
     * @param opts Envelope options
     * @param sampleRateMs Sample rate
     * @returns
     */
    export function adsrSample(opts: EnvelopeOpts, sampleRateMs: number): AsyncGenerator<number, void, unknown>;
}
declare module "modulation/Forces" {
    /**
     * Acknowledgements: much of the work here is an adapation from Daniel Shiffman's excellent _The Nature of Code_ website.
     */
    import { Points } from "geometry/index";
    import { Point } from "geometry/Point";
    import { Rect } from "geometry/Rect";
    /**
     * Logic for applying mass
     */
    export type MassApplication = `dampen` | `multiply` | `ignored`;
    /**
     * Basic properties of a thing that can be
     * affected by forces
     */
    export type ForceAffected = {
        /**
         * Position. Probably best to use relative coordinates
         */
        readonly position?: Point;
        /**
         * Velocity vector.
         * Probably don't want to assign this yourself, but rather have it computed based on acceleration and applied forces
         */
        readonly velocity?: Point;
        /**
         * Acceleration vector. Most applied forces will alter the acceleration, culminating in a new velocity being set and the
         * acceleraton value zeroed
         */
        readonly acceleration?: Point;
        /**
         * Mass. The unit is undefined, again best to think of this being on a 0..1 scale. Mass is particularly important
         * for the attraction/repulsion force, but other forces can incorporate mass too.
         */
        readonly mass?: number;
        readonly angularAcceleration?: number;
        readonly angularVelocity?: number;
        readonly angle?: number;
    };
    /**
     * A function that updates values of a thing.
     *
     * These can be created using the xxxForce functions, eg {@link attractionForce}, {@link accelerationForce}, {@link magnitudeForce}, {@link velocityForce}
     */
    export type ForceFn = (t: ForceAffected) => ForceAffected;
    /**
     * A vector to apply to acceleration or a force function
     */
    export type ForceKind = Points.Point | ForceFn | null;
    /**
     * Throws an error if `t` is not of the `ForceAffected` shape.
     * @param t
     * @param name
     */
    export const guard: (t: ForceAffected, name?: string) => void;
    /**
     * `constrainBounce` yields a function that affects `t`'s position and velocity such that it
     * bounces within bounds.
     *
     * ```js
     * // Setup bounce with area constraints
     * // Reduce velocity by 10% with each impact
     * const b = constrainBounce({ width:200, height:500 }, 0.9);
     *
     * // Thing
     * const t = {
     *  position: { x: 50,  y: 50 },
     *  velocity: { x: 0.3, y: 0.01 }
     * };
     *
     * // `b` returns an altereted version of `t`, with the
     * // bounce logic applied.
     * const bounced = b(t);
     * ```
     *
     * `dampen` parameter allows velocity to be dampened with each bounce. A value
     * of 0.9 for example reduces velocity by 10%. A value of 1.1 will increase velocity by
     * 10% with each bounce.
     * @param bounds Constraints of area
     * @params dampen How much to dampen velocity by. Defaults to 1 meaning there is no damping.
     * @returns A function that can perform bounce logic
     */
    export const constrainBounce: (bounds?: Rect, dampen?: number) => (t: ForceAffected) => ForceAffected;
    /**
     * For a given set of attractors, returns a function that a sets acceleration of attractee.
     * Keep note though that this bakes-in the values of the attractor, it won't reflect changes to their state. For dynamic
     * attractors, it might be easier to use `computeAttractionForce`.
     *
     * @example Force
     * ```js
     * const f = Forces.attractionForce(sun, gravity);
     * earth = Forces.apply(earth, f);
     * ```
     *
     * @example Everything mutually attracted
     * ```js
     * // Create a force with all things as attractors.
     * const f = Forces.attractionForce(things, gravity);
     * // Apply force to all things.
     * // The function returned by attractionForce will automatically ignore self-attraction
     * things = things.map(a => Forces.apply(a, f));
     * ```
     * @param attractors
     * @param gravity
     * @param distanceRange
     * @returns
     */
    export const attractionForce: (attractors: readonly ForceAffected[], gravity: number, distanceRange?: {
        readonly min?: number;
        readonly max?: number;
    }) => (attractee: ForceAffected) => ForceAffected;
    /**
     * Computes the attraction force between two things.
     * Value for `gravity` will depend on what range is used for `mass`. It's probably a good idea
     * to keep mass to mean something relative - ie 1 is 'full' mass, and adjust the `gravity`
     * value until it behaves as you like. Keeping mass in 0..1 range makes it easier to apply to
     * visual properties later.
     *
     * @example Attractee and attractor, gravity 0.005
     * ```js
     * const attractor = { position: { x:0.5, y:0.5 }, mass: 1 };
     * const attractee = { position: Points.random(), mass: 0.01 };
     * attractee = Forces.apply(attractee, Forces.computeAttractionForce(attractor, attractee, 0.005));
     * ```
     *
     * @example Many attractees for one attractor, gravity 0.005
     * ```js
     * attractor =  { position: { x:0.5, y:0.5 }, mass: 1 };
     * attractees = attractees.map(a => Forces.apply(a, Forces.computeAttractionForce(attractor, a, 0.005)));
     * ```
     *
     * @example Everything mutually attracted
     * ```js
     * // Create a force with all things as attractors.
     * const f = Forces.attractionForce(things, gravity);
     * // Apply force to all things.
     * // The function returned by attractionForce will automatically ignore self-attraction
     * things = things.map(a => Forces.apply(a, f));
     * ```
     *
     * `attractor` thing attracting (eg, earth)
     * `attractee` thing being attracted (eg. satellite)
     *
     *
     * `gravity` will have to be tweaked to taste.
     * `distanceRange` clamps the computed distance. This affects how tightly the particles will orbit and can also determine speed. By default it is 0.001-0.7
     * @param attractor Attractor (eg earth)
     * @param attractee Attractee (eg satellite)
     * @param gravity Gravity constant
     * @param distanceRange Min/max that distance is clamped to.
     * @returns
     */
    export const computeAttractionForce: (attractor: ForceAffected, attractee: ForceAffected, gravity: number, distanceRange?: {
        readonly min?: number;
        readonly max?: number;
    }) => Points.Point;
    export type TargetOpts = {
        /**
         * Acceleration scaling. Defaults to 0.001
         */
        readonly diminishBy?: number;
        /**
         * If distance is less than this range, don't move.
         * If undefined (default), will try to get an exact position
         */
        readonly range?: Points.Point;
    };
    /**
     * A force that moves a thing toward `targetPos`.
     *
     * ```js
     * const t = Forces.apply(t, Forces.targetForce(targetPos));
     * ```
     * @param targetPos
     * @param diminishBy Scales acceleration. Defaults to 0.001.
     * @returns
     */
    export const targetForce: (targetPos: Points.Point, opts?: TargetOpts) => (t: ForceAffected) => ForceAffected;
    /**
     * Apply a series of force functions or forces to `t`. Null/undefined entries are skipped silently.
     * It also updates the velocity and position of the returned version of `t`.
     *
     * ```js
     * // Wind adds acceleration. Force is dampened by mass
     * const wind = Forces.accelerationForce({ x: 0.00001, y: 0 }, `dampen`);
     *
     * // Gravity adds acceleration. Force is magnified by mass
     * const gravity = Forces.accelerationForce({ x: 0, y: 0.0001 }, `multiply`);
     *
     * // Friction is calculated based on velocity. Force is magnified by mass
     * const friction = Forces.velocityForce(0.00001, `multiply`);
     *
     *  // Flip movement velocity if we hit a wall. And dampen it by 10%
     * const bouncer = Forces.constrainBounce({ width: 1, height: 1 }, 0.9);
     *
     * let t = {
     *  position: Points.random(),
     *  mass: 0.1
     * };
     *
     * // Apply list of forces, returning a new version of the thing
     * t = Forces.apply(t,
     *   gravity,
     *   wind,
     *   friction,
     *   bouncer
     * );
     * ```
     */
    export const apply: (t: ForceAffected, ...accelForces: readonly ForceKind[]) => ForceAffected;
    /**
     * Apples `vector` to acceleration, scaling according to mass, based on the `mass` option.
     * It returns a function which can later be applied to a thing.
     *
     * ```js
     * // Acceleration vector of (0.1, 0), ie moving straight on horizontal axis
     * const f = accelerationForce({ x:0.1, y:0 }, `dampen`);
     *
     * // Thing to move
     * let t = { position: ..., acceleration: ... }
     *
     * // Apply force
     * t = f(t);
     * ```
     * @param vector
     * @returns Force function
     */
    export const accelerationForce: (vector: Points.Point, mass?: MassApplication) => ForceFn;
    /**
     * A force based on the square of the thing's velocity.
     * It's like {@link velocityForce}, but here the velocity has a bigger impact.
     *
     * ```js
     * const thing = {
     *  position: { x: 0.5, y:0.5 },
     *  velocity: { x: 0.001, y:0 }
     * };
     * const drag = magnitudeForce(0.1);
     *
     * // Apply drag force to thing, returning result
     * const t = Forces.apply(thing, drag);
     * ```
     * @param force Force value
     * @param mass How to factor in mass
     * @returns Function that computes force
     */
    export const magnitudeForce: (force: number, mass?: MassApplication) => ForceFn;
    /**
     * Null force does nothing
     * @returns A force that does nothing
     */
    export const nullForce: (t: ForceAffected) => ForceAffected;
    /**
     * Force calculated from velocity of object. Reads velocity and influences acceleration.
     *
     * ```js
     * let t = { position: Points.random(), mass: 0.1 };
     * const friction = velocityForce(0.1, `dampen`);
     *
     * // Apply force, updating position and velocity
     * t = Forces.apply(t, friction);
     * ```
     * @param force Force
     * @param mass How to factor in mass
     * @returns Function that computes force
     */
    export const velocityForce: (force: number, mass: MassApplication) => ForceFn;
    /**
     * Sets angle, angularVelocity and angularAcceleration based on
     *  angularAcceleration, angularVelocity, angle
     * @returns
     */
    export const angularForce: () => (t: ForceAffected) => Readonly<{
        angle: number;
        angularVelocity: number;
        angularAcceleration: 0;
        position?: Points.Point | undefined;
        velocity?: Points.Point | undefined;
        acceleration?: Points.Point | undefined;
        mass?: number | undefined;
    }>;
    /**
     * Yields a force function that applies the thing's acceleration.x to its angular acceleration.
     * @param scaling Use this to scale the accel.x value. Defaults to 20 (ie accel.x*20). Adjust if rotation is too much or too little
     * @returns
     */
    export const angleFromAccelerationForce: (scaling?: number) => (t: ForceAffected) => Readonly<{
        angularAcceleration: number;
        position?: Points.Point | undefined;
        velocity?: Points.Point | undefined;
        acceleration?: Points.Point | undefined;
        mass?: number | undefined;
        angularVelocity?: number | undefined;
        angle?: number | undefined;
    }>;
    /**
     * Yields a force function that applies the thing's velocity to its angular acceleration.
     * This will mean it points in the direction of travel.
     * @param interpolateAmt If provided, the angle will be interpolated toward by this amount. Defaults to 1, no interpolation
     * @returns
     */
    export const angleFromVelocityForce: (interpolateAmt?: number) => (t: ForceAffected) => Readonly<{
        angle: number;
        position?: Points.Point | undefined;
        velocity?: Points.Point | undefined;
        acceleration?: Points.Point | undefined;
        mass?: number | undefined;
        angularAcceleration?: number | undefined;
        angularVelocity?: number | undefined;
    }>;
    /**
     * Spring force
     *
     *  * ```js
     * // End of spring that moves
     * let thing = {
     *   position: { x: 1, y: 0.5 },
     *   mass: 0.1
     * };
     *
     * // Anchored other end of spring
     * const pinnedAt = {x: 0.5, y: 0.5};
     *
     * // Create force: length of 0.4
     * const springForce = Forces.springForce(pinnedAt, 0.4);
     *
     * continuously(() => {
     *  // Apply force
     *  thing = Forces.apply(thing, springForce);
     * }).start();
     * ```
     * [Read more](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
     *
     * @param pinnedAt Anchored end of the spring
     * @param restingLength Length of spring-at-rest (default: 0.5)
     * @param k Spring stiffness (default: 0.0002)
     * @param damping Damping factor to apply, so spring slows over time. (default: 0.995)
     * @returns
     */
    export const springForce: (pinnedAt: Points.Point, restingLength?: number, k?: number, damping?: number) => (t: ForceAffected) => ForceAffected;
    /**
     * Pendulum force options
     */
    export type PendulumOpts = {
        /**
         * Length of 'string' thing is hanging from. If
         * undefined, the current length between thing and
         * pinnedAt is used.
         */
        readonly length?: number;
        /**
         * Max speed of swing. Slower speed can reach equilibrium faster, since it
         * might not swing past resting point.
         * Default 0.001.
         */
        readonly speed?: number;
        /**
         * Damping, how much to reduce velocity. Default 0.995 (ie 0.5% loss)
         */
        readonly damping?: number;
    };
    /**
     * The pendulum force swings something back and forth.
     *
     * ```js
     * // Swinger
     * let thing = {
     *   position: { x: 1, y: 0.5 },
     *   mass: 0.1
     * };
     *
     * // Position thing swings from (middle of screen)
     * const pinnedAt = {x: 0.5, y: 0.5};
     *
     * // Create force: length of 0.4
     * const pendulumForce = Forces.pendulumForce(pinnedAt, { length: 0.4 });
     *
     * continuously(() => {
     *  // Apply force
     *  // Returns a new thing with recalculated angularVelocity, angle and position.
     *  thing = Forces.apply(thing, pendulumForce);
     * }).start();
     * ```
     *
     * [Read more](https://natureofcode.com/book/chapter-3-oscillation/)
     *
     * @param pinnedAt Location to swing from (x:0.5, y:0.5 default)
     * @param opts Options
     * @returns
     */
    export const pendulumForce: (pinnedAt?: Points.Point, opts?: PendulumOpts) => (t: ForceAffected) => ForceAffected;
    /**
     * Compute velocity based on acceleration and current velocity
     * @param acceleration Acceleration
     * @param velocity Velocity
     * @param velocityMax If specified, velocity will be capped at this value
     * @returns
     */
    export const computeVelocity: (acceleration: Points.Point, velocity: Points.Point, velocityMax?: number) => Points.Point;
    /**
     * Returns the acceleration to get from `currentPos` to `targetPos`.
     *
     * @example Barebones usage:
     * ```js
     * const accel = Forces.computeAccelerationToTarget(targetPos, currentPos);
     * const vel = Forces.computeVelocity(accel, currentVelocity);
     *
     * // New position:
     * const pos = Points.sum(currentPos, vel);
     * ```
     *
     * @example Implementation:
     * ```js
     * const direction = Points.subtract(targetPos, currentPos);
     * const accel = Points.multiply(direction, diminishBy);
     * ```
     * @param currentPos Current position
     * @param targetPos Target position
     * @param opts Options
     * @returns
     */
    export const computeAccelerationToTarget: (targetPos: Points.Point, currentPos: Points.Point, opts?: TargetOpts) => Points.Point | Readonly<{
        x: 0;
        y: 0;
    }>;
    /**
     * Compute a new position based on existing position and velocity vector
     * @param position Position Current position
     * @param velocity Velocity vector
     * @returns Point
     */
    export const computePositionFromVelocity: (position: Points.Point, velocity: Points.Point) => Points.Point;
    /**
     * Compute a position based on distance and angle from origin
     * @param distance Distance from origin
     * @param angleRadians Angle, in radians from origin
     * @param origin Origin point
     * @returns Point
     */
    export const computePositionFromAngle: (distance: number, angleRadians: number, origin: Points.Point) => Points.Point;
    /**
     * A force that orients things according to direction of travel.
     *
     * Under the hood, it applies:
     * * angularForce,
     * * angleFromAccelerationForce, and
     * * angleFromVelocityForce
     * @param interpolationAmt
     * @returns
     */
    export const orientationForce: (interpolationAmt?: number) => ForceFn;
}
declare module "modulation/Oscillator" {
    import * as Timers from "flow/Timer";
    export type SpringOpts = {
        /**
         * Default: 1
         */
        readonly mass?: number;
        /**
         * Default: 10
         */
        readonly damping?: number;
        /**
         * Default: 100
         */
        readonly stiffness?: number;
        /**
         * Default: false
         */
        readonly soft?: boolean;
        readonly velocity?: number;
    };
    /**
     * Spring-style oscillation
     *
     * ```js
     * const spring = Oscillators.spring();
     *
     * continuously(() => {
     *  const v = spring.next().value;
     *  // Yields values 0...1
     *  //  undefined is yielded when spring is estimated to have stopped
     * });
     * ```
     *
     * Parameters to the spring can be provided.
     * ```js
     * const spring = Oscillators.spring({
     *  mass: 5,
     *  damping: 10
     *  stiffness: 100
     * });
     * ```
     * @param opts
     * @param timerOrFreq
     */
    export function spring(opts: SpringOpts | undefined, timerOrFreq: Timers.Timer | undefined): Generator<number, void, unknown>;
    /**
     * Sine oscillator.
     *
     * ```js
     * // Setup
     * const osc = sine(Timers.frequencyTimer(10));
     * const osc = sine(0.1);
     *
     * // Call whenever a value is needed
     * const v = osc.next().value;
     * ```
     *
     * @example Saw/tri pinch
     * ```js
     * const v = Math.pow(osc.value, 2);
     * ```
     *
     * @example Saw/tri bulge
     * ```js
     * const v = Math.pow(osc.value, 0.5);
     * ```
     *
     */
    export function sine(timerOrFreq: Timers.Timer | number): Generator<number, void, unknown>;
    /**
     * Bipolar sine (-1 to 1)
     * @param timerOrFreq
     */
    export function sineBipolar(timerOrFreq: Timers.Timer | number): Generator<number, void, unknown>;
    /**
     * Triangle oscillator
     *
     * ```js
     * // Setup
     * const osc = triangle(Timers.frequencyTimer(0.1));
     * const osc = triangle(0.1);
     *
     * // Call whenver a value is needed
     * const v = osc.next().value;
     * ```
     */
    export function triangle(timerOrFreq: Timers.Timer | number): Generator<number, void, unknown>;
    /**
     * Saw oscillator
     *
     * ```js
     * // Setup
     * const osc = saw(Timers.frequencyTimer(0.1));
     * const osc = saw(0.1);
     *
     * // Call whenever a value is needed
     * const v = osc.next().value;
     * ```
     */
    export function saw(timerOrFreq: Timers.Timer): Generator<number, void, unknown>;
    /**
     * Square oscillator
     *
     * ```js
     * // Setup
     * const osc = square(Timers.frequencyTimer(0.1));
     * const osc = square(0.1);
     *
     * // Call whenever a value is needed
     * osc.next().value;
     * ```
     */
    export function square(timerOrFreq: Timers.Timer): Generator<0 | 1, void, unknown>;
}
declare module "modulation/index" {
    import { RandomSource } from "Random";
    import * as Easings from "modulation/Easing";
    import * as Forces from "modulation/Forces";
    import * as Oscillators from "modulation/Oscillator";
    export * from "modulation/PingPong";
    /**
     * Easings module
     *
     * Overview:
     * * {@link Easings.time}: Ease by time
     * * {@link Easings.tick}: Ease by tick
     * * {@link Easings.get}: Get an easing function by name
     * * {@link Easings.crossfade}: Mix two synchronised easing functions (a slight shortcut over `mix`)
     * * {@link Easings.mix}: Mix two easing functions
     * * {@link Easings.gaussian}: Gaussian distribution (rough bell curve)
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import { Easings } from '../../ixfx/dist/modulation.js';
     * Easings.time(...);
     *
     * // Import from web
     * import { Easings } from 'https://unpkg.com/ixfx/dist/modulation.js'
     * Easings.time(...);
     * ```
     */
    export { Easings };
    /**
     * Envelope
     */
    export * from "modulation/Envelope";
    /**
     * Forces module can help to compute basic physical forces like gravity, friction, springs etc.
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import { Forces } from '../../ixfx/dist/modulation.js';
     * Forces.attractionForce(...);
     *
     * // Import from web
     * import { Forces } from 'https://unpkg.com/ixfx/dist/modulation.js'
     * Forces.attractionForce(...);
     * ```
     *
     */
    export { Forces };
    /**
     * Oscillators module has waveshapes for producing values with a specified frequency.
     *
     * Overview
     * * {@link Oscillators.saw}: 'Sawtooth' wave
     * * {@link Oscillators.sine}: Sine wave
     * * {@link Oscillators.sineBipolar}: Sine wave with range of -1 to 1
     * * {@link Oscillators.square}: Square wave
     * * {@link Oscillators.triangle}: Triangle wave
     *
     * @example On-demand sampling
     * ```js
     * // Saw wave with frequency of 0.10hZ
     * const osc = Oscillators.saw(0.1);
     *
     * // Whever we need to sample from the oscillator...
     * const v = osc.next().value;
     * ```
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import { Oscillators } from '../../ixfx/dist/modulation.js';
     * Oscillators.saw(...);
     *
     * // Import from web
     * import { Oscillators } from 'https://unpkg.com/ixfx/dist/modulation.js'
     * Oscillators.saw(...);
     * ```
     *
     */
    export { Oscillators };
    export type JitterOpts = {
        readonly type?: `rel` | `abs`;
        readonly clamped?: boolean;
        readonly random?: RandomSource;
    };
    /**
     * Jitters `value` by the absolute `jitter` amount.
     * All values should be on a 0..1 scale, and the return value is by default clamped to 0..1.
     * Pass `clamped:false` as an option
     * to allow for arbitary ranges.
     *
     * ```js
     * import { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';
     *
     * // Jitter 0.5 by 10% (absolute)
     * // yields range of 0.4-0.6
     * jitter(0.5, 0.1);
     *
     * // Jitter 0.5 by 10% (relative, 10% of 0.5)
     * // yields range of 0.45-0.55
     * jitter(0.5, 0.1, { type:`rel` });
     * ```
     *
     * You can also opt not to clamp values:
     * ```js
     * // Yields range of -1.5 - 1.5
     * jitter(0.5, 1, { clamped:false });
     * ```
     *
     * A custom source for random numbers can be provided. Eg, use a weighted
     * random number generator:
     *
     * ```js
     * import { weighted } from 'https://unpkg.com/ixfx/dist/random.js';
     * jitter(0.5, 0.1, { random: weighted };
     * ```
     *
     * Options
     * * clamped: If false, `value`s out of percentage range can be used and return value may
     *    beyond percentage range. True by default
     * * type: if `rel`, `jitter` is considered to be a percentage relative to `value`
     *         if `abs`, `jitter` is considered to be an absolute value (default)
     * @param value Value to jitter
     * @param jitter Absolute amount to jitter by
     * @param opts Jitter options
     * @returns Jittered value
     */
    export const jitter: (value: number, jitter: number, opts?: JitterOpts) => number;
}
declare module "index" {
    /**
     * Select a namespace below for more
     *
     * * {@link Collections}: Working with lists, sets, maps
     * * {@link Data}: Scaling, clamping, interpolating, averaging data
     * * {@link Dom}: DOM manipulation
     * * {@link Flow}: Delays, loops, State Machine, deboucing, throttling, timers
     * * {@link Generators}: Generate data
     * * {@link Geometry}: Working with various kinds of shapes and spatial calcuations
     * * {@link Io}: Connect to Espruino, Arduino, sound and video inputs
     * * {@link Modulation}: Envelopes, Oscillators, jittering
     * * {@link Random}: Compute various forms of random numbers
     * * {@link Text}: A few string processing functions
     * * {@link Visual}: Colour, drawing, SVG and video
     * @module
     */
    /**
     * Processing streams of data. [Read more in the docs](https://clinth.github.io/ixfx-docs/temporal/normalising/)
     *
     * * {@link clamp}: Restrict a number to a given range
     * * {@link clampIndex}: Restrict a number to be within the size of an array
     * * {@link flip}: Invert a relative number
     * * {@link interpolate}: Mix between two numbers by an amount
     * * {@link interpolateAngle}: Mix between two angles by an amount
     * * {@link scale}: Scale a value from an input range to an output range
     * * {@link wrap}: Wraps a value to be within a range
     * * {@link wrapInteger}: Wraps an integer to be within a range
     *
     * ### Averaging
     * * {@link movingAverage}: Calculates an average-over-time ({@link movingAverageLight} is a coarser, less memory-intensive version)
     * * {@link frequencyMutable}: Count occurences of a value
     *
     * ### Normalise sub-modukle
     * * {@link Normalise.stream | Normalise.stream}: Normalises a stream of values
     * * {@link Normalise.array | Normalise.array}: Normalises an array of values
     *
     * ### Trackers
     * Trackers are useful for tracking a series of data over time.
     * * {@link numberTracker}: Tracks min, max and average of a stream of numbers
     * * {@link intervalTracker}: Tracks min, max and average time interval between events
     * * {@link pointTracker}: Tracks the spatial change of x,y coordinates. Useful for tracking a mouse cursor, for example.
     * * {@link pointsTracker}: Tracks changes in multiple x,y coordinates. Useful for tracking each finger touch on a screen, for example.
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {movingAverage} from '../../ixfx/dist/data.js';
     * // Import from web
     * import {movingAverage} from 'https://unpkg.com/ixfx/dist/data.js'
     * ```
     */
    export * as Data from "data/index";
    /**
     * Functions for different shapes, paths and coordinate spaces
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {Lines, Points} from '../../ixfx/dist/geometry.js';
     * // Import from web
     * import {Lines, Points} from 'https://unpkg.com/ixfx/dist/geometry.js'
     * ```
     */
    export * as Geometry from "geometry/index";
    /**
     * Text processing
     *
     * Overview:
     * * {@link between}: Return text between a start and end match
     * * {@link countCharsFromStart}: Count the number of times a given set of characters appear at the beginning of a string
     * * {@link omitChars}: Returns source with a given number of characters removed
     * * {@link splitByLength}: Splits up a source string into x-charcter sized chunks
     * * {@link startsEnds}: Returns true if a string starts and end with the given strings
     * * {@link unwrap}: 'Unwraps' a string, removing characters if they appear at beginning and end
     * * {@link untilMatch}: Returns from the start of a string until match has been found
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {between} from '../../ixfx/dist/text.js';
     * // Import from web
     * import {between} from 'https://unpkg.com/ixfx/dist/text.js'
     * ```
     */
    export * as Text from "Text";
    /**
     * Input and output to devices, sensors and actuators
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {Camera, Espruino} from '../../ixfx/dist/io.js';
     * // Import from web
     * import {Camera, Espruino} from 'https://unpkg.com/ixfx/dist/io.js'
     * ```
     */
    export * as Io from "io/index";
    /**
     * Control execution
     *
     * Logic-oriented
     *  * {@link StateMachine}: Manage state transitions
     *
     * Rate-oriented
     * * {@link debounce}: Only handle invocation after a minimum time has elapsed
     * * {@link throttle}: Only handle invocations at a maximum rate
     *
     * Time-oriented
     * * {@link timeout}: Run code after a specified time delay
     * * {@link sleep}: Using `async await`, delay execution for a period
     * * {@link delay}: Using `async await`, run a given callback after a period
     * * {@link interval}: Generates values from a given function with a given delay
     * * {@link waitFor}: Calls a function and have the possibility to cancel if it takes too long
     *
     * Iteration over values
     * * {@link forEach} / {@link forEachAsync}: Loop over an iterable or array, with the possibility of early exit
     * * {@link repeat}: Runs a function a given number of times, collating results
     *
     * Loops
     * * {@link continuously}: Run code in a loop, as fast as possible or with a delay between each execution
     * * {@link delayLoop}: A generator that yields at a given rate
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {continuously, stateMachine} from '../../ixfx/dist/flow.js';
     * // Import from web
     * import {continuosly, stateMachine} from 'https://unpkg.com/ixfx/dist/flow.js'
     * ```
     */
    export * as Flow from "flow/index";
    /**
     * Generators produce values on demand.
     *
     * Overview:
     * * {@link count}: Generate a set numbers, counting by one
     * * {@link numericPercent}: Generate a range of numbers on the percentage scale of 0-1
     * * {@link numericRange}: Generate a range of numbers
     * * {@link pingPong} / {@link pingPongPercent}: Generate numbers that repeat up and down between the set limits
     *
     * Aliases:
     * * {@link delayLoop}: A generator that yields at a given rate
     * * {@link interval}: Generates values from a given function with a given delay
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {count, interval} from '../../ixfx/dist/generators.js';
     * // Import from web
     * import {count, interval} from 'https://unpkg.com/ixfx/dist/generators.js'
     * ```
     */
    export * as Generators from "Generators";
    /**
     * Visuals
     *
     * Sub-modules:
     * * {@link Video}: Working with video, either playback from a file or stream from a video camera.
     * * {@link Drawing}: Canvas drawing helper
     * * {@link Colour}: Colour interpolation, scale generation and parsing
     * * {@link Palette}: Colour palette managment
     * * {@link Svg}: SVG helper
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {Colour} from '../../ixfx/dist/visual.js';
     * // Import from web
     * import {Colour} from 'https://unpkg.com/ixfx/dist/visual.js'
     * ```
     */
    export * as Visual from "visual/index";
    /**
     * DOM module has some functions for easing DOM manipulation.
     *
     * * {@link copyToClipboard}: Attempt to copy a string representation to clipboard
     * * {@link fullSizeCanvas}: Keeps a canvas element at maximum size
     * * {@link parentSize}: Sets width/height of an element according to size of parent
     * * {@link getTranslation}: Returns the CSS translation of an element
     * * {@link pointerVisualise}: Shows pointer events for debugging purposes
     *
     * Components
     * * {@link dataTable}: Creates a HTML table from an object
     * * {@link dataTableList}: Create a list of tables from a Map of data
     * * {@link log}: log to DOM
     * * {@link rx}: keep track of event data
     *
     * Basic DOM manipulation
     * * {@link clear}: remove all child nodes from a parent
     * * {@link resolveEl}: resolve an element by query or instance
     * * Create DOM elements: {@link createAfter}, {@link createIn}
     */
    export * as Dom from "dom/index";
    export * as Events from "Events";
    /**
     * The Modulation module contains functions for, well, modulating data.
     *
     * Sub-modules:
     * * {@link Easings}: Ease from `0` to `1` over a specified duration.
     * * {@link Oscillators}: Waveforms
     * * {@link Forces}: Forces such as bouncing, gravity, attraction/repulsion, springs
     *
     * Functions:
     * * {@link adsr}: Modulate over a series of ADSR stages (ie. an envelope)
     * * {@link jitter}: Jitter a value
     *
     * @example Importing
     * ```
     * // If library is stored two directories up under `ixfx/`
     * import {adsr, defaultAdsrOpts} from '../../ixfx/dist/modulation.js';
     *
     * // Import from web
     * import {adsr, defaultAdsrOpts} from 'https://unpkg.com/ixfx/dist/modulation.js'
     * ```
     *
     */
    export * as Modulation from "modulation/index";
    /**
     * This module includes a variety of techniques for storing and retrieving data.
     *
     * Helper functions for working with in-built Javascript collections
     * * {@link Maps}
     * * {@link Arrays}
     *
     * ### MutableSet
     * Like a regular array, a set can store many items. However, duplicate items are ignored - it
     * only keeps unique items. ixfx's {@link SetMutable | MutableSet} allows for considering items as identical by value, not
     * just by reference as the default JS Set operates
     *
     * * {@link setMutable}: Create a {@link SetMutable}
     *
     * ### CircularArray
     * {@link circularArray} extends a regular array, but only keeps the last _x_ number of items.
     *
     * ## Ordered collections
     *
     * {@link Queues}: a list of ordered data, like a bakery queue
     * * Create with {@link queue} or {@link queueMutable}
     *
     * {@link Stacks}: a list of ordered data, like a stack of plates
     * * Create with {@link stack} or {@link stackMutable}
     *
     * Both queue and stack come in mutable and immutable varieties and can limit items
     * stored in varies ways.
     *
     * ### Map
     *
     * {@link MapImmutable} is a slight variant of the usual JS Map. It allows for a custom logic for computing keys
     * for items based on a function.
     *
     * * Create with {@link map} or {@link mapMutable}
     *
     * ### Map-of
     *
     * {@link MapOfMutable} allows for several values to be stored under a single key. Unlike a regular JS Map
     * which only allows a single value per key. MapOfMutable also has events for listening to changes
     * in the data.
     *
     * * {@link mapArray}: Holds any number of items under a given key
     * * {@link mapSet}: Holds any number of **unique** items under a given key
     * * {@link mapCircularMutable}: Holds the most recent _x_ items under a given key
     *
     * For cases where events are not needed consider {@link simpleMapArrayMutable}. This is a bit more lightweight.
     *
     * @example Importing
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {map} from '../../ixfx/dist/collections.js';
     * // Import from web
     * import {map} from 'https://unpkg.com/ixfx/dist/collections.js'
     * ```
     */
    export * as Collections from "collections/index";
    /**
     * Totally rando.
     *
     * Overview:
     * * {@link arrayElement} Random item from an array (alias of `Arrays.randomElement`)
     * * {@link arrayIndex} Random index of an array (alias of `Arrays.randomIndex`)
     * * {@link hue} Random hue - 0..359 number (alias of `Visual.Colour.randomHue`)
     * * {@link float} Random floating point number within a given range
     * * {@link integer} Random whole number within a given range
     * * {@link string} Random string made up of letters and numbers
     * * {@link shortGuid} Quasi-unique id generator
     *
     * Weighted random numbers:
     * * {@link weighted} Weigh distribution with an easing function
     * * {@link weightedInteger} As above, but whole numbers
     * * {@link gaussian} Gaussian (bell curve-like) distribution
     *
     * @example Importing (with aliasing)
     * ```js
     * // If library is stored two directories up under `ixfx/`
     * import {hue as randomHue, string as randomString} from '../../ixfx/dist/random.js';
     * // Import from web
     * import {hue as randomHue, string as randomString} from 'https://unpkg.com/ixfx/dist/random.js'
     * ```
     */
    export * as Random from "Random";
    export * as KeyValues from "KeyValue";
    export * as Util from "Util";
}
declare module "data/FrequencyMutable" {
    import { ToString } from "Util";
    import { SimpleEventEmitter } from "Events";
    import * as KeyValueUtil from "KeyValue";
    import { KeyValues } from "index";
    export type FrequencyEventMap = {
        readonly change: void;
    };
    export class FrequencyMutable<V> extends SimpleEventEmitter<FrequencyEventMap> {
        #private;
        /**
         * Constructor
         * @param keyString Function to key items. Uses JSON.stringify by default
         */
        constructor(keyString?: ToString<V> | undefined);
        /**
         * Clear data. Fires `change` event
         */
        clear(): void;
        /**
         * @returns Iterator over keys (ie. groups)
         */
        keys(): IterableIterator<string>;
        /**
         * @returns Iterator over frequency counts
         */
        values(): IterableIterator<number>;
        /**
         * @returns Copy of entries as an array of `[key, count]`
         */
        toArray(): [key: string, count: number][];
        /**
         * Returns a string with keys and counts, useful for debugging.
         * @returns
         */
        debugString(): string;
        /**
         *
         * @param value Value to count
         * @returns Frequency of value, or _undefined_ if it does not exist
         */
        frequencyOf(value: V | string): number | undefined;
        /**
         *
         * @param value Value to count
         * @returns Relative frequency of `value`, or _undefined_ if it does not exist
         */
        relativeFrequencyOf(value: V | string): number | undefined;
        /**
         * @returns Copy of entries as an array
         */
        entries(): Array<KeyValueUtil.KeyValue>;
        /**
         *
         * @returns Returns `{min,max,avg,total}`
         */
        minMaxAvg(): import("collections/NumericArrays").MinMaxAvgTotal;
        /**
         *
         * @param sortStyle Sorting style (default: _value_, ie. count)
         * @returns Sorted array of [key,frequency]
         */
        entriesSorted(sortStyle?: `value` | `valueReverse` | `key` | `keyReverse`): ReadonlyArray<KeyValues.KeyValue>;
        /**
         *
         * @param values Values to add. Fires _change_ event after adding item(s)
         */
        add(...values: V[]): void;
    }
    /**
     * Frequency keeps track of how many times a particular value is seen, but
     * unlike a Map it does not store the data. By default compares
     * items by value (via JSON.stringify).
     *
     * Create with {@link frequencyMutable}.
     *
     * Fires `change` event when items are added or it is cleared.
     *
     * Overview
     * ```
     * const fh = frequencyMutable();
     * fh.add(value); // adds a value
     * fh.clear();    // clears all data
     * fh.keys() / .values() // returns an iterator for keys and values
     * fh.toArray();  //  returns an array of data in the shape [[key,freq],[key,freq]...]
     * ```
     *
     * Usage
     * ```
     * const fh = frequencyMutable();
     * fh.add(`apples`); // Count an occurence of `apples`
     * fh.add(`oranges)`;
     * fh.add(`apples`);
     *
     * const fhData = fh.toArray(); // Expect result [[`apples`, 2], [`oranges`, 1]]
     * fhData.forEach((d) => {
     *  const [key,freq] = d;
     *  console.log(`Key '${key}' occurred ${freq} time(s).`);
     * })
     * ```
     *
     * Custom key string
     * ```
     * const fh = frequencyMutable( person => person.name);
     * // All people with name `Samantha` will be counted in same group
     * fh.add({name:`Samantha`, city:`Brisbane`});
     * ```
     * @template V Type of items
     */
    export const frequencyMutable: <V>(keyString?: ToString<V> | undefined) => FrequencyMutable<V>;
}
declare module "data/MovingAverage" {
    /**
     * A moving average calculator (exponential weighted moving average) which does not keep track of
     * previous samples. Less accurate, but uses less system resources.
     *
     * The `scaling` parameter determines smoothing. A value of `1` means that
     * the latest value is used as the average - that is, no smoothing. Higher numbers
     * introduce progressively more smoothing by weighting the accumulated prior average more heavily.
     *
     * `add()` adds a new value and returns the calculated average.
     *
     * ```
     * const ma = movingAverageLight(); // default scaling of 3
     * ma.add(50);  // 50
     * ma.add(100); // 75
     * ma.add(75);  // 75
     * ma.add(0);   // 50
     * ```
     *
     * Note that the final average of 50 is pretty far from the last value of 0. To make it more responsive,
     * we could use a lower scaling factor: `movingAverageLight(2)`. This yields a final average of `37.5` instead.
     *
     * Use `clear()` to reset the moving average, or `compute()` to get the current value without adding.
     * @param scaling Scaling factor. 1 is no smoothing. Default: 3
     * @returns {@link MovingAverage}
     */
    export const movingAverageLight: (scaling?: number) => MovingAverage;
    /**
     * Creates a moving average for a set number of `samples`.
     *
     * Moving average are useful for computing the average over a recent set of numbers.
     * A lower number of samples produces a computed value that is lower-latency yet more jittery.
     * A higher number of samples produces a smoother computed value which takes longer to respond to
     * changes in data.
     *
     * Sample size is considered with respect to the level of latency/smoothness trade-off, and also
     * the rate at which new data is added to the moving average.
     *
    * `add` adds a number and returns the computed average. Call `compute` to
     * get the average without adding a new value.
     *
     * ```js
     * const ma = movingAverage(10);
     * ma.add(10); // 10
     * ma.add(5);  // 7.5
     * ```
     *
     * `clear` clears the average.
     *
     * A weighting function can be provided to shape how the average is
     * calculated - eg privileging the most recent data over older data.
     * It uses `Arrays.averageWeighted` under the hood.
     *
     * ```js
     * // Give more weight to data in middle of sampling window
     * const ma = movingAverage(100, Easings.gaussian());
     * ```
     *
     * Because it keeps track of `samples` previous data, there is a memory impact. A lighter version is {@link movingAverageLight} which does not keep a buffer of prior data, but can't be as easily fine-tuned.
     * @param samples Number of samples to compute average from
     * @param weightingFn Optional weighting function
     * @returns
     */
    export const movingAverage: (samples?: number, weightingFn?: ((v: number) => number) | undefined) => MovingAverage;
    /**
     * Moving average.
     * Create via {@link movingAverage} or {@link movingAverageLight}.
     */
    export type MovingAverage = {
        /**
         * Clear data
         */
        clear(): void;
        /**
         * Returns current average
         */
        compute(): number;
        /**
         * Adds a value, returning new average
         * @param v Value to add
         */
        add(v: number): number;
    };
}
declare module "data/IntervalTracker" {
    import { NumberTracker } from "data/NumberTracker";
    import { TrackedValueOpts as TrackOpts } from "data/TrackedValue";
    /**
     * A `Tracker` that tracks interval between calls to `mark()`
     *
     * @export
     * @class IntervalTracker
     * @extends {ValueTracker}
     */
    export class IntervalTracker extends NumberTracker {
        lastMark: number;
        mark(): void;
    }
    /**
     * Returns a new {@link IntervalTracker} instance. IntervalTracker
     * records the interval between each call to `mark`.
     *
     * ```js
     * const t = intervalTracker();
     *
     * // Call `mark` to record an interval
     * t.mark();
     * ...
     * t.mark();
     *
     * // Get average time in milliseconds between calls to `mark`
     * t.avg;
     *
     * // Longest and shortest times are available too...
     * t.min; t.max
     * ```
     *
     * Interval tracker can automatically reset after a given number of samples:
     * ```
     * // Reset after 100 samples
     * const t = intervalTracker(`tracker`, 100);
     * ```
     * @param id Optional id of instance
     * @returns New interval tracker
     */
    export const intervalTracker: (id: string, opts: TrackOpts) => IntervalTracker;
}
declare module "data/Flip" {
    import { NumberFunction } from "data/index";
    /**
     * Flips a percentage-scale number: `1 - v`.
     *
     * The utility of this function is that it sanity-checks
     * that `v` is in 0..1 scale.
     *
     * ```js
     * flip(1);   // 0
     * flip(0.5); // 0.5
     * flip(0);   // 1
     * ```
     * @param v
     * @returns
     */
    export const flip: (v: number | NumberFunction) => number;
}
declare module "data/Wrap" {
    /**
     * Wraps am integer number within a specified range, defaulting to degrees (0-360)
     *
     * This is useful for calculations involving degree angles and hue, which wrap from 0-360.
     * Eg: to add 200 to 200, we don't want 400, but 40.
     *
     * ```js
     * const v = wrap(200+200, 0, 360); // 40
     * ```
     *
     * Or if we minus 100 from 10, we don't want -90 but 270
     * ```js
     * const v = wrap(10-100, 0, 360); // 270
     * ```
     *
     * `wrap` uses 0-360 as a default range, so both of these
     * examples could just as well be:
     *
     * ```js
     * wrap(200+200);  // 40
     * wrap(10-100);  // 270
     * ```
     *
     * Non-zero starting points can be used. A range of 20-70:
     * ```js
     * const v = wrap(-20, 20, 70); // 50
     * ```
     *
     * Note that the minimum value is inclusive, while the maximum is _exclusive_.
     * So with the default range of 0-360, 360 is never reached:
     *
     * ```js
     * wrap(360); // 0
     * wrap(361); // 1
     * ```
     *
     * If you just want to lock values to a range without wrapping, consider {@link clamp}.
     *
     * @param v Value to wrap
     * @param min Integer minimum of range (default: 0). Inclusive
     * @param max Integer maximum of range (default: 360). Exlusive
     * @returns
     */
    export const wrapInteger: (v: number, min?: number, max?: number) => number;
    /**
     * Wraps floating point numbers to be within a range (default: 0..1).
     *
     * This logic makes sense for some things like rotation angle.
     *
     * If you just want to lock values to a range without wrapping, consider {@link clamp}.
     *
     * ```js
     * wrap(1.2);   // 0.2
     * wrap(2);     // 1.0
     * wrap(-0.2); // 0.8
     * ```
     *
     * A range can be provided too:
     * ```js
     * wrap(30, 20, 50);  	 // 30
     * wrap(60, 20, 50);    //  30
     * ```
     * @param v
     * @param min
     * @param max
     * @returns
     */
    export const wrap: (v: number, min?: number, max?: number) => number;
    /**
     * Performs a calculation within a wrapping number range. This is a lower-level function.
     * See also: {@link wrapInteger} for simple wrapping within a range.
     *
     * `min` and `max` define the start and end of the valid range, inclusive. Eg for hue degrees it'd be 0, 360.
     * `a` and `b` is the range you want to work in.
     *
     * For example, let's say you want to get the middle point between a hue of 30 and a hue of 330 (ie warmer colours):
     * ```js
     * wrapRange(0,360, (distance) => {
     *  // for a:0 and b:330, distance would be 90 from 30 degrees to 330 (via zero)
     *  return distance * 0.5; // eg return middle point
     * }, 30, 330);
     * ```
     *
     * The return value of the callback should be in the range of 0-distance. `wrapRange` will subsequently
     * conform it to the `min` and `max` range before it's returned to the caller.
     *
     * @param a Output start (eg. 60)
     * @param b Output end (eg 300)
     * @param min Range start (eg 0)
     * @param max Range end (eg 360)
     * @param fn Returns a computed value from 0 to `distance`.
     * @returns
     */
    export const wrapRange: (min: number, max: number, fn: (distance: number) => number, a: number, b: number) => number;
}
declare module "data/index" {
    export * as Normalise from "data/Normalise";
    export * from "data/FrequencyMutable";
    export * from "data/MovingAverage";
    export * from "data/NumberTracker";
    export * from "data/IntervalTracker";
    export * from "data/PointTracker";
    export * from "data/TrackedValue";
    export * from "data/Clamp";
    export * from "data/Scale";
    export * from "data/Flip";
    export * from "data/Interpolate";
    export * from "data/Wrap";
    export const piPi: number;
    export type NumberFunction = () => number;
}
declare module "data/Interpolate" {
    /**
     * Interpolates between `a` and `b` by `amount`. Aka `lerp`.
     *
     * @example Get the halfway point between 30 and 60
     * ```js
     * import {interpolate} from 'https://unpkg.com/ixfx/dist/data.js';
     * interpolate(0.5, 30, 60);
     * ```
     *
     * Interpolation is often used for animation. In that case, `amount`
     * would start at 0 and you would keep interpolating up to `1`
     * @example
     * ```js
     * import {interpolate} from 'https://unpkg.com/ixfx/dist/data.js';
     * import {percentPingPong} from 'https://unpkg.com/ixfx/dist/modulation.js'
     *
     * // Go back and forth between 0 and 1 by 0.1
     * let pp = percentPingPong(0.1);
     * continuously(() => {
     *  // Get position in ping-pong
     *  const amt = pp.next().value;
     *  // interpolate between Math.PI and Math.PI*2
     *  const v = interpolate(amt, Math.PI, Math.PI*2);
     *  // do something with v...
     * }).start();
     * ```
     *
     * See also {@link Visual.Colour.interpolate | Visual.Colour.interpolate }, {@link Geometry.Points.interpolate | Geometry.Points.interpolate}.
     * @param amount Interpolation amount, between 0 and 1 inclusive
     * @param a Start (ie when `amt` is 0)
     * @param b End (ie. when `amt` is 1)
     * @returns Interpolated value which will be between `a` and `b`.
     */
    export const interpolate: (amount: number, a: number, b: number) => number;
    export const interpolateAngle: (amount: number, angleA: number, angleB: number) => number;
}
declare module "modulation/Easing" {
    import { HasCompletion } from "flow/index";
    export type EasingFn = (x: number) => number;
    /**
     * Creates an easing based on clock time
     * @example Time based easing
     * ```
     * const t = time(`quintIn`, 5*1000); // Will take 5 seconds to complete
     * ...
     * t.compute(); // Get current value of easing
     * t.reset();   // Reset to 0
     * t.isDone;    // _True_ if finished
     * ```
     * @param nameOrFn Name of easing, or an easing function
     * @param durationMs Duration in milliseconds
     * @returns Easing
     */
    export const time: (nameOrFn: EasingName | EasingFn, durationMs: number) => Easing;
    /**
     * Creates an easing based on ticks
     *
     * @example Tick-based easing
     * ```
     * const t = tick(`sineIn`, 1000);   // Will take 1000 ticks to complete
     * t.compute(); // Each call to `compute` progresses the tick count
     * t.reset();   // Reset to 0
     * t.isDone;    // _True_ if finished
     * ```
     * @param nameOrFn Name of easing, or an easing function
     * @param durationTicks Duration in ticks
     * @returns Easing
     */
    export const tick: (nameOrFn: EasingName | EasingFn, durationTicks: number) => Easing;
    /**
     * 'Ease' from `0` to `1` over a delicious curve. Commonly used for animation
     * and basic modelling of phyical motion.
     *
     * Create via {@link tick} or {@link time}, call `compute` to calculate the next
     * value in the progression, until you reach `1` or `isDone` returns true.
     *
     */
    export type Easing = HasCompletion & {
        /**
         * Computes the current value of the easing
         *
         * @returns {number}
         */
        compute(): number;
        /**
         * Reset the easing
         */
        reset(): void;
        /**
         * Returns true if the easing is complete
         *
         * @returns {boolean}
         */
        get isDone(): boolean;
    };
    /**
     * Creates an easing function using a simple cubic bezier defined by two points.
     *
     * Eg: https://cubic-bezier.com/#0,1.33,1,-1.25
     *  a:0, b: 1.33, c: 1, d: -1.25
     *
     * ```js
     * // Time-based easing using bezier
     * const e = Easings.time(fromCubicBezier(1.33, -1.25), 1000);
     * e.compute();
     * ```
     * @param b
     * @param d
     * @param t
     * @returns Value
     */
    export const fromCubicBezier: (b: number, d: number) => EasingFn;
    /**
     * Returns a mix of two easing functions.
     *
     * ```js
     * // Get a 50/50 mix of two easing functions at t=0.25
     * mix(0.5, 0.25, sineIn, sineOut);
     *
     * // 10% of sineIn, 90% of sineOut
     * mix(0.90, 0.25, sineIn, sineOut);
     * ```
     * @param amt 'Progress' value passed to the easing functions
     * @param balance Mix between a and b
     * @param easingA
     * @param easingB
     * @returns Numeric value
     */
    export const mix: (amt: number, balance: number, easingA: EasingFn, easingB: EasingFn) => number;
    /**
     * Returns a 'crossfade' of two easing functions, synchronised with the progress through the easing. That is:
     * * 0.0 will yield 100% of easingA at its `easing(0)` value.
     * * 0.2 will yield 80% of a, 20% of b, with both at their `easing(0.2)` values
     * * 0.5 will yield 50% of both functions both at their `easing(0.5)` values
     * * 0.8 will yield 20% of a, 80% of a, with both at their `easing(0.8)` values
     * * 1.0 will yield 100% of easingB at its `easing(1)` value.
     *
     * So easingB will only ever kick in at higher `amt` values and `easingA` will only be present in lower valus.
     * @param amt
     * @param easingA
     * @param easingB
     * @returns Numeric value
     */
    export const crossfade: (amt: number, easingA: EasingFn, easingB: EasingFn) => number;
    /**
     * @private
     */
    export type EasingName = keyof typeof functions;
    /**
     * Returns an easing function by name, or _undefined_ if not found.
     * This is a manual way of working with easing functions. If you want to
     * ease over time or ticks, use `Flow.Timer.msElapsedTimer` or `Flow.Timer.ticksElapsedTimer`.
     *
     * ```js
     * const fn = Easings.get(`sineIn`);
     * // Returns 'eased' transformation of 0.5
     * fn(0.5);
     * ```
     * @param easingName eg `sineIn`
     * @returns Easing function
     */
    export const get: (easingName: EasingName) => EasingFn | undefined;
    /**
     * @private
     * @returns Returns list of available easing names
     */
    export const getEasings: () => readonly string[];
    /**
     * Returns a roughly gaussian easing function
     * @param stdDev
     * @returns
     */
    export const gaussian: (stdDev?: number) => EasingFn;
    export const functions: {
        arch: (x: number) => number;
        bell: EasingFn;
        sineIn: (x: number) => number;
        sineOut: (x: number) => number;
        quadIn: (x: number) => number;
        quadOut: (x: number) => number;
        sineInOut: (x: number) => number;
        quadInOut: (x: number) => number;
        cubicIn: (x: number) => number;
        cubicOut: (x: number) => number;
        quartIn: (x: number) => number;
        quartOut: (x: number) => number;
        quintIn: (x: number) => number;
        quintOut: (x: number) => number;
        expoIn: (x: number) => number;
        expoOut: (x: number) => number;
        quintInOut: (x: number) => number;
        expoInOut: (x: number) => number;
        circIn: (x: number) => number;
        circOut: (x: number) => number;
        backIn: (x: number) => number;
        backOut: (x: number) => number;
        circInOut: (x: number) => number;
        backInOut: (x: number) => number;
        elasticIn: (x: number) => number;
        elasticOut: (x: number) => number;
        bounceIn: (x: number) => number;
        bounceOut: (x: number) => number;
        elasticInOut: (x: number) => number;
        bounceInOut: (x: number) => number;
    };
}
declare module "collections/NumericArrays" {
    import * as Easings from "modulation/Easing";
    /**
     * Applies a function `fn` to the elements of an array, weighting them based on their relative position.
     *
     * ```js
     * // Six items
     * weight([1,1,1,1,1,1], Easings.gaussian());
     *
     * // Yields:
     * // [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
     * ```
     *
     * `fn` is expected to map (0..1) => (0..1), such as an {@link Modulation.Easings.EasingFn}. The input to the
     * `fn` is the relative position of an element. Thus the first element will be 0, the middle 0.5 and so on.
     * The output of `fn` is then multiplied by the original value.
     *
     * In the below example (which is also the default if `fn` is not specified), the relative position is
     * how values are weighted:
     *
     * ```js
     * weight([1,1,1,1,1,1], (relativePos) => relativePos);
     * // Yields:
     * // [0, 0.2, 0.4, 0.6, 0.8, 1]
     * ```
     *
     * Non-numbers in `data` will be silently ignored (this filtering happens first, so relative index values are sane still).
     *
     * @param data Array of numbers
     * @param fn Returns a weighting based on the given relative position. If unspecified, `(x) => x` is used.
     */
    export const weight: (data: readonly number[], fn?: ((relativePos: number) => number) | undefined) => readonly number[];
    /**
     * Returns the dot product of two arbitrary-sized arrays. Assumed they are of the same length.
     * @param a
     * @param b
     * @returns
     */
    export const dotProduct: (values: ReadonlyArray<readonly number[]>) => number;
    /**
     * Calculates the average of all numbers in an array.
     * Array items which aren't a valid number are ignored and do not factor into averaging.
     *
     * Use {@link minMaxAvg} if you want min, max and total as well.
     *
     * @example
     * ```
     * // Average of a list
     * const avg = average(1, 1.4, 0.9, 0.1);
     *
     * // Average of a variable
     * let data = [100,200];
     * average(...data);
     * ```
     * @param data Data to average.
     * @returns Average of array
     */
    export const average: (...data: readonly number[]) => number;
    /**
     * Computes an average of an array with a set of weights applied.
     *
     * Weights can be provided as an array, expected to be on 0..1 scale, with indexes
     * matched up to input data. Ie. data at index 2 will be weighed by index 2 in the weightings array.
     *
     * ```js
     * // All items weighted evenly
     * averageWeighted([1,2,3], [1,1,1]); // 2
     *
     * // First item has full weight, second half, third quarter
     * averageWeighted([1,2,3], [1, 0.5, 0.25]); // 1.57
     *
     * // With reversed weighting of [0.25,0.5,1] value is 2.42
     * ```
     *
     * A function can alternatively be provided to compute the weighting based on array index, via {@link weight}.
     *
     * ```js
     * averageWeighted[1,2,3], Easings.gaussian()); // 2.0
     * ```
     *
     * This is the same as:
     * ```js
     * const data = [1,2,3];
     * const w = weight(data, Easings.gaussian());
     * const avg = averageWeighted(data, w); // 2.0
     * ```
     * @param data Data to average
     * @param weightings Array of weightings that match up to data array, or an easing function
     */
    export const averageWeighted: (data: readonly number[], weightings: (readonly number[]) | Easings.EasingFn) => number;
    /**
     * Returns the minimum number out of `data`.
     * Undefined and non-numbers are silently ignored.
     * @param data
     * @returns Minimum number
     */
    export const min: (...data: readonly number[]) => number;
    /**
     * Returns the index of the largest value.
     * ```js
     * const v = [ 10, 40, 5 ];
     * maxIndex(v); // Yields 1
     * ```
     * @param data Array of numbers
     * @returns Index of largest value
     */
    export const maxIndex: (...data: readonly number[]) => number;
    /**
     * Returns the index of the smallest value.
     *
     * ```js
     * const v = [ 10, 40, 5 ];
     * minIndex(v); // Yields 2
     * ```
     * @param data Array of numbers
     * @returns Index of smallest value
     */
    export const minIndex: (...data: readonly number[]) => number;
    /**
     * Returns the maximum number out of `data`.
     * Undefined and non-numbers are silently ignored.
     * @param data List of numbers
     * @returns Maximum number
     */
    export const max: (...data: readonly number[]) => number;
    /**
     * Returns the total of `data`.
     * Undefined and non-numbers are silently ignored
     * @param data Array of numbers
     * @returns Total
     */
    export const total: (...data: readonly number[]) => number;
    /**
     * Returns the maximum out of `data` without pre-filtering for speed.
     *
     * For most uses, {@link max} should suffice.
     * @param data
     * @returns Maximum
     */
    export const maxFast: (data: readonly number[] | Float32Array) => number;
    /**
     * Returns the maximum out of `data` without pre-filtering for speed.
     *
     * For most uses, {@link max} should suffice.
     * @param data
     * @returns Maximum
     */
    export const minFast: (data: readonly number[] | Float32Array) => number;
    export type MinMaxAvgTotal = {
        /**
         * Smallest value in array
         */
        readonly min: number;
        /**
         * Total of all items
         */
        readonly total: number;
        /**
         * Largest value in array
         */
        readonly max: number;
        /**
         * Average value in array
         */
        readonly avg: number;
    };
    /**
     * Returns the min, max, avg and total of the array.
     * Any values that are invalid are silently skipped over.
     *
     * ```js
     * const v = [10, 2, 4.2, 99];
     * const mma = minMaxAvg(v);
     * Yields: { min: 2, max: 99, total: 115.2, avg: 28.8 }
     * ```
     *
     * Use {@link average}, {@link max}, {@link min} or {@link total} if you only need one of these.
     *
     * A start and end range can be provided if the calculation should be restricted to a part
     * of the input array. By default the whole array is used.
     *
     * @param data
     * @param startIndex If provided, starting index to do calculations (defaults full range)
     * @param endIndex If provided, the end index to do calculations (defaults full range)
     * @returns `{min, max, avg, total}`
     */
    export const minMaxAvg: (data: readonly number[], startIndex?: number, endIndex?: number) => MinMaxAvgTotal;
}
declare module "collections/Arrays" {
    import { RandomSource } from "Random";
    import { IsEqual } from "Util";
    export * from "collections/NumericArrays";
    /**
     * Throws an error if `array` parameter is not a valid array
     * @private
     * @param array
     * @param paramName
     */
    export const guardArray: <V>(array: ArrayLike<V>, paramName?: string) => void;
    /**
     * Throws if `index` is an invalid array index for `array`, and if
     * `array` itself is not a valid array.
     * @param array
     * @param index
     */
    export const guardIndex: <V>(array: readonly V[], index: number, paramName?: string) => void;
    /**
     * Returns _true_ if all the contents of the array are identical.
     *
     * @example Uses default equality function:
     * ```js
     * const a1 = [10, 10, 10];
     * areValuesIdentical(a1); // True
     *
     * const a2 = [ {name:`Jane`}, {name:`John} ];
     * areValuesIdentical(a2); // True, because JSON version captures value
     * ```
     *
     * If we want to compare by value for objects that aren't readily
     * converted to JSON, you need to provide a function:
     * ```js
     * areValuesIdentical(someArray, (a, b) => {
     *  return (a.eventType === b.eventType);
     * });
     * ```
     * @param array Array
     * @param equality Equality checker. Uses string-conversion checking by default
     * @returns
     */
    export const areValuesIdentical: <V>(array: readonly V[], equality?: IsEqual<V> | undefined) => boolean;
    /**
     * Zip ombines the elements of two or more arrays based on their index.
     *
     * ```js
     * const a = [1,2,3];
     * const b = [`red`, `blue`, `green`];
     *
     * const c = zip(a, b);
     * // Yields:
     * // [
     * //   [1, `red`],
     * //   [2, `blue`],
     * //   [3, `green`]
     * // ]
     * ```
     *
     * Typically the arrays you zip together are all about the same logical item. Eg, in the above example
     * perhaps `a` is size and `b` is colour. So thing #1 (at array index 0) is a red thing of size 1. Before
     * zipping we'd access it by `a[0]` and `b[0]`. After zipping, we'd have c[0], which is array of [1, `red`].
     * @param arrays
     * @returns Zipped together array
     */
    export const zip: (...arrays: ReadonlyArray<any>) => ReadonlyArray<any>;
    /**
     * Returns an interleaving of two or more arrays. All arrays must be the same length.
     *
     * ```js
     * const a = [`a`, `b`, `c`];
     * const b = [`1`, `2`, `3`];
     * const c = interleave(a, b);
     * // Yields:
     * // [`a`, `1`, `b`, `2`, `c`, `3`]
     * ```
     * @param arrays
     * @returns
     */
    export const interleave: <V>(...arrays: readonly (readonly V[])[]) => readonly V[];
    /**
     * Returns an copy of `data` with specified length.
     * If the input array is too long, it is truncated.
     *
     * If the input array is too short, it will be expanded based on the `expand` strategy:
     *  - 'undefined': fill with `undefined`
     *  - 'repeat': repeat array elements, starting from position 0
     *  - 'first': continually use first element
     *  - 'last': continually use last element
     *
     * @example
     * ```js
     * ensureLength([1,2,3], 2); // [1,2]
     * ensureLength([1,2,3], 5, `undefined`); // [1,2,3,undefined,undefined]
     * ensureLength([1,2,3], 5, `repeat`);    // [1,2,3,1,2]
     * ensureLength([1,2,3], 5, `first`);     // [1,2,3,1,1]
     * ensureLength([1,2,3], 5, `last`);      // [1,2,3,3,3]
     * ```
     * @param data Input array to expand
     * @param length Desired length
     * @param expand Expand strategy
     * @typeParam V Type of array
     */
    export const ensureLength: <V>(data: readonly V[], length: number, expand?: `undefined` | `repeat` | `first` | `last`) => readonly V[];
    /**
     * Return elements from `array` that match a given `predicate`, and moreover are between
     * the given `startIndex` and `endIndex` (both inclusive).
     *
     * While this can be done with in the in-built `array.filter` function, it will
     * needlessly iterate through the whole array. It also avoids another alternative
     * of slicing the array before using `filter`.
     *
     * ```js
     * // Return 'registered' people between and including array indexes 5-10
     * const filtered = filterBetween(people, person => person.registered, 5, 10);
     * ```
     * @param array Array to filter
     * @param predicate Filter function
     * @param startIndex Start index (defaults to 0)
     * @param endIndex End index (defaults to last index)
     */
    export const filterBetween: <V>(array: readonly V[], predicate: (value: V, index: number, array: readonly V[]) => boolean, startIndex?: number, endIndex?: number) => readonly V[];
    /**
     * Returns a random array index.
     *
     * ```js
     * const v = [`blue`, `red`, `orange`];
     * randomIndex(v); // Yields 0, 1 or 2
     * ```
     *
     * Use {@link randomElement} if you want a value from `array`, not index.
     *
     * @param array Array
     * @param rand Random generator. `Math.random` by default.
     * @returns
     */
    export const randomIndex: <V>(array: ArrayLike<V>, rand?: RandomSource) => number;
    /**
     * Returns random element.
     * ```js
     * const v = [`blue`, `red`, `orange`];
     * randomElement(v); // Yields `blue`, `red` or `orange`
     * ```
     *
     * Use {@link randomIndex} if you want a random index within `array`.
     *
     * @param array
     * @params rand Random generator. `Math.random` by default.
     * @returns
     */
    export const randomElement: <V>(array: ArrayLike<V>, rand?: RandomSource) => V;
    /**
     * Removes a random item from an array, returning both the item and the new array as a result.
     * Does not modify the original array unless `mutate` parameter is true.
     *
     * @example Without changing source
     * ```js
     * const data = [100, 20, 40];
     * const {value, array} = randomPluck(data);
     * // value: 20, array: [100, 40], data: [100, 20, 40];
     * ```
     *
     * @example Mutating source
     * ```js
     * const data = [100, 20, 40];
     * const {value} = randomPluck(data, true);
     * // value: 20, data: [100, 40];
     * ```
     *
     * @template V Type of array
     * @param array Array to pluck item from
     * @param mutate If _true_, changes input array. _False_ by default.
     * @param random Random generatr. `Math.random` by default.
     * @return Returns an object `{value:V|undefined, array:V[]}`
     *
     */
    export const randomPluck: <V>(array: readonly V[], mutate?: boolean, rand?: RandomSource) => {
        readonly value: V | undefined;
        readonly array: V[];
    };
    /**
     * Returns a shuffled copy of the input array.
     * @example
     * ```js
     * const d = [1, 2, 3, 4];
     * const s = shuffle(d);
     * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
     * ```
     * @param dataToShuffle
     * @param rand Random generator. `Math.random` by default.
     * @returns Copy with items moved around randomly
     * @template V Type of array items
     */
    export const shuffle: <V>(dataToShuffle: readonly V[], rand?: RandomSource) => readonly V[];
    /**
     * Returns an array with a value omitted. If value is not found, result will be a copy of input.
     * Value checking is completed via the provided `comparer` function.
     * By default checking whether `a === b`. To compare based on value, use the `isEqualValueDefault` comparer.
     *
     * @example
     * ```js
     * const data = [100, 20, 40];
     * const filtered = without(data, 20); // [100, 40]
     * ```
     *
     * @example Using value-based comparison
     * ```js
     * const data = [{name: `Alice`}, {name:`Sam`}];
     *
     * // This wouldn't work as expected, because the default comparer uses instance,
     * // not value:
     * without(data, {name: `Alice`});
     *
     * // So instead we can use a value comparer:
     * without(data, {name:`Alice`}, isEqualValueDefault);
     * ```
     *
     * @example Use a function
     * ```js
     * const data = [{name: `Alice`}, {name:`Sam`}];
     * without(data, {name:`ALICE`}, (a, b) => {
     *  return (a.name.toLowerCase() === b.name.toLowerCase());
     * });
     * ```
     *
     * Consider {@link remove} to remove an item by index.
     *
     * @template V Type of array items
     * @param data Source array
     * @param value Value to remove
     * @param comparer Comparison function. If not provided `Util.isEqualDefault` is used, which compares using `===`
     * @return Copy of array without value.
     */
    export const without: <V>(data: readonly V[], value: V, comparer?: IsEqual<V>) => readonly V[];
    /**
     * Removes an element at `index` index from `data`, returning the resulting array without modifying the original.
     *
     * ```js
     * const v = [ 100, 20, 50 ];
     * const vv = remove(2);
     *
     * Yields:
     *  v: [ 100, 20, 50 ]
     * vv: [ 100, 20 ]
     * ```
     *
     * Consider {@link without} if you want to remove an item by value.
     *
     * Throws an exception if `index` is outside the range of `data` array.
     * @param data Input array
     * @param index Index to remove
     * @typeParam V Type of array
     * @returns
     */
    export const remove: <V>(data: readonly V[], index: number) => readonly V[];
    /**
     * Groups data by a function `grouper`, returning data as a map with string
     * keys and array values. Multiple values can be assigned to the same group.
     *
     * `grouper` must yield a string designated group for a given item.
     *
     * @example
     * ```js
     * const data = [
     *  { age: 39, city: `London` }
     *  { age: 14, city: `Copenhagen` }
     *  { age: 23, city: `Stockholm` }
     *  { age: 56, city: `London` }
     * ];
     *
     * // Whatever the function returns will be the designated group
     * // for an item
     * const map = groupBy(data, item => data.city);
     * ```
     *
     * This yields a Map with keys London, Stockholm and Copenhagen, and the corresponding values.
     *
     * ```
     * London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
     * Stockhom: [{ age: 23, city: `Stockholm` }]
     * Copenhagen: [{ age: 14, city: `Copenhagen` }]
     * ```
     * @param array Array to group
     * @param grouper Function that returns a key for a given item
     * @typeParam K Type of key to group by. Typically string.
     * @typeParam V Type of values
     * @returns Map
     */
    export const groupBy: <K, V>(array: readonly V[], grouper: (item: V) => K) => Map<K, V[]>;
    /**
     * Samples array
     *
     * @example By percentage - get half of the items
     * ```
     * const list = [1,2,3,4,5,6,7,8,9,10];
     * const sub = sample(list, 0.5);
     * // Yields:
     * // [2, 4, 6, 8, 10]
     * ```
     *
     * @example By steps - every third
     * ```
     * const list = [1,2,3,4,5,6,7,8,9,10];
     * const sub = sample(list, 3);
     * // Yields:
     * // [3, 6, 9]
     * ```
     * @param array Array to sample
     * @param amount Amount, given as a percentage (0..1) or the number of interval (ie 3 for every third item)
     * @returns
     */
    export const sample: <V>(array: readonly V[], amount: number) => readonly V[];
}
declare module "Random" {
    import { randomIndex, randomElement } from "collections/Arrays";
    import * as Easings from "modulation/Easing";
    export { randomIndex as arrayIndex };
    export { randomElement as arrayElement };
    export { randomHue as hue } from "visual/Colour";
    /**
     * Default random number generator: `Math.random`.
     */
    export const defaultRandom: () => number;
    /**
     * A random source.
     *
     * Predefined sources: {@link defaultRandom}, {@link gaussianSkewed}, {@link weightedSkewed}
     */
    export type RandomSource = () => number;
    /***
     * Returns a random number, 0..1, weighted by a given easing function.
     * Default easing is `quadIn`, which skews towards zero.
     *
     * ```js
     * weighted();          // quadIn easing by default, which skews toward low values
     * weighted(`quadOut`); // quadOut favours high values
     * ```
     *
     * Use {@link weightedSkewed} for a curried version that can be used as a {@link RandomSource}:
     *
     * ```js
     * const w = weightedSkewed(`quadIn`);
     * w(); // Produce a random number
     * ```
     * @param easingName Easing name. `quadIn` by default.
     * @param rand Source random generator. `Math.random` by default.
     * @returns Random number (0-1)
     */
    export const weighted: (easingName?: Easings.EasingName, rand?: RandomSource) => number;
    /**
     * Returns a curried version of {@link weighted}.
     *
     * ```js
     * const w = weightedSkewed(`quadIn`);   // Returns a function
     * w(); // Produce a random number
     * ```
     * @param easingName
     * @param rand
     * @returns
     */
    export const weightedSkewed: (easingName?: Easings.EasingName, rand?: RandomSource) => RandomSource;
    /**
     * Random integer, weighted according to an easing function.
     * Number will be inclusive of `min` and below `max`.
     *
     * ```js
     * // If only one parameter is provided, it's assumed to be the max:
     * // Random number that might be 0 through to 99
     * const r = weightedInteger(100);
     *
     * // If two numbers are given, it's assumed to be min, max
     * // Random number that might be 20 through to 29
     * const r = weightedInteger(20,30);
     *
     * // One number and string. First param is assumed to be
     * // the max, second parameter the easing function
     * const r = weightedInteger(100, `quadIn`)
     * ```
     *
     * Useful for accessing a random array element:
     * ```js
     * const list = [`mango`, `kiwi`, `grape`];
     * // Yields random item from list
     * list[weightedInteger(list.length)];
     * ```
     *
     * Note: result from easing function will be clamped to
     * the min/max (by default 0-1);
     *
     * @param max Maximum (exclusive)
     * @param min Minimum number (inclusive), 0 by default
     * @param rand Source random generator. `Math.random` by default.
     * @param easing Easing to use, uses `quadIn` by default
     * @returns
     */
    export const weightedInteger: (minOrMax: number, maxOrEasing?: number | Easings.EasingName, easing?: Easings.EasingName, rand?: RandomSource) => number;
    /**
     * Returns a random number with gaussian (ie bell-curved) distribution
     * ```js
     * // Yields a random number between 0..1
     * // with a gaussian distribution
     * gaussian();
     * ```
     *
     * Distribution can also be skewed:
     * ```js
     * // Yields a skewed random value
     * gaussian(10);
     * ```
     *
     * Use the curried version in order to pass the random number generator elsewhere:
     * ```js
     * const g = gaussianSkewed(10);
     * // Now it can be called without parameters
     * g(); // Yields skewed random
     *
     * // Eg:
     * shuffle(gaussianSkewed(10));
     * ```
     * @param skew Skew factor. Defaults to 1, no skewing. Above 1 will skew to left, below 1 will skew to right
     * @returns
     */
    export const gaussian: (skew?: number) => number;
    /**
     * Returns a function of skewed gaussian values.
     *
     * This 'curried' function is useful when passing to other functions
     * ```js
     * // Curry
     * const g = gaussianSkewed(10);
     *
     * // Now it can be called without parameters
     * g(); // Returns skewed value
     *
     * // Eg:
     * shuffle(gaussianSkewed(10));
     * ```
     * @param skew Skew factor. Defaults to 1, no skewing. Above 1 will skew to left, below 1 will skew to right
     * @returns
     */
    export const gaussianSkewed: (skew?: number) => () => number;
    /**
     * Returns a random integer between `max` (exclusive) and `min` (inclusive)
     * If `min` is not specified, 0 is used.
     *
     * ```js
     * integer(10);    // Random number 0-9
     * integer(5, 10); // Random number 5-9
     * integer(-5);       // Random number from -4 to 0
     * integer(-5, -10); // Random number from -10 to -6
     * ```
     * @param max
     * @param min
     * @returns
     */
    export const integer: (max: number, min?: number) => number;
    /**
     * Random a random float between `max` (exclusive) and `min` (inclusive).
     * 1 and 0 are used as default max and min, respectively.
     *
     * ```js
     * // Random number between 0..1 (but not including 1)
     * // (this would be identical to Math.random())
     * const v = float();
     * // Random float between 0..100 (but not including 100)
     * const v = float(100);
     * // Random float between 20..40 (possibily including 20, but always lower than 40)
     * const v = float(20, 40);
     * ```
     * @param max
     * @param min
     * @returns
     */
    export const float: (max?: number, min?: number) => number;
    /**
     * Returns a string of random letters and numbers of a given `length`.
     *
     * ```js
     * string(4); // eg. `4afd`
     * ```
     * @param length Length of random string
     * @returns Random string
     */
    export const string: (length: number) => string;
    export const shortGuid: () => string;
}
declare module "visual/Colour" {
    import * as d3Colour from 'd3-color';
    import { RandomSource } from "Random";
    export type Hsl = {
        h: number;
        s: number;
        l: number;
        opacity?: number;
    };
    export type Rgb = {
        r: number;
        g: number;
        b: number;
        opacity?: number;
    };
    export type Spaces = `hsl` | `rgb` | `lab` | `hcl` | `cubehelix`;
    /**
     * @private
     */
    export type Colour = d3Colour.RGBColor | d3Colour.HSLColor;
    /**
     * A representation of colour. Eg: `blue`, `rgb(255,0,0)`, `hsl(20,100%,50%)`
     */
    export type Colourish = string | d3Colour.ColorCommonInstance;
    /**
     * Options for interpolation
     */
    export type InterpolationOpts = {
        /**
         * Gamma correction. Eg 4 brightens values. Only applies to rgb and cubehelix
         * [Read more](https://github.com/d3/d3-interpolate#interpolate_gamma)
         */
        gamma?: number;
        /**
         * Colour space
         */
        space?: Spaces;
        /**
         * If true, interpolation happens the longer distance. Only applies to hsl, hcl and cubehelix
         */
        long?: boolean;
    };
    /**
     * Parses colour to `{ h, s, l }`. `opacity` field is added if it exists on source.
     * @param colour
     * @returns
     */
    export const toHsl: (colour: Colourish) => Hsl;
    /**
     * Returns a full HSL colour string (eg `hsl(20,50%,75%)`) based on a index.
     * It's useful for generating perceptually different shades as the index increments.
     *
     * ```
     * el.style.backgroundColor = goldenAgeColour(10);
     * ```
     *
     * Saturation and lightness can be specified, as numeric ranges of 0-1.
     *
     * @param saturation Saturation (0-1), defaults to 0.5
     * @param lightness Lightness (0-1), defaults to 0.75
     * @param alpha Opacity (0-1), defaults to 1.0
     * @returns HSL colour string eg `hsl(20,50%,75%)`
     */
    export const goldenAngleColour: (index: number, saturation?: number, lightness?: number, alpha?: number) => string | undefined;
    /**
     * Returns a random hue component
     * ```
     * // Generate hue
     * const h =randomHue(); // 0-359
     *
     * // Generate hue and assign as part of a HSL string
     * el.style.backgroundColor = `hsl(${randomHue(), 50%, 75%})`;
     * ```
     * @param rand
     * @returns
     */
    export const randomHue: (rand?: RandomSource) => number;
    /**
     * Parses colour to `{ r, g, b }`. `opacity` field is added if it exists on source.
     * [Named colours](https://html-color-codes.info/color-names/)
     * @param colour
     * @returns
     */
    export const toRgb: (colour: Colourish) => Rgb;
    /**
     * Returns a colour in hex format `#000000`
     * @param colour
     * @returns Hex format, including #
     */
    export const toHex: (colour: Colourish) => string;
    /**
     * Returns a variation of colour with its opacity multiplied by `amt`.
     *
     * ```js
     * // Return a colour string for blue that is 50% opaque
     * opacity(`blue`, 0.5);
     * // eg: `rgba(0,0,255,0.5)`
     *
     * // Returns a colour string that is 50% more opaque
     * opacity(`hsla(200,100%,50%,50%`, 0.5);
     * // eg: `hsla(200,100%,50%,25%)`
     * ```
     *
     * [Named colours](https://html-color-codes.info/color-names/)
     * @param colour A valid CSS colour
     * @param amt Amount to multiply opacity by
     * @returns String representation of colour
     */
    export const opacity: (colour: Colourish, amt: number) => string;
    /**
     * Gets a CSS variable.
     * @example Fetch --accent variable, or use `yellow` if not found.
     * ```
     * getCssVariable(`accent`, `yellow`);
     * ```
     * @param name Name of variable. Omit the `--`
     * @param fallbackColour Fallback colour if not found
     * @param root  Element to search variable from
     * @returns Colour or fallback.
     */
    export const getCssVariable: (name: string, fallbackColour?: string, root?: HTMLElement) => string;
    /**
     * Interpolates between two colours, returning a string in the form `rgb(r,g,b)`
     *
     * @example
     * ```js
     * // Get 50% between blue and red
     * interpolate(0.5, `blue`, `red`);
     *
     * // Get midway point, with specified colour space
     * interpolate(0.5, `hsl(200, 100%, 50%)`, `pink`, {space: `hcl`});
     * ```
     *
     * [Named colours](https://html-color-codes.info/color-names/)
     * @param amount Amount (0 = from, 0.5 halfway, 1= to)
     * @param from Starting colour
     * @param to Final colour
     * @param optsOrSpace Options for interpolation, or string name for colour space, eg `hsl`.
     * @returns String representation of colour, eg. `rgb(r,g,b)`
     */
    export const interpolate: (amount: number, from: Colourish, to: Colourish, optsOrSpace?: string | InterpolationOpts) => string;
    /**
     * Produces a scale of colours as a string array
     *
     * @example
     * ```js
     * // Yields array of 5 colour strings
     * const s = scale(5, {space:`hcl`}, `blue`, `red`);
     * // Produces scale between three colours
     * const s = scale(5, {space:`hcl`}, `blue`, `yellow`, `red`);
     * ```
     * @param steps Number of colours
     * @param opts Options for interpolation, or string colour space eg `hsl`
     * @param colours From/end colours (or more)
     * @returns
     */
    export const scale: (steps: number, opts: InterpolationOpts | string, ...colours: Colourish[]) => string[];
}
declare module "Debug" {
    /**
     * Returns a bundled collection of {@link logger}s
     *
     * ```
     * const con = logSet(`a`);
     * con.log(`Hello`);  // console.log(`a Hello`);
     * con.warn(`Uh-oh`); // console.warn(`a Uh-oh`);
     * con.error(`Eek!`); // console.error(`a Eek!`);
     * ```
     * @param prefix
     * @returns
     */
    export const logSet: (prefix: string) => {
        log: (m: any) => void;
        warn: (m: any) => void;
        error: (m: any) => void;
    };
    /**
     * Returns a console logging function which prefixes messages. This is
     * useful for tracing messages from different components. Each prefix
     * is assigned a colour, further helping to distinguish messages.
     *
     * Use {@link logSet} to get a bundled set.
     *
     * ```
     * // Initialise once
     * const log = logger(`a`);
     * const error = logger(`a`, `error`);
     * const warn = logger(`a`, `warn);
     *
     * // And then use
     * log(`Hello`);    // console.log(`a Hello`);
     * error(`Uh-oh`);  // console.error(`a Uh-oh`);
     * warn(`Eek!`);    // console.warn(`a Eeek!`);
     * ```
     * @param prefix
     * @param kind
     * @returns
     */
    export const logger: (prefix: string, kind?: `log` | `warn` | `error`) => (m: any) => void;
}
declare module "Filters" {
    export const threshold: (threshold: number) => (v: number) => boolean;
    export const rangeInclusive: (min: number, max: number) => (v: number) => boolean;
    export const filter: <V>(v: V, fn: (v: V) => boolean, skipValue: V | undefined) => V | undefined;
}
declare module "Iterable" {
    type WithEvents = {
        addEventListener(type: string, callbackfn: any): void;
        removeEventListener(type: string, callbackfn: any): void;
    };
    export const isAsyncIterable: (v: any) => v is AsyncIterable<any>;
    export const isIterable: (v: any) => v is Iterable<any>;
    export const eventsToIterable: <V>(eventSource: WithEvents, eventType: string) => AsyncIterator<any, any, undefined>;
}
declare module "Match" {
    type MatchFunction<V> = {
        (v: V, index?: number, array?: V[]): boolean;
    };
    /**
     * Returns a function that filters a set of items by a set of filters
     *
     * @template V
     * @param {Iterable<MatchFunction<V>>} filters If filter returns true, item is included
     * @param {{allFiltersMustMatch?: boolean}} [opts={}]
     * @returns
     */
    export const filter: <V>(filters: Iterable<MatchFunction<V>>, opts?: {
        allFiltersMustMatch?: boolean;
    }) => (vArray: Iterable<V>) => Generator<V, void, unknown>;
}
declare module "Tristate" {
    /**
     * Returns true if a is more sure than b
     * @param a
     * @param b
     * @returns
     */
    export const comparer: (a: Tristate, b: Tristate) => number;
    export type Tristate = `no` | `yes` | `maybe`;
}
declare module "__tests__/colour.test" { }
declare module "__tests__/frequencyMutable.test" { }
declare module "__tests__/generators.test" { }
declare module "__tests__/guards.test" { }
declare module "__tests__/keyValue.test" { }
declare module "__tests__/random.test" { }
declare module "__tests__/util.test" { }
declare module "__tests__/collections/arrays.test" { }
declare module "__tests__/collections/lists.test" { }
declare module "__tests__/collections/map.test" { }
declare module "__tests__/collections/mapMutable.test" { }
declare module "__tests__/collections/queue.test" { }
declare module "__tests__/collections/sets.test" { }
declare module "__tests__/collections/stack.test" { }
declare module "__tests__/flow/repeat.test" { }
declare module "__tests__/flow/statemachine.test" { }
declare module "__tests__/geometry/grid.test" { }
declare module "__tests__/geometry/line.test" { }
declare module "__tests__/geometry/point.test" { }
declare module "__tests__/geometry/polar.test" { }
declare module "__tests__/geometry/triangles.test" { }
declare module "__tests__/modulation/pingPong.test" { }
declare module "__tests__/temporal/numberTracker.test" { }
declare module "components/HistogramVis" {
    import { LitElement } from 'lit';
    import { KeyValue } from "KeyValue";
    type Bar = {
        readonly percentage: number;
        readonly data: KeyValue;
    };
    /**
     * Usage in HTML:
     * ```html
     * <style>
     * histogram-vis {
     *  display: block;
     *  height: 7em;
     *  --histogram-bar-color: pink;
     * }
     * </style>
     * <histogram-vis>
     * [
     *  ["apples", 5],
     *  ["oranges", 3],
     *  ["pineapple", 0],
     *  ["limes", 9]
     * ]
     * </histogram-vis>
     * ```
     *
     * CSS colour theming:
     * --histogram-bar-color
     * --histogram-label-color
     *
     * HTML tag attributes
     * showXAxis (boolean)
     * showDataLabels (boolean)
     *
     * @export
     * @class HistogramVis
     * @extends {LitElement}
     **/
    export class HistogramVis extends LitElement {
        static readonly styles: import("lit").CSSResult;
        data: readonly KeyValue[];
        showDataLabels: boolean;
        height: string;
        showXAxis: boolean;
        json: readonly KeyValue[] | undefined;
        constructor();
        connectedCallback(): void;
        barTemplate(bar: Bar, index: number, _totalBars: number): import("lit-html").TemplateResult<1>;
        render(): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            readonly "histogram-vis": HistogramVis;
        }
    }
}
declare module "components/FrequencyHistogramPlot" {
    import { HistogramVis } from "components/HistogramVis";
    /**
     * Creates and drives a HistogramVis instance.
     * Data should be an outer array containing two-element arrays for each
     * data point. The first element of the inner array is expected to be the key, the second the frequency.
     * For example,  `[`apples`, 2]` means the key `apples` was counted twice.
     *
     * Usage:
     * .sortBy() automatically sorts prior to visualisation. By default off.
     * .update(data) full set of data to plot
     * .clear() empties plot - same as calling `update([])`
     * .el - The `HistogramVis` instance, or undefined if not created/disposed
     *
     * ```
     * const plot = new FrequencyHistogramPlot(document.getElementById('histogram'));
     * plot.sortBy('key'); // Automatically sort by key
     * ...
     * plot.update([[`apples`, 2], [`oranges', 0], [`bananas`, 5]])
     * ```
     *
     * @export
     * @class FrequencyHistogramPlot
     */
    export class FrequencyHistogramPlot {
        #private;
        readonly el: HistogramVis | undefined;
        constructor(el: HistogramVis);
        setAutoSort(sortStyle: `value` | `valueReverse` | `key` | `keyReverse`): void;
        clear(): void;
        dispose(): void;
        update(data: ReadonlyArray<readonly [key: string, count: number]>): void;
    }
}
declare module "components/index" {
    export { HistogramVis } from "components/HistogramVis";
    export { FrequencyHistogramPlot } from "components/FrequencyHistogramPlot";
}
declare module "data/Proportion" {
    import { NumberFunction } from "data/index";
    /**
     * Scales a percentage-scale number, ie: `v * t`.
     * The utility of this function is that it sanity-checks that
     *  both parameters are in the 0..1 scale.
     * @param v Value
     * @param t Scale amount
     * @returns Scaled value
     */
    export const proportion: (v: number | NumberFunction, t: number | NumberFunction) => number;
}
