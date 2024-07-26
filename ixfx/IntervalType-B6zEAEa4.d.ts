/**
 * Interval types allows for more expressive coding, rather than embedding millisecond values.
 *
 * That is, we can use `{ mins: 5 }` to mean 5 minutes rather than 5*60*1000
 * or worse, 300000, for the same value.
 *
 * Examples:
 * ```js
 * { hours: 1 };  // 1 hour
 * { mins: 5 };   // 5 mins
 * { secs: 5 };   // 5 secs
 * { millis: 5 }; // 5 milliseconds
 * ```
 *
 * Fields are be combined, adding the value.
 * ```js
 * { secs: 2, millis: 1 }; // equal 2001 milliseconds.
 * ```
 *
 * Wherever ixfx takes an Interval, you can also just provide a number instead.
 * This will be taken as a millisecond value.
 *
 * Use {@link intervalToMs} to convert to milliseconds.
 */
type Interval = number | {
    readonly millis?: number;
    readonly secs?: number;
    readonly hours?: number;
    readonly mins?: number;
};
declare function intervalToMs(interval: Interval | undefined): number | undefined;
declare function intervalToMs(interval: Interval | undefined, defaultNumber: number): number;
declare function isInterval(interval: number | Interval | undefined): interval is Interval;
/**
 * Returns a human-readable representation
 * of some elapsed milliseconds
 *
 * ```js
 * elapsedToHumanString(10);      // `10ms`
 * elapsedToHumanString(2000);    // `2s`
 * elapsedToHumanString(65*1000); // `1mins`
 * ```
 * @param millisOrFunction Milliseconds as a number, {@link Interval} or function that resolve to a number
 * @param rounding Rounding (default: 2)
 * @returns
 */
declare const elapsedToHumanString: (millisOrFunction: number | (() => number) | Interval, rounding?: number) => string;

export { type Interval as I, isInterval as a, elapsedToHumanString as e, intervalToMs as i };
