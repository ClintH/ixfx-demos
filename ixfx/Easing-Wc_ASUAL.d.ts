import { H as HasCompletion } from './Types-hTo2TZbv.js';

type EasingFn = (x: number) => number;
/**
 * Creates an easing based on clock time. Time
 * starts being counted when easing function is created.
 * @example Time based easing
 * ```
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * const t = Easings.time(`quintIn`, 5*1000); // Will take 5 seconds to complete
 * ...
 * t.compute(); // Get current value of easing
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param nameOrFunction Name of easing, or an easing function
 * @param durationMs Duration in milliseconds
 * @returns Easing
 */
declare const time: (nameOrFunction: EasingName | EasingFn, durationMs: number) => Easing;
/**
 * Creates an easing based on ticks
 *
 * @example Tick-based easing
 * ```
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * const t = Easings.tick(`sineIn`, 1000);   // Will take 1000 ticks to complete
 * t.compute(); // Each call to `compute` progresses the tick count
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param nameOrFn Name of easing, or an easing function
 * @param durationTicks Duration in ticks
 * @returns Easing
 */
declare const tick: (nameOrFunction: EasingName | EasingFn, durationTicks: number) => Easing;
/**
 * 'Ease' from `0` to `1` over a delicious curve. Commonly used for animation
 * and basic modelling of phyical motion.
 *
 * Create via {@link tick} or {@link time}, call `compute` to calculate the next
 * value in the progression, until you reach `1` or `isDone` returns true.
 *
 */
type Easing = HasCompletion & {
    /**
     * Computes the current value of the easing
     *
     * @returns {number}
     */
    compute(): number;
    /**
     * Reset the easing
     */
    reset(): void;
    /**
     * Returns true if the easing is complete
     *
     * @returns {boolean}
     */
    get isDone(): boolean;
};
/**
 * Creates an easing function using a simple cubic bezier defined by two points.
 *
 * Eg: https://cubic-bezier.com/#0,1.33,1,-1.25
 *  a:0, b: 1.33, c: 1, d: -1.25
 *
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * // Time-based easing using bezier
 * const e = Easings.time(fromCubicBezier(1.33, -1.25), 1000);
 * e.compute();
 * ```
 * @param b
 * @param d
 * @param t
 * @returns Value
 */
declare const fromCubicBezier: (b: number, d: number) => EasingFn;
/**
 * Returns a mix of two easing functions.
 *
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * // Get a 50/50 mix of two easing functions at t=0.25
 * Easings.mix(0.5, 0.25, Easings.functions.sineIn, Easings.functions.sineOut);
 *
 * // 10% of sineIn, 90% of sineOut
 * Easings.mix(0.90, 0.25, Easings.functions.sineIn, Easings.functions.sineOut);
 * ```
 * @param amt 'Progress' value passed to the easing functions
 * @param balance Mix between a and b
 * @param easingA
 * @param easingB
 * @returns Numeric value
 */
declare const mix: (amt: number, balance: number, easingA: EasingFn, easingB: EasingFn) => number;
/**
 * Returns a 'crossfade' of two easing functions, synchronised with the progress through the easing. That is:
 * * 0.0 will yield 100% of easingA at its `easing(0)` value.
 * * 0.2 will yield 80% of a, 20% of b, with both at their `easing(0.2)` values
 * * 0.5 will yield 50% of both functions both at their `easing(0.5)` values
 * * 0.8 will yield 20% of a, 80% of a, with both at their `easing(0.8)` values
 * * 1.0 will yield 100% of easingB at its `easing(1)` value.
 *
 * So easingB will only ever kick in at higher `amt` values and `easingA` will only be present in lower valus.
 *
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * Easings.crossFade(0.5, Easings.functions.sineIn, Easings.functions.sineOut);
 * ```
 * @param amt
 * @param easingA
 * @param easingB
 * @returns Numeric value
 */
declare const crossfade: (amt: number, easingA: EasingFn, easingB: EasingFn) => number;
/**
 * Easing name
 */
type EasingName = keyof typeof functions;
/**
 * Returns an easing function by name, or _undefined_ if not found.
 * This is a manual way of working with easing functions. If you want to
 * ease over time or ticks, use `Flow.Timer.msElapsedTimer` or `Flow.Timer.ticksElapsedTimer`.
 *
 * ```js
 * const fn = Easings.get(`sineIn`);
 * // Returns 'eased' transformation of 0.5
 * fn(0.5);
 * ```
 *
 * This function is useful if trying to resolve an easing by string. If you
 * know in advance what easing to use, you could also access it via
 * `Easings.functions.NAME`, eg `Easings.functions.sineIn`.
 * @param easingName eg `sineIn`
 * @returns Easing function
 */
declare const get: (easingName: EasingName) => EasingFn;
/**
 * Iterate over available easings.
 * @private
 * @returns Returns list of available easing names
 */
declare function getEasings(): Iterable<string>;
/**
 * Returns a roughly gaussian easing function
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * const fn = Easings.gaussian();
 * ```
 *
 * Try different positive and negative values for `stdDev` to pinch
 * or flatten the bell shape.
 * @param standardDeviation
 * @returns
 */
declare const gaussian: (standardDeviation?: number) => EasingFn;
/**
 * Weighted average
 *
 * `slowDownFactor`
 * @param currentValue
 * @param targetValue
 * @param slowDownFactor
 * @returns
 */
declare const weightedAverage: (currentValue: number, targetValue: number, slowDownFactor: number) => number;
declare const functions: {
    smoothstep: (x: number) => number;
    smootherstep: (x: number) => number;
    arch: (x: number) => number;
    bell: EasingFn;
    sineIn: (x: number) => number;
    sineOut: (x: number) => number;
    quadIn: (x: number) => number;
    quadOut: (x: number) => number;
    sineInOut: (x: number) => number;
    quadInOut: (x: number) => number;
    cubicIn: (x: number) => number;
    cubicOut: (x: number) => number;
    quartIn: (x: number) => number;
    quartOut: (x: number) => number;
    quintIn: (x: number) => number;
    quintOut: (x: number) => number;
    expoIn: (x: number) => number;
    expoOut: (x: number) => number;
    quintInOut: (x: number) => number;
    expoInOut: (x: number) => number;
    circIn: (x: number) => number;
    circOut: (x: number) => number;
    backIn: (x: number) => number;
    backOut: (x: number) => number;
    circInOut: (x: number) => number;
    backInOut: (x: number) => number;
    elasticIn: (x: number) => number;
    elasticOut: (x: number) => number;
    bounceIn: (x: number) => number;
    bounceOut: (x: number) => number;
    elasticInOut: (x: number) => number;
    bounceInOut: (x: number) => number;
};

type Easing$1_Easing = Easing;
type Easing$1_EasingFn = EasingFn;
type Easing$1_EasingName = EasingName;
declare const Easing$1_crossfade: typeof crossfade;
declare const Easing$1_fromCubicBezier: typeof fromCubicBezier;
declare const Easing$1_functions: typeof functions;
declare const Easing$1_gaussian: typeof gaussian;
declare const Easing$1_get: typeof get;
declare const Easing$1_getEasings: typeof getEasings;
declare const Easing$1_mix: typeof mix;
declare const Easing$1_tick: typeof tick;
declare const Easing$1_time: typeof time;
declare const Easing$1_weightedAverage: typeof weightedAverage;
declare namespace Easing$1 {
  export { type Easing$1_Easing as Easing, type Easing$1_EasingFn as EasingFn, type Easing$1_EasingName as EasingName, Easing$1_crossfade as crossfade, Easing$1_fromCubicBezier as fromCubicBezier, Easing$1_functions as functions, Easing$1_gaussian as gaussian, Easing$1_get as get, Easing$1_getEasings as getEasings, Easing$1_mix as mix, Easing$1_tick as tick, Easing$1_time as time, Easing$1_weightedAverage as weightedAverage };
}

export { Easing$1 as E, type EasingName as a };
