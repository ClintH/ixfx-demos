import { T as ToString } from './util-61c3ff4c';
import { S as SimpleEventEmitter } from './Events-faeaa6ab';

declare type MutableValueSetEventMap<V> = {
    readonly add: {
        readonly value: V;
        readonly updated: boolean;
    };
    readonly clear: boolean;
    readonly delete: V;
};
declare const mutableStringSet: <V>(keyString?: ToString<V> | undefined) => MutableStringSetImpl<V>;
declare type MutableStringSet<V> = {
    readonly add: (item: V) => void;
    readonly has: (item: V) => boolean;
};
/**
 * A mutable set that stores unique items by their value, rather
 * than object reference.
 *
 * By default the JSON.stringify() representation is used to compare
 * objects. Alternatively, pass a function into the constructor
 *
 * It also fires `add`, `clear` and `delete` events.
 *
 * Usage
 * ```
 * .add(item);    // Add one or more items. Items with same key are overriden.
 * .has(item);    // Returns true if item *value* is present
 * .clear();      // Remove everything
 * .delete(item); // Delete item by value
 * .toArray();    // Returns values as an array
 * .values();     // Returns an iterator over values
 * ```
 *
 * Example
 * ```
 * const people = [
 *  {name: `Barry`, city: `London`}
 *  {name: `Sally`, city: `Bristol`}
 * ];
 * const set = mutableValueSet(person => {
 *  // Key person objects by name and city (assi)
 *  return `${person.name}-${person.city}`
 * });
 * set.add(...people);
 *
 * set.has({name:`Barry`, city:`Manchester`})); // False, key is different (Barry-Manchester)
 * set.has({name:`Barry`, city:`London`}));     // True, we have Barry-London as a key
 * set.has(people[1]);   // True, key of object is found (Sally-Bristol)
 *
 * set.addEventListener(`add`, newItem => {
 *  console.log(`New item added: ${newItem}`);
 * });
 * ```
 *
 * @export
 * @class MutableValueSet
 * @template V
 */
declare class MutableStringSetImpl<V> extends SimpleEventEmitter<MutableValueSetEventMap<V>> {
    store: Map<string, V>;
    keyString: ToString<V>;
    constructor(keyString?: ToString<V> | undefined);
    add(...v: ReadonlyArray<V>): void;
    values(): IterableIterator<V>;
    clear(): void;
    delete(v: V): boolean;
    has(v: V): boolean;
    toArray(): V[];
}

export { MutableStringSet as M, mutableStringSet as m };
