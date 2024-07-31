import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { H as HasCompletion } from './Types-Bw7JwVUD.js';

/**
 * Creates a timer
 */
type TimerSource = () => Timer;
/**
 * A timer instance.
 * {@link CompletionTimer} also contains an 'isDone' field.
 *
 * Implementations: {@link elapsedMillisecondsAbsolute}, {@link elapsedTicksAbsolute}, {@link frequencyTimer}
 */
type Timer = {
    reset(): void;
    get elapsed(): number;
};
/**
 * A {@link Timer} that has a sense of completion, when `isDone` returns _true_.
 * See {@link relative}
 */
type CompletionTimer = Timer & {
    /**
     * Returns _true_ if this timer has completed.
     */
    get isDone(): boolean;
};
type ModulationTimer = CompletionTimer & {
    mod(amt: number): void;
};
type TimerOpts = {
    /**
     * Timer to use. By default {@link elapsedMillisecondsAbsolute}.
     */
    readonly timer: Timer;
};
/**
 * Options for relative timer
 */
type RelativeTimerOpts = TimerOpts & {
    /**
     * If true, returned value will be clamped to 0..1. False by default
     */
    readonly clampValue: boolean;
    readonly wrapValue: boolean;
};
/**
 * A function that returns _true_ when an interval has elapsed
 *
 * ```js
 * import { hasElapsed } from "https://unpkg.com/ixfx/dist/flow.js"
 * const oneSecond = hasElapsed(1000);
 *
 * // Keep calling to check if time has elapsed.
 * // Will return _true_ when it has
 * oneSecond();
 * ```
 *
 * @param elapsed
 * @returns
 */
declare function hasElapsed(elapsed: Interval): () => boolean;
/**
 * Returns a function that returns the percentage of timer completion.
 * Starts when return function is first invoked.
 *
 * ```js
 * import * as Flow from "https://unpkg.com/ixfx/dist/flow.js"
 * const timer = Flow.ofTotal(1000);
 *
 * // Call timer() to find out the completion
 * timer(); // Returns 0..1
 * ```
 *
 * Note that timer can exceed 1 (100%). To cap it:
 * ```js
 * Flow.ofTotal(1000, { clampValue: true });
 * ```
 *
 * Takes an {@link Interval} for more expressive time:
 * ```js
 * const timer = Flow.ofTotal({ mins: 4 });
 * ```
 *
 * Is a simple wrapper around {@link relative}.
 * @param duration
 * @see {@link ofTotalTicks} - Use ticks instead of time
 * @see {@link hasElapsed} - Simple _true/false_ if interval has elapsed
 * @returns
 */
declare function ofTotal(duration: Interval, opts?: {
    readonly clampValue?: boolean;
    readonly wrapValue?: boolean;
}): () => number;
/**
 * Returns a function that returns the percentage of timer completion.
 * Uses 'ticks' as a measure. Use {@link ofTotal} if you want time-based.
 *
 * ```js
 * import * as Flow from "https://unpkg.com/ixfx/dist/flow.js"
 * const timer = Flow.ofTotalTicks(1000);
 * timer(); // Returns 0..1
 * ```
 *
 * Note that timer can exceed 1 (100%). To cap it:
 * ```js
 * Flow.ofTotalTicks(1000, { clampValue: true });
 * ```
 *
 * This is a a simple wrapper around {@link relative}.
 * @see {@link ofTotal}
 * @see {@link hasElapsed}: Simple _true/false_ if interval has elapsed
 * @param totalTicks
 * @returns
 */
declare function ofTotalTicks(totalTicks: number, opts?: {
    readonly clampValue?: boolean;
    readonly wrapValue?: boolean;
}): () => number;
/**
 * Wraps a timer, returning a relative elapsed value based on
 * a given total. ie. percentage complete toward a total value.
 * This is useful because other parts of code don't need to know
 * about the absolute time values, you get a nice relative completion number.
 *
 * If no timer is specified, a milliseconds-based timer is used.
 *
 * ```js
 * const t = relative(1000);
 * t.elapsed;   // returns % completion (0...1)
 * ```
 * It can also use a tick based timer
 * ```js
 * // Timer that is 'done' at 100 ticks
 * const t = relative(100, { timer: ticksElapsedTimer() });
 * ```
 *
 * Additional fields/methods on the timer instance
 * ```js
 * t.isDone;  // _true_ if .elapsed has reached (or exceeded) 1
 * t.reset(); // start from zero again
 * ```
 *
 * Options:
 * * timer: timer to use. If not specified, `elapsedMillisecondsAbsolute()` is used.
 * * clampValue: if _true_, return value is clamped to 0..1 (default: _false_)
 * * wrapValue: if _true_, return value wraps around continously from 0..1..0 etc. (default: _false_)
 *
 * Note that `clampValue` and `wrapValue` are mutually exclusive: only one can be _true_, but both can be _false_.
 *
 * With options
 * ```js
 * // Total duration of 1000 ticks
 * const t = Timer.relative(1000, { timer: ticksElapsedTimer(); clampValue:true });
 * ```
 *
 * @private
 * @param total Total (of milliseconds or ticks, depending on timer source)
 * @param options Options
 * @returns Timer
 */
declare const relative: (total: number, options?: Partial<RelativeTimerOpts>) => ModulationTimer;
/**
 * A timer based on frequency: cycles per unit of time. These timers return a number from
 * 0..1 indicating position with a cycle.
 *
 * In practice, timers are used to 'drive' something like an Oscillator.
 *
 * By default it uses elapsed clock time as a basis for frequency. ie., cycles per second.
 *
 * It returns a `ModulationTimer`, which allows for a modulation amount to be continually applied
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
 * @param frequency Cycles
 * @param options Options for timer
 * @returns
 */
declare const frequencyTimer: (frequency: number, options?: Partial<TimerOpts>) => ModulationTimer;
/**
 * A timer that uses clock time. Start time is from the point of invocation.
 *
 * ```js
 * const t = elapsedMillisecondsAbsolute();
 * t.reset(); // reset start
 * t.elapsed; // milliseconds since start
 * ```
 * @returns {Timer}
 * @see {ticksElapsedTimer}
 */
declare const elapsedMillisecondsAbsolute: () => Timer;
/**
 * A timer that progresses with each call to `elapsed`.
 *
 * The first call to elapsed will return 1.
 *
 * ```js
 * const timer = elapsedTicksAbsolute();
 * timer.reset(); // Reset to 0
 * timer.elapsed; // Number of ticks (and also increment ticks)
 * timer.peek;    // Number of ticks (without incrementing)
 * ```
 *
 * Like other {@link Timer} functions, returns with a `isDone` field,
 * but this will always return _true_.
 * @returns {Timer}
 * @see {elapsedMillisecondsAbsolute}
 */
declare const elapsedTicksAbsolute: () => Timer & {
    peek: number;
};
/**
 * Wraps `timer`, computing a value for based on its elapsed value.
 * `fn` creates this value.
 * ```js
 * const t = timerWithFunction(v=>v/2, relativeTimer(1000));
 * t.compute();
 * ```
 *
 * In the above case, `relativeTimer(1000)` creates a timer that goes
 * from 0..1 over one second. `fn` will divide that value by 2, so
 * `t.compute()` will yield values 0..0.5.
 *
 * @param fn
 * @param timer
 * @returns
 */
declare const timerWithFunction: (fn: ((v: number) => number), timer: CompletionTimer) => HasCompletion & CompletionTimer & {
    compute: () => number;
};

export { type CompletionTimer as C, type ModulationTimer as M, type RelativeTimerOpts as R, type Timer as T, type TimerOpts as a, type TimerSource as b, elapsedTicksAbsolute as c, ofTotalTicks as d, elapsedMillisecondsAbsolute as e, frequencyTimer as f, hasElapsed as h, ofTotal as o, relative as r, timerWithFunction as t };
