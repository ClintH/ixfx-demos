import {
  msElapsedTimer,
  relativeTimer,
  ticksElapsedTimer
} from "./chunk-IVBH5MJL.js";

// src/modulation/Easing.ts
var sqrt = Math.sqrt;
var pow = Math.pow;
var cos = Math.cos;
var pi = Math.PI;
var sin = Math.sin;
var easeOverTime = function(name, durationMs) {
  return create(name, durationMs, msElapsedTimer);
};
var easeOverTicks = function(name, durationTicks) {
  return create(name, durationTicks, ticksElapsedTimer);
};
var create = function(name, duration, timerSource) {
  const fn = get(name);
  if (fn === void 0)
    throw new Error(`Easing function not found: ${name}`);
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
var get = function(easingName) {
  const name = easingName.toLocaleLowerCase();
  const found = Object.entries(functions).find(([k, _v]) => k.toLocaleLowerCase() === name);
  if (found === void 0)
    return found;
  return found[1];
};
var getEasings = function() {
  return Array.from(Object.keys(functions));
};
var easeOutBounce = function(x) {
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
var functions = {
  easeInSine: (x) => 1 - cos(x * pi / 2),
  easeOutSine: (x) => sin(x * pi / 2),
  easeInQuad: (x) => x * x,
  easeOutQuad: (x) => 1 - (1 - x) * (1 - x),
  easeInOutSine: (x) => -(cos(pi * x) - 1) / 2,
  easeInOutQuad: (x) => x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2,
  easeInCubic: (x) => x * x * x,
  easeOutCubic: (x) => 1 - pow(1 - x, 3),
  easeInQuart: (x) => x * x * x * x,
  easeOutQuart: (x) => 1 - pow(1 - x, 4),
  easeInQuint: (x) => x * x * x * x * x,
  easeOutQuint: (x) => 1 - pow(1 - x, 5),
  easeInExpo: (x) => x === 0 ? 0 : pow(2, 10 * x - 10),
  easeOutExpo: (x) => x === 1 ? 1 : 1 - pow(2, -10 * x),
  easeInOutQuint: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2,
  easeInOutExpo: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2,
  easeInCirc: (x) => 1 - sqrt(1 - pow(x, 2)),
  easeOutCirc: (x) => sqrt(1 - pow(x - 1, 2)),
  easeInBack: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  easeOutBack: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  easeInOutCirc: (x) => x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2,
  easeInOutBack: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  easeInElastic: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  easeOutElastic: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  easeInBounce: (x) => 1 - easeOutBounce(1 - x),
  easeOutBounce,
  easeInOutElastic: (x) => {
    const c5 = 2 * pi / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
  },
  easeInOutBounce: (x) => x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2
};

export {
  easeOverTime,
  easeOverTicks,
  get,
  getEasings,
  functions
};
