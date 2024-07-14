import { S as SimpleEventEmitter } from './Events-MevXuVvQ.js';
import { I as IsEqual } from './IsEqual-EdZcaNvH.js';

type QueueMutableEvents<V> = {
    /**
     * Data has been added
     * * added: data attempted to be added. Note: not all of it may have been accepted into queue
     * * finalData: actual state of queue
     */
    enqueue: {
        added: ReadonlyArray<V>;
        finalData: ReadonlyArray<V>;
    };
    /**
     * Single item dequeued.
     * When dequeing the 'removed' event also fires
     */
    dequeue: {
        removed: V;
        finalData: ReadonlyArray<V>;
    };
    /**
     * One or more items removed due to dequeuing, clearing or removeWhere called
     */
    removed: {
        removed: ReadonlyArray<V>;
        finalData: ReadonlyArray<V>;
    };
};
interface IQueueMutableWithEvents<V> extends IQueueMutable<V>, SimpleEventEmitter<QueueMutableEvents<V>> {
}
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
     * Dequeues (removes oldest item / item at front of queue)
     *
     * Use {@link peek} to look at the item at front of queue without removing it.
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
   * Returns a copy of data in queue as an array
   */
    toArray(): ReadonlyArray<V>;
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
   * Returns true if queue is empty
   */
    get isEmpty(): boolean;
    /**
     * Removes values that match `predicate`.
     *
     * ```js
     * // Eg queue of strings, compare by value
     * queue.removeWhere(v => v === `someValue`);
     *
     * // Eg queue of objects, compare by reference
     * queue.removeWhere(v => v === someTarget);
     *
     * // Eg use ixfx function to compare value of objects, regardless of key ordering
     * queue.removeWhere(v => isEqualValueIgnoreOrder(v, someTarget));
     * ```
     * @param predicate
     * @returns Returns number of items removed.
     */
    removeWhere(predicate: (item: V) => boolean): number;
    /**
     * Returns the item at given rank (0 being front of queue)
     * @param index
     */
    at(index: number): V;
    /**
     * Clears the queue
     */
    clear(): void;
}

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
 * Mutable queue that fires events when manipulated.
 *
 * Queues are useful if you want to treat 'older' or 'newer'
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
 * Events can be used to monitor data flows.
 * * 'enqueue': fires when item(s) are added
 * * 'dequeue': fires when an item is dequeued from front
 * * 'removed': fires when an item is dequeued, queue is cleared or .removeWhere is used to trim queue
 *
 * Each of the event handlers return the state of the queue as the 'finalData'
 * field.
 *
 * ```js
 * q.addEventListener(`enqueue`, e => {
 *  // e.added, e.finalData
 * });
 * q.addEventListener(`removed`, e => {
 *  // e.removed, e.finalData
 * });
 * q.addEventListener(`dequeue`, e=> {
 *  // e.removed, e.finalData
 * })
 * ```
 * @template V Data type of items
 */
declare class QueueMutable<V> extends SimpleEventEmitter<QueueMutableEvents<V>> implements IQueueMutable<V> {
    readonly options: QueueOpts<V>;
    data: ReadonlyArray<V>;
    eq: IsEqual<V>;
    constructor(opts?: QueueOpts<V>, data?: ReadonlyArray<V>);
    clear(): void;
    /**
     * Called when all data is cleared
     */
    protected onClear(): void;
    at(index: number): V;
    enqueue(...toAdd: ReadonlyArray<V>): number;
    protected onEnqueue(result: ReadonlyArray<V>, attemptedToAdd: ReadonlyArray<V>): void;
    dequeue(): V | undefined;
    protected onRemoved(removed: ReadonlyArray<V>, finalData: ReadonlyArray<V>): void;
    /**
     * Removes values that match `predicate`.
     * @param predicate
     * @returns Returns number of items removed.
     */
    removeWhere(predicate: (item: V) => boolean): number;
    /**
   * Return a copy of the array
   * @returns
   */
    toArray(): Array<V>;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get length(): number;
    get peek(): V | undefined;
}
/**
 * Creates a new QueueMutable
 * @param options
 * @param startingItems
 * @returns
 */
declare function mutable<V>(options?: QueueOpts<V>, ...startingItems: ReadonlyArray<V>): IQueueMutableWithEvents<V>;

export { type IQueueMutable as I, type QueueOpts as Q, type IQueueMutableWithEvents as a, type QueueDiscardPolicy as b, QueueMutable as c, type QueueMutableEvents as d, mutable as m };
