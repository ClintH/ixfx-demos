import {
  get
} from "./chunk-7CVLUCFL.js";
import {
  randomElement,
  randomIndex
} from "./chunk-WITGDHKI.js";
import {
  clamp
} from "./chunk-5YJFG5KO.js";
import {
  number
} from "./chunk-QLMTBJ7O.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/Random.ts
var Random_exports = {};
__export(Random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  weightedInteger: () => weightedInteger
});
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
  weightedInteger,
  Random_exports
};
//# sourceMappingURL=chunk-RGFZF3F2.js.map