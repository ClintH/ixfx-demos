import { I as ICircularArray, c as circularArray } from './CircularArray-sm3CThg9.js';
import { i as index$5 } from './index-CU7oMNid.js';
import { E as EitherKey, M as MergeReconcile, c as addKeepingExisting, m as addObject, d as deleteByValue, j as filter, n as find, f as firstEntryByIterablePredicate, b as firstEntryByIterableValue, k as fromIterable, l as fromObject, g as getClosestIntegerKey, a as getFromKeys, i as hasAnyValue, h as hasKeyValue, u as mapToArray, p as mapToObjectTransform, v as mergeByKey, o as some, s as sortByValue, e as sortByValueProperty, t as toArray, r as toObject, q as transformMap, z as zipKeyValue, A as ArrayKeys, O as ObjectKeys } from './MapFns-bJf6VOuJ.js';
import { a as IMapOfMutableExtended, b as IMapOfMutable, M as MapArrayEvents, c as IMapOf, d as IStack, I as IStackImmutable } from './IMapOfMutableExtended-GUT4venp.js';
import { S as SetStringImmutable, a as SetStringMutable, i as index$4 } from './index-wTMIg83M.js';
import { Q as QueueImmutable, i as index$3 } from './index-cknONYZC.js';
import { c as QueueMutable } from './QueueMutable-PjxK1z7t.js';
import { S as SimpleEventEmitter } from './Events-MevXuVvQ.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { I as IMapBase, a as IMapImmutable, i as immutable$1 } from './Map-DC36QsdS.js';
import { I as IsEqual } from './IsEqual-EdZcaNvH.js';
import { T as ToString } from './ToString-Wn1YmnlL.js';
import { G as GetOrGenerate, a as IDictionary, I as IWithEntries, b as getOrGenerate, g as getOrGenerateSync } from './GetOrGenerate-WG7g4q9M.js';

/**
 * Expiring map options
 */
type Opts = {
    /**
     * Capacity limit
     */
    readonly capacity?: number;
    /**
     * Policy for evicting items if capacity is reached
     */
    readonly evictPolicy?: `none` | `oldestGet` | `oldestSet`;
    /**
     * Automatic deletion policy.
     * none: no automatic deletion (default)
     * get/set: interval based on last get/set
     * either: if either interval has elapsed
     */
    readonly autoDeletePolicy?: `none` | `get` | `set` | `either`;
    /**
     * Automatic deletion interval
     */
    readonly autoDeleteElapsedMs?: number;
};
/**
 * Event from the ExpiringMap
 */
type ExpiringMapEvent<K, V> = {
    readonly key: K;
    readonly value: V;
};
type ExpiringMapEvents<K, V> = {
    /**
     * Fires when an item is removed due to eviction
     * or automatic expiry
     */
    readonly expired: ExpiringMapEvent<K, V>;
    /**
     * Fires when a item with a new key is added
     */
    readonly newKey: ExpiringMapEvent<K, V>;
    /**
     * Fires when an item is manually removed,
     * removed due to eviction or automatic expiry
     */
    readonly removed: ExpiringMapEvent<K, V>;
};
/**
 * Create a ExpiringMap instance
 * @param options Options when creating map
 * @returns
 */
declare const create: <K, V>(options?: Opts) => ExpiringMap<K, V>;
/***
 * A map that can have a capacity limit. The elapsed time for each get/set
 * operation is maintained allowing for items to be automatically removed.
 * `has()` does not affect the last access time.
 *
 * By default, it uses the `none` eviction policy, meaning that when full
 * an error will be thrown if attempting to add new keys.
 *
 * Eviction policies:
 * `oldestGet` removes the item that hasn't been accessed the longest,
 * `oldestSet` removes the item that hasn't been updated the longest.
 *
 * ```js
 * const map = new ExpiringMap();
 * map.set(`fruit`, `apple`);
 *
 * // Remove all entries that were set more than 100ms ago
 * map.deleteWithElapsed(100, `set`);
 * // Remove all entries that were last accessed more than 100ms ago
 * map.deleteWithElapsed(100, `get`);
 * // Returns the elapsed time since `fruit` was last accessed
 * map.elapsedGet(`fruit`);
 * // Returns the elapsed time since `fruit` was last set
 * map.elapsedSet(`fruit`);
 * ```
 *
 * Last set/get time for a key can be manually reset using `touch(key)`.
 *
 *
 * Events:
 * * `expired`: when an item is automatically removed.
 * * `removed`: when an item is manually or automatically removed.
 * * `newKey`: when a new key is added
 *
 * ```js
 * map.addEventListener(`expired`, evt => {
 *  const { key, value } = evt;
 * });
 * ```
 * The map can automatically remove items based on elapsed intervals.
 *
 * @example Automatically delete items that haven't been accessed for one second
 * ```js
 * const map = new ExpiringMap({
 *  autoDeleteElapsed: 1000,
 *  autoDeletePolicy: `get`
 * });
 * ```
 *
 * @example Automatically delete the oldest item if we reach a capacity limit
 * ```
 * const map = new ExpiringMap({
 *  capacity: 5,
 *  evictPolicy: `oldestSet`
 * });
 * ```
 */
declare class ExpiringMap<K, V> extends SimpleEventEmitter<ExpiringMapEvents<K, V>> {
    #private;
    private capacity;
    private store;
    private evictPolicy;
    private autoDeleteElapsedMs;
    private autoDeletePolicy;
    constructor(opts?: Opts);
    /**
     * Returns the number of keys being stored.
     */
    get keyLength(): number;
    entries(): IterableIterator<[k: K, v: V]>;
    values(): IterableIterator<V>;
    keys(): IterableIterator<K>;
    /**
     * Returns the elapsed time since `key`
     * was set. Returns _undefined_ if `key`
     * does not exist
     */
    elapsedSet(key: K): number | undefined;
    /**
     * Returns the elapsed time since `key`
     * was accessed. Returns _undefined_ if `key`
     * does not exist
     */
    elapsedGet(key: K): number | undefined;
    /**
     * Returns true if `key` is stored.
     * Does not affect the key's last access time.
     * @param key
     * @returns
     */
    has(key: K): boolean;
    /**
     * Gets an item from the map by key, returning
     * undefined if not present
     * @param key Key
     * @returns Value, or undefined
     */
    get(key: K): V | undefined;
    /**
     * Deletes the value under `key`, if present.
     *
     * Returns _true_ if something was removed.
     * @param key
     * @returns
     */
    delete(key: K): boolean;
    /**
     * Clears the contents of the map.
     * Note: does not fire `removed` event
     */
    clear(): void;
    /**
     * Updates the lastSet/lastGet time for a value
     * under `k`.
     *
     * Returns false if key was not found
     * @param key
     * @returns
     */
    touch(key: K): boolean;
    private findEvicteeKey;
    /**
     * Deletes all values where elapsed time has past
     * for get/set or either.
     * ```js
     * // Delete all keys (and associated values) not accessed for a minute
     * em.deleteWithElapsed({mins:1}, `get`);
     * // Delete things that were set 1s ago
     * em.deleteWithElapsed(1000, `set`);
     * ```
     *
     * @param interval Interval
     * @param property Basis for deletion 'get','set' or 'either'
     * @returns Items removed
     */
    deleteWithElapsed(interval: Interval, property: `get` | `set` | `either`): Array<[k: K, v: V]>;
    /**
     * Sets the `key` to be `value`.
     *
     * If the key already exists, it is updated.
     *
     * If the map is full, according to its capacity,
     * another value is selected for removal.
     * @param key
     * @param value
     * @returns
     */
    set(key: K, value: V): void;
}

/**
 * A mutable map.
 *
 * It is a wrapper around the in-built Map type, but adds roughly the same API as {@link IMapImmutable}.
 *
 * @template K Type of map keys. Typically `string`
 * @template V Type of stored values
 */
interface IMapMutable<K, V> extends IMapBase<K, V> {
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
}
/**
 * Returns a {@link IMapMutable} (which just wraps the in-built Map)
 * Use {@link Maps.immutable} for the immutable alternative.
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
declare const mutable$1: <K, V>(...data: EitherKey<K, V>) => IMapMutable<K, V>;

/**
 * Map of array options
 */
type MapArrayOpts<V> = MapMultiOpts<V> & {
    /**
     * Comparer to use
     */
    readonly comparer?: IsEqual<V>;
    /**
     * Key function
     */
    readonly convertToString?: ToString<V>;
};
/**
 * Returns a {@link IMapOfMutableExtended} to allow storing multiple values under a key, unlike a regular Map.
 * @example
 * ```js
 * const map = ofArrayMutable();
 * map.addKeyedValues(`hello`, [1,2,3,4]); // Adds series of numbers under key `hello`
 *
 * const hello = map.get(`hello`); // Get back values
 * ```
 *
 * Takes options:
 * * `comparer`: {@link IsEqual}
 * * `toString`: {@link Util.ToString}
 *
 * A custom {@link Util.ToString} function can be provided as the `convertToString` opion. This is then used when checking value equality (`has`, `without`)
 * ```js
 * const map = ofArrayMutable({ convertToString:(v) => v.name}); // Compare values based on their `name` field;
 * ```
 *
 * Alternatively, a {@link IsEqual} function can be used:
 * ```js
 * const map = ofArrayMutable({comparer: (a, b) => a.name === b.name });
 * ```
 * @param options Optiosn for mutable array
 * @template V Data type of items
 * @returns {@link IMapOfMutableExtended}
 */
declare const ofArrayMutable: <V>(options?: MapArrayOpts<V>) => IMapOfMutableExtended<V, ReadonlyArray<V>>;

declare class MapOfSimpleBase<V> {
    protected map: Map<string, ReadonlyArray<V>>;
    protected readonly groupBy: (value: V) => string;
    protected valueEq: IsEqual<V>;
    /**
     * Constructor
     * @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
     * @param valueEq Compare values. By default uses JS logic for equality
     */
    constructor(groupBy?: (value: V) => string, valueEq?: IsEqual<V>, initial?: Array<[string, ReadonlyArray<V>]>);
    /**
     * Iterate over all entries
     */
    entriesFlat(): IterableIterator<[key: string, value: V]>;
    entries(): IterableIterator<[key: string, value: Array<V>]>;
    firstKeyByValue(value: V, eq?: IsEqual<V>): string | undefined;
    /**
     * Get all values under `key`
     * @param key
     * @returns
     */
    get(key: string): IterableIterator<V>;
    /**
     * Iterate over all keys
     */
    keys(): IterableIterator<string>;
    /**
     * Iterate over all values (regardless of key)
     */
    valuesFlat(): IterableIterator<V>;
    /**
     * Iterate over keys and length of values stored under keys
     */
    keysAndCounts(): IterableIterator<[string, number]>;
    /**
     * Returns _true_ if `key` exists
     * @param key
     * @returns
     */
    has(key: string): boolean;
    /**
     * Returns _true_ if `value` exists under `key`.
     * @param key Key
     * @param value Value to seek under `key`
     * @returns _True_ if `value` exists under `key`.
     */
    hasKeyValue(key: string, value: V): boolean;
    /**
     * Debug dump of contents
     * @returns
     */
    debugString(): string;
    /**
     * _True_ if empty
     */
    get isEmpty(): boolean;
    /**
     * Return number of values stored under `key`.
     * Returns 0 if `key` is not found.
     * @param key
     * @returns
     */
    count(key: string): number;
    get lengthKeys(): number;
}

/**
 * A simple mutable map of arrays, without events. It can store multiple values
 * under the same key.
 *
 * For a fancier approaches, consider {@link ofArrayMutable}, {@link ofCircularMutable} or {@link ofSetMutable}.
 *
 * @example
 * ```js
 * const m = mapOfSimpleMutable();
 * m.add(`hello`, 1, 2, 3); // Adds numbers under key `hello`
 * m.delete(`hello`);       // Deletes everything under `hello`
 *
 * const hellos = m.get(`hello`); // Get list of items under `hello`
 * ```
 *
 * Constructor takes a `groupBy` parameter, which yields a string key for a value. This is the
 * basis by which values are keyed when using `addValues`.
 *
 * Constructor takes a `valueEq` parameter, which compares values. This is used when checking
 * if a value exists under a key, for example.
 * @template V Type of items
 */
declare class MapOfSimpleMutable<V> extends MapOfSimpleBase<V> implements IMapOfMutable<V> {
    addKeyedValues(key: string, ...values: ReadonlyArray<V>): void;
    /**
     * Adds a value, automatically extracting a key via the
     * `groupBy` function assigned in the constructor options.
     * @param values Adds several values
     */
    addValue(...values: ReadonlyArray<V>): void;
    /**
     * Delete `value` under a particular `key`
     * @param key
     * @param value
     * @returns _True_ if `value` was found under `key`
     */
    deleteKeyValue(key: string, value: V): boolean;
    /**
     * Deletes `value` regardless of key.
     *
     * Uses the constructor-defined equality function.
     * @param value Value to delete
     * @returns
     */
    deleteByValue(value: V): boolean;
    /**
     * Deletes all values under `key`,
     * @param key
     * @returns _True_ if `key` was found and values stored
     */
    delete(key: string): boolean;
    /**
     * Clear contents
     */
    clear(): void;
}
/**
 * A simple mutable map of arrays, without events. It can store multiple values
 * under the same key.
 *
 * For a fancier approaches, consider {@link ofArrayMutable}, {@link ofCircularMutable} or {@link ofSetMutable}.
 *
 * @example
 * ```js
 * const m = mapOfSimpleMutable();
 * m.add(`hello`, 1, 2, 3); // Adds numbers under key `hello`
 * m.delete(`hello`);       // Deletes everything under `hello`
 *
 * const hellos = m.get(`hello`); // Get list of items under `hello`
 * ```
 *
 * @template V Type of items
 * @returns New instance
 */
declare const ofSimpleMutable: <V>(groupBy?: (value: V) => string, valueEq?: IsEqual<V>) => IMapOfMutable<V>;

/**
 * @internal
 */
declare class MapOfMutableImpl<V, M> extends SimpleEventEmitter<MapArrayEvents<V>> implements IMapOfMutableExtended<V, M> {
    #private;
    readonly groupBy: ToString<V>;
    readonly type: MultiValue<V, M>;
    constructor(type: MultiValue<V, M>, opts?: MapMultiOpts<V>);
    /**
     * Returns the type name. For in-built implementations, it will be one of: array, set or circular
     */
    get typeName(): string;
    /**
     * Returns the number of keys
     */
    get lengthKeys(): number;
    /**
     * Returns the length of the longest child list
     */
    get lengthMax(): number;
    debugString(): string;
    get isEmpty(): boolean;
    clear(): void;
    addKeyedValues(key: string, ...values: Array<V>): void;
    set(key: string, values: Array<V>): this;
    addValue(...values: ReadonlyArray<V>): void;
    hasKeyValue(key: string, value: V, eq: IsEqual<V>): boolean;
    has(key: string): boolean;
    deleteKeyValue(key: string, value: V): boolean;
    private deleteKeyValueFromMap;
    deleteByValue(value: V): boolean;
    delete(key: string): boolean;
    firstKeyByValue(value: V, eq?: IsEqual<V>): string | undefined;
    count(key: string): number;
    /**
     * Iterates over values stored under `key`
     * An empty array is returned if there are no values
     */
    get(key: string): IterableIterator<V>;
    /**
     * Iterate over the values stored under `key`.
     * If key does not exist, iteration is essentially a no-op
     * @param key
     * @returns
     */
    valuesFor(key: string): Generator<V, void, undefined>;
    getSource(key: string): M | undefined;
    keys(): IterableIterator<string>;
    entriesFlat(): IterableIterator<[key: string, value: V]>;
    valuesFlat(): IterableIterator<V>;
    entries(): IterableIterator<[key: string, value: Array<V>]>;
    keysAndCounts(): IterableIterator<[string, number]>;
    merge(other: IMapOf<V>): void;
    get size(): number;
    get [Symbol.toStringTag](): string;
}

/**
 * @private
 */
type MultiValue<V, M> = {
    get name(): string;
    has(source: M, value: V, eq: IsEqual<V>): boolean;
    add(destination: M | undefined, values: Iterable<V>): M;
    toArray(source: M): ReadonlyArray<V>;
    iterable(source: M): IterableIterator<V>;
    find(source: M, predicate: (v: V) => boolean): V | undefined;
    filter(source: M, predicate: (v: V) => boolean): Iterable<V>;
    without(source: M, value: V): ReadonlyArray<V>;
    count(source: M): number;
};
type MapMultiOpts<V> = {
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
    readonly groupBy?: ((value: V) => string) | undefined;
};
type MapSetOpts<V> = MapMultiOpts<V> & {
    readonly hash: (value: V) => string;
};

/**
 * Returns a {@link IMapOfMutableExtended} that uses a set to hold values.
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
 * const map = mapOfSetMutable();
 * map.add(`hello`, [1, 2, 3, 1, 2, 3]);
 * const hello = map.get(`hello`); // [1, 2, 3]
 * ```
 *
 * @example
 * ```js
 * const hash = (v) => v.name; // Use name as the key
 * const map = mapOfSetMutable(hash);
 * map.add(`hello`, {age:40, name: `Mary`});
 * map.add(`hello`, {age:29, name: `Mary`}); // Value ignored as same name exists
 * ```
 * @param options
 * @returns
 */
declare const ofSetMutable: <V>(options?: MapSetOpts<V>) => IMapOfMutableExtended<V, ReadonlyMap<string, V>>;

type MapCircularOpts<V> = MapMultiOpts<V> & {
    readonly capacity: number;
};
/**
 * Returns a {@link IMapOfMutableExtended} that uses a {@link ICircularArray} to hold values. Mutable.
 * This means that the number of values stored under each key will be limited to the defined
 * capacity.
 *
 * Required option:
 * * `capacity`: how many items to hold
 *
 * @example Only store the most recent three items per key
 * ```js
 * const map = ofCircularMutable({capacity: 3});
 * map.add(`hello`, [1, 2, 3, 4, 5]);
 * const hello = map.get(`hello`); // [3, 4, 5]
 * ```
 *
 *
 * @param options
 * @returns
 */
declare const ofCircularMutable: <V>(options: MapCircularOpts<V>) => IMapOfMutableExtended<V, ICircularArray<V>>;

/**
 * Simple map for numbers.
 *
 * Keys not present in map return the `defaultValue` given in the constructor
 * ```js
 * // All keys default to zero.
 * const map = new NumberMap();
 * map.get(`hello`); // 0
 * ```
 *
 * To check if a key is present, use `has`:
 * ```js
 * map.has(`hello`); // false
 * ```
 *
 * Math:
 * ```js
 * // Adds 1 by default to value of `hello`
 * map.add(`hello`);         // 1
 * map.multiply(`hello`, 2); // 2
 *
 * // Reset key to default value
 * map.reset(`hello`); // 0
 * ```
 *
 * Different default value:
 * ```js
 * const map = new NumberMap(10);
 * map.get(`hello`); // 10
 * ```
 *
 * Regular `set` works as well:
 * ```js
 * map.set(`hello`, 5);
 * map.add(`hello`, 2); // 7
 * ```
 */
declare class NumberMap<K> extends Map<K, number> {
    readonly defaultValue: number;
    constructor(defaultValue?: number);
    get(key: K): number;
    reset(key: K): number;
    multiply(key: K, amount: number): number;
    add(key: K, amount?: number): number;
    subtract(key: K, amount?: number): number;
}

type index$2_ExpiringMap<K, V> = ExpiringMap<K, V>;
declare const index$2_ExpiringMap: typeof ExpiringMap;
type index$2_ExpiringMapEvent<K, V> = ExpiringMapEvent<K, V>;
type index$2_ExpiringMapEvents<K, V> = ExpiringMapEvents<K, V>;
declare const index$2_GetOrGenerate: typeof GetOrGenerate;
declare const index$2_IMapImmutable: typeof IMapImmutable;
type index$2_IMapMutable<K, V> = IMapMutable<K, V>;
declare const index$2_IMapOf: typeof IMapOf;
declare const index$2_IMapOfMutable: typeof IMapOfMutable;
declare const index$2_IMapOfMutableExtended: typeof IMapOfMutableExtended;
declare const index$2_IWithEntries: typeof IWithEntries;
declare const index$2_MapArrayEvents: typeof MapArrayEvents;
type index$2_MapArrayOpts<V> = MapArrayOpts<V>;
type index$2_MapCircularOpts<V> = MapCircularOpts<V>;
type index$2_MapMultiOpts<V> = MapMultiOpts<V>;
type index$2_MapOfMutableImpl<V, M> = MapOfMutableImpl<V, M>;
declare const index$2_MapOfMutableImpl: typeof MapOfMutableImpl;
type index$2_MapOfSimpleMutable<V> = MapOfSimpleMutable<V>;
declare const index$2_MapOfSimpleMutable: typeof MapOfSimpleMutable;
type index$2_MapSetOpts<V> = MapSetOpts<V>;
declare const index$2_MergeReconcile: typeof MergeReconcile;
type index$2_MultiValue<V, M> = MultiValue<V, M>;
type index$2_NumberMap<K> = NumberMap<K>;
declare const index$2_NumberMap: typeof NumberMap;
declare const index$2_addKeepingExisting: typeof addKeepingExisting;
declare const index$2_addObject: typeof addObject;
declare const index$2_deleteByValue: typeof deleteByValue;
declare const index$2_filter: typeof filter;
declare const index$2_find: typeof find;
declare const index$2_firstEntryByIterablePredicate: typeof firstEntryByIterablePredicate;
declare const index$2_firstEntryByIterableValue: typeof firstEntryByIterableValue;
declare const index$2_fromIterable: typeof fromIterable;
declare const index$2_fromObject: typeof fromObject;
declare const index$2_getClosestIntegerKey: typeof getClosestIntegerKey;
declare const index$2_getFromKeys: typeof getFromKeys;
declare const index$2_getOrGenerate: typeof getOrGenerate;
declare const index$2_getOrGenerateSync: typeof getOrGenerateSync;
declare const index$2_hasAnyValue: typeof hasAnyValue;
declare const index$2_hasKeyValue: typeof hasKeyValue;
declare const index$2_mapToArray: typeof mapToArray;
declare const index$2_mapToObjectTransform: typeof mapToObjectTransform;
declare const index$2_mergeByKey: typeof mergeByKey;
declare const index$2_ofArrayMutable: typeof ofArrayMutable;
declare const index$2_ofCircularMutable: typeof ofCircularMutable;
declare const index$2_ofSetMutable: typeof ofSetMutable;
declare const index$2_some: typeof some;
declare const index$2_sortByValue: typeof sortByValue;
declare const index$2_sortByValueProperty: typeof sortByValueProperty;
declare const index$2_toArray: typeof toArray;
declare const index$2_toObject: typeof toObject;
declare const index$2_transformMap: typeof transformMap;
declare const index$2_zipKeyValue: typeof zipKeyValue;
declare namespace index$2 {
  export { index$2_ExpiringMap as ExpiringMap, type index$2_ExpiringMapEvent as ExpiringMapEvent, type index$2_ExpiringMapEvents as ExpiringMapEvents, type Opts as ExpiringMapOpts, index$2_GetOrGenerate as GetOrGenerate, index$2_IMapImmutable as IMapImmutable, type index$2_IMapMutable as IMapMutable, index$2_IMapOf as IMapOf, index$2_IMapOfMutable as IMapOfMutable, index$2_IMapOfMutableExtended as IMapOfMutableExtended, IDictionary as IMappish, index$2_IWithEntries as IWithEntries, index$2_MapArrayEvents as MapArrayEvents, type index$2_MapArrayOpts as MapArrayOpts, type index$2_MapCircularOpts as MapCircularOpts, type index$2_MapMultiOpts as MapMultiOpts, index$2_MapOfMutableImpl as MapOfMutableImpl, index$2_MapOfSimpleMutable as MapOfSimpleMutable, type index$2_MapSetOpts as MapSetOpts, index$2_MergeReconcile as MergeReconcile, type index$2_MultiValue as MultiValue, index$2_NumberMap as NumberMap, index$2_addKeepingExisting as addKeepingExisting, index$2_addObject as addObject, index$2_deleteByValue as deleteByValue, create as expiringMap, index$2_filter as filter, index$2_find as find, index$2_firstEntryByIterablePredicate as firstEntryByIterablePredicate, index$2_firstEntryByIterableValue as firstEntryByIterableValue, index$2_fromIterable as fromIterable, index$2_fromObject as fromObject, index$2_getClosestIntegerKey as getClosestIntegerKey, index$2_getFromKeys as getFromKeys, index$2_getOrGenerate as getOrGenerate, index$2_getOrGenerateSync as getOrGenerateSync, index$2_hasAnyValue as hasAnyValue, index$2_hasKeyValue as hasKeyValue, immutable$1 as immutable, ofSimpleMutable as mapOfSimpleMutable, index$2_mapToArray as mapToArray, index$2_mapToObjectTransform as mapToObjectTransform, index$2_mergeByKey as mergeByKey, mutable$1 as mutable, index$2_ofArrayMutable as ofArrayMutable, index$2_ofCircularMutable as ofCircularMutable, index$2_ofSetMutable as ofSetMutable, index$2_some as some, index$2_sortByValue as sortByValue, index$2_sortByValueProperty as sortByValueProperty, index$2_toArray as toArray, index$2_toObject as toObject, index$2_transformMap as transformMap, index$2_zipKeyValue as zipKeyValue };
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
interface IStackMutable<V> extends IStack<V> {
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

type StackDiscardPolicy = `older` | `newer` | `additions`;
type StackOpts = {
    readonly debug?: boolean;
    readonly capacity?: number;
    readonly discardPolicy?: StackDiscardPolicy;
};

declare class StackImmutable<V> implements IStackImmutable<V> {
    private readonly opts;
    readonly data: ReadonlyArray<V>;
    constructor(opts?: StackOpts, data?: ReadonlyArray<V>);
    push(...toAdd: ReadonlyArray<V>): StackImmutable<V>;
    pop(): IStackImmutable<V>;
    forEach(fn: (v: V) => void): void;
    forEachFromTop(fn: (v: V) => void): void;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get peek(): V | undefined;
    get length(): number;
}
/**
 * Returns a stack. Immutable. Use {@link Stacks.mutable} for a mutable alternative.
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
 * @param options Options
 * @param startingItems List of items to add to stack. Items will be pushed 'left to right', ie array index 0 will be bottom of the stack.
 */
declare const immutable: <V>(options?: StackOpts, ...startingItems: ReadonlyArray<V>) => IStackImmutable<V>;

/**
 * Creates a stack. Mutable. Use {@link StackImmutable} for an immutable alternative.
 *
 * @example Basic usage
 * ```js
 * // Create
 * const s = new StackMutable();
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
declare class StackMutable<V> implements IStackMutable<V> {
    readonly opts: StackOpts;
    data: ReadonlyArray<V>;
    constructor(opts?: StackOpts, data?: ReadonlyArray<V>);
    /**
     * Push data onto the stack.
     * If `toAdd` is empty, nothing happens
     * @param toAdd Data to add
     * @returns Length of stack
     */
    push(...toAdd: ReadonlyArray<V>): number;
    forEach(fn: (v: V) => void): void;
    forEachFromTop(fn: (v: V) => void): void;
    pop(): V | undefined;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get peek(): V | undefined;
    get length(): number;
}
/**
 * Creates a stack. Mutable. Use {@link Stacks.immutable} for an immutable alternative.
 *
 * @example Basic usage
 * ```js
 * // Create
 * const s = Stacks.mutable();
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
declare const mutable: <V>(opts?: StackOpts, ...startingItems: ReadonlyArray<V>) => IStackMutable<V>;

declare const index$1_IStack: typeof IStack;
declare const index$1_IStackImmutable: typeof IStackImmutable;
type index$1_IStackMutable<V> = IStackMutable<V>;
type index$1_StackDiscardPolicy = StackDiscardPolicy;
type index$1_StackOpts = StackOpts;
declare const index$1_immutable: typeof immutable;
declare const index$1_mutable: typeof mutable;
declare namespace index$1 {
  export { index$1_IStack as IStack, index$1_IStackImmutable as IStackImmutable, type index$1_IStackMutable as IStackMutable, type index$1_StackDiscardPolicy as StackDiscardPolicy, type index$1_StackOpts as StackOpts, index$1_immutable as immutable, index$1_mutable as mutable };
}

declare const index_ArrayKeys: typeof ArrayKeys;
declare const index_EitherKey: typeof EitherKey;
declare const index_ObjectKeys: typeof ObjectKeys;
declare const index_QueueImmutable: typeof QueueImmutable;
declare const index_QueueMutable: typeof QueueMutable;
declare const index_SetStringImmutable: typeof SetStringImmutable;
declare const index_SetStringMutable: typeof SetStringMutable;
type index_StackImmutable<V> = StackImmutable<V>;
declare const index_StackImmutable: typeof StackImmutable;
type index_StackMutable<V> = StackMutable<V>;
declare const index_StackMutable: typeof StackMutable;
declare const index_circularArray: typeof circularArray;
declare namespace index {
  export { index_ArrayKeys as ArrayKeys, ICircularArray as CircularArray, index_EitherKey as EitherKey, index$2 as Maps, index_ObjectKeys as ObjectKeys, index_QueueImmutable as QueueImmutable, index_QueueMutable as QueueMutable, index$3 as Queues, index_SetStringImmutable as SetStringImmutable, index_SetStringMutable as SetStringMutable, index$4 as Sets, index_StackImmutable as StackImmutable, index_StackMutable as StackMutable, index$1 as Stacks, index$5 as Trees, index_circularArray as circularArray };
}

export { StackMutable as S, index$1 as a, StackImmutable as b, index$2 as c, index as i };
