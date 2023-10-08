import { I as Interval } from './IntervalType-a4b20f1c.js';
import { H as HasCompletion } from './Types-bc8c421d.js';

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

export { Continuously as C, OnStartCalled as O, ContinuouslyAsyncCallback as a, ContinuouslyOpts as b, ContinuouslySyncCallback as c, continuously as d };
