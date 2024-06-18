import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-2OY2BTO2.js";

// src/data/Wrap.ts
var wrapInteger = (v, min = 0, max = 360) => {
  throwIntegerTest(v, void 0, `v`);
  throwIntegerTest(min, void 0, `min`);
  throwIntegerTest(max, void 0, `max`);
  if (v === min) return min;
  if (v === max) return min;
  if (v > 0 && v < min) v += min;
  v -= min;
  max -= min;
  v = v % max;
  if (v < 0) v = max - Math.abs(v) + min;
  return v + min;
};
var wrap = (v, min = 0, max = 1) => {
  throwNumberTest(v, ``, `min`);
  throwNumberTest(min, ``, `min`);
  throwNumberTest(max, ``, `max`);
  if (v === min) return min;
  if (v === max) return min;
  while (v <= min || v >= max) {
    if (v === max) break;
    if (v === min) break;
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

export {
  wrapInteger,
  wrap,
  wrapRange
};
//# sourceMappingURL=chunk-T5BRTWW5.js.map