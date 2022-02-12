import { H as HasCompletion, a as Timer } from './Timer-02949ddb';
import { S as SimpleEventEmitter } from './Events-53171926';

/**
 * Creates an easing based on clock time
 * @inheritdoc Easing
 * @example Time based easing
 * ```
 * const t = timer(`easeIn`, 5*1000); // Will take 5 seconds to complete
 * ...
 * t.compute(); // Get current value of easing
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param name Name of easing
 * @param durationMs Duration in milliseconds
 * @returns Easing
 */
declare const easeOverTime: (name: EasingName, durationMs: number) => Easing;
/**
 * Creates an easing based on ticks
 *
 * @inheritdoc Easing
 * @example Tick-based easing
 * ```
 * const t = tick(`easeOut`, 1000);   // Will take 1000 ticks to complete
 * t.compute(); // Each call to `compute` progresses the tick count
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param name Name of easing
 * @param durationTicks Duration in ticks
 * @returns Easing
 */
declare const easeOverTicks: (name: EasingName, durationTicks: number) => Easing;
/**
 * 'Ease' from `0` to `1` over a delicious curve. Used commonly for animation
 * and basic modelling of phyical motion.
 *
 * Create via {@link easeOverTicks} or {@link easeOverTime}, call `compute` to calculate the next
 * value in the progression, until you reach `1` or `isDone` returns true.
 *
 * For [demos of functions](https://easings.net/)
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
declare type EasingName = keyof typeof easings;
/**
 * @private
 * @returns Returns list of available easing names
 */
declare const getEasings: () => readonly string[];
declare const easings: {
    easeInSine: (x: number) => number;
    easeOutSine: (x: number) => number;
    easeInQuad: (x: number) => number;
    easeOutQuad: (x: number) => number;
    easeInOutSine: (x: number) => number;
    easeInOutQuad: (x: number) => number;
    easeInCubic: (x: number) => number;
    easeOutCubic: (x: number) => number;
    easeInQuart: (x: number) => number;
    easeOutQuart: (x: number) => number;
    easeInQuint: (x: number) => number;
    easeOutQuint: (x: number) => number;
    easeInExpo: (x: number) => number;
    easeOutExpo: (x: number) => number;
    easeInOutQuint: (x: number) => number;
    easeInOutExpo: (x: number) => number;
    easeInCirc: (x: number) => number;
    easeOutCirc: (x: number) => number;
    easeInBack: (x: number) => number;
    easeOutBack: (x: number) => number;
    easeInOutCirc: (x: number) => number;
    easeInOutBack: (x: number) => number;
    easeInElastic: (x: number) => number;
    easeOutElastic: (x: number) => number;
    easeInBounce: (x: number) => number;
    easeOutBounce: (x: number) => number;
    easeInOutElastic: (x: number) => number;
    easeInOutBounce: (x: number) => number;
};

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
 * Oscillator.
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
declare function sine(timer: Timer): Generator<number, void, unknown>;
declare function sineBipolar(timer: Timer): Generator<number, void, unknown>;
declare function triangle(timer: Timer): Generator<number, void, unknown>;
declare function saw(timer: Timer): Generator<number, void, unknown>;
declare function square(timer: Timer): Generator<0 | 1, void, unknown>;

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

declare const index_easeOverTime: typeof easeOverTime;
declare const index_easeOverTicks: typeof easeOverTicks;
type index_Easing = Easing;
type index_EasingName = EasingName;
declare const index_getEasings: typeof getEasings;
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
    Oscillator as Oscillators,
    index_easeOverTime as easeOverTime,
    index_easeOverTicks as easeOverTicks,
    index_Easing as Easing,
    index_EasingName as EasingName,
    index_getEasings as getEasings,
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

export { AdsrOpts as A, CompleteEvent as C, Easing as E, Oscillator as O, StateChangeEvent as S, easeOverTicks as a, EasingName as b, EnvelopeOpts as c, defaultAdsrOpts as d, easeOverTime as e, AdsrTimingOpts as f, getEasings as g, Adsr as h, index as i, adsr as j };
