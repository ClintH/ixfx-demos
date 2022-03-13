import {
  msElapsedTimer,
  relativeTimer,
  ticksElapsedTimer
} from "./chunk-MGRO6247.js";
import {
  clamp,
  interpolate,
  isEqualDefault
} from "./chunk-YSYB6TIS.js";
import {
  number
} from "./chunk-6M44PDIN.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/Random.ts
var Random_exports = {};
__export(Random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  defaultRandom: () => defaultRandom,
  weighted: () => weighted,
  weightedInteger: () => weightedInteger
});

// src/collections/Arrays.ts
var Arrays_exports = {};
__export(Arrays_exports, {
  average: () => average,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  max: () => max,
  min: () => min,
  minMaxAvg: () => minMaxAvg,
  randomElement: () => randomElement,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  shuffle: () => shuffle,
  without: () => without
});

// src/collections/NumericArrays.ts
var average = (...data) => {
  if (data === void 0)
    throw new Error(`data parameter is undefined`);
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  const total = validNumbers.reduce((acc, v) => acc + v, 0);
  return total / validNumbers.length;
};
var min = (...data) => {
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  return Math.min(...validNumbers);
};
var max = (...data) => {
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  return Math.max(...validNumbers);
};
var minMaxAvg = (data) => {
  const validNumbers = data.filter((d) => typeof d === `number` && !Number.isNaN(d));
  const total = validNumbers.reduce((acc, v) => acc + v, 0);
  return {
    total,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total / validNumbers.length
  };
};

// src/collections/Arrays.ts
var guardArray = (array, paramName = `?`) => {
  if (array === void 0)
    throw new Error(`Param '${paramName}' is undefined. Expected array.`);
  if (array === null)
    throw new Error(`Param '${paramName}' is null. Expected array.`);
  if (!Array.isArray(array))
    throw new Error(`Param '${paramName}' not an array as expected`);
};
var randomIndex = (array, rand = defaultRandom) => Math.floor(rand() * array.length);
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
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
var without = (data, value, comparer = isEqualDefault) => data.filter((v) => !comparer(v, value));
var groupBy = (array, grouper) => array.reduce((store, item) => {
  const key = grouper(item);
  const val = store.get(key);
  if (val === void 0) {
    store.set(key, [item]);
  } else {
    val.push(item);
  }
  return store;
}, /* @__PURE__ */ new Map());

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
  time: () => time
});
var sqrt = Math.sqrt;
var pow = Math.pow;
var cos = Math.cos;
var pi = Math.PI;
var sin = Math.sin;
var time = function(nameOrFn, durationMs) {
  return create(nameOrFn, durationMs, msElapsedTimer);
};
var tick = function(nameOrFn, durationTicks) {
  return create(nameOrFn, durationTicks, ticksElapsedTimer);
};
var create = function(nameOrFn, duration, timerSource) {
  let fn;
  if (typeof nameOrFn === `function`)
    fn = nameOrFn;
  else
    fn = get(nameOrFn);
  if (fn === void 0)
    throw new Error(`Easing function not found: ${nameOrFn}`);
  const timer = relativeTimer(duration, timerSource(), true);
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
  const found = Object.entries(functions).find(([k, _v]) => k.toLocaleLowerCase() === name);
  if (found === void 0)
    return found;
  return found[1];
};
var getEasings = function() {
  return Array.from(Object.keys(functions));
};
var gaussian = (stdDev = 0.25) => {
  const a = 1 / sqrt(2 * pi);
  const mean = 0.5;
  return (t) => {
    const f = a / stdDev;
    let p = -1;
    let c = (t - mean) / stdDev;
    c *= c;
    p *= c;
    return f * pow(Math.E / 2, p);
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
var functions = {
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

// src/Random.ts
var defaultRandom = Math.random;
var weighted = (easingName = `quadIn`, rand = defaultRandom) => {
  const r = rand();
  const easingFn = get(easingName);
  if (easingFn === void 0)
    throw new Error(`Easing function '${easingName}' not found.`);
  return easingFn(r);
};
var weightedInteger = (minOrMax, maxOrEasing, easing, rand = defaultRandom) => {
  number(minOrMax);
  let min2, max2, easingName;
  easingName = `quadIn`;
  min2 = 0;
  if (maxOrEasing === void 0) {
    max2 = minOrMax;
  } else {
    if (typeof maxOrEasing === `number`) {
      min2 = minOrMax;
      max2 = maxOrEasing;
      if (easing !== void 0)
        easingName = easing;
    } else if (typeof maxOrEasing === `string`) {
      max2 = minOrMax;
      easingName = maxOrEasing;
    } else {
      throw new Error(`Unexpected value type for maxOrEasing: ${maxOrEasing}`);
    }
  }
  if (easing !== void 0)
    easingName = easing;
  const easingFn = get(easingName);
  if (easingFn === void 0)
    throw new Error(`Easing '${easingName}' not found`);
  number(min2);
  if (max2 <= min2)
    throw new Error(`Max should be greater than min`);
  const r = clamp(easingFn(rand()));
  return Math.floor(r * (max2 - min2)) + min2;
};

export {
  average,
  min,
  max,
  minMaxAvg,
  Easing_exports,
  defaultRandom,
  weighted,
  weightedInteger,
  Random_exports,
  guardArray,
  randomIndex,
  randomElement,
  randomPluck,
  shuffle,
  without,
  groupBy,
  Arrays_exports
};
