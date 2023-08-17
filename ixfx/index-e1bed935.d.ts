import { b as StateMachine } from './StateMachine-0a0aaea7.js';

/**
 * Creates a timer
 */
type TimerSource = () => Timer;
/**
 * A timer instance.
 * See {@link msElapsedTimer}, {@link ticksElapsedTimer}, {@link frequencyTimer}
 */
type Timer = {
    reset(): void;
    get elapsed(): number;
};
type ModTimer = Timer & {
    mod(amt: number): void;
};
type TimerOpts = {
    /**
     * Timer to use. By default {@link msElapsedTimer}.
     */
    readonly timer?: Timer;
};
/**
 * Options for relative timer
 */
type RelativeTimerOpts = TimerOpts & {
    /**
     * If true, returned value will be clamped to 0..1. False by default
     */
    readonly clampValue?: boolean;
};
/**
 * Returns a function that returns true if timer is complete
 *
 * ```js
 * const timer = hasElapsedMs(1000);
 * timer(); // Returns true if timer is done
 * ```
 *
 * See also {@link Elapsed.progress}.
 * @param totalMs
 * @returns
 */
declare function hasElapsedMs(totalMs: number): () => boolean;
declare const frequencyTimerSource: (frequency: number) => TimerSource;
/**
 * Wraps a timer, returning a relative elapsed value based on
 * a given total. ie. percentage complete toward a total duration.
 *
 * If no timer is specified, milliseconds-based timer is used.
 *
 * ```js
 * const t = relativeTimer(1000);
 * t.isDone;
 * t.reset();
 * t.elapsed;
 * ```
 *
 * With options
 * ```js
 * // Total duration of 1000 ticks
 * const t = relativeTimer(1000, { timer: ticksElapsedTimer(); clampValue:true });
 *
 * t.isDone;  // true if total has elapsed
 * t.reset(); // reset timer to 0
 * t.elapsed; // 0..1 scale of how close to completion
 * ```
 *
 * @private
 * @param total Total
 * @param opts Options
 * @returns Timer
 */
declare const relativeTimer: (total: number, opts?: RelativeTimerOpts) => ModTimer & HasCompletion;
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
declare const frequencyTimer: (frequency: number, opts?: TimerOpts) => ModTimer;
/**
 * A timer that uses clock time. Start time is from the point of invocation.
 *
 * ```js
 * const t = msElapsedTimer();
 * t.reset(); // reset start
 * t.elapsed; // ms since start
 * ```
 * @returns {Timer}
 * @see {ticksElapsedTimer}
 */
declare const msElapsedTimer: () => Timer;
/**
 * A timer that progresses with each call to `elapsed`.
 *
 * The first call to elapsed will return 1.
 *
 * ```js
 * const timer = ticksElapsedTimer();
 * timer.reset(); // Reset to 0
 * timer.elapsed; // Number of ticks
 * ```
 * @returns {Timer}
 * @see {msElapsedTimer}
 */
declare const ticksElapsedTimer: () => Timer;

/**
 * Interval types allows for more expressive coding, rather than embedding millisecond values.
 *
 * eg: { mins: 5} rather than 5*60*1000 or worse, 300000
 *
 * Fields are cumulative. { secs: 2, millis: 1 } will equal 2001 milliseconds.
 *
 * Use {@link intervalToMs} to resolve an {@link Interval} to milliseconds. Use {@link Elapsed.toString} to get a human-readable version.
 */
type Interval = number | {
    readonly millis?: number;
    readonly secs?: number;
    readonly hours?: number;
    readonly mins?: number;
};
declare function intervalToMs(i: Interval | undefined): number | undefined;
declare function intervalToMs(i: Interval | undefined, defaultNumber: number): number;
declare function isInterval(i: number | Interval | undefined): i is Interval;
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
    readonly delay?: 'before' | 'after';
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
declare const timeout: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, interval: Interval) => Timeout;

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
    set interval(interval: Interval);
    get interval(): Interval;
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
declare const continuously: (callback: ContinuouslyAsyncCallback | ContinuouslySyncCallback, interval?: Interval, opts?: ContinuouslyOpts) => Continuously;

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
 * @param signal
 * @return
 */
declare const sleep: <V>(optsOrMillis: SleepOpts<V>) => Promise<V | undefined>;

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
    readonly delay?: 'before' | 'after' | 'both';
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
type RetryResult<V> = {
    /**
     * Message describing outcome.
     *
     * If retry was aborted, message will be abort reason.
     */
    readonly message?: string;
    /**
     * True if callback function was invoked once where it returned _true_
     */
    readonly success: boolean;
    /**
     * Number of times callback was attempted
     */
    readonly attempts: number;
    /**
     * Total elapsed time since beginning of call to `retry`
     */
    readonly elapsed: number;
    /**
     * Value returned by succeeding function,
     * or _undefined_ if it failed
     */
    readonly value: V | undefined;
};
/**
 * Backoff options
 */
type RetryOpts<V> = {
    /**
     * Maximum number of attempts to make
     */
    readonly count: number;
    /**
     * Starting milliseconds for sleeping after failure
     * Defaults to 1000.
     * Must be above zero.
     */
    readonly startMs?: number;
    /**
     * Initial waiting period before first attempt (optional)
     */
    readonly predelayMs?: number;
    /**
     * Optional abort signal
     */
    readonly abort?: AbortSignal;
    /**
     * Log: _true_ logs to console
     */
    readonly log?: boolean;
    /**
     * Math.pow factor. Defaults to 1.1. How much slower to
     * get with each retry.
     */
    readonly power?: number;
    /***
     * Default value to return if it fails
     */
    readonly defaultValue?: V;
};
/**
 * Keeps calling `cb` until it returns something other than _undefined_. If it throws an exception,
 * it will cancel the retry, bubbling the exception and cancelling the retry.
 *
 * ```js
 * // A function that only works some of the time
 * const flakyFn = async () => {
 *  // do the thing
 *  if (Math.random() > 0.9) return true; // success
 *  return; // 'failed'
 * };
 *
 * // Retry it up to five times,
 * // starting with 1000ms interval
 * const result = await retry(flakyFn, {
 *  count: 5
 * });
 *
 * if (result.success) {
 *  // Yay
 * } else {
 *  console.log(`Failed after ${result.attempts} attempts. Elapsed: ${result.elapsed}`);
 *  console.log(result.message);
 * }
 * ```
 *
 * An `AbortSignal` can be used to cancel process.
 * ```js
 * const abort = new AbortController();
 * const result = await retry(cb, { startMs: 6000, count: 1000, signal: abort.signal });
 *
 * // Somewhere else...
 * abort('Cancel!'); // Trigger abort
 * ```
 * @param cb Function to run
 * @param opts Options
 * @returns
 */
declare const retry: <V>(cb: () => Promise<V | undefined>, opts: RetryOpts<V>) => Promise<RetryResult<V>>;

type SinceFn = () => number;
/**
 * Returns elapsed time since initial call.
 * ```js
 * // Record start
 * const elapsed = Elapsed.since();
 *
 * // Get elapsed time in millis
 * elapsed(); // Yields number
 * ```
 *
 * If you want to initialise a elapsed timer, but not yet start it, consider:
 * ```js
 * // Init
 * let state = {
 *  clicked: Elapsed.infinity()
 * };
 *
 * state.click(); // Returns a giant value
 *
 * // Later, when click happens:
 * state = { click: Elapsed.since() }
 * ```
 *
 * Use {@link once} if you want to measure a single period, and stop it.
 * @returns
 */
declare const since: () => SinceFn;
/**
 * Returns elapsed time since initial call, however
 * timer stops when first invoked.
 *
 * ```js
 * const elapsed = Elapsed.once();
 * // ...do stuff
 * elapsed(); // Yields time since Elapsed.once() was called
 * // ...do more stuff
 * elapsed(); // Is still the same number as above
 * ```
 *
 * Use {@link since} to not have this stopping behaviour.
 * @returns
 */
declare const once: () => SinceFn;
/**
 * Returns a function that reports an 'infinite' elapsed time.
 * this can be useful as an initialiser for `elapsedSince`.
 *
 * ```js
 * // Init clicked to be an infinite time
 * let clicked = Elapsed.infinity();
 *
 * document.addEventListener('click', () => {
 *  // Now that click has happened, we can assign it properly
 *  clicked = Elapsed.since();
 * });
 * ```
 * @returns
 */
declare const infinity: () => SinceFn;
/**
 * Returns a function that returns the percentage of timer completion.
 * Starts timing immediately.
 *
 * ```js
 * const timer = Elapsed.progress(1000);
 * timer(); // Returns 0..1
 * ```
 *
 * Note that timer can exceed 1 (100%). To cap it:
 * ```js
 * Elapsed.progress(1000, { clampValue: true });
 * ```
 *
 * Takes an {@link Interval} for more expressive time:
 * ```js
 * const timer = Elapsed.progress({ mins: 4 });
 * ```
 * See also {@link hasElapsedMs}.
 * @param totalMs
 * @returns
 */
declare function progress(duration: Interval, opts?: {
    readonly clampValue?: boolean;
}): () => number;
declare const toString: (millisOrFn: number | SinceFn | Interval) => string;

type Elapsed_SinceFn = SinceFn;
declare const Elapsed_infinity: typeof infinity;
declare const Elapsed_once: typeof once;
declare const Elapsed_progress: typeof progress;
declare const Elapsed_since: typeof since;
declare const Elapsed_toString: typeof toString;
declare namespace Elapsed {
  export {
    Elapsed_SinceFn as SinceFn,
    Elapsed_infinity as infinity,
    Elapsed_once as once,
    Elapsed_progress as progress,
    Elapsed_since as since,
    Elapsed_toString as toString,
  };
}

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

type AsyncPromiseOrGenerator<V> = (() => Promise<V> | Promise<undefined>) | (() => V | undefined) | Generator<V> | IterableIterator<V> | AsyncIterableIterator<V> | AsyncGenerator<V> | AsyncIterable<V> | Iterable<V>;

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
 * Runs `fn` a certain number of times, yielding results.
 * If `fn` returns undefined, the result is ignored, but loop continues.
 *
 * ```js
 * // Results will be an array with five random numbers
 * const results = [...repeat(5, () => Math.random())];
 *
 * // Or as an generator (note also the simpler expression form)
 * for (const result of repeat(5, Math.random)) {
 * }
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
 * If you want to have a waiting period between each repetition, consider {@link Flow.interval}.
 * @param countOrPredicate Number of repeats or function returning false when to stop
 * @param fn Function to run, must return a value to accumulate into array or _undefined_
 * @returns Yields results, one at a time
 */
declare function repeat<V>(countOrPredicate: number | RepeatPredicate, fn: () => V | undefined): Generator<V & ({} | null), void, unknown>;
/**
 * Repeatedly calls `fn`, reducing via `reduce`.
 *
 * ```js
 * repeatReduce(10, () => 1, (acc, v) => acc + v);
 * // Yields: 10
 *
 * // Multiplies random values against each other 10 times
 * repeatReduce(10, Math.random, (acc, v) => acc * v);
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
declare const index_Elapsed: typeof Elapsed;
type index_HasCompletion = HasCompletion;
type index_Interval = Interval;
type index_IntervalOpts = IntervalOpts;
type index_ModTimer = ModTimer;
type index_OnStartCalled = OnStartCalled;
type index_RelativeTimerOpts = RelativeTimerOpts;
type index_RepeatPredicate = RepeatPredicate;
type index_RetryOpts<V> = RetryOpts<V>;
type index_RetryResult<V> = RetryResult<V>;
type index_SleepOpts<V> = SleepOpts<V>;
declare const index_StateMachine: typeof StateMachine;
type index_TaskQueue = TaskQueue;
declare const index_TaskQueue: typeof TaskQueue;
type index_Timeout = Timeout;
type index_TimeoutAsyncCallback = TimeoutAsyncCallback;
type index_TimeoutSyncCallback = TimeoutSyncCallback;
type index_Timer = Timer;
type index_TimerOpts = TimerOpts;
type index_TimerSource = TimerSource;
type index_UpdateFailPolicy = UpdateFailPolicy;
declare const index_continuously: typeof continuously;
declare const index_debounce: typeof debounce;
declare const index_delay: typeof delay;
declare const index_delayLoop: typeof delayLoop;
declare const index_everyNth: typeof everyNth;
declare const index_forEach: typeof forEach;
declare const index_forEachAsync: typeof forEachAsync;
declare const index_frequencyTimer: typeof frequencyTimer;
declare const index_frequencyTimerSource: typeof frequencyTimerSource;
declare const index_hasElapsedMs: typeof hasElapsedMs;
declare const index_interval: typeof interval;
declare const index_intervalToMs: typeof intervalToMs;
declare const index_isInterval: typeof isInterval;
declare const index_msElapsedTimer: typeof msElapsedTimer;
declare const index_relativeTimer: typeof relativeTimer;
declare const index_repeat: typeof repeat;
declare const index_repeatReduce: typeof repeatReduce;
declare const index_retry: typeof retry;
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
    index_Elapsed as Elapsed,
    index_HasCompletion as HasCompletion,
    index_Interval as Interval,
    index_IntervalOpts as IntervalOpts,
    index_ModTimer as ModTimer,
    index_OnStartCalled as OnStartCalled,
    index_RelativeTimerOpts as RelativeTimerOpts,
    index_RepeatPredicate as RepeatPredicate,
    index_RetryOpts as RetryOpts,
    index_RetryResult as RetryResult,
    index_SleepOpts as SleepOpts,
    index_StateMachine as StateMachine,
    index_TaskQueue as TaskQueue,
    index_Timeout as Timeout,
    index_TimeoutAsyncCallback as TimeoutAsyncCallback,
    index_TimeoutSyncCallback as TimeoutSyncCallback,
    index_Timer as Timer,
    index_TimerOpts as TimerOpts,
    index_TimerSource as TimerSource,
    index_UpdateFailPolicy as UpdateFailPolicy,
    index_continuously as continuously,
    index_debounce as debounce,
    index_delay as delay,
    index_delayLoop as delayLoop,
    index_everyNth as everyNth,
    index_forEach as forEach,
    index_forEachAsync as forEachAsync,
    index_frequencyTimer as frequencyTimer,
    index_frequencyTimerSource as frequencyTimerSource,
    index_hasElapsedMs as hasElapsedMs,
    index_interval as interval,
    index_intervalToMs as intervalToMs,
    index_isInterval as isInterval,
    index_msElapsedTimer as msElapsedTimer,
    index_relativeTimer as relativeTimer,
    index_repeat as repeat,
    index_repeatReduce as repeatReduce,
    index_retry as retry,
    index_runOnce as runOnce,
    index_sleep as sleep,
    index_throttle as throttle,
    index_ticksElapsedTimer as ticksElapsedTimer,
    index_timeout as timeout,
    index_updateOutdated as updateOutdated,
    index_waitFor as waitFor,
  };
}

export { AsyncPromiseOrGenerator as A, ContinuouslyAsyncCallback as B, Continuously as C, DelayOpts as D, Elapsed as E, ContinuouslyOpts as F, continuously as G, HasCompletion as H, Interval as I, debounce as J, DebouncedFunction as K, throttle as L, ModTimer as M, sleep as N, OnStartCalled as O, waitFor as P, delay as Q, RepeatPredicate as R, SleepOpts as S, Timer as T, UpdateFailPolicy as U, everyNth as V, runOnce as W, RetryResult as X, RetryOpts as Y, retry as Z, interval as a, forEachAsync as b, repeatReduce as c, delayLoop as d, TaskQueue as e, forEach as f, TimerSource as g, TimerOpts as h, index as i, RelativeTimerOpts as j, hasElapsedMs as k, frequencyTimerSource as l, relativeTimer as m, frequencyTimer as n, msElapsedTimer as o, intervalToMs as p, isInterval as q, repeat as r, IntervalOpts as s, ticksElapsedTimer as t, TimeoutSyncCallback as u, TimeoutAsyncCallback as v, Timeout as w, timeout as x, updateOutdated as y, ContinuouslySyncCallback as z };
