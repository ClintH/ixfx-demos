import { m as mutableMapSet, b as mutableMapCircular, c as mutableMapArray, d as mutableCircularArray, s as stack, e as stackMutable } from './MutableMapMulti-7834c37d';
import { M as MutableStringSet, m as mutableStringSet, S as Set } from './Set-712e3233';
import { I as IsEqual } from './util-115aef22';

/**
 * A simple mutable map of arrays, without events
 *
 * @export
 * @class SimpleMutableMapArray
 * @template V
 */
declare class SimpleMutableMapArray<V> {
    #private;
    add(key: string, ...values: ReadonlyArray<V>): void;
    debugString(): string;
    get(key: string): ReadonlyArray<V> | undefined;
    delete(key: string, v: V): boolean;
    clear(): void;
}
declare const simpleMutableMapArray: () => SimpleMutableMapArray<unknown>;

declare enum OverflowPolicy {
    /**
     * Removes items front of the queue (ie older items are discarded)
     */
    DiscardOlder = 0,
    /**
     * Remove from rear of queue to make space for new items (ie newer items are discarded)
     */
    DiscardNewer = 1,
    /**
     * Only adds new items that there are room for (ie. brand new items are discarded)
     */
    DiscardAdditions = 2
}
interface QueueOpts {
    readonly debug?: boolean;
    readonly capacity?: number;
    /**
     * Default is DiscardAdditions, meaning new items are discarded
     *
     * @type {OverflowPolicy}
     */
    readonly overflowPolicy?: OverflowPolicy;
}
declare class Queue<V> {
    readonly opts: QueueOpts;
    readonly data: ReadonlyArray<V>;
    /**
     * Creates an instance of Queue.
     * @param {QueueOpts} opts Options foor queue
     * @param {V[]} data Initial data. Index 0 is front of queue
     * @memberof Queue
     */
    constructor(opts: QueueOpts, data: ReadonlyArray<V>);
    enqueue(...toAdd: ReadonlyArray<V>): Queue<V>;
    dequeue(): Queue<V>;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get length(): number;
    /**
     * Returns front of queue (oldest item), or undefined if queue is empty
     *
     * @readonly
     * @type {(V | undefined)}
     * @memberof Queue
     */
    get peek(): V | undefined;
}
/**
 * Returns an immutable queue
 *
 * ```js
 * let q = queue();           // Create
 * q = q.enqueue(`a`, `b`);   // Add two strings
 * const front = q.peek();    // `a` is at the front of queue (oldest)
 * q = q.dequeue();           // q now just consists of `b`
 * ```
 * @template V
 * @param {QueueOpts} [opts={}] Options
 * @param {...V[]} startingItems Index 0 is the front of the queue
 * @returns {Queue<V>} A new queue
 */
declare const queue: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => Queue<V>;
declare type MutableQueue<V> = {
    get isEmpty(): boolean;
    readonly dequeue: () => V | undefined;
    readonly enqueue: (...toAdd: ReadonlyArray<V>) => number;
    get peek(): V | undefined;
    get length(): number;
    get isFull(): boolean;
    get data(): readonly V[];
};
/**
 * Returns a mutable queue
 *
 * ```js
 * const q = queue();       // Create
 * q.enqueue(`a`, `b`);     // Add two strings
 * const front = q.dequeue();  // `a` is at the front of queue (oldest)
 * ```
 *
 * @template V
 * @param {QueueOpts} [opts={}]
 * @param {...ReadonlyArray<V>} startingItems
 */
declare const queueMutable: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => MutableQueue<V>;

type Queue$1_OverflowPolicy = OverflowPolicy;
declare const Queue$1_OverflowPolicy: typeof OverflowPolicy;
type Queue$1_QueueOpts = QueueOpts;
declare const Queue$1_queue: typeof queue;
type Queue$1_MutableQueue<V> = MutableQueue<V>;
declare const Queue$1_queueMutable: typeof queueMutable;
declare namespace Queue$1 {
  export {
    Queue$1_OverflowPolicy as OverflowPolicy,
    Queue$1_QueueOpts as QueueOpts,
    Queue$1_queue as queue,
    Queue$1_MutableQueue as MutableQueue,
    Queue$1_queueMutable as queueMutable,
  };
}

/**
 * Functions for working with primitive arrays, regardless of type
 * See Also: NumericArrays.ts
 */

declare const guardArray: <V>(array: ArrayLike<V>, paramName?: string) => void;
declare const randomIndex: <V>(array: ArrayLike<V>) => number;
declare const randomElement: <V>(array: ArrayLike<V>) => V;
/**
 * Removes a random item from an array, returning both the item and the new array as a result.
 * Does not modify the original array unless `mutate` parameter is true
 *
 * @template V
 * @param {readonly} array Array to pluck item from
 * @param {*} V
 * @param {*} []
 * @return {*}  {({readonly value:V|undefined, readonly array:ReadonlyArray<V> })}
 */
declare const randomPluck: <V>(array: readonly V[], mutate?: boolean) => {
    readonly value: V | undefined;
    readonly array: V[];
};
declare const shuffle: (dataToShuffle: ReadonlyArray<unknown>) => ReadonlyArray<unknown>;
/**
 * Returns an array with a value omitted.
 * Value checking is completed via the provided `comparer` function, or by default checking whether `a === b`.
 *
 * @template V
 * @param {ReadonlyArray<V>} data
 * @param {V} value
 * @param {IsEqual<V>} [comparer=isEqualDefault]
 * @return {*}  {ReadonlyArray<V>}
 */
declare const without: <V>(data: readonly V[], value: V, comparer?: IsEqual<V>) => readonly V[];
/**
 * Groups data by a grouper function, returning data as a map with string
 * keys and array values.
 *
 * @example
 * ```js
 * const data = [
 *  { age: 39, city: `London` }
 *  { age: 14, city: `Copenhagen` }
 *  { age: 23, city: `Stockholm` }
 *  { age: 56, city: `London` }
 * ];
 * const map = groupBy(data, item => data.city);
 * ```
 *
 * Returns a map:
 * ```js
 * London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
 * Stockhom: [{ age: 23, city: `Stockholm` }]
 * Copenhagen: [{ age: 14, city: `Copenhagen` }]
 * ```
 * @param array Data to group
 * @param grouper Function that returns a key for a given item
 * @returns Map
 */
declare const groupBy: <K, V>(array: readonly V[], grouper: (item: V) => K) => Map<K, V[]>;

/**
 * Calculates the average of all numbers in an array.
 * Array items which aren't a valid number are ignored and do not factor into averaging.
 *
 * Usage
 * ```
 * average(1, 1.4, 0.9, 0.1);
 *
 * let data = [100,200];
 * average(...data);
 * ```
 * @param {...number[]} data Data to average.
 * @returns {number}
 */
declare const average: (...data: readonly number[]) => number;
declare const getMinMaxAvg: (data: readonly number[]) => {
    readonly min: number;
    readonly total: number;
    readonly max: number;
    readonly avg: number;
};

declare type ArrayKeys<K, V> = ReadonlyArray<readonly [key: K, value: V]>;
declare type ObjKeys<K, V> = ReadonlyArray<{
    readonly key: K;
    readonly value: V;
}>;
declare type EitherKey<K, V> = ArrayKeys<K, V> | ObjKeys<K, V>;
/**
 * An immutable map. Rather than changing the map, functions like `add` and `delete`
 * return a new map reference which must be captured.
 *
 * Immutable data is useful because as it gets passed around your code, it never
 * changes from underneath you. You have what you have.
 *
 * @example
 * ```js
 * let m = map();
 * let m2 = m.set(`hello`, `samantha`);
 * // m is still empty, only m2 contains a value.
 * ```
 */
interface ImmutableMap<K, V> {
    /**
     * Adds one or more items, returning the changed map.
     *
     * Can add items in the form of [key,value] or {key, value}.
     * @example These all produce the same result
     * ```js
     * map.set(`hello`, `samantha`);
     * map.add([`hello`, `samantha`]);
     * map.add({key: `hello`, value: `samantha`})
     * ```
     * @param itemsToAdd
     */
    add(...itemsToAdd: EitherKey<K, V>): ImmutableMap<K, V>;
    /**
     * Deletes an item by key, returning the changed map
     * @param key
     */
    delete(key: K): ImmutableMap<K, V>;
    /**
     * Returns an empty map
     */
    clear(): ImmutableMap<K, V>;
    /**
     * Returns an item by key, or undefined if not found
     * @param key
     */
    get(key: K): V | undefined;
    /**
     * Returns true if map contains `key`
     * @param key
     */
    has(key: K): boolean;
    /**
     * Returns true if map is empty
     */
    isEmpty(): boolean;
    /**
     * Iterates over entries (in the form of [key,value])
     */
    entries(): IterableIterator<readonly [K, V]>;
}
/**
 * A mutable map.
 *
 * It is a wrapper around the in-built Map type, but adds roughly the same API as {@link ImmutableMap}.
 */
interface MutableMap<K, V> {
    /**
     * Adds one or more items to map
     *
     * Can add items in the form of [key,value] or {key, value}.
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
     * @param key
     */
    get(key: K): V | undefined;
    /**
     * Returns true if map contains key
     * @param key
     */
    has(key: K): boolean;
    /**
     * Returns true if map is empty
     */
    isEmpty(): boolean;
    /**
     * Iterates over entries (consisting of [key,value])
     */
    entries(): IterableIterator<readonly [K, V]>;
}

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
declare const has: <K, V>(map: ReadonlyMap<K, V>, key: K) => boolean;
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
 * Sets data in a copy of the initial map
 * @param map Initial map
 * @param key Key
 * @param value Value to  set
 * @returns New map with data set
 */
declare const set: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V) => Map<K, V>;
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
declare const add: <K, V>(map: ReadonlyMap<K, V>, ...data: EitherKey<K, V>) => ReadonlyMap<K, V>;
/**
 * Delete a key from the map, returning a new map
 * @param map Initial data
 * @param key
 * @returns New map with data deleted
 */
declare const del: <K, V>(map: ReadonlyMap<K, V>, key: K) => ReadonlyMap<K, V>;
/**
 * Returns an {@link ImmutableMap}.
 * Use {@link mutableMap} as an alternatve.
 *
 * @param dataOrMap Optional initial data in the form of an array of {key:value} or [key,value]
 * @returns {@link ImmutableMap}
 */
declare const map: <K, V>(dataOrMap?: ReadonlyMap<K, V> | EitherKey<K, V> | undefined) => ImmutableMap<K, V>;
/**
 * Returns a {@link MutableMap} (which just wraps the in-built Map)
 * Use {@link map} for the immutable alternative.
 *
 * @param data Optional initial data in the form of an array of {key:value} or [key,value]
 * @returns {@link MutableMap}
 */
declare const mutableMap: <K, V>(...data: EitherKey<K, V>) => MutableMap<K, V>;
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
 * @param m
 * @param transformer
 * @returns
 */
declare const mapToArray: <K, V, R>(m: ReadonlyMap<K, V>, transformer: (key: K, item: V) => R) => readonly R[];

declare const Map$1_has: typeof has;
declare const Map$1_hasKeyValue: typeof hasKeyValue;
declare const Map$1_hasAnyValue: typeof hasAnyValue;
declare const Map$1_filter: typeof filter;
declare const Map$1_toArray: typeof toArray;
declare const Map$1_find: typeof find;
declare const Map$1_set: typeof set;
declare const Map$1_add: typeof add;
declare const Map$1_del: typeof del;
declare const Map$1_map: typeof map;
declare const Map$1_mutableMap: typeof mutableMap;
declare const Map$1_transformMap: typeof transformMap;
declare const Map$1_zipKeyValue: typeof zipKeyValue;
declare const Map$1_mapToObj: typeof mapToObj;
declare const Map$1_mapToArray: typeof mapToArray;
declare namespace Map$1 {
  export {
    Map$1_has as has,
    Map$1_hasKeyValue as hasKeyValue,
    Map$1_hasAnyValue as hasAnyValue,
    Map$1_filter as filter,
    Map$1_toArray as toArray,
    Map$1_find as find,
    Map$1_set as set,
    Map$1_add as add,
    Map$1_del as del,
    Map$1_map as map,
    Map$1_mutableMap as mutableMap,
    Map$1_transformMap as transformMap,
    Map$1_zipKeyValue as zipKeyValue,
    Map$1_mapToObj as mapToObj,
    Map$1_mapToArray as mapToArray,
  };
}

declare const index_mutableMapSet: typeof mutableMapSet;
declare const index_mutableMapCircular: typeof mutableMapCircular;
declare const index_mutableMapArray: typeof mutableMapArray;
declare const index_mutableCircularArray: typeof mutableCircularArray;
declare const index_simpleMutableMapArray: typeof simpleMutableMapArray;
declare const index_MutableStringSet: typeof MutableStringSet;
declare const index_mutableStringSet: typeof mutableStringSet;
declare const index_stack: typeof stack;
declare const index_stackMutable: typeof stackMutable;
declare const index_queue: typeof queue;
declare const index_queueMutable: typeof queueMutable;
declare const index_guardArray: typeof guardArray;
declare const index_randomIndex: typeof randomIndex;
declare const index_randomElement: typeof randomElement;
declare const index_randomPluck: typeof randomPluck;
declare const index_shuffle: typeof shuffle;
declare const index_without: typeof without;
declare const index_groupBy: typeof groupBy;
declare const index_average: typeof average;
declare const index_getMinMaxAvg: typeof getMinMaxAvg;
declare const index_has: typeof has;
declare const index_hasKeyValue: typeof hasKeyValue;
declare const index_hasAnyValue: typeof hasAnyValue;
declare const index_filter: typeof filter;
declare const index_toArray: typeof toArray;
declare const index_find: typeof find;
declare const index_set: typeof set;
declare const index_add: typeof add;
declare const index_del: typeof del;
declare const index_map: typeof map;
declare const index_mutableMap: typeof mutableMap;
declare const index_transformMap: typeof transformMap;
declare const index_zipKeyValue: typeof zipKeyValue;
declare const index_mapToObj: typeof mapToObj;
declare const index_mapToArray: typeof mapToArray;
type index_ArrayKeys<K, V> = ArrayKeys<K, V>;
type index_ObjKeys<K, V> = ObjKeys<K, V>;
type index_EitherKey<K, V> = EitherKey<K, V>;
type index_ImmutableMap<K, V> = ImmutableMap<K, V>;
type index_MutableMap<K, V> = MutableMap<K, V>;
declare namespace index {
  export {
    index_mutableMapSet as mutableMapSet,
    index_mutableMapCircular as mutableMapCircular,
    index_mutableMapArray as mutableMapArray,
    index_mutableCircularArray as mutableCircularArray,
    index_simpleMutableMapArray as simpleMutableMapArray,
    index_MutableStringSet as MutableStringSet,
    index_mutableStringSet as mutableStringSet,
    index_stack as stack,
    index_stackMutable as stackMutable,
    index_queue as queue,
    index_queueMutable as queueMutable,
    Set as Sets,
    Queue$1 as Queues,
    Map$1 as Maps,
    index_guardArray as guardArray,
    index_randomIndex as randomIndex,
    index_randomElement as randomElement,
    index_randomPluck as randomPluck,
    index_shuffle as shuffle,
    index_without as without,
    index_groupBy as groupBy,
    index_average as average,
    index_getMinMaxAvg as getMinMaxAvg,
    index_has as has,
    index_hasKeyValue as hasKeyValue,
    index_hasAnyValue as hasAnyValue,
    index_filter as filter,
    index_toArray as toArray,
    index_find as find,
    index_set as set,
    index_add as add,
    index_del as del,
    index_map as map,
    index_mutableMap as mutableMap,
    index_transformMap as transformMap,
    index_zipKeyValue as zipKeyValue,
    index_mapToObj as mapToObj,
    index_mapToArray as mapToArray,
    index_ArrayKeys as ArrayKeys,
    index_ObjKeys as ObjKeys,
    index_EitherKey as EitherKey,
    index_ImmutableMap as ImmutableMap,
    index_MutableMap as MutableMap,
  };
}

export { mapToObj as A, mapToArray as B, ArrayKeys as C, MutableMap as D, EitherKey as E, ImmutableMap as I, Map$1 as M, ObjKeys as O, Queue$1 as Q, queueMutable as a, randomElement as b, randomPluck as c, shuffle as d, groupBy as e, average as f, guardArray as g, getMinMaxAvg as h, index as i, has as j, hasKeyValue as k, hasAnyValue as l, filter as m, find as n, set as o, add as p, queue as q, randomIndex as r, simpleMutableMapArray as s, toArray as t, del as u, map as v, without as w, mutableMap as x, transformMap as y, zipKeyValue as z };
