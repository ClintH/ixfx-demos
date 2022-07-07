import {
  delayLoop,
  interval
} from "./chunk-LWEMLAJY.js";
import {
  integer,
  number
} from "./chunk-U4IZE4J2.js";
import {
  __export
} from "./chunk-6SYKIMQH.js";

// src/Generators.ts
var Generators_exports = {};
__export(Generators_exports, {
  count: () => count,
  delayLoop: () => delayLoop,
  interval: () => interval,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent
});

// src/modulation/PingPong.ts
var pingPongPercent = function(interval2 = 0.1, lower, upper, start, rounding = 1e3) {
  if (lower === void 0)
    lower = 0;
  if (upper === void 0)
    upper = 1;
  if (start === void 0)
    start = lower;
  number(interval2, `bipolar`, `interval`);
  number(upper, `bipolar`, `end`);
  number(start, `bipolar`, `offset`);
  number(lower, `bipolar`, `start`);
  return pingPong(interval2, lower, upper, start, rounding);
};
var pingPong = function* (interval2, lower, upper, start, rounding = 1) {
  if (lower === void 0)
    throw new Error(`Parameter 'lower' is undefined`);
  if (interval2 === void 0)
    throw new Error(`Parameter 'interval' is undefined`);
  if (upper === void 0)
    throw new Error(`Parameter 'upper' is undefined`);
  if (Number.isNaN(interval2))
    throw new Error(`interval parameter is NaN`);
  if (Number.isNaN(lower))
    throw new Error(`lower parameter is NaN`);
  if (Number.isNaN(upper))
    throw new Error(`upper parameter is NaN`);
  if (Number.isNaN(start))
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
  if (start === void 0)
    start = lower;
  else
    start = Math.floor(start * rounding);
  if (start > upper || start < lower)
    throw new Error(`Start (${start / rounding}) must be within lower (${lower / rounding}) and upper (${upper / rounding})`);
  let v = start;
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

// src/Generators.ts
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
var count = function* (amount, offset = 0) {
  integer(amount, ``, `amount`);
  integer(offset, ``, `offset`);
  if (amount === 0)
    return;
  let i = 0;
  do {
    if (amount < 0)
      yield -i + offset;
    else
      yield i + offset;
  } while (i++ < Math.abs(amount) - 1);
};
var numericPercent = function(interval2 = 0.01, repeating = false, start = 0, end = 1) {
  number(interval2, `percentage`, `interval`);
  number(start, `percentage`, `start`);
  number(end, `percentage`, `end`);
  return numericRange(interval2, start, end, repeating);
};

export {
  pingPongPercent,
  pingPong,
  numericRangeRaw,
  numericRange,
  count,
  numericPercent,
  Generators_exports
};
//# sourceMappingURL=chunk-R6HFEWH5.js.map