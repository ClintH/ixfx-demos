import { I as Interval } from './IntervalType-zqeNLRm6.js';
import { A as AsyncPromiseOrGenerator } from './Types-WqS2k5P9.js';

type IntervalOpts = {
    /**
     * Sleep a fixed period of time regardless of how long each invocation of 'produce' takes
     */
    readonly fixed?: Interval;
    /**
     * Minimum interval. That is, only sleep if there is time left over after 'produce'
     * is invoked.
     */
    readonly minimum?: Interval;
    /**
     * Optional signal to abort
     */
    readonly signal?: AbortSignal;
    /**
     * When to perform delay. Default is before 'produce' is invoked.
     */
    readonly delay?: `before` | `after`;
};
/**
 * Generates values from `produce` with a time delay.
 * `produce` can be a simple function that returns a value, an async function, or a generator.
 *
 * @example Produce a random number every 500ms:
 * ```
 * const randomGenerator = interval(() => Math.random(), 500);
 * for await (const r of randomGenerator) {
 *  // Random value every 1 second
 *  // Warning: does not end by itself, a `break` statement is needed
 * }
 * ```
 *
 * @example Return values from a generator every 500ms:
 * ```js
 * import { interval } from 'https://unpkg.com/ixfx/dist/flow.js'
 * import { count } from 'https://unpkg.com/ixfx/dist/generators.js'
 * for await (const v of interval(count(10), { fixed: 1000 })) {
 *  // Do something with `v`
 * }
 * ```
 *
 * Options allow either fixed interval (wait this long between iterations), or a minimum interval (wait at least this long).
 * The latter is useful if `produce` takes some time - it will only wait the remaining time or not at all.
 *
 * If you just want to loop at a certain speed, consider using {@link continuously} instead.
 *
 * If the AbortSignal is triggered, an exception will be thrown, stopping iteration.
 * @template V Returns value of `produce` function
 * @param produce Function, generator to use
 * @param opts Options
 * @template V Data type
 * @returns
 */
declare const interval: <V>(produce: AsyncPromiseOrGenerator<V> | ArrayLike<V>, optsOrFixedMs?: IntervalOpts | number) => AsyncGenerator<V, any, unknown>;

/**
 * Delay options
 */
type DelayOpts = Interval & {
    /**
     * Signal for cancelling delay
     */
    readonly signal?: AbortSignal;
    /**
     * When delay is applied. "before" is default.
     */
    readonly delay?: `before` | `after` | `both`;
};
/**
 * Pauses execution for interval after which the asynchronous `callback` is executed and awaited.
 * Must be called with `await` if you want the pause effect.
 *
 * @example Pause and wait for function
 * ```js
 * const result = await delay(async () => Math.random(), 1000);
 * console.log(result); // Prints out result after one second
 * ```
 *
 * If the `interval` option is a number its treated as milliseconds. {@link Interval} can also be used:
 * ```js
 * const result = await delay(async () => Math.random(), { mins: 1 });
 * ```
 *
 * If `await` is omitted, the function will run after the provided timeout, and code will continue to run.
 *
 * @example Schedule a function without waiting
 * ```js
 * await delay(async () => {
 *  console.log(Math.random())
 * }, 1000);
 * // Prints out a random number after 1 second.
 * ```
 *
 * {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
 *
 * Optionally takes an AbortSignal to cancel delay.
 * ```js
 * const ac = new AbortController();
 * // Super long wait
 * await delay(someFn, { signal: ac.signal, hours: 1 }}
 * ...
 * ac.abort(); // Cancels long delay
 * ```
 *
 * It also allows choice of when delay should happen.
 * If you want to be able to cancel or re-run a delayed function, consider using
 * {@link timeout} instead.
 *
 * @template V
 * @param callback What to run after interval
 * @param opts Options for delay. By default delay is before `callback` is executed.
 * @return Returns result of `callback`.
 */
declare const delay: <V>(callback: () => Promise<V>, optsOrMillis: DelayOpts | number) => Promise<V>;
/**
 * Async generator that loops at a given interval.
 * Alternatives:
 * * {@link delay} to run a single function after a delay
 * * {@link sleep} pause execution
 * * {@link interval} iterate over an iterable with a given delay
 * * {@link continuously} to start/stop/adjust a constantly running loop
 *
 * @example Loop runs every second
 * ```
 * // Loop forever
 * (async () => {
 *  const loop = delayLoop(1000);
 *  // or: loop = delayLoop({ secs: 1 });
 *  while (true) {
 *    await loop.next();
 *
 *    // Do something...
 *    // Warning: loops forever
 *  }
 * })();
 * ```
 *
 * @example For Await loop every second
 * ```
 * const loop = delayLoop(1000);
 * // Or: const loop = delayLoop({ secs: 1 });
 * for await (const o of loop) {
 *  // Do something...
 *  // Warning: loops forever
 * }
 * ```
 * @param timeout Delay. If 0 is given, `requestAnimationFrame` is used over `setTimeout`.
 */
declare function delayLoop(timeout: Interval): AsyncGenerator<undefined, void, unknown>;

export { type DelayOpts as D, type IntervalOpts as I, delay as a, delayLoop as d, interval as i };
