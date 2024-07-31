import { M as ModSettableOptions, a as ModSettable, b as ModSource, c as Modulate, d as ModulatorTimed, S as SpringOptions, e as ModSettableFeedback, i as index$3 } from './index-Btxtdk8X.js';
import { P as Path } from './PathType-BjzQ3mag.js';
import { S as SimpleEventEmitter } from './Events-DJgOvcWD.js';
import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { P as Point } from './PointType-DYug3Yo5.js';
import { R as Rect } from './RectTypes-Brg8Cmy-.js';
import { R as RandomSource } from './Types-CR0Pe5zY.js';
import { T as Timer } from './Timer-D52G5l9q.js';

type EnvelopeOpts = AdsrOpts & AdsrTimingOpts;
/**
 * Options for the ADSR envelope.
 */
type AdsrOpts = Partial<{
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
    readonly initialLevel: number;
    /**
     * Sustain level. Only valid if trigger and hold happens
     */
    readonly sustainLevel: number;
    /**
     * Release level, when envelope is done (usually 0)
     */
    readonly releaseLevel: number;
    /**
     * When _false_, envelope starts from it's current level when being triggered.
     * _True_ by default.
     */
    readonly retrigger: boolean;
}>;
type AdsrTimingOpts = Partial<{
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
}>;
type AdsrIterableOpts = {
    readonly signal?: AbortSignal;
    readonly sampleRateMs?: number;
    readonly env: EnvelopeOpts;
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
type AdsrEvents = {
    readonly change: StateChangeEvent;
    readonly complete: CompleteEvent;
};
declare const adsrStateTransitions: Readonly<{
    attack: string[];
    decay: string[];
    sustain: string[];
    release: string[];
    complete: null;
}>;
type AdsrStateTransitions = Readonly<typeof adsrStateTransitions>;

declare const defaultAdsrTimingOpts: Readonly<{
    attackDuration: 600;
    decayDuration: 200;
    releaseDuration: 800;
    shouldLoop: false;
}>;
/**
 * Base class for an ADSR envelope.
 *
 * It outputs values on a scale of 0..1 corresponding to each phase.
 */
declare class AdsrBase extends SimpleEventEmitter<AdsrEvents> {
    #private;
    protected attackDuration: number;
    protected decayDuration: number;
    protected releaseDuration: number;
    protected decayDurationTotal: number;
    /**
     * If _true_ envelope will loop
     */
    shouldLoop: boolean;
    constructor(opts?: AdsrTimingOpts);
    dispose(): void;
    get isDisposed(): boolean;
    protected switchStateIfNeeded(): boolean;
    /**
     * Computes a stage progress from 0-1
     * @param allowStateChange
     * @returns
     */
    protected computeRaw(allowStateChange?: boolean): [stage: string | undefined, amount: number, prevStage: string];
    /**
     * Returns _true_ if envelope has finished
     */
    get isDone(): boolean;
    protected onTrigger(): void;
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
    get hasTriggered(): boolean;
    compute(): void;
    /**
     * Release if 'trigger(true)' was previouslly called.
     * Has no effect if not triggered or held.
     * @returns
     */
    release(): void;
}

declare const defaultAdsrOpts: Readonly<{
    attackBend: -1;
    decayBend: -0.3;
    releaseBend: -0.3;
    peakLevel: 1;
    initialLevel: 0;
    sustainLevel: 0.6;
    releaseLevel: 0;
    retrigger: false;
}>;
declare class AdsrIterator implements Iterator<number> {
    private adsr;
    constructor(adsr: Adsr);
    next(...args: [] | [undefined]): IteratorResult<number, any>;
    get [Symbol.toStringTag](): string;
}
/**
 * ADSR (Attack Decay Sustain Release) envelope. An envelope is a value that changes over time,
 * usually in response to an intial trigger.
 *
 * [See the ixfx Guide on Envelopes](https://clinth.github.io/ixfx-docs/modulation/envelope/).
 *
 * @example Setup
 * ```js
 * import { Envelopes } from 'https://unpkg.com/ixfx/dist/modulation.js'
 * const env = new Envelopes.Adsr({
 *  attackDuration: 1000,
 *  decayDuration: 200,
 *  sustainDuration: 100
 * });
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
 *
 * It's also possible to iterate over the values of the envelope:
 * ```js
 * const env = new Envelopes.Adsr();
 * for await (const v of env) {
 *  // v is the numeric value
 *  await Flow.sleep(100); // Want to pause a little to give envelope time to run
 * }
 * // Envelope has finished
 * ```
 */
declare class Adsr extends AdsrBase implements Iterable<number> {
    readonly attackPath: Path;
    readonly decayPath: Path;
    readonly releasePath: Path;
    readonly initialLevel: number;
    readonly peakLevel: number;
    readonly releaseLevel: number;
    readonly sustainLevel: number;
    readonly attackBend: number;
    readonly decayBend: number;
    readonly releaseBend: number;
    protected initialLevelOverride: number | undefined;
    readonly retrigger: boolean;
    private releasedAt;
    constructor(opts?: EnvelopeOpts);
    protected onTrigger(): void;
    [Symbol.iterator](): Iterator<number>;
    /**
     * Returns the scaled value
     * Same as .compute()[1]
     */
    get value(): number;
    /**
     * Compute value of envelope at this point in time.
     *
     * Returns an array of [stage, scaled, raw]. Most likely you want to use {@link value} to just get the scaled value.
     * @param allowStateChange If true (default) envelope will be allowed to change state if necessary before returning value
     */
    compute(allowStateChange?: boolean): [stage: string | undefined, scaled: number, raw: number];
}

/**
 * Returns a function that iterates over an envelope
 * ```js
 * const e = Envelopes.adsr();
 *
 * e(); // Yields current value
 * ```
 *
 * Starts the envelope the first time the return function is called.
 * When the envelope finishes, it continues to return the `releaseLevel` of the envelope.
 *
 * Options can be provided to set the shape of the envelope as usual, eg:
 * ```js
 * const e = Envelopes.adsr({
 *  attackDuration: 1000,
 *  releaseDuration: 500
 * });
 * ```
 * @param opts
 * @returns
 */
declare const adsr: (opts?: EnvelopeOpts) => () => number;

type index$2_Adsr = Adsr;
declare const index$2_Adsr: typeof Adsr;
type index$2_AdsrBase = AdsrBase;
declare const index$2_AdsrBase: typeof AdsrBase;
type index$2_AdsrEvents = AdsrEvents;
type index$2_AdsrIterableOpts = AdsrIterableOpts;
type index$2_AdsrIterator = AdsrIterator;
declare const index$2_AdsrIterator: typeof AdsrIterator;
type index$2_AdsrOpts = AdsrOpts;
type index$2_AdsrStateTransitions = AdsrStateTransitions;
type index$2_AdsrTimingOpts = AdsrTimingOpts;
type index$2_CompleteEvent = CompleteEvent;
type index$2_EnvelopeOpts = EnvelopeOpts;
type index$2_StateChangeEvent = StateChangeEvent;
declare const index$2_adsr: typeof adsr;
declare const index$2_adsrStateTransitions: typeof adsrStateTransitions;
declare const index$2_defaultAdsrOpts: typeof defaultAdsrOpts;
declare const index$2_defaultAdsrTimingOpts: typeof defaultAdsrTimingOpts;
declare namespace index$2 {
  export { index$2_Adsr as Adsr, index$2_AdsrBase as AdsrBase, type index$2_AdsrEvents as AdsrEvents, type index$2_AdsrIterableOpts as AdsrIterableOpts, index$2_AdsrIterator as AdsrIterator, type index$2_AdsrOpts as AdsrOpts, type index$2_AdsrStateTransitions as AdsrStateTransitions, type index$2_AdsrTimingOpts as AdsrTimingOpts, type index$2_CompleteEvent as CompleteEvent, type index$2_EnvelopeOpts as EnvelopeOpts, type index$2_StateChangeEvent as StateChangeEvent, index$2_adsr as adsr, index$2_adsrStateTransitions as adsrStateTransitions, index$2_defaultAdsrOpts as defaultAdsrOpts, index$2_defaultAdsrTimingOpts as defaultAdsrTimingOpts };
}

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
declare function ticks$1(totalTicks: number, options?: Partial<TicksModSettableOptions>): ModSettable;

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
declare namespace index$1 {
  export { type index$1_TicksModSettableOptions as TicksModSettableOptions, index$1_bpm as bpm, index$1_elapsed as elapsed, index$1_hertz as hertz, index$1_perMinute as perMinute, index$1_perSecond as perSecond, ticks$1 as ticks };
}

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
declare const cubicBezierShape: (b: number, d: number) => Modulate;

type Drifter = {
    update(v: number): number;
    reset(): void;
};
/**
 * WIP
 * Returns a {@link Drifter} that moves a value over time.
 *
 * It keeps track of how much time has elapsed, accumulating `driftAmtPerMs`.
 * The accumulated drift is wrapped on a 0..1 scale.
 * ```js
 * // Set up the drifer
 * const d = drif(0.001);
 *
 * d.update(1.0);
 * // Returns 1.0 + accumulated drift
 * ```
 * @param driftAmtPerMs
 * @returns
 */
declare const drift: (driftAmtPerMs: number) => Drifter;

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
 * @param dampen How much to dampen velocity by. Defaults to 1 meaning there is no damping.
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

/**
 * Mixes in modulation
 *
 * ```js
 * // Modulates the value of 100 by 90% at 100% strength
 * mix(1, 0.5, 0.9);
 * ```
 * @param amount Amount of modulation (0..1). 0 means modulation value has no effect
 * @param original Original value to modulate
 * @param modulation Modulation amount (0..1)
 * @returns
 */
declare const mix: (amount: number, original: number, modulation: number) => number;
/**
 * Returns a mix of two modulate functions which are
 * both given the same input value.
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
 * @param a
 * @param b
 * @returns Numeric value
 */
declare const mixModulators: (balance: number, a: Modulate, b: Modulate) => Modulate;
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
 * @param a
 * @param b
 * @returns Numeric value
 */
declare const crossfade: (a: Modulate, b: Modulate) => Modulate;

/**
 * Produce values over time. When the modulate is complete, the final
 * value continues to return. Timer starts when return function is first invoked.
 *
 * ```js
 * const fn = (t) => {
 *  // 't' will be values 0..1 where 1 represents end of time period.
 *  // Return some computed value based on 't'
 *  return t*Math.random();
 * }
 * const e = Modulate.time(fn, 1000);
 *
 * // Keep calling e() to get the current value
 * e();
 * ```
 * @param fn Modulate function
 * @param duration Duration
 * @returns
 */
declare const time: (fn: Modulate, duration: Interval) => () => number;
/**
 * Creates an modulator based on clock time. Time
 * starts being counted when modulate function is created.
 *
 * `timeModulator` allows you to reset and check for completion.
 * Alternatively, use {@link time} which is a simple function that just returns a value.
 *
 * @example Time based easing
 * ```
 * import { timeModulator } from "https://unpkg.com/ixfx/dist/modulation.js";
 * const fn = (t) => {
 *  // 't' will be a value 0..1 representing time elapsed. 1 being end of period.
 *  return t*Math.random();
 * }
 * const t = timeModulator(fn, 5*1000); // Will take 5 seconds to complete
 * ...
 * t.compute(); // Get current value of modulator
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param fn Modulator
 * @param duration Duration
 * @returns ModulatorTimed
 */
declare const timeModulator: (fn: Modulate, duration: Interval) => ModulatorTimed;
/**
 * Produce modulate values with each invocation. When the time is complete, the final
 * value continues to return. Timer starts when return function is first invoked.
 *
 * If you need to check if a modulator is done or reset it, consider {@link tickModulator}.
 *
 * ```js
 * const fn = (t) => {
 *  // 't' will be values 0..1 representing elapsed ticks toward totwal
 * }
 * const e = ticks(fn, 100);
 *
 * // Keep calling e() to get the current value
 * e();
 * ```
 * @param fn Function that produces 0..1 scale
 * @param totalTicks Total length of ticks
 * @returns
 */
declare const ticks: (fn: Modulate, totalTicks: number) => () => number;
/**
 * Creates an modulator based on ticks.
 *
 * `tickModulator` allows you to reset and check for completion.
 * Alternatively, use {@link ticks} which is a simple function that just returns a value.
 *
 * @example Tick-based modulator
 * ```
 * import { tickModulator } from "https://unpkg.com/ixfx/dist/modulation.js";
 * const fn = (t) => {
 *  // 't' will be values 0..1 based on completion
 *  return Math.random() * t;
 * }
 * const t = tickModulator(fn, 1000);   // Will take 1000 ticks to complete
 * t.compute(); // Each call to `compute` progresses the tick count
 * t.reset();   // Reset to 0
 * t.isDone;    // _True_ if finished
 * ```
 * @param fn Modulate function that returns 0..1
 * @param durationTicks Duration in ticks
 * @returns ModulatorTimed
 */
declare const tickModulator: (fn: Modulate, durationTicks: number) => ModulatorTimed;

/**
 * A 'no-op' function. Returns the input value without modification.
 * Useful for when some default is needed
 * @param v
 * @returns
 */
declare const noop: Modulate;

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

declare const Oscillator_saw: typeof saw;
declare const Oscillator_sine: typeof sine;
declare const Oscillator_sineBipolar: typeof sineBipolar;
declare const Oscillator_square: typeof square;
declare const Oscillator_triangle: typeof triangle;
declare namespace Oscillator {
  export { Oscillator_saw as saw, Oscillator_sine as sine, Oscillator_sineBipolar as sineBipolar, Oscillator_square as square, Oscillator_triangle as triangle };
}

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

/**
 * Produces values according to rough spring physics.
 * ```js
 * import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"
 * import { spring } from "https://unpkg.com/ixfx/dist/modulation.js"
 *
 * const s = spring();
 *
 * continuously(() => {
 *  const result = s.next();
 *  if (result.done) return false; // Exit loop
 *  const value = result.value;
 *  // Value is mostly within 0..1 range but will exceed these limits
 * }, 10).start();
 * ```
 *
 * Parameters to the spring can be provided.
 * ```js
 * import { spring } from "https://unpkg.com/ixfx/dist/modulation.js"
 * const s = spring({
 *  mass: 5,
 *  damping: 10
 *  stiffness: 100
 * });
 * ```
 *
 * If you don't want to use a generator: {@link springValue}.
 *
 * Note that the generated value can exceed 0..1 range. This is by design, since
 * a spring can 'overshoot'. See Data.Normalise for functions to normalise.
 *
 * @param opts Options for spring
 * @param timerOrFreq Timer to use, or frequency
 */
declare function spring(opts?: SpringOptions, timerOrFreq?: Timer | number | undefined): Generator<number, void, unknown>;
/**
 * The same as {@link spring} but instead of a generator we get
 * a value. When the spring is done, 1 is returned instead of undefined.
 *
 * ```js
 * import { springValue } from "https://unpkg.com/ixfx/dist/modulation.js"
 * const s = springValue();
 * s(); // 0..1 (roughly - exceeding 1 is possible)
 * ```
 *
 * Options can be provided:
 * ```js
 * import { spring } from "https://unpkg.com/ixfx/dist/modulation.js"
 * const s = springValue({
 *  stiffness: 100,
 *  damping: 10
 * })
 * ```
 * @example Applied
 * ```js
 * import { Modulation, Data } from  "https://unpkg.com/ixfx/dist/bundle.js"
 * let state = {
 *  spring: Modulation.springValue()
 * }
 *
 * function loop() {
 *  const d = Data.resolveFields(state);
 *
 *  // Apply calculated spring value to compute x value
 *  const x = window.innerWidth * d.spring;
 *
 *
 *  window.requestAnimationFrame(loop);
 * }
 * loop();
 * ```
 * Note that the generated value can exceed 0..1 range. This is by design, since
 * a spring can 'overshoot'. See Data.Normalise for functions to normalise.
 *
 * @param opts
 * @param timerOrFreq
 * @returns
 */
declare function springValue(opts?: SpringOptions, timerOrFreq?: Timer | number | undefined): () => number;
/**
 * Spring-dynamics modulator.
 * To have spring driven by time or ticks, use {@link spring} or {@link springValue}.
 * This is a lower-level function.
 * @param opts
 * @returns
 */
declare const springShape: (opts?: SpringOptions) => Modulate;

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
declare function triangleShape(period?: number): Modulate;
/**
 * Returns a function that shapes a 0..1 value as a square waveform.
 * `period` sets the number of cycles in the 0..1 range.
 * No bounds checks are performed on input value.
 * Ensure it is 0..1 (inclusive).
 * @param period
 * @returns
 */
declare function squareShape(period?: number): Modulate;
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
declare function sineShape(period?: number): Modulate;
/**
 * A series of arcs, sort of like a bouncing ball.
 * @param period
 * @returns
 */
declare function arcShape(period?: number): Modulate;
declare function sineBipolarShape(period?: number): Modulate;
/**
 * Creates a wave modulator. Defaults to 5-second sine wave.
 * ```js
 * import { wave } from 'https://unpkg.com/ixfx/dist/modulation.js';
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
declare function waveFromSource(sourceFn: ModSettable, shaperFn: Modulate, invert?: boolean): (feedback?: Partial<WaveShaperFeedback>) => number;

/**
 * Weighted average
 *
 * @param currentValue
 * @param targetValue
 * @param slowDownFactor
 * @returns
 */
declare const weightedAverage: (currentValue: number, targetValue: number, slowDownFactor: number) => number;

/**
 * Easings module
 *
 * [See the guide](https://clinth.github.io/ixfx-docs/modulation/easing/)
 *
 * Overview:
 * * {@link Easings.create}: Create an easing with provided settings
 * * {@link Easings.time}: Ease by time
 * * {@link Easings.ticks}: Ease by tick
 * * {@link Easings.get}: Get an easing function by name
 *
 * @example Importing
 * ```js
 * // If library is stored two directories up under `ixfx/`
 * import { Easings } from '../../ixfx/dist/modulation.js';
 * Easings.time(...);
 *
 * // Import from web
 * import { Easings } from 'https://unpkg.com/ixfx/dist/modulation.js'
 * Easings.time(...);
 * ```
 */

type index_Drifter = Drifter;
declare const index_Forces: typeof Forces;
type index_JitterOpts = JitterOpts;
type index_Jitterer = Jitterer;
declare const index_ModSettable: typeof ModSettable;
declare const index_ModSettableFeedback: typeof ModSettableFeedback;
declare const index_ModSettableOptions: typeof ModSettableOptions;
declare const index_ModSource: typeof ModSource;
declare const index_Modulate: typeof Modulate;
declare const index_ModulatorTimed: typeof ModulatorTimed;
declare const index_SpringOptions: typeof SpringOptions;
type index_WaveOptions = WaveOptions;
type index_WaveShaperFeedback = WaveShaperFeedback;
type index_Waveforms = Waveforms;
declare const index_arcShape: typeof arcShape;
declare const index_crossfade: typeof crossfade;
declare const index_cubicBezierShape: typeof cubicBezierShape;
declare const index_drift: typeof drift;
declare const index_gaussian: typeof gaussian;
declare const index_jitter: typeof jitter;
declare const index_jitterAbsolute: typeof jitterAbsolute;
declare const index_mix: typeof mix;
declare const index_mixModulators: typeof mixModulators;
declare const index_noop: typeof noop;
declare const index_pingPong: typeof pingPong;
declare const index_pingPongPercent: typeof pingPongPercent;
declare const index_sineBipolarShape: typeof sineBipolarShape;
declare const index_sineShape: typeof sineShape;
declare const index_spring: typeof spring;
declare const index_springShape: typeof springShape;
declare const index_springValue: typeof springValue;
declare const index_squareShape: typeof squareShape;
declare const index_tickModulator: typeof tickModulator;
declare const index_ticks: typeof ticks;
declare const index_time: typeof time;
declare const index_timeModulator: typeof timeModulator;
declare const index_triangleShape: typeof triangleShape;
declare const index_wave: typeof wave;
declare const index_waveFromSource: typeof waveFromSource;
declare const index_weightedAverage: typeof weightedAverage;
declare namespace index {
  export { type index_Drifter as Drifter, index$3 as Easings, index$2 as Envelopes, index_Forces as Forces, type index_JitterOpts as JitterOpts, type index_Jitterer as Jitterer, index_ModSettable as ModSettable, index_ModSettableFeedback as ModSettableFeedback, index_ModSettableOptions as ModSettableOptions, index_ModSource as ModSource, index_Modulate as Modulate, index_ModulatorTimed as ModulatorTimed, Oscillator as Oscillators, index$1 as Sources, index_SpringOptions as SpringOptions, type index_WaveOptions as WaveOptions, type index_WaveShaperFeedback as WaveShaperFeedback, type index_Waveforms as Waveforms, index_arcShape as arcShape, index_crossfade as crossfade, index_cubicBezierShape as cubicBezierShape, index_drift as drift, index_gaussian as gaussian, index_jitter as jitter, index_jitterAbsolute as jitterAbsolute, index_mix as mix, index_mixModulators as mixModulators, index_noop as noop, index_pingPong as pingPong, index_pingPongPercent as pingPongPercent, index_sineBipolarShape as sineBipolarShape, index_sineShape as sineShape, index_spring as spring, index_springShape as springShape, index_springValue as springValue, index_squareShape as squareShape, index_tickModulator as tickModulator, index_ticks as ticks, index_time as time, index_timeModulator as timeModulator, index_triangleShape as triangleShape, index_wave as wave, index_waveFromSource as waveFromSource, index_weightedAverage as weightedAverage };
}

export { arcShape as A, sineBipolarShape as B, wave as C, type Drifter as D, type WaveShaperFeedback as E, Forces as F, waveFromSource as G, weightedAverage as H, type JitterOpts as J, Oscillator as O, type Waveforms as W, index$2 as a, index$1 as b, cubicBezierShape as c, drift as d, type Jitterer as e, jitter as f, gaussian as g, mixModulators as h, index as i, jitterAbsolute as j, crossfade as k, timeModulator as l, mix as m, ticks as n, tickModulator as o, noop as p, pingPongPercent as q, pingPong as r, spring as s, time as t, springValue as u, springShape as v, type WaveOptions as w, triangleShape as x, squareShape as y, sineShape as z };
