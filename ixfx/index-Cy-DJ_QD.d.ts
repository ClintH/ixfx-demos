import { T as ToString } from './ToString-DO94OWoh.js';
import { S as SimpleEventEmitter } from './Events-DJgOvcWD.js';
import { I as ISetMutable, V as ValueSetEventMap } from './ISetMutable-hVNWApH3.js';

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
     * @param values items to add
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
 * @typeParam V - Type of data stored
 */
interface ISetImmutable<V> extends ISet<V> {
    add(...values: ReadonlyArray<V>): ISetImmutable<V>;
    delete(v: V): ISetImmutable<V>;
}

declare class SetStringImmutable<V> implements ISetImmutable<V> {
    private store;
    private keyString;
    constructor(keyString?: ToString<V>, map?: Map<string, V>);
    get size(): number;
    add(...values: ReadonlyArray<V>): ISetImmutable<V>;
    delete(v: V): ISetImmutable<V>;
    has(v: V): boolean;
    toArray(): Array<V>;
    values(): Generator<V, void, undefined>;
}
/**
 * Immutable set that uses a `keyString` function to determine uniqueness
 *
 * @param keyString Function that produces a key based on a value. If unspecified, uses `JSON.stringify`.
 * @returns
 */
declare const immutable: <V>(keyString?: ToString<V>) => ISetImmutable<V>;

/**
 * MassiveSet supports semantics similar to Set, but without the
 * limitation on how much data is stored.
 *
 * It only supports strings, and stores data in a hierarchy.
 *
 * ```js
 * const set = new MassiveSet(); // maxDepth=1 default
 * set.add(`test`);
 * set.add(`bloorp`);
 * ```
 *
 * In the above example, it will create a subtree for the first letter
 * of each key, putting the value underneath it. So we'd get a sub
 * MassiveSet for every key starting with 't' and every one starting with 'b'.
 *
 * If `maxDepth` was 2, we'd get the same two top-level nodes, but then
 * another sub-node based on the _second_ character of the value.
 *
 * It's not a very smart data-structure since it does no self-balancing
 * or tuning.
 */
declare class MassiveSet {
    #private;
    children: Map<string, MassiveSet>;
    values: Array<string>;
    constructor(maxDepth?: number, depth?: number);
    /**
     * Returns the number of values stored in just this level of the set
     * @returns
     */
    sizeLocal(): number;
    /**
     * Returns the number of branches at this node
     * Use {@link sizeChildrenDeep} to count all branches recursively
     * @returns
     */
    sizeChildren(): number;
    sizeChildrenDeep(): number;
    /**
     * Returns the total number of values stored in the set
     */
    size(): number;
    add(value: string): void;
    remove(value: string): boolean;
    debugDump(): void;
    /**
     * Returns _true_ if `value` stored on this node
     * @param value
     * @returns
     */
    hasLocal(value: string): boolean;
    has(value: string): boolean;
}

type index_ISetImmutable<V> = ISetImmutable<V>;
declare const index_ISetMutable: typeof ISetMutable;
type index_MassiveSet = MassiveSet;
declare const index_MassiveSet: typeof MassiveSet;
declare const index_ValueSetEventMap: typeof ValueSetEventMap;
declare const index_immutable: typeof immutable;
declare const index_mutable: typeof mutable;
declare namespace index {
  export { type index_ISetImmutable as ISetImmutable, index_ISetMutable as ISetMutable, index_MassiveSet as MassiveSet, index_ValueSetEventMap as ValueSetEventMap, index_immutable as immutable, index_mutable as mutable };
}

export { type ISetImmutable as I, MassiveSet as M, SetStringImmutable as S, SetStringMutable as a, immutable as b, index as i, mutable as m };
