interface IDictionary<K, V> {
    get(key: K): V | undefined;
    set(key: K, value: V): void;
}
interface IWithEntries<K, V> {
    entries(): IterableIterator<readonly [K, V]>;
}

export type { IDictionary as I, IWithEntries as a };
