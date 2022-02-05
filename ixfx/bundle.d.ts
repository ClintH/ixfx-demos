export { i as Geometry } from './index-53b4f79b';
export { i as Visual } from './index-60e7089c';
export { i as Dom } from './index-21ee71b6';
import { R as ResettableTimeout, C as Continuously, T as Timer$1, H as HasCompletion } from './index-1e79d35d';
export { C as Continuously, H as HasCompletion, i as Modulation, R as ResettableTimeout, T as Timer } from './index-1e79d35d';
export { i as Collections } from './index-6b59c63b';
export { G as Generators } from './Generators-c9348862';
export { R as Random } from './Random-88850926';
import { K as KeyValue } from './KeyValue-5c033442';
export { K as KeyValue, a as KeyValues } from './KeyValue-5c033442';
import { T as ToString } from './util-ca5031db';
export { I as IsEqual, T as ToString, c as clamp, a as clampZeroBounds, i as isEqualDefault, b as isEqualValueDefault, l as lerp, m as map, t as toStringDefault } from './util-ca5031db';
import { S as SimpleEventEmitter } from './Events-53171926';
export { StateMachine } from './stateMachine';
import './Rect-1d91d195';
import './Interfaces-1af00b23';
import 'rxjs';
import './Forms-846a05a5';
import './Set-8d7bf2bc';
import './Arrays-2b2d0e65';
import './Map-95c35487';
import 'fp-ts/Ord';

/**
 * Returns a {@link ResettableTimeout} that can be triggered or cancelled.
 *
 * Once `start()` is called, `callback` will be scheduled to execute after `timeoutMs`.
 * If `start()` is called again, the waiting period will be reset to `timeoutMs`.
 *
 * @example Essential functionality
 * ```js
 * const fn = () => {
 *  console.log(`Executed`);
 * };
 * const t = resettableTimeout(fn, 60*1000);
 * t.start();   // After 1 minute `fn` will run, printing to the console
 * ```
 *
 * @example More functionality
 * ```
 * t.cancel();  // Cancel it from running
 * t.start();   // Schedule again after 1 minute
 * t.start(30*1000); // Cancel that, and now scheduled after 30s
 * t.isDone;    // True if a scheduled event is pending
 * ```
 *
 * @param callback
 * @param timeoutMs
 * @returns {@link ResettableTimeout}
 */
declare const resettableTimeout: (callback: () => void, timeoutMs: number) => ResettableTimeout;
/**
 * Returns a {@link Continuously} that continuously executes `callback`. Call `start` to begin.
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
 * @example With res
 * @param callback
 * @param resetCallback
 * @param intervalMs
 * @returns
 */
declare const continuously: (callback: (ticks?: number | undefined) => boolean | void, intervalMs?: number | undefined, resetCallback?: ((ticks?: number | undefined) => boolean | void) | undefined) => Continuously;
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
declare type TimerSource = () => Timer$1;
declare const relativeTimer: (total: number, timer: Timer$1, clampValue?: boolean) => Timer$1 & HasCompletion;
/**
 * A timer that uses clock time
 *
 * @returns {Timer}
 */
declare const msElapsedTimer: () => Timer$1;
/**
 * A timer that progresses with each call
 *
 * @returns {Timer}
 */
declare const ticksElapsedTimer: () => Timer$1;

declare const Timer_resettableTimeout: typeof resettableTimeout;
declare const Timer_continuously: typeof continuously;
declare const Timer_sleep: typeof sleep;
declare const Timer_delay: typeof delay;
type Timer_TimerSource = TimerSource;
declare const Timer_relativeTimer: typeof relativeTimer;
declare const Timer_msElapsedTimer: typeof msElapsedTimer;
declare const Timer_ticksElapsedTimer: typeof ticksElapsedTimer;
declare namespace Timer {
  export {
    Timer_resettableTimeout as resettableTimeout,
    Timer_continuously as continuously,
    Timer_sleep as sleep,
    Timer_delay as delay,
    Timer_TimerSource as TimerSource,
    Timer_relativeTimer as relativeTimer,
    Timer_msElapsedTimer as msElapsedTimer,
    Timer_ticksElapsedTimer as ticksElapsedTimer,
  };
}

declare type FrequencyEventMap = {
    readonly change: void;
};
declare const frequencyMutable: <V>(keyString?: ToString<V> | undefined) => FrequencyMutable<V>;
/**
 * Mutable Frequency
 *
 * @example
 * ```
 * .add(value)  - adds a value
 * .clear()     - clears all data
 * .keys() / .values()  - returns an iterator for keys and values
 * .toArray()   - returns an array of data in the shape [[key,freq],[key,freq]...]
 * ```
 *
 * @example
 * ```
 * const fh = new MutableFrequency();
 * fh.add(`apples`); // Count an occurence of `apples`
 * fh.add(`oranges)`;
 * fh.add(`apples`);
 *
 * const fhData = fh.toArray(); // Expect result [[`apples`, 2], [`oranges`, 1]]
 * fhData.forEach((d) => {
 *  const [key,freq] = d;
 *  console.log(`Key '${key}' occurred ${freq} time(s).`);
 * })
 * ```
 *
 * @export
 * @class MutableFrequency
 * @extends {SimpleEventEmitter<FrequencyEventMap>}
 * @template V
 */
declare class FrequencyMutable<V> extends SimpleEventEmitter<FrequencyEventMap> {
    #private;
    constructor(keyString?: ToString<V> | undefined);
    clear(): void;
    keys(): IterableIterator<string>;
    values(): IterableIterator<number>;
    toArray(): [key: string, count: number][];
    frequencyOf(value: V | string): number | undefined;
    relativeFrequencyOf(value: V | string): number | undefined;
    entries(): Array<KeyValue>;
    minMaxAvg(): {
        readonly min: number;
        readonly total: number;
        readonly max: number;
        readonly avg: number;
    };
    entriesSorted(sortStyle: `value` | `valueReverse` | `key` | `keyReverse`): ReadonlyArray<KeyValue>;
    add(...values: V[]): void;
}

export { FrequencyMutable, Timer as Timers, frequencyMutable };
