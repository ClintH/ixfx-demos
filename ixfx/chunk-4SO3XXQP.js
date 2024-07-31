import {
  elapsedMillisecondsAbsolute,
  elapsedTicksAbsolute,
  ofTotal,
  ofTotalTicks,
  relative,
  timerWithFunction
} from "./chunk-HCM42F75.js";
import {
  intervalToMs
} from "./chunk-2LQNQUVT.js";
import {
  throwFunctionTest,
  throwStringTest
} from "./chunk-Q5FM47RE.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/modulation/Gaussian.ts
var pow = Math.pow;
var gaussianA = 1 / Math.sqrt(2 * Math.PI);
var gaussian = (standardDeviation = 0.4) => {
  const mean = 0.5;
  return (t) => {
    const f = gaussianA / standardDeviation;
    let p = -2.5;
    let c = (t - mean) / standardDeviation;
    c *= c;
    p *= c;
    const v = f * pow(Math.E, p);
    if (v > 1) return 1;
    if (v < 0) return 0;
    return v;
  };
};

// src/modulation/ModulatorTimed.ts
var time = (fn, duration) => {
  throwFunctionTest(fn, `fn`);
  let relative2;
  return () => {
    if (relative2 === void 0) relative2 = ofTotal(duration, { clampValue: true });
    return fn(relative2());
  };
};
var timeModulator = (fn, duration) => {
  throwFunctionTest(fn, `fn`);
  const timer = elapsedMillisecondsAbsolute();
  const durationMs = intervalToMs(duration);
  if (durationMs === void 0) throw new Error(`Param 'duration' not provided`);
  const relativeTimer = relative(
    durationMs,
    {
      timer,
      clampValue: true
    }
  );
  return timerWithFunction(fn, relativeTimer);
};
var ticks = (fn, totalTicks) => {
  throwFunctionTest(fn, `fn`);
  let relative2;
  return () => {
    if (relative2 === void 0) relative2 = ofTotalTicks(totalTicks, { clampValue: true });
    return fn(relative2());
  };
};
var tickModulator = (fn, durationTicks) => {
  throwFunctionTest(fn, `fn`);
  const timer = elapsedTicksAbsolute();
  const relativeTimer = relative(
    durationTicks,
    {
      timer,
      clampValue: true
    }
  );
  return timerWithFunction(fn, relativeTimer);
};

// src/modulation/easing/index.ts
var easing_exports = {};
__export(easing_exports, {
  Named: () => EasingsNamed_exports,
  create: () => create,
  get: () => get,
  getEasingNames: () => getEasingNames,
  tickEasing: () => tickEasing,
  ticks: () => ticks2,
  time: () => time2,
  timeEasing: () => timeEasing
});

// src/modulation/easing/EasingsNamed.ts
var EasingsNamed_exports = {};
__export(EasingsNamed_exports, {
  arch: () => arch,
  backIn: () => backIn,
  backInOut: () => backInOut,
  backOut: () => backOut,
  bell: () => bell,
  bounceIn: () => bounceIn,
  bounceInOut: () => bounceInOut,
  bounceOut: () => bounceOut,
  circIn: () => circIn,
  circInOut: () => circInOut,
  circOut: () => circOut,
  cubicIn: () => cubicIn,
  cubicOut: () => cubicOut,
  elasticIn: () => elasticIn,
  elasticInOut: () => elasticInOut,
  elasticOut: () => elasticOut,
  expoIn: () => expoIn,
  expoInOut: () => expoInOut,
  expoOut: () => expoOut,
  quadIn: () => quadIn,
  quadInOut: () => quadInOut,
  quadOut: () => quadOut,
  quartIn: () => quartIn,
  quartOut: () => quartOut,
  quintIn: () => quintIn,
  quintInOut: () => quintInOut,
  quintOut: () => quintOut,
  sineIn: () => sineIn,
  sineInOut: () => sineInOut,
  sineOut: () => sineOut,
  smootherstep: () => smootherstep,
  smoothstep: () => smoothstep
});
var sqrt = Math.sqrt;
var pow2 = Math.pow;
var cos = Math.cos;
var pi = Math.PI;
var sin = Math.sin;
var bounceOut = (x) => {
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
var quintOut = (x) => 1 - pow2(1 - x, 5);
var arch = (x) => x * (1 - x) * 4;
var smoothstep = (x) => x * x * (3 - 2 * x);
var smootherstep = (x) => (x * (x * 6 - 15) + 10) * x * x * x;
var sineIn = (x) => 1 - cos(x * pi / 2);
var sineOut = (x) => sin(x * pi / 2);
var quadIn = (x) => x * x;
var quadOut = (x) => 1 - (1 - x) * (1 - x);
var sineInOut = (x) => -(cos(pi * x) - 1) / 2;
var quadInOut = (x) => x < 0.5 ? 2 * x * x : 1 - pow2(-2 * x + 2, 2) / 2;
var cubicIn = (x) => x * x * x;
var cubicOut = (x) => 1 - pow2(1 - x, 3);
var quartIn = (x) => x * x * x * x;
var quartOut = (x) => 1 - pow2(1 - x, 4);
var expoIn = (x) => x === 0 ? 0 : pow2(2, 10 * x - 10);
var expoOut = (x) => x === 1 ? 1 : 1 - pow2(2, -10 * x);
var quintInOut = (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow2(-2 * x + 2, 5) / 2;
var expoInOut = (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow2(2, 20 * x - 10) / 2 : (2 - pow2(2, -20 * x + 10)) / 2;
var circIn = (x) => 1 - sqrt(1 - pow2(x, 2));
var circOut = (x) => sqrt(1 - pow2(x - 1, 2));
var backIn = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
};
var backOut = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * pow2(x - 1, 3) + c1 * pow2(x - 1, 2);
};
var circInOut = (x) => x < 0.5 ? (1 - sqrt(1 - pow2(2 * x, 2))) / 2 : (sqrt(1 - pow2(-2 * x + 2, 2)) + 1) / 2;
var backInOut = (x) => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return x < 0.5 ? pow2(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow2(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};
var elasticIn = (x) => {
  const c4 = 2 * pi / 3;
  return x === 0 ? 0 : x === 1 ? 1 : -pow2(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
};
var elasticOut = (x) => {
  const c4 = 2 * pi / 3;
  return x === 0 ? 0 : x === 1 ? 1 : pow2(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
};
var bounceIn = (x) => 1 - bounceOut(1 - x);
var bell = gaussian();
var elasticInOut = (x) => {
  const c5 = 2 * pi / 4.5;
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow2(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow2(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
};
var bounceInOut = (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;

// src/modulation/easing/index.ts
var create = (options) => {
  let name = resolveEasingName(options.name ?? `quintIn`);
  const fn = name ?? options.fn;
  if (!fn) throw new Error(`Either 'name' or 'fn' must be set`);
  if (`duration` in options) {
    return time2(fn, options.duration);
  } else if (`ticks` in options) {
    return ticks2(fn, options.ticks);
  } else {
    throw new Error(`Expected 'duration' or 'ticks' in options`);
  }
};
var timeEasing = (nameOrFunction, duration) => {
  const fn = resolveEasingName(nameOrFunction);
  return timeModulator(fn, duration);
};
var time2 = (nameOrFunction, duration) => {
  const fn = resolveEasingName(nameOrFunction);
  return time(fn, duration);
};
var ticks2 = (nameOrFunction, totalTicks) => {
  const fn = resolveEasingName(nameOrFunction);
  return ticks(fn, totalTicks);
};
var tickEasing = (nameOrFunction, durationTicks) => {
  const fn = resolveEasingName(nameOrFunction);
  return tickModulator(fn, durationTicks);
};
var resolveEasingName = (nameOrFunction) => {
  const fn = typeof nameOrFunction === `function` ? nameOrFunction : get(nameOrFunction);
  if (fn === void 0) {
    const error = typeof nameOrFunction === `string` ? new Error(`Easing function not found: '${nameOrFunction}'`) : new Error(`Easing function not found`);
    throw error;
  }
  return fn;
};
var easingsMap;
var get = function(easingName) {
  throwStringTest(easingName, `non-empty`, `easingName`);
  const found = cacheEasings().get(easingName.toLowerCase());
  if (found === void 0) throw new Error(`Easing not found: '${easingName}'`);
  return found;
};
function cacheEasings() {
  if (easingsMap === void 0) {
    easingsMap = /* @__PURE__ */ new Map();
    for (const [k, v] of Object.entries(EasingsNamed_exports)) {
      easingsMap.set(k.toLowerCase(), v);
    }
    return easingsMap;
  } else return easingsMap;
}
function* getEasingNames() {
  const map = cacheEasings();
  yield* map.keys();
}

export {
  gaussian,
  time,
  timeModulator,
  ticks,
  tickModulator,
  get,
  easing_exports
};
//# sourceMappingURL=chunk-4SO3XXQP.js.map