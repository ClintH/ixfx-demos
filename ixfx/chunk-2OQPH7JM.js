import {
  get
} from "./chunk-CTQ6HR35.js";
import {
  randomElement,
  randomIndex
} from "./chunk-TDPI3IJN.js";
import {
  clamp
} from "./chunk-TBQ2OBWU.js";
import {
  number
} from "./chunk-MNTWLMDP.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/Random.ts
var Random_exports = {};
__export(Random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  weighted2: () => weighted2,
  weightedInteger: () => weightedInteger
});
var weighted2 = (min, max) => {
  const r = Math.random() * max;
  const x = Math.round(max / r);
  if (x > max) {
    console.log(`r: ${r} x: ${x} min: ${min} max: ${max}`);
  }
  return x;
};
var weightedInteger = (minOrMax, maxOrEasing, easing) => {
  number(minOrMax);
  let min, max, easingName;
  easingName = `quadIn`;
  min = 0;
  if (maxOrEasing === void 0) {
    max = minOrMax;
  } else {
    if (typeof maxOrEasing === `number`) {
      min = minOrMax;
      max = maxOrEasing;
      if (easing !== void 0)
        easingName = easing;
    } else if (typeof maxOrEasing === `string`) {
      max = minOrMax;
      easingName = maxOrEasing;
    } else {
      throw new Error(`Unexpected value type for maxOrEasing: ${maxOrEasing}`);
    }
  }
  if (easing !== void 0)
    easingName = easing;
  const easingFn = get(easingName);
  if (easingFn === void 0)
    throw new Error(`Easing '${easingName}' not found`);
  number(min);
  if (max <= min)
    throw new Error(`Max should be greater than min`);
  const r = clamp(easingFn(Math.random()));
  return Math.floor(r * (max - min)) + min;
};

export {
  weighted2,
  weightedInteger,
  Random_exports
};
//# sourceMappingURL=chunk-2OQPH7JM.js.map