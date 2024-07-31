import {
  count,
  float,
  floatSource
} from "./chunk-OVLG22EY.js";
import {
  get
} from "./chunk-4SO3XXQP.js";
import {
  randomHue
} from "./chunk-F6XISRGF.js";
import {
  clamp
} from "./chunk-ZJSCF2A4.js";
import {
  randomElement,
  randomIndex,
  shuffle,
  weightedIndex
} from "./chunk-HKC65PTS.js";
import {
  string
} from "./chunk-7U6QARGK.js";
import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";
import {
  integerTest,
  numberTest,
  throwFromResult,
  throwNumberTest
} from "./chunk-CSXWZ3IC.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/random/index.ts
var random_exports = {};
__export(random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  calculateNonZero: () => calculateNonZero,
  chance: () => chance,
  float: () => float,
  floatSource: () => floatSource,
  gaussian: () => gaussian,
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

// src/random/Chance.ts
var chance = (p, a, b, randomSource) => {
  const source = randomSource ?? Math.random;
  const resolve = (x) => {
    if (typeof x === `function`) return x();
    return x;
  };
  const pp = resolve(p);
  throwNumberTest(pp, `percentage`, `p`);
  if (source() <= pp) {
    return resolve(b);
  } else {
    return resolve(a);
  }
};

// src/random/NonZero.ts
var calculateNonZero = (source = Math.random) => {
  let v = 0;
  while (v === 0) {
    v = source();
  }
  return v;
};

// src/random/Gaussian.ts
var gaussian = (skew = 1) => gaussianSource(skew)();
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

// src/random/Guid.ts
var shortGuid = (options = {}) => {
  const source = options.source ?? Math.random;
  const firstPart = Math.trunc(source() * 46656);
  const secondPart = Math.trunc(source() * 46656);
  const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartString + secondPartString;
};

// src/random/Integer.ts
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
  const randomSource = options.source ?? Math.random;
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
function* integerUniqueGen(maxOrOptions) {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const min = options.min ?? 0;
  const max = options.max;
  const source = options.source ?? Math.random;
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
      if (loop) numberRange = shuffle(origRange, source);
      else return;
    }
    yield numberRange[index++];
  }
}

// src/random/Time.ts
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
  if (typeof max === `undefined`) throw new Error(`max field is undefined`);
  if (typeof easingName !== `string`) {
    throw new TypeError(`easing field expected to be string`);
  }
  throwNumberTest(max);
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing '${easingName}' not found`);
  }
  throwNumberTest(min);
  if (max <= min) throw new Error(`Max should be greater than min`);
  const compute = () => {
    const r = clamp(easingFunction(source()));
    return Math.floor(r * (max - min)) + min;
  };
  return compute;
};
var weightedInteger = (maxOrOptions) => weightedIntegerSource(maxOrOptions)();

export {
  chance,
  calculateNonZero,
  gaussian,
  gaussianSource,
  shortGuid,
  integerSource,
  integer,
  integerUniqueGen,
  minutesMsSource,
  minutesMs,
  secondsMsSource,
  secondsMs,
  weighted,
  weightedSource,
  weightedIntegerSource,
  weightedInteger,
  random_exports
};
//# sourceMappingURL=chunk-UBWL5KAS.js.map