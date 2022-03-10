import { H as HasCompletion, a as Timer } from './Timer-54f1604d';
import { S as SimpleEventEmitter } from './Events-53171926';

declare type EasingFn = (x: number) => number;
/**
 * Creates an easing based on clock time
 * @inheritdoc Easing
 * @example Time based easing
 * ```
 * const t = time(`quintIn`, 5*1000); // Will take 5 seconds to complete
 * ...
 * t.compute(); // Get current value of easing
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param name Name of easing
 * @param durationMs Duration in milliseconds
 * @returns Easing
 */
declare const time: (name: EasingName, durationMs: number) => Easing;
/**
 * Creates an easing based on ticks
 *
 * @inheritdoc Easing
 * @example Tick-based easing
 * ```
 * const t = tick(`sineIn`, 1000);   // Will take 1000 ticks to complete
 * t.compute(); // Each call to `compute` progresses the tick count
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param name Name of easing
 * @param durationTicks Duration in ticks
 * @returns Easing
 */
declare const tick: (name: EasingName, durationTicks: number) => Easing;
/**
 * 'Ease' from `0` to `1` over a delicious curve. Commonly used for animation
 * and basic modelling of phyical motion.
 *
 * Create via {@link tick} or {@link time}, call `compute` to calculate the next
 * value in the progression, until you reach `1` or `isDone` returns true.
 *
 */
declare type Easing = HasCompletion & {
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
 * @private
 */
declare type EasingName = keyof typeof functions;
/**
 * Returns an easing function by name, or _undefined_ if not found.
 * This is a manual way of working with easing functions. If you want to
 * ease over time or ticks, use {@link time} or {@link ticks}.
 *
 * ```js
 * const fn = Easings.get(`sineIn`);
 * // Returns 'eased' transformation of 0.5
 * fn(0.5);
 * ```
 * @param easingName eg `sineIn`
 * @returns Easing function
 */
declare const get: (easingName: EasingName) => EasingFn | undefined;
/**
 * @private
 * @returns Returns list of available easing names
 */
declare const getEasings: () => readonly string[];
declare const functions: {
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

declare const Easing$1_time: typeof time;
declare const Easing$1_tick: typeof tick;
type Easing$1_Easing = Easing;
type Easing$1_EasingName = EasingName;
declare const Easing$1_get: typeof get;
declare const Easing$1_getEasings: typeof getEasings;
declare const Easing$1_functions: typeof functions;
declare namespace Easing$1 {
  export {
    Easing$1_time as time,
    Easing$1_tick as tick,
    Easing$1_Easing as Easing,
    Easing$1_EasingName as EasingName,
    Easing$1_get as get,
    Easing$1_getEasings as getEasings,
    Easing$1_functions as functions,
  };
}

/**
 * @returns Returns a full set of default ADSR options
 */
declare const defaultAdsrOpts: () => EnvelopeOpts;
declare type EnvelopeOpts = AdsrOpts & AdsrTimingOpts;
/**
 * Options for the ADSR envelope.
 *
 * Use {@link defaultAdsrOpts} to get an initial default:
 * @example
 * ```js
 * let env = adsr({
 *  ...defaultAdsrOpts(),
 *  attackDuration: 2000,
 *  releaseDuration: 5000,
 *  sustainLevel: 1,
 *  retrigger: false
 * });
 * ```
 */
declare type AdsrOpts = {
    /**
     * Attack bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly attackBend: number;
    /**
     * Decay bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly decayBend: number;
    /**
     * Release bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly releaseBend: number;
    /**
     * Peak level (maximum of attack stage)
     */
    readonly peakLevel: number;
    /**
     * Starting level (usually 0)
     */
    readonly initialLevel?: number;
    /**
     * Sustain level. Only valid if trigger and hold happens
     */
    readonly sustainLevel: number;
    /**
     * Release level, when envelope is done (usually 0)
     */
    readonly releaseLevel?: number;
    /**
     * When _false_, envelope starts from it's current level when being triggered.
     * _True_ by default.
     */
    readonly retrigger?: boolean;
};
declare type AdsrTimingOpts = {
    /**
     * If true, envelope indefinately returns to attack stage after release
     *
     * @type {boolean}
     */
    readonly shouldLoop: boolean;
    /**
     * Duration for attack stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly attackDuration: number;
    /**
     * Duration for decay stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly decayDuration: number;
    /**
     * Duration for release stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly releaseDuration: number;
};
/**
 * @private
 */
interface StateChangeEvent {
    readonly newState: string;
    readonly priorState: string;
}
/**
 * @private
 */
interface CompleteEvent {
}
declare type Events = {
    readonly change: StateChangeEvent;
    readonly complete: CompleteEvent;
};
/**
 * ADSR (Attack Decay Sustain Release) envelope. An envelope is a value that changes over time,
 * usually in response to an intial trigger.
 *
 * Created with the {@link adsr} function.
 *
 * @example Setup
 * ```js
 * const opts = {
 *  ...defaultAdsrOpts(),
 *  attackDuration: 1000,
 *  decayDuration: 200,
 *  sustainDuration: 100
 * }
 * const env = adsr(opts);
 * ```
 *
 * @example Using
 * ```js
 * env.trigger(); // Start envelop
 * ...
 * // Get current value of envelope
 * const [state, scaled, raw] = env.compute();
 * ```
 *
 * * `state` is string: `attack`, `decay`, `sustain`, `release`, `complete
 * * `scaled` is a value scaled according to stage _levels_
 * * `raw` is the progress from 0 to 1 within a stage
 *
 * ...normally you'd just want:
 * ```js
 * const value = env.value; // Get scaled
 * ```
 *
 * @example Hold & release
 * ```js
 * env.trigger(true); // Pass in true to hold
 * ...envelope will stop at sustain stage...
 * env.relese();      // Release into decay
 * ```
 *
 * Check if it's done:
 * ```js
 * env.isDone; // True if envelope is completed
 * ```
 *
 * Envelope has events to track activity: `change` and `complete`:
 *
 * ```
 * env.addEventListener(`change`, ev => {
 *  console.log(`Old: ${evt.oldState} new: ${ev.newState}`);
 * })
 * ```
 */
interface Adsr extends SimpleEventEmitter<Events> {
    /**
     * Compute value of envelope at this point in time.
     *
     * Returns an array of [stage, scaled, raw]. Most likely you want to use {@link value} to just get the scaled value.
     * @param allowStateChange If true (default) envelope will be allowed to change state if necessary before returning value
     */
    compute(allowStateChange?: boolean): readonly [stage: string | undefined, scaled: number, raw: number];
    /**
     * Returns the scaled value
     * Same as .compute()[1]
     */
    get value(): number;
    /**
     * Releases a held envelope. Has no effect if envelope was not held or is complete.
     */
    release(): void;
    /**
     * Triggers envelope.
     *
     * If event is already trigged,
     * it will be _retriggered_. If`opts.retriggered` is false (default)
     * envelope starts again at `opts.initialValue`. Otherwise it starts at
     * the current value.
     *
     * @param hold If _true_ envelope will hold at sustain stage
     */
    trigger(hold?: boolean): void;
    /**
     * _True_ if envelope is completed
     */
    get isDone(): boolean;
}
/**
 * @inheritdoc Adsr
 * @param opts
 * @returns New {@link Adsr} Envelope
 */
declare const adsr: (opts: EnvelopeOpts) => Adsr;

/**
 * Sine oscillator.
 *
 * ```js
 * const osc = sine(Timers.frequencyTimer(10));
 * const osc = sine(0.1);
 * osc.next().value;
 * ```
 *
 * // Saw/tri pinch
 * ```js
 * const v = Math.pow(osc.value, 2);
 * ```
 *
 * // Saw/tri bulge
 * ```js
 * const v = Math.pow(osc.value, 0.5);
 * ```
 *
 */
declare function sine(timerOrFreq: Timer | number): Generator<number, void, unknown>;
/**
 * Bipolar sine (-1 to 1)
 * @param timerOrFreq
 */
declare function sineBipolar(timerOrFreq: Timer | number): Generator<number, void, unknown>;
/**
 * Triangle oscillator
 * ```js
 * const osc = triangle(Timers.frequencyTimer(0.1));
 * const osc = triangle(0.1);
 * osc.next().value;
 * ```
 */
declare function triangle(timerOrFreq: Timer | number): Generator<number, void, unknown>;
/**
 * Saw oscillator
 * ```js
 * const osc = saw(Timers.frequencyTimer(0.1));
 * const osc = saw(0.1);
 * osc.next().value;
 * ```
 */
declare function saw(timerOrFreq: Timer): Generator<number, void, unknown>;
/**
 * Square oscillator
 * ```js
 * const osc = square(Timers.frequencyTimer(0.1));
 * const osc = square(0.1);
 * osc.next().value;
 * ```
 */
declare function square(timerOrFreq: Timer): Generator<0 | 1, void, unknown>;

declare const Oscillator_sine: typeof sine;
declare const Oscillator_sineBipolar: typeof sineBipolar;
declare const Oscillator_triangle: typeof triangle;
declare const Oscillator_saw: typeof saw;
declare const Oscillator_square: typeof square;
declare namespace Oscillator {
  export {
    Oscillator_sine as sine,
    Oscillator_sineBipolar as sineBipolar,
    Oscillator_triangle as triangle,
    Oscillator_saw as saw,
    Oscillator_square as square,
  };
}

/**
 * Easings module
 *
 * Overview:
 * * {@link Easings.time} - Ease by time
 * * {@link Easings.tick} - Ease by tick
 * * {@link Easings.get} - Get an easing function by name
 */

declare const index_defaultAdsrOpts: typeof defaultAdsrOpts;
type index_EnvelopeOpts = EnvelopeOpts;
type index_AdsrOpts = AdsrOpts;
type index_AdsrTimingOpts = AdsrTimingOpts;
type index_StateChangeEvent = StateChangeEvent;
type index_CompleteEvent = CompleteEvent;
type index_Adsr = Adsr;
declare const index_adsr: typeof adsr;
declare namespace index {
  export {
    Easing$1 as Easings,
    Oscillator as Oscillators,
    index_defaultAdsrOpts as defaultAdsrOpts,
    index_EnvelopeOpts as EnvelopeOpts,
    index_AdsrOpts as AdsrOpts,
    index_AdsrTimingOpts as AdsrTimingOpts,
    index_StateChangeEvent as StateChangeEvent,
    index_CompleteEvent as CompleteEvent,
    index_Adsr as Adsr,
    index_adsr as adsr,
  };
}

export { AdsrOpts as A, CompleteEvent as C, Easing$1 as E, Oscillator as O, StateChangeEvent as S, EnvelopeOpts as a, AdsrTimingOpts as b, Adsr as c, defaultAdsrOpts as d, adsr as e, index as i };
