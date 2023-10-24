import { I as IsEqual } from './IsEqual-267e4380.js';

type QueueDiscardPolicy = `older` | `newer` | `additions`;
/**
 * Queue options.
 *
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = Queues.mutable({capacity: 5, discardPolicy: `newer`});
 * ```
 */
type QueueOpts<V> = {
    readonly eq?: IsEqual<V>;
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
    readonly discardPolicy?: QueueDiscardPolicy;
};

/**
 * Queue (mutable). See also {@link IQueueImmutable} for the immutable version.
 *
 * Queues are useful if you want to treat 'older' or 'newer'
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
 */
interface IQueueMutable<V> {
    /**
     * Returns true if queue is empty
     */
    get isEmpty(): boolean;
    /**
     * Dequeues (removes oldest item / item at front of queue)
     * @returns Item, or undefined if queue is empty
     */
    readonly dequeue: () => V | undefined;
    /**
     * Enqueues (adds items to back of queue).
     * If a capacity is set, not all items might be added.
     * @returns How many items were added
     */
    readonly enqueue: (...toAdd: ReadonlyArray<V>) => number;
    /**
     * Returns front of queue (oldest item), or _undefined_ if queue is empty
     */
    get peek(): V | undefined;
    /**
     * Number of items in queue
     */
    get length(): number;
    /**
     * Is queue full? Returns _false_ if no capacity has been set
     */
    get isFull(): boolean;
    /**
     * Data in queue as an array
     */
    get data(): ReadonlyArray<V>;
    clear(): void;
}

/**
 * Returns a mutable queue. Queues are useful if you want to treat 'older' or 'newer'
 * items differently. _Enqueing_ adds items at the back of the queue, while
 * _dequeing_ removes items from the front (ie. the oldest).
 *
 * ```js
 * const q = Queues.mutable();       // Create
 * q.enqueue(`a`, `b`);     // Add two strings
 * const front = q.dequeue();  // `a` is at the front of queue (oldest)
 * ```
 *
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = Queues.mutable({capacity: 5, discardPolicy: `newer`});
 * ```
 *
 * @template V Data type of items
 * @param opts
 * @param startingItems Items are added in array order. So first item will be at the front of the queue.
 */
declare class QueueMutable<V> implements IQueueMutable<V> {
    readonly opts: QueueOpts<V>;
    data: ReadonlyArray<V>;
    eq: IsEqual<V>;
    constructor(opts?: QueueOpts<V>, data?: ReadonlyArray<V>);
    clear(): void;
    /**
     * Return a copy of the array
     * @returns
     */
    toArray(): V[];
    enqueue(...toAdd: ReadonlyArray<V>): number;
    dequeue(): V | undefined;
    /**
     * Remove item from queue, regardless of position.
     * Returns _true_ if something was removed.
     * @param v
     */
    remove(v: V, comparer?: IsEqual<V>): boolean;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get length(): number;
    get peek(): V | undefined;
}
declare function mutable<V>(opts?: QueueOpts<V>, ...startingItems: ReadonlyArray<V>): IQueueMutable<V>;

export { IQueueMutable as I, QueueMutable as Q, QueueOpts as a, QueueDiscardPolicy as b, mutable as m };
