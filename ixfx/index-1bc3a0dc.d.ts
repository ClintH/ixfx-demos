import { S as SimpleEventEmitter } from './Events-b4b55fba.js';
import { a as IStack, b as IStackImmutable, I as ICircularArray, c as circularArray, d as IMapOfMutableExtended, e as IMapOfMutable, M as MapArrayEvents, f as IMapOf } from './IMapOfMutableExtended-2d4706a0.js';
import { a as Trees } from './Trees-11733e5d.js';
import { A as Arrays } from './Arrays-83c49f17.js';
import { S as SetStringImmutable, a as SetStringMutable, i as index$4 } from './index-c635db24.js';
import { a as QueueImmutable, Q as QueueMutable, i as index$3 } from './index-016f09b1.js';
import { I as IsEqual, T as ToString } from './Util-21835c84.js';

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
    private keyCount;
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
     *
     * Remove items are returned
     * @param time
     * @param prop get/set/either
     */
    deleteWithElapsed(time: number, prop: `get` | `set` | `either`): [k: K, v: V][];
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
declare const immutable$1: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => IStackImmutable<V>;

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
declare const mutable$1: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => IStackMutable<V>;

type StackDiscardPolicy = `older` | `newer` | `additions`;
type StackOpts = {
    readonly debug?: boolean;
    readonly capacity?: number;
    readonly discardPolicy?: StackDiscardPolicy;
};

declare const index$2_IStack: typeof IStack;
declare const index$2_IStackImmutable: typeof IStackImmutable;
type index$2_IStackMutable<V> = IStackMutable<V>;
type index$2_StackDiscardPolicy = StackDiscardPolicy;
type index$2_StackOpts = StackOpts;
declare namespace index$2 {
  export {
    index$2_IStack as IStack,
    index$2_IStackImmutable as IStackImmutable,
    index$2_IStackMutable as IStackMutable,
    index$2_StackDiscardPolicy as StackDiscardPolicy,
    index$2_StackOpts as StackOpts,
    immutable$1 as immutable,
    mutable$1 as mutable,
  };
}

type ArrayKeys<K, V> = ReadonlyArray<readonly [key: K, value: V]>;
type ObjKeys<K, V> = ReadonlyArray<{
    readonly key: K;
    readonly value: V;
}>;
type EitherKey<K, V> = ArrayKeys<K, V> | ObjKeys<K, V>;

type index$1_ArrayKeys<K, V> = ArrayKeys<K, V>;
declare const index$1_Arrays: typeof Arrays;
type index$1_EitherKey<K, V> = EitherKey<K, V>;
type index$1_ObjKeys<K, V> = ObjKeys<K, V>;
declare const index$1_QueueImmutable: typeof QueueImmutable;
declare const index$1_QueueMutable: typeof QueueMutable;
declare const index$1_SetStringImmutable: typeof SetStringImmutable;
declare const index$1_SetStringMutable: typeof SetStringMutable;
type index$1_StackImmutable<V> = StackImmutable<V>;
declare const index$1_StackImmutable: typeof StackImmutable;
type index$1_StackMutable<V> = StackMutable<V>;
declare const index$1_StackMutable: typeof StackMutable;
declare const index$1_Trees: typeof Trees;
declare const index$1_circularArray: typeof circularArray;
declare namespace index$1 {
  export {
    index$1_ArrayKeys as ArrayKeys,
    index$1_Arrays as Arrays,
    ICircularArray as CircularArray,
    index$1_EitherKey as EitherKey,
    index as Maps,
    index$1_ObjKeys as ObjKeys,
    index$1_QueueImmutable as QueueImmutable,
    index$1_QueueMutable as QueueMutable,
    index$3 as Queues,
    index$1_SetStringImmutable as SetStringImmutable,
    index$1_SetStringMutable as SetStringMutable,
    index$4 as Sets,
    index$1_StackImmutable as StackImmutable,
    index$1_StackMutable as StackMutable,
    index$2 as Stacks,
    index$1_Trees as Trees,
    index$1_circularArray as circularArray,
  };
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
interface IMapImmutable<K, V> {
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
 * Returns an {@link IMapImmutable}.
 * Use {@link Maps.mutable} as a mutable alternatve.
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
declare const immutable: <K, V>(dataOrMap?: ReadonlyMap<K, V> | EitherKey<K, V> | undefined) => IMapImmutable<K, V>;

/**
 * A mutable map.
 *
 * It is a wrapper around the in-built Map type, but adds roughly the same API as {@link IMapImmutable}.
 *
 * @template K Type of map keys. Typically `string`
 * @template V Type of stored values
 */
interface IMapMutable<K, V> {
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
    readonly toString?: ToString<V>;
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
 * * `comparer`: {@link Util.IsEqual}
 * * `toString`: {@link Util.ToString}
 *
 * A custom {@link Util.ToString} function can be provided which is used when checking value equality (`has`, `without`)
 * ```js
 * const map = ofArrayMutable({toString:(v) => v.name}); // Compare values based on their `name` field;
 * ```
 *
 * Alternatively, a {@link Util.IsEqual} function can be used:
 * ```js
 * const map = ofArrayMutable({comparer: (a, b) => a.name === b.name });
 * ```
 * @param opts
 * @template V Data type of items
 * @returns {@link IMapOfMutableExtended}
 */
declare const ofArrayMutable: <V>(opts?: MapArrayOpts<V>) => IMapOfMutableExtended<V, readonly V[]>;

declare class MapOfSimpleBase<V> {
    protected map: Map<string, ReadonlyArray<V>>;
    protected readonly groupBy: ToString<V>;
    protected valueEq: IsEqual<V>;
    /**
     * Constructor
     * @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
     * @param valueEq Compare values. By default uses JS logic for equality
     */
    constructor(groupBy?: ToString<V>, valueEq?: IsEqual<V>, initial?: [string, readonly V[]][]);
    /**
     * Iterate over all entries
     */
    entriesFlat(): IterableIterator<[key: string, value: V]>;
    entries(): IterableIterator<[key: string, value: V[]]>;
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
declare const ofSimpleMutable: <V>(groupBy?: ToString<V>, valueEq?: IsEqual<V>) => IMapOfMutable<V>;

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
     * Returns the length of the longest child list
     */
    get lengthMax(): number;
    debugString(): string;
    get isEmpty(): boolean;
    clear(): void;
    addKeyedValues(key: string, ...values: V[]): void;
    set(key: string, values: V[]): this;
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
    entries(): IterableIterator<[key: string, value: V[]]>;
    keysAndCounts(): IterableIterator<[string, number]>;
    merge(other: IMapOf<V>): void;
    get size(): number;
    forEach(fn: (value: readonly V[], key: string, map: Map<string, readonly V[]>) => void, _thisArg?: any): void;
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
    find(source: M, predicate: (v: V) => boolean): V | unknown;
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
    readonly groupBy?: ToString<V> | undefined;
};
type MapSetOpts<V> = MapMultiOpts<V> & {
    readonly hash: ToString<V>;
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
declare const ofSetMutable: <V>(opts?: MapSetOpts<V> | undefined) => IMapOfMutableExtended<V, ReadonlyMap<string, V>>;

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

interface IMappish<K, V> {
    get(key: K): V | undefined;
    set(key: K, value: V): void;
}
interface IWithEntries<K, V> {
    entries(): IterableIterator<readonly [K, V]>;
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
declare const getOrGenerate: <K, V, Z>(map: IMappish<K, V>, fn: (key: K, args?: Z | undefined) => V | Promise<V>) => GetOrGenerate<K, V, Z>;
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
 * @inheritDoc getOrGenerate
 * @param map
 * @param fn
 * @returns
 */
declare const getOrGenerateSync: <K, V, Z>(map: IMappish<K, V>, fn: (key: K, args?: Z | undefined) => V) => (key: K, args?: Z | undefined) => V;
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
 * @param hashFunc
 * @param values
 * @returns
 */
declare const addKeepingExisting: <V>(set: ReadonlyMap<string, V> | undefined, hashFunc: ToString<V>, ...values: readonly V[]) => Map<any, any>;
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
 * @param compareFn
 * @returns
 */
declare const sortByValue: <K, V>(map: ReadonlyMap<K, V>, compareFn?: ((a: V, b: V) => number) | undefined) => void;
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
declare const sortByValueProperty: <K, V, Z>(map: ReadonlyMap<K, V>, prop: string, compareFn?: ((a: Z, b: Z) => number) | undefined) => [K, V][];
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
declare const fromIterable: <V>(data: Iterable<V>, keyFn?: (itemToMakeStringFor: V) => string, allowOverwrites?: boolean) => ReadonlyMap<string, V>;
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
 * Converts a map to a simple object, transforming from type `T` to `K` as it does so. If no transforms are needed, use {@link toObject}.
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
declare const toObject: <T>(m: ReadonlyMap<string, T>) => {
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
declare const mergeByKey: <K, V>(reconcile: MergeReconcile<V>, ...maps: readonly ReadonlyMap<K, V>[]) => ReadonlyMap<K, V>;

type GetOrGenerate<K, V, Z> = (key: K, args?: Z) => Promise<V>;

type index_ExpiringMap<K, V> = ExpiringMap<K, V>;
declare const index_ExpiringMap: typeof ExpiringMap;
type index_ExpiringMapEvent<K, V> = ExpiringMapEvent<K, V>;
type index_ExpiringMapEvents<K, V> = ExpiringMapEvents<K, V>;
type index_GetOrGenerate<K, V, Z> = GetOrGenerate<K, V, Z>;
type index_IMapImmutable<K, V> = IMapImmutable<K, V>;
type index_IMapMutable<K, V> = IMapMutable<K, V>;
declare const index_IMapOf: typeof IMapOf;
declare const index_IMapOfMutable: typeof IMapOfMutable;
declare const index_IMapOfMutableExtended: typeof IMapOfMutableExtended;
type index_IMappish<K, V> = IMappish<K, V>;
type index_IWithEntries<K, V> = IWithEntries<K, V>;
declare const index_MapArrayEvents: typeof MapArrayEvents;
type index_MapArrayOpts<V> = MapArrayOpts<V>;
type index_MapCircularOpts<V> = MapCircularOpts<V>;
type index_MapMultiOpts<V> = MapMultiOpts<V>;
type index_MapOfMutableImpl<V, M> = MapOfMutableImpl<V, M>;
declare const index_MapOfMutableImpl: typeof MapOfMutableImpl;
type index_MapOfSimpleMutable<V> = MapOfSimpleMutable<V>;
declare const index_MapOfSimpleMutable: typeof MapOfSimpleMutable;
type index_MapSetOpts<V> = MapSetOpts<V>;
type index_MergeReconcile<V> = MergeReconcile<V>;
type index_MultiValue<V, M> = MultiValue<V, M>;
declare const index_addKeepingExisting: typeof addKeepingExisting;
declare const index_addObject: typeof addObject;
declare const index_deleteByValue: typeof deleteByValue;
declare const index_filter: typeof filter;
declare const index_find: typeof find;
declare const index_firstEntryByIterablePredicate: typeof firstEntryByIterablePredicate;
declare const index_firstEntryByIterableValue: typeof firstEntryByIterableValue;
declare const index_fromIterable: typeof fromIterable;
declare const index_fromObject: typeof fromObject;
declare const index_getClosestIntegerKey: typeof getClosestIntegerKey;
declare const index_getOrGenerate: typeof getOrGenerate;
declare const index_getOrGenerateSync: typeof getOrGenerateSync;
declare const index_hasAnyValue: typeof hasAnyValue;
declare const index_hasKeyValue: typeof hasKeyValue;
declare const index_immutable: typeof immutable;
declare const index_mapToArray: typeof mapToArray;
declare const index_mapToObjTransform: typeof mapToObjTransform;
declare const index_mergeByKey: typeof mergeByKey;
declare const index_mutable: typeof mutable;
declare const index_ofArrayMutable: typeof ofArrayMutable;
declare const index_ofCircularMutable: typeof ofCircularMutable;
declare const index_ofSetMutable: typeof ofSetMutable;
declare const index_sortByValue: typeof sortByValue;
declare const index_sortByValueProperty: typeof sortByValueProperty;
declare const index_toArray: typeof toArray;
declare const index_toObject: typeof toObject;
declare const index_transformMap: typeof transformMap;
declare const index_zipKeyValue: typeof zipKeyValue;
declare namespace index {
  export {
    index_ExpiringMap as ExpiringMap,
    index_ExpiringMapEvent as ExpiringMapEvent,
    index_ExpiringMapEvents as ExpiringMapEvents,
    Opts as ExpiringMapOpts,
    index_GetOrGenerate as GetOrGenerate,
    index_IMapImmutable as IMapImmutable,
    index_IMapMutable as IMapMutable,
    index_IMapOf as IMapOf,
    index_IMapOfMutable as IMapOfMutable,
    index_IMapOfMutableExtended as IMapOfMutableExtended,
    index_IMappish as IMappish,
    index_IWithEntries as IWithEntries,
    index_MapArrayEvents as MapArrayEvents,
    index_MapArrayOpts as MapArrayOpts,
    index_MapCircularOpts as MapCircularOpts,
    index_MapMultiOpts as MapMultiOpts,
    index_MapOfMutableImpl as MapOfMutableImpl,
    index_MapOfSimpleMutable as MapOfSimpleMutable,
    index_MapSetOpts as MapSetOpts,
    index_MergeReconcile as MergeReconcile,
    index_MultiValue as MultiValue,
    index_addKeepingExisting as addKeepingExisting,
    index_addObject as addObject,
    index_deleteByValue as deleteByValue,
    create as expiringMap,
    index_filter as filter,
    index_find as find,
    index_firstEntryByIterablePredicate as firstEntryByIterablePredicate,
    index_firstEntryByIterableValue as firstEntryByIterableValue,
    index_fromIterable as fromIterable,
    index_fromObject as fromObject,
    index_getClosestIntegerKey as getClosestIntegerKey,
    index_getOrGenerate as getOrGenerate,
    index_getOrGenerateSync as getOrGenerateSync,
    index_hasAnyValue as hasAnyValue,
    index_hasKeyValue as hasKeyValue,
    index_immutable as immutable,
    ofSimpleMutable as mapOfSimpleMutable,
    index_mapToArray as mapToArray,
    index_mapToObjTransform as mapToObjTransform,
    index_mergeByKey as mergeByKey,
    index_mutable as mutable,
    index_ofArrayMutable as ofArrayMutable,
    index_ofCircularMutable as ofCircularMutable,
    index_ofSetMutable as ofSetMutable,
    index_sortByValue as sortByValue,
    index_sortByValueProperty as sortByValueProperty,
    index_toArray as toArray,
    index_toObject as toObject,
    index_transformMap as transformMap,
    index_zipKeyValue as zipKeyValue,
  };
}

export { ArrayKeys as A, EitherKey as E, GetOrGenerate as G, ObjKeys as O, StackMutable as S, index as a, index$2 as b, StackImmutable as c, index$1 as i };
