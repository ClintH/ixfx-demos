interface IDictionary<K, V> {
    get(key: K): V | undefined;
    set(key: K, value: V): void;
}
interface IWithEntries<K, V> {
    entries(): IterableIterator<readonly [K, V]>;
}

type GetOrGenerate<K, V, Z> = (key: K, args?: Z) => Promise<V>;
/**
 * @inheritDoc getOrGenerate
 * @param map
 * @param fn
 * @returns
 */
declare const getOrGenerateSync: <K, V, Z>(map: IDictionary<K, V>, fn: (key: K, args?: Z) => V) => (key: K, args?: Z) => V;
/**
 * Returns a function that fetches a value from a map, or generates and sets it if not present.
 * Undefined is never returned, because if `fn` yields that, an error is thrown.
 *
 * See {@link getOrGenerateSync} for a synchronous version.
 *
 * ```
 * const m = getOrGenerate(new Map(), (key) => {
 *  return key.toUppercase();
 * });
 *
 * // Not contained in map, so it will run the uppercase function,
 * // setting the value to the key 'hello'.
 * const v = await m(`hello`);  // Yields 'HELLO'
 * const v1 = await m(`hello`); // Value exists, so it is returned ('HELLO')
 * ```
 *
 */
declare const getOrGenerate: <K, V, Z>(map: IDictionary<K, V>, fn: (key: K, args?: Z) => Promise<V> | V) => GetOrGenerate<K, V, Z>;

export { type GetOrGenerate as G, type IWithEntries as I, type IDictionary as a, getOrGenerate as b, getOrGenerateSync as g };
