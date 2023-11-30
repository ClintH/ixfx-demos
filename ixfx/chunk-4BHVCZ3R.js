import {
  SimpleEventEmitter
} from "./chunk-KAXCUEYL.js";
import {
  defaultComparer,
  intervalToMs,
  isEqualDefault,
  isEqualValueDefault,
  isInterval,
  sleep,
  toStringDefault2 as toStringDefault
} from "./chunk-NFVCKP37.js";
import {
  defaultRandom
} from "./chunk-3XKB3X2O.js";
import {
  integerTest,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest
} from "./chunk-JNUBDOCI.js";
import {
  getErrorMessage,
  resolveLogOption
} from "./chunk-NEQZAMQB.js";
import {
  __export
} from "./chunk-VE7DK22H.js";

// src/flow/StateMachine.ts
var StateMachine_exports = {};
__export(StateMachine_exports, {
  WithEvents: () => StateMachineWithEvents,
  bidirectionalFromList: () => bidirectionalFromList,
  cloneState: () => cloneState,
  done: () => done,
  driver: () => init2,
  fromList: () => fromList,
  init: () => init,
  isValidTransition: () => isValidTransition,
  next: () => next,
  normaliseTargets: () => normaliseTargets,
  possible: () => possible,
  possibleTargets: () => possibleTargets,
  reset: () => reset,
  to: () => to,
  validateMachine: () => validateMachine,
  validateTransition: () => validateTransition
});

// src/collections/arrays/index.ts
var arrays_exports = {};
__export(arrays_exports, {
  additionalValues: () => additionalValues,
  average: () => average,
  averageWeighted: () => averageWeighted,
  chunks: () => chunks,
  compareValues: () => compareValues,
  compareValuesEqual: () => compareValuesEqual,
  contains: () => contains,
  containsDuplicateInstances: () => containsDuplicateInstances,
  containsDuplicateValues: () => containsDuplicateValues,
  cycle: () => cycle,
  dotProduct: () => dotProduct,
  ensureLength: () => ensureLength,
  filterAB: () => filterAB,
  filterBetween: () => filterBetween,
  flatten: () => flatten,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  guardIndex: () => guardIndex,
  interleave: () => interleave,
  intersection: () => intersection,
  max: () => max,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  mergeByKey: () => mergeByKey2,
  min: () => min,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  randomElement: () => randomElement,
  randomElementWeightedSource: () => randomElementWeightedSource,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  reducePairwise: () => reducePairwise,
  remove: () => remove,
  sample: () => sample,
  shuffle: () => shuffle,
  sortByNumericProperty: () => sortByNumericProperty,
  total: () => total,
  totalFast: () => totalFast,
  unique: () => unique,
  until: () => until,
  validNumbers: () => validNumbers,
  valuesEqual: () => valuesEqual,
  weight: () => weight,
  without: () => without,
  withoutUndefined: () => withoutUndefined,
  zip: () => zip
});

// src/collections/Map/MapFns.ts
var getClosestIntegerKey = (data, target) => {
  target = Math.round(target);
  if (data.has(target)) {
    return target;
  } else {
    let offset = 1;
    while (offset < 1e3) {
      if (data.has(target - offset))
        return target - offset;
      else if (data.has(target + offset))
        return target + offset;
      offset++;
    }
    throw new Error(`Could not find target ${target}`);
  }
};
var hasKeyValue = (map, key, value, comparer) => {
  if (!map.has(key))
    return false;
  const values = [...map.values()];
  return values.some((v) => comparer(v, value));
};
var deleteByValue = (map, value, comparer = isEqualDefault) => {
  for (const entry of Object.entries(map)) {
    if (comparer(entry[1], value)) {
      map.delete(entry[0]);
    }
  }
};
var firstEntryByIterablePredicate = (map, predicate) => {
  for (const e of map.entries()) {
    if (predicate(e[1], e[0]))
      return e;
  }
};
var firstEntryByIterableValue = (map, value, isEqual = isEqualDefault) => {
  for (const entry of map.entries()) {
    if (isEqual(entry[1], value))
      return entry;
  }
};
var addKeepingExisting = (set, hasher, ...values) => {
  const s = set === void 0 ? /* @__PURE__ */ new Map() : new Map(set);
  for (const v of values) {
    const hashResult = hasher(v);
    if (s.has(hashResult))
      continue;
    s.set(hashResult, v);
  }
  return s;
};
var sortByValue = (map, comparer) => {
  const f = comparer ?? defaultComparer;
  [...map.entries()].sort((a, b) => f(a[1], b[1]));
};
var sortByValueProperty = (map, prop, compareFn) => {
  const cfn = typeof compareFn === `undefined` ? defaultComparer : compareFn;
  return [...map.entries()].sort((aE, bE) => {
    const a = aE[1];
    const b = bE[1];
    return cfn(a[prop], b[prop]);
  });
};
var hasAnyValue = (map, value, comparer) => {
  const entries = Array.from(map.entries());
  return entries.some((kv) => comparer(kv[1], value));
};
function* filter(map, predicate) {
  for (const v of map.values()) {
    if (predicate(v))
      yield v;
  }
}
var toArray = (map) => Array.from(map.values());
var fromIterable = (data, keyFn = toStringDefault, allowOverwrites = false) => {
  const m = /* @__PURE__ */ new Map();
  for (const d of data) {
    const id = keyFn(d);
    if (m.has(id) && !allowOverwrites) {
      throw new Error(
        `id ${id} is already used and new data will overwrite it. `
      );
    }
    m.set(id, d);
  }
  return m;
};
var fromObject = (data) => {
  const map = /* @__PURE__ */ new Map();
  if (Array.isArray(data)) {
    data.forEach((d) => addObject(map, d));
  } else {
    addObject(map, data);
  }
  return map;
};
var addObject = (map, data) => {
  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    map.set(key, value);
  }
};
var find = (map, predicate) => Array.from(map.values()).find(predicate);
var mapToObjTransform = (m, valueTransform) => Array.from(m).reduce((obj, [key, value]) => {
  const t = valueTransform(value);
  obj[key] = t;
  return obj;
}, {});
var zipKeyValue = (keys, values) => {
  if (keys.length !== values.length) {
    throw new Error(`Keys and values arrays should be same length`);
  }
  return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
};
var transformMap = (source, transformer) => new Map(Array.from(source, (v) => [v[0], transformer(v[1], v[0])]));
var toObject = (m) => Array.from(m).reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});
var mapToArray = (m, transformer) => Array.from(m.entries()).map((x) => transformer(x[0], x[1]));
var mergeByKey = (reconcile, ...maps) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of maps) {
    for (const [mk, mv] of m) {
      let v = result.get(mk);
      if (v) {
        v = reconcile(v, mv);
      } else {
        v = mv;
      }
      result.set(mk, v);
    }
  }
  return result;
};

// src/random/WeightedIndex.ts
var weightedIndex = (weightings, rand = defaultRandom) => {
  const precompute = [];
  let total2 = 0;
  for (let index = 0; index < weightings.length; index++) {
    total2 += weightings[index];
    precompute[index] = total2;
  }
  if (total2 !== 1)
    throw new Error(`Weightings should add up to 1. Got: ${total2}`);
  return () => {
    const v = rand();
    for (let index = 0; index < precompute.length; index++) {
      if (v <= precompute[index])
        return index;
    }
    throw new Error(`Bug: weightedIndex could not select index`);
  };
};

// src/collections/GuardArray.ts
var guardArray = (array, name = `?`) => {
  if (array === void 0) {
    throw new TypeError(`Param '${name}' is undefined. Expected array.`);
  }
  if (array === null) {
    throw new TypeError(`Param '${name}' is null. Expected array.`);
  }
  if (!Array.isArray(array)) {
    throw new TypeError(`Param '${name}' not an array as expected`);
  }
};

// src/collections/GuardIndex.ts
var guardIndex = (array, index, name = `index`) => {
  guardArray(array);
  throwIntegerTest(index, `positive`, name);
  if (index > array.length - 1) {
    throw new Error(
      `'${name}' ${index} beyond array max of ${array.length - 1}`
    );
  }
};

// src/collections/arrays/ValuesEqual.ts
var valuesEqual = (array, equality) => {
  if (!Array.isArray(array))
    throw new Error(`Param 'array' is not an array.`);
  if (array.length === 0)
    return true;
  const eq = equality ?? isEqualValueDefault;
  const a = array[0];
  const r = array.some((v) => !eq(a, v));
  if (r)
    return false;
  return true;
};

// src/iterable/SliceSync.ts
function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.iterator]();
  for (; start > 0; start--, end--)
    iit.next();
  for (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}

// src/collections/FilterBetween.ts
var filterBetween = (array, predicate, startIndex, endIndex) => {
  guardArray(array);
  if (typeof startIndex === `undefined`)
    startIndex = 0;
  if (typeof endIndex === `undefined`)
    endIndex = array.length;
  guardIndex(array, startIndex, `startIndex`);
  guardIndex(array, endIndex - 1, `endIndex`);
  const t = [];
  for (let index = startIndex; index < endIndex; index++) {
    if (predicate(array[index], index, array))
      t.push(array[index]);
  }
  return t;
};

// src/collections/MinMaxAvg.ts
var minMaxAvg = (data, opts = {}) => {
  if (data === void 0)
    throw new Error(`'data' is undefined`);
  if (!Array.isArray(data)) {
    if (`next` in data) {
      if (opts.startIndex || opts.endIndex) {
        data = slice(data, opts.startIndex, opts.endIndex);
      }
      let total3 = 0;
      let min3 = Number.MAX_SAFE_INTEGER;
      let max3 = Number.MIN_SAFE_INTEGER;
      let samples = 0;
      for (const v of data) {
        if (typeof v !== `number`) {
          throw new TypeError(`Generator should yield numbers. Got: ${typeof v}`);
        }
        total3 += v;
        samples++;
        min3 = Math.min(min3, v);
        max3 = Math.max(max3, v);
      }
      return {
        avg: total3 / samples,
        total: total3,
        max: max3,
        min: min3
      };
    } else {
      throw new Error(`'data' parameter is neither array or iterable`);
    }
  }
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  const startIndex = opts.startIndex ?? 0;
  const endIndex = opts.endIndex ?? data.length;
  const validNumbers2 = filterBetween(
    data,
    (d) => typeof d === `number` && !Number.isNaN(d),
    startIndex,
    endIndex
  );
  const total2 = validNumbers2.reduce((accumulator, v) => accumulator + v, 0);
  return {
    total: total2,
    max: Math.max(...validNumbers2),
    min: Math.min(...validNumbers2),
    avg: total2 / validNumbers2.length
  };
};

// src/collections/arrays/NumericArrays.ts
var weight = (data, fn) => {
  const f = fn ?? ((x) => x);
  return validNumbers(data).map(
    (v, index) => v * f(index / (validNumbers.length - 1))
  );
};
var validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
var dotProduct = (values) => {
  let r = 0;
  const length = values[0].length;
  for (let index = 0; index < length; index++) {
    let t = 0;
    for (const [p, value] of values.entries()) {
      if (p === 0)
        t = value[index];
      else {
        t *= value[index];
      }
    }
    r += t;
  }
  return r;
};
var average = (data) => {
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  const valid = validNumbers(data);
  const total2 = valid.reduce((accumulator, v) => accumulator + v, 0);
  return total2 / valid.length;
};
var min = (data) => Math.min(...validNumbers(data));
var maxIndex = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value > array[bestIndex] ? index : bestIndex,
    0
  )
);
var minIndex = (...data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value < array[bestIndex] ? index : bestIndex,
    0
  )
);
var max = (data) => Math.max(...validNumbers(data));
var total = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce((previous, current) => {
    if (typeof current !== `number`)
      return previous;
    if (Number.isNaN(current))
      return previous;
    if (Number.isFinite(current))
      return previous;
    return previous + current;
  }, 0)
);
var maxFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.max(m, datum);
  }
  return m;
};
var totalFast = (data) => {
  let m = 0;
  for (const datum of data) {
    m += datum;
  }
  return m;
};
var minFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.min(m, datum);
  }
  return m;
};

// src/collections/ArrayCycle.ts
var cycle = (options) => {
  const opts = [...options];
  let index = 0;
  const next2 = () => {
    index++;
    if (index === opts.length)
      index = 0;
    return value();
  };
  const prev = () => {
    index--;
    if (index === -1)
      index = opts.length - 1;
    return value();
  };
  const value = () => {
    return opts.at(index);
  };
  const select = (indexOrValue) => {
    if (typeof indexOrValue === `number`) {
      index = indexOrValue;
    } else {
      const found = opts.indexOf(indexOrValue);
      if (found === -1)
        throw new Error(`Could not find value`);
      index = found;
    }
  };
  const toArray2 = () => [...opts];
  return { toArray: toArray2, next: next2, prev, get current() {
    return value();
  }, select };
};

// src/collections/arrays/Zip.ts
var zip = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!valuesEqual(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length = lengths[0];
  for (let index = 0; index < length; index++) {
    returnValue.push(arrays.map((a) => a[index]));
  }
  return returnValue;
};

// src/modulation/Easing.ts
var Easing_exports = {};
__export(Easing_exports, {
  crossfade: () => crossfade,
  fromCubicBezier: () => fromCubicBezier,
  functions: () => functions,
  gaussian: () => gaussian,
  get: () => get,
  getEasings: () => getEasings,
  mix: () => mix,
  tick: () => tick,
  time: () => time,
  weightedAverage: () => weightedAverage
});

// src/data/Wrap.ts
var wrapInteger = (v, min3 = 0, max3 = 360) => {
  throwIntegerTest(v, void 0, `v`);
  throwIntegerTest(min3, void 0, `min`);
  throwIntegerTest(max3, void 0, `max`);
  if (v === min3)
    return min3;
  if (v === max3)
    return min3;
  if (v > 0 && v < min3)
    v += min3;
  v -= min3;
  max3 -= min3;
  v = v % max3;
  if (v < 0)
    v = max3 - Math.abs(v) + min3;
  return v + min3;
};
var wrap = (v, min3 = 0, max3 = 1) => {
  throwNumberTest(v, ``, `min`);
  throwNumberTest(min3, ``, `min`);
  throwNumberTest(max3, ``, `max`);
  if (v === min3)
    return min3;
  if (v === max3)
    return min3;
  while (v <= min3 || v >= max3) {
    if (v === max3)
      break;
    if (v === min3)
      break;
    if (v > max3) {
      v = min3 + (v - max3);
    } else if (v < min3) {
      v = max3 - (min3 - v);
    }
  }
  return v;
};
var wrapRange = (min3, max3, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max3 - a + b);
  const distBWrap = Math.abs(a + (360 - b));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) {
    r = a - fn(distMin);
  } else if (distMin === distFwrap) {
    r = a + fn(distMin);
  } else {
    if (a > b) {
      r = a - fn(distMin);
    } else {
      r = a + fn(distMin);
    }
  }
  return wrapInteger(r, min3, max3);
};

// src/data/Interpolate.ts
var piPi = Math.PI * 2;
var interpolate = (amount, a, b) => {
  const v = (1 - amount) * a + amount * b;
  return v;
};
var interpolateAngle = (amount, aRadians, bRadians) => {
  const t = wrap(bRadians - aRadians, 0, piPi);
  return interpolate(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t));
};

// src/flow/index.ts
var flow_exports = {};
__export(flow_exports, {
  DispatchList: () => DispatchList,
  Elapsed: () => Elapsed_exports,
  StateMachine: () => StateMachine_exports,
  TaskQueue: () => TaskQueue,
  continuously: () => continuously,
  debounce: () => debounce,
  delay: () => delay,
  delayLoop: () => delayLoop,
  everyNth: () => everyNth,
  forEach: () => forEach,
  forEachAsync: () => forEachAsync,
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  hasElapsedMs: () => hasElapsedMs,
  interval: () => interval,
  intervalToMs: () => intervalToMs,
  isInterval: () => isInterval,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  repeat: () => repeat,
  repeatReduce: () => repeatReduce,
  retry: () => retry,
  runOnce: () => runOnce,
  sleep: () => sleep,
  throttle: () => throttle,
  ticksElapsedTimer: () => ticksElapsedTimer,
  timeout: () => timeout,
  updateOutdated: () => updateOutdated,
  waitFor: () => waitFor
});

// src/flow/Elapsed.ts
var Elapsed_exports = {};
__export(Elapsed_exports, {
  infinity: () => infinity,
  once: () => once,
  progress: () => progress,
  since: () => since,
  toString: () => toString
});

// src/numbers/Round.ts
function round(a, b) {
  throwFromResult(integerTest(a, `positive`, `decimalPlaces`));
  let rounder;
  if (a === 0)
    rounder = Math.round;
  else {
    const p = Math.pow(10, a);
    rounder = (v) => Math.floor(v * p) / p;
  }
  return b === void 0 ? rounder : rounder(b);
}

// src/flow/Timer.ts
var Timer_exports = {};
__export(Timer_exports, {
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  hasElapsedMs: () => hasElapsedMs,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  ticksElapsedTimer: () => ticksElapsedTimer
});

// src/data/Clamp.ts
var clamp = (value, min3 = 0, max3 = 1) => {
  if (Number.isNaN(value))
    throw new Error(`'value' parameter is NaN`);
  if (Number.isNaN(min3))
    throw new Error(`'min' parameter is NaN`);
  if (Number.isNaN(max3))
    throw new Error(`'max' parameter is NaN`);
  if (value < min3)
    return min3;
  if (value > max3)
    return max3;
  return value;
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v)) {
    throw new TypeError(`v parameter must be an integer (${v})`);
  }
  const length = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length)) {
    throw new TypeError(
      `length parameter must be an integer (${length}, ${typeof length})`
    );
  }
  v = Math.round(v);
  if (v < 0)
    return 0;
  if (v >= length)
    return length - 1;
  return v;
};

// src/flow/Timer.ts
function hasElapsedMs(totalMs) {
  const t = relativeTimer(totalMs, { timer: msElapsedTimer() });
  return () => t.isDone;
}
var frequencyTimerSource = (frequency) => () => frequencyTimer(frequency, { timer: msElapsedTimer() });
var relativeTimer = (total2, opts = {}) => {
  const timer = opts.timer ?? msElapsedTimer();
  const clampValue = opts.clampValue ?? false;
  const wrapValue = opts.wrapValue ?? false;
  if (clampValue && wrapValue)
    throw new Error(`clampValue and wrapValue cannot both be enabled`);
  let done2 = false;
  let modulationAmount = 1;
  return {
    mod(amt) {
      modulationAmount = amt;
    },
    get isDone() {
      return done2;
    },
    reset: () => {
      done2 = false;
      timer.reset();
    },
    get elapsed() {
      let v = timer.elapsed / (total2 * modulationAmount);
      if (clampValue)
        v = clamp(v);
      else if (wrapValue) {
        if (v >= 1)
          v = v % 1;
      } else {
        if (v >= 1)
          done2 = true;
      }
      return v;
    }
  };
};
var frequencyTimer = (frequency, opts = {}) => {
  const timer = opts.timer ?? msElapsedTimer();
  const cyclesPerSecond = frequency / 1e3;
  let modulationAmount = 1;
  return {
    mod: (amt) => {
      modulationAmount = amt;
    },
    reset: () => {
      timer.reset();
    },
    get elapsed() {
      const v = timer.elapsed * (cyclesPerSecond * modulationAmount);
      const f = v - Math.floor(v);
      if (f < 0) {
        throw new Error(
          `Unexpected cycle fraction less than 0. Elapsed: ${v} f: ${f}`
        );
      }
      if (f > 1) {
        throw new Error(
          `Unexpected cycle fraction more than 1. Elapsed: ${v} f: ${f}`
        );
      }
      return f;
    }
  };
};
var msElapsedTimer = () => {
  let start = performance.now();
  return {
    reset: () => {
      start = performance.now();
    },
    get elapsed() {
      return performance.now() - start;
    }
  };
};
var ticksElapsedTimer = () => {
  let start = 0;
  return {
    reset: () => {
      start = 0;
    },
    get elapsed() {
      return ++start;
    }
  };
};

// src/flow/Elapsed.ts
var since = () => {
  const start = performance.now();
  return () => {
    return performance.now() - start;
  };
};
var once = () => {
  const start = Date.now();
  let stoppedAt = 0;
  return () => {
    if (stoppedAt === 0) {
      stoppedAt = Date.now() - start;
    }
    return stoppedAt;
  };
};
var infinity = () => {
  return () => {
    return Number.POSITIVE_INFINITY;
  };
};
function progress(duration, opts = {}) {
  const totalMs = intervalToMs(duration);
  if (!totalMs)
    throw new Error(`duration invalid`);
  const timerOpts = {
    ...opts,
    timer: msElapsedTimer()
  };
  const t = relativeTimer(totalMs, timerOpts);
  return () => t.elapsed;
}
var toString = (millisOrFunction, rounding = 2) => {
  let interval2 = {} = 0;
  if (typeof millisOrFunction === `function`) {
    const intervalResult = millisOrFunction();
    return toString(intervalResult);
  } else if (typeof millisOrFunction === `number`) {
    interval2 = millisOrFunction;
  } else if (typeof millisOrFunction === `object`) {
    interval2 = intervalToMs(interval2);
  }
  let ms = intervalToMs(interval2);
  if (typeof ms === `undefined`)
    return `(undefined)`;
  if (ms < 1e3)
    return `${round(rounding, ms)}ms`;
  ms /= 1e3;
  if (ms < 120)
    return `${ms.toFixed(1)}secs`;
  ms /= 60;
  if (ms < 60)
    return `${ms.toFixed(2)}mins`;
  ms /= 60;
  return `${ms.toFixed(2)}hrs`;
};

// src/flow/DispatchList.ts
var DispatchList = class {
  #handlers;
  #counter = 0;
  #id = Math.floor(Math.random() * 100);
  constructor() {
    this.#handlers = [];
  }
  /**
   * Returns _true_ if list is empty
   * @returns 
   */
  isEmpty() {
    return this.#handlers.length === 0;
  }
  /**
   * Adds a handler
   * @param handler 
   * @param options 
   * @returns 
   */
  add(handler, options = {}) {
    this.#counter++;
    const once2 = options.once ?? false;
    const wrap2 = {
      id: this.#id + `-` + this.#counter,
      handler,
      once: once2
    };
    this.#handlers.push(wrap2);
    return wrap2.id;
  }
  remove(id) {
    const length = this.#handlers.length;
    this.#handlers = this.#handlers.filter((handler) => handler.id !== id);
    return this.#handlers.length !== length;
  }
  notify(value) {
    for (const handler of this.#handlers) {
      handler.handler(value);
      if (handler.once) {
        this.remove(handler.id);
      }
    }
  }
  clear() {
    this.#handlers = [];
  }
};

// src/flow/Interval.ts
var interval = async function* (produce, optsOrFixedMs = {}) {
  let cancelled = false;
  const opts = typeof optsOrFixedMs === `number` ? { fixed: optsOrFixedMs } : optsOrFixedMs;
  const signal = opts.signal;
  const when = opts.delay ?? `before`;
  let sleepMs = intervalToMs(opts.fixed) ?? intervalToMs(opts.minimum, 0);
  let started = performance.now();
  const minIntervalMs = opts.minimum ? intervalToMs(opts.minimum) : void 0;
  const doDelay = async () => {
    const elapsed = performance.now() - started;
    if (typeof minIntervalMs !== `undefined`) {
      sleepMs = Math.max(0, minIntervalMs - elapsed);
    }
    if (sleepMs) {
      await sleep({ millis: sleepMs, signal });
    }
    started = performance.now();
    if (signal?.aborted)
      throw new Error(`Signal aborted ${signal.reason}`);
  };
  if (Array.isArray(produce))
    produce = produce.values();
  const isGenerator = typeof produce === `object` && `next` in produce && typeof produce.next === `function`;
  try {
    while (!cancelled) {
      if (when === `before`)
        await doDelay();
      if (typeof produce === `function`) {
        const result = await produce();
        if (typeof result === `undefined`)
          return;
        yield result;
      } else if (isGenerator) {
        const result = await produce.next();
        if (result.done)
          return;
        yield result.value;
      } else {
        throw new Error(
          `produce param does not seem to return a value/Promise and is not a generator?`
        );
      }
      if (when === `after`)
        await doDelay();
    }
  } finally {
    cancelled = true;
  }
};

// src/flow/Timeout.ts
var timeout = (callback, interval2) => {
  if (callback === void 0) {
    throw new Error(`callback parameter is undefined`);
  }
  const intervalMs = intervalToMs(interval2);
  throwIntegerTest(intervalMs, `aboveZero`, `interval`);
  let timer = 0;
  let startedAt = 0;
  const start = async (altInterval = interval2, args) => {
    const p = new Promise((resolve, reject) => {
      startedAt = performance.now();
      const altTimeoutMs = intervalToMs(altInterval);
      const it = integerTest(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
      if (!it[0]) {
        reject(it[1]);
        return;
      }
      if (timer !== 0)
        cancel();
      timer = window.setTimeout(async () => {
        const args_ = args ?? [];
        await callback(performance.now() - startedAt, ...args_);
        timer = 0;
        resolve();
      }, altTimeoutMs);
    });
    return p;
  };
  const cancel = () => {
    if (timer === 0)
      return;
    startedAt = 0;
    window.clearTimeout(timer);
  };
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    start,
    cancel,
    get isDone() {
      return timer !== 0;
    }
  };
};

// src/flow/UpdateOutdated.ts
var updateOutdated = (fn, intervalMs, updateFail = `slow`) => {
  let lastRun = 0;
  let lastValue;
  let intervalMsCurrent = intervalMs;
  return () => new Promise(async (resolve, reject) => {
    const elapsed = performance.now() - lastRun;
    if (lastValue === void 0 || elapsed > intervalMsCurrent) {
      try {
        lastRun = performance.now();
        lastValue = await fn(elapsed);
        intervalMsCurrent = intervalMs;
      } catch (ex) {
        if (updateFail === `fast`) {
          lastValue = void 0;
          lastRun = 0;
        } else if (updateFail === `backoff`) {
          intervalMsCurrent = Math.floor(intervalMsCurrent * 1.2);
        }
        reject(ex);
        return;
      }
    }
    resolve(lastValue);
  });
};

// src/flow/Continuously.ts
var raf = typeof window !== `undefined` ? (cb) => window.requestAnimationFrame(cb) : (cb) => window.setTimeout(cb, 1);
var continuously = (callback, interval2, opts = {}) => {
  let intervalMs = intervalToMs(interval2, 0);
  throwIntegerTest(intervalMs, `positive`, `interval`);
  const fireBeforeWait = opts.fireBeforeWait ?? false;
  const onStartCalled = opts.onStartCalled;
  let disposed = false;
  let running = false;
  let ticks = 0;
  let startedAt = performance.now();
  let intervalUsed = interval2 ?? 0;
  let currentTimer = 0;
  const schedule = intervalMs === 0 ? raf : (cb) => window.setTimeout(cb, intervalMs);
  const deschedule = intervalMs === 0 ? (_) => {
  } : (timer) => window.clearTimeout(timer);
  const cancel = () => {
    if (!running)
      return;
    running = false;
    ticks = 0;
    if (currentTimer !== 0)
      deschedule(currentTimer);
    currentTimer = 0;
  };
  const loop = async () => {
    if (!running)
      return;
    const valOrPromise = callback(ticks++, performance.now() - startedAt);
    let val;
    if (typeof valOrPromise === `object`) {
      val = await valOrPromise;
    } else {
      val = valOrPromise;
    }
    if (val !== void 0 && !val) {
      cancel();
      return;
    }
    currentTimer = schedule(loop);
  };
  const start = () => {
    if (disposed)
      throw new Error(`Disposed`);
    if (onStartCalled !== void 0) {
      const doWhat = onStartCalled(ticks, performance.now() - startedAt);
      if (doWhat === `cancel`) {
        cancel();
        return;
      } else if (doWhat === `reset`) {
        reset2();
        return;
      } else if (doWhat === `dispose`) {
        disposed = true;
        cancel();
        return;
      }
    }
    if (!running) {
      startedAt = performance.now();
      running = true;
      if (fireBeforeWait) {
        loop();
      } else {
        currentTimer = schedule(loop);
      }
    }
  };
  const reset2 = () => {
    if (disposed)
      throw new Error(`Disposed`);
    if (running) {
      cancel();
    }
    start();
  };
  return {
    start,
    reset: reset2,
    cancel,
    get interval() {
      return intervalUsed;
    },
    set interval(interval3) {
      const ms = intervalToMs(interval3, 0);
      throwIntegerTest(ms, `positive`, `interval`);
      intervalMs = ms;
      intervalUsed = interval3;
    },
    get isDone() {
      return !running;
    },
    get isDisposed() {
      return disposed;
    },
    get ticks() {
      return ticks;
    },
    get elapsedMs() {
      return performance.now() - startedAt;
    }
  };
};

// src/flow/Debounce.ts
var debounce = (callback, timeoutMs) => {
  const t = timeout(callback, timeoutMs);
  return (...args) => t.start(void 0, args);
};

// src/flow/Throttle.ts
var throttle = (callback, intervalMinMs) => {
  let trigger = 0;
  return async (...args) => {
    const elapsed = performance.now() - trigger;
    if (elapsed >= intervalMinMs) {
      const r = callback(elapsed, ...args);
      if (typeof r === `object`)
        await r;
      trigger = performance.now();
    }
  };
};

// src/flow/WaitFor.ts
var waitFor = (timeoutMs, onAborted, onComplete) => {
  let success = false;
  const done2 = (error) => {
    if (t !== 0) {
      window.clearTimeout(t);
      t = 0;
    }
    if (error) {
      onAborted(error);
    } else {
      success = true;
    }
    if (onComplete !== void 0)
      onComplete(success);
  };
  let t = window.setTimeout(() => {
    t = 0;
    try {
      onAborted(`Timeout after ${timeoutMs}ms`);
    } finally {
      if (onComplete !== void 0)
        onComplete(success);
    }
  }, timeoutMs);
  return done2;
};

// src/flow/Delay.ts
var delay = async (callback, optsOrMillis) => {
  const opts = typeof optsOrMillis === `number` ? { millis: optsOrMillis } : optsOrMillis;
  const delayWhen = opts.delay ?? `before`;
  if (delayWhen === `before` || delayWhen === `both`) {
    await sleep(opts);
  }
  const r = Promise.resolve(await callback());
  if (delayWhen === `after` || delayWhen === `both`) {
    await sleep(opts);
  }
  return r;
};
async function* delayAnimationLoop() {
  let resolve;
  let p = new Promise((r) => resolve = r);
  let timer = 0;
  const callback = () => {
    resolve();
    p = new Promise((r) => resolve = r);
  };
  try {
    while (true) {
      timer = window.requestAnimationFrame(callback);
      yield await p;
    }
  } finally {
    resolve();
    window.cancelAnimationFrame(timer);
  }
}
async function* delayLoop(timeout2) {
  const timeoutMs = intervalToMs(timeout2);
  if (typeof timeoutMs === `undefined`)
    throw new Error(`timeout is undefined`);
  if (timeoutMs < 0)
    throw new Error(`Timeout is less than zero`);
  if (timeoutMs === 0)
    return yield* delayAnimationLoop();
  let resolve;
  let p = new Promise((r) => resolve = r);
  let timer = 0;
  const callback = () => {
    resolve();
    p = new Promise((r) => resolve = r);
  };
  try {
    while (true) {
      timer = window.setTimeout(callback, timeoutMs);
      yield await p;
    }
  } finally {
    resolve();
    window.clearTimeout(timer);
  }
}

// src/flow/Every.ts
var everyNth = (nth, callback) => {
  throwIntegerTest(nth, `positive`, `nth`);
  let counter = 0;
  return (...args) => {
    if (++counter === nth) {
      counter = 0;
      if (callback)
        callback(...args);
      return true;
    }
    return false;
  };
};

// src/flow/RunOnce.ts
var runOnce = (onRun) => {
  let run2 = false;
  let success = false;
  return () => {
    if (run2)
      return success;
    run2 = true;
    success = onRun();
    return success;
  };
};

// src/flow/Retry.ts
var retry = async (callback, opts) => {
  const signal = opts.abort;
  const log = resolveLogOption(opts.log);
  const power = opts.power ?? 1.1;
  const predelayMs = opts.predelayMs ?? 0;
  const startedAt = since();
  let t = opts.startMs ?? 1e3;
  const count = opts.count;
  let attempts = 0;
  throwIntegerTest(count, `aboveZero`, `count`);
  if (t <= 0)
    throw new Error(`startMs must be above zero`);
  if (predelayMs > 0)
    await sleep({ millis: predelayMs, signal });
  if (signal?.aborted) {
    return {
      success: false,
      attempts,
      value: opts.defaultValue,
      elapsed: startedAt(),
      message: `Aborted during predelay`
    };
  }
  while (attempts < count) {
    attempts++;
    const callbackResult = await callback();
    if (callbackResult !== void 0) {
      return { value: callbackResult, success: true, attempts, elapsed: startedAt() };
    }
    log({
      msg: `retry attempts: ${attempts} t: ${toString(t)}`
    });
    if (attempts >= count) {
      break;
    }
    try {
      await sleep({ millis: t, signal });
    } catch (error) {
      return {
        success: false,
        attempts,
        value: opts.defaultValue,
        message: getErrorMessage(error),
        elapsed: startedAt()
      };
    }
    t = Math.floor(Math.pow(t, power));
  }
  return {
    message: `Giving up after ${attempts} attempts.`,
    success: false,
    attempts,
    value: opts.defaultValue,
    elapsed: startedAt()
  };
};

// src/collections/queue/QueueFns.ts
var trimQueue = (opts, queue, toAdd) => {
  const potentialLength = queue.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  switch (policy) {
    case `additions`: {
      if (queue.length === 0)
        return toAdd.slice(0, toAdd.length - toRemove);
      if (queue.length === opts.capacity) {
        return queue;
      } else {
        return [...queue, ...toAdd.slice(0, toRemove - 1)];
      }
    }
    case `newer`: {
      if (toRemove >= queue.length) {
        if (queue.length === 0) {
          return [...toAdd.slice(0, capacity - 1), toAdd.at(-1)];
        }
        return toAdd.slice(
          Math.max(0, toAdd.length - capacity),
          Math.min(toAdd.length, capacity) + 1
        );
      } else {
        const countToAdd = Math.max(1, toAdd.length - queue.length);
        const toAddFinal = toAdd.slice(toAdd.length - countToAdd, toAdd.length);
        const toKeep = queue.slice(0, Math.min(queue.length, capacity - 1));
        const t = [...toKeep, ...toAddFinal];
        return t;
      }
    }
    case `older`: {
      return [...queue, ...toAdd].slice(toRemove);
    }
    default: {
      throw new Error(`Unknown overflow policy ${policy}`);
    }
  }
};
var enqueue = (opts, queue, ...toAdd) => {
  if (opts === void 0)
    throw new Error(`opts parameter undefined`);
  const potentialLength = queue.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimQueue(opts, queue, toAdd) : [...queue, ...toAdd];
  if (opts.capacity && toReturn.length !== opts.capacity && overSize) {
    throw new Error(
      `Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`
    );
  }
  if (!opts.capacity && toReturn.length !== potentialLength) {
    throw new Error(
      `Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`
    );
  }
  return toReturn;
};
var dequeue = (opts, queue) => {
  if (queue.length === 0)
    throw new Error(`Queue is empty`);
  return queue.slice(1);
};
var peek = (opts, queue) => queue[0];
var isEmpty = (opts, queue) => queue.length === 0;
var isFull = (opts, queue) => {
  if (opts.capacity) {
    return queue.length >= opts.capacity;
  }
  return false;
};

// src/collections/queue/QueueMutable.ts
var QueueMutable = class {
  opts;
  // eslint-disable-next-line functional/prefer-readonly-type
  data;
  eq;
  constructor(opts = {}, data = []) {
    if (opts === void 0)
      throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
    this.eq = opts.eq ?? isEqualDefault;
  }
  clear() {
    this.data = [];
  }
  /**
   * Return a copy of the array
   * @returns 
   */
  toArray() {
    return [...this.data];
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  dequeue() {
    const v = peek(this.opts, this.data);
    if (v === void 0)
      return;
    this.data = dequeue(this.opts, this.data);
    return v;
  }
  /**
   * Remove item from queue, regardless of position.
   * Returns _true_ if something was removed.
   * @param v 
   */
  remove(v, comparer) {
    const length = this.data.length;
    this.data = without(this.data, v, comparer ?? this.eq);
    return this.data.length !== length;
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek(this.opts, this.data);
  }
};
function mutable(opts = {}, ...startingItems) {
  return new QueueMutable({ ...opts }, [...startingItems]);
}

// src/flow/TaskQueue.ts
var TaskQueue = class _TaskQueue {
  static instance = new _TaskQueue();
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  _timer = 0;
  _queue;
  _startDelayMs;
  _intervalMs;
  constructor(opts = {}) {
    this._startDelayMs = opts.startDelayMs ?? 500;
    this._intervalMs = opts.intervalMs ?? 100;
    this._queue = new QueueMutable();
  }
  /**
   * Adds a task. This triggers processing loop if not already started.
   *
   * ```js
   * queue.add(async () => {
   *  await sleep(1000);
   * });
   * ```
   * @param task Task to run
   */
  add(task) {
    this._queue.enqueue(task);
    if (this._timer === 0)
      this.schedule(this._startDelayMs);
  }
  schedule(intervalMs) {
    if (this._queue.length === 0) {
      this._timer = 0;
      return;
    }
    if (this._timer !== 0) {
      return;
    }
    this._timer = setTimeout(() => {
      this.processQueue();
    }, intervalMs);
  }
  async processQueue() {
    const task = this._queue.dequeue();
    this._timer = 0;
    if (task !== void 0) {
      try {
        await task();
        this._timer = 0;
        this.schedule(this._intervalMs);
      } catch (ex) {
        console.error(ex);
      }
    }
  }
};

// src/flow/index.ts
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
function* repeat(countOrPredicate, fn) {
  let repeats, valuesProduced;
  repeats = valuesProduced = 0;
  if (typeof countOrPredicate === `number`) {
    throwNumberTest(countOrPredicate, `positive`, `countOrPredicate`);
    while (countOrPredicate-- > 0) {
      repeats++;
      const v = fn(repeats, valuesProduced);
      if (v === void 0)
        continue;
      yield v;
      valuesProduced++;
    }
  } else if (typeof countOrPredicate === `function`) {
    while (countOrPredicate(repeats, valuesProduced)) {
      repeats++;
      const v = fn(repeats, valuesProduced);
      if (v === void 0)
        continue;
      yield v;
      valuesProduced++;
    }
  } else {
    throw new TypeError(
      `countOrPredicate should be a number or function. Got: ${typeof countOrPredicate}`
    );
  }
}
var repeatReduce = (countOrPredicate, fn, initial, reduce) => {
  if (typeof countOrPredicate === `number`) {
    throwNumberTest(countOrPredicate, `positive`, `countOrPredicate`);
    while (countOrPredicate-- > 0) {
      const v = fn();
      if (v === void 0)
        continue;
      initial = reduce(initial, v);
    }
  } else {
    let repeats, valuesProduced;
    repeats = valuesProduced = 0;
    while (countOrPredicate(repeats, valuesProduced)) {
      repeats++;
      const v = fn();
      if (v === void 0)
        continue;
      initial = reduce(initial, v);
      valuesProduced++;
    }
  }
  return initial;
};
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Flow: { StateMachine: StateMachine_exports, Timer: Timer_exports, forEach, forEachAsync, repeat }
    };
  }
} catch {
}

// src/modulation/Easing.ts
var sqrt = Math.sqrt;
var pow = Math.pow;
var cos = Math.cos;
var pi = Math.PI;
var sin = Math.sin;
var time = function(nameOrFunction, durationMs) {
  return create(nameOrFunction, durationMs, msElapsedTimer);
};
var tick = function(nameOrFunction, durationTicks) {
  return create(nameOrFunction, durationTicks, ticksElapsedTimer);
};
var create = function(nameOrFunction, duration, timerSource) {
  const fn = typeof nameOrFunction === `function` ? nameOrFunction : get(nameOrFunction);
  if (fn === void 0) {
    const error = typeof nameOrFunction === `string` ? new Error(`Easing function not found: ${nameOrFunction}`) : new Error(`Easing function not found`);
    throw error;
  }
  const timer = relativeTimer(duration, {
    timer: timerSource(),
    clampValue: true
  });
  return {
    get isDone() {
      return timer.isDone;
    },
    compute: () => {
      const relative = timer.elapsed;
      return fn(relative);
    },
    reset: () => {
      timer.reset();
    }
  };
};
var fromCubicBezier = (b, d) => (t) => {
  const s = 1 - t;
  const s2 = s * s;
  const t2 = t * t;
  const t3 = t2 * t;
  return 3 * b * s2 * t + 3 * d * s * t2 + t3;
};
var mix = (amt, balance, easingA, easingB) => interpolate(balance, easingA(amt), easingB(amt));
var crossfade = (amt, easingA, easingB) => mix(amt, amt, easingA, easingB);
var get = function(easingName) {
  if (easingName === null)
    throw new Error(`easingName is null`);
  if (easingName === void 0)
    throw new Error(`easingName is undefined`);
  const name = easingName.toLocaleLowerCase();
  const found = Object.entries(functions).find(
    ([k, _v]) => k.toLocaleLowerCase() === name
  );
  if (found === void 0)
    return found;
  return found[1];
};
function* getEasings() {
  yield* Object.keys(functions);
}
var gaussian = (standardDeviation = 0.4) => {
  const a = 1 / sqrt(2 * pi);
  const mean = 0.5;
  return (t) => {
    const f = a / standardDeviation;
    let p = -2.5;
    let c = (t - mean) / standardDeviation;
    c *= c;
    p *= c;
    const v = f * pow(Math.E, p);
    if (v > 1)
      return 1;
    if (v < 0)
      return 0;
    return v;
  };
};
var bounceOut = function(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var quintIn = (x) => x * x * x * x * x;
var quintOut = (x) => 1 - pow(1 - x, 5);
var arch = (x) => x * (1 - x) * 4;
var weightedAverage = (currentValue, targetValue, slowDownFactor) => {
  return (currentValue * (slowDownFactor - 1) + targetValue) / slowDownFactor;
};
var functions = {
  smoothstep: (x) => x * x * (3 - 2 * x),
  smootherstep: (x) => (x * (x * 6 - 15) + 10) * x * x * x,
  arch,
  bell: gaussian(),
  sineIn: (x) => 1 - cos(x * pi / 2),
  sineOut: (x) => sin(x * pi / 2),
  quadIn: (x) => x * x,
  quadOut: (x) => 1 - (1 - x) * (1 - x),
  sineInOut: (x) => -(cos(pi * x) - 1) / 2,
  quadInOut: (x) => x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2,
  cubicIn: (x) => x * x * x,
  cubicOut: (x) => 1 - pow(1 - x, 3),
  quartIn: (x) => x * x * x * x,
  quartOut: (x) => 1 - pow(1 - x, 4),
  quintIn,
  quintOut,
  //: (x: number): number => 1 - pow(1 - x, 5),
  expoIn: (x) => x === 0 ? 0 : pow(2, 10 * x - 10),
  expoOut: (x) => x === 1 ? 1 : 1 - pow(2, -10 * x),
  quintInOut: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2,
  expoInOut: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2,
  circIn: (x) => 1 - sqrt(1 - pow(x, 2)),
  circOut: (x) => sqrt(1 - pow(x - 1, 2)),
  backIn: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  backOut: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  circInOut: (x) => x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2,
  backInOut: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  elasticIn: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  elasticOut: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  bounceIn: (x) => 1 - bounceOut(1 - x),
  bounceOut,
  elasticInOut: (x) => {
    const c5 = 2 * pi / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
  },
  bounceInOut: (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
};

// src/collections/arrays/AverageWeighted.ts
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`)
    weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]],
    [0, 0]
  );
  return totalV / totalW;
};

// src/collections/Iterables.ts
var Iterables_exports = {};
__export(Iterables_exports, {
  compareValues: () => compareValues,
  compareValuesEqual: () => compareValuesEqual,
  max: () => max2,
  min: () => min2
});
var max2 = (iterable, scorer) => {
  let highestValue;
  let highestScore = Number.MIN_SAFE_INTEGER;
  for (const value of iterable) {
    const score = scorer(value);
    if (score >= highestScore) {
      highestScore = score;
      highestValue = value;
    }
  }
  return highestValue;
};
var min2 = (iterable, scorer) => {
  let lowestValue;
  let lowestScore = Number.MAX_SAFE_INTEGER;
  for (const value of iterable) {
    const score = scorer(value);
    if (score <= lowestScore) {
      lowestScore = score;
      lowestValue = value;
    }
  }
  return lowestValue;
};
var compareValuesEqual = (iterableA, iterableB, eq = isEqualDefault) => {
  const returnValue = compareValues(iterableA, iterableB, eq);
  return returnValue.a.length === 0 && returnValue.b.length === 0;
};
var compareValues = (a, b, eq = isEqualDefault) => {
  const shared = [];
  const aUnique = [];
  const bUnique = [];
  for (const element of a) {
    let seenInB = false;
    for (const element_ of b) {
      if (eq(element, element_)) {
        seenInB = true;
        break;
      }
    }
    if (seenInB) {
      shared.push(element);
    } else {
      aUnique.push(element);
    }
  }
  for (const element of b) {
    let seenInA = false;
    for (const element_ of a) {
      if (eq(element, element_)) {
        seenInA = true;
      }
    }
    if (!seenInA) {
      bUnique.push(element);
    }
  }
  return {
    shared,
    a: aUnique,
    b: bUnique
  };
};

// src/collections/arrays/index.ts
var intersection = (arrayA, arrayB, equality = isEqualDefault) => arrayA.filter((valueFromA) => arrayB.some((valueFromB) => equality(valueFromA, valueFromB)));
var flatten = (array) => [...array].flat();
var interleave = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!valuesEqual(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length = lengths[0];
  for (let index = 0; index < length; index++) {
    for (const array of arrays) {
      returnValue.push(array[index]);
    }
  }
  return returnValue;
};
var ensureLength = (data, length, expand = `undefined`) => {
  if (data === void 0)
    throw new Error(`Data undefined`);
  if (!Array.isArray(data))
    throw new Error(`data is not an array`);
  if (data.length === length)
    return [...data];
  if (data.length > length) {
    return data.slice(0, length);
  }
  const d = [...data];
  const add = length - d.length;
  for (let index = 0; index < add; index++) {
    switch (expand) {
      case `undefined`: {
        d.push(void 0);
        break;
      }
      case `repeat`: {
        d.push(data[index % data.length]);
        break;
      }
      case `first`: {
        d.push(data[0]);
        break;
      }
      case `last`: {
        d.push(data.at(-1));
        break;
      }
    }
  }
  return d;
};
var randomIndex = (array, rand = defaultRandom) => Math.floor(rand() * array.length);
var randomElementWeightedSource = (array, weightings, randomSource = defaultRandom) => {
  if (array.length !== weightings.length)
    throw new Error(`Lengths of 'array' and 'weightings' should be the same.`);
  const r = weightedIndex(weightings, randomSource);
  return () => {
    const index = r();
    return array[index];
  };
};
var randomElement = (array, rand = defaultRandom) => {
  guardArray(array, `array`);
  return array[Math.floor(rand() * array.length)];
};
var randomPluck = (array, mutate = false, rand = defaultRandom) => {
  if (array === void 0)
    throw new Error(`array is undefined`);
  if (!Array.isArray(array))
    throw new Error(`'array' param is not an array`);
  if (array.length === 0)
    return { value: void 0, array: [] };
  const index = randomIndex(array, rand);
  if (mutate) {
    return {
      value: array[index],
      //eslint-disable-next-line functional/immutable-data
      array: array.splice(index, 1)
    };
  } else {
    const t = [...array];
    t.splice(index, 1);
    return {
      value: array[index],
      array: t
    };
  }
};
var shuffle = (dataToShuffle, rand = defaultRandom) => {
  const array = [...dataToShuffle];
  for (let index = array.length - 1; index > 0; index--) {
    const index_ = Math.floor(rand() * (index + 1));
    [array[index], array[index_]] = [array[index_], array[index]];
  }
  return array;
};
var sortByNumericProperty = (data, propertyName) => [...data].sort((a, b) => {
  guardArray(data, `data`);
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv)
    return -1;
  if (av > bv)
    return 1;
  return 0;
});
var without = (sourceArray, toRemove, comparer = isEqualDefault) => {
  if (Array.isArray(toRemove)) {
    const returnArray = [];
    for (const source of sourceArray) {
      if (!toRemove.some((v) => comparer(source, v))) {
        returnArray.push(source);
      }
    }
    return returnArray;
  } else {
    return sourceArray.filter((v) => !comparer(v, toRemove));
  }
};
var withoutUndefined = (data) => {
  return data.filter((v) => v !== void 0);
};
var until = (data, predicate, initial) => {
  const returnValue = [];
  let total2 = initial;
  for (const datum of data) {
    const [stop, accumulator] = predicate(datum, total2);
    if (stop)
      break;
    total2 = accumulator;
    returnValue.push(datum);
  }
  return returnValue;
};
var remove = (data, index) => {
  if (!Array.isArray(data)) {
    throw new TypeError(`'data' parameter should be an array`);
  }
  guardIndex(data, index, `index`);
  return [...data.slice(0, index), ...data.slice(index + 1)];
};
var groupBy = (array, grouper) => {
  const map = /* @__PURE__ */ new Map();
  for (const a of array) {
    const key = grouper(a);
    let existing = map.get(key);
    if (!existing) {
      existing = [];
      map.set(key, existing);
    }
    existing.push(a);
  }
  return map;
};
var sample = (array, amount) => {
  let subsampleSteps = 1;
  if (amount <= 1) {
    const numberOfItems = array.length * amount;
    subsampleSteps = Math.round(array.length / numberOfItems);
  } else {
    subsampleSteps = amount;
  }
  throwIntegerTest(subsampleSteps, `positive`, `amount`);
  if (subsampleSteps > array.length - 1) {
    throw new Error(`Subsample steps exceeds array length`);
  }
  const r = [];
  for (let index = subsampleSteps - 1; index < array.length; index += subsampleSteps) {
    r.push(array[index]);
  }
  return r;
};
function chunks(array, size) {
  const output = [];
  for (let index = 0; index < array.length; index += size) {
    output.push(array.slice(index, index + size));
  }
  return output;
}
var mergeByKey2 = (keyFunction, reconcile, ...arrays) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of arrays) {
    for (const mv of m) {
      if (mv === void 0)
        continue;
      const mk = keyFunction(mv);
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return [...result.values()];
};
var reducePairwise = (array, reducer, initial) => {
  guardArray(array, `arr`);
  if (array.length < 2)
    return initial;
  for (let index = 0; index < array.length - 1; index++) {
    initial = reducer(initial, array[index], array[index + 1]);
  }
  return initial;
};
var filterAB = (data, filter2) => {
  const a = [];
  const b = [];
  for (const datum of data) {
    if (filter2(datum))
      a.push(datum);
    else
      b.push(datum);
  }
  return [a, b];
};
var unique = (arrays, comparer = isEqualDefault) => {
  const t = [];
  for (const a of arrays) {
    if (Array.isArray(a)) {
      for (const v of additionalValues(t, a, comparer)) {
        t.push(v);
      }
    } else {
      return [...additionalValues([], arrays, comparer)];
    }
  }
  return t;
};
var containsDuplicateValues = (array, keyFunction = toStringDefault) => {
  if (!Array.isArray(array))
    throw new Error(`Parameter needs to be an array`);
  try {
    const _ = fromIterable(array, keyFunction);
  } catch {
    return true;
  }
  return false;
};
var containsDuplicateInstances = (array) => {
  if (!Array.isArray(array))
    throw new Error(`Parameter needs to be an array`);
  for (let index = 0; index < array.length; index++) {
    for (let x = 0; x < array.length; x++) {
      if (index === x)
        continue;
      if (array[index] === array[x])
        return true;
    }
  }
  return false;
};
var contains = (haystack, needles, eq = isEqualDefault) => {
  if (!Array.isArray(haystack)) {
    throw new TypeError(`Expects haystack parameter to be an array`);
  }
  if (!Array.isArray(needles)) {
    throw new TypeError(`Expects needles parameter to be an array`);
  }
  for (const needle of needles) {
    let found = false;
    for (const element of haystack) {
      if (eq(needle, element)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};
function* additionalValues(input, values, eq = isEqualDefault) {
  const yielded = [];
  for (const v of values) {
    const found = input.find((index) => eq(index, v));
    if (!found) {
      const alreadyYielded = yielded.find((ii) => eq(ii, v));
      if (!alreadyYielded) {
        yielded.push(v);
        yield v;
      }
    }
  }
}

// src/flow/StateMachineWithEvents.ts
var StateMachineWithEvents = class extends SimpleEventEmitter {
  #sm;
  #smInitial;
  #debug;
  #isDoneNeedsFiring = false;
  #isDone = false;
  #changedAt = Elapsed_exports.infinity();
  /**
   * Create a state machine with initial state, description and options
   * @param string initial Initial state
   * @param MachineDescription m Machine description
   * @param Options Options for machine (defaults to `{debug:false}`)
   * @memberof StateMachine
   */
  constructor(m, opts = {}) {
    super();
    this.#debug = opts.debug ?? false;
    this.#sm = init(m, opts.initial);
    this.#smInitial = cloneState(this.#sm);
  }
  #setIsDone(v) {
    if (this.#isDone === v)
      return;
    this.#isDone = v;
    if (v) {
      this.#isDoneNeedsFiring = true;
      setTimeout(() => {
        if (!this.#isDoneNeedsFiring)
          return;
        this.#isDoneNeedsFiring = false;
        this.fireEvent(`stop`, { state: this.#sm.value });
      }, 2);
    } else {
      this.#isDoneNeedsFiring = false;
    }
  }
  /**
   * Return a list of possible states from current state.
   *
   * If list is empty, no states are possible. Otherwise lists
   * possible states, including 'null' for terminal
   */
  get statesPossible() {
    return possible(this.#sm);
  }
  /**
   * Return a list of all defined states
   */
  get statesDefined() {
    return Object.keys(this.#sm.machine);
  }
  /**
   * Moves to the next state if possible. If multiple states are possible, it will use the first.
   * If machine is finalised, no error is thrown and null is returned.
   *
   * @returns {(string|null)} Returns new state, or null if machine is finalised
   * @memberof StateMachine
   */
  next() {
    const p = possible(this.#sm);
    if (p.length === 0)
      return null;
    this.state = p[0];
    return p[0];
  }
  /**
   * Returns true if state machine is in its final state
   *
   * @returns
   * @memberof StateMachine
   */
  get isDone() {
    return done(this.#sm);
  }
  /**
   * Resets machine to initial state
   *
   * @memberof StateMachine
   */
  reset() {
    this.#setIsDone(false);
    this.#sm = cloneState(this.#smInitial);
    this.#changedAt = Elapsed_exports.since();
  }
  /**
   * Throws if it's not valid to transition to `newState`
   * @param newState
   * @returns
   */
  validateTransition(newState) {
    validateTransition(this.#sm, newState);
  }
  /**
   * Returns _true_ if `newState` is valid transition from current state.
   * Use {@link validateTransition} if you want an explanation for the _false_ results.
   * @param newState
   * @returns
   */
  isValid(newState) {
    return isValidTransition(this.#sm, newState);
  }
  /**
   * Gets or sets state. Throws an error if an invalid transition is attempted.
   * Use `StateMachine.isValid` to check validity without changing.
   *
   * If `newState` is the same as current state, the request is ignored silently.
   *
   * @memberof StateMachine
   */
  set state(newState) {
    const priorState = this.#sm.value;
    if (newState === this.#sm.value)
      return;
    this.#sm = to(this.#sm, newState);
    if (this.#debug) {
      console.log(`StateMachine: ${priorState} -> ${newState}`);
    }
    this.#changedAt = Elapsed_exports.since();
    setTimeout(() => {
      this.fireEvent(`change`, { newState, priorState });
    }, 1);
    if (done(this.#sm))
      this.#setIsDone(true);
  }
  get state() {
    return this.#sm.value;
  }
  /**
   * Returns timestamp when state was last changed.
   * See also `elapsed`
   */
  //eslint-disable-next-line functional/prefer-tacit
  get changedAt() {
    return this.#changedAt();
  }
  /**
   * Returns milliseconds elapsed since last state change.
   * See also `changedAt`
   */
  //eslint-disable-next-line functional/prefer-tacit
  get elapsed() {
    return this.#changedAt();
  }
};

// src/flow/Execute.ts
var run = async (expressions, opts = {}, args) => {
  const results = [];
  const compareFn = opts.rank ?? defaultComparer;
  let expressionsArray = Array.isArray(expressions) ? expressions : [expressions];
  if (opts.shuffle)
    expressionsArray = shuffle(expressionsArray);
  for (let i = 0; i < expressionsArray.length; i++) {
    const exp = expressionsArray[i];
    let r;
    if (typeof exp === "function") {
      r = await exp(args);
    } else {
      r = exp;
    }
    if (r !== void 0) {
      results.push(r);
      results.sort(compareFn);
    }
    if (typeof opts.stop !== "undefined") {
      if (opts.stop(r, results)) {
        break;
      }
    }
  }
  if (opts.filter) {
    return results.filter(opts.filter);
  }
  return results;
};

// src/flow/StateMachineDriver.ts
async function init2(machine, handlersOrOpts) {
  const opts = Array.isArray(handlersOrOpts) ? {
    handlers: handlersOrOpts
  } : handlersOrOpts;
  const debug = resolveLogOption(opts.debug, {
    category: `StateMachineDriver`
  });
  const byState = /* @__PURE__ */ new Map();
  for (const h of opts.handlers) {
    const ifBlock = Array.isArray(h.if) ? h.if : [h.if];
    for (const state of ifBlock) {
      if (typeof state !== `string`) {
        throw new TypeError(
          `Expected single or array of strings for the 'if' field. Got: '${typeof state}'.`
        );
      }
      if (byState.has(state)) {
        throw new Error(
          `Multiple handlers defined for state '${state}'. There should be at most one.`
        );
      }
      byState.set(state, h);
    }
  }
  const runOpts = {
    // Rank results by score
    rank: (a, b) => {
      return defaultComparer(a.score ?? 0, b.score ?? 0);
    },
    shuffle: opts.shuffleHandlers ?? false
  };
  let sm = init(machine);
  for (const [ifState] of byState) {
    if (typeof sm.machine[ifState] === `undefined` && ifState !== `__fallback`) {
      throw new Error(
        `StateMachineDriver handler references a state ('${ifState}') which is not defined on the machine. Therefore this handler will never run.'`
      );
    }
  }
  const run2 = async () => {
    debug(`Run. State: ${sm.value}`);
    const state = sm.value;
    let handler = byState.get(state);
    if (handler === void 0) {
      debug(`  No handler for state '${state}', trying __fallback`);
      handler = byState.get(`__fallback`);
    }
    if (handler === void 0) {
      debug(`  No __fallback handler`);
      return;
    }
    const runOptionsForHandler = handler.resultChoice === `first` ? {
      ...runOpts,
      stop: (latest) => {
        if (!latest)
          return false;
        if (`reset` in latest)
          return true;
        if (`next` in latest && latest.next !== void 0)
          return true;
        return false;
      }
    } : runOpts;
    const results = await run(
      handler.then,
      runOptionsForHandler,
      sm
    );
    debug(
      `  In state '${sm.value}' results: ${results.length}. Choice: ${handler.resultChoice}`
    );
    let r;
    switch (handler.resultChoice ?? `highest`) {
      case `highest`: {
        r = results.at(-1);
        break;
      }
      case `first`: {
        r = results[0];
        break;
      }
      case `lowest`: {
        r = results.at(0);
        break;
      }
      case `random`: {
        r = randomElement(results);
        break;
      }
      default: {
        throw new Error(
          `Unknown 'resultChoice' option: ${handler.resultChoice}. Expected highest, first, lowest or random`
        );
      }
    }
    debug(`  Chosen result: ${JSON.stringify(r)}`);
    if (r && r.reset) {
      sm = reset(sm);
    } else if (r && r.next) {
      if (typeof r.next === `boolean`) {
        sm = next(sm);
      } else {
        debug(JSON.stringify(results));
        sm = to(sm, r.next);
      }
    }
    return sm;
  };
  return {
    reset: () => {
      sm = reset(sm);
    },
    getValue: () => sm.value,
    run: run2,
    to: (state) => {
      sm = to(sm, state);
      return sm;
    }
  };
}

// src/flow/StateMachine.ts
var cloneState = (toClone) => {
  return Object.freeze({
    value: toClone.value,
    visited: [...toClone.visited],
    machine: toClone.machine
  });
};
var init = (stateMachine, initialState) => {
  const [machine, machineValidationError] = validateMachine(stateMachine);
  if (!machine)
    throw new Error(machineValidationError);
  const state = initialState ?? Object.keys(machine.states)[0];
  if (typeof machine.states[state] === "undefined") {
    throw new Error(`Initial state not found`);
  }
  const transitions = validateAndNormaliseTransitions(machine.states);
  if (transitions === void 0) {
    throw new Error(`Could not normalise transitions`);
  }
  return Object.freeze({
    value: state,
    visited: [],
    machine: Object.fromEntries(transitions)
  });
};
var reset = (sm) => {
  return init(sm.machine);
};
var validateMachine = (smOrTransitions) => {
  if (typeof smOrTransitions === "undefined") {
    return [void 0, "Parameter undefined"];
  }
  if (smOrTransitions === null) {
    return [void 0, "Parameter null"];
  }
  if (`states` in smOrTransitions) {
    return [smOrTransitions, ""];
  }
  if (typeof smOrTransitions === `object`) {
    return [
      {
        // @ts-ignore
        states: smOrTransitions
      },
      ""
    ];
  }
  return [
    void 0,
    `Unexpected type: ${typeof smOrTransitions}. Expected object`
  ];
};
var done = (sm) => {
  return possible(sm).length === 0;
};
var possibleTargets = (sm) => {
  validateMachineState(sm);
  const fromS = sm.machine[sm.value];
  if (fromS.length === 1 && fromS[0].state === null)
    return [];
  return fromS;
};
var possible = (sm) => {
  const targets = possibleTargets(sm);
  return targets.map((v) => v.state);
};
var normaliseTargets = (targets) => {
  const normaliseSingleTarget = (target) => {
    if (target === null)
      return { state: null };
    if (typeof target === "string") {
      return {
        state: target
      };
    } else if (typeof target === "object" && "state" in target) {
      const targetState = target.state;
      if (typeof targetState !== "string") {
        throw new Error(
          `Target 'state' field is not a string. Got: ${typeof targetState}`
        );
      }
      if (`preconditions` in target) {
        return {
          state: targetState,
          preconditions: target.preconditions
        };
      }
      return { state: targetState };
    } else {
      throw new Error(
        `Unexpected type: ${typeof target}. Expected string or object with 'state' field.`
      );
    }
  };
  if (Array.isArray(targets)) {
    let containsNull = false;
    const mapResults = targets.map((t) => {
      const r = normaliseSingleTarget(t);
      if (!r)
        throw new Error(`Invalid target`);
      containsNull = containsNull || r.state === null;
      return r;
    });
    if (containsNull && mapResults.length > 1) {
      throw new Error(`Cannot have null as an possible state`);
    }
    return mapResults;
  } else {
    const target = normaliseSingleTarget(targets);
    if (!target)
      return;
    return [target];
  }
};
var validateAndNormaliseTransitions = (d) => {
  const returnMap = /* @__PURE__ */ new Map();
  for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
    if (typeof topLevelState === `undefined`) {
      throw new Error(`Top-level undefined state`);
    }
    if (typeof topLevelTargets === `undefined`) {
      throw new Error(`Undefined target state for ${topLevelState}`);
    }
    if (returnMap.has(topLevelState)) {
      throw new Error(`State defined twice: ${topLevelState}`);
    }
    if (topLevelState.includes(" ")) {
      throw new Error("State names cannot contain spaces");
    }
    returnMap.set(topLevelState, []);
  }
  for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
    const targets = normaliseTargets(topLevelTargets);
    if (targets === void 0)
      throw new Error(`Could not normalise target`);
    if (targets !== null) {
      const seenStates = /* @__PURE__ */ new Set();
      for (const target of targets) {
        if (seenStates.has(target.state)) {
          throw new Error(
            `Target state '${target.state}' already exists for '${topLevelState}'`
          );
        }
        seenStates.add(target.state);
        if (target.state === null)
          continue;
        if (!returnMap.has(target.state)) {
          throw new Error(
            `Target state '${target.state}' is not defined as a top-level state. Defined under: '${topLevelState}'`
          );
        }
      }
      returnMap.set(topLevelState, targets);
    }
  }
  return returnMap;
};
var validateMachineState = (state) => {
  if (typeof state === "undefined") {
    throw new Error(`Parameter 'state' is undefined`);
  }
  if (typeof state.value !== "string") {
    throw new Error("Existing state is not a string");
  }
};
var to = (sm, toState) => {
  validateMachineState(sm);
  validateTransition(sm, toState);
  return Object.freeze({
    value: toState,
    machine: sm.machine,
    visited: unique([sm.visited, [sm.value]])
  });
};
var next = (sm) => {
  const first = possibleTargets(sm).at(0);
  if (!first || first.state === null) {
    throw new Error(
      `Not possible to move to a next state from '${sm.value}`
    );
  }
  return to(sm, first.state);
};
var isValidTransition = (sm, toState) => {
  try {
    validateTransition(sm, toState);
    return true;
  } catch (ex) {
    return false;
  }
};
var validateTransition = (sm, toState) => {
  if (toState === null)
    throw new Error(`Cannot transition to null state`);
  if (toState === void 0) {
    throw new Error(`Cannot transition to undefined state`);
  }
  if (typeof toState !== "string") {
    throw new Error(
      `Parameter 'toState' should be a string. Got: ${typeof toState}`
    );
  }
  const p = possible(sm);
  if (p.length === 0)
    throw new Error("Machine is in terminal state");
  if (!p.includes(toState)) {
    throw new Error(
      `Target state '${toState}' not available at current state '${sm.value}'. Possible states: ${p.join(", ")}`
    );
  }
};
var fromList = (...states) => {
  const t = {};
  if (!Array.isArray(states))
    throw new Error(`Expected array of strings`);
  if (states.length <= 2)
    throw new Error(`Expects at least two states`);
  for (let i = 0; i < states.length; i++) {
    const s = states[i];
    if (typeof s !== `string`) {
      throw new Error(
        `Expected array of strings. Got type '${typeof s}' at index ${i}`
      );
    }
    if (i === states.length - 1) {
      t[s] = null;
    } else {
      t[s] = states[i + 1];
    }
  }
  return t;
};
var bidirectionalFromList = (...states) => {
  const t = {};
  if (!Array.isArray(states))
    throw new Error(`Expected array of strings`);
  if (states.length < 2)
    throw new Error(`Expects at least two states`);
  for (let i = 0; i < states.length; i++) {
    const s = states[i];
    if (typeof s !== `string`) {
      throw new Error(
        `Expected array of strings. Got type '${typeof s}' at index ${i}`
      );
    }
    t[s] = [];
  }
  for (let i = 0; i < states.length; i++) {
    const v = t[states[i]];
    if (i === states.length - 1) {
      if (states.length > 1) {
        v.push(states[i - 1]);
      } else {
        t[states[i]] = null;
      }
    } else {
      v.push(states[i + 1]);
      if (i > 0)
        v.push(states[i - 1]);
    }
  }
  return t;
};

export {
  getClosestIntegerKey,
  hasKeyValue,
  deleteByValue,
  firstEntryByIterablePredicate,
  firstEntryByIterableValue,
  addKeepingExisting,
  sortByValue,
  sortByValueProperty,
  hasAnyValue,
  filter,
  toArray,
  fromIterable,
  fromObject,
  addObject,
  find,
  mapToObjTransform,
  zipKeyValue,
  transformMap,
  toObject,
  mapToArray,
  mergeByKey,
  weightedIndex,
  guardArray,
  guardIndex,
  valuesEqual,
  slice,
  filterBetween,
  minMaxAvg,
  weight,
  validNumbers,
  dotProduct,
  average,
  min,
  maxIndex,
  minIndex,
  max,
  total,
  maxFast,
  totalFast,
  minFast,
  cycle,
  zip,
  wrapInteger,
  wrap,
  wrapRange,
  interpolate,
  interpolateAngle,
  round,
  clamp,
  clampIndex,
  hasElapsedMs,
  frequencyTimerSource,
  relativeTimer,
  frequencyTimer,
  msElapsedTimer,
  ticksElapsedTimer,
  Elapsed_exports,
  DispatchList,
  StateMachineWithEvents,
  init2 as init,
  cloneState,
  init as init2,
  reset,
  validateMachine,
  done,
  possibleTargets,
  possible,
  normaliseTargets,
  to,
  next,
  isValidTransition,
  validateTransition,
  fromList,
  bidirectionalFromList,
  StateMachine_exports,
  interval,
  timeout,
  updateOutdated,
  continuously,
  debounce,
  throttle,
  waitFor,
  delay,
  delayLoop,
  everyNth,
  runOnce,
  retry,
  enqueue,
  dequeue,
  peek,
  isEmpty,
  isFull,
  QueueMutable,
  mutable,
  TaskQueue,
  forEach,
  forEachAsync,
  repeat,
  repeatReduce,
  flow_exports,
  get,
  Easing_exports,
  averageWeighted,
  max2,
  min2,
  compareValuesEqual,
  compareValues,
  Iterables_exports,
  intersection,
  flatten,
  interleave,
  ensureLength,
  randomIndex,
  randomElementWeightedSource,
  randomElement,
  randomPluck,
  shuffle,
  sortByNumericProperty,
  without,
  withoutUndefined,
  until,
  remove,
  groupBy,
  sample,
  chunks,
  mergeByKey2,
  reducePairwise,
  filterAB,
  unique,
  containsDuplicateValues,
  containsDuplicateInstances,
  contains,
  additionalValues,
  arrays_exports
};
//# sourceMappingURL=chunk-4BHVCZ3R.js.map