import { I as ICircularArray, c as circularArray } from './CircularArray-CpJrVPp5.js';
import { i as index$6 } from './index-4e1ZnqTP.js';
import { E as EitherKey, A as ArrayKeys, O as ObjectKeys } from './Types-CXzamHqZ.js';
import { a as IStack, I as IStackImmutable } from './IStackImmutable-BNEmWxct.js';
import { S as SetStringImmutable, a as SetStringMutable, i as index$5 } from './index-Cy-DJ_QD.js';
import { Q as QueueImmutable, i as index$4 } from './index-DPE2pRfK.js';
import { Q as QueueMutable } from './QueueMutable-D_WD8izv.js';
import { S as SimpleEventEmitter } from './Events-DJgOvcWD.js';
import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { I as IMapOfMutableExtended, a as IMapOfMutable, M as MapArrayEvents, b as IMapOf } from './IMapOfMutableExtended-CjVUu6Vt.js';
import { I as IsEqual } from './IsEqual-CTTf-Oj9.js';
import { T as ToString } from './ToString-DO94OWoh.js';
import { I as IDictionary, a as IWithEntries } from './IMappish-qfjdy4T9.js';

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
 * Last set/get time for a key can be manually reset using {@link touch}.
 *
 *
 * Events:
 * * 'expired': when an item is automatically removed.
 * * 'removed': when an item is manually or automatically removed.
 * * 'newKey': when a new key is added
 *
 * ```js
 * map.addEventListener(`expired`, evt => {
 *  const { key, value } = evt;
 * });
 * ```
 * The map can automatically remove items based on elapsed intervals.
 *
 * @example
 * Automatically delete items that haven't been accessed for one second
 * ```js
 * const map = new ExpiringMap({
 *  autoDeleteElapsed: 1000,
 *  autoDeletePolicy: `get`
 * });
 * ```
 *
 * @example
 * Automatically delete the oldest item if we reach a capacity limit
 * ```js
 * const map = new ExpiringMap({
 *  capacity: 5,
 *  evictPolicy: `oldestSet`
 * });
 * ```
 * @typeParam K - Type of keys
 * @typeParam V - Type of values
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

interface IMapBase<K, V> {
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
    values(): IterableIterator<V>;
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
 * @typeParam K - Type of map keys. Typically `string`
 * @typeParam V - Type of stored values
 */
interface IMapImmutable<K, V> extends IMapBase<K, V> {
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
    add(...itemsToAdd: EitherKey<K, V>): IMapImmutable<K, V>;
    /**
     * Deletes an item by key, returning the changed map
     * @param key
     */
    delete(key: K): IMapImmutable<K, V>;
    /**
     * Returns an empty map
     */
    clear(): IMapImmutable<K, V>;
    /**
     * Sets `key` to be `value`, overwriting anything existing.
     * Returns a new map with added key.
     * @param key
     * @param value
     */
    set(key: K, value: V): IMapImmutable<K, V>;
}
/**
 * Returns an {@link IMapImmutable}.
 * Use {@link Maps.mutable} as a mutable alternatve.
 *
 * @example Basic usage
 * ```js
 * // Creating
 * let m = map();
 * // Add
 * m = m.set("name", "sally");
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
 * // Add as array or key & value pair
 * m = m.add(["name" , "sally"]);
 * m = m.add({ key: "name", value: "sally" });
 * // Add using the more typical set
 * m = m.set("name", "sally");
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
declare const immutable$1: <K, V>(dataOrMap?: ReadonlyMap<K, V> | EitherKey<K, V>) => IMapImmutable<K, V>;

/**
 * A mutable map.
 *
 * It is a wrapper around the in-built Map type, but adds roughly the same API as {@link IMapImmutable}.
 *
 * @typeParam K - Type of map keys. Typically `string`
 * @typeParam V - Type of stored values
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
 * @typeParam V - Data type of items
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
 * For a fancier approaches, consider ofArrayMutable, ofCircularMutable or ofSetMutable.
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
 * @typeParam V - Type of items
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
 * @typeParam V - Type of items
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

type index$3_ExpiringMapEvent<K, V> = ExpiringMapEvent<K, V>;
type index$3_ExpiringMapEvents<K, V> = ExpiringMapEvents<K, V>;
type index$3_IMapImmutable<K, V> = IMapImmutable<K, V>;
type index$3_IMapMutable<K, V> = IMapMutable<K, V>;
declare const index$3_IMapOf: typeof IMapOf;
declare const index$3_IMapOfMutable: typeof IMapOfMutable;
declare const index$3_IMapOfMutableExtended: typeof IMapOfMutableExtended;
declare const index$3_IWithEntries: typeof IWithEntries;
declare const index$3_MapArrayEvents: typeof MapArrayEvents;
type index$3_MapArrayOpts<V> = MapArrayOpts<V>;
type index$3_MapCircularOpts<V> = MapCircularOpts<V>;
type index$3_MapMultiOpts<V> = MapMultiOpts<V>;
type index$3_MapOfMutableImpl<V, M> = MapOfMutableImpl<V, M>;
declare const index$3_MapOfMutableImpl: typeof MapOfMutableImpl;
type index$3_MapSetOpts<V> = MapSetOpts<V>;
type index$3_MultiValue<V, M> = MultiValue<V, M>;
type index$3_NumberMap<K> = NumberMap<K>;
declare const index$3_NumberMap: typeof NumberMap;
declare const index$3_ofArrayMutable: typeof ofArrayMutable;
declare const index$3_ofCircularMutable: typeof ofCircularMutable;
declare const index$3_ofSetMutable: typeof ofSetMutable;
declare namespace index$3 {
  export { type index$3_ExpiringMapEvent as ExpiringMapEvent, type index$3_ExpiringMapEvents as ExpiringMapEvents, type Opts as ExpiringMapOpts, type index$3_IMapImmutable as IMapImmutable, type index$3_IMapMutable as IMapMutable, index$3_IMapOf as IMapOf, index$3_IMapOfMutable as IMapOfMutable, index$3_IMapOfMutableExtended as IMapOfMutableExtended, IDictionary as IMappish, index$3_IWithEntries as IWithEntries, index$3_MapArrayEvents as MapArrayEvents, type index$3_MapArrayOpts as MapArrayOpts, type index$3_MapCircularOpts as MapCircularOpts, type index$3_MapMultiOpts as MapMultiOpts, index$3_MapOfMutableImpl as MapOfMutableImpl, type index$3_MapSetOpts as MapSetOpts, type index$3_MultiValue as MultiValue, index$3_NumberMap as NumberMap, create as expiringMap, immutable$1 as immutable, ofSimpleMutable as mapOfSimpleMutable, mutable$1 as mutable, index$3_ofArrayMutable as ofArrayMutable, index$3_ofCircularMutable as ofCircularMutable, index$3_ofSetMutable as ofSetMutable };
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
 * @typeParam V - Type of stored items
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

declare const index$2_IStack: typeof IStack;
declare const index$2_IStackImmutable: typeof IStackImmutable;
type index$2_IStackMutable<V> = IStackMutable<V>;
type index$2_StackDiscardPolicy = StackDiscardPolicy;
type index$2_StackOpts = StackOpts;
declare const index$2_immutable: typeof immutable;
declare const index$2_mutable: typeof mutable;
declare namespace index$2 {
  export { index$2_IStack as IStack, index$2_IStackImmutable as IStackImmutable, type index$2_IStackMutable as IStackMutable, type index$2_StackDiscardPolicy as StackDiscardPolicy, type index$2_StackOpts as StackOpts, index$2_immutable as immutable, index$2_mutable as mutable };
}

declare class Table<V> {
    rows: Array<Array<V | undefined>>;
    rowLabels: Array<string>;
    colLabels: Array<string>;
    labelColumns(...labels: Array<string>): void;
    labelColumn(columnNumber: number, label: string): void;
    getColumnLabelIndex(label: string): number | undefined;
    print(): void;
    rowsWithLabelsArray(): Generator<[label: string | undefined, value: V | undefined][] | undefined, void, unknown>;
    /**
     * Return a copy of table as nested array
     * ```js
     * const t = new Table();
     * // add stuff
     * // ...
     * const m = t.asArray();
     * for (const row of m) {
     *  for (const colValue of row) {
     *    // iterate over all column values for this row
     *  }
     * }
     * ```
     *
     * Alternative: get value at row Y and column X
     * ```js
     * const value = m[y][x];
     * ```
     * @returns
     */
    asArray(): Array<Array<V | undefined>>;
    /**
     * Return the number of rows
     */
    get rowCount(): number;
    /**
     * Return the maximum number of columns in any row
     */
    get columnCount(): number;
    rowsWithLabelsObject(): Generator<object | undefined, void, unknown>;
    labelRows(...labels: Array<string>): void;
    appendRow(...data: Array<V | undefined>): void;
    getRowWithLabelsArray(rowNumber: number): Array<[label: string | undefined, value: V | undefined]> | undefined;
    /**
     * Return a row of objects. Keys use the column labels.
     *
     * ```js
     * const row = table.getRowWithLabelsObject(10);
     * // eg:
     * // [{ colour: red, size: 10}, { colour: blue, size: 20 }]
     * ```
     * @param rowNumber
     * @returns
     */
    getRowWithLabelsObject(rowNumber: number): object | undefined;
    /**
     * Gets or creates a row at `rowNumber`.
     * @param rowNumber
     * @returns
     */
    private getOrCreateRow;
    /**
     * Gets the values at `rowNumber`
     * @param rowNumber
     * @returns
     */
    row(rowNumber: number): Array<V | undefined> | undefined;
    /**
     * Set the value of row,column to `value`
     * @param rowNumber
     * @param columnNumber
     * @param value
     */
    set(rowNumber: number, columnNumber: number, value: V | undefined): void;
    get(rowNumber: number, column: number | string): V | undefined;
    /**
     * For a given row number, set all the columns to `value`.
     * `cols` gives the number of columns to set
     * @param rowNumber
     * @param cols
     * @param value
     */
    setRow(rowNumber: number, cols: number, value: V | undefined): void;
}

type DistanceCompute = (graph: DirectedGraph, edge: Edge$1) => number;
/**
 * Vertex. These are the _nodes_ of the graph. Immutable.
 *
 * They keep track of all of their outgoing edges, and
 * a unique id.
 *
 * Ids are used for accessing/updating vertices as well as in the
 * {@link Edge} type. They must be unique.
 */
type Vertex$1 = Readonly<{
    out: ReadonlyArray<Edge$1>;
    id: string;
}>;
/**
 * Edge. Immutable.
 *
 * Only encodes the destination vertex. The from
 * is known since edges are stored on the from vertex.
 */
type Edge$1 = Readonly<{
    /**
     * Vertex id edge connects to (ie. destination)
     */
    id: string;
    /**
     * Optional weight of edge
     */
    weight?: number;
}>;
/**
 * Create a vertex with given id
 * @param id
 * @returns
 */
declare const createVertex$1: (id: string) => Vertex$1;
/**
 * Options for connecting vertices
 */
type ConnectOptions$1 = Readonly<{
    /**
     * From, or source of connection
     */
    from: string;
    /**
     * To, or destination of connection. Can be multiple vertices for quick use
     */
    to: string | Array<string>;
    /**
     * If true, edges in opposite direction are made as well
     */
    bidi?: boolean;
    /**
     * Weight for this connection (optional)
     */
    weight?: number;
}>;
/**
 * Directed graph. Immutable.
 *
 * Consists of {@link Vertex|vertices}, which all have zero or more outgoing {@link Edge|Edges}.
 */
type DirectedGraph = Readonly<{
    vertices: IMapImmutable<string, Vertex$1>;
}>;
/**
 * Returns _true_ if graph contains `key`.
 *
 * ```js
 * // Same as
 * g.vertices.has(key)
 * ```
 * @param graph
 * @param key
 * @returns
 */
declare function hasKey(graph: DirectedGraph, key: string): boolean;
/**
 * Returns {@link Vertex} under `key`, or _undefined_
 * if not found.
 *
 * ```js
 * // Same as
 * g.vertices.get(key)
 * ```
 * @param graph
 * @param key
 * @returns
 */
declare function get(graph: DirectedGraph, key: string): Vertex$1 | undefined;
/**
 * Returns the graph connections as an adjacency matrix
 * @param graph
 * @returns
 */
declare function toAdjacencyMatrix$1(graph: DirectedGraph): Table<boolean>;
/**
 * Return a string representation of the graph for debug inspection
 * @param graph
 * @returns
 */
declare const dumpGraph$1: (graph: DirectedGraph | Iterable<Vertex$1>) => string;
declare const distance: (graph: DirectedGraph, edge: Edge$1) => number;
/**
 * Iterate over all the edges in the graph
 * @param graph
 */
declare function edges(graph: DirectedGraph): Generator<Readonly<{
    /**
     * Vertex id edge connects to (ie. destination)
     */
    id: string;
    /**
     * Optional weight of edge
     */
    weight?: number;
}>, void, unknown>;
/**
 * Iterate over all the vertices of the graph
 * @param graph
 */
declare function vertices(graph: DirectedGraph): Generator<Readonly<{
    out: ReadonlyArray<Edge$1>;
    id: string;
}>, void, unknown>;
/**
 * Iterate over all the vertices connected to `context` vertex
 * @param graph Graph
 * @param context id or Vertex.
 * @returns
 */
declare function adjacentVertices$1(graph: DirectedGraph, context: Vertex$1 | string | undefined): Generator<Readonly<{
    out: ReadonlyArray<Edge$1>;
    id: string;
}>, void, unknown>;
/**
 * Returns _true_ if `vertex` has an outgoing connection to
 * the supplied id or vertex.
 *
 * If `vertex` is undefined, _false_ is returned.
 * @param vertex From vertex
 * @param outIdOrVertex To vertex
 * @returns
 */
declare const vertexHasOut: (vertex: Vertex$1, outIdOrVertex: string | Vertex$1) => boolean;
/**
 * Returns _true_ if `vertex` has no outgoing connections
 * @param graph
 * @param vertex
 * @returns
 */
declare const hasNoOuts: (graph: DirectedGraph, vertex: string | Vertex$1) => boolean;
/**
 * Returns _true_ if `vertex` only has the given list of vertices.
 * Returns _false_ early if the length of the list does not match up with `vertex.out`
 * @param graph
 * @param vertex
 * @param outIdOrVertex
 * @returns
 */
declare const hasOnlyOuts: (graph: DirectedGraph, vertex: string | Vertex$1, ...outIdOrVertex: Array<string | Vertex$1>) => boolean;
/**
 * Returns _true_ if `vertex` has an outgoing connection to the given vertex.
 * @param graph
 * @param vertex
 * @param outIdOrVertex
 * @returns
 */
declare const hasOut: (graph: DirectedGraph, vertex: string | Vertex$1, outIdOrVertex: string | Vertex$1) => boolean;
/**
 * Gets a vertex by id, creating it if it does not exist.
 * @param graph
 * @param id
 * @returns
 */
declare const getOrCreate$1: (graph: DirectedGraph, id: string) => Readonly<{
    graph: DirectedGraph;
    vertex: Vertex$1;
}>;
/**
 * Gets a vertex by id, throwing an error if it does not exist
 * @param graph
 * @param id
 * @returns
 */
declare const getOrFail: (graph: DirectedGraph, id: string) => Vertex$1;
/**
 * Updates a vertex by returning a mutated graph
 * @param graph Graph
 * @param vertex Newly changed vertex
 * @returns
 */
declare const updateGraphVertex$1: (graph: DirectedGraph, vertex: Vertex$1) => DirectedGraph;
/**
 * Default distance computer. Uses `weight` property of edge, or `1` if not found.
 * @param graph
 * @param edge
 * @returns
 */
declare const distanceDefault: (graph: DirectedGraph, edge: Edge$1) => number;
/**
 * Returns a mutation of `graph`, with a given edge removed.
 *
 * If edge was not there, original graph is returned.
 * @param graph
 * @param from
 * @param to
 * @returns
 */
declare function disconnect(graph: DirectedGraph, from: string | Vertex$1, to: string | Vertex$1): DirectedGraph;
/**
 * Make a connection between two vertices with a given weight.
 * It returns the new graph as wll as the created edge.
 * @param graph
 * @param from
 * @param to
 * @param weight
 * @returns
 */
declare function connectTo$1(graph: DirectedGraph, from: string, to: string, weight?: number): {
    graph: DirectedGraph;
    edge: Edge$1;
};
/**
 * Connect from -> to. Same as {@link connectWithEdges}, but this version just returns the graph.
 *
 * By default unidirectional, meaning a connection is made only from->to. Use `bidi` option to set a bidirection connection, adding also to->from.
 *
 * Returns a result of `{ graph, edges }`, where `graph` is the new {@link DirectedGraph} and `edges`
 * is an array of {@link Edge Edges}. One for unidirectional, or two for bidirectional.
 * @param graph
 * @param options
 * @returns
 */
declare function connect$1(graph: DirectedGraph, options: ConnectOptions$1): DirectedGraph;
/**
 * Connect from -> to. Same as {@link connect} except you get back the edges as well.
 *
 * By default unidirectional, meaning a connection is made only from->to. Use `bidi` option to set a bidirection connection, adding also to->from.
 *
 * Returns a result of `{ graph, edges }`, where `graph` is the new {@link DirectedGraph} and `edges`
 * is an array of {@link Edge Edges}. One for unidirectional, or two for bidirectional.
 * @param graph
 * @param options
 * @returns
 */
declare function connectWithEdges$1(graph: DirectedGraph, options: ConnectOptions$1): {
    graph: DirectedGraph;
    edges: Edge$1[];
};
/**
 * Returns _true_ if a->b or b->a
 * @param graph
 * @param a
 * @param b
 * @returns
 */
declare function areAdjacent(graph: DirectedGraph, a: Vertex$1, b: Vertex$1): true | undefined;
/**
 * Iterates over vertices from a starting vertex in an bread-first-search
 * @param graph
 * @param startIdOrVertex
 * @param targetIdOrVertex
 * @returns
 */
declare function bfs(graph: DirectedGraph, startIdOrVertex: string | Vertex$1, targetIdOrVertex?: string | Vertex$1): Generator<Readonly<{
    out: ReadonlyArray<Edge$1>;
    id: string;
}>, void, unknown>;
/**
 * Iterates over vertices from a starting vertex in an depth-first-search
 * @param graph
 * @param startIdOrVertex
 */
declare function dfs(graph: DirectedGraph, startIdOrVertex: string | Vertex$1): Generator<Readonly<{
    out: ReadonlyArray<Edge$1>;
    id: string;
}>, void, unknown>;
/**
 * Compute shortest distance from the source vertex to the rest of the graph.
 * @param graph
 * @param sourceOrId
 * @returns
 */
declare const pathDijkstra: (graph: DirectedGraph, sourceOrId: Vertex$1 | string) => {
    distances: Map<string, number>;
    previous: Map<string, Readonly<{
        out: ReadonlyArray<Edge$1>;
        id: string;
    }> | null>;
    pathTo: (id: string) => Array<Edge$1>;
};
/**
 * Clones the graph. Uses shallow clone, because it's all immutable
 * @param graph
 * @returns
 */
declare const clone: (graph: DirectedGraph) => DirectedGraph;
/**
 * Create a graph
 * ```js
 * let g = graph();
 * ```
 *
 * Can optionally provide initial connections:
 * ```js
 * let g = graph(
 *  { from: `a`, to: `b` },
 *  { from: `b`, to: `c` }
 * )
 * ```
 * @param initialConnections
 * @returns
 */
declare const graph$1: (...initialConnections: Array<ConnectOptions$1>) => DirectedGraph;
/**
 * Returns _true_ if the graph contains is acyclic - that is, it has no loops
 * @param graph
 */
declare function isAcyclic(graph: DirectedGraph): boolean;
/**
 * Topological sort using Kahn's algorithm.
 * Returns a new graph that is sorted
 * @param graph
 */
declare function topologicalSort(graph: DirectedGraph): DirectedGraph;
/**
 * Create a graph from an iterable of vertices
 * @param vertices
 * @returns
 */
declare function graphFromVertices(vertices: Iterable<Vertex$1>): DirectedGraph;
/**
 * Get all the cycles ('strongly-connected-components') within the graph
 * [Read more](https://en.wikipedia.org/wiki/Strongly_connected_component)
 * @param graph
 * @returns
 */
declare function getCycles(graph: DirectedGraph): Array<Array<Vertex$1>>;
/**
 * Returns a new graph which is transitively reduced.
 * That is, redundant edges are removed
 * @param graph
 * @returns
 */
declare function transitiveReduction(graph: DirectedGraph): Readonly<{
    vertices: IMapImmutable<string, Vertex$1>;
}>;

type DirectedGraph$1_DirectedGraph = DirectedGraph;
type DirectedGraph$1_DistanceCompute = DistanceCompute;
declare const DirectedGraph$1_areAdjacent: typeof areAdjacent;
declare const DirectedGraph$1_bfs: typeof bfs;
declare const DirectedGraph$1_clone: typeof clone;
declare const DirectedGraph$1_dfs: typeof dfs;
declare const DirectedGraph$1_disconnect: typeof disconnect;
declare const DirectedGraph$1_distance: typeof distance;
declare const DirectedGraph$1_distanceDefault: typeof distanceDefault;
declare const DirectedGraph$1_edges: typeof edges;
declare const DirectedGraph$1_get: typeof get;
declare const DirectedGraph$1_getCycles: typeof getCycles;
declare const DirectedGraph$1_getOrFail: typeof getOrFail;
declare const DirectedGraph$1_graphFromVertices: typeof graphFromVertices;
declare const DirectedGraph$1_hasKey: typeof hasKey;
declare const DirectedGraph$1_hasNoOuts: typeof hasNoOuts;
declare const DirectedGraph$1_hasOnlyOuts: typeof hasOnlyOuts;
declare const DirectedGraph$1_hasOut: typeof hasOut;
declare const DirectedGraph$1_isAcyclic: typeof isAcyclic;
declare const DirectedGraph$1_pathDijkstra: typeof pathDijkstra;
declare const DirectedGraph$1_topologicalSort: typeof topologicalSort;
declare const DirectedGraph$1_transitiveReduction: typeof transitiveReduction;
declare const DirectedGraph$1_vertexHasOut: typeof vertexHasOut;
declare const DirectedGraph$1_vertices: typeof vertices;
declare namespace DirectedGraph$1 {
  export { type ConnectOptions$1 as ConnectOptions, type DirectedGraph$1_DirectedGraph as DirectedGraph, type DirectedGraph$1_DistanceCompute as DistanceCompute, type Edge$1 as Edge, type Vertex$1 as Vertex, adjacentVertices$1 as adjacentVertices, DirectedGraph$1_areAdjacent as areAdjacent, DirectedGraph$1_bfs as bfs, DirectedGraph$1_clone as clone, connect$1 as connect, connectTo$1 as connectTo, connectWithEdges$1 as connectWithEdges, createVertex$1 as createVertex, DirectedGraph$1_dfs as dfs, DirectedGraph$1_disconnect as disconnect, DirectedGraph$1_distance as distance, DirectedGraph$1_distanceDefault as distanceDefault, dumpGraph$1 as dumpGraph, DirectedGraph$1_edges as edges, DirectedGraph$1_get as get, DirectedGraph$1_getCycles as getCycles, getOrCreate$1 as getOrCreate, DirectedGraph$1_getOrFail as getOrFail, graph$1 as graph, DirectedGraph$1_graphFromVertices as graphFromVertices, DirectedGraph$1_hasKey as hasKey, DirectedGraph$1_hasNoOuts as hasNoOuts, DirectedGraph$1_hasOnlyOuts as hasOnlyOuts, DirectedGraph$1_hasOut as hasOut, DirectedGraph$1_isAcyclic as isAcyclic, DirectedGraph$1_pathDijkstra as pathDijkstra, toAdjacencyMatrix$1 as toAdjacencyMatrix, DirectedGraph$1_topologicalSort as topologicalSort, DirectedGraph$1_transitiveReduction as transitiveReduction, updateGraphVertex$1 as updateGraphVertex, DirectedGraph$1_vertexHasOut as vertexHasOut, DirectedGraph$1_vertices as vertices };
}

type Vertex = Readonly<{
    id: string;
}>;
type Edge = Readonly<{
    a: string;
    b: string;
    weight?: number;
}>;
type Graph = Readonly<{
    edges: ReadonlyArray<Edge>;
    vertices: IMapImmutable<string, Vertex>;
}>;
type ConnectOptions = Readonly<{
    a: string;
    b: string | Array<string>;
    weight?: number;
}>;
declare const createVertex: (id: string) => Vertex;
declare const updateGraphVertex: (graph: Graph, vertex: Vertex) => Graph;
declare const getOrCreate: (graph: Graph, id: string) => Readonly<{
    graph: Graph;
    vertex: Vertex;
}>;
/**
 * Returns _true/false_ if there is a connection between `a` and `b` in `graph`.
 * Use {@link getConnection} if you want to the edge.
 * @param graph Graph to search
 * @param a
 * @param b
 * @returns _true_ if edge exists
 */
declare const hasConnection: (graph: Graph, a: string | Vertex, b: string | Vertex) => boolean;
/**
 * Gets the connection, if it exists between `a` and `b` in `graph`.
 * If it doesn't exist, _undefined_ is returned.
 * Use {@link hasConnection} for a simple true/false if edge exists.
 * @param graph Graph
 * @param a
 * @param b
 * @returns
 */
declare const getConnection: (graph: Graph, a: string | Vertex, b: string | Vertex) => Edge | undefined;
/**
 * Connects A with B, returning the changed graph and created edge.
 * If the connection already exists, the original graph & edge is returned.
 * @param graph
 * @param a
 * @param b
 * @param weight
 * @returns
 */
declare function connectTo(graph: Graph, a: string, b: string, weight?: number): {
    graph: Graph;
    edge: Edge;
};
/**
 * Makes a connection between `options.a` and one or more nodes in `options.b`.
 * Same as {@link connectWithEdges} but only the {@link Graph} is returned.
 *
 * ```js
 * let g = graph(); // Create an empty graph
 * // Make a connection between `red` and `orange`
 * g = connect(g, { a: `red`, b: `orange` });
 *
 * // Make a connection between `red` and `orange as well as `red` and `yellow`.
 * g = connect(g, { a: `red`, b: [`orange`, `yellow`] })
 * ```
 * @param graph Initial graph
 * @param options Options
 */
declare function connect(graph: Graph, options: ConnectOptions): Graph;
/**
 * Makes a connection between `options.a` and one or more nodes in `options.b`.
 * Same as {@link connect} but graph and edges are returned.
 *
 * ```js
 * let g = graph(); // Create an empty graph
 *
 * // Make a connection between `red` and `orange`
 * result = connectWithEdges(g, { a: `red`, b: `orange` });
 *
 * // Make a connection between `red` and `orange as well as `red` and `yellow`.
 * result = connectWithEdges(g, { a: `red`, b: [`orange`, `yellow`] })
 * ```
 * @param graph Initial graph
 * @param options Options
 */
declare function connectWithEdges(graph: Graph, options: ConnectOptions): {
    graph: Graph;
    edges: Edge[];
};
declare const graph: (...initialConnections: Array<ConnectOptions>) => Graph;
declare function toAdjacencyMatrix(graph: Graph): Table<boolean>;
/**
 * Return a string representation of the graph for debug inspection
 * @param graph
 * @returns
 */
declare const dumpGraph: (graph: Graph) => string;
/**
 * Iterate over all the vertices connectd to `context` vertex
 * @param graph Graph
 * @param context id or Vertex
 * @returns
 */
declare function adjacentVertices(graph: Graph, context: Vertex | string | undefined): Generator<Readonly<{
    id: string;
}>, void, unknown>;
declare function edgesForVertex(graph: Graph, context: Vertex | string | undefined): Generator<Readonly<{
    a: string;
    b: string;
    weight?: number;
}>, void, unknown>;

type UndirectedGraph_ConnectOptions = ConnectOptions;
type UndirectedGraph_Edge = Edge;
type UndirectedGraph_Graph = Graph;
type UndirectedGraph_Vertex = Vertex;
declare const UndirectedGraph_adjacentVertices: typeof adjacentVertices;
declare const UndirectedGraph_connect: typeof connect;
declare const UndirectedGraph_connectTo: typeof connectTo;
declare const UndirectedGraph_connectWithEdges: typeof connectWithEdges;
declare const UndirectedGraph_createVertex: typeof createVertex;
declare const UndirectedGraph_dumpGraph: typeof dumpGraph;
declare const UndirectedGraph_edgesForVertex: typeof edgesForVertex;
declare const UndirectedGraph_getConnection: typeof getConnection;
declare const UndirectedGraph_getOrCreate: typeof getOrCreate;
declare const UndirectedGraph_graph: typeof graph;
declare const UndirectedGraph_hasConnection: typeof hasConnection;
declare const UndirectedGraph_toAdjacencyMatrix: typeof toAdjacencyMatrix;
declare const UndirectedGraph_updateGraphVertex: typeof updateGraphVertex;
declare namespace UndirectedGraph {
  export { type UndirectedGraph_ConnectOptions as ConnectOptions, type UndirectedGraph_Edge as Edge, type UndirectedGraph_Graph as Graph, type UndirectedGraph_Vertex as Vertex, UndirectedGraph_adjacentVertices as adjacentVertices, UndirectedGraph_connect as connect, UndirectedGraph_connectTo as connectTo, UndirectedGraph_connectWithEdges as connectWithEdges, UndirectedGraph_createVertex as createVertex, UndirectedGraph_dumpGraph as dumpGraph, UndirectedGraph_edgesForVertex as edgesForVertex, UndirectedGraph_getConnection as getConnection, UndirectedGraph_getOrCreate as getOrCreate, UndirectedGraph_graph as graph, UndirectedGraph_hasConnection as hasConnection, UndirectedGraph_toAdjacencyMatrix as toAdjacencyMatrix, UndirectedGraph_updateGraphVertex as updateGraphVertex };
}

declare namespace index$1 {
  export { DirectedGraph$1 as Directed, UndirectedGraph as Undirected };
}

declare const index_ArrayKeys: typeof ArrayKeys;
declare const index_EitherKey: typeof EitherKey;
type index_ExpiringMap<K, V> = ExpiringMap<K, V>;
declare const index_ExpiringMap: typeof ExpiringMap;
type index_MapOfSimpleMutable<V> = MapOfSimpleMutable<V>;
declare const index_MapOfSimpleMutable: typeof MapOfSimpleMutable;
declare const index_ObjectKeys: typeof ObjectKeys;
declare const index_QueueImmutable: typeof QueueImmutable;
declare const index_QueueMutable: typeof QueueMutable;
declare const index_SetStringImmutable: typeof SetStringImmutable;
declare const index_SetStringMutable: typeof SetStringMutable;
type index_StackImmutable<V> = StackImmutable<V>;
declare const index_StackImmutable: typeof StackImmutable;
type index_StackMutable<V> = StackMutable<V>;
declare const index_StackMutable: typeof StackMutable;
type index_Table<V> = Table<V>;
declare const index_Table: typeof Table;
declare const index_circularArray: typeof circularArray;
declare namespace index {
  export { index_ArrayKeys as ArrayKeys, ICircularArray as CircularArray, index_EitherKey as EitherKey, index_ExpiringMap as ExpiringMap, index$1 as Graphs, index_MapOfSimpleMutable as MapOfSimpleMutable, index$3 as Maps, index_ObjectKeys as ObjectKeys, index_QueueImmutable as QueueImmutable, index_QueueMutable as QueueMutable, index$4 as Queues, index_SetStringImmutable as SetStringImmutable, index_SetStringMutable as SetStringMutable, index$5 as Sets, index_StackImmutable as StackImmutable, index_StackMutable as StackMutable, index$2 as Stacks, index_Table as Table, index$6 as Trees, index_circularArray as circularArray };
}

export { ExpiringMap as E, MapOfSimpleMutable as M, StackMutable as S, Table as T, index$2 as a, StackImmutable as b, index$3 as c, index$1 as d, index as i };
