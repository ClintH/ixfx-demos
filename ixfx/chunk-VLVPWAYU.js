import {
  wrap
} from "./chunk-3RVYHJO6.js";
import {
  progress
} from "./chunk-4LUNZR7B.js";
import {
  clamp
} from "./chunk-REDAXMKO.js";
import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";
import {
  throwNumberTest
} from "./chunk-JIDOUNL5.js";

// src/data/Interpolate.ts
var piPi = Math.PI * 2;
function interpolate(amountOrA, aOrB, bOrMissingOrOpts, options) {
  const a = bOrMissingOrOpts === void 0 ? amountOrA : aOrB;
  const b = bOrMissingOrOpts === void 0 || typeof bOrMissingOrOpts === `object` ? aOrB : bOrMissingOrOpts;
  const opts = options !== void 0 ? options : typeof bOrMissingOrOpts === `number` ? {} : bOrMissingOrOpts;
  const limits = opts?.limits ?? `clamp`;
  throwNumberTest(a, ``, `a`);
  throwNumberTest(b, ``, `b`);
  const calculate = (amount) => {
    if (limits === `clamp`) {
      amount = clamp(amount);
    } else if (limits === `wrap`) {
      if (amount > 1) amount = amount % 1;
      else if (amount < 0) {
        amount = 1 + amount % 1;
      }
    }
    throwNumberTest(amount, ``, `amount`);
    return (1 - amount) * a + amount * b;
  };
  if (bOrMissingOrOpts === void 0 || typeof bOrMissingOrOpts === `object`) return calculate;
  return calculate(amountOrA);
}
var interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate(amount, a, b);
    amount += incrementAmount;
    return value;
  };
};
var interpolatorInterval = (duration, a = 0, b = 1) => {
  const durationProgression = progress(duration, { clampValue: true });
  return (retargetB, retargetA) => {
    const amount = durationProgression();
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate(amount, a, b);
    return value;
  };
};
var interpolateAngle = (amount, aRadians, bRadians) => {
  const t = wrap(bRadians - aRadians, 0, piPi);
  return interpolate(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t));
};

// src/random/FloatSource.ts
var floatSource = (maxOrOptions = 1) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = options.max;
  let min = options.min ?? 0;
  const source = options.source ?? defaultRandom;
  throwNumberTest(min, ``, `min`);
  throwNumberTest(max, ``, `max`);
  if (!options.min && max < 0) {
    min = max;
    max = 0;
  }
  if (min > max) {
    throw new Error(`Min is greater than max. Min: ${min} max: ${max}`);
  }
  return () => source() * (max - min) + min;
};
var float = (maxOrOptions = 1) => floatSource(maxOrOptions)();

export {
  interpolate,
  interpolatorStepped,
  interpolatorInterval,
  interpolateAngle,
  floatSource,
  float
};
//# sourceMappingURL=chunk-VLVPWAYU.js.map