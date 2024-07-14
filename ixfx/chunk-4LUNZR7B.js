import {
  clamp
} from "./chunk-REDAXMKO.js";
import {
  intervalToMs
} from "./chunk-37WZU5ZM.js";
import {
  round
} from "./chunk-2EX73MGI.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/flow/Timer.ts
function hasElapsed(elapsed) {
  const t = relativeTimer(intervalToMs(elapsed, 0), { timer: msElapsedTimer() });
  return () => t.isDone;
}
var frequencyTimerSource = (frequency) => () => frequencyTimer(frequency, { timer: msElapsedTimer() });
var relativeTimer = (total, options = {}) => {
  const clampValue = options.clampValue ?? false;
  const wrapValue = options.wrapValue ?? false;
  if (clampValue && wrapValue) throw new Error(`clampValue and wrapValue cannot both be enabled`);
  let modulationAmount = 1;
  const timer = options.timer ?? msElapsedTimer();
  const computeElapsed = () => {
    let v = timer.elapsed / (total * modulationAmount);
    if (clampValue) v = clamp(v);
    else if (wrapValue && v >= 1) v = v % 1;
    return v;
  };
  return {
    mod(amt) {
      modulationAmount = amt;
    },
    get isDone() {
      return computeElapsed() >= 1;
    },
    get elapsed() {
      return computeElapsed();
    },
    reset: () => {
      timer.reset();
    }
  };
};
var frequencyTimer = (frequency, opts = {}) => {
  const timer = opts.timer ?? msElapsedTimer();
  const cyclesPerSecond = frequency / 1e3;
  let modulationAmount = 1;
  const computeElapsed = () => {
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
  };
  return {
    mod: (amt) => {
      modulationAmount = amt;
    },
    reset: () => {
      timer.reset();
    },
    get isDone() {
      return computeElapsed() >= 1;
    },
    get elapsed() {
      return computeElapsed();
    }
  };
};
var msElapsedTimer = () => {
  let start = performance.now();
  return {
    /**
     * Reset timer
     */
    reset: () => {
      start = performance.now();
    },
    /**
     * Returns elapsed time since start
     */
    get elapsed() {
      return performance.now() - start;
    }
  };
};
var ticksElapsedTimer = () => {
  let start = 0;
  return {
    /**
     * Reset ticks to 0. The next call to `elapsed` will return 1.
     */
    reset: () => {
      start = 0;
    },
    /**
     * Returns the number of elapsed ticks as well as
     * incrementing the tick count. 
     * 
     * Minimum is 1
     */
    get elapsed() {
      return ++start;
    }
  };
};

// src/flow/Elapsed.ts
var Elapsed_exports = {};
__export(Elapsed_exports, {
  infinity: () => infinity,
  interval: () => interval,
  once: () => once,
  progress: () => progress,
  since: () => since,
  toString: () => toString
});
var since = () => {
  const start = performance.now();
  return () => {
    return performance.now() - start;
  };
};
var interval = () => {
  let start = performance.now();
  return () => {
    const now = performance.now();
    const x = now - start;
    start = now;
    return x;
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
  if (!totalMs) throw new Error(`duration invalid`);
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
  if (typeof ms === `undefined`) return `(undefined)`;
  if (ms < 1e3) return `${round(rounding, ms)}ms`;
  ms /= 1e3;
  if (ms < 120) return `${ms.toFixed(1)}secs`;
  ms /= 60;
  if (ms < 60) return `${ms.toFixed(2)}mins`;
  ms /= 60;
  return `${ms.toFixed(2)}hrs`;
};

export {
  hasElapsed,
  frequencyTimerSource,
  relativeTimer,
  frequencyTimer,
  msElapsedTimer,
  ticksElapsedTimer,
  since,
  infinity,
  progress,
  toString,
  Elapsed_exports
};
//# sourceMappingURL=chunk-4LUNZR7B.js.map