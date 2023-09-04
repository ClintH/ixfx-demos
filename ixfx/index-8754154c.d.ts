import { a as RandomSource, E as Easing } from './Arrays-3bce8efa.js';
import { a as Point, f as Rect } from './Point-7e80cb86.js';
import { T as Timer } from './index-14e89d41.js';
import { p as pingPong, a as pingPongPercent } from './PingPong-8ac9a1c4.js';
import { S as SimpleEventEmitter } from './Events-f066e560.js';

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
declare const attractionForce: (attractors: readonly ForceAffected[], gravity: number, distanceRange?: {
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
 * @param diminishBy Scales acceleration. Defaults to 0.001.
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
declare const apply: (t: ForceAffected, ...accelForces: readonly ForceKind[]) => ForceAffected;
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
    position?: Point | undefined;
    velocity?: Point | undefined;
    acceleration?: Point | undefined;
    mass?: number | undefined;
}>;
/**
 * Yields a force function that applies the thing's acceleration.x to its angular acceleration.
 * @param scaling Use this to scale the accel.x value. Defaults to 20 (ie accel.x*20). Adjust if rotation is too much or too little
 * @returns
 */
declare const angleFromAccelerationForce: (scaling?: number) => (t: ForceAffected) => Readonly<{
    angularAcceleration: number;
    position?: Point | undefined;
    velocity?: Point | undefined;
    acceleration?: Point | undefined;
    mass?: number | undefined;
    angularVelocity?: number | undefined;
    angle?: number | undefined;
}>;
/**
 * Yields a force function that applies the thing's velocity to its angular acceleration.
 * This will mean it points in the direction of travel.
 * @param interpolateAmt If provided, the angle will be interpolated toward by this amount. Defaults to 1, no interpolation
 * @returns
 */
declare const angleFromVelocityForce: (interpolateAmt?: number) => (t: ForceAffected) => Readonly<{
    angle: number;
    position?: Point | undefined;
    velocity?: Point | undefined;
    acceleration?: Point | undefined;
    mass?: number | undefined;
    angularAcceleration?: number | undefined;
    angularVelocity?: number | undefined;
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
declare const computeAccelerationToTarget: (targetPos: Point, currentPos: Point, opts?: TargetOpts) => Point | Readonly<{
    x: 0;
    y: 0;
}>;
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
  export {
    Forces_ForceAffected as ForceAffected,
    Forces_ForceFn as ForceFn,
    Forces_ForceKind as ForceKind,
    Forces_MassApplication as MassApplication,
    Forces_PendulumOpts as PendulumOpts,
    Forces_TargetOpts as TargetOpts,
    Forces_accelerationForce as accelerationForce,
    Forces_angleFromAccelerationForce as angleFromAccelerationForce,
    Forces_angleFromVelocityForce as angleFromVelocityForce,
    Forces_angularForce as angularForce,
    Forces_apply as apply,
    Forces_attractionForce as attractionForce,
    Forces_computeAccelerationToTarget as computeAccelerationToTarget,
    Forces_computeAttractionForce as computeAttractionForce,
    Forces_computePositionFromAngle as computePositionFromAngle,
    Forces_computePositionFromVelocity as computePositionFromVelocity,
    Forces_computeVelocity as computeVelocity,
    Forces_constrainBounce as constrainBounce,
    Forces_guard as guard,
    Forces_magnitudeForce as magnitudeForce,
    Forces_nullForce as nullForce,
    Forces_orientationForce as orientationForce,
    Forces_pendulumForce as pendulumForce,
    Forces_springForce as springForce,
    Forces_targetForce as targetForce,
    Forces_velocityForce as velocityForce,
  };
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
 *
 * // Setup
 * const osc = Oscillators.sine(Timers.frequencyTimer(10));
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
 *
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
  export {
    Oscillator_SpringOpts as SpringOpts,
    Oscillator_saw as saw,
    Oscillator_sine as sine,
    Oscillator_sineBipolar as sineBipolar,
    Oscillator_spring as spring,
    Oscillator_square as square,
    Oscillator_triangle as triangle,
  };
}

type JitterOpts = {
    readonly relative?: number;
    readonly absolute?: number;
    readonly clamped?: boolean;
    readonly source?: RandomSource;
};
type JitterFn = (value: number) => number;
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
 * @param opts Options
 * @returns Function that performs jitter
 */
declare const jitter: (opts?: JitterOpts) => JitterFn;

/**
 * Returns a proportion of `amount` depending on elapsed time.
 * ```js
 * const x = perSecond(0.1);
 * x();
 * ```
 *
 * The faster `x()` is called, the smaller the chunks of `amount` are returned.
 *
 * @example Usage example
 * ```js
 * const settings = {
 *  ageMod: perSecond(0.1);
 * }
 * let state = {
 *  age: 1
 * }
 *
 * // Update
 * setInterval(() => {
 *  let { age } = state;
 *  // Add 0.1 per second, regardless of
 *  // loop speed
 *  age += settings.ageMod();
 *  state = {
 *    ...state,
 *    age
 *  }
 * });
 * ```
 * @param amount
 * @returns
 */
declare const perSecond: (amount: number) => () => number;

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
type AdsrTimingOpts = {
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
 * import {adsr, defaultAdsrOpts} from 'https://unpkg.com/ixfx/dist/modulation.js'
 * const opts = {
 *  ...defaultAdsrOpts(),
 *  attackDuration: 1000,
 *  decayDuration: 200,
 *  sustainDuration: 100
 * }
 * const env = adsr(opts);
 * ```
 *
 * [Options for envelope](https://clinth.github.io/ixfx/types/Modulation.EnvelopeOpts.html) are as follows:
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
 * import { adsrIterable, defaultAdsrOpts } from 'https://unpkg.com/ixfx/dist/modulation.js';
 * import { IterableAsync } from  'https://unpkg.com/ixfx/dist/util.js';
 *
 * const opts = {
 *  ...defaultAdsrOpts(),
 *  attackDuration: 1000,
 *  releaseDuration: 1000,
 *  sustainLevel: 1,
 *  attackBend: 1,
 *  decayBend: -1
 * };
 * ```
 *
 * @example Add data to array
 * ```js
 * // Sample an envelope every 20ms into an array
 * const data = await IterableAsync.toArray(adsrIterable(opts, 20));
 * ```
 *
 * @example Iterate with `for await`
 * ```js
 * // Work with values as sampled
 * for await (const v of adsrIterable(opts, 5)) {
 *  // Work with envelope value `v`...
 * }
 * ```
 * @param opts Envelope options
 * @param sampleRateMs Sample rate
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
  export {
    Envelope_Adsr as Adsr,
    Envelope_AdsrIterableOpts as AdsrIterableOpts,
    Envelope_AdsrOpts as AdsrOpts,
    Envelope_AdsrTimingOpts as AdsrTimingOpts,
    Envelope_CompleteEvent as CompleteEvent,
    Envelope_EnvelopeOpts as EnvelopeOpts,
    Envelope_Events as Events,
    Envelope_StateChangeEvent as StateChangeEvent,
    Envelope_adsr as adsr,
    Envelope_adsrIterable as adsrIterable,
    Envelope_defaultAdsrOpts as defaultAdsrOpts,
  };
}

type index_Adsr = Adsr;
type index_AdsrIterableOpts = AdsrIterableOpts;
type index_AdsrOpts = AdsrOpts;
type index_AdsrTimingOpts = AdsrTimingOpts;
type index_CompleteEvent = CompleteEvent;
type index_EnvelopeOpts = EnvelopeOpts;
type index_Events = Events;
declare const index_Forces: typeof Forces;
type index_JitterFn = JitterFn;
type index_JitterOpts = JitterOpts;
type index_StateChangeEvent = StateChangeEvent;
declare const index_adsr: typeof adsr;
declare const index_adsrIterable: typeof adsrIterable;
declare const index_defaultAdsrOpts: typeof defaultAdsrOpts;
declare const index_jitter: typeof jitter;
declare const index_perSecond: typeof perSecond;
declare const index_pingPong: typeof pingPong;
declare const index_pingPongPercent: typeof pingPongPercent;
declare namespace index {
  export {
    index_Adsr as Adsr,
    index_AdsrIterableOpts as AdsrIterableOpts,
    index_AdsrOpts as AdsrOpts,
    index_AdsrTimingOpts as AdsrTimingOpts,
    index_CompleteEvent as CompleteEvent,
    Easing as Easings,
    index_EnvelopeOpts as EnvelopeOpts,
    Envelope as Envelopes,
    index_Events as Events,
    index_Forces as Forces,
    index_JitterFn as JitterFn,
    index_JitterOpts as JitterOpts,
    Oscillator as Oscillators,
    index_StateChangeEvent as StateChangeEvent,
    index_adsr as adsr,
    index_adsrIterable as adsrIterable,
    index_defaultAdsrOpts as defaultAdsrOpts,
    index_jitter as jitter,
    index_perSecond as perSecond,
    index_pingPong as pingPong,
    index_pingPongPercent as pingPongPercent,
  };
}

export { AdsrOpts as A, CompleteEvent as C, Envelope as E, Forces as F, JitterFn as J, Oscillator as O, StateChangeEvent as S, JitterOpts as a, EnvelopeOpts as b, AdsrTimingOpts as c, defaultAdsrOpts as d, Events as e, Adsr as f, adsr as g, adsrIterable as h, index as i, jitter as j, AdsrIterableOpts as k, perSecond as p };
