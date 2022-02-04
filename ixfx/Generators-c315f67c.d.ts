/**
 * Returns a series that produces values according to a time interval
 *
 * Eg produce a random number every 500ms
 * ```
 * const randomGenerator = atInterval(() => Math.random(), 1000);
 * for await (const r of randomGenerator) {
 *  // use random value...
 * }
 * ```
 *
 * @template V
 * @param {number} intervalMs
 * @param {() => V} produce
 * @returns {Series<V>}
 */
declare const atInterval: <V>(produce: () => Promise<V>, intervalMs: number) => AsyncGenerator<Awaited<V>, void, unknown>;
/**
 * Generates a range of numbers, with a given interval.
 * Unlike numericRange, numbers might contain rounding errors
 * @param {number} interval Interval between numbers
 * @param {number} [start=0] Start
 * @param {number} [end] End (if undefined, range never ends)
 */
declare const numericRangeRaw: (interval: number, start?: number, end?: number | undefined, repeating?: boolean) => Generator<number, void, unknown>;
/**
 * Generates a range of numbers, with a given interval.
 *
 * For-loop example:
 * ```
 * let loopForever = numericRange(0.1); // By default starts at 0 and counts upwards forever
 * for (v of loopForever) {
 *  console.log(v);
 * }
 * ```
 *
 * If you want more control over when/where incrementing happens...
 * ````
 * let percent = numericRange(0.1, 0, 1);
 * let percentResult = percent.next();
 * while (!percentResult.done) {
 *  let v = percentResult.value;
 *  percentResult = percent.next();
 * }
 * ```
 *
 * Note that computations are internally rounded to avoid floating point math issues. So if the `interval` is very small (eg thousandths), specify a higher rounding
 * number.
 *
 * @param {number} interval Interval between numbers
 * @param {number} [start=0] Start
 * @param {number} [end] End (if undefined, range never ends)
 * @param {number} [rounding] A rounding that matches the interval avoids floating-point math hikinks. Eg if the interval is 0.1, use a rounding of 10
 */
declare const numericRange: (interval: number, start?: number, end?: number | undefined, repeating?: boolean, rounding?: number | undefined) => Generator<number, void, unknown>;
/**
 * Continually loops back and forth between 0 and 1 by a specified interval.
 * Looping returns start value, and is inclusive of 0 and 1.
 *
 * Usage
 * ```
 * for (let v of percentPingPong(0.1)) {
 *  // v will go up and down. Make sure you have a break somewhere because it is infinite
 * }
 * ```
 *
 * Alternative:
 * ```
 * let pp = percentPingPong(0.1, 0.5); // Setup generator one time
 * let v = pp.next().value; // Call .next().value whenever a new value is needed
 * ```
 *
 * Because limits are capped to 0 and 1, using large intervals can produce uneven distribution. Eg an interval of 0.8 yields 0, 0.8, 1
 *
 * @param {number} interval Amount to increment by. Defaults to 10%
 * @param {number} offset Starting point. Defaults to 0 using a positive interval or 1 for negative intervals
 * @param {number} rounding Rounding to apply. Defaults to 1000. This avoids floating-point rounding errors.
 */
declare const pingPongPercent: (interval?: number, offset?: number | undefined, rounding?: number) => Generator<number, never, unknown>;
/**
 * Ping-pongs continually between `start` and `end` with a given `interval`. Use `pingPongPercent` for 0-1 ping-ponging
 *
 * @param {number} interval Amount to increment by. Use negative numbers to start counting down
 * @param {number} lower Lower bound (inclusive)
 * @param {number} upper Upper bound (inclusive, must be greater than start)
 * @param {number} offset Starting point within bounds (defaults to `lower`)
 * @param {number} [rounding=1] Rounding is off by default. Use say 1000 if interval is a fractional amount to avoid rounding errors.
 */
declare const pingPong: (interval: number, lower: number, upper: number, offset?: number | undefined, rounding?: number) => Generator<number, never, unknown>;

declare const Generators_atInterval: typeof atInterval;
declare const Generators_numericRangeRaw: typeof numericRangeRaw;
declare const Generators_numericRange: typeof numericRange;
declare const Generators_pingPongPercent: typeof pingPongPercent;
declare const Generators_pingPong: typeof pingPong;
declare namespace Generators {
  export {
    Generators_atInterval as atInterval,
    Generators_numericRangeRaw as numericRangeRaw,
    Generators_numericRange as numericRange,
    Generators_pingPongPercent as pingPongPercent,
    Generators_pingPong as pingPong,
  };
}

export { Generators as G, atInterval as a, numericRange as b, pingPong as c, numericRangeRaw as n, pingPongPercent as p };
