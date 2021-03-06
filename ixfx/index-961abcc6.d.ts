import { b as MapArrayEvents, c as MultiValue, d as MapMultiOpts, M as MapOfMutable, e as MapArrayOpts, f as MapSetOpts, g as MapCircularOpts, C as CircularArray, h as SimpleMapArrayMutable, D as DiscardPolicy, a as Stack$1, i as StackMutable, j as Queue$1, Q as QueueMutable, E as EitherKey, k as MapImmutable, l as MapMutable, A as ArrayKeys, O as ObjKeys, V as ValueSetEventMap, S as SetMutable, m as StackBase } from './Interfaces-72d49634.js';
import { S as SimpleEventEmitter } from './Events-5892cf2f.js';
import { T as ToString } from './Util-e3ea7983.js';
import { s as setMutable, S as Set } from './Set-964abeab.js';
import { A as Arrays } from './Arrays-6456a447.js';
import { M as Map$1 } from './Map-876131ed.js';

/**
 * @internal
 */
declare class MapOfMutableImpl<V, M> extends SimpleEventEmitter<MapArrayEvents<V>> {
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
declare const mapArray: <V>(opts?: MapArrayOpts<V>) => MapOfMutable<V, readonly V[]>;
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
declare const mapSet: <V>(opts?: MapSetOpts<V> | undefined) => MapOfMutable<V, ReadonlyMap<string, V>>;
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
declare const mapCircularMutable: <V>(opts: MapCircularOpts<V>) => MapOfMutable<V, CircularArray<V>>;

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
declare const circularArray: <V>(capacity: number) => CircularArray<V>;

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
declare const simpleMapArrayMutable: <V>() => SimpleMapArrayMutable<V>;

declare type StackOpts = {
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
declare const stack: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => Stack$1<V>;
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
declare const stackMutable: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => StackMutable<V>;

type Stack_StackOpts = StackOpts;
declare const Stack_stack: typeof stack;
declare const Stack_stackMutable: typeof stackMutable;
declare namespace Stack {
  export {
    Stack_StackOpts as StackOpts,
    Stack_stack as stack,
    Stack_stackMutable as stackMutable,
  };
}

/**
 * Queue options.
 *
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = queue({capacity: 5, discardPolicy: `newer`});
 * ```
 */
declare type QueueOpts = {
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
declare const queue: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => Queue$1<V>;
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
declare const queueMutable: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => QueueMutable<V>;

type Queue_QueueOpts = QueueOpts;
declare const Queue_queue: typeof queue;
declare const Queue_queueMutable: typeof queueMutable;
declare namespace Queue {
  export {
    Queue_QueueOpts as QueueOpts,
    Queue_queue as queue,
    Queue_queueMutable as queueMutable,
  };
}

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
declare const map: <K, V>(dataOrMap?: ReadonlyMap<K, V> | EitherKey<K, V> | undefined) => MapImmutable<K, V>;

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
declare const mapMutable: <K, V>(...data: EitherKey<K, V>) => MapMutable<K, V>;

declare const index_mapSet: typeof mapSet;
declare const index_mapCircularMutable: typeof mapCircularMutable;
declare const index_mapArray: typeof mapArray;
declare const index_circularArray: typeof circularArray;
declare const index_simpleMapArrayMutable: typeof simpleMapArrayMutable;
declare const index_setMutable: typeof setMutable;
declare const index_stack: typeof stack;
declare const index_stackMutable: typeof stackMutable;
declare const index_queue: typeof queue;
declare const index_queueMutable: typeof queueMutable;
declare const index_map: typeof map;
declare const index_mapMutable: typeof mapMutable;
type index_MapOfMutableImpl<V, M> = MapOfMutableImpl<V, M>;
declare const index_MapOfMutableImpl: typeof MapOfMutableImpl;
declare const index_Arrays: typeof Arrays;
declare const index_ArrayKeys: typeof ArrayKeys;
declare const index_ObjKeys: typeof ObjKeys;
declare const index_EitherKey: typeof EitherKey;
declare const index_MapSetOpts: typeof MapSetOpts;
declare const index_MapCircularOpts: typeof MapCircularOpts;
declare const index_MultiValue: typeof MultiValue;
declare const index_MapMultiOpts: typeof MapMultiOpts;
declare const index_MapArrayOpts: typeof MapArrayOpts;
declare const index_ValueSetEventMap: typeof ValueSetEventMap;
declare const index_DiscardPolicy: typeof DiscardPolicy;
declare const index_QueueMutable: typeof QueueMutable;
declare const index_SetMutable: typeof SetMutable;
declare const index_MapOfMutable: typeof MapOfMutable;
declare const index_MapArrayEvents: typeof MapArrayEvents;
declare const index_CircularArray: typeof CircularArray;
declare const index_SimpleMapArrayMutable: typeof SimpleMapArrayMutable;
declare const index_MapImmutable: typeof MapImmutable;
declare const index_MapMutable: typeof MapMutable;
declare const index_StackMutable: typeof StackMutable;
declare const index_StackBase: typeof StackBase;
declare namespace index {
  export {
    index_mapSet as mapSet,
    index_mapCircularMutable as mapCircularMutable,
    index_mapArray as mapArray,
    index_circularArray as circularArray,
    index_simpleMapArrayMutable as simpleMapArrayMutable,
    index_setMutable as setMutable,
    index_stack as stack,
    index_stackMutable as stackMutable,
    index_queue as queue,
    index_queueMutable as queueMutable,
    index_map as map,
    index_mapMutable as mapMutable,
    index_MapOfMutableImpl as MapOfMutableImpl,
    Stack as Stacks,
    index_Arrays as Arrays,
    Set as Sets,
    Queue as Queues,
    Map$1 as Maps,
    index_ArrayKeys as ArrayKeys,
    index_ObjKeys as ObjKeys,
    index_EitherKey as EitherKey,
    index_MapSetOpts as MapSetOpts,
    index_MapCircularOpts as MapCircularOpts,
    index_MultiValue as MultiValue,
    index_MapMultiOpts as MapMultiOpts,
    index_MapArrayOpts as MapArrayOpts,
    index_ValueSetEventMap as ValueSetEventMap,
    index_DiscardPolicy as DiscardPolicy,
    Queue$1 as Queue,
    index_QueueMutable as QueueMutable,
    index_SetMutable as SetMutable,
    index_MapOfMutable as MapOfMutable,
    index_MapArrayEvents as MapArrayEvents,
    index_CircularArray as CircularArray,
    index_SimpleMapArrayMutable as SimpleMapArrayMutable,
    index_MapImmutable as MapImmutable,
    index_MapMutable as MapMutable,
    index_StackMutable as StackMutable,
    Stack$1 as Stack,
    index_StackBase as StackBase,
  };
}

export { MapOfMutableImpl as M, Queue as Q, Stack as S, mapCircularMutable as a, mapArray as b, circularArray as c, stack as d, stackMutable as e, queueMutable as f, map as g, mapMutable as h, index as i, mapSet as m, queue as q, simpleMapArrayMutable as s };
