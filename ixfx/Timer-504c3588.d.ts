/**
 * Creates a timer
 * @private
 */
declare type TimerSource = () => Timer;
/**
 * A timer instance
 * @private
 */
declare type Timer = {
    reset(): void;
    get elapsed(): number;
};
declare type ModTimer = Timer & {
    mod(amt: number): void;
};
/**
 * @private
 */
declare type HasCompletion = {
    get isDone(): boolean;
};
/**
 * A resettable timeout, returned by {@link timeout}
 */
declare type Timeout = HasCompletion & {
    start(altTimeoutMs?: number, args?: readonly unknown[]): void;
    cancel(): void;
    get isDone(): boolean;
};
/**
 * Creates a debounce function.
 *
 * ```js
 * // Create
 * const d = debounce(fn, 1000);
 *
 * // Use
 * d(); // Only calls fn after 1000s
 * ```
 *
 * @example Handle most recent pointermove event after 1000ms
 * ```js
 * // Set up debounced handler
 * const moveDebounced = debounce((elapsedMs, evt) => {
 *    // Handle event
 * }, 500);
 *
 * // Wire up event
 * el.addEventListener(`pointermove`, moveDebounced);
 * ```
 *
 * Debounced function can be awaited:
 * ```js
 * const d = debounce(fn, 1000);
 * await d();
 * ```
 * @param callback
 * @param timeoutMs
 * @returns
 */
declare const debounce: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, timeoutMs: number) => DebouncedFunction;
/**
 * Debounced function
 * @private
 */
declare type DebouncedFunction = (...args: readonly unknown[]) => void;
/***
 * Throttles a function. Callback only allowed to run after minimum of `intervalMinMs`.
 *
 * @example Only handle move event every 500ms
 * ```js
 * const moveThrottled = throttle( (elapsedMs, args) => {
 *  // Handle ar
 * }, 500);
 * el.addEventListener(`pointermove`, moveThrottled)
 * ```
 *
 * Note that `throttle` does not schedule invocations, but rather acts as a filter that
 * sometimes allows follow-through to `callback`, sometimes not. There is an expectation then
 * that the return function from `throttle` is repeatedly called, such as the case for handling
 * a stream of data/events.
 *
 * @example Manual trigger
 * ```js
 * // Set up once
 * const t = throttle( (elapsedMs, args) => { ... }, 5000);
 *
 * // Later, trigger throttle. Sometimes the callback will run,
 * // with data passed in to args[0]
 * t(data);
 * ```
 */
declare const throttle: (callback: (elapsedMs: number, ...args: readonly unknown[]) => void | Promise<unknown>, intervalMinMs: number) => (...args: unknown[]) => Promise<void>;
declare type IntervalAsync<V> = (() => V | Promise<V>) | Generator<V>;
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
 * // Make a generator that counts to 10
 * const counter = count(10);
 * for await (const v of interval(counter, 1000)) {
 *  // Do something with `v`
 * }
 * ```
 *
 * If you just want to loop at a certain speed, consider using {@link continuously} instead.
 * @template V Returns value of `produce` function
 * @param intervalMs Interval between execution
 * @param produce Function to call
 * @template V Data type
 * @returns
 */
declare const interval: <V>(produce: IntervalAsync<V>, intervalMs: number) => AsyncGenerator<Awaited<V>, void, unknown>;
declare type TimeoutSyncCallback = (elapsedMs?: number, ...args: readonly unknown[]) => void;
declare type TimeoutAsyncCallback = (elapsedMs?: number, ...args: readonly unknown[]) => Promise<void>;
/**
 * Returns a {@link Timeout} that can be triggered, cancelled and reset
 *
 * Once `start()` is called, `callback` will be scheduled to execute after `timeoutMs`.
 * If `start()` is called again, the waiting period will be reset to `timeoutMs`.
 *
 * @example Essential functionality
 * ```js
 * const fn = () => {
 *  console.log(`Executed`);
 * };
 * const t = timeout(fn, 60*1000);
 * t.start();   // After 1 minute `fn` will run, printing to the console
 * ```
 *
 * @example Control execution functionality
 * ```
 * t.cancel();  // Cancel it from running
 * t.start();   // Schedule again after 1 minute
 * t.start(30*1000); // Cancel that, and now scheduled after 30s
 * t.isDone;    // True if a scheduled event is pending
 * ```
 *
 * Callback function receives any additional parameters passed in from start.
 * This can be useful for passing through event data:
 *
 * @example
 * ```js
 * const t = timeout( (elapsedMs, ...args) => {
 *  // args contains event data
 * }, 1000);
 * el.addEventListener(`click`, t.start);
 * ```
 *
 * Asynchronous callbacks can be used as well:
 * ```js
 * timeout(async () => {...}, 100);
 * ```
 *
 * @param callback
 * @param timeoutMs
 * @returns {@link Timeout}
 */
declare const timeout: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, timeoutMs: number) => Timeout;
/**
 * Runs a function continuously, returned by {@link Continuously}
 */
declare type Continuously = HasCompletion & {
    /**
     * Starts loop. If already running, it is reset
     */
    start(): void;
    /**
     * How many milliseconds since start() was last called
     */
    get elapsedMs(): number;
    /**
     * How many iterations of the loop since start() was last called
     */
    get ticks(): number;
    /**
     * Whether loop has finished
     */
    get isDone(): boolean;
    /**
     * Stops loop
     */
    cancel(): void;
};
declare type ContinuouslySyncCallback = (ticks?: number, elapsedMs?: number) => boolean | void;
declare type ContinuouslyAsyncCallback = (ticks?: number, elapsedMs?: number) => Promise<boolean | void>;
/**
 * Returns a {@link Continuously} that continuously executes `callback`. If callback returns _false_, loop exits.
 *
 * Call `start` to begin/reset loop. `cancel` stops loop.
 *
 * @example Animation loop
 * ```js
 * const draw = () => {
 *  // Draw on canvas
 * }
 * continuously(draw).start(); // Run draw as fast as possible using `window.requestAnimationFrame`
 * ```
 *
 * @example With delay
 * ```js
 * const fn = () => {
 *  console.log(`1 minute`);
 * }
 * const c = continuously(fn, 60*1000);
 * c.start(); // Runs `fn` every minute
 * ```
 *
 * ```js
 * c.cancel();
 * c.elapsedMs;  // How many milliseconds have elapsed since start
 * c.ticks;      // How many iterations of loop since start
 * ```
 *
 * Asynchronous callback functions are supported too:
 * ```js
 * continuously(async () => { ..});
 * ```
 *
 * Use `continuously` if you need a loop you can start and stop at will.
 * Alternatives: {@link yieldAnimationRate}
 * @param callback Function to run. If it returns false, loop exits.
 * @param resetCallback Callback when/if loop is reset. If it returns false, loop exits
 * @param intervalMs
 * @returns
 */
declare const continuously: (callback: ContinuouslyAsyncCallback | ContinuouslySyncCallback, intervalMs?: number | undefined, resetCallback?: ((ticks?: number | undefined, elapsedMs?: number | undefined) => boolean | void) | undefined) => Continuously;
/**
 * Returns after `timeoutMs`.
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
 * sleep(1000)
 *  .then(() => console.log(`There`)); // Prints one second after
 * ```
 *
 * If a timeout of 0 is given, `requestAnimationFrame` is used instead of `setTimeout`.
 *
 * {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
 *
 * @param timeoutMs
 * @return
 */
declare const sleep: <V>(timeoutMs: number, value?: V | undefined) => Promise<V | undefined>;
/**
 * Pauses execution for `timeoutMs` after which the asynchronous `callback` is executed and awaited.
 *
 * @example
 * ```js
 * const result = await delay(async () => Math.random(), 1000);
 * console.log(result); // Prints out result after one second
 * ```
 *
 * {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
 *
 * @template V
 * @param callback What to run after `timeoutMs`
 * @param timeoutMs How long to delay
 * @return Returns result of `callback`.
 */
declare const delay: <V>(callback: () => Promise<V>, timeoutMs: number) => Promise<V>;
declare type CancelToken = {
    readonly cancel: boolean;
};
/**
 * Keeps executing `calback` until it runs without an exception being thrown.
 *
 * ```
 * // Retry up to five times, starting at 200ms delay
 * await retry(async () => {
 *  // Do something, sometimes throwing an error
 * }, 5, 200);
 * ```
 *
 * Each loop will run at twice the duration of the last, beginning at `startingTimeoutMs`.
 *
 * @param callback Async code to run
 * @param attempts Number of times to try
 * @param startingTimeoutMs Time to sleep for first iteration
 * @param cancelToken If provided, this is checked before and after each sleep to see if retry should continue. If cancelled, promise will be rejected
 * @returns
 */
declare const retry: <V>(callback: () => Promise<V>, attempts?: number, startingTimeoutMs?: number, cancelToken?: CancelToken | undefined) => Promise<V>;
/**
 * Wraps a timer, returning a relative elapsed value.
 *
 * ```js
 * let t = relativeTimer(1000, msElapsedTimer());
 * ```
 *
 * @private
 * @param total
 * @param timer
 * @param clampValue If true, returned value never exceeds 1.0
 * @returns
 */
declare const relativeTimer: (total: number, timer: Timer, clampValue?: boolean) => ModTimer & HasCompletion;
declare const frequencyTimerSource: (frequency: number) => TimerSource;
declare const frequencyTimer: (frequency: number, timer?: Timer) => ModTimer;
/**
 * A timer that uses clock time
 * @private
 * @returns {Timer}
 */
declare const msElapsedTimer: () => Timer;
/**
 * A timer that progresses with each call
 * @private
 * @returns {Timer}
 */
declare const ticksElapsedTimer: () => Timer;
declare type UpdateFailPolicy = `fast` | `slow` | `backoff`;
/**
 * Calls the async `fn` to generate a value if there is no prior value or
 * `intervalMs` has elapsed since value was last generated.
 * @example
 * ```js
 * const f = updateOutdated(async () => {
 *  const r = await fetch(`blah`);
 *  return await r.json();
 * }, 60*1000);
 *
 * // Result will be JSON from fetch. If fetch happened already in the
 * // last 60s, return cached result. Otherwise it will fetch data
 * const result = await f();
 * ```
 *
 * Callback `fn` is passed how many milliseconds have elapsed since last update. It's
 * minimum value will be `intervalMs`.
 *
 * ```js
 * const f = updateOutdated(async elapsedMs => {
 *  // Do something with elapsedMs?
 * }, 60*1000;
 * ```
 *
 * There are different policies for what to happen if `fn` fails. `slow` is the default.
 * * `fast`: Invocation will happen immediately on next attempt
 * * `slow`: Next invocation will wait `intervalMs` as if it was successful
 * * `backoff`: Attempts will get slower and slower until next success. Interval is multipled by 1.2 each time.
 *
 * @param fn Async function to call. Must return a value.
 * @param intervalMs Maximum age of cached result
 * @param updateFail `slow` by default
 * @returns Value
 */
declare const updateOutdated: <V>(fn: (elapsedMs?: number | undefined) => Promise<V>, intervalMs: number, updateFail?: UpdateFailPolicy) => () => Promise<V>;
/**
 * Helper function for calling code that should fail after a timeout.
 *
 * ```js
 * const onAborted = (reason:string) => {
 *  // 'reason' is a string describing why it has aborted.
 *  // ie: due to timeout or because done() was called with an error
 * };
 * const onComplete = (success:boolean) => {
 *  // Called if we were aborted or finished succesfully.
 *  // onComplete will be called after onAborted, if it was an error case
 * }
 *
 * // If done() is not called after 1000, onAborted will be called
 * // if done() is called or there was a timeout, onComplete is called
 * const done = waitFor(1000, onAborted, onComplete);
 *
 * // Signal completed successfully (thus calling onComplete(true))
 * done();
 *
 * // Signal there was an error (thus calling onAborted and onComplete(false))
 * done(`Some error`);
 * ```
 *
 * The completion handler is useful for removing event handlers.
 *
 * @param timeoutMs
 * @param onAborted
 * @param onComplete
 * @returns
 */
declare const waitFor: (timeoutMs: number, onAborted: (reason: string) => void, onComplete?: ((success: boolean) => void) | undefined) => (error?: string | undefined) => void;
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

export { Continuously as C, DebouncedFunction as D, HasCompletion as H, IntervalAsync as I, ModTimer as M, TimerSource as T, UpdateFailPolicy as U, Timer as a, Timeout as b, TimeoutSyncCallback as c, debounce as d, TimeoutAsyncCallback as e, timeout as f, ContinuouslySyncCallback as g, ContinuouslyAsyncCallback as h, interval as i, continuously as j, delay as k, CancelToken as l, relativeTimer as m, frequencyTimerSource as n, frequencyTimer as o, msElapsedTimer as p, ticksElapsedTimer as q, retry as r, sleep as s, throttle as t, updateOutdated as u, delayLoop as v, waitFor as w };
