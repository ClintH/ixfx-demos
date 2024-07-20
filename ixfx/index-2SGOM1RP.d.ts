import { J as JitterOpts, a as Jitterer, j as jitter, b as jitterAbsolute, p as pingPong, c as pingPongPercent } from './Jitter-Ue5L368Z.js';
import { I as Interval } from './IntervalType-CQa4mlKV.js';
import { S as SimpleEventEmitter } from './Events-MevXuVvQ.js';
import { E as Easing } from './Easing-yyYzToch.js';
import { P as Point } from './PointType-0vgoM_lJ.js';
import { R as Rect } from './RectTypes-kjDrC-8b.js';
import { T as Timer } from './Timer-yyoKmZ0R.js';

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

type WaveformShaper = (position: number) => number;
type Waveforms = `sine` | `sine-bipolar` | `saw` | `triangle` | `square` | `arc`;
/**
 * Options for the wave function. Defaults to a sine wave of one cycle per-second.
 */
type WaveOptions = ModSettableOptions & {
    period: number;
    /**
     * Clock source. Set this or ticks, hertz, secs or millis
     * @returns
     */
    source: () => number;
    /**
     * Waveshape. Default 'sine'
     */
    shape: Waveforms;
    /**
     * Number of ticks per cycle
     * (Set either ticks, hertz, secs or millis)
     */
    ticks: number;
    /**
     * Number of cycles per second
     * (Set either ticks, hertz, secs or millis)
     */
    hertz: number;
    /**
     * Number of seconds per cycle. Defaults to one second.
     * (Set either ticks, hertz, secs or millis)
     */
    secs: number;
    /**
     * Number of milliseconds per cycle
     * (Set either ticks, hertz, secs or millis)
     */
    millis: number;
    /**
     * If _true_, shape is inverted
     */
    invert: boolean;
};
/**
 * Returns a function that shapes a 0..1 value as a
 * triangle waveform.
 *
 * No bounds checks are performed on input value.
 * Ensure it is 0..1 (inclusive).
 * @param period
 * @returns
 */
declare function triangleShaper(period?: number): WaveformShaper;
/**
 * Returns a function that shapes a 0..1 value as a square waveform.
 * `period` sets the number of cycles in the 0..1 range.
 * No bounds checks are performed on input value.
 * Ensure it is 0..1 (inclusive).
 * @param period
 * @returns
 */
declare function squareShaper(period?: number): WaveformShaper;
/**
 * Returns a function that shapes a 0..1 value as a sine waveform.
 * ```js
 * const s = sineShape();
 * // Calculate value of sine wave at 50%
 * // By default there is one oscillation, thus
 * // it will be the middle of the cycle.
 * s(0.5);
 * ```
 *
 * The `period` determines number of cycles for
 * an input value of 1.
 * ```js
 * // Oscillate twice in 0..1 range
 * const s = sineShape(2);
 * ```
 *
 * No bounds checks are performed on input value.
 * Ensure it is 0..1 (inclusive).
 * @param period
 * @returns
 */
declare function sineShape(period?: number): WaveformShaper;
/**
 * A series of arcs, sort of like a bouncing ball.
 * @param period
 * @returns
 */
declare function arcShape(period?: number): WaveformShaper;
declare function sineBipolarShape(period?: number): WaveformShaper;
/**
 * Creates a wave modulator. Defaults to 5-second sine wave.
 * ```js
 * // Triangle wave that has a single cycle over two seconds
 * const m = wave({ secs: 2, shape: `triangle`});
 *
 * // Call m() to get current value of wave, eg in
 * // an animation loop
 * const v = m();
 * ```
 *
 * @param options
 * @returns
 */
declare function wave(options: Partial<WaveOptions>): (feedback?: Partial<WaveShaperFeedback>) => number;
type WaveShaperFeedback = {
    /**
     * Data to feedback to clock source
     */
    clock: ModSettableFeedback;
    /**
     * If set, source function is ignored and this value (0..1) is used instead
     */
    override: number;
};
/**
 * Returns a wave-shaping modulator from a source and shaper
 * @param sourceFn
 * @param shaperFn
 * @returns
 */
declare function waveFromSource(sourceFn: ModSettable, shaperFn: WaveformShaper, invert?: boolean): (feedback?: Partial<WaveShaperFeedback>) => number;

type TicksModSettableOptions = ModSettableOptions & {
    exclusiveStart: boolean;
    exclusiveEnd: boolean;
};
/**
 * Returns a function which cycles between 0..1 (inclusive of 0 and 1).
 * `totalTicks` is how many ticks it takes to get to 1. Since we want an inclusive 0 & 1,
 * the total ticks is actually +1.
 *
 * Ie. if totalTicks = 10, we get: 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0
 *
 * Use 'exclusiveStart' or 'exclusiveEnd' to shift range. Eg 'exclusiveStart' will begin at 0.1 and
 * include 1.0, while 'exclusiveEnd' will start at 0 and run up to and including 0.9.
 *
 * Other examples:
 * * totalTicks: 20, value goes up by 0.05
 * * totalTicks: 1, value goes up by 1
 * @param totalTicks Positive, integer value. How many ticks to complete a cycle
 * @param options
 * @returns
 */
declare function ticks(totalTicks: number, options?: Partial<TicksModSettableOptions>): ModSettable;

/**
 * Returns an elapsed number of milliseconds up to `interval`.
 * If `oneShot` is _false_ (default), it will loop, resetting to 0 when `interval` is reached.
 * If `oneShot` is _true_, once `interval` is reached, this value will be returned.
 *
 * The starting 'position' is `performance.now()`. If `startAt` option is provided, this will be used instead.
 * It probably should be an offset of `performance.now()`, eg: `{ startAt: performance.now() - 500 }` to shift
 * the cycle by 500ms.
 *
 * When using `startAtRelative`, the starting position will be set backward by the relative amount. A value
 * of 0.5, for example, will set the timer back 50% of the interval, meaning the cycle will start half way through.
 * @param interval
 * @param options
 * @returns
 */
declare function elapsed(interval: Interval, options?: Partial<ModSettableOptions>): ModSettable;
/**
 * Counts beats based on a BPM
 * @param bpm
 * @param options
 * @returns
 */
declare function bpm(bpm: number, options: Partial<ModSettableOptions>): ModSettable;
/**
 * Counts based on hertz (oscillations per second)
 * @param hz
 * @param options
 * @returns
 */
declare function hertz(hz: number, options: Partial<ModSettableOptions>): ModSettable;

/**
 * Returns a proportion of `amount` depending on elapsed time.
 * The idea being that cumulatively, `amount` is yielded every second.
 *
 * ```js
 * // Calculate a proportion of 0.1 every second
 * const x = perSecond(0.1);
 * x();
 * ```
 *
 * The faster `x()` is called, the smaller the chunks of `amount` are returned.
 * Values accumulate. For example, `x()` isn't called for two seconds, 2*amount is returned.
 *
 * @example Usage
 * ```js
 * const settings = {
 *  ageMod: perSecond(0.1);
* };
 *
 * let state = {
 *  age: 1
 * };
 *
 * // Update
 * setInterval(() => {
 *  let { age } = state;
 *  // Add 0.1 per second, regardless of
 *  // loop speed
 *  age += settings.ageMod();
 *  state = {
 *    ...state,
 *    age: clamp(age)
 *  }
 * });
 * ```
 *
 * Options:
 * * max: if specified, the max return value
 * * min: if specified, the min return value
 * @param amount
 * @returns
 */
declare const perSecond: (amount: number, options?: Partial<{
    max: number;
    min: number;
}>) => ModSource;
/**
 * As {@link perSecond}, but per minute.
 * @param amount
 * @param options
 * @returns
 */
declare const perMinute: (amount: number, options?: Partial<{
    max: number;
    min: number;
}>) => ModSource;

type index$1_TicksModSettableOptions = TicksModSettableOptions;
declare const index$1_bpm: typeof bpm;
declare const index$1_elapsed: typeof elapsed;
declare const index$1_hertz: typeof hertz;
declare const index$1_perMinute: typeof perMinute;
declare const index$1_perSecond: typeof perSecond;
declare const index$1_ticks: typeof ticks;
declare namespace index$1 {
  export { type index$1_TicksModSettableOptions as TicksModSettableOptions, index$1_bpm as bpm, index$1_elapsed as elapsed, index$1_hertz as hertz, index$1_perMinute as perMinute, index$1_perSecond as perSecond, index$1_ticks as ticks };
}

/**
 * @returns Returns a full set of default ADSR options
 */
declare const defaultAdsrOpts: () => EnvelopeOpts;
type EnvelopeOpts = AdsrOpts & AdsrTimingOpts;
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
type AdsrOpts = {
    /**
     * Attack bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly attackBend?: number;
    /**
     * Decay bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly decayBend?: number;
    /**
     * Release bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly releaseBend?: number;
    /**
     * Peak level (maximum of attack stage)
     */
    readonly peakLevel?: number;
    /**
     * Starting level (usually 0)
     */
    readonly initialLevel?: number;
    /**
     * Sustain level. Only valid if trigger and hold happens
     */
    readonly sustainLevel?: number;
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
type AdsrTimingOpts = {
    /**
     * If true, envelope indefinately returns to attack stage after release
     *
     * @type {boolean}
     */
    readonly shouldLoop?: boolean;
    /**
     * Duration for attack stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly attackDuration?: number;
    /**
     * Duration for decay stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly decayDuration?: number;
    /**
     * Duration for release stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly releaseDuration?: number;
};
/**
 * State change event
 */
interface StateChangeEvent {
    readonly newState: string;
    readonly priorState: string;
}
interface CompleteEvent {
}
type Events = {
    readonly change: StateChangeEvent;
    readonly complete: CompleteEvent;
};
/**
 * ADSR (Attack Decay Sustain Release) envelope. An envelope is a value that changes over time,
 * usually in response to an intial trigger.
 *
 * Created with the {@link adsr} function. [See the ixfx Guide on Envelopes](https://clinth.github.io/ixfx-docs/modulation/envelope/).
 *
 * @example Setup
 * ```js
 * import { Envelopes } from 'https://unpkg.com/ixfx/dist/modulation.js'
 * const opts = {
 *  ...Envelopes.defaultAdsrOpts(),
 *  attackDuration: 1000,
 *  decayDuration: 200,
 *  sustainDuration: 100
 * }
 * const env = Envelopes.adsr(opts);
 * ```
 *
 * [Options for envelope](https://clinth.github.io/ixfx/types/Modulation.Envelopes.AdsrOpts.html) are as follows:
 *
 * ```js
 * initialLevel?: number
 * attackBend: number
 * attackDuration: number
 * decayBend: number
 * decayDuration:number
 * sustainLevel: number
 * releaseBend: number
 * releaseDuration: number
 * releaseLevel?: number
 * peakLevel: number
 * retrigger?: boolean
 * shouldLoop: boolean
 * ```
 *
 * If `retrigger` is false, re-triggers will continue at current level
 * rather than resetting to `initialLevel`.
 *
 * If `shouldLoop` is true, envelope loops until `release()` is called.
 *
 * @example Using
 * ```js
 * env.trigger(); // Start envelope
 * ...
 * // Get current value of envelope
 * const [state, scaled, raw] = env.compute();
 * ```
 *
 * * `state` is a string, one of the following: 'attack', 'decay', 'sustain', 'release', 'complete'
 * * `scaled` is a value scaled according to the stage's _levels_
 * * `raw` is the progress from 0 to 1 within a stage. ie. 0.5 means we're halfway through a stage.
 *
 * Instead of `compute()`, most usage of the envelope is just fetching the `value` property, which returns the same scaled value of `compute()`:
 *
 * ```js
 * const value = env.value; // Get scaled number
 * ```
 *
 * @example Hold & release
 * ```js
 * env.trigger(true);   // Pass in true to hold
 * ...envelope will stop at sustain stage...
 * env.release();      // Release into decay
 * ```
 *
 * Check if it's done:
 *
 * ```js
 * env.isDone; // True if envelope is completed
 * ```
 *
 * Envelope has events to track activity: 'change' and 'complete':
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
 * Creates an {@link Adsr} envelope.
 *
 * ```js
 * const opts = {
 *  ...Envelopes.defaultAdsrOpts(),
 *  attackDuration: 1000,
 *  releaseDuration: 1000,
 *  sustainLevel: 1,
 *  attackBend: 1,
 *  decayBend: -1
 * };
 * const env = Envelopes.adsr(opts);
 * ```
 *
 * See {@link Adsr} for more.
 * @param opts
 * @returns New {@link Adsr} Envelope
 */
declare const adsr: (opts: EnvelopeOpts) => Adsr;
/**
 * Creates and runs an envelope, sampling its values at `sampleRateMs`.
 * Note that if the envelope loops, iterator never returns.
 *
 * @example Init
 * ```js
 * import { Envelopes } from 'https://unpkg.com/ixfx/dist/modulation.js';
 * import { IterableAsync } from  'https://unpkg.com/ixfx/dist/util.js';
 *
 * const opts = {
 *  ...Envelopes.defaultAdsrOpts(),
 *  attackDuration: 1000,
 *  releaseDuration: 1000,
 *  sustainLevel: 1,
 *  attackBend: 1,
 *  decayBend: -1
 * };
 * ```
 *
 * ```js
 * //  Add data to array
 * // Sample an envelope every 20ms into an array
 * const data = await IterableAsync.toArray(Envelopes.adsrIterable(opts, 20));
 * ```
 *
 * ```js
 * // Iterate with `for await`
 * // Work with values as sampled
 * for await (const v of Envelopes.adsrIterable(opts, 5)) {
 *  // Work with envelope value `v`...
 * }
 * ```
 * @param opts Envelope options
 * @returns
 */
declare function adsrIterable(opts: AdsrIterableOpts): AsyncGenerator<number>;
type AdsrIterableOpts = {
    readonly signal?: AbortSignal;
    readonly sampleRateMs?: number;
    readonly env: EnvelopeOpts;
};

type Envelope_Adsr = Adsr;
type Envelope_AdsrIterableOpts = AdsrIterableOpts;
type Envelope_AdsrOpts = AdsrOpts;
type Envelope_AdsrTimingOpts = AdsrTimingOpts;
type Envelope_CompleteEvent = CompleteEvent;
type Envelope_EnvelopeOpts = EnvelopeOpts;
type Envelope_Events = Events;
type Envelope_StateChangeEvent = StateChangeEvent;
declare const Envelope_adsr: typeof adsr;
declare const Envelope_adsrIterable: typeof adsrIterable;
declare const Envelope_defaultAdsrOpts: typeof defaultAdsrOpts;
declare namespace Envelope {
  export { type Envelope_Adsr as Adsr, type Envelope_AdsrIterableOpts as AdsrIterableOpts, type Envelope_AdsrOpts as AdsrOpts, type Envelope_AdsrTimingOpts as AdsrTimingOpts, type Envelope_CompleteEvent as CompleteEvent, type Envelope_EnvelopeOpts as EnvelopeOpts, type Envelope_Events as Events, type Envelope_StateChangeEvent as StateChangeEvent, Envelope_adsr as adsr, Envelope_adsrIterable as adsrIterable, Envelope_defaultAdsrOpts as defaultAdsrOpts };
}

/**
 * Acknowledgements: much of the work here is an adapation from Daniel Shiffman's excellent _The Nature of Code_ website.
 */

/**
 * Logic for applying mass
 */
type MassApplication = `dampen` | `multiply` | `ignored`;
/**
 * Basic properties of a thing that can be
 * affected by forces
 */
type ForceAffected = {
    /**
     * Position. Probably best to use relative coordinates
     */
    readonly position?: Point;
    /**
     * Velocity vector.
     * Probably don't want to assign this yourself, but rather have it computed based on acceleration and applied forces
     */
    readonly velocity?: Point;
    /**
     * Acceleration vector. Most applied forces will alter the acceleration, culminating in a new velocity being set and the
     * acceleraton value zeroed
     */
    readonly acceleration?: Point;
    /**
     * Mass. The unit is undefined, again best to think of this being on a 0..1 scale. Mass is particularly important
     * for the attraction/repulsion force, but other forces can incorporate mass too.
     */
    readonly mass?: number;
    readonly angularAcceleration?: number;
    readonly angularVelocity?: number;
    readonly angle?: number;
};
/**
 * A function that updates values of a thing.
 *
 * These can be created using the xxxForce functions, eg {@link attractionForce}, {@link accelerationForce}, {@link magnitudeForce}, {@link velocityForce}
 */
type ForceFn = (t: ForceAffected) => ForceAffected;
/**
 * A vector to apply to acceleration or a force function
 */
type ForceKind = Point | ForceFn | null;
/**
 * Throws an error if `t` is not of the `ForceAffected` shape.
 * @param t
 * @param name
 */
declare const guard: (t: ForceAffected, name?: string) => void;
/**
 * `constrainBounce` yields a function that affects `t`'s position and velocity such that it
 * bounces within bounds.
 *
 * ```js
 * // Setup bounce with area constraints
 * // Reduce velocity by 10% with each impact
 * const b = constrainBounce({ width:200, height:500 }, 0.9);
 *
 * // Thing
 * const t = {
 *  position: { x: 50,  y: 50 },
 *  velocity: { x: 0.3, y: 0.01 }
 * };
 *
 * // `b` returns an altereted version of `t`, with the
 * // bounce logic applied.
 * const bounced = b(t);
 * ```
 *
 * `dampen` parameter allows velocity to be dampened with each bounce. A value
 * of 0.9 for example reduces velocity by 10%. A value of 1.1 will increase velocity by
 * 10% with each bounce.
 * @param bounds Constraints of area
 * @params dampen How much to dampen velocity by. Defaults to 1 meaning there is no damping.
 * @returns A function that can perform bounce logic
 */
declare const constrainBounce: (bounds?: Rect, dampen?: number) => (t: ForceAffected) => ForceAffected;
/**
 * For a given set of attractors, returns a function that a sets acceleration of attractee.
 * Keep note though that this bakes-in the values of the attractor, it won't reflect changes to their state. For dynamic
 * attractors, it might be easier to use `computeAttractionForce`.
 *
 * @example Force
 * ```js
 * const f = Forces.attractionForce(sun, gravity);
 * earth = Forces.apply(earth, f);
 * ```
 *
 * @example Everything mutually attracted
 * ```js
 * // Create a force with all things as attractors.
 * const f = Forces.attractionForce(things, gravity);
 * // Apply force to all things.
 * // The function returned by attractionForce will automatically ignore self-attraction
 * things = things.map(a => Forces.apply(a, f));
 * ```
 * @param attractors
 * @param gravity
 * @param distanceRange
 * @returns
 */
declare const attractionForce: (attractors: ReadonlyArray<ForceAffected>, gravity: number, distanceRange?: {
    readonly min?: number;
    readonly max?: number;
}) => (attractee: ForceAffected) => ForceAffected;
/**
 * Computes the attraction force between two things.
 * Value for `gravity` will depend on what range is used for `mass`. It's probably a good idea
 * to keep mass to mean something relative - ie 1 is 'full' mass, and adjust the `gravity`
 * value until it behaves as you like. Keeping mass in 0..1 range makes it easier to apply to
 * visual properties later.
 *
 * @example Attractee and attractor, gravity 0.005
 * ```js
 * const attractor = { position: { x:0.5, y:0.5 }, mass: 1 };
 * const attractee = { position: Points.random(), mass: 0.01 };
 * attractee = Forces.apply(attractee, Forces.computeAttractionForce(attractor, attractee, 0.005));
 * ```
 *
 * @example Many attractees for one attractor, gravity 0.005
 * ```js
 * attractor =  { position: { x:0.5, y:0.5 }, mass: 1 };
 * attractees = attractees.map(a => Forces.apply(a, Forces.computeAttractionForce(attractor, a, 0.005)));
 * ```
 *
 * @example Everything mutually attracted
 * ```js
 * // Create a force with all things as attractors.
 * const f = Forces.attractionForce(things, gravity);
 * // Apply force to all things.
 * // The function returned by attractionForce will automatically ignore self-attraction
 * things = things.map(a => Forces.apply(a, f));
 * ```
 *
 * `attractor` thing attracting (eg, earth)
 * `attractee` thing being attracted (eg. satellite)
 *
 *
 * `gravity` will have to be tweaked to taste.
 * `distanceRange` clamps the computed distance. This affects how tightly the particles will orbit and can also determine speed. By default it is 0.001-0.7
 * @param attractor Attractor (eg earth)
 * @param attractee Attractee (eg satellite)
 * @param gravity Gravity constant
 * @param distanceRange Min/max that distance is clamped to.
 * @returns
 */
declare const computeAttractionForce: (attractor: ForceAffected, attractee: ForceAffected, gravity: number, distanceRange?: {
    readonly min?: number;
    readonly max?: number;
}) => Point;
type TargetOpts = {
    /**
     * Acceleration scaling. Defaults to 0.001
     */
    readonly diminishBy?: number;
    /**
     * If distance is less than this range, don't move.
     * If undefined (default), will try to get an exact position
     */
    readonly range?: Point;
};
/**
 * A force that moves a thing toward `targetPos`.
 *
 * ```js
 * const t = Forces.apply(t, Forces.targetForce(targetPos));
 * ```
 * @param targetPos
 * @param opts
 * @returns
 */
declare const targetForce: (targetPos: Point, opts?: TargetOpts) => (t: ForceAffected) => ForceAffected;
/**
 * Returns `pt` with x and y set to `setpoint` if either's absolute value is below `v`
 * @param pt
 * @param v
 * @returns
 */
/**
 * Apply a series of force functions or forces to `t`. Null/undefined entries are skipped silently.
 * It also updates the velocity and position of the returned version of `t`.
 *
 * ```js
 * // Wind adds acceleration. Force is dampened by mass
 * const wind = Forces.accelerationForce({ x: 0.00001, y: 0 }, `dampen`);
 *
 * // Gravity adds acceleration. Force is magnified by mass
 * const gravity = Forces.accelerationForce({ x: 0, y: 0.0001 }, `multiply`);
 *
 * // Friction is calculated based on velocity. Force is magnified by mass
 * const friction = Forces.velocityForce(0.00001, `multiply`);
 *
 *  // Flip movement velocity if we hit a wall. And dampen it by 10%
 * const bouncer = Forces.constrainBounce({ width: 1, height: 1 }, 0.9);
 *
 * let t = {
 *  position: Points.random(),
 *  mass: 0.1
 * };
 *
 * // Apply list of forces, returning a new version of the thing
 * t = Forces.apply(t,
 *   gravity,
 *   wind,
 *   friction,
 *   bouncer
 * );
 * ```
 */
declare const apply: (t: ForceAffected, ...accelForces: ReadonlyArray<ForceKind>) => ForceAffected;
/**
 * Apples `vector` to acceleration, scaling according to mass, based on the `mass` option.
 * It returns a function which can later be applied to a thing.
 *
 * ```js
 * import { Forces } from "https://unpkg.com/ixfx/dist/modulation.js"
 * // Acceleration vector of (0.1, 0), ie moving straight on horizontal axis
 * const f = Forces.accelerationForce({ x:0.1, y:0 }, `dampen`);
 *
 * // Thing to move
 * let t = { position: ..., acceleration: ... }
 *
 * // Apply force
 * t = f(t);
 * ```
 * @param vector
 * @returns Force function
 */
declare const accelerationForce: (vector: Point, mass?: MassApplication) => ForceFn;
/**
 * A force based on the square of the thing's velocity.
 * It's like {@link velocityForce}, but here the velocity has a bigger impact.
 *
 * ```js
 * const thing = {
 *  position: { x: 0.5, y:0.5 },
 *  velocity: { x: 0.001, y:0 }
 * };
 * const drag = magnitudeForce(0.1);
 *
 * // Apply drag force to thing, returning result
 * const t = Forces.apply(thing, drag);
 * ```
 * @param force Force value
 * @param mass How to factor in mass
 * @returns Function that computes force
 */
declare const magnitudeForce: (force: number, mass?: MassApplication) => ForceFn;
/**
 * Null force does nothing
 * @returns A force that does nothing
 */
declare const nullForce: (t: ForceAffected) => ForceAffected;
/**
 * Force calculated from velocity of object. Reads velocity and influences acceleration.
 *
 * ```js
 * let t = { position: Points.random(), mass: 0.1 };
 * const friction = velocityForce(0.1, `dampen`);
 *
 * // Apply force, updating position and velocity
 * t = Forces.apply(t, friction);
 * ```
 * @param force Force
 * @param mass How to factor in mass
 * @returns Function that computes force
 */
declare const velocityForce: (force: number, mass: MassApplication) => ForceFn;
/**
 * Sets angle, angularVelocity and angularAcceleration based on
 *  angularAcceleration, angularVelocity, angle
 * @returns
 */
declare const angularForce: () => (t: ForceAffected) => Readonly<{
    angle: number;
    angularVelocity: number;
    angularAcceleration: 0;
    position?: Point;
    velocity?: Point;
    acceleration?: Point;
    mass?: number;
}>;
/**
 * Yields a force function that applies the thing's acceleration.x to its angular acceleration.
 * @param scaling Use this to scale the accel.x value. Defaults to 20 (ie accel.x*20). Adjust if rotation is too much or too little
 * @returns
 */
declare const angleFromAccelerationForce: (scaling?: number) => (t: ForceAffected) => Readonly<{
    angularAcceleration: number;
    position?: Point;
    velocity?: Point;
    acceleration?: Point;
    mass?: number;
    angularVelocity?: number;
    angle?: number;
}>;
/**
 * Yields a force function that applies the thing's velocity to its angle.
 * This will mean it points in the direction of travel.
 * @param interpolateAmt If provided, the angle will be interpolated toward by this amount. Defaults to 1, no interpolation
 * @returns
 */
declare const angleFromVelocityForce: (interpolateAmt?: number) => (t: ForceAffected) => Readonly<{
    angle: number;
    position?: Point;
    velocity?: Point;
    acceleration?: Point;
    mass?: number;
    angularAcceleration?: number;
    angularVelocity?: number;
}>;
/**
 * Spring force
 *
 *  * ```js
 * // End of spring that moves
 * let thing = {
 *   position: { x: 1, y: 0.5 },
 *   mass: 0.1
 * };
 *
 * // Anchored other end of spring
 * const pinnedAt = {x: 0.5, y: 0.5};
 *
 * // Create force: length of 0.4
 * const springForce = Forces.springForce(pinnedAt, 0.4);
 *
 * continuously(() => {
 *  // Apply force
 *  thing = Forces.apply(thing, springForce);
 * }).start();
 * ```
 * [Read more](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
 *
 * @param pinnedAt Anchored end of the spring
 * @param restingLength Length of spring-at-rest (default: 0.5)
 * @param k Spring stiffness (default: 0.0002)
 * @param damping Damping factor to apply, so spring slows over time. (default: 0.995)
 * @returns
 */
declare const springForce: (pinnedAt: Point, restingLength?: number, k?: number, damping?: number) => (t: ForceAffected) => ForceAffected;
/**
 * Pendulum force options
 */
type PendulumOpts = {
    /**
     * Length of 'string' thing is hanging from. If
     * undefined, the current length between thing and
     * pinnedAt is used.
     */
    readonly length?: number;
    /**
     * Max speed of swing. Slower speed can reach equilibrium faster, since it
     * might not swing past resting point.
     * Default 0.001.
     */
    readonly speed?: number;
    /**
     * Damping, how much to reduce velocity. Default 0.995 (ie 0.5% loss)
     */
    readonly damping?: number;
};
/**
 * The pendulum force swings something back and forth.
 *
 * ```js
 * // Swinger
 * let thing = {
 *   position: { x: 1, y: 0.5 },
 *   mass: 0.1
 * };
 *
 * // Position thing swings from (middle of screen)
 * const pinnedAt = {x: 0.5, y: 0.5};
 *
 * // Create force: length of 0.4
 * const pendulumForce = Forces.pendulumForce(pinnedAt, { length: 0.4 });
 *
 * continuously(() => {
 *  // Apply force
 *  // Returns a new thing with recalculated angularVelocity, angle and position.
 *  thing = Forces.apply(thing, pendulumForce);
 * }).start();
 * ```
 *
 * [Read more](https://natureofcode.com/book/chapter-3-oscillation/)
 *
 * @param pinnedAt Location to swing from (x:0.5, y:0.5 default)
 * @param opts Options
 * @returns
 */
declare const pendulumForce: (pinnedAt?: Point, opts?: PendulumOpts) => (t: ForceAffected) => ForceAffected;
/**
 * Compute velocity based on acceleration and current velocity
 * @param acceleration Acceleration
 * @param velocity Velocity
 * @param velocityMax If specified, velocity will be capped at this value
 * @returns
 */
declare const computeVelocity: (acceleration: Point, velocity: Point, velocityMax?: number) => Point;
/**
 * Returns the acceleration to get from `currentPos` to `targetPos`.
 *
 * @example Barebones usage:
 * ```js
 * const accel = Forces.computeAccelerationToTarget(targetPos, currentPos);
 * const vel = Forces.computeVelocity(accel, currentVelocity);
 *
 * // New position:
 * const pos = Points.sum(currentPos, vel);
 * ```
 *
 * @example Implementation:
 * ```js
 * const direction = Points.subtract(targetPos, currentPos);
 * const accel = Points.multiply(direction, diminishBy);
 * ```
 * @param currentPos Current position
 * @param targetPos Target position
 * @param opts Options
 * @returns
 */
declare const computeAccelerationToTarget: (targetPos: Point, currentPos: Point, opts?: TargetOpts) => Point | {
    readonly x: 0;
    readonly y: 0;
};
/**
 * Compute a new position based on existing position and velocity vector
 * @param position Position Current position
 * @param velocity Velocity vector
 * @returns Point
 */
declare const computePositionFromVelocity: (position: Point, velocity: Point) => Point;
/**
 * Compute a position based on distance and angle from origin
 * @param distance Distance from origin
 * @param angleRadians Angle, in radians from origin
 * @param origin Origin point
 * @returns Point
 */
declare const computePositionFromAngle: (distance: number, angleRadians: number, origin: Point) => Point;
/**
 * A force that orients things according to direction of travel.
 *
 * Under the hood, it applies:
 * * angularForce,
 * * angleFromAccelerationForce, and
 * * angleFromVelocityForce
 * @param interpolationAmt
 * @returns
 */
declare const orientationForce: (interpolationAmt?: number) => ForceFn;

type Forces_ForceAffected = ForceAffected;
type Forces_ForceFn = ForceFn;
type Forces_ForceKind = ForceKind;
type Forces_MassApplication = MassApplication;
type Forces_PendulumOpts = PendulumOpts;
type Forces_TargetOpts = TargetOpts;
declare const Forces_accelerationForce: typeof accelerationForce;
declare const Forces_angleFromAccelerationForce: typeof angleFromAccelerationForce;
declare const Forces_angleFromVelocityForce: typeof angleFromVelocityForce;
declare const Forces_angularForce: typeof angularForce;
declare const Forces_apply: typeof apply;
declare const Forces_attractionForce: typeof attractionForce;
declare const Forces_computeAccelerationToTarget: typeof computeAccelerationToTarget;
declare const Forces_computeAttractionForce: typeof computeAttractionForce;
declare const Forces_computePositionFromAngle: typeof computePositionFromAngle;
declare const Forces_computePositionFromVelocity: typeof computePositionFromVelocity;
declare const Forces_computeVelocity: typeof computeVelocity;
declare const Forces_constrainBounce: typeof constrainBounce;
declare const Forces_guard: typeof guard;
declare const Forces_magnitudeForce: typeof magnitudeForce;
declare const Forces_nullForce: typeof nullForce;
declare const Forces_orientationForce: typeof orientationForce;
declare const Forces_pendulumForce: typeof pendulumForce;
declare const Forces_springForce: typeof springForce;
declare const Forces_targetForce: typeof targetForce;
declare const Forces_velocityForce: typeof velocityForce;
declare namespace Forces {
  export { type Forces_ForceAffected as ForceAffected, type Forces_ForceFn as ForceFn, type Forces_ForceKind as ForceKind, type Forces_MassApplication as MassApplication, type Forces_PendulumOpts as PendulumOpts, type Forces_TargetOpts as TargetOpts, Forces_accelerationForce as accelerationForce, Forces_angleFromAccelerationForce as angleFromAccelerationForce, Forces_angleFromVelocityForce as angleFromVelocityForce, Forces_angularForce as angularForce, Forces_apply as apply, Forces_attractionForce as attractionForce, Forces_computeAccelerationToTarget as computeAccelerationToTarget, Forces_computeAttractionForce as computeAttractionForce, Forces_computePositionFromAngle as computePositionFromAngle, Forces_computePositionFromVelocity as computePositionFromVelocity, Forces_computeVelocity as computeVelocity, Forces_constrainBounce as constrainBounce, Forces_guard as guard, Forces_magnitudeForce as magnitudeForce, Forces_nullForce as nullForce, Forces_orientationForce as orientationForce, Forces_pendulumForce as pendulumForce, Forces_springForce as springForce, Forces_targetForce as targetForce, Forces_velocityForce as velocityForce };
}

type SpringOpts = {
    /**
     * Default: 1
     */
    readonly mass?: number;
    /**
     * Default: 10
     */
    readonly damping?: number;
    /**
     * Default: 100
     */
    readonly stiffness?: number;
    /**
     * Default: false
     */
    readonly soft?: boolean;
    /**
     * Default: 0.1
     */
    readonly velocity?: number;
    /**
     * How many iterations to wait for spring settling (default: 10)
     */
    readonly countdown?: number;
};
/**
 * Spring-style oscillation
 *
 * ```js
 * import { Oscillators } from "https://unpkg.com/ixfx/dist/modulation.js"
 * const spring = Oscillators.spring();
 *
 * continuously(() => {
 *  const v = spring.next().value;
 *  // Yields values 0...1
 *  //  undefined is yielded when spring is estimated to have stopped
 * });
 * ```
 *
 * Parameters to the spring can be provided.
 * ```js
 * const spring = Oscillators.spring({
 *  mass: 5,
 *  damping: 10
 *  stiffness: 100
 * });
 * ```
 * @param opts Options for spring
 * @param timerOrFreq Timer to use, or frequency
 */
declare function spring(opts?: SpringOpts, timerOrFreq?: Timer | number | undefined): Generator<number, void, unknown>;
/**
 * Sine oscillator.
 *
 * ```js
 * import { Oscillators } from "https://unpkg.com/ixfx/dist/modulation.js"
 * import { frequencyTimer } from "https://unpkg.com/ixfx/dist//flow.js";
 * // Setup
 * const osc = Oscillators.sine(frequencyTimer(10));
 * const osc = Oscillators.sine(0.1);
 *
 * // Call whenever a value is needed
 * const v = osc.next().value;
 * ```
 *
 * @example Saw/tri pinch
 * ```js
 * const v = Math.pow(osc.value, 2);
 * ```
 *
 * @example Saw/tri bulge
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
 *
 * ```js
 * // Setup
 * const osc = triangle(Timers.frequencyTimer(0.1));
 * const osc = triangle(0.1);
 *
 * // Call whenver a value is needed
 * const v = osc.next().value;
 * ```
 */
declare function triangle(timerOrFreq: Timer | number): Generator<number, void, unknown>;
/**
 * Saw oscillator
 *
 * ```js
 * import { Oscillators } from "https://unpkg.com/ixfx/dist/modulation.js"
 * import { frequencyTimer } from "https://unpkg.com/ixfx/dist//flow.js";
 * // Setup
 * const osc = Oscillators.saw(Timers.frequencyTimer(0.1));
 *
 * // Or
 * const osc = Oscillators.saw(0.1);
 *
 * // Call whenever a value is needed
 * const v = osc.next().value;
 * ```
 */
declare function saw(timerOrFreq: Timer | number): Generator<number, void, unknown>;
/**
 * Square oscillator
 *
 * ```js
 * import { Oscillators } from "https://unpkg.com/ixfx/dist/modulation.js"
 *
 * // Setup
 * const osc = Oscillators.square(Timers.frequencyTimer(0.1));
 * const osc = Oscillators.square(0.1);
 *
 * // Call whenever a value is needed
 * osc.next().value;
 * ```
 */
declare function square(timerOrFreq: Timer | number): Generator<0 | 1, void, unknown>;

type Oscillator_SpringOpts = SpringOpts;
declare const Oscillator_saw: typeof saw;
declare const Oscillator_sine: typeof sine;
declare const Oscillator_sineBipolar: typeof sineBipolar;
declare const Oscillator_spring: typeof spring;
declare const Oscillator_square: typeof square;
declare const Oscillator_triangle: typeof triangle;
declare namespace Oscillator {
  export { type Oscillator_SpringOpts as SpringOpts, Oscillator_saw as saw, Oscillator_sine as sine, Oscillator_sineBipolar as sineBipolar, Oscillator_spring as spring, Oscillator_square as square, Oscillator_triangle as triangle };
}

type index_Adsr = Adsr;
type index_AdsrIterableOpts = AdsrIterableOpts;
type index_AdsrOpts = AdsrOpts;
type index_AdsrTimingOpts = AdsrTimingOpts;
type index_CompleteEvent = CompleteEvent;
type index_EnvelopeOpts = EnvelopeOpts;
type index_Events = Events;
declare const index_Forces: typeof Forces;
declare const index_JitterOpts: typeof JitterOpts;
declare const index_Jitterer: typeof Jitterer;
type index_ModSettable = ModSettable;
type index_ModSettableFeedback = ModSettableFeedback;
type index_ModSettableOptions = ModSettableOptions;
type index_ModSource = ModSource;
type index_StateChangeEvent = StateChangeEvent;
type index_WaveOptions = WaveOptions;
type index_WaveShaperFeedback = WaveShaperFeedback;
type index_WaveformShaper = WaveformShaper;
type index_Waveforms = Waveforms;
declare const index_adsr: typeof adsr;
declare const index_adsrIterable: typeof adsrIterable;
declare const index_arcShape: typeof arcShape;
declare const index_defaultAdsrOpts: typeof defaultAdsrOpts;
declare const index_jitter: typeof jitter;
declare const index_jitterAbsolute: typeof jitterAbsolute;
declare const index_pingPong: typeof pingPong;
declare const index_pingPongPercent: typeof pingPongPercent;
declare const index_sineBipolarShape: typeof sineBipolarShape;
declare const index_sineShape: typeof sineShape;
declare const index_squareShaper: typeof squareShaper;
declare const index_triangleShaper: typeof triangleShaper;
declare const index_wave: typeof wave;
declare const index_waveFromSource: typeof waveFromSource;
declare namespace index {
  export { type index_Adsr as Adsr, type index_AdsrIterableOpts as AdsrIterableOpts, type index_AdsrOpts as AdsrOpts, type index_AdsrTimingOpts as AdsrTimingOpts, type index_CompleteEvent as CompleteEvent, Easing as Easings, type index_EnvelopeOpts as EnvelopeOpts, Envelope as Envelopes, type index_Events as Events, index_Forces as Forces, index_JitterOpts as JitterOpts, index_Jitterer as Jitterer, type index_ModSettable as ModSettable, type index_ModSettableFeedback as ModSettableFeedback, type index_ModSettableOptions as ModSettableOptions, type index_ModSource as ModSource, Oscillator as Oscillators, index$1 as Sources, type index_StateChangeEvent as StateChangeEvent, type index_WaveOptions as WaveOptions, type index_WaveShaperFeedback as WaveShaperFeedback, type index_WaveformShaper as WaveformShaper, type index_Waveforms as Waveforms, index_adsr as adsr, index_adsrIterable as adsrIterable, index_arcShape as arcShape, index_defaultAdsrOpts as defaultAdsrOpts, index_jitter as jitter, index_jitterAbsolute as jitterAbsolute, index_pingPong as pingPong, index_pingPongPercent as pingPongPercent, index_sineBipolarShape as sineBipolarShape, index_sineShape as sineShape, index_squareShaper as squareShaper, index_triangleShaper as triangleShaper, index_wave as wave, index_waveFromSource as waveFromSource };
}

export { type AdsrOpts as A, type CompleteEvent as C, Envelope as E, Forces as F, type ModSettableOptions as M, Oscillator as O, type StateChangeEvent as S, type WaveformShaper as W, index$1 as a, type Waveforms as b, type WaveOptions as c, sineShape as d, arcShape as e, sineBipolarShape as f, type WaveShaperFeedback as g, waveFromSource as h, index as i, type ModSettableFeedback as j, type ModSettable as k, type ModSource as l, defaultAdsrOpts as m, type EnvelopeOpts as n, type AdsrTimingOpts as o, type Events as p, type Adsr as q, adsr as r, squareShaper as s, triangleShaper as t, adsrIterable as u, type AdsrIterableOpts as v, wave as w };
