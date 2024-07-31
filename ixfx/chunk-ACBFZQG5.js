import {
  get
} from "./chunk-4SO3XXQP.js";
import {
  ofTotal
} from "./chunk-HCM42F75.js";
import {
  wrap
} from "./chunk-W3MH7W5D.js";
import {
  clamp
} from "./chunk-ZJSCF2A4.js";
import {
  throwNumberTest
} from "./chunk-CSXWZ3IC.js";

// src/numbers/Interpolate.ts
var piPi = Math.PI * 2;
function interpolate(pos1, pos2, pos3, pos4) {
  let amountProcess;
  let limits = `clamp`;
  const handleAmount = (amount) => {
    if (amountProcess) amount = amountProcess(amount);
    if (limits === void 0 || limits === `clamp`) {
      amount = clamp(amount);
    } else if (limits === `wrap`) {
      if (amount > 1) amount = amount % 1;
      else if (amount < 0) {
        amount = 1 + amount % 1;
      }
    }
    return amount;
  };
  const doTheEase = (_amt, _a, _b) => {
    throwNumberTest(_a, ``, `a`);
    throwNumberTest(_b, ``, `b`);
    throwNumberTest(_amt, ``, `amount`);
    _amt = handleAmount(_amt);
    return (1 - _amt) * _a + _amt * _b;
  };
  const readOpts = (o = {}) => {
    if (o.easing) {
      const easingFn = get(o.easing);
      if (!easingFn) throw new Error(`Easing function '${o.easing}' not found`);
      amountProcess = easingFn;
    } else if (o.transform) {
      if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
      amountProcess = o.transform;
    }
    limits = o.limits ?? `clamp`;
  };
  const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
  if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
  if (typeof pos2 === `number`) {
    let a;
    let b;
    if (pos3 === void 0 || typeof pos3 === `object`) {
      a = pos1;
      b = pos2;
      readOpts(pos3);
      return (amount) => doTheEase(amount, a, b);
    } else if (typeof pos3 === `number`) {
      a = pos2;
      b = pos3;
      readOpts(pos4);
      return doTheEase(pos1, a, b);
    } else {
      throw new Error(`Values for 'a' and 'b' not defined`);
    }
  } else if (pos2 === void 0 || typeof pos2 === `object`) {
    let amount = handleAmount(pos1);
    readOpts(pos2);
    throwNumberTest(amount, ``, `amount`);
    return (aValue, bValue) => rawEase(amount, aValue, bValue);
  }
}
var interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0, options) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate(amount, a, b, options);
    amount += incrementAmount;
    return value;
  };
};
var interpolatorInterval = (duration, a = 0, b = 1, options) => {
  const durationProgression = ofTotal(duration, { clampValue: true });
  return (retargetB, retargetA) => {
    const amount = durationProgression();
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate(amount, a, b, options);
    return value;
  };
};
var interpolateAngle = (amount, aRadians, bRadians, options) => {
  const t = wrap(bRadians - aRadians, 0, piPi);
  return interpolate(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t), options);
};

export {
  piPi,
  interpolate,
  interpolatorStepped,
  interpolatorInterval,
  interpolateAngle
};
//# sourceMappingURL=chunk-ACBFZQG5.js.map