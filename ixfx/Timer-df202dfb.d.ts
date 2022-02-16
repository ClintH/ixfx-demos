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
 * Creates a debounce function
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
 * const moveDebounced = debounce((evt) => {
 *    // Handle event
 * }, 500);
 *
 * // Wire up event
 * el.addEventListener(`pointermove`, moveDebounced);
 * ```
 * @param callback
 * @param timeoutMs
 * @returns
 */
declare const debounce: (callback: () => void, timeoutMs: number) => (...args: unknown[]) => void;
/***
 * Throttles an function. Callback only triggered after minimum of `intervalMinMs`.
 *
 * @example Only handle move event every 500ms
 * ```js
 * const moveThrottled = throttle( (elapsedMs, args) => {
 *  // Handle ar
 * }, 500);
 * el.addEventListener(`pointermove`, moveThrottled)
 * ```
 */
declare const throttle: (callback: (elapsedMs: number, ...args: readonly unknown[]) => void, intervalMinMs: number) => (...args: unknown[]) => void;
/**
 * Generates values from `produce` with `intervalMs` time delay
 *
 * @example Produce a random number every 500ms:
 * ```
 * const randomGenerator = interval(() => Math.random(), 1000);
 * for await (const r of randomGenerator) {
 *  // Random value every 1 second
 * }
 * ```
 *
 * @template V
 * @param intervalMs Interval between execution
 * @param produce Function to call
 * @template V Data type
 * @returns
 */
declare const interval: <V>(produce: () => Promise<V>, intervalMs: number) => AsyncGenerator<Awaited<V>, void, unknown>;
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
 * @param callback
 * @param timeoutMs
 * @returns {@link Timeout}
 */
declare const timeout: (callback: (elapsedMs?: number | undefined, ...args: readonly unknown[]) => void, timeoutMs: number) => Timeout;
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
 * @param callback Function to run. If it returns false, loop exits.
 * @param resetCallback Callback when/if loop is reset. If it returns false, loop exits
 * @param intervalMs
 * @returns
 */
declare const continuously: (callback: ContinuouslyAsyncCallback | ContinuouslySyncCallback, intervalMs?: number | undefined, resetCallback?: ((ticks?: number | undefined, elapsedMs?: number | undefined) => boolean | void) | undefined) => Continuously;
/**
 * Pauses execution for `timeoutMs`.
 *
 * @example
 * ```js
 * console.log(`Hello`);
 * await sleep(1000);
 * console.log(`There`); // Prints one second after
 * ```
 * @param timeoutMs
 * @return
 */
declare const sleep: <V>(timeoutMs: number) => Promise<V>;
/**
 * Pauses execution for `timeoutMs` after which the asynchronous `callback` is executed and awaited.
 *
 * @example
 * ```js
 * const result = await delay(async () => Math.random(), 1000);
 * console.log(result); // Prints out result after one second
 * ```
 * @template V
 * @param callback
 * @param timeoutMs
 * @return
 */
declare const delay: <V>(callback: () => Promise<V>, timeoutMs: number) => Promise<V>;
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

export { Continuously as C, HasCompletion as H, ModTimer as M, TimerSource as T, Timer as a, Timeout as b, timeout as c, debounce as d, ContinuouslySyncCallback as e, ContinuouslyAsyncCallback as f, continuously as g, delay as h, interval as i, frequencyTimerSource as j, frequencyTimer as k, ticksElapsedTimer as l, msElapsedTimer as m, relativeTimer as r, sleep as s, throttle as t };
