import { I as Interval } from './IntervalType-CQa4mlKV.js';

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
    get isDone(): boolean;
};
type ModulationTimer = Timer & {
    mod(amt: number): void;
};
type TimerOpts = {
    /**
     * Timer to use. By default {@link msElapsedTimer}.
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
 * const oneSecond = hasElapsed(1000);
 * oneSecond(); // Returns _true_ when timer is done
 * ```
 *
 * See also {@link Elapsed.progress}.
 * @param elapsed
 * @returns
 */
declare function hasElapsed(elapsed: Interval): () => boolean;
declare const frequencyTimerSource: (frequency: number) => TimerSource;
/**
 * Wraps a timer, returning a relative elapsed value based on
 * a given total. ie. percentage complete toward a total duration.
 * This is useful because other parts of code don't need to know
 * about the absolute time values, you get a nice relative completion number.
 *
 * If no timer is specified, milliseconds-based timer is used.
 *
 * ```js
 * const t = relativeTimer(1000);
 * t.elapsed;   // returns % completion (0...1)
 * ```
 *
 * Additional fields/methods on the timer:
 * ```js
 * t.isDone;  // _true_ if .elapsed has reached 1
 * t.reset(); // start from zero again
 * ```
 *
 * With options
 * ```js
 * // Total duration of 1000 ticks
 * const t = relativeTimer(1000, { timer: ticksElapsedTimer(); clampValue:true });
 * ```
 *
 * @private
 * @param total Total
 * @param opts Options
 * @returns Timer
 */
declare const relativeTimer: (total: number, opts?: Partial<RelativeTimerOpts>) => ModulationTimer;
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
 * @param frequency
 * @param timer
 * @returns
 */
declare const frequencyTimer: (frequency: number, opts?: Partial<TimerOpts>) => ModulationTimer;
/**
 * A timer that uses clock time. Start time is from the point of invocation.
 *
 * ```js
 * const t = msElapsedTimer();
 * t.reset(); // reset start
 * t.elapsed; // ms since start
 * ```
 *
 * Like other {@link Timer} functions, it returns a `isDone` property,
 * but this will always return _true_.
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
 * timer.elapsed; // Number of ticks (and also increment ticks)
 * ```
 *
 * Like other {@link Timer} functions, returns with a `isDone` field,
 * but this will always return _true_.
 * @returns {Timer}
 * @see {msElapsedTimer}
 */
declare const ticksElapsedTimer: () => Timer;

export { type ModulationTimer as M, type RelativeTimerOpts as R, type Timer as T, type TimerOpts as a, type TimerSource as b, frequencyTimerSource as c, frequencyTimer as f, hasElapsed as h, msElapsedTimer as m, relativeTimer as r, ticksElapsedTimer as t };
