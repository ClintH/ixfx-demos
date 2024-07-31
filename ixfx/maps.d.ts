import { S as SimpleEventEmitter } from './Events-DJgOvcWD.js';
import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { I as IsEqual } from './IsEqual-CTTf-Oj9.js';
import { E as EitherKey } from './Types-CXzamHqZ.js';
import { I as ICircularArray } from './CircularArray-CpJrVPp5.js';
import { T as ToString } from './ToString-DO94OWoh.js';
export { I as IMappish, a as IWithEntries } from './IMappish-qfjdy4T9.js';

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

interface IMapOf<V> {
    /**
     * Iterates over all keys
     */
    keys(): IterableIterator<string>;
    /**
     * Iterates over all values stored under `key`
     * @param key
     */
    get(key: string): IterableIterator<V>;
    /**
     * Iterates over all values, regardless of key.
     * Same value may re-appear if it's stored under different keys.
     */
    valuesFlat(): IterableIterator<V>;
    /**
     * Iterates over key-value pairs.
     * Unlike a normal map, the same key may appear several times.
     */
    entriesFlat(): IterableIterator<readonly [key: string, value: V]>;
    /**
     * Iteates over all keys and the count of values therein
     */
    keysAndCounts(): IterableIterator<readonly [string, number]>;
    /**
     * Returns _true_ if `value` is stored under `key`.
     *
     * @param key Key
     * @param value Value
     */
    hasKeyValue(key: string, value: V, eq?: IsEqual<V>): boolean;
    /**
     * Returns _true_ if `key` has any values
     * @param key
     */
    has(key: string): boolean;
    /**
     * Returns _true_ if the map is empty
     */
    get isEmpty(): boolean;
    /**
     * Returns the number of values stored under `key`, or _0_ if `key` is not present.
     * @param key Key
     */
    count(key: string): number;
    /**
     * Finds the first key where value is stored.
     * Note: value could be stored in multiple keys
     * @param value Value to seek
     * @returns Key, or undefined if value not found
     */
    firstKeyByValue(value: V, eq?: IsEqual<V> | undefined): string | undefined;
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
declare const immutable: <K, V>(dataOrMap?: ReadonlyMap<K, V> | EitherKey<K, V>) => IMapImmutable<K, V>;

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
declare const mutable: <K, V>(...data: EitherKey<K, V>) => IMapMutable<K, V>;

interface IMapOfMutable<V> extends IMapOf<V> {
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
     * Returns the number of keys
     */
    get lengthKeys(): number;
    /**
     * Deletes all values under `key` that match `value`.
     * @param key Key
     * @param value Value
     */
    deleteKeyValue(key: string, value: V): boolean;
    /**
     * Delete all occurrences of `value`, regardless of
     * key it is stored under.
     * Returns _true_ if something was deleted.
     * @param value
     */
    deleteByValue(value: V): boolean;
    /**
     * Deletes all values stored under `key`. Returns _true_ if key was found
     * @param key
     */
    delete(key: string): boolean;
}

/**
 * Events from mapArray
 */
type MapArrayEvents<V> = {
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
 * Like a `Map` but multiple values can be stored for each key.
 * Duplicate values can be added to the same or even a several keys.
 *
 * Three pre-defined MapOf's are available:
 * * {@link ofArrayMutable} - Map of arrays
 * * {@link ofSetMutable} - Map of unique items
 * * {@link ofCircularMutable} - Hold a limited set of values per key
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
 *  // New key evt.key seen.
 * });
 * ```
 *
 * @typeParam V - Values stored under keys
 * @typeParam M - Type of data structure managing values
 */
interface IMapOfMutableExtended<V, M> extends SimpleEventEmitter<MapArrayEvents<V>>, IMapOfMutable<V> {
    /**
     * Returns the object managing values under the specified `key`
     * @private
     * @param key
     */
    getSource(key: string): M | undefined;
    /**
     * Returns the type name. For in-built implementations, it will be one of: array, set or circular
     */
    get typeName(): string;
    /**
     * Returns a human-readable rendering of contents
     */
    debugString(): string;
}

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

export { type ExpiringMapEvent, type ExpiringMapEvents, type Opts as ExpiringMapOpts, type IMapImmutable, type IMapMutable, type IMapOf, type IMapOfMutable, type IMapOfMutableExtended, type MapArrayEvents, type MapArrayOpts, type MapCircularOpts, type MapMultiOpts, MapOfMutableImpl, type MapSetOpts, type MultiValue, NumberMap, create as expiringMap, immutable, ofSimpleMutable as mapOfSimpleMutable, mutable, ofArrayMutable, ofCircularMutable, ofSetMutable };
