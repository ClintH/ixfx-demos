import { H as HasCompletion } from './Timer-ec0a330f';

declare type EasingFn = (x: number) => number;
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
declare type EasingName = keyof typeof functions;
declare const get: (easingName: EasingName) => EasingFn;
/**
 * @private
 * @returns Returns list of available easing names
 */
declare const getEasings: () => readonly string[];
declare const functions: {
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

export { Easing as E, easeOverTicks as a, EasingName as b, getEasings as c, easeOverTime as e, functions as f, get as g };
