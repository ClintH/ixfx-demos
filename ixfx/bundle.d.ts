export { i as Geometry } from './index-922d6bbd';
export { i as Visual } from './index-8ecd05aa';
export { i as Dom } from './index-e6ebe5bb';
export { i as Modulation } from './index-cabdee52';
export { i as Collections } from './index-6d817f7c';
export { G as Generators } from './Generators-c315f67c';
export { R as Random } from './Random-88850926';
import { K as KeyValue } from './KeyValue-5c033442';
export { K as KeyValue, a as KeyValues } from './KeyValue-5c033442';
import { T as ToString } from './util-115aef22';
export { I as IsEqual, T as ToString, c as clamp, a as clampZeroBounds, i as isEqualDefault, b as isEqualValueDefault, l as lerp, t as toStringDefault } from './util-115aef22';
import { S as SimpleEventEmitter } from './Events-faeaa6ab';
export { StateMachine } from './stateMachine';
import './Circle-1c0c31de';
import './Rect-04af8f31';
import './Set-712e3233';
import 'rxjs';
import './MutableMapMulti-7834c37d';
import './Forms-f331a200';
import 'fp-ts/Ord';

declare type Timer = {
    reset(): void;
    elapsed(): number;
};
/**
 * A resettable timeout, returned by {@link resettableTimeout}
 */
interface ResettableTimeout {
    start(altTimeoutMs?: number): void;
    cancel(): void;
    get isDone(): boolean;
}
/**
 * Runs a function continuously, returned by {@link Continuously}
 */
interface Continuously {
    start(): void;
    get ticks(): number;
    get isDone(): boolean;
    cancel(): void;
}

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
declare type TimerSource = () => Timer;
/**
 * A timer that uses clock time
 *
 * @returns {Timer}
 */
declare const msRelativeTimer: () => Timer;
/**
 * A timer that progresses with each call
 *
 * @returns {Timer}
 */
declare const tickRelativeTimer: () => Timer;

declare type MutableFrequencyEventMap = {
    readonly change: void;
};
declare const mutableFrequency: <V>(keyString?: ToString<V> | undefined) => MutableFrequency<V>;
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
 * @extends {SimpleEventEmitter<MutableFrequencyEventMap>}
 * @template V
 */
declare class MutableFrequency<V> extends SimpleEventEmitter<MutableFrequencyEventMap> {
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

export { Continuously, MutableFrequency, ResettableTimeout, Timer, TimerSource, continuously, delay, msRelativeTimer, mutableFrequency, resettableTimeout, sleep, tickRelativeTimer };
