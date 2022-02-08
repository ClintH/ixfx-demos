import {
  sleep
} from "./chunk-WTK7DKQQ.js";
import {
  number
} from "./chunk-OQJMMN6S.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/Generators.ts
var Generators_exports = {};
__export(Generators_exports, {
  interval: () => interval,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
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
var pingPongPercent = function(interval2 = 0.1, start = 0, end = 1, offset = 0, rounding = 1e3) {
  number(interval2, `bipolar`, `interval`);
  number(end, `bipolar`, `end`);
  number(offset, `bipolar`, `offset`);
  number(start, `bipolar`, `start`);
  return pingPong(interval2, start, end, offset, rounding);
};
var pingPong = function* (interval2, lower, upper, offset, rounding = 1) {
  if (Number.isNaN(interval2))
    throw new Error(`interval parameter is NaN`);
  if (Number.isNaN(lower))
    throw new Error(`lower parameter is NaN`);
  if (Number.isNaN(upper))
    throw new Error(`upper parameter is NaN`);
  if (Number.isNaN(offset))
    throw new Error(`upper parameter is NaN`);
  if (lower >= upper)
    throw new Error(`lower must be less than upper`);
  if (interval2 === 0)
    throw new Error(`Interval cannot be zero`);
  const distance = upper - lower;
  if (Math.abs(interval2) >= distance)
    throw new Error(`Interval should be between -${distance} and ${distance}`);
  let incrementing = interval2 > 0;
  upper = Math.floor(upper * rounding);
  lower = Math.floor(lower * rounding);
  interval2 = Math.floor(Math.abs(interval2 * rounding));
  if (offset === void 0)
    offset = lower;
  else
    offset = Math.floor(offset * rounding);
  if (offset > upper || offset < lower)
    throw new Error(`Offset must be within lower and upper`);
  let v = offset;
  yield v / rounding;
  let firstLoop = true;
  while (true) {
    v = v + (incrementing ? interval2 : -interval2);
    if (incrementing && v >= upper) {
      incrementing = false;
      v = upper;
      if (v === upper && firstLoop) {
        v = lower;
        incrementing = true;
      }
    } else if (!incrementing && v <= lower) {
      incrementing = true;
      v = lower;
      if (v === lower && firstLoop) {
        v = upper;
        incrementing = false;
      }
    }
    yield v / rounding;
    firstLoop = false;
  }
};

export {
  interval,
  numericRangeRaw,
  numericRange,
  rangePercent,
  pingPongPercent,
  pingPong,
  Generators_exports
};
//# sourceMappingURL=chunk-CMDM7YRH.js.map