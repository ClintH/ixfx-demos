import {
  float,
  floatSource
} from "./chunk-FVMOM6Z4.js";
import {
  clamp
} from "./chunk-REDAXMKO.js";
import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";
import {
  throwNumberTest
} from "./chunk-JIDOUNL5.js";

// src/modulation/PingPong.ts
var pingPongPercent = function(interval = 0.1, lower, upper, start, rounding) {
  if (lower === void 0) lower = 0;
  if (upper === void 0) upper = 1;
  if (start === void 0) start = lower;
  throwNumberTest(interval, `bipolar`, `interval`);
  throwNumberTest(upper, `bipolar`, `end`);
  throwNumberTest(start, `bipolar`, `offset`);
  throwNumberTest(lower, `bipolar`, `start`);
  return pingPong(interval, lower, upper, start, rounding);
};
var pingPong = function* (interval, lower, upper, start, rounding) {
  if (lower === void 0) throw new Error(`Parameter 'lower' is undefined`);
  if (interval === void 0) {
    throw new Error(`Parameter 'interval' is undefined`);
  }
  if (upper === void 0) throw new Error(`Parameter 'upper' is undefined`);
  if (rounding === void 0 && interval <= 1 && interval >= 0) {
    rounding = 10 / interval;
  } else if (rounding === void 0) rounding = 1234;
  if (Number.isNaN(interval)) throw new Error(`interval parameter is NaN`);
  if (Number.isNaN(lower)) throw new Error(`lower parameter is NaN`);
  if (Number.isNaN(upper)) throw new Error(`upper parameter is NaN`);
  if (Number.isNaN(start)) throw new Error(`upper parameter is NaN`);
  if (lower >= upper) throw new Error(`lower must be less than upper`);
  if (interval === 0) throw new Error(`Interval cannot be zero`);
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
  start = start === void 0 ? lower : Math.floor(start * rounding);
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

// src/modulation/Jitter.ts
var jitterAbsolute = (options) => {
  const { relative, absolute } = options;
  const clamped = options.clamped ?? false;
  const source = options.source ?? defaultRandom;
  if (absolute !== void 0) {
    return (value) => {
      const abs = source() * absolute * 2 - absolute;
      const valueNew = value + abs;
      if (clamped) return clamp(valueNew, 0, value);
      return valueNew;
    };
  }
  if (relative !== void 0) {
    return (value) => {
      const rel = value * relative;
      const abs = source() * rel * 2 - rel;
      const valueNew = value + abs;
      if (clamped) return clamp(valueNew, 0, value);
      return valueNew;
    };
  }
  throw new Error(`Either absolute or relative fields expected`);
};
var jitter = (options = {}) => {
  const clamped = options.clamped ?? true;
  let r = (_) => 0;
  if (options.absolute !== void 0) {
    throwNumberTest(
      options.absolute,
      clamped ? `percentage` : `bipolar`,
      `opts.absolute`
    );
    const absRand = floatSource({
      min: -options.absolute,
      max: options.absolute,
      source: options.source
    });
    r = (v) => v + absRand();
  } else if (options.relative === void 0) {
    throw new TypeError(`Either absolute or relative jitter amount is required.`);
  } else {
    const rel = options.relative ?? 0.1;
    throwNumberTest(
      rel,
      clamped ? `percentage` : `bipolar`,
      `opts.relative`
    );
    r = (v) => v + float({
      min: -Math.abs(rel * v),
      max: Math.abs(rel * v),
      source: options.source
    });
  }
  const compute = (value) => {
    throwNumberTest(value, clamped ? `percentage` : `bipolar`, `value`);
    let v = r(value);
    if (clamped) v = clamp(v);
    return v;
  };
  return compute;
};

export {
  pingPongPercent,
  pingPong,
  jitterAbsolute,
  jitter
};
//# sourceMappingURL=chunk-TTX527YE.js.map