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
  throwNumberTest
} from "./chunk-JIDOUNL5.js";

// src/data/Interpolate.ts
var piPi = Math.PI * 2;
function interpolate(pos1, pos2, pos3, pos4) {
  let opts = {};
  const handleAmount = (amount) => {
    if (opts.limits === void 0 || opts.limits === `clamp`) {
      amount = clamp(amount);
    } else if (opts.limits === `wrap`) {
      if (amount > 1) amount = amount % 1;
      else if (amount < 0) {
        amount = 1 + amount % 1;
      }
    }
    return amount;
  };
  if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
  if (typeof pos2 === `number`) {
    let amount;
    let a;
    let b;
    if (pos3 === void 0 || typeof pos3 === `object`) {
      a = pos1;
      b = pos2;
      opts = pos3 ?? {};
      throwNumberTest(a, ``, `a`);
      throwNumberTest(b, ``, `b`);
      return (amount2) => {
        let amt = handleAmount(amount2);
        return (1 - amt) * a + amt * b;
      };
    } else if (typeof pos3 === `number`) {
      a = pos2;
      b = pos3;
      opts = pos4 ?? {};
      amount = handleAmount(pos1);
      throwNumberTest(a, ``, `a`);
      throwNumberTest(b, ``, `b`);
      throwNumberTest(amount, ``, `amount`);
      return (1 - amount) * a + amount * b;
    } else {
      throw new Error(`Values for a and b not defined`);
    }
  } else if (pos2 === void 0 || typeof pos2 === `object`) {
    let amount = handleAmount(pos1);
    opts = pos2 ?? {};
    throwNumberTest(amount, ``, `amount`);
    return (aValue, bValue) => {
      return (1 - amount) * aValue + amount * bValue;
    };
  }
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

export {
  interpolate,
  interpolatorStepped,
  interpolatorInterval,
  interpolateAngle
};
//# sourceMappingURL=chunk-YEZDB5LJ.js.map