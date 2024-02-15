type HasCompletionRunStates = `idle` | `scheduled` | `running`;
type HasCompletion = {
    /**
     * Gets the current run state
     * idle: not yet started or completed with no future run scheduled
     * scheduled: waiting to run
     * running: currently executing its callback
     */
    get runState(): HasCompletionRunStates;
    /**
     * Returns the number of times the scheduled function
     * has been started.
     */
    get startCount(): number;
};
type AsyncPromiseOrGenerator<V> = (() => Promise<V> | Promise<undefined>) | (() => V | undefined) | Generator<V> | IterableIterator<V> | AsyncIterableIterator<V> | AsyncGenerator<V> | AsyncIterable<V> | Iterable<V>;

export type { AsyncPromiseOrGenerator as A, HasCompletion as H, HasCompletionRunStates as a };
