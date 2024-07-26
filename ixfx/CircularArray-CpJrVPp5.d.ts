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
     * @param value Thing to add
     * @returns Circular with item added
     */
    add(value: V): ICircularArray<V>;
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

export { type ICircularArray as I, circularArray as c };
