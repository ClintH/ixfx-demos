import { r as randomIndex, a as randomElement } from './Arrays-3b6be438';
import { b as EasingName } from './Easing-1236cfc7';

/**
 * Returns a random number between `min-max` weighted such that values closer to `min`
 * occur more frequently
 * @param min
 * @param max
 * @returns
 */
declare const weighted2: (min: number, max: number) => number;
declare const weightedInteger: (max: number, min: number, easing: EasingName) => number;

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
