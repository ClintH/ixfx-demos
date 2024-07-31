import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { H as HasCompletion } from './Types-Bw7JwVUD.js';

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
/**
 * A function that modulates `v`.
 *
 * Example modulators:
 * * {@link wave}: Generate different wave shapes
 * * Raw access to waves: {@link arcShape}, {@link sineShape},{@link sineBipolarShape}, {@link triangleShape}, {@link squareShape}
 * * {@link Easings}: Easing functions
 * * {link springShape}: Spring
 */
type Modulate = (v: number) => number;
type ModulatorTimed = HasCompletion & {
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
type SpringOptions = Partial<{
    /**
     * How much 'weight' the spring has.
     * Favour adjusting 'damping' or 'stiffness' before changing mass.
     * Default: 1
     */
    readonly mass: number;
    /**
     * Absorbs the energy, acting as a kind of friction. Helps
     * to avoid oscillations where the spring doesn't 'end'
     * Default: 10
     */
    readonly damping: number;
    /**
     * How bouncy the spring is
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
     * How many iterations to wait for spring settling. Longer values may be
     * needed if it seems the spring gets prematurely cut off.
     * Default: 10
     */
    readonly countdown: number;
}>;

/**
 * Easing name
 */
type EasingName = keyof typeof Named;
type Options = (TickOptions | TimeOptions) & {
    name?: EasingName;
    fn?: Modulate;
};
type TimeOptions = {
    duration: Interval;
};
type TickOptions = {
    ticks: number;
};
/**
 * Creates an easing function
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
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
 *
 * Thisi function is just a wrapper around Modulator.timedModulator.
 * @param nameOrFunction Name of easing, or an easing function
 * @param duration Duration
 * @returns Easing
 */
declare const timeEasing: (nameOrFunction: EasingName | ((v: number) => number), duration: Interval) => ModulatorTimed;
/**
 * Produce easing values over time. When the easing is complete, the final
 * value continues to return. Timer starts when return function is first invoked.
 *
 * If you need to check if an easing is done or reset it, consider {@link timeEasing}.
 *
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * // Quad-in easing over one second
 * const e = Easings.time(`quadIn`, 1000);
 *
 * // Keep calling e() to get the current value
 * e();
 * ```
 *
 * This function is just a wrapper around Modulate.time
 * @param nameOrFunction Easing name or a function that produces 0..1 scale
 * @param duration Duration
 * @returns
 */
declare const time: (nameOrFunction: EasingName | ((v: number) => number), duration: Interval) => () => number;
/**
 * Produce easing values with each invocation. When the easing is complete, the final
 * value continues to return. Timer starts when return function is first invoked.
 *
 * If you need to check if an easing is done or reset it, consider {@link tickEasing}.
 *
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * // Quad-in easing over 100 ticks
 * const e = Easings.ticks(`quadIn`, 100);
 *
 * // Keep calling e() to get the current value
 * e();
 * ```
 *
 * This is just a wrapper around Modulator.ticks
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
declare const tickEasing: (nameOrFunction: EasingName | ((v: number) => number), durationTicks: number) => ModulatorTimed;
/**
 * Returns an easing function by name. Throws an error if
 * easing is not found.
 *
 * ```js
 * import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
 * const fn = Easings.get(`sineIn`);
 * // Returns 'eased' transformation of 0.5
 * fn(0.5);
 * ```
 * @param easingName eg `sineIn`
 * @returns Easing function
 */
declare const get: (easingName: EasingName) => Modulate;
/**
 * Iterate over available easings.
 * @private
 * @returns Returns list of available easing names
 */
declare function getEasingNames(): Iterable<string>;

type index_EasingName = EasingName;
declare const index_Named: typeof Named;
type index_Options = Options;
type index_TickOptions = TickOptions;
type index_TimeOptions = TimeOptions;
declare const index_create: typeof create;
declare const index_get: typeof get;
declare const index_getEasingNames: typeof getEasingNames;
declare const index_tickEasing: typeof tickEasing;
declare const index_ticks: typeof ticks;
declare const index_time: typeof time;
declare const index_timeEasing: typeof timeEasing;
declare namespace index {
  export { type index_EasingName as EasingName, index_Named as Named, type index_Options as Options, type index_TickOptions as TickOptions, type index_TimeOptions as TimeOptions, index_create as create, index_get as get, index_getEasingNames as getEasingNames, index_tickEasing as tickEasing, index_ticks as ticks, index_time as time, index_timeEasing as timeEasing };
}

export { type EasingName as E, type ModSettableOptions as M, type SpringOptions as S, type ModSettable as a, type ModSource as b, type Modulate as c, type ModulatorTimed as d, type ModSettableFeedback as e, index as i };
