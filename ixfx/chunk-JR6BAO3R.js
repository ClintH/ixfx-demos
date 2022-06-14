import {
  untilMatch
} from "./chunk-IMPA6CRY.js";
import {
  integer,
  number
} from "./chunk-U4IZE4J2.js";

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
var getFieldByPath = (o, path = ``) => {
  if (path.length === 0)
    return o;
  if (path in o) {
    return o[path];
  } else {
    const start = untilMatch(path, `.`);
    if (start in o) {
      return getFieldByPath(o[start], path.substring(start.length + 1));
    } else {
      return void 0;
    }
  }
};
var getFieldPaths = (o) => {
  const paths = [];
  const probe = (o2, prefix = ``) => {
    if (typeof o2 === `object`) {
      const keys = Object.keys(o2);
      if (prefix.length > 0)
        prefix += `.`;
      keys.forEach((k) => probe(o2[k], prefix + k));
    } else {
      paths.push(prefix);
    }
  };
  probe(o);
  return paths;
};
var roundUpToMultiple = (v, multiple) => {
  number(v, `nonZero`, `v`);
  number(multiple, `nonZero`, `muliple`);
  return Math.ceil(v / multiple) * multiple;
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
var ifNaN = (v, fallback) => {
  if (Number.isNaN(v))
    return fallback;
  return v;
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
var runningiOS = () => [
  `iPad Simulator`,
  `iPhone Simulator`,
  `iPod Simulator`,
  `iPad`,
  `iPhone`,
  `iPod`
].includes(navigator.platform) || navigator.userAgent.includes(`Mac`) && `ontouchend` in document;

export {
  clamp,
  getFieldByPath,
  getFieldPaths,
  roundUpToMultiple,
  scale,
  flip,
  ifNaN,
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
  isPowerOfTwo,
  runningiOS
};
//# sourceMappingURL=chunk-JR6BAO3R.js.map