/**
 * Generates values from `produce` with `intervalMs` time delay
 *
 * @example Produce a random number every 500ms:
 * ```
 * const randomGenerator = atInterval(() => Math.random(), 1000);
 * for await (const r of randomGenerator) {
 *  // Random value every 1 second
 * }
 * ```
 *
 * @template V
 * @param intervalMs Interval between execution
 * @param produce Function to call
 * @template V Data type
 * @returns
 */
declare const interval: <V>(produce: () => Promise<V>, intervalMs: number) => AsyncGenerator<Awaited<V>, void, unknown>;
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
 * Returns a number range between 0.0-1.0. By default it loops back to 0 after reaching 1
 * @param interval Interval (defaults to 0.01 or 1%)
 * @param repeating Whether generator should loop
 * @param start Start
 * @param end End
 * @returns
 */
declare const rangePercent: (interval?: number, repeating?: boolean, start?: number, end?: number) => Generator<number, void, unknown>;

declare const Generators_interval: typeof interval;
declare const Generators_numericRangeRaw: typeof numericRangeRaw;
declare const Generators_numericRange: typeof numericRange;
declare const Generators_rangePercent: typeof rangePercent;
declare namespace Generators {
  export {
    Generators_interval as interval,
    Generators_numericRangeRaw as numericRangeRaw,
    Generators_numericRange as numericRange,
    Generators_rangePercent as rangePercent,
  };
}

export { Generators as G, numericRange as a, interval as i, numericRangeRaw as n, rangePercent as r };
