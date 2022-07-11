import { I as IsEqual, T as ToString } from './Util-e3ea7983.js';

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
declare const hasKeyValue: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V, comparer: IsEqual<V>) => boolean;
declare type GetOrGenerate<K, V, Z> = (key: K, args?: Z) => Promise<V>;
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
declare const getOrGenerate: <K, V, Z>(map: Map<K, V>, fn: (key: K, args?: Z | undefined) => V | Promise<V>) => GetOrGenerate<K, V, Z>;
/**
 * @inheritDoc getOrGenerate
 * @param map
 * @param fn
 * @returns
 */
declare const getOrGenerateSync: <K, V, Z>(map: Map<K, V>, fn: (key: K, args?: Z | undefined) => V) => (key: K, args?: Z | undefined) => V;
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
declare const addUniqueByHash: <V>(set: ReadonlyMap<string, V> | undefined, hashFunc: ToString<V>, ...values: readonly V[]) => Map<any, any>;
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
declare const hasAnyValue: <K, V>(map: ReadonlyMap<K, V>, value: V, comparer: IsEqual<V>) => boolean;
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
declare function filter<V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean): Generator<V, void, unknown>;
/**
 * Copies data to an array
 * @param map
 * @returns
 */
declare const toArray: <V>(map: ReadonlyMap<string, V>) => readonly V[];
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
declare const find: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => V | undefined;
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
declare const mapToObjTransform: <T, K>(m: ReadonlyMap<string, T>, valueTransform: (value: T) => K) => {
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
declare const zipKeyValue: <V>(keys: ReadonlyArray<string>, values: ArrayLike<V | undefined>) => {
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
declare const transformMap: <K, V, R>(source: ReadonlyMap<K, V>, transformer: (value: V, key: K) => R) => Map<K, R>;
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
declare const mapToObj: <T>(m: ReadonlyMap<string, T>) => {
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
declare const mapToArray: <K, V, R>(m: ReadonlyMap<K, V>, transformer: (key: K, item: V) => R) => readonly R[];

declare const Map$1_hasKeyValue: typeof hasKeyValue;
type Map$1_GetOrGenerate<K, V, Z> = GetOrGenerate<K, V, Z>;
declare const Map$1_getOrGenerate: typeof getOrGenerate;
declare const Map$1_getOrGenerateSync: typeof getOrGenerateSync;
declare const Map$1_addUniqueByHash: typeof addUniqueByHash;
declare const Map$1_hasAnyValue: typeof hasAnyValue;
declare const Map$1_filter: typeof filter;
declare const Map$1_toArray: typeof toArray;
declare const Map$1_find: typeof find;
declare const Map$1_mapToObjTransform: typeof mapToObjTransform;
declare const Map$1_zipKeyValue: typeof zipKeyValue;
declare const Map$1_transformMap: typeof transformMap;
declare const Map$1_mapToObj: typeof mapToObj;
declare const Map$1_mapToArray: typeof mapToArray;
declare namespace Map$1 {
  export {
    Map$1_hasKeyValue as hasKeyValue,
    Map$1_GetOrGenerate as GetOrGenerate,
    Map$1_getOrGenerate as getOrGenerate,
    Map$1_getOrGenerateSync as getOrGenerateSync,
    Map$1_addUniqueByHash as addUniqueByHash,
    Map$1_hasAnyValue as hasAnyValue,
    Map$1_filter as filter,
    Map$1_toArray as toArray,
    Map$1_find as find,
    Map$1_mapToObjTransform as mapToObjTransform,
    Map$1_zipKeyValue as zipKeyValue,
    Map$1_transformMap as transformMap,
    Map$1_mapToObj as mapToObj,
    Map$1_mapToArray as mapToArray,
  };
}

export { GetOrGenerate as G, Map$1 as M, getOrGenerateSync as a, addUniqueByHash as b, hasAnyValue as c, find as d, transformMap as e, filter as f, getOrGenerate as g, hasKeyValue as h, mapToObj as i, mapToArray as j, mapToObjTransform as m, toArray as t, zipKeyValue as z };
