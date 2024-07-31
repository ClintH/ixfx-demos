import {
  clamp
} from "./chunk-ZJSCF2A4.js";
import {
  throwNumberTest
} from "./chunk-CSXWZ3IC.js";

// src/numbers/Scale.ts
var scale = (v, inMin, inMax, outMin, outMax, easing) => scaler(inMin, inMax, outMin, outMax, easing)(v);
var scaler = (inMin, inMax, outMin, outMax, easing) => {
  const oMax = outMax ?? 1;
  const oMin = outMin ?? 0;
  return (v) => {
    if (inMin === inMax) return oMax;
    let a = (v - inMin) / (inMax - inMin);
    if (easing !== void 0) a = easing(a);
    return a * (oMax - oMin) + oMin;
  };
};
var scaleClamped = (v, inMin, inMax, outMin, outMax, easing) => {
  if (outMax === void 0) outMax = 1;
  if (outMin === void 0) outMin = 0;
  if (inMin === inMax) return outMax;
  const x = scale(v, inMin, inMax, outMin, outMax, easing);
  return clamp(x, outMin, outMax);
};
var scalePercentages = (percentage, outMin, outMax = 1) => {
  throwNumberTest(percentage, `percentage`, `v`);
  throwNumberTest(outMin, `percentage`, `outMin`);
  throwNumberTest(outMax, `percentage`, `outMax`);
  return scale(percentage, 0, 1, outMin, outMax);
};
var scalePercent = (v, outMin, outMax) => scalerPercent(outMin, outMax)(v);
var scalerPercent = (outMin, outMax) => {
  return (v) => {
    throwNumberTest(v, `percentage`, `v`);
    return scale(v, 0, 1, outMin, outMax);
  };
};

export {
  scale,
  scaler,
  scaleClamped,
  scalePercentages,
  scalePercent,
  scalerPercent
};
//# sourceMappingURL=chunk-56LYTHQU.js.map