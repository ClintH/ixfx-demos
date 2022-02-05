import {
  integer
} from "./chunk-QFSGSUQ6.js";
import {
  clamp
} from "./chunk-UUCPAL4S.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/Timer.ts
var Timer_exports = {};
__export(Timer_exports, {
  continuously: () => continuously,
  delay: () => delay,
  msElapsedTimer: () => msElapsedTimer,
  relativeTimer: () => relativeTimer,
  resettableTimeout: () => resettableTimeout,
  sleep: () => sleep,
  ticksElapsedTimer: () => ticksElapsedTimer
});
var resettableTimeout = (callback, timeoutMs) => {
  if (callback === void 0)
    throw new Error(`callback parameter is undefined`);
  integer(timeoutMs, `aboveZero`, `timeoutMs`);
  let timer = 0;
  const start = (altTimeoutMs = timeoutMs) => {
    integer(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
    if (timer !== 0)
      stop();
    timer = window.setTimeout(() => {
      callback();
      timer = 0;
    }, altTimeoutMs);
  };
  const cancel = () => {
    if (timer === 0)
      return;
    window.clearTimeout(timer);
  };
  return {
    start,
    cancel,
    get isDone() {
      return timer !== 0;
    }
  };
};
var continuously = (callback, intervalMs, resetCallback) => {
  if (intervalMs !== void 0)
    integer(intervalMs, `aboveZero`, `intervalMs`);
  let running = false;
  let ticks = 0;
  const schedule = intervalMs === void 0 ? (cb) => window.requestAnimationFrame(cb) : (cb) => window.setTimeout(cb, intervalMs);
  const cancel = () => {
    if (!running)
      return;
    running = false;
    ticks = 0;
  };
  const loop = () => {
    if (!running)
      return;
    const r = callback(ticks++);
    if (r !== void 0 && !r) {
      cancel();
      return;
    }
    schedule(loop);
  };
  const start = () => {
    if (running && resetCallback !== void 0) {
      const r = resetCallback(ticks);
      if (r !== void 0 && !r) {
        cancel();
        return;
      }
    } else if (running) {
      return;
    }
    running = true;
    schedule(loop);
  };
  return {
    start,
    get isDone() {
      return running;
    },
    get ticks() {
      return ticks;
    },
    cancel
  };
};
var sleep = (timeoutMs) => new Promise((resolve) => setTimeout(resolve, timeoutMs));
var delay = async (callback, timeoutMs) => {
  integer(timeoutMs, `aboveZero`, `timeoutMs`);
  await sleep(timeoutMs);
  return Promise.resolve(await callback());
};
var relativeTimer = (total, timer, clampValue = true) => ({
  get isDone() {
    return this.elapsed >= 1;
  },
  reset: () => {
    timer.reset();
  },
  get elapsed() {
    const v = timer.elapsed / total;
    if (clampValue)
      return clamp(v);
    return v;
  }
});
var msElapsedTimer = () => {
  let start = window.performance.now();
  return {
    reset: () => {
      start = window.performance.now();
    },
    get elapsed() {
      return window.performance.now() - start;
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
      return start++;
    }
  };
};

export {
  sleep,
  relativeTimer,
  msElapsedTimer,
  ticksElapsedTimer,
  Timer_exports
};
//# sourceMappingURL=chunk-NG3YEI4Q.js.map