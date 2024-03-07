import {
  throwNumberTest
} from "./chunk-WUN4GNAA.js";

// src/modulation/PingPong.ts
var pingPongPercent = function(interval = 0.1, lower, upper, start, rounding) {
  if (lower === void 0)
    lower = 0;
  if (upper === void 0)
    upper = 1;
  if (start === void 0)
    start = lower;
  throwNumberTest(interval, `bipolar`, `interval`);
  throwNumberTest(upper, `bipolar`, `end`);
  throwNumberTest(start, `bipolar`, `offset`);
  throwNumberTest(lower, `bipolar`, `start`);
  return pingPong(interval, lower, upper, start, rounding);
};
var pingPong = function* (interval, lower, upper, start, rounding) {
  if (lower === void 0)
    throw new Error(`Parameter 'lower' is undefined`);
  if (interval === void 0) {
    throw new Error(`Parameter 'interval' is undefined`);
  }
  if (upper === void 0)
    throw new Error(`Parameter 'upper' is undefined`);
  if (rounding === void 0 && interval <= 1 && interval >= 0) {
    rounding = 10 / interval;
  } else if (rounding === void 0)
    rounding = 1234;
  if (Number.isNaN(interval))
    throw new Error(`interval parameter is NaN`);
  if (Number.isNaN(lower))
    throw new Error(`lower parameter is NaN`);
  if (Number.isNaN(upper))
    throw new Error(`upper parameter is NaN`);
  if (Number.isNaN(start))
    throw new Error(`upper parameter is NaN`);
  if (lower >= upper)
    throw new Error(`lower must be less than upper`);
  if (interval === 0)
    throw new Error(`Interval cannot be zero`);
  const distance = upper - lower;
  if (Math.abs(interval) >= distance) {
    throw new Error(`Interval should be between -${distance} and ${distance}`);
  }
  let incrementing = interval > 0;
  upper = Math.floor(upper * rounding);
  lower = Math.floor(lower * rounding);
  interval = Math.floor(Math.abs(interval * rounding));
  if (interval === 0) {
    throw new Error(`Interval is zero (rounding: ${rounding})`);
  }
  if (start === void 0)
    start = lower;
  else
    start = Math.floor(start * rounding);
  if (start > upper || start < lower) {
    throw new Error(
      `Start (${start / rounding}) must be within lower (${lower / rounding}) and upper (${upper / rounding})`
    );
  }
  let v = start;
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
  pingPongPercent,
  pingPong
};
//# sourceMappingURL=chunk-ASKZEBPD.js.map