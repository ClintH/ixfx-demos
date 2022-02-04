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
declare type StackOpts = {
    readonly debug?: boolean;
    readonly capacity?: number;
    readonly overflowPolicy?: OverflowPolicy;
};
/**
 * Immutable stack
 * `Push` & `pop` both return a new instance, the original is never modified.
 *
 * Usage:
 * ```
 * push(item);  // Return a new stack with item(s) added
 * pop();       // Return a new stack with top-most item removed (ie. newest)
 * .peek;       // Return what is at the top of the stack or undefined if empty
 * .isEmpty/.isFull;
 * .length;     // How many items in stack
 * .data;       // Get the underlying array
 * ```
 *
 * Example
 * ```
 * let sanga = new Stack();
 * sanga = sanga.push(`bread`, `tomato`, `cheese`);
 * sanga.peek;  // `cheese`
 * sanga = sanga.pop(); // removes `cheese`
 * sanga.peek;  // `tomato`
 * const sangaAlt = sanga.push(`lettuce`, `cheese`); // sanga stays [`bread`, `tomato`], while sangaAlt is [`bread`, `tomato`, `lettuce`, `cheese`]
 * ```
 *
 * Stack can also be created from the basis of an existing array. First index of array will be the bottom of the stack.
 * @class Stack
 * @template V
 */
declare class Stack<V> {
    readonly opts: StackOpts;
    readonly data: ReadonlyArray<V>;
    constructor(opts: StackOpts, data: ReadonlyArray<V>);
    push(...toAdd: ReadonlyArray<V>): Stack<V>;
    pop(): Stack<V>;
    /**
     * Enumerates stack from bottom-to-top
     *
     * @param {(v:V) => void} fn
     * @memberof Stack
     */
    forEach(fn: (v: V) => void): void;
    forEachFromTop(fn: (v: V) => void): void;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get peek(): V | undefined;
    get length(): number;
}
/**
 * Returns an immutable stack
 *
 * @template V
 * @param {StackOpts} [opts={}]
 * @param {...V[]} startingItems
 * @returns {Stack<V>}
 */
declare const stack: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => Stack<V>;
/**
 * Mutable stack
 *
 * Usage:
 * ```
 * push(item); // Add one or more items to the top of the stack
 * pop(); // Removes and retiurns the item at the top of the stack (ie the newest thing)
 * .peek; // Return what is at the top of the stack or undefined if empty
 * .isEmpty/.isFull;
 * .length; // How many items in stack
 * .data; // Get the underlying array
 * ```
 *
 * Example
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
 * @class MutableStack
 * @template V
 */
declare class MutableStack<V> {
    readonly opts: StackOpts;
    data: ReadonlyArray<V>;
    constructor(opts: StackOpts, data: ReadonlyArray<V>);
    push(...toAdd: ReadonlyArray<V>): number;
    pop(): V | undefined;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get peek(): V | undefined;
    get length(): number;
}
/**
 * Creates a mutable stack
 *
 * @template V
 * @param {StackOpts} opts
 * @param {...V[]} startingItems
 * @returns
 */
declare const stackMutable: <V>(opts: StackOpts, ...startingItems: readonly V[]) => MutableStack<V>;

export { OverflowPolicy as O, Stack as S, stackMutable as a, stack as s };
