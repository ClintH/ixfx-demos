import {
  randomHue,
  wrap
} from "./chunk-3XE462OU.js";
import {
  msElapsedTimer,
  progress,
  relativeTimer,
  ticksElapsedTimer
} from "./chunk-XGTRFTA7.js";
import {
  clamp
} from "./chunk-2U2UFSNC.js";
import {
  string
} from "./chunk-K45JUSCV.js";
import {
  randomElement,
  randomIndex,
  shuffle,
  weightedIndex
} from "./chunk-YOQ54OW2.js";
import {
  defaultRandom
} from "./chunk-JIUPCK6W.js";
import {
  integerTest,
  numberTest,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest
} from "./chunk-LTXP53ZM.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/random/index.ts
var random_exports = {};
__export(random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  defaultRandom: () => defaultRandom,
  float: () => float,
  floatSource: () => floatSource,
  gaussian: () => gaussian2,
  gaussianSource: () => gaussianSource,
  hue: () => randomHue,
  integer: () => integer,
  integerSource: () => integerSource,
  integerUniqueGen: () => integerUniqueGen,
  minutesMs: () => minutesMs,
  minutesMsSource: () => minutesMsSource,
  secondsMs: () => secondsMs,
  secondsMsSource: () => secondsMsSource,
  shortGuid: () => shortGuid,
  string: () => string,
  weighted: () => weighted,
  weightedIndex: () => weightedIndex,
  weightedInteger: () => weightedInteger,
  weightedIntegerSource: () => weightedIntegerSource,
  weightedSource: () => weightedSource
});

// src/random/FloatSource.ts
var floatSource = (maxOrOptions = 1) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = options.max;
  let min = options.min ?? 0;
  const source = options.source ?? defaultRandom;
  throwFromResult(numberTest(min, ``, `min`));
  throwFromResult(numberTest(max, ``, `max`));
  if (!options.min && max < 0) {
    min = max;
    max = 0;
  }
  if (min > max) {
    throw new Error(`Min is greater than max. Min: ${min} max: ${max}`);
  }
  return () => source() * (max - min) + min;
};

// src/numbers/Count.ts
function* count(amount, offset = 0) {
  throwIntegerTest(amount, ``, `amount`);
  throwIntegerTest(offset, ``, `offset`);
  if (amount === 0)
    return;
  let index = 0;
  do {
    yield amount < 0 ? -index + offset : index + offset;
  } while (index++ < Math.abs(amount) - 1);
}

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

// src/data/Interpolate.ts
var piPi = Math.PI * 2;
function interpolate(amountOrA, aOrB, bOrMissingOrOpts, options) {
  const a = bOrMissingOrOpts === void 0 ? amountOrA : aOrB;
  const b = bOrMissingOrOpts === void 0 || typeof bOrMissingOrOpts === `object` ? aOrB : bOrMissingOrOpts;
  const opts = options !== void 0 ? options : typeof bOrMissingOrOpts === `number` ? {} : bOrMissingOrOpts;
  const limits = opts?.limits ?? `clamp`;
  throwNumberTest(a, ``, `a`);
  throwNumberTest(b, ``, `b`);
  const index = (amount) => {
    if (limits === `clamp`) {
      amount = clamp(amount);
    } else if (limits === `wrap`) {
      if (amount > 1)
        amount = amount % 1;
      else if (amount < 0) {
        amount = 1 + amount % 1;
      }
    }
    throwNumberTest(amount, ``, `amount`);
    return (1 - amount) * a + amount * b;
  };
  if (bOrMissingOrOpts === void 0 || typeof bOrMissingOrOpts === `object`)
    return index;
  return index(amountOrA);
}
var interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0)
      b = retargetB;
    if (retargetA !== void 0)
      a = retargetA;
    if (amount >= 1)
      return b;
    const value = interpolate(amount, a, b);
    amount += incrementAmount;
    return value;
  };
};
var interpolatorInterval = (duration, a = 0, b = 1) => {
  const durationProgression = progress(duration, { clampValue: true });
  return (retargetB, retargetA) => {
    const amount = durationProgression();
    if (retargetB !== void 0)
      b = retargetB;
    if (retargetA !== void 0)
      a = retargetA;
    if (amount >= 1)
      return b;
    const value = interpolate(amount, a, b);
    return value;
  };
};
var interpolateAngle = (amount, aRadians, bRadians) => {
  const t = wrap(bRadians - aRadians, 0, piPi);
  return interpolate(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t));
};

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
  let startCount = 1;
  return {
    get isDone() {
      return timer.isDone;
    },
    get runState() {
      if (timer.isDone)
        return `idle`;
      return `scheduled`;
    },
    /**
     * Returns 1 if it has been created, returns +1 for each additional time the timer has been reset.
     */
    get startCount() {
      return startCount;
    },
    compute: () => {
      const relative = timer.elapsed;
      return fn(relative);
    },
    reset: () => {
      timer.reset();
      startCount++;
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

// src/random/Weighted.ts
var weighted = (easingNameOrOptions = `quadIn`) => weightedSource(easingNameOrOptions)();
var weightedSource = (easingNameOrOptions = `quadIn`) => {
  const options = typeof easingNameOrOptions === `string` ? { easing: easingNameOrOptions } : easingNameOrOptions;
  const source = options.source ?? defaultRandom;
  const easingName = options.easing ?? `quadIn`;
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing function '${easingName}' not found.`);
  }
  const compute = () => {
    const r = source();
    return easingFunction(r);
  };
  return compute;
};

// src/random/WeightedInteger.ts
var weightedIntegerSource = (maxOrOptions) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const source = options.source ?? defaultRandom;
  const max = options.max;
  const min = options.min ?? 0;
  const easingName = options.easing ?? `quadIn`;
  if (typeof max === `undefined`)
    throw new Error(`max field is undefined`);
  if (typeof easingName !== `string`) {
    throw new TypeError(`easing field expected to be string`);
  }
  throwFromResult(numberTest(max));
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing '${easingName}' not found`);
  }
  throwFromResult(numberTest(min));
  if (max <= min)
    throw new Error(`Max should be greater than min`);
  const compute = () => {
    const r = clamp(easingFunction(source()));
    return Math.floor(r * (max - min)) + min;
  };
  return compute;
};
var weightedInteger = (maxOrOptions) => weightedIntegerSource(maxOrOptions)();

// src/random/index.ts
var gaussian2 = (skew = 1) => gaussianSource(skew)();
var gaussianSource = (skew = 1) => {
  const min = 0;
  const max = 1;
  const compute = () => {
    const u = calculateNonZero();
    const v = calculateNonZero();
    let result = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    result = result / 10 + 0.5;
    if (result > 1 || result < 0) {
      result = compute();
    } else {
      result = Math.pow(result, skew);
      result *= max - min;
      result += min;
    }
    return result;
  };
  return compute;
};
var calculateNonZero = (source = defaultRandom) => {
  let v = 0;
  while (v === 0) {
    v = source();
  }
  return v;
};
var integerSource = (maxOrOptions) => {
  if (typeof maxOrOptions === `undefined`) {
    throw new TypeError(`maxOrOptions is undefined`);
  }
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = Math.floor(options.max);
  let min = Math.floor(options.min ?? 0);
  if (!options.min && max < 0) {
    max = 1;
    min = options.max;
  }
  const randomSource = options.source ?? defaultRandom;
  if (min > max) {
    throw new Error(`Min value is greater than max (min: ${min} max: ${max})`);
  }
  throwFromResult(numberTest(min, ``, `min`));
  throwFromResult(numberTest(max, ``, `max`));
  if (max === min) {
    throw new Error(`Max and min values cannot be the same (${max})`);
  }
  const amt = Math.abs(max - min);
  return () => Math.floor(randomSource() * amt) + min;
};
var integer = (maxOrOptions) => integerSource(maxOrOptions)();
var float = (maxOrOptions = 1) => floatSource(maxOrOptions)();
var shortGuid = (options = {}) => {
  const source = options.source ?? defaultRandom;
  const firstPart = Math.trunc(source() * 46656);
  const secondPart = Math.trunc(source() * 46656);
  const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartString + secondPartString;
};
var minutesMsSource = (maxMinutesOrOptions) => {
  const options = typeof maxMinutesOrOptions === `number` ? { max: maxMinutesOrOptions } : maxMinutesOrOptions;
  const min = (options.min ?? 0) * 60 * 1e3;
  const max = options.max * 60 * 1e3;
  return integerSource({ ...options, max, min });
};
var minutesMs = (maxMinutesOrOptions) => minutesMsSource(maxMinutesOrOptions)();
var secondsMsSource = (maxSecondsOrOptions) => {
  const options = typeof maxSecondsOrOptions === `number` ? { max: maxSecondsOrOptions } : maxSecondsOrOptions;
  const min = (options.min ?? 0) * 1e3;
  const max = options.max * 1e3;
  return () => integer({ ...options, max, min });
};
var secondsMs = (maxSecondsOrOptions) => secondsMsSource(maxSecondsOrOptions)();
function* integerUniqueGen(maxOrOptions) {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const min = options.min ?? 0;
  const max = options.max;
  const source = options.source ?? defaultRandom;
  const loop = options.loop ?? false;
  throwFromResult(integerTest(min, ``, `min`));
  throwFromResult(integerTest(max, ``, `max`));
  if (min > max) {
    throw new Error(`Min value is greater than max. Min: ${min} Max: ${max}`);
  }
  const origRange = [...count(max - min, min)];
  let numberRange = shuffle(origRange);
  let index = 0;
  while (true) {
    if (index === numberRange.length) {
      if (loop)
        numberRange = shuffle(origRange, source);
      else
        return;
    }
    yield numberRange[index++];
  }
}

export {
  interpolate,
  interpolatorStepped,
  interpolatorInterval,
  interpolateAngle,
  floatSource,
  count,
  Easing_exports,
  weighted,
  weightedSource,
  weightedIntegerSource,
  weightedInteger,
  gaussian2 as gaussian,
  gaussianSource,
  integerSource,
  integer,
  float,
  shortGuid,
  minutesMsSource,
  minutesMs,
  secondsMsSource,
  secondsMs,
  integerUniqueGen,
  random_exports
};
//# sourceMappingURL=chunk-ZESXYRA7.js.map