import { H as HasCompletion } from './Types-Bw7JwVUD.js';
import { I as Interval } from './IntervalType-B6zEAEa4.js';

declare const bounceOut: (x: number) => number;
declare const quintIn: (x: number) => number;
declare const quintOut: (x: number) => number;
declare const arch: (x: number) => number;
declare const smoothstep: (x: number) => number;
declare const smootherstep: (x: number) => number;
declare const sineIn: (x: number) => number;
declare const sineOut: (x: number) => number;
declare const quadIn: (x: number) => number;
declare const quadOut: (x: number) => number;
declare const sineInOut: (x: number) => number;
declare const quadInOut: (x: number) => number;
declare const cubicIn: (x: number) => number;
declare const cubicOut: (x: number) => number;
declare const quartIn: (x: number) => number;
declare const quartOut: (x: number) => number;
declare const expoIn: (x: number) => number;
declare const expoOut: (x: number) => number;
declare const quintInOut: (x: number) => number;
declare const expoInOut: (x: number) => number;
declare const circIn: (x: number) => number;
declare const circOut: (x: number) => number;
declare const backIn: (x: number) => number;
declare const backOut: (x: number) => number;
declare const circInOut: (x: number) => number;
declare const backInOut: (x: number) => number;
declare const elasticIn: (x: number) => number;
declare const elasticOut: (x: number) => number;
declare const bounceIn: (x: number) => number;
declare const bell: (t: number) => number;
declare const elasticInOut: (x: number) => number;
declare const bounceInOut: (x: number) => number;

declare const Named_arch: typeof arch;
declare const Named_backIn: typeof backIn;
declare const Named_backInOut: typeof backInOut;
declare const Named_backOut: typeof backOut;
declare const Named_bell: typeof bell;
declare const Named_bounceIn: typeof bounceIn;
declare const Named_bounceInOut: typeof bounceInOut;
declare const Named_bounceOut: typeof bounceOut;
declare const Named_circIn: typeof circIn;
declare const Named_circInOut: typeof circInOut;
declare const Named_circOut: typeof circOut;
declare const Named_cubicIn: typeof cubicIn;
declare const Named_cubicOut: typeof cubicOut;
declare const Named_elasticIn: typeof elasticIn;
declare const Named_elasticInOut: typeof elasticInOut;
declare const Named_elasticOut: typeof elasticOut;
declare const Named_expoIn: typeof expoIn;
declare const Named_expoInOut: typeof expoInOut;
declare const Named_expoOut: typeof expoOut;
declare const Named_quadIn: typeof quadIn;
declare const Named_quadInOut: typeof quadInOut;
declare const Named_quadOut: typeof quadOut;
declare const Named_quartIn: typeof quartIn;
declare const Named_quartOut: typeof quartOut;
declare const Named_quintIn: typeof quintIn;
declare const Named_quintInOut: typeof quintInOut;
declare const Named_quintOut: typeof quintOut;
declare const Named_sineIn: typeof sineIn;
declare const Named_sineInOut: typeof sineInOut;
declare const Named_sineOut: typeof sineOut;
declare const Named_smootherstep: typeof smootherstep;
declare const Named_smoothstep: typeof smoothstep;
declare namespace Named {
  export { Named_arch as arch, Named_backIn as backIn, Named_backInOut as backInOut, Named_backOut as backOut, Named_bell as bell, Named_bounceIn as bounceIn, Named_bounceInOut as bounceInOut, Named_bounceOut as bounceOut, Named_circIn as circIn, Named_circInOut as circInOut, Named_circOut as circOut, Named_cubicIn as cubicIn, Named_cubicOut as cubicOut, Named_elasticIn as elasticIn, Named_elasticInOut as elasticInOut, Named_elasticOut as elasticOut, Named_expoIn as expoIn, Named_expoInOut as expoInOut, Named_expoOut as expoOut, Named_quadIn as quadIn, Named_quadInOut as quadInOut, Named_quadOut as quadOut, Named_quartIn as quartIn, Named_quartOut as quartOut, Named_quintIn as quintIn, Named_quintInOut as quintInOut, Named_quintOut as quintOut, Named_sineIn as sineIn, Named_sineInOut as sineInOut, Named_sineOut as sineOut, Named_smootherstep as smootherstep, Named_smoothstep as smoothstep };
}

type EaseValue = (v: number) => number;

type ModSettableOptions = {
    /**
     * Starting absolute value of source.
     */
    startAt: number;
    /**
     * Starting relative value of source (eg 0.5 for 50%)
     */
    startAtRelative: number;
    /**
     * If set, determines how many cycles. By default unlimited.
     * Use 1 for example for a one-shot wave.
     */
    cycleLimit: number;
};
type ModSettableFeedback = {
    /**
     * If set, resets absolute position of clock
     */
    resetAt: number;
    /**
     * If set, resets relative position of clock
     */
    resetAtRelative: number;
};
type ModSettable = (feedback?: Partial<ModSettableFeedback>) => number;
/**
 * A mod source returns numbers on a 0..1 scale.
 * Usually invoked just a function, some sources also support
 * 'feedback' allowing source to be adjusted dynamically.
 *
 * See Modulation.Sources for more.
 */
type ModSource = (feedback?: any) => number;
type SpringOptions = Partial<{
    /**
     * Default: 1
     */
    readonly mass: number;
    /**
     * Default: 10
     */
    readonly damping: number;
    /**
     * Default: 100
     */
    readonly stiffness: number;
    /**
     * Default: false
     */
    readonly soft: boolean;
    /**
     * Default: 0.1
     */
    readonly velocity: number;
    /**
     * How many iterations to wait for spring settling (default: 10)
     */
    readonly countdown: number;
}>;

/**
 * Returns a mix of two easing functions.
 *
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * // Get a 50/50 mix of two easing functions
 * const mix = Easings.mix(0.5, Easings.Named.sineIn, Easings.Named.sineOut);
 *
 * // 10% of sineIn, 90% of sineOut
 * Easings.mix(0.90, 0.25, Easings.Named.sineIn, Easings.Named.sineOut);
 * ```
 * @param balance Mix between a and b
 * @param easingA
 * @param easingB
 * @returns Numeric value
 */
declare const mix: (balance: number, easingA: EaseValue, easingB: EaseValue) => EaseValue;
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
 * Easings.crossFade(0.5, Easings.Named.sineIn, Easings.Named.sineOut);
 * ```
 * @param amt
 * @param easingA
 * @param easingB
 * @returns Numeric value
 */
declare const crossfade: (easingA: EaseValue, easingB: EaseValue) => EaseValue;
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
declare const gaussian: (standardDeviation?: number) => (t: number) => number;
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
 * @returns Value
 */
declare const fromCubicBezier: (b: number, d: number) => (t: number) => number;
declare const spring: (opts?: SpringOptions) => EaseValue;

/**
 * Easing name
 */
type EasingName = keyof typeof Named;
/**
 * A 'no-op' function. Returns the input value without modification.
 * Useful for when some default is needed
 * @param v
 * @returns
 */
declare const noop: EaseValue;
type Options = (EasingTickOptions | EasingTimeOptions) & {
    name?: EasingName;
    fn?: EaseValue;
};
type EasingTimeOptions = {
    duration: Interval;
};
type EasingTickOptions = {
    ticks: number;
};
/**
 * Creates an easing function
 * ```js
 * const e = Easings.create({ duration: 1000, name: `quadIn` });
 * const e = Easings.create({ ticks: 100, name: `sineOut` });
 * const e = Easings.create({
 *  duration: 1000,
 *  fn: (v) => {
 *    // v will be 0..1 based on time
 *    return Math.random() * v
 *  }
 * });
 * ```
 * @param options
 * @returns
 */
declare const create: (options: Options) => () => number;
/**
 * Creates an easing based on clock time. Time
 * starts being counted when easing function is created.
 *
 * `timeEasing` allows you to reset and check for completion.
 * Alternatively, use {@link time} which is a simple function that just returns a value.
 *
 *
 * @example Time based easing
 * ```
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * const t = Easings.timeEasing(`quintIn`, 5*1000); // Will take 5 seconds to complete
 * ...
 * t.compute(); // Get current value of easing
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param nameOrFunction Name of easing, or an easing function
 * @param duration Duration
 * @returns Easing
 */
declare const timeEasing: (nameOrFunction: EasingName | ((v: number) => number), duration: Interval) => Easer;
/**
 * Produce easing values over time. When the easing is complete, the final
 * value continues to return. Timer starts when return function is first invoked.
 *
 * If you need to check if an easing is done or reset it, consider {@link timeEasing}.
 *
 * ```js
 * // Quad-in easing over one second
 * const e = Easings.time(`quadIn`, 1000);
 *
 * // Keep calling e() to get the current value
 * e();
 * ```
 * @param nameOrFunction Easing name or a function that produces 0..1 scale
 * @param duration Duration
 * @returns
 */
declare const time: (nameOrFunction: EasingName | ((v: number) => number), duration: Interval) => () => number;
/**
 * Produce easing values with each invocation. When the easing is complete, the final
 * value continues to return. Timer starts when return function is first invoked.
 *
 * If you need to check if an easing is done or reset it, consider {@link ticksEasing}.
 *
 * ```js
 * // Quad-in easing over 100 ticks
 * const e = Easings.ticks(`quadIn`, 100);
 *
 * // Keep calling e() to get the current value
 * e();
 * ```
 * @param nameOrFunction Easing name or a function that produces 0..1 scale
 * @param totalTicks Total length of ticks
 * @returns
 */
declare const ticks: (nameOrFunction: EasingName | ((v: number) => number), totalTicks: number) => () => number;
/**
 * Creates an easing based on ticks.
 *
 * `tickEasing` allows you to reset and check for completion.
 * Alternatively, use {@link ticks} which is a simple function that just returns a value.
 *
 * @example Tick-based easing
 * ```
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * const t = Easings.tickEasing(`sineIn`, 1000);   // Will take 1000 ticks to complete
 * t.compute(); // Each call to `compute` progresses the tick count
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param nameOrFunction Name of easing, or an easing function
 * @param durationTicks Duration in ticks
 * @returns Easing
 */
declare const tickEasing: (nameOrFunction: EasingName | ((v: number) => number), durationTicks: number) => Easer;
/**
 * 'Ease' from `0` to `1` over a delicious curve. Commonly used for animation
 * and basic modelling of physical motion.
 *
 * Create via {@link tick} or {@link time}, call `compute` to calculate the next
 * value in the progression, until you reach `1` or `isDone` returns true.
 *
 */
type Easer = HasCompletion & {
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
 * Returns an easing function by name. Throws an error if
 * easing is not found.
 *
 * ```js
 * const fn = Easings.get(`sineIn`);
 * // Returns 'eased' transformation of 0.5
 * fn(0.5);
 * ```
 * @param easingName eg `sineIn`
 * @returns Easing function
 */
declare const get: (easingName: EasingName) => EaseValue;
/**
 * Iterate over available easings.
 * @private
 * @returns Returns list of available easing names
 */
declare function getEasingNames(): Iterable<string>;

type index_EaseValue = EaseValue;
type index_Easer = Easer;
type index_EasingName = EasingName;
type index_EasingTickOptions = EasingTickOptions;
type index_EasingTimeOptions = EasingTimeOptions;
declare const index_Named: typeof Named;
type index_Options = Options;
declare const index_create: typeof create;
declare const index_crossfade: typeof crossfade;
declare const index_fromCubicBezier: typeof fromCubicBezier;
declare const index_gaussian: typeof gaussian;
declare const index_get: typeof get;
declare const index_getEasingNames: typeof getEasingNames;
declare const index_mix: typeof mix;
declare const index_noop: typeof noop;
declare const index_spring: typeof spring;
declare const index_tickEasing: typeof tickEasing;
declare const index_ticks: typeof ticks;
declare const index_time: typeof time;
declare const index_timeEasing: typeof timeEasing;
declare namespace index {
  export { type index_EaseValue as EaseValue, type index_Easer as Easer, type index_EasingName as EasingName, type index_EasingTickOptions as EasingTickOptions, type index_EasingTimeOptions as EasingTimeOptions, index_Named as Named, type index_Options as Options, index_create as create, index_crossfade as crossfade, index_fromCubicBezier as fromCubicBezier, index_gaussian as gaussian, index_get as get, index_getEasingNames as getEasingNames, index_mix as mix, index_noop as noop, index_spring as spring, index_tickEasing as tickEasing, index_ticks as ticks, index_time as time, index_timeEasing as timeEasing };
}

export { type EasingName as E, type ModSettableOptions as M, type SpringOptions as S, type ModSettableFeedback as a, type ModSettable as b, type ModSource as c, index as i };
