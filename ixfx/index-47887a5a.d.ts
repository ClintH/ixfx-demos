import { T as ToString } from './Util-82e375df.js';
import { S as SimpleEventEmitter } from './Events-f066e560.js';

/**
 * A Set which stores unique items determined by their value, rather
 * than object reference (unlike the default JS Set). Create with {@link Sets.mutable}. Mutable.
 *
 * By default the `JSON.stringify()` representation is considered the 'key' for an object.
 * Pass in a function to `Sets.mutable` to define your own way of creating keys for values. The principle should
 * be that objects that you consider identical should have the same string key value.
 *
 * ISetMutable fires `add`, `clear` and `delete` events.
 *
 * @example Overview of functions
 * ```js
 * const s = Sets.mutable();
 * s.add(item);    // Add one or more items. Items with same key are overriden.
 * s.has(item);    // Returns true if item value is present
 * s.clear();      // Remove everything
 * s.delete(item); // Delete item by value
 * s.toArray();    // Returns values as an array
 * s.values();     // Returns an iterator over values
 * s.size;         // Number of items stored in set
 * ```
 *
 * @example Example usage
 * ```js
 * // Data to add
 * const people = [
 *  {name: `Barry`, city: `London`}
 *  {name: `Sally`, city: `Bristol`}
 * ];
 *
 * // Create a set, defining how keys will be generated
 * const set = Sets.mutable(person => {
 *    // Key person objects by name and city.
 *    // ie. Generated keys will be: `Barry-London`, `Sally-Bristol`
 *    return `${person.name}-${person.city}`
 * });
 *
 * // Add list
 * set.add(...people);
 *
 * // Demo:
 * set.has({name:`Barry`, city:`Manchester`})); // False, key is different (Barry-Manchester)
 * set.has({name:`Barry`, city:`London`}));     // True, we have Barry-London as a key
 * set.has(people[1]);   // True, key of object is found (Sally-Bristol)
 * ```
 *
 * @example Events
 * ```js
 * set.addEventListener(`add`, ev => {
 *  console.log(`New item added: ${ev.value}`);
 * });
 * ```
 *
 * @template V Type of data stored
 */
interface ISetMutable<V> extends SimpleEventEmitter<ValueSetEventMap<V>> {
    /**
     * Add `values` to set.
     * Corresponding keys will be generated according to the
     * function provided to `setMutable`, or `JSON.stringify` by default.
     * @param v Value(s) to add
     * @returns _true_ if something new was added
     */
    add(...values: ReadonlyArray<V>): boolean;
    /**
     * Iterate over values
     * ```js
     * for (let value of set.values()) {
     *    // use value...
     * }
     * ```
     */
    values(): IterableIterator<V>;
    /**
     * Clears set
     */
    clear(): void;
    /**
     * Deletes specified value, if present.
     * @param value
     * @returns True if value was found
     */
    delete(value: V): boolean;
    /**
     * Returns _true_ if _value_ is contained in Set
     * @param v
     */
    has(value: V): boolean;
    /**
     * Returns an array of values
     */
    toArray(): readonly V[];
    /**
     * Returns the number of items stored in the set
     */
    get size(): number;
}

/**
 * Creates a {@link ISetMutable}.
 * @param keyString Function that produces a key based on a value. If unspecified, uses `JSON.stringify`
 * @returns
 */
declare const mutable: <V>(keyString?: ToString<V> | undefined) => ISetMutable<V>;
/**
 * Mutable string set
 */
declare class SetStringMutable<V> extends SimpleEventEmitter<ValueSetEventMap<V>> implements ISetMutable<V> {
    store: Map<string, V>;
    keyString: ToString<V>;
    /**
     * Constructor
     * @param keyString Function which returns a string version of added items. If unspecified `JSON.stringify`
     */
    constructor(keyString: ToString<V> | undefined);
    /**
     * Number of items stored in set
     */
    get size(): number;
    /**
     * Adds one or more items to set. `add` event is fired for each item
     * @param v items to add
     */
    add(...values: Array<V>): boolean;
    /**
     * Returns values from set as an iterable
     * @returns
     */
    values(): IterableIterator<V>;
    /**
     * Clear items from set
     */
    clear(): void;
    /**
     * Delete value from set.
     * @param v Value to delete
     * @returns _True_ if item was found and removed
     */
    delete(v: V): boolean;
    /**
     * Returns _true_ if item exists in set
     * @param v
     * @returns
     */
    has(v: V): boolean;
    /**
     * Returns array copy of set
     * @returns Array copy of set
     */
    toArray(): Array<V>;
}

declare class SetStringImmutable<V> implements ISetImmutable<V> {
    private store;
    private keyString;
    constructor(keyString?: ToString<V>, map?: Map<string, V>);
    get size(): number;
    add(...values: readonly V[]): ISetImmutable<V>;
    delete(v: V): ISetImmutable<V>;
    has(v: V): boolean;
    toArray(): V[];
    values(): Generator<V, void, undefined>;
}
/**
 * Immutable set that uses a `keyString` function to determine uniqueness
 *
 * @param keyString Function that produces a key based on a value. If unspecified, uses `JSON.stringify`.
 * @returns
 */
declare const immutable: <V>(keyString?: ToString<V>) => ISetImmutable<V>;

interface ISet<V> {
    has(v: V): boolean;
    get size(): number;
    values(): IterableIterator<V>;
    /**
     * Returns an array of values
     */
    toArray(): readonly V[];
}

/**
 * A Set which stores unique items determined by their value, rather
 * than object reference (unlike the default JS Set). Create with {@link Sets.mutable}. Immutable.
 *
 * By default the `JSON.stringify()` representation is considered the 'key' for an object.
 * Pass in a function to `setMutable` to define your own way of creating keys for values. The principle should
 * be that objects that you consider identical should have the same string key value.
 *
 * The {@link Sets.ISetMutable} alternative also has events for monitoring changes.
 *
 * @example Overview of functions
 * ```js
 * const s = Sets.mutable();
 * s.add(item);    // Add one or more items. Items with same key are overriden.
 * s.has(item);    // Returns true if item value is present
 * s.clear();      // Remove everything
 * s.delete(item); // Delete item by value
 * s.toArray();    // Returns values as an array
 * s.values();     // Returns an iterator over values
 * s.size;         // Returns number of items in set
 * ```
 *
 * @example Example usage
 * ```js
 * // Data to add
 * const people = [
 *  {name: `Barry`, city: `London`}
 *  {name: `Sally`, city: `Bristol`}
 * ];
 *
 * // Create a set, defining how keys will be generated
 * let s = Sets.mutable(person => {
 *    // Key person objects by name and city.
 *    // ie. Generated keys will be: `Barry-London`, `Sally-Bristol`
 *    return `${person.name}-${person.city}`
 * });
 *
 * // Add list - since it's immutable, a changed copy is returned
 * s = s.add(...people);
 *
 * // Accessing: has/get
 * s.has({name:`Barry`, city:`Manchester`})); // False, key is different (Barry-Manchester)
 * s.has({name:`Barry`, city:`London`}));     // True, we have Barry-London as a key
 * s.has(people[1]);   // True, key of object is found (Sally-Bristol)
 *
 * // Deleting (returns changed copy)
 * s = s.delete({name:`Barry`, city:`London`});
 * ```
 *
 * @template V Type of data stored
 */
interface ISetImmutable<V> extends ISet<V> {
    add(...values: ReadonlyArray<V>): ISetImmutable<V>;
    delete(v: V): ISetImmutable<V>;
}

type ValueSetEventMap<V> = {
    readonly add: {
        readonly value: V;
        readonly updated: boolean;
    };
    readonly clear: boolean;
    readonly delete: V;
};

type index_ISetImmutable<V> = ISetImmutable<V>;
type index_ISetMutable<V> = ISetMutable<V>;
type index_ValueSetEventMap<V> = ValueSetEventMap<V>;
declare const index_immutable: typeof immutable;
declare const index_mutable: typeof mutable;
declare namespace index {
  export {
    index_ISetImmutable as ISetImmutable,
    index_ISetMutable as ISetMutable,
    index_ValueSetEventMap as ValueSetEventMap,
    index_immutable as immutable,
    index_mutable as mutable,
  };
}

export { ISetMutable as I, SetStringImmutable as S, ValueSetEventMap as V, SetStringMutable as a, immutable as b, ISetImmutable as c, index as i, mutable as m };
