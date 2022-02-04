import { s as stack, a as stackMutable, O as OverflowPolicy$1 } from './Stack-421e6250';
import { I as IsEqual } from './util-2bc3f13f';

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

declare const Lists_stack: typeof stack;
declare const Lists_stackMutable: typeof stackMutable;
declare const Lists_queue: typeof queue;
declare const Lists_queueMutable: typeof queueMutable;
declare const Lists_guardArray: typeof guardArray;
declare const Lists_randomIndex: typeof randomIndex;
declare const Lists_randomElement: typeof randomElement;
declare const Lists_randomPluck: typeof randomPluck;
declare const Lists_shuffle: typeof shuffle;
declare const Lists_without: typeof without;
declare namespace Lists {
  export {
    Lists_stack as stack,
    Lists_stackMutable as stackMutable,
    OverflowPolicy$1 as StackOverflowPolicy,
    Lists_queue as queue,
    Lists_queueMutable as queueMutable,
    OverflowPolicy as QueueOverflowPolicy,
    Lists_guardArray as guardArray,
    Lists_randomIndex as randomIndex,
    Lists_randomElement as randomElement,
    Lists_randomPluck as randomPluck,
    Lists_shuffle as shuffle,
    Lists_without as without,
  };
}

export { Lists as L, randomElement as r };
