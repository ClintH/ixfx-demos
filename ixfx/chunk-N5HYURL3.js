import {
  jitter,
  jitterAbsolute,
  pingPong,
  pingPongPercent
} from "./chunk-TTX527YE.js";
import {
  count,
  integer,
  integerUniqueGen
} from "./chunk-FCEXFCW7.js";
import {
  averageWeighted
} from "./chunk-FFP764T4.js";
import {
  numberTracker
} from "./chunk-R2SBCFPC.js";
import {
  minMaxAvg
} from "./chunk-BXWBMVS6.js";
import {
  linearSpace,
  quantiseEvery
} from "./chunk-OHBN76WG.js";
import {
  average,
  dotProduct,
  max,
  maxFast,
  maxIndex,
  min,
  minFast,
  minIndex,
  total,
  totalFast,
  validNumbers,
  weight
} from "./chunk-IALMVFKW.js";
import {
  round,
  roundUpToMultiple
} from "./chunk-2EX73MGI.js";
import {
  throwNumberTest
} from "./chunk-JIDOUNL5.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/numbers/index.ts
var numbers_exports = {};
__export(numbers_exports, {
  applyToValues: () => applyToValues,
  average: () => average,
  averageWeighted: () => averageWeighted,
  count: () => count,
  dotProduct: () => dotProduct,
  filter: () => filter,
  isApproximately: () => isApproximately,
  isValid: () => isValid,
  jitter: () => jitter,
  jitterAbsolute: () => jitterAbsolute,
  linearSpace: () => linearSpace,
  max: () => max,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  min: () => min,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  quantiseEvery: () => quantiseEvery,
  randomInteger: () => integer,
  randomUniqueInteger: () => integerUniqueGen,
  relativeDifference: () => relativeDifference,
  round: () => round,
  roundUpToMultiple: () => roundUpToMultiple,
  total: () => total,
  totalFast: () => totalFast,
  tracker: () => tracker,
  validNumbers: () => validNumbers,
  weight: () => weight
});

// src/numbers/ApplyToValues.ts
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

// src/numbers/Guard.ts
var isValid = (possibleNumber) => {
  if (typeof possibleNumber !== `number`) return false;
  if (Number.isNaN(possibleNumber)) return false;
  return true;
};

// src/numbers/Filter.ts
function* filter(it) {
  for (const v of it) {
    if (isValid(v)) yield v;
  }
}

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

// src/numbers/RelativeDifference.ts
var relativeDifference = (initial) => (v) => v / initial;

// src/numbers/index.ts
var tracker = (options) => numberTracker(options);

export {
  applyToValues,
  isValid,
  filter,
  numericRangeRaw,
  numericRange,
  numericPercent,
  isApproximately,
  relativeDifference,
  tracker,
  numbers_exports
};
//# sourceMappingURL=chunk-N5HYURL3.js.map