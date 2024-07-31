import { I as IQueueMutable, Q as QueueMutable, a as QueueOpts, b as IQueueMutableWithEvents, c as QueueDiscardPolicy, d as QueueMutableEvents, m as mutable } from './QueueMutable-D_WD8izv.js';
import { I as IsEqual } from './IsEqual-CTTf-Oj9.js';
import { P as Passed, U as Unsubscriber } from './Types-wAi1hdUW.js';

/**
 * A prioritised item in queue
 */
type PriorityItem<V> = Readonly<{
    /**
     * Item
     */
    item: V;
    /**
     * Priority
     */
    priority: number;
}>;
interface IPriorityQueueMutable<V> extends IQueueMutable<PriorityItem<V>> {
    /**
     * Dequeues the item with highest priority.
     */
    dequeueMax(): V | undefined;
    /**
     * Dequeues the item with the lowest priority.
     */
    dequeueMin(): V | undefined;
    /**
     * Peeks at the item with highest priority without removing it.
     * _undefined_ if queue is empty.
     */
    peekMax(): V | undefined;
    /**
     * Peeks at the item with the lowest priority without removing it.
     * _undefined_ if queue is empty.
     */
    peekMin(): V | undefined;
}

/**
 * Queue (immutable). See also {@link QueueMutable}.
 *
 * Queues are useful if you want to treat 'older' or 'newer'
 * items differently. _Enqueing_ adds items at the back of the queue, while
 * _dequeing_ removes items from the front (ie. the oldest).
 *
 * ```js
 * let q = queue();           // Create
 * q = q.enqueue(`a`, `b`);   // Add two strings
 * const front = q.peek;      // `a` is at the front of queue (oldest)
 * q = q.dequeue();           // q now just consists of `b`
 * ```
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = queue({capacity: 5, discardPolicy: `newer`});
 * ```
 *
 */
interface IQueueImmutable<V> {
    /**
     * Enumerates queue from back-to-front
     *
     */
    forEach(fn: (v: V) => void): void;
    /**
     * Enumerates queue from front-to-back
     * @param fn
     */
    forEachFromFront(fn: (v: V) => void): void;
    /**
     * Returns a new queue with item(s) added
     * @param toAdd Items to add
     */
    enqueue(...toAdd: ReadonlyArray<V>): IQueueImmutable<V>;
    /**
     * Dequeues (removes oldest item / item at front of queue).
     * Use {@link peek} to get item that will be removed.
     *
     * @returns Queue with item removed
     */
    dequeue(): IQueueImmutable<V>;
    /**
     * Returns true if queue is empty
     */
    get isEmpty(): boolean;
    /**
     * Is queue full? Returns _false_ if no capacity has been set
     */
    get isFull(): boolean;
    /**
     * Number of items in queue
     */
    get length(): number;
    /**
     * Returns front of queue (oldest item), or _undefined_ if queue is empty
     */
    get peek(): V | undefined;
    /**
     * Returns a copy of data in queue as an array
     */
    toArray(): Array<V>;
}

/**
 * Simple priority queue implementation.
 * Higher numbers mean higher priority.
 *
 * ```js
 * const pm = new PriorityMutable();
 *
 * // Add items with a priority (higher numeric value = higher value)
 * pm.enqueueWithPriority(`hello`, 4);
 * pm.enqueueWithPriotity(`there`, 1);
 *
 * ```
 */
declare class PriorityMutable<V> extends QueueMutable<PriorityItem<V>> implements IPriorityQueueMutable<V> {
    constructor(opts?: QueueOpts<PriorityItem<V>>);
    /**
     * Adds an item with a given priority
     * @param item Item
     * @param priority Priority (higher numeric value means higher priority)
     */
    enqueueWithPriority(item: V, priority: number): void;
    changePriority(item: V, priority: number, addIfMissing?: boolean, eq?: IsEqual<V>): void;
    dequeueMax(): V | undefined;
    dequeueMin(): V | undefined;
    peekMax(): V | undefined;
    peekMin(): V | undefined;
}
/**
 * Creates a {@link PriorityMutable} queue.
 *
 * Options:
 * * eq: Equality function
 * * capacity: limit on number of items
 * * discardPolicy: what to do if capacity is reached
 * @param opts
 * @returns
 */
declare function priority<V>(opts?: QueueOpts<PriorityItem<V>>): IPriorityQueueMutable<V>;

declare class QueueImmutable<V> implements IQueueImmutable<V> {
    #private;
    readonly opts: QueueOpts<V>;
    /**
     * Creates an instance of Queue.
     * @param {QueueOpts} opts Options foor queue
     * @param {V[]} data Initial data. Index 0 is front of queue
     */
    constructor(opts?: QueueOpts<V>, data?: ReadonlyArray<V>);
    forEach(fn: (v: V) => void): void;
    forEachFromFront(fn: (v: V) => void): void;
    enqueue(...toAdd: ReadonlyArray<V> | Array<V>): QueueImmutable<V>;
    dequeue(): QueueImmutable<V>;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get length(): number;
    get peek(): V | undefined;
    toArray(): V[];
}
/**
 * Returns an immutable queue. Queues are useful if you want to treat 'older' or 'newer'
 * items differently. _Enqueing_ adds items at the back of the queue, while
 * _dequeing_ removes items from the front (ie. the oldest).
 *
 * ```js
 * import { Queues } from "https://unpkg.com/ixfx/dist/collections.js"
 * let q = Queues.immutable();           // Create
 * q = q.enqueue(`a`, `b`);   // Add two strings
 * const front = q.peek();    // `a` is at the front of queue (oldest)
 * q = q.dequeue();           // q now just consists of `b`
 * ```
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = Queues.immutable({capacity: 5, discardPolicy: `newer`});
 * ```
 *
 * @typeParam V - Type of values stored
 * @param options
 * @param startingItems Index 0 is the front of the queue
 * @returns A new queue
 */
declare const immutable: <V>(options?: QueueOpts<V>, ...startingItems: ReadonlyArray<V>) => IQueueImmutable<V>;

/**
 * Changes to `queue` are output as a responsive stream.
 * The stream emits the full data of the queue (first item being the head of the queue)
 * whenever there is an enqueue, remove or clear operation.
 *
 * ```js
 * const queue = new QueueMutable();
 * const r = asResponsive(queue);
 * r.onValue(v => {
 *  // v is an array of values
 * });
 *
 *
 * Calling `set()` on the stream enqueues data to the wrapped queue.
 * ```js
 * r.set([ `1, `2` ]); // Enqueues 1, 2
 * ```
 * @param queue
 * @returns
 */
declare function asResponsive<T>(queue: IQueueMutableWithEvents<T>): {
    set: (data: Array<T>) => void;
    on(handler: (value: Passed<readonly T[]>) => void): Unsubscriber;
    onValue(handler: (value: readonly T[]) => void): Unsubscriber;
    dispose(reason: string): void;
    isDisposed(): boolean;
};

type index_IPriorityQueueMutable<V> = IPriorityQueueMutable<V>;
type index_IQueueImmutable<V> = IQueueImmutable<V>;
declare const index_IQueueMutable: typeof IQueueMutable;
declare const index_IQueueMutableWithEvents: typeof IQueueMutableWithEvents;
type index_PriorityItem<V> = PriorityItem<V>;
type index_PriorityMutable<V> = PriorityMutable<V>;
declare const index_PriorityMutable: typeof PriorityMutable;
declare const index_QueueDiscardPolicy: typeof QueueDiscardPolicy;
declare const index_QueueMutableEvents: typeof QueueMutableEvents;
declare const index_QueueOpts: typeof QueueOpts;
declare const index_asResponsive: typeof asResponsive;
declare const index_immutable: typeof immutable;
declare const index_mutable: typeof mutable;
declare const index_priority: typeof priority;
declare namespace index {
  export { type index_IPriorityQueueMutable as IPriorityQueueMutable, type index_IQueueImmutable as IQueueImmutable, index_IQueueMutable as IQueueMutable, index_IQueueMutableWithEvents as IQueueMutableWithEvents, type index_PriorityItem as PriorityItem, index_PriorityMutable as PriorityMutable, index_QueueDiscardPolicy as QueueDiscardPolicy, index_QueueMutableEvents as QueueMutableEvents, index_QueueOpts as QueueOpts, index_asResponsive as asResponsive, index_immutable as immutable, index_mutable as mutable, index_priority as priority };
}

export { type IPriorityQueueMutable as I, type PriorityItem as P, QueueImmutable as Q, immutable as a, type IQueueImmutable as b, PriorityMutable as c, asResponsive as d, index as i, priority as p };
