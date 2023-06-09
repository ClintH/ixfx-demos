type IntervalAsync<V> = (() => V | Promise<V>) | Generator<V>;
/**
 * Generates values from `produce` with `intervalMs` time delay.
 * `produce` can be a simple function that returns a value, an async function, or a generator.
 *
 * @example Produce a random number every 500ms:
 * ```
 * const randomGenerator = interval(() => Math.random(), 1000);
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
 * for await (const v of interval(count(10), 1000)) {
 *  // Do something with `v`
 * }
 * ```
 * If you just want to loop at a certain speed, consider using {@link continuously} instead.
 *
 * If the AbortSignal is triggered, an exception will be thrown, stopping iteration.
 * @template V Returns value of `produce` function
 * @param intervalMs Interval between execution
 * @param produce Function to call
 * @param signal AbortSignal to cancel long sleeps. Throws an exception.
 * @template V Data type
 * @returns
 */
declare const interval: <V>(produce: IntervalAsync<V>, intervalMs: number, signal: AbortSignal) => AsyncGenerator<Awaited<V>, void, unknown>;

/**
 * Pauses execution for `timeoutMs` after which the asynchronous `callback` is executed and awaited.
 *
 * @example Pause and wait for function
 * ```js
 * const result = await delay(async () => Math.random(), 1000);
 * console.log(result); // Prints out result after one second
 * ```
 *
 * If `await` is omitted, the function will run after the provided timeout, and code will continue to run.
 *
 * @example Schedule a function without waiting
 * ```js
 * delay(async () => {
 *  console.log(Math.random())
 * }, 1000);
 * // Prints out a random number after 1 second.
 * ```
 *
 * {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
 *
 *
 * If you want to be able to cancel or re-run a delayed function, consider using
 * {@link timeout} instead.
 *
 * @template V
 * @param callback What to run after `timeoutMs`
 * @param timeoutMs How long to delay
 * @return Returns result of `callback`.
 */
declare const delay: <V>(callback: () => Promise<V>, timeoutMs: number) => Promise<V>;
/**
 * Async generator that loops at a given `timeoutMs`.
 *
 * @example Loop runs every second
 * ```
 * // Loop forever
 * (async () => {
 *  const loop = delayLoop(1000);
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
 * for await (const o of loop) {
 *  // Do something...
 *  // Warning: loops forever
 * }
 * ```
 * @param timeoutMs Delay. If 0 is given, `requestAnimationFrame` is used over `setTimeout`.
 */
declare function delayLoop(timeoutMs: number): AsyncGenerator<undefined, void, unknown>;

export { IntervalAsync as I, delay as a, delayLoop as d, interval as i };
