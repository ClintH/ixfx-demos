import { I as ICircularArray, c as circularArray } from './CircularArray-sm3CThg9.js';
import { i as index$6 } from './index-kl-6AXQe.js';
import { E as EitherKey, A as ArrayKeys, O as ObjectKeys } from './Types-S6h-aw9z.js';
import { i as index$3, I as Iterables } from './index-7-0LnMKH.js';
import { a as IMapOfMutableExtended, b as IMapOfMutable, M as MapArrayEvents, c as IMapOf, d as IStack, I as IStackImmutable } from './IMapOfMutableExtended-GY_Epf-Q.js';
import { S as SetStringImmutable, a as SetStringMutable, i as index$5 } from './index-fiXbHcMZ.js';
import { Q as QueueImmutable, i as index$4 } from './index-_vI8NUEP.js';
import { c as QueueMutable } from './QueueMutable-3m-8vekt.js';
import { S as SimpleEventEmitter } from './Events-QY1ngixJ.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { I as IMapBase, a as IMapImmutable, i as immutable$1 } from './Map-Pf0nY9XK.js';
import { I as IsEqual } from './IsEqual-EdZcaNvH.js';
import { I as IWithEntries, G as GetOrGenerate, a as IMappish, g as getOrGenerate, b as getOrGenerateSync } from './GetOrGenerate-kIk9vbTz.js';
import { T as ToString } from './ToString-Wn1YmnlL.js';

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
 * @param opts
 * @returns
 */
declare const create: <K, V>(opts?: Opts) => ExpiringMap<K, V>;
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
 * @param opts
 * @template V Data type of items
 * @returns {@link IMapOfMutableExtended}
 */
declare const ofArrayMutable: <V>(opts?: MapArrayOpts<V>) => IMapOfMutableExtended<V, ReadonlyArray<V>>;

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
 * @param opts
 * @returns
 */
declare const ofSetMutable: <V>(opts?: MapSetOpts<V>) => IMapOfMutableExtended<V, ReadonlyMap<string, V>>;

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
 * @param opts
 * @returns
 */
declare const ofCircularMutable: <V>(opts: MapCircularOpts<V>) => IMapOfMutableExtended<V, ICircularArray<V>>;

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

/**
 * Gets the closest integer key to `target` in `data`.
 * * Requires map to have numbers as keys, not strings
 * * Math.round is used for rounding `target`.
 *
 * Examples:
 * ```js
 * // Assuming numeric keys 1, 2, 3, 4 exist:
 * getClosestIntegerKey(map, 3);    // 3
 * getClosestIntegerKey(map, 3.1);  // 3
 * getClosestIntegerKey(map, 3.5);  // 4
 * getClosestIntegerKey(map, 3.6);  // 4
 * getClosestIntegerKey(map, 100);  // 4
 * getClosestIntegerKey(map, -100); // 1
 * ```
 * @param data Map
 * @param target Target value
 * @returns
 */
declare const getClosestIntegerKey: (data: ReadonlyMap<number, any>, target: number) => number;
/**
 * Returns the first value in `data` that matches a key from `keys`.
 * ```js
 * // Iterate, yielding: `a.b.c.d`, `b.c.d`, `c.d`, `d`
 * const keys = Text.segmentsFromEnd(`a.b.c.d`);
 * // Gets first value that matches a key (starting from most precise)
 * const value = getFromKeys(data, keys);
 * ```
 * @param data
 * @param keys
 * @returns
 */
declare const getFromKeys: <T>(data: ReadonlyMap<string, T>, keys: Iterable<string>) => T | undefined;
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
 * Deletes all key/values from map where value matches `value`,
 * with optional comparer. Mutates map.
 *
 * ```js
 * import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"
 *
 * // Compare fruits based on their colour property
 * const colourComparer = (a, b) => a.colour === b.colour;
 *
 * // Deletes all values where .colour = `red`
 * Maps.deleteByValue(map, { colour: `red` }, colourComparer);
 * ```
 * @param map
 * @param value
 * @param comparer
 */
declare const deleteByValue: <K, V>(map: ReadonlyMap<K, V>, value: V, comparer?: IsEqual<V>) => void;
/**
 * Finds first entry by iterable value. Expects a map with an iterable as values.
 *
 * ```js
 * const map = new Map();
 * map.set('hello', 'a');
 * map.set('there', 'b');
 *
 * const entry = firstEntryByIterablePredicate(map, (value, key) => {
 *  return (value === 'b');
 * });
 * // Entry is: ['there', 'b']
 * ```
 *
 * An alternative is {@link firstEntryByIterableValue} to search by value.
 * @param map Map to search
 * @param predicate Filter function returns true when there is a match of value
 * @returns Entry, or _undefined_ if `filter` function never returns _true_
 */
declare const firstEntryByIterablePredicate: <K, V>(map: IWithEntries<K, V>, predicate: (value: V, key: K) => boolean) => readonly [key: K, value: V] | undefined;
/**
 * Finds first entry by iterable value.
 *
 * ```js
 * const map = new Map();
 * map.set('hello', 'a');
 * map.set('there', 'b');
 *
 * const entry = firstEntryByIterableValue(map, 'b');
 * // Entry is: ['there', 'b']
 * ```
 *
 * An alternative is {@link firstEntryByIterablePredicate} to search by predicate function.
 * @param map Map to search
 * @param value Value to seek
 * @param isEqual Filter function which checks equality. Uses JS comparer by default.
 * @returns Entry, or _undefined_ if `value` not found.
 */
declare const firstEntryByIterableValue: <K, V>(map: IWithEntries<K, V>, value: V, isEqual?: IsEqual<V>) => readonly [key: K, value: V] | undefined;
/**
 * Adds items to a map only if their key doesn't already exist
 *
 * Uses provided {@link Util.ToString} function to create keys for items. Item is only added if it doesn't already exist.
 * Thus the older item wins out, versus normal `Map.set` where the newest wins.
 *
 *
 * @example
 * ```js
 * import { Maps } from "https://unpkg.com/ixfx/dist/collections.js";
 * const map = new Map();
 * const peopleArray = [ _some people objects..._];
 * Maps.addKeepingExisting(map, p => p.name, ...peopleArray);
 * ```
 * @param set
 * @param hasher
 * @param values
 * @returns
 */
declare const addKeepingExisting: <V>(set: ReadonlyMap<string, V> | undefined, hasher: ToString<V>, ...values: ReadonlyArray<V>) => Map<any, any>;
/**
 * Returns a array of entries from a map, sorted by value.
 *
 * ```js
 * const m = new Map();
 * m.set(`4491`, { name: `Bob` });
 * m.set(`2319`, { name: `Alice` });
 *
 * // Compare by name
 * const comparer = (a, b) => defaultComparer(a.name, b.name);
 *
 * // Get sorted values
 * const sorted = Maps.sortByValue(m, comparer);
 * ```
 *
 * `sortByValue` takes a comparison function that should return -1, 0 or 1 to indicate order of `a` to `b`. If not provided, {@link Util.defaultComparer} is used.
 * @param map
 * @param comparer
 * @returns
 */
declare const sortByValue: <K, V>(map: ReadonlyMap<K, V>, comparer?: (a: V, b: V) => number) => [K, V][];
/**
 * Returns an array of entries from a map, sorted by a property of the value
 *
 * ```js
 * cosnt m = new Map();
 * m.set(`4491`, { name: `Bob` });
 * m.set(`2319`, { name: `Alice` });
 * const sorted = Maps.sortByValue(m, `name`);
 * ```
 * @param map Map to sort
 * @param prop Property of value
 * @param compareFn Comparer. If unspecified, uses a default.
 */
declare const sortByValueProperty: <K, V, Z>(map: ReadonlyMap<K, V>, property: string, compareFunction?: (a: Z, b: Z) => number) => [K, V][];
/**
 * Returns _true_ if any key contains `value`, based on the provided `comparer` function. Use {@link hasKeyValue}
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
declare const toArray: <V>(map: ReadonlyMap<string, V>) => ReadonlyArray<V>;
/**
 * Returns a Map from an iterable. By default throws an exception
 * if iterable contains duplicate values.
 *
 * ```js
 * const data = [
 *  { fruit: `granny-smith`, family: `apple`, colour: `green` }
 *  { fruit: `mango`, family: `stone-fruit`, colour: `orange` }
 * ];
 * const map = Maps.fromIterable(data, v => v.fruit);
 * ```
 * @param data Input data
 * @param keyFn Function which returns a string id. By default uses the JSON value of the object.
 * @param allowOverwrites When set to _true_, items with same id will silently overwrite each other, with last write wins. _false_ by default.
 * @returns
 */
declare const fromIterable: <V>(data: Iterable<V>, keyFunction?: (itemToMakeStringFor: V) => string, allowOverwrites?: boolean) => ReadonlyMap<string, V>;
/**
 * Returns a Map from an object, or array of objects.
 * Assumes the top-level properties of the object is the key.
 *
 * ```js
 * const data = {
 *  Sally: { name: `Sally`, colour: `red` },
 *  Bob: { name: `Bob`, colour: `pink` }
 * };
 * const map = Maps.fromObject(data);
 * map.get(`Sally`); // { name: `Sally`, colour: `red` }
 * ```
 *
 * To add an object to an existing map, use {@link addObject}.
 * @param data
 * @returns
 */
declare const fromObject: <V>(data: any) => ReadonlyMap<string, V>;
/**
 * Adds an object to an existing map. It assumes a structure where
 * each top-level property is a key:
 *
 * ```js
 * const data = {
 *  Sally: { name: `Sally`, colour: `red` },
 *  Bob: { name: `Bob`, colour: `pink` }
 * };
 * const map = new Map();
 * Maps.addObject(map, data);
 *
 * map.get(`Sally`); // { name: `Sally`, colour: `red` }
 * ```
 *
 * To create a new map from an object, use {@link fromObject} instead.
 * @param map
 * @param data
 */
declare const addObject: <V>(map: Map<string, V>, data: any) => void;
/**
 * Returns the first found value that matches `predicate` or _undefined_.
 *
 * Use {@link some} if you don't care about the value, just whether it appears.
 * Use {@link filter} to get all value(s) that match `predicate`.
 *
 * @example First person over thirty
 * ```js
 * const overThirty = find(people, person => person.age > 30);
 * ```
 * @param map Map to search
 * @param predicate Function that returns true for a matching value
 * @returns Found value or _undefined_
 */
declare const find: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => V | undefined;
/**
 * Returns _true_ if `predicate` yields _true_ for any value in `map`.
 * Use {@link find} if you want the matched value.
 * ```js
 * const map = new Map();
 * map.set(`fruit`, `apple`);
 * map.set(`colour`, `red`);
 * Maps.some(map, v => v === `red`);    // true
 * Maps.some(map, v => v === `orange`); // false
 * ```
 * @param map
 * @param predicate
 * @returns
 */
declare const some: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => boolean;
/**
 * Converts a map to a simple object, transforming from type `T` to `K` as it does so. If no transforms are needed, use {@link toObject}.
 *
 * ```js
 * const map = new Map();
 * map.set(`name`, `Alice`);
 * map.set(`pet`, `dog`);
 *
 * const o = mapToObjectTransform(map, v => {
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
declare const mapToObjectTransform: <T, K>(m: ReadonlyMap<string, T>, valueTransform: (value: T) => K) => Readonly<Record<string, K>>;
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
 * If you want to combine values into a single object, consider instead  {@link mapToObjectTransform}.
 * @param source
 * @param transformer
 * @typeParam K Type of keys (generally a string)
 * @typeParam V Type of input map values
 * @typeParam R Type of output map values
 * @returns
 */
declare const transformMap: <K, V, R>(source: ReadonlyMap<K, V>, transformer: (value: V, key: K) => R) => Map<K, R>;
/**
 * Converts a `Map` to a plain object, useful for serializing to JSON.
 * To convert back to a map use {@link fromObject}.
 *
 * @example
 * ```js
 * const map = new Map();
 * map.set(`Sally`, { name: `Sally`, colour: `red` });
 * map.set(`Bob`, { name: `Bob`, colour: `pink });
 *
 * const objects = Maps.toObject(map);
 * // Yields: {
 * //  Sally: { name: `Sally`, colour: `red` },
 * //  Bob: { name: `Bob`, colour: `pink` }
 * // }
 * ```
 * @param m
 * @returns
 */
declare const toObject: <T>(m: ReadonlyMap<string, T>) => Readonly<Record<string, T>>;
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
declare const mapToArray: <K, V, R>(m: ReadonlyMap<K, V>, transformer: (key: K, item: V) => R) => ReadonlyArray<R>;
/**
 * Returns a result of a merged into b.
 * B is always the 'newer' data that takes
 * precedence.
 */
type MergeReconcile<V> = (a: V, b: V) => V;
/**
 * Merges maps left to right, using the provided
 * `reconcile` function to choose a winner when keys overlap.
 *
 * There's also [Arrays.mergeByKey](functions/Collections.Arrays.mergeByKey.html) if you don't already have a map.
 *
 * For example, if we have the map A:
 * 1 => `A-1`, 2 => `A-2`, 3 => `A-3`
 *
 * And map B:
 * 2 => `B-1`, 2 => `B-2`, 4 => `B-4`
 *
 * If they are merged with the reconile function:
 * ```js
 * const reconcile = (a, b) => b.replace(`-`, `!`);
 * const output = mergeByKey(reconcile, mapA, mapB);
 * ```
 *
 * The final result will be:
 *
 * 1 => `B!1`, 2 => `B!2`, 3 => `A-3`, 4 => `B-4`
 *
 * In this toy example, it's obvious how the reconciler transforms
 * data where the keys overlap. For the keys that do not overlap -
 * 3 and 4 in this example - they are copied unaltered.
 *
 * A practical use for `mergeByKey` has been in smoothing keypoints
 * from a TensorFlow pose. In this case, we want to smooth new keypoints
 * with older keypoints. But if a keypoint is not present, for it to be
 * passed through.
 *
 * @param reconcile
 * @param maps
 */
declare const mergeByKey: <K, V>(reconcile: MergeReconcile<V>, ...maps: ReadonlyArray<ReadonlyMap<K, V>>) => ReadonlyMap<K, V>;

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
declare const index$2_IMappish: typeof IMappish;
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
type index$2_MergeReconcile<V> = MergeReconcile<V>;
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
  export { index$2_ExpiringMap as ExpiringMap, type index$2_ExpiringMapEvent as ExpiringMapEvent, type index$2_ExpiringMapEvents as ExpiringMapEvents, type Opts as ExpiringMapOpts, index$2_GetOrGenerate as GetOrGenerate, index$2_IMapImmutable as IMapImmutable, type index$2_IMapMutable as IMapMutable, index$2_IMapOf as IMapOf, index$2_IMapOfMutable as IMapOfMutable, index$2_IMapOfMutableExtended as IMapOfMutableExtended, index$2_IMappish as IMappish, index$2_IWithEntries as IWithEntries, index$2_MapArrayEvents as MapArrayEvents, type index$2_MapArrayOpts as MapArrayOpts, type index$2_MapCircularOpts as MapCircularOpts, type index$2_MapMultiOpts as MapMultiOpts, index$2_MapOfMutableImpl as MapOfMutableImpl, index$2_MapOfSimpleMutable as MapOfSimpleMutable, type index$2_MapSetOpts as MapSetOpts, type index$2_MergeReconcile as MergeReconcile, type index$2_MultiValue as MultiValue, index$2_NumberMap as NumberMap, index$2_addKeepingExisting as addKeepingExisting, index$2_addObject as addObject, index$2_deleteByValue as deleteByValue, create as expiringMap, index$2_filter as filter, index$2_find as find, index$2_firstEntryByIterablePredicate as firstEntryByIterablePredicate, index$2_firstEntryByIterableValue as firstEntryByIterableValue, index$2_fromIterable as fromIterable, index$2_fromObject as fromObject, index$2_getClosestIntegerKey as getClosestIntegerKey, index$2_getFromKeys as getFromKeys, index$2_getOrGenerate as getOrGenerate, index$2_getOrGenerateSync as getOrGenerateSync, index$2_hasAnyValue as hasAnyValue, index$2_hasKeyValue as hasKeyValue, immutable$1 as immutable, ofSimpleMutable as mapOfSimpleMutable, index$2_mapToArray as mapToArray, index$2_mapToObjectTransform as mapToObjectTransform, index$2_mergeByKey as mergeByKey, mutable$1 as mutable, index$2_ofArrayMutable as ofArrayMutable, index$2_ofCircularMutable as ofCircularMutable, index$2_ofSetMutable as ofSetMutable, index$2_some as some, index$2_sortByValue as sortByValue, index$2_sortByValueProperty as sortByValueProperty, index$2_toArray as toArray, index$2_toObject as toObject, index$2_transformMap as transformMap, index$2_zipKeyValue as zipKeyValue };
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
 * @param opts Options
 * @param startingItems List of items to add to stack. Items will be pushed 'left to right', ie array index 0 will be bottom of the stack.
 */
declare const immutable: <V>(opts?: StackOpts, ...startingItems: ReadonlyArray<V>) => IStackImmutable<V>;

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
declare const index_Iterables: typeof Iterables;
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
  export { index_ArrayKeys as ArrayKeys, index$3 as Arrays, ICircularArray as CircularArray, index_EitherKey as EitherKey, index_Iterables as Iterables, index$2 as Maps, index_ObjectKeys as ObjectKeys, index_QueueImmutable as QueueImmutable, index_QueueMutable as QueueMutable, index$4 as Queues, index_SetStringImmutable as SetStringImmutable, index_SetStringMutable as SetStringMutable, index$5 as Sets, index_StackImmutable as StackImmutable, index_StackMutable as StackMutable, index$1 as Stacks, index$6 as Trees, index_circularArray as circularArray };
}

export { StackMutable as S, index$1 as a, StackImmutable as b, index$2 as c, index as i };
