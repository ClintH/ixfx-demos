import {
  sleep
} from "./chunk-EARF3IXA.js";
import {
  integer,
  number
} from "./chunk-CGW7LPMF.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/Generators.ts
var Generators_exports = {};
__export(Generators_exports, {
  count: () => count,
  forEach: () => forEach,
  forEachAsync: () => forEachAsync,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  rangePercent: () => rangePercent
});

// src/modulation/PingPong.ts
var pingPongPercent = function(interval = 0.1, lower, upper, start, rounding = 1e3) {
  if (lower === void 0)
    lower = 0;
  if (upper === void 0)
    upper = 1;
  if (start === void 0)
    start = lower;
  number(interval, `bipolar`, `interval`);
  number(upper, `bipolar`, `end`);
  number(start, `bipolar`, `offset`);
  number(lower, `bipolar`, `start`);
  return pingPong(interval, lower, upper, start, rounding);
};
var pingPong = function* (interval, lower, upper, start, rounding = 1) {
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
  if (Math.abs(interval) >= distance)
    throw new Error(`Interval should be between -${distance} and ${distance}`);
  let incrementing = interval > 0;
  upper = Math.floor(upper * rounding);
  lower = Math.floor(lower * rounding);
  interval = Math.floor(Math.abs(interval * rounding));
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

// src/Generators.ts
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
var forEach = (iterator, fn) => {
  for (const x of iterator) {
    const r = fn(x);
    if (typeof r === `boolean` && !r)
      break;
  }
};
var forEachAsync = async function(iterator, fn, intervalMs) {
  if (Array.isArray(iterator)) {
    for (const x of iterator) {
      const r = await fn(x);
      if (intervalMs)
        await sleep(intervalMs);
      if (typeof r === `boolean` && !r)
        break;
    }
  } else {
    for await (const x of iterator) {
      const r = await fn(x);
      if (intervalMs)
        await sleep(intervalMs);
      if (typeof r === `boolean` && !r)
        break;
    }
  }
};
var numericRange = function* (interval, start = 0, end, repeating = false, rounding) {
  number(interval, `nonZero`);
  const negativeInterval = interval < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end)
      throw new Error(`Interval of ${interval} will never go from ${start} to ${end}`);
    if (!negativeInterval && start > end)
      throw new Error(`Interval of ${interval} will never go from ${start} to ${end}`);
  }
  rounding = rounding ?? 1e3;
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  else
    end *= rounding;
  interval = interval * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval;
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
var rangePercent = function(interval = 0.01, repeating = false, start = 0, end = 1) {
  number(interval, `percentage`, `interval`);
  number(start, `percentage`, `start`);
  number(end, `percentage`, `end`);
  return numericRange(interval, start, end, repeating);
};

export {
  pingPongPercent,
  pingPong,
  numericRangeRaw,
  forEach,
  forEachAsync,
  numericRange,
  count,
  rangePercent,
  Generators_exports
};
