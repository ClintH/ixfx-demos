import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { H as HasCompletion } from './Types-Bw7JwVUD.js';

/**
 * Runs a function continuously, returned by {@link continuously}
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
     * How many milliseconds since loop was started after being stopped.
     */
    get elapsedMs(): number;
    /**
     * If disposed, the continuously instance won't be re-startable
     */
    get isDisposed(): boolean;
    /**
     * Stops loop. It can be restarted using .start()
     */
    cancel(): void;
    /**
     * Sets the interval speed of loop. Change will take effect on next loop. For it to kick
     * in earlier, call .reset() after changing the value.
     */
    set interval(interval: Interval);
    /**
     * Gets the current interval, ie. speed of loop.
     */
    get interval(): Interval;
};
type ContinuouslySyncCallback = (
/**
 * Number of times loop
 * Ticks is reset when loop exits.
 */
ticks?: number, 
/**
 * Elapsed milliseconds.
 * Reset when loop exits
 */
elapsedMs?: number) => boolean | void;
type ContinuouslyAsyncCallback = (
/**
 * Number of times loop has run
 * Reset when loop exits.
 */
ticks?: number, 
/**
 * Elapsed milliseconds.
 * Reset when loop exits.
 */
elapsedMs?: number) => Promise<boolean | void>;
type OnStartCalled = `continue` | `cancel` | `reset` | `dispose`;
/**
 * Options for {@link continuously}
 */
type ContinuouslyOpts = Readonly<{
    /**
     * Abort signal to exit loop
     */
    signal: AbortSignal;
    /**
     * If _true_, callback runs before waiting period.
     * @defaultValue false
     */
    fireBeforeWait: boolean;
    /**
     * Called whenever .start() is invoked.
     * If this function returns:
     *  - `continue`: the loop starts if it hasn't started yet, or continues if already started
     *  - `cancel`: loop stops, but can be re-started if .start() is called again
     *  - `dispose`: loop stops and will throw an error if .start() is attempted to be called
     *  - `reset`: loop resets (ie. existing scheduled task is cancelled)
     *
     */
    onStartCalled: (
    /**
     * Number of times loop has run
     * Reset when loop is exits.
     */
    ticks?: number, 
    /**
     * Elapsed milliseconds.
     * Reset when loop is exits.
     */
    elapsedMs?: number) => OnStartCalled;
}>;
/**
 * Returns a {@link Continuously} that continually executes `callback` at `interval` rate.
 *
 * By default, first the sleep period happens and then the callback happens.
 *
 * Call `start` to begin/reset loop. The looping stops when `cancel` is called, or when `callback` returns _false_.
 *
 * @example
 * Animation loop
 * ```js
 * const draw = () => {
 *  // Draw on canvas
 * }
 *
 * // Run draw() synchronised with monitor refresh rate via `window.requestAnimationFrame`
 * continuously(draw).start();
 * ```
 *
 * @example
 * With delay
 * ```js
 * const fn = () => {
 *  // Runs after one minute
 * }
 * const c = continuously(fn, { mins: 1 } );
 * c.start(); // Runs `fn` every minute
 * ```
 *
 * @example
 * Control a 'continuously'
 * ```js
 * c.cancel();   // Stop the loop, cancelling any up-coming calls to `fn`
 * c.elapsedMs;  // How many milliseconds have elapsed since start
 * c.ticks;      // How many iterations of loop since start
 * c.interval;   // Get/set speed of loop. Change kicks-in at next loop.
 *               // Use .start() to reset to new interval immediately
 * ```
 *
 * Asynchronous callback functions are supported too:
 * ```js
 * continuously(async () => { ..});
 * ```
 *
 * The `callback` function can receive a few arguments:
 *
 * ```js
 * continuously( (ticks, elapsedMs) => {
 *  // ticks: how many times loop has run
 *  // elapsedMs:  how long since last loop
 * }).start();
 * ```
 *
 * If the callback explicitly returns _false_, the loop will be cancelled.
 *
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
 *
 * ```js
 * continuously(callback, intervalMs, {
 *  onStartCalled:(ticks, elapsedMs) => {
 *    // Cancel the loop after 1000ms has elapsed
 *    if (elapsedMs > 1000) return `cancel`;
 *  }
 * }).start();
 * ```
 *
 * To run `callback` *before* the sleep happens, set `fireBeforeWait`:
 * ```js
 * continuously(callback, intervalMs, { fireBeforeWait: true });
 * ```
 * @param callback - Function to run. If it returns _false_, loop exits.
 * @param options - {@link ContinuouslyOpts ContinuouslyOpts}
 * @param interval - Speed of loop (default: 0)
 * @returns Instance to control looping.
 * @see {@link Timeout} if you want to trigger something once.
 */
declare const continuously: (callback: ContinuouslyAsyncCallback | ContinuouslySyncCallback, interval?: Interval, options?: Partial<ContinuouslyOpts>) => Continuously;

export { type Continuously as C, type OnStartCalled as O, type ContinuouslyAsyncCallback as a, type ContinuouslyOpts as b, type ContinuouslySyncCallback as c, continuously as d };
