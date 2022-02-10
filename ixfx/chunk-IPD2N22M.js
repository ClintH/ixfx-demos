import {
  sleep
} from "./chunk-DVOHRKTZ.js";
import {
  number
} from "./chunk-G4S3XAFG.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/Generators.ts
var Generators_exports = {};
__export(Generators_exports, {
  interval: () => interval,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  rangePercent: () => rangePercent
});
var interval = async function* (produce, intervalMs) {
  let cancelled = false;
  try {
    while (!cancelled) {
      await sleep(intervalMs);
      if (cancelled)
        return;
      yield await produce();
    }
  } finally {
    cancelled = true;
  }
};
var numericRangeRaw = function* (interval2, start = 0, end, repeating = false) {
  if (interval2 <= 0)
    throw new Error(`Interval is expected to be above zero`);
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval2;
    }
  } while (repeating);
};
var numericRange = function* (interval2, start = 0, end, repeating = false, rounding) {
  number(interval2, `nonZero`);
  const negativeInterval = interval2 < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end)
      throw new Error(`Interval of ${interval2} will never go from ${start} to ${end}`);
    if (!negativeInterval && start > end)
      throw new Error(`Interval of ${interval2} will never go from ${start} to ${end}`);
  }
  rounding = rounding ?? 1e3;
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  else
    end *= rounding;
  interval2 = interval2 * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval2;
    }
  } while (repeating);
};
var rangePercent = function(interval2 = 0.01, repeating = true, start = 0, end = 1) {
  number(interval2, `percentage`, `interval`);
  number(start, `percentage`, `start`);
  number(end, `percentage`, `end`);
  return numericRange(interval2, start, end, repeating);
};

export {
  interval,
  numericRangeRaw,
  numericRange,
  rangePercent,
  Generators_exports
};
