declare module "util" {
    /**
     * Clamps a value between min and max (both inclusive)
     * Defaults to a 0-1 range, useful for percentages.
     *
     * @example Usage
     * ```js
     *  clamp(0.5);         // 0.5 - just fine, within default of 0 to 1
     *  clamp(1.5);         // 1 - above default max of 1
     *  clamp(-50, 0, 100); // 0 - below range
     *  clamp(50, 0, 50);   // 50 - within range
     * ```
     *
     * For clamping integer ranges, consider `clampZeroBounds`
     *
     * @param v Value to clamp
     * @param Minimum value (inclusive)
     * @param Maximum value (inclusive)
     * @returns Clamped value
     */
    export const clamp: (v: number, min?: number, max?: number) => number;
    /**
     * Returns a bezier interpolated value, using the given ranges
     * @param {number} value  Value to be interpolated
     * @param {number} s1 Source range start
     * @param {number} s2  Source range end
     * @param {number} t1  Target range start
     * @param {number} t2  Target range end
     * @param {number} [slope]  Weight of the curve (0.5 = linear, 0.1 = weighted near target start, 0.9 = weighted near target end)
     * @returns {number} Interpolated value
     */
    /**
     * Maps `v` from an input range to an output range.
     * For example, if a sensor's useful range is 100-500, you could
     * easily map it to a percentage:
     * ```js
     * map(sensorReading, 100, 500, 0, 1);
     * ```
     * @param v Value to map
     * @param inMin Input minimum
     * @param inMax Input maximum
     * @param outMin Output minimum
     * @param outMax Output maximum
     * @returns Mapped value
     */
    export const map: (v: number, inMin: number, inMax: number, outMin: number, outMax: number) => number;
    /**
     * Clamps integer `v` between 0 (inclusive) and length (exclusive). This is useful
     * for clamping an array range, because the largest allowed number will
     * be one less than length.
     *
     * @example Usage
     * ```js
     * const myArray = [`a`, `b`, `c`, `d`];
     * clampZeroBounds(0, myArray.length);    // 0
     * clampZeroBounds(1.2, myArray.length);  // 1
     * clampZeroBounds(4, myArray.length);    // 4
     * clampZeroBounds(5, myArray.length);    // 4
     * clampZeroBounds(-1, myArray.length);   // 0
     * ```
     *
     * Throws an error if `v` or `length` are not integers.
     * @param v Value to clamp (must be an interger)
     * @param length Length of bounds (must be an integer)
     * @returns Clamped value, minimum will be 0, maximum will be one less than `length`.
     */
    export const clampZeroBounds: (v: number, length: number) => number;
    /**
     * Lerp calculates a relative value of `amt` between `a` and `b`.
     *
     * @example Get the halfway point between 30 and 60
     * ```js
     * lerp(0.5, 30, 60);
     * ````
     *
     * Lerp is commonly used to interpolate between numbers for animation.
     * In that case, `amt` would start at 0 and you would keep `lerp`ing up to `1`
     * @example
     * ```
     * let pp = percentPingPong(0.1); // Go back and forth between 0 and 1 by 0.1
     * continuously(() => {
     *   const amt = pp.next().value;     // Get position in ping-pong
     *   let v = lerp(amt, xStart, xEnd); // Lerp between xStart and xEnd
     *  // do something with v...
     * }).start();
     * ```
     * @param amt Lerp amount, between 0 and 1 inclusive
     * @param a Start (ie when `amt` is 0)
     * @param b End (ie. when `amt` is 1)
     * @returns Lerped value which will be betewen `a` and `b`.
     */
    export const lerp: (amt: number, a: number, b: number) => number;
    /**
     * @private
     */
    export type ToString<V> = (itemToMakeStringFor: V) => string;
    /**
     * @private
     */
    export type IsEqual<V> = (a: V, b: V) => boolean;
    /**
     * Default comparer function is equiv to checking `a === b`
     * @private
     * @template V
     * @param {V} a
     * @param {V} b
     * @return {*}  {boolean}
     */
    export const isEqualDefault: <V>(a: V, b: V) => boolean;
    /**
     * Comparer returns true if string representation of `a` and `b` are equal.
     * Uses `toStringDefault` to generate a string representation (`JSON.stringify`)
     * @private
     * @template V
     * @param {V} a
     * @param {V} b
     * @return {*}  {boolean} True if the contents of `a` and `b` are equal
     */
    export const isEqualValueDefault: <V>(a: V, b: V) => boolean;
    /**
     * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
     * @private
     * @template V
     * @param {V} itemToMakeStringFor
     * @returns {string}
     */
    export const toStringDefault: <V>(itemToMakeStringFor: V) => string;
}
declare module "collections/Interfaces" {
    import { SimpleEventEmitter } from "Events";
    import { ToString, IsEqual } from "util";
    /**
     * @private
     */
    export type ArrayKeys<K, V> = ReadonlyArray<readonly [key: K, value: V]>;
    /**
     * @private
     */
    export type ObjKeys<K, V> = ReadonlyArray<{
        readonly key: K;
        readonly value: V;
    }>;
    /**
     * @private
     */
    export type EitherKey<K, V> = ArrayKeys<K, V> | ObjKeys<K, V>;
    /**
     * @private
     */
    export type MapSetOpts<V> = MapMultiOpts<V> & {
        readonly hash: ToString<V>;
    };
    /**
     * @private
     */
    export type MapCircularOpts<V> = MapMultiOpts<V> & {
        readonly capacity: number;
    };
    /**
     * @private
     */
    export type MultiValue<V, M> = Readonly<{
        has(source: M, value: V): boolean;
        add(destination: M | undefined, values: ReadonlyArray<V>): M;
        toArray(source: M): ReadonlyArray<V> | undefined;
        find(source: M, predicate: (v: V) => boolean): V | unknown;
        filter(source: M, predicate: (v: V) => boolean): ReadonlyArray<V>;
        without(source: M, value: V): ReadonlyArray<V>;
        count(source: M): number;
    }>;
    /**
     * @private
     */
    export type MapMultiOpts<V> = {
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
    /**
     * @private
     */
    export type MapArrayOpts<V> = MapMultiOpts<V> & {
        readonly comparer?: IsEqual<V>;
        readonly toString?: ToString<V>;
    };
    /**
     * @private
     */
    export type ValueSetEventMap<V> = {
        readonly add: {
            readonly value: V;
            readonly updated: boolean;
        };
        readonly clear: boolean;
        readonly delete: V;
    };
    export type DiscardPolicy = `older` | `newer` | `additions`;
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
     * const front = q.peek();    // `a` is at the front of queue (oldest)
     * q = q.dequeue();           // q now just consists of `b`
     * ```
     * @example Cap size to 5 items, throwing away newest items already in queue.
     * ```js
     * const q = queue({capacity: 5, discardPolicy: `newer`});
     * ```
     *
     */
    export interface Queue<V> {
        /**
         * Returns a new queue with items added
         * @param toAdd Items to add
         */
        enqueue(...toAdd: ReadonlyArray<V>): Queue<V>;
        /**
         * Dequeues (removes oldest item / item at front of queue).
         * Use {@link peek} to get item that will be removed.
         *
         * @returns Queue with item removed
         */
        dequeue(): Queue<V>;
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
    /**
     * Queue (mutable). See also {@link Queue} for the immutable version.
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
    export interface QueueMutable<V> {
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
     * A set which stores unique items, determined by their value, rather
     * than object reference. Create with {@link setMutable}. Mutable.
     *
     * By default the JSON.stringify() representation is used to compare
     * objects.
     *
     * It fires `add`, `clear` and `delete` events.
     *
     * Overview of functions
     * ```js
     * const s = setMutable();
     * s.add(item);    // Add one or more items. Items with same key are overriden.
     * s.has(item);    // Returns true if item *value* is present
     * s.clear();      // Remove everything
     * s.delete(item); // Delete item by value
     * s.toArray();    // Returns values as an array
     * s.values();     // Returns an iterator over values
     * ```
     *
     * Usage
     * ```js
     * const people = [
     *  {name: `Barry`, city: `London`}
     *  {name: `Sally`, city: `Bristol`}
     * ];
     * const set = setMutable(person => {
     *  // Key person objects by name and city (assi)
     *  return `${person.name}-${person.city}`
     * });
     * set.add(...people);
     *
     * set.has({name:`Barry`, city:`Manchester`})); // False, key is different (Barry-Manchester)
     * set.has({name:`Barry`, city:`London`}));     // True, we have Barry-London as a key
     * set.has(people[1]);   // True, key of object is found (Sally-Bristol)
     * ```
     *
     * Events
     * ```js
     * set.addEventListener(`add`, ev => {
     *  console.log(`New item added: ${ev.value}`);
     * });
     * ```
     *
     * @template V Type of data stored
     */
    export interface SetMutable<V> extends SimpleEventEmitter<ValueSetEventMap<V>> {
        /**
         * Add `values` to set
         * @param v
         */
        add(...values: ReadonlyArray<V>): void;
        /**
         * Iterate over values
         * ```js
         * for (let value of set.values()) {
         *  // use value...
         * }
         * ```
         */
        values(): IterableIterator<V>;
        /**
         * Clears set
         */
        clear(): void;
        /**
         * Deletes specified `value`
         * @param value
         */
        delete(value: V): boolean;
        /**
         * Returns _true_ if `value` is contained
         * @param v
         */
        has(value: V): boolean;
        /**
         * Returns an array of values
         */
        toArray(): V[];
    }
    /**
     * Like a `Map` but multiple values can be stored for each key.
     * Duplicate values can be added to the same or even a several keys.
     *
     * Three pre-defined MapOf's are available:
     * * {@link mapArray} - Map of mutable arrays
     * * {@link mapSet} - Map of mutable sets
     * * {@link mapCircular} - Map of immutable circular arrays
     *
     * Several events can be listened to via `addEventListener`
     * * addedKey, addedValue - when a new key is added, or when a new value is added
     * * clear - when contents are cleared
     * * deleteKey - when a key is deleted
     *
     * ```js
     * map.addEventLister(`addedKey`, ev => {
     *  console.log(`New key ${evt.key} seen.`);
     * });
     * ```
     *
     * @template V Values stored under keys
     * @template M Type of data structure managing values
     */
    export interface MapOfMutable<V, M> extends SimpleEventEmitter<MapArrayEvents<V>> {
        /**
         * Returns a human-readable rendering of contents
         */
        debugString(): string;
        /**
         * Returns list of keys
         */
        keys(): readonly string[];
        /**
         * Returns a list of all keys and count of items therein
         */
        keysAndCounts(): Array<[string, number]>;
        /**
         * Returns items under `key` or undefined if `key` is not found
         * @param key
         */
        get(key: string): ReadonlyArray<V> | undefined;
        /**
         * Returns the object managing values under the specified `key`
         * @private
         * @param key
         */
        getSource(key: string): M | undefined;
        /**
         * Returns _true_ if `value` is stored under `key`.
         *
         * @param key Key
         * @param value Value
         */
        hasKeyValue(key: string, value: V): boolean;
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
         * Deletes all values stored under `key`. Returns _true_ if key was found
         * @param key
         */
        delete(key: string): boolean;
        /**
         * Returns true if the map is empty
         */
        get isEmpty(): boolean;
        /**
         * Finds the first key where value is stored.
         * Note: value could be stored in multiple keys
         * @param value Value to seek
         * @returns Key, or undefined if value not found
         */
        findKeyForValue(value: V): string | undefined;
        /**
         * Returns the number of values stored under `key`, or _0_ if `key` is not present.
         * @param key Key
         */
        count(key: string): number;
    }
    /**
     * @private
     */
    export type MapArrayEvents<V> = {
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
    export interface CircularArray<V> extends Array<V> {
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
        add(v: V): CircularArray<V>;
        get length(): number;
        /**
         * Returns the current add position of array.
         */
        get pointer(): number;
    }
    /**
     * A simple mutable map of arrays, without events. It can store multiple values
     * under the same key.
     *
     * For a fancier approaches, consider {@link mapArray}, {@link mapCircular} or {@link mapSet}.
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
     */
    export interface SimpleMapArrayMutable<V> {
        /**
         * Adds `values` under specified `key`
         * @param key
         * @param values
         */
        add(key: string, ...values: ReadonlyArray<V>): void;
        /**
         * Get items at key. Returns _undefined_ if key does not exist
         * @param key
         */
        get(key: string): ReadonlyArray<V> | undefined;
        /**
         * Deletes the specified `value` under `key`. Returns true if found.
         * @param key
         * @param value
         */
        delete(key: string, value: V): boolean;
        /**
         * Removes all data
         */
        clear(): void;
    }
    /**
     * A mutable Set that compares by value
     */
    export interface SetMutable<V> {
        /**
         * Add item
         */
        add(item: V): void;
        /**
         * Retuns true if set contains item
         */
        has(item: V): boolean;
    }
    /**
     * An immutable map. Rather than changing the map, functions like `add` and `delete`
     * return a new map reference which must be captured.
     *
     * Immutable data is useful because as it gets passed around your code, it never
     * changes from underneath you. You have what you have.
     *
     * @example
     * ```js
     * let m = map(); // Create
     * let m2 = m.set(`hello`, `samantha`);
     * // m is still empty, only m2 contains a value.
     * ```
     *
     * @template K Type of map keys. Typically `string`
     * @template V Type of stored values
     */
    export interface MapImmutable<K, V> {
        /**
         * Adds one or more items, returning the changed map.
         *
         * Can add items in the form of `[key,value]` or `{key, value}`.
         * @example These all produce the same result
         * ```js
         * map.set(`hello`, `samantha`);
         * map.add([`hello`, `samantha`]);
         * map.add({key: `hello`, value: `samantha`})
         * ```
         * @param itemsToAdd
         */
        add(...itemsToAdd: EitherKey<K, V>): MapImmutable<K, V>;
        /**
         * Deletes an item by key, returning the changed map
         * @param key
         */
        delete(key: K): MapImmutable<K, V>;
        /**
         * Returns an empty map
         */
        clear(): MapImmutable<K, V>;
        /**
         * Returns an item by key, or _undefined_ if not found
         * @example
         * ```js
         * const item = map.get(`hello`);
         * ```
         * @param key
         */
        get(key: K): V | undefined;
        /**
         * Returns _true_ if map contains `key`
         * @example
         * ```js
         * if (map.has(`hello`)) ...
         * ```
         * @param key
         */
        has(key: K): boolean;
        /**
         * Returns _true_ if map is empty
         */
        isEmpty(): boolean;
        /**
         * Iterates over entries (in the form of [key,value])
         *
         * @example
         * ```js
         * for (const [key, value] of map.entries()) {
         *  // Use key, value...
         * }
         * ```
         */
        entries(): IterableIterator<readonly [K, V]>;
    }
    /**
     * A mutable map.
     *
     * It is a wrapper around the in-built Map type, but adds roughly the same API as {@link MapImmutable}.
     *
     * @template K Type of map keys. Typically `string`
     * @template V Type of stored values
     */
    export interface MapMutable<K, V> {
        /**
         * Adds one or more items to map
         *
         * Can add items in the form of [key,value] or {key, value}.
         * @example These all produce the same result
         * ```js
         * map.set(`hello`, `samantha`);
         * map.add([`hello`, `samantha`]);
         * map.add({key: `hello`, value: `samantha`})
         * ```
         * @param itemsToAdd
         * @param itemsToAdd
         */
        add(...itemsToAdd: EitherKey<K, V>): void;
        /**
         * Sets a value to a specified key
         * @param key
         * @param value
         */
        set(key: K, value: V): void;
        /**
         * Deletes an item by key
         * @param key
         */
        delete(key: K): void;
        /**
         * Clears map
         */
        clear(): void;
        /**
         * Gets an item by key
         * @example
         * ```js
         * const item = map.get(`hello`);
         * ```
         * @param key
         */
        get(key: K): V | undefined;
        /**
         * Returns _true_ if map contains key
         * @example
         * ```js
         * if (map.has(`hello`)) ...
         * ```
         * @param key
         */
        has(key: K): boolean;
        /**
         * Returns _true_ if map is empty
         */
        isEmpty(): boolean;
        /**
         * Iterates over entries (consisting of [key,value])
         * @example
         * ```js
         * for (const [key, value] of map.entries()) {
         *  // Use key, value...
         * }
         * ```
         */
        entries(): IterableIterator<readonly [K, V]>;
    }
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
    export interface StackMutable<V> extends StackBase<V> {
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
    export interface Stack<V> extends StackBase<V> {
        push(...toAdd: ReadonlyArray<V>): Stack<V>;
        pop(): Stack<V>;
    }
    export interface StackBase<V> {
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
         * Get the item at the top of the stack without removing it (like {@link pop} would do)
         * @returns Item at the top of the stack, or _undefined_ if empty.
         */
        get peek(): V | undefined;
        /**
         * Number of items in stack
         */
        get length(): number;
    }
}
declare module "collections/SimpleMapArray" {
    import { SimpleMapArrayMutable } from "collections/Interfaces";
    /**
     * A simple mutable map of arrays, without events. It can store multiple values
     * under the same key.
     *
     * For a fancier approaches, consider {@link mapArray}, {@link mapCircular} or {@link mapSet}.
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
    export const simpleMapArrayMutable: <V>() => SimpleMapArrayMutable<V>;
}
declare module "Events" {
    export type Listener<Events> = (ev: unknown, sender: SimpleEventEmitter<Events>) => void;
    type FlowSource = {
        name: string;
        dispose(): void;
        input: FlowSink;
    };
    type FlowHandler = (args?: any) => void;
    interface FlowSink {
        [key: string]: FlowHandler;
    }
    export type Debouncer = {
        reset: () => void;
        dispose: () => void;
    };
    export const debounceFactory: (sink: FlowSink, opts: {
        timeoutMs: number;
    }) => FlowSource;
    export const debounce: (triggered: () => void, timeoutMs: number) => Debouncer;
    export class SimpleEventEmitter<Events> {
        #private;
        /**
         * Fire event
         * @private
         * @param type Type of event
         * @param args Arguments for event
         * @returns
         */
        protected fireEvent<K extends keyof Events>(type: K, args: Events[K]): void;
        /**
         * Adds event listener
         *
         * @template K
         * @param {K} type
         * @param {Listener<Events>} listener
         * @memberof SimpleEventEmitter
         */
        addEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
        /**
         * Remove event listener
         *
         * @param {Listener<Events>} listener
         * @memberof SimpleEventEmitter
         */
        removeEventListener<K extends keyof Events>(type: K, listener: Listener<Events>): void;
        /**
         * Clear all event listeners
         * @private
         * @memberof SimpleEventEmitter
         */
        clearEventListeners(): void;
    }
}
declare module "Filters" {
    export const threshold: (threshold: number) => (v: number) => boolean;
    export const rangeInclusive: (min: number, max: number) => (v: number) => boolean;
    export const filter: <V>(v: V, fn: (v: V) => boolean, skipValue: V | undefined) => V | undefined;
}
declare module "collections/NumericArrays" {
    /**
     * Calculates the average of all numbers in an array.
     * Array items which aren't a valid number are ignored and do not factor into averaging.
     *
     * Use {@link minMaxAvg} if you want min, max and total as well.
     *
     * @example
     * ```
     * // Average of a list
     * const avg = average(1, 1.4, 0.9, 0.1);
     *
     * // Average of a variable
     * let data = [100,200];
     * average(...data);
     * ```
     * @param data Data to average.
     * @returns Average of array
     */
    export const average: (...data: readonly number[]) => number;
    /**
     * Returns the min, max, avg and total of the array.
     * Any values that are invalid are silently skipped over.
     *
     * Use {@link average} if you only need average
     *
     * @param data
     * @returns `{min, max, avg, total}`
     */
    export const minMaxAvg: (data: readonly number[]) => {
        /**
         * Smallest value in array
         */
        readonly min: number;
        /**
         * Total of all items
         */
        readonly total: number;
        /**
         * Largest value in array
         */
        readonly max: number;
        /**
         * Average value in array
         */
        readonly avg: number;
    };
}
declare module "collections/Arrays" {
    /**
     * Functions for working with primitive arrays, regardless of type
     * See Also: NumericArrays.ts
     */
    import { IsEqual } from "util";
    export * from "collections/NumericArrays";
    /**
     * Throws an error if `array` parameter is not a valid array
     * @private
     * @param array
     * @param paramName
     */
    export const guardArray: <V>(array: ArrayLike<V>, paramName?: string) => void;
    /**
     * Returns a random array index
     * @param array
     * @returns
     */
    export const randomIndex: <V>(array: ArrayLike<V>) => number;
    /**
     * Returns random element
     * @param array
     * @returns
     */
    export const randomElement: <V>(array: ArrayLike<V>) => V;
    /**
     * Removes a random item from an array, returning both the item and the new array as a result.
     * Does not modify the original array unless `mutate` parameter is true.
     *
     * @example Without changing source
     * ```js
     * const data = [100, 20, 40];
     * const {value, array} = randomPluck(data);
     * // value: 20, array: [100, 40], data: [100, 20, 40];
     * ```
     *
     * @example Mutating source
     * ```js
     * const data = [100, 20, 40];
     * const {value} = randomPluck(data, true);
     * // value: 20, data: [100, 40];
     * ```
     *
     * @template V Type of array
     * @param array Array to pluck item from
     * @param mutate If _true_, changes input array. _False_ by default.
     * @return Returns an object `{value:V|undefined, array:V[]}`
     */
    export const randomPluck: <V>(array: readonly V[], mutate?: boolean) => {
        readonly value: V | undefined;
        readonly array: V[];
    };
    /**
     * Returns a shuffled copy of the input array.
     * @example
     * ```js
     * const d = [1, 2, 3, 4];
     * const s = shuffle(d);
     * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
     * ```
     * @param dataToShuffle
     * @returns Copy with items moved around randomly
     * @template V Type of array items
     */
    export const shuffle: <V>(dataToShuffle: readonly V[]) => readonly V[];
    /**
     * Returns an array with a value omitted. If value is not found, result will be a copy of input.
     * Value checking is completed via the provided `comparer` function, or by default checking whether `a === b`.
     *
     * @example
     * ```js
     * const data = [100, 20, 40];
     * const filtered = without(data, 20); // [100, 40]
     * ```
     * @template V Type of array items
     * @param data Source array
     * @param value Value to remove
     * @param comparer Comparison function. If not provided {@link isEqualDefault} is used, which compares using `===`
     * @return Copy of array without value.
     */
    export const without: <V>(data: readonly V[], value: V, comparer?: IsEqual<V>) => readonly V[];
    /**
     * Groups data by a grouper function, returning data as a map with string
     * keys and array values.
     *
     * @example
     * ```js
     * const data = [
     *  { age: 39, city: `London` }
     *  { age: 14, city: `Copenhagen` }
     *  { age: 23, city: `Stockholm` }
     *  { age: 56, city: `London` }
     * ];
     * const map = groupBy(data, item => data.city);
     * ```
     *
     * Returns a map:
     *
     * London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
     * Stockhom: [{ age: 23, city: `Stockholm` }]
     * Copenhagen: [{ age: 14, city: `Copenhagen` }]
     *
     * @param array Array to group
     * @param grouper Function that returns a key for a given item
     * @template K Type of key to group by. Typically string.
     * @template V Type of values
     * @returns Map
     */
    export const groupBy: <K, V>(array: readonly V[], grouper: (item: V) => K) => Map<K, V[]>;
}
declare module "KeyValue" {
    type Primitive = string | number;
    export type KeyValue = readonly [key: string, value: Primitive];
    export const byValueString: (reverse?: boolean) => import("fp-ts/Ord").Ord<KeyValue>;
    export const sortByKey: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
    export const sortByValueString: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
    export const sortByValueNumber: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
    export type SortingFn = (data: KeyValue[]) => KeyValue[];
    export const getSorter: (sortStyle: `value` | `valueReverse` | `key` | `keyReverse`) => <A extends KeyValue>(as: A[]) => A[];
    export const minMaxAvg: (entries: readonly KeyValue[], conversionFn?: ((v: KeyValue) => number) | undefined) => {
        readonly min: number;
        readonly total: number;
        readonly max: number;
        readonly avg: number;
    };
}
declare module "geometry/Point" {
    import { Rects } from "geometry/index";
    /**
     * A point, consisting of x, y and maybe z fields.
     */
    export type Point = {
        readonly x: number;
        readonly y: number;
        readonly z?: number;
    };
    /**
     * Returns the 'minimum' point from an array of points, using a comparison function.
     *
     * @example Find point closest to a coordinate
     * ```js
     * const points = [...];
     * const center = {x: 100, y: 100};
     *
     * const closestToCenter = findMinimum((a, b) => {
     *  const aDist = distance(a, center);
     *  const bDist = distance(b, center);
     *  if (aDistance < bDistance) return a;
     *  return b;
     * }, points);
     * ```
     * @param compareFn Compare function returns the smallest of `a` or `b`
     * @param points
     * @returns
     */
    export const findMinimum: (compareFn: (a: Point, b: Point) => Point, ...points: readonly Point[]) => Point;
    /**
     * Calculate distance between two points
     * @param a
     * @param b
     * @returns
     */
    export const distance: (a: Point, b: Point) => number;
    /**
     * Throws an error if point parameter is invalid
     * @param p
     * @param name
     */
    export const guard: (p: Point, name?: string) => void;
    /**
     * Returns the minimum rectangle that can enclose all provided points
     * @param points
     * @returns
     */
    export const bbox: (...points: readonly Point[]) => Rects.RectPositioned;
    /**
     * Returns true if the parameter has x and y
     * @param p
     * @returns
     */
    export const isPoint: (p: Point | Rects.RectPositioned | Rects.Rect) => p is Point;
    /**
     * Returns point as an array in the form [x,y]. This can be useful for some libraries
     * that expect points in array form.
     *
     * ```
     * const p = {x: 10, y:5};
     * const p2 = toArray(p); // yields [10,5]
     * ```
     * @param p
     * @returns
     */
    export const toArray: (p: Point) => readonly number[];
    /**
     * Returns a human-friendly string representation `(x, y)`
     * @param p
     * @returns
     */
    export const toString: (p: Point) => string;
    /**
     * Returns true if the two points have identical values
     *
     * @param a
     * @param b
     * @returns
     */
    export const equals: (a: Point, b: Point) => boolean;
    /**
     * Returns true if two points are within a specified range.
     * Provide a point for the range to set different x/y range, or pass a number
     * to use the same range for both axis.
     *
     * @example
     * ```js
     * withinRange({x:100,y:100}, {x:101, y:101}, 1); // True
     * withinRange({x:100,y:100}, {x:105, y:101}, {x:5, y:1}); // True
     * withinRange({x:100,y:100}, {x:105, y:105}, {x:5, y:1}); // False - y axis too far
     * ```
     * @param a
     * @param b
     * @param maxRange
     * @returns
     */
    export const withinRange: (a: Point, b: Point, maxRange: Point | number) => boolean;
    /**
     * Returns a relative point between two points
     * @param amt Relative amount, 0-1
     * @param a
     * @param b
     * @returns {@link Point}
     */
    export const lerp: (a: Point, b: Point, amt: number) => Point;
    /**
     * Returns a point from two coordinates or an array of [x,y]
     * @example
     * ```js
     * let p = from([10, 5]); // yields {x:10, y:5}
     * let p = from(10, 5);   // yields {x:10, y:5}
     * let p = from(10);      // yields {x:10, y:0} 0 is used for default y
     * let p = from();        // yields {x:0, y:0}  0 used for default x & y
     * ```
     * @param xOrArray
     * @param [y]
     * @returns Point
     */
    export const from: (xOrArray?: number | readonly number[] | undefined, y?: number | undefined) => Point;
    /**
     * Returns an array of points from an array of numbers.
     * Array can be a continuous series of x, y values:
     * ```
     * [1,2,3,4] would yield: [{x:1, y:2}, {x:3, y:4}]
     * ```
     *
     * Or it can be an array of arrays:
     * ```
     * [[1,2], [3,4]] would yield: [{x:1, y:2}, {x:3, y:4}]
     * ```
     * @param coords
     * @returns
     */
    export const fromNumbers: (...coords: readonly ReadonlyArray<number>[] | readonly number[]) => readonly Point[];
    /**
     * Returns `a` minus `b`
     *
     * @param a
     * @param b
     * @returns Point
     */
    export const diff: (a: Point, b: Point) => Point;
    /**
     * Returns `a` plus `b`
     *
     * @param a
     * @param b
     * @returns
     */
    export const sum: (a: Point, b: Point) => Point;
    /**
     * Returns `a` multiplied by `b`
     *
     * @param a
     * @param b
     * @returns
     */
    export function multiply(a: Point, b: Point): Point;
    /**
     * Returns `a` multipled by some x and/or y scaling factor
     *
     * @export
     * @parama Point to scale
     * @param x Scale factor for x axis
     * @param [y] Scale factor for y axis (defaults to no scaling)
     * @returns Scaled point
     */
    export function multiply(a: Point, x: number, y?: number): Point;
}
declare module "geometry/Math" {
    import { Point } from "geometry/Point";
    export const degreeToRadian: (angleInDegrees: number) => number;
    export const radianToDegree: (angleInRadians: number) => number;
    export const radiansFromAxisX: (point: Point) => number;
    export const polarToCartesian: (center: Point, radius: number, angleRadians: number) => {
        x: number;
        y: number;
    };
}
declare module "geometry/Path" {
    import { Rects, Points } from "geometry/index";
    export type Path = {
        length(): number;
        /**
         * Returns a point at a relative (0.0-1.0) position along the path
         *
         * @param {number} t Relative position (0.0-1.0)
         * @returns {Point} Point
         */
        compute(t: number): Points.Point;
        bbox(): Rects.RectPositioned;
        toString(): string;
        toSvgString(): string;
        readonly kind: `compound` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
    };
    /**
     * Return the start point of a path
     *
     * @param {Path} path
     * @return {*}  {Point}
     */
    export const getStart: (path: Path) => Points.Point;
    /**
     * Return the end point of a path
     *
     * @param {Path} path
     * @return {*}  {Point}
     */
    export const getEnd: (path: Path) => Points.Point;
    export type WithBeziers = {
        getBeziers(): readonly Path[];
    };
}
declare module "geometry/Arc" {
    import { Path } from "geometry/Path";
    import { Lines, Points, Rects } from "geometry/index";
    /**
     * Returns true if parameter is an arc
     * @param p Arc or number
     * @returns
     */
    export const isArc: (p: Arc | number) => p is Arc;
    /**
     * Returns true if parameter has a positioned (x,y)
     * @param p Point, Arc or ArcPositiond
     * @returns
     */
    export const isPositioned: (p: Points.Point | Arc | ArcPositioned) => p is Points.Point;
    /**
     * Arc, defined by radius, start and end point in radians, and whether it is counter-clockwise.
     */
    export type Arc = {
        /**
         * Radius of arc
         */
        readonly radius: number;
        /**
         * Start radian
         */
        readonly startRadian: number;
        /**
         * End radian
         */
        readonly endRadian: number;
        /**
         * If true, arc is counter-clockwise
         */
        readonly counterClockwise?: boolean;
    };
    /**
     * An {@link Arc} that also has a position, given in x, y
     */
    export type ArcPositioned = Points.Point & Arc;
    /**
     * Returns an arc from degrees, rather than radians
     * @param radius Radius of arc
     * @param startDegrees Start angle in degrees
     * @param endDegrees End angle in degrees
     * @param origin Optional center of arc
     * @returns Arc
     */
    export const fromDegrees: (radius: number, startDegrees: number, endDegrees: number, origin?: Points.Point | undefined) => Arc | ArcPositioned;
    /**
     * Returns a {@link Line} linking the start and end points of an {@link ArcPositioned}.
     *
     * @param arc
     * @returns Line from start to end of arc
     */
    export const toLine: (arc: ArcPositioned) => Lines.Line;
    /**
     * Calculates a coordinate on an arc, based on an angle
     * @param arc Arc
     * @param angleRadian Angle of desired coordinate
     * @param origin Origin of arc (0,0 used by default)
     * @returns Coordinate
     */
    export const point: (arc: Arc | ArcPositioned, angleRadian: number, origin?: Points.Point | undefined) => Points.Point;
    /**
     * Throws an error if arc instance is invalid
     * @param arc
     */
    export const guard: (arc: Arc | ArcPositioned) => void;
    /**
     * Compute relative position on arc
     * @param arc Arc
     * @param t Relative position 0-1
     * @param origin If arc is not positioned, pass in an origin
     * @returns
     */
    export const compute: (arc: ArcPositioned | Arc, t: number, origin?: Points.Point | undefined) => Points.Point;
    /**
     * Creates a {@link Path} instance from the arc. This wraps up some functions for convienence.
     * @param arc
     * @returns Path
     */
    export const toPath: (arc: ArcPositioned) => Path;
    /**
     * Calculates the length of the arc
     * @param arc
     * @returns Length
     */
    export const length: (arc: Arc) => number;
    /**
     * Calculates a {@link Rects.Rect|Rect} bounding box for arc.
     * @param arc
     * @returns Rectangle encompassing arc.
     */
    export const bbox: (arc: ArcPositioned | Arc) => Rects.RectPositioned | Rects.Rect;
    /**
     * Returns SVG string for an arc, suitable for Svg.js
     * @param origin Origin
     * @param radiusOrArc Radius, or {@link Arc} instance
     * @param startRadian Start radian
     * @param endRadian End radian
     * @returns Svg string
     */
    export const toSvg: (origin: Points.Point, radiusOrArc: number | Arc, startRadian?: number | undefined, endRadian?: number | undefined) => string;
    /**
     * Calculates the distance between the centers of two arcs
     * @param a
     * @param b
     * @returns Distance
     */
    export const distanceCenter: (a: ArcPositioned, b: ArcPositioned) => number;
    /**
     * Returns true if the two arcs have the same values
     *
     * @param a
     * @param b
     * @returns {boolean}
     */
    export const isEquals: (a: Arc | ArcPositioned, b: Arc | ArcPositioned) => boolean;
}
declare module "geometry/Bezier" {
    import { Paths, Points } from "geometry/index";
    export type QuadraticBezier = {
        readonly a: Points.Point;
        readonly b: Points.Point;
        readonly quadratic: Points.Point;
    };
    export type QuadraticBezierPath = Paths.Path & QuadraticBezier;
    export type CubicBezier = {
        readonly a: Points.Point;
        readonly b: Points.Point;
        readonly cubic1: Points.Point;
        readonly cubic2: Points.Point;
    };
    export type CubicBezierPath = Paths.Path & CubicBezier;
    export const isQuadraticBezier: (path: Paths.Path | QuadraticBezier | CubicBezier) => path is QuadraticBezier;
    export const isCubicBezier: (path: Paths.Path | CubicBezier | QuadraticBezier) => path is CubicBezier;
    /**
     * Returns a new quadratic bezier with specified bend amount
     *
     * @param {QuadraticBezier} b Curve
     * @param {number} [bend=0] Bend amount, from -1 to 1
     * @returns {QuadraticBezier}
     */
    export const quadraticBend: (a: Points.Point, b: Points.Point, bend?: number) => QuadraticBezier;
    /**
     * Creates a simple quadratic bezier with a specified amount of 'bend'.
     * Bend of -1 will pull curve down, 1 will pull curve up. 0 is no curve
     * @param {Points.Point} start Start of curve
     * @param {Points.Point} end End of curve
     * @param {number} [bend=0] Bend amount, -1 to 1
     * @returns {QuadraticBezier}
     */
    export const quadraticSimple: (start: Points.Point, end: Points.Point, bend?: number) => QuadraticBezier;
    /**
     * Returns a relative point on a simple quadratic
     * @param start Start
     * @param end  End
     * @param bend Bend (-1 to 1)
     * @param amt Amount
     * @returns Point
     */
    export const computeQuadraticSimple: (start: Points.Point, end: Points.Point, bend: number, amt: number) => Points.Point;
    export const quadraticToSvgString: (start: Points.Point, end: Points.Point, handle: Points.Point) => string;
    export const toPath: (cubicOrQuadratic: CubicBezier | QuadraticBezier) => CubicBezierPath | QuadraticBezierPath;
    export const cubic: (start: Points.Point, end: Points.Point, cubic1: Points.Point, cubic2: Points.Point) => CubicBezier;
    export const quadratic: (start: Points.Point, end: Points.Point, handle: Points.Point) => QuadraticBezier;
}
declare module "Guards" {
    export type NumberGuardRange = `` | `nonZero` | `positive` | `negative` | `aboveZero` | `belowZero` | `percentage` | `bipolar`;
    /**
     * Throws an error if `t` is not a number or within specified range
     * @param t Value to check
     * @param name Name of parameter (for more helpful exception messages)
     * @param range Range to enforce
     * @returns
     */
    export const number: (t: number, range?: NumberGuardRange, name?: string) => boolean;
    /**
     * Throws an error if `t` is not in the range of 0-1.
     *
     * This is the same as calling ```number(t, `percentage`)```
     * @param t
     * @param name
     * @returns
     */
    export const percent: (t: number, name?: string) => boolean;
    /**
     * Throws an error if `t` is not an integer
     * @param t
     * @param name
     * @param range
     */
    export const integer: (t: number, range?: NumberGuardRange, name?: string) => void;
    /**
     * Returns true if parameter is an array of strings
     * @param t
     * @returns
     */
    export const isStringArray: (t: unknown) => boolean;
    /**
     * Throws an error if parameter is not an array
     * @param t
     * @param name
     */
    export const array: (t: unknown, name?: string) => void;
    /** Throws an error if parameter is not defined */
    export const defined: <T>(argument: T | undefined) => argument is T;
}
declare module "geometry/Line" {
    import { Path } from "geometry/Path";
    import { Rects, Points } from "geometry/index";
    export type Line = {
        readonly a: Points.Point;
        readonly b: Points.Point;
    };
    export const isLine: (p: Path | Line | Points.Point) => p is Line;
    /**
     * Returns true if the lines have the same value
     *
     * @param {Line} a
     * @param {Line} b
     * @returns {boolean}
     */
    export const equals: (a: Line, b: Line) => boolean;
    export const guard: (l: Line, paramName?: string) => void;
    export const angleRadian: (lineOrPoint: Line | Points.Point, b?: Points.Point | undefined) => number;
    export const withinRange: (l: Line, p: Points.Point, maxRange: number) => boolean;
    export const length: (aOrLine: Points.Point | Line, b?: Points.Point | undefined) => number;
    export const nearest: (line: Line, p: Points.Point) => Points.Point;
    export const slope: (lineOrPoint: Line | Points.Point, b?: Points.Point | undefined) => number;
    export const extendX: (line: Line, xIntersection: number) => Points.Point;
    /**
     * Returns a line extended from it's start (`a`) by a specified distance
     *
     * ```js
     * const line = {a: {x: 0, y:0}, b: {x:10, y:10} }
     * const extended = extendFromStart(line, 2);
     * ```
     * @param {Line} line
     * @param {number} distance
     * @return {*}  {Line}
     */
    export const extendFromStart: (line: Line, distance: number) => Line;
    export const distance: (l: Line, p: Points.Point) => number;
    export const compute: (a: Points.Point, b: Points.Point, t: number) => Points.Point;
    export const toString: (a: Points.Point, b: Points.Point) => string;
    export const fromNumbers: (x1: number, y1: number, x2: number, y2: number) => Line;
    /**
     * Returns an array representation of line: [a.x, a.y, b.x, b.y]
     *
     * @export
     * @param {Point} a
     * @param {Point} b
     * @returns {number[]}
     */
    export const toFlatArray: (a: Points.Point, b: Points.Point) => readonly number[];
    export const toSvgString: (a: Points.Point, b: Points.Point) => string;
    export const fromArray: (arr: readonly number[]) => Line;
    export const fromPoints: (a: Points.Point, b: Points.Point) => Line;
    export const joinPointsToLines: (...points: readonly Points.Point[]) => readonly Line[];
    export const fromPointsToPath: (a: Points.Point, b: Points.Point) => LinePath;
    export type LinePath = Line & Path & {
        toFlatArray(): readonly number[];
    };
    export const bbox: (line: Line) => Rects.RectPositioned;
    export const toPath: (line: Line) => LinePath;
}
declare module "geometry/Circle" {
    import { Path } from "geometry/Path";
    import { Line } from "geometry/Line";
    import { Points, Rects } from "geometry/index";
    /**
     * A circle
     */
    export type Circle = {
        readonly radius: number;
    };
    /**
     * A {@link Circle} with position
     */
    export type CirclePositioned = Points.Point & Circle;
    export type CircularPath = Circle & Path & {
        readonly kind: `circular`;
    };
    /**
     * Returns true if parameter has x,y
     * @param p Circle or point
     * @returns
     */
    export const isPositioned: (p: Circle | Points.Point) => p is Points.Point;
    /**
     * Returns a point on a circle at a specified angle in radians
     * @param circle
     * @param angleRadian Angle in radians
     * @param Origin or offset of calculated point. By default uses center of circle or 0,0 if undefined
     * @returns Point oo circle
     */
    export const point: (circle: Circle | CirclePositioned, angleRadian: number, origin?: Points.Point | undefined) => Points.Point;
    /**
     * Computes relative position along circle
     * @param circle
     * @param t Position, 0-1
     * @returns
     */
    export const compute: (circle: CirclePositioned, t: number) => Points.Point;
    /**
     * Returns circumference of circle
     * @param circle
     * @returns
     */
    export const length: (circle: Circle) => number;
    /**
     * Computes a bounding box that encloses circle
     * @param circle
     * @returns
     */
    export const bbox: (circle: CirclePositioned | Circle) => Rects.RectPositioned | Rects.Rect;
    /**
     * Returns true if `b` is completely contained by `a`
     *
     * @param a
     * @param b
     * @returns
     */
    export const isContainedBy: (a: CirclePositioned, b: CirclePositioned) => boolean;
    /**
     * Returns true if a or b overlap or are equal
     *
     * Use `intersections` to find the points of intersection
     *
     * @param a
     * @param b
     * @returns True if circle overlap
     */
    export const isIntersecting: (a: CirclePositioned, b: CirclePositioned) => boolean;
    /**
     * Returns the points of intersection betweeen `a` and `b`.
     *
     * Returns an empty array if circles are equal, one contains the other or if they don't touch at all.
     *
     * @param a Circle
     * @param b Circle
     * @returns Points of intersection, or an empty list if there are none
     */
    export const intersections: (a: CirclePositioned, b: CirclePositioned) => readonly Points.Point[];
    /**
     * Returns true if the two objects have the same values
     *
     * @param a
     * @param b
     * @returns
     */
    export const isEquals: (a: CirclePositioned | Circle, b: CirclePositioned | Circle) => boolean;
    /**
     * Returns the distance between two circle centers
     * @param a
     * @param b
     * @returns
     */
    export const distanceCenter: (a: CirclePositioned, b: CirclePositioned) => number;
    /**
     * Returns a `CircularPath` representation of a circle
     *
     * @param {CirclePositioned} circle
     * @returns {CircularPath}
     */
    export const toPath: (circle: CirclePositioned) => CircularPath;
    /**
     * Returns the point(s) of intersection between a circle and line.
     * @param circle
     * @param line
     * @returns Point(s) of intersection, or empty array
     */
    export const intersectionLine: (circle: CirclePositioned, line: Line) => readonly Points.Point[];
}
declare module "geometry/CompoundPath" {
    import { Points, Paths, Rects } from "geometry/index";
    export type CompoundPath = Paths.Path & {
        segments: Paths.Path[];
        kind: `compound`;
    };
    /**
     * Returns a new compoundpath, replacing a path at a given index
     *
     * @param {CompoundPath} compoundPath Existing compoundpath
     * @param {number} index Index to replace at
     * @param {Paths.Path} path Path to substitute in
     * @returns {CompoundPath} New compoundpath
     */
    export const setSegment: (compoundPath: CompoundPath, index: number, path: Paths.Path) => CompoundPath;
    /**
     * Computes x,y point at a relative position along compoundpath
     *
     * @param {Paths.Path[]} paths Combined paths (assumes contiguous)
     * @param {number} t Position (given as a percentage from 0 to 1)
     * @param {boolean} [useWidth] If true, widths are used for calulcating. If false, lengths are used
     * @param {Dimensions} [dimensions] Precalculated dimensions of paths, will be computed if omitted
     * @returns
     */
    export const compute: (paths: Paths.Path[], t: number, useWidth?: boolean | undefined, dimensions?: Dimensions | undefined) => Points.Point;
    type Dimensions = {
        /**
         * Width of each path (based on bounding box)
         *
         * @type {number[]}
         */
        widths: number[];
        /**
         * Length of each path
         *
         * @type {number[]}
         */
        lengths: number[];
        /**
         * Total length of all paths
         *
         * @type {number}
         */
        totalLength: number;
        /**
         * Total width of all paths
         *
         * @type {number}
         */
        totalWidth: number;
    };
    /**
     * Computes the widths and lengths of all paths, adding them up as well
     *
     * @param {Paths.Path[]} paths
     * @returns {Dimensions}
     */
    export const computeDimensions: (paths: Paths.Path[]) => Dimensions;
    /**
     * Computes the bounding box that encloses entire compoundpath
     *
     * @param {Paths.Path[]} paths
     *
     * @returns {Rects.Rect}
     */
    export const bbox: (paths: Paths.Path[]) => Rects.RectPositioned;
    /**
     * Produce a human-friendly representation of paths
     *
     * @param {Paths.Path[]} paths
     * @returns {string}
     */
    export const toString: (paths: Paths.Path[]) => string;
    /**
     * Throws an error if paths are not connected together, in order
     *
     * @param {Paths.Path[]} paths
     */
    export const guardContinuous: (paths: Paths.Path[]) => void;
    export const toSvgString: (paths: Paths.Path[]) => string;
    /**
     * Create a compoundpath from an array of paths.
     * All this does is verify they are connected, and precomputes dimensions
     *
     * @param {...Paths.Path[]} paths
     * @returns {CompoundPath}
     */
    export const fromPaths: (...paths: Paths.Path[]) => CompoundPath;
}
declare module "collections/Set" {
    import { ToString } from "util";
    import { SetMutable } from "collections/Interfaces";
    /**
     * @inheritdoc SetMutable
     * @param keyString Function that produces a key for items. If unspecified uses JSON.stringify
     * @returns
     */
    export const setMutable: <V>(keyString?: ToString<V> | undefined) => SetMutable<V>;
}
declare module "collections/Map" {
    import { IsEqual, ToString } from "util";
    /**
     * Returns true if map contains `value` under `key`, using `comparer` function. Use {@link hasAnyValue} if you don't care
     * what key value might be under.
     *
     * Having a comparer function is useful to check by value rather than object reference.
     *
     * @example Find key value based on string equality
     * ```js
     * hasKeyValue(map,`hello`, `samantha`, (a, b) => a === b);
     * ```
     * @param map Map to search
     * @param key Key to search
     * @param value Value to search
     * @param comparer Function to determine match
     * @returns True if key is found
     */
    export const hasKeyValue: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V, comparer: IsEqual<V>) => boolean;
    /**
     * Adds items to a map only if their key doesn't already exist
     *
     * Uses provided {@link ToString} function to create keys for items. Item is only added if it doesn't already exist.
     * Thus the older item wins out, versus normal `Map.set` where the newest wins.
     *
     *
     * @example
     * ```js
     * const map = new Map();
     * const peopleArray = [ _some people objects..._];
     * addUniqueByHash(map, p => p.name, ...peopleArray);
     * ```
     * @param set
     * @param hashFunc
     * @param values
     * @returns
     */
    export const addUniqueByHash: <V>(set: ReadonlyMap<string, V> | undefined, hashFunc: ToString<V>, ...values: readonly V[]) => Map<any, any>;
    /**
     * Returns true if _any_ key contains `value`, based on the provided `comparer` function. Use {@link hasKeyValue}
     * if you only want to find a value under a certain key.
     *
     * Having a comparer function is useful to check by value rather than object reference.
     * @example Finds value `samantha`, using string equality to match
     * ```js
     * hasAnyValue(map, `samantha`, (a, b) => a === b);
     * ```
     * @param map Map to search
     * @param value Value to find
     * @param comparer Function that determines matching
     * @returns True if value is found
     */
    export const hasAnyValue: <K, V>(map: ReadonlyMap<K, V>, value: V, comparer: IsEqual<V>) => boolean;
    /**
     * Returns items where `predicate` returns true.
     *
     * If you just want the first match, use `find`
     *
     * @example All people over thirty
     * ```js
     * const overThirty = filter(people, person => person.age > 30);
     * ```
     * @param map Map
     * @param predicate Filtering predicate
     * @returns Values that match predicate
     */
    export const filter: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => readonly V[];
    /**
     * Copies data to an array
     * @param map
     * @returns
     */
    export const toArray: <V>(map: ReadonlyMap<string, V>) => readonly V[];
    /**
     * Returns the first found item that matches `predicate` or undefined.
     *
     * If you want all matches, use `filter`.
     *
     * @example First person over thirty
     * ```js
     * const overThirty = find(people, person => person.age > 30);
     * ```
     * @param map
     * @param predicate
     * @returns Found item or undefined
     */
    export const find: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => V | undefined;
    /**
     * Like `Array.map`, but for a Map. Transforms from Map<K,V> to Map<K,R>
     *
     * @example
     * ```js
     * // Convert a map of string->string to string->number
     * transformMap<string, string, number>(mapOfStrings, (value, key) => parseInt(value));
     * ```
     * @param source
     * @param transformer
     * @returns
     */
    export const transformMap: <K, V, R>(source: ReadonlyMap<K, V>, transformer: (value: V, key: K) => R) => Map<K, R>;
    /**
     * Zips together an array of keys and values into an object. Requires that
     * `keys` and `values` are the same length.
     *
     * @example
     * ```js
     * const o = zipKeyValue([`a`, `b`, `c`], [0, 1, 2])
     * Yields: { a: 0, b: 1, c: 2}
     *```
      * @template V
      * @param keys
      * @param values
      * @return
      */
    export const zipKeyValue: <V>(keys: ReadonlyArray<string>, values: ArrayLike<V | undefined>) => {
        [k: string]: V | undefined;
    };
    /**
     * Converts a `Map` to a plain object, useful for serializing to JSON
     *
     * @example
     * ```js
     * const str = JSON.stringify(mapToObj(map));
     * ```
     * @param m
     * @returns
     */
    export const mapToObj: <T>(m: ReadonlyMap<string, T>) => {
        readonly [key: string]: T;
    };
    /**
     * Converts Map<K,V> to Array<R> with a provided `transformer`
     *
     * @example Get a list of ages from a map of Person objects
     * ```js
     * let person = { age: 29, name: `John`};
     * map.add(person.name, person);
     * const ages = mapToArray<string, People, number>(map, (key, person) => person.age);
     * // [29, ...]
     * ```
     * @param m
     * @param transformer
     * @returns
     */
    export const mapToArray: <K, V, R>(m: ReadonlyMap<K, V>, transformer: (key: K, item: V) => R) => readonly R[];
}
declare module "geometry/Grid" {
    import { Rects, Points } from "geometry/index";
    import { SetMutable } from "collections/Interfaces";
    export type GridVisual = Readonly<{
        readonly size: number;
    }>;
    export type Grid = Readonly<{
        readonly rows: number;
        readonly cols: number;
    }>;
    export type Cell = Readonly<{
        readonly x: number;
        readonly y: number;
    }>;
    export type Neighbours = Readonly<{
        readonly n: Cell | undefined;
        readonly e: Cell | undefined;
        readonly s: Cell | undefined;
        readonly w: Cell | undefined;
        readonly ne: Cell | undefined;
        readonly nw: Cell | undefined;
        readonly se: Cell | undefined;
        readonly sw: Cell | undefined;
    }>;
    export type CardinalDirection = `` | `n` | `ne` | `e` | `se` | `s` | `sw` | `w` | `nw`;
    export type BoundsLogic = `unbounded` | `undefined` | `stop` | `wrap`;
    type VisitorLogic = {
        readonly options?: IdentifyNeighbours;
        readonly select: NeighbourSelector;
    };
    export type VisitGenerator = Generator<Readonly<Cell>, void, unknown>;
    export type VisitorOpts = {
        readonly visited?: SetMutable<Cell>;
        readonly reversed?: boolean;
        readonly debug?: boolean;
    };
    export type Visitor = (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export type NeighbourMaybe = readonly [keyof Neighbours, Cell | undefined];
    export type Neighbour = readonly [keyof Neighbours, Cell];
    type NeighbourSelector = (neighbours: ReadonlyArray<Neighbour>) => Neighbour | undefined;
    type IdentifyNeighbours = (grid: Grid, origin: Cell) => ReadonlyArray<Neighbour>;
    /**
     * Returns true if grids `a` and `b` are equal in value
     *
     * @param {(Grid|GridVisual)} a
     * @param {(Grid|GridVisual)} b
     * @return {*}  {boolean}
     */
    export const isEqual: (a: Grid | GridVisual, b: Grid | GridVisual) => boolean;
    /**
     * Returns a key string for a cell instance
     * A key string allows comparison of instances by value rather than reference
     * @param {Cell} v
     * @returns {string}
     */
    export const cellKeyString: (v: Cell) => string;
    /**
     * Returns true if two cells equal. Returns false if either cell (or both) are undefined
     *
     * @param {Cell} a
     * @param {Cell} b
     * @returns {boolean}
     */
    export const cellEquals: (a: Cell, b: Cell) => boolean;
    export const guard: (a: Cell, paramName?: string, grid?: Readonly<{
        readonly rows: number;
        readonly cols: number;
    }> | undefined) => void;
    /**
     * Returns true if cell coordinates are above zero and within bounds of grid
     *
     * @param {Grid} grid
     * @param {Cell} cell
     * @return {*}  {boolean}
     */
    export const inside: (grid: Grid, cell: Cell) => boolean;
    /**
     * Returns a rect of the cell, positioned from the top-left corner
     *
     * @param {Cell} cell
     * @param {(Grid & GridVisual)} grid
     * @return {*}  {Rect.RectPositioned}
     */
    export const rectangleForCell: (cell: Cell, grid: Grid & GridVisual) => Rects.RectPositioned;
    /**
     * Returns the cell at a specified visual coordinate
     *
     * @param {Point.Point} position Position, eg in pixels
     * @param {(Grid & GridVisual)} grid Grid
     * @return {*}  {(Cell | undefined)} Cell at position or undefined if outside of the grid
     */
    export const cellAtPoint: (position: Points.Point, grid: Grid & GridVisual) => Cell | undefined;
    export const allDirections: readonly CardinalDirection[];
    export const crossDirections: readonly CardinalDirection[];
    export const neighbours: (grid: Grid, cell: Cell, bounds?: BoundsLogic, directions?: readonly CardinalDirection[] | undefined) => Neighbours;
    /**
     * Returns the pixel midpoint of a cell
     *
     * @param {Cell} cell
     * @param {(Grid & GridVisual)} grid
     * @return {*}  {Point.Point}
     */
    export const cellMiddle: (cell: Cell, grid: Grid & GridVisual) => Points.Point;
    /**
     * Returns the cells on the line of start and end, inclusive
     *
     * @param {Cell} start Starting cel
     * @param {Cell} end End cell
     * @returns {Cell[]}
     */
    export const getLine: (start: Cell, end: Cell) => ReadonlyArray<Cell>;
    /**
     * Returns cells that correspond to the cardinal directions at a specified distance
     *
     * @param grid Griod
     * @param steps Distance
     * @param start Start poiint
     * @param bound Logic for if bounds of grid are exceeded
     * @returns Cells corresponding to cardinals
     */
    export const offsetCardinals: (grid: Grid, start: Cell, steps: number, bounds?: BoundsLogic) => Neighbours;
    /**
     * Returns an {x,y} signed vector corresponding to the provided cardinal direction.
     * ```
     * const n = getVectorFromCardinal(`n`); // {x: 0, y: -1}
     * ```
     * Optional `multiplier` can be applied to vector
     * ```
     * const n = getVectorFromCardinal(`n`, 10); // {x: 0, y: -10}
     * ```
     *
     * Blank direction returns {x: 0, y: 0}
     * @param cardinal Direction
     * @param multiplier Multipler
     * @returns Signed vector in the form of {x,y}
     */
    export const getVectorFromCardinal: (cardinal: CardinalDirection, multiplier?: number) => Cell;
    /**
     * Returns a list of cells from `start` to `end`.
     *
     * Throws an error if start and end are not on same row or column.
     *
     * @param start Start cell
     * @param end end clel
     * @param endInclusive
     * @return {*}  {ReadonlyArray<Cell>}
     */
    export const simpleLine: (start: Cell, end: Cell, endInclusive?: boolean) => ReadonlyArray<Cell>;
    /**
     *
     * Returns a coordinate offset from `start` by `vector` amount.
     *
     * Different behaviour can be specified for how to handle when coordinates exceed the bounds of the grid
     *
     *
     * Note: x and y wrapping are calculated independently. A large wrapping of x, for example won't shift down a line
     * @param {Grid} grid Grid to traverse
     * @param {Cell} vector Offset in x/y
     * @param {Cell} start Start point
     * @param {BoundsLogic} [bounds=`undefined`]
     * @returns {(Cell | undefined)}
     */
    export const offset: (grid: Grid, start: Cell, vector: Cell, bounds?: BoundsLogic) => Cell | undefined;
    /**
     * Visits every cell in grid using supplied selection function
     * In-built functions to use: visitorDepth, visitorBreadth, visitorRandom
     *
     * Usage example:
     * ```js
     *  let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell);
     *  for (let cell of visitor) {
     *   // do something with cell
     *  }
     * ```
     *
     * If you want to keep tabs on the visitor, pass in a MutableValueSet. This is
     * updated with visited cells (and is used internally anyway)
     * ```js
     *  let visited = new mutableValueSet<Grids.Cell>(c => Grids.cellKeyString(c));
     *  let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell, visited);
     * ```
     *
     * To visit with some delay, try this pattern
     * ```js
     *  const delayMs = 100;
     *  const run = () => {
     *   let cell = visitor.next().value;
     *   if (cell === undefined) return;
     *   // Do something with cell
     *   setTimeout(run, delayMs);
     *  }
     *  setTimeout(run, delayMs);
     * ```
     * @param {(neighbourSelect: NeighbourSelector} neighbourSelect Select neighbour to visit
     * @param {Grid} grid Grid to visit
     * @param {Cell} start Starting cell
     * @param {MutableStringSet<Cell>} [visited] Optional tracker of visited cells
     * @returns {Iterable<Cell>}
     */
    export const visitor: (logic: VisitorLogic, grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorDepth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorBreadth: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorRandomContiguous: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorRandom: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitorRow: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    export const visitFor: (grid: Grid, start: Cell, steps: number, visitor: Visitor) => Cell;
    export const visitorColumn: (grid: Grid, start: Cell, opts?: VisitorOpts) => VisitGenerator;
    /**
     * Enumerate all cells in an efficient manner. If end of grid is reached, iterator will wrap to ensure all are visited.
     *
     * @param {Grid} grid
     * @param {Cell} [start={x:0, y:0}]
     */
    export const cells: (grid: Grid, start?: Cell) => Generator<{
        x: number;
        y: number;
    }, void, unknown>;
}
declare module "geometry/Rect" {
    import { Points, Lines } from "geometry/index";
    export type Rect = {
        readonly width: number;
        readonly height: number;
    };
    export type RectPositioned = Points.Point & Rect;
    export const fromElement: (el: HTMLElement) => Rect;
    export const isEqual: (a: Rect, b: Rect) => boolean;
    export const fromCenter: (origin: Points.Point, width: number, height: number) => RectPositioned;
    export const maxFromCorners: (topLeft: Points.Point, topRight: Points.Point, bottomRight: Points.Point, bottomLeft: Points.Point) => RectPositioned;
    export const guard: (rect: Rect, name?: string) => void;
    export const fromTopLeft: (origin: Points.Point, width: number, height: number) => RectPositioned;
    export const getCorners: (rect: RectPositioned | Rect, origin?: Points.Point | undefined) => readonly Points.Point[];
    export const getCenter: (rect: RectPositioned | Rect, origin?: Points.Point | undefined) => Points.Point;
    /**
     * Returns four lines based on each corner.
     * Lines are given in order: top, right, bottom, left
     *
     * @param {(RectPositioned|Rect)} rect
     * @param {Points.Point} [origin]
     * @returns {Lines.Line[]}
     */
    export const getLines: (rect: RectPositioned | Rect, origin?: Points.Point | undefined) => readonly Lines.Line[];
}
declare module "geometry/index" {
    import * as Arcs from "geometry/Arc";
    import * as Beziers from "geometry/Bezier";
    import * as Circles from "geometry/Circle";
    import * as Compound from "geometry/CompoundPath";
    import * as Grids from "geometry/Grid";
    import * as Lines from "geometry/Line";
    import * as Math from "geometry/Math";
    import * as Paths from "geometry/Path";
    import * as Points from "geometry/Point";
    import * as Rects from "geometry/Rect";
    export { Circles, Arcs, Lines, Rects, Points, Paths, Grids, Beziers, Compound, Math };
}
declare module "collections/CircularArray" {
    import { CircularArray } from "collections/Interfaces";
    /**
     * Returns a new circular array. Immutable. A circular array only keeps up to `capacity` items.
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
     * @template V Value of array items
     * @param {number} capacity Capacity.
     * @return {*}  {CircularArray<V>}
     */
    export const circularArray: <V>(capacity: number) => CircularArray<V>;
}
declare module "collections/MapMultiMutable" {
    import { SimpleEventEmitter } from "Events";
    import { ToString } from "util";
    import { CircularArray, MapArrayEvents, MapArrayOpts, MapCircularOpts, MapMultiOpts, MapOfMutable, MapSetOpts, MultiValue } from "collections/Interfaces";
    class MapOfMutableImpl<V, M> extends SimpleEventEmitter<MapArrayEvents<V>> {
        #private;
        readonly groupBy: ToString<V>;
        readonly type: MultiValue<V, M>;
        constructor(type: MultiValue<V, M>, opts?: MapMultiOpts<V>);
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
         *
         * @param {string} key
         * @return {*}  {readonly}
         * @memberof MutableMapArray
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
     * Takes options { comparer: {@link IsEqual}, toString: {@link ToString}}
     *
     * A custom {@link ToString} function can be provided which is used when checking value equality (`has`, `without`)
     * ```js
     * const map = mapArray({toString:(v) => v.name}); // Compare values based on their `name` field;
     * ```
     *
     * Alternatively, a {@link IsEqual} function can be used:
     * ```js
     * const map = mapArray({comparer: (a, b) => a.name === b.name });
     * ```
     * @param opts
     * @template V Data type of items
     * @returns {@link MapOfMutable}
     */
    export const mapArray: <V>(opts?: MapArrayOpts<V>) => MapOfMutableImpl<V, readonly V[]>;
    /**
     * Returns a {@link MapOfMutable} that uses a set to hold values.
     * This means that only unique values are stored under each key. By default it
     * uses the JSON representation to compare items.
     *
     * Options: { hash: {@link ToString} }
     *
     * @example Only storing the newest three items per key
     * ```js
     * const map = mapSetMutable();
     * map.add(`hello`, [1, 2, 3, 1, 2, 3]);
     * const hello = map.get(`hello`); // [1, 2, 3]
     * ```
     *
     * Provide a {@link ToString} function for custom equality checking
     *
     * @example
     * ```js
     * const hash = (v) => v.name; // Use name as the key
     * const map = mapSetMutable(hash);
     * map.add(`hello`, {age:40, name: `Mary`});
     * map.add(`hello`, {age:29, name: `Mary`}); // Value ignored as same name exists
     * ```
     * @param opts
     * @returns {@link MapOfMutable}
     */
    export const mapSet: <V>(opts?: MapSetOpts<V> | undefined) => MapOfMutableImpl<V, ReadonlyMap<string, V>>;
    /**
     * Returns a {@link MapOfMutable} that uses a {@link CircularArray} to hold values.
     * This means that the number of values stored under each key will be limited to the defined
     * capacity.
     *
     * Requires options: { capacity: number}
     *
     * @example Only storing the newest three items per key
     * ```js
     * const map = mapCircular({capacity: 3});
     * map.add(`hello`, [1, 2, 3, 4, 5]);
     * const hello = map.get(`hello`); // [3, 4, 5]
     * ```
     * @param opts
     * @returns
     */
    export const mapCircular: <V>(opts: MapCircularOpts<V>) => MapOfMutable<V, CircularArray<V>>;
}
declare module "collections/Stack" {
    import { DiscardPolicy, Stack } from "collections/Interfaces";
    import { StackMutable } from "collections/Interfaces";
    export type StackOpts = {
        readonly debug?: boolean;
        readonly capacity?: number;
        readonly overflowPolicy?: DiscardPolicy;
    };
    /**
     * Returns stack (immutable). Use {@link stackMutable} for a mutable one.
     * @example
     * ```js
     * let s = stack();
     * s = s.push(1, 2, 3, 4);
     * s.peek; // 4
     * s = s.pop();
     * s.peek; // 3
     * ```
     * @template V
     * @param {StackOpts} [opts={}]
     * @param {...V[]} startingItems
     * @returns {Stack<V>}
     */
    export const stack: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => Stack<V>;
    /**
     * Creates a stack (mutable). Use {@link stack} for an immutable one.
     *
     * @example
     * ```js
     * const s = stackMutable();
     * s.push(1, 2, 3, 4);
     * s.peek;  // 4
     * s.pop;   // 4
     * s.peek;  // 3
     * ```
     * @template V
     * @param {StackOpts} opts
     * @param {...V[]} startingItems
     * @returns
     */
    export const stackMutable: <V>(opts: StackOpts, ...startingItems: readonly V[]) => StackMutable<V>;
}
declare module "collections/Queue" {
    import { QueueMutable, Queue, DiscardPolicy } from "collections/Interfaces";
    /**
     * Queue options.
     *
     * @example Cap size to 5 items, throwing away newest items already in queue.
     * ```js
     * const q = queue({capacity: 5, discardPolicy: `newer`});
     * ```
     */
    export type QueueOpts = {
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
    export const queue: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => Queue<V>;
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
    export const queueMutable: <V>(opts?: QueueOpts, ...startingItems: readonly V[]) => QueueMutable<V>;
}
declare module "collections/MapImmutable" {
    import { EitherKey, MapImmutable } from "collections/Interfaces";
    /**
     * Returns true if map contains key
     *
     * @example
     * ```js
     * if (has(map, `London`)) ...
     * ```
     * @param map Map to search
     * @param key Key to find
     * @returns True if map contains key
     */
    export const has: <K, V>(map: ReadonlyMap<K, V>, key: K) => boolean;
    /**
     * Adds data to a map, returning the new map.
     *
     * Can add items in the form of [key,value] or {key, value}.
     * @example These all produce the same result
     * ```js
     * map.set(`hello`, `samantha`);
     * map.add([`hello`, `samantha`]);
     * map.add({key: `hello`, value: `samantha`})
     * ```
     * @param map Initial data
     * @param data One or more data to add in the form of [key,value] or {key, value}
     * @returns New map with data added
     */
    export const add: <K, V>(map: ReadonlyMap<K, V>, ...data: EitherKey<K, V>) => ReadonlyMap<K, V>;
    /**
     * Sets data in a copy of the initial map
     * @param map Initial map
     * @param key Key
     * @param value Value to  set
     * @returns New map with data set
     */
    export const set: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V) => Map<K, V>;
    /**
     * Delete a key from the map, returning a new map
     * @param map Initial data
     * @param key
     * @returns New map with data deleted
     */
    export const del: <K, V>(map: ReadonlyMap<K, V>, key: K) => ReadonlyMap<K, V>;
    /**
     * Returns an {@link MapImmutable}.
     * Use {@link mapMutable} as an alternatve.
     *
     * @param dataOrMap Optional initial data in the form of an array of {key:value} or [key,value]
     * @returns {@link MapImmutable}
     */
    export const map: <K, V>(dataOrMap?: ReadonlyMap<K, V> | EitherKey<K, V> | undefined) => MapImmutable<K, V>;
}
declare module "collections/MapMutable" {
    import { EitherKey, MapMutable } from "collections/Interfaces";
    /**
     * Returns a {@link MapMutable} (which just wraps the in-built Map)
     * Use {@link map} for the immutable alternative.
     *
     * @param data Optional initial data in the form of an array of {key:value} or [key,value]
     * @returns {@link MapMutable}
     */
    export const mapMutable: <K, V>(...data: EitherKey<K, V>) => MapMutable<K, V>;
}
declare module "collections/index" {
    export * from "collections/Interfaces";
    export { mapSet, mapCircular, mapArray } from "collections/MapMultiMutable";
    export { circularArray } from "collections/CircularArray";
    export { simpleMapArrayMutable } from "collections/SimpleMapArray";
    export { setMutable } from "collections/Set";
    export { stack, stackMutable } from "collections/Stack";
    export { queue, queueMutable } from "collections/Queue";
    export { map } from "collections/MapImmutable";
    export { mapMutable } from "collections/MapMutable";
    /**
     * Stacks store items in order.
     *
     * Stacks and queues can be helpful when it's necessary to process data in order, but each one has slightly different behaviour.
     *
     * Like a stack of plates, the newest item (on top) is removed
     * before the oldest items (at the bottom). {@link Queues} operate differently, with
     * the oldest items (at the front of the queue) removed before the newest items (at the end of the queue).
     *
     * Create stacks with {@link stack} or {@link stackMutable}. These return a {@link Stack} or {@link StackMutable} respectively.
     *
     * The ixfx implementation allow you to set a capacity limit with three {@link DiscardPolicy |policies} for
     * how items are evicted.
     */
    export * as Stacks from "collections/Stack";
    /**
     * Arrays are a list of data.
     *
     * ixfx has several functions for working with arrays.
     *
     * For arrays of numbers: {@link average}, {@link minMaxAvg}
     *
     * Randomisation: {@link randomIndex}, {@link randomElement}, {@link shuffle}
     *
     * Filtering: {@link without}
     *
     * Changing the shape: {@link groupBy}
     */
    export * as Arrays from "collections/Arrays";
    /**
     * Sets store unique items.
     *
     * ixfx's {@link SetMutable} compares items by value rather than reference, unlike the default JS implementation.
     *
     * Create using {@link setMutable}
     */
    export * as Sets from "collections/Set";
    /**
     * Queues store items in the order in which they are added.
     *
     * Stacks and queues can be helpful when it's necessary to process data in order, but each one has slightly different behaviour.
     *
     * Like lining up at a bakery, the oldest items (at the front of the queue) are removed
     * before the newest items (at the end of the queue). This is different to {@link Stacks},
     * where the newest item (on top) is removed before the oldest items (at the bottom).
     *
     * The ixfx implementations allow you to set a capacity limit with three {@link DiscardPolicy |policies} for
     * how items are evicted.
     *
     * Create queues with {@link queue} or {@link queueMutable}. These return a {@link Queue} or {@link QueueMutable} respectively.
     */
    export * as Queues from "collections/Queue";
    /**
     * Maps associate keys with values. Several helper functions are provided
     * for working with the standard JS Map class.
     *
     * ixfx also includes {@link MapMutable}, {@link MapImmutable}
     */
    export * as Maps from "collections/Map";
}
declare module "dom/Util" {
    import { Observable } from 'rxjs';
    import { Points } from "geometry/index";
    type ResizeArgs = {
        readonly ctx: CanvasRenderingContext2D;
        readonly el: HTMLCanvasElement;
        readonly bounds: {
            readonly width: number;
            readonly height: number;
            readonly center: Points.Point;
        };
    };
    /**
     * Resizes given canvas element to match window size. To resize canvas to match its parent, use {@link parentSizeCanvas}.
     *
     * To make the canvas appear propery, it sets the following CSS:
     * ```css
     * {
     *  top: 0;
     *  left: 0;
     *  zIndex: -1;
     *  position: fixed;
     * }
     * ```
     * Pass _true_ for `skipCss` to avoid this.
     *
     * Provide a callback for when resize happens.
     * @param domQueryOrEl Query string or reference to canvas element
     * @param onResized Callback for when resize happens, eg for redrawing canvas
     * @param skipCss if true, style are not added
     * @returns Observable
     */
    export const fullSizeCanvas: (domQueryOrEl: string | HTMLCanvasElement, onResized?: ((args: ResizeArgs) => void) | undefined, skipCss?: boolean) => Observable<Event>;
    /**
     * Resizes given canvas element to its parent element. To resize canvas to match the viewport, use {@link fullSizeCanvas}.
     *
     * Provide a callback for when resize happens.
     * @param domQueryOrEl Query string or reference to canvas element
     * @param onResized Callback for when resize happens, eg for redrawing canvas
     * @returns Observable
     */
    export const parentSizeCanvas: (domQueryOrEl: string | HTMLCanvasElement, onResized?: ((args: ResizeArgs) => void) | undefined, timeoutMs?: number) => import("rxjs").Subscription;
    /**
     * Returns an Observable for window resize. Default 100ms debounce.
     * @param timeoutMs
     * @returns
     */
    export const windowResize: (timeoutMs?: number) => Observable<Event>;
    /**
     * Resolves either a string or HTML element to an element.
     * Useful when an argument is either an HTML element or query.
     *
     * ```js
     * resolveEl(`#someId`);
     * resolveEl(someElement);
     * ```
     * @param domQueryOrEl
     * @returns
     */
    export const resolveEl: <V extends HTMLElement>(domQueryOrEl: string | V) => V;
    /**
     * Creates an element after `sibling`
     * ```
     * const el = createAfter(siblingEl, `DIV`);
     * ```
     * @param sibling Element
     * @param tagName Element to create
     * @returns New element
     */
    export const createAfter: (sibling: HTMLElement, tagName: string) => HTMLElement;
    /**
     * Creates an element inside of `parent`
     * ```
     * const newEl = createIn(parentEl, `DIV`);
     * ```
     * @param parent Parent element
     * @param tagName Tag to create
     * @returns New element
     */
    export const createIn: (parent: HTMLElement, tagName: string) => HTMLElement;
    /**
     * Observer when document's class changes
     *
     * ```js
     * const c = themeChangeObservable();
     * c.subscribe(() => {
     *  // Class has changed...
     * });
     * ```
     * @returns
     */
    export const themeChangeObservable: () => Observable<readonly MutationRecord[]>;
    /**
     * Observer when element resizes. Specify `timeoutMs` to debounce.
     *
     * ```
     * const o = resizeObservable(myEl, 500);
     * o.subscribe(() => {
     *  // called 500ms after last resize
     * });
     * ```
     * @param elem
     * @param timeoutMs Tiemout before event gets triggered
     * @returns
     */
    export const resizeObservable: (elem: Element, timeoutMs?: number) => Observable<readonly ResizeObserverEntry[]>;
    /**
     * Copies string representation of object to clipboard
     * @param obj
     * @returns Promise
     */
    export const copyToClipboard: (obj: object) => Promise<unknown>;
}
declare module "visual/Drawing" {
    import * as Points from "geometry/Point";
    import * as Paths from "geometry/Path";
    import * as Lines from "geometry/Line";
    import * as Circles from "geometry/Circle";
    import * as Arcs from "geometry/Arc";
    import * as Beziers from "geometry/Bezier";
    import * as Rects from "geometry/Rect";
    import { Stack } from "collections/index";
    type CanvasCtxQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
    /**
     * Gets a 2d drawing context from canvas element or query, or throws an error
     * @param canvasElCtxOrQuery Canvas element reference or DOM query
     * @returns Drawing context.
     */
    export const getCtx: (canvasElCtxOrQuery: CanvasCtxQuery) => CanvasRenderingContext2D;
    /**
     * Makes a helper object that wraps together a bunch of drawing functions that all use the same drawing context
     * @param ctxOrCanvasEl Drawing context or canvs element reference
     * @param canvasBounds Bounds of drawing (optional). Used for limiting `textBlock`
     * @returns
     */
    export const makeHelper: (ctxOrCanvasEl: CanvasCtxQuery, canvasBounds?: Rects.Rect | undefined) => {
        paths(pathsToDraw: Paths.Path[], opts?: DrawingOpts | undefined): void;
        line(lineToDraw: Lines.Line | Lines.Line[], opts?: DrawingOpts | undefined): void;
        rect(rectsToDraw: Rects.RectPositioned | Rects.RectPositioned[], opts?: (DrawingOpts & {
            filled?: boolean | undefined;
        }) | undefined): void;
        bezier(bezierToDraw: Beziers.QuadraticBezier | Beziers.CubicBezier, opts?: DrawingOpts | undefined): void;
        connectedPoints(pointsToDraw: Points.Point[], opts?: (DrawingOpts & {
            loop?: boolean | undefined;
        }) | undefined): void;
        pointLabels(pointsToDraw: Points.Point[], opts?: DrawingOpts | undefined): void;
        dot(dotPosition: Points.Point | Points.Point[], opts?: (DrawingOpts & {
            radius: number;
            outlined?: boolean | undefined;
            filled?: boolean | undefined;
        }) | undefined): void;
        circle(circlesToDraw: Circles.CirclePositioned | Circles.CirclePositioned[], opts: DrawingOpts): void;
        arc(arcsToDraw: Arcs.ArcPositioned | Arcs.ArcPositioned[], opts: DrawingOpts): void;
        textBlock(lines: string[], opts: DrawingOpts & {
            anchor: Points.Point;
            anchorPadding?: number;
            bounds?: Rects.RectPositioned;
        }): void;
    };
    /**
     * Drawing options
     */
    type DrawingOpts = {
        /**
         * Stroke style
         */
        readonly strokeStyle?: string;
        /**
         * Fill style
         */
        readonly fillStyle?: string;
        /**
         * If true, diagnostic helpers will be drawn
         */
        readonly debug?: boolean;
    };
    /**
     * Draws one or more arcs.
     * @param ctx
     * @param arcs
     * @param opts
     */
    export const arc: (ctx: CanvasRenderingContext2D, arcs: Arcs.ArcPositioned | ReadonlyArray<Arcs.ArcPositioned>, opts?: DrawingOpts) => void;
    /**
     * A drawing stack operation
     */
    type StackOp = (ctx: CanvasRenderingContext2D) => void;
    /**
     * A drawing stack (immutable)
     */
    type DrawingStack = Readonly<{
        /**
         * Push a new drawing op
         * @param op Operation to add
         * @returns stack with added op
         */
        push(op: StackOp): DrawingStack;
        /**
         * Pops an operatiomn
         * @returns Drawing stack with item popped
         */
        pop(): DrawingStack;
        /**
         * Applies drawing stack
         */
        apply(): DrawingStack;
    }>;
    /**
     * Creates and returns an immutable drawing stack for a context
     * @param ctx Context
     * @param stk Initial stack operations
     * @returns
     */
    export const drawingStack: (ctx: CanvasRenderingContext2D, stk?: Stack<StackOp> | undefined) => DrawingStack;
    /**
     * Draws one or more circles
     * @param ctx
     * @param circlesToDraw
     * @param opts
     */
    export const circle: (ctx: CanvasRenderingContext2D, circlesToDraw: Circles.CirclePositioned | readonly Circles.CirclePositioned[], opts?: DrawingOpts) => void;
    /**
     * Draws one or more paths.
     * supported paths are quadratic beziers and lines.
     * @param ctx
     * @param pathsToDraw
     * @param opts
     */
    export const paths: (ctx: CanvasRenderingContext2D, pathsToDraw: readonly Paths.Path[] | Paths.Path, opts?: Readonly<{
        readonly strokeStyle?: string;
        readonly debug?: boolean;
    }>) => void;
    /**
     * Draws a line between all the given points.
     *
     * @param ctx
     * @param pts
     */
    export const connectedPoints: (ctx: CanvasRenderingContext2D, pts: readonly Points.Point[], opts?: {
        readonly loop?: boolean;
        readonly strokeStyle?: string;
    }) => void;
    /**
     * Draws labels for a set of points
     * @param ctx
     * @param pts Points to draw
     * @param opts
     * @param labels Labels for points
     */
    export const pointLabels: (ctx: CanvasRenderingContext2D, pts: readonly Points.Point[], opts?: {
        readonly fillStyle?: string;
    }, labels?: readonly string[] | undefined) => void;
    /**
     * Draws a cubic or quadratic bezier
     * @param ctx
     * @param bezierToDraw
     * @param opts
     */
    export const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: Beziers.QuadraticBezier | Beziers.CubicBezier, opts?: DrawingOpts | undefined) => void;
    /**
     * Draws one or more lines
     * @param ctx
     * @param toDraw
     * @param opts
     */
    export const line: (ctx: CanvasRenderingContext2D, toDraw: Lines.Line | readonly Lines.Line[], opts?: {
        readonly strokeStyle?: string;
        readonly debug?: boolean;
    }) => void;
    /**
     * Draws one or more rectangles
     * @param ctx
     * @param toDraw
     * @param opts
     */
    export const rect: (ctx: CanvasRenderingContext2D, toDraw: Rects.RectPositioned | readonly Rects.RectPositioned[], opts?: DrawingOpts & {
        readonly filled?: boolean;
    }) => void;
    /**
     * Draws a block of text. Each array item is considered a line.
     * @param ctx
     * @param lines
     * @param opts
     */
    export const textBlock: (ctx: CanvasRenderingContext2D, lines: readonly string[], opts: DrawingOpts & {
        readonly anchor: Points.Point;
        readonly anchorPadding?: number;
        readonly bounds?: Rects.RectPositioned;
    }) => void;
}
declare module "visual/Svg" {
    import { CirclePositioned } from "geometry/Circle";
    import { Line } from "geometry/Line";
    import { Point } from "geometry/Point";
    export type DrawingOpts = {
        readonly strokeStyle?: string;
        readonly fillStyle?: string;
        readonly debug?: boolean;
        readonly strokeWidth?: number;
    };
    export type TextDrawingOpts = DrawingOpts & {
        readonly anchor?: `start` | `middle` | `end`;
        readonly align?: `text-bottom` | `text-top` | `baseline` | `top` | `hanging` | `middle`;
    };
    export const createPath: (svg: string, parent: SVGElement, opts?: DrawingOpts | undefined) => SVGPathElement;
    export const createCircle: (circle: CirclePositioned, parent: SVGElement, opts?: DrawingOpts | undefined) => SVGCircleElement;
    export const createLine: (line: Line, parent: SVGElement, opts?: DrawingOpts | undefined, id?: string | undefined) => SVGLineElement;
    export const createText: (pos: Point, text: string, parent: SVGElement, opts?: TextDrawingOpts | undefined, id?: string | undefined) => SVGTextElement;
    export const svg: (parent: SVGElement, opts?: DrawingOpts | undefined) => {
        text: (pos: Point, text: string, opts?: TextDrawingOpts | undefined, id?: string | undefined) => SVGTextElement;
        line: (line: Line, opts?: DrawingOpts | undefined, id?: string | undefined) => SVGLineElement;
        circle: (circle: CirclePositioned, opts?: DrawingOpts | undefined) => SVGCircleElement;
        path: (svgStr: string, opts?: DrawingOpts | undefined) => SVGPathElement;
        query: <V extends SVGElement>(selectors: string) => V | null;
        width: number;
        height: number;
        clear: () => void;
    };
}
declare module "visual/Palette" {
    /**
     * Manage a set of colours. Uses CSS variables as a fallback if colour is not added
     *
     */
    export type Palette = {
        setElementBase(el: Element): void;
        has(key: string): boolean;
        /**
         * Returns a colour by name.
         *
         * If the colour is not found:
         *  1. Try to use a CSS variable `--key`, or
         *  2. The next fallback colour is used (array cycles)
         *
         * @param key
         * @returns
         */
        get(key: string, fallback?: string): string;
        /**
         * Gets a colour by key, adding and returning fallback if not present
         * @param key Key of colour
         * @param fallback Fallback colour if key is not found
         */
        getOrAdd(key: string, fallback?: string): string;
        /**
         * Adds a colour with a given key
         *
         * @param key
         * @param colour
         */
        add(key: string, value: string): void;
    };
    export const create: (fallbacks?: readonly string[] | undefined) => Palette;
    /**
     * Gets a CSS variable.
     * @example Fetch --accent variable, or use `yellow` if not found.
     * ```
     * getCssVariable(`accent`, `yellow`);
     * ```
     * @param name Name of variable. Do not starting `--`
     * @param fallbackColour Fallback colour if not found
     * @param root  Element to search variable from
     * @returns Colour or fallback.
     */
    export const getCssVariable: (name: string, fallbackColour?: string, root?: HTMLElement | undefined) => string;
}
declare module "visual/Plot2" {
    import { CircularArray, MapOfMutable } from "collections/Interfaces";
    import * as Palette from "visual/Palette";
    type Series = {
        min: number;
        max: number;
        range: number;
        name: string;
    };
    type DrawingOpts = PlotOpts & {
        ctx: CanvasRenderingContext2D;
        width: number;
        height: number;
        dataXScale?: number;
        yLabelWidth: number;
        palette: Palette.Palette;
        textHeight: number;
        capacity: number;
        coalesce: boolean;
    };
    type PlotOpts = {
        palette?: Palette.Palette;
        capacity?: number;
        showYAxis?: boolean;
        yAxes?: string[] | string;
        textHeight?: number;
        lineWidth?: number;
        coalesce?: boolean;
    };
    export const createScales: (buffer: MapOfMutable<number, CircularArray<number>>) => Series[];
    export const add: (buffer: MapOfMutable<number, CircularArray<number>>, value: number, series?: string) => void;
    export const draw: (buffer: MapOfMutable<number, CircularArray<number>>, drawing: DrawingOpts) => void;
    export const drawSeriesAxis: (series: Series, drawing: DrawingOpts) => void;
    export const drawSeries: (series: Series, values: CircularArray<number>, drawing: DrawingOpts) => void;
    /**
     * Creates a simple horizontal data plot within a DIV.
     *
     * ```
     * const plot = plot2(`#parentDiv`);
     * plot.add(10);
     * plot.clear();
     *
     * // Plot data using series
     * plot.add(-1, `temp`);
     * plot.add(0.4, `humidty`);
     * ```
     *
     * Options can be specified to customise plot
     * ```
     * const plot = plot2(`#parentDiv`, {
     *  capacity: 100,     // How many data points to store (default: 10)
     *  showYAxis: false,  // Toggle whether y axis is shown (default: true)
     *  lineWidth: 2,      // Width of plot line (default: 2)
     *  yAxes:  [`temp`],  // Only show these y axes (by default all are shown)
     *  palette: Palette,  // Colour palette instance to use
     *  coalesce: true,    // If true, sub-pixel data points are skipped, improving performance for dense plots at the expense of plot precision
     * });
     * ```
     *
     * By default, will attempt to use CSS variable `--series[seriesName]` for axis colours. -axis for titles.
     * @param {string} parentElOrQuery
     * @param {PlotOpts} opts
     * @return {*}
     */
    export const plot2: (parentElOrQuery: string | HTMLElement, opts: PlotOpts) => {
        add: (value: number, series?: string, skipDrawing?: boolean) => void;
        clear: () => void;
    };
}
declare module "visual/DictionaryOfColourCombinationsData" {
    export const data: {
        name: string;
        combinations: number[];
        swatch: number;
        cmyk: number[];
        lab: number[];
        rgb: number[];
        hex: string;
    }[];
}
declare module "visual/DictionaryOfColourCombinations" {
    type Cmyk = readonly [number, number, number, number];
    type Lab = readonly [number, number, number];
    type Rgb = readonly [number, number, number];
    export type DictColour = {
        readonly name: string;
        readonly combinations: ReadonlyArray<number>;
        readonly swatch: number;
        readonly cmyk: Cmyk;
        readonly lab: Lab;
        readonly rgb: Rgb;
        readonly hex: string;
    };
    export const randomPalette: (minColours?: number) => readonly DictColour[];
}
declare module "visual/index" {
    import * as Drawing from "visual/Drawing";
    import * as Svg from "visual/Svg";
    import * as Plot from "visual/Plot2";
    import * as DictionaryOfColourCombinations from "visual/DictionaryOfColourCombinations";
    import * as Palette from "visual/Palette";
    export { Palette, Drawing, Svg, Plot, DictionaryOfColourCombinations };
}
declare module "dom/ShadowDom" {
    export const addShadowCss: (parentEl: HTMLElement, styles: string) => ShadowRoot;
}
declare module "dom/Log" {
    export type LogOpts = {
        readonly capacity?: number;
        readonly timestamp?: boolean;
        readonly collapseDuplicates?: boolean;
        readonly monospaced?: boolean;
        readonly minIntervalMs?: number;
    };
    export type Log = Readonly<{
        clear(): void;
        error(msgOrError: string | Error | unknown): void;
        log(msg?: string | object | number): void;
        append(el: HTMLElement): void;
        dispose(): void;
        readonly isEmpty: boolean;
    }>;
    /**
     * Allows writing to a DOM element in console.log style. Element grows in size, so use
     * something like `overflow-y: scroll` on its parent
     *
     * ```
     * const l = log(`#dataStream`); // Assumes HTML element with id `dataStream` exists
     * l.log(`Hi`);
     * l.log(); // Displays a horizontal rule
     *
     * const l = log(document.getElementById(`dataStream`), {
     *  timestamp: true,
     *  truncateEntries: 20
     * });
     * l.log(`Hi`);
     * l.error(`Some error`); // Adds class `error` to line
     * ```
     *
     * For logging high-throughput streams:
     * ```
     * // Silently drop log if it was less than 5ms since the last
     * const l = log(`#dataStream`, { minIntervalMs: 5 });
     *
     * // Only the last 100 entries are kept
     * const l = log(`#dataStream`, { capacity: 100 });
     * ```
     *
     * @param {(HTMLElement | string | undefined)} elOrId Element or id of element
     * @param {LogOpts} opts
     * @returns {Log}
     */
    export const log: (domQueryOrEl: HTMLElement | string, opts?: LogOpts) => Log;
}
declare module "dom/DomRx" {
    /**
     * @private
     */
    export type PluckOpts = {
        readonly pluck: string;
    };
    /**
     * @private
     */
    export type TransformOpts = {
        transform(ev: Event): any;
    };
    /**
     * Responsive value
     */
    export type Rx<V> = {
        /**
         * Last value
         */
        readonly value: V;
        /**
         * Clears last value
         */
        readonly clear: () => void;
    };
    export type DomRxOpts = PluckOpts | TransformOpts;
    /**
     * Keeps track of last event data
     *
     * ```js
     * const pointer = rx(`#myDiv`, `pointermove`).value;
     *
     * if (pointer.clientX > ...)
     * ```
     *
     * Pluck a field:
     * ```js
     * const pointerX = rx(`#myDiv`, `pointermove`, {pluck: `clientX`}).value;
     *
     * if (pointerX > ...)
     * ```
     * @template V Event type
     * @param opts
     * @return
     */
    export const rx: <V>(elOrQuery: HTMLElement | string, event: string, opts?: DomRxOpts | undefined) => Rx<V>;
}
declare module "dom/Forms" {
    /**
     * Quick access to <input type="checkbox"> value.
     * Provide a checkbox by string id or object reference. If a callback is
     * supplied, it will be called when the checkbox changes value.
     *
     * ```
     * const opt = checkbox(`#chkMate`);
     * opt.checked; // Gets/sets
     *
     * const opt = checkbox(document.getElementById(`#chkMate`), newVal => {
     *  if (newVal) ...
     * });
     * ```
     * @param {(string | HTMLInputElement)} domIdOrEl
     * @param {(currentVal:boolean) => void} [onChanged]
     * @returns
     */
    export const checkbox: (domIdOrEl: string | HTMLInputElement, onChanged?: ((currentVal: boolean) => void) | undefined) => {
        checked: boolean;
    };
    /**
     * Numeric INPUT
     *
     * ```
     * const el = numeric(`#num`, (currentValue) => {
     *  // Called when input changes
     * })
     * ```
     *
     * Get/set value
     * ```
     * el.value = 10;
     * ```
     * @param domIdOrEl
     * @param onChanged
     * @param live If true, event handler fires based on `input` event, rather than `change`
     * @returns
     */
    export const numeric: (domIdOrEl: string | HTMLInputElement, onChanged?: ((currentVal: number) => void) | undefined, live?: boolean | undefined) => {
        value: number;
    };
    /**
     * SELECT options
     */
    export type SelectOpts = {
        /**
         * Placeholder item
         */
        readonly placeholderOpt?: string;
        /**
         * If true, a placeholder option 'Choose' is added to the list
         */
        readonly shouldAddChoosePlaceholder?: boolean;
        /**
         * Item to choose after a selection is made
         */
        readonly autoSelectAfterChoice?: number;
    };
    /**
     * Button
     *
     * ```
     * const b = button(`#myButton`, () => {
     *  console.log(`Button clicked`);
     * });
     * ```
     *
     * ```
     * b.click(); // Call the click handler
     * b.disabled = true / false;
     * ```
     * @param domQueryOrEl Query string or element instance
     * @param onClick Callback when button is clicked
     * @returns
     */
    export const button: (domQueryOrEl: string | HTMLButtonElement, onClick?: (() => void) | undefined) => {
        click(): void;
        disabled: boolean;
    };
    /**
     * SELECT handler
     */
    export interface SelectHandler {
        /**
         * Sets disabled
         */
        set disabled(value: boolean);
        /**
         * Gets disabled
         */
        get disabled(): boolean;
        /**
         * Gets value
         */
        get value(): string;
        /**
         * Sets selected index
         */
        get index(): number;
        /**
         * _True_ if currently selected item is the placeholder
         */
        get isSelectedPlaceholder(): boolean;
        /**
         * Set options
         * @param opts Options
         * @param preSelect Item to preselect
         */
        setOpts(opts: readonly string[], preSelect?: string): void;
        /**
         * Select item by index
         * @param index Index
         * @param trigger If true, triggers change event
         */
        select(index?: number, trigger?: boolean): void;
    }
    /**
     * SELECT element.
     *
     * Handle changes in value:
     * ```
     * const mySelect = select(`#mySelect`, (newValue) => {
     *  console.log(`Value is now ${newValue}`);
     * });
     * ```
     *
     * Enable/disable:
     * ```
     * mySelect.disabled = true / false;
     * ```
     *
     * Get currently selected index or value:
     * ```
     * mySelect.value / mySelect.index
     * ```
     *
     * Is the currently selected value a placeholder?
     * ```
     * mySelect.isSelectedPlaceholder
     * ```
     *
     * Set list of options
     * ```
     * // Adds options, preselecting `opt2`.
     * mySelect.setOpts([`opt1`, `opt2 ...], `opt2`);
     * ```
     *
     * Select an element
     * ```
     * mySelect.select(1); // Select second item
     * mySelect.select(1, true); // If true is added, change handler fires as well
     * ```
     * @param {(string|HTMLSelectElement)} domIdOrEl
     * @param {(currentVal:string) => void} [onChanged]
     * @param {SelectOpts} [opts={}]
     * @return {*}
     */
    export const select: (domIdOrEl: string | HTMLSelectElement, onChanged?: ((currentVal: string) => void) | undefined, opts?: SelectOpts) => SelectHandler;
}
declare module "dom/index" {
    export * from "dom/Log";
    export * from "dom/DomRx";
    export * from "dom/Util";
    /**
     * Functions for working with DOM elements
     */
    export * as Forms from "dom/Forms";
}
declare module "Timer" {
    /**
     * A timer instance
     * @private
     */
    export type Timer = {
        reset(): void;
        get elapsed(): number;
    };
    /**
     * @private
     */
    export type HasCompletion = {
        get isDone(): boolean;
    };
    /**
     * A resettable timeout, returned by {@link timeout}
     */
    export type Timeout = HasCompletion & {
        start(altTimeoutMs?: number): void;
        cancel(): void;
        get isDone(): boolean;
    };
    /**
     * Returns a {@link Timeout} that can be triggered, cancelled and reset
     *
     * Once `start()` is called, `callback` will be scheduled to execute after `timeoutMs`.
     * If `start()` is called again, the waiting period will be reset to `timeoutMs`.
     *
     * @example Essential functionality
     * ```js
     * const fn = () => {
     *  console.log(`Executed`);
     * };
     * const t = timeout(fn, 60*1000);
     * t.start();   // After 1 minute `fn` will run, printing to the console
     * ```
     *
     * @example More functionality
     * ```
     * t.cancel();  // Cancel it from running
     * t.start();   // Schedule again after 1 minute
     * t.start(30*1000); // Cancel that, and now scheduled after 30s
     * t.isDone;    // True if a scheduled event is pending
     * ```
     *
     * @param callback
     * @param timeoutMs
     * @returns {@link Timeout}
     */
    export const timeout: (callback: () => void, timeoutMs: number) => Timeout;
    /**
     * Runs a function continuously, returned by {@link Continuously}
     */
    export type Continuously = HasCompletion & {
        start(): void;
        get ticks(): number;
        get isDone(): boolean;
        cancel(): void;
    };
    /**
     * Returns a {@link Continuously} that continuously executes `callback`. Call `start` to begin.
     *
     * @example Animation loop
     * ```js
     * const draw = () => {
     *  // Draw on canvas
     * }
     * continuously(draw).start(); // Run draw as fast as possible using `window.requestAnimationFrame`
     * ```
     *
     * @example With delay
     * ```js
     * const fn = () => {
     *  console.log(`1 minute`);
     * }
     * const c = continuously(fn, 60*1000);
     * c.start(); // Runs `fn` every minute
     * ```
     *
     * @example With res
     * @param callback
     * @param resetCallback
     * @param intervalMs
     * @returns
     */
    export const continuously: (callback: (ticks?: number | undefined) => boolean | void, intervalMs?: number | undefined, resetCallback?: ((ticks?: number | undefined) => boolean | void) | undefined) => Continuously;
    /**
     * Pauses execution for `timeoutMs`.
     *
     * @example
     * ```js
     * console.log(`Hello`);
     * await sleep(1000);
     * console.log(`There`); // Prints one second after
     * ```
     * @param timeoutMs
     * @return
     */
    export const sleep: <V>(timeoutMs: number) => Promise<V>;
    /**
     * Pauses execution for `timeoutMs` after which the asynchronous `callback` is executed and awaited.
     *
     * @example
     * ```js
     * const result = await delay(async () => Math.random(), 1000);
     * console.log(result); // Prints out result after one second
     * ```
     * @template V
     * @param callback
     * @param timeoutMs
     * @return
     */
    export const delay: <V>(callback: () => Promise<V>, timeoutMs: number) => Promise<V>;
    /**
     * Creates a timer
     * @private
     */
    export type TimerSource = () => Timer;
    /**
     * Wraps a timer, returning a relative elapsed value.
     *
     * ```js
     * let t = relativeTimer(1000, msElapsedTimer());
     * ```
     *
     * @private
     * @param total
     * @param timer
     * @param clampValue
     * @returns
     */
    export const relativeTimer: (total: number, timer: Timer, clampValue?: boolean) => Timer & HasCompletion;
    /**
     * A timer that uses clock time
     * @private
     * @returns {Timer}
     */
    export const msElapsedTimer: () => Timer;
    /**
     * A timer that progresses with each call
     * @private
     * @returns {Timer}
     */
    export const ticksElapsedTimer: () => Timer;
}
declare module "modulation/Easing" {
    import { HasCompletion } from "Timer";
    /**
     * Creates an easing based on clock time
     * @inheritdoc Easing
     * @example Time based easing
     * ```
     * const t = timer(`easeIn`, 5*1000); // Will take 5 seconds to complete
     * ...
     * t.compute(); // Get current value of easing
     * t.reset();   // Reset to 0
     * t.isDone;    // _True_ if finished
     * ```
     * @param name Name of easing
     * @param durationMs Duration in milliseconds
     * @returns Easing
     */
    export const easeOverTime: (name: EasingName, durationMs: number) => Easing;
    /**
     * Creates an easing based on ticks
     *
     * @inheritdoc Easing
     * @example Tick-based easing
     * ```
     * const t = tick(`easeOut`, 1000);   // Will take 1000 ticks to complete
     * t.compute(); // Each call to `compute` progresses the tick count
     * t.reset();   // Reset to 0
     * t.isDone;    // _True_ if finished
     * ```
     * @param name Name of easing
     * @param durationTicks Duration in ticks
     * @returns Easing
     */
    export const easeOverTicks: (name: EasingName, durationTicks: number) => Easing;
    /**
     * 'Ease' from `0` to `1` over a delicious curve. Used commonly for animation
     * and basic modelling of phyical motion.
     *
     * Create via {@link easeOverTicks} or {@link easeOverTime}, call `compute` to calculate the next
     * value in the progression, until you reach `1` or `isDone` returns true.
     *
     * For [demos of functions](https://easings.net/)
     *
     */
    export type Easing = HasCompletion & {
        /**
         * Computes the current value of the easing
         *
         * @returns {number}
         */
        compute(): number;
        /**
         * Reset the easing
         */
        reset(): void;
        /**
         * Returns true if the easing is complete
         *
         * @returns {boolean}
         */
        get isDone(): boolean;
    };
    export type EasingName = keyof typeof easings;
    /**
     * @private
     * @returns Returns list of available easing names
     */
    export const getEasings: () => readonly string[];
    const easings: {
        easeInSine: (x: number) => number;
        easeOutSine: (x: number) => number;
        easeInQuad: (x: number) => number;
        easeOutQuad: (x: number) => number;
        easeInOutSine: (x: number) => number;
        easeInOutQuad: (x: number) => number;
        easeInCubic: (x: number) => number;
        easeOutCubic: (x: number) => number;
        easeInQuart: (x: number) => number;
        easeOutQuart: (x: number) => number;
        easeInQuint: (x: number) => number;
        easeOutQuint: (x: number) => number;
        easeInExpo: (x: number) => number;
        easeOutExpo: (x: number) => number;
        easeInOutQuint: (x: number) => number;
        easeInOutExpo: (x: number) => number;
        easeInCirc: (x: number) => number;
        easeOutCirc: (x: number) => number;
        easeInBack: (x: number) => number;
        easeOutBack: (x: number) => number;
        easeInOutCirc: (x: number) => number;
        easeInOutBack: (x: number) => number;
        easeInElastic: (x: number) => number;
        easeOutElastic: (x: number) => number;
        easeInBounce: (x: number) => number;
        easeOutBounce: (x: number) => number;
        easeInOutElastic: (x: number) => number;
        easeInOutBounce: (x: number) => number;
    };
}
declare module "StateMachine" {
    import { SimpleEventEmitter } from "Events";
    export interface Options {
        readonly debug?: boolean;
    }
    export interface StateChangeEvent {
        readonly newState: string;
        readonly priorState: string;
    }
    export interface StopEvent {
        readonly state: string;
    }
    type StateMachineEventMap = {
        readonly change: StateChangeEvent;
        readonly stop: StopEvent;
    };
    type StateEvent = (args: unknown, sender: StateMachine) => void;
    type StateHandler = string | StateEvent | null;
    export interface State {
        readonly [event: string]: StateHandler;
    }
    export interface MachineDescription {
        readonly [key: string]: string | readonly string[] | null;
    }
    /**
     * Returns a machine description based on a list of strings. The final string is the final
     * state.
     *
     * ```js
     * const states = [`one`, `two`, `three`];
     * const sm = new StateMachine(states[0], fromList(states));
     * ```
     * @param {...readonly} states
     * @param {*} string
     * @param {*} []
     * @return {*}  {MachineDescription}
     */
    export const fromList: (...states: readonly string[]) => MachineDescription;
    /**
     * State machine
     *
     * Machine description is a simple object of possible state names to allowed state(s). Eg. the following
     * has four possible states (`wakeup, sleep, coffee, breakfast, bike`). `Sleep` can only transition to the `wakeup`
     * state, while `wakeup` can transition to either `coffee` or `breakfast`.
     *
     * Use `null` to signify the final state. Multiple states can terminate the machine if desired.
     * ```
     * const description = {
     *  sleep: 'wakeup',
     *  wakeup: ['coffee', 'breakfast'],
     *  coffee: `bike`,
     *  breakfast: `bike`,
     *  bike: null
     * }
     * ```
     * Create the machine with the starting state (`sleep`)
     * ```
     * const machine = new StateMachine(`sleep`, description);
     * ```
     *
     * Change the state by name:
     * ```
     * machine.state = `wakeup`
     * ```
     *
     * Or request an automatic transition (will use first state if there are several options)
     * ```
     * machine.next();
     * ```
     *
     * Check status
     * ```
     * if (machine.state === `coffee`) ...;
     * if (machine.isDone()) ...
     * ```
     *
     * Listen for state changes
     * ```
     * machine.addEventListener(`change`, (evt) => {
     *  const {priorState, newState} = evt;
     *  console.log(`State change from ${priorState} -> ${newState}`);
     * });
     * ```
     * @export
     * @class StateMachine
     * @extends {SimpleEventEmitter<StateMachineEventMap>}
     */
    export class StateMachine extends SimpleEventEmitter<StateMachineEventMap> {
        #private;
        /**
         * Create a state machine with initial state, description and options
         * @param {string} initial Initial state
         * @param {MachineDescription} m Machine description
         * @param {Options} [opts={debug: false}] Options for machine
         * @memberof StateMachine
         */
        constructor(initial: string, m: MachineDescription, opts?: Options);
        get states(): readonly string[];
        static validate(initial: string, m: MachineDescription): readonly [boolean, string];
        /**
         * Moves to the next state if possible. If multiple states are possible, it will use the first.
         * If machine is finalised, no error is thrown and null is returned.
         *
         * @returns {(string|null)} Returns new state, or null if machine is finalised
         * @memberof StateMachine
         */
        next(): string | null;
        /**
         * Returns true if state machine is in its final state
         *
         * @returns
         * @memberof StateMachine
         */
        get isDone(): boolean;
        /**
         * Resets machine to initial state
         *
         * @memberof StateMachine
         */
        reset(): void;
        /**
         * Checks whether a state change is valid.
         *
         * @static
         * @param {string} priorState From state
         * @param {string} newState To state
         * @param {MachineDescription} description Machine description
         * @returns {[boolean, string]} If valid: [true,''], if invalid: [false, 'Error msg here']
         * @memberof StateMachine
         */
        static isValid(priorState: string, newState: string, description: MachineDescription): readonly [boolean, string];
        isValid(newState: string): readonly [boolean, string];
        /**
         * Sets state. Throws an error if an invalid transition is attempted.
         * Use `StateMachine.isValid` to check validity without changing.
         *
         * @memberof StateMachine
         */
        set state(newState: string);
        /**
       * Return current state
       *
       * @type {string}
       * @memberof StateMachine
       */
        get state(): string;
    }
}
declare module "modulation/Envelope" {
    import { SimpleEventEmitter } from "Events";
    /**
     * @returns Returns a full set of default ADSR options
     */
    export const defaultAdsrOpts: () => EnvelopeOpts;
    export type EnvelopeOpts = AdsrOpts & AdsrTimingOpts;
    /**
     * Options for the ADSR envelope.
     *
     * Use {@link defaultAdsrOpts} to get an initial default:
     * @example
     * ```js
     * let env = adsr({
     *  ...defaultAdsrOpts(),
     *  attackDuration: 2000,
     *  releaseDuration: 5000,
     *  sustainLevel: 1,
     *  retrigger: false
     * });
     * ```
     */
    export type AdsrOpts = {
        /**
         * Attack bezier 'bend'. Bend from -1 to 1. 0 for a straight line
         */
        readonly attackBend: number;
        /**
         * Decay bezier 'bend'. Bend from -1 to 1. 0 for a straight line
         */
        readonly decayBend: number;
        /**
         * Release bezier 'bend'. Bend from -1 to 1. 0 for a straight line
         */
        readonly releaseBend: number;
        /**
         * Peak level (maximum of attack stage)
         */
        readonly peakLevel: number;
        /**
         * Starting level (usually 0)
         */
        readonly initialLevel?: number;
        /**
         * Sustain level. Only valid if trigger and hold happens
         */
        readonly sustainLevel: number;
        /**
         * Release level, when envelope is done (usually 0)
         */
        readonly releaseLevel?: number;
        /**
         * When _false_, envelope starts from it's current level when being triggered.
         * _True_ by default.
         */
        readonly retrigger?: boolean;
    };
    export type AdsrTimingOpts = {
        /**
         * If true, envelope indefinately returns to attack stage after release
         *
         * @type {boolean}
         */
        readonly shouldLoop: boolean;
        /**
         * Duration for attack stage
         * Unit depends on timer source
         * @type {number}
         */
        readonly attackDuration: number;
        /**
         * Duration for decay stage
         * Unit depends on timer source
         * @type {number}
         */
        readonly decayDuration: number;
        /**
         * Duration for release stage
         * Unit depends on timer source
         * @type {number}
         */
        readonly releaseDuration: number;
    };
    /**
     * @private
     */
    export interface StateChangeEvent {
        readonly newState: string;
        readonly priorState: string;
    }
    /**
     * @private
     */
    export interface CompleteEvent {
    }
    type Events = {
        readonly change: StateChangeEvent;
        readonly complete: CompleteEvent;
    };
    /**
     * ADSR (Attack Decay Sustain Release) envelope. An envelope is a value that changes over time,
     * usually in response to an intial trigger.
     *
     * Created with the {@link adsr} function.
     *
     * @example Setup
     * ```js
     * const opts = {
     *  ...defaultAdsrOpts(),
     *  attackDuration: 1000,
     *  decayDuration: 200,
     *  sustainDuration: 100
     * }
     * const env = adsr(opts);
     * ```
     *
     * @example Using
     * ```js
     * env.trigger(); // Start envelop
     * ...
     * // Get current value of envelope
     * const [state, scaled, raw] = env.compute();
     * ```
     *
     * * `state` is string: `attack`, `decay`, `sustain`, `release`, `complete
     * * `scaled` is a value scaled according to stage _levels_
     * * `raw` is the progress from 0 to 1 within a stage
     *
     * ...normally you'd just want:
     * ```js
     * const value = env.compute()[1]; // Get scaled
     * ```
     *
     * @example Hold & release
     * ```js
     * env.trigger(true); // Pass in true to hold
     * ...envelope will stop at sustain stage...
     * env.relese();      // Release into decay
     * ```
     *
     * Check if it's done:
     * ```js
     * env.isDone; // True if envelope is completed
     * ```
     *
     * Envelope has events to track activity: `change` and `complete`:
     *
     * ```
     * env.addEventListener(`change`, ev => {
     *  console.log(`Old: ${evt.oldState} new: ${ev.newState}`);
     * })
     * ```
     */
    export interface Adsr extends SimpleEventEmitter<Events> {
        /**
         * Compute value of envelope at this point in time.
         *
         * Returns an array of [stage, scaled, raw]. Most likely you want the scaled value:
         * ```
         * const v = env.compute()[1];
         * ```
         * @param allowStateChange If true (default) envelope will be allowed to change state if necessary before returning value
         */
        compute(allowStateChange?: boolean): readonly [stage: string | undefined, scaled: number, raw: number];
        /**
         * Releases a held envelope. Has no effect if envelope was not held or is complete.
         */
        release(): void;
        /**
         * Triggers envelope.
         *
         * If event is already trigged,
         * it will be _retriggered_. If`opts.retriggered` is false (default)
         * envelope starts again at `opts.initialValue`. Otherwise it starts at
         * the current value.
         *
         * @param hold If _true_ envelope will hold at sustain stage
         */
        trigger(hold?: boolean): void;
        /**
         * _True_ if envelope is completed
         */
        get isDone(): boolean;
    }
    /**
     * @inheritdoc Adsr
     * @param opts
     * @returns New {@link Adsr} Envelope
     */
    export const adsr: (opts: EnvelopeOpts) => Adsr;
}
declare module "modulation/index" {
    export * from "modulation/Easing";
    export * from "modulation/Envelope";
}
declare module "Generators" {
    /**
     * Generates values from `produce` with `intervalMs` time delay
     *
     * @example Produce a random number every 500ms:
     * ```
     * const randomGenerator = atInterval(() => Math.random(), 1000);
     * for await (const r of randomGenerator) {
     *  // Random value every 1 second
     * }
     * ```
     *
     * @template V
     * @param intervalMs Interval between execution
     * @param produce Function to call
     * @template V Data type
     * @returns
     */
    export const interval: <V>(produce: () => Promise<V>, intervalMs: number) => AsyncGenerator<Awaited<V>, void, unknown>;
    /**
     * Generates a range of numbers, starting from `start` and coutnting by `interval`.
     * If `end` is provided, generator stops when reached.
     *
     * Unlike numericRange, numbers might contain rounding errors
     *
     * ```js
     * for (const c of numericRangeRaw(10, 100)) {
     *  // 100, 110, 120 ...
     * }
     * ```
     * @param interval Interval between numbers
     * @param start Start
     * @param end End (if undefined, range never ends)
     */
    export const numericRangeRaw: (interval: number, start?: number, end?: number | undefined, repeating?: boolean) => Generator<number, void, unknown>;
    /**
     * Generates a range of numbers, with a given interval.
     *
     * @example For-loop
     * ```
     * let loopForever = numericRange(0.1); // By default starts at 0 and counts upwards forever
     * for (v of loopForever) {
     *  console.log(v);
     * }
     * ```
     *
     * @example If you want more control over when/where incrementing happens...
     * ```js
     * let percent = numericRange(0.1, 0, 1);
     *
     * let percentResult = percent.next().value;
     * ```
     *
     * Note that computations are internally rounded to avoid floating point math issues. So if the `interval` is very small (eg thousandths), specify a higher rounding
     * number.
     *
     * @param interval Interval between numbers
     * @param start Start
     * @param end End (if undefined, range never ends)
     * @param repeating If true, range loops from start indefinately
     * @param rounding A rounding that matches the interval avoids floating-point math hikinks. Eg if the interval is 0.1, use a rounding of 10
     */
    export const numericRange: (interval: number, start?: number, end?: number | undefined, repeating?: boolean, rounding?: number | undefined) => Generator<number, void, unknown>;
    /**
     * Continually loops back and forth between 0 and 1 by a specified interval.
     * Looping returns start value, and is inclusive of 0 and 1.
     *
     * @example Usage
     * ```js
     * for (let v of percentPingPong(0.1)) {
     *  // v will go up and down. Make sure you have a break somewhere because it is infinite
     * }
     * ```
     *
     * @example Alternative:
     * ```js
     * let pp = percentPingPong(0.1, 0.5); // Setup generator one time
     * let v = pp.next().value; // Call .next().value whenever a new value is needed
     * ```
     *
     * Because limits are capped to 0 and 1, using large intervals can produce uneven distribution. Eg an interval of 0.8 yields 0, 0.8, 1
     *
     * @param {number} interval Amount to increment by. Defaults to 10%
     * @param {number} offset Starting point. Defaults to 0 using a positive interval or 1 for negative intervals
     * @param {number} rounding Rounding to apply. Defaults to 1000. This avoids floating-point rounding errors.
     */
    export const pingPongPercent: (interval?: number, offset?: number | undefined, rounding?: number) => Generator<number, never, unknown>;
    /**
     * Ping-pongs continually between `start` and `end` with a given `interval`. Use `pingPongPercent` for 0-1 ping-ponging
     *
     * In a loop:
     * ```
     * for (const c of pingPong(10, 0, 100)) {
     *  // 0, 10, 20 .. 100, 90, 80, 70 ...
     * }
     * ```
     *
     * Manual:
     * ```
     * const pp = pingPong(10, 0, 100);
     * let v = pp.next().value; // Call .next().value whenever a new value is needed
     * ```
     * @param interval Amount to increment by. Use negative numbers to start counting down
     * @param lower Lower bound (inclusive)
     * @param upper Upper bound (inclusive, must be greater than start)
     * @param offset Starting point within bounds (defaults to `lower`)
     * @param rounding Rounding is off by default. Use say 1000 if interval is a fractional amount to avoid rounding errors.
     */
    export const pingPong: (interval: number, lower: number, upper: number, offset?: number | undefined, rounding?: number) => Generator<number, never, unknown>;
}
declare module "Random" {
    export const weighted: (min: number, max: number) => number;
}
declare module "index" {
    export * as Geometry from "geometry/index";
    /**
     * Canvas drawing functions.
     */
    export * as Drawing from "visual/Drawing";
    export * as Visual from "visual/index";
    /**
     * DOM module has some functions for easing DOM manipulation.
     *
     * * {@link log} - log to DOM
     * * {@link rx} - keep track of event data
     * * {@link resolveEl} - resolve an element by query
     * * Create DOM elements: {@link createAfter}, {@link createIn}
     *
     *
     */
    export * as Dom from "dom/index";
    /**
     * The Modulation module contains functions for, well, modulating data.
     *
     * Overview:
     * * {@link adsr}: Modulate over a series of ADSR stages.
     * * {@link easeOverTime}: Ease from `0` to `1` over a specified duration.
     *
     * @example Import examples
     * ```
     * // If library is stored two directories up under `ixfx/`
     * import {adsr, defaultAdsrOpts} from '../../ixfx/modulation.js';
     *
     * // Import from web
     * import {adsr, defaultAdsrOpts} from 'TODO'
     * ```
     *
     */
    export * as Modulation from "modulation/index";
    /**
     * This module includes a variety of techniques for storing and retrieving data.
     *
     * In short:
     * * {@link Maps}: store/retrieve a value by a _key_. {@link MapOfMutable |MapOfs} allow storing multiple values under the same key.
     * * {@link Arrays}: a list of data
     * * {@link Sets}: a list of data with no duplicates
     * * {@link Queues}: a list of ordered data, like a bakery queue
     * * {@link Stacks}: a list of ordered data, like a stack of plates
     */
    export * as Collections from "collections/index";
    /**
     * Generators produce values on demand.
     */
    export * as Generators from "Generators";
    export * as Random from "Random";
    export * as KeyValues from "KeyValue";
    export * from "util";
    /**
     * Run code at intervals or with a delay
     *
     * Overview:
     * * {@link continuously} Run code in a loop, as fast as possible or with a delay between each execution
     * * {@link timeout} Run code after a specified time delay
     * * {@link sleep} Using `async await`, delay execution for a period
     * * {@link delay} Using `async await`, run a given callback after a period
     */
    export * as Timers from "Timer";
    export { KeyValue } from "KeyValue";
    export { frequencyMutable, FrequencyMutable } from "FrequencyMutable";
    export { StateMachine } from "StateMachine";
}
declare module "FrequencyMutable" {
    import { ToString } from "util";
    import { SimpleEventEmitter } from "Events";
    import * as KeyValueUtil from "KeyValue";
    import { KeyValues } from "index";
    type FrequencyEventMap = {
        readonly change: void;
    };
    /**
     * Frequency keeps track of how many times a particular value is seen, but
     * unlike a {@link Maps|Map} it does not store the data. By default compares
     * items by value (via JSON.stringify).
     *
     * Create with {@link frequencyMutable}.
     *
     * Fires `change` event when items are added or it is cleared.
     *
     * Overview
     * ```
     * const fh = frequencyMutable();
     * fh.add(value); // adds a value
     * fh.clear();    // clears all data
     * fh.keys() / .values() // returns an iterator for keys and values
     * fh.toArray();  //  returns an array of data in the shape [[key,freq],[key,freq]...]
     * ```
     *
     * Usage
     * ```
     * const fh = frequencyMutable();
     * fh.add(`apples`); // Count an occurence of `apples`
     * fh.add(`oranges)`;
     * fh.add(`apples`);
     *
     * const fhData = fh.toArray(); // Expect result [[`apples`, 2], [`oranges`, 1]]
     * fhData.forEach((d) => {
     *  const [key,freq] = d;
     *  console.log(`Key '${key}' occurred ${freq} time(s).`);
     * })
     * ```
     *
     * Custom key string
     * ```
     * const fh = frequencyMutable( person => person.name);
     * // All people with name `Samantha` will be counted in same group
     * fh.add({name:`Samantha`, city:`Brisbane`});
     * ```
     * @template V Type of items
     */
    export class FrequencyMutable<V> extends SimpleEventEmitter<FrequencyEventMap> {
        #private;
        /**
         * Constructor
         * @param keyString Function to key items. Uses JSON.stringify by default
         */
        constructor(keyString?: ToString<V> | undefined);
        /**
         * Clear data. Fires `change` event
         */
        clear(): void;
        /**
         * @returns Iterator over keys (ie. groups)
         */
        keys(): IterableIterator<string>;
        /**
         * @returns Iterator over frequency counts
         */
        values(): IterableIterator<number>;
        /**
         * @returns Copy of entries as an array of `[key, count]`
         */
        toArray(): [key: string, count: number][];
        /**
         *
         * @param value Value to count
         * @returns Frequency of value, or _undefined_ if it does not exist
         */
        frequencyOf(value: V | string): number | undefined;
        /**
         *
         * @param value Value to count
         * @returns Relative frequency of `value`, or _undefined_ if it does not exist
         */
        relativeFrequencyOf(value: V | string): number | undefined;
        /**
         * @returns Copy of entries as an array
         */
        entries(): Array<KeyValueUtil.KeyValue>;
        /**
         *
         * @returns Returns `{min,max,avg,total}`
         */
        minMaxAvg(): {
            readonly min: number;
            readonly total: number;
            readonly max: number;
            readonly avg: number;
        };
        /**
         *
         * @param sortStyle Sorting style (default: _value_, ie. count)
         * @returns Sorted array of [key,frequency]
         */
        entriesSorted(sortStyle?: `value` | `valueReverse` | `key` | `keyReverse`): ReadonlyArray<KeyValues.KeyValue>;
        /**
         *
         * @param values Values to add. Fires _change_ event after adding item(s)
         */
        add(...values: V[]): void;
    }
    /**
     * Creates a FrequencyMutable
     * @inheritdoc FrequencyMutable
     * @template V Data type of items
     * @param keyString Function to generate keys for items. If not specified, uses JSON.stringify
     * @returns
     */
    export const frequencyMutable: <V>(keyString?: ToString<V> | undefined) => FrequencyMutable<V>;
}
declare module "Iterable" {
    type WithEvents = {
        addEventListener(type: string, callbackfn: any): void;
        removeEventListener(type: string, callbackfn: any): void;
    };
    export const isAsyncIterable: (v: any) => v is AsyncIterable<any>;
    export const isIterable: (v: any) => v is Iterable<any>;
    export const eventsToIterable: <V>(eventSource: WithEvents, eventType: string) => AsyncIterator<any, any, undefined>;
}
declare module "Match" {
    type MatchFunction<V> = {
        (v: V, index?: number, array?: V[]): boolean;
    };
    /**
     * Returns a function that filters a set of items by a set of filters
     *
     * @template V
     * @param {Iterable<MatchFunction<V>>} filters If filter returns true, item is included
     * @param {{allFiltersMustMatch?: boolean}} [opts={}]
     * @returns
     */
    export const filter: <V>(filters: Iterable<MatchFunction<V>>, opts?: {
        allFiltersMustMatch?: boolean;
    }) => (vArray: Iterable<V>) => Generator<V, void, unknown>;
}
declare module "Tracker" {
    /**
     * Keeps track of the min, max and avg in a stream of values.
     *
     * Usage:
     * ```
     *  const t = tracker();
     *  t.seen(10)
     *
     *  t.avg / t.min/ t.max / t.getMinMax()
     * ```
     * Use `reset()` to clear everything, or `resetAvg()` to just reset averaging calculation
     * @class Tracker
     */
    export class Tracker {
        samples: number;
        total: number;
        min: number;
        max: number;
        id: string | undefined;
        constructor(id?: string | undefined);
        get avg(): number;
        resetAvg(newId?: string | null): void;
        reset(newId?: string | null): void;
        seen(sample: number): void;
        getMinMaxAvg(): {
            min: number;
            max: number;
            avg: number;
        };
    }
    /**
     * A `Tracker` that tracks interval between calls to `mark()`
     *
     * @export
     * @class IntervalTracker
     * @extends {Tracker}
     */
    export class IntervalTracker extends Tracker {
        lastMark: number;
        perf: any;
        constructor(id?: string | undefined);
        mark(): void;
    }
}
declare module "__tests__/frequencyMutable.test" { }
declare module "__tests__/keyValue.test" { }
declare module "__tests__/producers.test" { }
declare module "__tests__/statemachine.test" { }
declare module "__tests__/util.test" { }
declare module "__tests__/collections/lists.test" { }
declare module "__tests__/collections/map.test" { }
declare module "__tests__/collections/mapMutable.test" { }
declare module "__tests__/collections/queue.test" { }
declare module "__tests__/collections/sets.test" { }
declare module "__tests__/collections/stack.test" { }
declare module "__tests__/geometry/grid.test" { }
declare module "components/HistogramVis" {
    import { LitElement } from 'lit';
    import { KeyValue } from "KeyValue";
    type Bar = {
        readonly percentage: number;
        readonly data: KeyValue;
    };
    /**
     * Usage in HTML:
     * ```html
     * <style>
     * histogram-vis {
     *  display: block;
     *  height: 7em;
     *  --histogram-bar-color: pink;
     * }
     * </style>
     * <histogram-vis>
     * [
     *  ["apples", 5],
     *  ["oranges", 3],
     *  ["pineapple", 0],
     *  ["limes", 9]
     * ]
     * </histogram-vis>
     * ```
     *
     * CSS colour theming:
     * --histogram-bar-color
     * --histogram-label-color
     *
     * HTML tag attributes
     * showXAxis (boolean)
     * showDataLabels (boolean)
     *
     * @export
     * @class HistogramVis
     * @extends {LitElement}
     **/
    export class HistogramVis extends LitElement {
        static readonly styles: import("lit").CSSResult;
        data: readonly KeyValue[];
        showDataLabels: boolean;
        height: string;
        showXAxis: boolean;
        json: readonly KeyValue[] | undefined;
        constructor();
        connectedCallback(): void;
        barTemplate(bar: Bar, index: number, _totalBars: number): import("lit-html").TemplateResult<1>;
        render(): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            readonly "histogram-vis": HistogramVis;
        }
    }
}
declare module "components/FrequencyHistogramPlot" {
    import { HistogramVis } from "components/HistogramVis";
    /**
     * Creates and drives a HistogramVis instance.
     * Data should be an outer array containing two-element arrays for each
     * data point. The first element of the inner array is expected to be the key, the second the frequency.
     * For example,  `[`apples`, 2]` means the key `apples` was counted twice.
     *
     * Usage:
     * .sortBy() automatically sorts prior to visualisation. By default off.
     * .update(data) full set of data to plot
     * .clear() empties plot - same as calling `update([])`
     * .el - The `HistogramVis` instance, or undefined if not created/disposed
     *
     * ```
     * const plot = new FrequencyHistogramPlot(document.getElementById('histogram'));
     * plot.sortBy('key'); // Automatically sort by key
     * ...
     * plot.update([[`apples`, 2], [`oranges', 0], [`bananas`, 5]])
     * ```
     *
     * @export
     * @class FrequencyHistogramPlot
     */
    export class FrequencyHistogramPlot {
        #private;
        readonly el: HistogramVis | undefined;
        constructor(el: HistogramVis);
        setAutoSort(sortStyle: `value` | `valueReverse` | `key` | `keyReverse`): void;
        clear(): void;
        dispose(): void;
        update(data: ReadonlyArray<readonly [key: string, count: number]>): void;
    }
}
declare module "components/index" {
    export { HistogramVis } from "components/HistogramVis";
    export { FrequencyHistogramPlot } from "components/FrequencyHistogramPlot";
}
