import {
  clamp
} from "./chunk-ZJSCF2A4.js";
import {
  intervalToMs
} from "./chunk-2LQNQUVT.js";

// src/flow/Timer.ts
function hasElapsed(elapsed) {
  const t = relative(intervalToMs(elapsed, 0), { timer: elapsedMillisecondsAbsolute(), clampValue: true });
  return () => t.isDone;
}
function ofTotal(duration, opts = {}) {
  const totalMs = intervalToMs(duration);
  if (!totalMs) throw new Error(`Param 'duration' not valid`);
  const timerOpts = {
    ...opts,
    timer: elapsedMillisecondsAbsolute()
  };
  let t;
  return () => {
    if (!t) {
      t = relative(totalMs, timerOpts);
    }
    return t.elapsed;
  };
}
function ofTotalTicks(totalTicks, opts = {}) {
  const timerOpts = {
    ...opts,
    timer: elapsedTicksAbsolute()
  };
  let t;
  return () => {
    if (!t) {
      t = relative(totalTicks, timerOpts);
    }
    return t.elapsed;
  };
}
var relative = (total, options = {}) => {
  const clampValue = options.clampValue ?? false;
  const wrapValue = options.wrapValue ?? false;
  if (clampValue && wrapValue) throw new Error(`clampValue and wrapValue cannot both be enabled`);
  let modulationAmount = 1;
  const timer = options.timer ?? elapsedMillisecondsAbsolute();
  let lastValue = 0;
  const computeElapsed = (value) => {
    lastValue = value;
    let v = value / (total * modulationAmount);
    if (clampValue) v = clamp(v);
    else if (wrapValue && v >= 1) v = v % 1;
    return v;
  };
  return {
    mod(amt) {
      modulationAmount = amt;
    },
    get isDone() {
      return computeElapsed(lastValue) >= 1;
    },
    get elapsed() {
      return computeElapsed(timer.elapsed);
    },
    reset: () => {
      timer.reset();
    }
  };
};
var frequencyTimer = (frequency, options = {}) => {
  const timer = options.timer ?? elapsedMillisecondsAbsolute();
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
var elapsedMillisecondsAbsolute = () => {
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
var elapsedTicksAbsolute = () => {
  let start = 0;
  return {
    /**
     * Reset ticks to 0. The next call to `elapsed` will return 1.
     */
    reset: () => {
      start = 0;
    },
    /**
     * Get current ticks without incrementing.
     */
    get peek() {
      return start;
    },
    /**
     * Returns the number of elapsed ticks as well as
     * incrementing the tick count. 
     * 
     * Minimum is 1
     * 
     * Use {@link peek} to get the current ticks without incrementing.
     */
    get elapsed() {
      return ++start;
    }
  };
};
var timerWithFunction = (fn, timer) => {
  if (typeof fn !== `function`) throw new Error(`Param 'fn' should be a function. Got: ${typeof fn}`);
  let startCount = 1;
  return {
    get elapsed() {
      return timer.elapsed;
    },
    get isDone() {
      return timer.isDone;
    },
    get runState() {
      if (timer.isDone) return `idle`;
      return `scheduled`;
    },
    /**
     * Returns 1 if it has been created, returns +1 for each additional time the timer has been reset.
     */
    get startCount() {
      return startCount;
    },
    get startCountTotal() {
      return startCount;
    },
    compute: () => {
      const elapsed = timer.elapsed;
      return fn(elapsed);
    },
    reset: () => {
      timer.reset();
      startCount++;
    }
  };
};

export {
  hasElapsed,
  ofTotal,
  ofTotalTicks,
  relative,
  frequencyTimer,
  elapsedMillisecondsAbsolute,
  elapsedTicksAbsolute,
  timerWithFunction
};
//# sourceMappingURL=chunk-HCM42F75.js.map