import { I as Interval } from './IntervalType-B4PbUkjV.js';

type SleepOpts<V> = Interval & Partial<{
    readonly signal: AbortSignal;
    readonly value: V;
}>;
/**
 * Returns after timeout period.
 *
 * @example In an async function
 * ```js
 * console.log(`Hello`);
 * await sleep(1000);
 * console.log(`There`); // Prints one second after
 * ```
 *
 * @example As a promise
 * ```js
 * console.log(`Hello`);
 * sleep({ millis: 1000 })
 *  .then(() => console.log(`There`)); // Prints one second after
 * ```
 *
 * If a timeout of 0 is given, `requestAnimationFrame` is used instead of `setTimeout`.
 *
 * {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
 *
 * A value can be provided, which is returned on awaking:
 * ```js
 * const v = await sleep({ seconds: 1, value: `hello`);
 * // v = `hello`
 * ```
 *
 * Provide an AbortSignal to cancel the sleep and throwing an exception
 * so code after the sleep doesn't happen.
 *
 * ```js
 * const ac = new AbortController();
 * setTimeout(() => { ac.abort(); }, 1000); // Abort after 1s
 *
 * // Sleep for 1min
 * await sleep({ minutes: 1, signal: ac.signal });
 * console.log(`Awake`); // This line doesn't get called because an exception is thrown when aborting
 * ```
 * @param optsOrMillis Milliseconds to sleep, or options
 * @return
 */
declare const sleep: <V>(optsOrMillis: SleepOpts<V>) => Promise<V | undefined>;
/**
 * Delays until `predicate` returns true.
 * Can be useful for synchronising with other async activities.
 * ```js
 * // Delay until 'count' reaches 5
 * await sleepWhile(() => count >= 5, 100);
 * ```
 * @param predicate
 * @param checkInterval
 */
declare const sleepWhile: (predicate: () => boolean, checkInterval?: Interval) => Promise<void>;

export { type SleepOpts as S, sleepWhile as a, sleep as s };
