import {
  number
} from "./chunk-RKVT4IML.js";

// src/Util.ts
var startsEnds = (v, start, end) => v.startsWith(start) && v.endsWith(end);
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
var scale = (v, inMin, inMax, outMin, outMax) => (v - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
var scalePercentOutput = (v, outMin, outMax = 1) => {
  number(v, `percentage`, `v`);
  number(outMin, `percentage`, `outMin`);
  number(outMax, `percentage`, `outMax`);
  return scale(v, 0, 1, outMin, outMax);
};
var scalePercent = (v, outMin, outMax) => {
  number(v, `percentage`, `v`);
  return scale(v, 0, 1, outMin, outMax);
};
var clampZeroBounds = (v, length) => {
  if (!Number.isInteger(v))
    throw new Error(`v parameter must be an integer (${v})`);
  if (!Number.isInteger(length))
    throw new Error(`length parameter must be an integer (${length}, ${typeof length})`);
  v = Math.round(v);
  if (v < 0)
    return 0;
  if (v >= length)
    return length - 1;
  return v;
};
var lerp = (amt, a, b) => {
  const v = (1 - amt) * a + amt * b;
  return v;
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b)
    return true;
  return toStringDefault(a) === toStringDefault(b);
};
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);

export {
  startsEnds,
  clamp,
  scale,
  scalePercentOutput,
  scalePercent,
  clampZeroBounds,
  lerp,
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault
};
