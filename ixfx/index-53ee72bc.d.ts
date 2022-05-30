import { b as StateMachine } from './StateMachine-c12ce7c8';
import { T as TimerSource, a as Timer, M as ModTimer, H as HasCompletion, b as Timeout, d as debounce, D as DebouncedFunction, t as throttle, I as IntervalAsync, i as interval, c as TimeoutSyncCallback, e as TimeoutAsyncCallback, f as timeout, C as Continuously, g as ContinuouslySyncCallback, h as ContinuouslyAsyncCallback, j as continuously, s as sleep, k as delay, l as CancelToken, r as retry, m as relativeTimer, n as frequencyTimerSource, o as frequencyTimer, p as msElapsedTimer, q as ticksElapsedTimer, U as UpdateFailPolicy, u as updateOutdated, w as waitFor, v as delayLoop } from './Timer-7b853923';

/**
 * Iterates over `iterator` (iterable/array), calling `fn` for each value.
 * If `fn` returns _false_, iterator cancels.
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
 * @param fn Function to call for each item. If function returns false, iteration cancels
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
 * @param iterator
 * @param fn
 */
declare const forEachAsync: <V>(iterator: AsyncIterableIterator<V> | readonly V[], fn: (v?: V | undefined) => Promise<boolean> | Promise<void>, intervalMs?: number | undefined) => Promise<void>;
declare type RepeatPredicate = (repeats: number, valuesProduced: number) => boolean;
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
 * If you don't need to accumulate return values, consider {@link Generators.count} with {@link Generators.forEach}.
 *
 * @param countOrPredicate Number of repeats or function returning false when to stop
 * @param fn Function to run, must return a value to accumulate into array or _undefined_
 * @returns Array of accumulated results
 */
declare const repeat: <V>(countOrPredicate: number | RepeatPredicate, fn: () => V | undefined) => readonly V[];

declare const index_forEach: typeof forEach;
declare const index_forEachAsync: typeof forEachAsync;
type index_RepeatPredicate = RepeatPredicate;
declare const index_repeat: typeof repeat;
declare const index_StateMachine: typeof StateMachine;
declare const index_TimerSource: typeof TimerSource;
declare const index_Timer: typeof Timer;
declare const index_ModTimer: typeof ModTimer;
declare const index_HasCompletion: typeof HasCompletion;
declare const index_Timeout: typeof Timeout;
declare const index_debounce: typeof debounce;
declare const index_DebouncedFunction: typeof DebouncedFunction;
declare const index_throttle: typeof throttle;
declare const index_IntervalAsync: typeof IntervalAsync;
declare const index_interval: typeof interval;
declare const index_TimeoutSyncCallback: typeof TimeoutSyncCallback;
declare const index_TimeoutAsyncCallback: typeof TimeoutAsyncCallback;
declare const index_timeout: typeof timeout;
declare const index_Continuously: typeof Continuously;
declare const index_ContinuouslySyncCallback: typeof ContinuouslySyncCallback;
declare const index_ContinuouslyAsyncCallback: typeof ContinuouslyAsyncCallback;
declare const index_continuously: typeof continuously;
declare const index_sleep: typeof sleep;
declare const index_delay: typeof delay;
declare const index_CancelToken: typeof CancelToken;
declare const index_retry: typeof retry;
declare const index_relativeTimer: typeof relativeTimer;
declare const index_frequencyTimerSource: typeof frequencyTimerSource;
declare const index_frequencyTimer: typeof frequencyTimer;
declare const index_msElapsedTimer: typeof msElapsedTimer;
declare const index_ticksElapsedTimer: typeof ticksElapsedTimer;
declare const index_UpdateFailPolicy: typeof UpdateFailPolicy;
declare const index_updateOutdated: typeof updateOutdated;
declare const index_waitFor: typeof waitFor;
declare const index_delayLoop: typeof delayLoop;
declare namespace index {
  export {
    index_forEach as forEach,
    index_forEachAsync as forEachAsync,
    index_RepeatPredicate as RepeatPredicate,
    index_repeat as repeat,
    index_StateMachine as StateMachine,
    index_TimerSource as TimerSource,
    index_Timer as Timer,
    index_ModTimer as ModTimer,
    index_HasCompletion as HasCompletion,
    index_Timeout as Timeout,
    index_debounce as debounce,
    index_DebouncedFunction as DebouncedFunction,
    index_throttle as throttle,
    index_IntervalAsync as IntervalAsync,
    index_interval as interval,
    index_TimeoutSyncCallback as TimeoutSyncCallback,
    index_TimeoutAsyncCallback as TimeoutAsyncCallback,
    index_timeout as timeout,
    index_Continuously as Continuously,
    index_ContinuouslySyncCallback as ContinuouslySyncCallback,
    index_ContinuouslyAsyncCallback as ContinuouslyAsyncCallback,
    index_continuously as continuously,
    index_sleep as sleep,
    index_delay as delay,
    index_CancelToken as CancelToken,
    index_retry as retry,
    index_relativeTimer as relativeTimer,
    index_frequencyTimerSource as frequencyTimerSource,
    index_frequencyTimer as frequencyTimer,
    index_msElapsedTimer as msElapsedTimer,
    index_ticksElapsedTimer as ticksElapsedTimer,
    index_UpdateFailPolicy as UpdateFailPolicy,
    index_updateOutdated as updateOutdated,
    index_waitFor as waitFor,
    index_delayLoop as delayLoop,
  };
}

export { RepeatPredicate as R, forEachAsync as a, forEach as f, index as i, repeat as r };
