import { S as SimpleEventEmitter } from './Events-b4b55fba.js';
import { I as IsEqual } from './Util-640f64a7.js';

interface IMapOf<V> {
    /**
     * Iterates over all keys
     */
    keys(): IterableIterator<string>;
    /**
     * Iterates over all values stored under `key`
     * @param key
     */
    values(key: string): IterableIterator<V>;
    /**
     * Iterates over key-value pairs.
     * Unlike a normal map, the same key may appear several times.
     */
    entriesFlat(): IterableIterator<readonly [key: string, value: V]>;
    /**
     * Iteates over all keys and the count of values therein
     */
    keysAndCounts(): IterableIterator<readonly [string, number]>;
    /**
     * Returns _true_ if `value` is stored under `key`.
     *
     * @param key Key
     * @param value Value
     */
    hasKeyValue(key: string, value: V, eq: IsEqual<V>): boolean;
    /**
     * Returns _true_ if `key` has any values
     * @param key
     */
    has(key: string): boolean;
    /**
     * Returns _true_ if the map is empty
     */
    get isEmpty(): boolean;
    /**
     * Returns the length of the longest child item
     */
    /**
     * Returns the number of values stored under `key`, or _0_ if `key` is not present.
     * @param key Key
     */
    count(key: string): number;
}

/**
 * The circular array is immutable. It keeps up to `capacity` items.
 * Old items are overridden with new items.
 *
 * `CircularArray` extends the regular JS array. Only use `add` to change the array if you want
 * to keep the `CircularArray` behaviour.
 * @example
 * ```js
 * let a = circularArray(10);
 * a = a.add(`hello`); // Because it's immutable, capture the return result of `add`
 * a.isFull;  // True if circular array is full
 * a.pointer; // The current position in array it will write to
 * ```
 * @class CircularArray
 * @extends {Array}
 * @template V
 */
interface ICircularArray<V> extends Array<V> {
    /**
     * Returns true if the array has filled to capacity and is now
     * recycling array indexes.
     */
    get isFull(): boolean;
    /**
     * Returns a new Circular with item added
     *
     * Items are added at `pointer` position, which automatically cycles through available array indexes.
     *
     * @param {V} thing Thing to add
     * @returns {Circular<V>} Circular with item added
     * @memberof Circular
     */
    add(v: V): ICircularArray<V>;
    get length(): number;
    /**
     * Returns the current add position of array.
     */
    get pointer(): number;
}
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
 * a.forEach(item => // do something with item);
 * ```
 * @param capacity Maximum capacity before recycling array entries
 * @return Circular array
 */
declare const circularArray: <V>(capacity: number) => ICircularArray<V>;

type StackDiscardPolicy = `older` | `newer` | `additions`;
type StackOpts = {
    readonly debug?: boolean;
    readonly capacity?: number;
    readonly discardPolicy?: StackDiscardPolicy;
};
/**
 * Stack (mutable)
 *
 * @example Overview
 * ```
 * stack.push(item); // Add one or more items to the top of the stack
 * stack.pop(); // Removes and retiurns the item at the top of the stack (ie the newest thing)
 * stack.peek; // Return what is at the top of the stack or undefined if empty
 * stack.isEmpty/.isFull;
 * stack.length; // How many items in stack
 * stack.data; // Get the underlying array
 * ```
 *
 * @example
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
 * @template V
 */
interface StackMutable<V> extends StackBase<V> {
    /**
     * Add items to the 'top' of the stack.
     *
     * @param toAdd Items to add.
     * @returns How many items were added
     */
    push(...toAdd: ReadonlyArray<V>): number;
    /**
     * Remove and return item from the top of the stack, or _undefined_ if empty.
     * If you just want to find out what's at the top, use {@link peek}.
     */
    pop(): V | undefined;
}
/**
 * Stack (immutable)
 *
 * @example Overview
 * ```js
 * stack.push(item); // Return a new stack with item(s) added
 * stack.pop();      // Return a new stack with top-most item removed (ie. newest)
 * stack.peek;       // Return what is at the top of the stack or undefined if empty
 * stack.isEmpty;
 * stack.isFull;
 * stack.length;     // How many items in stack
 * stack.data;       // Get the underlying array
 * ```
 *
 * @example
 * ```js
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
interface Stack<V> extends StackBase<V> {
    push(...toAdd: ReadonlyArray<V>): Stack<V>;
    pop(): Stack<V>;
}
interface StackBase<V> {
    /**
     * Enumerates stack from bottom-to-top
     *
     */
    forEach(fn: (v: V) => void): void;
    /**
     * Enumerates stack from top-to-bottom
     * @param fn
     */
    forEachFromTop(fn: (v: V) => void): void;
    get data(): readonly V[];
    /**
     * _True_ if stack is empty
     */
    get isEmpty(): boolean;
    /**
     * _True_ if stack is at its capacity. _False_ if not, or if there is no capacity.
     */
    get isFull(): boolean;
    /**
     * Get the item at the top of the stack without removing it (like `pop` would do)
     * @returns Item at the top of the stack, or _undefined_ if empty.
     */
    get peek(): V | undefined;
    /**
     * Number of items in stack
     */
    get length(): number;
}
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
declare const stack: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => Stack<V>;
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

type Stack$1_Stack<V> = Stack<V>;
type Stack$1_StackBase<V> = StackBase<V>;
type Stack$1_StackDiscardPolicy = StackDiscardPolicy;
type Stack$1_StackMutable<V> = StackMutable<V>;
type Stack$1_StackOpts = StackOpts;
declare const Stack$1_stack: typeof stack;
declare const Stack$1_stackMutable: typeof stackMutable;
declare namespace Stack$1 {
  export {
    Stack$1_Stack as Stack,
    Stack$1_StackBase as StackBase,
    Stack$1_StackDiscardPolicy as StackDiscardPolicy,
    Stack$1_StackMutable as StackMutable,
    Stack$1_StackOpts as StackOpts,
    Stack$1_stack as stack,
    Stack$1_stackMutable as stackMutable,
  };
}

interface IMapOfMutable<V> extends IMapOf<V> {
    /**
     * Returns list of keys
     */
    /**
     * Iterates over key-value pairs.
     * Unlike a normal map, the same key may appear several times.
     */
    /**
     * Returns a list of all keys and count of items therein
     */
    /**
     * Returns items under `key` or an empty array if `key` is not found
     * @param key
     */
    /**
     * Returns _true_ if `value` is stored under `key`.
     *
     * @param key Key
     * @param value Value
     */
    /**
     * Returns _true_ if `key` is stored
     * @param key
     */
    /**
     * Adds several `values` under the same `key`. Duplicate values are permitted, depending on implementation.
     * @param key
     * @param values
     */
    addKeyedValues(key: string, ...values: ReadonlyArray<V>): void;
    /**
     * Adds a value, automatically extracting a key via the
     * `groupBy` function assigned in the constructor options.
     * @param values Adds several values
     */
    addValue(...values: ReadonlyArray<V>): void;
    /**
     * Clears the map
     */
    clear(): void;
    /**
     * Deletes all values under `key` that match `value`.
     * @param key Key
     * @param value Value
     */
    deleteKeyValue(key: string, value: V): boolean;
    /**
     * Delete all occurrences of `value`, regardless of
     * key it is stored under.
     * Returns _true_ if something was deleted.
     * @param value
     */
    deleteByValue(value: V): boolean;
    /**
     * Deletes all values stored under `key`. Returns _true_ if key was found
     * @param key
     */
    delete(key: string): boolean;
}

/**
 * Events from mapArray
 */
type MapArrayEvents<V> = {
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
/**
 * Like a `Map` but multiple values can be stored for each key.
 * Duplicate values can be added to the same or even a several keys.
 *
 * Three pre-defined MapOf's are available:
 * * {@link ofArrayMutable} - Map of arrays
 * * {@link ofSetMutable} - Map of unique items
 * * {@link ofCircularMutable} - Hold a limited set of values per key
 *
 * Adding
 * ```js
 * // Add one or more values using the predefined key function to generate a key
 * map.addValue(value1, value2, ...);
 * // Add one or more values under a specified key
 * map.addKeyedValues(key, value1, value2, ...);
 * ```
 *
 * Finding/accessing
 * ```js
 * // Returns all values stored under key
 * map.get(key);
 * // Returns the first key where value is found, or _undefined_ if not found
 * map.findKeyForValue(value);
 * // Returns _true_  if value is stored under key
 * map.hasKeyValue(key, value);
 * // Returns _true_ if map contains key
 * map.has(key);
 * ```
 *
 * Removing
 * ```js
 * // Removes everything
 * map.clear();
 * // Delete values under key. Returns _true_ if key was found.
 * map.delete(key);
 * // Deletes specified value under key. Returns _true_ if found.
 * map.deleteKeyValue(key, value);
 * ```
 *
 * Metadata about the map:
 * ```js
 * map.isEmpty;         // True/false
 * map.lengthMax;       // Largest count of items under any key
 * map.count(key);      // Count of items stored under key, or 0 if key is not present.
 * map.keys();          // Returns a string array of keys
 * map.keysAndCounts(); // Returns an array of [string,number] for all keys and number of values for each key
 * map.debugString();   // Returns a human-readable string dump of the contents
 * ```
 *
 * Events can be listened to via `addEventListener`
 * * `addedKey`, `addedValue` - when a new key is added, or when a new value is added
 * * `clear` - when contents are cleared
 * * `deleteKey` - when a key is deleted
 *
 * @example Event example
 * ```js
 * map.addEventLister(`addedKey`, ev => {
 *  // New key evt.key seen.
 * });
 * ```
 *
 * @template V Values stored under keys
 * @template M Type of data structure managing values
 */
interface IMapOfMutableExtended<V, M> extends SimpleEventEmitter<MapArrayEvents<V>>, IMapOfMutable<V> {
    /**
     * Returns the object managing values under the specified `key`
     * @private
     * @param key
     */
    getSource(key: string): M | undefined;
    /**
     * Returns the type name. For in-built implementations, it will be one of: array, set or circular
     */
    get typeName(): string;
    /**
     * Returns a human-readable rendering of contents
     */
    debugString(): string;
}

export { ICircularArray as I, MapArrayEvents as M, Stack$1 as S, stackMutable as a, IMapOfMutableExtended as b, circularArray as c, IMapOfMutable as d, IMapOf as e, Stack as f, stack as s };
