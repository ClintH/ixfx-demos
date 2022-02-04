import {
  sleep
} from "./chunk-CX6IPGLD.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/Generators.ts
var Generators_exports = {};
__export(Generators_exports, {
  atInterval: () => atInterval,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent
});
var atInterval = async function* (produce, intervalMs) {
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
var numericRangeRaw = function* (interval, start = 0, end, repeating = false) {
  if (interval <= 0)
    throw new Error(`Interval is expected to be above zero`);
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval;
    }
  } while (repeating);
};
var numericRange = function* (interval, start = 0, end, repeating = false, rounding) {
  if (interval <= 0)
    throw Error(`Interval is expected to be above zero`);
  rounding = rounding ?? 1e3;
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  else
    end *= rounding;
  interval = interval * rounding;
  do {
    let v = start * rounding;
    while (v <= end) {
      yield v / rounding;
      v += interval;
    }
  } while (repeating);
};
var pingPongPercent = function(interval = 0.1, offset, rounding = 1e3) {
  if (offset === void 0 && interval > 0)
    offset = 0;
  else if (offset === void 0 && interval < 0)
    offset = 1;
  else
    offset = offset;
  if (offset > 1 || offset < 0)
    throw new Error(`offset must be between 0 and 1`);
  return pingPong(interval, 0, 1, offset, rounding);
};
var pingPong = function* (interval, lower, upper, offset, rounding = 1) {
  if (Number.isNaN(interval))
    throw new Error(`interval parameter is NaN`);
  if (Number.isNaN(lower))
    throw new Error(`lower parameter is NaN`);
  if (Number.isNaN(upper))
    throw new Error(`upper parameter is NaN`);
  if (Number.isNaN(offset))
    throw new Error(`upper parameter is NaN`);
  if (lower >= upper)
    throw new Error(`lower must be less than upper`);
  if (interval === 0)
    throw new Error(`Interval cannot be zero`);
  const distance = upper - lower;
  if (Math.abs(interval) >= distance)
    throw new Error(`Interval should be between -${distance} and ${distance}`);
  let incrementing = interval > 0;
  upper = Math.floor(upper * rounding);
  lower = Math.floor(lower * rounding);
  interval = Math.floor(Math.abs(interval * rounding));
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
    v = v + (incrementing ? interval : -interval);
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
  atInterval,
  numericRangeRaw,
  numericRange,
  pingPongPercent,
  pingPong,
  Generators_exports
};
//# sourceMappingURL=chunk-ACGLUA43.js.map