import { r as randomIndex, a as randomElement } from './Arrays-57bbe336';

/**
 * Returns a random number between `min-max` weighted such that values closer to `min`
 * occur more frequently
 * @param min
 * @param max
 * @returns
 */
declare const weighted2: (min: number, max: number) => number;
/**
 * Random integer, weighted according to an easing function.
 * Number will be inclusive of `min` and below `max`.
 * ```js
 * // If only one parameter is provided, it's assumed to be the max:
 * // Random number that might be 0 through to 99
 * const r = weightedInteger(100);
 *
 * // If two numbers are given, it's assumed to be min, max
 * // Random number that might be 20 through to 29
 * const r = weightedInteger(30,20);
 *
 * // One number,
 * // Random number with `easeInExpo` function
 * const r = weightedInteger(100, `minOrMax`)
 * ```
 *
 * Result from easing function will be capped between
 * 0-1 to ensure `min` and `max` are respected.
 *
 * @param max Maximum (exclusive)
 * @param min Minimum number (inclusive), 0 by default
 * @param easing Easing to use, uses `easeInQuad` by default
 * @returns
 */
declare const weightedInteger: (minOrMax: number, maxOrEasing?: number | "easeInSine" | "easeOutSine" | "easeInQuad" | "easeOutQuad" | "easeInOutSine" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInExpo" | "easeOutExpo" | "easeInOutQuint" | "easeInOutExpo" | "easeInCirc" | "easeOutCirc" | "easeInBack" | "easeOutBack" | "easeInOutCirc" | "easeInOutBack" | "easeInElastic" | "easeOutElastic" | "easeInBounce" | "easeOutBounce" | "easeInOutElastic" | "easeInOutBounce" | undefined, easing?: "easeInSine" | "easeOutSine" | "easeInQuad" | "easeOutQuad" | "easeInOutSine" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInExpo" | "easeOutExpo" | "easeInOutQuint" | "easeInOutExpo" | "easeInCirc" | "easeOutCirc" | "easeInBack" | "easeOutBack" | "easeInOutCirc" | "easeInOutBack" | "easeInElastic" | "easeOutElastic" | "easeInBounce" | "easeOutBounce" | "easeInOutElastic" | "easeInOutBounce" | undefined) => number;

declare const Random_weighted2: typeof weighted2;
declare const Random_weightedInteger: typeof weightedInteger;
declare namespace Random {
  export {
    randomIndex as arrayIndex,
    randomElement as arrayElement,
    Random_weighted2 as weighted2,
    Random_weightedInteger as weightedInteger,
  };
}

export { Random as R, weightedInteger as a, weighted2 as w };
