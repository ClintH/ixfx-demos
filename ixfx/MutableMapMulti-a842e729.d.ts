import { S as SimpleEventEmitter } from './Events-faeaa6ab';
import { T as ToString, I as IsEqual } from './util-a1962ea6';

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

/**
 * The circular array grows to a fixed size. Once full, new
 * items replace the oldest item in the array. Immutable.
 *
 * Usage:
 * ```
 * let a = new Circular(10);
 * let b = a.add(something);
 * ```
 * @class CircularArray
 * @extends {Array}
 * @template V
 */
declare class MutableCircularArray<V> extends Array {
    #private;
    constructor(capacity: number);
    /**
     * Returns a new Circular with item added
     *
     * @param {V} thing Thing to add
     * @returns {Circular<V>} Circular with item added
     * @memberof Circular
     */
    add(thing: V): MutableCircularArray<V>;
    get pointer(): number;
    get isFull(): boolean;
}
/**
 * Returns a new mutable circular array
 *
 * @template V
 * @param {number} capacity
 * @return {*}  {CircularArray<V>}
 */
declare const mutableCircularArray: <V>(capacity: number) => MutableCircularArray<V>;

declare type MapMultiOpts<V> = {
    /**
     * Returns true if two values should be considered equal.
     *
     * @type {(IsEqual<V>|undefined)}
     */
    /**
     * Returns a group for values added via `addValue`. Eg. maybe you want to
     * group values in the shape `{name: 'Samantha' city: 'Copenhagen'}` by city:
     *
     * ```
     * const opts = {
     *  groupBy: (v) => v.city
     * }
     * ```
     *
     * @type {(ToString<V>|undefined)}
     */
    readonly groupBy?: ToString<V> | undefined;
};
declare type MutableMapArrayEvents<V> = {
    readonly addedValues: {
        readonly values: ReadonlyArray<V>;
    };
    readonly addedKey: {
        readonly key: string;
    };
    readonly clear: boolean;
    readonly deleteKey: {
        readonly key: string;
    };
};
declare type MultiValue<V, M> = Readonly<{
    has(source: M, value: V): boolean;
    add(destination: M | undefined, values: ReadonlyArray<V>): M;
    toArray(source: M): ReadonlyArray<V> | undefined;
    find(source: M, predicate: (v: V) => boolean): V | unknown;
    filter(source: M, predicate: (v: V) => boolean): ReadonlyArray<V>;
    without(source: M, value: V): ReadonlyArray<V>;
    count(source: M): number;
}>;
/**
 * Like a `Map` but multiple values can be stored for each key.
 * Duplicate values can be added to the same or even a several keys.
 *
 * By default, equality is based on value rather than reference.
 *
 * @export
 * @class MutableMapMulti
 * @template V
 */
declare class MutableMapOf<V, M> extends SimpleEventEmitter<MutableMapArrayEvents<V>> {
    #private;
    readonly groupBy: ToString<V>;
    readonly type: MultiValue<V, M>;
    /**
     * Constructor.
     *
     * By default it will group by the string representation of values and use
     * reference matching for values.
     * @param {MapMultiOpts<V>} [opts={}]
     * @memberof MutableMapMulti
     */
    constructor(type: MultiValue<V, M>, opts?: MapMultiOpts<V>);
    debugString(): string;
    /**
     * Returns true if the map is empty
     *
     * @readonly
     * @type {boolean}
     * @memberof MutableMapMulti
     */
    get isEmpty(): boolean;
    /**
     * Clears the map
     *
     * @memberof MutableMapMulti
     */
    clear(): void;
    /**
     * Adds several values under the same key. Duplicate values are permitted.
     *
     * @param {string} key Key for values
     * @param {...V[]} value Values
     * @memberof MapMulti
     */
    addKeyedValues(key: string, ...values: ReadonlyArray<V>): void;
    /**
     * Adds a value, automatically extracting a key via the
     * `groupBy` function assigned in the constructor options.
     *
     * @param {V} values
     * @memberof MutableMapArray
     */
    addValue(...values: ReadonlyArray<V>): void;
    /**
     * Returns true if `value` is stored under `key`.
     *
     * By default values are compared by value, not reference.
     *
     * @param {string} key
     * @param {V} value
     * @return {*}  {boolean}
     * @memberof MutableMapArray
     */
    hasKeyValue(key: string, value: V): boolean;
    has(key: string): boolean;
    /**
     * Deletes all values under the specified key that match the given value.
     *
     * @param {string} key
     * @param {V} value
     * @return {*}
     * @memberof MutableMapArray
     */
    deleteKeyValue(key: string, value: V): void;
    delete(key: string): boolean;
    /**
     * Deletes all occurences of `value` regardless of key
     *
     * @param {V} value
     * @memberof MapMulti
     */
    /**
     * Finds the first key where value is stored.
     * Note: value could be stored in multiple keys
     *
     * @param {V} value
     * @returns {(string | undefined)}
     * @memberof MapMulti
     */
    findKeyForValue(value: V): string | undefined;
    /**
     * Returns the number of values stored under `key`, or 0 if key is not present.
     *
     * @param {string} key
     * @return {*}  {number}
     * @memberof MutableMapArray
     */
    count(key: string): number;
    /**
     * Returns the array of values stored under `key`
     * or undefined if key does not exist
     *
     * @param {string} key
     * @return {*}  {readonly}
     * @memberof MutableMapArray
     */
    get(key: string): readonly V[] | undefined;
    getSource(key: string): M | undefined;
    keys(): string[];
    keysAndCounts(): Array<[string, number]>;
    merge(other: MutableMapOf<V, M>): void;
}
declare type MapArrayOpts<V> = MapMultiOpts<V> & {
    readonly comparer?: IsEqual<V>;
    readonly toString?: ToString<V>;
};
declare const mutableMapArray: <V>(opts?: MapArrayOpts<V>) => MutableMapOf<V, readonly V[]>;
declare type MapSetOpts<V> = MapMultiOpts<V> & {
    readonly hash: ToString<V>;
};
declare const mutableMapSet: <V>(opts?: MapSetOpts<V> | undefined) => MutableMapOf<V, ReadonlyMap<string, V>>;
declare type MapCircularOpts<V> = MapMultiOpts<V> & {
    readonly capacity: number;
};
declare const mutableMapCircular: <V>(opts: MapCircularOpts<V>) => MutableMapOf<V, MutableCircularArray<V>>;

export { MutableMapOf as M, Stack as S, MutableCircularArray as a, mutableMapCircular as b, mutableMapArray as c, mutableCircularArray as d, stackMutable as e, mutableMapSet as m, stack as s };
