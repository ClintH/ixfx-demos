import {
  Bipolar_exports,
  flip
} from "./chunk-ERUN6IGZ.js";
import {
  count
} from "./chunk-OVLG22EY.js";
import {
  zip
} from "./chunk-FT4AY56C.js";
import {
  linearSpace,
  quantiseEvery
} from "./chunk-647FAJGC.js";
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
} from "./chunk-NGZXMICH.js";
import {
  interpolate,
  interpolateAngle,
  interpolatorInterval,
  interpolatorStepped,
  piPi
} from "./chunk-ACBFZQG5.js";
import {
  rateMinimum
} from "./chunk-VOHY2O2W.js";
import {
  QueueMutable
} from "./chunk-4RHG66EP.js";
import {
  wrap,
  wrapInteger,
  wrapRange
} from "./chunk-W3MH7W5D.js";
import {
  scale,
  scaleClamped,
  scalePercent,
  scalePercentages,
  scaler,
  scalerPercent
} from "./chunk-56LYTHQU.js";
import {
  clamp,
  clampIndex
} from "./chunk-ZJSCF2A4.js";
import {
  minMaxAvg
} from "./chunk-MYMJ4JUA.js";
import {
  round
} from "./chunk-S5D7YRXR.js";
import {
  numberTest,
  throwNumberTest
} from "./chunk-CSXWZ3IC.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/numbers/index.ts
var numbers_exports = {};
__export(numbers_exports, {
  Bipolar: () => Bipolar_exports,
  Normalise: () => Normalise_exports,
  applyToValues: () => applyToValues,
  average: () => average,
  averageWeighted: () => averageWeighted,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  count: () => count,
  dotProduct: () => dotProduct,
  filter: () => filter,
  flip: () => flip,
  interpolate: () => interpolate,
  interpolateAngle: () => interpolateAngle,
  interpolatorInterval: () => interpolatorInterval,
  interpolatorStepped: () => interpolatorStepped,
  isApprox: () => isApprox,
  isValid: () => isValid,
  linearSpace: () => linearSpace,
  max: () => max,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  min: () => min,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  movingAverageTimed: () => movingAverageTimed,
  noiseFilter: () => noiseFilter,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  piPi: () => piPi,
  proportion: () => proportion,
  quantiseEvery: () => quantiseEvery,
  relativeDifference: () => relativeDifference,
  round: () => round,
  scale: () => scale,
  scaleClamped: () => scaleClamped,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  scaler: () => scaler,
  scalerPercent: () => scalerPercent,
  softmax: () => softmax,
  total: () => total,
  totalFast: () => totalFast,
  validNumbers: () => validNumbers,
  weight: () => weight,
  wrap: () => wrap,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
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

// src/numbers/AverageWeighted.ts
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`) weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce(
    (accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]],
    [0, 0]
  );
  return totalV / totalW;
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

// src/numbers/IsApprox.ts
function isApprox(rangePercent, baseValue, v) {
  throwNumberTest(rangePercent, `percentage`, `rangePercent`);
  const range = Math.floor(rangePercent * 100);
  const test = (base, value) => {
    try {
      if (typeof value !== `number`) return false;
      if (Number.isNaN(value)) return false;
      if (!Number.isFinite(value)) return false;
      const diff = Math.abs(value - base);
      const relative = base === 0 ? Math.floor(diff * 100) : Math.floor(diff / base * 100);
      return relative <= range;
    } catch {
      return false;
    }
  };
  if (baseValue === void 0) return test;
  throwNumberTest(baseValue, ``, `baseValue`);
  if (v === void 0) {
    return (value) => test(baseValue, value);
  } else {
    return test(baseValue, v);
  }
}

// src/numbers/MovingAverage.ts
var PiPi = Math.PI * 2;
var movingAverageLight = (scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  let average2 = 0;
  let count2 = 0;
  return (v) => {
    const r = numberTest(v, ``, `v`);
    if (r[0] && v !== void 0) {
      count2++;
      average2 = average2 + (v - average2) / Math.min(count2, scaling);
    }
    return average2;
  };
};
var movingAverageTimed = (options) => {
  const average2 = movingAverageLight();
  const rm = rateMinimum({
    ...options,
    whatToCall: (distance) => {
      average2(distance);
    },
    fallback() {
      return options.default ?? 0;
    }
  });
  return (v) => {
    rm(v);
    return average2();
  };
};
var movingAverage = (samples = 100, weighter) => {
  const q = new QueueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  return (v) => {
    const r = numberTest(v);
    if (r[0] && v !== void 0) {
      q.enqueue(v);
    }
    return weighter === void 0 ? average(q.data) : averageWeighted(q.data, weighter);
  };
};
var smoothingFactor = (timeDelta, cutoff) => {
  const r = PiPi * cutoff * timeDelta;
  return r / (r + 1);
};
var exponentialSmoothing = (smoothingFactor2, value, previous) => {
  return smoothingFactor2 * value + (1 - smoothingFactor2) * previous;
};
var noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
  let previousValue = 0;
  let derivativeLast = 0;
  let timestampLast = 0;
  const compute = (value, timestamp) => {
    if (timestamp === void 0) timestamp = performance.now();
    const timeDelta = timestamp - timestampLast;
    const s = smoothingFactor(timeDelta, cutoffDefault);
    const valueDelta = (value - previousValue) / timeDelta;
    const derivative = exponentialSmoothing(s, valueDelta, derivativeLast);
    const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
    const a = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a, value, previousValue);
    previousValue = smoothed;
    derivativeLast = derivative;
    timestampLast = timestamp;
    return smoothed;
  };
  return compute;
};

// src/numbers/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array,
  stream: () => stream
});
var stream = (minDefault, maxDefault) => {
  let min2 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max2 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  throwNumberTest(min2);
  throwNumberTest(max2);
  return (v) => {
    throwNumberTest(v);
    min2 = Math.min(min2, v);
    max2 = Math.max(max2, v);
    return scale(v, min2, max2);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values)) {
    throw new TypeError(`Param 'values' should be an array. Got: ${typeof values}`);
  }
  const mma = minMaxAvg(values);
  const min2 = minForced ?? mma.min;
  const max2 = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min2, max2)));
};

// src/numbers/Proportion.ts
var proportion = (v, t) => {
  if (typeof v === `function`) v = v();
  if (typeof t === `function`) t = t();
  throwNumberTest(v, `percentage`, `v`);
  throwNumberTest(t, `percentage`, `t`);
  return v * t;
};

// src/numbers/RelativeDifference.ts
var relativeDifference = (initial) => (v) => v / initial;

// src/numbers/Softmax.ts
var softmax = (logits) => {
  const maxLogit = logits.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY);
  const scores = logits.map((l) => Math.exp(l - maxLogit));
  const denom = scores.reduce((a, b) => a + b);
  return scores.map((s) => s / denom);
};

export {
  applyToValues,
  averageWeighted,
  isValid,
  filter,
  numericRangeRaw,
  numericRange,
  numericPercent,
  isApprox,
  movingAverageLight,
  movingAverageTimed,
  movingAverage,
  noiseFilter,
  Normalise_exports,
  proportion,
  relativeDifference,
  softmax,
  numbers_exports
};
//# sourceMappingURL=chunk-HATU5YQE.js.map