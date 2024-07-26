import {
  wrap
} from "./chunk-LQKA6R2Q.js";
import {
  elapsedMillisecondsAbsolute,
  elapsedTicksAbsolute,
  ofTotal,
  ofTotalTicks,
  relative,
  timerWithFunction
} from "./chunk-GHZFZEKP.js";
import {
  clamp
} from "./chunk-ZJSCF2A4.js";
import {
  intervalToMs
} from "./chunk-NXPE4HQJ.js";
import {
  throwStringTest
} from "./chunk-5MXEL2YC.js";
import {
  throwNumberTest
} from "./chunk-44XJNV6Z.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/modulation/easing/index.ts
var easing_exports = {};
__export(easing_exports, {
  Named: () => EasingsNamed_exports,
  create: () => create,
  crossfade: () => crossfade,
  fromCubicBezier: () => fromCubicBezier,
  gaussian: () => gaussian,
  get: () => get,
  getEasingNames: () => getEasingNames,
  mix: () => mix,
  noop: () => noop,
  spring: () => spring,
  tickEasing: () => tickEasing,
  ticks: () => ticks,
  time: () => time,
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

// src/numbers/Interpolate.ts
var piPi = Math.PI * 2;
function interpolate(pos1, pos2, pos3, pos4) {
  let amountProcess;
  let limits = `clamp`;
  const handleAmount = (amount) => {
    if (amountProcess) amount = amountProcess(amount);
    if (limits === void 0 || limits === `clamp`) {
      amount = clamp(amount);
    } else if (limits === `wrap`) {
      if (amount > 1) amount = amount % 1;
      else if (amount < 0) {
        amount = 1 + amount % 1;
      }
    }
    return amount;
  };
  const doTheEase = (_amt, _a, _b) => {
    throwNumberTest(_a, ``, `a`);
    throwNumberTest(_b, ``, `b`);
    throwNumberTest(_amt, ``, `amount`);
    _amt = handleAmount(_amt);
    return (1 - _amt) * _a + _amt * _b;
  };
  const readOpts = (o = {}) => {
    if (o.easing) {
      const easingFn = get(o.easing);
      if (!easingFn) throw new Error(`Easing function '${o.easing}' not found`);
      amountProcess = easingFn;
    } else if (o.transform) {
      if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
      amountProcess = o.transform;
    }
    limits = o.limits ?? `clamp`;
  };
  const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
  if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
  if (typeof pos2 === `number`) {
    let a;
    let b;
    if (pos3 === void 0 || typeof pos3 === `object`) {
      a = pos1;
      b = pos2;
      readOpts(pos3);
      return (amount) => doTheEase(amount, a, b);
    } else if (typeof pos3 === `number`) {
      a = pos2;
      b = pos3;
      readOpts(pos4);
      return doTheEase(pos1, a, b);
    } else {
      throw new Error(`Values for 'a' and 'b' not defined`);
    }
  } else if (pos2 === void 0 || typeof pos2 === `object`) {
    let amount = handleAmount(pos1);
    readOpts(pos2);
    throwNumberTest(amount, ``, `amount`);
    return (aValue, bValue) => rawEase(amount, aValue, bValue);
  }
}
var interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0, options) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate(amount, a, b, options);
    amount += incrementAmount;
    return value;
  };
};
var interpolatorInterval = (duration, a = 0, b = 1, options) => {
  const durationProgression = ofTotal(duration, { clampValue: true });
  return (retargetB, retargetA) => {
    const amount = durationProgression();
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate(amount, a, b, options);
    return value;
  };
};
var interpolateAngle = (amount, aRadians, bRadians, options) => {
  const t = wrap(bRadians - aRadians, 0, piPi);
  return interpolate(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t), options);
};

// src/modulation/easing/Factories.ts
var sqrt = Math.sqrt;
var pow = Math.pow;
var pi = Math.PI;
var mix = (balance, easingA, easingB) => (amt) => interpolate(balance, easingA(amt), easingB(amt));
var crossfade = (easingA, easingB) => {
  return (amt) => {
    const mixer = mix(amt, easingA, easingB);
    return mixer(amt);
  };
};
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
    if (v > 1) return 1;
    if (v < 0) return 0;
    return v;
  };
};
var fromCubicBezier = (b, d) => (t) => {
  const s = 1 - t;
  const s2 = s * s;
  const t2 = t * t;
  const t3 = t2 * t;
  return 3 * b * s2 * t + 3 * d * s * t2 + t3;
};
var spring = (opts = {}) => {
  const from = 0;
  const to = 1;
  const mass = opts.mass ?? 1;
  const stiffness = opts.stiffness ?? 100;
  const soft = opts.soft ?? false;
  const damping = opts.damping ?? 10;
  const velocity = opts.velocity ?? 0.1;
  const delta = to - from;
  if (soft || 1 <= damping / (2 * Math.sqrt(stiffness * mass))) {
    const angularFrequency = -Math.sqrt(stiffness / mass);
    const leftover = -angularFrequency * delta - velocity;
    return (t) => to - (delta + t * leftover) * Math.E ** (t * angularFrequency);
  } else {
    const dampingFrequency = Math.sqrt(4 * mass * stiffness - damping ** 2);
    const leftover = (damping * delta - 2 * mass * velocity) / dampingFrequency;
    const dfm = 0.5 * dampingFrequency / mass;
    const dm = -(0.5 * damping) / mass;
    return (t) => to - (Math.cos(t * dfm) * delta + Math.sin(t * dfm) * leftover) * Math.E ** (t * dm);
  }
};

// src/modulation/easing/EasingsNamed.ts
var sqrt2 = Math.sqrt;
var pow2 = Math.pow;
var cos = Math.cos;
var pi2 = Math.PI;
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
var sineIn = (x) => 1 - cos(x * pi2 / 2);
var sineOut = (x) => sin(x * pi2 / 2);
var quadIn = (x) => x * x;
var quadOut = (x) => 1 - (1 - x) * (1 - x);
var sineInOut = (x) => -(cos(pi2 * x) - 1) / 2;
var quadInOut = (x) => x < 0.5 ? 2 * x * x : 1 - pow2(-2 * x + 2, 2) / 2;
var cubicIn = (x) => x * x * x;
var cubicOut = (x) => 1 - pow2(1 - x, 3);
var quartIn = (x) => x * x * x * x;
var quartOut = (x) => 1 - pow2(1 - x, 4);
var expoIn = (x) => x === 0 ? 0 : pow2(2, 10 * x - 10);
var expoOut = (x) => x === 1 ? 1 : 1 - pow2(2, -10 * x);
var quintInOut = (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow2(-2 * x + 2, 5) / 2;
var expoInOut = (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow2(2, 20 * x - 10) / 2 : (2 - pow2(2, -20 * x + 10)) / 2;
var circIn = (x) => 1 - sqrt2(1 - pow2(x, 2));
var circOut = (x) => sqrt2(1 - pow2(x - 1, 2));
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
var circInOut = (x) => x < 0.5 ? (1 - sqrt2(1 - pow2(2 * x, 2))) / 2 : (sqrt2(1 - pow2(-2 * x + 2, 2)) + 1) / 2;
var backInOut = (x) => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return x < 0.5 ? pow2(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow2(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};
var elasticIn = (x) => {
  const c4 = 2 * pi2 / 3;
  return x === 0 ? 0 : x === 1 ? 1 : -pow2(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
};
var elasticOut = (x) => {
  const c4 = 2 * pi2 / 3;
  return x === 0 ? 0 : x === 1 ? 1 : pow2(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
};
var bounceIn = (x) => 1 - bounceOut(1 - x);
var bell = gaussian();
var elasticInOut = (x) => {
  const c5 = 2 * pi2 / 4.5;
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow2(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow2(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
};
var bounceInOut = (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;

// src/modulation/easing/index.ts
var noop = (v) => v;
var create = (options) => {
  let name = resolveEasingName(options.name ?? `quintIn`);
  const fn = name ?? options.fn;
  if (!fn) throw new Error(`Either 'name' or 'fn' must be set`);
  if (`duration` in options) {
    return time(fn, options.duration);
  } else if (`ticks` in options) {
    return ticks(fn, options.ticks);
  } else {
    throw new Error(`Expected 'duration' or 'ticks' in options`);
  }
};
var timeEasing = (nameOrFunction, duration) => {
  const fn = resolveEasingName(nameOrFunction);
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
var time = (nameOrFunction, duration) => {
  const fn = resolveEasingName(nameOrFunction);
  let relative2;
  return () => {
    if (relative2 === void 0) relative2 = ofTotal(duration, { clampValue: true });
    return fn(relative2());
  };
};
var ticks = (nameOrFunction, totalTicks) => {
  const fn = resolveEasingName(nameOrFunction);
  let relative2;
  return () => {
    if (relative2 === void 0) relative2 = ofTotalTicks(totalTicks, { clampValue: true });
    return fn(relative2());
  };
};
var tickEasing = (nameOrFunction, durationTicks) => {
  const fn = resolveEasingName(nameOrFunction);
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
  yield* Object.keys(map.values);
}

export {
  spring,
  get,
  easing_exports,
  piPi,
  interpolate,
  interpolatorStepped,
  interpolatorInterval,
  interpolateAngle
};
//# sourceMappingURL=chunk-3EZX4TDE.js.map