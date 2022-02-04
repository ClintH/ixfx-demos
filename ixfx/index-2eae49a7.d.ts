import { m as mutableMapSet, b as mutableMapCircular, c as mutableMapArray, d as mutableCircularArray, s as stack, e as stackMutable } from './MutableMapMulti-cec85eca';
import { M as MutableStringSet, m as mutableStringSet, S as Set } from './Set-36e0e94c';
import { I as IsEqual } from './util-2bc3f13f';

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
declare const has: <K, V>(map: ReadonlyMap<K, V>, key: K) => boolean;
declare const hasKeyValue: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V, comparer: IsEqual<V>) => boolean;
declare const hasAnyValue: <K, V>(map: ReadonlyMap<K, V>, value: V, comparer: IsEqual<V>) => boolean;
declare const filter: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => readonly V[];
declare const toArray: <V>(map: ReadonlyMap<string, V>) => readonly V[];
declare const find: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => V | undefined;
declare const set: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V) => Map<K, V>;
declare const add: <K, V>(map: ReadonlyMap<K, V>, ...data: EitherKey<K, V>) => ReadonlyMap<K, V>;
declare const del: <K, V>(map: ReadonlyMap<K, V>, key: K) => ReadonlyMap<K, V>;
declare const map: <K, V>(dataOrMap?: ReadonlyMap<K, V> | EitherKey<K, V> | undefined) => Readonly<{
    add(...itemsToAdd: EitherKey<K, V>): Readonly<any>;
    delete(key: K): Readonly<any>;
    clear(): Readonly<any>;
    get(key: K): V | undefined;
    has(key: K): boolean;
    isEmpty(): boolean;
    entries(): IterableIterator<readonly [K, V]>;
}>;
declare const mutableMap: <K, V>(...data: EitherKey<K, V>) => Readonly<{
    add(...itemsToAdd: EitherKey<K, V>): void;
    set(key: K, value: V): void;
    delete(key: K): void;
    clear(): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    isEmpty(): boolean;
    entries(): IterableIterator<readonly [K, V]>;
}>;
/**
 * Like `Array.map`. Transforms from Map<K,V> to Map<K,R>
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
 * Zips together an array of keys and values into an object:
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
declare const groupBy: <K, V>(array: readonly V[], grouper: (item: V) => K) => Map<K, V[]>;
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
 * Converts Map<K,V> to Array<R>
 *
 * @example Returns [[key, value],[key,value]]
 * ```js
 * const arr = mapToArray<string, string, number>(key, value, (key, value) => [key, value])
 * ```
 * @param m
 * @param transformer
 * @returns
 */
declare const mapToArray: <K, V, R>(m: ReadonlyMap<K, V>, transformer: (key: K, item: V) => R) => R[];

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
declare const Map$1_groupBy: typeof groupBy;
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
    Map$1_groupBy as groupBy,
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
declare const index_groupBy: typeof groupBy;
declare const index_mapToObj: typeof mapToObj;
declare const index_mapToArray: typeof mapToArray;
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
    index_groupBy as groupBy,
    index_mapToObj as mapToObj,
    index_mapToArray as mapToArray,
  };
}

export { mapToObj as A, mapToArray as B, Map$1 as M, Queue$1 as Q, queueMutable as a, randomElement as b, randomPluck as c, shuffle as d, average as e, getMinMaxAvg as f, guardArray as g, has as h, index as i, hasKeyValue as j, hasAnyValue as k, filter as l, find as m, set as n, add as o, del as p, queue as q, randomIndex as r, simpleMutableMapArray as s, toArray as t, map as u, mutableMap as v, without as w, transformMap as x, groupBy as y, zipKeyValue as z };
