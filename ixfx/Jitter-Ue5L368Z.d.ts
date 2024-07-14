import { R as RandomSource } from './Types-Tj0rQbez.js';

/**
 * Continually loops up and down between 0 and 1 by a specified interval.
 * Looping returns start value, and is inclusive of 0 and 1.
 *
 * @example Usage
 * ```js
 * import {percentPingPong} from 'https://unpkg.com/ixfx/dist/modulation.js';
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
 * @param rounding Rounding to apply. This avoids floating-point rounding errors.
 */
declare const pingPongPercent: (interval?: number, lower?: number, upper?: number, start?: number, rounding?: number) => Generator<number, never, unknown>;
/**
 * Ping-pongs continually back and forth a `lower` and `upper` value (both inclusive) by a given `interval`. Use `pingPongPercent` for 0-1 ping-ponging
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
declare const pingPong: (interval: number, lower: number, upper: number, start?: number, rounding?: number) => Generator<number, never, unknown>;

type JitterOpts = {
    readonly relative?: number;
    readonly absolute?: number;
    readonly clamped?: boolean;
    readonly source?: RandomSource;
};
type Jitterer = (value: number) => number;
/**
 * Returns a {@link Jitterer} that works with absolute values,
 * ie. values outside of 0..1 range.
 *
 * Jitter amount is _absolute_, meaning a fixed value regardless of input value,
 * or _relative_, meaning it is scaled according to input value.
 *
 * ```js
 * // Jitter by -10 to +10 (absolute value: 10)
 * const j1 = jitterAbsolute({ absolute: 10 });
 * j1(100); // Produces range of 90...110
 *
 * // Jitter by -20 to +20 (relative value 20%)
 * const j2 = jitterAbsolute({ relative: 0.20 });
 * j2(100); // Produces a range of -80...120
 * ```
 *
 * The expected used case is calling `jitterAbsolute` to set up a jitterer
 * and then reusing it with different input values, as above with the `j1` and `j2`.
 *
 * However to use it 'one-off', just call the returned function immediately:
 * ```js
 * const v = jitterAbsolute({ absolute: 10 })(100); // v is in range of 90-110
 * ```
 *
 * When `clamped` is true, return value is clamped to 0...value.
 * That is, rather than the usual bipolar jittering, the jittering only goes below.
 * ```js
 * const j = jitterAbsolute({ absolute: 10, clamped: true })
 * j(100); // Produces range of 90-100
 * ```
 * @param options
 * @returns
 */
declare const jitterAbsolute: (options: JitterOpts) => Jitterer;
/**
 * Jitters `value` by the absolute `jitter` amount. Returns a function.
 *
 * All values should be on a 0..1 scale, and the return value is by default clamped to 0..1.
 * Pass `clamped:false` as an option to allow for arbitary ranges.
 *
 * `jitter` returns a function that calculates jitter. If you only need a one-off
 * jitter, you can immediately execute the returned function:
 * ```js
 * import { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';
 * // Compute 10% jitter of input 0.5
 * const value = jitter({ relative: 0.1 })(0.5);
 * ```
 *
 * However, if the returned jitter function is to be used again,
 * assign it to a variable:
 * ```js
 * import { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';
 * const myJitter = jitter({ absolute: 0.5 });
 *
 * // Jitter an input value 1.0
 * const value = myJitter(1);
 * ```
 *
 * A custom source for random numbers can be provided. Eg, use a weighted
 * random number generator:
 *
 * ```js
 * import { weighted } from 'https://unpkg.com/ixfx/dist/random.js';
 * jitter({ relative: 0.1, source: weighted });
 * ```
 *
 * Options
 * * clamped: If false, `value`s out of percentage range can be used and return value may be beyond percentage range. True by default
 * * random: Random source (default is Math.random)
 * @param options Options
 * @returns Function that performs jitter
 */
declare const jitter: (options?: JitterOpts) => Jitterer;

export { type JitterOpts as J, type Jitterer as a, jitterAbsolute as b, pingPongPercent as c, jitter as j, pingPong as p };
