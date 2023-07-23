import { b as StateMachine } from './StateMachine-85790eb1.js';

/**
 * Creates a timer
 */
type TimerSource = () => Timer;
/**
 * A timer instance
 */
type Timer = {
    reset(): void;
    get elapsed(): number;
};
type ModTimer = Timer & {
    mod(amt: number): void;
};
/**
 * Returns a function that returns true if timer is complete
 *
 * ```js
 * const timer = hasElapsedMs(1000);
 * timer(); // Returns true if timer is done
 * ```
 *
 * See also {@link completionMs}.
 * @param totalMs
 * @returns
 */
declare function hasElapsedMs(totalMs: number): () => boolean;
/**
 * Returns a function that returns the percentage of timer completion
 *
 * ```js
 * const timer = completionMs(1000);
 * timer(); // Returns 0..1
 * ```
 *
 * See also {@link hasElapsedMs}.
 * @param totalMs
 * @returns
 */
declare function completionMs(totalMs: number): () => number;
declare const frequencyTimerSource: (frequency: number) => TimerSource;
/**
 * Wraps a timer, returning a relative elapsed value.
 *
 * ```js
 * let t = relativeTimer(1000, msElapsedTimer());
 *
 * t.isDone;  // true if total has elapsed
 * t.reset(); // reset timer to 0
 * t.elapsed; // 0..1 scale of how close to completion
 * ```
 *
 * Use `relativeTimerMs` if you want to have a millisecond-based total
 * @private
 * @param total Total
 * @param timer Timer
 * @param clampValue If true, returned value never exceeds 1.0
 * @returns Timer
 */
declare const relativeTimer: (total: number, timer: Timer, clampValue?: boolean) => ModTimer & HasCompletion;
/**
 * Wraps a timer, returning a relative elapsed value.
 *
 * ```js
 * // Timer that counts to 1,000 milliseconds
 * let t = relativeTimerMs(1000);
 *
 * t.isDone;  // true if total milliseconds has elapsed
 * t.reset(); // reset timer to 0
 * t.elapsed; // 0..1 scale of how close to completion
 * ```
 * @param total Total
 * @param timer Timer
 * @param clampValue If true, returned value never exceeds 1.0
 * @returns Timer
 */
declare const relativeTimerMs: (total: number, clampValue?: boolean) => Timer & {
    mod(amt: number): void;
} & HasCompletion;
/**
 * Wraps a tick-based 'timer', returning a relative value (0..1).
 * A value of 1 indicates the timer has completed.
 *
 * ```js
 * // Timer that counts 20 ticks
 * let t = relativeTimerTicks(20);
 *
 * t.isDone;  // true if total ticks has elapsed
 * t.reset(); // reset timer to 0
 * t.elapsed; // 0..1 scale of how close to completion
 * ```
 *
 * Example:
 * ```js
 * const t = relativeTimerTicks(10);
 * while (!t.isDone) {
 *  const progress = t.elapsed;
 *  // Yields: 0.1, 0.2, ... 1
 * }
 * ```
 * @param total
 * @param clampValue
 * @returns
 */
declare const relativeTimerTicks: (total: number, clampValue?: boolean) => Timer & {
    mod(amt: number): void;
} & HasCompletion;
/**
 * A timer based on frequency: cycles per unit of time. These timers return a number from
 * 0..1 indicating position with a cycle.
 *
 * In practice, timers are used to 'drive' something like an Oscillator.
 *
 * @example Init a spring oscillator, with a half a cycle per second
 * ```js
 * import { Oscillators } from "https://unpkg.com/ixfx/dist/modulation.js"
 * import { frequencyTimer } from "https://unpkg.com/ixfx/dist/flow.js"
 * Oscillators.spring({}, frequencyTimer(0.5));
 * ```
 *
 * By default it uses elapsed clock time as a basis for frequency. ie., cycles per second.
 *
 * It returns a `ModTimer`, which allows for a modulation amount to be continually applied
 * to the calculation of the 'position' within a cycle.
 *
 * @example Prints around 0/0.5 each second, as timer is half a cycle per second
 * ```js
 * import { frequencyTimer } from "https://unpkg.com/ixfx/dist/flow.js"
 * const t = frequencyTimer(0.5);
 * setInterval(() => {
 *  console.log(t.elapsed);
 * }, 1000);
 * ```
 * @param frequency
 * @param timer
 * @returns
 */
declare const frequencyTimer: (frequency: number, timer?: Timer) => ModTimer;
/**
 * A timer that uses clock time
 * @private
 * @returns {Timer}
 */
declare const msElapsedTimer: () => Timer;
/**
 * A timer that progresses with each call to `elapsed`.
 *
 * The first call to elapsed will return 1.
 * @private
 * @returns {Timer}
 */
declare const ticksElapsedTimer: () => Timer;

type Interval = number | {
    readonly millis?: number;
    readonly secs?: number;
    readonly hrs?: number;
    readonly mins?: number;
};
declare const intervalToMs: (i: Interval | undefined, defaultNumber?: number) => number | undefined;
type IntervalOpts = {
    /**
     * Sleep a fixed period of time regardless of how long each invocation of 'produce' takes
     */
    readonly fixedIntervalMs?: Interval;
    /**
     * Minimum interval. That is, only sleep if there is time left over after 'produce'
     * is invoked.
     */
    readonly minIntervalMs?: Interval;
    /**
     * Optional signal to abort
     */
    readonly signal?: AbortSignal;
    /**
     * When to perform delay. Default is before 'produce' is invoked.
     */
    readonly delay?: 'before' | 'after';
};
/**
 * Generates values from `produce` with `intervalMs` time delay.
 * `produce` can be a simple function that returns a value, an async function, or a generator.
 *
 * @example Produce a random number every 500ms:
 * ```
 * const randomGenerator = interval(() => Math.random(), { fixedIntervalMs: 1000 });
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
 * for await (const v of interval(count(10), { fixedIntervalMs: 1000 })) {
 *  // Do something with `v`
 * }
 * ```
 *
 * Options allow either fixed interval (wait this long between each callback), or a minimum interval (wait at least this long).
 * The latter is useful if `produce` takes some time or sleeps. In this case, `interval` will only wait the remaining time,
 * or otherwise not wait at all.
 *
 * If you just want to loop at a certain speed, consider using {@link continuously} instead.
 *
 * If the AbortSignal is triggered, an exception will be thrown, stopping iteration.
 * @template V Returns value of `produce` function
 * @param produce Function to call
 * @param opts Options
 * @template V Data type
 * @returns
 */
declare const interval: <V>(produce: AsyncPromiseOrGenerator<V>, opts?: IntervalOpts) => AsyncGenerator<Awaited<V>, void, unknown>;

type TimeoutSyncCallback = (elapsedMs?: number, ...args: readonly unknown[]) => void;
type TimeoutAsyncCallback = (elapsedMs?: number, ...args: readonly unknown[]) => Promise<void>;
/**
 * A resettable timeout, returned by {@link timeout}
 */
type Timeout = HasCompletion & {
    start(altTimeoutMs?: number, args?: readonly unknown[]): void;
    cancel(): void;
    get isDone(): boolean;
};
/**
 * Returns a {@link Timeout} that can be triggered, cancelled and reset. Use {@link continuously} for interval-
 * based loops.
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
 * If you don't expect to need to control the timeout, consider using {@link delay},
 * which can run a given function after a specified delay.
 * @param callback
 * @param timeoutMs
 * @returns {@link Timeout}
 */
declare const timeout: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, timeoutMs: number) => Timeout;

type UpdateFailPolicy = `fast` | `slow` | `backoff`;
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
declare const updateOutdated: <V>(fn: (elapsedMs?: number) => Promise<V>, intervalMs: number, updateFail?: UpdateFailPolicy) => () => Promise<V>;

/**
 * Runs a function continuously, returned by {@link Continuously}
 */
type Continuously = HasCompletion & {
    /**
     * Starts loop. If already running, does nothing
     */
    start(): void;
    /**
     * (Re-)starts the loop. If an existing iteration has been
     * scheduled, this is cancelled and started again.
     *
     * This can be useful when adjusting the interval
     */
    reset(): void;
    /**
     * How many milliseconds since start() was last called
     */
    get elapsedMs(): number;
    /**
     * How many iterations of the loop since start() was last called
     */
    get ticks(): number;
    /**
     * Returns true if the loop is not running (for some reason or another)
     */
    get isDone(): boolean;
    /**
     * If disposed, the continuously instance won't be re-startable
     */
    get isDisposed(): boolean;
    /**
     * Stops loop. It can be restarted using .start()
     */
    cancel(): void;
    /**
     * Set interval. Change will take effect on next loop. For it to kick
     * in earlier, call .reset() after changing the value.
     */
    set intervalMs(ms: number);
    get intervalMs(): number;
};
type ContinuouslySyncCallback = (ticks?: number, elapsedMs?: number) => boolean | void;
type ContinuouslyAsyncCallback = (ticks?: number, elapsedMs?: number) => Promise<boolean | void>;
type OnStartCalled = `continue` | `cancel` | `reset` | `dispose`;
type ContinuouslyOpts = {
    readonly fireBeforeWait?: boolean;
    /**
     * Called whenever .start() is invoked.
     * If this function returns:
     *  - `continue`: the loop starts if it hasn't started yet, or continues if already started
     *  - `cancel`: loop stops, but can be re-started if .start() is called again
     *  - `dispose`: loop stops and will throw an error if .start() is attempted to be called
     *  - `reset`: loop resets (ie. existing scheduled task is cancelled)
     *
     */
    readonly onStartCalled?: (ticks?: number, elapsedMs?: number) => OnStartCalled;
};
/**
 * Returns a {@link Continuously} that continuously at `intervalMs`, executing `callback`.
 * By default, first the sleep period happens and then the callback happens.
 * Use {@link Timeout} for a single event.
 *
 * If callback returns _false_, loop exits.
 *
 * Call `start` to begin/reset loop. `cancel` stops loop.
 *
 * @example Animation loop
 * ```js
 * const draw = () => {
 *  // Draw on canvas
 * }
 *
 * // Run draw() synchronised with monitor refresh rate via `window.requestAnimationFrame`
 * continuously(draw).start();
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
 * @example Control a 'continuously'
 * ```js
 * c.cancel();   // Stop the loop, cancelling any up-coming calls to `fn`
 * c.elapsedMs;  // How many milliseconds have elapsed since start
 * c.ticks;      // How many iterations of loop since start
 * c.intervalMs; // Get/set speed of loop. Change kicks-in at next loop.
 *               // Use .start() to reset to new interval immediately
 * ```
 *
 * Asynchronous callback functions are supported too:
 * ```js
 * continuously(async () => { ..});
 * ```
 *
 * The `callback` function can receive a few arguments:
 * ```js
 * continuously( (ticks, elapsedMs) => {
 *  // ticks: how many times loop has run
 *  // elapsedMs:  how long since last loop
 * }).start();
 * ```
 *
 * If the callback explicitly returns _false_, the loop will be cancelled
 * ```js
 * continuously(ticks => {
 *  // Stop after 100 iterations
 *  if (ticks > 100) return false;
 * }).start();
 * ```
 *
 * You can intercept the logic for calls to `start()` with `onStartCalled`. It can determine
 * whether the `start()` proceeds, if the loop is cancelled, or the whole thing disposed,
 * so it can't run any longer.
 * ```js
 * continuously(callback, intervalMs, {
 *  onStartCalled:(ticks, elapsedMs) => {
 *    if (elapsedMs > 1000) return `cancel`;
 *  }
 * }).start();
 * ```
 *
 * To run `callback` *before* the sleep happens, set `fireBeforeWait`:
 * ```js
 * continuously(callback, intervalMs, { fireBeforeWait: true });
 * ```
 * @param callback Function to run. If it returns false, loop exits.
 * @param opts Additional options
 * @param intervalMs
 * @returns
 */
declare const continuously: (callback: ContinuouslyAsyncCallback | ContinuouslySyncCallback, intervalMs?: number, opts?: ContinuouslyOpts) => Continuously;

/**
 * Returns a debounce function which acts to filter calls to a given function `fn`.
 *
 * Eg, Let's create a debounced wrapped for a function:
 * ```js
 * const fn = () => console.log('Hello');
 * const debouncedFn = debounce(fn, 1000);
 * ```
 *
 * Now we can call `debouncedFn()` as often as we like, but it will only execute
 * `fn()` after 1 second has elapsed since the last invocation. It essentially filters
 * many calls to fewer calls. Each time `debounceFn()` is called, the timeout is
 * reset, so potentially `fn` could never be called if the rate of `debounceFn` being called
 * is faster than the provided timeout.
 *
 * Remember that to benefit from `debounce`, you must call the debounced wrapper, not the original function.
 *
 * ```js
 * // Create
 * const d = debounce(fn, 1000);
 *
 * // Don't do this if we want to benefit from the debounce
 * fn();
 *
 * // Use the debounced wrapper
 * d(); // Only calls fn after 1000s
 * ```
 *
 * A practical use for this is handling high-frequency streams of data, where we don't really
 * care about processing every event, only last event after a period. Debouncing is commonly
 * used on microcontrollers to prevent button presses being counted twice.
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
 * Arguments can be passed to the debounced function:
 *
 * ```js
 * const fn = (x) => console.log(x);
 * const d = debounce(fn, 1000);
 * d(10);
 * ```
 *
 * If the provided function is asynchronous, it's possible to await the debounced
 * version as well. If the invocation was filtered, it returns instantly.
 *
 * ```js
 * const d = debounce(fn, 1000);
 * await d();
 * ```
 * @param callback Function to filter access to
 * @param timeoutMs Minimum time between invocations
 * @returns Debounce function
 */
declare const debounce: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, timeoutMs: number) => DebouncedFunction;
/**
 * Debounced function
 */
type DebouncedFunction = (...args: readonly unknown[]) => void;

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

type SleepOpts<V> = Interval & {
    readonly signal?: AbortSignal;
    readonly value?: V;
};
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
 * const v = await sleep({ seconds: 1, `hello`);
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
 * @param signal
 * @return
 */
declare const sleep: <V>(optsOrMillis: number | SleepOpts<V>) => Promise<V | undefined>;

/**
 * Helper function for calling code that should fail after a timeout.
 * In short, it allows you to signal when the function succeeded, to cancel it, or
 * to be notified if it was canceled or completes.
 *
 * @example Verbose example
 * ```js
 * // This function is called by `waitFor` if it was cancelled
 * const onAborted = (reason:string) => {
 *  // 'reason' is a string describing why it has aborted.
 *  // ie: due to timeout or because done() was called with an error
 * };
 *
 * // This function is called by `waitFor` if it completed
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
 * @example Compact example
 * ```js
 * const done = waitFor(1000,
 *  (reason) => {
 *    console.log(`Aborted: ${reason}`);
 *  },
 *  (success) => {
 *    console.log(`Completed. Success: ${success ?? `Yes!` : `No`}`)
 *  });
 *
 * try {
 *  runSomethingThatMightScrewUp();
 *  done(); // Signal it succeeded
 * } catch (e) {
 *  done(e); // Signal there was an error
 * }
 * ```
 * @param timeoutMs
 * @param onAborted
 * @param onComplete
 * @returns
 */
declare const waitFor: (timeoutMs: number, onAborted: (reason: string) => void, onComplete?: ((success: boolean) => void) | undefined) => (error?: string) => void;

type DelayOpts = {
    readonly intervalMs: number;
    readonly signal?: AbortSignal;
    readonly delay: 'before' | 'after' | 'both';
};
/**
 * Pauses execution for `timeoutMs` after which the asynchronous `callback` is executed and awaited.
 * Use {@link delayIterable} to step through an iterable with delays
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
 * @see {@link delayIterable} To delay iteration
 * @param callback What to run after `timeoutMs`
 * @return Returns result of `callback`.
 */
declare const delay: <V>(callback: () => Promise<V>, opts: DelayOpts) => Promise<V>;
/**
 * Async iterable over an input iterable with delay
 * Use {@link delay} to return a result after some delay
 * ```js
 * for await (const i of delayIterable(count(10), { intervalMs: 1000, delay: 'before' })) {
 *  // Prints 0..9 with one second between
 * }
 * ```
 * @param iter
 * @param opts
 */
declare function delayIterable<V>(iter: AsyncIterable<V> | Iterable<V>, opts: DelayOpts): AsyncGenerator<Awaited<V>, void, unknown>;
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

/**
 * Returns true for every _n_th call, eg 2 for every second call.
 *
 * If `nth` is 1, returns true for everything. 0 will be false for everything.
 *
 * Usage:
 * ```js
 * const tenth = everyNth(10);
 * window.addEventListener(`pointermove`, evt => {
 *  if (!tenth(evt)) return; // Filter out
 *  // Continue processing, it is the 10th thing.
 *
 * });
 * ```
 *
 * Alternative:
 * ```js
 * window.addEventListener(`pointermove`, everyNth(10, evt => {
 *  // Do something with tenth item...
 * });
 * ```
 * @param nth Every nth item
 * @param callback
 * @returns Function which in turn returns true if nth call has been hit, false otherwise
 */
declare const everyNth: (nth: number, callback?: ((...args: readonly unknown[]) => void) | undefined) => (...args: unknown[]) => boolean;

/**
 * Runs a function once
 *
 * ```js
 * const init = runOnce(() => {
 *  // do some initialisation
 * });
 *
 * init(); // Runs once
 * init(); // no-op
 * ```
 * @param onRun
 * @returns
 */
declare const runOnce: (onRun: () => boolean) => (() => boolean);

/**
 * Result of backoff
 */
type RetryWithBackOffResult = {
    readonly message?: string;
    readonly success: boolean;
    readonly attempts: number;
    readonly elapsed: number;
};
/**
 * Backoff options
 */
type RetryWithBackOffOpts = {
    /**
     * Number of attempts to make
     */
    readonly count: number;
    /**
     * Starting milliseconds for sleeping after failure
     */
    readonly startMs: number;
    /**
     * Optional abort signal
     */
    readonly abort?: AbortSignal;
    /**
     * Log: true logs to console, pass a function for a custom logger
     */
    readonly log?: boolean;
    /**
     * Math.pow factor. Defaults to 1.1
     */
    readonly power?: number;
};
/**
 * Keeps calling `cb` until it returns _true_. If it throws an exception,
 * it will cancel the retry, bubbling the exception.
 *
 *
 * ```js
 * // A function that only works some of the time
 * const flakyFn = async () => {
 *  // do the thing
 *  if (Math.random() > 0.9) return true; // success
 *  return false; // 'failed'
 * };
 *
 * // Retry it five times
 * const result = await retryWithBackOff(flakyFn, {
 *  count: 5,
 *  startMs: 1000
 * });
 *
 * if (result.success) {
 *  // Yay
 * } else {
 *  console.log(`Failed after ${result.attempts} attempts. Elapsed: ${result.elapsed}`);
 *  console.log(result.message);
 * }
 * ```
 * @param cb Function to run
 * @param opts Options
 * @returns
 */
declare const retryWithBackOff: (cb: () => Promise<boolean>, opts: RetryWithBackOffOpts) => Promise<RetryWithBackOffResult>;

type PollOpts = {
    sampleRateMs: number;
    signal?: AbortSignal;
};
/**
 * Polls a function, returning values as an iterator. When the
 * function returns _undefined_, iterator ends.
 *
 * @example Iterate over an envelope's values with a 100ms rate
 * ```js
 * const env = adsr(opts);
 * env.trigger();
 *
 * const iter = iterableFromPoll(100, () => {
 *  if (env.isDone) return; // Exit
 *  const v = env.value;
 *  return v;
 * });
 *
 * for await (const v of iter) {
 *  // iterate over envelope values, sampling every 100ms
 * }
 * ```
 *
 * An AbortSignal can be passed in to cancel iteration.
 * @param opts
 * @returns
 */
declare function iterableFromPoll<V>(poll: () => V | undefined, optsOrMillis: PollOpts | number): AsyncGenerator<Awaited<V & null> | Awaited<V & {}>, void, unknown>;

/**
 * Simple task queue. Each task is awaited and run
 * in turn.
 *
 * @example Usage
 * ```js
 * const q = new TaskQueue();
 * q.add(async () => {
 *  // Takes one second to run
 *  await sleep(1000);
 * });
 * ```
 */
declare class TaskQueue {
    static instance: TaskQueue;
    private _timer;
    private _queue;
    private readonly _startDelayMs;
    private readonly _intervalMs;
    private constructor();
    /**
     * Adds a task. This triggers processing loop if not already started.
     *
     * ```js
     * queue.add(async () => {
     *  await sleep(1000);
     * });
     * ```
     * @param task Task to run
     */
    add(task: () => void): void;
    private schedule;
    private processQueue;
}

type AsyncPromiseOrGenerator<V> = (() => V | Promise<V>) | Generator<V> | AsyncGenerator<V>;

type HasCompletion = {
    get isDone(): boolean;
};
/**
 * Iterates over `iterator` (iterable/array), calling `fn` for each value.
 * If `fn` returns _false_, iterator cancels.
 *
 * Over the default JS `forEach` function, this one allows you to exit the
 * iteration early.
 *
 * @example
 * ```js
 * forEach(count(5), () => console.log(`Hi`));  // Prints `Hi` 5x
 * forEach(count(5), i => console.log(i));      // Prints 0 1 2 3 4
 * forEach([0,1,2,3,4], i => console.log(i));   // Prints 0 1 2 3 4
 * ```
 *
 * Use {@link forEachAsync} if you want to use an async `iterator` and async `fn`.
 * @param iterator Iterable or array
 * @typeParam V Type of iterable
 * @param fn Function to call for each item. If function returns _false_, iteration cancels
 */
declare const forEach: <V>(iterator: IterableIterator<V> | readonly V[], fn: (v?: V | undefined) => boolean | void) => void;
/**
 * Iterates over an async iterable or array, calling `fn` for each value, with optional
 * interval between each loop. If the async `fn` returns _false_, iterator cancels.
 *
 * Use {@link forEach} for a synchronous version.
 *
 * ```
 * // Prints items from array every second
 * await forEachAsync([0,1,2,3], i => console.log(i), 1000);
 * ```
 *
 * @example Retry `doSomething` up to five times, with 5 seconds between each attempt
 * ```
 * await forEachAsync(count(5), i=> {
 *  try {
 *    await doSomething();
 *    return false; // Succeeded, exit early
 *  } catch (ex) {
 *    console.log(ex);
 *    return true; // Keep trying
 *  }
 * }, 5000);
 * ```
 * @param iterator Iterable thing to loop over
 * @param fn Function to invoke on each item. If it returns _false_ loop ends.
 * @typeParam V Type of iterable
 */
declare const forEachAsync: <V>(iterator: AsyncIterableIterator<V> | readonly V[], fn: (v?: V | undefined) => Promise<boolean> | Promise<void>, intervalMs?: number) => Promise<void>;
type RepeatPredicate = (repeats: number, valuesProduced: number) => boolean;
/**
 * Runs `fn` a certain number of times, accumulating result into an array.
 * If `fn` returns undefined, the result is ignored.
 *
 * ```js
 * // Results will be an array with five random numbers
 * const results = repeat(5, () => Math.random());
 * ```
 *
 * Repeats can be specified as an integer (eg. 5 for five repeats), or a function
 * that gives _false_ when repeating should stop.
 *
 * ```js
 * // Keep running `fn` until we've accumulated 10 values
 * // Useful if `fn` sometimes returns _undefined_
 * const results = repeat((repeats, valuesProduced) => valuesProduced < 10, fn);
 * ```
 *
 * If you don't need to accumulate return values, consider {@link Generators.count | Generators.count} with {@link Flow.forEach | Flow.forEach}.
 *
 * @param countOrPredicate Number of repeats or function returning false when to stop
 * @param fn Function to run, must return a value to accumulate into array or _undefined_
 * @returns Array of accumulated results
 */
declare const repeat: <V>(countOrPredicate: number | RepeatPredicate, fn: () => V | undefined) => readonly V[];
/**
 * Repeatedly calls `fn`, reducing via `reduce`.
 *
 * ```js
 * repeatReduce(10, () => 1, (acc, v) => acc + v);
 * // Yields: 10
 *
 * // Multiplies random values against eachother 10 times
 * repeatReduce(10, () => Math.random(), (acc, v) => acc * v);
 * // Yields a single number
 * ```
 * @param countOrPredicate
 * @param fn
 * @param initial
 * @param reduce
 * @returns
 */
declare const repeatReduce: <V>(countOrPredicate: number | RepeatPredicate, fn: () => V | undefined, initial: V, reduce: (acc: V, value: V) => V) => V;

type index_AsyncPromiseOrGenerator<V> = AsyncPromiseOrGenerator<V>;
type index_Continuously = Continuously;
type index_ContinuouslyAsyncCallback = ContinuouslyAsyncCallback;
type index_ContinuouslyOpts = ContinuouslyOpts;
type index_ContinuouslySyncCallback = ContinuouslySyncCallback;
type index_DebouncedFunction = DebouncedFunction;
type index_DelayOpts = DelayOpts;
type index_HasCompletion = HasCompletion;
type index_Interval = Interval;
type index_IntervalOpts = IntervalOpts;
type index_ModTimer = ModTimer;
type index_OnStartCalled = OnStartCalled;
type index_PollOpts = PollOpts;
type index_RepeatPredicate = RepeatPredicate;
type index_RetryWithBackOffOpts = RetryWithBackOffOpts;
type index_RetryWithBackOffResult = RetryWithBackOffResult;
type index_SleepOpts<V> = SleepOpts<V>;
declare const index_StateMachine: typeof StateMachine;
type index_TaskQueue = TaskQueue;
declare const index_TaskQueue: typeof TaskQueue;
type index_Timeout = Timeout;
type index_TimeoutAsyncCallback = TimeoutAsyncCallback;
type index_TimeoutSyncCallback = TimeoutSyncCallback;
type index_Timer = Timer;
type index_TimerSource = TimerSource;
type index_UpdateFailPolicy = UpdateFailPolicy;
declare const index_completionMs: typeof completionMs;
declare const index_continuously: typeof continuously;
declare const index_debounce: typeof debounce;
declare const index_delay: typeof delay;
declare const index_delayIterable: typeof delayIterable;
declare const index_delayLoop: typeof delayLoop;
declare const index_everyNth: typeof everyNth;
declare const index_forEach: typeof forEach;
declare const index_forEachAsync: typeof forEachAsync;
declare const index_frequencyTimer: typeof frequencyTimer;
declare const index_frequencyTimerSource: typeof frequencyTimerSource;
declare const index_hasElapsedMs: typeof hasElapsedMs;
declare const index_interval: typeof interval;
declare const index_intervalToMs: typeof intervalToMs;
declare const index_iterableFromPoll: typeof iterableFromPoll;
declare const index_msElapsedTimer: typeof msElapsedTimer;
declare const index_relativeTimer: typeof relativeTimer;
declare const index_relativeTimerMs: typeof relativeTimerMs;
declare const index_relativeTimerTicks: typeof relativeTimerTicks;
declare const index_repeat: typeof repeat;
declare const index_repeatReduce: typeof repeatReduce;
declare const index_retryWithBackOff: typeof retryWithBackOff;
declare const index_runOnce: typeof runOnce;
declare const index_sleep: typeof sleep;
declare const index_throttle: typeof throttle;
declare const index_ticksElapsedTimer: typeof ticksElapsedTimer;
declare const index_timeout: typeof timeout;
declare const index_updateOutdated: typeof updateOutdated;
declare const index_waitFor: typeof waitFor;
declare namespace index {
  export {
    index_AsyncPromiseOrGenerator as AsyncPromiseOrGenerator,
    index_Continuously as Continuously,
    index_ContinuouslyAsyncCallback as ContinuouslyAsyncCallback,
    index_ContinuouslyOpts as ContinuouslyOpts,
    index_ContinuouslySyncCallback as ContinuouslySyncCallback,
    index_DebouncedFunction as DebouncedFunction,
    index_DelayOpts as DelayOpts,
    index_HasCompletion as HasCompletion,
    index_Interval as Interval,
    index_IntervalOpts as IntervalOpts,
    index_ModTimer as ModTimer,
    index_OnStartCalled as OnStartCalled,
    index_PollOpts as PollOpts,
    index_RepeatPredicate as RepeatPredicate,
    index_RetryWithBackOffOpts as RetryWithBackOffOpts,
    index_RetryWithBackOffResult as RetryWithBackOffResult,
    index_SleepOpts as SleepOpts,
    index_StateMachine as StateMachine,
    index_TaskQueue as TaskQueue,
    index_Timeout as Timeout,
    index_TimeoutAsyncCallback as TimeoutAsyncCallback,
    index_TimeoutSyncCallback as TimeoutSyncCallback,
    index_Timer as Timer,
    index_TimerSource as TimerSource,
    index_UpdateFailPolicy as UpdateFailPolicy,
    index_completionMs as completionMs,
    index_continuously as continuously,
    index_debounce as debounce,
    index_delay as delay,
    index_delayIterable as delayIterable,
    index_delayLoop as delayLoop,
    index_everyNth as everyNth,
    index_forEach as forEach,
    index_forEachAsync as forEachAsync,
    index_frequencyTimer as frequencyTimer,
    index_frequencyTimerSource as frequencyTimerSource,
    index_hasElapsedMs as hasElapsedMs,
    index_interval as interval,
    index_intervalToMs as intervalToMs,
    index_iterableFromPoll as iterableFromPoll,
    index_msElapsedTimer as msElapsedTimer,
    index_relativeTimer as relativeTimer,
    index_relativeTimerMs as relativeTimerMs,
    index_relativeTimerTicks as relativeTimerTicks,
    index_repeat as repeat,
    index_repeatReduce as repeatReduce,
    index_retryWithBackOff as retryWithBackOff,
    index_runOnce as runOnce,
    index_sleep as sleep,
    index_throttle as throttle,
    index_ticksElapsedTimer as ticksElapsedTimer,
    index_timeout as timeout,
    index_updateOutdated as updateOutdated,
    index_waitFor as waitFor,
  };
}

export { iterableFromPoll as $, AsyncPromiseOrGenerator as A, ContinuouslySyncCallback as B, Continuously as C, DelayOpts as D, ContinuouslyAsyncCallback as E, ContinuouslyOpts as F, continuously as G, HasCompletion as H, Interval as I, debounce as J, DebouncedFunction as K, throttle as L, ModTimer as M, sleep as N, OnStartCalled as O, waitFor as P, delay as Q, RepeatPredicate as R, SleepOpts as S, Timer as T, UpdateFailPolicy as U, everyNth as V, runOnce as W, RetryWithBackOffResult as X, RetryWithBackOffOpts as Y, retryWithBackOff as Z, PollOpts as _, delayLoop as a, interval as b, forEachAsync as c, delayIterable as d, repeatReduce as e, forEach as f, TaskQueue as g, TimerSource as h, index as i, hasElapsedMs as j, completionMs as k, frequencyTimerSource as l, relativeTimer as m, relativeTimerMs as n, relativeTimerTicks as o, frequencyTimer as p, msElapsedTimer as q, repeat as r, intervalToMs as s, ticksElapsedTimer as t, IntervalOpts as u, TimeoutSyncCallback as v, TimeoutAsyncCallback as w, Timeout as x, timeout as y, updateOutdated as z };
