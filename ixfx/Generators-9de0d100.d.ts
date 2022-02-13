/**
 * Continually loops up and down between 0 and 1 by a specified interval.
 * Looping returns start value, and is inclusive of 0 and 1.
 *
 * @example Usage
 * ```js
 * for (const v of percentPingPong(0.1)) {
 *  // v will go up and down. Make sure you have a break somewhere because it is infinite
 * }
 * ```
 *
 * @example Alternative:
 * ```js
 * const pp = pingPongPercent(0.1, 0.5); // Setup generator one time
 * const v = pp.next().value; // Call .next().value whenever a new value is needed
 * ```
 *
 * Because limits are capped to -1 to 1, using large intervals can produce uneven distribution. Eg an interval of 0.8 yields 0, 0.8, 1
 *
 * `upper` and `lower` define the percentage range. Eg to ping pong between 40-60%:
 * ```
 * const pp = pingPongPercent(0.1, 0.4, 0.6);
 * ```
 * @param interval Amount to increment by. Defaults to 10%
 * @param start Starting point within range. Defaults to 0 using a positive interval or 1 for negative intervals
 * @param rounding Rounding to apply. Defaults to 1000. This avoids floating-point rounding errors.
 */
declare const pingPongPercent: (interval?: number, lower?: number | undefined, upper?: number | undefined, start?: number | undefined, rounding?: number) => Generator<number, never, unknown>;
/**
 * Ping-pongs continually back and forth `start` and `end` with a given `interval`. Use `pingPongPercent` for 0-1 ping-ponging
 *
 * In a loop:
 * ```
 * for (const c of pingPong(10, 0, 100)) {
 *  // 0, 10, 20 .. 100, 90, 80, 70 ...
 * }
 * ```
 *
 * Manual:
 * ```
 * const pp = pingPong(10, 0, 100);
 * let v = pp.next().value; // Call .next().value whenever a new value is needed
 * ```
 * @param interval Amount to increment by. Use negative numbers to start counting down
 * @param lower Lower bound (inclusive)
 * @param upper Upper bound (inclusive, must be greater than start)
 * @param start Starting point within bounds (defaults to `lower`)
 * @param rounding Rounding is off by default. Use say 1000 if interval is a fractional amount to avoid rounding errors.
 */
declare const pingPong: (interval: number, lower: number, upper: number, start?: number | undefined, rounding?: number) => Generator<number, never, unknown>;

/**
 * Generates a range of numbers, starting from `start` and coutnting by `interval`.
 * If `end` is provided, generator stops when reached.
 *
 * Unlike numericRange, numbers might contain rounding errors
 *
 * ```js
 * for (const c of numericRangeRaw(10, 100)) {
 *  // 100, 110, 120 ...
 * }
 * ```
 * @param interval Interval between numbers
 * @param start Start
 * @param end End (if undefined, range never ends)
 */
declare const numericRangeRaw: (interval: number, start?: number, end?: number | undefined, repeating?: boolean) => Generator<number, void, unknown>;
/**
 * Iterates over `iterator`, calling `fn` for each value.
 * If `fn` returns _false_, iterator cancels
 * @example
 * ```js
 * forEach(count(5), () => console.log(`Hi`)); // Prints `Hi` 5x
 * forEach(count(5), (i) => console.log(i));   // Prints 0 1 2 3 4
 * ```
 * @param iterator
 * @param fn
 */
declare const forEach: <V>(iterator: IterableIterator<V>, fn: (v: V) => boolean) => void;
/**
 * Generates a range of numbers, with a given interval.
 *
 * @example For-loop
 * ```
 * let loopForever = numericRange(0.1); // By default starts at 0 and counts upwards forever
 * for (v of loopForever) {
 *  console.log(v);
 * }
 * ```
 *
 * @example If you want more control over when/where incrementing happens...
 * ```js
 * let percent = numericRange(0.1, 0, 1);
 *
 * let percentResult = percent.next().value;
 * ```
 *
 * Note that computations are internally rounded to avoid floating point math issues. So if the `interval` is very small (eg thousandths), specify a higher rounding
 * number.
 *
 * @param interval Interval between numbers
 * @param start Start
 * @param end End (if undefined, range never ends)
 * @param repeating If true, range loops from start indefinately
 * @param rounding A rounding that matches the interval avoids floating-point math hikinks. Eg if the interval is 0.1, use a rounding of 10
 */
declare const numericRange: (interval: number, start?: number, end?: number | undefined, repeating?: boolean, rounding?: number | undefined) => Generator<number, void, unknown>;
/**
 * Yields `amount` integers, counting by one from zero. If a negative amount is used,
 * count decreases. If `offset` is provided, this is added to the return result.
 * @example
 * ```js
 * const a = [...count(5)]; // Yields five numbers: [0,1,2,3,4]
 * const b = [...count(-5)]; // Yields five numbers: [0,-1,-2,-3,-4]
 * for (const v of count(5, 5)) {
 *  // Yields: 5, 6, 7, 8, 9
 * }
 * const c = [...count(5,1)]; // Yields [1,2,3,4,5]
 * ```
 * @param amount Number of integers to yield
 * @param offset Added to result
 */
declare const count: (amount: number, offset?: number) => Generator<number, void, unknown>;
/**
 * Returns a number range between 0.0-1.0. By default it loops back to 0 after reaching 1
 * @param interval Interval (defaults to 0.01 or 1%)
 * @param repeating Whether generator should loop (default false)
 * @param start Start
 * @param end End
 * @returns
 */
declare const rangePercent: (interval?: number, repeating?: boolean, start?: number, end?: number) => Generator<number, void, unknown>;

declare const Generators_numericRangeRaw: typeof numericRangeRaw;
declare const Generators_forEach: typeof forEach;
declare const Generators_numericRange: typeof numericRange;
declare const Generators_count: typeof count;
declare const Generators_rangePercent: typeof rangePercent;
declare const Generators_pingPong: typeof pingPong;
declare const Generators_pingPongPercent: typeof pingPongPercent;
declare namespace Generators {
  export {
    Generators_numericRangeRaw as numericRangeRaw,
    Generators_forEach as forEach,
    Generators_numericRange as numericRange,
    Generators_count as count,
    Generators_rangePercent as rangePercent,
    Generators_pingPong as pingPong,
    Generators_pingPongPercent as pingPongPercent,
  };
}

export { Generators as G, numericRange as a, pingPongPercent as b, count as c, forEach as f, numericRangeRaw as n, pingPong as p, rangePercent as r };
