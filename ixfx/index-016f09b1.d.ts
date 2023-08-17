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
    get data(): readonly V[];
}

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

declare class QueueImmutable<V> implements IQueueImmutable<V> {
    readonly opts: QueueOpts;
    readonly data: ReadonlyArray<V>;
    /**
     * Creates an instance of Queue.
     * @param {QueueOpts} opts Options foor queue
     * @param {V[]} data Initial data. Index 0 is front of queue
     * @memberof Queue
     */
    constructor(opts?: QueueOpts, data?: ReadonlyArray<V>);
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
declare const immutable: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => IQueueImmutable<V>;

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
    readonly opts: QueueOpts;
    data: ReadonlyArray<V>;
    constructor(opts?: QueueOpts, data?: ReadonlyArray<V>);
    enqueue(...toAdd: ReadonlyArray<V>): number;
    dequeue(): V | undefined;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get length(): number;
    get peek(): V | undefined;
}
declare function mutable<V>(opts?: QueueOpts, ...startingItems: ReadonlyArray<V>): IQueueMutable<V>;

type QueueDiscardPolicy = `older` | `newer` | `additions`;
/**
 * Queue options.
 *
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = Queues.mutable({capacity: 5, discardPolicy: `newer`});
 * ```
 */
type QueueOpts = {
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

type index_IQueueImmutable<V> = IQueueImmutable<V>;
type index_IQueueMutable<V> = IQueueMutable<V>;
type index_QueueDiscardPolicy = QueueDiscardPolicy;
type index_QueueOpts = QueueOpts;
declare const index_immutable: typeof immutable;
declare const index_mutable: typeof mutable;
declare namespace index {
  export {
    index_IQueueImmutable as IQueueImmutable,
    index_IQueueMutable as IQueueMutable,
    index_QueueDiscardPolicy as QueueDiscardPolicy,
    index_QueueOpts as QueueOpts,
    index_immutable as immutable,
    index_mutable as mutable,
  };
}

export { IQueueMutable as I, QueueMutable as Q, QueueImmutable as a, QueueDiscardPolicy as b, QueueOpts as c, IQueueImmutable as d, immutable as e, index as i, mutable as m };
