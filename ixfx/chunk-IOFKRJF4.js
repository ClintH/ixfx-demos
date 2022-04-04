import {
  integer,
  number
} from "./chunk-AGO4PS3I.js";

// src/Util.ts
var clamp = (v, min = 0, max = 1) => {
  if (Number.isNaN(v))
    throw new Error(`v parameter is NaN`);
  if (Number.isNaN(min))
    throw new Error(`min parameter is NaN`);
  if (Number.isNaN(max))
    throw new Error(`max parameter is NaN`);
  if (v < min)
    return min;
  if (v > max)
    return max;
  return v;
};
var scale = (v, inMin, inMax, outMin, outMax, easing) => {
  if (outMax === void 0)
    outMax = 1;
  if (outMin === void 0)
    outMin = 0;
  if (inMin === inMax)
    return outMax;
  let a = (v - inMin) / (inMax - inMin);
  if (easing !== void 0)
    a = easing(a);
  return a * (outMax - outMin) + outMin;
};
var flip = (v) => {
  if (typeof v === `function`)
    v = v();
  number(v, `percentage`, `v`);
  return 1 - v;
};
var proportion = (v, t) => {
  if (typeof v === `function`)
    v = v();
  if (typeof t === `function`)
    t = t();
  number(v, `percentage`, `v`);
  number(t, `percentage`, `t`);
  return v * t;
};
var scalePercentages = (percentage, outMin, outMax = 1) => {
  number(percentage, `percentage`, `v`);
  number(outMin, `percentage`, `outMin`);
  number(outMax, `percentage`, `outMax`);
  return scale(percentage, 0, 1, outMin, outMax);
};
var scalePercent = (v, outMin, outMax) => {
  number(v, `percentage`, `v`);
  return scale(v, 0, 1, outMin, outMax);
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v))
    throw new Error(`v parameter must be an integer (${v})`);
  const length = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length))
    throw new Error(`length parameter must be an integer (${length}, ${typeof length})`);
  v = Math.round(v);
  if (v < 0)
    return 0;
  if (v >= length)
    return length - 1;
  return v;
};
var interpolate = (amount, a, b) => {
  const v = (1 - amount) * a + amount * b;
  return v;
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b)
    return true;
  return toStringDefault(a) === toStringDefault(b);
};
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var wrapInteger = (v, min = 0, max = 360) => {
  integer(v, void 0, `v`);
  integer(min, void 0, `min`);
  integer(max, void 0, `max`);
  if (v === min)
    return min;
  if (v === max)
    return min;
  if (v > 0 && v < min)
    v += min;
  v -= min;
  max -= min;
  v = v % max;
  if (v < 0)
    v = max - Math.abs(v) + min;
  return v + min;
};
var wrap = (v, min = 0, max = 1) => {
  number(v, ``, `min`);
  number(min, ``, `min`);
  number(max, ``, `max`);
  if (v === min)
    return min;
  if (v === max)
    return min;
  while (v <= min || v >= max) {
    if (v === max)
      break;
    if (v === min)
      break;
    if (v > max) {
      v = min + (v - max);
    } else if (v < min) {
      v = max - (min - v);
    }
  }
  return v;
};
var wrapRange = (min, max, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max - a + b);
  const distBWrap = Math.abs(a + (360 - b));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) {
    r = a - fn(distMin);
  } else if (distMin === distFwrap) {
    r = a + fn(distMin);
  } else {
    if (a > b) {
      r = a - fn(distMin);
    } else {
      r = a + fn(distMin);
    }
  }
  return wrapInteger(r, min, max);
};
var isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;

export {
  clamp,
  scale,
  flip,
  proportion,
  scalePercentages,
  scalePercent,
  clampIndex,
  interpolate,
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault,
  wrapInteger,
  wrap,
  wrapRange,
  isPowerOfTwo
};
//# sourceMappingURL=chunk-IOFKRJF4.js.map