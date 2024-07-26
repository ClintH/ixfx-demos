type ArrayKeys<K, V> = ReadonlyArray<readonly [key: K, value: V]>;
type ObjectKeys<K, V> = ReadonlyArray<{
    readonly key: K;
    readonly value: V;
}>;
type EitherKey<K, V> = ArrayKeys<K, V> | ObjectKeys<K, V>;

export type { ArrayKeys as A, EitherKey as E, ObjectKeys as O };
