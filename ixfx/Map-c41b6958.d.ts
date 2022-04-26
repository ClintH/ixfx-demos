import { IsEqual, ToString } from './util';

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
/**
 * Adds items to a map only if their key doesn't already exist
 *
 * Uses provided {@link ToString} function to create keys for items. Item is only added if it doesn't already exist.
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
 * @example Finds value `samantha`, using string equality to match
 * ```js
 * hasAnyValue(map, `samantha`, (a, b) => a === b);
 * ```
 * @param map Map to search
 * @param value Value to find
 * @param comparer Function that determines matching
 * @returns True if value is found
 */
declare const hasAnyValue: <K, V>(map: ReadonlyMap<K, V>, value: V, comparer: IsEqual<V>) => boolean;
/**
 * Returns items where `predicate` returns true.
 *
 * If you just want the first match, use `find`
 *
 * @example All people over thirty
 * ```js
 * const overThirty = filter(people, person => person.age > 30);
 * ```
 * @param map Map
 * @param predicate Filtering predicate
 * @returns Values that match predicate
 */
declare const filter: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => readonly V[];
/**
 * Copies data to an array
 * @param map
 * @returns
 */
declare const toArray: <V>(map: ReadonlyMap<string, V>) => readonly V[];
/**
 * Returns the first found item that matches `predicate` or undefined.
 *
 * If you want all matches, use `filter`.
 *
 * @example First person over thirty
 * ```js
 * const overThirty = find(people, person => person.age > 30);
 * ```
 * @param map
 * @param predicate
 * @returns Found item or undefined
 */
declare const find: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => V | undefined;
/**
 * Converts a map to a simple object, transforming from type `T` to `K` as it does so. If no transforms are needed, use {@link mapToObj}.
 *
 * @param m
 * @param valueTransform
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
  * @template V
  * @param keys
  * @param values
  * @return
  */
declare const zipKeyValue: <V>(keys: ReadonlyArray<string>, values: ArrayLike<V | undefined>) => {
    [k: string]: V | undefined;
};
/**
 * Like `Array.map`, but for a Map. Transforms from Map<K,V> to Map<K,R>
 *
 * @example
 * ```js
 * // Convert a map of string->string to string->number
 * transformMap<string, string, number>(mapOfStrings, (value, key) => parseInt(value));
 * ```
 * @param source
 * @param transformer
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
 * Converts Map<K,V> to Array<R> with a provided `transformer`
 *
 * @example Get a list of ages from a map of Person objects
 * ```js
 * let person = { age: 29, name: `John`};
 * map.add(person.name, person);
 * const ages = mapToArray<string, People, number>(map, (key, person) => person.age);
 * // [29, ...]
 * ```
 *
 * In the above example, the `transformer` function returns a single value, but it could
 * just as well return an object:
 * ```js
 * mapToArray(map, (key, person) => ({
 *  height: Math.random(),
 *  name: person.name.toUpperCase();
 * }))
 * // Yields:
 * // [{height: 0.12, name: "JOHN"}, ...]
 * ```
 * @param m
 * @param transformer
 * @returns
 */
declare const mapToArray: <K, V, R>(m: ReadonlyMap<K, V>, transformer: (key: K, item: V) => R) => readonly R[];

declare const Map$1_hasKeyValue: typeof hasKeyValue;
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

export { Map$1 as M, addUniqueByHash as a, hasAnyValue as b, find as c, transformMap as d, mapToObj as e, filter as f, mapToArray as g, hasKeyValue as h, mapToObjTransform as m, toArray as t, zipKeyValue as z };
