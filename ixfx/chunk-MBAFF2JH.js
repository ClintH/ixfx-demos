import {
  number
} from "./chunk-MA5DOBPX.js";

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
var wrap = (v, min, max) => {
  if (v === min)
    return min;
  if (v === max)
    return max;
  v -= min;
  max -= min;
  v = v % max;
  if (v < 0)
    v = max - Math.abs(v) + min;
  return v + min;
};
var wrapDegrees = (degrees) => wrap(degrees, 0, 360);
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
  return wrap(r, min, max);
};

export {
  startsEnds,
  clamp,
  scale,
  scalePercentOutput,
  scalePercent,
  clampZeroBounds,
  interpolate,
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault,
  wrap,
  wrapDegrees,
  wrapRange
};
