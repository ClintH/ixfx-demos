type HasCompletion = {
    get isDone(): boolean;
};
type AsyncPromiseOrGenerator<V> = (() => Promise<V> | Promise<undefined>) | (() => V | undefined) | Generator<V> | IterableIterator<V> | AsyncIterableIterator<V> | AsyncGenerator<V> | AsyncIterable<V> | Iterable<V>;

export type { AsyncPromiseOrGenerator as A, HasCompletion as H };
