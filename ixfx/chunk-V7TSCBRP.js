import {
  jitter,
  jitterAbsolute,
  pingPong,
  pingPongPercent
} from "./chunk-34TLXHPW.js";
import {
  count,
  integer
} from "./chunk-AESGGPMS.js";
import {
  numberTracker
} from "./chunk-VHFGU6CW.js";
import {
  linearSpace,
  quantiseEvery
} from "./chunk-EO6AODLL.js";
import {
  average,
  max,
  min,
  total
} from "./chunk-NOMCNAPH.js";
import {
  round,
  roundUpToMultiple
} from "./chunk-3NK3ODTY.js";
import {
  throwNumberTest
} from "./chunk-2OY2BTO2.js";
import {
  __export
} from "./chunk-4VA37QKG.js";

// src/numbers/index.ts
var numbers_exports = {};
__export(numbers_exports, {
  applyToValues: () => applyToValues,
  average: () => average2,
  count: () => count,
  filter: () => filter,
  isApproximately: () => isApproximately,
  isValid: () => isValid,
  jitter: () => jitter,
  jitterAbsolute: () => jitterAbsolute,
  linearSpace: () => linearSpace,
  max: () => max2,
  min: () => min2,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  quantiseEvery: () => quantiseEvery,
  randomUniqueInteger: () => integer,
  relativeDifference: () => relativeDifference,
  round: () => round,
  roundUpToMultiple: () => roundUpToMultiple,
  total: () => total2,
  tracker: () => tracker
});

// src/numbers/Generate.ts
var numericRangeRaw = function* (interval, start = 0, end, repeating = false) {
  if (interval <= 0) throw new Error(`Interval is expected to be above zero`);
  if (end === void 0) end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval;
    }
  } while (repeating);
};
var numericRange = function* (interval, start = 0, end, repeating = false, rounding) {
  throwNumberTest(interval, `nonZero`);
  const negativeInterval = interval < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end) {
      throw new Error(
        `Interval of ${interval} will never go from ${start} to ${end}`
      );
    }
    if (!negativeInterval && start > end) {
      throw new Error(
        `Interval of ${interval} will never go from ${start} to ${end}`
      );
    }
  }
  rounding = rounding ?? 1e3;
  if (end === void 0) end = Number.MAX_SAFE_INTEGER;
  else end *= rounding;
  interval = interval * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval;
    }
  } while (repeating);
};
var numericPercent = function(interval = 0.01, repeating = false, start = 0, end = 1) {
  throwNumberTest(interval, `percentage`, `interval`);
  throwNumberTest(start, `percentage`, `start`);
  throwNumberTest(end, `percentage`, `end`);
  return numericRange(interval, start, end, repeating);
};

// src/numbers/Ranges.ts
function average2(...values) {
  return average(values);
}
var min2 = (...data) => min(data);
var max2 = (...data) => max(data);
var total2 = (...data) => total(data);

// src/numbers/RelativeDifference.ts
var relativeDifference = (initial) => (v) => v / initial;

// src/numbers/IsApproximately.ts
function isApproximately(baseValue, rangePercent, v) {
  throwNumberTest(rangePercent, `percentage`, `rangePercent`);
  throwNumberTest(baseValue, ``, `baseValue`);
  const diff = baseValue * rangePercent;
  const test = (v2) => {
    try {
      throwNumberTest(v2, ``, `v`);
      let diffV = Math.abs(v2 - baseValue);
      if (Math.abs(baseValue) <= 2) {
        diffV = round(5, diffV);
      }
      return diffV <= diff;
    } catch {
      return false;
    }
  };
  return v === void 0 ? test : test(v);
}

// src/numbers/Guard.ts
var isValid = (possibleNumber) => {
  if (typeof possibleNumber !== `number`) return false;
  if (Number.isNaN(possibleNumber)) return false;
  return true;
};

// src/numbers/index.ts
var applyToValues = (object, apply) => {
  const o = { ...object };
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === `number`) {
      o[key] = apply(value);
    } else {
      o[key] = value;
    }
  }
  return o;
};
var tracker = (options) => numberTracker(options);
function* filter(it) {
  for (const v of it) {
    if (isValid(v)) yield v;
  }
}

export {
  numericRangeRaw,
  numericRange,
  numericPercent,
  average2 as average,
  min2 as min,
  max2 as max,
  total2 as total,
  relativeDifference,
  isApproximately,
  isValid,
  applyToValues,
  tracker,
  filter,
  numbers_exports
};
//# sourceMappingURL=chunk-V7TSCBRP.js.map