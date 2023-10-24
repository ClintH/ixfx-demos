import { I as IQueueMutable, a as QueueOpts, b as QueueDiscardPolicy, m as mutable } from './QueueMutable-a55e58f6.js';

/**
 * Queue (immutable). See also {@link ./QueueMutable.ts}.
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
     * Returns a new queue with items added
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
     * Data in queue as an array
     */
    get data(): readonly V[];
}

type PriorityItem<V> = Readonly<{
    item: V;
    priority: number;
}>;
interface IPriorityQueueMutable<V> extends IQueueMutable<PriorityItem<V>> {
    dequeueMax(): V | undefined;
    dequeueMin(): V | undefined;
    peekMax(): V | undefined;
    peekMin(): V | undefined;
}

declare class QueueImmutable<V> implements IQueueImmutable<V> {
    readonly opts: QueueOpts<V>;
    readonly data: ReadonlyArray<V>;
    /**
     * Creates an instance of Queue.
     * @param {QueueOpts} opts Options foor queue
     * @param {V[]} data Initial data. Index 0 is front of queue
     * @memberof Queue
     */
    constructor(opts?: QueueOpts<V>, data?: ReadonlyArray<V>);
    forEach(fn: (v: V) => void): void;
    forEachFromFront(fn: (v: V) => void): void;
    enqueue(...toAdd: ReadonlyArray<V>): QueueImmutable<V>;
    dequeue(): QueueImmutable<V>;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get length(): number;
    get peek(): V | undefined;
}
/**
 * Returns an immutable queue. Queues are useful if you want to treat 'older' or 'newer'
 * items differently. _Enqueing_ adds items at the back of the queue, while
 * _dequeing_ removes items from the front (ie. the oldest).
 *
 * ```js
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
 * @template V Data type of items
 * @param opts
 * @param startingItems Index 0 is the front of the queue
 * @returns A new queue
 */
declare const immutable: <V>(opts?: QueueOpts<V>, ...startingItems: readonly V[]) => IQueueImmutable<V>;

declare function priority<V>(opts?: QueueOpts<PriorityItem<V>>): IPriorityQueueMutable<V>;

type index_IPriorityQueueMutable<V> = IPriorityQueueMutable<V>;
type index_IQueueImmutable<V> = IQueueImmutable<V>;
declare const index_IQueueMutable: typeof IQueueMutable;
declare const index_QueueDiscardPolicy: typeof QueueDiscardPolicy;
declare const index_QueueOpts: typeof QueueOpts;
declare const index_immutable: typeof immutable;
declare const index_mutable: typeof mutable;
declare const index_priority: typeof priority;
declare namespace index {
  export {
    index_IPriorityQueueMutable as IPriorityQueueMutable,
    index_IQueueImmutable as IQueueImmutable,
    index_IQueueMutable as IQueueMutable,
    index_QueueDiscardPolicy as QueueDiscardPolicy,
    index_QueueOpts as QueueOpts,
    index_immutable as immutable,
    index_mutable as mutable,
    index_priority as priority,
  };
}

export { IQueueImmutable as I, QueueImmutable as Q, IPriorityQueueMutable as a, immutable as b, index as i, priority as p };
